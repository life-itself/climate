---
title: Climate Knowledge Base — Design
created: 2026-08-07
author: Rufus Pollock
status: approved
---

# Climate Knowledge Base — Design

Convert `life-itself/climate` from a bespoke Next.js site into a flat markdown
knowledge base published by Flowershow, and split *Sustainable Energy — Without
the Hot Air* out into its own repo and site at `withouthotair.org`.

Portfolio entry: `~/src/me/planning/projects/2026-climate-knowledge-base.md`.

## Goals

1. `climate.lifeitself.org` publishes from plain markdown via Flowershow cloud —
   no application code in the repo.
2. `content/` is restructured as a classic flat knowledge base: one level,
   wikilinks, light frontmatter.
3. Without Hot Air lives in `life-itself/without-hot-air` and publishes its own
   site at `withouthotair.org`.
4. No existing published URL breaks without a redirect.

## Non-goals

- Revising or updating the Without Hot Air text itself. The split is
  infrastructural; content revision is later work.
- Writing new climate content. Restructuring only, beyond fixing what is
  already broken.
- The reusable "standard KB repo patterns" write-up. Tracked separately as
  `~/src/me/planning/ideas/knowledge-base-repo-patterns.md`.

## Starting state

- `site/` — Next.js + Tailwind + MDX app, deployed by `.github/workflows/main.yml`
  (Node 14, `next build && next export`) to gh-pages. CNAME `climate.lifeitself.org`.
- `content/` — 10 markdown pages, plus `content/without-hot-air` as a **symlink**
  to `../without-hot-air/src`.
- `without-hot-air/` — 54 markdown files in `src/`, 384 figures in `Images/`,
  an 8.9MB source epub, and `extract.py` which generates `src/` from the epub.
- `.gitattributes` puts `*.png` in Git LFS; the book's `.gif` figures are not.

### Known-broken things this design fixes

- `content/home.md` embeds `<VegaLite spec={...} />` reading
  `_files/HadCRUT.5.0.1.0.analysis.summary_series.global.annual.csv`, which does
  not exist in the repo. The chart is already dead in production.
- `content/without-hot-air.md` references `/img/without-hot-air/cover.jpg`;
  no `img/` directory exists. Figures live at `without-hot-air/Images/`.
- `ipcc-special-report-1.5-degress-2018.md` — "degress" typo in the filename,
  and therefore in the published URL.

## Decisions

| # | Decision |
|---|---|
| 1 | Publish both sites via **Flowershow cloud** synced from GitHub |
| 2 | Custom domains available on the existing plan |
| 3 | Publish root = **repo root** (content flattened out of `content/`) |
| 4 | Home page is `index.md` (takes precedence over `README.md`) |
| 5 | Delete `site/`, but tag `pre-flowershow` first |
| 6 | Drop the 2021 `/sewtha/` redirects |
| 7 | New repo is `life-itself/without-hot-air` |
| 8 | Clone whole repo with full history, then one refactor commit — no history rewrite |
| 9 | `withouthotair.org` registered via Cloudflare |
| 10 | Legacy chapter URLs handled by Flowershow's redirect system |
| 11 | Keep `without-hot-air.epub` and `extract.py` as provenance |
| 12 | Normalise images to `assets/`; **no LFS** anywhere |
| 13 | Port the dead VegaLite chart to Flowershow `<LineChart>` and supply the CSV |
| 14 | Split `notes.md` into one file per note |
| 15 | Flat one level, wikilinks, light frontmatter |
| 16 | Stop and report after 3 identical consecutive failures |
| 17 | Theme `lessflowery` on both sites |

## Target: `life-itself/climate`

```
index.md                                   ← content/home.md
actions.md
carbon-capture.md
carbon-footprint-calculators.md
carbon-pricing.md
economic-impact-of-climate-change.md
ev-vs-ice.md
ipcc-special-report-1.5-degrees-2018.md    ← typo fixed, old URL redirected
meta-vs-specific-solutions-debates.md      ← split from notes.md
techno-solutionism-and-mitigation.md       ← split from notes.md
without-hot-air.md                         ← stub pointing at withouthotair.org
assets/                                    ← images + chart CSVs, no LFS
config.json
README.md                                  ← repo readme, excluded from publish
CLAUDE.md
docs/
  superpowers/specs/                       ← this file
  plans/                                   ← implementation plan
  features.yaml                            ← the loop ledger
  review-queue.md                          ← judgement-graded items for human review
scripts/
  init.sh
  verify.sh
.claude/settings.json                      ← Stop hook
```

Removed: `site/`, `content/`, `without-hot-air/`, `.github/workflows/main.yml`,
`.gitattributes`, the gh-pages branch.

### Frontmatter convention

Light. `title` always; `created` where known; `description` and `tags` only when
they add something. Nothing else.

### `config.json`

```json
{
  "title": "Life Itself Climate",
  "description": "Life Itself's ongoing inquiry into the climate crisis",
  "theme": "lessflowery",
  "showSidebar": true,
  "showToc": true,
  "showBacklinks": true,
  "analytics": "G-PV1VZND295",
  "contentExclude": ["/docs", "/scripts", "/README"],
  "redirects": [ "… see Redirects below …" ]
}
```

