#!/usr/bin/env python3
"""Assemble the One Stop client pitch and the team playbook from src2/ (plus shared Agency OS styles in src/).

Writes, for each page:
  - the repository page (full HTML document) under <repo>/pitch/ and <repo>/playbook/
  - the artifact page (body fragment: <title> first, no html/head/body tags) under artifact2/
The playbook's starter library is written to artifact2/playbook-seed.json for seeding the shared database.
The repository playbook embeds that seed and saves changes in the browser, since it has no shared database.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')
SRC2 = os.path.join(HERE, 'src2')
REPO = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(HERE)
ART_DIR = os.path.join(HERE, 'artifact2')
PITCH_URL = os.environ.get('PITCH_URL', '')

sys.path.insert(0, SRC2)
import content as CT  # noqa: E402

FONTS = ('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600'
         '&family=Geist+Mono:wght@400;500&family=Caveat:wght@500;600&display=swap')
GSAP = [
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js',
]
LENIS = 'https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js'
GLYPH_SVG = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><g fill="#201d1d">'
             '<circle cx="18" cy="18" r="18"/><rect x="44" y="0" width="36" height="36" rx="4"/>'
             '<rect x="0" y="44" width="36" height="36" rx="4"/><path d="M44 80A36 36 0 0 1 80 44V80Z"/></g></svg>')
FAVICON = 'data:image/svg+xml,' + GLYPH_SVG.replace('"', "'").replace('#', '%23').replace('<', '%3C').replace('>', '%3E')


# Each page has its own palette. The shared sources use the Agency OS colours (volt green and violet on warm
# greys); the pitch and the playbook are recoloured here, so the Agency OS deck stays exactly as it is.
PALETTES = {
    # One Stop Solutions brand, matching the agency website: neutral greys, signal orange and ember
    'pitch': {'accents': {'#a1ff62': '#ff5a1f', '#6840ff': '#c2410c', '#a491ff': '#ff9466', '#2b1d7a': '#7c2d12',
                          '#f84131': '#e8470e', '#201d1d': '#111111', '#151313': '#0b0b0b', '#f4f4f4': '#f2f2f2'},
              'grey': lambda L: (L, L, L)},
    # The team workspace, like a notebook: warm paper, forest green and highlighter yellow
    'playbook': {'accents': {'#a1ff62': '#ffd84a', '#6840ff': '#1e4d3b', '#a491ff': '#8fc4a8', '#2b1d7a': '#123326',
                             '#f84131': '#b8432c', '#201d1d': '#1c211e', '#151313': '#121614', '#f4f4f4': '#f5f1e8'},
                 'grey': lambda L: (L + 2, L, L - 8) if L > 140 else (L - 2, L + 1, L - 2)},
}


def recolor(text, name):
    """Swap the shared accent colours for this page's palette and re-tint the warm greys."""
    pal = PALETTES[name]
    rgb = lambda h: tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))
    acc = {rgb(k): rgb(v) for k, v in pal['accents'].items()}

    def swap(c):
        if c in acc:
            return acc[c]
        if max(c) - min(c) > 14 or sum(c) / 3 >= 250:
            return c  # a real colour (status greens and reds) or white: keep it
        return tuple(max(0, min(255, v)) for v in pal['grey'](round(sum(c) / 3)))

    def hex_sub(m):
        return '#%02x%02x%02x' % swap(rgb(m.group(0).lower()))

    def rgba_sub(m):
        r, g, b = swap((int(m.group(2)), int(m.group(3)), int(m.group(4))))
        return f'{m.group(1)}({r},{g},{b}{m.group(5)})'

    text = re.sub(r'#[0-9a-fA-F]{6}\b', hex_sub, text)
    text = re.sub(r'(?<=[\s:(,])#eee\b', lambda m: '#%02x%02x%02x' % swap((238, 238, 238)), text)
    return re.sub(r'(rgba?)\((\d+),\s*(\d+),\s*(\d+)((?:,\s*(?:[\d.]+|var\(--[\w-]+\)))?)\)', rgba_sub, text)

def read(*parts):
    with open(os.path.join(*parts), encoding='utf-8') as f:
        return f.read()


def css_blocks(names):
    """Pick named '/* ===== NAME ===== */' blocks out of the Agency OS sections.css."""
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


