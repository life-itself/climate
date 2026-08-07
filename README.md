Life Itself's ongoing inquiry into the climate crisis 🌍🔥

https://climate.lifeitself.org/

## Layout

A flat markdown knowledge base. The repo root is the publish root — these
markdown files *are* the site, published by [Flowershow](https://flowershow.app).

```
*.md            # the knowledge base, one page per file, flat
index.md        # home page
assets/         # images and data files
config.json     # site configuration (theme, nav, redirects)
docs/           # design, plans, review queue — not published
scripts/        # structural checks — not published
```

## Working on it

```
scripts/init.sh      # cold start: install deps and verify
scripts/verify.sh    # the checks: links resolve, images exist, frontmatter parses
```

Conventions and guard rails are in [CLAUDE.md](CLAUDE.md).

## Without the Hot Air

David MacKay's *Sustainable Energy — Without the Hot Air* used to live in this
repo. It now has its own home:

* Site: https://withouthotair.org
* Repo: https://github.com/life-itself/without-hot-air

Old `/without-hot-air/...` URLs here redirect there.

## Other work

Other work we have done:

* With Tommaso Venturini of KCL / Sciences Po we (Rufus Pollock)  built the [COP21 Treaty Texts website][cop21] in November / December 2015
* With Tommaso Venturini of KCL / Sciences Po we worked on [analyzing climate negotations][climate-talks]

[cop21]: http://cop21.okfnlabs.org/
[climate-talks]: https://github.com/rgrp/climate-negotiations
