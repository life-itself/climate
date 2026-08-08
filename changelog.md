---
title: Changelog
description: What has changed on this site.
---

Notable changes to this site and to [Without the Hot Air](https://withouthotair.org). Newest first.

## 2026-08-08 — New foundations, and a few things quietly unbroken

This site is now a plain markdown knowledge base, published with
[Flowershow](https://flowershow.app). The bespoke Next.js application that used
to build it is gone. The pages you read *are* the markdown files in the
[repository](https://github.com/life-itself/climate) — nothing is generated in
between.

**Without the Hot Air has moved to its own home: [withouthotair.org](https://withouthotair.org).**
David MacKay's book had been living inside this repository since 2021, which
never quite made sense; it is a book, and it deserved a book's front door. It is
now a standalone [community edition](https://withouthotair.org/about) — his 2008
text, unchanged, in a form that *can* be corrected and updated. Every old chapter
link here redirects to it.

Both sites now carry an **"Edit this page"** link at the bottom of every page. If
you spot an error, fixing it is two clicks and a pull request.

### Things that turned out to be broken

Rebuilding a site is a good way to find out what has been quietly failing:

- **Five images had not been loading for years.** They were stored with Git LFS,
  but the deployment never fetched LFS objects — so the site was serving a
  131-byte text file where each image should have been. Recovered and restored.
- **The global temperature chart was dead**, twice over: the data file it
  referenced had never been committed, and the chart component needed a setting
  the page did not have. It now draws live
  [HadCRUT5](https://www.metoffice.gov.uk/hadobs/hadcrut5/) data from 1850 to
  2025.
- **Four images displayed as raw text** rather than as images, because the old
  site could not read the syntax they were written in.
- Chapter titles in the book's navigation read `chap03`, `chap04`, and so on,
  wherever a figure appeared before the heading.
- The site footer's "A Project of Life Itself" link went to **vercel.com** — a
  leftover from the template the site was built from in 2021.

### Still to do

Most of the writing here dates from 2021 and has not been systematically
revised. The temperature chart is now current while the analysis below it argues
from 2018 carbon budget figures, which is a gap worth closing. That work is
tracked [in the open](https://github.com/life-itself/climate/issues/39), as is
the larger project of [updating MacKay's numbers](https://github.com/life-itself/without-hot-air/issues/1).
