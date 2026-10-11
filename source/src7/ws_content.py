"""Content, mini screens and markup for the AI website workshop plan (workshop/index.html).

Everything here is rendered at build time by build7.py, so the page works without JavaScript.
The mini screens use the shared kit in src/mui.css and src2/mui2.css, the same one the client pitch uses.
"""
from html import escape as esc

GLYPH = '<svg viewBox="0 0 80 80" aria-hidden="true"><use href="#i-glyph"/></svg>'
ARROW = '<svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg>'


def P(t, c=''):
    return f'<span class="mui__p {c}">{t}</span>'


def L(w, c=''):
    return f'<i class="mui__ln {c}" style="width:{w}%"></i>'


def TOP(t, r=''):
    return f'<div class="mui__top"><span class="mui__t">{t}</span>{r}</div>'


def CHK(on):
    return f'<i class="mui__chk{" on" if on else ""}"></i>'


def CHROME(url):
    return f'<div class="mb__chrome"><i></i><i></i><i></i><span>{url}</span></div>'


def LIST(rows):
    """rows: (checked or None, text, pill text, pill class)"""
    out = []
    for chk, t, s, c in rows:
        out.append('<div class="mui__li">' + (CHK(chk) if chk is not None else '') + f'<span>{t}</span>'
                   + (P(s, c) if s else '') + '</div>')
    return '<div class="mui__list">' + ''.join(out) + '</div>'


def BOARD(nodes, links):
    paths = []
    for a, b in links:
        x1, y1 = nodes[a][0], nodes[a][1]
        x2, y2 = nodes[b][0], nodes[b][1]
        cx = (x1 + x2) / 2
        paths.append(f'<path d="M{x1} {y1} C{cx} {y1} {cx} {y2} {x2} {y2}"/>')
    spans = ''.join(f'<span class="mui__node {n[3] if len(n) > 3 else ""}" style="--x:{n[0]}%;--y:{n[1]}%">{n[2]}</span>'
                    for n in nodes)
    return ('<div class="mui__board"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">'
            + ''.join(paths) + '</svg>' + spans + '</div>')


def LV(rows):
    """Labelled level bars: (label, percent, colour class)"""
    return ''.join(f'<div class="mpe__lv wlv"><span>{t}</span><div class="mui__prog"><i class="{c}" style="width:{w}%"></i></div></div>'
                   for t, w, c in rows)


# ---------------------------------------------------------------- mini screens
def v_spec():
    rows = [(True, 'Brief', 'Done', 'v'), (True, 'References', 'Done', 'v'),
            (True, 'Sections and copy', 'Done', 'v'), (False, 'Style rules', 'Now', 'u')]
    return (TOP('One-page spec', P('3 of 4', 'v')) + LIST(rows)
            + '<div class="mui__row mui__sb" style="margin-top:auto;font-size:.8em"><span class="mui__mut">Goes into the builder at</span><b>1:35</b></div>'
            + '<div class="mui__prog"><i style="width:75%"></i></div>')


def v_interview():
    return (TOP('ChatGPT · Interview', P('2 of 5', 'v')) + '<div class="mui__chat">'
            '<span class="mui__bub">Who is this site for?</span>'
            '<span class="mui__bub me">A recruiter hiring a junior designer in Hyderabad.</span>'
            '<span class="mui__bub">What should they do?</span>'
            '<span class="mui__bub me">Message me on WhatsApp.</span></div>')


def v_four():
    tiles = [('Who', 'A recruiter with two minutes', ''), ('Proof', 'Three projects, each with a result', ''),
             ('Feel', 'Calm, precise, friendly', ''), ('Action', 'Message me on WhatsApp', 'v')]
    return (TOP('The brief', P('5 lines', 'v')) + '<div class="mui__tiles" style="grid-template-columns:repeat(2,minmax(0,1fr))">'
            + ''.join(f'<div class="mui__tile {c}"><i>{k}</i><span>{t}</span></div>' for k, t, c in tiles) + '</div>')


def v_refs():
    thumbs = [('v', 'Style · Godly'), ('u', 'Layout · Wall of Portfolio'), ('', 'Skipped · a template')]
    return (TOP('References', P('2 picked', 'v')) + '<div class="mui__thumbs">'
            + ''.join(f'<div class="mui__thumb {c}"><div></div><span>{t}</span></div>' for c, t in thumbs) + '</div>'
            + f'<div class="mui__row" style="flex-wrap:wrap;gap:.3em">{P("Editorial")}{P("Condensed type")}{P("Warm ground")}{P("One accent", "v")}</div>')


def v_ceiling():
    return (TOP('How good it can get', P('Ceiling', 'u'))
            + '<div class="mui__col" style="flex:1;justify-content:center;gap:.7em">'
            + LV([('No reference', 34, 'g'), ('A template', 56, 'l'), ('Best in class', 90, 'v')])
            + '</div><div class="mui__row mui__sb mui__mut" style="font-size:.7em"><span>Generic</span><span>Studio-grade</span></div>')


def v_look():
    boxes = [('Pages', 'Awwwards · Godly · Land-book · Lapa Ninja'), ('Apps', 'Mobbin · Refero · Page Flows · Dribbble'),
             ('Motion', '60fps.design · Hoverstates · Design Spells'), ('Collect', 'Savee · Cosmos · Are.na · Pinterest')]
    return (TOP('Where to look', P('4 shelves', 'v')) + '<div class="mui__grid2" style="flex:1;min-height:0">'
            + ''.join(f'<div class="mui__box mui__col" style="gap:.25em"><b style="font-size:.9em">{h}</b><span class="mui__mut" style="font-size:.68em;line-height:1.35">{t}</span></div>'
                      for h, t in boxes) + '</div>')


def v_read():
    pins = [(70, 22), (30, 86), (84, 46), (12, 58), (56, 62)]
    rows = ['Type', 'Colour', 'Space', 'Layout', 'Motion']
    page = (L(46, 'w') + '<i class="mui__ln w" style="width:82%;height:.9em"></i><i class="mui__ln w" style="width:60%;height:.9em"></i>'
            + L(70) + '<i class="mau__hero"></i>' + '<i class="mui__ln" style="width:34%;height:.8em;background:var(--c-volt)"></i>')
    return (TOP('Read a reference', P('5 things', 'v')) + '<div class="mau"><div class="mau__page">' + page
            + ''.join(f'<span class="mau__pin wpin" style="--x:{x}%;--y:{y}%">{i + 1}</span>' for i, (x, y) in enumerate(pins))
            + '</div><div class="mui__list">'
            + ''.join(f'<div class="mui__li"><b class="mau__n wn">{i + 1}</b><span>{t}</span></div>' for i, t in enumerate(rows))
            + '</div></div>')


def v_words():
    return (TOP('Screenshot to words', P('ChatGPT', 'u')) + '<div class="mui__grid2" style="flex:1;min-height:0;grid-template-columns:.8fr 1.2fr">'
            '<div class="mui__box mui__col" style="gap:.35em">' + L(50, 'w') + '<i class="mui__ln w" style="width:90%;height:.8em"></i>'
            + L(70) + '<i class="mau__hero"></i></div>'
            '<div class="mui__col" style="justify-content:center;gap:.45em">'
            f'<div class="mui__row" style="flex-wrap:wrap;gap:.3em">{P("Calm", "v")}{P("Editorial", "v")}{P("Confident", "v")}</div>'
            '<span style="font-size:.74em;line-height:1.4">Large condensed headlines, left-aligned. Warm ground, near-black text, one accent. No shadows.</span>'
            '</div></div>')


def v_wire():
    rows = [('01', 'Hero', 'Who are you?'), ('02', 'Selected work', 'Are you any good?'), ('03', 'Process', 'How do you work?'),
            ('04', 'About', 'Who’s behind this?'), ('05', 'Contact', 'How do I reach you?')]
    return (TOP('Section list', P('5 sections', 'v')) + '<div class="mui__list">'
            + ''.join(f'<div class="mui__li wli"><i class="wnum">{n}</i><span>{t}</span><span class="mui__mut" style="margin-left:auto">{q}</span></div>'
                      for n, t, q in rows) + '</div>')


