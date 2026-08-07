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

### Task 1: Structural checker

Builds the done condition, tested against fixtures. It gates the **target** structure, so it is red against today's tree — that is correct and expected. The Stop hook is wired in Task 5, once the flatten has made green reachable.

**Files:**
- Create: `package.json`, `scripts/check.mjs`, `scripts/verify.sh`, `scripts/init.sh`
- Create: `scripts/check.test.mjs`, `scripts/fixtures/` (test fixture trees)

**Interfaces:**
- Consumes: nothing.
- Produces: `scripts/verify.sh` (exit 0 = green, the done condition, used by every later task and the Stop hook). `scripts/check.mjs` exports `check(rootDir)` returning `{errors: string[], warnings: string[]}`.

- [x] **Step 1: Write the failing tests**

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

- [x] **Step 2: Run the tests to verify they fail**

Run: `node --test scripts/check.test.mjs`
Expected: FAIL — cannot resolve `./check.mjs`.

- [x] **Step 3: Write `scripts/check.mjs`**

Export `check(rootDir)`. Walk the tree, skipping `.git`, `node_modules`, `docs`, `scripts`. Collect:

**Errors** — every markdown file's frontmatter parses via `js-yaml`; every `[[wikilink]]` resolves to a markdown file in the tree (strip any `|alias` and `#anchor` before resolving); every `![[embed]]` resolves to a **file** on disk, by exact path or bare filename, the way Obsidian resolves them; every `![](path)` image exists on disk; every `/assets/...` string exists on disk, which is what catches a `<LineChart>` whose CSV is missing; every internal markdown link and reference definition resolves to a page; an `index.md` exists at the root; `config.json` parses as JSON; no file begins with `version https://git-lfs.github.com/spec/`.

Embeds and plain wikilinks must be distinguished by the leading `!` — treating `![[image.png]]` as a page link produces false failures on valid Obsidian content.

Symlinked directories are recorded but not traversed. This repo has three tracked directory symlinks, so a checker that followed them would double-count every chapter.

**Warnings** — a file in `assets/` referenced by nothing. A warning, not an error: deleting an image on a heuristic is worse than carrying it.

Note the check "no reference to `site/`, `content/`, or `_files/`" from the spec is *subsumed* by link and image resolution — once those paths are gone, any surviving reference is a broken link and already fails. Do not add it as a separate gate.

- [x] **Step 4: Run the tests to verify they pass**

Run: `node --test scripts/check.test.mjs`
Expected: PASS, 14/14.

- [x] **Step 5: Write `scripts/verify.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
node --test scripts/check.test.mjs
node scripts/check.mjs .
```

`check.mjs` run as a script prints errors and warnings and exits 1 if there are any errors. `chmod +x`.

- [x] **Step 6: Write `scripts/init.sh`**

Assert Node major >= 22 with a clear message if not, `corepack enable pnpm`, `pnpm install`, then exec `scripts/verify.sh`. `chmod +x`.

- [x] **Step 7: Run the checker against the repo and record the gap**

Run: `node scripts/check.mjs .`

**The checker gates the _target_ structure, not today's.** It will be red until Task 4 lands, because today `index.md` does not exist, content sits under `content/`, and image references use `/img/without-hot-air/...`. This is expected and is why the Stop hook is wired in Task 5, *after* the flatten — not here. Do not soften the checker to make today's tree pass; that is the exact failure the guard rails forbid.

Record the baseline error count in `docs/features.yaml` under `checker-baseline` so later tasks can show it monotonically decreasing.

- [x] **Step 8: Do NOT "fix" the Obsidian embeds**

`![[Pasted image ....png]]` in `ev-vs-ice.md` and `economic-impact-of-climate-change.md` is valid Obsidian embed syntax. The checker resolves embeds by bare filename against the whole tree. These four render as literal text on the current site because `site/package.json` has no wiki-link remark plugin; Flowershow ships `@flowershow/remark-wiki-link`, so the migration fixes them with no content change. Leave them alone.

- [x] **Step 9: Commit**

`[tooling/2][m]: add structural checker for the target structure`

