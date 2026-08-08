---
title: Review Queue
created: 2026-08-07
---

# Review Queue

Things that need a human's judgement. **Nothing here is a gate.**

`scripts/verify.sh` checks what is machine-decidable — does this link resolve,
does this file exist, does this parse. Whether a page reads well, whether a note
split preserved its meaning, whether a site looks right: those are judgement
calls, and turning a judgement call into a boolean just launders a probability
into a green tick.

So they come here instead, and get resolved in conversation.

## Format

```
- [ ] <what to look at> — <why it needs a person> (task N)
```

## Open

- [ ] **The two note splits** (task 6) — `notes.md` became
      `meta-vs-specific-solutions-debates.md` and
      `techno-solutionism-and-mitigation.md`. Both headings carried a trailing
      `2021-05-09` and the first carried `~rufus`; I moved the date into
      `created:` frontmatter and dropped the `~rufus` attribution, since the
      whole repo is yours. Filenames are my invention — the original headings
      were too long to use verbatim. Body prose is untouched, typos included
      ("somthing", "discusison"). Check the names and whether you want the typos
      fixed.
- [ ] **The temperature chart** (task 8) — it was rendering as nothing, because
      the page lacked `syntaxMode: mdx` and `<LineChart>` was parsed as text.
      Now fixed: the page compiles to `_jsx(LineChart, {...})`. The CSV serves
      (200, `text/csv`, 7022 bytes). It still hydrates client-side, so whether
      it actually *draws* needs a human with a browser — if it comes up empty,
      suspect the column name `Anomaly (deg C)`.
- [ ] **Home page tab title reads twice**: "Life Itself Climate Inquiry | Life
      Itself Climate Inquiry 🌍🔥", because the page title and the site-wide
      suffix are the same string. Subpages are fine ("Carbon Pricing | Life
      Itself Climate Inquiry 🌍🔥"). Left alone because the frontmatter `title`
      is also what feeds the hero heading, and the hero matters more than the
      duplication. Fixable by moving the hero title to an `# H1` instead.
- [ ] **Overall coherence of the flattened knowledge base** (task 13) — the
      checker proves every link resolves, not that the structure makes sense.
- [ ] **Both sites' appearance** under the `lessflowery` theme (task 13).
- [ ] **The footer is not a faithful reproduction.** The old one was the Life
      Itself logo under the words "A Project of". Flowershow's `footer` takes
      link groups only — no image slot — so it is now a text link to
      lifeitself.org. The logo SVG was deliberately not carried over: nothing
      would reference it, and an unreferenced asset trips the orphan warning.
      It remains recoverable at `git show pre-flowershow:site/public/life-itself-logo.svg`.
      Options if you want the logo back: put it in the navbar via the `logo`
      config field, or leave the footer as text.
- [ ] **The old footer linked to vercel.com** — a leftover from
      `create-next-app`, so "A Project of Life Itself" sent people to Vercel.
      Now points at lifeitself.org. Flagging in case that was somehow deliberate.
- [ ] **Whether the 2021-era prose still stands** — the home page argues from a
      "as of 2021, we are not following that pathway" framing and cites a 2018
      carbon budget. Five years on this needs either updating or an explicit
      dated caveat. This is the largest piece of genuine content work the
      migration surfaces, and it is out of scope for the migration itself.

## Resolved

- [x] **The temperature chart.** Was rendering as nothing: the page lacked
      `syntaxMode: mdx`, so `<LineChart>` was parsed as text. Fixed 2026-08-08
      and confirmed drawing.
- [x] **Chatwoot live-chat widget — retired** (#40). Gone with `site/`; neither
      live site serves it. The website token remains in git history at tag
      `pre-flowershow`, so it should be revoked in Chatwoot.
- [x] **`withouthotair.org` DNS** (#41). Was on Cloudflare proxy addresses
      (`188.114.96.2`/`188.114.97.2`); now resolves to Vercel
      (`216.150.16.193`/`216.150.1.193`) with clean certificate verification.
      This was the cause of the SSL trouble during setup.
