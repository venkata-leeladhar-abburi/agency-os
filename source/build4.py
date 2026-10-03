#!/usr/bin/env python3
"""Assemble the One Stop Solutions agency website into <repo>/index.html (images live in <repo>/img/)."""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(HERE)
sys.path.insert(0, os.path.join(HERE, 'src2'))
import content as CT  # noqa: E402
from build3 import read, css_blocks, SCRIPTS  # noqa: E402

FONTS = ('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600'
         '&family=Geist+Mono:wght@400;500&family=Caveat:wght@500;600&display=swap')
FAV = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' "
       "fill='%23111'/%3E%3Ccircle cx='32' cy='32' r='14' fill='none' stroke='%23ff5a1f' stroke-width='7'/%3E%3C/svg%3E")
TITLE = 'One Stop Solutions — Design & Dev Studio'
DESC = ('One Stop Solutions designs, builds and scales websites, ERPs, dashboards and apps. '
        'A design and development studio from Andhra Pradesh, India.')

def build():
    logo = read(HERE, 'logo_path.txt').strip()
    sprite = read(HERE, 'src2', 'sprite.html').replace('__LOGO_PATH__', logo).strip()
    css = '[hidden]{display:none!important}\n' + '\n'.join([
        read(HERE, 'src', 'base.css').strip(), css_blocks(['JOURNEY', 'INVEST', 'FOOTER', 'MODAL CONTENT']),
        read(HERE, 'src4', 'site.css').strip()])
    body = read(HERE, 'src4', 'site.html').replace('__SPRITE__', sprite).strip()
    data = {'phases': [{k: v for k, v in p.items() if k != 'team'} for p in CT.PHASES]}
    js = ("(() => {\n'use strict';\nconst C = " + json.dumps(data, ensure_ascii=False) + ';\n'
          + read(HERE, 'src2', 'core.js').strip() + '\n\n' + read(HERE, 'src4', 'site.js').strip() + '\n})();')
    for label, chunk in (('css', css), ('body', body), ('js', js)):
        assert '__LOGO_PATH__' not in chunk and '__SPRITE__' not in chunk, label
        assert not re.search(r'clienter|password', chunk, re.I), 'forbidden word in ' + label
        assert not re.search(r'\b(claude-[a-z0-9-]+|opus|sonnet)\b', chunk, re.I), 'model name in ' + label
    assert '</script' not in js.lower()
    tags = '\n'.join(f'<script src="{u}"></script>' for u in SCRIPTS)
    html = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{TITLE}</title>
<meta name="description" content="{DESC}">
<meta name="theme-color" content="#0b0b0b">
<meta property="og:title" content="{TITLE}">
<meta property="og:description" content="{DESC}">
<meta property="og:type" content="website">
<link rel="icon" type="image/svg+xml" href="{FAV}">
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
    out = os.path.join(REPO, 'index.html')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(html)
    print(f'site: {len(html.encode()):,} bytes')

if __name__ == '__main__':
    build()
