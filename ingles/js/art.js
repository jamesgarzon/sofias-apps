// Dibujos de Helper Town (SVG): niños haciendo cada tarea, escenas de las paradas, historias, mascotas e íconos.
window.Art = (() => {
  const FONT = `font-family="Fredoka, Nunito, sans-serif"`;
  const S = (inner, vb = '0 0 800 450', cls = 'scene') => `<svg class="${cls}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}</svg>`;
  const label = (x, y, t, c = '#fff', size = 24) => `<text class="lbl" x="${x}" y="${y}" text-anchor="middle" ${FONT} font-size="${size}" font-weight="700" fill="${c}" stroke="#23313a" stroke-width="5" paint-order="stroke">${t}</text>`;
  const ok = (x, y, r = 20) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#2bb673"/><path d="M${-r * 0.45} 0 l${r * 0.3} ${r * 0.32} l${r * 0.55} ${-r * 0.6}" stroke="#fff" stroke-width="${r * 0.22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const no = (x, y, r = 20) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#ff5a5f"/><path d="M${-r * 0.4} ${-r * 0.4} L${r * 0.4} ${r * 0.4} M${r * 0.4} ${-r * 0.4} L${-r * 0.4} ${r * 0.4}" stroke="#fff" stroke-width="${r * 0.22}" stroke-linecap="round"/></g>`;
  const bubble = (x, y, w, h, t, tail = 'left', size = 26) => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#fff" stroke="#23313a" stroke-width="3"/>
    <path d="M${tail === 'left' ? x + 34 : x + w - 34} ${y + h - 2} l${tail === 'left' ? -6 : 6} 22 l${tail === 'left' ? 22 : -22} -22" fill="#fff" stroke="#23313a" stroke-width="3" stroke-linejoin="round"/>
    <rect x="${tail === 'left' ? x + 24 : x + w - 50}" y="${y + h - 6}" width="26" height="6" fill="#fff"/>
    <text x="${x + w / 2}" y="${y + h / 2 + size * 0.36}" text-anchor="middle" ${FONT} font-size="${size}" font-weight="700" fill="#23313a">${t}</text></g>`;

  // ---------- Niños ----------
  // Coordenadas locales: pies en (0,0), cabeza en (0,-106). Las acciones miran a la derecha; flip las voltea.
  const arm = (sx, sy, hx, hy, c, skin) => `<path d="M${sx} ${sy} Q${(sx + hx) / 2 + (hx < sx ? -5 : 5)} ${(sy + hy) / 2 + 4} ${hx} ${hy}" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="5.5" fill="${skin}"/>`;
  const drops = (x, y, c, n = 3) => Array.from({ length: n }, (_, i) => `<circle class="drop" style="animation-delay:${(i * 0.4).toFixed(1)}s" cx="${x + i * 4}" cy="${y}" r="2.6" fill="${c}"/>`).join('');
  const pain = (d) => `<path class="throb" d="${d}" stroke="#ff4d4d" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  const handle = (x1, y1, x2, y2, c = '#b07a45') => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`;
  const ACT = {
    idle: {},
    wave: { R: [42, -122], move: 'R', cls: 'a-wave', o: [16, -76], mood: 'happy' },
    talk: { R: [32, -74], mood: 'talk' },
    point: { R: [38, -92], mood: 'talk' },
    sweep: { L: [4, -72], R: [14, -50], move: 'both', cls: 'a-sweep', o: [4, -72],
      item: handle(-4, -90, 36, -8) + `<path d="M24 -14 L46 -4 L48 5 L18 5z" fill="#e8c15a" stroke="#c99a2e" stroke-width="2"/>` },
    mop: { L: [4, -72], R: [14, -50], move: 'both', cls: 'a-sweep', o: [4, -72],
      item: handle(-4, -90, 34, -10) + `<rect x="20" y="-14" width="32" height="8" rx="3" fill="#4ea3db"/><path d="M23 -6 v11 M29 -6 v12 M35 -6 v11 M41 -6 v12 M47 -6 v11" stroke="#eef6fb" stroke-width="3.5" stroke-linecap="round"/>` },
    vacuum: { L: [10, -60], R: [20, -52], move: 'both', cls: 'a-push',
      item: `<path d="M16 -58 Q62 -86 84 -36" stroke="#555b70" stroke-width="4" fill="none"/>` + handle(4, -70, 50, -6, '#8a8fa3') + `<rect x="38" y="-8" width="32" height="10" rx="4" fill="#555b70"/>
        <rect x="70" y="-38" width="38" height="32" rx="14" fill="#ff6f59"/><circle cx="78" cy="-2" r="6" fill="#333"/><circle cx="100" cy="-2" r="6" fill="#333"/>` },
    wash: { L: [12, -62], R: [26, -66], move: 'both', cls: 'a-scrub',
      item: `<ellipse cx="24" cy="-62" rx="15" ry="6" fill="#fff" stroke="#b9c4d4" stroke-width="2"/><rect x="18" y="-74" width="13" height="8" rx="2" fill="#ffd84a"/><circle cx="40" cy="-76" r="4" fill="#fff" stroke="#9fd8f5"/><circle cx="12" cy="-80" r="3" fill="#fff" stroke="#9fd8f5"/>` },
    dust: { R: [28, -98], move: 'item', cls: 'a-wiggle', o: [28, -98],
      item: handle(28, -98, 40, -124, '#8a5a33') + `<circle cx="42" cy="-132" r="10" fill="#ff8fc8"/><circle cx="34" cy="-136" r="7" fill="#ffc4e1"/><circle cx="50" cy="-138" r="7" fill="#ffc4e1"/><circle cx="42" cy="-142" r="6" fill="#ff8fc8"/>` },
    water: { L: [14, -62], R: [26, -68], move: 'both', cls: 'a-tilt', o: [20, -66],
      item: `<rect x="22" y="-82" width="30" height="24" rx="6" fill="#4cb3ff"/><path d="M50 -76 L72 -88" stroke="#4cb3ff" stroke-width="6" stroke-linecap="round"/><path d="M28 -84 q9 -12 18 0" stroke="#2f80ed" stroke-width="4" fill="none"/>` + drops(72, -84, '#4cb3ff') },
    carry: { R: [24, -40], body: 'a-walk',
      item: `<path d="M19 -44 q5 -8 10 0" stroke="#222b4a" stroke-width="3" fill="none"/><path d="M12 -40 Q8 -4 26 -2 Q46 -4 40 -40z" fill="#2b3550"/>` },
    set: { L: [14, -66], R: [30, -66], move: 'both', cls: 'a-lift',
      item: `<ellipse cx="22" cy="-68" rx="17" ry="5" fill="#fff" stroke="#b9c4d4" stroke-width="2"/>` },
    feed: { R: [26, -64], move: 'R', cls: 'a-pour', o: [16, -76],
      item: `<rect x="22" y="-90" width="20" height="28" rx="3" fill="#ff9f43" transform="rotate(40 32 -76)"/><circle cx="31" cy="-78" r="4" fill="#fff"/>` + drops(44, -66, '#8a5a33', 4) },
    pillow: { L: [16, -78], R: [36, -74], move: 'both', cls: 'a-lift',
      item: `<rect x="12" y="-96" width="46" height="28" rx="11" fill="#fff" stroke="#c8d2e0" stroke-width="2"/>` },
    teddy: { R: [26, -46], move: 'R', cls: 'a-dip', o: [16, -76],
      item: `<circle cx="34" cy="-36" r="10" fill="#b07a45"/><circle cx="34" cy="-52" r="8" fill="#b07a45"/><circle cx="28" cy="-58" r="3.5" fill="#b07a45"/><circle cx="40" cy="-58" r="3.5" fill="#b07a45"/><circle cx="34" cy="-51" r="2" fill="#3b2414"/>` },
    // Enfermos
    ear: { L: [-26, -104], mood: 'ouch', front: pain('M-38 -118 l-8 -6 M-40 -104 h-10 M-38 -90 l-8 6') },
    throat: { L: [-5, -86], R: [5, -86], mood: 'ouch', front: pain('M26 -92 l9 -5 M27 -84 h11 M26 -76 l9 5') },
    tooth: { R: [22, -98], mood: 'ouch', front: `<ellipse cx="18" cy="-98" rx="8" ry="7" fill="#ff8fa0" opacity=".6"/>` + pain('M36 -112 l8 -6 M38 -100 h10 M36 -88 l8 6') },
    fever: { mood: 'sad', body: 'a-shiver', front: `<circle cx="0" cy="-106" r="23" fill="#ff4d4d" opacity=".22"/><path d="M2 -95 L26 -84" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M2 -95 L26 -84" stroke="#9aa6b8" stroke-width="1.5"/><circle cx="27" cy="-84" r="4.5" fill="#ff4d4d"/><path d="M-24 -122 q-5 8 0 10 q5 -2 0 -10z" fill="#7fd3ff"/>` },
    dizzy: { mood: 'dizzy', body: 'a-sway', front: `<g class="a-orbit" style="transform-origin:0px -140px">${[[-28, -140], [28, -140], [0, -152]].map(([x, y]) => `<path d="M${x} ${y - 7} l2 5 l5 1 l-4 3 l1 5 l-4 -3 l-4 3 l1 -5 l-4 -3 l5 -1z" fill="#ffc93c"/>`).join('')}</g>` },
    stomach: { L: [-8, -56], R: [8, -54], mood: 'sad', front: `<path d="M-8 -62 q8 -7 16 0" stroke="#ff4d4d" stroke-width="2.5" fill="none" class="throb"/>` },
    cough: { L: [-4, -94], mood: 'o', body: 'a-shiver', front: `<g class="throb"><circle cx="16" cy="-96" r="4" fill="#cfd6e0"/><circle cx="24" cy="-100" r="5" fill="#cfd6e0"/><circle cx="32" cy="-94" r="4" fill="#cfd6e0"/></g>` },
    cut: { R: [28, -76], mood: 'ouch', front: `<rect x="25" y="-90" width="6" height="11" rx="2" fill="#f1d39a" stroke="#c9a76b"/><path d="M36 -92 q-3 5 0 7 q3 -2 0 -7z" fill="#ff4d4d" class="throb"/>` },
    tired: { L: [-4, -94], mood: 'sleepy', front: `<g class="a-float">${[['Z', 22, -128, 18], ['Z', 36, -146, 14], ['z', 48, -160, 12]].map(([t, x, y, f]) => `<text x="${x}" y="${y}" ${FONT} font-size="${f}" font-weight="700" fill="#5b6bd6">${t}</text>`).join('')}</g>` },
    drink: { R: [18, -92], mood: 'happy', front: `<rect x="12" y="-112" width="15" height="22" rx="3" fill="#bfe8ff" stroke="#7fb8d8" stroke-width="2"/><rect x="13" y="-104" width="13" height="13" fill="#7fd3ff"/><path d="M-26 -124 q-5 8 0 10 q5 -2 0 -10z" fill="#7fd3ff"/>` },
    cold: { R: [22, -94], mood: 'sad', front: `<path d="M-19 -88 h38 v9 h-38z" fill="#ff6f59"/><rect x="6" y="-84" width="10" height="24" rx="3" fill="#ff6f59"/><circle cx="0" cy="-101" r="4.5" fill="#ff6b6b"/><rect x="18" y="-104" width="12" height="12" rx="3" fill="#fff" stroke="#d6dde8"/>` },
  };
  const EYES = {
    open: `<g class="blink"><circle cx="-8" cy="-108" r="3.3" fill="#1d2150"/><circle cx="8" cy="-108" r="3.3" fill="#1d2150"/></g>`,
    shut: `<path d="M-12 -107 q4 3 8 0 M4 -107 q4 3 8 0" stroke="#1d2150" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    dizzy: `<g stroke="#1d2150" stroke-width="2" fill="none"><circle cx="-8" cy="-108" r="5"/><circle cx="-8" cy="-108" r="2"/><circle cx="8" cy="-108" r="5"/><circle cx="8" cy="-108" r="2"/></g>`,
  };
  const MOUTH = {
    happy: `<path d="M-7 -97 q7 7 14 0" stroke="#7a2e2e" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    talk: `<path d="M-7 -98 q7 9 14 0z" fill="#7a2e2e"/>`,
    sad: `<path d="M-6 -93 q6 -6 12 0" stroke="#7a2e2e" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    ouch: `<path d="M-8 -95 l4 -3 l4 3 l4 -3 l4 3" stroke="#7a2e2e" stroke-width="2.4" fill="none" stroke-linejoin="round"/>`,
    o: `<ellipse cx="0" cy="-95" rx="4" ry="5" fill="#7a2e2e"/>`,
  };
  const MOOD = { happy: ['open', 'happy'], talk: ['open', 'talk'], sad: ['open', 'sad'], ouch: ['shut', 'ouch'], o: ['open', 'o'], sleepy: ['shut', 'o'], dizzy: ['dizzy', 'ouch'] };
  const HAIR = {
    short: (c) => `<path d="M-24 -108 Q-26 -136 0 -136 Q26 -136 24 -108 Q14 -124 0 -122 Q-14 -124 -24 -108z" fill="${c}"/>`,
    bob: (c) => `<path d="M-27 -94 Q-31 -138 0 -138 Q31 -138 27 -94 L21 -94 Q22 -120 0 -122 Q-22 -120 -21 -94z" fill="${c}"/>`,
    puffs: (c) => `<circle cx="-25" cy="-128" r="11" fill="${c}"/><circle cx="25" cy="-128" r="11" fill="${c}"/>` + HAIR.short(c),
    long: (c) => `<path d="M-26 -110 Q-30 -138 0 -138 Q30 -138 26 -110 L28 -70 L-28 -70z" fill="${c}"/>`,
    curly: (c) => [[-18, -126], [-6, -132], [8, -132], [19, -125], [-24, -114], [24, -114]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="${c}"/>`).join(''),
  };
  function kid(x, y, o = {}) {
    const d = { s: 1, skin: '#f2c39b', hair: '#4a2c1a', style: 'short', shirt: '#4f9dff', pants: '#3b4a9e', act: 'idle', flip: false, ...o };
    const A = ACT[d.act] || {}, [eyes, mouth] = MOOD[d.mood || A.mood || 'happy'];
    const L = arm(-16, -76, ...(A.L || [-22, -42]), d.shirt, d.skin), R = arm(16, -76, ...(A.R || [22, -42]), d.shirt, d.skin);
    const mv = A.move, g = (inner) => (A.cls ? `<g class="${A.cls}"${A.o ? ` style="transform-origin:${A.o[0]}px ${A.o[1]}px"` : ''}>${inner}</g>` : inner);
    const item = A.item || '';
    const arms = mv === 'both' ? g(item + L + R) : mv === 'R' ? L + g(item + R) : mv === 'item' ? L + R + g(item) : L + item + R;
    const back = d.style === 'long' ? HAIR.long(d.hair) : '';
    const body = `${back}<ellipse cx="-9" cy="-2" rx="9" ry="5" fill="#3b2a20"/><ellipse cx="9" cy="-2" rx="9" ry="5" fill="#3b2a20"/>
      <rect x="-13" y="-40" width="10" height="38" rx="4" fill="${d.pants}"/><rect x="3" y="-40" width="10" height="38" rx="4" fill="${d.pants}"/>
      <rect x="-19" y="-84" width="38" height="50" rx="13" fill="${d.shirt}"/>
      <circle cx="-23" cy="-104" r="5" fill="${d.skin}"/><circle cx="23" cy="-104" r="5" fill="${d.skin}"/><circle cx="0" cy="-106" r="23" fill="${d.skin}"/>
      ${d.style === 'long' ? HAIR.short(d.hair) : HAIR[d.style](d.hair)}
      <ellipse cx="-14" cy="-98" rx="5" ry="3" fill="#ff8fa0" opacity=".55"/><ellipse cx="14" cy="-98" rx="5" ry="3" fill="#ff8fa0" opacity=".55"/>
      ${EYES[eyes]}${MOUTH[mouth]}${arms}${A.front || ''}`;
    return `<g transform="translate(${x} ${y}) scale(${d.flip ? -d.s : d.s} ${d.s})">${A.body ? `<g class="${A.body}">${body}</g>` : body}</g>`;
  }
  // Los niños del taller y otros vecinos (mismo estilo de cara para todos).
  const CHARLIE = { skin: '#f2c39b', hair: '#6b3b1f', style: 'short', shirt: '#4f9dff', pants: '#3b4a9e' };
  const LIN = { skin: '#f5d6b8', hair: '#1f1a1a', style: 'bob', shirt: '#ff7aa8', pants: '#6a4fb3' };
  const KIDS = [
    { skin: '#8d5a3b', hair: '#1f1a1a', style: 'puffs', shirt: '#ffc93c', pants: '#2f6d5a' },
    { skin: '#c98e62', hair: '#2b1b12', style: 'curly', shirt: '#2bb673', pants: '#33415c' },
    { skin: '#f2c39b', hair: '#d9a441', style: 'long', shirt: '#b48cff', pants: '#3b4a9e' },
    { skin: '#e0ac7e', hair: '#3b2414', style: 'short', shirt: '#ff9f43', pants: '#4a3a8f' },
  ];

  // ---------- Muebles y cosas ----------
  const room = (wall, floor, fy = 410) => `<rect width="800" height="${fy}" fill="${wall}"/><rect y="${fy}" width="800" height="${450 - fy}" fill="${floor}"/><rect y="${fy - 8}" width="800" height="8" fill="#fff" opacity=".7"/>`;
  const win = (x, y, w, h, inner = '') => `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="8" fill="#fff"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#9fdcff"/>${inner}<path d="M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}" stroke="#fff" stroke-width="6"/>`;
  const cloud = (x, y, s = 1) => `<g class="drift" style="--d:${(16 + x / 50).toFixed(0)}s"><g transform="translate(${x} ${y}) scale(${s})"><circle r="14" fill="#fff"/><circle cx="16" cy="-6" r="17" fill="#fff"/><circle cx="34" cy="1" r="12" fill="#fff"/><rect x="-6" width="44" height="12" rx="6" fill="#fff"/></g></g>`;
  const sun = (x, y, r = 22) => `<g transform="translate(${x} ${y})"><g class="spinme" style="--t:20s">${Array.from({ length: 10 }, (_, i) => `<rect x="-2.5" y="${-r - 13}" width="5" height="10" rx="2.5" fill="#ffc93c" transform="rotate(${i * 36})"/>`).join('')}</g><circle r="${r}" fill="#ffd84a"/></g>`;
  const plate = (x, y, s = 1) => `<ellipse cx="${x}" cy="${y}" rx="${16 * s}" ry="${5 * s}" fill="#fff" stroke="#b9c4d4" stroke-width="2"/>`;
  const cup = (x, y, c = '#ff6f59') => `<path d="M${x - 7} ${y - 16} h14 l-2 16 h-10z" fill="${c}"/><path d="M${x + 7} ${y - 12} q7 2 0 8" stroke="${c}" stroke-width="2.5" fill="none"/>`;
  const plant = (x, y, s = 1, c = '#ff8f5a') => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sway"><path d="M0 -36 Q-26 -60 -30 -86 Q-6 -70 0 -40z M0 -36 Q22 -66 30 -92 Q8 -76 0 -40z M0 -38 Q2 -76 0 -100 Q-6 -70 0 -38z" fill="#3fae4f"/></g><path d="M-20 -38 h40 l-6 38 h-28z" fill="${c}"/></g>`;
  const teddy = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cy="-12" r="12" fill="#b07a45"/><circle cy="-32" r="10" fill="#b07a45"/><circle cx="-8" cy="-40" r="4" fill="#b07a45"/><circle cx="8" cy="-40" r="4" fill="#b07a45"/><circle cy="-30" r="3" fill="#3b2414"/></g>`;
  const ball = (x, y, r = 12, c = '#ff6f59') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><path d="M${x - r} ${y} h${2 * r}" stroke="#fff" stroke-width="3"/>`;
  const soccer = (x, y, r = 14) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#23313a" stroke-width="2"/><path d="M${x} ${y - 5} l5 4 l-2 6 h-6 l-2 -6z" fill="#23313a"/>`;
  const bandageBox = (x, y, w = 70, h = 44) => `<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="4" fill="#fff" stroke="#c9d3df" stroke-width="2"/><rect x="${w * 0.18}" y="${h * 0.42}" width="${w * 0.52}" height="${h * 0.32}" rx="${h * 0.16}" fill="#f1d39a" transform="rotate(-12 ${w * 0.44} ${h * 0.58})"/><circle cx="${w - 12}" cy="11" r="8" fill="#ff5a5f"/><path d="M${w - 12} 6 v10 M${w - 17} 11 h10" stroke="#fff" stroke-width="3"/><text x="8" y="16" ${FONT} font-size="11" font-weight="700" fill="#23313a">Bandages</text></g>`;
  const syrup = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="14" y="-90" width="22" height="14" rx="3" fill="#ff5a5f"/><path d="M8 -76 h34 v8 q12 6 12 22 v40 q0 6 -6 6 h-46 q-6 0 -6 -6 v-40 q0 -16 12 -22z" fill="#b5532a"/><rect x="-2" y="-52" width="54" height="30" rx="4" fill="#fff"/><text x="25" y="-40" text-anchor="middle" ${FONT} font-size="10" font-weight="700" fill="#23313a">Cough</text><text x="25" y="-28" text-anchor="middle" ${FONT} font-size="10" font-weight="700" fill="#23313a">Syrup</text></g>`;
  const cream = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-8" width="12" height="8" fill="#9aa6b8"/><path d="M-18 -86 h36 l-3 78 h-30z" fill="#fff" stroke="#c9d3df" stroke-width="2"/><rect x="-18" y="-92" width="36" height="8" rx="2" fill="#dfe6ee"/><text y="-60" text-anchor="middle" ${FONT} font-size="10" font-weight="700" fill="#23313a">Cream</text><circle cy="-40" r="7" fill="#2bb673"/><path d="M0 -45 v10 M-5 -40 h10" stroke="#fff" stroke-width="2.5"/></g>`;
  const pillBottle = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-14" y="-40" width="28" height="40" rx="5" fill="#ffb347"/><rect x="-16" y="-48" width="32" height="10" rx="3" fill="#fff"/><rect x="-10" y="-30" width="20" height="16" fill="#fff"/></g>`;
  const fridge = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#f4f8ff" stroke="#c9d6ea" stroke-width="3"/><path d="M${x} ${y + h * 0.32} H${x + w}" stroke="#c9d6ea" stroke-width="3"/><rect x="${x + w - 22}" y="${y + 30}" width="8" height="40" rx="4" fill="#c9d6ea"/>`;
  const bedFrame = (x, y, w, blanket = '#7bb6ff', messy = false, floor = 410) => `<rect x="${x}" y="${y - 70}" width="22" height="110" rx="6" fill="#a8693b"/><rect x="${x + 10}" y="${y}" width="${w}" height="30" rx="8" fill="#fff"/>
    <path d="M${x + 60} ${y - 4} h${w - 56} q8 0 8 10 v26 h-${w - 50}z" fill="${blanket}"${messy ? ` transform="rotate(-6 ${x + 60} ${y})"` : ''}/><rect x="${x + 6}" y="${y + 30}" width="${w + 10}" height="14" rx="4" fill="#a8693b"/><rect x="${x + 8}" y="${y + 44}" width="10" height="${floor - y - 44}" fill="#8a5a33"/><rect x="${x + w}" y="${y + 44}" width="10" height="${floor - y - 44}" fill="#8a5a33"/>`;
  const dog = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cy="-16" rx="22" ry="13" fill="#e8b27a"/><circle cx="20" cy="-30" r="12" fill="#e8b27a"/><ellipse cx="28" cy="-38" rx="5" ry="9" fill="#a8693b"/><circle cx="24" cy="-32" r="2" fill="#1d2150"/><circle cx="31" cy="-27" r="2.5" fill="#1d2150"/><rect x="-16" y="-8" width="6" height="10" fill="#e8b27a"/><rect x="10" y="-8" width="6" height="10" fill="#e8b27a"/><path class="wag" d="M-22 -20 q-12 -8 -8 -18" stroke="#e8b27a" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  const cat = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cy="-16" rx="16" ry="18" fill="#9aa1b8"/><circle cy="-42" r="13" fill="#9aa1b8"/><path d="M-11 -50 l-2 -12 l9 7z M11 -50 l2 -12 l-9 7z" fill="#9aa1b8"/><circle cx="-5" cy="-43" r="2" fill="#1d2150"/><circle cx="5" cy="-43" r="2" fill="#1d2150"/><path class="wag" d="M14 -6 q16 -4 14 -22" stroke="#9aa1b8" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;

  // ---------- Escenas (800×450) ----------
  const SCENES = {
    kitchen: () => room('#ffe6cf', '#e9c49a') +
      `<rect x="20" y="40" width="250" height="80" rx="8" fill="#9fd8c8"/><path d="M103 40 V120 M186 40 V120" stroke="#7cc2b0" stroke-width="3"/>` +
      win(310, 50, 150, 100, sun(345, 85, 14) + cloud(390, 100, 0.7)) + `<circle cx="560" cy="90" r="30" fill="#fff" stroke="#ff8f5a" stroke-width="5"/><path d="M560 90 V72 M560 90 H574" stroke="#23313a" stroke-width="3" stroke-linecap="round"/>` +
      // fregadero
      `<rect x="150" y="350" width="130" height="60" fill="#9fd8c8"/><rect x="144" y="340" width="142" height="14" rx="4" fill="#d9e3ea"/><rect x="176" y="342" width="70" height="8" rx="3" fill="#7d8aa0"/><path d="M226 340 V316 q0 -8 10 -8 h8" stroke="#9aa6b8" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      plate(262, 336, 0.8) + plate(262, 330, 0.8) + plate(262, 324, 0.8) +
      kid(118, 410, { ...LIN, act: 'wash' }) +
      // mesa
      `<rect x="380" y="336" width="170" height="14" rx="5" fill="#c98a4b"/><rect x="392" y="350" width="10" height="60" fill="#a06a35"/><rect x="528" y="350" width="10" height="60" fill="#a06a35"/>` +
      plate(430, 332) + plate(500, 332) + cup(462, 334) + `<path d="M408 334 v-14 M520 334 v-14" stroke="#9aa6b8" stroke-width="3" stroke-linecap="round"/>` +
      kid(350, 410, { ...CHARLIE, act: 'set' }) +
      // trapear
      `<ellipse cx="640" cy="414" rx="44" ry="7" fill="#bfe8ff" opacity=".8"/>` + kid(598, 410, { ...KIDS[0], act: 'mop' }) +
      // basura y puerta
      `<rect x="700" y="160" width="90" height="250" rx="6" fill="#8a5a33"/><rect x="708" y="168" width="74" height="236" fill="#9fdcff"/><circle cx="772" cy="300" r="5" fill="#ffc93c"/>` +
      `<path d="M664 410 l4 -50 h34 l4 50z" fill="#6d7f9e"/><rect x="660" y="352" width="50" height="10" rx="4" fill="#556680"/>` +
      kid(735, 410, { ...KIDS[1], act: 'carry' }),

    living: () => room('#e5ecff', '#c9a27a') + `<ellipse cx="350" cy="430" rx="190" ry="20" fill="#ff8f8f" opacity=".7"/>` +
      // estante
      `<rect x="40" y="150" width="170" height="260" rx="6" fill="#a8693b"/><rect x="50" y="160" width="150" height="70" fill="#c98a4b"/><rect x="50" y="240" width="150" height="70" fill="#c98a4b"/><rect x="50" y="320" width="150" height="80" fill="#c98a4b"/>` +
      `<rect x="60" y="186" width="12" height="44" fill="#ff6f59"/><rect x="74" y="190" width="10" height="40" fill="#4f9dff"/><rect x="86" y="182" width="14" height="48" fill="#2bb673"/><circle cx="170" cy="216" r="14" fill="#b48cff"/><rect x="130" y="266" width="50" height="44" rx="4" fill="#ffd84a"/>` +
      `<g class="tw"><circle cx="160" cy="260" r="3" fill="#fff"/><circle cx="96" cy="250" r="2.5" fill="#fff"/></g>` +
      kid(105, 410, { ...KIDS[2], act: 'dust' }) +
      win(300, 50, 150, 100, cloud(330, 90, 0.8)) + `<rect x="500" y="70" width="80" height="60" rx="4" fill="#fff"/><rect x="508" y="78" width="64" height="44" fill="#9fd8c8"/><path d="M508 122 l20 -24 l14 14 l10 -10 l20 20z" fill="#3fae4f"/>` +
      // sofá
      `<rect x="250" y="300" width="230" height="70" rx="22" fill="#6c79ad"/><rect x="236" y="330" width="258" height="56" rx="18" fill="#7b87b8"/><rect x="250" y="384" width="12" height="20" fill="#3b4a9e"/><rect x="468" y="384" width="12" height="20" fill="#3b4a9e"/>` +
      kid(300, 410, { ...CHARLIE, act: 'vacuum' }) +
      // plantas
      plant(612, 410, 1) + plant(668, 410, 0.8, '#4f9dff') + kid(545, 410, { ...LIN, act: 'water' }) +
      // barrer
      `<g class="pulse"><circle cx="772" cy="404" r="5" fill="#a08a6c"/><circle cx="782" cy="400" r="3.5" fill="#a08a6c"/><circle cx="764" cy="401" r="3" fill="#a08a6c"/></g>` + kid(722, 410, { ...KIDS[3], act: 'sweep' }),

    bedroom: () => room('#fde2ec', '#d8b48a') +
      win(330, 50, 160, 100, sun(370, 90, 16)) + `<rect x="560" y="70" width="70" height="90" rx="6" fill="#fff"/><path d="M570 150 l25 -60 l25 60z" fill="#ffc93c"/>` +
      `<g transform="rotate(-8 92 150)"><rect x="60" y="120" width="70" height="56" rx="6" fill="#b48cff"/><circle cx="95" cy="148" r="14" fill="#ffd84a"/></g>` +
      bedFrame(30, 330, 230, '#7bb6ff', true) + `<rect x="52" y="304" width="58" height="30" rx="12" fill="#fff" transform="rotate(-14 80 318)"/>` +
      kid(305, 410, { ...LIN, act: 'pillow', flip: true }) +
      // juguetes
      `<rect x="420" y="350" width="110" height="60" rx="8" fill="#ff8f5a"/><rect x="414" y="342" width="122" height="14" rx="5" fill="#ff6f59"/><text x="475" y="388" text-anchor="middle" ${FONT} font-size="18" font-weight="700" fill="#fff">TOYS</text>` +
      ball(380, 398, 11, '#4f9dff') + `<rect x="540" y="388" width="20" height="20" fill="#2bb673"/><rect x="552" y="372" width="18" height="18" fill="#ffc93c"/>` +
      kid(395, 410, { ...CHARLIE, act: 'teddy' }) +
      // mascotas
      cat(612, 410, 0.9) + `<path d="M690 410 q14 -16 36 0z" fill="#ff6f59"/><ellipse cx="708" cy="400" rx="16" ry="4" fill="#8a5a33"/>` +
      `<rect x="728" y="250" width="62" height="64" rx="8" fill="#bfe8ff" stroke="#fff" stroke-width="4"/><path d="M728 268 h62" stroke="#7fd3ff" stroke-width="2"/><g class="swim"><path d="M748 290 q12 -10 22 0 q-10 10 -22 0z M748 290 l-8 -6 v12z" fill="#ff8f2a"/></g><rect x="740" y="314" width="40" height="96" fill="#c98a4b"/>` +
      kid(668, 410, { ...KIDS[0], act: 'feed' }),

    yesterday: () => room('#e8f6ef', '#d9c3a5') +
      fridge(30, 70, 230, 340) + `<rect x="52" y="120" width="186" height="240" rx="6" fill="#fff8e6" transform="rotate(-2 145 240)"/><circle cx="145" cy="124" r="7" fill="#ff5a5f"/>` +
      `<text x="145" y="160" text-anchor="middle" ${FONT} font-size="24" font-weight="700" fill="#23313a">Yesterday</text>` +
      [['bed', 1], ['broom', 0], ['trash', 0], ['petfood', 1]].map(([k, done], i) => `<g transform="translate(64 ${172 + i * 46}) scale(.5)">${ICONS[k]}</g>${done ? ok(210, 192 + i * 46, 17) : no(210, 192 + i * 46, 17)}`).join('') +
      bubble(290, 34, 180, 64, 'Did you…?', 'right') + kid(375, 410, { ...CHARLIE, act: 'talk' }) +
      bubble(490, 34, 190, 64, 'Yes, I did.', 'left') + kid(560, 410, { ...LIN, act: 'cough', flip: true }) +
      win(650, 170, 130, 110, `<rect x="672" y="214" width="86" height="56" fill="#ff9f43"/><path d="M666 216 l49 -28 l49 28z" fill="#ff6f59"/><rect x="706" y="240" width="18" height="30" fill="#8a5a33"/>`) + no(745, 190, 18),

    doctor: () => room('#e3f4fb', '#cfd8e3', 425) +
      `<rect x="300" y="24" width="200" height="58" rx="12" fill="#fff" stroke="#ff5a5f" stroke-width="4"/><rect x="314" y="36" width="34" height="34" rx="6" fill="#ff5a5f"/><path d="M331 42 v22 M320 53 h22" stroke="#fff" stroke-width="6"/><text x="420" y="64" text-anchor="middle" ${FONT} font-size="28" font-weight="700" fill="#23313a">DOCTOR</text>` +
      `<rect x="40" y="40" width="80" height="100" rx="6" fill="#fff"/><path d="M50 60 h60 M50 76 h60 M50 92 h40" stroke="#c9d3df" stroke-width="5" stroke-linecap="round"/><circle cx="720" cy="80" r="30" fill="#fff" stroke="#4f9dff" stroke-width="5"/><path d="M720 80 V62 M720 80 H732" stroke="#23313a" stroke-width="3" stroke-linecap="round"/>` +
      `<rect x="20" y="380" width="760" height="14" rx="6" fill="#9aa6c8" opacity=".5"/>` +
      [['ear', KIDS[1]], ['fever', LIN], ['throat', KIDS[3]], ['tooth', CHARLIE], ['dizzy', KIDS[2]], ['stomach', KIDS[0]]]
        .map(([act, look], i) => kid([70, 200, 330, 465, 600, 730][i], 425, { ...look, act, s: 0.95 })).join(''),

    advice: () => {
      const panel = (x, y, c) => `<rect x="${x}" y="${y}" width="388" height="213" rx="14" fill="${c}" stroke="#23313a" stroke-width="4"/>`;
      return `<rect width="800" height="450" fill="#fff"/>` + panel(6, 6, '#fff4d6') + panel(406, 6, '#e7e3ff') + panel(6, 231, '#dfe9f5') + panel(406, 231, '#e0f7ea') +
        // corté el dedo → curita
        kid(110, 212, { ...CHARLIE, act: 'cut', s: 0.78 }) + bandageBox(190, 120, 90, 56) + ok(310, 160, 24) +
        // cansado → dormir temprano
        `<circle cx="740" cy="44" r="18" fill="#ffe27a"/><circle cx="748" cy="38" r="16" fill="#e7e3ff"/>` + `<g transform="translate(560 0)">${bedFrame(0, 160, 120, '#b48cff', false, 212)}</g>` +
        kid(480, 212, { ...LIN, act: 'tired', s: 0.78 }) + ok(740, 160, 24) +
        // resfriado → no jugar bajo la lluvia
        win(200, 262, 150, 110, `<g>${Array.from({ length: 9 }, (_, i) => `<path class="drop" style="animation-delay:${(i * 0.23).toFixed(2)}s" d="M${210 + i * 16} ${270 + (i % 3) * 12} l-4 12" stroke="#4f7cff" stroke-width="3" stroke-linecap="round"/>`).join('')}</g>`) + soccer(280, 410, 14) + no(330, 400, 24) +
        kid(100, 437, { ...KIDS[0], act: 'cold', s: 0.78 }) +
        // sed → agua fresca
        soccer(470, 418, 14) + kid(560, 437, { ...KIDS[3], act: 'drink', s: 0.78 }) +
        `<path d="M660 330 h40 l-4 90 h-32z" fill="#bfe8ff" stroke="#7fb8d8" stroke-width="3"/><rect x="668" y="316" width="24" height="16" rx="4" fill="#4f9dff"/><rect x="664" y="360" width="32" height="56" fill="#7fd3ff" opacity=".7"/>` + ok(740, 380, 24);
    },

    pharmacy: () => room('#eaf7f1', '#dfe6e2') +
      // mostrador y farmacéutica
      kid(120, 360, { ...KIDS[2], act: 'talk', s: 0.9, shirt: '#fff' }) +
      `<rect x="20" y="300" width="230" height="110" rx="10" fill="#2bb673"/><rect x="20" y="292" width="230" height="16" rx="6" fill="#1f9a5e"/><rect x="104" y="324" width="40" height="40" rx="8" fill="#fff"/><path d="M124 330 v28 M110 344 h28" stroke="#2bb673" stroke-width="8"/><text x="135" y="394" text-anchor="middle" ${FONT} font-size="20" font-weight="700" fill="#fff">PHARMACY</text>` +
      bubble(40, 96, 230, 62, 'How many…?', 'right', 26) + kid(285, 410, { ...CHARLIE, act: 'point', flip: true }) +
      // el estante del taller: 6 cajas de curitas, 1 jarabe, 5 cremas y 0 pastillas
      `<rect x="330" y="40" width="460" height="370" rx="8" fill="#e8dcc8"/><rect x="330" y="230" width="460" height="14" fill="#b89a6a"/><rect x="330" y="400" width="460" height="14" fill="#b89a6a"/>` +
      [0, 1].map((r) => [0, 1, 2].map((c) => bandageBox(350 + c * 76, 140 + r * 46)).join('')).join('') + syrup(640, 230, 1) +
      [0, 1, 2, 3, 4].map((i) => cream(372 + i * 62, 400, 1)).join('') +
      `<rect x="696" y="300" width="80" height="98" rx="8" fill="none" stroke="#b89a6a" stroke-width="3" stroke-dasharray="8 6"/><rect x="706" y="380" width="60" height="18" rx="4" fill="#fff"/><text x="736" y="394" text-anchor="middle" ${FONT} font-size="13" font-weight="700" fill="#23313a">Pills</text>`,

    card: () => room('#fff0e6', '#d9b48a') +
      win(60, 50, 140, 100, cloud(90, 90, 0.7)) +
      // amigo enfermo en la cama
      bedFrame(30, 320, 260, '#ff8fc8') + `<circle cx="96" cy="300" r="22" fill="#c98e62"/>${HAIR.curly('#2b1b12').replace(/cy="(-?\d+)"/g, (m, v) => `cy="${+v + 406}"`).replace(/cx="(-?\d+)"/g, (m, v) => `cx="${+v + 96}"`)}` +
      `<path d="M86 300 q4 3 8 0 M100 300 q4 3 8 0" stroke="#1d2150" stroke-width="2.5" fill="none"/><path d="M90 312 q6 -5 12 0" stroke="#7a2e2e" stroke-width="2.5" fill="none"/><circle cx="96" cy="300" r="22" fill="#ff4d4d" opacity=".2"/><path d="M98 312 L120 322" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="121" cy="322" r="4" fill="#ff4d4d"/>` +
      `<rect x="60" y="316" width="70" height="20" rx="8" fill="#fff"/><g class="pulse"><path d="M60 262 q-5 8 0 10 q5 -2 0 -10z" fill="#7fd3ff"/></g>` +
      // mesita con medicina
      `<rect x="296" y="340" width="70" height="70" rx="6" fill="#c98a4b"/>` + pillBottle(316, 340) + `<rect x="338" y="314" width="16" height="26" rx="3" fill="#bfe8ff" stroke="#7fb8d8" stroke-width="2"/>` +
      // la tarjeta
      `<g transform="rotate(2 600 230)"><rect x="420" y="30" width="360" height="390" rx="18" fill="#fff" stroke="#ff8fc8" stroke-width="6"/>
        <text x="600" y="80" text-anchor="middle" ${FONT} font-size="32" font-weight="700" fill="#ff6f59">Get well soon!</text>
        <text x="460" y="128" ${FONT} font-size="24" font-weight="700" fill="#2bb673">You should…</text>
        <g transform="translate(450 140) scale(.8)">${ICONS.bed}</g><g transform="translate(540 140) scale(.8)">${ICONS.water}</g><g transform="translate(630 140) scale(.8)">${ICONS.doctor}</g>
        <path d="M440 236 h320" stroke="#f3d4e3" stroke-width="3"/>
        <text x="460" y="276" ${FONT} font-size="24" font-weight="700" fill="#ff5a5f">You shouldn’t…</text>
        <g transform="translate(450 288) scale(.8)">${ICONS.school}</g><g transform="translate(540 288) scale(.8)">${ICONS.rain}</g><g transform="translate(630 288) scale(.8)">${ICONS.candy}</g></g>`,
  };
  const scene = (id) => S(SCENES[id]());

  // ---------- Historias (al tocar una chispa) ----------
  const board = (c = '#fff8e6') => `<rect width="400" height="240" fill="${c}"/>`;
  const sick = (act, look, word) => board('#e3f4fb') + kid(120, 236, { ...look, act, s: 1.35 }) + pop(0.6, label(285, 128, word, '#fff', 34));
  const pop = (d, inner) => `<g class="pop" style="animation-delay:${d}s">${inner}</g>`;
  const STORIES = {
    'yesterday/did': () => board('#e8f6ef') + kid(110, 232, { ...CHARLIE, act: 'talk', s: 0.8 }) + kid(300, 232, { ...LIN, act: 'idle', flip: true, s: 0.8 }) +
      pop(0.2, bubble(20, 10, 250, 50, 'Did you clean your bedroom?', 'left', 17)) + pop(1.6, bubble(220, 64, 160, 46, 'Yes, I did.', 'right', 20)),
    'yesterday/yes': () => board('#e8f6ef') + kid(300, 232, { ...LIN, act: 'wave', flip: true, s: 0.95 }) + `<g transform="translate(40 120) scale(1.1)">${ICONS.bed}</g>` +
      pop(0.4, ok(150, 140, 30)) + pop(1, bubble(170, 20, 200, 60, 'Yes, I did.', 'right', 26)),
    'yesterday/no': () => board('#e8f6ef') + kid(300, 232, { ...LIN, act: 'idle', mood: 'sad', flip: true, s: 0.95 }) + `<g transform="translate(40 120) scale(1.1)">${ICONS.broom}</g>` +
      pop(0.4, no(150, 140, 30)) + pop(1, bubble(160, 20, 220, 60, 'No, I didn’t.', 'right', 26)),
    'yesterday/didnt': () => board('#e7e3ff') + bedFrame(30, 150, 200, '#7bb6ff', false, 232) + kid(130, 232, { ...LIN, act: 'cough', s: 0.9 }) +
      `<g transform="translate(250 60)"><rect x="10" y="40" width="110" height="70" fill="#ff9f43"/><path d="M0 44 l65 -40 l65 40z" fill="#ff6f59"/><rect x="54" y="74" width="22" height="36" fill="#8a5a33"/><text x="65" y="64" text-anchor="middle" ${FONT} font-size="15" font-weight="700" fill="#fff">SCHOOL</text></g>` + pop(0.8, no(360, 70, 26)) +
      pop(1.4, label(200, 34, 'I didn’t go to school.', '#fff', 26)),
    'doctor/earache': () => sick('ear', KIDS[1], 'Earache'),
    'doctor/fever': () => sick('fever', LIN, 'Fever'),
    'doctor/throat': () => sick('throat', KIDS[3], 'Sore throat'),
    'doctor/tooth': () => sick('tooth', CHARLIE, 'Toothache'),
    'doctor/stomach': () => sick('stomach', KIDS[0], 'Stomachache'),
    'doctor/dizzy': () => board('#e3f4fb') + `<g class="spinme" style="--t:3s">${[0, 90, 180, 270].map((a) => `<g transform="rotate(${a} 200 120)"><rect x="180" y="-10" width="40" height="30" rx="4" fill="#fff" stroke="#4f9dff" stroke-width="3"/></g>`).join('')}<circle cx="200" cy="120" r="150" fill="none" stroke="#bcd6f0" stroke-width="6" stroke-dasharray="14 14"/></g>` +
      kid(200, 236, { ...KIDS[2], act: 'dizzy', s: 1.1 }) + label(200, 34, 'The room is spinning!', '#fff', 24),
    'advice/rule': () => board() + pop(0.2, ok(90, 80, 40)) + pop(0.2, label(250, 92, 'should = good idea', '#2bb673', 26)) +
      pop(1.4, no(90, 180, 40)) + pop(1.4, label(250, 192, 'shouldn’t = bad idea', '#ff5a5f', 26)),
    'pharmacy/rule': () => board('#eaf7f1') + pop(0.2, label(200, 36, 'How many … are there?', '#fff', 26)) +
      [0, 1, 2].map((i) => pop(0.7 + i * 0.3, bandageBox(80 + i * 86, 52, 72, 46))).join('') +
      pop(2, label(200, 134, 'How much … is there?', '#fff', 26)) + pop(2.5, syrup(175, 236, 0.9)),
    'pharmacy/many': () => board('#eaf7f1') + [0, 1, 2].map((i) => pop(0.3 + i * 0.5, bandageBox(30 + i * 120, 70, 100, 62) + label(80 + i * 120, 60, String(i + 1), '#ffc93c', 30))).join('') +
      pop(2, label(200, 200, 'How many bandages are there?', '#fff', 24)),
    'pharmacy/much': () => board('#eaf7f1') + pop(0.2, syrup(100, 176, 1.5)) +
      pop(0.9, `<path d="M292 132 L380 120" stroke="#9aa6b8" stroke-width="7" stroke-linecap="round"/><ellipse cx="260" cy="134" rx="36" ry="18" fill="#dfe6ee" stroke="#9aa6b8" stroke-width="3"/><ellipse cx="260" cy="130" rx="26" ry="9" fill="#b5532a"/>`) +
      pop(1.4, label(200, 214, 'How much cough syrup is there?', '#fff', 24)),
    'pharmacy/alot': () => board('#eaf7f1') + [0, 1, 2, 3, 4, 5].map((i) => pop(i * 0.35, bandageBox(30 + (i % 3) * 120, 40 + Math.floor(i / 3) * 76, 100, 62) + label(80 + (i % 3) * 120, 36 + Math.floor(i / 3) * 76, String(i + 1), '#ffc93c', 22))).join('') +
      pop(2.4, label(200, 226, 'A lot of bandages!', '#fff', 30)),
    'pharmacy/some': () => board('#eaf7f1') + pop(0.2, syrup(170, 200, 1.6)) + pop(1, label(200, 226, 'Some cough syrup', '#fff', 30)),
    'pharmacy/none': () => board('#eaf7f1') + `<rect x="120" y="40" width="160" height="140" rx="10" fill="none" stroke="#b89a6a" stroke-width="4" stroke-dasharray="10 8"/>` +
      pop(0.4, `<g opacity=".35">${pillBottle(200, 150)}</g>`) + pop(1, no(280, 50, 28)) + pop(1.4, label(200, 226, 'Pills: none!', '#fff', 30)),
    'card/medicine': () => board() + pop(0.2, `<g transform="translate(30 30) scale(1.3)">${ICONS.syrup}</g>`) + pop(0.6, `<g transform="translate(150 30) scale(1.3)">${ICONS.pills}</g>`) +
      pop(1, `<g transform="translate(270 30) scale(1.3)">${ICONS.doctor}</g>`) + pop(1.4, label(200, 200, 'You should…', '#2bb673', 30)),
    'card/should': () => board() + kid(70, 232, { ...KIDS[1], act: 'drink', s: 0.9 }) + `<g transform="translate(150 40) scale(1.2)">${ICONS.bed}</g><g transform="translate(270 40) scale(1.2)">${ICONS.water}</g>` +
      pop(0.4, ok(240, 160, 26)) + pop(0.8, label(260, 226, 'You should…', '#2bb673', 28)),
    'card/shouldnt': () => board() + `<g transform="translate(60 40) scale(1.2)">${ICONS.school}</g><g transform="translate(240 40) scale(1.2)">${ICONS.rain}</g>` +
      pop(0.4, no(200, 90, 28)) + pop(0.8, label(200, 200, 'You shouldn’t…', '#ff5a5f', 28)),
  };
  // Las viñetas de Advice se ven completas, una por historia.
  const CROP = { 'advice/cut': '6 -7 388 233', 'advice/tired': '406 -7 388 233', 'advice/cold': '6 221 388 233', 'advice/thirsty': '406 221 388 233' };
  function story(stopId, spark) {
    const key = `${stopId}/${spark.id}`, own = STORIES[key];
    if (own) return { svg: S(own(), '0 0 400 240', 'story'), ms: 4200 };
    if (CROP[key]) return { svg: S(SCENES[stopId](), CROP[key], 'story'), ms: 2600 };
    if (spark.full) return { svg: S(SCENES[stopId](), '0 0 800 450', 'story'), ms: 2600 };
    // La historia se ve a 400/240 (x 25–775 de la escena): el zoom no se sale de ella.
    const [x, y, r = 60] = spark.z || [spark.x, spark.y];
    const s = Math.min(2.2, 150 / r), lim = (v, a, b) => Math.min(b, Math.max(a, v)).toFixed(1);
    const z = `translate(${lim(400 - x * s, 775 - 800 * s, 25)}px, ${lim(225 - y * s, 450 - 450 * s, 0)}px) scale(${s.toFixed(3)})`;
    return { svg: S(`<g class="zoom" style="--z:${z}">${SCENES[stopId]()}</g>`, '0 0 800 450', 'story'), ms: 2600 };
  }

  // ---------- Mascotas (viewBox -110 -120 220 230) ----------
  const eyes = (dx, y, r = 9, c = '#1d2150') => `<g class="blink"><circle cx="${-dx}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${dx}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${-dx + r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.35}" fill="#fff"/><circle cx="${dx + r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.35}" fill="#fff"/></g>`;
  const cheeks = (dx, y) => `<ellipse cx="${-dx}" cy="${y}" rx="11" ry="7" fill="#ff8fa0" opacity=".6"/><ellipse cx="${dx}" cy="${y}" rx="11" ry="7" fill="#ff8fa0" opacity=".6"/>`;
  const smile = (y, w = 12) => `<path d="M${-w} ${y} q${w} ${w * 0.9} ${2 * w} 0" stroke="#3b2414" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  const PETS = {
    biscuit: `<ellipse cx="0" cy="84" rx="50" ry="20" fill="#e8b27a"/><ellipse cx="-66" cy="-6" rx="22" ry="44" fill="#a8693b" transform="rotate(18 -66 -6)"/><ellipse cx="66" cy="-6" rx="22" ry="44" fill="#a8693b" transform="rotate(-18 66 -6)"/>
      <circle r="66" fill="#e8b27a"/><ellipse cx="22" cy="-30" rx="20" ry="16" fill="#f6d6b0"/><ellipse cy="26" rx="36" ry="26" fill="#f6d6b0"/>${eyes(24, -14, 9)}<ellipse cy="12" rx="12" ry="9" fill="#3b2414"/>${smile(30, 12)}${cheeks(40, 18)}
      <path d="M-36 58 q36 18 72 0" stroke="#ff5a5f" stroke-width="10" fill="none" stroke-linecap="round"/><circle cy="72" r="9" fill="#ffc93c"/>`,
    mimi: `<path d="M-56 -30 L-62 -96 L-14 -60z M56 -30 L62 -96 L14 -60z" fill="#9aa1b8"/><path d="M-50 -44 L-54 -82 L-24 -60z M50 -44 L54 -82 L24 -60z" fill="#ffb3c4"/><circle r="64" fill="#b6bccf"/>
      ${eyes(24, -6, 10, '#2f8f5b')}<path d="M-7 14 h14 l-7 8z" fill="#ff8fa0"/><path d="M0 22 q-8 10 -16 4 M0 22 q8 10 16 4" stroke="#3b2414" stroke-width="3.5" fill="none"/>
      <path d="M-30 18 h-40 M-30 26 l-36 10 M30 18 h40 M30 26 l36 10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>${cheeks(38, 34)}`,
    hoppy: `<ellipse cx="-26" cy="-66" rx="17" ry="46" fill="#f4f4f8" stroke="#dcdce8" stroke-width="3"/><ellipse cx="26" cy="-66" rx="17" ry="46" fill="#f4f4f8" stroke="#dcdce8" stroke-width="3"/><ellipse cx="-26" cy="-66" rx="8" ry="32" fill="#ffb3c4"/><ellipse cx="26" cy="-66" rx="8" ry="32" fill="#ffb3c4"/>
      <circle cy="14" r="62" fill="#f4f4f8" stroke="#dcdce8" stroke-width="3"/>${eyes(24, 0, 9)}<ellipse cy="24" rx="8" ry="6" fill="#ff8fa0"/><rect x="-9" y="34" width="8" height="12" rx="2" fill="#fff" stroke="#c9d3df"/><rect x="1" y="34" width="8" height="12" rx="2" fill="#fff" stroke="#c9d3df"/>${cheeks(38, 30)}`,
    bubbles: `<g class="swim"><path d="M-60 0 L-100 -40 Q-90 0 -100 40z" fill="#ff8f2a"/><ellipse rx="70" ry="54" fill="#ffa53c"/><path d="M-10 -50 q20 -30 40 -2z" fill="#ff8f2a"/><path d="M0 40 q10 26 26 6z" fill="#ff8f2a"/>
      <circle cx="30" cy="-12" r="16" fill="#fff"/><circle cx="34" cy="-12" r="9" fill="#1d2150"/><circle cx="37" cy="-15" r="3" fill="#fff"/><path d="M44 14 q10 6 18 -2" stroke="#3b2414" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="18" cy="12" rx="9" ry="6" fill="#ff8fa0" opacity=".6"/></g>
      <g class="drift" style="--d:3s"><circle cx="76" cy="-50" r="8" fill="none" stroke="#7fd3ff" stroke-width="3"/><circle cx="90" cy="-78" r="5" fill="none" stroke="#7fd3ff" stroke-width="3"/></g>`,
    kiwi: `<path d="M-12 -62 q-10 -40 4 -50 q2 26 8 46z M4 -64 q4 -44 22 -46 q-8 26 -12 48z" fill="#ff5a5f"/><ellipse cy="10" rx="58" ry="70" fill="#3fbf5f"/><ellipse cy="34" rx="34" ry="40" fill="#ffe27a"/>
      <ellipse cx="-56" cy="20" rx="18" ry="40" fill="#2fa34d" transform="rotate(14 -56 20)"/><ellipse cx="56" cy="20" rx="18" ry="40" fill="#2fa34d" transform="rotate(-14 56 20)"/>
      <circle cx="-22" cy="-24" r="14" fill="#fff"/><circle cx="22" cy="-24" r="14" fill="#fff"/>${eyes(22, -24, 7)}<path d="M-12 -6 q12 -10 24 0 q-2 22 -12 26 q-10 -4 -12 -26z" fill="#ff9f43"/>`,
    shelly: `<circle cx="0" cy="-58" r="34" fill="#7fd27c"/>${eyes(14, -62, 7)}${smile(-44, 10)}<ellipse cx="0" cy="-48" rx="20" ry="4" fill="none"/>
      <ellipse cx="-62" cy="64" rx="18" ry="12" fill="#7fd27c"/><ellipse cx="62" cy="64" rx="18" ry="12" fill="#7fd27c"/><path d="M-80 50 Q-80 -24 0 -24 Q80 -24 80 50z" fill="#4f9a5a"/>
      ${[[-40, 20], [0, 6], [40, 20], [-20, 40], [20, 40]].map(([x, y]) => `<path d="M${x - 16} ${y} l8 -14 h16 l8 14 l-8 14 h-16z" fill="#6bbf6c"/>`).join('')}<path d="M-84 50 H84" stroke="#3b7a45" stroke-width="8" stroke-linecap="round"/>${cheeks(22, -48).replace(/rx="11" ry="7"/g, 'rx="7" ry="4"')}`,
    nibbles: `<circle cx="-46" cy="-50" r="18" fill="#e89a5a"/><circle cx="46" cy="-50" r="18" fill="#e89a5a"/><circle cx="-46" cy="-50" r="9" fill="#ffb3c4"/><circle cx="46" cy="-50" r="9" fill="#ffb3c4"/>
      <ellipse cy="14" rx="74" ry="70" fill="#f0a865"/><ellipse cy="40" rx="50" ry="40" fill="#fff4e0"/><ellipse cx="-44" cy="20" rx="22" ry="18" fill="#fff4e0"/><ellipse cx="44" cy="20" rx="22" ry="18" fill="#fff4e0"/>
      ${eyes(24, -10, 8)}<ellipse cy="8" rx="7" ry="5" fill="#ff8fa0"/>${smile(16, 8)}<ellipse cx="0" cy="58" rx="14" ry="10" fill="#c98a4b"/><circle cx="-12" cy="54" r="7" fill="#f0a865"/><circle cx="12" cy="54" r="7" fill="#f0a865"/>`,
    daisy: `<path d="M-30 -70 L-40 -104 L-12 -82z M30 -70 L40 -104 L12 -82z" fill="#d9a066"/><ellipse cy="0" rx="54" ry="74" fill="#e8b27a"/><ellipse cy="46" rx="42" ry="30" fill="#f6d6b0"/>
      <path d="M-20 -78 Q-60 -60 -50 0 Q-30 -40 -10 -50 Q0 -70 20 -78 Q40 -60 40 -40 Q20 -60 -20 -78z" fill="#ff8fc8"/>${eyes(24, -8, 9)}<ellipse cx="-14" cy="48" rx="5" ry="4" fill="#8a5a33"/><ellipse cx="14" cy="48" rx="5" ry="4" fill="#8a5a33"/>${smile(60, 10)}${cheeks(40, 18)}`,
    bamboo: `<circle cx="-50" cy="-52" r="22" fill="#2b2b33"/><circle cx="50" cy="-52" r="22" fill="#2b2b33"/><circle r="66" fill="#fbfbff" stroke="#dcdce8" stroke-width="3"/><ellipse cx="-26" cy="-6" rx="16" ry="20" fill="#2b2b33" transform="rotate(-20 -26 -6)"/><ellipse cx="26" cy="-6" rx="16" ry="20" fill="#2b2b33" transform="rotate(20 26 -6)"/>
      <circle cx="-24" cy="-6" r="7" fill="#fff"/><circle cx="24" cy="-6" r="7" fill="#fff"/><g class="blink"><circle cx="-23" cy="-5" r="4" fill="#1d2150"/><circle cx="23" cy="-5" r="4" fill="#1d2150"/></g><ellipse cy="18" rx="10" ry="7" fill="#2b2b33"/>${smile(30, 9)}${cheeks(40, 24)}
      <path d="M70 80 L90 -20" stroke="#5ab552" stroke-width="8" stroke-linecap="round"/><path d="M84 6 q20 -10 22 -26 q-18 6 -22 26z" fill="#6cc95c"/>`,
    sparkle: `<path d="M-6 -66 L0 -118 L6 -66z" fill="#ffc93c"/><path d="M-4 -80 l8 -4 M-3 -94 l6 -3 M-2 -106 l4 -2" stroke="#e0a21a" stroke-width="2"/><path d="M-26 -60 L-30 -92 L-6 -70z" fill="#fff"/>
      <ellipse cy="0" rx="56" ry="72" fill="#fff" stroke="#e3d7f5" stroke-width="4"/><path d="M-18 -70 Q-70 -50 -60 30 Q-40 -20 -20 -40 Q-50 10 -40 50 Q-14 -10 -4 -60z" fill="#b48cff"/><path d="M-20 -72 Q-40 -60 -48 -30" stroke="#ff8fc8" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-14 -72 Q-26 -50 -30 -20" stroke="#7fd3ff" stroke-width="8" fill="none" stroke-linecap="round"/>
      <ellipse cy="44" rx="40" ry="28" fill="#ffe6f3"/>${eyes(22, -6, 9, '#6a4fb3')}<ellipse cx="-12" cy="46" rx="4" ry="3" fill="#b48cff"/><ellipse cx="12" cy="46" rx="4" ry="3" fill="#b48cff"/>${smile(58, 9)}${cheeks(38, 18)}
      <g class="tw"><path d="M64 -60 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4z" fill="#ffc93c"/></g>`,
  };
  const friend = (id, cls = '') => `<svg class="friend ${cls}" viewBox="-110 -120 220 230" aria-hidden="true"><g class="bob">${PETS[id]}</g></svg>`;

  // ---------- Juana, la perrita de Sofía (dibujada de su foto) ----------
  // Pelo crema crespo, hocico y cejas blancas, una oreja caída y la otra volteada hacia arriba (rosada por dentro),
  // y se sienta como persona, con las patas de atrás hacia adelante.
  const JF = '#ecd0a8', JL = '#c9a06e', JW = '#fbf6ee';
  const juanaHead = (glasses = '') => `
    <path d="M-40 -64 C-72 -66 -86 -30 -78 8 C-74 24 -58 28 -52 16 C-48 -8 -44 -36 -34 -52z" fill="#e3bd90" stroke="${JL}" stroke-width="3"/>
    <path d="M-36 -74 L-30 -90 L-23 -79 L-15 -96 L-9 -83 L-1 -100 L5 -85 L13 -97 L17 -83 L27 -93 L28 -79 L38 -85 L36 -70z" fill="${JF}" stroke="${JL}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-46 -38 C-50 -80 -20 -90 2 -90 C26 -90 52 -78 48 -38 C46 -8 40 16 28 32 C18 44 -16 44 -28 32 C-40 16 -46 -8 -46 -38z" fill="${JF}" stroke="${JL}" stroke-width="3"/>
    <path d="M-36 -74 L-30 -86 L-23 -77 L-15 -92 L-9 -80 L-1 -96 L5 -82 L13 -93 L17 -80 L27 -89 L28 -76 L38 -81 L44 -62 L-44 -62z" fill="${JF}"/>
    <g class="jear" style="transform-origin:32px -72px"><path d="M30 -76 C50 -102 86 -104 100 -82 C92 -62 72 -54 54 -58 C44 -60 36 -66 30 -76z" fill="${JF}" stroke="${JL}" stroke-width="3"/>
      <path d="M42 -74 C58 -92 82 -94 91 -82 C83 -68 70 -64 56 -66z" fill="#f4b6ae"/></g>
    <path d="M-36 -44 q10 -14 26 -5 M8 -50 q16 -9 28 5" stroke="#fffdf8" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M-32 -50 l-3 -6 M-24 -54 l-1 -7 M-16 -53 l1 -6 M14 -56 l-1 -6 M22 -57 l1 -7 M30 -53 l3 -6" stroke="#fffdf8" stroke-width="3" stroke-linecap="round"/>
    <g class="blink"><circle cx="-20" cy="-28" r="10.5" fill="#2a1810"/><circle cx="18" cy="-30" r="10.5" fill="#2a1810"/><circle cx="-16" cy="-32" r="3.6" fill="#fff"/><circle cx="22" cy="-34" r="3.6" fill="#fff"/></g>
    <path d="M-26 0 C-28 -14 -10 -18 0 -18 C14 -18 30 -12 28 2 C28 22 14 36 0 36 C-14 36 -28 22 -26 0z" fill="${JW}"/>
    <path d="M-16 30 l-3 7 M-7 34 l-1 7 M4 34 l1 7 M13 30 l3 7" stroke="#e6dac8" stroke-width="3" stroke-linecap="round"/>
    <path d="M-12 -9 C-12 -18 14 -18 14 -9 C14 -1 6 5 1 5 C-4 5 -12 -1 -12 -9z" fill="#1d1414"/><ellipse cx="-3" cy="-12" rx="4" ry="2.5" fill="#6b5a5a"/>
    <path d="M1 5 v9" stroke="#3b2414" stroke-width="3"/><path d="M-9 16 q10 9 20 0 q-10 5 -20 0z" fill="#6b2e2e" stroke="#3b2414" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="-34" cy="-6" rx="8" ry="5" fill="#ff9fa8" opacity=".5"/><ellipse cx="34" cy="-8" rx="8" ry="5" fill="#ff9fa8" opacity=".5"/>${glasses}`;
  PETS.juana = `<path d="M-40 112 C-46 70 -36 40 0 38 C36 40 46 70 40 112z" fill="${JF}" stroke="${JL}" stroke-width="3"/>
    <path d="M-14 50 q14 10 28 0 M-18 64 q18 10 36 0" stroke="#f8e6cc" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g transform="rotate(-7 0 30)">${juanaHead()}</g>`;
  // De cuerpo entero, sentada como en la foto. Pies (cojín) en y = 0; la cabeza va en .jhead para moverla.
  const juanaBody = (glasses = '') => `
    <path class="tail" d="M30 -14 q34 -6 40 -40" stroke="${JF}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <ellipse cx="-36" cy="-16" rx="29" ry="24" fill="${JF}" stroke="${JL}" stroke-width="3"/><ellipse cx="36" cy="-16" rx="29" ry="24" fill="${JF}" stroke="${JL}" stroke-width="3"/>
    <path d="M-44 -4 L-62 36" stroke="${JL}" stroke-width="16" stroke-linecap="round"/><path d="M-44 -4 L-62 36" stroke="${JF}" stroke-width="11" stroke-linecap="round"/>
    <path d="M44 -4 L66 30" stroke="${JL}" stroke-width="16" stroke-linecap="round"/><path d="M44 -4 L66 30" stroke="${JF}" stroke-width="11" stroke-linecap="round"/>
    <ellipse cx="-64" cy="40" rx="11" ry="8" fill="${JW}" stroke="${JL}" stroke-width="2.5"/>
    <g transform="rotate(-30 70 34)"><ellipse cx="70" cy="34" rx="11" ry="9" fill="${JW}" stroke="${JL}" stroke-width="2.5"/><circle cx="70" cy="36" r="4" fill="#3b2a2a"/><circle cx="64" cy="29" r="2.3" fill="#3b2a2a"/><circle cx="70" cy="27" r="2.3" fill="#3b2a2a"/><circle cx="76" cy="29" r="2.3" fill="#3b2a2a"/></g>
    <path d="M-38 -8 C-50 -54 -32 -98 0 -102 C32 -98 50 -54 38 -8 C22 6 -22 6 -38 -8z" fill="${JF}" stroke="${JL}" stroke-width="3"/>
    <ellipse cx="0" cy="-30" rx="25" ry="27" fill="#f3d3c0"/>
    <path d="M-16 -86 q16 10 32 0 M-18 -74 q18 10 36 0" stroke="#f8e6cc" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M14 -80 L20 18" stroke="${JL}" stroke-width="15" stroke-linecap="round"/><path d="M14 -80 L20 18" stroke="${JF}" stroke-width="10" stroke-linecap="round"/><ellipse cx="21" cy="22" rx="10" ry="7" fill="${JW}" stroke="${JL}" stroke-width="2.5"/>
    <g class="jpaw" style="transform-origin:-14px -80px"><path d="M-14 -80 L-18 18" stroke="${JL}" stroke-width="15" stroke-linecap="round"/><path d="M-14 -80 L-18 18" stroke="${JF}" stroke-width="10" stroke-linecap="round"/><ellipse cx="-18" cy="22" rx="10" ry="7" fill="${JW}" stroke="${JL}" stroke-width="2.5"/></g>
    <g transform="translate(0 -124) scale(.74)"><g class="jhead" style="transform-origin:0px 40px"><g transform="rotate(-7 0 30)">${juanaHead(glasses)}</g></g></g>`;

  // Película al pasar el examen final (~18 s): Juana, en su sofá, califica el examen de Sofía y le pone A+ con la pata.
  // app.js va agregando s1…s6 a .movie; style.css muestra lo de cada escena.
  function juanaMovie(say) {
    const F = (id, x, y, w) => friend(id).replace('<svg class="friend ', `<svg x="${x}" y="${y}" width="${w}" height="${(w * 230 / 220).toFixed(1)}" class="friend `);
    const talk = (cls, x, y, w, text, tail = 'left') => `<g class="bubble ${cls}"><rect x="${x}" y="${y}" width="${w}" height="44" rx="16" fill="#fff" stroke="#23313a" stroke-width="3"/>
      <path d="M${tail === 'left' ? x + 24 : x + w - 24} ${y + 42} l${tail === 'left' ? -8 : 8} 16 l${tail === 'left' ? 18 : -18} -16" fill="#fff" stroke="#23313a" stroke-width="3" stroke-linejoin="round"/>
      <rect x="${tail === 'left' ? x + 14 : x + w - 40}" y="${y + 38}" width="26" height="5" fill="#fff"/>
      <text x="${x + w / 2}" y="${y + 29}" text-anchor="middle" class="say">${esc(text)}</text></g>`;
    const spiral = (x, y, s) => `<path d="M${x} ${y} h${s} v${s} h${-s * 0.8} v${-s * 0.6} h${s * 0.6} v${s * 0.4} h${-s * 0.4} v${-s * 0.2}" transform="translate(${-s / 2} ${-s / 2})" stroke="#23232b" stroke-width="5" fill="none"/>`;
    const glasses = `<g class="glasses"><g class="gl-in"><circle cx="-20" cy="-28" r="17" fill="#bfe8ff" fill-opacity=".25" stroke="#7a3fd1" stroke-width="5"/><circle cx="18" cy="-30" r="17" fill="#bfe8ff" fill-opacity=".25" stroke="#7a3fd1" stroke-width="5"/><path d="M-3 -30 q2 -5 4 -1" stroke="#7a3fd1" stroke-width="5" fill="none"/></g></g>`;
    const confetti = Array.from({ length: 46 }, (_, i) => {
      const c = ['#ffc93c', '#4f9dff', '#ff8fc8', '#2bb673', '#ff7a59', '#b48cff'][i % 6];
      return `<rect class="cf" x="${(i * 83) % 400}" y="-20" width="${8 + (i % 3) * 3}" height="${12 + (i % 2) * 6}" rx="2" fill="${c}" style="--dl:${(i % 12) * 0.18}s;--dx:${((i % 7) - 3) * 18}px;--dr:${(i % 5) * 160 + 200}deg"/>`;
    }).join('');
    const pets = ['biscuit', 'mimi', 'hoppy', 'bubbles', 'kiwi', 'shelly', 'nibbles', 'daisy', 'bamboo', 'sparkle'];
    const party = pets.map((id, i) => {
      const row = i < 5 ? 0 : 1, col = i % 5;
      return `<g class="pal" style="--i:${i};--from:${col < 2.5 ? -1 : 1}"><g class="hop" style="--hd:${(i % 4) * 0.15}s">${F(id, 8 + col * 78 + row * 18, row ? 574 : 516, 60)}</g></g>`;
    }).join('');
    const ticks = ['Chores', 'Health problems', 'Did you…?', 'Should / shouldn’t', 'How many / much'];
    return `<svg class="movie" viewBox="0 0 400 640" role="img" aria-label="Juana grades Sofía’s exam and gives her an A plus">
      <rect width="400" height="640" fill="#e5ecff"/><rect y="560" width="400" height="80" fill="#c9a27a"/><rect y="552" width="400" height="8" fill="#fff" opacity=".7"/>
      ${win(36, 40, 110, 84, sun(66, 72, 13) + cloud(96, 96, 0.6))}
      <rect x="262" y="48" width="96" height="72" rx="4" fill="#fff"/><rect x="270" y="56" width="80" height="56" fill="#ffe0ec"/><path d="M296 92 c-10 -8 -12 -16 -4 -20 c4 -2 8 0 8 4 c0 -4 4 -6 8 -4 c8 4 6 12 -4 20 l-4 3z" fill="#ff5a7a"/>
      <g class="champion"><text x="200" y="104" text-anchor="middle">SUPER HELPER!</text></g>
      <g class="sofa"><rect x="34" y="250" width="332" height="200" rx="40" fill="#2b2b33"/><path d="M60 300 H340 M60 360 H340" stroke="#3a3a46" stroke-width="4"/>
        <g transform="rotate(-8 140 360)"><rect x="70" y="290" width="150" height="140" rx="16" fill="#f6efe2" stroke="#e2d6c2" stroke-width="3"/>
          ${spiral(110, 330, 36)}${spiral(178, 330, 36)}${spiral(110, 392, 36)}${spiral(178, 392, 36)}</g>
        <rect x="20" y="420" width="360" height="90" rx="28" fill="#34343f"/><path d="M200 426 V504" stroke="#2a2a33" stroke-width="4"/><path d="M44 434 H356" stroke="#4a4a58" stroke-width="3" opacity=".7"/>
        <rect x="10" y="340" width="56" height="170" rx="24" fill="#26262e"/><rect x="334" y="340" width="56" height="170" rx="24" fill="#26262e"/>
        <rect x="24" y="508" width="352" height="34" rx="12" fill="#23232b"/><path d="M60 542 l-8 16 M340 542 l8 16" stroke="#b9c2cc" stroke-width="7" stroke-linecap="round"/></g>
      <g class="jumpwrap"><g transform="translate(256 440) scale(1.2)">${juanaBody(glasses)}</g></g>
      <g class="exam"><g class="paper-in"><g transform="rotate(-6 100 480)"><rect x="18" y="392" width="156" height="186" rx="10" fill="#fff" stroke="#c8d2e0" stroke-width="3"/>
        <text x="102" y="420" text-anchor="middle" class="gtitle">English Exam</text><text x="102" y="440" text-anchor="middle" class="name">Sofía</text>
        ${ticks.map((t, i) => `<text x="34" y="${466 + i * 22}" class="line">${esc(t)}</text><text x="170" y="${467 + i * 22}" text-anchor="end" class="tick" style="--td:${0.2 + i * 0.5}s">✓</text>`).join('')}
        <g class="stamp"><circle cx="138" cy="536" r="30" fill="#fff" fill-opacity=".85" stroke="#e5383b" stroke-width="5"/>
          <g fill="#e5383b"><ellipse cx="120" cy="540" rx="6" ry="7"/><ellipse cx="124" cy="526" rx="3.5" ry="4.5"/><ellipse cx="114" cy="526" rx="3.5" ry="4.5"/><ellipse cx="108" cy="534" rx="3" ry="4"/></g>
          <text x="146" y="548" text-anchor="middle" class="aplus">A+</text></g></g></g></g>
      <g class="hearts">${[[150, 250, 0], [300, 220, 0.5], [210, 190, 1]].map(([x, y, d]) => `<path class="hf" style="--hd:${d}s" d="M${x} ${y} c-10 -8 -12 -16 -4 -20 c4 -2 8 0 8 4 c0 -4 4 -6 8 -4 c8 4 6 12 -4 20 l-4 3z" fill="#ff5a7a"/>`).join('')}</g>
      ${talk('b1', 150, 150, 230, say.juanaReady, 'right')}
      ${talk('b2', 160, 160, 200, say.hmm, 'right')}
      ${talk('b3', 180, 150, 190, say.amazing, 'right')}
      ${talk('b4', 30, 140, 340, say.didIt, 'right')}
      <g class="partywrap">${party}</g>
      <g class="confetti">${confetti}</g>
    </svg>`;
  }

  // ---------- Íconos (viewBox 0 0 80 80) ----------
  const head = (act, look = KIDS[1]) => `<g transform="translate(40 108) scale(.7)">${kid(0, 0, { ...look, act })}</g>`;
  const ICONS = {
    dishes: `<rect x="10" y="44" width="60" height="26" rx="6" fill="#9fd8c8"/>${[0, 1, 2].map((i) => `<ellipse cx="40" cy="${40 - i * 7}" rx="24" ry="7" fill="#fff" stroke="#b9c4d4" stroke-width="2"/>`).join('')}<circle cx="64" cy="18" r="6" fill="#fff" stroke="#9fd8f5" stroke-width="2"/><circle cx="16" cy="16" r="4" fill="#fff" stroke="#9fd8f5" stroke-width="2"/><rect x="30" y="8" width="18" height="10" rx="3" fill="#ffd84a"/>`,
    table: `<rect x="8" y="42" width="64" height="8" rx="3" fill="#c98a4b"/><rect x="14" y="50" width="6" height="24" fill="#a06a35"/><rect x="60" y="50" width="6" height="24" fill="#a06a35"/>${plate(28, 40, 0.7)}${plate(54, 40, 0.7)}<path d="M41 40 v-14" stroke="#9aa6b8" stroke-width="3" stroke-linecap="round"/>${cup(66, 38).replace(/ff6f59/g, '4f9dff')}`,
    trash: `<path d="M22 28 Q16 70 40 72 Q64 70 58 28z" fill="#2b3550"/><path d="M30 28 q10 -16 20 0" stroke="#222b4a" stroke-width="4" fill="none"/><path d="M60 62 h12 M64 54 l8 -4" stroke="#9aa6b8" stroke-width="3" stroke-linecap="round"/>`,
    mop: `<path d="M50 6 L34 56" stroke="#b07a45" stroke-width="5" stroke-linecap="round"/><rect x="16" y="52" width="34" height="9" rx="3" fill="#4ea3db"/><path d="M19 61 v12 M26 61 v13 M33 61 v12 M40 61 v13 M47 61 v12" stroke="#4ea3db" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="40" cy="76" rx="30" ry="3" fill="#bfe8ff"/>`,
    broom: `<path d="M54 6 L36 54" stroke="#b07a45" stroke-width="5" stroke-linecap="round"/><path d="M24 50 L50 58 L46 74 L14 66z" fill="#e8c15a" stroke="#c99a2e" stroke-width="2"/><circle cx="62" cy="70" r="3" fill="#a08a6c"/><circle cx="68" cy="66" r="2.5" fill="#a08a6c"/>`,
    vacuum: `<path d="M20 8 L36 58" stroke="#8a8fa3" stroke-width="5" stroke-linecap="round"/><rect x="22" y="56" width="30" height="10" rx="4" fill="#555b70"/><path d="M22 10 Q60 0 60 40" stroke="#555b70" stroke-width="4" fill="none"/><rect x="46" y="36" width="28" height="26" rx="10" fill="#ff6f59"/><circle cx="52" cy="66" r="5" fill="#333"/><circle cx="68" cy="66" r="5" fill="#333"/>`,
    duster: `<path d="M24 74 L44 30" stroke="#8a5a33" stroke-width="5" stroke-linecap="round"/><circle cx="48" cy="20" r="13" fill="#ff8fc8"/><circle cx="38" cy="14" r="9" fill="#ffc4e1"/><circle cx="58" cy="12" r="9" fill="#ffc4e1"/><circle cx="48" cy="6" r="7" fill="#ff8fc8"/>`,
    plant: `<g transform="translate(26 76) scale(.55)">${plant(0, 0, 1).replace(/<g class="sway">/, '<g>')}</g><rect x="40" y="24" width="26" height="20" rx="5" fill="#4cb3ff"/><path d="M40 30 L24 22" stroke="#4cb3ff" stroke-width="5" stroke-linecap="round"/><circle cx="22" cy="32" r="2.5" fill="#4cb3ff"/><circle cx="18" cy="40" r="2.5" fill="#4cb3ff"/>`,
    bed: `<rect x="6" y="26" width="10" height="46" rx="3" fill="#a8693b"/><rect x="12" y="48" width="62" height="14" rx="5" fill="#fff" stroke="#c8d2e0"/><rect x="34" y="42" width="40" height="18" rx="5" fill="#7bb6ff"/><rect x="16" y="38" width="18" height="12" rx="5" fill="#fff" stroke="#c8d2e0"/><rect x="10" y="62" width="66" height="7" rx="3" fill="#a8693b"/>`,
    toys: `<rect x="12" y="40" width="56" height="32" rx="5" fill="#ff8f5a"/><rect x="8" y="34" width="64" height="9" rx="4" fill="#ff6f59"/>${teddy(28, 34, 0.7)}${ball(54, 26, 9, '#4f9dff')}`,
    petfood: `<path d="M12 70 q28 -34 56 0z" fill="#ff6f59"/><ellipse cx="40" cy="56" rx="22" ry="5" fill="#8a5a33"/><rect x="30" y="10" width="22" height="30" rx="3" fill="#ff9f43" transform="rotate(30 41 25)"/><circle cx="36" cy="46" r="3" fill="#8a5a33"/><circle cx="44" cy="44" r="3" fill="#8a5a33"/>`,
    ear: head('ear'), fever: head('fever', LIN), throat: head('throat', KIDS[3]), tooth: head('tooth', CHARLIE), dizzy: head('dizzy', KIDS[2]), stomach: `<g transform="translate(40 84) scale(.55)">${kid(0, 0, { ...KIDS[0], act: 'stomach' })}</g>`,
    water: `<path d="M26 16 h28 l-4 58 h-20z" fill="#bfe8ff" stroke="#7fb8d8" stroke-width="3"/><path d="M29 36 h22 l-2 36 h-18z" fill="#7fd3ff"/>`,
    candy: `<circle cx="40" cy="40" r="16" fill="#ff8fc8"/><path d="M28 30 q12 10 24 20" stroke="#fff" stroke-width="4"/><path d="M24 40 l-14 -10 v20z M56 40 l14 -10 v20z" fill="#ff8fc8"/>`,
    doctor: `<rect x="12" y="24" width="56" height="44" rx="8" fill="#ff5a5f"/><rect x="30" y="16" width="20" height="10" rx="3" fill="none" stroke="#c43d42" stroke-width="4"/><path d="M40 34 v24 M28 46 h24" stroke="#fff" stroke-width="7"/>`,
    rain: `<g transform="translate(14 26) scale(1.1)"><circle r="12" fill="#9aa6c8"/><circle cx="16" cy="-6" r="15" fill="#9aa6c8"/><circle cx="32" cy="1" r="11" fill="#9aa6c8"/><rect x="-6" width="44" height="12" rx="6" fill="#9aa6c8"/></g>${[20, 34, 48].map((x) => `<path d="M${x} 48 l-4 10 M${x + 6} 62 l-4 10" stroke="#4f7cff" stroke-width="3" stroke-linecap="round"/>`).join('')}`,
    school: `<rect x="14" y="34" width="52" height="38" fill="#ff9f43"/><path d="M8 36 l32 -24 l32 24z" fill="#ff6f59"/><rect x="34" y="50" width="12" height="22" fill="#8a5a33"/><circle cx="40" cy="30" r="5" fill="#fff"/><rect x="20" y="42" width="10" height="9" fill="#fff"/><rect x="50" y="42" width="10" height="9" fill="#fff"/>`,
    syrup: `<g transform="translate(16 78) scale(.62)">${syrup(0, 0, 1)}</g>`,
    bandage: `<g transform="rotate(-30 40 40)"><rect x="8" y="30" width="64" height="20" rx="10" fill="#f1d39a" stroke="#c9a76b" stroke-width="2"/><rect x="30" y="30" width="20" height="20" fill="#e2c084"/><circle cx="36" cy="36" r="1.5" fill="#c9a76b"/><circle cx="44" cy="44" r="1.5" fill="#c9a76b"/></g>`,
    pills: `${pillBottle(30, 74)}<g transform="rotate(-30 58 30)"><rect x="46" y="22" width="26" height="14" rx="7" fill="#ff6f59"/><rect x="59" y="22" width="13" height="14" rx="7" fill="#fff"/></g>`,
    cream: `<g transform="rotate(20 40 40) translate(40 82) scale(.72)">${cream(0, 0, 1)}</g>`,
    juice: `<rect x="20" y="20" width="34" height="52" rx="4" fill="#ff9f43"/><path d="M20 20 l8 -10 h18 l8 10z" fill="#ffb86b"/><circle cx="37" cy="46" r="10" fill="#ffd84a"/><path d="M50 10 l8 -6" stroke="#4f9dff" stroke-width="4"/>`,
    // Paradas
    kitchen: `<rect x="16" y="34" width="48" height="34" rx="6" fill="#9aa6b8"/><rect x="10" y="30" width="60" height="8" rx="4" fill="#7d8aa0"/><path d="M30 26 q4 -10 0 -18 M42 26 q4 -10 0 -18 M54 26 q4 -10 0 -18" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    living: `<rect x="12" y="28" width="56" height="26" rx="10" fill="#6c79ad"/><rect x="6" y="40" width="68" height="22" rx="8" fill="#7b87b8"/><rect x="12" y="60" width="6" height="10" fill="#3b4a9e"/><rect x="62" y="60" width="6" height="10" fill="#3b4a9e"/>`,
    bedroom: `<rect x="6" y="20" width="10" height="50" rx="3" fill="#a8693b"/><rect x="12" y="44" width="62" height="16" rx="5" fill="#fff"/><rect x="34" y="38" width="40" height="20" rx="5" fill="#ff8fc8"/><rect x="16" y="34" width="18" height="12" rx="5" fill="#fff"/><rect x="10" y="60" width="66" height="8" rx="3" fill="#a8693b"/>`,
    calendar: `<rect x="12" y="16" width="56" height="54" rx="8" fill="#fff"/><rect x="12" y="16" width="56" height="16" rx="8" fill="#ff5a5f"/><path d="M24 10 v12 M56 10 v12" stroke="#23313a" stroke-width="4" stroke-linecap="round"/><path d="M26 50 l8 8 l18 -18" stroke="#2bb673" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    advice: `${ok(28, 40, 16)}${no(54, 40, 16)}`,
    pharmacy: `<rect x="16" y="20" width="48" height="50" rx="6" fill="#fff"/><rect x="16" y="20" width="48" height="12" rx="6" fill="#2bb673"/><path d="M40 38 v24 M28 50 h24" stroke="#2bb673" stroke-width="8"/>`,
    card: `<rect x="12" y="20" width="56" height="42" rx="6" fill="#fff"/><path d="M12 22 l28 22 l28 -22" stroke="#ff8fc8" stroke-width="4" fill="none"/><path d="M40 70 c-12 -8 -16 -14 -10 -20 c4 -4 8 -2 10 2 c2 -4 6 -6 10 -2 c6 6 2 12 -10 20z" fill="#ff5a5f"/>`,
  };
  ICONS.doctorStop = `<path d="M24 14 v20 a16 16 0 0 0 32 0 v-20" stroke="#4f7cff" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M40 50 v8 a10 10 0 0 0 20 0" stroke="#4f7cff" stroke-width="5" fill="none"/><circle cx="60" cy="56" r="8" fill="#ff5a5f"/>`;
  const icon = (k) => `<svg viewBox="0 0 80 80" aria-hidden="true">${ICONS[k]}</svg>`;
  // El estante del taller (6 cajas de curitas, 1 jarabe, 5 cremas, sin pastillas), para las preguntas de la farmacia.
  const SHELF = `<rect x="0" y="0" width="460" height="300" rx="10" fill="#e8dcc8"/><rect x="0" y="130" width="460" height="12" fill="#b89a6a"/><rect x="0" y="288" width="460" height="12" fill="#b89a6a"/>` +
    [0, 1].map((r) => [0, 1, 2].map((c) => bandageBox(16 + c * 80, 40 + r * 45, 74, 44)).join('')).join('') + syrup(300, 130, 1.05) +
    [0, 1, 2, 3, 4].map((i) => cream(40 + i * 62, 288, 1)).join('') +
    `<rect x="356" y="190" width="90" height="96" rx="8" fill="none" stroke="#b89a6a" stroke-width="3" stroke-dasharray="8 6"/><rect x="366" y="266" width="70" height="18" rx="4" fill="#fff"/><text x="401" y="280" text-anchor="middle" ${FONT} font-size="13" font-weight="700" fill="#23313a">Pills</text>`;
  const pic = (k) => (k === 'shelf' ? `<svg viewBox="0 0 460 300" class="shelf" role="img" aria-label="A shelf with bandages, cough syrup and cream">${SHELF}</svg>` : icon(k));

  // Ícono de cada parada en el mapa.
  const STOPC = { kitchen: '#ffe6cf', living: '#e5ecff', bedroom: '#fde2ec', calendar: '#e8f6ef', doctor: '#e3f4fb', advice: '#fff4d6', pharmacy: '#eaf7f1', card: '#fff0e6' };
  const stopIcon = (k) => `<svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="39" fill="${STOPC[k]}"/>${ICONS[k === 'doctor' ? 'doctorStop' : k]}</svg>`;
  const marker = `<svg class="marker" viewBox="0 0 60 80" aria-hidden="true"><path d="M30 78 C30 78 6 48 6 30 a24 24 0 0 1 48 0 C54 48 30 78 30 78z" fill="#ff6f59" stroke="#fff" stroke-width="4"/><circle cx="30" cy="30" r="10" fill="#fff"/></svg>`;

  // Pantalla de inicio: el pueblo.
  const town = () => `<svg class="sky" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="tsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#e6f7ff"/></linearGradient></defs>
    <rect width="400" height="800" fill="url(#tsky)"/>${sun(330, 90, 34)}${cloud(40, 120, 1.3)}${cloud(220, 70, 1)}
    <path d="M0 620 Q100 590 200 620 T400 620 V800 H0z" fill="#8fd18a"/><path d="M-20 700 Q120 660 220 700 T420 690" stroke="#f6e7b8" stroke-width="40" fill="none"/>
    <g transform="translate(20 520)"><rect y="30" width="110" height="80" rx="6" fill="#ffe0c2"/><path d="M-10 34 L55 -16 L120 34z" fill="#ff6f59"/><rect x="14" y="50" width="28" height="24" rx="3" fill="#bfe6f5"/><rect x="66" y="66" width="24" height="44" rx="3" fill="#9a5b36"/></g>
    <g transform="translate(150 500)"><rect width="100" height="130" rx="8" fill="#fff"/><rect x="36" y="12" width="28" height="28" rx="5" fill="#ff5a5f"/><path d="M50 17 v18 M41 26 h18" stroke="#fff" stroke-width="6"/><rect x="38" y="90" width="24" height="40" rx="3" fill="#4f9dff"/></g>
    <g transform="translate(270 530)"><rect width="110" height="100" rx="8" fill="#e5f6ef"/><rect y="-14" width="110" height="24" rx="6" fill="#2bb673"/><rect x="40" y="56" width="30" height="44" rx="3" fill="#2bb673"/><path d="M20 30 h20 M70 30 h20" stroke="#b89a6a" stroke-width="5"/></g>
    <g transform="translate(380 640) scale(.6)">${plant(0, 0, 1)}</g><g transform="translate(140 650) scale(.5)">${plant(0, 0, 1, '#4f9dff')}</g></svg>`;

  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]); }

  return { scene, story, friend, icon, pic, stopIcon, marker, town, esc, juanaMovie };
})();
