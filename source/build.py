#!/usr/bin/env python3
"""Assemble the Agency OS pitch deck from src/ into one HTML file.

Writes two outputs:
  - the repository page (full HTML document)
  - the artifact page (body fragment: <title> first, no html/head/body tags)
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')
REPO = os.path.dirname(HERE)
ART_DIR = os.path.join(HERE, 'artifact')

TITLE = 'Agency OS Pitch Deck'
DESC = ('Agency OS by One Stop Solutions: one operating system for freelancers and agencies, '
        'from getting found to the final handoff.')
FONTS = ('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600'
         '&family=Geist+Mono:wght@400;500&family=Caveat:wght@500;600&display=swap')
CDN = [
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js',
    'https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js',
]
GLYPH_SVG = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><g fill="#201d1d">'
             '<circle cx="18" cy="18" r="18"/><rect x="44" y="0" width="36" height="36" rx="4"/>'
             '<rect x="0" y="44" width="36" height="36" rx="4"/><path d="M44 80A36 36 0 0 1 80 44V80Z"/></g></svg>')


def read(name):
    with open(os.path.join(SRC, name), encoding='utf-8') as f:
        return f.read()


def build():
    logo = open(os.path.join(HERE, 'logo_path.txt'), encoding='utf-8').read().strip()
    land = open(os.path.join(HERE, 'globe_dots.txt'), encoding='utf-8').read().strip()

    css = '\n'.join(read(n).strip() for n in ('base.css', 'mui.css', 'sections.css'))
    body = read('body1.html').replace('__LOGO_PATH__', logo).strip() + '\n\n' + read('body2.html').strip()
    app = read('app.js')
    assert "'__LAND__'" in app
    app = app.replace("'__LAND__'", json.dumps(land))
    js = "(() => {\n'use strict';\n" + read('data.js').strip() + '\n\n' + read('visuals.js').strip() + '\n\n' + app.strip() + '\n})();'

    for chunk, label in ((css, 'css'), (js, 'js'), (body, 'body')):
        assert '__' + 'LOGO_PATH__' not in chunk and '__' + 'LAND__' not in chunk, label
        assert not re.search(r'clienter', chunk, re.I), 'forbidden word in ' + label
    assert '</script' not in js.lower()

    scripts = '\n'.join(f'<script src="{u}"></script>' for u in CDN)
    fav = 'data:image/svg+xml,' + GLYPH_SVG.replace('"', "'").replace('#', '%23').replace('<', '%3C').replace('>', '%3E')

    full = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{TITLE}</title>
<meta name="description" content="{DESC}">
<meta name="theme-color" content="#201d1d">
<meta property="og:title" content="{TITLE}">
<meta property="og:description" content="{DESC}">
<meta property="og:type" content="website">
<link rel="icon" type="image/svg+xml" href="{fav}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}">
<style>
[hidden]{{display:none!important}}
{css}
</style>
</head>
<body>
{body}

{scripts}
<script>
{js}
</script>
</body>
</html>
'''

    fragment = f'''<title>{TITLE}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}">
<style>
{css}
</style>

{body}

{scripts}
<script>
{js}
</script>
'''

    os.makedirs(ART_DIR, exist_ok=True)
    out_full = os.path.join(sys.argv[1] if len(sys.argv) > 1 else REPO, 'agency-os', 'index.html')
    os.makedirs(os.path.dirname(out_full), exist_ok=True)
    os.makedirs(ART_DIR, exist_ok=True)
    with open(out_full, 'w', encoding='utf-8') as f:
        f.write(full)
    with open(os.path.join(ART_DIR, 'agency-os-pitch-deck.html'), 'w', encoding='utf-8') as f:
        f.write(fragment)
    with open(os.path.join(ART_DIR, 'app.js'), 'w', encoding='utf-8') as f:
        f.write(js)
    print(f'index.html {len(full.encode()):,} bytes; fragment {len(fragment.encode()):,} bytes')


if __name__ == '__main__':
    build()