def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


def build_seed():
    """The playbook's starter library, one document per item in the shared 'items' collection."""
    src = json.loads(read(SRC2, 'source.json'))
    tool_phases = {}
    for p in src['PHASES']:
        for t in p['t']['tools']:
            tool_phases.setdefault(t, []).append(p['id'])
    items = []
    for i, p in enumerate(src['PROMPTS']):
        items.append({'id': 'prompt-' + p['id'], 'section': 'prompts', 'title': p['title'], 'note': '',
                      'phase': p['p'], 'tool': p['tool'], 'body': p['text'], 'tags': [], 'url': '', 'order': i + 1})
    prompt_ids = {p['id'] for p in src['PROMPTS']}
    for i, r in enumerate(CT.RESEARCH):
        assert r['prompt'] in prompt_ids, r['prompt']
        items.append({'id': 'research-' + r['id'], 'section': 'research', 'title': r['name'], 'note': r['line'],
                      'phase': r['phase'], 'sections': r['sections'], 'example': r['example'],
                      'prompt': 'prompt-' + r['prompt'], 'tags': [], 'url': '', 'order': i + 1})
    for i, (name, v) in enumerate(src['TOOLS'].items()):
        note, core = CT.TOOL_NOTES[name]
        items.append({'id': 'tool-' + slug(name), 'section': 'tools', 'title': name, 'note': note, 'url': v['u'],
                      'group': v['g'], 'cmd': v.get('cmd', ''), 'core': core, 'phases': tool_phases.get(name, []),
                      'tags': [], 'order': i + 1})
    for i, k in enumerate(CT.KB):
        items.append({'id': 'kb-' + k['id'], 'section': 'kb', 'title': k['title'], 'note': k['note'], 'type': k['type'],
                      'tags': k['tags'], 'url': '', 'phase': 'any', 'order': i + 1})
    for i, s in enumerate(CT.SERVICES):
        items.append({'id': 'svc-' + s['id'], 'section': 'services', 'title': s['name'], 'note': s['goal'],
                      'steps': s['steps'], 'deliv': s['get'], 'phases': s['phases'], 'pillar': s['pillar'],
                      'tags': [], 'url': '', 'order': i + 1})
    ids = [x['id'] for x in items]
    assert len(ids) == len(set(ids)), 'duplicate seed ids'
    for x in ids:
        assert re.fullmatch(r'[A-Za-z0-9_.~:@+-]+', x), x
    return items


def check(chunks):
    for label, chunk in chunks.items():
        assert '__' + 'LOGO_PATH__' not in chunk and '__' + 'SPRITE__' not in chunk, label
        assert not re.search(r'clienter', chunk, re.I), 'forbidden word in ' + label


def page(title, desc, css, body, js, scripts, extra_head=''):
    tags = '\n'.join(f'<script src="{u}"></script>' for u in scripts)
    full = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#201d1d">
{extra_head}<link rel="icon" type="image/svg+xml" href="{FAVICON}">
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
    return full, tags


def fragment(title, css, body, js_tags, js):
    return f'''<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}">
<style>
{css}
</style>

{body}

{js_tags}
<script>
{js}
</script>
'''


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)


