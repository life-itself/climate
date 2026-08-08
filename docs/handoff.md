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

That is now closed by `scripts/smoke.mjs`.

## The two gates

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

Deliberately *not* in the Stop hook: it needs network, and it would fail
spuriously mid-deploy. Run it after a deploy settles.

```bash
scripts/verify.sh                 # before committing
node scripts/smoke.mjs            # a minute or two after pushing
```

## What still needs a human, and why

**Credential- and UI-bound.** Not judgement — just access an agent does not have:

| Task | What would remove the block |
|---|---|
| Connecting a repo as a Flowershow site | A Flowershow API token or CLI auth |
| DNS records | A Cloudflare API token, scoped to DNS edit on the specific zones |
| Registering a domain | Nothing — keep this human, it spends money |
| Revoking a leaked third-party token | Access to that service |

Worth noting `gh` auth already covers a lot: creating repos, pushing, filing and
closing issues, transferring issues, and reading LFS objects all worked
unattended this time.

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
2. **A visual check.** `smoke.mjs` catches *leaked source syntax*, which is most
   of the class — but not "the layout is broken" or "the chart draws but is
   unreadable". A headless browser (Playwright) taking screenshots, or simply
   rendering and asserting on element geometry, would close the rest. This is
   the obvious next investment.
3. **Scoped API tokens** for Flowershow and Cloudflare, per the table above.
4. **Standing preferences written down**, so taste does not have to be asked for
   each time — commit format, prose conventions, what belongs in a review queue
   rather than a gate. Much of this now lives in `CLAUDE.md`.

## The habit that made the difference

Two rules, both from the loop-engineering preconditions, and both worth keeping:

- **Never weaken a check to make it pass.** When the redirect check fired on a
  legitimately new page, the fix was to correct the assertion — it had been
  written backwards — not to delete it.
- **Judgement calls go to `docs/review-queue.md`, never into a boolean.** The
  gate stays honest, and nothing gets quietly certified as fine because a script
  had no way to tell.