## Target: `life-itself/without-hot-air`

```
index.md                       ← content/without-hot-air.md, adapted
preface.md
chap01.md … chap32.md
chapA.md … chapK.md
partIV.md  charts.md
acknowledgments.md  bibliography.md  author.md
assets/                        ← 384 figures, paths normalised, no LFS
without-hot-air.epub
extract.py
config.json
README.md                      ← excluded from publish
CLAUDE.md
```

Chapter URLs become `withouthotair.org/chap01` (today:
`climate.lifeitself.org/without-hot-air/chap01`).

`extract.py` currently writes to `src/`. Since chapters now live at the repo
root, the script's output path must be updated so regenerating from the epub
still lands in the right place — the fix goes in the generator, not its output.

Licensing must survive the move intact: MacKay's original text is CC
BY-NC-SA 2.0 UK, additions are dual-licensed. The README's license section and
credits (MacKay, Tito Jankowski) carry over verbatim.

## Redirects

Two classes of legacy URL on `climate.lifeitself.org`:

1. `/without-hot-air/` — stays as a real stub page on the climate site
   introducing the book and linking to the new site. No redirect needed.
2. `/without-hot-air/<chapter>` — 54 URLs that must reach the new site.
3. `/ipcc-special-report-1.5-degress-2018` → the corrected spelling. Same-site,
   unambiguous.

Flowershow redirects are **client-side and exact-match only** — no globs — so
the chapter redirects are 54 generated entries. `verify.sh` checks the generated
list against the actual chapter file list so it cannot silently drift.

**Open risk.** The `redirects` reference documents `to` as *a path starting with
`/`*. Cross-domain targets may not be supported. This is tested before the
chapter redirects are generated:

- **If absolute URLs work** — 54 entries pointing at
  `https://withouthotair.org/<chapter>`.
- **If they do not** — 54 minimal stub pages under `without-hot-air/` on the
  climate site, each linking to its counterpart. Ugly but honest, and it keeps
  the flat-one-level rule intact everywhere else (this is the one permitted
  exception, and it is machine-generated).

The old `/sewtha/` redirects are dropped — they date from 2021 and were a
six-month measure.

## Loop harness

### `scripts/init.sh`

Bring a cold checkout to green: Node 22 via the system toolchain, install the
checker dependencies, run `verify.sh`. Must exit 0 on a fresh clone so a loop
can distinguish its own breakage from pre-existing breakage.

### `scripts/verify.sh` — structural gates only

Exit non-zero on any of:

1. A markdown file whose frontmatter fails to parse.
2. A wikilink or relative link that resolves to nothing.
3. An `![...](...)` image reference with no file on disk.
4. Any reference to `site/`, `content/`, or `_files/` — paths this migration deletes.
5. A missing `index.md` at a publish root.
6. A `config.json` that is not valid JSON, or whose `redirects` list does not
   cover every chapter file.
7. A Git LFS pointer file anywhere in the tree.
8. An orphaned asset — a file in `assets/` referenced by nothing. Reported as a
   warning, not a failure; deleting someone's image on a heuristic is worse than
   carrying it.

### What is deliberately *not* a gate

Judgement-graded work goes to `docs/review-queue.md` for human review: whether
the KB reads coherently, whether the WHA site looks elegant, whether a note's
split preserved its meaning, whether prose from 2021 still stands. Per the
loop-engineering preconditions, a probability must not be laundered into a
boolean.

The live sites are built server-side by Flowershow after a push, so an HTTP
smoke check cannot gate a turn. It runs as a separate human-triggered step once
DNS is live.

### Guard rails (`CLAUDE.md`)

- Never weaken or delete a check to make it pass. If something cannot meet the
  gate, mark it `passes: false` and record why.
- Never edit `docs/features.yaml` to self-certify.
- Never rewrite or force-push `main`.
- Fixes go in the generator, never in generated output — `extract.py` is fixed
  and re-run, chapter markdown is not hand-patched.
- Stop and report after 3 identical consecutive failures.

### `docs/features.yaml`

One entry per migration unit with an explicit `passes: true/false`, covering:
the tag and `site/` teardown, each content move, the notes split, the chart
port, asset normalisation, LFS removal, both `config.json` files, the WHA repo
split, the redirect generation, and each publish connection.

## Steps requiring a human

The loop cannot do these; they are marked as such in the ledger:

1. Register `withouthotair.org` (in progress).
2. Create the GitHub repo and push (outward-facing; confirm before it is public).
3. Connect both repos as Flowershow sites in the dashboard.
4. Set DNS records for both domains.
5. Run the live-site HTTP smoke check once DNS resolves.

## Verification of done

- `scripts/verify.sh` exits 0.
- Every `docs/features.yaml` entry has `passes: true`, or `passes: false` with a
  recorded reason and an entry in the review queue.
- Both sites resolve over HTTPS, home pages render, one deep page per site
  returns 200 with expected text, and a sample of legacy chapter URLs lands on
  the new site.
