// Ilustraciones SVG: planetas que giran (de space/js/art.js), escenas de cada parada, historias, amigos e íconos.
// Planetas con radio 80 alrededor de (0,0); escenas en viewBox 800×450; historias en 400×240.
window.Art = (() => {
let n = 0;
  const uid = (p = 'u') => `${p}${++n}`;
  const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const FONT = `font-family="Fredoka, Nunito, sans-serif"`;

  function stars(w, h, count = 60, seed = 3) {
    const r = rng(seed);
    let s = '';
    for (let i = 0; i < count; i++) {
      const x = (r() * w).toFixed(1), y = (r() * h).toFixed(1), rad = (r() * 1.5 + 0.5).toFixed(2), op = (0.35 + r() * 0.6).toFixed(2);
      const tw = r() < 0.35 ? ` class="tw" style="animation-delay:${(r() * 4).toFixed(2)}s"` : '';
      s += `<circle cx="${x}" cy="${y}" r="${rad}" fill="#fff" opacity="${op}"${tw}/>`;
    }
    return s;
  }

  // Grupo que se desliza 160 unidades (2R) en bucle: dos copias de los rasgos dan un giro sin saltos.
  function loop(feat, t, { y = false, rev = false } = {}) {
    const copy = y ? 'translate(0 160)' : 'translate(160 0)';
    return `<g class="${y ? 'spin-y' : 'spin'}${rev ? ' rev' : ''}" style="--t:${t}s">${feat}<g transform="${copy}">${feat}</g></g>`;
  }
  const crater = (x, y, r, c = '#7f7a77', rim = '#bdb8b4') =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><path d="M${x - r * 0.8} ${y - r * 0.5} A${r} ${r} 0 0 1 ${x + r * 0.7} ${y - r * 0.6}" stroke="${rim}" stroke-width="${Math.max(1, r * 0.25)}" fill="none" opacity=".7"/>`;
  const band = (y1, y2, c, op = 1) => `<rect x="-90" y="${y1}" width="180" height="${y2 - y1}" fill="${c}" opacity="${op}"/>`;

  const LOOK = {
    mercury: { a: '#c9c4c0', b: '#8e8884', t: 70,
      feat: () => [[-50, -30, 12], [-20, 20, 9], [10, -45, 7], [35, 10, 14], [60, -20, 6], [-60, 40, 7], [20, 50, 10], [-30, -60, 6], [55, 45, 5], [-5, -10, 5]].map(([x, y, r]) => crater(x, y, r)).join('') },
    venus: { a: '#fbe3a8', b: '#d99a4e', t: 90, rev: true,
      bands: () => band(-80, -40, '#f5d08c', 0.6) + band(-10, 20, '#e7b56a', 0.5) + band(45, 80, '#f7dca4', 0.5),
      feat: () => `<path d="M-80 -25 C-60 -35 -40 -15 -20 -25 S20 -35 40 -25 S70 -15 80 -25" stroke="#fff4d6" stroke-width="7" fill="none" opacity=".55" stroke-linecap="round"/>
        <path d="M-80 30 C-55 22 -35 40 -10 30 S35 20 55 32 S75 38 80 30" stroke="#c98a45" stroke-width="6" fill="none" opacity=".45" stroke-linecap="round"/>
        <path d="M-70 -55 C-50 -62 -30 -48 -10 -56" stroke="#fff4d6" stroke-width="5" fill="none" opacity=".5" stroke-linecap="round"/>
        <path d="M10 55 C30 48 50 62 70 54" stroke="#fff4d6" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/>` },
    earth: { a: '#5fb6ff', b: '#1c58bd', t: 28, atmo: '#8fd6ff',
      feat: () => `<path d="M-58 -52 C-40 -64 -18 -52 -24 -36 C-30 -24 -14 -16 -18 -2 C-22 14 -34 18 -30 34 C-27 48 -40 62 -46 70 C-56 58 -52 40 -60 26 C-68 12 -70 -6 -62 -20 C-70 -32 -68 -44 -58 -52 Z" fill="#46b34f"/>
        <path d="M-44 -40 C-36 -44 -30 -38 -34 -32 C-38 -28 -46 -32 -44 -40 Z" fill="#9ccf5a"/>
        <path d="M18 -56 C34 -62 52 -54 50 -40 C60 -34 64 -20 56 -10 C62 4 54 20 44 30 C40 44 30 56 24 62 C16 50 20 36 12 26 C2 16 6 2 12 -8 C2 -14 4 -30 12 -36 C8 -44 10 -52 18 -56 Z" fill="#4fbd57"/>
        <path d="M26 -20 C36 -24 44 -16 40 -6 C34 2 24 -4 26 -20 Z" fill="#d8b866" opacity=".85"/>
        <path d="M58 30 C66 26 76 30 74 38 C72 46 62 46 58 42 Z" fill="#6cc95c"/>`,
      feat2: () => `<g stroke="#fff" stroke-linecap="round" fill="none" opacity=".75">
        <path d="M-70 -18 q14 -7 30 0 q10 4 18 0" stroke-width="6"/><path d="M-10 40 q12 -6 26 0" stroke-width="5"/>
        <path d="M30 -46 q14 -6 28 0" stroke-width="5"/><path d="M-40 58 q10 -5 22 0" stroke-width="4"/><path d="M40 12 q8 -4 18 0 q8 3 14 0" stroke-width="5"/></g>`,
      caps: `<ellipse cx="0" cy="-80" rx="34" ry="12" fill="#f4fbff"/><ellipse cx="0" cy="81" rx="30" ry="11" fill="#f4fbff"/>` },
    moon: { a: '#e8e8ee', b: '#9d9da8', t: 80,
      feat: () => `<path d="M-50 -30 C-30 -45 -5 -30 -15 -10 C-25 8 -55 0 -50 -30 Z" fill="#a7a7b3" opacity=".8"/>
        <path d="M15 10 C35 0 55 15 45 35 C35 50 10 40 15 10 Z" fill="#a7a7b3" opacity=".8"/>
        <path d="M20 -50 C30 -56 42 -48 36 -38 C30 -30 16 -38 20 -50 Z" fill="#b2b2bd" opacity=".8"/>` +
        [[-30, 40, 8], [55, -20, 7], [-60, 10, 5], [0, -60, 6], [-5, 55, 5]].map(([x, y, r]) => crater(x, y, r, '#9a9aa6', '#f2f2f6')).join('') },
    mars: { a: '#f08a5d', b: '#a8401f', t: 32,
      feat: () => `<path d="M-60 -10 C-45 -25 -25 -5 -35 10 C-45 25 -70 15 -60 -10 Z" fill="#8f3a1d" opacity=".55"/>
        <path d="M10 -30 C30 -40 50 -25 40 -10 C30 5 5 -10 10 -30 Z" fill="#8f3a1d" opacity=".5"/>
        <path d="M0 20 C25 15 45 30 30 45 C15 55 -10 40 0 20 Z" fill="#b54a24" opacity=".6"/>
        <circle cx="-20" cy="-45" r="7" fill="#c75a30"/><circle cx="55" cy="30" r="5" fill="#c75a30"/>`,
      caps: `<ellipse cx="0" cy="-79" rx="28" ry="10" fill="#fff6ef"/>` },
    jupiter: { a: '#f3e2c6', b: '#b9875c', t: 14,
      bands: () => band(-90, -62, '#d9bc92') + band(-62, -46, '#c08a5c') + band(-46, -30, '#f1e3cb') + band(-30, -14, '#b5764a')
        + band(-14, 6, '#f3e8d6') + band(6, 22, '#c4895a') + band(22, 40, '#ead8bb') + band(40, 58, '#b9875c') + band(58, 90, '#dcc4a2'),
      feat: () => `<ellipse cx="25" cy="31" rx="19" ry="10" fill="#e8a07a"/><ellipse cx="25" cy="31" rx="14" ry="7" fill="#c4532f"/>
        <path d="M-70 -22 q15 -6 30 0 t30 0" stroke="#fff3e2" stroke-width="3" fill="none" opacity=".6"/>
        <path d="M-40 14 q12 -5 24 0 t24 0" stroke="#8f5733" stroke-width="3" fill="none" opacity=".5"/>
        <ellipse cx="-45" cy="48" rx="7" ry="4" fill="#fff3e2" opacity=".7"/>` },
    saturn: { a: '#f6e7b8', b: '#c39a52', t: 16,
      bands: () => band(-90, -55, '#e2c588') + band(-55, -35, '#efdcaa') + band(-20, -5, '#d7b46f', 0.7) + band(15, 30, '#e9d39b') + band(45, 90, '#d4ae68'),
      feat: () => `<path d="M-70 -42 q15 -5 30 0 t30 0" stroke="#fff6dc" stroke-width="3" fill="none" opacity=".6"/><path d="M0 22 q15 -5 30 0" stroke="#b88d48" stroke-width="3" fill="none" opacity=".5"/>` },
    uranus: { a: '#c6f4f5', b: '#58b7c6', t: 26, y: true,
      feat: () => `<rect x="-90" y="-60" width="180" height="10" fill="#e4fbfb" opacity=".35"/><rect x="-90" y="10" width="180" height="16" fill="#8fd6df" opacity=".35"/><ellipse cx="20" cy="-20" rx="12" ry="7" fill="#e9ffff" opacity=".5"/>` },
    neptune: { a: '#6f9bff', b: '#1f3fae', t: 20,
      bands: () => band(-40, -30, '#87aeff', 0.35) + band(25, 38, '#2d4fc4', 0.45),
      feat: () => `<ellipse cx="-20" cy="15" rx="16" ry="9" fill="#14267a" opacity=".85"/>
        <path d="M-15 0 q12 -4 24 0" stroke="#fff" stroke-width="3" fill="none" opacity=".8" stroke-linecap="round"/>
        <path d="M30 -40 q14 -5 28 0" stroke="#fff" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/>
        <path d="M-60 45 q10 -4 20 0" stroke="#fff" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/>` },
    pluto: { a: '#ecd9c2', b: '#9c7a5d', t: 50,
      feat: () => `<path d="M-60 -20 C-45 -40 -15 -35 -20 -10 C-25 10 -55 15 -60 -20 Z" fill="#7d5b45" opacity=".55"/>
        <path d="M30 6 C30 -10 50 -14 54 0 C58 -14 78 -10 76 6 C74 20 60 30 54 40 C46 30 32 20 30 6 Z" fill="#fbf1e2"/>
        <path d="M-10 45 C5 35 25 45 15 60 C5 70 -15 60 -10 45 Z" fill="#8a664d" opacity=".5"/>` },
  };

  // Un planeta (o luna) de radio 80 centrado en (0,0). opts: still (sin giro), night (mitad oscura).
  function globe(id, { still = false, night = false, speed = 1 } = {}) {
    if (id === 'sun') return sunGlobe(still);
    const L = LOOK[id], c = uid('c'), g = uid('g'), s = uid('s'), a = uid('a'), nt = uid('n');
    const move = (f, t, o) => (still ? f : loop(f, t, o));
    let core = `<circle r="80" fill="url(#${g})"/>${L.bands ? L.bands() : ''}`;
    if (L.feat) core += move(L.feat(), L.t * speed, { y: L.y, rev: L.rev });
    if (L.feat2) core += move(L.feat2(), L.t * 0.7 * speed, { y: L.y, rev: L.rev });
    if (L.caps) core += L.caps;
    const defs = `<defs><clipPath id="${c}"><circle r="80"/></clipPath>
      <radialGradient id="${g}" cx="38%" cy="34%" r="75%"><stop offset="0" stop-color="${L.a}"/><stop offset="1" stop-color="${L.b}"/></radialGradient>
      <radialGradient id="${s}" cx="34%" cy="30%" r="80%"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000814" stop-opacity=".55"/></radialGradient>
      ${L.atmo ? `<radialGradient id="${a}"><stop offset=".86" stop-color="${L.atmo}" stop-opacity="0"/><stop offset=".92" stop-color="${L.atmo}" stop-opacity=".55"/><stop offset="1" stop-color="${L.atmo}" stop-opacity="0"/></radialGradient>` : ''}
      ${night ? `<linearGradient id="${nt}" x1="0" x2="1"><stop offset=".48" stop-color="#020617" stop-opacity="0"/><stop offset=".58" stop-color="#020617" stop-opacity=".78"/></linearGradient>` : ''}</defs>`;
    let out = defs;
    if (L.atmo) out += `<circle r="94" fill="url(#${a})"/>`;
    if (id === 'saturn') return defs + saturnRings(core, c, s);
    if (id === 'uranus') return defs + uranusRings(core, c, s);
    out += `<g clip-path="url(#${c})">${core}</g><circle r="80" fill="url(#${s})"/>`;
    if (night) out += `<circle r="80" fill="url(#${nt})"/>`;
    return out;
  }
  function saturnRings(core, c, s) {
    const back = `<g fill="none"><ellipse rx="150" ry="36" stroke="#cdb37a" stroke-width="16" opacity=".85"/><ellipse rx="126" ry="29" stroke="#e9d9ad" stroke-width="12"/><ellipse rx="106" ry="24" stroke="#b99a62" stroke-width="7" opacity=".8"/></g>`;
    const k = uid('k');
    return `<g transform="rotate(-16) scale(.62)">
      <defs><clipPath id="${k}"><rect x="-170" y="0" width="340" height="60"/></clipPath></defs>
      ${back}<g clip-path="url(#${c})">${core}</g><circle r="80" fill="url(#${s})"/>
      <g clip-path="url(#${k})">${back}</g></g>`;
  }
  function uranusRings(core, c, s) {
    const ring = `<ellipse rx="22" ry="118" fill="none" stroke="#d9f7fa" stroke-width="4" opacity=".7"/>`;
    const k = uid('k');
    return `<g transform="rotate(-8) scale(.8)"><defs><clipPath id="${k}"><rect x="0" y="-130" width="40" height="260"/></clipPath></defs>
      ${ring}<g clip-path="url(#${c})">${core}</g><circle r="80" fill="url(#${s})"/><g clip-path="url(#${k})">${ring}</g></g>`;
  }
  function sunGlobe(still) {
    const g = uid('g'), h = uid('h'), c = uid('c');
    const spots = [[-40, -20, 9], [20, 30, 12], [45, -35, 7], [-15, 50, 8], [-60, 30, 6], [5, -55, 10], [60, 10, 6]]
      .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffc53d" opacity=".35"/>`).join('');
    return `<defs><radialGradient id="${g}" cx="45%" cy="42%" r="65%"><stop offset="0" stop-color="#fffbd6"/><stop offset=".45" stop-color="#ffd84a"/><stop offset="1" stop-color="#ff8f1c"/></radialGradient>
      <radialGradient id="${h}"><stop offset=".55" stop-color="#ffc23a" stop-opacity=".7"/><stop offset="1" stop-color="#ff7a00" stop-opacity="0"/></radialGradient>
      <clipPath id="${c}"><circle r="80"/></clipPath></defs>
      <circle r="100" fill="url(#${h})" class="${still ? '' : 'pulse'}"/>
      <circle r="80" fill="url(#${g})"/><g clip-path="url(#${c})">${still ? spots : loop(spots, 60)}</g>`;
  }

  // Un planeta como <svg> cuadrado, listo para meter en la página.
  function body(id, cls = '', opts = {}) {
    return `<svg class="body ${cls}" viewBox="-100 -100 200 200" aria-hidden="true">${globe(id, opts)}</svg>`;
  }
  // Planeta colocado dentro de una escena: centro (x,y) y radio r.
  const place = (id, x, y, r, opts) => `<g transform="translate(${x} ${y}) scale(${(r / 80).toFixed(4)})">${globe(id, opts)}</g>`;

  const S = (inner, vb = '0 0 800 450', cls = 'scene') => `<svg class="${cls}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}</svg>`;
  const space = (w = 800, h = 450, seed = 3) => `<rect width="${w}" height="${h}" fill="#0b1238"/>${stars(w, h, 70, seed)}`;
  const sky = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>`;
  const cloud = (x, y, s = 1, cls = 'drift') => `<g class="${cls}" style="--d:${(18 + x / 40).toFixed(0)}s"><g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="0" r="22" fill="#fff"/><circle cx="26" cy="-10" r="28" fill="#fff"/><circle cx="56" cy="2" r="20" fill="#fff"/><rect x="-10" y="0" width="74" height="20" rx="10" fill="#fff"/></g></g>`;
  const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sway"><rect x="-6" y="-10" width="12" height="44" rx="4" fill="#8a5a33"/><circle cx="0" cy="-30" r="30" fill="#3fae4f"/><circle cx="-18" cy="-14" r="18" fill="#4cc35c"/><circle cx="18" cy="-16" r="20" fill="#37a046"/></g></g>`;
  const kid = (x, y) => `<g transform="translate(${x} ${y})"><g class="bob"><circle cx="0" cy="-52" r="14" fill="#f2c39b"/><path d="M-14 -56 q14 -18 28 0" fill="#5a3825"/><rect x="-12" y="-38" width="24" height="30" rx="8" fill="#ff7aa8"/><rect x="-11" y="-8" width="8" height="22" rx="3" fill="#3b4a9e"/><rect x="3" y="-8" width="8" height="22" rx="3" fill="#3b4a9e"/><circle cx="-5" cy="-54" r="2" fill="#1d2150"/><circle cx="5" cy="-54" r="2" fill="#1d2150"/><path d="M-5 -47 q5 4 10 0" stroke="#1d2150" stroke-width="2" fill="none"/></g></g>`;
  const dog = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="-14" rx="22" ry="12" fill="#c98a4b"/><circle cx="22" cy="-26" r="11" fill="#c98a4b"/><ellipse cx="28" cy="-34" rx="4" ry="8" fill="#8a5a33"/><circle cx="25" cy="-28" r="2" fill="#1d2150"/><rect x="-16" y="-6" width="6" height="12" fill="#c98a4b"/><rect x="10" y="-6" width="6" height="12" fill="#c98a4b"/><path class="wag" d="M-22 -18 q-12 -8 -8 -18" stroke="#c98a4b" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  const bird = (x, y) => `<g class="fly" style="--d:14s"><path transform="translate(${x} ${y})" d="M0 0 q8 -8 16 0 q8 -8 16 0" stroke="#1d2150" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
  const building = (x, w, h, c) => `<rect x="${x}" y="${330 - h}" width="${w}" height="${h}" fill="${c}"/>` +
    Array.from({ length: Math.floor(h / 30) }, (_, r) => Array.from({ length: Math.floor(w / 22) }, (_, k) => `<rect x="${x + 7 + k * 22}" y="${330 - h + 10 + r * 30}" width="10" height="14" fill="#ffe27a" opacity="${(r + k) % 3 ? 0.9 : 0.35}"/>`).join('')).join('');
  const car = (c, d, y = 360, rev = false) => `<g class="drive${rev ? ' rev' : ''}" style="--d:${d}s"><g transform="translate(0 ${y})"><rect x="0" y="-18" width="56" height="18" rx="6" fill="${c}"/><path d="M10 -18 l8 -12 h20 l8 12z" fill="${c}"/><rect x="20" y="-27" width="16" height="9" fill="#bfe8ff"/><circle cx="14" cy="0" r="7" fill="#222"/><circle cx="42" cy="0" r="7" fill="#222"/></g></g>`;
  const cow = (x, y) => `<g transform="translate(${x} ${y})"><g class="graze"><ellipse cx="0" cy="-20" rx="30" ry="16" fill="#fff"/><circle cx="-10" cy="-24" r="7" fill="#222"/><circle cx="12" cy="-16" r="6" fill="#222"/><ellipse cx="34" cy="-22" rx="11" ry="9" fill="#fff"/><ellipse cx="40" cy="-18" rx="6" ry="4" fill="#f4a9b8"/><circle cx="33" cy="-26" r="2" fill="#222"/>${[-20, -8, 10, 22].map((lx) => `<rect x="${lx}" y="-8" width="5" height="14" fill="#fff"/>`).join('')}</g></g>`;
  const barn = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-40" y="-50" width="80" height="50" fill="#d6453d"/><path d="M-48 -50 L0 -84 L48 -50z" fill="#9e2f2a"/><rect x="-14" y="-30" width="28" height="30" fill="#fff"/><path d="M-14 -30 L14 0 M14 -30 L-14 0" stroke="#d6453d" stroke-width="3"/></g>`;
  const sunIcon = (x, y, r = 34) => `<g transform="translate(${x} ${y})"><g class="spinme" style="--t:24s">${Array.from({ length: 12 }, (_, i) => `<rect x="-3" y="${-r - 18}" width="6" height="14" rx="3" fill="#ffc93c" transform="rotate(${i * 30})"/>`).join('')}</g><circle r="${r}" fill="#ffd84a"/><circle r="${r * 0.7}" fill="#ffe27a"/></g>`;
  const rain = (x, y, w, n = 10) => Array.from({ length: n }, (_, i) => `<path class="drop" style="animation-delay:${((i * 0.37) % 1.2).toFixed(2)}s" d="M${x + (i * w) / n} ${y} l-4 14" stroke="#5ce1e6" stroke-width="3" stroke-linecap="round"/>`).join('');
  const label = (x, y, t, c = '#fff') => `<text class="lbl" x="${x}" y="${y}" text-anchor="middle" ${FONT} font-size="22" font-weight="700" fill="${c}" stroke="#0b1238" stroke-width="5" paint-order="stroke">${t}</text>`;
  // Lado de noche: la mitad derecha (el Sol siempre está a la izquierda).
  const night = (r) => `<path d="M0 ${-r} A${r} ${r} 0 0 1 0 ${r}z" fill="#08102e" opacity=".8"/>`;

  // Fases de la Luna: luna nueva gris, llena amarilla (como en el examen).
  function moonPhase(kind, x, y, r) {
    const lit = '#ffd84a', dark = '#7d8296';
    const half = (side) => `<path d="M0 ${-r} A${r} ${r} 0 0 ${side} 0 ${r}z" fill="${lit}"/>`;
    const body = { new: `<circle r="${r}" fill="${dark}"/>`, full: `<circle r="${r}" fill="${lit}"/>`,
      first: `<circle r="${r}" fill="${dark}"/>${half(1)}`, last: `<circle r="${r}" fill="${dark}"/>${half(0)}` }[kind];
    return `<g transform="translate(${x} ${y})">${body}<circle r="${r}" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/></g>`;
  }

  const SCENES = {
    spheres: () => sky('sk1', '#7cc8ff', '#d7f0ff') + `<rect width="800" height="450" fill="url(#sk1)"/>` + sunIcon(90, 70, 30) +
      cloud(260, 70, 1.1) + cloud(470, 50, 0.8) + bird(560, 110) + label(330, 140, 'Atmosphere') +
      `<path d="M300 330 L470 150 L560 230 L640 120 L800 330z" fill="#8c6d52"/><path d="M470 150 L500 182 L478 176 L455 188z M640 120 L670 160 L645 150 L620 168z" fill="#fff"/>` + label(560, 290, 'Geosphere') +
      `<path d="M0 330 H800 V450 H0z" fill="#7a5a3e"/><path d="M0 330 H330 C300 360 320 450 300 450 H0z" fill="#2f80ed"/>` +
      `<g class="wave"><path d="M10 370 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0" stroke="#bfe8ff" stroke-width="4" fill="none"/></g>` + label(160, 420, 'Hydrosphere') +
      `<path d="M330 330 H800 V345 H330z" fill="#4cc35c"/>` + tree(640, 320, 0.9) + kid(700, 345) + dog(760, 345) + label(700, 410, 'Biosphere'),

    landscapes: () => sky('sk2', '#8fd0ff', '#e6f6ff') + `<rect width="800" height="450" fill="url(#sk2)"/>` + cloud(90, 60, 0.8) + cloud(560, 50, 0.9) +
      building(20, 70, 210, '#5b6b9e') + building(100, 60, 150, '#7b87b8') + building(170, 80, 250, '#4a5891') + building(260, 60, 180, '#6c79ad') +
      `<rect x="0" y="330" width="400" height="120" fill="#5d6273"/><path d="M0 390 H400" stroke="#fff" stroke-width="4" stroke-dasharray="20 16"/>` +
      car('#ff5a5f', 7, 380) + car('#ffc93c', 9, 425, true) + label(190, 300, 'Urban') +
      `<rect x="400" y="300" width="400" height="150" fill="#6cc95c"/><path d="M400 300 q100 -40 200 0 t200 0 V320 H400z" fill="#4cb35a"/>` +
      barn(520, 330) + tree(700, 320, 1) + cow(630, 400) + label(610, 290, 'Rural') +
      `<path d="M400 0 V450" stroke="#fff" stroke-width="4" stroke-dasharray="10 10" opacity=".7"/>`,

    sun: () => space(800, 450, 7) + place('sun', 250, 240, 105) +
      `<g class="beam"><path d="M360 260 L500 320" stroke="#ffd84a" stroke-width="10" stroke-linecap="round" stroke-dasharray="4 18"/></g>` + place('earth', 530, 330, 34) +
      `<g transform="translate(640 110)"><g class="pulse">${Array.from({ length: 8 }, (_, i) => `<rect x="-3" y="-44" width="6" height="22" rx="3" fill="#fff6c8" transform="rotate(${i * 45})"/>`).join('')}<circle r="20" fill="#fff6c8"/></g></g>` +
      `<circle cx="730" cy="210" r="7" fill="#fff" class="tw"/><circle cx="560" cy="200" r="5" fill="#fff" class="tw" style="animation-delay:1s"/>` +
      label(640, 180, 'Star') + label(250, 395, 'The Sun') + label(530, 400, 'Earth'),

    order: () => space(800, 450, 11) + `<g transform="translate(-40 225)">${globe('sun', { still: true })}</g>` +
      ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'].map((p, i) => {
        const x = 110 + i * 88, r = [9, 14, 15, 11, 34, 28, 20, 20][i];
        return `<circle cx="-40" cy="225" r="${x + 40}" fill="none" stroke="#fff" stroke-opacity=".12"/>` + place(p, x, 225, r) + label(x, 290 + (i % 2) * 26, String(i + 1), '#ffc93c');
      }).join(''),

    facts: () => space(800, 450, 5) + place('mercury', 110, 230, 30) + place('earth', 260, 140, 42) + place('jupiter', 420, 260, 92) +
      place('saturn', 590, 140, 70) + place('neptune', 710, 310, 52) +
      `<g transform="translate(745 255)"><g class="spinme" style="--t:9s">${[0, 60, 120].map((a) => `<path d="M0 -14 V14" stroke="#e8f7ff" stroke-width="4" stroke-linecap="round" transform="rotate(${a})"/>`).join('')}</g></g>` +
      label(110, 290, 'Mercury') + label(260, 210, 'Earth') + label(420, 380, 'Jupiter') + label(590, 215, 'Saturn') + label(710, 395, 'Neptune'),

    movements: () => space(800, 450, 2) + `<ellipse cx="300" cy="230" rx="260" ry="150" fill="none" stroke="#5ce1e6" stroke-width="3" stroke-dasharray="8 10" opacity=".6"/>` +
      place('sun', 300, 230, 70) + `<g transform="translate(560 230)"><g transform="scale(.9)">${globe('earth')}${night(80)}</g><path d="M0 -100 V100" stroke="#fff" stroke-width="3" stroke-dasharray="6 6" transform="rotate(23)"/></g>` +
      `<path d="M500 140 a70 30 0 0 1 120 0" stroke="#ffc93c" stroke-width="5" fill="none" marker-end="url(#ar)"/><defs><marker id="ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#ffc93c"/></marker></defs>` +
      `<g class="orbit" style="--d:16s;transform-origin:300px 230px"><g transform="translate(300 80)"><circle r="12" fill="#5fb6ff"/></g></g>` +
      label(560, 345, 'Day | Night') + label(300, 410, 'Translation: 1 year') + label(560, 120, 'Rotation: 1 day'),

    moon: () => space(800, 450, 9) + moonPhase('new', 200, 130, 60) + moonPhase('full', 600, 130, 60) +
      label(200, 225, 'New moon') + label(600, 225, 'Full moon') +
      ['new', 'first', 'full', 'last'].map((k, i) => moonPhase(k, 250 + i * 100, 330, 30)).join('') +
      `<path d="M215 330 H585" stroke="#fff" stroke-opacity=".2" stroke-width="2"/>` + label(400, 400, '4 main phases') +
      `<circle cx="790" cy="330" r="60" fill="#ffd84a" opacity=".9"/><circle cx="700" cy="330" r="3" fill="#cfd3e0"/>` + label(720, 420, '× 400'),

    seasons: () => sky('sk3', '#ffd98a', '#fff3cf') + sky('sk4', '#6d7f9e', '#b9c7dc') + `<rect width="400" height="450" fill="url(#sk3)"/><rect x="400" width="400" height="450" fill="url(#sk4)"/>` +
      sunIcon(200, 120, 44) + `<rect y="330" width="400" height="120" fill="#d9b25f"/><path d="M40 360 l30 10 l20 -8 M200 380 l25 12 l30 -6 M300 350 l20 14" stroke="#9e7a35" stroke-width="3" fill="none"/>` +
      `<path d="M70 330 l6 -30 l6 30 M90 330 l4 -22 l5 22 M300 330 l6 -26 l6 26" stroke="#b88f3a" stroke-width="3" fill="none"/>` +
      `<g transform="translate(560 100)">${cloud(0, 0, 1.6, '')}</g>` + rain(560, 150, 160, 12) + rain(470, 170, 80, 5) +
      `<rect x="400" y="330" width="400" height="120" fill="#4cb35a"/><ellipse cx="640" cy="390" rx="90" ry="16" fill="#5ca8ff" opacity=".8"/>` + tree(720, 330, 0.8) +
      label(200, 300, 'Dry season') + label(600, 300, 'Rainy season') + label(400, 60, 'Colombia', '#ffc93c'),
  };
  const scene = (id) => S(SCENES[id]());

  // Historias: lo que pasa al abrir una chispa. Sin historia propia: zoom de la escena hacia `z` (o hacia la chispa) con un aro.
  const STORIES = {
    'movements/rotation': () => space(400, 240) + `<g transform="translate(200 120) scale(.9)">${globe('earth', { speed: 0.25 })}</g><path d="M120 40 a95 30 0 0 1 160 0" stroke="#ffc93c" stroke-width="6" fill="none" class="draw"/>` + label(200, 228, '1 rotation = 1 day'),
    'movements/daynight': () => space(400, 240) + place('sun', 30, 120, 70) + `<g transform="translate(270 120) scale(.9)">${globe('earth', { speed: 0.35 })}${night(80)}</g>` + label(200, 40, 'Day', '#ffc93c') + label(345, 40, 'Night', '#9fb0ff'),
    'movements/translation': () => space(400, 240) + `<ellipse cx="200" cy="120" rx="150" ry="80" fill="none" stroke="#5ce1e6" stroke-dasharray="6 8" opacity=".7"/>` + place('sun', 200, 120, 40) +
      `<g class="orbit-e"><g transform="translate(350 120)">${place('earth', 0, 0, 18)}</g></g>` + label(200, 228, '1 translation = 1 year'),
    'movements/two': () => space(400, 240) + place('sun', 200, 120, 36) + `<g class="orbit" style="--d:8s;transform-origin:200px 120px"><g transform="translate(200 35)">${place('earth', 0, 0, 22)}</g></g>` + label(200, 228, 'Rotation + translation'),
    'moon/phases': () => space(400, 240) + ['new', 'first', 'full', 'last'].map((k, i) => `<g class="pop" style="animation-delay:${i * 0.7}s">${moonPhase(k, 60 + i * 93, 105, 34)}${label(60 + i * 93, 175, ['New', 'First q.', 'Full', 'Last q.'][i])}</g>`).join('') + label(200, 225, '4 main phases', '#ffc93c'),
    'moon/size': () => space(400, 240) + `<circle cx="420" cy="120" r="150" fill="#ffd84a" class="pulse"/><circle cx="110" cy="120" r="4" fill="#cfd3e0" class="pop"/>` + label(110, 100, 'Moon') + label(335, 128, 'Sun') + label(140, 200, '400 times smaller', '#ffc93c'),
    'order/eight': () => space(400, 240) + ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'].map((p, i) => `<g class="pop" style="animation-delay:${i * 0.35}s">${place(p, 30 + i * 48, 110, [8, 12, 13, 10, 22, 18, 15, 15][i])}${label(30 + i * 48, 170, String(i + 1), '#ffc93c')}</g>`).join(''),
    'order/trick': () => space(400, 240) + ['My', 'Very', 'Excellent', 'Mother', 'Just', 'Served', 'Us', 'Noodles'].map((w, i) => `<text class="pop" style="animation-delay:${i * 0.4}s" x="${i < 4 ? 30 : 210}" y="${40 + (i % 4) * 52}" ${FONT} font-size="26" font-weight="700" fill="#fff"><tspan fill="#ffc93c">${w[0]}</tspan>${w.slice(1)} = ${['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'][i].slice(0, 3)}…</text>`).join(''),
    'sun/gas': () => space(400, 240) + `<g transform="translate(200 110)"><g class="pulse">${Array.from({ length: 12 }, (_, i) => `<rect x="-4" y="-90" width="8" height="34" rx="4" fill="#fff6c8" transform="rotate(${i * 30})"/>`).join('')}<circle r="50" fill="#fff6c8"/></g></g>` + label(80, 60, 'Light', '#ffc93c') + label(320, 60, 'Heat', '#ff8f5a') + label(200, 228, 'Gas'),
    'sun/main': () => space(400, 240) + place('sun', 60, 120, 70) + `<path d="M140 120 H300" stroke="#ffd84a" stroke-width="8" stroke-dasharray="4 16" class="beam"/>` + place('earth', 330, 120, 40) + label(240, 228, 'Energy and light'),
    'seasons/dry': () => sky('sd', '#ffd98a', '#fff3cf') + `<rect width="400" height="240" fill="url(#sd)"/>` + sunIcon(200, 80, 40) + `<rect y="180" width="400" height="60" fill="#d9b25f"/>` + label(200, 228, 'Very little rain'),
    'seasons/rainy': () => `<rect width="400" height="240" fill="#8a9bb8"/>` + cloud(120, 50, 1.6, '') + rain(110, 100, 200, 14) + `<rect y="190" width="400" height="50" fill="#4cb35a"/>` + label(200, 228, 'Lots of rain'),
  };
  function story(stopId, spark) {
    const own = STORIES[`${stopId}/${spark.id}`];
    if (own) return { svg: S(own(), '0 0 400 240', 'story'), ms: 4200 };
    const [x, y, r = 34] = spark.z || [spark.x, spark.y];
    const ring = `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#ffc93c" stroke-width="5" class="ring"/>`;
    if (spark.id === 'two') return { svg: S(SCENES[stopId]() + ring, '0 0 800 450', 'story'), ms: 2600 };
    // Un `r` grande acerca menos (el aro amarillo solo sale en la vista completa). La historia se ve a 400/240 (x 25–775 de la escena): el zoom no se sale de ella.
    const s = Math.min(2.2, 150 / r), lim = (v, a, b) => Math.min(b, Math.max(a, v)).toFixed(1);
    const z = `translate(${lim(400 - x * s, 775 - 800 * s, 25)}px, ${lim(225 - y * s, 450 - 450 * s, 0)}px) scale(${s.toFixed(3)})`;
    return { svg: S(`<g class="zoom" style="--z:${z}">${SCENES[stopId]()}</g>`, '0 0 800 450', 'story'), ms: 2600 };
  }

  // Amigos: cada uno es su planeta con cara; Cosmo es un niño extraterrestre verde.
  const face = `<g class="blink"><ellipse cx="-26" cy="-6" rx="13" ry="15" fill="#fff"/><ellipse cx="26" cy="-6" rx="13" ry="15" fill="#fff"/><circle cx="-24" cy="-3" r="7" fill="#1d2150"/><circle cx="28" cy="-3" r="7" fill="#1d2150"/><circle cx="-21" cy="-7" r="2.5" fill="#fff"/><circle cx="31" cy="-7" r="2.5" fill="#fff"/></g>
    <ellipse cx="-44" cy="20" rx="9" ry="6" fill="#ff8fc8" opacity=".6"/><ellipse cx="44" cy="20" rx="9" ry="6" fill="#ff8fc8" opacity=".6"/><path d="M-16 24 Q0 40 16 24" stroke="#1d2150" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  const cosmo = `<g class="bob"><path d="M-20 -78 L-34 -104 M20 -78 L34 -104" stroke="#2bb673" stroke-width="6" stroke-linecap="round"/><circle cx="-34" cy="-106" r="9" fill="#ffc93c"/><circle cx="34" cy="-106" r="9" fill="#ffc93c"/>
    <ellipse cx="0" cy="70" rx="44" ry="30" fill="#2bb673"/><circle r="72" fill="#5de08f"/><circle cx="-30" cy="-30" r="10" fill="#8ff0b4" opacity=".7"/>${face}</g>`;
  function friend(id, cls = '') {
    const look = { cosmo: () => cosmo, sunny: () => globe('sun') + face, gaia: () => globe('earth') + face, luna: () => globe('moon') + face, jupi: () => globe('jupiter') + face, rocky: () => globe('mercury') + face, venus: () => globe('venus') + face, mars: () => globe('mars') + face, saturn: () => globe('saturn') + face, uranus: () => globe('uranus') + face }[id];
    return `<svg class="friend ${cls}" viewBox="-110 -120 220 230" aria-hidden="true">${look()}</svg>`;
  }

  // Íconos para «City or countryside?» (viewBox 0 0 80 80).
  const ICONS = {
    building: `<rect x="18" y="10" width="44" height="66" fill="#5b6b9e"/>${[0, 1, 2, 3].map((r) => `<rect x="25" y="${18 + r * 14}" width="10" height="8" fill="#ffe27a"/><rect x="45" y="${18 + r * 14}" width="10" height="8" fill="#ffe27a"/>`).join('')}`,
    cow: `<g transform="translate(36 56) scale(.9)">${cow(0, 0).replace('<g class="graze">', '<g>')}</g>`,
    bus: `<rect x="8" y="22" width="64" height="38" rx="8" fill="#ffc93c"/><rect x="14" y="28" width="14" height="12" fill="#bfe8ff"/><rect x="33" y="28" width="14" height="12" fill="#bfe8ff"/><rect x="52" y="28" width="14" height="12" fill="#bfe8ff"/><circle cx="22" cy="62" r="7" fill="#222"/><circle cx="58" cy="62" r="7" fill="#222"/>`,
    farm: `<g transform="translate(40 72) scale(.8)">${barn(0, 0)}</g>`,
    light: `<rect x="30" y="6" width="20" height="54" rx="6" fill="#333"/><circle cx="40" cy="18" r="6" fill="#ff5a5f"/><circle cx="40" cy="33" r="6" fill="#ffc93c"/><circle cx="40" cy="48" r="6" fill="#2bb673"/><rect x="37" y="60" width="6" height="16" fill="#333"/>`,
    tree: `<g transform="translate(40 50) scale(.9)">${tree(0, 0).replace('<g class="sway">', '<g>')}</g>`,
    car: `<g transform="translate(12 -310)">${car('#ff5a5f', 0, 370).replace(/class="drive[^"]*"/, '')}</g>`,
    horse: `<g transform="translate(40 60)"><ellipse cx="0" cy="-16" rx="24" ry="12" fill="#8a5a33"/><path d="M18 -22 L30 -44 L40 -38 L28 -16z" fill="#8a5a33"/><path d="M30 -44 L24 -50" stroke="#3b2414" stroke-width="5"/>${[-16, -6, 8, 18].map((lx) => `<rect x="${lx}" y="-6" width="5" height="16" fill="#8a5a33"/>`).join('')}<path d="M-24 -18 q-10 4 -8 16" stroke="#3b2414" stroke-width="5" fill="none"/></g>`,
  };
  const icon = (k) => `<svg viewBox="0 0 80 80" aria-hidden="true">${ICONS[k]}</svg>`;

  // Ícono de cada parada en el mapa.
  function stopIcon(k) {
    if (k === 'land') return `<svg viewBox="-100 -100 200 200" aria-hidden="true"><circle r="80" fill="#6cc95c"/><rect x="-60" y="-50" width="30" height="70" fill="#5b6b9e"/><rect x="-26" y="-30" width="24" height="50" fill="#7b87b8"/><g transform="translate(36 20) scale(.6)">${barn(0, 0)}</g></svg>`;
    if (k === 'rain') return `<svg viewBox="-100 -100 200 200" aria-hidden="true"><circle r="80" fill="#2a3780"/><g transform="translate(-50 -20)">${cloud(0, 0, 1.3, '')}</g>${rain(-40, 20, 90, 6)}<g transform="translate(-40 -40) scale(.5)">${sunIcon(0, 0, 30)}</g></svg>`;
    return body(k, '', { still: false });
  }

  const rocket = `<svg class="rocket" viewBox="0 0 60 100" aria-hidden="true"><g transform="rotate(35 30 50)"><path d="M30 4 C48 20 50 50 44 70 H16 C10 50 12 20 30 4z" fill="#f4f6ff"/><circle cx="30" cy="38" r="9" fill="#5ce1e6" stroke="#1e2a6b" stroke-width="3"/><path d="M16 56 L4 78 L16 72z M44 56 L56 78 L44 72z" fill="#ff5a5f"/><path class="flame" d="M20 72 Q30 100 40 72z" fill="#ffc93c"/></g></svg>`;

  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]); }

  return { body, globe, place, stars, scene, story, friend, icon, stopIcon, moonPhase, rocket, esc };
})();