def v_copy():
    return (TOP('Real words', P('No lorem', 'v')) + '<div class="mui__paper"><span class="mui__mut" style="font-size:.66em">Headline, 10 words</span>'
            '<b style="font-size:1.15em;line-height:1.05;letter-spacing:-.04em">I design apps a shopkeeper can use without a manual.</b>'
            + L(92) + L(78) + L(54) + '<span class="mui__mut" style="font-size:.66em;margin-top:auto">Cut: passionate, innovative, cutting-edge</span></div>')


def v_brand():
    return (TOP('Style rules', P('6 lines', 'v')) + '<div class="mbr"><div class="mbr__logo">' + GLYPH + '<b>Two fonts</b></div>'
            '<div class="mbr__sw"><i style="background:#E6D5BD"></i><i style="background:#D53606"></i><i style="background:#101010;box-shadow:inset 0 0 0 1px rgba(230,213,189,.3)"></i><i style="background:#8F2403"></i></div>'
            '<div class="mbr__type"><span>Aa</span><small>Six sizes</small></div>'
            '<div class="mbr__voice"><small>Space, in eights</small><b>8 · 16 · 24 · 48 · 96</b></div></div>')


def v_scale():
    sizes = [('14', .62), ('17', .76), ('21', .95), ('28', 1.25), ('44', 1.95), ('72', 3.2)]
    bars = [.5, 1, 1.5, 3, 6]
    return (TOP('Scale', P('Big jumps', 'u')) + '<div class="mui__col" style="flex:1;min-height:0;justify-content:center;gap:1.1em">'
            '<div class="mui__row" style="align-items:baseline;gap:.7em">'
            + ''.join(f'<b style="font-size:{s}em;line-height:1;letter-spacing:-.05em">{t}</b>' for t, s in sizes) + '</div>'
            + '<div class="mui__row" style="align-items:flex-end;gap:.5em">'
            + ''.join(f'<i style="display:block;width:{w}em;height:1.1em;border-radius:.2em;background:var(--c-volt)"></i>' for w in bars)
            + '</div></div><div class="mui__row mui__sb mui__mut" style="font-size:.7em"><span>Six sizes</span><span>Space: 8, 16, 24, 48, 96</span></div>')


def v_six():
    rows = [('Fonts', 'Two families'), ('Sizes', 'Six, with big jumps'), ('Colours', 'Ground, ink, one accent'),
            ('Space', 'Multiples of eight'), ('Shape', 'One radius, one line'), ('Images', 'Real, no emoji')]
    return (TOP('The six lines', P('6 of 6', 'v')) + '<div class="mui__list" style="gap:.3em">'
            + ''.join(f'<div class="mui__li wli" style="padding:.34em .5em">{CHK(True)}<span>{a}</span><span class="mui__mut" style="margin-left:auto">{b}</span></div>'
                      for a, b in rows) + '</div>')


def v_prompt():
    code = ('<span class="k">ROLE    </span> Senior front-end developer\n'
            '<span class="k">CONTEXT </span> My one-page spec + reference\n'
            '<span class="s">TASK    </span> Plan first. Then the hero. Stop.\n'
            '<span class="c">LIMITS  </span> No gradients. No emoji. 390px.')
    return (TOP('Build prompt', P('4 parts', 'v')) + f'<pre class="mui__code wcode">{code}</pre>'
            + LIST([(True, 'Plan approved', 'Yes', 'v'), (False, 'Hero section', 'Building', 'u')]))


def v_loop():
    nodes = [(13, 26, 'Spec', 'v'), (38, 26, 'Plan'), (68, 26, 'One section'), (84, 72, 'Screenshot', 'r'), (46, 72, 'One fix', 'u')]
    return TOP('Build loop', P('Repeat', 'u')) + BOARD(nodes, [(0, 1), (1, 2), (2, 3), (3, 4), (4, 2)])


def v_b40():
    st = [('Hero', 5), ('Sections', 20), ('Check', 7), ('Publish', 8)]
    mods = ['Paste spec', 'Plan', 'Hero', 'Work', 'About', 'Contact']
    return (TOP('Build 1 · 40 min', P('Live', 'v')) + '<div class="merp">'
            + '<i class="merp__ar" aria-hidden="true"></i>'.join(
                f'<div class="merp__st{" is--on" if i == 1 else ""}"><b>{n}</b><span>{t}</span></div>' for i, (t, n) in enumerate(st))
            + '</div><div class="mui__row mui__sb" style="margin-top:auto;font-size:.8em"><span class="mui__mut">1:35 → 2:15</span><b>Section 3 of 5</b></div>'
            '<div class="mui__prog"><i style="width:55%"></i></div><div class="merp__mods" style="margin-top:.35em">'
            + ''.join(f'<span class="{"on" if i == 3 else ""}">{m}</span>' for i, m in enumerate(mods)) + '</div>')


def v_site():
    return ('<div class="mbw">' + CHROME('sravanirao.in')
            + '<div class="mws__nav"><b>Sravani Rao</b><span>Work</span><span>About</span><em>Say hello</em></div>'
            '<div class="msa"><div class="mui__col" style="gap:.5em"><b class="msa__h">I design apps a shopkeeper can use without a manual.</b>'
            + L(86) + L(60) + '<span class="msa__btn">See the work</span></div><i class="mnc__img wshot"></i></div></div>')


def v_slop():
    return ('<div class="mbw wslop">' + CHROME('my-portfolio.app')
            + '<div class="wslop__in"><span class="wslop__b">🚀 Available for work</span><b class="wslop__h">Welcome to My Portfolio</b>'
            '<span class="wslop__p">I am a passionate developer who loves innovative solutions</span>'
            '<span class="wslop__btn">Get Started</span><div class="wslop__cards"><i>💻</i><i>🎨</i><i>⚡</i></div></div></div>')


def v_tells():
    rows = [(True, 'Purple gradient'), (True, 'Emoji icons'), (True, 'Centred text'), (True, '“Welcome to…”'),
            (True, 'Three cards'), (False, 'Default font'), (False, 'Glow on boxes')]
    return (TOP('Slop check', P('5 of 7', 'v')) + '<div class="mui__grid2">'
            + ''.join(f'<div class="mui__li wli" style="padding:.4em .5em">{CHK(on)}<span>{t}</span></div>' for on, t in rows) + '</div>'
            '<div class="mui__row mui__sb" style="margin-top:auto;font-size:.8em"><span class="mui__mut">Fixed before publishing</span><b>5 of 7</b></div>'
            '<div class="mui__prog"><i style="width:71%"></i></div>')


def v_phone():
    rows = [(True, 'Nothing overlaps'), (True, 'Every link works'), (True, 'Contact opens WhatsApp'),
            (False, 'Names spelled right'), (False, 'Opens on a second phone')]
    return (TOP('Phone check', P('390px', 'u')) + '<div class="mux"><div class="mux__phone"><span>Sravani Rao</span><span class="on">Hero</span><span>Work</span><span>About</span><span>Contact</span></div>'
            '<div class="mui__list mux__rules">'
            + ''.join(f'<div class="mui__li wli" style="padding:.35em .45em">{CHK(on)}<span>{t}</span></div>' for on, t in rows)
            + '</div></div>')


def v_live():
    rows = [(True, 'Published', 'Done', 'v'), (True, 'Link copied', 'Done', 'v'), (True, 'Opens on mobile data', 'Done', 'v'),
            (False, 'Posted in chat', '2:10', 'u')]
    return TOP('Go live', P('Live', 'v')) + '<div class="mui__search">sravanirao.in</div>' + LIST(rows)


def v_poll():
    return (TOP('Poll · 0:03', P('Live', 'v')) + '<b style="font-size:1.1em;letter-spacing:-.03em">Which one is AI-made?</b>'
            + LIST([(None, 'Site A', '', ''), (None, 'Site B', '', ''), (None, 'Both of them', 'The answer', 'v')]))


def v_promise():
    return (TOP('The promise', P('Live link', 'v')) + '<div class="mui__col" style="flex:1;justify-content:center;gap:.2em">'
            '<span class="mui__mut" style="font-size:.8em">By</span><span class="mui__big" style="font-size:3.6em">2:15</span>'
            '<b>your own site is live</b></div><div class="mui__prog"><i style="width:75%"></i></div>')


