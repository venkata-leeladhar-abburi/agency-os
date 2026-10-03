/* ===== Core: helpers and interactions shared by the client pitch and the team playbook ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const html = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const hasG = typeof window.gsap !== 'undefined';
html.classList.add(hasG ? 'has-gsap' : 'no-gsap');
if (hasG) ['ScrollTrigger', 'Draggable', 'InertiaPlugin', 'CustomEase'].forEach(n => { if (window[n]) gsap.registerPlugin(window[n]); });
const hasInertia = hasG && !!window.InertiaPlugin;
const safe = (name, fn) => { try { fn(); } catch (e) { console.error('[' + name + ']', e); } };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const pad = n => String(n).padStart(2, '0');
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
const onVisible = (el, cb, opts = {}) => {
  if (!el) return null;
  if (!('IntersectionObserver' in window)) { cb(true, { disconnect() {} }); return null; }
  const io = new IntersectionObserver(es => es.forEach(e => cb(e.isIntersecting, io)), opts);
  io.observe(el);
  return io;
};
const icon = (id, cls = '') => `<svg class="${cls}" viewBox="0 0 12 12" aria-hidden="true"><use href="#i-${id}"/></svg>`;
let lenis = null;

/* Rolling button labels: wrap the label, add a clone and a background layer */
function initButtons(root = document) {
  $$('.btn', root).forEach(b => {
    if (b.querySelector('.btn__labels')) return;
    const label = b.querySelector('.btn__label');
    if (!label) return;
    const wrap = document.createElement('span');
    wrap.className = 'btn__labels';
    label.replaceWith(wrap);
    wrap.appendChild(label);
    const clone = label.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    wrap.appendChild(clone);
    const bg = document.createElement('span');
    bg.className = 'btn__bg';
    b.prepend(bg);
  });
}