**Known pre-existing production breakage** (confirmed, for the record): the `<VegaLite>` chart on the home page is dead — no `_files/` directory is tracked anywhere — and the four Obsidian embeds above do not render. Everything else resolves through three tracked symlinks: `content/without-hot-air` → `../without-hot-air/src`, `site/public/img/without-hot-air` → `../../../without-hot-air/Images`, and `site/public/assets` → `../../assets`. Deleting `site/` in Task 3 removes the latter two, which is why Task 7's `/img/without-hot-air/…` → `/assets/…` rewrite across 389 references is load-bearing, not cosmetic.

---

### Task 2: House rules and the ledger

The Stop hook is deliberately NOT part of this task — see Task 5. Wiring a hard gate against a structure that does not exist yet would block every turn from here to Task 4.

**Files:**
- Create: `CLAUDE.md`, `docs/features.yaml`, `docs/review-queue.md`

**Interfaces:**
- Consumes: `scripts/verify.sh` from Task 1.
- Produces: `docs/features.yaml`, the ledger every later task updates.

- [x] **Step 1: Write `CLAUDE.md`**

The verify command, ledger location, commit convention, and the guard rails verbatim from Global Constraints above.

- [x] **Step 2: Write `docs/features.yaml`**

One entry per unit below, each `passes: false` initially, each with a `human: true` flag where a person is required:

`checker-baseline`, `stop-hook`, `site-teardown`, `content-flatten`, `notes-split`, `asset-normalisation`, `lfs-removal`, `chart-port`, `wikilink-conversion`, `climate-config`, `wha-repo-split`, `wha-config`, `chapter-redirects`, `wha-repo-create` (human), `flowershow-connect-climate` (human), `flowershow-connect-wha` (human), `dns-climate` (human), `dns-wha` (human), `live-smoke-check` (human).

- [x] **Step 3: Write `docs/review-queue.md`**

Empty with a header explaining what belongs here: judgement calls the checker must not pretend to grade.

- [x] **Step 4: Commit**

Commit: `[tooling/2][m]: add ledger, review queue and house rules`

---

### Task 3: Tear down the Next.js site

**Files:**
- Delete: `site/` (entire), `.github/workflows/main.yml`, `.gitattributes`
- Modify: `docs/features.yaml`

- [x] **Step 1: Tag the current state**

Run: `git tag pre-flowershow && git push origin pre-flowershow`
This is the only recovery path for `site/` other than history. Do it before deleting.

- [x] **Step 2: Record the two facts `site/` holds that must survive**

From `site/config/siteConfig.js`: analytics key `G-PV1VZND295`, title `Life Itself Climate Inquiry`. From `site/public/CNAME`: `climate.lifeitself.org`. These feed Task 11's `config.json`. Write them into `docs/features.yaml` under the `climate-config` entry as a `notes:` field so they cannot be lost.

- [x] **Step 3: Delete**

`git rm -r site .github/workflows/main.yml .gitattributes`

The `/sewtha/` redirects in `site/next.config.js` are deliberately dropped — 2021-era, six-month measure.

- [x] **Step 4: Verify and commit**

Run: `scripts/verify.sh` → exit 0. Mark `site-teardown` `passes: true`.
Commit: `[site/3][l]: remove next.js app, deploy to flowershow instead`

- [x] **Step 5: Delete the stale gh-pages branch**

`git push origin --delete gh-pages`. **Outward-facing** — this takes the current live site down, so it must happen only after the Flowershow site is confirmed live (Task 13). Leave `passes: false` and note the dependency; do not do it now.

---

### Task 4: Flatten content to the repo root

**Files:**
- Move: `content/*.md` → repo root
- Delete: the `content/without-hot-air` symlink, then `content/`
- Rename: `home.md` → `index.md`; `ipcc-special-report-1.5-degress-2018.md` → `ipcc-special-report-1.5-degrees-2018.md`

- [x] **Step 1: Remove the symlink first**

`git rm content/without-hot-air`. It points at `../without-hot-air/src`; leaving it would make the moves resolve strangely. WHA content is handled in Task 10 and is not moved to the root here.

- [x] **Step 2: Move each file with `git mv`**

