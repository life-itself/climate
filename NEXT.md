Climate / without-hot-air

Last updated 2026-08-09. Both sites are live (climate.lifeitself.org,
withouthotair.org), all gates green. The book-revision work is far ahead of
where this file used to say — see below, not the old text.

## Needs Rufus — nothing below this line can proceed without him

1. **Read the 20 revised chapters.** This is the actual blocker — repeated
   throughout `without-hot-air/docs/plans/2026-08-08-revising-the-book.md`
   and still not done. Fastest way in: `withouthotair.org/changes` — one page,
   every edit, grouped by chapter, links out to read any of them in full.
   Chapter 27 (the energy plans) got the most invasive treatment — a real
   recompute, not just annotation — and is worth the closest look.
2. **`docs/sharing.md`** (in this repo) — a full draft launch plan, not a
   stub. Genuinely open, not agent-decidable: who posts and from which
   account; final launch timing (recommends after #1, not before); which
   subreddit(s) and posting order relative to HN; whether the AI-disclosure
   paragraph reads right or needs outside eyes; redirecting the 2021 HN link
   to withouthotair.org (a DNS change — flagged, not made); whether the 2017
   "second edition" effort is still active and worth a mention.
3. **The book plan's Phase 2 open questions**, still open: how prominently to
   disclose AI involvement in the book itself (separate from the sharing-post
   question above); whether the "Edit this page" link should feed a
   contributor's claim into `docs/audit.yaml` instead of a raw PR.

## I can do without asking

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

Revising the remaining ~30-odd lower-priority chapters in `docs/audit.yaml`.
Technically I could — but the plan's own repeated instruction is to read
what's already live *before* scaling up further, not add more unreviewed
chapters on top of 20 that haven't been looked at yet. Don't ask me to keep
going on more chapters until #1 above has happened.