def v_web():
    nodes = [(15, 28, 'You type a name', 'v'), (42, 70, 'DNS finds it'), (66, 28, 'Host sends files'), (86, 70, 'Browser draws', 'u')]
    return TOP('Click to screen', P('4 hops', 'u')) + BOARD(nodes, [(0, 1), (1, 2), (2, 3)])


def v_skip():
    rows = [('No brief', '“Welcome to my website”'), ('No reference', 'The internet’s average'), ('No rules', 'Five fonts, nine colours')]
    return (TOP('Skip a step', P('It shows', 'r')) + '<div class="mui__list">'
            + ''.join(f'<div class="mui__li wli" style="padding:.6em .6em"><span class="mui__p r sq">{a}</span><span style="margin-left:.2em">{b}</span></div>'
                      for a, b in rows) + '</div><span class="mui__mut" style="font-size:.72em;margin-top:auto">Client projects die the same way: no scope, no research, no handover.</span>')


def v_scroll():
    thumbs = [('v', 'Reveal'), ('', 'Pin and scrub'), ('', 'Stagger')]
    return (TOP('Scroll story', P('Scrubbed', 'v')) + '<div class="mui__thumbs">'
            + ''.join(f'<div class="mui__thumb {c}"><div></div><span>{t}</span></div>' for c, t in thumbs) + '</div>'
            '<div class="mui__row mui__sb" style="font-size:.8em"><span class="mui__mut">Scroll position</span><b>55%</b></div>'
            '<div class="mui__prog"><i style="width:55%"></i></div>')


def v_dash():
    k = [('Orders today', '48', ''), ('Revenue', '₹62,400', ''), ('Stuck', '7', 'r')]
    rows = [(None, 'Lakshmi P. · Vijayawada', 'Delivered', 'v'), (None, 'Ravi Teja K. · Guntur', 'Packed', ''),
            (None, 'Sai Kiran B. · Nellore', 'Pending', 'r')]
    return (TOP('Orders desk', f'<span class="mui__row">{P("Today", "u")}{P("Week")}</span>') + '<div class="mui__grid3">'
            + ''.join(f'<div class="mui__kpi {c}"><span>{a}</span><b>{b}</b></div>' for a, b, c in k) + '</div>' + LIST(rows))


def v_crit():
    cols = [('Hierarchy', 'One clear thing to look at first?'), ('Spacing', 'Do the gaps follow a pattern?'), ('Type', 'Chosen, or left on default?')]
    return (TOP('Live review', P('2 sites', 'u')) + '<div class="mui__cols3">'
            + ''.join(f'<div><b>{a}</b>{L(90)}{L(60)}<span class="mui__mut" style="font-size:.66em;line-height:1.3;margin-top:auto">{b}</span></div>' for a, b in cols)
            + '</div>')


def v_vote():
    thumbs = [('', 'Kiran · Guntur'), ('v', 'Sravani · Vijayawada'), ('', 'Anusha · Vizag')]
    return (TOP('Vote · 2:56', P('Winner', 'v')) + '<div class="mui__thumbs">'
            + ''.join(f'<div class="mui__thumb {c}"><div></div><span>{t}</span></div>' for c, t in thumbs) + '</div>'
            '<span class="mui__mut" style="font-size:.74em">Every link in chat counts as one vote card.</span>')


def v_kit():
    rows = ['Spec template', 'Prompt packs', 'Slop checklist', 'Inspiration list', 'Feed reset', 'First-client card']
    return (TOP('The kit', P('1 link', 'v')) + '<div class="mui__search">One folder, shared at 2:58</div><div class="mui__grid2">'
            + ''.join(f'<div class="mui__li wli" style="padding:.45em .5em">{CHK(True)}<span>{t}</span></div>' for t in rows) + '</div>')


def v_course():
    rows = [('Brief', 1.2, 7), ('Inspiration, structure', 3.6, 39), ('Style rules', 1.2, 54), ('Prompting, building', 9, 100),
            ('Test, go live', 1.8, 11), ('Getting paid', .3, 25)]
    return (TOP('Time on each stage', f'<span class="mui__row">{P("3 hours", "v")}{P("40 hours")}</span>')
            + '<div class="mui__col" style="flex:1;justify-content:center;gap:.5em">'
            + ''.join(f'<div class="wpair"><span>{t}</span><div><i class="a" style="width:{a}%"></i><i class="b" style="width:{b}%"></i></div></div>'
                      for t, a, b in rows) + '</div>')


V = {k[2:]: f for k, f in list(globals().items()) if k.startswith('v_') and callable(f)}


def media(name, cls=''):
    return f'<div class="media {cls}"><div class="mui">{V[name]()}</div></div>'


# ---------------------------------------------------------------- hero ring
RING = [('spec', 'One-page spec', 'Steps 1–4'), ('interview', 'ChatGPT interview', 'Step 1'), ('refs', 'References', 'Step 2'),
        ('brand', 'Style rules', 'Step 4'), ('site', 'Portfolio', 'Build 1'), ('tells', 'Slop check', 'Step 6'),
        ('scroll', 'Scroll story', 'Build 2'), ('dash', 'Dashboard', 'Build 3')]


def radial():
    items = RING * 3
    out = []
    for i, (v, t, l) in enumerate(items):
        dup = i >= len(RING)
        hid = ' aria-hidden="true"' if dup else ''
        tab = ' tabindex="-1"' if dup else ''
        out.append(f'<div class="radial__item" style="--i:{i}"{hid}>'
                   f'<a class="radial__card" href="#method"{tab}>'
                   f'<span class="media"><span class="mui">{V[v]()}</span></span>'
                   f'<span class="radial__info"><span class="radial__name">{t}</span><span class="eyebrow">{l}</span></span></a></div>')
    return ''.join(out)


# ---------------------------------------------------------------- the three builds (intro slides and dark section)
BUILDS = [
    dict(id='portfolio', vis='site', kind='Everyone builds', name='A portfolio, live on a link',
         line='Forty minutes, hands on. Every student finishes with their own site published.',
         short='Portfolio', job='Get one person to message you', room='40 min · hands on', look='Wall of Portfolio · Godly · Land-book',
         wrong='Generic words, no proof'),
    dict(id='scroll', vis='scroll', kind='Live demo', name='A scroll-animation site',
         line='Twenty minutes. Five moves behind every award site, and the prompt to take home.',
         short='Scroll-animation site', job='Tell one story, one screen at a time', room='20 min · live demo',
         look='60fps.design · Awwwards · Hoverstates', wrong='Too many effects, broken on phones'),
    dict(id='dashboard', vis='dash', kind='Live demo', name='A professional dashboard',
         line='Fifteen minutes. A screen that answers questions follows different rules.',
         short='Dashboard', job='Answer the owner’s daily questions', room='15 min · live demo', look='Mobbin · Refero · Dribbble',
         wrong='Decoration, rainbow charts, fake data'),
]


def slides():
    out = []
    for i, b in enumerate(BUILDS):
        pos = '' if i == 0 else ' data-pos="after"'
        out.append(f'<div class="vslider__item"{pos}><article class="live-card"><div class="live-card__start">'
                   f'<div class="tag-pair"><span class="tag">Build {i + 1}</span><span class="tag" data-shape="round">{b["kind"]}</span></div>'
                   f'<div class="live-card__title"><h3 class="h-s">{b["name"]}</h3><p class="p-s">{b["line"]}</p></div>'
                   f'<span class="eyebrow">0{i + 1} / 03</span></div>{media(b["vis"])}</article></div>')
    return ''.join(out)


def trio():
    out = []
    for i, b in enumerate(BUILDS):
        out.append(
            f'<a class="portal-card trio__card" href="#b-{b["id"]}">{media(b["vis"])}<div class="portal-card__info">'
            f'<div class="portal-card__top"><div><h3 class="h-s">{b["short"]}</h3><p class="p-s">{b["job"]}</p></div>'
            f'<span class="tag portal-card__plan" data-theme="{"volt" if i == 0 else "glass"}" data-shape="round">Build {i + 1}</span></div>'
            f'<dl class="trio__dl"><div><dt>Look at</dt><dd>{b["look"]}</dd></div><div><dt>Goes wrong</dt><dd>{b["wrong"]}</dd></div></dl>'
            f'<div class="portal-card__counts"><span>{b["room"]}</span><span>{b["kind"]}</span></div>'
            f'<div class="portal-card__open"><span>Open the block</span>{ARROW}</div></div></a>')
    return ''.join(out)