Use `git mv` so history follows. `content/home.md` → `index.md`. Fix the `degress` → `degrees` typo in the same move.

- [x] **Step 3: Note the redirect debt created**

The typo fix changes a live URL. Add `/ipcc-special-report-1.5-degress-2018` → `/ipcc-special-report-1.5-degrees-2018` to the `climate-config` notes in `docs/features.yaml` so Task 11 picks it up.

- [x] **Step 4: Update every internal link that pointed into `content/`**

Run verify to find them. Expect `index.md`'s `[wha]: /without-hot-air/` reference definition and the site nav links.

- [x] **Step 5: Verify and commit**

Run: `scripts/verify.sh` → exit 0. Mark `content-flatten` `passes: true`.
Commit: `[content/3][l]: flatten content to repo root for flowershow`

---

### Task 5: Wire the hard gate

Runs **after** Task 4's flatten, when the checker can actually be green.

**Files:**
- Create: `.claude/settings.json`

- [x] **Step 1: Confirm the checker is green first**

Run: `scripts/verify.sh` → must exit 0. If it does not, fix the tree — never the checker.

- [x] **Step 2: Write `.claude/settings.json` with a `Stop` hook running `scripts/verify.sh`**

This is the gate `/goal` cannot argue its way past.

- [x] **Step 3: Mark `checker-baseline` and `stop-hook` `passes: true`, commit**

Commit: `[tooling/1][s]: wire verify.sh as a stop hook`

---

### Task 6: Split `notes.md` into one file per note

**Files:**
- Delete: `notes.md`
- Create: `meta-vs-specific-solutions-debates.md`, `techno-solutionism-and-mitigation.md`

`notes.md` holds two dated notes concatenated under `#` headings, both `2021-05-09`, one signed `~rufus`.

- [x] **Step 1: Create the first note**

Frontmatter `title` (the heading text, with the trailing date and `~rufus` stripped) and `created: 2021-05-09`. Body is the note text verbatim — do not rewrite the prose.

- [x] **Step 2: Create the second note**

Same treatment.

- [x] **Step 3: Delete `notes.md` and fix inbound links**

Run verify to catch anything pointing at `/notes`.

- [x] **Step 4: Add both splits to the review queue**

A split is a judgement call about where a note's meaning starts and stops. Add both to `docs/review-queue.md` for human confirmation. Do NOT gate on it.

- [x] **Step 5: Verify and commit**

Run: `scripts/verify.sh` → exit 0. Mark `notes-split` `passes: true`.
Commit: `[content/2][m]: split notes.md into one file per note`

---

### Task 7: Normalise assets and remove LFS

**Files:**
- Move: `assets/*` stays; `without-hot-air/Images/*` is left in place for Task 10
- Modify: every markdown file referencing an image

- [x] **Step 1: Recover the five LFS-pointered images**

**Confirmed state:** all five files in `assets/` are Git LFS *pointers*, both in the index and in the working tree, and `git-lfs` is not installed on this machine. They are also **broken in production** — `climate.lifeitself.org` serves a 131-byte pointer with `Content-Type: image/png`, because the 2021 workflow used `actions/checkout@v2.3.1` with no `lfs: true`. So this step fixes a live bug, it is not housekeeping.

The objects are still in GitHub's LFS storage and are retrievable without installing `git-lfs`. Verified recipe, per file:

```bash
oid=$(git show ":assets/<file>" | sed -n 's/^oid sha256://p')
size=$(git show ":assets/<file>" | sed -n 's/^size //p')
curl -s -X POST "https://github.com/life-itself/climate.git/info/lfs/objects/batch" \
  -u "rufuspollock:$(gh auth token)" \
  -H "Accept: application/vnd.git-lfs+json" \
  -H "Content-Type: application/vnd.git-lfs+json" \
  -d "{\"operation\":\"download\",\"transfers\":[\"basic\"],\"objects\":[{\"oid\":\"$oid\",\"size\":$size}]}"
```

Then GET the returned `actions.download.href` (pre-signed, expires in 1h) and write it over the pointer file. Verify the result: byte count matches `size`, and the file starts with the PNG magic number `\x89PNG`. Do not accept a download whose length disagrees with the pointer.

