// Kit v1 · dibujo: piezas para ilustrar escenas SVG (viewBox 800×500) y a Cronos, el búho guía.
// Regla clave: una animación CSS de transform reemplaza el atributo transform del mismo elemento,
// por eso todo lo animado va en un <g class="a-…"> DENTRO de un <g transform="…"> (ver at()).
window.KitSVG = (() => {
  let seed = 11, gid = 0;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const setSeed = (s) => { seed = s; };
  const uid = (p = 'k') => `${p}${++gid}`;
  const stops = (list) => list.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('');
  /** Degradado lineal (vertical por defecto). */
  const lin = (id, list, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops(list)}</linearGradient>`;
  /** Degradado radial. */
  const rad = (id, list) => `<radialGradient id="${id}">${stops(list)}</radialGradient>`;
  /** Coloca `inner` en (x,y) con escala s; si hay `cls`, lo envuelve en un <g> animable. */
  const at = (x, y, s, inner, cls = '', style = '') =>
    `<g transform="translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ''}">${cls ? `<g class="${cls}"${style ? ` style="${style}"` : ''}>${inner}</g>` : inner}</g>`;
  const delay = (d) => `animation-delay:${d}s`;

  // ---------- cielo y naturaleza ----------
  function sun(x, y, r, c = '#fff3b0', glow = '#fff3b0') {
    const id = uid('sun');
    return `${rad(id, [[0, glow, 0.75], [0.35, glow, 0.35], [1, glow, 0]])}<circle cx="${x}" cy="${y}" r="${r * 2.8}" fill="url(#${id})" class="a-glow"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
  }
  function cloud(x, y, s = 1, op = 0.95, cls = 'a-drift', d = 0, fill = '#fff') {
    return at(x, y, s, `<g fill="${fill}" opacity="${op}"><ellipse cx="0" cy="0" rx="44" ry="15"/><ellipse cx="-20" cy="-8" rx="22" ry="15"/><ellipse cx="12" cy="-15" rx="26" ry="20"/><ellipse cx="34" cy="-3" rx="18" ry="11"/></g>`, cls, delay(d));
  }
  function stars(n, yMax, xMin = 0, xMax = 800) {
    let s = '';
    for (let i = 0; i < n; i++) s += `<circle cx="${(xMin + rnd() * (xMax - xMin)).toFixed(0)}" cy="${(rnd() * yMax).toFixed(0)}" r="${(0.8 + rnd() * 1.6).toFixed(1)}" fill="#fff" class="a-twinkle" style="${delay((rnd() * 3).toFixed(2))}"/>`;
    return s;
  }
  /** Bandada que cruza la escena (y, cantidad, color, segundos, retraso, escala). */
  function birds(y, n = 3, color = '#3a2a4a', dur = 22, d = 0, s = 1) {
    let g = '';
    for (let i = 0; i < n; i++) g += at(i * 26, (i % 2) * 12, 1, `<path d="M-9,0 Q-4.5,-6 0,0 Q4.5,-6 9,0" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>`, 'a-flap', delay(i * 0.2));
    return at(0, y, s, g, 'a-fly', `animation-duration:${dur}s;${delay(d)}`);
  }
  function smoke(x, y, n = 3, r = 12, color = '#cfc6d6', dur = 4) {
    let s = '';
    for (let i = 0; i < n; i++) s += at(x, y, 1, `<circle r="${r}" fill="${color}"/>`, 'a-smoke', `animation-duration:${dur}s;${delay(-(i * dur) / n)}`);
    return s;
  }
  function palm(x, y, s = 1, d = 0, lean = 14) {
    const fr = [-170, -140, -110, -70, -35, 0].map((a, i) => `<path d="M0,0 Q36,-24 80,6 Q40,-4 0,0Z" fill="${i % 2 ? '#2f9e52' : '#3cb963'}" transform="rotate(${a})"/>`).join('');
    return at(x, y, s, `<path d="M0,0 Q${lean * 0.2},-60 ${lean},-120" stroke="#8b5e34" stroke-width="11" fill="none" stroke-linecap="round"/>
      ${[0.2, 0.4, 0.6, 0.8].map((t) => `<path d="M-6,${-120 * t} q6,4 12,0" transform="translate(${lean * t * t} 0)" stroke="#6e4826" stroke-width="2" fill="none"/>`).join('')}
      <g transform="translate(${lean} -120)">${fr}<circle r="6" fill="#7a4f28"/></g>`, 'a-sway', delay(d));
  }
  /** Árbol redondo (copa de tres círculos). */
  function tree(x, y, s = 1, c1 = '#3f9a4a', c2 = '#57b55e', d = 0) {
    return at(x, y, s, `<rect x="-6" y="-60" width="12" height="60" rx="4" fill="#7a4f28"/><g class="a-sway" style="${delay(d)}"><circle cx="0" cy="-78" r="34" fill="${c1}"/><circle cx="-22" cy="-62" r="24" fill="${c1}"/><circle cx="22" cy="-60" r="24" fill="${c1}"/><circle cx="-8" cy="-90" r="18" fill="${c2}"/></g>`);
  }
  /** Colina: franja curva desde la altura y hasta abajo. */
  const hill = (y, color, amp = 30) => `<path d="M0,${y} Q200,${y - amp} 400,${y} T800,${y - amp / 2} L800,500 L0,500Z" fill="${color}"/>`;
  /** Olas que se desplazan (para mar, ríos, lagos). */
  const waves = (y, color = '#bfe8ff', dur = 6, op = 0.55) =>
    `<g stroke="${color}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="${op}">${at(0, 0, 1, `<path d="M-80,${y}${' q20,-6 40,0 t40,0'.repeat(12)}"/>`, 'a-wave', `animation-duration:${dur}s`)}</g>`;
  function grass(y, n, color, xMin = 0, xMax = 800) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = xMin + rnd() * (xMax - xMin), yy = y + rnd() * (500 - y);
      s += `<path d="M${x.toFixed(0)},${yy.toFixed(0)} l-4,-10 m4,10 l0,-13 m0,13 l4,-10" stroke="${color}" stroke-width="2" stroke-linecap="round" fill="none"/>`;
    }
    return s;
  }
  const sparkle = (x, y, d = 0, c = '#fff6b0', s = 1) => at(x, y, s, `<path d="M0,-7 L2,-2 L7,0 L2,2 L0,7 L-2,2 L-7,0 L-2,-2Z" fill="${c}"/>`, 'a-twinkle', delay(d));
  function house(x, y, w, h, wall, roof, o = {}) {
    let s = `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/><path d="M${x - 5},${y - h + 2} L${x + w / 2},${y - h - (o.roofH || 22)} L${x + w + 5},${y - h + 2}Z" fill="${roof}"/>`;
    if (o.door !== false) s += `<path d="M${x + w / 2 - 6},${y} L${x + w / 2 - 6},${y - 15} Q${x + w / 2},${y - 21} ${x + w / 2 + 6},${y - 15} L${x + w / 2 + 6},${y}Z" fill="${o.doorC || '#6b4423'}"/>`;
    if (o.win) s += `<rect x="${x + 6}" y="${y - h + 8}" width="8" height="9" rx="1.5" fill="${o.win}"/><rect x="${x + w - 14}" y="${y - h + 8}" width="8" height="9" rx="1.5" fill="${o.win}"/>`;
    return s;
  }

  // ---------- banderas ----------
  function flagBody(type, w = 46, h = 30) {
    switch (type) {
      case 'col': return `<rect width="${w}" height="${h / 2}" fill="#fcd116"/><rect y="${h / 2}" width="${w}" height="${h / 4}" fill="#003893"/><rect y="${h * 0.75}" width="${w}" height="${h / 4}" fill="#ce1126"/>`;
      case 'usa': return `${[...Array(7)].map((_, i) => `<rect y="${(i * 2 * h) / 13}" width="${w}" height="${h / 13}" fill="#b22234"/>`).join('')}<rect y="${h / 13}" width="${w}" height="${h / 13}" fill="#fff" opacity="0"/><rect width="${w * 0.42}" height="${(h * 7) / 13}" fill="#3c3b6e"/>`;
      case 'fra': return `<rect width="${w / 3}" height="${h}" fill="#0055a4"/><rect x="${w / 3}" width="${w / 3}" height="${h}" fill="#fff"/><rect x="${(2 * w) / 3}" width="${w / 3}" height="${h}" fill="#ef4135"/>`;
      case 'spain': return `<rect width="${w}" height="${h}" fill="#aa151b"/><rect y="${h / 4}" width="${w}" height="${h / 2}" fill="#f1bf00"/>`;
      case 'pirate': return `<rect width="${w}" height="${h}" fill="#1b1b1f"/><circle cx="${w / 2}" cy="${h * 0.42}" r="${h * 0.17}" fill="#fff"/><path d="M${w * 0.3},${h * 0.62} L${w * 0.7},${h * 0.86} M${w * 0.7},${h * 0.62} L${w * 0.3},${h * 0.86}" stroke="#fff" stroke-width="${h * 0.08}" stroke-linecap="round"/>`;
      case 'red': case 'blue': case 'gold': return `<path d="M0,0 L${w},${h / 2} L0,${h}Z" fill="${{ red: '#e23b3b', blue: '#3b5bdb', gold: '#f5c518' }[type]}"/>`;
      default: return `<rect width="${w}" height="${h}" fill="${type}"/>`;
    }
  }
  const flagPole = (x, y, h, type, w = 46, fh = 30, pole = '#5f5248', d = 0) =>
    `<line x1="${x}" y1="${y}" x2="${x}" y2="${y - h}" stroke="${pole}" stroke-width="3" stroke-linecap="round"/><circle cx="${x}" cy="${y - h - 2}" r="3.2" fill="#e8b931"/>${at(x + 1.5, y - h + 1, 1, flagBody(type, w, fh), 'a-flag', delay(d))}`;

  // ---------- personaje (estilo muñequito) — pies en (x,y) ----------
  // act: acción animada. Cada una mueve el cuerpo (desde los pies), el brazo derecho (desde el hombro),
  // el izquierdo, la cabeza (desde el cuello) o las piernas (desde la cadera). Clases p-* en scene-anim.css.
  const ACTS = {
    idle: { body: 'pa-breathe' }, none: {},
    hoe: { body: 'pa-hoe-body', arm: 'pa-hoe-arm', pose: 'out', item: 'azada', dirt: true },
    fight: { body: 'pa-fight-body', arm: 'pa-fight-arm', pose: 'up' },
    raise: { body: 'pa-breathe', arm: 'pa-raise-arm' },
    wave: { body: 'pa-breathe', arm: 'pa-wave-arm', pose: 'wave' },
    cheer: { body: 'pa-jump', arm: 'pa-cheer-arm', armL: 'pa-cheer-arml', pose: 'wave', poseL: 'up' },
    talk: { body: 'pa-breathe', arm: 'pa-talk-arm', head: 'pa-talk-head' },
    read: { body: 'pa-breathe', arm: 'pa-read-arm', head: 'pa-read-head' },
    look: { body: 'pa-breathe', head: 'pa-look-head' },
    angry: { body: 'pa-breathe', arm: 'pa-angry-arm', head: 'pa-angry-head' },
    warm: { body: 'pa-breathe', arm: 'pa-warm-arm' },
    shake: { body: 'pa-bob', arm: 'pa-shake-arm' },
    row: { body: 'pa-row-body', arm: 'pa-row-arm', pose: 'out' },
    vote: { body: 'pa-breathe', arm: 'pa-vote-arm' },
    walk: { body: 'pa-walk-body', legs: true, arm: 'pa-swing-arm' },
    pull: { body: 'pa-pull-body', legs: true },
    paint: { body: 'pa-breathe', arm: 'pa-paint-arm', head: 'pa-read-head', pose: 'out', item: 'brush' },
  };
  const piv = (x, y, cls, inner, st) => (cls ? `<g transform="translate(${x} ${y})"><g class="pa ${cls}" style="${st}"><g transform="translate(${-x} ${-y})">${inner}</g></g></g>` : inner);
  function person(o) {
    const d = Object.assign({ x: 0, y: 0, s: 1, skin: '#e3a97c', top: '#4f7cff', sleeve: null, bottom: '#3a3f5c', shoe: '#3b2a20', hair: '#2b1b12', hairStyle: 'short', hat: null, dress: false, item: null, arm: 'down', armL: 'down', flip: false, armor: false, cape: null, belt: null, itemColor: '#2f5fb3', shield: null, epaulettes: false, flag: 'col', boots: false, act: 'idle', delay: null }, o);
    const A = ACTS[d.act] || ACTS.idle, st = `animation-delay:${d.delay ?? -(rnd() * 3).toFixed(2)}s`;
    const sl = d.sleeve || d.top, pose = A.pose || d.arm, poseL = A.poseL || d.armL, itm = A.item || d.item, shoe = d.boots ? '#1f1a17' : d.shoe;
    let back = '';
    if (d.cape) back += `<path d="M-14,-66 Q-28,-36 -25,-6 L25,-6 Q28,-36 14,-66Z" fill="${d.cape}"/>`;
    if (d.hairStyle === 'long') back += `<path d="M-20,-90 Q-26,-62 -15,-55 L15,-55 Q26,-62 20,-90Z" fill="${d.hair}"/>`;
    const leg = (x) => (d.dress ? `<rect x="${x < 0 ? -9 : 1.5}" y="-16" width="7.5" height="15" rx="3" fill="${d.skin}"/>`
      : `<rect x="${x < 0 ? -11 : 1.5}" y="-35" width="9.5" height="34" rx="4" fill="${d.bottom}"/>${d.boots ? `<rect x="${x < 0 ? -11.5 : 1}" y="-16" width="10.5" height="15" rx="3" fill="#1f1a17"/>` : ''}`)
      + `<ellipse cx="${x}" cy="-2" rx="7" ry="3.8" fill="${shoe}"/>`;
    const legs = A.legs ? piv(-6, -35, 'pa-leg-a', leg(-6.5), st) + piv(6, -35, 'pa-leg-b', leg(6.5), st) : leg(-6.5) + leg(6.5);
    const ARMS = { down: ['M13,-63 Q21,-51 22,-39', 22, -37.5], up: ['M13,-63 Q23,-72 25,-87', 25, -89], out: ['M13,-63 Q24,-60 31,-53', 32, -52], wave: ['M13,-63 Q27,-68 31,-83', 31, -85] };
    const ARMSL = { down: ['M-13,-63 Q-21,-51 -22,-39', -22, -37.5], up: ['M-13,-63 Q-23,-72 -25,-87', -25, -89] };
    const [ad, hx, hy] = ARMS[pose], [adL, lx, ly] = ARMSL[poseL] || ARMSL.down;
    const armR = `${personItem(itm, hx, hy, d)}<path d="${ad}" stroke="${sl}" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="${hx}" cy="${hy}" r="4.6" fill="${d.skin}"/>`;
    const armL = `<path d="${adL}" stroke="${sl}" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="${lx}" cy="${ly}" r="4.6" fill="${d.skin}"/>`;
    let torso = d.dress ? `<path d="M-14,-67 Q-18,-48 -26,-13 Q0,-7 26,-13 Q18,-48 14,-67 Q0,-72 -14,-67Z" fill="${d.top}"/>` : `<path d="M-15,-67 Q-17,-48 -15,-31 Q0,-28 15,-31 Q17,-48 15,-67 Q0,-72 -15,-67Z" fill="${d.top}"/>`;
    if (d.armor) torso += `<path d="M-12,-64 Q-13,-46 -9,-36 Q0,-33 9,-36 Q13,-46 12,-64 Q0,-68 -12,-64Z" fill="#d7dde6"/><path d="M0,-66 L0,-35" stroke="#a9b2bf" stroke-width="1.5"/><path d="M-9,-61 Q-10,-52 -7,-45" stroke="#fff" stroke-width="2.2" opacity=".7" fill="none" stroke-linecap="round"/>`;
    if (d.belt) torso += `<rect x="-15.5" y="-37" width="31" height="5" rx="2" fill="${d.belt}"/>`;
    if (d.epaulettes) torso += `<ellipse cx="-14" cy="-66" rx="6" ry="3.2" fill="#f2c230"/><ellipse cx="14" cy="-66" rx="6" ry="3.2" fill="#f2c230"/><rect x="-6" y="-69" width="12" height="5" rx="2" fill="#c62828"/>${[-58, -50, -42].map((yy) => `<circle cx="0" cy="${yy}" r="1.4" fill="#f2c230"/>`).join('')}`;
    const shield = d.shield ? `<path d="M-38,-62 L-12,-62 L-12,-44 Q-12,-29 -25,-22 Q-38,-29 -38,-44Z" fill="${d.shield}"/><path d="M-25,-60 L-25,-26 M-36,-48 L-14,-48" stroke="#f5c518" stroke-width="4"/>` : '';
    let head = '';
    if (d.hat !== 'knight') {
      head += `<circle cx="0" cy="-86" r="18" fill="${d.skin}"/>`;
      head += `<g class="a-blink" style="${delay((rnd() * 4).toFixed(2))}"><circle cx="-6.5" cy="-86" r="2.4" fill="#2a1c14"/><circle cx="6.5" cy="-86" r="2.4" fill="#2a1c14"/></g>`;
      head += `<circle cx="-11" cy="-80" r="3.2" fill="#ff6f6f" opacity=".32"/><circle cx="11" cy="-80" r="3.2" fill="#ff6f6f" opacity=".32"/><path d="M-4,-78.5 Q0,-75 4,-78.5" stroke="#5a2e1e" stroke-width="1.7" fill="none" stroke-linecap="round"/>`;
      head += hairFront(d);
    }
    head += personHat(d);
    const body = back + legs + torso + piv(-13, -63, A.armL, armL, st) + shield + piv(13, -63, A.arm, armR, st) + piv(0, -70, A.head, head, st);
    const dirt = A.dirt ? [[8, '#8b5a2b'], [-4, '#a0703c'], [14, '#6e4524']].map(([dx, c], i) => `<g transform="translate(${60 + i * 5} -3)"><circle r="${2.8 - i * 0.5}" fill="${c}" class="pa pa-dirt" style="${st};--dx:${dx}px"/></g>`).join('') : '';
    return `<g transform="translate(${d.x} ${d.y}) scale(${d.flip ? -d.s : d.s} ${d.s})">${piv(0, 0, A.body, body, st)}${dirt}</g>`;
  }
  function hairFront(d) {
    const h = d.hair, top = `<path d="M-18.6,-87 Q-20,-107 0,-107.5 Q20,-107 18.6,-87 Q15,-98 4,-99 Q-8,-101 -18.6,-87Z" fill="${h}"/>`;
    switch (d.hairStyle) {
      case 'none': return '';
      case 'bun': return `<circle cx="0" cy="-106" r="7.5" fill="${h}"/>${top}`;
      case 'pigtails': return `<circle cx="-20" cy="-92" r="7" fill="${h}"/><circle cx="20" cy="-92" r="7" fill="${h}"/>${top}`;
      case 'curly': return `<g fill="${h}">${[-16, -8, 0, 8, 16].map((x, i) => `<circle cx="${x}" cy="${-101 - (i % 2) * 3}" r="7.5"/>`).join('')}<circle cx="-18" cy="-92" r="6"/><circle cx="18" cy="-92" r="6"/></g>`;
      case 'wig': return `<path d="M-19,-84 Q-21,-107 0,-107.5 Q21,-107 19,-84 Q15,-97 0,-98 Q-15,-97 -19,-84Z" fill="#f1f1f4"/><circle cx="-19" cy="-82" r="5" fill="#f1f1f4"/><circle cx="19" cy="-82" r="5" fill="#f1f1f4"/>`;
      default: return top;
    }
  }
  function personHat(d) {
    switch (d.hat) {
      case 'cap': return `<path d="M-19,-92 Q-18,-110 0,-110 Q18,-110 19,-92Z" fill="${d.capColor || '#e23b3b'}"/><path d="M4,-93 Q24,-96 30,-90 Q20,-88 4,-90Z" fill="${d.capColor || '#e23b3b'}"/>`;
      case 'straw': return `<ellipse cx="0" cy="-99" rx="28" ry="6.5" fill="#e6bd5f"/><path d="M-13,-100 Q-12,-116 0,-116 Q12,-116 13,-100Z" fill="#d9a441"/>`;
      case 'chef': return `<rect x="-14" y="-110" width="28" height="12" fill="#fff"/><path d="M-16,-108 Q-24,-122 -10,-126 Q-4,-136 6,-128 Q20,-132 18,-116 Q22,-110 14,-108Z" fill="#fff"/>`;
      case 'beret': return `<ellipse cx="-2" cy="-100" rx="21" ry="8" fill="${d.hatColor || '#5b2a86'}" transform="rotate(-10 -2 -100)"/><rect x="-3" y="-111" width="4" height="5" rx="2" fill="${d.hatColor || '#5b2a86'}"/>`;
      case 'crown': return `<path d="M-14,-100 L-14,-114 L-7,-106 L0,-117 L7,-106 L14,-114 L14,-100Z" fill="#f5c518"/>`;
      case 'helmet': return `<path d="M-20,-90 Q-21,-112 0,-113 Q21,-112 20,-90Z" fill="${d.helmetColor || '#f5c518'}"/><rect x="-22" y="-92" width="44" height="5" rx="2.5" fill="${d.helmetColor || '#f5c518'}"/>`;
      case 'widebrim': return `<ellipse cx="0" cy="-100" rx="27" ry="5.5" fill="#2b2622"/><path d="M-12,-101 Q-11,-116 0,-116 Q11,-116 12,-101Z" fill="#2b2622"/>`;
      case 'knight': return `<rect x="-19" y="-108" width="38" height="42" rx="13" fill="#c3cad5"/><rect x="-14" y="-92" width="28" height="4.5" rx="2" fill="#2a2f3a"/><path d="M0,-107 Q-8,-130 14,-134 Q6,-123 8,-108Z" fill="#e23b3b"/>`;
      default: return '';
    }
  }
  function personItem(kind, hx, hy, d) {
    switch (kind) {
      case 'flag': return `<line x1="${hx}" y1="${hy + 34}" x2="${hx}" y2="${hy - 70}" stroke="#6b4f32" stroke-width="3" stroke-linecap="round"/>${at(hx + 1.5, hy - 70, 1, flagBody(d.flag, 44, 29), 'a-flag')}`;
      case 'book': return `<rect x="${hx - 3}" y="${hy - 12}" width="17" height="22" rx="2" fill="${d.itemColor}"/><rect x="${hx - 1}" y="${hy - 10}" width="2.4" height="18" fill="#fff" opacity=".55"/>`;
      case 'ball': return `<circle cx="${hx + 6}" cy="${hy - 6}" r="9" fill="${d.itemColor}"/><path d="M${hx - 3},${hy - 6} h18" stroke="#fff" stroke-width="2"/>`;
      case 'apple': return `<circle cx="${hx + 5}" cy="${hy - 5}" r="7" fill="#e23b3b"/><path d="M${hx + 5},${hy - 12} q2,-5 6,-6" stroke="#3f8a3a" stroke-width="2" fill="none"/>`;
      case 'flower': return `<line x1="${hx}" y1="${hy + 4}" x2="${hx + 2}" y2="${hy - 26}" stroke="#3f8a3a" stroke-width="2.4"/>${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="${hx + 2}" cy="${hy - 32}" rx="3" ry="6" fill="${d.itemColor}" transform="rotate(${a} ${hx + 2} ${hy - 26})"/>`).join('')}<circle cx="${hx + 2}" cy="${hy - 26}" r="3" fill="#f5c518"/>`;
      case 'azada': return `<line x1="${hx - 13}" y1="${hy - 16}" x2="${hx + 37}" y2="${hy + 46}" stroke="#7a5230" stroke-width="3.5" stroke-linecap="round"/><path d="M${hx + 38},${hy + 45} L${hx + 29},${hy + 53} L${hx + 26},${hy + 49} L${hx + 34},${hy + 42}Z" fill="#8d949c"/>`;
      case 'brush': return `<line x1="${hx - 4}" y1="${hy + 6}" x2="${hx + 14}" y2="${hy - 16}" stroke="#c99a2e" stroke-width="3" stroke-linecap="round"/><path d="M${hx + 13},${hy - 15} l4,-6 l2,2Z" fill="#c0452b"/>`;
      case 'ballot': return `<rect x="${hx - 4}" y="${hy - 18}" width="14" height="18" rx="1.5" fill="#fff" stroke="#b9c2d0"/><path d="M${hx - 1},${hy - 9} l3,3 l5,-7" stroke="#2e9d5b" stroke-width="2" fill="none"/>`;
      case 'sword': return `<path d="M${hx - 2.5},${hy - 4} L${hx - 2.5},${hy - 46} L${hx},${hy - 53} L${hx + 2.5},${hy - 46} L${hx + 2.5},${hy - 4}Z" fill="#e8edf3"/><rect x="${hx - 8}" y="${hy - 7}" width="16" height="4" rx="1.6" fill="#d4a52c"/>`;
      case 'spear': return `<line x1="${hx}" y1="${hy + 30}" x2="${hx}" y2="${hy - 62}" stroke="#7a5230" stroke-width="3.5" stroke-linecap="round"/><path d="M${hx - 5},${hy - 60} L${hx},${hy - 80} L${hx + 5},${hy - 60}Z" fill="#8d949c"/>`;
      case 'letter': return `<rect x="${hx - 2}" y="${hy - 12}" width="20" height="14" rx="1.5" fill="#fffaf0" stroke="#c9b28a"/><circle cx="${hx + 8}" cy="${hy - 4}" r="2.6" fill="#c62828"/>`;
      default: return '';
    }
  }

  /** Chispa que destella cuando dos personajes con act 'fight' (y delay 0) chocan sus espadas. */
  const clash = (x, y, s = 1) => at(x, y, s, `<path d="M0,-16 L4,-4 L16,0 L4,4 L0,16 L-4,4 L-16,0 L-4,-4Z" fill="#fff6b0"/><circle r="5" fill="#fff"/>`, 'pa pa-clash');

  // ---------- Cronos, el búho guía (con disfraz según la materia) ----------
  // Disfraces: viajero (por defecto) · explorador · cientifico · doctor · chef · detective · artista · actor · profe · astronauta · jardinero
  const COSTUMES = {
    viajero: { label: 'Viajero del tiempo', goggles: '#f6ad55' },
    explorador: { label: 'Explorador', hat: () => `<ellipse cx="60" cy="16" rx="47" ry="9" fill="#cfa660"/><path d="M29,16 Q30,-15 60,-17 Q90,-15 91,16Z" fill="#e8c98a"/><rect x="30" y="7" width="60" height="7" fill="#7a4f28"/><path d="M40,-4 Q50,-12 62,-12" stroke="#fff" stroke-width="3" opacity=".45" fill="none" stroke-linecap="round"/>`,
      hand: `<g transform="translate(102 96) rotate(-20)"><rect x="-10" y="-14" width="20" height="28" rx="3" fill="#f6e7c1"/><rect x="-12" y="-16" width="24" height="5" rx="2.5" fill="#c9a66b"/><rect x="-12" y="11" width="24" height="5" rx="2.5" fill="#c9a66b"/><path d="M-5,-6 q5,4 10,0 M-5,0 q5,4 10,0" stroke="#c0533a" stroke-width="1.6" fill="none" stroke-dasharray="2 2"/></g>` },
    cientifico: { label: 'Científico', goggles: '#33c3e8', front: coat('#ffffff'),
      hand: `<g transform="translate(104 96)"><path d="M-5,-20 h10 v9 l10,18 q2,6 -4,6 h-22 q-6,0 -4,-6 l10,-18Z" fill="#e8f9ff" stroke="#9fd6e8" stroke-width="2"/><path d="M-12,3 h24 l3,4 q1,3 -3,3 h-24 q-4,0 -3,-3Z" fill="#3ddc84"/><circle cx="-2" cy="-2" r="2" fill="#3ddc84" class="a-twinkle"/><circle cx="3" cy="-8" r="1.5" fill="#3ddc84" class="a-twinkle" style="animation-delay:.6s"/></g>` },
    doctor: { label: 'Doctor', front: `${coat('#ffffff')}<path d="M44,66 Q36,92 54,100 Q66,104 72,94" stroke="#2d3748" stroke-width="3" fill="none"/><circle cx="72" cy="94" r="5" fill="#a0aec0" stroke="#2d3748" stroke-width="2"/><rect x="74" y="74" width="10" height="10" rx="1" fill="#fff" stroke="#e23b3b" stroke-width="1"/><path d="M79,76 v6 M76,79 h6" stroke="#e23b3b" stroke-width="2"/>`,
      hat: () => `<rect x="24" y="22" width="72" height="6" rx="3" fill="#2d3748"/><circle cx="60" cy="16" r="11" fill="#e2e8f0" stroke="#a0aec0" stroke-width="2.5"/><circle cx="57" cy="13" r="3" fill="#fff"/>` },
    chef: { label: 'Chef', front: `<path d="M46,66 L74,66 L60,82Z" fill="#e23b3b"/>`,
      hat: () => `<rect x="36" y="4" width="48" height="16" rx="3" fill="#fff"/><path d="M34,8 Q20,-6 32,-18 Q38,-30 52,-24 Q60,-36 72,-24 Q86,-30 90,-16 Q100,-4 86,8Z" fill="#fff"/><path d="M48,-2 q2,8 0,10 M60,-6 q2,10 0,14 M72,-2 q2,8 0,10" stroke="#e2e8f0" stroke-width="2" fill="none"/>`,
      hand: `<g transform="translate(104 98) rotate(25)"><rect x="-2.5" y="-6" width="5" height="34" rx="2.5" fill="#b07a42"/><ellipse cx="0" cy="-12" rx="8" ry="11" fill="#c48b4c"/></g>` },
    detective: { label: 'Detective', front: `<path d="M48,66 L60,74 L72,66 L72,72 L60,80 L48,72Z" fill="#7a4f28"/>`,
      hat: () => `<path d="M28,24 Q28,-6 60,-8 Q92,-6 92,24Z" fill="#a8763e"/><path d="M28,24 Q28,-6 60,-8 Q92,-6 92,24Z" fill="url(#ck-check)"/><path d="M84,20 Q102,18 106,26 Q94,30 84,26Z M36,20 Q18,18 14,26 Q26,30 36,26Z" fill="#8b5a2b"/><circle cx="60" cy="-9" r="4" fill="#8b5a2b"/>`,
      defs: `<pattern id="ck-check" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0,0 h8 M0,4 h8 M0,0 v8 M4,0 v8" stroke="#6b4423" stroke-width="1" opacity=".55"/></pattern>`,
      hand: `<g transform="translate(104 92)"><line x1="6" y1="10" x2="14" y2="24" stroke="#6b4423" stroke-width="5" stroke-linecap="round"/><circle r="12" fill="rgba(200,240,255,.45)" stroke="#d4a52c" stroke-width="4"/><path d="M-6,-5 q4,-4 9,-4" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>` },
    artista: { label: 'Artista', front: `<circle cx="50" cy="96" r="4" fill="#e23b3b" opacity=".8"/><circle cx="66" cy="104" r="3" fill="#3b82f6" opacity=".8"/><circle cx="62" cy="88" r="2.5" fill="#3ddc84" opacity=".8"/>`,
      hat: () => `<g transform="rotate(-12 58 14)"><ellipse cx="58" cy="14" rx="38" ry="13" fill="#e23b3b"/><ellipse cx="50" cy="10" rx="18" ry="5" fill="#ff6b6b" opacity=".6"/><rect x="56" y="-4" width="4" height="7" rx="2" fill="#b02020"/></g>`,
      hand: `<g transform="translate(104 96) rotate(30)"><rect x="-2.5" y="-4" width="5" height="32" rx="2" fill="#f2c14e"/><rect x="-3" y="-8" width="6" height="6" fill="#a0aec0"/><path d="M-3,-8 Q0,-22 3,-8Z" fill="#8b5cf6"/></g>` },
    actor: { label: 'Actor', front: `<path d="M48,64 L60,70 L48,76Z M72,64 L60,70 L72,76Z" fill="#e23b3b"/><circle cx="60" cy="70" r="3" fill="#b02020"/>`,
      hand: `<g transform="translate(100 94)"><path d="M-14,-12 Q-14,4 -4,8 Q6,4 6,-12Q-4,-8 -14,-12Z" fill="#ffd23f"/><path d="M-10,-4 q2,-2 4,0 M-2,-4 q2,-2 4,0 M-9,1 q5,5 10,0" stroke="#7a5414" stroke-width="1.5" fill="none"/><path d="M2,-6 Q2,10 12,14 Q22,10 22,-6Q12,-2 2,-6Z" fill="#7aa7ff"/><path d="M6,2 q2,2 4,0 M14,2 q2,2 4,0 M8,10 q4,-4 8,0" stroke="#1e3a8a" stroke-width="1.5" fill="none"/></g>` },
    profe: { label: 'Profe', hat: () => `<path d="M38,20 Q38,6 60,4 Q82,6 82,20Z" fill="#2b2d42"/><path d="M18,6 L60,-10 L102,6 L60,22Z" fill="#3d405b"/><path d="M60,6 L96,10 L96,26" stroke="#f5c518" stroke-width="2.5" fill="none"/><circle cx="96" cy="28" r="4" fill="#f5c518"/><circle cx="60" cy="6" r="3" fill="#f5c518"/>`,
      hand: `<g transform="translate(104 96) rotate(30)"><rect x="-4" y="-18" width="8" height="34" fill="#ffd23f"/><path d="M-4,16 L0,26 L4,16Z" fill="#f6d1a3"/><path d="M-1.4,22 L0,26 L1.4,22Z" fill="#2d3748"/><rect x="-4" y="-22" width="8" height="5" fill="#ff7cc0"/></g>` },
    astronauta: { label: 'Astronauta', after: `<circle cx="60" cy="50" r="50" fill="rgba(190,235,255,.22)" stroke="#eef4fb" stroke-width="5"/><path d="M26,30 Q34,12 54,8" stroke="#fff" stroke-width="5" opacity=".7" fill="none" stroke-linecap="round"/><line x1="60" y1="0" x2="60" y2="-16" stroke="#cbd5e0" stroke-width="3"/><circle cx="60" cy="-18" r="5" fill="#ff4fa3" class="a-glow"/>` },
    jardinero: { label: 'Jardinero', hat: () => `<ellipse cx="60" cy="18" rx="50" ry="10" fill="#e6bd5f"/><path d="M34,18 Q35,-8 60,-10 Q85,-8 86,18Z" fill="#d9a441"/><rect x="34" y="8" width="52" height="6" fill="#3f9a4a"/><circle cx="82" cy="8" r="5" fill="#ff7cc0"/><circle cx="82" cy="8" r="2" fill="#f5c518"/>`,
      hand: `<g transform="translate(104 98)"><line x1="0" y1="18" x2="0" y2="-10" stroke="#3f8a3a" stroke-width="3"/>${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<ellipse cx="0" cy="-20" rx="3.4" ry="7" fill="#ffd23f" transform="rotate(${a} 0 -12)"/>`).join('')}<circle cy="-12" r="5" fill="#7a4f28"/></g>` },
  };
  function coat(c) {
    return `<path d="M42,62 L54,118 Q34,114 24,104 Q16,80 28,62Z" fill="${c}" opacity=".96"/><path d="M78,62 L66,118 Q86,114 96,104 Q104,80 92,62Z" fill="${c}" opacity=".96"/><path d="M42,62 L50,76 L44,80Z M78,62 L70,76 L76,80Z" fill="#e2e8f0"/>`;
  }
  /** SVG de Cronos. costume: clave de COSTUMES. */
  function owl(costume = 'viajero') {
    const c = COSTUMES[costume] || COSTUMES.viajero, g = uid('ow');
    const eyes = c.goggles
      ? `<rect x="17" y="40" width="86" height="9" rx="4.5" fill="#7b341e"/><circle cx="42" cy="48" r="18" fill="${c.goggles}"/><circle cx="78" cy="48" r="18" fill="${c.goggles}"/><circle cx="42" cy="48" r="18" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="2"/><circle cx="78" cy="48" r="18" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="2"/>`
      : `<circle cx="42" cy="48" r="16" fill="#5b3aa8"/><circle cx="78" cy="48" r="16" fill="#5b3aa8"/>`;
    return `<svg viewBox="-14 -36 148 172" class="owl-svg" aria-hidden="true">
      <defs>${lin(g, [[0, '#a98bf5'], [1, '#6b46c1']])}${c.defs || ''}</defs>
      <g class="owl-wing owl-wing-l"><path d="M18,60 Q0,86 12,110 Q26,98 30,72Z" fill="#5b3aa8"/></g>
      <g class="owl-wing owl-wing-r"><path d="M102,60 Q120,86 108,110 Q94,98 90,72Z" fill="#5b3aa8"/></g>
      <path d="M26,30 L19,4 L46,22Z" fill="#7c58d6"/><path d="M94,30 L101,4 L74,22Z" fill="#7c58d6"/>
      <path d="M60,14 Q101,14 103,58 Q105,105 60,119 Q15,105 17,58 Q19,14 60,14Z" fill="url(#${g})"/>
      <ellipse cx="60" cy="90" rx="27" ry="26" fill="#f3e8ff"/>
      <g fill="none" stroke="#d6bcfa" stroke-width="1.6">${[78, 88, 98].map((y, r) => [...Array(4 - (r % 2))].map((_, i) => `<path d="M${44 + i * 9 + (r % 2) * 4.5},${y} q4.5,4 9,0"/>`).join('')).join('')}</g>
      <circle cx="60" cy="104" r="9" fill="#fff" stroke="#f6ad55" stroke-width="3"/>
      <g class="owl-clock"><line x1="60" y1="104" x2="60" y2="98" stroke="#2d3748" stroke-width="2" stroke-linecap="round"/></g><line x1="60" y1="104" x2="64" y2="104" stroke="#2d3748" stroke-width="2" stroke-linecap="round"/>
      ${c.front || ''}
      ${eyes}
      <circle cx="42" cy="48" r="13.5" fill="#fff"/><circle cx="78" cy="48" r="13.5" fill="#fff"/>
      <g class="owl-pupils"><circle cx="44" cy="49" r="7" fill="#1a202c"/><circle cx="80" cy="49" r="7" fill="#1a202c"/><circle cx="46.5" cy="46" r="2.4" fill="#fff"/><circle cx="82.5" cy="46" r="2.4" fill="#fff"/></g>
      <g class="owl-lids"><ellipse cx="42" cy="48" rx="14" ry="14" fill="#8f6ee0"/><ellipse cx="78" cy="48" rx="14" ry="14" fill="#8f6ee0"/></g>
      ${c.goggles ? '<path d="M33,40 Q38,36 44,37" stroke="#fff" stroke-width="2.4" fill="none" opacity=".75" stroke-linecap="round"/><path d="M69,40 Q74,36 80,37" stroke="#fff" stroke-width="2.4" fill="none" opacity=".75" stroke-linecap="round"/>' : ''}
      <g class="owl-beak"><path d="M53,63 L67,63 L60,74Z" fill="#f6ad55"/></g>
      <path d="M46,117 l-4,8 M50,118 l0,8 M54,117 l4,8 M66,117 l-4,8 M70,118 l0,8 M74,117 l4,8" stroke="#f6ad55" stroke-width="3" stroke-linecap="round"/>
      ${c.hat ? c.hat() : ''}${c.hand || ''}${c.after || ''}
    </svg>`;
  }

  return { rnd, setSeed, uid, lin, rad, at, delay, sun, cloud, stars, birds, smoke, palm, tree, hill, waves, grass, sparkle, house, flagBody, flagPole, person, ACTS, clash, owl, COSTUMES };
})();
