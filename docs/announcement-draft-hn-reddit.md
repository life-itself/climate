---
title: Draft — HN / Reddit launch copy
status: draft, not published anywhere
created: 2026-08-15
---

**Not published anywhere.** Job 2's second piece of copy, per
`docs/sharing.md` — shorter and sharper than `announcement-draft-lifeitself.md`,
for a technical audience that will argue specifics in the comments. Needs
Rufus's read before either goes anywhere, and needs a decision on **who
posts, from which account** (still open in `docs/sharing.md`).

---

## Hacker News

HN link posts are just a title + URL — no post body renders. The "copy" here
is the title, plus an optional first comment (common practice for
author-submitted links, and the fastest way to get the AI-disclosure answer
in front of readers before anyone has to ask for it in a reply).

**Submit as a link post** (not Show HN — this isn't a tool/product) to
`https://withouthotair.org/has-it-held-up`, not the bare homepage — it's the
page that actually makes the specific, checkable claim a title can promise.

### Title — recommended

> David MacKay's climate physics book said solar was 4x too expensive. It's now cheaper than gas.

Specific, checkable, matches the 2021 thread's own energy (commenters were
already arguing exactly this point in the comments back then). Under HN's
~80-character comfort zone.

### Title — alternative

> We went through David MacKay's "Without the Hot Air" and updated the numbers, with sources

Safer, more descriptive, less likely to read as clickbait to a skeptical
crowd — but less likely to stop the scroll. `sharing.md` recommends testing
both with a few trusted early readers before deciding; that's still the right
call, this is just laying out the two live options.

### Suggested first comment (post immediately after submitting)

> Author here. David MacKay's *Sustainable Energy — Without the Hot Air*
> (2008) is the book a lot of us learned to think about energy in physical
> units from. He died in 2016, so it's been frozen at 2008 numbers ever
> since — which mattered less in 2008 and matters a lot now, given how far
> solar/wind/battery costs have moved since.
>
> We put the original text (unchanged) into a public repo and went through
> it chapter by chapter, updating what's dated with a primary source for
> every change — visible `<del>`/`<ins>` against his original sentence, never
> a silent correction. 34 of 54 chapters now carry updates.
>
> The AI-disclosure question, upfront since it'll come up: the audit and the
> updates were done with Claude, from a research ledger of every claim that
> looked stale, each checked against a source before the text changed. It
> found candidates and fetched citations; it didn't invent numbers. You can
> see the sourcing on every page that changed.
>
> The synthesis of what actually changed: https://withouthotair.org/has-it-held-up
> Every individual edit: https://withouthotair.org/changes
> Source: https://github.com/life-itself/without-hot-air

## Reddit

Self-post (title + body), not a bare link — Reddit's format tolerates more
context than HN's. **Post 1–2 days before HN**, per `sharing.md`'s
low-risk-test-first reasoning: a quiet Reddit post doesn't burn the HN
attempt if the copy needs work.

**Subreddit: r/energy** as the primary candidate — most numerate,
least likely to turn this into a nuclear-vs-renewables flame war before
anyone's read past the title. r/climate and r/environment are secondary
options if r/energy doesn't land; sharing.md's r/dataisbeautiful idea would
need a specific chart prepared first (the wind or nuclear capacity-factor
recompute is the natural candidate) and isn't ready.

### Title

> David MacKay's "Without the Hot Air" (2008) was the physics-first case against renewable hype. 18 years on, we checked whether it held up.

### Body

> *Sustainable Energy — Without the Hot Air* (David MacKay, 2008) did the
> thing almost nobody writing about energy does: real arithmetic, in
> comparable units, person by person. It's the book a lot of people in this
> sub probably learned to think about energy from.
>
> MacKay died in 2016. The book's numbers are frozen at 2008 — which is a
> strange year to freeze, because solar was a novelty then and is now the
> cheapest electricity in history.
>
> We (a small open project, not affiliated with MacKay's estate or
> publisher) went through it chapter by chapter and updated what's actually
> dated, with a primary source for every change, shown as visible
> strikethrough-original / inserted-update markup against his text — never a
> silent correction. 34 of 54 chapters now carry updates.
>
> The short version of what we found: solar is the single biggest miss in
> the book (world capacity up ~180x, now cheaper than new gas, not 4x
> pricier). Wind followed a similar curve. His bet that lithium-ion batteries
> had "solved" the EV range problem was correct, fifteen years early. Nuclear's
> safety and fuel-resource case held up; its cost case against wind reversed.
> "Clean coal" — a real component of three of his five UK energy plans — never
> happened at grid scale, so we recomputed those plans without it rather than
> just flagging it as stale.
>
> Full writeup: https://withouthotair.org/has-it-held-up
> The book itself, updated: https://withouthotair.org
> Every individual edit, chapter by chapter: https://withouthotair.org/changes
>
> How much of this is AI, since it'll come up: the audit and updates were
> done with Claude, from a published research ledger, each claim checked
> against a source before anything changed. It found candidates and sources;
> it didn't invent numbers. Sourcing is shown on every page — if something's
> wrong, "Edit this page" opens a PR in two clicks.
