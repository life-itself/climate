#!/bin/zsh

# Main epub version linked on https://www.withouthotair.com/epubVersions.html
# curl http://www.inference.eng.cam.ac.uk/sustainable/book/translate/SustainableEnergy-withoutthehotair-DavidJCMacKay.epub > sewtha.epub

# let's extract it with the images
mkdir -p img
pandoc without-the-hot-air.epub -t gfm -o main.md --wrap=none --extract-media=img

cp main.md tidy.md

## let's try and tidy it up ...
# remove stuff like <span id="titlepage.xhtml"></span>
sed -i '' 's/^<span.*><\/span>$//g' tidy.md
# <span class="figurenumber">Figure 1.2.</span> Are "our" fossil fuels running out? Total crude oil production from the North Sea, and oil price in 2006 dollars per barrel. [<span class="darkred">\[10\]</span>](#chap01.xhtml#ch01n10)

# remove stuff like <div class="imgcap">
# ~~in fact, let's leave for now~~
sed -i '' 's/^<div.*//g' tidy.md
sed -i '' 's/^<\/div>//g' tidy.md

# strip trailng white space
sed -i '' 's/ *$//g' tidy.md

# let's delete all 2+ blank lines
# see https://stackoverflow.com/questions/12598916/how-to-use-sed-to-remove-only-double-empty-lines
sed -i '' 'N;/^\n$/d;P;D' tidy.md

# correct quotes to normal quotes
sed -i '' 's/”/"/g' tidy.md
sed -i '' 's/“/"/g' tidy.md

# fix headings e.g. ...
# # <span class="smallfont">*Part I*</span>
sed -i '' 's/^# <span class="smallfont">\*\(.*\)\*<\/span>/# \1/g' tidy.md

# delete the nav
# sed '/PATTERN-1/,/PATTERN-2/{//!d}'

## Footnotes
# [<span class="darkred">\[13\]</span>](#chap01.xhtml#ch01n13)
sed -i '' 's/ \[<span class="darkred">\\\[[0-9]*[^#]*(#chap[0-9]*.xhtml#ch\([0-9]*\)n\([0-9]*\))/[^\1-\2]/g' tidy.md
# And fn is ... [<span class="mark">\[1\]</span>](#chap01.xhtml#ret01)*
sed -i '' 's/\[<span class="mark">\\\[[0-9*\\\][^)]*#chap\([0-9]*\).xhtml#ret\([0-9]*\))/[^\1-\2]: /g' tidy.md
# TODO: remove special span class red case ...

## fix up references section e.g.
# -  <span class="smallcaps"> {OECD</span> Nuclear Energy Agency}. (2006).
sed -i '' -e 's/<span class="smallcaps">\([^<]*\)<\/span>/\1/g' tidy.md

## final hacks ...
# replace unmatched closing </div> usually looking like
# </div>\n\n</th>
# TODo: I cannot find an easy way to do multiline replace so giving up for now!
# sed -i '' -e 's/<\/div>\n\n<\/th>/<\/th>/' tidy.md

# let's fix Images which are in img/Images
mv img/Images/* img/
rm -Rf img/Images
sed -i '' 's/img\/Images/\/img\/sewtha/g' tidy.md

cp tidy.md ../README.md
mkdir -p ../../site/public/img/sewtha
cp -a img/* ../../site/public/img/sewtha/
