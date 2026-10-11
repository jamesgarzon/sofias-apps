// Historias de la Independencia: escena animada que se reproduce al tocar cada chispa (mismo orden que los hotspots).
// Coordenadas del viewBox 800×500. Se ve con zoom ×1,9 centrado en la chispa: deja lo importante cerca de ella.
window.STORIES = window.STORIES || {};
window.STORIES.independencia = (() => {
  // Pluma propia en la mano de quien escribe (act 'paint' dibuja un pincel: se cambia por `svg` en coordenadas de la mano).
  const BRUSH = /<line x1="([-\d.]+)" y1="([-\d.]+)" x2="[-\d.]+" y2="[-\d.]+" stroke="#c99a2e" stroke-width="3" stroke-linecap="round"\/><path d="M[-\d.]+,[-\d.]+ l4,-6 l2,2Z" fill="#c0452b"\/>/;
  const withQuill = (svg, quill) => svg.replace(BRUSH, (m, x1, y1) => `<g transform="translate(${+x1 + 4} ${+y1 - 6})">${quill}</g>`);
  const quill = '<path d="M13,4 Q-6,-6 -10,-32 Q4,-26 16,0Z" fill="#fffdf6" stroke="#b9a27a" stroke-width="1.2"/><path d="M12,2 Q0,-14 -8,-28" stroke="#c9b28a" stroke-width="1.2" fill="none"/><path d="M13,3 L17,9" stroke="#2b1d12" stroke-width="2.6" stroke-linecap="round"/>';
  const bubble = (x, y, w, h, tx, ty, inner, c = '#1f3a8a') => {
    const mx = Math.min(Math.max(tx, x + 16), x + w - 16);
    return `<path d="M${x + 12},${y} H${x + w - 12} Q${x + w},${y} ${x + w},${y + 12} V${y + h - 12} Q${x + w},${y + h} ${x + w - 12},${y + h} H${mx + 7} L${tx},${ty} L${mx - 7},${y + h} H${x + 12} Q${x},${y + h} ${x},${y + h - 12} V${y + 12} Q${x},${y} ${x + 12},${y}Z" fill="#fff" stroke="${c}" stroke-width="2.5"/>${inner}`;
  };
  const txt = (x, y, t, fs, c, w = 600) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="${w}" font-size="${fs}" fill="${c}">${t}</text>`;
  const ribbon = (x, y, t, c, fs = 16) => {
    const w = t.length * fs * 0.6 + 34;
    return `<path d="M${x - w / 2},${y - 15} H${x + w / 2} L${x + w / 2 - 10},${y} L${x + w / 2},${y + 15} H${x - w / 2} L${x - w / 2 + 10},${y}Z" fill="${c}"/>${txt(x, y + fs * 0.36, t, fs, '#fff', 700)}`;
  };
  const star = '<path d="M0,-16 L4,-4 L16,0 L4,4 L0,16 L-4,4 L-16,0 L-4,-4Z" fill="#fff6b0"/><circle r="5" fill="#fff"/>';
  const patriot = { skin: '#e3b08a', top: '#1f3a8a', bottom: '#f4f1e8', hair: '#1d120b', hat: 'bicorne', boots: true };
  const royalist = { skin: '#f1c6a0', top: '#b0263a', bottom: '#f1f1f4', hair: '#5a3a22', hat: 'tricorn', boots: true };
  return {
    css: `
      .st-independencia-hide { animation: st-independencia-hide .3s ease-in both; }
      @keyframes st-independencia-hide { to { opacity: 0; } }
      .st-independencia-march { animation: st-independencia-march 5.5s linear both; }
      @keyframes st-independencia-march { from { transform: translateX(-130px); } }
      .st-independencia-pass { animation: st-independencia-pass .8s ease-in-out both; }
      .st-independencia-bell { transform-box: fill-box; transform-origin: 50% 0; animation: st-independencia-bell .6s ease-in-out infinite alternate; }
      @keyframes st-independencia-bell { from { transform: rotate(-22deg); } to { transform: rotate(22deg); } }
      @media (prefers-reduced-motion: reduce) { .st-independencia-bell, .st-independencia-march { animation: none; } }
      @keyframes st-independencia-pass { 50% { transform: translate(22px, -26px) rotate(-10deg); } 100% { transform: translate(42.5px, -14.8px) scale(.95); } }`,
    play: [
      // 0 · El Florero de Llorente: un criollo pide prestado el florero, Llorente dice «¡No!», hay una pelea y el pueblo grita en la plaza
      ({ at, person, sparkle }) => {
        const criollo = { x: 152, y: 440, s: 1.08, skin: '#e9b48a', top: '#2f5d8a', bottom: '#efe6d2', hair: '#2b1b12', boots: true, delay: 0 };
        const rail = `<rect x="128" y="262" width="114" height="8" fill="#2f6f4f"/>${[134, 147, 160, 173, 186, 199, 212, 225, 238].map((x) => `<rect x="${x}" y="270" width="3" height="18" fill="#2f6f4f"/>`).join('')}<rect x="128" y="286" width="114" height="5" fill="#2f6f4f"/>`;
        const cloud = `<g fill="#f4f1ea">${[[-26, 4, 20], [0, -8, 24], [26, 4, 20], [-12, 18, 18], [14, 18, 18]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
          <g fill="#ffd23f">${[[-30, -22], [32, -20], [0, -36], [-40, 22], [40, 24]].map(([x, y]) => `<path d="M${x},${y - 7} l2,5 l5,2 l-5,2 l-2,5 l-2,-5 l-5,-2 l5,-2Z"/>`).join('')}</g>`;
        return `
        ${at(0, 0, 1, at(0, 0, 1, person({ ...criollo, arm: 'out', act: 'talk' }), 's-from-l'), 'st-independencia-hide', 'animation-delay:3.4s')}
        ${at(0, 0, 1, at(0, 0, 1, bubble(136, 262, 184, 36, 160, 328, txt(228, 286, '¿Nos presta el florero?', 15, '#1f3a8a')), 's-in', 'animation-delay:.7s'), 's-out', 'animation-delay:2.7s')}
        ${at(0, 0, 1, at(0, 0, 1, bubble(282, 312, 64, 38, 276, 372, txt(314, 339, '¡No!', 22, '#c62828', 700), '#c62828'), 's-in', 'animation-delay:1.9s'), 's-out', 'animation-delay:3.4s')}
        ${at(198, 404, 1.1, cloud, 's-flash', 'animation-delay:2.9s;animation-duration:1.3s')}
        ${at(0, 0, 1, person({ ...criollo, act: 'cheer' }), 's-fade', 'animation-delay:3.4s;animation-duration:.3s')}
        ${[[150, 290, '#c58a5c', '#a8322d', 'messy', 3.6], [192, 290, '#f1c6a0', '#f2ecdc', 'long', 3.8], [232, 290, '#8a5a3a', '#e8a33d', 'curly', 4]].map(([x, y, skin, top, hairStyle, d], i) => at(0, 0, 1, person({ x, y, s: 0.62, skin, top, bottom: '#3b2a20', hair: '#2b1b12', hairStyle, dress: i === 1, ...(i === 2 ? { item: 'flag', arm: 'out', act: 'raise' } : { act: 'cheer' }) }), 's-up', `animation-delay:${d}s`)).join('')}
        ${at(0, 0, 1, rail, 's-fade', 'animation-delay:3.6s;animation-duration:.2s')}
        ${at(380, 236, 1, ribbon(0, 0, '¡Grito de Independencia!', '#c62828', 15), 's-stamp', 'animation-delay:4.4s')}
        ${[[290, 220, 4.8], [470, 250, 5.1]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd23f', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
      },
      // 1 · Simón Bolívar: cruza con su ejército las montañas heladas de los Andes, con la bandera y bajo la nieve
      ({ at, person, lin, sparkle }) => {
        const flakes = [[262, 196], [300, 230], [338, 204], [372, 248], [410, 210], [446, 236], [484, 198], [520, 242], [556, 214], [594, 232], [282, 262], [430, 270], [576, 270], [350, 286], [500, 286], [610, 196]];
        return `
        ${lin('st-independencia-snow', [[0, '#f3f8ff'], [0.6, '#e6f0fb'], [1, '#e6f0fb', 0]])}
        ${lin('st-independencia-cold', [[0, '#b9d4ee'], [1, '#e4eff9']])}
        ${at(0, 0, 1, `<rect x="208" y="160" width="456" height="180" fill="url(#st-independencia-cold)"/>
          <path d="M208,330 L250,244 L300,266 L362,184 L432,270 L480,216 L530,266 L582,180 L650,262 L664,330Z" fill="#8aa0b8"/>
          <path d="M362,184 L432,270 L392,296Z M582,180 L650,262 L608,296Z M250,244 L300,266 L270,290Z M480,216 L530,266 L502,290Z" fill="#6f849c"/>
          <path d="M362,184 L344,212 L355,207 L364,216 L374,205 L383,212Z M582,180 L563,208 L574,203 L584,212 L594,201 L604,208Z M250,244 L238,262 L250,258 L260,264Z M480,216 L467,234 L478,231 L488,238 L496,231Z" fill="#fff"/>
          <path d="M200,306 Q330,288 460,300 T672,296 L672,358 L200,358Z" fill="url(#st-independencia-snow)"/>`, 's-fade', 'animation-duration:.9s')}
        ${txt(590, 262, 'Los Andes', 15, '#fff', 700).replace('<text', '<text stroke="#4a5f78" stroke-width="4" paint-order="stroke" class="s-fade" style="animation-delay:1s"')}
        ${at(0, 0, 1, [0, 1, 2].map((i) => person({ ...patriot, x: 282 + i * 38, y: 304, s: 0.5, item: 'spear', arm: 'up', act: 'walk' })).join(''), 'st-independencia-march', 'animation-delay:.4s')}
        ${at(0, 0, 1, person({ ...patriot, x: 472, y: 344, s: 0.95, hair: '#1d120b', epaulettes: true, cape: '#a8322d', item: 'flag', flag: 'col', arm: 'up', act: 'walk' }), 's-from-l', 'animation-delay:.3s;animation-duration:2.4s')}
        ${flakes.map(([x, y], i) => at(x, y, 1, `<circle r="${2.2 + (i % 3) * 0.6}" fill="#fff" class="a-drip" style="animation-duration:${2 + (i % 4) * 0.4}s;animation-delay:${(i * 0.23).toFixed(2)}s"/>`, 's-fade', 'animation-delay:.6s')).join('')}
        ${at(426, 230, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="17" fill="#3b6fd6" stroke="#fff" stroke-width="4" paint-order="stroke">¡Brrr!</text>`, 's-in', 'animation-delay:2.8s')}
        ${[[548, 196, 3.4], [560, 300, 3.8]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd23f', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
      },
      // 2 · Santander: escribe las leyes del nuevo país con su pluma y se abre una escuela a la que llegan los niños
      ({ at, person, sparkle }) => `
        ${at(0, 0, 1, `<path d="M460,300 L456,338 M516,300 L520,338" stroke="#6b4423" stroke-width="5" stroke-linecap="round"/>
          <path d="M444,302 L532,302 L524,250 L452,250Z" fill="#8b5a2b"/><path d="M452,296 L524,296 L518,256 L458,256Z" fill="#fffaf0"/>`, 's-in', 'animation-delay:.1s')}
        ${txt(488, 271, 'Leyes', 14, '#1f3a8a', 700).replace('<text', '<text class="s-fade" style="animation-delay:.6s"')}
        ${[[466, 280, 508], [464, 286, 512], [463, 292, 500]].map(([x1, y, x2], i) => `<path d="M${x1},${y} H${x2}" pathLength="1" stroke="#5b6478" stroke-width="2" stroke-linecap="round" class="s-draw" style="animation-delay:${1 + i * 0.7}s;animation-duration:.7s"/>`).join('')}
        ${at(0, 0, 1, withQuill(person({ x: 414, y: 338, s: 1, skin: '#f1c6a0', top: '#24407a', bottom: '#f4f1e8', hair: '#3a2416', hat: 'bicorne', epaulettes: true, boots: true, act: 'paint', delay: 0 }), quill), 's-fade', 'animation-delay:.1s')}
        ${at(586, 300, 1, `<rect x="-40" y="-50" width="80" height="50" fill="#fbf3dd"/><path d="M-46,-48 L0,-76 L46,-48Z" fill="#c0533a"/><rect x="-6" y="-92" width="12" height="16" fill="#fbf3dd"/><path d="M-8,-92 L0,-100 L8,-92Z" fill="#c0533a"/>
          <path d="M-10,0 V-20 Q0,-30 10,-20 V0Z" fill="#7a4a24"/><rect x="-32" y="-34" width="14" height="14" rx="2" fill="#7ec8f5"/><rect x="18" y="-34" width="14" height="14" rx="2" fill="#7ec8f5"/>
          <rect x="-26" y="-49" width="52" height="15" rx="4" fill="#fff" stroke="#c0533a" stroke-width="1.5"/>${txt(0, -37, 'Escuela', 12, '#c0533a', 700)}`, 's-grow', 'animation-delay:3s')}
        ${at(586, 216, 1, `<g class="st-independencia-bell"><path d="M-5,0 Q-5,-7 0,-8 Q5,-7 5,0Z" fill="#e8b931"/></g>`, 's-fade', 'animation-delay:3.6s')}
        ${[[642, 0], [672, 0.25]].map(([x, d], i) => at(0, 0, 1, person({ x, y: 298, s: 0.5, skin: i ? '#8a5a3a' : '#f1c6a0', top: i ? '#f5c518' : '#e05297', dress: !i, bottom: '#3b2a20', hair: '#2b1b12', hairStyle: i ? 'curly' : 'long', item: 'book', itemColor: i ? '#2e7d32' : '#c62828', arm: 'out', flip: true, act: 'walk' }), 's-from-r', `animation-delay:${3.8 + d}s`)).join('')}
        ${[[488, 244, 2.8], [586, 196, 4.6], [630, 252, 4.9]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd23f', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`,
      // 3 · La Pola: le pasa en secreto una carta a un soldado patriota mientras el guardia mira para otro lado
      ({ at, person, sparkle }) => {
        const letter = '<rect width="20" height="14" rx="1.5" fill="#fffaf0" stroke="#c9b28a"/><path d="M0,0 L10,8 L20,0" stroke="#c9b28a" fill="none"/><circle cx="10" cy="8" r="2.8" fill="#c62828"/>';
        const sold = { ...patriot, x: 420, y: 346, s: 0.95, skin: '#c58a5c', arm: 'out', flip: true, delay: 0 };
        return `
        ${at(0, 0, 1, person({ ...royalist, x: 208, y: 364, s: 0.9, item: 'spear', arm: 'up', flip: true, act: 'look', delay: 0 }), 's-fade', 'animation-delay:.1s')}
        ${at(0, 0, 1, person({ x: 300, y: 364, s: 1, skin: '#efc39b', top: '#2f7a6a', dress: true, hair: '#3a2416', hairStyle: 'bun', cape: '#f2e6d0', arm: 'out', act: 'idle' }), 's-from-l')}
        ${at(0, 0, 1, at(0, 0, 1, person({ ...sold, act: 'look' }), 's-from-r', 'animation-delay:.4s'), 'st-independencia-hide', 'animation-delay:2.9s')}
        ${at(0, 0, 1, at(0, 0, 1, at(330, 300, 1, letter, 'st-independencia-pass', 'animation-delay:2.1s'), 's-from-l'), 'st-independencia-hide', 'animation-delay:2.9s')}
        ${at(0, 0, 1, person({ ...sold, item: 'letter', act: 'read' }), 's-fade', 'animation-delay:2.9s;animation-duration:.3s')}
        ${at(0, 0, 1, at(0, 0, 1, bubble(228, 212, 74, 34, 290, 258, txt(265, 235, '¡Shhh!', 17, '#2f7a6a', 700), '#2f7a6a'), 's-in', 'animation-delay:.9s'), 's-out', 'animation-delay:3s')}
        ${at(222, 244, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="26" fill="#b0263a" stroke="#fff" stroke-width="4" paint-order="stroke">?</text>`, 's-in', 'animation-delay:3.2s')}
        ${at(392, 210, 1, ribbon(0, 0, 'Mensaje secreto', '#2f7a6a', 14), 's-stamp', 'animation-delay:3.6s')}
        ${[[372, 270, 4], [420, 232, 4.3]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd23f', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`;
      },
      // 4 · La Batalla de Boyacá: un patriota y un realista chocan espadas; el realista se rinde y los patriotas celebran en el puente
      ({ at, person, sparkle }) => `
        ${at(0, 0, 1, person({ ...patriot, x: 452, y: 318, s: 1, item: 'sword', arm: 'up', act: 'fight', delay: 0 }), 'st-independencia-hide', 'animation-delay:3.4s')}
        ${at(0, 0, 1, person({ ...royalist, x: 562, y: 318, s: 1, item: 'sword', arm: 'up', flip: true, act: 'fight', delay: 0 }), 'st-independencia-hide', 'animation-delay:3.4s')}
        ${at(0, 0, 1, at(507, 247, 1, star, 'pa pa-clash'), 'st-independencia-hide', 'animation-delay:3.3s')}
        ${at(0, 0, 1, person({ ...patriot, x: 446, y: 318, s: 1, item: 'flag', flag: 'col', arm: 'up', act: 'raise' }), 's-fade', 'animation-delay:3.4s;animation-duration:.3s')}
        ${at(0, 0, 1, person({ ...royalist, x: 562, y: 318, s: 1, item: 'flag', flag: '#ffffff', arm: 'out', act: 'none' }), 's-fade', 'animation-delay:3.4s;animation-duration:.3s')}
        ${[612, 640, 668].map((x, i) => at(0, 0, 1, person({ ...patriot, x, y: 298, s: 0.45, skin: ['#c58a5c', '#e3b08a', '#8a5a3a'][i], act: 'cheer' }), 's-from-r', `animation-delay:${3.9 + i * 0.2}s`)).join('')}
        ${at(632, 180, 1, ribbon(0, 0, '¡Victoria!', '#1f3a8a', 17), 's-stamp', 'animation-delay:4.4s')}
        ${[[400, 196, 4.8], [600, 214, 5.1], [507, 200, 5.4]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd23f', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`,
    ],
  };
})();