function scrollToEl(t) {
  if (lenis) lenis.scrollTo(t, { offset: 0, duration: 1.4 });
  else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

const nav = $('.nav');
function setNav(open) {
  if (!nav) return;
  nav.dataset.open = String(open);
  const t = $('[data-nav-toggle]');
  if (t) t.setAttribute('aria-expanded', String(open));
}
function initNav() {
  if (!nav) return;
  $('[data-nav-toggle]').addEventListener('click', () => setNav(nav.dataset.open !== 'true'));
  const grid = $('.nav__panel-grid');
  if (grid) grid.setAttribute('data-lenis-prevent', '');
}

/* Sheet and centre modals with a focus trap */
let openStack = [];
function openModal(name, trigger) {
  const m = $(`.modal[data-modal="${name}"]`);
  if (!m) return;
  m._trigger = trigger || document.activeElement;
  m.dataset.open = 'true';
  m.setAttribute('aria-hidden', 'false');
  if (!openStack.includes(m)) openStack.push(m);
  if (lenis) lenis.stop();
  html.classList.add('is-locked');
  setNav(false);
  setTimeout(() => { const f = m.querySelector('[data-autofocus]'); (f || m.querySelector('.modal__panel')).focus({ preventScroll: true }); }, 60);
  m.dispatchEvent(new CustomEvent('modal:open'));
}
function closeModal(m) {
  if (!m || m.dataset.open !== 'true') return;
  m.dataset.open = 'false';
  m.setAttribute('aria-hidden', 'true');
  openStack = openStack.filter(x => x !== m);
  if (!openStack.length) { if (lenis) lenis.start(); html.classList.remove('is-locked'); }
  if (m._trigger && m._trigger.isConnected && m._trigger.focus) m._trigger.focus({ preventScroll: true });
  m.dispatchEvent(new CustomEvent('modal:close'));
}
function initGlobalEvents() {
  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-modal-open]');
    if (opener) { e.preventDefault(); openModal(opener.dataset.modalOpen, opener); return; }
    const closer = e.target.closest('[data-modal-close]');
    if (closer) closeModal(closer.closest('.modal'));
    if (e.target.closest('[data-nav-close]')) setNav(false);
    const a = e.target.closest('a[href^="#"]');
    if (a) {
      const id = a.getAttribute('href').slice(1);
      const t = id && document.getElementById(id);
      if (t) {
        e.preventDefault();
        setNav(false);
        const inModal = a.closest('.modal');
        if (inModal) closeModal(inModal);
        setTimeout(() => scrollToEl(t), inModal || closer ? 80 : 0);
      }
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (openStack.length) closeModal(openStack[openStack.length - 1]);
      else if (nav && nav.dataset.open === 'true') { setNav(false); $('[data-nav-toggle]').focus(); }
    }
    if (e.key === 'Tab' && openStack.length) {
      const m = openStack[openStack.length - 1];
      const f = $$('a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])', m).filter(x => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === m.querySelector('.modal__panel'))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

/* Vertical sliders with autoplay, bullets, swipe and arrows */
function initVSlider(root) {
  const list = $('.vslider__list', root);
  const items = Array.from(list.children);
  if (items.length < 2) return null;
  const bulletsWrap = $('[data-vslider-bullets]', root);
  const countEl = $('[data-vslider-count]', root);
  const dur = reduce ? 0 : (+root.dataset.autoplay || 0);
  let active = 0, elapsed = 0, last = performance.now(), hover = false, focusIn = false, inView = false;
  items.forEach((it, i) => {
    it.classList.add('vslider__item');
    it.dataset.pos = i === 0 ? 'active' : 'after';
    it.setAttribute('aria-hidden', String(i !== 0));
    if (i) it.inert = true;
  });
  const bullets = items.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'vslider__bullet';
    b.setAttribute('aria-label', `Show slide ${i + 1} of ${items.length}`);
    b.innerHTML = '<i></i>';
    b.addEventListener('click', () => go(i, i > active ? 1 : -1));
    if (bulletsWrap) bulletsWrap.appendChild(b);
    return b;
  });
  function paint() {
    bullets.forEach((b, i) => { b.classList.toggle('is--active', i === active); b.setAttribute('aria-current', String(i === active)); b.firstChild.style.transform = 'scaleY(0)'; });
    if (countEl) countEl.textContent = `${pad(active + 1)} / ${pad(items.length)}`;
  }
  function go(n, dir) {
    n = (n + items.length) % items.length;
    if (n === active) return;
    const cur = items[active], nxt = items[n];
    nxt.classList.add('no-tr');
    nxt.dataset.pos = dir > 0 ? 'after' : 'before';
    void nxt.offsetWidth;
    nxt.classList.remove('no-tr');
    cur.dataset.pos = dir > 0 ? 'before' : 'after';
    nxt.dataset.pos = 'active';
    cur.setAttribute('aria-hidden', 'true'); cur.inert = true;
    nxt.setAttribute('aria-hidden', 'false'); nxt.inert = false;
    active = n; elapsed = 0;
    paint();
    root.dispatchEvent(new CustomEvent('vslide', { detail: { index: n } }));
  }
  const prev = $('[data-vslider-prev]', root), next = $('[data-vslider-next]', root);
  if (prev) prev.addEventListener('click', () => go(active - 1, -1));
  if (next) next.addEventListener('click', () => go(active + 1, 1));
  root.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hover = true; });
  root.addEventListener('pointerleave', () => { hover = false; });
  root.addEventListener('focusin', () => { focusIn = true; });
  root.addEventListener('focusout', () => { focusIn = false; });
  let sx = 0, sy = 0, down = false;
  root.addEventListener('pointerdown', e => { if (e.target.closest('button,a,textarea,input')) return; down = true; sx = e.clientX; sy = e.clientY; });
  root.addEventListener('pointerup', e => {
    if (!down) return; down = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (e.pointerType === 'mouse' && Math.abs(dy) > 40 && Math.abs(dy) > Math.abs(dx)) go(active + (dy < 0 ? 1 : -1), dy < 0 ? 1 : -1);
    else if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(active + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  });
  onVisible(root, v => { inView = v; }, { threshold: 0.25 });
  paint();
  if (dur) {
    const tick = now => {
      const dt = now - last; last = now;
      if (inView && !hover && !focusIn && !document.hidden) elapsed += dt;
      const p = clamp(elapsed / dur, 0, 1);
      bullets[active].firstChild.style.transform = `scaleY(${p})`;
      if (p >= 1) go(active + 1, 1);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  return { go, get active() { return active; } };
}

/* Copy to clipboard, with a select-text fallback and a toast */
let toastT;
function toast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('is--on');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('is--on'), 2400);
}
function selectNode(el) {
  if (!el) return;
  const r = document.createRange();
  r.selectNodeContents(el);
  const s = window.getSelection();
  s.removeAllRanges();
  s.addRange(r);
}
function copyText(text, fallbackEl, okMsg) {
  const fail = () => { selectNode(fallbackEl); toast('Selected. Press Ctrl+C or ⌘C to copy'); };
  try {
    if (!navigator.clipboard) { fail(); return; }
    navigator.clipboard.writeText(text).then(() => toast(okMsg || 'Copied'), fail);
  } catch (err) { fail(); }
}
function initCopy() {
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    const v = b.dataset.copy;
    copyText(v, b.parentElement.querySelector('.contact-list__value'), 'Copied ' + v);
  });
}

