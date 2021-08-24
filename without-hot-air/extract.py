import os
import shutil
from distutils.dir_util import copy_tree

TMPDIR = './tmp'
EPUB = 'without-hot-air.epub'
SRC = './src'
MARKDOWN = os.path.join(TMPDIR, 'markdown')
IMAGES = './Images'

def retrieve():
    # Main epub version linked on https://www.withouthotair.com/epubVersions.html
    cmd = 'curl http://www.inference.eng.cam.ac.uk/sustainable/book/translate/SustainableEnergy-withoutthehotair-DavidJCMacKay.epub > without-hot-air.epub'
    os.system(cmd)

def prepare():
    if os.path.exists(TMPDIR):
        shutil.rmtree(TMPDIR)
    os.makedirs(TMPDIR)
    os.makedirs(MARKDOWN)

    if not os.path.exists(SRC):
        os.makedirs(SRC)

    if not os.path.exists(IMAGES):
        os.makedirs(IMAGES)

def extract():
    # unzip then pandoc xhtml to markdown

    cmd = 'unzip -q %s -d %s' % (EPUB, TMPDIR)
    os.system(cmd)

    htmldir = os.path.join(TMPDIR, 'OEBPS', 'Text')
    files = [ f for f in os.listdir(htmldir) if f.endswith('xhtml') ]
    for f in files:
        mdfn = f.split('.')[0] + '.md'
        infp = os.path.join(htmldir, f)
        md = os.path.join(MARKDOWN, mdfn)
        cmd = 'pandoc %s -t gfm -o %s --wrap=none' % (infp, md)
        os.system(cmd)

def etl():
    '''
    1. make tmp
    2. E: unzip epub
    3. T: 1. pandoc to markdown from xhtml 2. process each chapter
    4. L: copy output to right location
    5. cleanup

    Layout:

    /tmp/
        /markdown/

    unzip results in text files in ...

        OEBPS/Text

    e.g.

        ./tmp/OEBPS/Text/chap01.xhtml
        ./tmp/OEBPS/Text/chap02.xhtml
        ./tmp/OEBPS/Text/chap03.xhtml
    '''
    prepare()
    extract()

    # now clean up each file
    files = [ f for f in os.listdir(MARKDOWN) ]
    for fn in files:
        md = os.path.join(MARKDOWN, fn)
        dest = os.path.join(SRC, fn)
        try:
            content = open(md, encoding='utf8').read() 
            out = transform(content)
        except:
            print(md)
            raise
        open(dest, 'w', encoding='utf8').write(out)

    # TODO: have manually symlinked - could symlink automatically here
    # copy_tree(SRC, '../content/without-hot-air/')

    # sort images
    copy_tree(os.path.join(TMPDIR, 'OEBPS', 'Images'), 'IMAGES')
    # TODO: (did manually) - symlink this from site folder
    # site/public/img/without-hot-air => ./Images



import re
def transform(file_string):
    # clean up the markdown
    out = file_string

    # replace non-breaking spaces ...
    out = out.replace(u'\xa0', u' ')

    # find and replace patterns
    regexes = [
        # TODO: does this even exist in xhtml conversion? (this was done for epub)
        # remove stuff like <span id="titlepage.xhtml"></span>
        # <span class="figurenumber">Figure 1.2.</span> Are "our" fossil fuels running out? Total crude oil production from the North Sea, and oil price in 2006 dollars per barrel. [<span class="darkred">\[10\]</span>](#chap01.xhtml#ch01n10)
        # ['^<span.*><\/span>$', ''],

        # Fix # 1   Motivations
        ['   ', ' '],

        # convert quotes
        # <div class="quote"> ...
        [r'<div class="quote">\n\n(.*)\n\n<\/div>', r'> \g<1>'],
        # without a proper parser a bit hacky to handle when multiple lines
        [r'<div class="quote"[^>]*>\n\n(.*)\n\n((.*))?\n\n<\/div>', r'> \g<1>\n>\n> \g<2>'],

        # fix image links
        [r'\.\./Images/', '/img/without-hot-air/'],

        # correct quotes to normal quotes
        ['”', '"'],
        ['“', '"'],
        ['”', '"'],

        # strip trailng white space
        [' *$', ''],

        # remove [image] all divs
        # e.g. <div class="imgcap" style="float: right; width: 26%">
        # e.g. <div class="smallfont" style="width: 50%; padding-left: 10%">
        [r'<div[^>]*>', ''],
        [r'</div>', ''],
        # remove multiple blank lines
        [r'\n\n(\n)+', r'\n\n'],

        # footnotes
        # footnote ref
        # e.g. [<span class="darkred">\[5\]</span>](#ch01n05)
        [r'\[<span class="[^>]*>\\\[(\d+)\\\]<\/span>\]\(#ch0?(\d+)n0?(\d+)\)',
            r'[^\g<1>]'],
        
        # footnote itself
        # [<span class="mark">\[22\]</span>](#ret22)
        [r'\[<span class="mark">\\\[(\d+)\\\]</span>\]\(#ret\d+\)', r'[^\g<1>]: '],

        # we generally don't need the pandoc escaping of [
        # e.g. \[energy\]
        [r'\\\[', '['],
        [r'\\\]', ']'],
    ]

    for regex in regexes:
        out = re.sub(regex[0], regex[1], out, flags=re.MULTILINE)

    return out


def test_transform():
    instring = '''# 1   Motivations

<div class="quote">

*We live at a time when emotions and feelings count more than truth, and there is a vast ignorance of science.*

James Lovelock

</div>

<div class="quote">

*if everyone does a little, we’ll achieve only a little.*

</div>

<div class="imgcap" style="float: right; width: 26%">

![OutOfGas](../Images/OutOfGasS.jpg)

<div class="caption2">

David Goodstein’s *Out of Gas* (2004).

</div>

![SkepticalEnvironmentalist](../Images/lomborgSES.jpg)

<div class="caption2">

Bjørn Lomborg’s *The Skeptical Environmentalist* (2001).

</div>

![RevengeOfGaia](../Images/revengeOfGaiaS.jpg)

<div class="caption2">

*The Revenge of Gaia: Why the earth is ﬁghting back – and how we can still save humanity.* James Lovelock (2006). © Allen Lane.

</div>

</div>

“Wind or nuclear?”, for example. ... to ﬁll the \[energy\] gap is living in an utter dream world and is, in my view, an enemy of the people.” [<span class="darkred">\[1\]</span>](#ch01n01)<span class="red"> \*</span>

<div class="caption2">

[<span class="mark">\[3\]</span>](#ret03)*quote text here ...*
'''

    exp = '''# 1 Motivations

> *We live at a time when emotions and feelings count more than truth, and there is a vast ignorance of science.*
>
> James Lovelock

> *if everyone does a little, we’ll achieve only a little.*

![OutOfGas](/img/without-hot-air/OutOfGasS.jpg)

David Goodstein’s *Out of Gas* (2004).

![SkepticalEnvironmentalist](/img/without-hot-air/lomborgSES.jpg)

Bjørn Lomborg’s *The Skeptical Environmentalist* (2001).

![RevengeOfGaia](/img/without-hot-air/revengeOfGaiaS.jpg)

*The Revenge of Gaia: Why the earth is ﬁghting back – and how we can still save humanity.* James Lovelock (2006). © Allen Lane.

"Wind or nuclear?", for example. ... to ﬁll the \[energy\] gap is living in an utter dream world and is, in my view, an enemy of the people." [^1]<span class="red"> \*</span>

[^3]: *quote text here ...*
'''

    out = transform(instring)
    print(out)
    assert out == exp


if __name__ == '__main__':
    etl()
