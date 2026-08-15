Climate / without-hot-air

Last updated 2026-08-15. Both sites are live (climate.lifeitself.org,
withouthotair.org), all gates green. Content work is essentially done: 34
chapters revised, the `has-it-held-up` synthesis is live, a live KaTeX
rendering bug found and fixed (upstream issue filed). The open work from here
is almost entirely marketing/launch, tagged `[marketing]` below to keep it
scannable separately from dev/content items.

## Needs Rufus — nothing below this line can proceed without him

1. **[marketing] Read and react to the two launch-copy drafts** — neither is
   published anywhere:
   - `docs/announcement-draft-lifeitself.md` — full blog-length post for
     lifeitself.org (confirmed as the venue, not climate.lifeitself.org —
     "no one will read it there"). Needs a tone/length check.
   - `docs/announcement-draft-hn-reddit.md` — shorter HN titles (two options)
     + first comment, and a full Reddit self-post. `sharing.md`'s original
     advice to test both HN titles with a few trusted readers before picking
     one still stands.
2. **[marketing] Who posts, from which account** — for HN/Reddit specifically.
   Not agent-decidable: affects credibility and who fields "who are you"
   questions in the comments.
3. **[marketing] Launch date and order** — recommendation in `sharing.md` is
   lifeitself.org first (lower stakes), then Reddit a day or two before HN.
   No blocker left on the content side; this is purely a "when" decision now.
4. **The book plan's Phase 2 open questions**, still open: how prominently to
   disclose AI involvement in the book itself (separate from the launch-post
   AI-disclosure paragraph, which is drafted); whether the "Edit this page"
   link should feed a contributor's claim into `docs/audit.yaml` instead of a
   raw PR.

## Also happened, 2026-08-15 — dev/tooling, not marketing

Flowershow fixed the KaTeX dollar-sign bug (flowershow#1359) within hours by
disabling single-`$` math site-wide entirely, which had a side effect:
without-hot-air had 26 genuine LaTeX formulas across 5 technical chapters
(chap03, chapA, chapB, chapC, chapG) written with single `$`, and they all
silently stopped rendering the moment the upstream fix deployed —
`smoke.mjs` caught 3 of them within minutes. Converted all 26 to `$$...$$`,
verified live, and generalized `verify.sh`'s check accordingly (currency no
longer needs escaping; genuine single-`$` math is now the thing to catch).
Filed as a follow-up comment on the same issue so other Flowershow sites with
pre-existing single-`$` content don't discover this the hard way.

## Resolved this session, 2026-08-15 — no longer needs anyone

- **The 2021 HN link.** Traced the redirect chain directly: it already lands
  on withouthotair.org correctly. No DNS change needed — the old "flag for a
  human" note in `sharing.md` was based on not having actually checked.
- **The 2017 "second edition" effort.** Checked: dormant since three days
  after it started in April 2017, never produced a revised text. Not a
  collaborator to credit.
- **The human read-through gate.** Rufus read `/changes` on 2026-08-14 and
  confirmed it looks good — this had blocked scaling up further work and
  blocked drafting the launch copy; both are now unblocked.

## I can do without asking

- **[marketing]** Iterate on either launch-copy draft based on feedback, or
  draft variants (e.g. a shorter lifeitself.org version, if the current one
  reads too long).
- Continue the `docs/audit.yaml` sweep into the chapters left alone on
  2026-08-14 (chap05, 07, 08, 13, 15, chapC, chapH, acknowledgments) *if* a
  solid primary source turns up — same bar as every other revision here. Not
  chapK: its datedness is by design.
- Regenerate `changes.md` (`node scripts/changes-digest.mjs --markdown` in
  `without-hot-air`) any time more chapters get revised.
- Small tooling/generator fixes when something's actually broken — same "fix
  the generator" rule as everything else in this project.

## Explicitly NOT mine to do right now

**Actually posting anything** — to HN, Reddit, or lifeitself.org. Drafting
and iterating on copy is fine and expected; publishing it anywhere external
is a "needs Rufus" item every time, not a one-time gate that gets crossed.
