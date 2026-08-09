---
title: Sharing
created: 2026-08-08
updated: 2026-08-09
status: draft plan
---

# Sharing

**Status: draft plan.** Turned from a stub into an actual plan on 2026-08-09,
once the update work this was gated on had something real to show. Still a
draft — the copy below is a starting point for editing, not something to post.
**Nothing in this document has been published anywhere.**

Two different jobs that keep getting conflated:

1. **Announcing what just changed** — the migration, the new dedicated site,
   this round of updates. Small, factual, aimed at people who already follow
   the work. A changelog entry.
2. **Sharing the work itself** — especially *Without the Hot Air*. Much
   bigger, aimed at people who have never heard of any of this. A launch.

They want different copy, different venues, and — importantly — **different
timing**.

## The prior evidence

The 2021 announcement did well:

| | |
|---|---|
| Post | [Sustainable Energy without the Hot Air (Revised, Community Edition)](https://news.ycombinator.com/item?id=29056343) |
| Date | 2021-10-31 |
| Result | **168 points, 133 comments** |
| Linked to | `climate.lifeitself.us/without-hot-air/` |

Reading that thread now: the comments weren't really about the 2021 site move
at all — they're a genuine, substantive argument about the book's *content*,
seven-plus years after publication. Commenters debated whether MacKay's
pessimism about storage still held (several said no — solar/wind/battery cost
curves have "fallen off a cliff" since 2008), whether nuclear's cost trajectory
had made his 2008 comparisons obsolete, and whether the real bottleneck had
shifted from generation to transmission. Multiple people were, in effect,
already doing informally what `docs/plans/2026-08-08-revising-the-book.md`
[in `without-hot-air`](https://github.com/life-itself/without-hot-air/blob/main/docs/plans/2026-08-08-revising-the-book.md)
now does formally and with citations. That's a strong signal: the appetite
isn't just for the book, it's specifically for someone to go through and
settle those arguments with sourced numbers.

For context, the book itself has been posted to HN repeatedly: [71 points in
2009](https://news.ycombinator.com/item?id=845446), and Chris Goodall's
["keeping it up to date" piece](https://news.ycombinator.com/item?id=14009057)
took **106 points in 2017**. That 2017 thread is worth a closer read too: at
least one commenter (`titojankowski`) reported having already started an
informal "second edition" effort — a GitHub repo and a Google Group for
volunteers — in direct response to the "someone should update this" appetite.
It's not clear from the thread alone whether that effort produced anything
lasting or is still active. Worth a quick check before launch: if it's still
around, it's either a natural ally to credit and loop in, or a reason to be
extra precise about how this project differs from a nine-year-old volunteer
effort that (as far as this document's author can tell) didn't ship a revised
text. If it fizzled, that's also useful: it's evidence that *starting* this is
easy and *finishing* it is the hard, credible part — which is exactly the
angle this project can claim.

So there is durable, recurring appetite for three overlapping things: the book
itself, the idea of updating it, and — per the 2021 thread's actual content —
the specific arguments about whether MacKay's 2008 numbers still hold. That is
a strong hand. It is also a hand you can only play well once every few years.

## Where things stand now

This section is the reason this document could become a plan instead of
staying a stub. As of 2026-08-09:

- **20 pages have been revised** under the `<del>`/`<ins>` + "Updates, 2026"
  mechanism described in `without-hot-air`'s `docs/plans/2026-08-08-revising-the-book.md`:
  solar (chap06, chapD), wind (chap04, chapB, chap10), cars/EVs (chap03,
  chapA), nuclear (chap24), fossil fuels (chap23), the five energy plans for
  Britain (chap27) and the world plans (chap30) — **fully re-derived, not just
  annotated, including a real substitute for "clean coal" now that it doesn't
  exist** — plus a further sweep of chap01, chap11, chap14, chap18, chap25,
  chap28, chap32, chapI, and author.md.
- Every change is visibly marked, dated, and cited to a primary source
  (IEA, IRENA, Lazard, DESNZ, IAEA, World Nuclear Association, and similar) —
  exactly the "show the sourcing" approach [without-hot-air#1](https://github.com/life-itself/without-hot-air/issues/1)
  says the launch depends on.
- **The human read-through has not happened.** Every one of those 20 pages
  shipped on an explicit "keep going, don't pause for review" instruction, and
  `docs/plans/2026-08-08-revising-the-book.md` has flagged the missing
  read-through as open at every single checkpoint since chapter 6 went live.
  This is now the single largest risk to a launch, not the amount of update
  work done.

**What this changes about the plan:** the old sequencing was "wait for the
update work, then launch." The update work is no longer the bottleneck — the
review is. Launching 20 AI-drafted pages of a well-loved, widely-cited book to
an audience that includes domain experts, without a single human read-through,
is a real risk: on the numbers (an audit or arithmetic slip lands in public,
in David MacKay's name, under a project with real reputational stakes), and
credibility-wise (the first HN comment to spot an unreviewed error undermines
"the sourcing is the whole game" as a defence).

## The strategic point

**Do not spend the launch on "we moved it to a new domain."**

A dedicated site is not, on its own, a story. "We went through MacKay's book
and brought the numbers up to date, with the arithmetic and the sources shown"
*is* a story — and it lands squarely on the appetite both the 2017 and 2021
threads demonstrated. The strongest version is both together: **new home + a
real, reviewed update in hand.**

Revised sequence:

1. Ship the site quietly (**done**, 2026-08-08)
2. Do the update work (**substantially done**, 2026-08-09 — see above)
3. **Read through the revised chapters as a reader, chapter by chapter** (not
   done — this is now the actual gate, not more update work)
4. Fix whatever the read-through finds
5. *Then* launch, with something to show *and* something that's been checked

The changelog entry (job 1) doesn't depend on any of this — it's factual and
low-stakes, and can go out once step 2 above is at a natural pause point (it
already is). Draft below.

## Job 1 — changelog entry

Follows the existing style in [`changelog.md`](/changelog) (newest first,
factual, links out rather than restating). Draft:

> ## 2026-08-09 — Recomputing the energy plans, and a wider sweep
>
> The five energy plans in chapter 27 (and the world plans in chapter 30) went
> from annotated to actually recomputed: "clean coal" is gone from every plan
> that leaned on it, because it doesn't exist at grid scale any more, and each
> plan now carries a real substitute worked through with visible arithmetic,
> not a footnote saying "this would need to change." A further nine pages —
> the UK's climate target, data centres, tidal power, the author bio, a couple
> of reference tables, and the closing chapter's headline "90% fossil fuels"
> figure — got the same `<del>`/`<ins>` treatment. 20 pages of the book now
> carry sourced, dated updates. [See what changed](https://withouthotair.org/chap27).

Where it lives: this repo's own `/changelog`, per the existing convention —
the open question about whether it should also go to the Life Itself blog is
still open (see below), but the changelog page itself doesn't need to wait for
that decision.

**Do not post this changelog entry to HN, Reddit, or anywhere else.** It's
written for people already watching the repo, not as an announcement.

## Job 2 — the real launch

### Recommended angle

Lead with the method, not the destination. A working title:

> **We went through "Without the Hot Air" and brought the numbers up to
> date — with the sourcing shown**

Or, closer to the 2021 thread's own energy (people were already arguing the
numbers in the comments):

> **David MacKay's "Without the Hot Air" (2008) said solar was 4x too
> expensive and clean coal would carry three of five UK energy plans. Neither
> is true any more — updated with sources, chapter by chapter**

The second is more specific and more likely to survive HN's skepticism,
because it makes a checkable claim rather than a vibe. Recommend testing both
with a few trusted early readers before deciding.

### Post body — draft skeleton

1. **One paragraph on what the book was and why it still matters** — MacKay's
   "no more hot air, only physics" method, and why fifteen-plus years on it's
   still the reference a lot of people learned to think about energy from.
2. **One paragraph on what's stale and why** — solar and wind costs collapsed,
   nuclear costs rose, coal-with-carbon-capture never happened at scale, EV
   batteries did what MacKay hoped they might. Not a criticism of MacKay —
   he was extrapolating from 2008 data as carefully as anyone could.
3. **One paragraph on the method** — every change is a visible `<del>`/`<ins>`
   against his original text, dated, and cited to a primary source (name the
   kind of sources: IEA, IRENA, Lazard, DESNZ, IAEA — not "AI research").
   Link to a specific worked example (the wind/nuclear/coal recompute in
   chapter 27 is the strongest one to point at — it shows the arithmetic
   changing, not just the answer).
4. **Direct, upfront answer to "how much of this is AI?"** — see below. Do not
   let this be a paragraph 6 admission after someone asks; put it in the post.
5. **A specific ask**: read a chapter, check a number, open a PR if something's
   wrong. The "Edit this page" link is the actual point of a community
   edition — say so.

### The AI-disclosure paragraph

[without-hot-air#1](https://github.com/life-itself/without-hot-air/issues/1)
already names this as the thing that decides whether AI involvement is an
asset or a liability: "asset if the method and sourcing are shown, liability
if it's a one-line mention." Draft language:

> The audit and the updates were done with AI (Claude), working from a
> published research ledger of every claim that looked stale, each one
> checked against a primary source before anything in the text changed. AI
> found candidates and fetched sources; it did not invent numbers, and
> nothing changed without a citation attached. You can see exactly what
> changed and why on every page — that's not a courtesy, it's the whole
> credibility model. If a source turns out to be wrong or a number's been
> misread, that's what the "Edit this page" link is for.

This should be true before it's published — which is exactly what the
read-through step above is for. Publishing this paragraph without having done
the read-through first is the single easiest way to turn this from an asset
into a liability, per the issue's own framing.

### Venues

- **HN primary**, as in 2021. `Show HN` is probably wrong (this isn't a tool
  or product); a plain submission with the title as the story is closer to
  what worked for both the 2021 and 2017 posts.
- **Reddit**: the original also went to Reddit, per `without-hot-air#2`, but
  which subreddit isn't recorded anywhere accessible from this session.
  Candidates worth considering: r/energy, r/climate, r/environment, and
  possibly r/dataisbeautiful if a specific before/after chart is prepared
  (the wind or nuclear capacity-factor recompute would make a clean one).
  Recommend testing copy on one lower-stakes venue first, per the open
  question below — Reddit itself, posted a day or two before HN, is a
  reasonable low-risk test bed, since a quiet Reddit post doesn't burn the HN
  attempt if the copy needs work.
- **Not recommended for this round**: Twitter/X or LinkedIn as a primary
  venue — the 2021 and 2017 evidence is specifically about HN/Reddit-shaped
  audiences (technical, numerate, willing to argue specifics), and that's
  exactly the crowd this update is built to survive scrutiny from.

### The 2021 HN link

**Recommendation: redirect it.** The 2021 post links to
`climate.lifeitself.us/without-hot-air/`, which now resolves to this repo's
project write-up rather than the book. Anyone who follows that old link today
is looking for the book, not a write-up about a site migration — redirecting
straight to `withouthotair.org` serves that reader better than an explainer
page they have to click through. This is a DNS/redirect change, which
`CLAUDE.md`'s house rules flag as needing a human regardless of how low-risk
it looks — flagging here rather than doing it.

### Who posts

Not this document's call. Whoever's HN/Reddit account carries this matters for
both credibility (an established account reads differently from a brand-new
one) and who fields the inevitable "are you the author" / "who are you"
questions in the comments. Rufus's own call.

### Timing

**Not yet.** The update work is far enough along to launch on; the
read-through isn't done. Recommend: complete the chapter-by-chapter
read-through first (see "Where things stand now" above), fix what it finds,
*then* pick a launch date. Once ready, there's no strong reason to wait for a
particular day — the 2021 post went out on a Sunday and did fine — but
avoiding major news-cycle competition (big tech launches, major climate
summits dominating the news that week) is worth a quick calendar check before
posting.

## Open questions — resolved or still open

- ~~Where should the 2021 HN link land?~~ **Resolved above: redirect to
  withouthotair.org.** (Still needs a human to actually make the DNS/redirect
  change.)
- **What venue beyond HN?** Narrowed above to Reddit (specific subs listed) as
  a pre-test venue. Still open: final choice of which subreddit(s), and exact
  posting order/timing between them and HN.
- **Does the changelog live on the climate site or the Life Itself blog?**
  Still open. The climate site's `/changelog` costs nothing and is already
  the convention (this document assumes it lives there); syndicating to the
  Life Itself blog as well is a separate, larger-reach decision that doesn't
  block the changelog entry itself.
- **Who is the audience for the update?** This document assumes both: people
  who already know the book (the "here's what changed" framing serves them)
  and people who don't (the "here's the best book on energy, and it's current
  again" framing serves them). The draft post above tries to serve both by
  leading with why the book matters before getting to what changed — worth
  testing whether that's actually landing with early readers, rather than
  assuming it.
- **How honest to be about AI involvement?** Resolved as "very, and upfront"
  above, with draft language. Still open: whether that draft paragraph is
  right, or too defensive, or not defensive enough — needs a few outside
  readers' reactions before it's final.
- **New: who posts, from which account.** Not addressed in the original stub;
  added above. Rufus's call.
- **New: is the 2017 "second edition" effort (`titojankowski`'s GitHub repo /
  Google Group) still around?** Worth a quick check before launch — either a
  natural collaborator to credit, or useful contrast ("others started this and
  it didn't ship; here's a finished, sourced pass").

## Related issues

- Announce + changelog: this repo, #42
- Relaunching the book: [without-hot-air#2](https://github.com/life-itself/without-hot-air/issues/2)
- The update work that earns the relaunch: [without-hot-air#1](https://github.com/life-itself/without-hot-air/issues/1)
- The read-through this plan is now gated on: tracked in `without-hot-air`'s
  `docs/plans/2026-08-08-revising-the-book.md`, Phase 3
