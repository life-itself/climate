---
title: Climate KB Migration — Implementation Plan
created: 2026-08-07
status: ready
---

# Climate KB Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `life-itself/climate` into a flat markdown knowledge base published by Flowershow cloud, and split *Without Hot Air* into `life-itself/without-hot-air` publishing at `withouthotair.org`.

**Architecture:** No application code. Content is flat markdown at the repo root; Flowershow cloud builds and serves it from a `config.json`. A dependency-light Node checker (`scripts/check.mjs`) enforces structural invariants and is wired as a Stop hook so a loop cannot end a turn while the tree is broken. Judgement-graded work goes to a review queue, never to a boolean gate.

**Tech Stack:** Markdown, Flowershow cloud, `config.json`, Node 22 (`node:test`, no runtime deps beyond `js-yaml`), pnpm, bash, `gh` CLI.

**Design spec:** `docs/superpowers/specs/2026-08-07-climate-kb-design.md`

## Global Constraints

- Publish root for both repos is the **repo root**. Content is flat, **one level** — no content subdirectories. The single permitted exception is `assets/`.
- Frontmatter is light: `title` always; `created` where known; `description` and `tags` only when they add something. Nothing else.
- Internal links are **wikilinks** (`[[slug]]`). External links stay as markdown links.
- **No Git LFS.** `.gitattributes` is deleted and no LFS pointer may remain in the tree.
- Theme is `lessflowery` on both sites.
- Node 22. Checker deps limited to `js-yaml`; tests use built-in `node:test`.
- Never weaken or delete a check to make it pass. Mark `passes: false` with a reason instead.
- Never edit `docs/features.yaml` to self-certify. Never rewrite or force-push `main`.
- Fixes go in the generator, never in generated output — fix `extract.py` and re-run; never hand-patch chapter markdown.
- Stop and report after **3** identical consecutive failures.
- Commit convention: `[scope/N][size]: subject`, e.g. `[content/2][m]: ...`.
- MacKay's text is CC BY-NC-SA 2.0 UK. License and credits sections carry over verbatim; never reword them.

---

### Task 1: Checker with a green baseline

Builds the done condition and gets it passing on the repo *as it is today*, fixing the three pre-existing breakages. The Stop hook is deliberately NOT wired yet — wiring it before the baseline is green would block every subsequent turn.

**Files:**
- Create: `package.json`, `scripts/check.mjs`, `scripts/verify.sh`, `scripts/init.sh`
- Create: `scripts/check.test.mjs`, `scripts/fixtures/` (test fixture trees)
- Modify: `content/home.md` (dead chart), `content/without-hot-air.md` (missing cover image)

**Interfaces:**
- Consumes: nothing.
- Produces: `scripts/verify.sh` (exit 0 = green, the done condition, used by every later task and the Stop hook). `scripts/check.mjs` exports `check(rootDir)` returning `{errors: string[], warnings: string[]}`.

- [ ] **Step 1: Write the failing tests**

`scripts/check.test.mjs`, using `node:test`, over fixture trees under `scripts/fixtures/`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { check } from './check.mjs';

test('clean tree has no errors', async () => {
  const { errors } = await check('scripts/fixtures/clean');
  assert.deepEqual(errors, []);
});

test('unresolvable wikilink is an error', async () => {
  const { errors } = await check('scripts/fixtures/broken-wikilink');
  assert.match(errors.join('\n'), /nope/);
});

test('missing image is an error', async () => {
  const { errors } = await check('scripts/fixtures/missing-image');
  assert.match(errors.join('\n'), /ghost\.png/);
});

test('unparseable frontmatter is an error', async () => {
  const { errors } = await check('scripts/fixtures/bad-frontmatter');
  assert.equal(errors.length, 1);
});

test('missing index.md is an error', async () => {
  const { errors } = await check('scripts/fixtures/no-index');
  assert.match(errors.join('\n'), /index\.md/);
});

test('invalid config.json is an error', async () => {
  const { errors } = await check('scripts/fixtures/bad-config');
  assert.match(errors.join('\n'), /config\.json/);
});

test('LFS pointer is an error', async () => {
  const { errors } = await check('scripts/fixtures/lfs-pointer');
  assert.match(errors.join('\n'), /LFS/);
});

