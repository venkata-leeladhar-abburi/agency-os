#!/usr/bin/env python3
"""Assemble the Pharmacy OS pitch deck from src6/ (plus the shared Osmo base in src/ and src2/).
Colours: concrete, carbon indigo, honey amber and a red pen for notes. Fonts: Instrument Sans (page),
Atkinson Hyperlegible Next and Anek Telugu (product screens), Geist Mono and Caveat.
Line figures: @lucasmarkes/hairline from jsDelivr, plus our own figure in src6/hairline/ on the same engine.

Writes:
  - <repo>/pharmacy-os/index.html : the full single-file page
"""
import os
import re
import sys

from build3 import read, css_blocks, SCRIPTS

HERE = os.path.dirname(os.path.abspath(__file__))
SRC, SRC2, SRC6 = (os.path.join(HERE, d) for d in ('src', 'src2', 'src6'))
HL = os.path.join(SRC6, 'hairline')
REPO = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(HERE)

FONTS = ('https://fonts.googleapis.com/css2?family=Instrument+Sans:wdth,wght@75..100,400..700'
         '&family=Atkinson+Hyperlegible+Next:wght@400..700&family=Anek+Telugu:wght@400..700'
         '&family=Geist+Mono:wght@400;500&family=Caveat:wght@500;600&display=swap')
HAIRLINE = 'https://cdn.jsdelivr.net/npm/@lucasmarkes/hairline@0.3.0/dist/index.js'
FAV_SVG = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="18" fill="#201d1d"/>'
           '<g transform="rotate(-45 40 40)"><path d="M40 24H26a16 16 0 0 0 0 32h14z" fill="#A99DFF"/>'
           '<path d="M40 24h14a16 16 0 0 1 0 32H40z" fill="#FFB224"/></g></svg>')
FAVICON = 'data:image/svg+xml,' + FAV_SVG.replace('"', "'").replace('#', '%23').replace('<', '%3C').replace('>', '%3E')
BLOCKS = ['HERO', 'REEL', 'Vertical slider (shared)', 'JOURNEY', 'PORTALS (dark)', 'INVEST', 'FOOTER', 'MODAL CONTENT']
TITLE = 'Pharmacy OS · Pitch deck'
DESC = ('Pharmacy OS by One Stop Solutions: one app for the medical store. Order from the distributor, tick what '
        'arrived, bill and remind. Nothing is typed twice.')

# Mounts the line figures. The package comes from the CDN; if it cannot load, the figure blocks hide themselves.
MODULE = '''
const plates = [...document.querySelectorAll('[data-hl]')];
const custom = window.__poFigures || {};
const reader = p => { const r = p.closest('.fig') && p.closest('.fig').querySelector('[data-hl-read]'); return t => { if (r) r.textContent = t; }; };
const rest = plates.filter(p => { const f = custom[p.dataset.hl]; if (!f) return true; try { f(p, reader(p)); } catch (e) { console.error('[figure]', e); return true; } return false; });
if (rest.length) {
  try {
    const lib = await import('__HAIRLINE__');
    rest.forEach(p => {
      const fn = lib[p.dataset.hl] || lib.riffle;
      fn(p, { theme: p.dataset.hlTheme || 'dark', label: p.dataset.hlLabel, onRead: reader(p) });
    });
  } catch (e) {
    rest.forEach(p => { const f = p.closest('.fig'); if (f) f.classList.add('is--off'); });
  }
}
'''.replace('__HAIRLINE__', HAIRLINE)


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)


def figures():
    """Our own Hairline figures: the unchanged kernel once, then each figure, mounted by a small host."""
    if not os.path.isdir(HL):
        return ''
    names = sorted(f[:-3] for f in os.listdir(HL) if f.endswith('.js') and f not in ('kernel.js', 'host.js'))
    if not names or not os.path.exists(os.path.join(HL, 'kernel.js')):
        return ''
    # The kernel is Hairline's engine (MIT): its licence travels with it, in the repository and on the page.
    notice = ('/*\nHairline kernel, unchanged: https://github.com/lucasmarkes/hairline\n\n'
              + read(HL, 'LICENSE').strip() + '\n*/')
    parts = [notice, read(HL, 'kernel.js').strip(), read(HL, 'host.js').strip()]
    parts += ['(() => {\n' + read(HL, n + '.js').strip() + '\n})();' for n in names]
    js = '\n'.join(parts)
    assert '</script' not in js.lower()
    return '<script>\n' + js + '\n</script>\n'


def build():
    logo = read(HERE, 'logo_path.txt').strip()
    sprite = read(SRC6, 'sprite.html').replace('__LOGO_PATH__', logo).strip()
    css = '[hidden]{display:none!important}\n' + '\n'.join([
        read(SRC, 'base.css').strip(), css_blocks(BLOCKS), read(SRC2, 'shared.css').strip(),
        read(SRC6, 'poui.css').strip(), read(SRC6, 'po.css').strip(), read(SRC6, 'po2.css').strip()])
    body = read(SRC6, 'po.html').replace('__SPRITE__', sprite).strip()
    js = ("(() => {\n'use strict';\n" + read(SRC6, 'content.js').strip() + '\n'
          + read(SRC2, 'core.js').strip() + '\n\n' + read(SRC6, 'povis.js').strip() + '\n\n'
          + read(SRC6, 'po.js').strip() + '\n})();')
    for label, chunk in (('css', css), ('body', body), ('js', js)):
        assert '__LOGO_PATH__' not in chunk and '__SPRITE__' not in chunk, label
        assert not re.search(r'clienter|first.copy|replica', chunk, re.I), 'forbidden word in ' + label
        assert not re.search(r'\b(claude-[a-z0-9-]+|opus|sonnet)\b', chunk, re.I), 'model name in ' + label
    assert '</script' not in js.lower()
    tags = '\n'.join(f'<script src="{u}"></script>' for u in SCRIPTS)
    full = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{TITLE}</title>
<meta name="description" content="{DESC}">
<meta name="theme-color" content="#201d1d">
<meta name="robots" content="noindex">
<meta property="og:title" content="{TITLE}">
<meta property="og:description" content="{DESC}">
<meta property="og:type" content="website">
<link rel="icon" type="image/svg+xml" href="{FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.pexels.com">
<link rel="preconnect" href="https://cdn.jsdelivr.net">
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
{figures()}<script type="module">{MODULE}</script>
</body>
</html>
'''
    write(os.path.join(REPO, 'pharmacy-os', 'index.html'), full)
    print(f'pharmacy-os: {len(full.encode()):,} bytes (css {len(css.encode()):,}, js {len(js.encode()):,})')


if __name__ == '__main__':
    build()
