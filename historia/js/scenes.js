// Ilustraciones SVG de cada época (viewBox 800×500) + coordenadas de los puntos ✨ para descubrir.
// Los elementos animados usan clases a-* (definidas en style.css) dentro de un <g> envolvente,
// porque una animación CSS de transform reemplaza el atributo transform del mismo elemento.
window.SCENES = (() => {
  // ---------- utilidades ----------
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const lin = (id, stops, x2 = 0, y2 = 1) =>
    `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</linearGradient>`;
  const rad = (id, stops) =>
    `<radialGradient id="${id}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</radialGradient>`;
  const at = (x, y, s, inner, cls = '', style = '') =>
    `<g transform="translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ''}">${cls ? `<g class="${cls}"${style ? ` style="${style}"` : ''}>${inner}</g>` : inner}</g>`;
  const delay = (d) => `animation-delay:${d}s`;

  let gid = 0;
  function sun(x, y, r, c = '#fff3b0', glow = '#fff3b0') {
    const id = `sg${++gid}`;
    return `${rad(id, [[0, glow, 0.75], [0.35, glow, 0.35], [1, glow, 0]])}
      <circle cx="${x}" cy="${y}" r="${r * 2.8}" fill="url(#${id})" class="a-glow"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
  }
  function cloud(x, y, s = 1, op = 0.95, cls = 'a-drift', d = 0, fill = '#fff') {
    return at(x, y, s, `<g fill="${fill}" opacity="${op}"><ellipse cx="0" cy="0" rx="44" ry="15"/><ellipse cx="-20" cy="-8" rx="22" ry="15"/><ellipse cx="12" cy="-15" rx="26" ry="20"/><ellipse cx="34" cy="-3" rx="18" ry="11"/></g>`, cls, delay(d));
  }
  function stars(n, yMax, xMin = 0, xMax = 800) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = (xMin + rnd() * (xMax - xMin)).toFixed(0), y = (rnd() * yMax).toFixed(0), r = (0.8 + rnd() * 1.6).toFixed(1);
      s += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" class="a-twinkle" style="${delay((rnd() * 3).toFixed(2))}"/>`;
    }
    return s;
  }
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
    const top = [lean, -120];
    const fr = [-170, -140, -110, -70, -35, 0].map((a, i) =>
      `<path d="M0,0 Q36,-24 80,6 Q40,-4 0,0Z" fill="${i % 2 ? '#2f9e52' : '#3cb963'}" transform="rotate(${a})"/>`).join('');
    return at(x, y, s, `
      <path d="M0,0 Q${lean * 0.2},-60 ${top[0]},${top[1]}" stroke="#8b5e34" stroke-width="11" fill="none" stroke-linecap="round"/>
      ${[0.2, 0.4, 0.6, 0.8].map((t) => `<path d="M-6,${-120 * t} q6,4 12,0" transform="translate(${lean * t * t} 0)" stroke="#6e4826" stroke-width="2" fill="none"/>`).join('')}
      <g transform="translate(${top[0]} ${top[1]})">${fr}<circle r="6" fill="#7a4f28"/><circle cx="-5" cy="6" r="5" fill="#6b4423"/></g>`, 'a-sway', delay(d));
  }
  function flagBody(type, w = 46, h = 30) {
    switch (type) {
      case 'col': return `<rect width="${w}" height="${h / 2}" fill="#fcd116"/><rect y="${h / 2}" width="${w}" height="${h / 4}" fill="#003893"/><rect y="${h * 0.75}" width="${w}" height="${h / 4}" fill="#ce1126"/>`;
      case 'ven': return `<rect width="${w}" height="${h / 3}" fill="#fcd116"/><rect y="${h / 3}" width="${w}" height="${h / 3}" fill="#003893"/><rect y="${(2 * h) / 3}" width="${w}" height="${h / 3}" fill="#cf142b"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${w / 2 + Math.cos(Math.PI + (i * Math.PI) / 6) * w * 0.2}" cy="${h * 0.62 + Math.sin(Math.PI + (i * Math.PI) / 6) * h * 0.18}" r="${h * 0.035}" fill="#fff"/>`).join('')}`;
      case 'ecu': return `<rect width="${w}" height="${h / 2}" fill="#ffd100"/><rect y="${h / 2}" width="${w}" height="${h / 4}" fill="#034ea2"/><rect y="${h * 0.75}" width="${w}" height="${h / 4}" fill="#ed1c24"/><ellipse cx="${w / 2}" cy="${h / 2}" rx="${h * 0.14}" ry="${h * 0.18}" fill="#7a5c2e"/>`;
      case 'pan': return `<rect width="${w}" height="${h}" fill="#fff"/><rect x="${w / 2}" width="${w / 2}" height="${h / 2}" fill="#d21034"/><rect y="${h / 2}" width="${w / 2}" height="${h / 2}" fill="#005293"/><circle cx="${w / 4}" cy="${h / 4}" r="${h * 0.1}" fill="#005293"/><circle cx="${(3 * w) / 4}" cy="${(3 * h) / 4}" r="${h * 0.1}" fill="#d21034"/>`;
      case 'fra': return `<rect width="${w / 3}" height="${h}" fill="#0055a4"/><rect x="${w / 3}" width="${w / 3}" height="${h}" fill="#fff"/><rect x="${(2 * w) / 3}" width="${w / 3}" height="${h}" fill="#ef4135"/>`;
      case 'burgundy': return `<rect width="${w}" height="${h}" fill="#f7f1e1"/><path d="M5,4 L${w - 5},${h - 4} M${w - 5},4 L5,${h - 4}" stroke="#c8102e" stroke-width="${h * 0.15}" stroke-linecap="round"/>`;
      case 'spain': return `<rect width="${w}" height="${h}" fill="#aa151b"/><rect y="${h / 4}" width="${w}" height="${h / 2}" fill="#f1bf00"/>`;
      case 'pirate': return `<rect width="${w}" height="${h}" fill="#1b1b1f"/><circle cx="${w / 2}" cy="${h * 0.42}" r="${h * 0.17}" fill="#fff"/><path d="M${w * 0.3},${h * 0.62} L${w * 0.7},${h * 0.86} M${w * 0.7},${h * 0.62} L${w * 0.3},${h * 0.86}" stroke="#fff" stroke-width="${h * 0.08}" stroke-linecap="round"/>`;
      case 'red': return `<path d="M0,0 L${w},${h / 2} L0,${h}Z" fill="#e23b3b"/>`;
      case 'blue': return `<path d="M0,0 L${w},${h / 2} L0,${h}Z" fill="#3b5bdb"/>`;
      case 'gold': return `<path d="M0,0 L${w},${h / 2} L0,${h}Z" fill="#f5c518"/>`;
      default: return `<rect width="${w}" height="${h}" fill="${type}"/>`;
    }
  }
  function flagPole(x, y, h, type, w = 46, fh = 30, pole = '#5f5248', d = 0) {
    return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y - h}" stroke="${pole}" stroke-width="3" stroke-linecap="round"/><circle cx="${x}" cy="${y - h - 2}" r="3.2" fill="#e8b931"/>${at(x + 1.5, y - h + 1, 1, flagBody(type, w, fh), 'a-flag', delay(d))}`;
  }

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
    if (d.hairStyle === 'long' || d.hairStyle === 'messy') back += `<path d="M-20,-90 Q-26,-62 -15,-55 L15,-55 Q26,-62 20,-90Z" fill="${d.hair}"/>`;
    const leg = (x) => (d.dress ? `<rect x="${x < 0 ? -9 : 1.5}" y="-16" width="7.5" height="15" rx="3" fill="${d.skin}"/>`
      : `<rect x="${x < 0 ? -11 : 1.5}" y="-35" width="9.5" height="34" rx="4" fill="${d.bottom}"/>${d.boots ? `<rect x="${x < 0 ? -11.5 : 1}" y="-16" width="10.5" height="15" rx="3" fill="#1f1a17"/>` : ''}`)
      + `<ellipse cx="${x}" cy="-2" rx="7" ry="3.8" fill="${shoe}"/>`;
    const legs = A.legs ? piv(-6, -35, 'pa-leg-a', leg(-6.5), st) + piv(6, -35, 'pa-leg-b', leg(6.5), st) : leg(-6.5) + leg(6.5);
    const ARMS = { down: ['M13,-63 Q21,-51 22,-39', 22, -37.5], up: ['M13,-63 Q23,-72 25,-87', 25, -89], out: ['M13,-63 Q24,-60 31,-53', 32, -52], wave: ['M13,-63 Q27,-68 31,-83', 31, -85] };
    const ARMSL = { down: ['M-13,-63 Q-21,-51 -22,-39', -22, -37.5], up: ['M-13,-63 Q-23,-72 -25,-87', -25, -89] };
    const [ad, hx, hy] = ARMS[pose], [adL, lx, ly] = ARMSL[poseL] || ARMSL.down;
    const armR = `${item(itm, hx, hy, d)}<path d="${ad}" stroke="${sl}" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="${hx}" cy="${hy}" r="4.6" fill="${d.skin}"/>`;
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
    head += hat(d);
    const body = back + legs + torso + piv(-13, -63, A.armL, armL, st) + shield + piv(13, -63, A.arm, armR, st) + piv(0, -70, A.head, head, st);
    const dirt = A.dirt ? [[8, '#8b5a2b'], [-4, '#a0703c'], [14, '#6e4524']].map(([dx, c], i) => `<g transform="translate(${60 + i * 5} -3)"><circle r="${2.8 - i * 0.5}" fill="${c}" class="pa pa-dirt" style="${st};--dx:${dx}px"/></g>`).join('') : '';
    return `<g transform="translate(${d.x} ${d.y}) scale(${d.flip ? -d.s : d.s} ${d.s})">${piv(0, 0, A.body, body, st)}${dirt}</g>`;
  }
  function hairFront(d) {
    const h = d.hair;
    switch (d.hairStyle) {
      case 'none': return '';
      case 'bun': return `<circle cx="0" cy="-106" r="7.5" fill="${h}"/><path d="M-18.6,-87 Q-20,-107 0,-107.5 Q20,-107 18.6,-87 Q15,-98 4,-99 Q-8,-101 -18.6,-87Z" fill="${h}"/>`;
      case 'wig': return `<path d="M-19,-84 Q-21,-107 0,-107.5 Q21,-107 19,-84 Q15,-97 0,-98 Q-15,-97 -19,-84Z" fill="#f1f1f4"/><circle cx="-19" cy="-82" r="5" fill="#f1f1f4"/><circle cx="19" cy="-82" r="5" fill="#f1f1f4"/>`;
      case 'messy': return `<path d="M-19,-84 L-23,-96 L-15,-100 L-14,-110 L-4,-106 L2,-114 L8,-106 L17,-110 L17,-99 L23,-95 L19,-84 Q14,-97 0,-97 Q-12,-97 -19,-84Z" fill="${h}"/>`;
      case 'curly': return `<g fill="${h}">${[-16, -8, 0, 8, 16].map((x, i) => `<circle cx="${x}" cy="${-101 - (i % 2) * 3}" r="7.5"/>`).join('')}<circle cx="-18" cy="-92" r="6"/><circle cx="18" cy="-92" r="6"/></g>`;
      default: return `<path d="M-18.6,-87 Q-20,-107 0,-107.5 Q20,-107 18.6,-87 Q15,-98 4,-99 Q-8,-101 -18.6,-87Z" fill="${h}"/>`;
    }
  }
  function hat(d) {
    switch (d.hat) {
      case 'morrion': return `<path d="M-26,-95 Q-16,-90 -12,-97 Q-12,-118 0,-120 Q12,-118 12,-97 Q16,-90 26,-95 Q22,-88 0,-90 Q-22,-88 -26,-95Z" fill="#cdd4de"/><path d="M-3,-119 Q1,-132 8,-123 L3,-118Z" fill="#cdd4de"/><path d="M-8,-106 Q-2,-114 6,-110" stroke="#fff" stroke-width="2.4" opacity=".7" fill="none" stroke-linecap="round"/><path d="M6,-121 Q16,-134 24,-126 Q16,-126 10,-118Z" fill="#e23b3b"/>`;
      case 'bicorne': return `<path d="M-29,-96 Q-20,-121 0,-123 Q20,-121 29,-96 Q0,-103 -29,-96Z" fill="#1d2033"/><path d="M-29,-96 Q0,-103 29,-96" stroke="#e8b931" stroke-width="2.4" fill="none"/><circle cx="9" cy="-110" r="4" fill="#fcd116"/><circle cx="9" cy="-110" r="2.4" fill="#003893"/><circle cx="9" cy="-110" r="1" fill="#ce1126"/>`;
      case 'tricorn': return `<path d="M-25,-96 Q-28,-111 -14,-106 Q0,-121 14,-106 Q28,-111 25,-96 Q0,-102 -25,-96Z" fill="#1d1d2b"/><path d="M-25,-96 Q0,-102 25,-96" stroke="#e8b931" stroke-width="2" fill="none"/>`;
      case 'knight': return `<rect x="-19" y="-108" width="38" height="42" rx="13" fill="#c3cad5"/><rect x="-19" y="-108" width="10" height="42" rx="6" fill="#fff" opacity=".25"/><rect x="-14" y="-92" width="28" height="4.5" rx="2" fill="#2a2f3a"/><path d="M0,-108 L0,-68" stroke="#9aa3b0" stroke-width="2"/>${[-80, -75, -70].map((yy) => `<circle cx="7" cy="${yy}" r="1.2" fill="#2a2f3a"/>`).join('')}<path d="M0,-107 Q-8,-130 14,-134 Q6,-123 8,-108Z" fill="#e23b3b"/>`;
      case 'feathers': return `<ellipse cx="10" cy="-110" rx="3.2" ry="9" fill="#2e9d5b" transform="rotate(22 10 -102)"/><ellipse cx="15" cy="-106" rx="3" ry="8" fill="#f5c518" transform="rotate(40 15 -100)"/><rect x="-18.5" y="-101" width="37" height="6" rx="3" fill="#e04e39"/><path d="M-16,-98 h32" stroke="#f5c518" stroke-width="1.6" stroke-dasharray="3 3"/>`;
      case 'hood': return `<path d="M-21,-84 Q-24,-111 0,-112 Q24,-111 21,-84 Q19,-64 12,-62 L12,-84 Q12,-99 0,-99 Q-12,-99 -12,-84 L-12,-62 Q-19,-64 -21,-84Z" fill="${d.top}"/>`;
      case 'straw': return `<ellipse cx="0" cy="-99" rx="28" ry="6.5" fill="#e6bd5f"/><path d="M-13,-100 Q-12,-116 0,-116 Q12,-116 13,-100Z" fill="#d9a441"/><rect x="-13" y="-104" width="26" height="3" fill="#a8752a"/>`;
      case 'widebrim': return `<ellipse cx="0" cy="-100" rx="27" ry="5.5" fill="#2b2622"/><path d="M-12,-101 Q-11,-116 0,-116 Q11,-116 12,-101Z" fill="#2b2622"/><path d="M8,-112 Q20,-124 26,-112 Q18,-114 10,-106Z" fill="#fff" opacity=".9"/>`;
      case 'beret': return `<ellipse cx="-2" cy="-100" rx="21" ry="8" fill="${d.hatColor || '#5b2a86'}" transform="rotate(-10 -2 -100)"/><rect x="-3" y="-111" width="4" height="5" rx="2" fill="${d.hatColor || '#5b2a86'}"/>`;
      case 'crown': return `<path d="M-14,-100 L-14,-114 L-7,-106 L0,-117 L7,-106 L14,-114 L14,-100Z" fill="#f5c518"/><circle cx="0" cy="-108" r="2" fill="#e23b3b"/>`;
      case 'scarf': return `<path d="M-20,-86 Q-22,-110 0,-110 Q22,-110 20,-86 Q18,-72 14,-70 Q16,-96 0,-98 Q-16,-96 -14,-70 Q-18,-72 -20,-86Z" fill="${d.scarfColor || '#f2e6d0'}"/>`;
      default: return '';
    }
  }
  function item(kind, hx, hy, d) {
    switch (kind) {
      case 'spear': return `<line x1="${hx}" y1="${hy + 30}" x2="${hx}" y2="${hy - 62}" stroke="#7a5230" stroke-width="3.5" stroke-linecap="round"/><path d="M${hx - 5},${hy - 60} L${hx},${hy - 80} L${hx + 5},${hy - 60}Z" fill="#8d949c"/>`;
      case 'flag': return `<line x1="${hx}" y1="${hy + 34}" x2="${hx}" y2="${hy - 70}" stroke="#6b4f32" stroke-width="3" stroke-linecap="round"/>${at(hx + 1.5, hy - 70, 1, flagBody(d.flag, 44, 29), 'a-flag')}`;
      case 'sword': return `<path d="M${hx - 2.5},${hy - 4} L${hx - 2.5},${hy - 46} L${hx},${hy - 53} L${hx + 2.5},${hy - 46} L${hx + 2.5},${hy - 4}Z" fill="#e8edf3"/><rect x="${hx - 8}" y="${hy - 7}" width="16" height="4" rx="1.6" fill="#d4a52c"/>`;
      case 'book': return `<rect x="${hx - 3}" y="${hy - 12}" width="17" height="22" rx="2" fill="${d.itemColor}"/><rect x="${hx - 1}" y="${hy - 10}" width="2.4" height="18" fill="#fff" opacity=".55"/>`;
      case 'letter': return `<rect x="${hx - 2}" y="${hy - 12}" width="20" height="14" rx="1.5" fill="#fffaf0" stroke="#c9b28a"/><path d="M${hx - 2},${hy - 12} L${hx + 8},${hy - 4} L${hx + 18},${hy - 12}" stroke="#c9b28a" fill="none"/><circle cx="${hx + 8}" cy="${hy - 4}" r="2.6" fill="#c62828"/>`;
      case 'hoe': return `<line x1="${hx - 16}" y1="${hy + 40}" x2="${hx + 8}" y2="${hy - 46}" stroke="#7a5230" stroke-width="3.5" stroke-linecap="round"/><path d="M${hx + 8},${hy - 46} L${hx + 22},${hy - 40} L${hx + 18},${hy - 32}Z" fill="#8d949c"/>`;
      case 'azada': return `<line x1="${hx - 13}" y1="${hy - 16}" x2="${hx + 37}" y2="${hy + 46}" stroke="#7a5230" stroke-width="3.5" stroke-linecap="round"/><path d="M${hx + 38},${hy + 45} L${hx + 29},${hy + 53} L${hx + 26},${hy + 49} L${hx + 34},${hy + 42}Z" fill="#8d949c"/>`;
      case 'brush': return `<line x1="${hx - 4}" y1="${hy + 6}" x2="${hx + 14}" y2="${hy - 16}" stroke="#c99a2e" stroke-width="3" stroke-linecap="round"/><path d="M${hx + 13},${hy - 15} l4,-6 l2,2Z" fill="#c0452b"/>`;
      case 'bow': return `<path d="M${hx + 3},${hy - 32} Q${hx + 20},${hy} ${hx + 3},${hy + 32}" stroke="#7a4a22" stroke-width="3" fill="none" stroke-linecap="round"/><line x1="${hx + 3}" y1="${hy - 32}" x2="${hx + 3}" y2="${hy + 32}" stroke="#f1ead8" stroke-width="1"/>`;
      case 'cane': return `<line x1="${hx}" y1="${hy - 4}" x2="${hx + 4}" y2="${hy + 38}" stroke="#2b1d12" stroke-width="2.6"/><circle cx="${hx}" cy="${hy - 5}" r="2.8" fill="#e8b931"/>`;
      case 'ballot': return `<rect x="${hx - 4}" y="${hy - 18}" width="14" height="18" rx="1.5" fill="#fff" stroke="#b9c2d0"/><path d="M${hx - 1},${hy - 9} l3,3 l5,-7" stroke="#2e9d5b" stroke-width="2" fill="none"/>`;
      case 'torch': return `<line x1="${hx}" y1="${hy + 4}" x2="${hx}" y2="${hy - 24}" stroke="#6b4423" stroke-width="4" stroke-linecap="round"/>${at(hx, hy - 24, 1, `<path d="M-6,0 Q-8,-12 0,-22 Q8,-12 6,0Z" fill="#ffb52e"/><path d="M-3,0 Q-3,-8 0,-13 Q3,-8 3,0Z" fill="#fff1a0"/>`, 'a-flicker')}`;
      default: return '';
    }
  }

  // ---------- piezas reutilizables ----------
  function caravel(x, y, s, o = {}) {
    const sail = o.sail || '#fbf6ea', cross = o.cross || '#d32f2f', hull = o.hull || '#8b5a2b', flag = o.flag || 'red';
    const crossMark = (cx, cy, k) => cross === 'none' ? '' : `<rect x="${cx - 3.5 * k}" y="${cy - 16 * k}" width="${7 * k}" height="${32 * k}" fill="${cross}"/><rect x="${cx - 13 * k}" y="${cy - 5 * k}" width="${26 * k}" height="${7 * k}" fill="${cross}"/>`;
    return at(x, y, s, `
      <path d="M-62,-122 L-96,-30 M0,-152 L-90,-30 M0,-152 L98,-30 M50,-122 L100,-30" stroke="#5b3a1a" stroke-width="1" opacity=".55"/>
      <line x1="0" y1="-16" x2="0" y2="-152" stroke="#5b3a1a" stroke-width="4"/>
      <line x1="50" y1="-16" x2="50" y2="-122" stroke="#5b3a1a" stroke-width="3.5"/>
      <line x1="-58" y1="-44" x2="-58" y2="-126" stroke="#5b3a1a" stroke-width="3.2"/>
      <path d="M-58,-124 L-88,-52 L-58,-58Z" fill="${sail}"/>
      <path d="M-36,-140 Q0,-149 36,-140 Q43,-101 36,-62 Q0,-55 -36,-62 Q-43,-101 -36,-140Z" fill="${sail}"/>
      <path d="M-36,-140 Q0,-149 36,-140 Q43,-101 36,-62 Q0,-55 -36,-62 Q-43,-101 -36,-140Z" fill="#000" opacity=".06" transform="translate(4 0)"/>
      ${crossMark(0, -100, 1)}
      <path d="M-22,-160 Q0,-164 22,-160 L19,-146 Q0,-149 -19,-146Z" fill="${sail}"/>
      <path d="M33,-112 Q50,-118 67,-112 Q71,-89 67,-68 Q50,-64 33,-68 Q29,-89 33,-112Z" fill="${sail}"/>
      ${crossMark(50, -90, 0.62)}
      ${at(1, -166, 1, flagBody(flag, 22, 12), 'a-flag')}
      <line x1="0" y1="-152" x2="0" y2="-168" stroke="#5b3a1a" stroke-width="2"/>
      ${at(51, -134, 1, flagBody(flag, 16, 9), 'a-flag', delay(0.4))}
      <line x1="50" y1="-122" x2="50" y2="-136" stroke="#5b3a1a" stroke-width="2"/>
      <path d="M-92,-22 Q-82,10 -60,18 L62,18 Q88,10 102,-30 L72,-18 L-70,-18Z" fill="${hull}"/>
      <path d="M-92,-22 L-95,-50 L-54,-47 L-52,-18Z" fill="${hull}"/><path d="M-95,-50 L-54,-47 L-54,-43 L-94,-45Z" fill="#000" opacity=".2"/>
      <path d="M62,-18 L68,-42 L98,-40 L102,-30Z" fill="${hull}"/>
      <path d="M-86,-6 Q0,4 96,-14" stroke="#c48b4c" stroke-width="3" fill="none"/>
      <path d="M-80,6 Q0,14 88,0" stroke="#000" stroke-width="2.5" fill="none" opacity=".2"/>
      ${[-40, -15, 10, 35].map((cx) => `<circle cx="${cx}" cy="-4" r="3" fill="#3a2410"/>`).join('')}
    `, 'a-rock', delay(o.d || 0));
  }
  function house(x, y, w, h, wall, roof, o = {}) {
    let s = `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/>`;
    s += `<path d="M${x - 5},${y - h + 2} L${x + w / 2},${y - h - (o.roofH || 22)} L${x + w + 5},${y - h + 2}Z" fill="${roof}"/>`;
    if (o.door !== false) s += `<path d="M${x + w / 2 - 6},${y} L${x + w / 2 - 6},${y - 15} Q${x + w / 2},${y - 21} ${x + w / 2 + 6},${y - 15} L${x + w / 2 + 6},${y}Z" fill="${o.doorC || '#6b4423'}"/>`;
    if (o.win) s += `<rect x="${x + 6}" y="${y - h + 8}" width="8" height="9" rx="1.5" fill="${o.win}"/><rect x="${x + w - 14}" y="${y - h + 8}" width="8" height="9" rx="1.5" fill="${o.win}"/>`;
    return s;
  }
  function colonialHouse(x, y, w, h, wall, o = {}) {
    const bal = o.bal || '#7a4a24';
    let s = `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/><rect x="${x + w - 6}" y="${y - h}" width="6" height="${h}" fill="#000" opacity=".08"/>`;
    s += `<path d="M${x - 4},${y - h} L${x + 4},${y - h - 10} L${x + w - 4},${y - h - 10} L${x + w + 4},${y - h}Z" fill="${o.roof || '#c0533a'}"/>`;
    s += `<rect x="${x - 4}" y="${y - h - 2}" width="${w + 8}" height="3" fill="#8f3a26"/>`;
    // balcón de madera
    const by = y - h + 18;
    s += `<rect x="${x + 6}" y="${by - 14}" width="${w - 12}" height="16" fill="#3b2a20" opacity=".55"/>`;
    s += `<rect x="${x + 4}" y="${by}" width="${w - 8}" height="12" fill="${bal}"/>${Array.from({ length: Math.floor((w - 12) / 6) }, (_, i) => `<rect x="${x + 7 + i * 6}" y="${by + 2}" width="2" height="8" fill="#000" opacity=".25"/>`).join('')}`;
    s += `<rect x="${x + 2}" y="${by - 18}" width="${w - 4}" height="4" fill="${bal}"/>`;
    if (o.flowers !== false) s += `<g fill="${o.flowerC || '#ec3d8c'}">${Array.from({ length: Math.floor(w / 9) }, (_, i) => `<circle cx="${x + 6 + i * 9 + (i % 2) * 3}" cy="${by + 13 + (i % 3) * 3}" r="${3.2 + (i % 2)}"/>`).join('')}</g>`;
    s += `<path d="M${x + w / 2 - 7},${y} L${x + w / 2 - 7},${y - 20} Q${x + w / 2},${y - 27} ${x + w / 2 + 7},${y - 20} L${x + w / 2 + 7},${y}Z" fill="${o.door || '#2f6f4f'}"/>`;
    return s;
  }
  function cobble(y0, y1, c1, c2) {
    let s = `<rect x="0" y="${y0}" width="800" height="${y1 - y0}" fill="${c1}"/>`;
    for (let yy = y0 + 8, r = 0; yy < y1; yy += 12 + r * 2, r++) {
      for (let xx = (r % 2) * 14; xx < 800; xx += 28 + r * 2) s += `<ellipse cx="${xx}" cy="${yy}" rx="${10 + r}" ry="${3.5 + r * 0.6}" fill="${c2}"/>`;
    }
    return s;
  }
  function grassTufts(y, n, color, xMin = 0, xMax = 800) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = xMin + rnd() * (xMax - xMin), yy = y + rnd() * (500 - y);
      s += `<path d="M${x.toFixed(0)},${yy.toFixed(0)} l-4,-10 m4,10 l0,-13 m0,13 l4,-10" stroke="${color}" stroke-width="2" stroke-linecap="round" fill="none"/>`;
    }
    return s;
  }
  function mountainsBogota(fill1, fill2, chapel = true) {
    return `<path d="M0,210 Q60,150 120,140 Q170,95 230,78 Q290,95 330,130 Q390,110 450,150 Q520,120 600,150 Q700,130 800,170 L800,330 L0,330Z" fill="${fill1}"/>
      <path d="M0,250 Q120,200 220,215 Q330,180 450,215 Q600,190 800,225 L800,330 L0,330Z" fill="${fill2}"/>
      ${chapel ? `<g transform="translate(230 78)"><rect x="-12" y="-14" width="24" height="14" fill="#fff"/><path d="M-14,-14 L0,-22 L14,-14Z" fill="#c0533a"/><rect x="-3" y="-30" width="6" height="16" fill="#fff"/><path d="M-4,-30 L0,-36 L4,-30Z" fill="#c0533a"/><path d="M0,-41 v-5 M-2,-43.5 h4" stroke="#fff" stroke-width="1.2"/></g>` : ''}`;
  }

  const S = {}; // escenas
  const HS = {}; // puntos ✨ (coordenadas en el viewBox 800×500)

  // ================= PREHISTORIA =================
  S.prehistoria = () => {
    const mammoth = `
      <rect x="40" y="-44" width="19" height="42" rx="8" fill="#5a331b"/><rect x="-46" y="-44" width="19" height="42" rx="8" fill="#5a331b"/>
      <path d="M-62,-40 Q-74,-98 -10,-108 Q56,-114 74,-72 Q82,-42 64,-30 L-52,-30Z" fill="#7a4a2a"/>
      <path d="M-56,-40 Q-30,-28 0,-34 Q30,-26 64,-34" stroke="#5f3820" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="2 6"/>
      <path d="M-40,-96 Q0,-110 50,-96" stroke="#93613a" stroke-width="6" fill="none" opacity=".6" stroke-linecap="round"/>
      <rect x="20" y="-44" width="19" height="44" rx="8" fill="#6b3f22"/><rect x="-66" y="-44" width="19" height="44" rx="8" fill="#6b3f22"/>
      <path d="M72,-74 Q86,-66 84,-50" stroke="#5f3820" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M-58,-60 Q-92,-66 -90,-100 Q-84,-128 -52,-122 Q-28,-116 -32,-82Z" fill="#80502d"/>
      <path d="M-74,-120 Q-60,-132 -46,-122" stroke="#93613a" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse cx="-46" cy="-94" rx="11" ry="14" fill="#6b3f22"/>
      <circle cx="-70" cy="-100" r="3" fill="#1d120b"/>
      <g class="a-swing"><path d="M-86,-92 Q-102,-62 -94,-32 Q-91,-18 -80,-21" stroke="#80502d" stroke-width="13" fill="none" stroke-linecap="round"/></g>
      <path d="M-78,-80 Q-104,-48 -62,-40" stroke="#f3e7d2" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M-70,-80 Q-90,-54 -56,-48" stroke="#e6d6bb" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    const hut = `<path d="M-38,0 Q-32,-48 0,-64 Q32,-48 38,0Z" fill="#c99a4b"/>
      ${[-24, -12, 0, 12, 24].map((x) => `<path d="M${x * 0.3},-60 Q${x},-30 ${x * 1.25},0" stroke="#9c7130" stroke-width="2" fill="none"/>`).join('')}
      <path d="M-10,0 L-10,-18 Q0,-26 10,-18 L10,0Z" fill="#3a2414"/><path d="M-4,-62 L0,-74 L4,-62" stroke="#9c7130" stroke-width="3" fill="none"/>`;
    const wheat = (x, y, d) => at(x, y, 1, `<path d="M0,0 Q2,-22 0,-44" stroke="#c99a2e" stroke-width="2" fill="none"/>${[0, 1, 2, 3].map((i) => `<ellipse cx="${i % 2 ? 3 : -3}" cy="${-30 - i * 5}" rx="2.4" ry="4.5" fill="#f2c14e" transform="rotate(${i % 2 ? 25 : -25} ${i % 2 ? 3 : -3} ${-30 - i * 5})"/>`).join('')}<ellipse cx="0" cy="-52" rx="2.4" ry="4.5" fill="#f2c14e"/>`, 'a-sway', delay(d));
    const hand = (x, y, s, c) => at(x, y, s, `<g fill="${c}"><ellipse cx="0" cy="0" rx="7" ry="8"/></g><path d="M-5,-4 L-8,-15 M-2,-6 L-3,-19 M1.5,-6 L2,-19 M4.5,-5 L7,-16 M6,0 L12,-5" stroke="${c}" stroke-width="3.4" stroke-linecap="round"/>`);
    const acacia = (x, y, s) => at(x, y, s, `<path d="M-3,0 L-2,-40 L-18,-60 M-2,-40 L14,-62" stroke="#4a2234" stroke-width="5" fill="none"/><g fill="#4a2234"><ellipse cx="-6" cy="-64" rx="40" ry="10"/><ellipse cx="14" cy="-69" rx="26" ry="8"/></g>`);
    return `<defs>
      ${lin('ph-sky', [[0, '#2d1b55'], [0.42, '#9c3f6b'], [0.72, '#f0804a'], [1, '#ffc66e']])}
      ${lin('ph-ground', [[0, '#a2683a'], [1, '#5e3518']])}
      ${lin('ph-rock', [[0, '#93624b'], [1, '#4f3125']], 1, 1)}
      ${rad('ph-fire', [[0, '#ffd36b', 0.85], [0.45, '#ff8a3d', 0.35], [1, '#ff6a00', 0]])}
      ${rad('ph-cave', [[0, '#ff9a3c', 0.6], [1, '#1e0f08', 0]])}
      ${lin('ph-flame', [[0, '#fff3a1'], [0.45, '#ffb52e'], [1, '#ff5a1f']])}
    </defs>
    <rect width="800" height="500" fill="url(#ph-sky)"/>
    ${stars(16, 120)}
    ${sun(545, 282, 60, '#ffd98c', '#ffcf7a')}
    ${birds(150, 3, '#3a1d3f', 26, -6)}
    <path d="M0,300 L70,262 L140,286 L230,228 L320,280 L410,242 L500,288 L590,236 L690,276 L800,246 L800,350 L0,350Z" fill="#6f2f57" opacity=".75"/>
    <path d="M592,330 L688,206 Q700,198 712,206 L812,330Z" fill="#552447"/>
    <path d="M684,212 Q700,200 716,212 L708,224 Q700,217 692,224Z" fill="#ff7a3c" class="a-glow"/>
    <path d="M693,222 Q690,250 680,262 M705,222 Q712,252 722,270" stroke="#ff7a3c" stroke-width="4" opacity=".7" fill="none" stroke-linecap="round"/>
    ${smoke(700, 196, 3, 14, '#9c8aa0', 5)}
    <path d="M0,335 Q130,300 270,326 T540,320 T800,312 L800,500 L0,500Z" fill="#a4632c"/>
    ${acacia(430, 322, 0.75)}${acacia(790, 316, 0.55)}
    <path d="M0,392 Q210,368 420,396 T800,384 L800,500 L0,500Z" fill="url(#ph-ground)"/>
    ${grassTufts(400, 26, '#c48a45', 280, 800)}
    <!-- choza y trigo (Neolítico) -->
    ${at(738, 374, 1, hut)}
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => wheat(694 + i * 15, 412 + (i % 2) * 8, i * 0.3)).join('')}
    <!-- mamut -->
    ${at(578, 420, 0.86, mammoth, 'a-bob-s')}
    <!-- roca con cueva -->
    <path d="M0,104 Q70,88 132,124 Q202,148 238,212 Q264,262 254,330 Q248,380 278,432 L0,442Z" fill="url(#ph-rock)"/>
    <path d="M0,104 Q70,88 132,124 Q162,136 184,160 Q122,140 62,150 Q22,156 0,170Z" fill="#b07a5f" opacity=".45"/>
    <path d="M206,190 Q232,240 226,300" stroke="#3f2519" stroke-width="3" fill="none" opacity=".5"/>
    <path d="M56,432 Q46,342 106,318 Q168,306 186,364 Q196,404 192,436Z" fill="#1d0f09"/>
    <ellipse cx="122" cy="412" rx="72" ry="50" fill="url(#ph-cave)" class="a-glow"/>
    <!-- pinturas rupestres -->
    <g opacity=".92">
      ${at(108, 236, 1.05, `<path d="M0,0 Q-2,-14 10,-18 Q18,-30 34,-26 Q50,-30 60,-20 Q70,-14 68,-2 Q66,6 60,6 L58,18 L54,18 L52,8 L22,8 L20,19 L16,19 L14,8 Q4,8 0,0Z" fill="#c0452b"/><path d="M8,-17 Q3,-25 10,-28" stroke="#c0452b" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M66,-6 Q74,-2 72,6" stroke="#c0452b" stroke-width="2" fill="none"/>`)}
      ${hand(70, 196, 1, '#d0573a')}${hand(196, 246, 0.9, '#f1dcc0')}${hand(176, 186, 0.8, '#d0573a')}
      <g stroke="#2b160e" stroke-width="2.2" stroke-linecap="round" fill="none">
        <path d="M60,286 l4,-10 l4,10 M64,276 l0,-9 M58,271 l14,-3"/><circle cx="64" cy="264" r="2.6" fill="#2b160e"/>
        <path d="M88,288 l4,-10 l4,10 M92,278 l0,-9 M86,273 l14,-3"/><circle cx="92" cy="266" r="2.6" fill="#2b160e"/>
      </g>
    </g>
    <!-- hacha de piedra -->
    <ellipse cx="222" cy="478" rx="40" ry="9" fill="#3f2414" opacity=".5"/>
    ${at(222, 466, 1, `<path d="M-24,4 Q-26,-10 -6,-22 Q14,-30 26,-12 Q30,4 -24,4Z" fill="#9aa1a8"/><path d="M-14,-4 L-4,-18 L8,-20 L2,-6Z" fill="#c2c8ce"/><path d="M8,-20 L20,-12 L14,0 L2,-6Z" fill="#7d858d"/>`)}
    <!-- fogata -->
    ${at(388, 446, 1, `
      <ellipse cx="0" cy="-12" rx="96" ry="64" fill="url(#ph-fire)" class="a-glow"/>
      ${[[-36, 2], [-24, 9], [-8, 11], [10, 11], [26, 8], [38, 2]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="#6d625c"/>`).join('')}
      <rect x="-32" y="-6" width="64" height="9" rx="4.5" fill="#5b3418" transform="rotate(14)"/><rect x="-32" y="-6" width="64" height="9" rx="4.5" fill="#6e4020" transform="rotate(-14)"/>
      <g class="a-flicker"><path d="M-24,0 Q-30,-32 -6,-60 Q-8,-36 6,-32 Q2,-50 14,-66 Q32,-38 24,0Z" fill="url(#ph-flame)"/></g>
      <g class="a-flicker" style="${delay(-0.25)}"><path d="M-12,0 Q-14,-22 0,-42 Q12,-22 12,0Z" fill="#fff1a0"/></g>
      ${[-10, 4, 14, -2].map((x, i) => at(x, -40, 1, `<circle r="2" fill="#ffd36b"/>`, 'a-spark', delay(i * 0.45))).join('')}`)}
    <!-- personas -->
    ${person({ x: 300, y: 458, s: 1.05, skin: '#c78b5c', top: '#8a5a2b', bottom: '#6e4524', hair: '#3a2414', hairStyle: 'messy', item: 'spear', arm: 'up', shoe: '#5a3a22', act: 'shake' })}
    ${person({ x: 476, y: 462, s: 0.95, skin: '#b97b50', top: '#a46a32', dress: true, hair: '#2a180e', hairStyle: 'long', arm: 'out', flip: true, shoe: '#5a3a22', act: 'warm' })}
    `;
  };
  HS.prehistoria = [[148, 232], [388, 400], [570, 322], [222, 452], [742, 330]];

  // ================= EDAD ANTIGUA =================
  S.antigua = () => {
    const pyramid = (ax, ay, bl, br, by, mid) => `<path d="M${ax},${ay} L${bl},${by} L${mid},${by}Z" fill="#f6d68e"/><path d="M${ax},${ay} L${mid},${by} L${br},${by}Z" fill="#cf9a4c"/>
      ${[0.25, 0.5, 0.75].map((t) => `<path d="M${ax + (bl - ax) * t},${ay + (by - ay) * t} L${ax + (mid - ax) * t},${ay + (by - ay) * t} L${ax + (br - ax) * t},${ay + (by - ay) * t}" stroke="#a87634" stroke-width="1" opacity=".35" fill="none"/>`).join('')}`;
    let aqueduct = `<rect x="370" y="248" width="260" height="11" fill="#e2c297"/>`;
    for (let i = 0; i < 9; i++) {
      const x = 370 + i * 30;
      aqueduct += `<path d="M${x},259 L${x},300 L${x + 6},300 Q${x + 6},266 ${x + 15},266 Q${x + 24},266 ${x + 24},300 L${x + 30},300 L${x + 30},259Z" fill="#d9b585"/>`;
    }
    const column = (x) => `<rect x="${x}" y="250" width="15" height="60" fill="#fbf7ee"/><rect x="${x + 10}" y="250" width="5" height="60" fill="#e6dccb"/><path d="M${x + 4},252 v56 M${x + 8},252 v56" stroke="#e9e0cf" stroke-width="1"/><rect x="${x - 3}" y="245" width="21" height="6" rx="2" fill="#f4ecdc"/>`;
    return `<defs>
      ${lin('an-sky', [[0, '#2f8fe6'], [0.6, '#8fd0ff'], [1, '#ffe6a8']])}
      ${lin('an-river', [[0, '#3fa3e0'], [1, '#1f6fb0']])}
      ${lin('an-tab', [[0, '#c98c58'], [1, '#9a6237']])}
    </defs>
    <rect width="800" height="500" fill="url(#an-sky)"/>
    ${at(690, 92, 1, `${[...Array(12)].map((_, i) => `<path d="M-6,-62 L0,-92 L6,-62Z" fill="#fff6c4" opacity=".55" transform="rotate(${i * 30})"/>`).join('')}`, 'a-spin-slow')}
    ${sun(690, 92, 40, '#fff4b8', '#fff0a0')}
    ${cloud(120, 80, 1, 0.9, 'a-drift', 0)}${cloud(470, 60, 0.75, 0.85, 'a-drift2', -4)}
    ${birds(130, 3, '#33507a', 30, -10, 0.9)}
    <path d="M0,300 Q150,262 300,296 T600,286 T800,292 L800,500 L0,500Z" fill="#f0c27a"/>
    ${aqueduct}
    ${pyramid(232, 148, 98, 368, 302, 252)}
    ${pyramid(374, 196, 304, 446, 302, 384)}
    ${pyramid(86, 236, 36, 140, 302, 94)}
    <path d="M0,302 Q200,292 380,306 L380,330 Q180,318 0,326Z" fill="#e8b363" opacity=".6"/>
    ${at(150, 338, 0.9, `<rect x="-26" y="-34" width="52" height="34" rx="2" fill="#e8c27a"/><path d="M-26,-17 h52 M0,-34 v17 M-13,-17 v17 M13,-17 v17" stroke="#b98a3e" stroke-width="1.5" opacity=".7"/><rect x="-26" y="-34" width="52" height="34" rx="2" fill="none" stroke="#b98a3e" stroke-width="2"/><rect x="-32" y="0" width="64" height="6" rx="3" fill="#7a5230"/><path d="M-32,6 q-7,0 -7,-6" stroke="#7a5230" stroke-width="3" fill="none"/>`)}
    <path d="M173,322 Q190,322 203,317 Q220,320 238,319" stroke="#8a6a3a" stroke-width="2.4" fill="none"/>
    ${person({ x: 210, y: 340, s: 0.5, skin: '#b07a4a', top: '#b07a4a', sleeve: '#b07a4a', bottom: '#f4efe2', hair: '#1b1209', belt: '#d4a52c', act: 'pull' })}
    ${person({ x: 246, y: 342, s: 0.5, skin: '#9c6a40', top: '#9c6a40', sleeve: '#9c6a40', bottom: '#f4efe2', hair: '#1b1209', belt: '#d4a52c', act: 'pull', delay: -0.35 })}
    <!-- colina con templo griego -->
    <path d="M470,336 Q600,276 800,296 L800,420 L470,420Z" fill="#e7b25f"/>
    <rect x="548" y="318" width="226" height="9" fill="#efe4cf"/><rect x="556" y="309" width="210" height="10" fill="#f6eedd"/>
    ${[568, 602, 636, 670, 704, 738].map(column).join('')}
    <rect x="554" y="232" width="214" height="15" fill="#f4ecdc"/><rect x="554" y="238" width="214" height="3" fill="#d8ccb5"/>
    <path d="M550,233 L661,196 L772,233Z" fill="#fbf4e4"/><path d="M574,229 L661,203 L748,229Z" fill="#e9dfca"/>
    <!-- Nilo -->
    <path d="M0,372 Q160,352 310,380 Q450,406 520,440 Q560,462 548,500 L0,500Z" fill="url(#an-river)"/>
    <g opacity=".55" stroke="#bfe8ff" stroke-width="2.4" fill="none" stroke-linecap="round">
      ${at(0, 0, 1, `<path d="M-40,400 q20,-6 40,0 t40,0 t40,0 M60,440 q20,-6 40,0 t40,0 M220,420 q20,-6 40,0 t40,0 M20,470 q20,-6 40,0 t40,0 t40,0 M300,465 q20,-6 40,0 t40,0"/>`, 'a-wave-s')}
    </g>
    ${at(196, 414, 1, `<path d="M-48,0 Q0,20 48,0 L40,-7 L-40,-7Z" fill="#8a5a2c"/><path d="M-40,-7 L40,-7" stroke="#6b4320" stroke-width="2"/><line x1="0" y1="-7" x2="2" y2="-92" stroke="#5b3a1a" stroke-width="3"/><path d="M2,-90 L44,-16 L2,-20Z" fill="#fbf4e2"/><path d="M-2,-74 L-30,-18 L-2,-22Z" fill="#f1e6cf"/>`, 'a-rock')}
    ${palm(330, 376, 0.8, 0)}${palm(52, 362, 0.9, -1.2, -16)}${palm(460, 400, 0.65, -2)}
    <!-- tablilla cuneiforme -->
    <ellipse cx="652" cy="482" rx="58" ry="10" fill="#b07a3a" opacity=".45"/>
    <rect x="612" y="384" width="80" height="96" rx="14" fill="url(#an-tab)"/><rect x="612" y="384" width="80" height="96" rx="14" fill="none" stroke="#e1aa75" stroke-width="3" opacity=".6"/>
    <g fill="#6e4021">${[0, 1, 2, 3, 4, 5].map((r) => [0, 1, 2, 3, 4].map((c) => {
      const x = 624 + c * 13 + (r % 2) * 4, y = 400 + r * 13;
      return (r * 5 + c) % 3 === 0 ? `<path d="M${x},${y} l8,0 l-4,7Z"/>` : `<path d="M${x},${y} l3,-1 l1,8 l-2,0Z"/><path d="M${x + 4},${y + 1} l6,0 l-3,4Z"/>`;
    }).join('')).join('')}</g>
    <!-- columna rota (fin de Roma) -->
    ${at(748, 470, 1, `<rect x="-34" y="-14" width="60" height="16" rx="8" fill="#efe6d6" transform="rotate(-8)"/><path d="M26,-22 L30,-8 L22,-6Z" fill="#d8ccb5"/><rect x="-44" y="-4" width="20" height="10" rx="3" fill="#e2d6c0"/>`)}
    `;
  };
  HS.antigua = [[652, 430], [234, 228], [196, 368], [662, 262], [452, 270]];

  // ================= EDAD MEDIA =================
  S.media = () => {
    const tower = (x, w, top, roofC, flagT, d) => `<rect x="${x}" y="${top}" width="${w}" height="${272 - top}" fill="#aaa4bf"/><rect x="${x + w - 9}" y="${top}" width="9" height="${272 - top}" fill="#000" opacity=".12"/>
      <path d="M${x - 7},${top + 1} L${x + w / 2},${top - 56} L${x + w + 7},${top + 1}Z" fill="${roofC}"/><path d="M${x + w / 2},${top - 56} L${x + w + 7},${top + 1} L${x + w / 2 + 6},${top + 1}Z" fill="#000" opacity=".15"/>
      <path d="M${x + w / 2 - 4},${top + 30} v-8 a4,4 0 0 1 8,0 v8Z" fill="#3b3550"/><path d="M${x + w / 2 - 4},${top + 70} v-8 a4,4 0 0 1 8,0 v8Z" fill="#3b3550"/>
      ${flagPole(x + w / 2, top - 55, 22, flagT, 22, 13, '#4a4560', d)}`;
    let wall = `<rect x="470" y="196" width="182" height="78" fill="#b9b4c9"/>`;
    for (let i = 0; i < 13; i++) wall += `<rect x="${472 + i * 14}" y="186" width="9" height="11" fill="#b9b4c9"/>`;
    for (let i = 0; i < 10; i++) wall += `<rect x="${478 + (i % 5) * 34 + (i > 4 ? 16 : 0)}" y="${210 + (i > 4 ? 26 : 0)}" width="16" height="7" rx="2" fill="#cfcadb"/>`;
    const houseM = (x, y, w, h) => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#f3e3c3"/><path d="M${x},${y - h} L${x + w},${y} M${x + w},${y - h} L${x},${y}" stroke="#7a5230" stroke-width="2.5" opacity=".75"/><rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="none" stroke="#7a5230" stroke-width="3"/>
      <path d="M${x - 8},${y - h + 2} L${x + w / 2},${y - h - 26} L${x + w + 8},${y - h + 2}Z" fill="#d9a441"/><path d="M${x - 8},${y - h + 2} L${x + w / 2},${y - h - 26} L${x + w + 8},${y - h + 2}" stroke="#b9842a" stroke-width="3" fill="none"/>`;
    return `<defs>
      ${lin('me-sky', [[0, '#57b6f0'], [1, '#dff4ff']])}
      ${lin('me-hill', [[0, '#79c66b'], [1, '#4f9e52']])}
    </defs>
    <rect width="800" height="500" fill="url(#me-sky)"/>
    ${sun(110, 78, 34, '#fff5c0', '#fff1a6')}
    ${cloud(280, 70, 1, 0.95, 'a-drift', 0)}${cloud(640, 50, 0.8, 0.9, 'a-drift2', -6)}${cloud(470, 120, 0.55, 0.8, 'a-drift', -3)}
    ${birds(100, 3, '#3d4f73', 24, -4)}
    <path d="M0,282 Q120,222 260,262 T520,252 T800,242 L800,500 L0,500Z" fill="#9ad38a"/>
    <!-- molino -->
    <path d="M44,262 L52,212 L68,212 L76,262Z" fill="#efe3c6"/><path d="M48,214 L60,196 L72,214Z" fill="#a0522d"/>
    ${at(60, 210, 1, `${[0, 90, 180, 270].map((a) => `<g transform="rotate(${a})"><rect x="-3" y="-46" width="6" height="44" fill="#7a5230"/><rect x="2" y="-44" width="12" height="36" fill="#fff6e6" stroke="#7a5230" stroke-width="1.5"/></g>`).join('')}<circle r="4" fill="#5b3a1a"/>`, 'a-spin')}
    <!-- colina del castillo -->
    <path d="M300,330 Q520,196 790,320 L800,500 L300,500Z" fill="url(#me-hill)"/>
    ${wall}
    ${tower(436, 46, 158, '#4a5fc1', 'red', 0)}${tower(636, 46, 158, '#4a5fc1', 'blue', 0.5)}
    <rect x="532" y="128" width="60" height="70" fill="#c5c0d6"/><rect x="580" y="128" width="12" height="70" fill="#000" opacity=".1"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="${534 + i * 16}" y="119" width="10" height="10" fill="#c5c0d6"/>`).join('')}
    <path d="M524,129 L562,64 L600,129Z" fill="#d64545"/><path d="M562,64 L600,129 L568,129Z" fill="#000" opacity=".15"/>
    ${flagPole(562, 65, 26, 'gold', 26, 15, '#4a4560', 0.2)}
    <path d="M556,160 v-10 a6,6 0 0 1 12,0 v10Z" fill="#3b3550"/>
    <path d="M542,274 L542,240 Q561,220 580,240 L580,274Z" fill="#3b3550"/>
    <g stroke="#6d6680" stroke-width="2">${[548, 556, 564, 572].map((x) => `<line x1="${x}" y1="236" x2="${x}" y2="262"/>`).join('')}<line x1="543" y1="250" x2="579" y2="250"/></g>
    <path d="M542,274 L580,274 L592,300 L530,300Z" fill="#8b5a2b"/><path d="M536,286 L586,286" stroke="#6b4320" stroke-width="2"/>
    <!-- camino -->
    <path d="M530,300 Q470,350 520,400 Q570,450 470,500 L560,500 Q640,450 590,400 Q545,355 592,300Z" fill="#e6cf9a"/>
    <!-- aldea y monasterio -->
    <path d="M0,330 Q140,300 320,332 L320,500 L0,500Z" fill="#86c776"/>
    ${houseM(30, 338, 50, 34)}${houseM(96, 330, 44, 30)}
    <!-- iglesia -->
    <rect x="176" y="236" width="30" height="98" fill="#ece4d3"/><path d="M172,238 L191,200 L210,238Z" fill="#8f4a2a"/><path d="M191,186 v-14 M185,180 h12" stroke="#5b3a1a" stroke-width="3"/>
    <path d="M200,236 h4 M200,256 h4" stroke="#000" opacity=".1"/>
    <path d="M187,262 v-10 a4,4 0 0 1 8,0 v10Z" fill="#3b3550"/>
    <rect x="206" y="262" width="96" height="72" fill="#f1eadb"/><path d="M200,264 L254,222 L308,264Z" fill="#a0522d"/>
    ${at(254, 286, 1, `<circle r="14" fill="#5b4a8a"/>${['#e23b3b', '#f5c518', '#3b82f6', '#2e9d5b', '#e23b3b', '#f5c518', '#3b82f6', '#2e9d5b'].map((c, i) => `<path d="M0,0 L${(Math.cos((i * Math.PI) / 4) * 12).toFixed(1)},${(Math.sin((i * Math.PI) / 4) * 12).toFixed(1)} A12,12 0 0 1 ${(Math.cos(((i + 1) * Math.PI) / 4) * 12).toFixed(1)},${(Math.sin(((i + 1) * Math.PI) / 4) * 12).toFixed(1)}Z" fill="${c}"/>`).join('')}<circle r="4" fill="#fff6c4"/>`, 'a-glow')}
    <path d="M244,334 v-18 a10,10 0 0 1 20,0 v18Z" fill="#6b4423"/>
    <!-- campos -->
    <path d="M0,390 Q160,372 330,396 L330,500 L0,500Z" fill="#b98a48"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${-20 + i * 60},500 Q${40 + i * 50},440 ${110 + i * 44},392" stroke="${i % 2 ? '#6fae4f' : '#a3753a'}" stroke-width="12" fill="none" opacity=".75"/>`).join('')}
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => at(40 + i * 34, 410 + (i % 3) * 22, 0.8, `<path d="M0,0 Q-2,-14 0,-22" stroke="#4f8f3a" stroke-width="3" fill="none"/><circle cx="0" cy="-24" r="5" fill="#f2c14e"/>`, 'a-sway', delay(i * 0.2))).join('')}
    <path d="M330,430 Q560,410 800,440 L800,500 L330,500Z" fill="#5aa65a"/>
    ${grassTufts(440, 18, '#3f8a45', 340, 800)}
    ${person({ x: 132, y: 452, s: 0.95, skin: '#e0a57a', top: '#8b6a45', bottom: '#5b4630', hat: 'straw', item: 'hoe', arm: 'down', act: 'hoe' })}
    ${person({ x: 352, y: 448, s: 0.85, skin: '#efc39b', top: '#6b4a2b', dress: true, hat: 'hood', item: 'book', arm: 'out', itemColor: '#a8322d', act: 'read' })}
    ${person({ x: 612, y: 470, s: 1.12, skin: '#efc39b', top: '#c1c8d3', sleeve: '#aab3bf', bottom: '#8d96a3', armor: true, hat: 'knight', item: 'sword', arm: 'up', shield: '#3b5bdb', boots: true, act: 'fight', delay: 0 })}
    ${person({ x: 738, y: 474, s: 1.08, skin: '#efc39b', top: '#b9a9a9', sleeve: '#9e8f8f', bottom: '#7d6f6f', armor: true, hat: 'knight', item: 'sword', arm: 'up', shield: '#c62828', boots: true, flip: true, act: 'fight', delay: 0 })}
    ${at(676, 392, 1, `<path d="M0,-16 L4,-4 L16,0 L4,4 L0,16 L-4,4 L-16,0 L-4,-4Z" fill="#fff6b0"/><circle r="5" fill="#fff"/>`, 'pa pa-clash')}
    `;
  };
  HS.media = [[562, 170], [556, 352], [176, 372], [252, 250]];

  // ================= EDAD MODERNA =================
  S.moderna = () => {
    const city = `
      <rect x="0" y="210" width="40" height="80" fill="#e9c98f"/><path d="M-4,212 L20,196 L44,212Z" fill="#c0533a"/>
      <rect x="36" y="184" width="22" height="106" fill="#e7d3a8"/><rect x="36" y="184" width="22" height="8" fill="#c0533a"/>${[200, 222, 244].map((y) => `<rect x="43" y="${y}" width="8" height="10" rx="3" fill="#7a5a3a"/>`).join('')}
      <rect x="58" y="226" width="96" height="64" fill="#efd7a6"/>
      <rect x="78" y="194" width="56" height="34" fill="#e8cf9b"/>
      <path d="M74,196 Q106,128 138,196Z" fill="#c8553d"/><path d="M106,140 L106,196 M90,160 Q96,180 94,196 M122,160 Q116,180 118,196" stroke="#f3e1c3" stroke-width="2.4" fill="none"/>
      <rect x="100" y="126" width="12" height="16" fill="#efe1c5"/><path d="M98,127 L106,116 L114,127Z" fill="#c8553d"/>
      ${[68, 92, 116, 140].map((x) => `<rect x="${x}" y="244" width="9" height="14" rx="4" fill="#8a6a4a"/>`).join('')}
      <rect x="150" y="236" width="70" height="54" fill="#f2c87e"/><path d="M146,238 L185,220 L224,238Z" fill="#b8482f"/>
      ${[160, 178, 196].map((x) => `<rect x="${x}" y="250" width="9" height="12" rx="1" fill="#7a5a3a"/>`).join('')}
      <path d="M0,288 L230,284 Q250,292 248,302 L0,306Z" fill="#c9a26b"/>`;
    const globe = `
      <ellipse cx="0" cy="58" rx="26" ry="6" fill="#5b3a1a"/><rect x="-3" y="30" width="6" height="28" fill="#7a5230"/>
      <circle r="30" fill="#2f86d1"/>
      <g clip-path="url(#mo-globe)">${at(0, 0, 1, `${[0, 120].map((o) => `<g transform="translate(${o} 0)" fill="#4fbf6a"><path d="M-40,-18 q12,-12 26,-4 q8,10 -4,18 q-6,14 -16,8 q-14,-6 -6,-22Z"/><path d="M0,-24 q14,-6 22,4 q-4,10 -14,8Z"/><path d="M8,4 q12,-4 18,8 q-2,16 -12,20 q-10,-10 -6,-28Z"/><path d="M40,-14 q16,-8 30,2 q4,12 -10,14 q-14,4 -20,-16Z"/></g>`).join('')}`, 'a-globe')}</g>
      <circle r="30" fill="none" stroke="#fff" stroke-width="1" opacity=".25"/><ellipse cx="-10" cy="-12" rx="9" ry="6" fill="#fff" opacity=".3"/>
      <path d="M-36,0 A36,36 0 0 1 36,0" stroke="#d4a52c" stroke-width="4" fill="none" transform="rotate(-20)"/>
      <path d="M0,-36 A36,36 0 0 1 0,36" stroke="#d4a52c" stroke-width="3" fill="none" transform="rotate(-20)"/>`;
    const monaLisa = `<rect x="-36" y="-50" width="72" height="92" rx="2" fill="#7a4f1e"/><rect x="-30" y="-44" width="60" height="80" fill="#5f6b45"/>
      <path d="M-30,-10 Q-10,-20 0,-14 Q14,-22 30,-12 L30,36 L-30,36Z" fill="#7c8a5a"/>
      <path d="M-14,36 Q-18,6 0,2 Q18,6 14,36Z" fill="#2e2a1f"/><path d="M-10,-6 Q-12,-30 0,-31 Q12,-30 10,-6 Q8,4 0,4 Q-8,4 -10,-6Z" fill="#2a1c12"/>
      <ellipse cx="0" cy="-15" rx="7" ry="9" fill="#e2b98a"/><path d="M-3,-10 Q0,-8 3,-10" stroke="#8a5a3a" stroke-width="1" fill="none"/>
      <path d="M-8,26 Q0,22 8,26" stroke="#e2b98a" stroke-width="4" stroke-linecap="round"/>`;
    return `<defs>
      ${lin('mo-sky', [[0, '#3aa0e8'], [0.7, '#a9dcff'], [1, '#fff0cf']])}
      ${lin('mo-sea', [[0, '#2295c9'], [1, '#0b4d78']])}
      <clipPath id="mo-globe"><circle r="30"/></clipPath>
    </defs>
    <rect width="800" height="500" fill="url(#mo-sky)"/>
    ${sun(630, 96, 38, '#fff6c6', '#fff3b0')}
    ${cloud(330, 70, 1, 0.95, 'a-drift', -2)}${cloud(720, 150, 0.7, 0.85, 'a-drift2', -7)}
    ${birds(120, 3, '#ffffff', 20, -3)}${birds(170, 2, '#ffffff', 28, -14, 0.8)}
    <rect y="270" width="800" height="230" fill="url(#mo-sea)"/>
    <rect y="270" width="800" height="6" fill="#bfe9ff" opacity=".5"/>
    <g stroke="#8fdcff" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".55">
      ${at(0, 0, 1, `<path d="M-80,300 q20,-6 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0"/>`, 'a-wave')}
      ${at(0, 0, 1, `<path d="M-80,340 q20,-6 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0"/>`, 'a-wave', 'animation-duration:9s')}
      ${at(0, 0, 1, `<path d="M-80,392 q20,-6 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0"/>`, 'a-wave', 'animation-duration:7s')}
    </g>
    ${city}
    ${caravel(272, 300, 0.42, { d: -1.5 })}${caravel(720, 292, 0.36, { d: -2.5 })}
    ${caravel(520, 362, 1.18, {})}
    <!-- muelle con el caballete -->
    <path d="M540,438 L800,430 L800,470 L540,476Z" fill="#a8763e"/><path d="M540,476 L800,470 L800,480 L540,486Z" fill="#7a5228"/>
    ${[560, 610, 660, 710, 760].map((x) => `<rect x="${x}" y="476" width="9" height="30" fill="#6b4423"/><line x1="${x + 30}" y1="440" x2="${x + 30}" y2="474" stroke="#8a5d2e" stroke-width="2"/>`).join('')}
    <path d="M700,450 L720,342 M760,450 L740,342 M730,450 L730,360" stroke="#6b4423" stroke-width="4" stroke-linecap="round"/>
    ${at(730, 382, 0.82, monaLisa)}
    <rect x="696" y="420" width="68" height="5" fill="#6b4423"/>
    ${person({ x: 664, y: 438, s: 0.78, skin: '#efc39b', top: '#7a2e3a', dress: true, hair: '#6b4a2b', hairStyle: 'long', hat: 'beret', act: 'paint' })}
    <!-- terraza del científico -->
    <path d="M0,380 L400,392 L400,500 L0,500Z" fill="#d8c29a"/>
    <path d="M0,380 L400,392 L400,398 L0,388Z" fill="#b89b6c"/>
    ${[...Array(12)].map((_, i) => `<path d="M${i * 34},${388 + i * 0.3} q-6,-8 0,-16 q6,-8 0,-16" stroke="#ece0c4" stroke-width="7" fill="none"/>`).join('')}
    <rect x="-4" y="346" width="410" height="9" rx="3" fill="#efe3c6" transform="rotate(1.6)"/>
    ${[...Array(9)].map((_, i) => `<path d="M${i * 50},500 L${i * 46 + 30},392" stroke="#c9b083" stroke-width="1.5"/>`).join('')}
    <!-- telescopio -->
    <path d="M78,452 L94,400 L110,452 M94,400 L94,452" stroke="#5b3a1a" stroke-width="4" stroke-linecap="round" fill="none"/>
    <g transform="rotate(-32 94 398)"><rect x="56" y="390" width="98" height="16" rx="5" fill="#c8962e"/><rect x="146" y="387" width="16" height="22" rx="4" fill="#9a6f1c"/><rect x="44" y="393" width="14" height="10" rx="3" fill="#7a5414"/><rect x="60" y="392" width="88" height="4" rx="2" fill="#fff" opacity=".35"/></g>
    <!-- globo terráqueo -->
    ${at(210, 404, 1, globe)}
    <!-- mesa con libro impreso -->
    <rect x="296" y="446" width="92" height="9" rx="2" fill="#7a4f28"/><rect x="304" y="455" width="7" height="40" fill="#6b4423"/><rect x="372" y="455" width="7" height="40" fill="#6b4423"/>
    <path d="M300,444 L340,436 L342,446 L302,452Z" fill="#fffaf0"/><path d="M342,446 L340,436 L382,442 L384,452Z" fill="#f6efe0"/>
    ${[0, 1, 2, 3].map((i) => `<path d="M${307 + i * 0.3},${446 - i * 2} l26,-5" stroke="#9aa0a6" stroke-width="1.4"/><path d="M${348},${440 + i * 2.4} l28,4" stroke="#9aa0a6" stroke-width="1.4"/>`).join('')}
    <rect x="384" y="426" width="10" height="20" rx="2" fill="#a8322d"/><rect x="394" y="430" width="9" height="16" rx="2" fill="#2f5fb3"/>
    `;
  };
  HS.moderna = [[520, 236], [340, 420], [764, 340], [100, 356], [236, 380]];

  // ================= EDAD CONTEMPORÁNEA =================
  S.contemporanea = () => {
    seed = 5;
    let back = '', front = '';
    for (let x = 230; x < 800; x += 34 + Math.floor(rnd() * 14)) {
      const h = 90 + rnd() * 120, w = 30 + rnd() * 14;
      back += `<rect x="${x}" y="${330 - h}" width="${w}" height="${h}" fill="#2b2f6e"/>`;
      for (let wy = 330 - h + 10; wy < 320; wy += 14) for (let wx = x + 5; wx < x + w - 6; wx += 9) if (rnd() > 0.45) back += `<rect x="${wx}" y="${wy}" width="5" height="7" fill="#ffd36b" class="${rnd() > 0.7 ? 'a-twinkle' : ''}" style="${delay((rnd() * 3).toFixed(1))}" opacity=".85"/>`;
    }
    for (let x = 300; x < 800; x += 70 + Math.floor(rnd() * 30)) {
      const h = 60 + rnd() * 80, w = 46 + rnd() * 20;
      front += `<rect x="${x}" y="${352 - h}" width="${w}" height="${h}" fill="#3a3f8f"/><rect x="${x}" y="${352 - h}" width="${w}" height="4" fill="#5a60b8"/>`;
      for (let wy = 352 - h + 10; wy < 344; wy += 13) for (let wx = x + 6; wx < x + w - 8; wx += 11) if (rnd() > 0.4) front += `<rect x="${wx}" y="${wy}" width="6" height="7" fill="#ffe08a" opacity=".9"/>`;
    }
    const train = `
      <rect x="86" y="-46" width="62" height="38" rx="4" fill="#5a3a2a"/><rect x="90" y="-56" width="54" height="12" rx="3" fill="#2b2b2b"/>
      <rect x="-40" y="-52" width="88" height="40" rx="18" fill="#2b2d42"/><rect x="-40" y="-40" width="88" height="5" fill="#d62828"/>
      <rect x="40" y="-78" width="40" height="66" rx="4" fill="#d62828"/><rect x="46" y="-70" width="28" height="18" rx="3" fill="#ffe08a"/><rect x="36" y="-84" width="48" height="8" rx="3" fill="#2b2d42"/>
      <path d="M-20,-52 L-24,-80 L-4,-80 L-8,-52Z" fill="#2b2d42"/><rect x="-27" y="-86" width="26" height="8" rx="3" fill="#3d405b"/>
      <circle cx="-40" cy="-32" r="7" fill="#ffd36b"/><path d="M-48,-8 L-62,4 L-40,4Z" fill="#d62828"/>
      ${[[102, 9], [132, 9], [-14, 12], [18, 12], [58, 14]].map(([x, r]) => at(x, -6, 1, `<circle r="${r}" fill="#1b1b24"/><circle r="${r - 3}" fill="#e63946"/><path d="M${-r + 3},0 H${r - 3} M0,${-r + 3} V${r - 3}" stroke="#1b1b24" stroke-width="2"/><circle r="2.2" fill="#1b1b24"/>`, 'a-spin', 'animation-duration:1.4s')).join('')}
      <rect x="-30" y="-10" width="100" height="3" fill="#888" opacity=".7"/><rect x="80" y="-14" width="10" height="4" fill="#1b1b24"/>`;
    return `<defs>
      ${lin('ct-sky', [[0, '#0d1033'], [0.55, '#2c2468'], [0.85, '#a6457e'], [1, '#ff8f6b']])}
      ${rad('ct-moon', [[0, '#fff7d6', 0.6], [1, '#fff7d6', 0]])}
      ${rad('ct-lamp', [[0, '#fff3b0', 0.9], [0.4, '#ffd36b', 0.35], [1, '#ffd36b', 0]])}
      ${lin('ct-screen', [[0, '#5ee7ff'], [1, '#7b5cff']], 1, 1)}
    </defs>
    <rect width="800" height="500" fill="url(#ct-sky)"/>
    ${stars(50, 200)}
    <circle cx="690" cy="82" r="80" fill="url(#ct-moon)"/>
    <circle cx="690" cy="82" r="34" fill="#fff6d6"/><circle cx="678" cy="72" r="7" fill="#e8dcb4"/><circle cx="700" cy="94" r="9" fill="#e8dcb4"/><circle cx="702" cy="68" r="4" fill="#e8dcb4"/>
    ${at(612, 150, 1, `<g transform="rotate(40)"><path d="M0,-34 Q12,-20 10,10 L-10,10 Q-12,-20 0,-34Z" fill="#f1f3f8"/><circle cy="-10" r="5" fill="#5ee7ff" stroke="#3d405b" stroke-width="2"/><path d="M-10,0 L-18,14 L-10,12Z M10,0 L18,14 L10,12Z" fill="#e63946"/>${at(0, 12, 1, `<path d="M-6,0 Q0,22 6,0Z" fill="#ffb52e"/><path d="M-3,0 Q0,12 3,0Z" fill="#fff1a0"/>`, 'a-flicker')}</g>`, 'a-rocket')}
    ${at(0, 52, 1, `<path d="M-30,0 L30,0 M8,0 L-4,-14 L2,-14 L18,0 M8,0 L-4,14 L2,14 L18,0" stroke="#e8ecf5" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M-30,0 L-200,0" stroke="#fff" stroke-width="2" opacity=".3"/>`, 'a-fly', 'animation-duration:24s')}
    ${back}
    <!-- edificio antiguo con la bandera de Francia -->
    <rect x="46" y="200" width="130" height="150" fill="#d9c7a8"/><rect x="46" y="200" width="130" height="10" fill="#c2ae8c"/>
    <path d="M86,200 Q111,150 136,200Z" fill="#6f7fa8"/>
    ${[60, 84, 108, 132, 156].map((x) => `<rect x="${x - 6}" y="226" width="12" height="20" rx="6" fill="#ffd36b" opacity=".9"/><rect x="${x - 6}" y="270" width="12" height="20" rx="6" fill="#ffd36b" opacity=".75"/>`).join('')}
    ${flagPole(111, 160, 60, 'fra', 46, 30, '#cfcfd8')}
    <!-- fábrica -->
    <rect x="190" y="262" width="150" height="90" fill="#a2462f"/>
    <path d="M190,262 L220,240 L220,262 L250,240 L250,262 L280,240 L280,262 L310,240 L310,262 L340,240 L340,262Z" fill="#8a3a26"/>
    <rect x="212" y="180" width="18" height="82" fill="#7d3322"/><rect x="292" y="196" width="18" height="66" fill="#7d3322"/><rect x="208" y="176" width="26" height="8" fill="#5e2619"/><rect x="288" y="192" width="26" height="8" fill="#5e2619"/>
    ${smoke(221, 170, 3, 12, '#b8b2c8', 5)}${smoke(301, 186, 3, 11, '#b8b2c8', 6)}
    ${[200, 230, 260, 290, 318].map((x) => `<rect x="${x}" y="290" width="16" height="22" fill="#ffcf6b" opacity=".8"/>`).join('')}
    ${front}
    <!-- vías y tren -->
    <rect y="352" width="800" height="148" fill="#24254f"/>
    <rect y="420" width="800" height="5" fill="#8a8fb5"/><rect y="432" width="800" height="5" fill="#8a8fb5"/>
    ${[...Array(27)].map((_, i) => `<rect x="${i * 30}" y="418" width="16" height="22" fill="#4a3a3a"/>`).join('')}
    <rect y="420" width="800" height="5" fill="#a5abd0"/>
    ${smoke(404, 324, 4, 15, '#f1f1f6', 3.2)}
    ${at(420, 426, 1.05, train)}
    <!-- farol -->
    <circle cx="66" cy="318" r="70" fill="url(#ct-lamp)" class="a-glow"/>
    <rect x="62" y="330" width="8" height="160" fill="#1b1c3a"/><rect x="52" y="484" width="28" height="10" rx="3" fill="#1b1c3a"/>
    <path d="M50,330 L82,330 L76,306 L56,306Z" fill="#1b1c3a"/><circle cx="66" cy="318" r="9" fill="#fff3b0"/><path d="M62,318 q4,-6 8,0" stroke="#e8a12e" stroke-width="1.6" fill="none"/>
    <!-- computador y celular -->
    <rect x="620" y="452" width="150" height="10" rx="3" fill="#6b5a9e"/><rect x="632" y="462" width="8" height="34" fill="#4c3f7a"/><rect x="750" y="462" width="8" height="34" fill="#4c3f7a"/>
    <rect x="642" y="384" width="96" height="64" rx="6" fill="#1b1c2e"/><rect x="648" y="390" width="84" height="52" rx="3" fill="url(#ct-screen)"/>
    ${at(690, 416, 1, `<circle r="14" fill="none" stroke="#fff" stroke-width="2"/><ellipse rx="6" ry="14" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M-14,0 H14 M-12,-7 H12 M-12,7 H12" stroke="#fff" stroke-width="1.4"/>`, 'a-bob')}
    <path d="M632,448 L748,448 L756,454 L624,454Z" fill="#2b2c44"/>
    <rect x="752" y="414" width="22" height="38" rx="4" fill="#1b1c2e"/><rect x="755" y="418" width="16" height="28" rx="2" fill="#5ee7ff"/>
    ${at(763, 428, 1, `<rect x="-6" y="-4" width="12" height="7" rx="3" fill="#fff"/><rect x="-5" y="6" width="10" height="5" rx="2.5" fill="#ffd36b"/>`, 'a-glow')}
    `;
  };
  HS.contemporanea = [[112, 128], [430, 366], [66, 300], [690, 96], [690, 400]];

  // ================= ÉPOCA PRECOLOMBINA =================
  S.precolombina = () => {
    const balsa = `
      <ellipse cx="0" cy="6" rx="78" ry="10" fill="#0f6b6f" opacity=".5"/>
      <path d="M-62,-4 L62,-4 L56,8 L-56,8Z" fill="url(#pc-gold)"/>${[-44, -22, 0, 22, 44].map((x) => `<line x1="${x}" y1="-4" x2="${x}" y2="8" stroke="#a87400" stroke-width="1.5"/>`).join('')}
      ${[-48, -32, 32, 48].map((x, i) => `<g transform="translate(${x} -4)"><rect x="-5" y="-22" width="10" height="22" rx="2" fill="url(#pc-gold)"/><circle cy="-27" r="5.5" fill="url(#pc-gold)"/><path d="M-7,-31 L0,-38 L7,-31" fill="#e0a800"/><line x1="${i < 2 ? 6 : -6}" y1="-14" x2="${i < 2 ? 18 : -18}" y2="14" stroke="#c68a00" stroke-width="2"/></g>`).join('')}
      <g transform="translate(0 -4)"><path d="M-12,0 L-10,-38 L10,-38 L12,0Z" fill="url(#pc-gold)"/><circle cy="-46" r="9" fill="url(#pc-gold)"/>
        <path d="M-18,-50 L-12,-66 L-4,-56 L0,-70 L4,-56 L12,-66 L18,-50Z" fill="#ffd84a"/><rect x="-6" y="-48" width="3" height="3" fill="#8a5a00"/><rect x="3" y="-48" width="3" height="3" fill="#8a5a00"/>
        <path d="M-10,-30 L-22,-18 M10,-30 L22,-18" stroke="#e0a800" stroke-width="3" stroke-linecap="round"/></g>
      ${[[-60, -60], [-20, -84], [30, -70], [66, -40], [10, -100]].map(([x, y], i) => at(x, y, 1, `<path d="M0,-7 L2,-2 L7,0 L2,2 L0,7 L-2,2 L-7,0 L-2,-2Z" fill="#fff6b0"/>`, 'a-twinkle', delay(i * 0.5))).join('')}`;
    const statue = `
      <ellipse cx="0" cy="4" rx="58" ry="10" fill="#2f6b3f" opacity=".5"/>
      <rect x="-34" y="-74" width="68" height="78" rx="10" fill="#8f968f"/>
      <rect x="-46" y="-150" width="92" height="82" rx="16" fill="#9ca39b"/>
      <rect x="-50" y="-160" width="100" height="18" rx="6" fill="#868d86"/>
      <path d="M-30,-128 q10,-8 20,0 q-10,8 -20,0Z M10,-128 q10,-8 20,0 q-10,8 -20,0Z" fill="#5e655e"/>
      <circle cx="-20" cy="-128" r="3.5" fill="#3a3f3a"/><circle cx="20" cy="-128" r="3.5" fill="#3a3f3a"/>
      <path d="M-8,-120 L-12,-100 L12,-100 L8,-120Z" fill="#7d847d"/>
      <rect x="-26" y="-94" width="52" height="16" rx="5" fill="#5e655e"/>
      <path d="M-20,-94 L-16,-84 L-12,-94 M12,-94 L16,-84 L20,-94" fill="#d9ddd6"/><path d="M-26,-86 H26" stroke="#3a3f3a" stroke-width="1.5"/>
      <path d="M-34,-56 Q-18,-44 -6,-56 M34,-56 Q18,-44 6,-56" stroke="#6f766f" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M-46,-118 q-8,6 -2,16 M46,-118 q8,6 2,16" stroke="#868d86" stroke-width="6" fill="none"/>
      <path d="M-40,-150 q14,-8 24,2 q-14,6 -24,-2Z M18,-146 q12,-6 22,0 q-10,8 -22,0Z M-30,-20 q12,-6 20,2 q-12,4 -20,-2Z" fill="#5f9e55" opacity=".85"/>`;
    const poporo = `<ellipse cx="0" cy="10" rx="36" ry="7" fill="#2f6b3f" opacity=".5"/>
      <path d="M-30,10 L-26,-8 L26,-8 L30,10Z" fill="#7d847d"/>
      <path d="M0,-12 Q-26,-14 -24,-38 Q-22,-60 -8,-62 L-6,-74 Q-12,-78 -10,-84 L10,-84 Q12,-78 6,-74 L8,-62 Q22,-60 24,-38 Q26,-14 0,-12Z" fill="url(#pc-gold)"/>
      <circle cx="-8" cy="-88" r="6" fill="url(#pc-gold)"/><circle cx="8" cy="-88" r="6" fill="url(#pc-gold)"/>
      <circle cx="-12" cy="-34" r="4" fill="#a87400" opacity=".6"/><circle cx="12" cy="-34" r="4" fill="#a87400" opacity=".6"/>
      <ellipse cx="-12" cy="-46" rx="5" ry="10" fill="#fff6b0" opacity=".55"/>
      ${[[-28, -70], [26, -56], [0, -104]].map(([x, y], i) => at(x, y, 1, `<path d="M0,-6 L1.6,-1.6 L6,0 L1.6,1.6 L0,6 L-1.6,1.6 L-6,0 L-1.6,-1.6Z" fill="#fff6b0"/>`, 'a-twinkle', delay(i * 0.6))).join('')}`;
    const maize = (x, y, s, d) => at(x, y, s, `<path d="M0,0 Q-3,-60 2,-118" stroke="#4f9e3a" stroke-width="5" fill="none"/>
      <path d="M0,-30 Q-30,-46 -44,-30 Q-22,-36 0,-26Z M2,-52 Q32,-70 46,-54 Q24,-60 2,-46Z M0,-78 Q-28,-98 -40,-84 Q-20,-88 0,-72Z" fill="#5cb945"/>
      <g transform="translate(6 -64) rotate(18)"><ellipse rx="7" ry="17" fill="#f5c518"/><path d="M-4,-12 v24 M0,-14 v28 M4,-12 v24" stroke="#d9a400" stroke-width="1.2"/><path d="M-7,6 Q-10,-10 -3,-20 M7,6 Q10,-10 3,-20" stroke="#8fcf5a" stroke-width="3" fill="none"/></g>
      <path d="M2,-118 l-6,-12 M2,-118 l2,-14 M2,-118 l8,-10" stroke="#d9b45a" stroke-width="2"/>`, 'a-sway', delay(d));
    const macaw = `<path d="M6,10 Q16,44 10,70 Q4,44 -2,12Z" fill="#e63946"/><path d="M8,14 Q20,40 18,62 Q10,40 4,16Z" fill="#3b82f6"/>
      <ellipse cx="0" cy="0" rx="12" ry="18" fill="#e63946"/><path d="M-6,-2 Q4,14 12,4 Q8,-8 -6,-2Z" fill="#f5c518"/><path d="M-4,6 Q6,22 14,10 Q10,2 -4,6Z" fill="#3b82f6"/>
      <circle cx="-2" cy="-18" r="9" fill="#e63946"/><circle cx="-5" cy="-20" r="4" fill="#fff"/><circle cx="-5.5" cy="-20" r="1.8" fill="#111"/>
      <path d="M-10,-18 Q-18,-14 -12,-8 Q-10,-12 -8,-14Z" fill="#e9e3d6"/>`;
    return `<defs>
      ${lin('pc-sky', [[0, '#49b6f0'], [1, '#d9f4ff']])}
      ${lin('pc-lake', [[0, '#34c3b5'], [1, '#147a85']])}
      ${lin('pc-gold', [[0, '#fff1a8'], [0.45, '#f5c518'], [1, '#b27b00']], 1, 1)}
    </defs>
    <rect width="800" height="500" fill="url(#pc-sky)"/>
    ${sun(110, 70, 30, '#fff6c4', '#fff3b0')}
    ${cloud(360, 64, 0.9, 0.95, 'a-drift', -2)}${cloud(640, 40, 0.7, 0.85, 'a-drift2', -5)}
    <!-- Sierra Nevada con nieve -->
    <path d="M500,250 L590,128 L640,180 L690,110 L780,230 L800,250Z" fill="#8fa8c4"/>
    <path d="M572,152 L590,128 L606,150 L596,146 L588,156 L580,148Z M675,130 L690,110 L706,134 L696,130 L688,140 L682,132Z" fill="#fff"/>
    <path d="M0,250 Q90,190 200,220 Q300,170 420,214 Q540,200 640,236 Q720,220 800,240 L800,500 L0,500Z" fill="#7cc48a"/>
    <!-- Ciudad Perdida (taironas) -->
    <path d="M500,360 Q560,210 660,180 Q760,190 800,240 L800,380Z" fill="#3f9a5a"/>
    ${[[650, 205, 54], [628, 238, 70], [612, 274, 84], [600, 312, 96]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.22}" fill="#6fa36a"/><path d="M${x - r},${y} A${r},${r * 0.22} 0 0 0 ${x + r},${y}" stroke="#a7b8a0" stroke-width="5" fill="none"/>`).join('')}
    ${[[640, 202], [668, 200], [606, 234], [650, 236], [590, 270], [636, 272], [680, 268]].map(([x, y]) => `<g transform="translate(${x} ${y})"><rect x="-7" y="-10" width="14" height="10" fill="#c9a26b"/><path d="M-11,-9 L0,-26 L11,-9Z" fill="#d9b45a"/><path d="M0,-26 v-5" stroke="#8a6a2a" stroke-width="2"/></g>`).join('')}
    ${at(560, 190, 1, `<ellipse rx="90" ry="12" fill="#fff" opacity=".5"/>`, 'a-drift2')}
    <!-- laguna de Guatavita -->
    <ellipse cx="236" cy="320" rx="214" ry="74" fill="#3c9156"/>
    <ellipse cx="236" cy="326" rx="176" ry="54" fill="url(#pc-lake)"/>
    <g stroke="#bff6ee" stroke-width="2" opacity=".5" fill="none" stroke-linecap="round">${at(0, 0, 1, `<path d="M120,312 q12,-4 24,0 M300,344 q12,-4 24,0 M170,352 q12,-4 24,0 M330,306 q12,-4 24,0 M90,334 q12,-4 24,0"/>`, 'a-shimmer')}</g>
    ${at(236, 330, 0.95, balsa, 'a-rock')}
    <!-- primer plano -->
    <path d="M0,392 Q200,368 420,392 Q620,412 800,388 L800,500 L0,500Z" fill="#5aad55"/>
    ${grassTufts(400, 30, '#3e8a3e')}
    <!-- árbol con guacamaya -->
    <path d="M-10,500 Q20,380 0,250" stroke="#6b4423" stroke-width="22" fill="none"/>
    <path d="M0,330 Q40,316 70,318" stroke="#6b4423" stroke-width="9" fill="none" stroke-linecap="round"/>
    <g fill="#2f8a43"><circle cx="0" cy="236" r="46"/><circle cx="40" cy="214" r="34"/><circle cx="-20" cy="196" r="30"/></g>
    ${at(56, 300, 1, macaw, 'a-bob')}
    ${at(352, 470, 1, poporo)}
    ${at(486, 474, 0.9, statue)}
    ${at(626, 488, 1, `<path d="M-26,0 Q-34,-26 -14,-38 L-10,-48 L10,-48 L14,-38 Q34,-26 26,0Z" fill="#c8673a"/><path d="M-24,-20 H24 M-28,-12 H28" stroke="#f3d9a6" stroke-width="3"/><path d="M-20,-28 l6,6 l6,-6 l6,6 l6,-6 l6,6" stroke="#5b2a12" stroke-width="2" fill="none"/>`)}
    ${maize(700, 470, 0.95, 0)}${maize(744, 480, 1.05, -1)}${maize(782, 468, 0.85, -2)}
    `;
  };
  HS.precolombina = [[300, 300], [632, 236], [540, 340], [392, 392], [740, 400]];

  // ================= LA CONQUISTA =================
  S.conquista = () => {
    const chest = `<ellipse cx="0" cy="4" rx="44" ry="8" fill="#b88a3e" opacity=".5"/>
      <rect x="-32" y="-26" width="64" height="30" rx="4" fill="#8b5a2b"/><rect x="-32" y="-14" width="64" height="5" fill="#d4a52c"/><rect x="-5" y="-20" width="10" height="12" rx="2" fill="#d4a52c"/>
      <path d="M-32,-26 Q-30,-56 0,-58 Q30,-56 32,-26" fill="#a06a34" transform="rotate(-24 -32 -26)"/>
      <g fill="#f5c518">${[[-20, -28], [-8, -32], [6, -30], [18, -27], [-14, -36], [10, -38], [0, -42]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="4" stroke="#c68a00" stroke-width="1"/>`).join('')}</g>
      ${[[-30, -52], [20, -62], [36, -40]].map(([x, y], i) => at(x, y, 1, `<path d="M0,-6 L1.6,-1.6 L6,0 L1.6,1.6 L0,6 L-1.6,1.6 L-6,0 L-1.6,-1.6Z" fill="#fff6b0"/>`, 'a-twinkle', delay(i * 0.5))).join('')}`;
    const village = `<path d="M-60,0 Q0,-30 70,0Z" fill="#6cbf62"/>
      ${house(-50, -8, 26, 18, '#f3e3c3', '#b9842a', { roofH: 14 })}${house(-14, -12, 30, 22, '#efe0bf', '#a8752a', { roofH: 16 })}
      <rect x="24" y="-44" width="20" height="38" fill="#f6efe2"/><path d="M22,-44 L34,-58 L46,-44Z" fill="#c0533a"/><path d="M34,-58 v-12 M29,-65 h10" stroke="#5b3a1a" stroke-width="2.4"/>
      ${[...Array(10)].map((_, i) => `<rect x="${-62 + i * 13}" y="-12" width="5" height="16" rx="2" fill="#8a5d2e"/>`).join('')}
      ${flagPole(52, -6, 52, 'burgundy', 26, 17, '#5b3a1a')}`;
    return `<defs>
      ${lin('cq-sky', [[0, '#38b0f5'], [1, '#c9f1ff']])}
      ${lin('cq-sea', [[0, '#1ec7d0'], [1, '#0e7cb0']])}
      ${lin('cq-sand', [[0, '#f8e2a6'], [1, '#e9c47a']])}
    </defs>
    <rect width="800" height="500" fill="url(#cq-sky)"/>
    ${sun(700, 70, 32, '#fff8cc', '#fff6b0')}
    ${cloud(180, 70, 0.9, 0.95, 'a-drift', -1)}${cloud(470, 46, 0.7, 0.9, 'a-drift2', -6)}
    ${birds(110, 3, '#ffffff', 20, -8)}
    <!-- Sierra Nevada al fondo -->
    <path d="M0,250 L80,140 L130,190 L190,120 L270,230 L320,250Z" fill="#7f9fc0"/>
    <path d="M64,162 L80,140 L96,164 L86,160 L80,170 L72,162Z M176,140 L190,120 L206,144 L196,140 L190,150 L184,142Z" fill="#fff"/>
    <path d="M0,262 Q120,200 260,236 Q330,226 360,270 L0,290Z" fill="#4fae60"/>
    <rect y="262" width="800" height="140" fill="url(#cq-sea)"/>
    <rect y="262" width="800" height="5" fill="#d8fbff" opacity=".6"/>
    <g stroke="#c8f7ff" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".6">
      ${at(0, 0, 1, `<path d="M-80,292 q20,-6 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0"/>`, 'a-wave')}
      ${at(0, 0, 1, `<path d="M-80,330 q20,-6 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0"/>`, 'a-wave', 'animation-duration:8s')}
    </g>
    ${caravel(604, 322, 0.95, { flag: 'burgundy', cross: '#c8102e' })}
    ${at(430, 356, 0.8, `<path d="M-34,0 Q0,12 34,0 L28,-8 L-28,-8Z" fill="#7a4a22"/>${person({ x: -12, y: -6, s: 0.42, top: '#b03a2e', armor: true, hat: 'morrion', skin: '#f0c49c', act: 'row' })}${person({ x: 12, y: -6, s: 0.42, top: '#7a2e8e', hat: 'morrion', skin: '#e9b48a', act: 'row' })}<line x1="20" y1="-4" x2="44" y2="10" stroke="#5b3a1a" stroke-width="2.5"/>`, 'a-rock', delay(-1))}
    <!-- playa -->
    <path d="M0,360 Q240,332 420,372 Q610,414 800,398 L800,500 L0,500Z" fill="url(#cq-sand)"/>
    <g fill="none" stroke="#fff" stroke-width="4" opacity=".75" stroke-linecap="round">${at(0, 0, 1, `<path d="M380,370 Q420,366 450,378 M520,394 Q560,390 600,404 M660,402 Q700,398 740,404"/>`, 'a-foam')}</g>
    ${at(736, 390, 1, village)}
    ${palm(58, 420, 1.15, 0, 18)}${palm(150, 424, 0.95, -1.5, -12)}${palm(250, 380, 0.7, -0.7, 10)}
    <!-- pueblo indígena -->
    ${person({ x: 112, y: 474, s: 0.95, skin: '#b9774a', top: '#efe2c0', dress: true, hair: '#1d120b', hairStyle: 'long', hat: 'feathers', item: 'bow', arm: 'out', act: 'look' })}
    ${person({ x: 186, y: 468, s: 0.9, skin: '#a96a40', top: '#e4d1a2', bottom: '#c8b07a', hair: '#1d120b', hairStyle: 'short', hat: 'feathers', item: 'spear', arm: 'up', act: 'shake' })}
    <!-- conquistador -->
    ${person({ x: 330, y: 470, s: 1.08, skin: '#f0c49c', top: '#b03a2e', sleeve: '#b03a2e', bottom: '#d9a441', armor: true, hat: 'morrion', item: 'flag', flag: 'burgundy', arm: 'up', boots: true, belt: '#5b3a1a', act: 'raise' })}
    ${at(470, 478, 1, chest)}
    `;
  };
  HS.conquista = [[604, 220], [282, 360], [740, 340], [470, 430], [148, 382]];

  // ================= LA COLONIA =================
  S.colonia = () => {
    const garita = `<rect x="-26" y="-70" width="52" height="70" rx="6" fill="#d8bf8f"/><rect x="10" y="-70" width="16" height="70" fill="#000" opacity=".1"/>
      <path d="M-30,-70 Q0,-112 30,-70Z" fill="#cdb07a"/><circle cx="0" cy="-102" r="5" fill="#cdb07a"/><rect x="-32" y="-74" width="64" height="7" rx="3" fill="#e6d2a6"/>
      <rect x="-4" y="-56" width="8" height="22" rx="4" fill="#3b2a20"/><rect x="-20" y="-50" width="5" height="14" rx="2.5" fill="#3b2a20"/>`;
    const notice = `<rect x="-3" y="-60" width="6" height="60" fill="#6b4423"/><rect x="-30" y="-92" width="60" height="44" rx="3" fill="#8b5a2b"/>
      <path d="M-22,-86 L18,-84 L20,-56 L-6,-54 L-4,-62 L-20,-58Z" fill="#fff6dc"/><path d="M-4,-62 L-6,-54 L-12,-66Z" fill="#e9dcb8"/>
      ${[-78, -72, -66].map((y) => `<path d="M-16,${y} h28" stroke="#9a8a6a" stroke-width="1.6"/>`).join('')}<circle cx="0" cy="-88" r="2.4" fill="#c62828"/>
      ${at(24, -48, 1, `<path d="M0,0 L10,6 L4,12Z" fill="#fff6dc"/>`, 'a-fall')}`;
    const plant = `<path d="M-18,0 L-22,-30 L22,-30 L18,0Z" fill="#c0533a"/><rect x="-24" y="-34" width="48" height="6" rx="2" fill="#a8432e"/>
      <path d="M0,-32 Q-4,-70 2,-96" stroke="#3f8a3a" stroke-width="4" fill="none"/>
      <path d="M0,-50 Q-40,-66 -46,-40 Q-24,-50 0,-46Z M2,-64 Q40,-84 48,-56 Q24,-66 2,-60Z" fill="#4fae4a"/>
      ${at(2, -100, 1, `${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-12" rx="7" ry="13" fill="#ec3d8c" transform="rotate(${a})"/>`).join('')}<circle r="5" fill="#f5c518"/>`, 'a-spin-slow')}
      ${at(-30, -84, 1, `<path d="M0,0 Q-6,-16 4,-22 Q6,-10 0,0Z" fill="#f28c28"/><path d="M0,0 Q8,-14 2,-24" stroke="#f5c518" stroke-width="2" fill="none"/>`, 'a-sway')}`;
    const easel = `<path d="M-26,0 L-10,-110 M26,0 L10,-110 M0,0 L0,-96" stroke="#7a5230" stroke-width="4" stroke-linecap="round"/>
      <rect x="-30" y="-112" width="60" height="70" rx="2" fill="#fbf4e2" stroke="#c9b28a"/>
      <path d="M0,-50 Q-2,-76 2,-100" stroke="#4f8f3a" stroke-width="2" fill="none"/><path d="M0,-66 Q-18,-76 -22,-62 Q-10,-66 0,-62Z M1,-80 Q18,-92 22,-78 Q10,-82 1,-76Z" fill="#7cbf6a"/>
      <circle cx="2" cy="-102" r="6" fill="#ec3d8c" opacity=".8"/><rect x="-32" y="-44" width="64" height="5" fill="#7a5230"/>`;
    return `<defs>
      ${lin('co-sky', [[0, '#48b8f2'], [1, '#fff1cf']])}
      ${lin('co-sea', [[0, '#2bb3d6'], [1, '#147aa8']])}
      ${lin('co-wall', [[0, '#d9c08f'], [1, '#b89a64']])}
    </defs>
    <rect width="800" height="500" fill="url(#co-sky)"/>
    ${sun(90, 70, 30, '#fff6c8', '#fff2b0')}
    ${cloud(300, 54, 0.9, 0.95, 'a-drift', -3)}${cloud(620, 80, 0.7, 0.9, 'a-drift2', -1)}
    ${birds(110, 3, '#ffffff', 22, -5)}
    <rect y="236" width="800" height="140" fill="url(#co-sea)"/>
    <g stroke="#c8f3ff" stroke-width="2" opacity=".55" fill="none">${at(0, 0, 1, `<path d="M-80,260 q20,-5 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0"/>`, 'a-wave')}</g>
    ${at(724, 252, 0.34, caravel(0, 0, 1, { sail: '#3a3a44', cross: 'none', hull: '#3b2a20', flag: 'pirate' }))}
    <!-- Castillo de San Felipe en la colina -->
    <path d="M0,250 Q80,170 220,200 Q260,214 280,250Z" fill="#5fae5c"/>
    <path d="M40,226 L70,196 L180,196 L208,226Z" fill="#c9ad78"/><path d="M70,196 L90,176 L160,176 L180,196Z" fill="#d6bc88"/><path d="M96,176 L106,162 L144,162 L154,176Z" fill="#e1c996"/>
    ${flagPole(126, 162, 26, 'spain', 22, 14, '#5b3a1a')}
    <!-- ciudad -->
    <rect x="130" y="250" width="590" height="110" fill="#e9d2a8"/>
    ${colonialHouse(130, 360, 64, 82, '#f6c445', { flowerC: '#ec3d8c' })}
    ${colonialHouse(194, 360, 58, 96, '#4a90d9', { door: '#7a4a24', flowerC: '#ff8fc8' })}
    ${colonialHouse(252, 360, 60, 74, '#f2785c', { flowerC: '#ffd23f' })}
    <!-- iglesia -->
    <rect x="320" y="200" width="104" height="160" fill="#f3dfb8"/><rect x="414" y="200" width="10" height="160" fill="#000" opacity=".08"/>
    <path d="M314,202 L372,170 L430,202Z" fill="#e6c98f"/>
    <rect x="340" y="100" width="40" height="100" fill="#f3dfb8"/><path d="M336,102 Q360,60 384,102Z" fill="#e0a452"/><path d="M360,66 v-16 M354,58 h12" stroke="#6b4423" stroke-width="3"/>
    <path d="M352,140 v-14 a8,8 0 0 1 16,0 v14Z" fill="#6b4423"/><circle cx="360" cy="168" r="7" fill="#6b4423"/>
    <circle cx="398" cy="236" r="10" fill="#c9a26b"/><path d="M356,360 v-36 a16,16 0 0 1 32,0 v36Z" fill="#7a4a24"/>
    <!-- palacio del virrey -->
    <rect x="430" y="214" width="174" height="146" fill="#fff5e2"/><rect x="430" y="208" width="174" height="10" fill="#c0533a"/><path d="M490,210 L517,184 L544,210Z" fill="#fff5e2"/><path d="M486,211 L517,181 L548,211" stroke="#c0533a" stroke-width="5" fill="none"/>
    ${[446, 480, 514, 548, 582].map((x) => `<path d="M${x - 10},360 v-30 a10,10 0 0 1 20,0 v30Z" fill="#c9a26b"/>`).join('')}
    <rect x="440" y="276" width="154" height="10" fill="#e6d2b0"/>
    <rect x="478" y="236" width="78" height="10" fill="#7a4a24"/>${[...Array(12)].map((_, i) => `<rect x="${481 + i * 6.3}" y="246" width="2" height="12" fill="#7a4a24"/>`).join('')}<rect x="478" y="256" width="78" height="4" fill="#7a4a24"/>
    ${person({ x: 517, y: 258, s: 0.42, skin: '#f1c6a0', top: '#b0263a', bottom: '#f1f1f4', hairStyle: 'wig', hat: 'tricorn', arm: 'wave', act: 'wave' })}
    ${at(517, 190, 1, `<path d="M-12,-8 L12,-8 L12,6 Q12,16 0,20 Q-12,16 -12,6Z" fill="#c62828"/><path d="M0,-8 V18 M-12,4 H12" stroke="#f5c518" stroke-width="3"/><path d="M-12,-10 L-12,-20 L-6,-14 L0,-22 L6,-14 L12,-20 L12,-10Z" fill="#f5c518"/>`)}
    ${colonialHouse(606, 360, 62, 88, '#5cc8a8', { flowerC: '#ec3d8c' })}
    ${colonialHouse(668, 360, 56, 70, '#ef6fa0', { flowerC: '#fff' })}
    <!-- muralla -->
    <rect x="0" y="352" width="800" height="56" fill="url(#co-wall)"/>
    ${[...Array(20)].map((_, i) => `<path d="M${i * 42},352 h30 v-14 a15,10 0 0 0 -30,0Z" fill="#d9c08f"/>`).join('')}
    ${[...Array(36)].map((_, i) => `<rect x="${(i % 12) * 68 + (Math.floor(i / 12) % 2) * 34}" y="${362 + Math.floor(i / 12) * 14}" width="30" height="8" rx="2" fill="#000" opacity=".06"/>`).join('')}
    <!-- paseo de la muralla -->
    ${cobble(408, 500, '#c7ab78', '#b89c68')}
    ${at(716, 412, 1.05, garita)}
    <!-- cañón -->
    <g transform="translate(600 400)"><rect x="-6" y="-24" width="64" height="16" rx="7" fill="#2b2b33" transform="rotate(-10)"/><circle cx="0" cy="-8" r="12" fill="#5b3a1a"/><circle cx="0" cy="-8" r="5" fill="#2b1d12"/><rect x="-26" y="-6" width="40" height="8" rx="3" fill="#6b4423"/></g>
    ${[[628, 420], [640, 424], [634, 412]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.5" fill="#2b2b33"/>`).join('')}
    <!-- personas: mezcla de culturas -->
    ${person({ x: 76, y: 468, s: 0.92, skin: '#a86b45', top: '#f2ecdc', dress: true, hair: '#1b120c', hairStyle: 'long', arm: 'out', act: 'talk' })}
    ${person({ x: 132, y: 474, s: 0.98, skin: '#5a3825', top: '#f6f3ea', bottom: '#7a6a52', hair: '#16100b', hairStyle: 'curly', hat: 'straw', arm: 'wave', act: 'wave' })}
    ${person({ x: 190, y: 470, s: 0.96, skin: '#f1c6a0', top: '#3a5a8a', bottom: '#2b2b3a', hat: 'widebrim', arm: 'down', boots: true, act: 'look' })}
    ${at(318, 480, 1, notice)}
    ${at(470, 488, 0.9, plant)}${at(548, 486, 0.8, easel)}
    `;
  };
  HS.colonia = [[552, 224], [716, 330], [134, 342], [362, 166], [500, 420], [318, 410]];

  // ================= LA INDEPENDENCIA =================
  S.independencia = () => {
    const florero = `<ellipse cx="0" cy="2" rx="40" ry="7" fill="#000" opacity=".15"/>
      <rect x="-34" y="-8" width="68" height="8" rx="2" fill="#7a4a24"/><rect x="-28" y="0" width="6" height="34" fill="#6b4423"/><rect x="22" y="0" width="6" height="34" fill="#6b4423"/>
      ${at(0, -40, 1, `<path d="M-48,0 L-30,-10 L-36,-30 L-14,-22 L-4,-44 L8,-24 L30,-34 L24,-12 L46,-2 L26,8 L34,28 L12,18 L2,40 L-8,18 L-30,26 L-24,6Z" fill="#ffd23f" opacity=".85"/>`, 'a-pulse')}
      <path d="M-10,-8 Q-22,-24 -14,-42 Q-10,-50 -8,-56 L8,-56 Q10,-50 14,-42 Q22,-24 10,-8Z" fill="#f6f8ff"/>
      <path d="M-15,-30 Q0,-24 15,-30 M-12,-42 Q0,-38 12,-42" stroke="#3b6fd6" stroke-width="3" fill="none"/><circle cx="0" cy="-20" r="3.5" fill="#3b6fd6"/>
      <path d="M-4,-56 L-2,-44 L-8,-36 L-3,-26" stroke="#2a2f3a" stroke-width="1.6" fill="none"/>
      <path d="M-6,-58 Q-14,-74 -20,-70 M0,-58 Q2,-78 -2,-82 M6,-58 Q16,-72 20,-66" stroke="#3f8a3a" stroke-width="2" fill="none"/>
      <circle cx="-20" cy="-71" r="5" fill="#ec3d8c"/><circle cx="-2" cy="-83" r="5" fill="#f5c518"/><circle cx="20" cy="-67" r="5" fill="#e63946"/>
      ${at(30, -10, 1, `<path d="M0,0 l8,-4 l2,7Z" fill="#f6f8ff"/>`, 'a-fall')}`;
    const bridge = `<path d="M-90,0 Q-90,-40 0,-46 Q90,-40 90,0 L60,0 Q56,-26 0,-28 Q-56,-26 -60,0Z" fill="#b5a48a"/><rect x="-96" y="-52" width="192" height="8" rx="3" fill="#c9b99c"/>
      ${[-80, -40, 0, 40, 80].map((x) => `<rect x="${x - 3}" y="-62" width="6" height="12" fill="#a8977c"/>`).join('')}<path d="M-56,-30 Q0,-40 56,-30" stroke="#8f7f66" stroke-width="2" fill="none"/>`;
    return `<defs>
      ${lin('in-sky', [[0, '#5bb2ee'], [1, '#e7f5ff']])}
      ${lin('in-sky2', [[0, '#7ec8f5'], [1, '#fff4d6']])}
      <clipPath id="in-left"><path d="M0,0 L430,0 L370,500 L0,500Z"/></clipPath>
      <clipPath id="in-right"><path d="M430,0 L800,0 L800,500 L370,500Z"/></clipPath>
    </defs>
    <g clip-path="url(#in-left)">
      <rect width="800" height="500" fill="url(#in-sky)"/>
      ${cloud(120, 50, 0.8, 0.95, 'a-drift', -2)}
      ${mountainsBogota('#5fa86a', '#4b9a5c')}
      <!-- casas coloniales de Santafé -->
      <rect x="0" y="216" width="240" height="150" fill="#fbf8f1"/><path d="M-6,218 L0,198 L240,198 L248,218Z" fill="#c0533a"/>
      <rect x="0" y="262" width="240" height="8" fill="#2f6f4f"/>${[...Array(18)].map((_, i) => `<rect x="${4 + i * 13}" y="270" width="3" height="18" fill="#2f6f4f"/>`).join('')}<rect x="0" y="286" width="240" height="5" fill="#2f6f4f"/>
      ${[30, 90, 150, 210].map((x) => `<rect x="${x - 12}" y="226" width="24" height="30" rx="2" fill="#2f6f4f"/><path d="M${x - 14},${366} v-38 a14,14 0 0 1 28,0 v38Z" fill="#2f6f4f"/>`).join('')}
      <rect x="240" y="240" width="160" height="126" fill="#f6efe2"/><path d="M234,242 L240,226 L400,226 L408,242Z" fill="#b8482f"/>
      <path d="M300,240 L300,170 L340,170 L340,240Z" fill="#f6efe2"/><path d="M296,172 L320,140 L344,172Z" fill="#b8482f"/><path d="M320,140 v-12 M315,134 h10" stroke="#6b4423" stroke-width="2.4"/>
      ${[264, 296, 344, 376].map((x) => `<rect x="${x - 8}" y="258" width="16" height="22" rx="2" fill="#3a6ea5"/>`).join('')}
      ${cobble(366, 500, '#b9b1a3', '#a59c8c')}
      <!-- multitud del 20 de julio -->
      ${person({ x: 52, y: 470, s: 0.86, skin: '#e9b48a', top: '#3a5a8a', bottom: '#2b2b3a', hat: 'widebrim', arm: 'wave', act: 'cheer' })}
      ${person({ x: 104, y: 480, s: 0.82, skin: '#c58a5c', top: '#a8322d', bottom: '#5b4630', hair: '#2b1b12', arm: 'up', item: 'flag', flag: 'col', act: 'raise' })}
      ${person({ x: 262, y: 474, s: 0.86, skin: '#f1c6a0', top: '#6b4a2b', bottom: '#3b2a20', hat: 'tricorn', arm: 'out', flip: true, act: 'angry' })}
      ${at(184, 462, 1, florero)}
      <!-- La Pola -->
      ${person({ x: 322, y: 478, s: 0.9, skin: '#efc39b', top: '#2f7a6a', dress: true, hair: '#3a2416', hairStyle: 'bun', cape: '#f2e6d0', item: 'letter', arm: 'out', act: 'look' })}
      ${at(30, 36, 1, `<path d="M0,0 H170 L160,14 L170,28 H0 L10,14Z" fill="#c62828"/><text x="86" y="19" font-family="Fredoka, sans-serif" font-size="14" font-weight="600" fill="#fff" text-anchor="middle">20 de julio de 1810</text>`)}
    </g>
    <g clip-path="url(#in-right)">
      <rect width="800" height="500" fill="url(#in-sky2)"/>
      ${cloud(620, 70, 0.9, 0.95, 'a-drift2', -4)}
      <path d="M370,240 Q480,170 600,210 Q700,180 800,206 L800,500 L370,500Z" fill="#78b866"/>
      <path d="M370,290 Q520,240 640,270 Q720,250 800,262 L800,500 L370,500Z" fill="#66a957"/>
      ${smoke(760, 230, 3, 12, '#ffffff', 5)}${smoke(470, 250, 3, 10, '#ffffff', 6)}
      <!-- río y puente de Boyacá -->
      <path d="M800,282 Q700,300 640,320 Q560,346 600,400 Q640,460 560,500 L620,500 Q700,460 660,400 Q630,354 700,334 Q760,318 800,316Z" fill="#4aa6dd"/>
      ${at(648, 330, 0.62, bridge)}
      ${flagPole(700, 296, 64, 'col', 44, 29, '#5b3a1a', 0.3)}
      <path d="M370,420 Q560,400 800,430 L800,500 L370,500Z" fill="#5a9e4c"/>
      ${grassTufts(430, 16, '#3f8a3a', 400, 800)}
      ${person({ x: 520, y: 476, s: 1.08, skin: '#e3b08a', top: '#1f3a8a', sleeve: '#1f3a8a', bottom: '#f4f1e8', hair: '#1d120b', hat: 'bicorne', epaulettes: true, item: 'sword', arm: 'up', boots: true, cape: '#a8322d' , act: 'raise' })}
      ${person({ x: 724, y: 480, s: 1.02, skin: '#f1c6a0', top: '#24407a', sleeve: '#24407a', bottom: '#f4f1e8', hair: '#3a2416', hat: 'bicorne', epaulettes: true, item: 'book', arm: 'out', boots: true, itemColor: '#c62828' , act: 'talk' })}
      ${at(614, 36, 1, `<path d="M0,0 H170 L160,14 L170,28 H0 L10,14Z" fill="#1f3a8a"/><text x="86" y="19" font-family="Fredoka, sans-serif" font-size="14" font-weight="600" fill="#fff" text-anchor="middle">7 de agosto de 1819</text>`)}
    </g>
    <path d="M430,0 L370,500" stroke="#fff" stroke-width="7"/><path d="M430,0 L370,500" stroke="#ffd23f" stroke-width="2.5"/>
    `;
  };
  HS.independencia = [[218, 396], [470, 370], [684, 372], [322, 356], [620, 276]];

  // ================= PERIODO REPUBLICANO =================
  S.republicana = () => {
    const board = `<rect x="-3" y="-64" width="6" height="64" fill="#6b4423"/><rect x="-46" y="-118" width="92" height="66" rx="6" fill="#fff8e6" stroke="#8b5a2b" stroke-width="4"/>
      <g transform="translate(-40 -112)">${flagBody('col', 38, 25)}</g><g transform="translate(2 -112)">${flagBody('ven', 38, 25)}</g>
      <g transform="translate(-40 -84)">${flagBody('ecu', 38, 25)}</g><g transform="translate(2 -84)">${flagBody('pan', 38, 25)}</g>`;
    const urna = `<rect x="-26" y="-44" width="52" height="44" rx="4" fill="#e9eef7"/><rect x="-26" y="-44" width="52" height="44" rx="4" fill="none" stroke="#9aa6bb" stroke-width="2"/>
      <rect x="-14" y="-48" width="28" height="5" rx="2" fill="#5a6478"/><rect x="-26" y="-26" width="52" height="10" fill="#fcd116"/><rect x="-26" y="-16" width="52" height="5" fill="#003893"/><rect x="-26" y="-11" width="52" height="5" fill="#ce1126"/>
      ${at(0, -54, 1, `<rect x="-7" y="-14" width="14" height="16" rx="1.5" fill="#fff" stroke="#b9c2d0"/><path d="M-3,-6 l3,3 l5,-7" stroke="#2e9d5b" stroke-width="2" fill="none"/>`, 'a-vote')}`;
    const book = `<rect x="-10" y="-50" width="20" height="50" fill="#6b4423"/><path d="M-30,-50 L30,-50 L24,-58 L-24,-58Z" fill="#7a4a24"/>
      ${at(0, -76, 1, `<path d="M-38,4 L0,10 L38,4 L38,-22 L0,-16 L-38,-22Z" fill="#f2f6ff"/><path d="M0,10 L0,-16" stroke="#9aa6bb" stroke-width="2"/><path d="M-38,4 L-38,-22 L-42,-20 L-42,8 L0,14 L42,8 L42,-20 L38,-22 L38,4 L0,10Z" fill="#1f4fa3"/>
      ${[-12, -6, 0].map((y) => `<path d="M-32,${y - 6} l26,4 M6,${y - 2} l26,-4" stroke="#9aa6bb" stroke-width="1.4"/>`).join('')}
      <text x="-19" y="-6" font-family="Fredoka, sans-serif" font-size="9" font-weight="700" fill="#1f4fa3" text-anchor="middle">1991</text>`, 'a-bob')}
      ${[[-40, -100], [36, -108], [0, -124]].map(([x, y], i) => at(x, y, 1, `<path d="M0,-6 L1.6,-1.6 L6,0 L1.6,1.6 L0,6 L-1.6,1.6 L-6,0 L-1.6,-1.6Z" fill="#ffd23f"/>`, 'a-twinkle', delay(i * 0.5))).join('')}`;
    const dove = `<ellipse cx="0" cy="0" rx="12" ry="8" fill="#fff"/><circle cx="-10" cy="-6" r="6" fill="#fff"/><path d="M-16,-6 l-5,2 l5,1Z" fill="#f2a43a"/><circle cx="-11" cy="-7" r="1.3" fill="#222"/>
      ${at(2, -4, 1, `<path d="M0,0 Q8,-18 20,-14 Q12,-4 0,0Z" fill="#f1f3f8"/>`, 'a-wing')}<path d="M10,2 L22,6 L12,-2Z" fill="#eef1f6"/>`;
    let capitol = `<rect x="226" y="324" width="348" height="12" fill="#cfc8bb"/><rect x="214" y="336" width="372" height="12" fill="#c2bbad"/><rect x="202" y="348" width="396" height="12" fill="#b5ae9f"/>
      <rect x="232" y="220" width="336" height="106" fill="#9a9488"/>
      <rect x="226" y="204" width="348" height="18" fill="#ebe5d9"/><rect x="226" y="198" width="348" height="7" fill="#d9d2c4"/><rect x="226" y="221" width="348" height="4" fill="#cfc8bb"/>
      ${[...Array(14)].map((_, i) => `<rect x="${244 + i * 23}" y="207" width="9" height="11" fill="#d6cfc1"/>`).join('')}`;
    for (let i = 0; i < 14; i++) {
      const x = 240 + i * 23.5;
      capitol += `<rect x="${x}" y="226" width="13" height="98" fill="#f1ece2"/><rect x="${x + 9}" y="226" width="4" height="98" fill="#d6cfc1"/><rect x="${x - 2}" y="224" width="17" height="5" rx="1.5" fill="#e6dfd2"/><rect x="${x - 2}" y="319" width="17" height="5" fill="#e6dfd2"/>`;
    }
    return `<defs>
      ${lin('re-sky', [[0, '#3fa9f5'], [1, '#e2f4ff']])}
      ${lin('re-plaza', [[0, '#d7d0c3'], [1, '#bdb4a4']])}
    </defs>
    <rect width="800" height="500" fill="url(#re-sky)"/>
    ${sun(700, 66, 28, '#fff8cc', '#fff4b0')}
    ${cloud(160, 60, 0.85, 0.95, 'a-drift', -1)}${cloud(480, 44, 0.65, 0.9, 'a-drift2', -6)}
    ${mountainsBogota('#5fa86a', '#4b9a5c')}
    <!-- ciudad moderna -->
    <g fill="#9fb3cc" opacity=".9"><rect x="40" y="150" width="34" height="140"/><rect x="80" y="190" width="40" height="100"/><rect x="600" y="170" width="44" height="120"/><rect x="650" y="200" width="36" height="90"/><rect x="128" y="210" width="30" height="80"/></g>
    <g fill="#c9d6e6">${[...Array(9)].map((_, i) => `<rect x="44" y="${160 + i * 14}" width="26" height="4"/>`).join('')}${[...Array(7)].map((_, i) => `<rect x="606" y="${180 + i * 14}" width="32" height="4"/>`).join('')}</g>
    ${capitol}
    ${flagPole(400, 198, 48, 'col', 40, 26, '#cfc8bb', 0.4)}
    <!-- plaza -->
    <rect y="360" width="800" height="140" fill="url(#re-plaza)"/>
    ${[...Array(12)].map((_, i) => `<path d="M${400 + (i - 6) * 40},360 L${400 + (i - 6) * 140},500" stroke="#b0a797" stroke-width="1.5"/>`).join('')}
    ${[380, 404, 436, 476].map((y) => `<path d="M0,${y} H800" stroke="#b0a797" stroke-width="1.5"/>`).join('')}
    <!-- estatua de Bolívar con paloma -->
    <rect x="218" y="402" width="44" height="64" fill="#9a9488"/><rect x="210" y="396" width="60" height="10" fill="#b5ae9f"/><rect x="210" y="462" width="60" height="10" fill="#b5ae9f"/>
    ${person({ x: 240, y: 398, s: 0.58, skin: '#5f7a6a', top: '#4f6a5a', bottom: '#5f7a6a', hair: '#4f6a5a', hat: 'bicorne', item: 'sword', arm: 'down', boots: true, cape: '#4a6354', act: 'none' }).replace(/#1d2033|#e8b931|#fcd116|#003893|#ce1126|#1f1a17|#2a1c14|#ff6f6f|#5a2e1e|#e8edf3|#d4a52c/g, '#425a4c')}
    ${at(250, 330, 1, dove, 'a-bob')}
    <!-- palomas volando -->
    ${at(0, 120, 1, `${[0, 1, 2].map((i) => at(i * 34, (i % 2) * 14, 0.6, dove)).join('')}`, 'a-fly', 'animation-duration:26s')}
    <!-- gran bandera -->
    ${flagPole(660, 360, 230, 'col', 96, 62, '#e6e6ee')}
    ${at(92, 470, 1, board)}
    ${at(560, 470, 1, book)}
    ${person({ x: 690, y: 478, s: 0.92, skin: '#c58a5c', top: '#e05297', dress: true, hair: '#2b1b12', hairStyle: 'long', item: 'ballot', arm: 'out', act: 'vote' })}
    ${at(752, 476, 1, urna)}
    `;
  };
  HS.republicana = [[92, 384], [400, 272], [250, 322], [712, 166], [560, 406], [752, 420]];

  // ---------- búho guía: Cronos ----------
  const owl = () => `<svg viewBox="0 0 120 132" class="owl-svg" aria-hidden="true">
    <defs>${lin('ow-b', [[0, '#a98bf5'], [1, '#6b46c1']])}</defs>
    <g class="owl-wing owl-wing-l"><path d="M18,60 Q0,86 12,110 Q26,98 30,72Z" fill="#5b3aa8"/></g>
    <g class="owl-wing owl-wing-r"><path d="M102,60 Q120,86 108,110 Q94,98 90,72Z" fill="#5b3aa8"/></g>
    <path d="M26,30 L19,4 L46,22Z" fill="#7c58d6"/><path d="M94,30 L101,4 L74,22Z" fill="#7c58d6"/>
    <path d="M60,14 Q101,14 103,58 Q105,105 60,119 Q15,105 17,58 Q19,14 60,14Z" fill="url(#ow-b)"/>
    <ellipse cx="60" cy="90" rx="27" ry="26" fill="#f3e8ff"/>
    <g fill="none" stroke="#d6bcfa" stroke-width="1.6">${[78, 88, 98].map((y, r) => [...Array(4 - (r % 2))].map((_, i) => `<path d="M${44 + i * 9 + (r % 2) * 4.5},${y} q4.5,4 9,0"/>`).join('')).join('')}</g>
    <circle cx="60" cy="104" r="9" fill="#fff" stroke="#f6ad55" stroke-width="3"/>
    <g class="owl-clock"><line x1="60" y1="104" x2="60" y2="98" stroke="#2d3748" stroke-width="2" stroke-linecap="round"/></g><line x1="60" y1="104" x2="64" y2="104" stroke="#2d3748" stroke-width="2" stroke-linecap="round"/>
    <rect x="17" y="40" width="86" height="9" rx="4.5" fill="#7b341e"/>
    <circle cx="42" cy="48" r="18" fill="#f6ad55"/><circle cx="78" cy="48" r="18" fill="#f6ad55"/><circle cx="42" cy="48" r="18" fill="none" stroke="#c77d2a" stroke-width="2"/><circle cx="78" cy="48" r="18" fill="none" stroke="#c77d2a" stroke-width="2"/>
    <circle cx="42" cy="48" r="13.5" fill="#fff"/><circle cx="78" cy="48" r="13.5" fill="#fff"/>
    <g class="owl-pupils"><circle cx="44" cy="49" r="7" fill="#1a202c"/><circle cx="80" cy="49" r="7" fill="#1a202c"/><circle cx="46.5" cy="46" r="2.4" fill="#fff"/><circle cx="82.5" cy="46" r="2.4" fill="#fff"/></g>
    <g class="owl-lids"><ellipse cx="42" cy="48" rx="14" ry="14" fill="#8f6ee0"/><ellipse cx="78" cy="48" rx="14" ry="14" fill="#8f6ee0"/></g>
    <path d="M33,40 Q38,36 44,37" stroke="#fff" stroke-width="2.4" fill="none" opacity=".75" stroke-linecap="round"/><path d="M69,40 Q74,36 80,37" stroke="#fff" stroke-width="2.4" fill="none" opacity=".75" stroke-linecap="round"/>
    <g class="owl-beak"><path d="M53,63 L67,63 L60,74Z" fill="#f6ad55"/></g>
    <path d="M46,117 l-4,8 M50,118 l0,8 M54,117 l4,8 M66,117 l-4,8 M70,118 l0,8 M74,117 l4,8" stroke="#f6ad55" stroke-width="3" stroke-linecap="round"/>
  </svg>`;

  return {
    scene: (id) => `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="scene-svg" role="img" aria-label="Ilustración">${S[id]()}</svg>`,
    hotspots: HS,
    owl,
    flag: (type, w = 46, h = 30) => `<svg viewBox="0 0 ${w} ${h}" class="mini-flag">${flagBody(type, w, h)}</svg>`,
  };
})();
