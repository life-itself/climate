---
title: Handoff
created: 2026-08-08
---

# Working here without supervision

What it takes to hand a chunk of work to an agent and walk away. Written after
the August 2026 migration, which was *mostly* autonomous and where the
interruptions were informative.

## The gap that mattered

Every bug that reached production during that migration had the same shape:

| Bug | Caught by |
|---|---|
| Temperature chart rendered as nothing (`syntaxMode`) | Rufus opening the page |
| Chapter titles reading `chap03`, `chap04` | Rufus looking at the sidebar |
| Raw `<span class="smallfont">` in the navigation | Rufus's screenshot |
| Maths rendering as literal LaTeX | Rufus suspecting it |

None were caught by `verify.sh`, and none *could* have been: it checks that the
repository is structurally sound, which every one of those pages was. **The
failure was always in rendering, and nothing was looking at the rendered page.**

That is now closed by `scripts/smoke.mjs` and `scripts/visual.mjs`.

## The three gates

**`scripts/verify.sh`** — offline, fast, no network. Frontmatter parses, links
and embeds resolve, referenced files exist, config is valid JSON, no LFS
pointers, redirects land somewhere real. Wired as a Stop hook, so a turn cannot
end while it is red.

**`scripts/smoke.mjs`** — against the deployed site, driven by `smoke.json`.
Status codes, redirect targets, expected text, asset size and file signature —
and a check for **source syntax surviving into the rendered page**, which is the
common symptom of the whole bug class above. A component that did not mount
appears as its own markup; unrendered LaTeX appears as backslash commands; a
failed embed appears as `[[brackets]]`; an unfetched LFS object appears as
pointer text.

**`scripts/visual.mjs`** — loads pages in headless chromium, driven by
`visual.json`. Asserts that elements actually rendered *after JavaScript ran*,
that expected text is in `document.body.innerText` (so hidden nav duplicates
don't count), that no image decoded to zero width, and that the console is
clean. `SCREENSHOTS=1` also writes full-page screenshots for a human to glance
at.

This is the only gate that can see the difference between "the markup is
correct" and "the reader sees a chart". The temperature chart is the case in
point: correct markup, CSV served, valid HTML — and nothing drawn, because the
component never mounted.

Neither of the last two belongs in the Stop hook: they need network and would
fail spuriously mid-deploy.

```bash
scripts/verify.sh                    # before committing        (offline)
node scripts/smoke.mjs               # after a deploy settles   (HTTP)
node scripts/visual.mjs              # after a deploy settles   (browser)
SCREENSHOTS=1 node scripts/visual.mjs   # + screenshots/ to eyeball
```

Both gates earned their place immediately. `smoke.mjs` caught the unrendered
LaTeX on three chapters of without-hot-air, and `visual.mjs` independently
confirmed it at the render level — no `.katex` elements on the page — without
being told what to look for.

## What still needs a human, and why

**Credential- and UI-bound.** Not judgement — just access an agent does not
have. Both sites are already connected and their DNS is set, so none of this is
outstanding; it matters for the *next* change made unattended:

| Task | Status |
|---|---|
| DNS records | **Available.** Token at `~/.config/cloudflare/apikey-edit-zones` — verified active, 45 zones including `withouthotair.org` and `lifeitself.org` |
| GitHub: repos, pushes, issues, LFS objects | **Available** via `gh` auth; all used unattended during the migration |
| Changing a site's Flowershow settings, or connecting a new one | **Blocked** — needs a Flowershow API token or CLI auth. The only remaining hard block |
| Registering a domain | Human, deliberately — it spends money. Nothing outstanding |
| Revoking a leaked third-party token | Human — needs access to that service |

So the credential surface is nearly closed. Flowershow is the one gap, and since
`config.json` is version-controlled and takes precedence over dashboard
settings, most site configuration is already reachable through the repo anyway —
the dashboard is only needed to connect a *new* site.

**Genuinely yours.** These should stay human even with perfect tooling, because
getting them wrong is expensive and an agent's judgement is not the point:

- Product framing — "community edition", what the site is *for*
- What to say publicly, and when. See `docs/sharing.md`
- Anything that spends money or is hard to retract
- Making a repository public

## What most increases autonomy

In rough order of value:

1. **Pre-answer the decisions.** The single largest source of stalling is an
   undecided question, not a missing capability. This is precondition #4 of the
   loop-engineering checklist for a reason: an agent hitting an open decision
   either stops and waits, or guesses confidently and wrongly. The migration ran
   as far as it did because ~16 decisions were settled in one pass before any
   code was written.
2. **A Flowershow API token**, per the table above — the last credential gap.
3. **Standing preferences written down**, so taste does not have to be asked for
   each time — commit format, prose conventions, what belongs in a review queue
   rather than a gate. Much of this now lives in `CLAUDE.md`.
4. **Judgement on aesthetics** is the honest residue. `visual.mjs` can prove a
   chart drew; it cannot say the page looks good. `SCREENSHOTS=1` narrows even
   that, by making a visual review a glance at a folder rather than a click
   through a site.

## The habit that made the difference

Two rules, both from the loop-engineering preconditions, and both worth keeping:

- **Never weaken a check to make it pass.** When the redirect check fired on a
  legitimately new page, the fix was to correct the assertion — it had been
  written backwards — not to delete it.
- **Judgement calls go to `docs/review-queue.md`, never into a boolean.** The
  gate stays honest, and nothing gets quietly certified as fine because a script
  had no way to tell.
