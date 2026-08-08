# House rules

This is a **knowledge base repo**: plain markdown, published by Flowershow cloud.
There is no application code. Do not add a framework, a build step, or a
component library. `scripts/` is tooling and is excluded from the published site.

## The done condition

```
scripts/verify.sh
```

Exit 0 means the tree is structurally sound. `scripts/init.sh` brings a cold
checkout to that point in one command.

After deploying, also run the live-site checks:

```
node scripts/smoke.mjs
```

and the browser checks:

```
node scripts/visual.mjs              # add SCREENSHOTS=1 to write screenshots/
```

Driven by `smoke.json` and `visual.json`. They catch what `verify.sh` structurally cannot — a page
that is perfectly valid markdown but renders wrongly, which is what every bug
that reached production during the migration turned out to be. Not in the Stop
hook: it needs network and would fail spuriously mid-deploy. See
[docs/handoff.md](docs/handoff.md).

`verify.sh` gates only what is machine-decidable: frontmatter parses, wikilinks
and embeds resolve, referenced files exist, `config.json` is valid, no Git LFS
pointers. Judgement calls — does this read well, does the site look right, did a
note split preserve its meaning — go to `docs/review-queue.md`. Never to a
boolean.

## The ledger

`docs/features.yaml`. One entry per unit of work with an explicit
`passes: true/false`. It is the durable record; context gets compacted, a file
does not.

## Guard rails

- **Never weaken, skip, or delete a check to make it pass.** If something cannot
  meet the gate, mark it `passes: false` in the ledger and record why.
- **Never edit `docs/features.yaml` to self-certify.** The ledger records what
  the checker found, not what you would like it to have found.
- **Never rewrite or force-push `main`.**
- **Fixes go in the generator, never in its output.** `extract.py` produces the
  Without Hot Air chapter markdown — fix the script and re-run; never hand-patch
  a generated chapter.
- **Stop and report after 3 identical consecutive failures.** Do not keep
  retrying the same approach.
- Outward-facing steps need a human: creating a public GitHub repo, deleting a
  remote branch, DNS changes, connecting a Flowershow site.

## Conventions

- Content is flat, one level, at the repo root. `assets/` is the only exception.
- Internal links are wikilinks (`[[slug]]`); external links stay markdown links.
- Frontmatter is light: `title` always, `created` where known, `description` and
  `tags` only when they earn their place.
- No Git LFS.
- A page using a React component (`<LineChart>`, `<List>`) needs
  `syntaxMode: mdx` in its own frontmatter. The site default is `auto`, which
  parses `.md` as plain Markdown and renders the component as nothing. Do not
  set it site-wide — MDX is stricter and will break pages containing bare `{`
  or `<`. Escape those as `\{` / `\<` on pages that do need MDX.
- Commit messages: `[scope/N][size]: subject` — e.g. `[content/2][m]: ...`,
  where N is a rough 1-3 priority and size is `xs`/`s`/`m`/`l`.

## Current work

The Flowershow migration is **done** (2026-08-08) — see
`docs/plans/2026-08-07-climate-kb-migration.md` and its design spec in
`docs/superpowers/specs/`. Both sites are live and all three gates are green.

**Next up, and where to start if you are picking this up cold:**

- **Sharing / marketing** — `docs/sharing.md`. Still a stub: it captures the
  thinking and the evidence, and needs turning into a plan. Gated on the book
  update below having something to show.
- **Revising the book** — `docs/plans/2026-08-08-revising-the-book.md` in the
  `without-hot-air` repo. Written to be picked up cold.
- Open work is in GitHub issues; `docs/review-queue.md` holds cosmetic notes.
