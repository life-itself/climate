#!/usr/bin/env node
// Structural checker for this knowledge base.
//
// Gates only what is machine-decidable: links resolve, images exist, frontmatter
// parses, config is valid, no LFS pointers. Anything judgement-graded ("does this
// read well", "does the site look right") belongs in docs/review-queue.md, never
// here — see docs/superpowers/specs/2026-08-07-climate-kb-design.md.

import { readdir, readFile, stat, open } from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';

const SKIP_DIRS = new Set(['.git', 'node_modules', 'docs', 'scripts', '.claude']);
// Repo-facing files, excluded from the published site via config.json's
// contentExclude. Their prose is documentation, not site content, so link syntax
// inside them is illustrative and must not be resolved.
const SKIP_FILES = new Set(['CLAUDE.md', 'README.md', 'AGENTS.md']);
const MD_EXT = /\.mdx?$/;
const LFS_HEADER = 'version https://git-lfs.github.com/spec/';
// LFS pointer files are a few hundred bytes; skip sniffing anything larger.
const LFS_MAX_BYTES = 1024;

async function walk(dir, root, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walk(full, root, out);
    } else if (entry.isSymbolicLink()) {
      out.push({ rel: path.relative(root, full), full, symlink: true });
    } else if (entry.isFile()) {
      out.push({ rel: path.relative(root, full), full, symlink: false });
    }
  }
  return out;
}

function stripFrontmatter(text) {
  if (!text.startsWith('---')) return { body: text, raw: null };
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { body: text, raw: null };
  return { raw: text.slice(4, end), body: text.slice(end + 4) };
}

// A page is addressable by its path-without-extension and by its bare basename,
// which is what makes flat wikilinks like [[chap01]] work.
function pageKeys(rel) {
  const noExt = rel.replace(MD_EXT, '');
  return [noExt, path.basename(noExt)];
}