Install `git-lfs` and use `git lfs pull` instead if you prefer — but do not make it a prerequisite of `init.sh`, which must work on a machine without it.

- [x] **Step 2: Confirm the checker goes quiet**

`node scripts/check.mjs .` must stop reporting `is a Git LFS pointer`. The checker sniffs any file under 1KB for the pointer header, so a partial recovery cannot slip through.

- [x] **Step 3: Normalise every image reference to `/assets/<file>`**

The existing `assets/` filenames include spaces (`Pasted image 20220702193419.png`). Rename to kebab-case with `git mv` and update references — spaces in URLs are a persistent source of breakage.

- [x] **Step 4: Rewrite the 389 `/img/without-hot-air/...` references**

These currently resolve only through the `site/public/img/without-hot-air` symlink, which Task 3 deleted. Rewrite them to `/assets/<file>`; the figures move in Task 10 when the WHA repo is split, so in this repo the rewrite is limited to `without-hot-air.md`'s cover image.

- [x] **Step 5: Verify and commit**

Run: `scripts/verify.sh` → exit 0 with no LFS error. Mark `asset-normalisation` and `lfs-removal` `passes: true`.
Commit: `[assets/2][m]: normalise asset paths, drop git-lfs`

---

### Task 8: Restore the temperature chart

**Files:**
- Create: `assets/hadcrut5-global-annual.csv`
- Modify: `index.md`

- [x] **Step 1: Fetch the real data**

The original VegaLite spec read a HadCRUT5 global annual summary series. Download the current file from the Met Office HadCRUT5 dataset page. Record the source URL and access date in the CSV's sibling documentation — a chart with no provenance is worse than no chart.

- [x] **Step 2: Confirm the column names**

The old spec used `Time` and `Anomaly (deg C)`. Verify against the file actually downloaded; HadCRUT column headers have changed across releases. Use the real headers, not the remembered ones.

- [x] **Step 3: Replace the dead `<VegaLite>` block with the Flowershow component**

```jsx
<LineChart
  data={{ url: "/assets/hadcrut5-global-annual.csv" }}
  title="Global temperature anomaly"
  xAxis="Time"
  yAxis="Anomaly (deg C)"
/>
```

JSX works in plain `.md` in Flowershow — no `.mdx` rename needed.

- [x] **Step 4: Add to the review queue**

Whether the chart *renders correctly* cannot be checked locally — Flowershow builds it server-side. Add "confirm temperature chart renders" to `docs/review-queue.md`, to be checked during Task 13's smoke check.

- [x] **Step 5: Verify and commit**

Run: `scripts/verify.sh` → exit 0. Mark `chart-port` `passes: true`.
Commit: `[content/2][m]: restore temperature chart using flowershow LineChart`

---

### Task 9: Convert internal links to wikilinks

**Files:**
- Modify: every markdown file at the root

- [x] **Step 1: Convert `[text](/path/)` internal links to `[[slug|text]]`**

Only *internal* links. External `http(s)://` links stay as markdown links. Reference-style definitions (`[wha]: /without-hot-air/`) need converting too, or removing where the wikilink makes them redundant.

- [x] **Step 2: Verify and commit**

Run: `scripts/verify.sh` → exit 0. Every wikilink must resolve; this is the check that makes the conversion safe.
Commit: `[content/2][m]: convert internal links to wikilinks`

---

### Task 10: Split out the Without Hot Air repo

**Files:**
- Create: `../without-hot-air/` (a full clone, then refactored)
- Modify in the new repo: `extract.py`, `README.md`; create `index.md`, `config.json`, `CLAUDE.md`

Per the design: clone the whole repo with full history, then one refactor commit. No `filter-repo`, no history rewrite.

- [x] **Step 1: Clone**

`git clone . ../without-hot-air` then repoint `origin` to `git@github.com:life-itself/without-hot-air.git`. Do not create the GitHub repo yet — that is Task 12.

- [x] **Step 2: Promote `without-hot-air/src/*` to the root and delete everything else**