# ---------------------------------------------------------------- the hook: tells and fixes
TELLS = [
    ('Purple gradient', 'One flat ground', 'A purple-to-blue gradient on everything', 'One flat ground and one accent colour'),
    ('Emoji icons', 'One icon set', 'Emoji used as icons', 'One icon set such as Lucide, or none'),
    ('Everything centred', 'Left-aligned grid', 'Everything centred', 'Left-aligned words on a grid'),
    ('“Welcome to my website”', 'Says what you do', '“Welcome to my website”', 'Say what you do and for whom, first line'),
    ('Three identical cards', 'Varied layout', 'Three identical cards in every section', 'A list, a split, a full-width band'),
    ('Default font', 'Two chosen fonts', 'A default font in one weight', 'Two fonts and clear jumps in size'),
    ('Glow on every box', 'Flat surfaces', 'Glow and shadow on every box', 'Flat surfaces, a hairline for an edge'),
]
# scattered (x, y, tilt) then filed (x, y), in percent of the stage, plus the point in the slop site each tell is about
CHIP_A = [(64, 20, -7), (86, 25, 6), (72, 39, 4), (91, 50, -9), (62, 60, 8), (83, 70, -5), (68, 84, 6)]
CHIP_B = [(66.5, 33), (66.5, 47), (66.5, 61), (66.5, 75), (86.5, 33), (86.5, 47), (86.5, 61)]
CHIP_T = [(13, 31), (17, 68), (38, 40), (27.5, 43), (38, 68), (27.5, 51), (24, 58.5)]
CHIP_G = ['found', '', 'grow', 'found', '', 'grow', 'found']


def chips():
    out = []
    for k, (t, f, _, _) in enumerate(TELLS):
        a, b = CHIP_A[k], CHIP_B[k]
        out.append(f'<li class="mess__chip" data-g="{CHIP_G[k]}" style="--k:{k};--ax:{a[0]}%;--ay:{a[1]}%;--ar:{a[2]}deg;--bx:{b[0]}%;--by:{b[1]}%">'
                   f'<span class="mess__chip-inner"><span class="from">{t}</span><span class="to">{f}</span></span></li>')
    return ''.join(out)


def chip_lines():
    out = []
    for k, (ax, ay, _) in enumerate(CHIP_A):
        tx, ty = CHIP_T[k]
        cx = (ax + tx) / 2
        out.append(f'<path class="{"is--red" if k % 2 == 0 else ""}" d="M{ax - 6} {ay} C{cx} {ay} {cx} {ty} {tx} {ty}"/>')
    return ''.join(out)


def pains(rows):
    return ''.join(f'<li class="pain"><span class="pain__n">{i + 1:02d}</span><span class="pain__from">{a}</span><span class="pain__to">{b}</span></li>'
                   for i, (a, b) in enumerate(rows))


def tell_pains():
    return pains([(t[2], t[3]) for t in TELLS])


# ---------------------------------------------------------------- the method: seven steps
STEPS = [
    dict(n='01', name='Brief', line='Who is it for?', mins=10, theme='black', vis='interview', mark='black', group='Fills the spec',
         long='Who is it for, and what should they do?', get='ChatGPT: interviewer · Spec part 1', to='b-brief', at='0:20'),
    dict(n='02', name='Inspiration', line='What does great look like?', mins=20, theme='light', vis='refs', mark='black', group='Fills the spec',
         long='Find the best, then get it put into words.', get='ChatGPT: design critic · Spec part 2', to='b-inspiration', at='0:30'),
    dict(n='03', name='Structure', line='What goes on the page?', mins=10, theme='black', vis='wire', mark='black', group='Fills the spec',
         long='Sections in the order a visitor asks questions.', get='ChatGPT: copywriter · Spec part 3', to='b-structure', at='0:50'),
    dict(n='04', name='Style rules', line='What are the rules?', mins=10, theme='light', vis='brand', mark='black', group='Fills the spec',
         long='Six lines that keep AI consistent.', get='ChatGPT: art director · Spec part 4', to='b-style', at='1:00'),
    dict(n='05', name='Build with AI', line='Now prompt, one section at a time.', mins=75, theme='volt', vis='prompt', mark='volt', group='With AI',
         long='Now prompt. One section at a time.', get='ChatGPT: prompt writer · The builder arrives', to='b-prompting', at='1:10'),
    dict(n='06', name='Test', line='Is it slop? Does it work on a phone?', mins=7, theme='dark', vis='tells', mark='', group='Check',
         long='Seven tells and five phone checks.', get='ChatGPT: reviewer · Before anyone publishes', to='b-portfolio', at='2:00'),
    dict(n='07', name='Go live', line='Publish and share the link.', mins=8, theme='violet', vis='live', mark='violet', group='Ship',
         long='Publish, open it on a phone, post the link.', get='ChatGPT: proofreader · One live link', to='b-portfolio', at='2:07'),
]


def pillars():
    return ''.join(
        f'<a class="pillar is--{s["theme"]}" href="#{s["to"]}"><span class="pillar__top"><span class="eyebrow">{s["n"]}</span>'
        f'<span class="pillar__count tnum">{s["mins"]}</span></span><span class="pillar__name">{s["name"]}</span>'
        f'<span class="pillar__line">{s["line"]}</span></a>' for s in STEPS)


def svc_grid():
    out = []
    for s in STEPS:
        mark = f' is--{s["mark"]}' if s['mark'] else ''
        out.append(
            f'<article class="svc"><div class="svc__media media"><div class="mui">{V[s["vis"]]()}</div></div><div class="svc__body">'
            f'<div class="svc__top"><span class="svc__pillar{mark}"><i></i>{s["group"]}</span><span class="eyebrow tnum">{s["n"]}</span></div>'
            f'<h3 class="svc__name">{s["name"]}</h3><p class="svc__line">{s["long"]}</p><p class="svc__get">{s["get"]}</p></div>'
            f'<a class="svc__open" href="#{s["to"]}"><span>Open {s["at"]}</span>{ARROW}<span class="sr-only">: {s["name"]}</span></a></article>')
    out.append(
        f'<article class="svc is--spec"><div class="svc__media media"><div class="mui">{V["spec"]()}</div></div><div class="svc__body">'
        '<div class="svc__top"><span class="svc__pillar is--volt"><i></i>Steps 01 to 04</span><span class="eyebrow tnum">1 page</span></div>'
        '<h3 class="svc__name">The one-page spec</h3><p class="svc__line">Four parts, written before the break. Pasted into the builder at 1:35.</p>'
        '<p class="svc__get">Brief · References · Sections · Style rules</p></div>'
        f'<a class="svc__open" href="#b-style"><span>See it filled in</span>{ARROW}</a></article>')
    return ''.join(out)


