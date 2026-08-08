#!/usr/bin/env node
// Browser checks against the LIVE site.
//
// The third gate, and the one that would have caught the bugs the other two
// could not:
//
//   verify.sh    the repo is structurally sound      (offline, fast)
//   smoke.mjs    the server sent the right bytes     (network)
//   visual.mjs   the browser actually rendered them  (network + chromium)
//
// The temperature chart is the case in point. Its markup was correct, the CSV
// was served, the HTML was fine — and it drew nothing, because the component
// never mounted. Only running JavaScript reveals that class of failure.
//
// Usage:  node scripts/visual.mjs [path/to/visual.json]
//         SCREENSHOTS=1 node scripts/visual.mjs   # also write screenshots/
//
// Needs `playwright` and a chromium build:
//   pnpm add -D playwright && pnpm exec playwright install chromium

import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('playwright not installed. Run:\n  pnpm add -D playwright && pnpm exec playwright install chromium');
  process.exit(2);
}

const fail = [];

async function main() {
  const manifestPath = process.argv[2] ?? path.join(import.meta.dirname, '..', 'visual.json');
  const cfg = JSON.parse(await readFile(manifestPath, 'utf8'));
  const base = cfg.base.replace(/\/$/, '');
  const shots = process.env.SCREENSHOTS === '1';
  if (shots) await mkdir('screenshots', { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });

  for (const page of cfg.pages ?? []) {
    const p = await ctx.newPage();
    const errors = [];
    p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    p.on('pageerror', (e) => errors.push(String(e)));

    const url = `${base}${page.path}`;
    try {
      await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    } catch (e) {
      fail.push(`${page.path}: did not load — ${e.message.split('\n')[0]}`);
      await p.close();
      continue;
    }

    // Elements that must exist once JavaScript has run. This is the check that
    // distinguishes "the markup is right" from "the thing actually rendered".
    for (const sel of page.mustRender ?? []) {
      const n = await p.locator(sel).count();
      if (n === 0) fail.push(`${page.path}: nothing rendered for ${sel}`);
    }

    for (const sel of page.mustNotExist ?? []) {
      const n = await p.locator(sel).count();
      if (n > 0) fail.push(`${page.path}: ${n} unwanted ${sel}`);
    }

    // Text the reader must actually see. Uses innerText rather than a locator:
    // innerText is what the browser lays out, so hidden nav duplicates and
    // display:none blocks are excluded without having to reason about which
    // element matched first.
    const visible = await p.evaluate(() => document.body.innerText);
    for (const text of page.visibleText ?? []) {
      if (!visible.includes(text)) {
        fail.push(`${page.path}: text not visible — ${JSON.stringify(text)}`);
      }
    }

    // Images that loaded but are broken decode to zero natural width.
    const broken = await p.evaluate(() =>
      Array.from(document.images)
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src),
    );
    for (const src of broken) fail.push(`${page.path}: broken image ${src}`);

    if (errors.length && !page.allowConsoleErrors) {
      fail.push(`${page.path}: console errors — ${errors.slice(0, 2).join(' | ').slice(0, 200)}`);
    }

    if (shots) {
      const name = (page.path === '/' ? 'home' : page.path.replace(/\W+/g, '-').replace(/^-|-$/g, ''));
      await p.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
    }
    await p.close();
  }

  await browser.close();

  console.log(`${(cfg.pages ?? []).length} pages rendered against ${base}`);
  if (fail.length) {
    for (const f of fail) console.error(`FAIL ${f}`);
    console.error(`\n${fail.length} failure(s)`);
    process.exit(1);
  }
  console.log('all good');
}

await main();
