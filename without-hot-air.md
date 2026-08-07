---
title: Converting Without the Hot Air
created: 2021-09-02
description: Why and how we converted David MacKay's book to open, editable markdown — and where it lives now.
---

**The book now has its own site: [withouthotair.org](https://withouthotair.org).**
This page is about the work of getting it there.

## The problem

David MacKay's *Sustainable Energy — Without the Hot Air* (2008) is still one of the best things written on energy: factual, numerate, and built on the principle that you only understand what you can work out for yourself.

MacKay died in 2016, so the book will not be revised by him. That left three problems:

* **It is going out of date.** Solar, in particular, looks nothing like it did in 2008.
* **It was hard to work on.** The published forms — PDF, HTML, and a fairly messy TeX source — are not formats you can collaborate on.
* **It could disappear.** A single site, no longer maintained by its author.

MacKay had licensed the book (semi-)openly and published machine-readable formats, so a solution was permitted — it just had to be built.

## What we did

The conversion work was done in **August and September 2021**, building on a first pass Tito Jankowski had made in 2017.

* Wrote `extract.py` to convert the official epub into per-chapter markdown, with the figures extracted alongside
* Put the result in a public git repository, so corrections and updates can be proposed by anyone
* Archived the original epub next to the converted text, so the source of truth stays with it

The conversion is scripted rather than hand-edited, which matters: when the extraction is wrong, the script gets fixed and everything regenerates, instead of the fix living in one file until the next regeneration silently drops it.

## Where it is now

In **August 2026** the book moved out of this repository into
[its own](https://github.com/life-itself/without-hot-air), publishing at
[withouthotair.org](https://withouthotair.org) as a **community edition** — the
original 2008 text, unchanged, in a form that *can* be updated.

Old links to chapters on this site redirect there.

## What is still to do

The conversion made a revised edition *possible*; it did not make one. The numbers are still MacKay's 2008 numbers. Updating them — visibly and with attribution, rather than quietly — is the work ahead.

If you want to help, the [repository](https://github.com/life-itself/without-hot-air) and its [issues](https://github.com/life-itself/without-hot-air/issues) are open.

## License

The original text is copyright Professor David JC MacKay FRS and licensed under a Creative Commons Attribution-Non-Commercial-Share-Alike 2.0 UK: England & Wales Licence. The cartoons and the photographs with a named photographer are excluded — MacKay had permission to include them, not to relicense them.