# ---------------------------------------------------------------- run sheet: twelve blocks
BLOCKS = [
    dict(id='hook', t0='0:00', t1='0:10', mins=10, kind='n', theme='volt', label='The hook', name='Which one did AI make?',
         short='Two sites, one poll, one promise', out='A reason to stay',
         lede='Open with a question, not an introduction. Introductions can wait until they care.',
         chips=['Poll', 'No slides yet'],
         teach=['Put two versions of the same portfolio on screen and run the poll.', 'Reveal that both are AI-made, by the same tool, on the same day.',
                'Name the difference: one started with a prompt, the other with a page.', 'Make the promise: “By 2:15 your own site is live.”'],
         do=['Vote A, B or both.', 'Type their name and town in chat. It warms the chat up for the link wall.'],
         chat=['0:03 · Poll: which one is AI-made?', '0:08 · Your name and town'],
         say='Both are AI-made. One had a brief, a reference and rules. The other had a prompt.',
         figs=[('poll', 'Chat moment', 'The poll', 'Three options. The answer is the third.'),
               ('slop', 'Site A', 'Prompt only', 'One line: “make me a portfolio website”. Build this yourself, so the reveal is honest.'),
               ('site', 'Site B', 'Spec first', 'A brief, two references and six rules. Same tool, same day.')]),
    dict(id='map', t0='0:10', t1='0:20', mins=10, kind='n', theme='dark', label='The map', name='How professionals work',
         short='Seven steps, and how a site reaches a phone', out='The map for the day',
         lede='Ten minutes of theory, and the only ten. It gives the rest of the day a map.',
         chips=['Show the seven steps'],
         teach=['The seven steps on one slide, with AI in fifth place.', 'Why a skipped step always shows in the result.',
                'How a website reaches a phone, so that “live” means something.'],
         do=['Answer in chat: which step do you think AI is best at, and which worst?'],
         chat=['0:16 · Which step is AI best at, and worst?'],
         say='AI is step five, not step one.',
         figs=[('skip', 'Why the order matters', 'Skip a step and it shows', 'No brief, no reference, no rules. Each leaves a mark anyone can spot.'),
               ('web', 'Four words they will hear all day', 'From a click to a screen', 'Domain, DNS, hosting, browser. With an AI builder, Publish does the middle two.'),
               ('promise', 'Where this is going', 'A live link by 2:15', 'SSL is the padlock in the address bar: nobody can read along.')]),
    dict(id='brief', t0='0:20', t1='0:30', mins=10, kind='a', theme='light', label='Step 1 of 7 · Brief', name='One visitor, one action',
         short='ChatGPT interviews each student', out='A five-line brief',
         lede='A website is for one kind of visitor doing one thing. Everything else on the page helps that happen.',
         chips=['ChatGPT: interviewer', 'Spec part 1'],
         teach=['Four questions every brief answers: who, what proof, what feeling, what action.',
                'For a portfolio, the visitor is a recruiter or a client deciding whether to message you.',
                'Never write a brief from a blank page. Let ChatGPT interview you.'],
         do=['Run the interview prompt and answer honestly.', 'Paste the five-line brief into the spec.', 'Post the brief in one line in chat.'],
         chat=['0:26 · Your brief in one line'],
         say='If you can’t say who it’s for in one line, AI can’t either.',
         figs=[('interview', 'ChatGPT’s job', 'The interview', 'Five questions, one at a time. Then it writes the brief.'),
               ('four', 'What comes out', 'Four answers', 'Who is visiting, what proof they need, how it should feel, what they should do.')],
         prompt=('Prompt for ChatGPT · The interview',
                 'Act as a senior web strategist. Interview me so you can write the brief for my portfolio website. Ask five questions, one at a time: who the site is for, what I want them to do, what proof I can show, three words for how it should feel, and what I don’t want. Then write the brief in five lines.')),
    dict(id='inspiration', t0='0:30', t1='0:50', mins=20, kind='a', theme='cloud', label='Step 2 of 7 · Inspiration', name='Aim at the best',
         short='Find the best, then get it put into words', out='Two references and their style words',
         lede='AI gives you the average of everything it has seen. A reference tells it which end of the scale to aim for.',
         chips=['ChatGPT: design critic', 'Spec part 2'],
         teach=['Pick references from the best sites in the world, not from the first result.', 'Where professionals look, sorted by the kind of site.',
                'How to look: five things to read in any site.', 'You can’t prompt for what you can’t name. ChatGPT turns a screenshot into the words.',
                'Borrow the rules, never the pixels. No copied text, photos or logos.'],
         do=['Find two references: one for style, one for layout.', 'Screenshot both and run the “read this design” prompt.',
             'Paste the style words into the spec and drop both links in chat.'],
         chat=['0:36 · Your two reference links', '0:46 · The three adjectives ChatGPT gave you'],
         say='Your output can never beat your reference.',
         figs=[('ceiling', 'The idea, not a measurement', 'The reference sets the ceiling', 'No reference gives the internet’s average. The best site in the category gets close to studio work.'),
               ('look', 'From the resource vault', 'Where professionals look', 'Four shelves: pages, apps, motion, and somewhere to collect what you find.'),
               ('read', 'How to look', 'Five things to read', 'Type, colour, space, layout, motion. Study the site instead of scrolling past it.'),
               ('words', 'ChatGPT’s job', 'A screenshot becomes words', 'Three adjectives and a five-line style brief, pasted into part 2 of the spec.')],
         prompt=('Prompt for ChatGPT · Read this design',
                 'Here is a screenshot of a website I admire. Describe its design the way a senior designer would brief a developer: fonts (style, weight, sizes), colours with hex guesses, spacing, layout grid, imagery and motion. End with three adjectives for the mood and a five-line style brief I can reuse.')),
    dict(id='structure', t0='0:50', t1='1:00', mins=10, kind='a', theme='light', label='Step 3 of 7 · Structure', name='Words first, layout second',
         short='Sections in the order a visitor asks', out='A section list and real copy',
         lede='A page is a conversation. The sections answer the visitor’s questions in the order they ask them.',
         chips=['ChatGPT: copywriter', 'Spec part 3'],
         teach=['Write the section list before anything visual. Five or six sections are enough.', 'Give every section one job. If it has two, split it or cut it.',
                'Use real words from the start. Placeholder text hides the problems.', 'ChatGPT drafts, the student edits. Anything untrue comes out.'],
         do=['Write their section list.', 'Get a first draft of the copy from the brief, then fix it.', 'Post the section list in chat.'],
         chat=['0:56 · Your section list'],
         say='Design the words first. The layout is only where the words go.',
         figs=[('wire', 'One question each', 'Five sections, five questions', 'Who are you, are you any good, how do you work, who’s behind this, how do I reach you.'),
               ('copy', 'ChatGPT’s job', 'Real words, edited', 'A headline under ten words. No “passionate”, no “innovative”.')],
         prompt=('Prompt for ChatGPT · The copy',
                 'Using the brief above, write the copy for five sections of my portfolio: hero, selected work, process, about, contact. Use plain words. No “passionate”, “innovative” or “cutting-edge”. Keep the headline under ten words. For each project give what it was, what I did and the result. If you don’t have a fact, ask me for it instead of inventing it.')),
    dict(id='style', t0='1:00', t1='1:10', mins=10, kind='a', theme='cloud', label='Step 4 of 7 · Style rules', name='Six lines that make it look expensive',
         short='Six lines that keep AI consistent', out='The finished one-page spec',
         lede='Consistency is what reads as professional. AI is inconsistent by default, so hand it rules.',
         chips=['ChatGPT: art director', 'Spec part 4'],
         teach=['Type is the fastest signal of quality. Two families, six sizes, big jumps.', 'Ground, ink and one accent. Check the contrast first.',
                'Space in multiples of eight. More empty space reads as more expensive.', 'Real photos, one icon set, no emoji.'],
         do=['Fill in their six lines, starting from the style words in step 2.', 'Pick two fonts and three colours.', 'Post the font pair in chat.'],
         chat=['1:06 · Your font pair'],
         say='Decorating is adding things. Designing is deciding things.',
         figs=[('brand', 'Lines 1 and 3', 'Fonts and colours', 'Two families at most. Ground, ink and one accent.'),
               ('scale', 'Lines 2 and 4', 'Sizes and space', 'Six sizes with big jumps. Space in eights.'),
               ('six', 'Part 4 of the spec', 'All six lines', 'Fonts, sizes, colours, space, shape, images.')]),
    dict(id='prompting', t0='1:10', t1='1:25', mins=15, kind='b', theme='violet', label='Step 5 of 7 · The technique', name='Brief AI the way you’d brief a developer',
         short='How to brief AI, and how to correct it', out='A build prompt',
         lede='The spec is done. Now the technique: how to ask, and how to correct.',
         chips=['ChatGPT: prompt writer', 'Lovable · Bolt · v0 · Replit'],
         teach=['A build prompt has four parts: role, context, task, constraints. The spec is the context.', 'One section at a time. Ask for a plan, then the hero, then stop.',
                'Correct with a screenshot. Name the element, the property and the value.', 'One change per message, and say what must not change.',
                'If it goes wrong three times, stop arguing. Open a fresh chat and paste the spec again.'],
         do=['Spot the missing part in a weak prompt you show.', 'Rewrite “make it look better” as an instruction a developer could follow.'],
         chat=['1:13 · Which part is this prompt missing?', '1:20 · Rewrite “make it better”'],
         say='If the code outlives the afternoon, start with a spec.',
         figs=[('prompt', 'Four parts', 'The build prompt', 'Role, context, task, constraints. The spec is the context.'),
               ('loop', 'Specify, plan, build, verify', 'The build loop', 'One section, one screenshot, one fix. Then the next section.')],
         pains=('Correct it like a designer', [
             ('“Make it look better.”', 'Hero headline: 72px, bold, left-aligned. Remove the gradient.'),
             ('“The spacing is off.”', '96px between sections, 24px under a heading. Change nothing else.'),
             ('“It looks AI.”', 'Lucide icons, one accent, and a two-column list instead of three cards.'),
             ('“Fix mobile.”', 'At 390px, stack the columns and turn the nav into a menu button.')])),
    dict(id='break', t0='1:25', t1='1:35', mins=10, kind='k', theme='black', label='Break', name='Ten minutes',
         short='Sign in to the builder', out='An open, signed-in builder',
         lede='Keep the stream on with the two hook sites on a loop. Everyone signs in to the AI builder before they come back, so the build starts at 1:35 and not at 1:42.'),
    dict(id='portfolio', t0='1:35', t1='2:15', mins=40, kind='b', theme='volt', label='Build 1 · Steps 5, 6 and 7', name='Portfolio: spec in, site out, link live',
         short='Spec in, site out, slop check, publish', out='A live link',
         lede='The only hands-on build, so it gets the most time. Build your own beside them and say every decision out loud.',
         chips=['Everyone builds', 'ChatGPT: reviewer'],
         teach=['1:35 · Paste the spec. Ask for the plan, say yes, get the hero.', '1:40 · One section at a time. After each: screenshot, name what’s wrong, one fix.',
                '2:00 · Stop building. Run the slop check and the phone check.', '2:07 · Publish. Every link goes into chat.'],
         do=['Build their own portfolio from their own spec.', 'Run the seven tells and the five phone checks.', 'Publish and post the link.'],
         chat=['1:38 · Thumbs-up when your hero is on screen', '1:55 · One student shares a screen', '2:10 · The link wall'],
         say='It works. It is not good. Now we fix that.',
         figs=[('spec', '1:35', 'Paste the whole page', 'The spec goes in first. Ask for the plan before any code.'),
               ('b40', 'Forty minutes', 'Four moves', 'Hero in five, sections in twenty, checks in seven, publish in eight.'),
               ('site', 'Step 5', 'Section by section', 'By 1:40 every student sees their own name on a page. That early win carries the room.'),
               ('tells', 'Step 6', 'The slop check', 'The same seven tells from the hook. Fix them before anything else.'),
               ('phone', 'Step 6', 'The phone check', 'Shrink the window to 390px. Nothing overlaps, nothing scrolls sideways.'),
               ('live', 'Step 7', 'Go live', 'The builder’s free link is enough today. A domain can wait until there is a client.')]),
    dict(id='scroll', t0='2:15', t1='2:35', mins=20, kind='b', theme='dark', label='Build 2 · Live demo', name='Scroll-animation site: the page is a film',
         short='The five moves behind award sites', out='The scroll prompt pack',
         lede='Students watch one scroll story come together and take the prompt home. Nobody builds, so nobody falls behind.',
         chips=['GSAP · Rive · LottieFiles · Spline', '60fps.design · Awwwards'],
         teach=['Five moves make up almost every award-winning scroll site. Learn the names and you can ask for them.', 'One idea per screen, and three moves a page at most.',
                'Motion follows the finger, not a timer. Slow and short reads as premium.', 'Test on a phone, and switch motion off for people who ask for less.'],
         do=['Play “name the move” in chat while you scroll a real site.', 'Save the prompt pack.'],
         chat=['2:25 · Name the move'],
         say='The page is a film. The scrollbar is the play button.',
         prompt=('Prompt for the builder · A scroll story',
                 'Build a one-page scroll story for [product] using GSAP ScrollTrigger. Section 1: the product name fills the screen and fades out as I scroll. Section 2: pin for two screen heights and scrub through three facts. Section 3: reveal six photos with a 0.1 second stagger. Section 4: move the background at half speed behind the order button. Use power2.out easing and animate nothing else. Switch all motion off under prefers-reduced-motion. Follow my style rules: [paste the six lines].')),
    dict(id='dashboard', t0='2:35', t1='2:50', mins=15, kind='b', theme='violet', label='Build 3 · Live demo', name='Dashboard: a screen that answers questions',
         short='A screen that answers questions', out='The dashboard prompt pack',
         lede='A dashboard follows different rules from a landing page and needs different references. That contrast is the lesson.',
         chips=['Untitled UI · Magic UI · 21st.dev', 'Mobbin · Refero'],
         teach=['Start with the three questions the owner asks every morning.', 'Five parts: sidebar, header, key numbers, one main chart, the table.',
                'Density over decoration. Numbers right-aligned, colour only for status.', 'Data that looks real: local names, rupees, real dates. Then the empty, loading and error states.'],
         do=['Spot three mistakes on the slop dashboard you show.', 'Save the prompt pack.'],
         chat=['2:40 · Spot three mistakes: too many numbers, rainbow charts, a 3D pie'],
         say='A landing page tells a story. A dashboard answers a question.',
         prompt=('Prompt for the builder · A dashboard',
                 'Build an orders dashboard for [business]. It must answer three questions: how many orders came in today, how much money, and what is stuck. Layout: a 240px sidebar with six links, a header with the page title, search and a date range, a row of four key numbers, one bar chart of orders by day, and a table of the latest eight orders with a status. Use realistic sample data with Indian names and rupees. Right-align the numbers. Use colour only for status. Include the empty state for the table. Follow my style rules: [paste the six lines].')),
    dict(id='close', t0='2:50', t1='3:00', mins=10, kind='n', theme='light', label='The close', name='Review, vote, and Monday',
         short='Review two sites, vote, what to do on Monday', out='A seven-day plan',
         lede='End on their work, not on your slides.',
         chips=['Kit link', 'Group link'],
         teach=['Review two volunteer sites, two minutes each, through three lenses.', 'Run the vote and name the winner.',
                'Point to the feed reset and the first-client card. One minute each.', 'Say what comes next and share the group link.'],
         do=['Volunteer a link for review.', 'Vote for the best site in chat.', 'Join the group.'],
         chat=['2:52 · Live review of two sites', '2:56 · Vote for the best site'],
         say='The tool will change next month. The seven steps won’t.',
         figs=[('crit', 'It works. Is it good?', 'Three lenses', 'Hierarchy, spacing and rhythm, type choices.'),
               ('vote', 'Chat moment', 'The vote', 'The winner gets the prize you chose before Sunday.'),
               ('kit', 'Hand out', 'The kit link', 'Six things in one folder, shared with the group link.')]),
]


