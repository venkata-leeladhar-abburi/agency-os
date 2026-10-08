/**
 * Strip: a blister strip of ten tablets on a foil plate, three already pressed
 * out and two of those lying in front of it, each with its break line. The
 * blister under the pointer presses flat; its neighbours dip, the nearer the
 * more, staggered outwards on the 700ms lift curve. Tear lines cut the foil
 * into ten cells, and the batch code is embossed in dots on the blank end. At
 * rest the next tablet to take is the bright one. The slider is the reach of
 * the dip, in blisters.
 *
 * The pattern: discrete items. Tweens, a stagger by distance, a dip that stops
 * at a floor, and a hit test on each blister's own rest top, so a blister
 * sinking out from under the pointer cannot flip the choice.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, rrect, seg, unproj,
  tdone, tset, tval, tween, disposer, flatDot, mk, place, pointer, put, register, solid,
} = HL;

const COLS = 5, ROWS = 2, PITCH = 26, R = 9.6, H = 6.2, T = 1.8, FLAT = 0.5, STEP = 60;
/** A loose tablet: its radius and its height. It is smaller than the blister it came out of. */
const TR = 7, TH = 3.6;
const X0 = -4, X1 = COLS * PITCH + 22, Y0 = -4, Y1 = ROWS * PITCH + 4;
/** Already pressed out, and the next one to take: the bright mark at rest. */
const GONE = ["0,0", "0,1", "1,1"], NEXT = "1,0";
/** The two tablets lying in front of the strip: centre x, centre y. */
const LOOSE = [[11, Y1 + 19], [36, Y1 + 27]];
/** A round footprint and its crease ring, inset by b: rings() with enough samples for a circle this size. */
const disc = (x, y, r, b) => [rrect(x - r, y - r, x + r, y + r, r, 9), rrect(x - r + b, y - r + b, x + r - b, y + r - b, r - b, 9)];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = value;

  // The camera is fitted to the foil, a full blister and the loose tablets, so no pose leaves the frame.
  const C = Cam(45, 0.5, 2);
  fit(C, [[X0, Y0, 0], [X1, Y0, 0], [X1, Y1, 0], [X0, Y1 + 34, 0], [X0, Y0, T + H], [X1, Y1, T + H]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);

  // The foil: one thin plate, the tear lines that cut it into cells, and the batch code on the blank end.
  const [pr, pi] = rings(X0, Y0, X1, Y1, 5, 1.3);
  put(solid(g), prism(P, front, pr, pi, 0, T));
  let cuts = seg(P(0, PITCH, T), P(COLS * PITCH, PITCH, T));
  for (let i = 1; i <= COLS; i++) cuts += seg(P(i * PITCH, Y0 + 3, T), P(i * PITCH, Y1 - 3, T));
  mk("path", { d: cuts, class: "nf lo" }, g);
  for (let k = 0; k < 8; k++) {
    const dot = flatDot(g, C, 0.8, k % 3 === 1 ? "dot m" : "dot off");
    place(dot, P(COLS * PITCH + 6.5 + Math.floor(k / 4) * 5.5, 11.5 + (k % 4) * 9, T));
  }

  // The blisters, diagonal by diagonal from the far corner, so appending is painting back to front.
  const cells = [];
  for (let s = 0; s <= COLS + ROWS - 2; s++) for (let i = 0; i < COLS; i++) {
    const j = s - i;
    if (j < 0 || j >= ROWS) continue;
    const cx = (i + 0.5) * PITCH, cy = (j + 0.5) * PITCH;
    const [ring, inner] = disc(cx, cy, R, 3.1);
    const h0 = GONE.includes(i + "," + j) ? FLAT : H;
    cells.push({ i, j, cx, cy, n: i * ROWS + j + 1, h0, ring, inner, tw: tween(h0), el: solid(g), drawn: NaN });
  }
  const next = cells.find((c) => c.i + "," + c.j === NEXT);

  // The tablets already out: nearer the viewer than the foil, so they are painted after it.
  for (const [x, y] of LOOSE) {
    const [ring, inner] = disc(x, y, TR, 1.5);
    put(solid(g), prism(P, front, ring, inner, 0, TH));
    mk("path", { d: seg(P(x - 3.4, y + 3.4, TH), P(x + 3.4, y - 3.4, TH)), class: "nf" }, g);
  }

  // A blister whose tween has not moved keeps its paths.
  function draw(c, now) {
    const h = Math.max(FLAT, tval(c.tw, now));
    if (h === c.drawn) return;
    c.drawn = h;
    put(c.el, prism(P, front, c.ring, c.inner, T, T + h));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const c of cells) { draw(c, now); if (!tdone(c.tw, now)) moving = true; }
    return moving;
  });
  bag.add(B.unregister);

  let act = null;
  /** Presses blister a (null lets them all up). The dip spreads out from the one pressed, or the one let go. */
  function press(a, from) {
    const now = performance.now();
    for (const c of cells) {
      const d = from ? Math.hypot(c.i - from.i, c.j - from.j) : 0;
      // The share pressed: all of it under the pointer, less with each step away, nothing past the reach.
      const share = !a ? 0 : c === a ? 1 : clamp(0.85 * (1 - d / reach), 0, 0.85);
      tset(c.tw, c.h0 === FLAT ? FLAT : H - (H - FLAT) * share, now, d * STEP);
      c.el.sil.classList.toggle("hi", a ? c === a : c === next);
    }
    read.textContent = a ? "tab " + String(a.n).padStart(2, "0") : "rest";
    B.wake();
  }
  function choose(a) {
    if (a === act) return;
    const from = a || act;
    act = a;
    press(a, from);
  }

  /** The blister whose own rest top puts the pointer nearest its middle; null when none is near. */
  function hit(p) {
    let best = null, bd = PITCH * 0.6;
    for (const c of cells) {
      const [x, y] = unproj(C, p[0], p[1], T + c.h0);
      const d = Math.hypot(x - c.cx, y - c.cy);
      if (d < bd) { bd = d; best = c; }
    }
    return best;
  }

  next.el.sil.classList.add("hi");
  read.textContent = "rest";

  bag.add(pointer(stage, { move: (p) => choose(hit(p)), leave: () => choose(null) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { reach = v; if (act) press(act, act); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "strip",
  means: "A blister strip of ten tablets: the one under the pointer presses flat, and its neighbours dip in turn.",
  rules: [1, 2, 3, 5],
  range: [1.1, 2.4, 3.4],
  mount,
});
