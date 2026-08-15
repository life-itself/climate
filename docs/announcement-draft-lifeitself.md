---
title: Draft — lifeitself.org announcement post
status: draft, not published anywhere
created: 2026-08-15
---

**Not published anywhere.** Working draft for lifeitself.org, per
`docs/sharing.md`'s Job 2. Written for a general research/futures audience,
not the more technical HN/Reddit crowd — that copy should be a shorter,
sharper derivative of this, not this post verbatim. First person singular
throughout (Rufus's own voice) — switch to "we" if that reads better for a
Life Itself byline.

---

## Has "Without the Hot Air" held up?

In 2008, a Cambridge physicist named David MacKay sat down and did something
almost nobody writing about energy did: the actual arithmetic. Not "renewables
are the future" or "nuclear is too dangerous" — numbers, in comparable units,
person by person, watt by watt. *Sustainable Energy — Without the Hot Air*
became the book people who wanted to think clearly about energy read first. I
still recommend it to almost everyone who asks me where to start.

MacKay died in 2016. The book he left behind is frozen at 2008 — which is a
problem, because 2008 was a genuinely strange moment to freeze a book about
energy costs. Solar was a novelty. The world's entire installed solar capacity
could have fit inside what a single UK-sized country would need. Electric
cars were a footnote. "Clean coal" was a real plan, not a phrase nobody uses
any more.

Eighteen years on, we went back through it — chapter by chapter, claim by
claim — and asked: does this still hold up?

### What we did

We call it a **community edition**: MacKay's original 2008 text, completely
unchanged, published as open markdown at
[withouthotair.org](https://withouthotair.org) so it can finally be corrected
and updated the way any living reference should be. 34 of its 54 chapters now
carry visible, dated updates — never a silent correction. You'll see his
original sentence struck through and the current figure inserted next to it,
every single time, with a citation you can click through to a primary source
(IEA, IRENA, Lazard, DESNZ, IAEA, and others — not "trust us").

The deepest piece of it is chapter 27, MacKay's five energy plans for Britain.
We didn't just flag which numbers had moved — we recomputed the plans. "Clean
coal" is gone from every plan that leaned on it, because retrofitted coal
carbon capture never happened at grid scale and Britain doesn't have any coal
power stations left to retrofit anyway. Its capacity is reallocated to wind
and solar, with the arithmetic shown, not asserted.

### So — has it held up?

Mostly the *method* has, and a fair number of the *numbers* haven't. We wrote
up the full picture here: **[Has It Held Up?](https://withouthotair.org/has-it-held-up)**

The short version: solar is the single biggest miss in the book — world solar
capacity is up roughly 180-fold since MacKay wrote it off as implausible at
scale, and utility-scale solar is now *cheaper* than new gas generation, not
four times the market rate. Wind followed the same curve, one order of
magnitude smaller. MacKay's most confident forward-looking bet — that
lithium-ion batteries had solved the electric-car range problem — reads today
as a correct call made fifteen years early. Nuclear's physics case (safety,
fuel abundance) held up or strengthened; its cost case against wind reversed
completely. And his skepticism of "clean coal" as a real 2050 plan input, which
some readers found needlessly harsh in 2008, aged about as well as skepticism
can.

None of that is a knock on MacKay. He was extrapolating from the best data
anyone had in 2008, as carefully as anyone could have. The interesting finding
isn't that he was wrong about some things — it's *which* things, and it maps
almost exactly onto the split between physics (which doesn't date) and
economics (which, it turns out, moved faster than anyone's 2008 forecast,
MacKay's included).

### How much of this is AI

Directly, because this is exactly the kind of claim that deserves an upfront
answer rather than a footnote: the audit and the updates were done with AI
(Claude), working from a published research ledger of every claim in the book
that looked like it might have dated. Each one was checked against a primary
source before a single word of the text changed. The AI's job was to find
candidates and fetch sources — not to invent numbers, and nothing changed
without a citation attached. You can see exactly what changed, and why, and
where the number came from, on every page that carries an update. That's not
a courtesy footnote; it's the whole credibility model this project depends on.
If a source turns out to be wrong, or a number's been misread, the "Edit this
page" link at the bottom of every chapter is there for exactly that.

### The ask

Read a chapter you know something about. Check a number. If something's off,
"Edit this page" opens the source on GitHub, two clicks from a pull request.
The point of a *community* edition is that it's never really finished — that's
also, not coincidentally, the whole argument MacKay was making about energy
plans themselves: track the numbers, don't get attached to an answer.

- The book: [withouthotair.org](https://withouthotair.org)
- The synthesis: [Has It Held Up?](https://withouthotair.org/has-it-held-up)
- Every edit, chapter by chapter: [withouthotair.org/changes](https://withouthotair.org/changes)
- The source: [github.com/life-itself/without-hot-air](https://github.com/life-itself/without-hot-air)
