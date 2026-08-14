Climate / without-hot-air

Last updated 2026-08-14. Both sites are live (climate.lifeitself.org,
withouthotair.org), all gates green. Rufus read the 20 revised chapters via
`/changes` on 2026-08-14 and confirmed they looked good — the "don't scale up
further" hold from the previous version of this file is lifted.

## Needs Rufus — nothing below this line can proceed without him

1. **Read the new synthesis page: [withouthotair.org/has-it-held-up](https://withouthotair.org/has-it-held-up).**
   Built 2026-08-14 per Rufus's request for something beyond the mechanical
   `/changes` list — a narrative answer to "has the book held up?", themed by
   topic (solar, wind, cars/EVs, nuclear, fossil fuels/CCS, the energy plans,
   what he couldn't have seen coming), linking into the specific revised
   chapters as evidence. Built entirely from citations already gathered in
   `docs/audit.yaml` and the chapters' own "Updates, 2026" sections — no new
   research, so it should be checkable against material already reviewed.
   Not yet read by a human.
2. **`docs/sharing.md`** (in this repo) — a full draft launch plan, not a
   stub. Genuinely open, not agent-decidable: who posts and from which
   account; final launch timing; which subreddit(s) and posting order
   relative to HN; whether the AI-disclosure paragraph reads right or needs
   outside eyes; redirecting the 2021 HN link to withouthotair.org (a DNS
   change — flagged, not made); whether the 2017 "second edition" effort is
   still active and worth a mention.
3. **The book plan's Phase 2 open questions**, still open: how prominently to
   disclose AI involvement in the book itself (separate from the sharing-post
   question above); whether the "Edit this page" link should feed a
   contributor's claim into `docs/audit.yaml` instead of a raw PR.

## I can do without asking

- Continue the `docs/audit.yaml` sweep into the chapters left alone on
  2026-08-14 (chap05, 07, 08, 13, 15, chapC, chapH, acknowledgments) *if* a
  solid primary source turns up — same bar as every other revision here. Not
  chapK: its datedness is by design (it's explicitly a UK energy history
  chapter).
- Regenerate `changes.md` (`node scripts/changes-digest.mjs --markdown` in
  `without-hot-air`) any time more chapters get revised — mechanical, no
  judgement involved.
- Small tooling/generator fixes when something's actually broken (e.g. the
  `smoke.mjs` false-positive and the `visual.mjs` Chromium-path fix already
  done) — same "fix the generator" rule as everything else in this project.
- Pre-existing, unrelated `extract.py` bug noticed twice in passing: the
  `test_transform()` unit test expects an old `/img/without-hot-air/` image
  path that no longer matches current output — cosmetic, not blocking
  anything, fixable on request.

## Explicitly NOT mine to do right now

Anything under "Needs Rufus" above. In particular: don't treat a quiet
session as licence to draft `docs/sharing.md` or make the AI-disclosure call
— those are flagged as genuinely open, not agent-decidable, for a reason.
