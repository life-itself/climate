David MacKay's *Sustainable Energy - Without the Hot Air* (http://withouthotair.com). Preserved, converted, updated.

## Why this project

David tragically passed away in 2016. His wonderful book (and website) were first published in 2008. The material is still of great value. However, is has not been updated since publication and now won't be (at least by David). David made his book available in machine readable formats (not just PDF) and even provided the raw source files (Tex format). Even more importantly, he licensed the book (semi-)openly (see License section below).

The book remains a go-to reference and extremely useful. However it is getting out of date -- e.g. solar situation in 2020 is dramatically different from a decade earlier.[^1] Its current format is not easily editable nor is in a repository where it can be collaboratively worked on. Finally, there is the risk the book and site could one day disappear.

In this project we have:

* Created a source form in markdown which is much easier to edit, reuse and publish
* Put it in a public git(hub) repo which makes it easy for others to collaborate
* Archived original material so that it is preserved

What this makes possible

* Creating a revised edition collaboratively to bring it up to date
* Easier reuse and referencing by others
* Adding additional functionality (e.g. annotation, search etc)

[^1]: See this 2017 article on Carbon Commentary with concrete suggestions https://www.carboncommentary.com/blog/2017/3/30/l6qcqgoedse1wmjjz87t09usoq6jva and associated thread on ycombinator: https://news.ycombinator.com/item?id=14009057

## Sources

* Main website: https://withouthotair.com
* HTML: https://www.withouthotair.com/sewthacontents.shtml
* The Whole Book, all in one 12M pdf file: http://www.inference.eng.cam.ac.uk/sustainable/book/tex/sewtha.pdf
* 10 page synopsis: https://www.withouthotair.com/synopsis10.pdf
* Individual figures from book: http://www.inference.org.uk/sustainable/book/tex/ps/individual302/
* Epub: http://www.inference.eng.cam.ac.uk/sustainable/book/translate/SustainableEnergy-withoutthehotair-DavidJCMacKay.epub
* Tex version (original source) is here: http://www.inference.org.uk/sustainable/book/tex/ Though note that this is (very) messy.
  * Data directory: http://www.inference.org.uk/sustainable/book/data/


## Content

```
extract.py            # the script for extracting raw src markdown from epub
src                   # source version of book as markdown (extracted from epub)
Images                # all images from the book
without-hot-air.epub  # original epub of the book
```

## Developers

If you want to work on the processing script:

* Install python >= 3.6
* Run `python extract.py`
* Results should be output to `src`

## Credits

First, of course to David MacKay. This book was a landmark and I personally got a lot from it.

Second, a credit to Tito Jankowski who did a first pass in 2017 on getting this into source form https://github.com/titojankowski/sustainable_energy_without_the_hot_air. This repo started as a fork of this work (so perhaps we can merge it back!)

## License

Original text is copyright Professor David JC MacKay FRS (Professor of Natural Philosophy, Department of Physics, University of Cambridge) and licensed under a Creative Commons Attribution-Non-Commercial-Share-Alike 2.0 UK: England & Wales Licence. See http://withouthotair.com/about.html

> This is a free book. I didn't write this book to make money. I wrote it because sustainable energy is important. If you would like to have the book for free for your own use, please help yourself to any of the electronic versions on this website. There's pdf and html versions (thanks to William Sigmund!); we are working on other formats.
>
> This is a free book in a second sense: you are free to use all the material in this book, except for the cartoons and the photos with a named photographer, under the Creative Commons Attribution-Non-Commercial-Share-Alike 2.0 UK: England & Wales Licence. (The cartoons and photos are excepted because the authors have generally given me permission only to include their work, not to share it under a Creative Commons license.) You are especially welcome to use my materials for educational purposes. This website includes links to separate high-quality files for each of the figures in the book.

Additions and modifications by other authors are dual-licensed under a Creative Commons Attribution License v4 (unported) and Creative Commons Attribution-Non-Commercial-Share-Alike 2.0 UK (as required by the Share-Alike license).

## Appendix: SCQH

* Situation:
  * Mckay tragically passed away in 2016
  * Material still of great value
  * Not been revised since publication in 2008 and won't be revised
  * Semi-openly licensed and machine-readable version available (e.g. epub/html)
* Complication:
  * getting out of date
  * hard(er) to reuse (no editable source version)
  * may disappear
* What we have done
  * Create a markdown version which is as a source form is easier to work with (edit, reuse, publish)
  * In git repo on github which makes it easy for others to collaborate and contribute
  * Archived original material
* What this makes possible
  * Create a revised edition collaboratively to bring it up to date
  * Easier reuse and referencing by others
  * Annotation and additional functionality (e.g. search etc)

