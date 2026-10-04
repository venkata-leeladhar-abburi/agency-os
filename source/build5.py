#!/usr/bin/env python3
"""Assemble the Heaven Gadgets growth plan from src5/ (plus the shared Osmo base in src/ and src2/).

Writes:
  - <repo>/heaven-gadgets/index.html : the full single-file page (store images embedded as data URIs)
"""
import base64
import os
import re
import sys

from build3 import read, css_blocks, SCRIPTS

HERE = os.path.dirname(os.path.abspath(__file__))
SRC, SRC2, SRC5 = (os.path.join(HERE, d) for d in ('src', 'src2', 'src5'))
IMG = os.path.join(HERE, 'hg', 'img')
REPO = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(HERE)

FONTS = ('https://fonts.googleapis.com/css2?family=Unbounded:wght@400..700'
         '&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Caveat:wght@500;600&display=swap')
FAV_SVG = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#05070A" '
           'stroke="#2E6BFF" stroke-width="3"/><text x="32" y="41" text-anchor="middle" font-family="Arial,sans-serif" '
           'font-size="24" font-weight="700" fill="#fff">H<tspan fill="#5B8CFF">G</tspan></text></svg>')
FAVICON = 'data:image/svg+xml,' + FAV_SVG.replace('"', "'").replace('#', '%23').replace('<', '%3C').replace('>', '%3E')
BLOCKS = ['HERO', 'REEL', 'INTRO', 'Vertical slider (shared)', 'PROBLEM', 'JOURNEY', 'PORTALS (dark)',
          'INVEST', 'FOOTER', 'MODAL CONTENT']
TITLE = 'Heaven Gadgets × One Stop'
DESC = ('A growth plan for Heaven Gadgets, Ongole: an online store, billing counter, inventory, customer list, '
        'WhatsApp and a voice agent in one system. By One Stop Solutions.')


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
    sprite = read(SRC5, 'sprite.html').replace('__LOGO_PATH__', logo).strip()
    css = '[hidden]{display:none!important}\n' + '\n'.join([
        read(SRC, 'base.css').strip(), css_blocks(BLOCKS), read(SRC2, 'shared.css').strip(),
        read(SRC5, 'hgui.css').strip(), read(SRC5, 'hg.css').strip()])
    body = read(SRC5, 'hg.html').replace('__SPRITE__', sprite).strip()
    js = ("(() => {\n'use strict';\n" + read(SRC5, 'content.js').strip() + '\n'
          + read(SRC2, 'core.js').strip() + '\n\n' + read(SRC5, 'hgvis.js').strip() + '\n\n'
          + read(SRC5, 'hg.js').strip() + '\n})();')
    for label, chunk in (('css', css), ('body', body), ('js', js)):
        assert '__LOGO_PATH__' not in chunk and '__SPRITE__' not in chunk, label
        assert not re.search(r'clienter|first.copy|replica', chunk, re.I), 'forbidden word in ' + label
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
<meta name="theme-color" content="#05070A">
<meta name="robots" content="noindex">
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
    write(os.path.join(REPO, 'heaven-gadgets', 'index.html'), full)
    print(f'heaven-gadgets: {len(full.encode()):,} bytes (css {len(css.encode()):,}, js {len(js.encode()):,})')


if __name__ == '__main__':
    build()