NAMES = {'hook': ('The hook', 'The hook'), 'map': ('How professionals work', 'The map'), 'brief': ('Step 1: Brief', 'Brief'),
         'inspiration': ('Step 2: Inspiration', 'Inspiration'), 'structure': ('Step 3: Structure', 'Structure'),
         'style': ('Step 4: Style rules', 'Style rules'), 'prompting': ('Step 5: Prompting', 'Prompting'), 'break': ('Break', 'Break'),
         'portfolio': ('Build 1: Portfolio', 'Portfolio'), 'scroll': ('Build 2: Scroll-animation site', 'Scroll site'),
         'dashboard': ('Build 3: Dashboard', 'Dashboard'), 'close': ('Close', 'Close')}


def gantt():
    out = ['<li class="gt__row gt__head"><span>Starts</span><span>Block</span><div class="gt__axis" aria-hidden="true"><span style="left:0">0:00</span><span style="left:33.333%">1:00</span><span style="left:66.667%">2:00</span><span style="left:100%">3:00</span></div><span>Students now have</span></li>']
    start = 0
    for b in BLOCKS:
        flip = ' l' if start >= 120 else ''
        out.append(f'<li><a class="gt__row" href="#b-{b["id"]}" data-k="{b["kind"]}" style="--s:{start};--m:{b["mins"]}">'
                   f'<span class="gt__t tnum">{b["t0"]}</span><span class="gt__n"><b>{NAMES[b["id"]][0]}</b><span>{b["short"]}</span></span>'
                   f'<span class="gt__g"><i></i><em class="{flip.strip()}">{b["mins"]} min</em></span><span class="gt__o">{b["out"]}</span></a></li>')
        start += b['mins']
    return ''.join(out)