function normalizeTarget(raw) {
  let t = raw.split('|')[0].split('#')[0].trim();
  try {
    t = decodeURIComponent(t);
  } catch {
    /* leave as-is if it isn't valid percent-encoding */
  }
  t = t.replace(/^\.\//, '').replace(/^\//, '').replace(/\/$/, '');
  return t;
}

export async function check(rootDir) {
  const root = path.resolve(rootDir);
  const errors = [];
  const warnings = [];

  const files = await walk(root, root);
  const filesOnDisk = new Set(files.map((f) => f.rel));
  const mdFiles = files.filter(
    (f) => MD_EXT.test(f.rel) && !f.symlink && !SKIP_FILES.has(f.rel),
  );

  const pages = new Set();
  for (const f of mdFiles) for (const k of pageKeys(f.rel)) pages.add(k);

  // Obsidian resolves embeds by bare filename anywhere in the vault, so we need a
  // basename index as well as exact paths.
  const byBasename = new Map();
  for (const f of files) {
    if (!byBasename.has(path.basename(f.rel))) byBasename.set(path.basename(f.rel), f.rel);
  }

  // index.md at the publish root — Flowershow's home page.
  if (!filesOnDisk.has('index.md') && !filesOnDisk.has('index.mdx')) {
    errors.push('missing index.md at the publish root');
  }

  // config.json must be valid JSON if present.
  let config = null;
  if (filesOnDisk.has('config.json')) {
    try {
      config = JSON.parse(await readFile(path.join(root, 'config.json'), 'utf8'));
    } catch (e) {
      errors.push(`config.json is not valid JSON: ${e.message}`);
    }
  }

  // Every page in the split-out Without Hot Air repo needs a redirect from its
  // old URL here, or a link someone published years ago quietly dies. Checked
  // against the sibling checkout so the list cannot drift out of step with it.
  const wantsWhaRedirects = (config?.redirects ?? []).some((r) =>
    String(r.to).includes('withouthotair.org'),
  );
  if (wantsWhaRedirects) {
    const sibling = path.join(root, '..', 'without-hot-air');
    let siblingPages = [];
    try {
      siblingPages = (await readdir(sibling, { withFileTypes: true }))
        .filter((e) => e.isFile() && MD_EXT.test(e.name) && !SKIP_FILES.has(e.name))
        .map((e) => e.name.replace(MD_EXT, ''))
        .filter((slug) => slug !== 'index');
    } catch {
      warnings.push(
        'redirect completeness not checked: ../without-hot-air is not checked out',
      );
    }
    if (siblingPages.length) {
      const known = new Set(siblingPages);
      // A redirect that lands nowhere is worse than no redirect: it promises a
      // page and delivers a 404. This is what catches a renamed chapter.
      for (const r of config.redirects) {
        const m = String(r.to).match(/^https:\/\/withouthotair\.org\/(.+)$/);
        if (m && !known.has(m[1])) {
          errors.push(`config.json: redirect ${r.from} points at /${m[1]}, which no longer exists`);
        }
      }
      // A page with no redirect is only a problem if it is one people could
      // already have linked to. New pages added after the split are fine, so
      // this warns rather than fails.
      const haveFrom = new Set(config.redirects.map((r) => String(r.from)));
      for (const slug of siblingPages) {
        if (!haveFrom.has(`/without-hot-air/${slug}`)) {
          warnings.push(`no redirect for /without-hot-air/${slug} (fine if added after the split)`);
        }
      }
    }
  }

  const referenced = new Set();

  for (const f of mdFiles) {
    const text = await readFile(f.full, 'utf8');
    const { raw, body } = stripFrontmatter(text);

    if (raw !== null) {
      try {
        yaml.load(raw);
      } catch (e) {
        errors.push(`${f.rel}: frontmatter does not parse: ${e.message.split('\n')[0]}`);
      }
    }

    // Obsidian embeds — ![[file]] — reference a file, not a page. Resolve them
    // against the tree, by exact path or by bare filename.
    for (const m of body.matchAll(/!\[\[([^\]]+)\]\]/g)) {
      const target = normalizeTarget(m[1]);
      if (!target) continue;
      const hit = filesOnDisk.has(target) ? target : byBasename.get(path.basename(target));
      if (hit) {
        referenced.add(hit);
      } else {
        errors.push(`${f.rel}: embed ![[${m[1]}]] resolves to nothing`);
      }
    }

    // Plain wikilinks — [[page]] — reference a page.
    for (const m of body.matchAll(/(?<!!)\[\[([^\]]+)\]\]/g)) {
      const target = normalizeTarget(m[1]);
      if (!target) continue;
      if (!pages.has(target)) {
        errors.push(`${f.rel}: wikilink [[${m[1]}]] resolves to nothing`);
      }
    }

    // Local resources: markdown images, and any /assets/... string (this is what
    // catches a <LineChart data={{url: "/assets/x.csv"}} /> whose CSV is missing).
    const resources = new Set();
    for (const m of body.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)) resources.add(m[1]);
    for (const m of body.matchAll(/["'(](\/assets\/[^"')\s]+)/g)) resources.add(m[1]);
    for (const raw of resources) {
      if (/^(https?:|data:|mailto:)/.test(raw)) continue;
      const rel = normalizeTarget(raw);
      referenced.add(rel);
      if (!filesOnDisk.has(rel)) {
        errors.push(`${f.rel}: resource ${raw} does not exist on disk`);
      }
    }

    // Internal markdown links and reference definitions must resolve to a page.
    const links = new Set();
    for (const m of body.matchAll(/(?<!!)\[[^\]]*\]\((\/[^)\s]*)\)/g)) links.add(m[1]);
    for (const m of body.matchAll(/^\[[^\]]+\]:\s*(\/\S+)$/gm)) links.add(m[1]);
    for (const raw of links) {
      if (raw.startsWith('/assets/')) continue;
      const target = normalizeTarget(raw);
      if (!target) continue;
      if (!pages.has(target)) {
        errors.push(`${f.rel}: link ${raw} resolves to nothing`);
      }
    }
  }

  // No Git LFS pointers anywhere.
  for (const f of files) {
    if (f.symlink || MD_EXT.test(f.rel)) continue;
    let size;
    try {
      ({ size } = await stat(f.full));
    } catch {
      continue;
    }
    if (size > LFS_MAX_BYTES) continue;
    const fh = await open(f.full, 'r');
    try {
      const buf = Buffer.alloc(LFS_HEADER.length);
      const { bytesRead } = await fh.read(buf, 0, LFS_HEADER.length, 0);
      if (bytesRead === LFS_HEADER.length && buf.toString('utf8') === LFS_HEADER) {
        errors.push(`${f.rel}: is a Git LFS pointer, not the real file`);
      }
    } finally {
      await fh.close();
    }
  }

  // Unused assets are a warning: deleting an image on a heuristic is worse than
  // carrying a spare one.
  for (const f of files) {
    if (!f.rel.startsWith('assets/')) continue;
    if (!referenced.has(f.rel)) warnings.push(`${f.rel}: unused, referenced by nothing`);
  }

  return { errors, warnings };
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);

if (invokedDirectly) {
  const { errors, warnings } = await check(process.argv[2] ?? '.');
  for (const w of warnings) console.log(`warning: ${w}`);
  for (const e of errors) console.error(`error: ${e}`);
  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
  process.exit(errors.length ? 1 : 0);
}
