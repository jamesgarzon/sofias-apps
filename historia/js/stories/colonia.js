// Historias de la Colonia: escena animada que se reproduce al tocar cada chispa (mismo orden que los hotspots).
// Coordenadas del viewBox 800×500. Se ve con zoom ×1,9 centrado en la chispa: deja lo importante cerca de ella.
window.STORIES = window.STORIES || {};
window.STORIES.colonia = (() => {
  // Objeto propio en la mano de un personaje: se dibuja una carta (o pincel) y se cambia por `svg` (coordenadas locales de la mano).
  const HAND = { down: [22, -37.5], up: [25, -89], out: [32, -52], wave: [31, -85] };
  const LETTER = /<rect x="[-\d.]+" y="[-\d.]+" width="20" height="14" rx="1.5" fill="#fffaf0" stroke="#c9b28a"\/><path d="[^"]*" stroke="#c9b28a" fill="none"\/><circle cx="[-\d.]+" cy="[-\d.]+" r="2.6" fill="#c62828"\/>/;
  const hold = (person, o, pose, svg) => { const [hx, hy] = HAND[pose]; return person({ ...o, item: 'letter' }).replace(LETTER, `<g transform="translate(${hx} ${hy})">${svg}</g>`); };
  const label = (x, y, t, c = '#7a3d00', fs = 15, bg = '#fff8e6') => {
    const w = t.length * fs * 0.56 + 18;
    return `<rect x="${x - w / 2}" y="${y - fs * 0.9 - 4}" width="${w}" height="${fs * 1.25 + 8}" rx="${fs * 0.7}" fill="${bg}" stroke="${c}" stroke-width="2.5"/><text x="${x}" y="${y + 2}" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="${fs}" fill="${c}">${t}</text>`;
  };
  const heart = (c = '#ec3d8c') => `<path d="M0,8 C-18,-4 -10,-20 0,-9 C10,-20 18,-4 0,8Z" fill="${c}"/>`;
  return {
    css: `
      .st-colonia-fly { animation: st-colonia-fly 1.4s ease-in-out both; }
      @keyframes st-colonia-fly { 0% { transform: translate(121px, -90px); opacity: 0; } 8% { opacity: 1; } 25% { transform: translate(87px, -96px); } 50% { transform: translate(55px, -83px); } 75% { transform: translate(26px, -51px); } 100% { transform: translate(0, 0); } }
      .st-colonia-hide { animation: st-colonia-hide .3s ease-in both; }
      @keyframes st-colonia-hide { to { opacity: 0; } }
      .st-colonia-unroll { transform-box: fill-box; transform-origin: 0 50%; animation: st-colonia-unroll 1s ease-out both; }
      @keyframes st-colonia-unroll { from { transform: scaleX(0); } }
      .st-colonia-roll { animation: st-colonia-roll 1s ease-out both; }
      @keyframes st-colonia-roll { from { transform: translateX(-140px); } }
      .st-colonia-flee { animation: st-colonia-flee 1.8s ease-in both; }
      @keyframes st-colonia-flee { to { transform: translate(170px, -4px); opacity: 0; } }
      .st-colonia-puff { transform-box: fill-box; transform-origin: 50% 50%; animation: st-colonia-puff 1.6s ease-out both; }
      @keyframes st-colonia-puff { 0% { transform: translate(0, 0) scale(.3); opacity: 0; } 15% { opacity: .95; } 100% { transform: translate(var(--dx), -26px) scale(1.6); opacity: 0; } }
      .st-colonia-bell { transform-box: fill-box; transform-origin: 50% 0; animation: st-colonia-bell .7s ease-in-out infinite alternate; }
      @keyframes st-colonia-bell { from { transform: rotate(-26deg); } to { transform: rotate(26deg); } }
      .st-colonia-tearl { transform-box: fill-box; transform-origin: 100% 0; animation: st-colonia-tearl 1s cubic-bezier(.5, 0, .8, 1) both; }
      @keyframes st-colonia-tearl { 30% { transform: rotate(-24deg); opacity: 1; } 100% { transform: translate(-30px, 40px) rotate(-70deg); opacity: 0; } }
      .st-colonia-tearr { animation: st-colonia-tearr .45s ease-out both; }
      @keyframes st-colonia-tearr { to { transform: translate(26px, -44px) rotate(14deg); } }
      @media (prefers-reduced-motion: reduce) { .st-colonia-bell { animation: none; } }`,
    play: [
      // 0 · El virrey: el rey de España, muy lejos, le manda una carta; el virrey la lee y aparecen las leyes y los impuestos
      ({ at, person, sparkle }) => {
        const coin = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="4" fill="#d4a52c"/><ellipse cx="${x}" cy="${y - 2}" rx="9" ry="4" fill="#f5c518"/>`;
        const letter = `<g transform="scale(1.15)"><rect width="20" height="14" rx="1.5" fill="#fffaf0" stroke="#c9b28a"/><path d="M0,0 L10,8 L20,0" stroke="#c9b28a" fill="none"/><circle cx="10" cy="8" r="2.8" fill="#c62828"/></g>`;
        const trail = [1, 2, 3, 4, 5, 6].map((i) => {
          const t = i / 7, x = (1 - t) ** 2 * 577 + 2 * t * (1 - t) * 506 + t * t * 456, y = (1 - t) ** 2 * 196 + 2 * t * (1 - t) * 166 + t * t * 286;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#fff" opacity=".85" class="s-fade" style="animation-delay:${(1 + i * 0.18).toFixed(2)}s"/>`;
        }).join('');
        const viceroy = { x: 410, y: 352, s: 1.15, skin: '#f1c6a0', top: '#b0263a', bottom: '#f1f1f4', hairStyle: 'wig', hat: 'tricorn', arm: 'out', boots: true };
        return `
        <clipPath id="st-colonia-king"><circle cx="606" cy="166" r="37"/></clipPath>
        ${at(0, 0, 1, `<circle cx="606" cy="166" r="40" fill="#bfe6ff" stroke="#d4a52c" stroke-width="5"/>
          <path d="M566,190 q10,-5 20,0 t20,0 t20,0 t20,0" stroke="#fff" stroke-width="2.5" fill="none" opacity=".8"/>
          <g clip-path="url(#st-colonia-king)">${person({ x: 606, y: 222, s: 0.62, skin: '#f1c6a0', top: '#7a1f2b', bottom: '#f1f1f4', hair: '#5a3a22', hat: 'crown', arm: 'wave', act: 'wave', delay: 0 })}</g>
          ${label(606, 226, 'Rey de España', '#a8322d', 13)}`, 's-in', 'animation-delay:.2s')}
        ${trail}
        ${at(0, 0, 1, person({ ...viceroy, act: 'read', delay: 0 }), 's-fade', 'animation-delay:.1s')}
        ${at(0, 0, 1, at(444.5, 278.4, 1, letter, 'st-colonia-fly', 'animation-delay:.9s'), 's-out', 'animation-delay:2.7s')}
        ${at(0, 0, 1, `
          ${at(0, 0, 1, `<rect x="470" y="244" width="140" height="98" rx="4" fill="#fff6dc" stroke="#c9a26b" stroke-width="3"/>
            <rect x="482" y="256" width="20" height="24" rx="2" fill="#fffaf0" stroke="#9a8a6a" stroke-width="1.5"/><path d="M486,263 h12 M486,268 h12 M486,273 h8" stroke="#9a8a6a" stroke-width="1.6"/>
            <text x="512" y="275" font-family="Fredoka, sans-serif" font-weight="600" font-size="17" fill="#5b3a1a">Leyes</text>
            ${coin(492, 322)}${coin(492, 315)}${coin(492, 308)}
            <text x="510" y="320" font-family="Fredoka, sans-serif" font-weight="600" font-size="17" fill="#5b3a1a">Impuestos</text>`, 'st-colonia-unroll', 'animation-delay:2.8s')}
          <rect x="465" y="240" width="9" height="106" rx="4.5" fill="#e6c98f" stroke="#b08a52" stroke-width="2"/>
          ${at(0, 0, 1, `<rect x="606" y="240" width="9" height="106" rx="4.5" fill="#e6c98f" stroke="#b08a52" stroke-width="2"/>`, 'st-colonia-roll', 'animation-delay:2.8s')}`, 's-fade', 'animation-delay:2.7s')}
        ${at(592, 262, 1, `<circle r="13" fill="#c62828"/><circle r="9.5" fill="none" stroke="#8f1d1d" stroke-width="1.6"/><path d="M-6,3 L-6,-4 L-3,-1 L0,-6 L3,-1 L6,-4 L6,3Z" fill="#f5c518"/>`, 's-stamp', 'animation-delay:4.2s')}
        ${at(0, 0, 1, person({ ...viceroy, act: 'point', delay: 0 }), 's-fade', 'animation-delay:2.7s')}
        ${[[536, 250, 4.5], [606, 236, 4.8], [474, 338, 5.1]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd23f', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
      },
      // 1 · Murallas de Cartagena: un constructor levanta la muralla; llega un barco pirata, el cañón dispara y los piratas se van
      ({ at, person, caravel, sparkle }) => {
        const block = (x, y, w = 22, h = 14) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#dcc391" stroke="#a88a56" stroke-width="1.6"/>`;
        const blocks = [];
        [336, 320, 304, 288].forEach((y, r) => (r % 2 ? [[474, 13], [487, 26], [513, 26], [539, 13]] : [[474, 26], [500, 26], [526, 26]]).forEach(([x, w]) => blocks.push(block(x, y, w, 16))));
        const merlon = (x) => `<path d="M${x},288 v-12 a13,9 0 0 1 26,0 v12Z" fill="#dcc391" stroke="#a88a56" stroke-width="1.6"/>`;
        const pieces = [...blocks, merlon(474), merlon(526)];
        const mallet = `<rect x="-2.2" y="-28" width="4.4" height="32" rx="2" fill="#7a5230"/><rect x="-11" y="-38" width="22" height="12" rx="3" fill="#a87b4f"/><rect x="-11" y="-38" width="5" height="12" rx="2" fill="#8b5a2b"/>`;
        return `
        ${at(0, 0, 1, at(0, 0, 1, at(668, 270, 0.5, caravel(0, 0, 1, { sail: '#3a3a44', cross: 'none', hull: '#3b2a20', flag: 'pirate' })), 's-from-r', 'animation-delay:.3s'), 'st-colonia-flee', 'animation-delay:3.9s')}
        ${pieces.map((p, i) => at(0, 0, 1, p, 's-drop', `animation-delay:${(0.5 + i * 0.22).toFixed(2)}s;animation-duration:.6s`)).join('')}
        ${at(0, 0, 1, hold(person, { x: 432, y: 352, s: 1.1, skin: '#8a5a3a', top: '#f2ecdc', bottom: '#7a6a52', hair: '#1b120c', hat: 'straw', act: 'hammer', delay: 0 }, 'up', mallet), 's-from-l')}
        ${at(0, 0, 1, person({ x: 612, y: 352, s: 1, skin: '#f1c6a0', top: '#c62828', bottom: '#f1f1f4', hat: 'morrion', boots: true, act: 'point', delay: 0 }), 's-fade', 'animation-delay:1.2s')}
        ${at(660, 372, 1, `<path d="M0,-22 L6,-7 L22,-10 L9,0 L20,13 L4,7 L0,22 L-4,7 L-18,12 L-8,0 L-20,-10 L-6,-7Z" fill="#ffd23f"/><circle r="7" fill="#fff6b0"/>`, 's-flash', 'animation-delay:3.4s;animation-duration:1.1s')}
        ${[[0, 8], [8, 30], [-6, 52]].map(([dy, dx], i) => at(664, 368 + dy, 1, `<circle r="10" fill="#e9e4dc"/>`, 'st-colonia-puff', `animation-delay:${3.45 + i * 0.12}s;--dx:${dx}px`)).join('')}
        ${at(706, 334, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="20" fill="#c62828" stroke="#fff" stroke-width="4" paint-order="stroke">¡Pum!</text>`, 's-flash', 'animation-delay:3.45s;animation-duration:1.4s')}
        ${at(513, 324, 1, label(0, 0, 'Muralla', '#7a3d00', 14), 's-in', 'animation-delay:4.6s')}
        ${[[466, 284, 5], [562, 278, 5.3]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
      },
      // 2 · Mezcla de culturas: una familia indígena-española con su hijo mestizo y una familia española con su hijo criollo
      ({ at, person }) => `
        ${at(0, 0, 1, person({ x: 246, y: 400, s: 0.9, skin: '#a86b45', top: '#f2ecdc', dress: true, belt: '#e04e39', hair: '#1b120c', hairStyle: 'long', arm: 'out', act: 'idle' }), 's-from-l')}
        ${at(0, 0, 1, person({ x: 306, y: 400, s: 0.9, skin: '#f1c6a0', top: '#3a5a8a', bottom: '#2b2b3a', hair: '#5a3a22', hat: 'widebrim', arm: 'out', flip: true, boots: true, act: 'idle' }), 's-from-l', 'animation-delay:.2s')}
        ${at(276, 292, 1, `<g class="a-pulse">${heart()}</g>`, 's-in', 'animation-delay:1s')}
        ${at(0, 0, 1, person({ x: 276, y: 418, s: 0.62, skin: '#c99266', top: '#f5c518', bottom: '#5b4630', hair: '#2b1b12', act: 'cheer' }), 's-in', 'animation-delay:1.4s')}
        ${at(276, 262, 1, label(0, 0, 'Mestizo', '#2e7d32', 16), 's-in', 'animation-delay:1.8s')}
        ${at(0, 0, 1, person({ x: 366, y: 400, s: 0.9, skin: '#f6d0b0', top: '#7a2e4a', dress: true, hair: '#3a2416', hairStyle: 'bun', hat: 'scarf', scarfColor: '#2b2b3a', arm: 'out', act: 'idle' }), 's-from-r', 'animation-delay:1.2s')}
        ${at(0, 0, 1, person({ x: 426, y: 400, s: 0.9, skin: '#f1c6a0', top: '#2f6f4f', bottom: '#f1f1f4', hair: '#5a3a22', hat: 'tricorn', arm: 'out', flip: true, boots: true, act: 'idle' }), 's-from-r', 'animation-delay:1.4s')}
        ${at(396, 292, 1, `<g class="a-pulse">${heart('#e23b3b')}</g>`, 's-in', 'animation-delay:2.4s')}
        ${at(0, 0, 1, person({ x: 396, y: 418, s: 0.62, skin: '#f3cfae', top: '#4a90d9', bottom: '#f1f1f4', hair: '#7a4a24', act: 'cheer' }), 's-in', 'animation-delay:2.8s')}
        ${at(396, 262, 1, label(0, 0, 'Criollo', '#1f4fa3', 16), 's-in', 'animation-delay:3.2s')}`,
      // 3 · La religión y el idioma: suena la campana de la iglesia y un fraile enseña a leer en español
      ({ at, person, sparkle }) => `
        ${at(360, 119, 1, `<g class="st-colonia-bell"><path d="M-10,17 Q-10,2 0,0 Q10,2 10,17 L12,20 L-12,20Z" fill="#e8b931"/><path d="M-5,6 Q-6,13 -6,17" stroke="#fff6c4" stroke-width="2" fill="none" opacity=".8"/><circle cx="0" cy="22" r="3.2" fill="#a87b2a"/></g>`, 's-fade', 'animation-delay:.2s')}
        ${[[388, 128, 1], [332, 128, -1]].map(([x, y, f]) => at(x, y, 1, `<g transform="scale(${f} 1)"><path d="M0,-9 Q6,0 0,9 M8,-15 Q16,0 8,15" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" class="a-glow"/></g>`, 's-fade', 'animation-delay:.5s')).join('')}
        ${at(438, 122, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="17" fill="#7a3d00" stroke="#fff" stroke-width="4" paint-order="stroke">¡Din, don!</text>`, 's-in', 'animation-delay:.6s')}
        ${at(0, 0, 1, `<path d="M222,334 L236,236 M268,334 L254,236" stroke="#7a5230" stroke-width="5" stroke-linecap="round"/>
          <rect x="204" y="232" width="82" height="62" rx="4" fill="#2f5d4a" stroke="#8b5a2b" stroke-width="5"/>`, 's-in', 'animation-delay:.3s')}
        ${['A', 'B', 'C'].map((t, i) => `<text x="${224 + i * 21}" y="262" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="20" fill="#fffdf2" class="s-fade" style="animation-delay:${1.2 + i * 0.5}s">${t}</text>`).join('')}
        <text x="245" y="286" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="17" fill="#ffe27a" class="s-fade" style="animation-delay:2.9s">¡Hola!</text>
        ${at(0, 0, 1, person({ x: 324, y: 332, s: 1.05, skin: '#efc39b', top: '#6b4a2b', dress: true, hair: '#4a3020', belt: '#e6d2a6', item: 'stick', itemColor: '#fffdf2', flip: true, act: 'point', delay: 0 }) + `<path d="M324,266 v16 M318,271 h12" stroke="#e6d2a6" stroke-width="3.2" stroke-linecap="round"/>`, 's-from-r')}
        ${at(0, 0, 1, person({ x: 404, y: 332, s: 0.72, skin: '#a86b45', top: '#f2ecdc', dress: true, belt: '#e04e39', hair: '#1b120c', hairStyle: 'long', flip: true, act: 'look' }), 's-from-r', 'animation-delay:.6s')}
        ${at(0, 0, 1, person({ x: 452, y: 332, s: 0.68, skin: '#c58a5c', top: '#2e9d5b', bottom: '#5b4630', hair: '#2b1b12', flip: true, act: 'wave', delay: 0 }), 's-from-r', 'animation-delay:.8s')}
        ${at(0, 0, 1, `<path d="M420,236 h64 a10,10 0 0 1 10,10 v14 a10,10 0 0 1 -10,10 h-22 l-8,9 l-2,-9 h-32 a10,10 0 0 1 -10,-10 v-14 a10,10 0 0 1 10,-10Z" fill="#fff" stroke="#2e9d5b" stroke-width="2.5"/><text x="452" y="259" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="16" fill="#2e7d32">¡Hola!</text>`, 's-in', 'animation-delay:3.5s')}
        ${[[246, 226, 3.9], [302, 248, 4.2]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`,
      // 4 · La Expedición Botánica: Mutis estudia la flor con su lupa, un pintor la dibuja y aparecen más láminas de plantas
      ({ at, person, sparkle }) => {
        const flower = `<path d="M0,40 Q-2,10 0,-12" stroke="#3f8a3a" stroke-width="3" fill="none"/><path d="M0,22 Q-24,12 -28,26 Q-14,28 0,24Z M0,8 Q22,-4 28,10 Q14,12 0,10Z" fill="#5cb945"/>
          ${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-10" rx="7" ry="11" fill="#ec3d8c" transform="translate(0 -24) rotate(${a})"/>`).join('')}<circle cy="-24" r="5.5" fill="#f5c518"/>`;
        const outline = 'M0,40 Q-2,10 0,-12 M0,22 Q-24,12 -28,26 Q-14,28 0,24Z M0,8 Q22,-4 28,10 Q14,12 0,10Z M0,-24 m-12,0 a12,12 0 1 0 24,0 a12,12 0 1 0 -24,0';
        const plate = (inner) => `<rect x="-20" y="-26" width="40" height="52" rx="2" fill="#fffaf0" stroke="#c9a26b" stroke-width="2.5"/>${inner}<path d="M-12,19 h24" stroke="#c9b28a" stroke-width="1.6"/>`;
        const minis = [
          plate(`<path d="M0,14 Q-1,0 1,-12" stroke="#3f8a3a" stroke-width="2" fill="none"/><path d="M0,-12 q-10,-8 -12,2 q6,4 12,-2Z M0,-12 q10,-8 12,2 q-6,4 -12,-2Z" fill="#9b59d0"/><circle cx="0" cy="-9" r="3" fill="#f5c518"/>`),
          plate(`<path d="M0,14 Q2,-2 -2,-18" stroke="#2e7d32" stroke-width="2" fill="none"/>${[-12, -6, 0, 6].map((y, i) => `<path d="M0,${y} q-11,-3 -13,-${7 - i}" stroke="#4fae4a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M0,${y} q11,-3 13,-${7 - i}" stroke="#4fae4a" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}`),
          plate(`<path d="M0,14 Q-2,2 0,-6" stroke="#3f8a3a" stroke-width="2" fill="none"/><path d="M0,6 q-10,-6 -12,2 q6,3 12,-2Z" fill="#5cb945"/><circle cx="0" cy="-10" r="9" fill="#f28c28"/><circle cx="-3" cy="-13" r="2.5" fill="#ffd29a"/>`),
        ];
        const lens = `<line x1="0" y1="2" x2="9" y2="-6" stroke="#7a5230" stroke-width="3.5" stroke-linecap="round"/><circle cx="15" cy="-11" r="8.5" fill="#dff4ff" fill-opacity=".6" stroke="#c9a227" stroke-width="3"/>`;
        return `
        ${at(0, 0, 1, `<path d="M534,334 L520,470 M584,334 L598,470" stroke="#7a5230" stroke-width="5" stroke-linecap="round"/>
          <rect x="514" y="336" width="88" height="120" rx="2" fill="#fffaf0" stroke="#c9b28a" stroke-width="2.5"/><rect x="510" y="330" width="96" height="8" rx="3" fill="#7a5230"/>`, 's-in', 'animation-delay:.1s')}
        ${at(558, 404, 1.1, `<path d="${outline}" pathLength="1" fill="none" stroke="#5b3a1a" stroke-width="2" class="s-draw" style="animation-delay:.9s;animation-duration:2.2s"/><g class="s-fade" style="animation-delay:3s">${flower}</g>`)}
        ${at(0, 0, 1, hold(person, { x: 398, y: 447, s: 1.05, skin: '#f1c6a0', top: '#2b2b3a', dress: true, hair: '#ececf2', act: 'point', delay: 0 }, 'out', lens), 's-from-l')}
        ${at(0, 0, 1, person({ x: 626, y: 447, s: 0.92, skin: '#c58a5c', top: '#4a90d9', bottom: '#3b2a20', hair: '#2b1b12', hat: 'beret', hatColor: '#c62828', flip: true, act: 'paint', delay: 0 }), 's-from-r', 'animation-delay:.3s')}
        ${minis.map((m, i) => at(318 + i * 52, 262, 1, m, 's-in', `animation-delay:${3.6 + i * 0.45}s`)).join('')}
        ${at(370, 232, 1, label(0, 0, '¡Miles de plantas!', '#2e7d32', 14), 's-in', 'animation-delay:5s')}
        ${[[540, 350, 3.4], [592, 420, 3.7]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd23f', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`;
      },
      // 5 · Los Comuneros: Manuela Beltrán rompe el aviso de los impuestos y el pueblo protesta (1781)
      ({ at, person }) => {
        const notice = `<rect x="284" y="370" width="68" height="62" rx="2" fill="#fff6dc" stroke="#c9a26b" stroke-width="2"/>
          <text x="318" y="389" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="12.5" fill="#a8322d">Impuestos</text>
          ${[300, 318, 336].map((x) => `<circle cx="${x}" cy="403" r="6" fill="#f5c518" stroke="#c9a227" stroke-width="1.5"/>`).join('')}
          <path d="M292,416 h52 M292,423 h40" stroke="#9a8a6a" stroke-width="1.8"/>`;
        const zig = 'L322,380 L314,390 L322,400 L314,410 L322,420 L316,436';
        const torn = `<path d="M-6,-20 L14,-18 L18,-4 L12,4 L16,12 L-4,10Z" fill="#fff6dc" stroke="#c9a26b" stroke-width="1.6"/><circle cx="4" cy="-7" r="4" fill="#f5c518"/>`;
        const manuela = { x: 384, y: 442, s: 1.05, skin: '#d29a6a', top: '#c0533a', dress: true, hair: '#2b1b12', hairStyle: 'bun', flip: true, delay: 0 };
        return `
        <rect x="288" y="388" width="60" height="44" rx="3" fill="#8b5a2b"/><path d="M309,388 L327,388 L325,399 L319,395 L313,401Z" fill="#fff6dc"/><circle cx="318" cy="392" r="3" fill="#c62828"/>
        <clipPath id="st-colonia-tl"><path d="M270,360 L316,360 ${zig} L270,436Z"/></clipPath>
        <clipPath id="st-colonia-tr"><path d="M316,360 ${zig} L366,436 L366,360Z"/></clipPath>
        ${at(0, 0, 1, `<g clip-path="url(#st-colonia-tl)">${notice}</g>`, 'st-colonia-tearl', 'animation-delay:2s')}
        ${at(0, 0, 1, at(0, 0, 1, `<g clip-path="url(#st-colonia-tr)">${notice}</g>`, 'st-colonia-tearr', 'animation-delay:2s'), 'st-colonia-hide', 'animation-delay:2.4s')}
        ${at(0, 0, 1, at(0, 0, 1, person({ ...manuela, arm: 'out', act: 'press' }), 's-from-r'), 'st-colonia-hide', 'animation-delay:2.4s')}
        ${at(318, 404, 1, `<path d="M0,-20 L5,-6 L19,-8 L8,1 L16,13 L2,7 L-3,20 L-5,6 L-19,9 L-9,0 L-18,-11 L-5,-6Z" fill="#fff6b0"/>`, 's-flash', 'animation-delay:1.95s')}
        ${at(300, 352, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="18" fill="#a8322d" stroke="#fff" stroke-width="4" paint-order="stroke">¡Ras!</text>`, 's-flash', 'animation-delay:2s;animation-duration:1.3s')}
        ${at(0, 0, 1, hold(person, { ...manuela, act: 'raise' }, 'up', torn), 's-fade', 'animation-delay:2.4s;animation-duration:.3s')}
        ${at(0, 0, 1, person({ x: 246, y: 440, s: 0.9, skin: '#c58a5c', top: '#7a4a24', bottom: '#5b4630', hair: '#2b1b12', hat: 'straw', act: 'cheer' }), 's-up', 'animation-delay:2.7s')}
        ${at(0, 0, 1, person({ x: 470, y: 442, s: 0.9, skin: '#a86b45', top: '#e8a33d', dress: true, hair: '#1b120c', hairStyle: 'long', act: 'cheer' }), 's-up', 'animation-delay:2.9s')}
        ${at(0, 0, 1, person({ x: 526, y: 442, s: 0.86, skin: '#e3b08a', top: '#2f6f4f', bottom: '#3b2a20', hat: 'widebrim', act: 'cheer' }), 's-up', 'animation-delay:3.1s')}
        ${at(0, 0, 1, `<path d="M302,262 h148 a12,12 0 0 1 12,12 v14 a12,12 0 0 1 -12,12 h-56 l-10,12 l-2,-12 h-80 a12,12 0 0 1 -12,-12 v-14 a12,12 0 0 1 12,-12Z" fill="#fff" stroke="#a8322d" stroke-width="2.5"/><text x="376" y="287" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="16" fill="#a8322d">¡No más impuestos!</text>`, 's-in', 'animation-delay:3.3s')}
        ${at(226, 232, 1, `<path d="M-44,-14 H44 L36,0 L44,14 H-44 L-36,0Z" fill="#c62828"/><text y="6" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="17" fill="#fff">1781</text>`, 's-stamp', 'animation-delay:4s')}`;
      },
    ],
  };
})();