def stage_cards():
    out = []
    for i, b in enumerate(BLOCKS):
        tag = {'n': 'Block', 'a': 'Before the prompt', 'b': 'With AI', 'k': 'Break'}[b['kind']]
        out.append(
            f'<div class="gslider__item"><a class="stage-card is--{b["theme"]}" href="#b-{b["id"]}" aria-label="{b["t0"]}: {esc(b["name"])}">'
            f'<div class="stage-card__top"><div class="tag-pair"><span class="tag">{tag}</span><span class="tag" data-shape="round">{i + 1:02d} / 12</span></div>'
            f'<span class="eyebrow tnum">{b["mins"]} min</span></div><div class="stage-card__num tnum" aria-hidden="true">{b["t0"]}</div>'
            f'<div class="stage-card__body"><h3 class="h-m">{NAMES[b["id"]][1]}</h3><p class="p-m">{b["short"]}.</p>'
            f'<p class="stage-card__out">Students now have: {b["out"][0].lower() + b["out"][1:]}</p></div></a></div>')
    return ''.join(out)


def lane(label, items, cls=''):
    return f'<div class="sd__lane {cls}"><h4>{label}</h4><ul class="dl">' + ''.join(f'<li>{x}</li>' for x in items) + '</ul></div>'


def fig(v, eyebrow, name, line):
    return (f'<article class="figc">{media(v)}<div class="figc__body"><p class="eyebrow">{eyebrow}</p>'
            f'<h4 class="figc__name">{name}</h4><p class="figc__line">{line}</p></div></article>')


def prompt_card(label, text):
    return (f'<div class="prm"><div class="prm__top"><span class="eyebrow">{label}</span>'
            '<button class="copy" type="button" data-copy><svg viewBox="0 0 16 16" aria-hidden="true"><use href="#i-copy"/></svg><span>Copy</span></button></div>'
            f'<p class="prm__text">{text}</p></div>')


def panel(i, b, extra=''):
    nxt = BLOCKS[i + 1] if i + 1 < len(BLOCKS) else None
    if b['kind'] == 'k':
        return (f'<article class="blk" id="b-{b["id"]}"><div class="svc-cta brk"><div><p class="eyebrow">{b["t0"]} → {b["t1"]}</p>'
                f'<h3 class="h-s">Break, ten minutes</h3><p class="p-m">{b["lede"]}</p></div>'
                f'<span class="brk__num tnum" aria-hidden="true">{b["t0"]}</span></div></article>')
    chips = ''.join(f'<span class="tag" data-theme="haze" data-shape="round">{c}</span>' for c in [f'{b["mins"]} min'] + b.get('chips', []))
    then = f'Then: {nxt["t0"]} {NAMES[nxt["id"]][1]}' if nxt else 'Then: the group, and Monday'
    head = (f'<div class="sd__head"><span class="sd__num tnum">{b["t0"]} → {b["t1"]}</span><h3 class="h-m">{b["name"]}</h3>'
            f'<p class="sd__out">{b["lede"]}</p></div><div class="blk__chips"><span class="tag">{b["label"].split(" · ")[0]}</span>{chips}</div>')
    lanes = ('<div class="sd__lanes">' + lane('You teach', b['teach']) + lane('Students do', b['do'], 'is--get') + lane('In the chat', b['chat'])
             + f'<div class="sd__lane is--kb"><h4>Say it</h4><p class="h-xs">“{b["say"]}”</p><p class="p-s sd__then">{then}</p></div></div>')
    figs = b.get('figs', [])
    pr = prompt_card(*b['prompt']) if b.get('prompt') else ''
    pn = ''
    if b.get('pains'):
        pn = f'<div class="blk__sub"><h4 class="h-xs">{b["pains"][0]}</h4><ol class="pains">{pains(b["pains"][1])}</ol></div>'
    side = ''
    if len(figs) == 2 and (pn or pr):
        side, pn, pr = (pn, '', pr) if pn else (pr, pn, '')
    two = ' is--2' if len(figs) == 2 and not side else ''
    figs_html = f'<div class="figs{two}" data-n="{len(figs)}">' + ''.join(fig(*f) for f in figs) + side + '</div>' if figs else ''
    return (f'<article class="blk" id="b-{b["id"]}"><div class="stage-detail"><div class="sd">{head}{lanes}</div>'
            f'{figs_html}{extra}{pn}{pr}</div></article>')


# ---------------------------------------------------------------- the dial
DIAL = [('hook', 0, 10, 'Hook', 'n'), ('map', 10, 10, 'The map', 'n'), ('brief', 20, 10, 'Brief', 'a'), ('inspiration', 30, 20, 'Inspiration', 'a2'),
        ('structure', 50, 10, 'Structure', 'a'), ('style', 60, 10, 'Style rules', 'a2'), ('prompting', 70, 15, 'Prompting', 'b2'),
        ('break', 85, 10, 'Break', 'k'), ('portfolio', 95, 40, 'Portfolio', 'b'), ('scroll', 135, 20, 'Scroll site', 'b2'),
        ('dashboard', 155, 15, 'Dashboard', 'b'), ('close', 170, 10, 'Close', 'n')]


def dial():
    import math
    ro, ri = 200, 152

    def pt(r, a):
        t = math.radians(a - 90)
        return r * math.cos(t), r * math.sin(t)

    def arc(a0, a1, r0, r1):
        x0, y0 = pt(r0, a0); x1, y1 = pt(r0, a1); x2, y2 = pt(r1, a1); x3, y3 = pt(r1, a0)
        return f'M{x0:.1f} {y0:.1f}A{r0} {r0} 0 0 1 {x1:.1f} {y1:.1f}L{x2:.1f} {y2:.1f}A{r1} {r1} 0 0 0 {x3:.1f} {y3:.1f}Z'

    def tm(m):
        return f'{m // 60}:{m % 60:02d}'

    segs, labels = [], []
    for bid, s, d, label, c in DIAL:
        segs.append(f'<a href="#b-{bid}" class="dial__seg is--{c}"><title>{tm(s)} to {tm(s + d)}, {label}</title><path d="{arc(s * 2 + .9, (s + d) * 2 - .9, ro, ri)}"/></a>')
        mid = (s + d / 2) * 2
        x, y = pt(ro + 16, mid)
        if abs(mid - 180) < 6:
            anchor, y = 'middle', y + 20
        elif mid < 180:
            anchor = 'start'
        else:
            anchor = 'end'
        dy = -14 if (mid < 40 or mid > 320) else (10 if 140 < mid < 220 and anchor != 'middle' else -4)
        labels.append(f'<text x="{x:.1f}" y="{y + dy:.1f}" text-anchor="{anchor}"><tspan class="dial__t">{tm(s)}</tspan><tspan class="dial__n" x="{x:.1f}" dy="22">{label}</tspan></text>')
    dots = ''.join(f'<circle cx="{pt(136, a)[0]:.1f}" cy="{pt(136, a)[1]:.1f}" r="2"/>' for a in range(0, 360, 12))
    return ('<svg class="dial" viewBox="-352 -276 704 560" role="img" aria-label="The 180 minutes as a dial: 70 minutes before the prompt, 100 minutes with AI, 10 to close.">'
            '<defs><pattern id="dl-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="2.4" height="7" fill="#E6D5BD" fill-opacity=".5"/></pattern>'
            '<radialGradient id="dl-glow"><stop offset="0" stop-color="#D53606" stop-opacity=".5"/><stop offset="1" stop-color="#D53606" stop-opacity="0"/></radialGradient></defs>'
            f'<circle r="250" fill="url(#dl-glow)"/><g class="dial__dots">{dots}</g>' + ''.join(segs) + '<g class="dial__lbl">' + ''.join(labels) + '</g>'
            '<text class="dial__big" text-anchor="middle" y="-2">180</text><text class="dial__sub" text-anchor="middle" y="24">minutes</text>'
            '<g class="dial__key"><rect x="-88" y="47" width="11" height="11" rx="2" fill="#E6D5BD"/><text x="-70" y="58">70 before the prompt</text>'
            '<rect x="-88" y="72" width="11" height="11" rx="2" fill="#D53606"/><text x="-70" y="83">100 with AI</text></g></svg>')


