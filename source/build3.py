#!/usr/bin/env python3
"""Assemble the Beere Kesava ERP pitch deck from src3/ (plus the shared Osmo base in src/ and src2/).

Writes:
  - <repo>/beere-kesava/index.html : the full single-file page (images embedded as data URIs)
  - artifact3/beere-kesava-erp.html : the same page as an artifact body fragment (<title> first, no html/head/body)
"""
import base64
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC, SRC2, SRC3 = (os.path.join(HERE, d) for d in ('src', 'src2', 'src3'))
IMG = os.path.join(HERE, 'bk', 'img')
REPO = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(HERE)
ART_DIR = os.path.join(HERE, 'artifact3')

FONTS = ('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..600'
         '&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Caveat:wght@500;600&display=swap')
SCRIPTS = [
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js',
    'https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js',
]
FAV_SVG = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="29" fill="#4A061B" '
           'stroke="#C89B47" stroke-width="3"/><text x="32" y="41.5" text-anchor="middle" font-family="Georgia,serif" '
           'font-size="25" font-style="italic" fill="#E2BE74">BK</text></svg>')
FAVICON = 'data:image/svg+xml,' + FAV_SVG.replace('"', "'").replace('#', '%23').replace('<', '%3C').replace('>', '%3E')
BLOCKS = ['HERO', 'REEL', 'INTRO', 'Vertical slider (shared)', 'PROBLEM', 'JOURNEY', 'PORTALS (dark)',
          'INVEST', 'FOOTER', 'MODAL CONTENT']
TITLE = 'Beere Kesava ERP'
DESC = ('Beere Kesava ERP: yarn to sale in one portal for Beere Kesava & Brothers Silks, Dharmavaram. '
        'Built by One Stop Solutions.')


def read(*parts):
    with open(os.path.join(*parts), encoding='utf-8') as f:
        return f.read()


def css_blocks(names):
    blocks, cur = {}, None
    for line in read(SRC, 'sections.css').splitlines():
        m = re.match(r'^/\* ===== (.+?) ===== \*/', line)
        if m:
            cur = m.group(1)
            blocks[cur] = []
        if cur:
            blocks[cur].append(line)
    missing = [n for n in names if n not in blocks]
    assert not missing, missing
    return '\n'.join('\n'.join(blocks[n]) for n in names)


def image_vars():
    out = []
    for f in sorted(os.listdir(IMG)):
        key = f.rsplit('.', 1)[0]
        b64 = base64.b64encode(open(os.path.join(IMG, f), 'rb').read()).decode()
        out.append(f'--img-{key}:url("data:image/webp;base64,{b64}")')
    return ':root{' + ';'.join(out) + '}'


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)


def build():
    logo = read(HERE, 'logo_path.txt').strip()
    sprite = read(SRC3, 'sprite.html').replace('__LOGO_PATH__', logo).strip()
    css = '[hidden]{display:none!important}\n' + '\n'.join([
        read(SRC, 'base.css').strip(), read(SRC3, 'bkui.css').strip(), css_blocks(BLOCKS),
        read(SRC2, 'shared.css').strip(), read(SRC3, 'bk.css').strip()])
    body = read(SRC3, 'bk.html').replace('__SPRITE__', sprite).strip()
    js = ("(() => {\n'use strict';\n" + read(SRC3, 'content.js').strip() + '\n'
          + read(SRC2, 'core.js').strip() + '\n\n' + read(SRC3, 'bkvis.js').strip() + '\n\n'
          + read(SRC3, 'bk.js').strip() + '\n})();')
    for label, chunk in (('css', css), ('body', body), ('js', js)):
        assert '__LOGO_PATH__' not in chunk and '__SPRITE__' not in chunk, label
        assert not re.search(r'clienter', chunk, re.I), 'forbidden word in ' + label
        assert not re.search(r'\b(claude-[a-z0-9-]+|opus|sonnet)\b', chunk, re.I), 'model name in ' + label
    assert '</script' not in js.lower()
    css += '\n' + image_vars()
    tags = '\n'.join(f'<script src="{u}"></script>' for u in SCRIPTS)
    full = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{TITLE}</title>
<meta name="description" content="{DESC}">
<meta name="theme-color" content="#1A0A0F">
<meta property="og:title" content="{TITLE}">
<meta property="og:description" content="{DESC}">
<meta property="og:type" content="website">
<link rel="icon" type="image/svg+xml" href="{FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}">
<style>
{css}
</style>
</head>
<body>
{body}

{tags}
<script>
{js}
</script>
</body>
</html>
'''
    frag = f'''<title>{TITLE}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}">
<style>
{css}
</style>

{body}

{tags}
<script>
{js}
</script>
'''
    write(os.path.join(REPO, 'beere-kesava', 'index.html'), full)
    write(os.path.join(ART_DIR, 'beere-kesava-erp.html'), frag)
    print(f'deck: {len(full.encode()):,} bytes (css {len(css.encode()):,}, js {len(js.encode()):,})')


if __name__ == '__main__':
    build()
