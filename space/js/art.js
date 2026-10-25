// Ilustraciones SVG de la app: planetas que giran, Lumi y el público, y las escenas de las diapositivas.
// Los planetas se dibujan con radio 80 alrededor de (0,0); las escenas usan viewBox 800×450.
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

  // ---------- Lumi, la guía ----------
  function lumi(cls = '') {
    const g = uid('lg');
    return `<svg class="lumi ${cls}" viewBox="0 0 160 190" aria-hidden="true">
      <defs><radialGradient id="${g}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#a8ffea"/><stop offset=".6" stop-color="#3fd9b8"/><stop offset="1" stop-color="#1c9d88"/></radialGradient></defs>
      <g class="l-bob">
        <g class="l-ant"><path d="M80 44 C77 30 87 22 82 12" stroke="#25b79c" stroke-width="5" fill="none" stroke-linecap="round"/>
          <circle cx="82" cy="10" r="15" fill="#ffd84d" opacity=".25" class="glow"/><circle cx="82" cy="10" r="8" fill="#ffd84d"/></g>
        <path d="M26 112 C10 104 6 92 12 82" stroke="#25b79c" stroke-width="11" stroke-linecap="round" fill="none"/>
        <g class="l-wave"><path d="M134 112 C150 102 154 88 148 76" stroke="#25b79c" stroke-width="11" stroke-linecap="round" fill="none"/></g>
        <ellipse cx="60" cy="170" rx="17" ry="8" fill="#1c9d88"/><ellipse cx="100" cy="170" rx="17" ry="8" fill="#1c9d88"/>
        <path d="M80 40 C120 40 142 72 140 110 C138 148 114 168 80 168 C46 168 22 148 20 110 C18 72 40 40 80 40 Z" fill="url(#${g})"/>
        <ellipse cx="80" cy="134" rx="34" ry="22" fill="#d5fff4" opacity=".5"/>
        <circle cx="50" cy="62" r="5" fill="#25b79c" opacity=".6"/><circle cx="112" cy="58" r="4" fill="#25b79c" opacity=".6"/><circle cx="121" cy="74" r="3" fill="#25b79c" opacity=".6"/>
        <g class="blink"><ellipse cx="60" cy="92" rx="15" ry="18" fill="#fff"/><ellipse cx="100" cy="92" rx="15" ry="18" fill="#fff"/>
          <circle cx="62" cy="95" r="8.5" fill="#1d2150"/><circle cx="98" cy="95" r="8.5" fill="#1d2150"/>
          <circle cx="65" cy="91" r="3" fill="#fff"/><circle cx="101" cy="91" r="3" fill="#fff"/></g>
        <ellipse cx="42" cy="114" rx="8" ry="5" fill="#ff8fc8" opacity=".65"/><ellipse cx="118" cy="114" rx="8" ry="5" fill="#ff8fc8" opacity=".65"/>
        <path class="l-smile" d="M66 118 Q80 131 94 118" stroke="#1d2150" stroke-width="4" fill="none" stroke-linecap="round"/>
        <ellipse class="l-mouth" cx="80" cy="123" rx="8" ry="6" fill="#1d2150"/>
      </g></svg>`;
  }

  // ---------- El público: el Consejo Galáctico ----------
  const ALIENS = [
    { c1: '#c9a4ff', c2: '#7b4fe0', eyes: 1, ant: 2 },
    { c1: '#ffc58f', c2: '#f07a2e', eyes: 3, ant: 0 },
    { c1: '#9dffcf', c2: '#2bbf74', eyes: 2, ant: 1 },
    { c1: '#ffa6d8', c2: '#e2459b', eyes: 2, ant: 2 },
    { c1: '#9fd9ff', c2: '#3a86e8', eyes: 1, ant: 1 },
  ];
  function alien(i) {
    const v = ALIENS[i % ALIENS.length], g = uid('ag');
    const eyeSets = { 1: [[60, 62, 16]], 2: [[46, 64, 11], [74, 64, 11]], 3: [[38, 66, 9], [60, 58, 10], [82, 66, 9]] };
    const eyes = eyeSets[v.eyes].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><circle class="pupil" cx="${x}" cy="${y + 2}" r="${r * 0.5}" fill="#1d2150"/><circle cx="${x + r * 0.25}" cy="${y - r * 0.15}" r="${r * 0.18}" fill="#fff"/>`).join('');
    const antennas = { 0: '', 1: `<path d="M60 30 V12" stroke="${v.c2}" stroke-width="4"/><circle cx="60" cy="10" r="6" fill="#ffd84d"/>`,
      2: `<path d="M44 34 L34 14" stroke="${v.c2}" stroke-width="4"/><circle cx="33" cy="12" r="5" fill="#ffd84d"/><path d="M76 34 L86 14" stroke="${v.c2}" stroke-width="4"/><circle cx="87" cy="12" r="5" fill="#ffd84d"/>` };
    return `<svg class="alien" viewBox="0 0 120 130" aria-hidden="true">
      <defs><radialGradient id="${g}" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="${v.c1}"/><stop offset="1" stop-color="${v.c2}"/></radialGradient></defs>
      <g class="a-body">${antennas[v.ant]}
        <g class="a-arms"><path d="M22 92 C8 80 6 66 12 56" stroke="${v.c2}" stroke-width="9" stroke-linecap="round" fill="none"/><path d="M98 92 C112 80 114 66 108 56" stroke="${v.c2}" stroke-width="9" stroke-linecap="round" fill="none"/></g>
        <path d="M60 28 C92 28 106 54 104 84 C102 112 84 124 60 124 C36 124 18 112 16 84 C14 54 28 28 60 28 Z" fill="url(#${g})"/>
        <g class="blink">${eyes}</g>
        <ellipse cx="32" cy="90" rx="7" ry="4" fill="#ff7fbf" opacity=".5"/><ellipse cx="88" cy="90" rx="7" ry="4" fill="#ff7fbf" opacity=".5"/>
        <path class="a-smile" d="M48 92 Q60 102 72 92" stroke="#1d2150" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <ellipse class="a-o" cx="60" cy="96" rx="7" ry="8" fill="#1d2150"/>
      </g></svg>`;
  }

  // ---------- Escenas de las diapositivas (800×450) ----------
  function spaceBg(seed = 5) {
    const g = uid('bg');
    return `<defs><radialGradient id="${g}" cx="70%" cy="30%" r="90%"><stop offset="0" stop-color="#2a1d6e"/><stop offset=".55" stop-color="#11103f"/><stop offset="1" stop-color="#070920"/></radialGradient></defs>
      <rect width="800" height="450" fill="url(#${g})"/>${stars(800, 450, 90, seed)}`;
  }
  const label = (x, y, txt, size = 30, fill = '#fff', anchor = 'middle', extra = '') =>
    `<text x="${x}" y="${y}" ${FONT} font-weight="600" font-size="${size}" fill="${fill}" text-anchor="${anchor}" ${extra}>${txt}</text>`;
  const orbitG = (cx, cy, t, inner, extra = '') => `<g class="orbit" style="--o:${cx}px ${cy}px;--t:${t}s" ${extra}>${inner}</g>`;
  const floatG = (inner, t = 4, dl = 0) => `<g class="float" style="--t:${t}s;--dl:${dl}s">${inner}</g>`;
  const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-10" width="12" height="40" rx="4" fill="#8a5a36"/><path d="M0 -70 L30 -20 L-30 -20 Z" fill="#2e9e55"/><path d="M0 -50 L36 2 L-36 2 Z" fill="#3cb663"/></g>`;
  const roundTree = (x, y, s = 1, apples = false) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-7" y="-20" width="14" height="60" rx="5" fill="#8a5a36"/><circle cx="0" cy="-45" r="40" fill="#3cb663"/><circle cx="-24" cy="-30" r="26" fill="#34a85a"/><circle cx="24" cy="-32" r="28" fill="#45c26e"/>${apples ? '<circle cx="-18" cy="-40" r="7" fill="#ff4d4d"/><circle cx="14" cy="-55" r="7" fill="#ff4d4d"/><circle cx="20" cy="-22" r="7" fill="#ff4d4d"/><circle cx="-6" cy="-18" r="6" fill="#ff4d4d"/>' : ''}</g>`;
  const bird = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M-14 0 Q-7 -8 0 0 Q7 -8 14 0" stroke="#1d2150" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const fish = (x, y, s = 1, c = '#ffb84d') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse rx="18" ry="10" fill="${c}"/><path d="M16 0 L30 -10 L30 10 Z" fill="${c}"/><circle cx="-8" cy="-2" r="2.5" fill="#1d2150"/></g>`;
  const butterfly = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="flap"><ellipse cx="-12" cy="-8" rx="12" ry="14" fill="#ff6fd8"/><ellipse cx="12" cy="-8" rx="12" ry="14" fill="#ff6fd8"/><ellipse cx="-9" cy="10" rx="8" ry="9" fill="#ffd84d"/><ellipse cx="9" cy="10" rx="8" ry="9" fill="#ffd84d"/></g><rect x="-2" y="-14" width="4" height="30" rx="2" fill="#1d2150"/></g>`;
  const qmark = (x, y, s = 1, dl = 0) => floatG(`<text x="${x}" y="${y}" ${FONT} font-weight="700" font-size="${60 * s}" fill="#ffd84d" text-anchor="middle">?</text>`, 3.5, dl);
  const kid = (x, y, shirt, s = 1, cls = '') => `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}">
      <rect x="-14" y="10" width="28" height="36" rx="10" fill="${shirt}"/><path d="M-14 18 L-30 4" stroke="${shirt}" stroke-width="8" stroke-linecap="round"/><path d="M14 18 L28 34" stroke="${shirt}" stroke-width="8" stroke-linecap="round"/>
      <rect x="-11" y="44" width="8" height="26" rx="4" fill="#3a3f7a"/><rect x="3" y="44" width="8" height="26" rx="4" fill="#3a3f7a"/>
      <circle cx="0" cy="-6" r="16" fill="#f2c39b"/><path d="M-16 -8 C-16 -24 16 -24 16 -8 C10 -16 -10 -16 -16 -8 Z" fill="#5a3a22"/>
      <circle cx="-5" cy="-6" r="2" fill="#1d2150"/><circle cx="5" cy="-6" r="2" fill="#1d2150"/><path d="M-5 1 Q0 5 5 1" stroke="#1d2150" stroke-width="2" fill="none" stroke-linecap="round"/></g></g>`;
  const sunRays = (x, y, r) => `<g transform="translate(${x} ${y})"><g class="spinme" style="--t:30s">${Array.from({ length: 12 }, (_, i) => `<rect x="-5" y="${-r - 26}" width="10" height="20" rx="5" fill="#ffd84d" transform="rotate(${i * 30})"/>`).join('')}</g><circle r="${r}" fill="#ffd84d"/><circle r="${r * 0.7}" fill="#fff1a6"/></g>`;
  const beam = (d, op = 0.22) => { const g = uid('bm'); return `<defs><linearGradient id="${g}"><stop offset="0" stop-color="#ffe27a" stop-opacity="${op}"/><stop offset="1" stop-color="#ffe27a" stop-opacity="0"/></linearGradient></defs><path d="${d}" fill="url(#${g})"/>`; };
  const iconBubble = (x, y, r, fill, inner, dl = 0) => floatG(`<g transform="translate(${x} ${y})"><circle r="${r}" fill="${fill}" stroke="#fff" stroke-width="4"/>${inner}</g>`, 4.5, dl);

  const SCENES = {
    title: (ctx) => spaceBg(11) + place('earth', 560, 240, 150)
      + orbitG(560, 240, 18, `<g transform="translate(560 240)"><g transform="translate(0 -182)"><g class="counter" style="--t:18s">${place('moon', 0, 0, 22)}</g></g></g>`)
      + label(60, 170, 'Planet', 70, '#9fe8ff', 'start') + label(60, 260, 'Earth', 96, '#fff', 'start')
      + label(64, 320, `by ${esc(ctx.name || 'Sofía')}`, 34, '#ffd84d', 'start'),

    imagine: () => spaceBg(12) + place('earth', 400, 250, 115)
      + `<g stroke="#fff" stroke-width="3" stroke-dasharray="6 8" opacity=".5"><path d="M300 230 L190 160"/><path d="M500 220 L610 150"/><path d="M500 300 L610 350"/></g>`
      + iconBubble(160, 150, 78, '#2f86e8', `<path d="M-60 0 q15 -12 30 0 t30 0 t30 0 t30 0" stroke="#fff" stroke-width="5" fill="none"/><path d="M-60 24 q15 -12 30 0 t30 0 t30 0 t30 0" stroke="#bfe6ff" stroke-width="5" fill="none"/>${fish(-15, -30, 0.9)}${fish(28, 46, 0.7, '#ff7a9e')}`, 0)
      + iconBubble(640, 135, 78, '#2a8f55', `${tree(-30, 26, 0.75)}${tree(10, 30, 0.95)}${tree(42, 24, 0.7)}`, 1.2)
      + iconBubble(640, 345, 78, '#ffe3a8', `${butterfly(-18, -8, 1.3)}${bird(28, -30, 1.2)}${bird(40, 10, 0.9)}<circle cx="10" cy="40" r="12" fill="#ff5a5a"/><circle cx="6" cy="36" r="2.5" fill="#1d2150"/><circle cx="14" cy="36" r="2.5" fill="#1d2150"/><path d="M10 28 V52" stroke="#1d2150" stroke-width="2"/>`, 2.2),

    question: () => spaceBg(13) + place('earth', 400, 272, 112)
      + iconBubble(150, 300, 70, '#2a8f55', `<path d="M0 40 V-5" stroke="#8a5a36" stroke-width="7"/><path d="M0 0 C-30 -10 -34 -36 -6 -40 C-4 -24 -2 -10 0 0 Z" fill="#7be08f"/><path d="M0 -8 C28 -16 34 -40 8 -46 C6 -30 4 -18 0 -8 Z" fill="#5ccf75"/><ellipse cx="0" cy="42" rx="30" ry="8" fill="#6b4226"/>`, 0)
      + iconBubble(650, 300, 70, '#ffe3a8', `<ellipse cx="0" cy="12" rx="20" ry="17" fill="#8a5a36"/><circle cx="-22" cy="-12" r="9" fill="#8a5a36"/><circle cx="-8" cy="-26" r="9" fill="#8a5a36"/><circle cx="10" cy="-26" r="9" fill="#8a5a36"/><circle cx="24" cy="-12" r="9" fill="#8a5a36"/>`, 1)
      + iconBubble(400, 82, 62, '#bfe6ff', `${kid(-18, -24, '#ff6fd8', 0.75)}${kid(20, -24, '#47b6ff', 0.75)}`, 2)
      + qmark(250, 140, 1.1, 0.5) + qmark(560, 150, 0.9, 1.5) + qmark(530, 420, 0.8, 2.5),

    riddle: () => spaceBg(14) + place('earth', 400, 240, 110)
      + `<circle cx="400" cy="240" r="140" fill="none" stroke="#ffd84d" stroke-width="4" stroke-dasharray="10 12" class="spinme" style="--t:40s"/>`
      + floatG(`<g transform="translate(140 130)"><rect x="-100" y="-34" width="200" height="68" rx="34" fill="#ffffff" opacity=".95"/><circle cx="-58" cy="0" r="18" fill="none" stroke="#7b4fe0" stroke-width="6"/>${label(18, 11, 'round', 32, '#1d2150')}</g>`, 4, 0)
      + floatG(`<g transform="translate(650 140)"><rect x="-130" y="-34" width="260" height="68" rx="34" fill="#ffffff" opacity=".95"/><circle cx="-98" cy="0" r="13" fill="#2f86e8"/><circle cx="-70" cy="0" r="13" fill="#3cb663"/>${label(26, 10, 'blue & green', 27, '#1d2150')}</g>`, 4, 1)
      + floatG(`<g transform="translate(400 412)"><rect x="-100" y="-30" width="200" height="60" rx="30" fill="#ffffff" opacity=".95"/><path d="M-70 8 L-52 -10 L-34 8 V22 H-70 Z" fill="#ff6fd8"/><rect x="-57" y="10" width="10" height="12" fill="#fff"/>${label(16, 10, 'home', 30, '#1d2150')}</g>`, 4, 2)
      + qmark(120, 330, 1.2, 0.3) + qmark(690, 340, 1, 1.3),

    place: () => {
      const sx = -70, sy = 230;
      const ps = [['mercury', 230, 15, 'Mercury'], ['venus', 330, 24, 'Venus'], ['earth', 445, 28, 'Earth'], ['mars', 560, 19, 'Mars']];
      const orbits = ps.map(([, x]) => `<circle cx="${sx}" cy="${sy}" r="${x - sx}" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="2"/>`).join('');
      return spaceBg(15) + orbits + place('sun', sx, sy, 210)
        + `<circle cx="445" cy="230" r="44" fill="none" stroke="#ffd84d" stroke-width="5" class="pulse"/>`
        + ps.map(([id, x, r, nm], i) => place(id, x, 230, r) + label(x, 160, i + 1, 34, i === 2 ? '#ffd84d' : '#cfd6ff') + label(x, 300, nm, i === 2 ? 30 : 24, i === 2 ? '#ffd84d' : '#e6e9ff')).join('')
        + place('jupiter', 760, 230, 75) + `<rect x="680" y="0" width="120" height="450" fill="#070920" opacity=".45"/>`
        + `<path d="M210 350 Q210 372 230 372 L560 372 Q580 372 580 350" stroke="#9fe8ff" stroke-width="4" fill="none"/>`
        + label(395, 410, 'rocky planets', 30, '#9fe8ff');
    },

    blue: () => {
      const C = 2 * Math.PI * 80;
      return spaceBg(16) + place('earth', 270, 250, 150)
        + fish(160, 420, 0.8) + fish(380, 425, 0.6, '#ff7a9e')
        + `<g transform="translate(610 240) rotate(-90)"><circle r="80" fill="none" stroke="#3cb663" stroke-width="34"/>
           <circle r="80" fill="none" stroke="#2f86e8" stroke-width="34" stroke-dasharray="${(C * 0.71).toFixed(1)} ${C.toFixed(1)}" class="drawin"/></g>`
        + label(610, 236, '71%', 44, '#fff') + label(610, 268, 'ocean', 24, '#bfe6ff')
        + `<g transform="translate(520 380)"><rect width="24" height="24" rx="6" fill="#2f86e8"/>${label(34, 20, 'water', 22, '#fff', 'start')}<rect x="120" width="24" height="24" rx="6" fill="#3cb663"/>${label(154, 20, 'land', 22, '#fff', 'start')}</g>`;
    },

    day: () => spaceBg(17) + beam('M90 110 L400 95 L400 385 L90 350 Z')
      + place('sun', -20, 230, 140) + place('earth', 520, 240, 145, { night: true })
      + `<path d="M410 82 A160 60 0 0 1 640 82" stroke="#ffd84d" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M640 82 L618 70 M640 82 L626 102" stroke="#ffd84d" stroke-width="6" stroke-linecap="round"/>`
      + label(285, 236, 'DAY', 38, '#ffd84d') + `<g transform="translate(285 270)"><circle r="14" fill="#ffd84d"/></g>`
      + label(735, 236, 'NIGHT', 34, '#cfd6ff') + `<g transform="translate(735 272)"><path d="M6 -14 A14 14 0 1 0 6 14 A11 11 0 1 1 6 -14 Z" fill="#cfd6ff"/></g>`
      + `<g transform="translate(520 425)"><rect x="-90" y="-26" width="180" height="40" rx="20" fill="#ffffff" opacity=".12"/>${label(0, 4, '24 hours', 30, '#fff')}</g>`,

    year: () => {
      const cx = 420, cy = 250, R = 150;
      const dots = Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * 2 * Math.PI; return `<circle cx="${(cx + R * Math.cos(a)).toFixed(1)}" cy="${(cy + R * Math.sin(a)).toFixed(1)}" r="4" fill="#9fe8ff" opacity=".7"/>`; }).join('');
      return spaceBg(18) + `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#9fe8ff" stroke-width="2.5" stroke-dasharray="8 10" opacity=".7"/>` + dots
        + place('sun', cx, cy, 60)
        + orbitG(cx, cy, 14, `<g transform="translate(${cx + R} ${cy})"><g class="counter" style="--t:14s">${place('earth', 0, 0, 30)}</g></g>`)
        + `<g transform="translate(690 210)"><rect x="-50" y="-40" width="100" height="92" rx="12" fill="#fff"/><rect x="-50" y="-40" width="100" height="28" rx="12" fill="#ff6b6b"/><rect x="-50" y="-22" width="100" height="10" fill="#ff6b6b"/>
           <rect x="-30" y="-50" width="8" height="20" rx="4" fill="#1d2150"/><rect x="22" y="-50" width="8" height="20" rx="4" fill="#1d2150"/>${label(0, 36, '365', 40, '#1d2150')}</g>`
        + label(690, 300, 'days', 30, '#fff') + label(690, 345, '= 1 year', 32, '#ffd84d');
    },

    moon: () => spaceBg(19) + beam('M0 40 L300 110 L300 370 L0 430 Z', 0.16)
      + `<circle cx="360" cy="240" r="172" fill="none" stroke="#cfd6ff" stroke-width="2.5" stroke-dasharray="6 10" opacity=".55"/>`
      + place('earth', 360, 240, 105)
      + orbitG(360, 240, 12, `<g transform="translate(532 240)"><g class="counter" style="--t:12s">${place('moon', 0, 0, 30)}</g></g>`)
      + `<g transform="translate(680 220)"><path d="M14 -40 A42 42 0 1 0 14 40 A33 33 0 1 1 14 -40 Z" fill="#fff4c2"/></g>`
      + label(680, 320, '1 Moon', 40, '#fff'),

    air: () => {
      const g = uid('at');
      return spaceBg(20) + `<defs><radialGradient id="${g}" cx="400" cy="560" r="400" gradientUnits="userSpaceOnUse"><stop offset=".8" stop-color="#7fd0ff" stop-opacity="0"/><stop offset=".85" stop-color="#7fd0ff" stop-opacity=".75"/><stop offset=".93" stop-color="#5aa8ff" stop-opacity=".3"/><stop offset="1" stop-color="#5aa8ff" stop-opacity="0"/></radialGradient></defs>`
        + `<circle cx="400" cy="560" r="400" fill="url(#${g})"/>` + place('earth', 400, 560, 330)
        + `<path id="${g}p" d="M100 376 A352 352 0 0 1 700 376" fill="none"/>`
        + `<text ${FONT} font-weight="600" font-size="30" fill="#e6f6ff" letter-spacing="3"><textPath href="#${g}p" startOffset="50%" text-anchor="middle">atmosphere</textPath></text>`
        + `<g transform="translate(0 175)"><g class="fly" style="--t:14s">${bird(0, 0, 1.4)}</g></g>`
        + `<g class="meteor"><path d="M640 40 L700 110" stroke="#ffb84d" stroke-width="6" stroke-linecap="round"/><circle cx="700" cy="110" r="7" fill="#fff1a6"/></g>`
        + [[200, 0], [320, 1.4], [480, 0.7], [600, 2.1]].map(([x, d]) => `<g class="rise" style="--dl:${d}s"><circle cx="${x}" cy="330" r="22" fill="#bfe6ff" opacity=".85"/>${label(x, 339, 'O₂', 22, '#1d4fa8')}</g>`).join('');
    },

    layers: () => {
      const cx = 290, cy = 240;
      const wedge = (r, fill, extra = '') => `<path d="M${cx} ${cy} L${cx} ${cy - r} A${r} ${r} 0 0 1 ${cx + r} ${cy} Z" fill="${fill}" ${extra}/>`;
      const lead = (r, a, x, y, t) => { const rad = (a * Math.PI) / 180; const px = cx + r * Math.cos(rad), py = cy + r * Math.sin(rad); return `<path d="M${px.toFixed(1)} ${py.toFixed(1)} L${x - 12} ${y - 10}" stroke="#fff" stroke-width="3"/><circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="5" fill="#fff"/>${label(x, y, t, 34, '#fff', 'start')}`; };
      return spaceBg(21) + place('earth', cx, cy, 180, { still: true })
        + wedge(180, '#8a5a36') + wedge(166, '#e2572b') + wedge(120, '#ff8a3d') + wedge(78, '#ffb33b') + `<g class="pulse">${wedge(42, '#fff1a6')}</g>`
        + `<path d="M${cx} ${cy} L${cx} ${cy - 180} M${cx} ${cy} L${cx + 180} ${cy}" stroke="#5a3a22" stroke-width="3"/>`
        + lead(173, -62, 560, 90, 'crust') + lead(125, -40, 560, 180, 'mantle') + lead(45, -30, 560, 270, 'core')
        + `<g transform="translate(660 375)"><path d="M0 -44 C20 -60 34 -50 30 -38" stroke="#2e9e55" stroke-width="10" fill="none" stroke-linecap="round"/><circle r="46" fill="#ffab73"/><circle r="36" fill="#ffd2a1"/><ellipse rx="14" ry="18" fill="#8a4b2a"/></g>`
        + label(560, 382, 'like a', 22, '#cfd6ff', 'end') + label(560, 408, 'peach!', 26, '#ffd84d', 'end');
    },

    life: () => {
      const sky = uid('sk');
      return `<defs><linearGradient id="${sky}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd0ff"/><stop offset="1" stop-color="#d9f3ff"/></linearGradient></defs>
        <rect width="800" height="450" fill="url(#${sky})"/>` + sunRays(690, 90, 46)
        + `<g class="fly" style="--t:22s"><g fill="#fff" opacity=".9"><circle cx="0" cy="90" r="22"/><circle cx="24" cy="80" r="28"/><circle cx="52" cy="92" r="20"/></g></g>`
        + `<path d="M0 300 C150 250 300 260 420 300 C540 340 680 280 800 300 V450 H0 Z" fill="#5ccf75"/><path d="M0 350 C200 320 400 380 800 340 V450 H0 Z" fill="#46b860"/>`
        + `<path d="M520 450 C540 400 600 380 640 350 C680 320 760 320 800 330 V360 C760 352 700 356 664 380 C620 410 590 430 580 450 Z" fill="#4aa8ff"/>`
        + roundTree(120, 300, 1.2, true) + tree(260, 300, 1.1) + tree(310, 310, 0.8)
        + kid(420, 290, '#ff6fd8', 1.1, 'wave-kid') + kid(480, 298, '#ffb84d', 1)
        + `<g transform="translate(560 370)"><ellipse rx="30" ry="18" fill="#c98a45"/><circle cx="28" cy="-12" r="14" fill="#c98a45"/><path d="M34 -24 L40 -36 L44 -20 Z" fill="#a8703a"/><circle cx="32" cy="-14" r="2.5" fill="#1d2150"/><rect x="-22" y="10" width="8" height="18" rx="3" fill="#c98a45"/><rect x="14" y="10" width="8" height="18" rx="3" fill="#c98a45"/><path d="M-30 -6 Q-46 -18 -40 -30" stroke="#c98a45" stroke-width="6" fill="none" stroke-linecap="round" class="wag"/></g>`
        + [[60, 400, '#ff6fd8'], [200, 410, '#ffd84d'], [350, 420, '#ff7a9e']].map(([x, y, c]) => `<g transform="translate(${x} ${y})"><path d="M0 0 V24" stroke="#2e9e55" stroke-width="4"/><circle r="9" fill="${c}"/><circle r="4" fill="#fff6b0"/></g>`).join('')
        + butterfly(330, 200, 0.9) + bird(250, 130, 1.3) + bird(290, 110, 1);
    },

    land: () => {
      const cx = 300, cy = 235, c = uid('c'), g = uid('g'), s = uid('s');
      return spaceBg(22) + `<defs><clipPath id="${c}"><circle cx="${cx}" cy="${cy}" r="170"/></clipPath>
          <radialGradient id="${g}" cx="38%" cy="34%" r="75%"><stop offset="0" stop-color="#5fb6ff"/><stop offset="1" stop-color="#1c58bd"/></radialGradient>
          <radialGradient id="${s}" cx="34%" cy="30%" r="80%"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000814" stop-opacity=".5"/></radialGradient></defs>
        <circle cx="${cx}" cy="${cy}" r="170" fill="url(#${g})"/>
        <g clip-path="url(#${c})"><g transform="translate(${cx} ${cy})">
          <path d="M-150 -120 C-110 -150 -40 -150 -10 -120 C10 -100 -10 -80 -30 -70 C-50 -60 -40 -40 -55 -30 C-70 -20 -90 -30 -100 -50 C-120 -70 -160 -80 -150 -120 Z" fill="#46b34f"/>
          <path d="M-60 -20 C-40 -30 -20 -15 -30 -5 C-40 0 -55 -5 -60 -20 Z" fill="#46b34f"/>
          <path d="M-40 0 C-10 -12 30 0 40 30 C50 60 20 80 10 110 C0 140 -10 160 -20 170 C-30 140 -40 110 -50 80 C-60 50 -70 20 -40 0 Z" fill="#4fbd57"/>
          <path d="M-20 40 C0 35 20 50 10 70 C0 85 -25 70 -20 40 Z" fill="#2e9e55" opacity=".7"/>
          <path d="M110 -60 C140 -70 170 -40 170 -10 C170 20 150 40 130 50 C120 30 100 10 110 -20 C100 -30 100 -50 110 -60 Z" fill="#4fbd57"/>
          <ellipse cx="0" cy="-168" rx="120" ry="24" fill="#f4fbff"/></g></g>
        <circle cx="${cx}" cy="${cy}" r="170" fill="url(#${s})"/>
        <g transform="translate(${cx - 30} ${cy + 6})"><circle r="18" fill="#ff4d6d" opacity=".35" class="pulse"/><path d="M0 4 C-12 -8 -14 -20 0 -30 C14 -20 12 -8 0 4 Z" fill="#ff4d6d" transform="translate(0 -4)"/><circle cy="-22" r="5" fill="#fff"/></g>`
        + `<path d="M${cx - 36} ${cy + 14} L${cx - 150} ${cy + 160}" stroke="#ffd84d" stroke-width="3" stroke-dasharray="4 6"/>`
        + `<g transform="translate(${cx - 170} ${cy + 182})"><rect x="-80" y="-28" width="160" height="50" rx="25" fill="#ffd84d"/>${label(0, 8, 'Colombia', 28, '#1d2150')}</g>`
        + `<g transform="translate(560 140)">${Array.from({ length: 7 }, (_, i) => `<path transform="translate(${(i % 4) * 46} ${Math.floor(i / 4) * 40})" d="M-14 6 C-18 -6 -6 -16 4 -12 C14 -16 20 -4 14 6 C8 14 -8 14 -14 6 Z" fill="#4fbd57"/>`).join('')}</g>`
        + label(630, 250, '7 continents', 32, '#fff')
        + `<g transform="translate(548 300)">${Array.from({ length: 5 }, (_, i) => `<path transform="translate(${i * 40} 0)" d="M-14 0 q7 -10 14 0 t14 0" stroke="#5fb6ff" stroke-width="6" fill="none" stroke-linecap="round"/>`).join('')}</g>`
        + label(630, 360, '5 oceans', 32, '#fff');
    },

    seasons: () => {
      const cx = 400, cy = 250;
      const tilted = (x, y) => `<g transform="translate(${x} ${y})"><g transform="rotate(23)">${place('earth', 0, 0, 32)}<path d="M0 -50 V50" stroke="#fff" stroke-width="3" stroke-dasharray="5 5"/></g></g>`;
      const flower = `<g>${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-11" rx="7" ry="11" fill="#ff8fc8" transform="rotate(${a})"/>`).join('')}<circle r="7" fill="#ffd84d"/></g>`;
      const snow = `<g stroke="#e6f6ff" stroke-width="4" stroke-linecap="round">${[0, 60, 120].map((a) => `<path d="M0 -18 V18" transform="rotate(${a})"/>`).join('')}</g>`;
      const leaf = `<path d="M-14 12 C-14 -8 4 -18 16 -16 C18 -2 8 16 -14 12 Z" fill="#ff9d4d"/><path d="M-14 12 L8 -8" stroke="#a8541f" stroke-width="2"/>`;
      return spaceBg(23) + `<ellipse cx="${cx}" cy="${cy}" rx="285" ry="125" fill="none" stroke="#9fe8ff" stroke-width="2.5" stroke-dasharray="8 10" opacity=".6"/>`
        + place('sun', cx, cy, 58)
        + tilted(115, cy) + tilted(685, cy) + tilted(cx, cy - 125) + tilted(cx, cy + 125)
        + `<g transform="translate(115 ${cy - 72})"><circle r="16" fill="#ffd84d"/></g>` + `<g transform="translate(685 ${cy - 72})">${snow}</g>`
        + `<g transform="translate(${cx + 70} ${cy - 130})">${flower}</g>` + `<g transform="translate(${cx + 70} ${cy + 120})">${leaf}</g>`
        + `<g transform="translate(690 395)"><rect x="-100" y="-38" width="200" height="72" rx="20" fill="#fff" opacity=".95"/>
           <g transform="translate(-62 -4)"><circle cx="-8" cy="-6" r="12" fill="#9aa7c7"/><circle cx="8" cy="-8" r="14" fill="#9aa7c7"/><path d="M-10 10 l-4 10 M0 10 l-4 10 M10 10 l-4 10" stroke="#3a86e8" stroke-width="3" stroke-linecap="round"/></g>
           <circle cx="-20" cy="-4" r="12" fill="#ffd84d"/>${label(46, -8, 'Colombia', 22, '#1d2150')}${label(46, 20, 'rainy & dry', 20, '#3a3f7a')}</g>`;
    },

    care: () => spaceBg(24) + place('earth', 400, 225, 120)
      + `<g transform="translate(400 225)"><path d="M-42 -14 q10 -12 20 0" stroke="#1d2150" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M22 -14 q10 -12 20 0" stroke="#1d2150" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-30 18 Q0 46 30 18" stroke="#1d2150" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cx="-56" cy="10" rx="12" ry="7" fill="#ff8fc8" opacity=".7"/><ellipse cx="56" cy="10" rx="12" ry="7" fill="#ff8fc8" opacity=".7"/></g>`
      + floatG(`<path d="M0 -22 C-12 -40 -48 -28 -34 -4 L0 26 L34 -4 C48 -28 12 -40 0 -22 Z" fill="#ff4d6d" transform="translate(520 110) scale(1.2)"/>`, 3, 0)
      + iconBubble(120, 230, 72, '#2f86e8', `<path d="M0 -42 C14 -22 30 -4 30 14 C30 32 16 44 0 44 C-16 44 -30 32 -30 14 C-30 -4 -14 -22 0 -42 Z" fill="#bfe6ff"/><path d="M-12 14 C-12 26 -4 32 6 32" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`, 0)
      + iconBubble(680, 230, 72, '#2a8f55', `<g class="spinme" style="--t:12s">${[0, 120, 240].map((a) => `<g transform="rotate(${a})"><path d="M-6 -36 L16 -36 L30 -12" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 -12 L36 -28 M30 -12 L14 -16" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>`).join('')}</g>`, 1)
      + iconBubble(400, 395, 50, '#8a5a36', `<path d="M0 22 V-6" stroke="#2e9e55" stroke-width="6"/><path d="M0 -2 C-22 -8 -26 -28 -4 -32 C-2 -20 -1 -10 0 -2 Z" fill="#7be08f"/><path d="M0 -8 C20 -14 26 -34 6 -38 C4 -26 2 -16 0 -8 Z" fill="#5ccf75"/>`, 2)
      + label(120, 335, 'save water', 26, '#bfe6ff') + label(680, 335, 'recycle', 26, '#9dffcf') + label(560, 410, 'plant trees', 26, '#9dffcf', 'start'),

    thanks: () => spaceBg(25)
      + Array.from({ length: 14 }, (_, i) => { const r = rng(40 + i); return `<g class="fall" style="--dl:${(r() * 5).toFixed(2)}s;--t:${(4 + r() * 3).toFixed(2)}s"><path transform="translate(${(40 + r() * 720).toFixed(0)} -20) rotate(${(r() * 90).toFixed(0)})" d="M0 -10 L3 -3 L10 -3 L4 2 L6 10 L0 5 L-6 10 L-4 2 L-10 -3 L-3 -3 Z" fill="${['#ffd84d', '#ff6fd8', '#47dcff', '#5cf2a2'][i % 4]}"/></g>`; }).join('')
      + label(400, 170, 'Thank you!', 104, '#fff', 'middle', 'class="pop"')
      + place('earth', 400, 330, 90)
      + floatG(`<path d="M400 236 C388 218 362 230 374 248 L400 268 L426 248 C438 230 412 218 400 236 Z" fill="#ff4d6d"/>`, 2.5)
      + `<g transform="translate(640 380)"><path d="M-80 -40 H80 Q96 -40 96 -24 V20 Q96 36 80 36 H-20 L-44 58 L-40 36 H-80 Q-96 36 -96 20 V-24 Q-96 -40 -80 -40 Z" fill="#ffd84d"/>${label(0, 10, 'Questions?', 28, '#1d2150')}</g>`,

    custom: (ctx) => spaceBg(26) + `<text x="400" y="290" font-size="200" text-anchor="middle">${esc(ctx.emoji || '🌍')}</text>`,
  };

  function scene(art, ctx = {}, cls = '') {
    const f = SCENES[art] || SCENES.custom;
    return `<svg class="scene ${cls}" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${f(ctx)}</svg>`;
  }

  // ---------- Palabras del espacio (viewBox 200×200) ----------
  const W = {
    star: () => place('sun', 100, 100, 62) + [[30, 30], [170, 40], [160, 165], [35, 160]].map(([x, y], i) => `<g class="tw" style="animation-delay:${i * 0.7}s"><path transform="translate(${x} ${y})" d="M0 -9 L2 -2 L9 0 L2 2 L0 9 L-2 2 L-9 0 L-2 -2 Z" fill="#fff"/></g>`).join(''),
    planet: () => place('saturn', 100, 100, 92),
    solar: () => [40, 62, 86].map((r) => `<circle cx="100" cy="100" r="${r}" fill="none" stroke="#9fe8ff" stroke-opacity=".35" stroke-width="1.5"/>`).join('') + place('sun', 100, 100, 20)
      + orbitG(100, 100, 5, place('mercury', 140, 100, 6)) + orbitG(100, 100, 9, place('earth', 100, 38, 9)) + orbitG(100, 100, 14, place('mars', 14, 100, 7)),
    orbit: () => `<circle cx="100" cy="100" r="68" fill="none" stroke="#ffd84d" stroke-width="3" stroke-dasharray="6 8"/>` + place('earth', 100, 100, 32) + orbitG(100, 100, 6, place('moon', 168, 100, 10)),
    rotate: () => `<g transform="translate(100 100) scale(.8)">${globe('earth', { speed: 0.25 })}</g>` + `<path d="M40 40 A85 85 0 0 1 160 40" stroke="#ffd84d" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M160 40 L142 34 M160 40 L152 56" stroke="#ffd84d" stroke-width="6" stroke-linecap="round"/>`,
    revolve: () => `<circle cx="100" cy="100" r="70" fill="none" stroke="#9fe8ff" stroke-width="2" stroke-dasharray="5 7"/>` + place('sun', 100, 100, 26) + orbitG(100, 100, 7, place('earth', 170, 100, 14)),
    axis: () => `<g transform="translate(100 100) rotate(23)"><g transform="scale(.72)">${globe('earth')}</g><path d="M0 -88 V88" stroke="#ffd84d" stroke-width="4" stroke-dasharray="7 6"/><circle cy="-88" r="5" fill="#ffd84d"/><circle cy="88" r="5" fill="#ffd84d"/></g>`,
    moonw: () => place('earth', 100, 100, 40) + orbitG(100, 100, 7, place('moon', 175, 100, 13)),
    gravity: () => place('sun', 60, 100, 40) + place('jupiter', 160, 100, 18) + `<g class="pullx"><path d="M136 100 H108" stroke="#ff6fd8" stroke-width="6" stroke-linecap="round"/><path d="M108 100 L120 90 M108 100 L120 110" stroke="#ff6fd8" stroke-width="6" stroke-linecap="round"/></g>`,
    rocky: () => place('mercury', 28, 100, 12) + place('venus', 70, 100, 20) + place('earth', 120, 100, 21) + place('mars', 168, 100, 15),
    giant: () => place('jupiter', 100, 100, 80),
    asteroid: () => [[50, 60, 22, 7], [130, 50, 16, 5], [100, 120, 28, 9], [160, 140, 14, 6], [40, 150, 12, 4]].map(([x, y, r, t]) => `<g transform="translate(${x} ${y})"><g class="spinme" style="--t:${t}s"><path d="M${-r} ${-r * 0.3} L${-r * 0.4} ${-r} L${r * 0.6} ${-r * 0.8} L${r} ${r * 0.1} L${r * 0.4} ${r * 0.9} L${-r * 0.7} ${r * 0.7} Z" fill="#9b8a7a" stroke="#6e5f52" stroke-width="2"/><circle cx="${r * 0.2}" cy="${-r * 0.2}" r="${r * 0.2}" fill="#7d6e60"/></g></g>`).join(''),
    dwarf: () => place('earth', 70, 110, 55) + place('moon', 150, 150, 15) + place('pluto', 182, 154, 10)
      + label(150, 188, 'Moon', 14, '#cfd6ff') + label(184, 135, 'Pluto', 14, '#ffd84d'),
    atmo: () => `<circle cx="100" cy="100" r="86" fill="#7fd0ff" opacity=".22" class="pulse"/>` + place('earth', 100, 100, 70),
  };
  const word = (art) => `<svg class="wordart" viewBox="0 0 200 200" aria-hidden="true">${(W[art] || W.planet)()}</svg>`;

  function rocket(cls = '') {
    return `<svg class="rocket ${cls}" viewBox="0 0 80 140" aria-hidden="true">
      <g class="flame"><path d="M28 112 Q40 150 52 112 Z" fill="#ffb84d"/><path d="M33 112 Q40 136 47 112 Z" fill="#fff1a6"/></g>
      <path d="M14 96 L4 120 L26 110 Z" fill="#ff6b6b"/><path d="M66 96 L76 120 L54 110 Z" fill="#ff6b6b"/>
      <path d="M40 4 C64 24 66 70 58 112 H22 C14 70 16 24 40 4 Z" fill="#f4f6ff"/>
      <path d="M40 4 C50 12 56 22 59 34 H21 C24 22 30 12 40 4 Z" fill="#ff6b6b"/>
      <circle cx="40" cy="58" r="12" fill="#47dcff" stroke="#3a3f7a" stroke-width="4"/><rect x="34" y="104" width="12" height="10" fill="#3a3f7a"/></svg>`;
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]); }

  return { body, globe, place, lumi, alien, scene, word, rocket, stars, esc, ARTS: Object.keys(SCENES) };
})();