test('orphaned asset is a warning, not an error', async () => {
  const { errors, warnings } = await check('scripts/fixtures/orphan-asset');
  assert.deepEqual(errors, []);
  assert.match(warnings.join('\n'), /unused\.png/);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test scripts/check.test.mjs`
Expected: FAIL — cannot resolve `./check.mjs`.

- [ ] **Step 3: Write `scripts/check.mjs`**

Export `check(rootDir)`. Walk the tree, skipping `.git`, `node_modules`, `docs`, `scripts`. Collect:

**Errors** — every markdown file's frontmatter parses via `js-yaml`; every `[[wikilink]]` resolves to a markdown file in the tree (strip any `|alias` and `#anchor` before resolving); every `![](path)` image exists on disk; an `index.md` exists at the root; `config.json` parses as JSON; no file begins with `version https://git-lfs.github.com/spec/`.

**Warnings** — a file in `assets/` referenced by nothing. A warning, not an error: deleting an image on a heuristic is worse than carrying it.

Note the check "no reference to `site/`, `content/`, or `_files/`" from the spec is *subsumed* by link and image resolution — once those paths are gone, any surviving reference is a broken link and already fails. Do not add it as a separate gate.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test scripts/check.test.mjs`
Expected: PASS, 8/8.

- [ ] **Step 5: Write `scripts/verify.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
node --test scripts/check.test.mjs
node scripts/check.mjs .
```

`check.mjs` run as a script prints errors and warnings and exits 1 if there are any errors. `chmod +x`.

- [ ] **Step 6: Write `scripts/init.sh`**

Assert Node major >= 22 with a clear message if not, `corepack enable pnpm`, `pnpm install`, then exec `scripts/verify.sh`. `chmod +x`.

- [ ] **Step 7: Run verify against the real repo and record what fails**

Run: `scripts/verify.sh`
Expected: FAIL with exactly three pre-existing breakages —
1. `content/home.md` → `_files/HadCRUT.5.0.1.0.analysis.summary_series.global.annual.csv` missing.
2. `content/without-hot-air.md` → `/img/without-hot-air/cover.jpg` missing.
3. `content/without-hot-air` is a symlink into `without-hot-air/src`, so chapter links resolve through it — confirm whether this reads as broken and record the actual behaviour.

If anything *else* fails, stop and record it in `docs/review-queue.md` before proceeding — it means the repo is broken in a way this plan did not anticipate.

- [ ] **Step 8: Fix the three breakages minimally**

Do NOT port the chart yet (that is Task 6). For now remove the dead `<VegaLite>` block from `content/home.md` and leave a one-line HTML comment noting the chart is restored in Task 6. Point the cover image at the real file at `without-hot-air/Images/cover.jpg`.

- [ ] **Step 9: Run verify to confirm a green baseline**

Run: `scripts/verify.sh`
Expected: exit 0.

- [ ] **Step 10: Commit**

`[tooling/2][m]: add structural checker and reach green baseline`

---

### Task 2: Wire the hard gate and the ledger

**Files:**
- Create: `.claude/settings.json`, `CLAUDE.md`, `docs/features.yaml`, `docs/review-queue.md`

**Interfaces:**
- Consumes: `scripts/verify.sh` from Task 1.
- Produces: `docs/features.yaml`, the ledger every later task updates.

- [ ] **Step 1: Write `.claude/settings.json` with the Stop hook**

A `Stop` hook running `scripts/verify.sh`. This is the gate `/goal` cannot argue with.

- [ ] **Step 2: Write `CLAUDE.md`**

The verify command, ledger location, commit convention, and the guard rails verbatim from Global Constraints above.

- [ ] **Step 3: Write `docs/features.yaml`**

One entry per unit below, each `passes: false` initially, each with a `human: true` flag where a person is required:

`checker-baseline`, `stop-hook`, `site-teardown`, `content-flatten`, `notes-split`, `asset-normalisation`, `lfs-removal`, `chart-port`, `wikilink-conversion`, `climate-config`, `wha-repo-split`, `wha-config`, `chapter-redirects`, `wha-repo-create` (human), `flowershow-connect-climate` (human), `flowershow-connect-wha` (human), `dns-climate` (human), `dns-wha` (human), `live-smoke-check` (human).

- [ ] **Step 4: Write `docs/review-queue.md`**

Empty with a header explaining what belongs here: judgement calls the checker must not pretend to grade.

- [ ] **Step 5: Verify and commit**

Run: `scripts/verify.sh` → exit 0. Mark `checker-baseline` and `stop-hook` `passes: true`.
Commit: `[tooling/2][m]: wire stop hook, ledger and house rules`

---

### Task 3: Tear down the Next.js site

**Files:**
- Delete: `site/` (entire), `.github/workflows/main.yml`, `.gitattributes`
- Modify: `docs/features.yaml`

- [ ] **Step 1: Tag the current state**

Run: `git tag pre-flowershow && git push origin pre-flowershow`
This is the only recovery path for `site/` other than history. Do it before deleting.

- [ ] **Step 2: Record the two facts `site/` holds that must survive**

From `site/config/siteConfig.js`: analytics key `G-PV1VZND295`, title `Life Itself Climate Inquiry`. From `site/public/CNAME`: `climate.lifeitself.org`. These feed Task 9's `config.json`. Write them into `docs/features.yaml` under the `climate-config` entry as a `notes:` field so they cannot be lost.

- [ ] **Step 3: Delete**

`git rm -r site .github/workflows/main.yml .gitattributes`

The `/sewtha/` redirects in `site/next.config.js` are deliberately dropped — 2021-era, six-month measure.

- [ ] **Step 4: Verify and commit**

Run: `scripts/verify.sh` → exit 0. Mark `site-teardown` `passes: true`.
Commit: `[site/3][l]: remove next.js app, deploy to flowershow instead`

- [ ] **Step 5: Delete the stale gh-pages branch**

`git push origin --delete gh-pages`. **Outward-facing** — this takes the current live site down, so it must happen only after the Flowershow site is confirmed live (Task 12). Leave `passes: false` and note the dependency; do not do it now.

---

### Task 4: Flatten content to the repo root

**Files:**
- Move: `content/*.md` → repo root
- Delete: the `content/without-hot-air` symlink, then `content/`
- Rename: `home.md` → `index.md`; `ipcc-special-report-1.5-degress-2018.md` → `ipcc-special-report-1.5-degrees-2018.md`

- [ ] **Step 1: Remove the symlink first**

`git rm content/without-hot-air`. It points at `../without-hot-air/src`; leaving it would make the moves resolve strangely. WHA content is handled in Task 9 and is not moved to the root here.

- [ ] **Step 2: Move each file with `git mv`**

Use `git mv` so history follows. `content/home.md` → `index.md`. Fix the `degress` → `degrees` typo in the same move.

- [ ] **Step 3: Note the redirect debt created**

The typo fix changes a live URL. Add `/ipcc-special-report-1.5-degress-2018` → `/ipcc-special-report-1.5-degrees-2018` to the `climate-config` notes in `docs/features.yaml` so Task 9 picks it up.

- [ ] **Step 4: Update every internal link that pointed into `content/`**

Run verify to find them. Expect `index.md`'s `[wha]: /without-hot-air/` reference definition and the site nav links.

- [ ] **Step 5: Verify and commit**

Run: `scripts/verify.sh` → exit 0. Mark `content-flatten` `passes: true`.
Commit: `[content/3][l]: flatten content to repo root for flowershow`

---

### Task 5: Split `notes.md` into one file per note

**Files:**
- Delete: `notes.md`
- Create: `meta-vs-specific-solutions-debates.md`, `techno-solutionism-and-mitigation.md`

`notes.md` holds two dated notes concatenated under `#` headings, both `2021-05-09`, one signed `~rufus`.

- [ ] **Step 1: Create the first note**

Frontmatter `title` (the heading text, with the trailing date and `~rufus` stripped) and `created: 2021-05-09`. Body is the note text verbatim — do not rewrite the prose.

- [ ] **Step 2: Create the second note**

Same treatment.

- [ ] **Step 3: Delete `notes.md` and fix inbound links**

Run verify to catch anything pointing at `/notes`.

- [ ] **Step 4: Add both splits to the review queue**

A split is a judgement call about where a note's meaning starts and stops. Add both to `docs/review-queue.md` for human confirmation. Do NOT gate on it.

- [ ] **Step 5: Verify and commit**

Run: `scripts/verify.sh` → exit 0. Mark `notes-split` `passes: true`.
Commit: `[content/2][m]: split notes.md into one file per note`

---

### Task 6: Normalise assets and remove LFS

**Files:**
- Move: `assets/*` stays; `without-hot-air/Images/*` is left in place for Task 9
- Modify: every markdown file referencing an image

- [ ] **Step 1: Confirm no LFS pointers remain**

`.gitattributes` went in Task 3, but existing blobs may still be pointers. Run `git lfs ls-files` (if `git-lfs` is installed) and grep the tree for the pointer header. If pointers exist, fetch the real files with `git lfs pull` and commit them as normal blobs.

- [ ] **Step 2: Normalise every image reference to `/assets/<file>`**

The existing `assets/` filenames include spaces (`Pasted image 20220702193419.png`). Rename to kebab-case with `git mv` and update references — spaces in URLs are a persistent source of breakage.

- [ ] **Step 3: Verify and commit**

Run: `scripts/verify.sh` → exit 0 with no LFS error. Mark `asset-normalisation` and `lfs-removal` `passes: true`.
Commit: `[assets/2][m]: normalise asset paths, drop git-lfs`

---

### Task 7: Restore the temperature chart

**Files:**
- Create: `assets/hadcrut5-global-annual.csv`
- Modify: `index.md`

- [ ] **Step 1: Fetch the real data**

The original VegaLite spec read a HadCRUT5 global annual summary series. Download the current file from the Met Office HadCRUT5 dataset page. Record the source URL and access date in the CSV's sibling documentation — a chart with no provenance is worse than no chart.

- [ ] **Step 2: Confirm the column names**

The old spec used `Time` and `Anomaly (deg C)`. Verify against the file actually downloaded; HadCRUT column headers have changed across releases. Use the real headers, not the remembered ones.

- [ ] **Step 3: Replace the HTML comment from Task 1 with the Flowershow component**

```jsx
<LineChart
  data={{ url: "/assets/hadcrut5-global-annual.csv" }}
  title="Global temperature anomaly"
  xAxis="Time"
  yAxis="Anomaly (deg C)"
/>
```

JSX works in plain `.md` in Flowershow — no `.mdx` rename needed.

- [ ] **Step 4: Add to the review queue**

Whether the chart *renders correctly* cannot be checked locally — Flowershow builds it server-side. Add "confirm temperature chart renders" to `docs/review-queue.md`, to be checked during Task 12's smoke check.

- [ ] **Step 5: Verify and commit**

Run: `scripts/verify.sh` → exit 0. Mark `chart-port` `passes: true`.
Commit: `[content/2][m]: restore temperature chart using flowershow LineChart`

---

### Task 8: Convert internal links to wikilinks

**Files:**
- Modify: every markdown file at the root

- [ ] **Step 1: Convert `[text](/path/)` internal links to `[[slug|text]]`**

Only *internal* links. External `http(s)://` links stay as markdown links. Reference-style definitions (`[wha]: /without-hot-air/`) need converting too, or removing where the wikilink makes them redundant.

- [ ] **Step 2: Verify and commit**

Run: `scripts/verify.sh` → exit 0. Every wikilink must resolve; this is the check that makes the conversion safe.
Commit: `[content/2][m]: convert internal links to wikilinks`

---

### Task 9: Split out the Without Hot Air repo

**Files:**
- Create: `../without-hot-air/` (a full clone, then refactored)
- Modify in the new repo: `extract.py`, `README.md`; create `index.md`, `config.json`, `CLAUDE.md`

Per the design: clone the whole repo with full history, then one refactor commit. No `filter-repo`, no history rewrite.

- [ ] **Step 1: Clone**

`git clone . ../without-hot-air` then repoint `origin` to `git@github.com:life-itself/without-hot-air.git`. Do not create the GitHub repo yet — that is Task 11.

- [ ] **Step 2: Promote `without-hot-air/src/*` to the root and delete everything else**

`git mv without-hot-air/src/*.md .`, `git mv without-hot-air/Images assets`, `git mv without-hot-air/extract.py .`, `git mv without-hot-air/without-hot-air.epub .`, then `git rm -r` the climate content, `docs/`, and the leftover `without-hot-air/` shell. Keep `scripts/` — the new repo needs the same checker.

- [ ] **Step 3: Create `index.md` from the climate repo's `without-hot-air.md`**

Adapt: chapter links become root-relative wikilinks (`[[chap01]]` not `/without-hot-air/chap01`), the cover image points at `/assets/cover.jpg`, and the "get in touch" link `https://lifeitself.us/contact` is updated to the `lifeitself.org` domain (the `.us` → `.org` rename landed in commit `046bf5e`). Carry the license and credits sections over **verbatim**.

- [ ] **Step 4: Fix `extract.py`'s output path**

It writes to `src/`; chapters now live at the root. Change the output directory so a regeneration lands correctly. This is the generator, so it gets fixed rather than its output being patched.

- [ ] **Step 5: Rewrite the README for a standalone repo**

Keep the "Why this project", Sources, Credits and License sections verbatim. Update the Content section to the new layout and the developer instructions for the new `extract.py` path.

- [ ] **Step 6: Write `config.json`**

```json
{
  "title": "Sustainable Energy — Without the Hot Air",
  "theme": "lessflowery",
  "showSidebar": true,
  "showToc": true,
  "contentExclude": ["/docs", "/scripts", "/README"]
}
```

- [ ] **Step 7: Copy `CLAUDE.md` and the checker, then verify**

Run: `scripts/verify.sh` in `../without-hot-air` → exit 0. Every one of the 54 chapters' figure references must resolve against `assets/`; this is the check that proves the image move was complete.

- [ ] **Step 8: Commit in the new repo**

`[repo/3][l]: refactor climate repo into standalone without-hot-air`

- [ ] **Step 9: In the climate repo, replace `without-hot-air.md` with a stub**

A short page introducing the book and linking to `https://withouthotair.org`. Then `git rm -r without-hot-air/` — the source now lives in its own repo. Verify, then commit `[content/3][l]: split without-hot-air out to its own repo`. Mark `wha-repo-split` and `wha-config` `passes: true`.

---

### Task 10: Generate the chapter redirects

**Files:**
- Modify: `config.json` (climate repo), created here

- [ ] **Step 1: Write the climate `config.json`**

Using the facts recorded in Task 3 Step 2 — analytics `G-PV1VZND295`, and the values from the design spec.

- [ ] **Step 2: Generate one redirect per chapter**

For each markdown file at the root of `../without-hot-air`, emit:

```json
{ "from": "/without-hot-air/<slug>", "to": "https://withouthotair.org/<slug>", "permanent": true }
```

Cross-domain absolute targets are confirmed to work for custom-domain sites (`page.tsx:180` uses `r.to` verbatim). Add the `degress` → `degrees` typo redirect from Task 4 Step 3 as well.

- [ ] **Step 3: Extend the checker to gate redirect completeness**

Add a test and a check: every chapter file in the sibling WHA repo has a matching redirect entry. If the sibling repo is absent, this check **skips with a warning** rather than failing — a checkout without the sibling must still reach green.

- [ ] **Step 4: Verify and commit**

Run: `scripts/verify.sh` → exit 0. Mark `chapter-redirects` and `climate-config` `passes: true`.
Commit: `[config/2][m]: add flowershow config with chapter redirects`

---

### Task 11: Create and push the GitHub repo — HUMAN GATE

- [ ] **Step 1: Confirm before creating**

`gh repo create life-itself/without-hot-air --public` is outward-facing and effectively irreversible in reputation terms. Ask before running it, even under an autonomous loop. The token has `repo` scope and the user is `admin` on `life-itself`, so it will succeed — which is exactly why it needs the gate.

- [ ] **Step 2: Create and push**

Then `git push -u origin main` and push no tags.

- [ ] **Step 3: Mark `wha-repo-create` `passes: true`**

---

### Task 12: Connect, point DNS, smoke check — HUMAN GATE

None of this is doable from the repo. Each step stays `passes: false` until a human confirms it.

- [ ] **Step 1: Connect both repos at cloud.flowershow.app**

New Site → Sync with GitHub → `life-itself/climate` and `life-itself/without-hot-air`, branch `main`, root directory left at the repo root.

- [ ] **Step 2: Set the custom domains**

`climate.lifeitself.org` (CNAME) and `withouthotair.org` (apex A record, plus a `www` CNAME). Registered on Cloudflare. Remove any other A record on `@` for the apex — multiple A records round-robin and the site will work intermittently.

- [ ] **Step 3: Smoke check both sites**

Home page renders; one deep page per site returns 200 with expected text; a sample of `climate.lifeitself.org/without-hot-air/chapNN` URLs 301 to `withouthotair.org`; the temperature chart renders; a bad route 404s.

- [ ] **Step 4: Only now, delete the gh-pages branch**

Task 3 Step 5, deferred until the replacement is confirmed live.

- [ ] **Step 5: Work the review queue with a human**

Everything in `docs/review-queue.md` — the note splits, the KB's coherence, both sites' look. Not a gate; a conversation.

- [ ] **Step 6: Mark the remaining ledger entries and close out**

---

## Follow-ups outside this plan

- File two doc bugs against `flowershow/flowershow`: `docs/reference/redirects.md` omits the supported `permanent` field, and describes the redirects as client-side when the implementation is a server-side Next.js redirect.
- Write up the reusable KB-repo patterns (`~/src/me/planning/ideas/knowledge-base-repo-patterns.md`).
- Update `~/src/me/planning/initiatives/without-hot-air.md` — its `github` field points into the climate repo and its "register domain" / "deploy with flowershow" tasks are completed by this plan.
