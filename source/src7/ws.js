/* AI website workshop plan. No libraries: the page reads fine with scripts off. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Menu */
const nav = $('.nav');
const navBtn = $('[data-nav-toggle]');
const setNav = open => { nav.dataset.open = open; navBtn.setAttribute('aria-expanded', open); };
navBtn.addEventListener('click', () => setNav(nav.dataset.open !== 'true'));
$$('[data-nav-close], .nav__links a, .nav__banner').forEach(el => el.addEventListener('click', () => setNav(false)));
addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });

/* The hook: flip between the two sites */
const mess = $('[data-mess]');
if (mess) {
  $$('[data-mess-set]', mess).forEach(b => b.addEventListener('click', () => {
    mess.dataset.state = b.dataset.messSet;
    $$('[data-mess-set]', mess).forEach(x => x.setAttribute('aria-pressed', x === b));
  }));
}

/* Three builds: a small vertical slider */
const vs = $('[data-vslider]');
if (vs) {
  const items = $$('.vslider__item', vs), dots = $$('.vslider__bullet', vs);
  let at = 0, timer = null;
  const go = n => {
    at = (n + items.length) % items.length;
    items.forEach((el, i) => { if (i === at) el.removeAttribute('data-pos'); else el.dataset.pos = i < at ? 'before' : 'after'; });
    dots.forEach((d, i) => d.classList.toggle('is--active', i === at));
  };
  const play = () => { if (!still) { clearInterval(timer); timer = setInterval(() => go(at + 1), 4200); } };
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); play(); }));
  $('[data-vslider-prev]', vs).addEventListener('click', () => { go(at - 1); play(); });
  $('[data-vslider-next]', vs).addEventListener('click', () => { go(at + 1); play(); });
  vs.addEventListener('mouseenter', () => clearInterval(timer));
  vs.addEventListener('mouseleave', play);
  play();
}

/* Twelve block cards: arrows and drag to slide */
const track = $('.gslider__collection');
if (track) {
  const step = () => $('.gslider__item', track).getBoundingClientRect().width + 20;
  $$('[data-slide]').forEach(b => b.addEventListener('click', () => track.scrollBy({ left: step() * +b.dataset.slide, behavior: still ? 'auto' : 'smooth' })));
  let down = false, moved = 0, x0 = 0, s0 = 0;
  track.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse') { down = true; moved = 0; x0 = e.clientX; s0 = track.scrollLeft; } });
  addEventListener('pointermove', e => { if (!down) return; moved = Math.abs(e.clientX - x0); if (moved > 4) { track.classList.add('is--drag'); track.scrollLeft = s0 - (e.clientX - x0); } });
  addEventListener('pointerup', () => { down = false; track.classList.remove('is--drag'); });
  track.addEventListener('click', e => { if (moved > 4) e.preventDefault(); }, true);
}

/* Nav strip: light the block on screen */
const strip = $$('.nav__time a');
if (strip.length && 'IntersectionObserver' in window) {
  const seen = {};
  const io = new IntersectionObserver(es => {
    es.forEach(e => { seen[e.target.id] = e.isIntersecting; });
    let now = null;
    strip.forEach(a => { if (seen[a.hash.slice(1)]) now = a; });
    strip.forEach(a => a.classList.toggle('is--now', a === now));
  }, { rootMargin: '-35% 0px -60% 0px' });
  strip.forEach(a => { const el = $(a.hash); if (el) io.observe(el); });
}

/* Copy a prompt */
$$('[data-copy]').forEach(b => b.addEventListener('click', () => {
  const text = $('.prm__text', b.closest('.prm')).textContent;
  const label = $('span', b);
  const done = () => { label.textContent = 'Copied'; setTimeout(() => { label.textContent = 'Copy'; }, 1600); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => {});
  else { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) { /* nothing to do */ } ta.remove(); }
}));

/* Before Sunday: remember the ticks on this device */
const boxes = $$('#todo input'), KEY = 'ws-before-sunday';
try { const saved = JSON.parse(localStorage.getItem(KEY) || '[]'); boxes.forEach((b, i) => { b.checked = !!saved[i]; }); } catch (e) { /* storage is optional */ }
boxes.forEach(b => b.addEventListener('change', () => { try { localStorage.setItem(KEY, JSON.stringify(boxes.map(x => x.checked))); } catch (e) { /* storage is optional */ } }));

/* Scroll story: the marker follows the reader's own scroll */
const story = $('#storyfig .story');
if (story) {
  const frames = $$('li', story), dot = $('#storyfig .scrub i');
  let tick = false;
  story.setAttribute('data-live', '');
  const scrub = () => {
    tick = false;
    const r = story.getBoundingClientRect(), h = innerHeight;
    const p = Math.min(1, Math.max(0, (h * 0.85 - r.top) / (h * 0.6)));
    dot.style.setProperty('--p', p * 100 + '%');
    const n = Math.min(3, Math.floor(p * 4));
    frames.forEach((f, i) => f.classList.toggle('is--on', i === n));
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(scrub); } }, { passive: true });
  scrub();
}