# ---------------------------------------------------------------- nav time strip
def time_strip():
    return ''.join(f'<a href="#b-{b["id"]}" class="is--{b["kind"]}" style="flex:{b["mins"]}" data-t="{b["t0"]}" '
                   f'title="{b["t0"]} {esc(b["name"])}"><span class="sr-only">{b["t0"]} {esc(b["name"])}</span></a>' for b in BLOCKS)


# ---------------------------------------------------------------- take-home, backstage
DAYS = [('Search', 'Ten craft topics on Instagram, Threads, YouTube and X.'), ('Follow', 'Twenty people who post their work, not their opinions.'),
        ('Save', 'Save and share the good posts. It is the strongest signal.'), ('Mute', 'Tap “Not interested” on everything else.'),
        ('Watch', 'Subscribe to five build channels. Finish one video.'), ('Collect', 'Start a swipe file: one site, one line on why it works.'),
        ('Post', 'Rebuild one section you saved, and post it.')]


def rail():
    return ''.join(f'<li class="rail__st{" is--active" if i == 6 else " is--passed"}"><span class="rail__dot"></span><span class="rail__n">Day {i + 1}</span>'
                   f'<span class="rail__name">{a}</span><span class="rail__txt">{b}</span></li>' for i, (a, b) in enumerate(DAYS))


ROUTE = [('Pick a local business', 'A shop, clinic or coaching centre with a weak website, or none.'), ('Rebuild its home page', 'With the seven steps, in one evening.'),
         ('Send the before and after', 'Two screenshots and three lines of message.'), ('Quote three options', 'Three choices are easier to say yes to than one price.'),
         ('Take an advance', 'Before any more work starts.'), ('Hand over, then stay', 'Offer monthly upkeep. One project becomes recurring income.')]


def route():
    return ''.join(f'<li style="--k:{i}"><span class="route__n">{i + 1:02d}</span><span class="route__t"><b>{a}</b><span>{b}</span></span></li>'
                   for i, (a, b) in enumerate(ROUTE))


BEATS = [(3, 'Poll: which one is AI-made?'), (8, 'Your name and town'), (16, 'Which step is AI best at, and worst?'), (26, 'Your brief in one line'),
         (36, 'Your two reference links'), (46, 'The three adjectives ChatGPT gave you'), (56, 'Your section list'), (66, 'Your font pair'),
         (73, 'Which part is this prompt missing?'), (80, 'Rewrite “make it better”'), (98, 'Thumbs-up when your hero is on screen'),
         (115, 'One student shares a screen'), (130, 'The link wall'), (145, 'Name the move'), (160, 'Spot three mistakes'),
         (172, 'Live review of two sites'), (176, 'Vote for the best site')]


def beats():
    dots = ''.join(f'<i style="--t:{m}" title="{m // 60}:{m % 60:02d} {esc(t)}"></i>' for m, t in BEATS)
    lst = ''.join(f'<li><b class="tnum">{m // 60}:{m % 60:02d}</b><span>{t}</span></li>' for m, t in BEATS)
    return dots, lst


HABITS = [('Make them type', 'Every ten minutes there is something to put in chat. Listening alone loses a video call.', 'Chat'),
          ('Use their names', '“Sravani from Guntur asked…” makes fifty people feel seen.', 'Names'),
          ('Telugu to explain, English to name', 'Explain in Telugu. Keep the terms they will search for later in English.', 'Language'),
          ('A win by 1:40', 'Five minutes into the build, every student sees their own name on a page.', 'Early win'),
          ('A co-host on chat', 'One person who only watches chat, unblocks people and collects links.', 'Co-host'),
          ('End on their work', 'The last ten minutes are their sites and their vote, not your slides.', 'Close')]


def habits():
    return ''.join(f'<li class="q"><span class="q__n tnum">{i + 1:02d}</span><h3 class="h-xs">{a}</h3><p class="p-m">{b}</p>'
                   f'<span class="tag" data-theme="haze" data-shape="round">{c}</span></li>' for i, (a, b, c) in enumerate(HABITS))


TODO = [('Build the two hook sites', 'Prompt-only and spec-first, same tool, same day.'),
        ('Run the whole build on a free account', 'Note exactly where the free limit stops you, and plan around it.'),
        ('Send the Saturday message', 'Laptop, Chrome, and accounts for ChatGPT and the builder made in advance.'),
        ('Make a rescue project', 'A finished starter site that anyone who falls behind can copy.'),
        ('Brief the co-host', 'They watch chat, unblock people and collect the links.'),
        ('Pack the kit', 'One folder, one link, shared at the close.'),
        ('Decide the prize and the offer', 'For example, the ₹499 credited against the full course.'),
        ('Test the stream', 'Screen share, recording, and a second device to see what students see.')]


def todo():
    return ''.join(f'<li><label><input type="checkbox"><span><b>{a}</b><small>{b}</small></span></label></li>' for a, b in TODO)


KIT = [('Spec template', 'One page, four parts, with the example filled in.'), ('Prompt packs', 'The interview, the design reading, the copy, the three builds.'),
       ('Slop checklist', 'Seven tells and seven fixes on one card.'), ('Inspiration list', 'Where to look, sorted by kind of site.'),
       ('Seven-day feed reset', 'One action a day.'), ('First-client card', 'Six steps from a local business to monthly income.')]


def files(rows):
    return ''.join(f'<li class="file"><svg viewBox="0 0 16 16" aria-hidden="true"><use href="#i-file"/></svg><div><b>{a}</b><span>{b}</span></div></li>'
                   for a, b in rows)


TOOLS = [('01', 'Brief', [('Thinking partner', 'ChatGPT · Claude · Gemini')]),
         ('02', 'Inspiration', [('Galleries', 'Awwwards · Godly · Land-book · Lapa Ninja · One Page Love'), ('Apps', 'Mobbin · Refero · Dribbble · Behance'),
                                ('Collecting', 'Savee · Cosmos · Are.na · Pinterest')]),
         ('03', 'Structure', [('Words', 'ChatGPT · Claude · Notion'), ('Wireframes', 'Whimsical · Figma')]),
         ('04', 'Style rules', [('Fonts', 'Google Fonts · Fontshare · Uncut · Free Faces'), ('Colour', 'Coolors · Happy Hues · Color Hunt · WebAIM Contrast'),
                                ('Icons and images', 'Lucide · Heroicons · Iconify · Unsplash · Pexels')]),
         ('05', 'Build with AI', [('AI builders', 'Lovable · Bolt · v0 · Replit · Google AI Studio · Figma Make'), ('Motion', 'GSAP · LottieFiles · Rive · Spline'),
                                  ('Components', '21st.dev · Magic UI · React Bits · Untitled UI')]),
         ('06', 'Test', [('Inspect', 'CSS Peeper · WhatFont · Eye Dropper'), ('Check', 'GoFullPage · Window Resizer · Mobile Simulator')]),
         ('07', 'Go live', [('Publishing', 'The builder’s own Publish button')])]


def road():
    out = []
    for i, (n, name, groups) in enumerate(TOOLS):
        count = sum(len(g[1].split(' · ')) for g in groups) if n != '07' else 1
        out.append(f'<li class="road__item{" is--now" if n == "05" else ""}"><div class="road__label"><span class="road__code">{n}</span><h3 class="h-s">{name}</h3>'
                   f'<span class="tag" data-theme="haze" data-shape="round">{count} {"tool" if count == 1 else "tools"}</span></div>'
                   f'<span class="road__dot" aria-hidden="true"></span><div class="road__body"><ul class="files">{files(groups)}</ul></div></li>')
    return ''.join(out)