`git mv without-hot-air/src/*.md .`, `git mv without-hot-air/Images assets`, `git mv without-hot-air/extract.py .`, `git mv without-hot-air/without-hot-air.epub .`, then `git rm -r` the climate content, `docs/`, and the leftover `without-hot-air/` shell. Keep `scripts/` — the new repo needs the same checker.

- [x] **Step 3: Create `index.md` from the climate repo's `without-hot-air.md`**

Adapt: chapter links become root-relative wikilinks (`[[chap01]]` not `/without-hot-air/chap01`), the cover image points at `/assets/cover.jpg`, and the "get in touch" link `https://lifeitself.us/contact` is updated to the `lifeitself.org` domain (the `.us` → `.org` rename landed in commit `046bf5e`). Carry the license and credits sections over **verbatim**.

- [x] **Step 4: Fix `extract.py`'s output path**

It writes to `src/`; chapters now live at the root. Change the output directory so a regeneration lands correctly. This is the generator, so it gets fixed rather than its output being patched.

- [x] **Step 5: Rewrite the README for a standalone repo**

Keep the "Why this project", Sources, Credits and License sections verbatim. Update the Content section to the new layout and the developer instructions for the new `extract.py` path.

- [x] **Step 6: Write `config.json`**

```json
{
  "title": "Sustainable Energy — Without the Hot Air",
  "theme": "lessflowery",
  "showSidebar": true,
  "showToc": true,
  "contentExclude": ["/docs", "/scripts", "/README"]
}
```

- [x] **Step 7: Copy `CLAUDE.md` and the checker, then verify**

Run: `scripts/verify.sh` in `../without-hot-air` → exit 0. Every one of the 54 chapters' figure references must resolve against `assets/`; this is the check that proves the image move was complete.

- [x] **Step 8: Commit in the new repo**

`[repo/3][l]: refactor climate repo into standalone without-hot-air`

- [x] **Step 9: In the climate repo, replace `without-hot-air.md` with a stub**

A short page introducing the book and linking to `https://withouthotair.org`. Then `git rm -r without-hot-air/` — the source now lives in its own repo. Verify, then commit `[content/3][l]: split without-hot-air out to its own repo`. Mark `wha-repo-split` and `wha-config` `passes: true`.

---

### Task 11: Generate the chapter redirects

**Files:**
- Modify: `config.json` (climate repo), created here

- [x] **Step 1: Write the climate `config.json`**

Using the facts recorded in Task 3 Step 2 — analytics `G-PV1VZND295`, and the values from the design spec.

- [x] **Step 2: Generate one redirect per chapter**

For each markdown file at the root of `../without-hot-air`, emit:

```json
{ "from": "/without-hot-air/<slug>", "to": "https://withouthotair.org/<slug>", "permanent": true }
```

Cross-domain absolute targets are confirmed to work for custom-domain sites (`page.tsx:180` uses `r.to` verbatim). Add the `degress` → `degrees` typo redirect from Task 4 Step 3 as well.

- [x] **Step 3: Extend the checker to gate redirect completeness**

Add a test and a check: every chapter file in the sibling WHA repo has a matching redirect entry. If the sibling repo is absent, this check **skips with a warning** rather than failing — a checkout without the sibling must still reach green.

- [x] **Step 4: Verify and commit**

Run: `scripts/verify.sh` → exit 0. Mark `chapter-redirects` and `climate-config` `passes: true`.
Commit: `[config/2][m]: add flowershow config with chapter redirects`

---

### Task 12: Create and push the GitHub repo — HUMAN GATE

- [x] **Step 1: Confirm before creating**

`gh repo create life-itself/without-hot-air --public` is outward-facing and effectively irreversible in reputation terms. Ask before running it, even under an autonomous loop. The token has `repo` scope and the user is `admin` on `life-itself`, so it will succeed — which is exactly why it needs the gate.

- [x] **Step 2: Create and push**

Then `git push -u origin main` and push no tags.

- [x] **Step 3: Mark `wha-repo-create` `passes: true`**

---

### Task 13: Connect, point DNS, smoke check — HUMAN GATE

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