/* Cursor bubble: "Drag" over sliders, "Open" over openable cards */
function initCursor(openSel) {
  const c = $('.cursor');
  if (!finePointer || !c) return;
  const txt = $('.cursor__text', c);
  let x = -100, y = -100, tx = -100, ty = -100, on = false;
  document.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    tx = e.clientX; ty = e.clientY;
    if (!on) { x = tx; y = ty; on = true; }
    const t = e.target;
    const zone = t.closest && t.closest('[data-cursor]');
    const openable = openSel && t.closest && t.closest(openSel);
    const state = openable ? 'open' : zone ? zone.dataset.cursor : '';
    if (c.dataset.state !== state) { c.dataset.state = state; txt.textContent = state === 'open' ? 'Open' : 'Drag'; }
    c.dataset.tone = (zone && zone.dataset.cursorTone) || '';
  }, { passive: true });
  document.addEventListener('pointerleave', () => { c.dataset.state = ''; });
  const loop = () => { x += (tx - x) * 0.22; y += (ty - y) * 0.22; c.style.transform = `translate3d(${(x + 36).toFixed(1)}px,${(y + 30).toFixed(1)}px,0)`; requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
}

/* Smooth scrolling */
function initLenis() {
  if (!window.Lenis || reduce) return;
  lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
  if (hasG && window.ScrollTrigger) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
}

/* Scroll reveals, counters, rotating dotted circles, footer logo parallax */
function initReveals() {
  if (!hasG || reduce || !window.ScrollTrigger) return;
  $$('[data-reveal]').forEach(el => gsap.from(el, { y: 44, autoAlpha: 0, duration: 1, ease: 'expo.out', immediateRender: false, scrollTrigger: { trigger: el, start: 'top 94%', once: true } }));
  $$('[data-reveal-group]').forEach(g => gsap.from(g.children, { y: 56, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.07, immediateRender: false, scrollTrigger: { trigger: g, start: 'top 90%', once: true } }));
  $$('[data-count]').forEach(el => {
    const end = +el.dataset.count, o = { v: 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 95%', once: true, onEnter: () => gsap.fromTo(o, { v: 0 }, { v: end, duration: 1.6, ease: 'expo.out', onUpdate: () => { el.textContent = Math.round(o.v); } }) });
  });
  const road = $('#road');
  if (road) gsap.fromTo(road, { '--p': 0 }, { '--p': 1, ease: 'none', scrollTrigger: { trigger: road, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
  $$('.dots-circle').forEach(c => gsap.to(c, { rotate: 40, ease: 'none', scrollTrigger: { trigger: c.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
  if ($('.footer__logo svg')) gsap.from('.footer__logo svg', { yPercent: 40, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });
}
