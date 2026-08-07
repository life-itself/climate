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

Migration from a bespoke Next.js site to Flowershow, and splitting out
Without Hot Air. See:

- `docs/superpowers/specs/2026-08-07-climate-kb-design.md` — the design
- `docs/plans/2026-08-07-climate-kb-migration.md` — the task-by-task plan
