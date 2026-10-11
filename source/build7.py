#!/usr/bin/env python3
"""Assemble the AI website workshop plan from src7/ (on the shared base in src/ and the pitch blocks in src2/).
Colours: warm ivory, soft black and burnt orange. Fonts: Geist, Geist Mono and Caveat, as on the agency website.

Writes:
  - <repo>/workshop/index.html : the full single-file page. It needs no script libraries.
"""
import os
import re
import sys

import build2
from build3 import read, css_blocks

HERE = os.path.dirname(os.path.abspath(__file__))
SRC, SRC2, SRC7 = (os.path.join(HERE, d) for d in ('src', 'src2', 'src7'))
REPO = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(HERE)
sys.path.insert(0, SRC7)
import ws_content as C  # noqa: E402  (src2 already owns the name 'content')

FONTS = ('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600'
         '&family=Geist+Mono:wght@400;500&family=Caveat:wght@500;600&display=swap')
GLYPH_SVG = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#101010"/>'
             '<g fill="#D53606" transform="translate(16 16) scale(.6)"><circle cx="18" cy="18" r="18"/>'
             '<rect x="44" y="0" width="36" height="36" rx="4"/><rect x="0" y="44" width="36" height="36" rx="4"/>'
             '<path d="M44 80A36 36 0 0 1 80 44V80Z"/></g></svg>')
FAVICON = 'data:image/svg+xml,' + GLYPH_SVG.replace('"', "'").replace('#', '%23').replace('<', '%3C').replace('>', '%3E')
BLOCKS = ['HERO', 'REEL', 'INTRO', 'Vertical slider (shared)', 'PROBLEM', 'JOURNEY', 'PORTALS (dark)',
          'ROADMAP', 'QUESTIONS', 'INVEST', 'FOOTER']
TITLE = 'AI website workshop · One Stop Solutions'
DESC = ('A three-hour Sunday workshop from One Stop Solutions: build websites with AI that do not look AI-made. '
        'The seven steps, the run sheet, the prompts and the diagrams.')

# The shared sources use the Agency OS colours. This page swaps them for its own three, and warms the greys.
build2.PALETTES['workshop'] = {
    'accents': {'#a1ff62': '#d53606', '#6840ff': '#8f2403', '#a491ff': '#f08c5e', '#2b1d7a': '#5a1602', '#5ed12a': '#f08c5e',
                '#f84131': '#d53606', '#201d1d': '#101010', '#151313': '#101010', '#f4f4f4': '#e6d5bd', '#ffffff': '#fff8ed'},
    'grey': lambda L: ((round(L * 230 / 244), round(L * 213 / 244), round(L * 189 / 244)) if L > 140
                       else (L + 2, L, max(0, L - 3))),
}


def roll(html):
    """Give every button the rolling label the shared script would add."""
    return re.sub(r'<span class="btn__label">([^<]+)</span>',
                  r'<span class="btn__labels"><span class="btn__label">\1</span><span class="btn__label" aria-hidden="true">\1</span></span>', html)


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)


def panels(ids, extra):
    out = []
    for i, b in enumerate(C.BLOCKS):
        if b['id'] in ids:
            out.append(C.panel(i, b, extra.get(b['id'], '')))
    return '\n'.join(out)


def build():
    logo = read(HERE, 'logo_path.txt').strip()
    sprite = read(SRC2, 'sprite.html').replace('__LOGO_PATH__', logo).strip()
    shared = '\n'.join([read(SRC, 'base.css').strip(), read(SRC, 'mui.css').strip(), read(SRC2, 'mui2.css').strip(),
                        css_blocks(BLOCKS), read(SRC2, 'shared.css').strip(), read(SRC2, 'pitch.css').strip()])
    css = '[hidden]{display:none!important}\n' + build2.recolor(shared, 'workshop') + '\n' + read(SRC7, 'ws.css').strip()

    extra = {'scroll': read(SRC7, 'x_scroll.html').strip(), 'dashboard': read(SRC7, 'x_dash.html').strip()}
    dots, beat_list = C.beats()
    ctrl = ('<div class="gslider__ctrl"><button class="icon-btn" type="button" data-theme="ink" data-shape="round" data-slide="-1" '
            'aria-label="Earlier blocks"><svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-l"/></svg></button>'
            '<p class="eyebrow tnum">0:00 → 3:00</p><button class="icon-btn" type="button" data-theme="ink" data-shape="round" '
            'data-slide="1" aria-label="Later blocks"><svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-r"/></svg></button></div>')
    fills = {
        'TIME': C.time_strip(), 'RADIAL': C.radial(), 'SLIDES': C.slides(), 'CHIPS': C.chips(), 'CHIP_LINES': C.chip_lines(),
        'TELL_PAINS': C.tell_pains(), 'PILLARS': C.pillars(), 'SVC': C.svc_grid(), 'DIAL': C.dial(), 'GANTT': C.gantt(),
        'STAGE_CARDS': C.stage_cards(), 'TRIO': C.trio(), 'RAIL': C.rail(), 'ROUTE': C.route(), 'HABITS': C.habits(),
        'BEAT_DOTS': dots, 'BEAT_LIST': beat_list, 'TODO': C.todo(), 'KIT': C.files(C.KIT), 'ROAD': C.road(),
        'PANELS_A': panels({'hook', 'map', 'brief', 'inspiration', 'structure', 'style'}, extra),
        'PANELS_B': panels({'prompting', 'break', 'portfolio', 'scroll', 'dashboard', 'close'}, extra),
    }
    body = read(SRC7, 'ws.html').replace('__SPRITE__', sprite).strip()
    body = body.replace('</div>\n  </div>\n\n  <div class="container is--m">\n    <div class="part-head">\n      <div class="tag-pair"><span class="tag">Part one</span>',
                        '</div>\n  ' + ctrl + '</div>\n\n  <div class="container is--m">\n    <div class="part-head">\n      <div class="tag-pair"><span class="tag">Part one</span>', 1)
    assert 'gslider__ctrl' in body
    for k, v in fills.items():
        assert '{{' + k + '}}' in body, k
        body = body.replace('{{' + k + '}}', v)
    body = re.sub(r'\{\{M:(\w+)\}\}', lambda m: C.media(m.group(1)), body)
    assert '{{' not in body and '__SPRITE__' not in body and '__LOGO_PATH__' not in body
    body = roll(body)
    js = "(() => {\n'use strict';\n" + read(SRC7, 'ws.js').strip() + '\n})();'
    assert '</script' not in js.lower()
    for label, chunk in (('css', css), ('body', body), ('js', js)):
        assert not re.search(r'\b(claude-[a-z0-9-]+|opus|sonnet)\b', chunk, re.I), 'model name in ' + label
    full = f'''<!doctype html>
<html lang="en" class="no-gsap">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{TITLE}</title>
<meta name="description" content="{DESC}">
<meta name="theme-color" content="#101010">
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

<script>
{js}
</script>
</body>
</html>
'''
    write(os.path.join(REPO, 'workshop', 'index.html'), full)
    print(f'workshop: {len(full.encode()):,} bytes')


if __name__ == '__main__':
    build()