def build():
    logo = read(HERE, 'logo_path.txt').strip()
    sprite = read(SRC2, 'sprite.html').replace('__LOGO_PATH__', logo).strip()
    core = read(SRC2, 'core.js').strip()
    os.makedirs(ART_DIR, exist_ok=True)

    # ---------- Client pitch ----------
    pitch_content = {
        'phases': [{k: v for k, v in p.items() if k != 'team'} for p in CT.PHASES],
        'pillars': CT.PILLARS, 'services': CT.SERVICES, 'research': CT.RESEARCH, 'docs': CT.DOCS,
        'compare': CT.COMPARE, 'together': CT.TOGETHER, 'principles': CT.PRINCIPLES, 'work': CT.WORK,
    }
    css = '[hidden]{display:none!important}\n' + '\n'.join([
        read(SRC, 'base.css').strip(), read(SRC, 'mui.css').strip(), read(SRC2, 'mui2.css').strip(),
        css_blocks(['HERO', 'REEL', 'INTRO', 'Vertical slider (shared)', 'PROBLEM', 'JOURNEY', 'PORTALS (dark)',
                    'ROADMAP', 'QUESTIONS', 'INVEST', 'FOOTER', 'MODAL CONTENT']),
        read(SRC2, 'shared.css').strip(), read(SRC2, 'pitch.css').strip()])
    body = read(SRC2, 'pitch.html').replace('__SPRITE__', sprite).strip()
    js = ("(() => {\n'use strict';\nconst C = " + json.dumps(pitch_content, ensure_ascii=False) + ';\n'
          + core + '\n\n' + read(SRC2, 'visuals2.js').strip() + '\n\n' + read(SRC2, 'pitch.js').strip() + '\n})();')
    check({'css': css, 'body': body, 'js': js})
    assert '</script' not in js.lower()
    title, desc = 'One Stop Solutions', ('One Stop Solutions: research, brand, design, build and growth for digital '
                                         'products. One team, start to finish.')
    full, tags = page(title, desc, css, body, js, GSAP + [LENIS],
                      f'<meta property="og:title" content="{title}">\n<meta property="og:description" content="{desc}">\n'
                      '<meta property="og:type" content="website">\n')
    full = recolor(full, 'pitch')
    write(os.path.join(REPO, 'pitch', 'index.html'), full)
    write(os.path.join(ART_DIR, 'one-stop-pitch.html'), recolor(fragment(title, css, body, tags, js), 'pitch'))
    print(f'pitch: {len(full.encode()):,} bytes')

    # ---------- Team playbook ----------
    if not os.path.exists(os.path.join(SRC2, 'playbook.js')):
        return
    seed = build_seed()
    write(os.path.join(ART_DIR, 'playbook-seed.json'), json.dumps(seed, ensure_ascii=False, indent=1))
    static = {
        'phases': [{k: v for k, v in p.items() if k in ('id', 'n', 'name', 'tag', 'dd', 'gate', 'team')} for p in CT.PHASES],
        'pillars': [{k: p[k] for k in ('id', 'name', 'theme')} for p in CT.PILLARS],
        'groups': json.loads(read(SRC2, 'source.json'))['TOOL_GROUPS'],
        'tree': json.loads(read(SRC2, 'source.json'))['KB'],
    }
    pcss = '[hidden]{display:none!important}\n' + '\n'.join([
        read(SRC, 'base.css').strip(), css_blocks(['FOOTER', 'MODAL CONTENT']), read(SRC2, 'shared.css').strip(),
        read(SRC2, 'playbook.css').strip()])
    pbody = read(SRC2, 'playbook.html').replace('__SPRITE__', sprite).strip()
    for variant, seed_js, pitch_href in (('repo', json.dumps(seed, ensure_ascii=False), '../pitch/'),
                                         ('artifact', 'null', PITCH_URL)):
        pjs = ("(() => {\n'use strict';\nconst S = " + json.dumps(static, ensure_ascii=False) + ';\n'
               + 'const EMBED_SEED = ' + seed_js + ';\n'
               + 'const PITCH_HREF = ' + json.dumps(pitch_href) + ';\n'
               + core + '\n\n' + read(SRC2, 'playbook.js').strip() + '\n})();')
        check({'css': pcss, 'body': pbody, 'js': pjs})
        assert '</script' not in pjs.lower()
        ptitle = 'One Stop Playbook'
        pdesc = 'The One Stop Solutions team playbook: process, services, research, prompts, tools and knowledge.'
        full, tags = page(ptitle, pdesc, pcss, pbody, pjs, [LENIS], '<meta name="robots" content="noindex, nofollow">\n')
        full = recolor(full, 'playbook')
        if variant == 'repo':
            write(os.path.join(REPO, 'playbook', 'index.html'), full)
            print(f'playbook (repo): {len(full.encode()):,} bytes, {len(seed)} starter items')
        else:
            frag = recolor(fragment(ptitle, pcss, pbody, tags, pjs), 'playbook')
            for s in seed:
                if s['section'] == 'prompts':
                    assert s['body'][:60] not in frag, 'seed text leaked into the artifact page'
            write(os.path.join(ART_DIR, 'one-stop-playbook.html'), frag)
            print(f'playbook (artifact): {len(frag.encode()):,} bytes')


if __name__ == '__main__':
    build()
