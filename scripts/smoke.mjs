#!/usr/bin/env node
// Post-deploy smoke checks against the LIVE site.
//
// verify.sh proves the repo is structurally sound. It cannot prove the site
// renders — and every bug that reached production during the 2026-08 migration
// was a rendering bug that verify.sh was structurally incapable of seeing:
// a chart that needed syntaxMode, chapter titles falling back to filenames,
// LaTeX with no math delimiters, images served as LFS pointer text.
//
// The unifying symptom is source syntax surviving into the rendered page. A
// component that did not mount appears as its own markup; unrendered LaTeX
// appears as backslash commands; a failed embed appears as [[brackets]]. So the
// core check is: does anything that should have been consumed by the renderer
// still appear in the output?
//
// Usage:  node scripts/smoke.mjs [path/to/smoke.json]
// Needs network. Deliberately NOT part of verify.sh, which must work offline
// and must not fail because a deploy is mid-flight.

import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Source syntax that must never survive rendering. Escaped forms matter: raw
// HTML that leaked as text arrives as &lt;span, whereas real markup is <span.
const LEAKS = [
  { pattern: /&lt;(LineChart|List|BarChart|Chart)\b/, why: 'component rendered as text — page probably needs `syntaxMode: mdx`' },
  { pattern: /\\(frac|rho|cdot|sqrt|begin\{)/, why: 'LaTeX rendered as text — math delimiters missing' },
  { pattern: /&lt;span class=/, why: 'raw HTML leaked into the page as text' },
  { pattern: /!\[\[/, why: 'embed not rendered — wiki-link plugin missing or syntax wrong' },
  { pattern: /version https:\/\/git-lfs\.github\.com\/spec/, why: 'Git LFS pointer served instead of the real file' },
  { pattern: /^\s*---\s*$[\s\S]{0,80}^title:/m, why: 'frontmatter leaked into the page body' },
];

const fail = [];
const note = (msg) => fail.push(msg);

async function get(url) {
  const res = await fetch(url, { redirect: 'manual', headers: { 'cache-control': 'no-cache' } });
  return { status: res.status, location: res.headers.get('location'), body: await res.text() };
}

async function main() {
  const manifestPath = process.argv[2] ?? path.join(import.meta.dirname, '..', 'smoke.json');
  const cfg = JSON.parse(await readFile(manifestPath, 'utf8'));
  const base = cfg.base.replace(/\/$/, '');
  let checked = 0;

  for (const page of cfg.pages ?? []) {
    const url = `${base}${page.path}`;
    let r;
    try {
      r = await get(url);
    } catch (e) {
      note(`${page.path}: request failed — ${e.message}`);
      continue;
    }
    checked++;
    const want = page.status ?? 200;
    if (r.status !== want) {
      note(`${page.path}: expected ${want}, got ${r.status}`);
      continue;
    }
    if (r.status >= 300 && r.status < 400) {
      // Same-site redirects come back with a relative Location, cross-site with
      // an absolute one. Resolve both against the base so they compare alike.
      const actual = new URL(r.location ?? '', `${base}/`).href;
      if (page.to && !actual.startsWith(page.to)) {
        note(`${page.path}: redirects to ${actual}, expected ${page.to}`);
      }
      continue;
    }
    for (const { pattern, why } of LEAKS) {
      const m = r.body.match(pattern);
      if (m) note(`${page.path}: ${why} — found ${JSON.stringify(m[0].slice(0, 40))}`);
    }
    for (const expected of page.contains ?? []) {
      if (!r.body.includes(expected)) note(`${page.path}: missing expected text ${JSON.stringify(expected)}`);
    }
  }

  for (const asset of cfg.assets ?? []) {
    const url = `${base}${asset.path}`;
    let res;
    try {
      res = await fetch(url, { redirect: 'follow' });
    } catch (e) {
      note(`${asset.path}: request failed — ${e.message}`);
      continue;
    }
    checked++;
    if (!res.ok) { note(`${asset.path}: ${res.status}`); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    if (asset.minBytes && buf.length < asset.minBytes) {
      note(`${asset.path}: only ${buf.length} bytes, expected >= ${asset.minBytes}` +
           (buf.length < 300 ? ' — a tiny "image" is usually an LFS pointer' : ''));
    }
    if (asset.magic && !buf.subarray(0, asset.magic.length / 2).toString('hex').startsWith(asset.magic)) {
      note(`${asset.path}: wrong file signature — not the format it claims`);
    }
  }

  console.log(`${checked} checks against ${base}`);
  if (fail.length) {
    for (const f of fail) console.error(`FAIL ${f}`);
    console.error(`\n${fail.length} failure(s)`);
    process.exit(1);
  }
  console.log('all good');
}

await main();
