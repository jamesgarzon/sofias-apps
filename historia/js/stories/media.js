// Historias de la Edad Media: escena animada que se reproduce al tocar cada chispa (mismo orden que los hotspots).
// Coordenadas del viewBox 800×500. Se ve con zoom ×1,9 centrado en la chispa: la persona que hace la acción va grande y al centro.
window.STORIES = window.STORIES || {};
window.STORIES.media = {
  css: `
    .st-media-hide { animation: st-media-hide .25s ease-in both; }
    @keyframes st-media-hide { to { opacity: 0; } }
    .st-media-bridge { transform-box: fill-box; transform-origin: 50% 100%; animation: st-media-bridge 1.2s ease-in both; }
    @keyframes st-media-bridge { to { transform: scaleY(-.48); } }
    .st-media-come { animation: st-media-come 1.6s ease-out both; }
    @keyframes st-media-come { from { transform: translateY(-48px) scale(.42); opacity: 0; } 12% { opacity: 1; } }
    .st-media-gallop { animation: st-media-gallop .3s ease-in-out 6 alternate; }
    @keyframes st-media-gallop { to { transform: translateY(-6px); } }
    .st-media-leg, .st-media-leg2 { transform-box: fill-box; transform-origin: 50% 0; animation: st-media-leg .3s ease-in-out 6 alternate; }
    .st-media-leg2 { animation-direction: alternate-reverse; }
    @keyframes st-media-leg { from { transform: rotate(-26deg); } to { transform: rotate(24deg); } }
  `,
  play: [
    // 0 · El castillo: baja el puente levadizo, sale el señor feudal con su estandarte y los guardias vigilan la muralla
    ({ at, person, sparkle }) => {
      const planks = [548, 556, 564, 572].map((x) => `<line x1="${x}" y1="232" x2="${x}" y2="274" stroke="#6b4320" stroke-width="1.6"/>`).join('');
      const label = (x, y, t, d, size = 17) => at(x, y, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="${size}" fill="#2f2a55" stroke="#fffaf0" stroke-width="5" paint-order="stroke" stroke-linejoin="round">${t}</text>`, 's-in', `animation-delay:${d}s`);
      const guard = (x, d) => at(0, 0, 1, person({ x, y: 222, s: 0.55, skin: '#efc39b', top: '#7a6e9a', bottom: '#4a4560', hat: 'knight', item: 'spear', arm: 'up', act: 'look' }), 's-up', `animation-delay:${d}s`);
      return `
        <defs><clipPath id="st-media-wall"><rect x="0" y="0" width="800" height="197.5"/></clipPath></defs>
        <path d="M542,274 L542,240 Q561,220 580,240 L580,274Z" fill="#2a2540"/>
        <g class="st-media-bridge" style="animation-delay:.3s"><path d="M542,274 L542,240 Q561,220 580,240 L580,274Z" fill="#9a6a38"/>${planks}<path d="M542,274 L542,240 Q561,220 580,240 L580,274Z" fill="none" stroke="#5b3a1a" stroke-width="2.5"/><circle cx="549" cy="246" r="2" fill="#3b3550"/><circle cx="573" cy="246" r="2" fill="#3b3550"/></g>
        <g clip-path="url(#st-media-wall)">${guard(503, 2.4)}${guard(614, 2.7)}</g>
        ${at(562, 324, 1, person({ x: 0, y: 0, s: 1, skin: '#efc39b', top: '#6a3d9a', bottom: '#3a2f5c', hair: '#6b4a2b', hat: 'crown', cape: '#c62828', boots: true, belt: '#d4a52c', item: 'flag', flag: 'gold', arm: 'up', act: 'raise', delay: 0 }), 'st-media-come', 'animation-delay:1.3s')}
        ${label(478, 304, 'Señor feudal', 3.3, 15)}
        ${label(370, 150, 'Feudalismo', 4.1)}
        ${[[318, 172, 4.4], [420, 132, 4.6], [640, 296, 4.8]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 1 · Los caballeros: un caballero llega galopando con armadura, escudo y espada, y se señalan sus partes
    ({ at, person, sparkle }) => {
      const leg = (x, cls) => `<g class="${cls}"><rect x="${x - 4.5}" y="-50" width="9" height="46" rx="4" fill="#7a4e2c"/><rect x="${x - 5.5}" y="-7" width="11" height="7" rx="2" fill="#2b2118"/></g>`;
      const horse = `
        ${leg(-34, 'st-media-leg2')}${leg(32, 'st-media-leg')}
        <path d="M-50,-76 Q-80,-70 -74,-24 Q-64,-52 -52,-62Z" fill="#3b2a1e"/>
        <ellipse cx="0" cy="-64" rx="54" ry="23" fill="#8a5a34"/>
        <path d="M28,-76 Q42,-104 50,-122 L70,-114 Q64,-90 56,-56Z" fill="#8a5a34"/>
        <path d="M48,-124 Q62,-134 74,-118 L90,-100 Q92,-90 82,-89 L66,-96 Q54,-100 48,-110Z" fill="#8a5a34"/>
        <path d="M52,-126 L55,-140 L62,-127Z" fill="#6b4423"/><circle cx="64" cy="-115" r="2.6" fill="#1b1209"/><circle cx="85" cy="-95" r="1.8" fill="#3b2a1e"/>
        <path d="M48,-126 Q36,-104 26,-78 L34,-76 Q44,-100 56,-120Z" fill="#3b2a1e"/>
        <path d="M-56,-86 L46,-86 L48,-50 L40,-42 L32,-50 L24,-42 L16,-50 L8,-42 L0,-50 L-8,-42 L-16,-50 L-24,-42 L-32,-50 L-40,-42 L-48,-50 L-56,-42Z" fill="#2f5fb3"/>
        <path d="M-56,-48 L-48,-40 L-40,-48 L-32,-40 L-24,-48 L-16,-40 L-8,-48 L0,-40 L8,-48 L16,-40 L24,-48 L32,-40 L40,-48 L48,-48" stroke="#f5c518" stroke-width="2.5" fill="none"/>
        <circle cx="22" cy="-66" r="7" fill="#f5c518"/><circle cx="-34" cy="-66" r="7" fill="#f5c518"/>
        <path d="M-2,-86 Q8,-78 10,-64 L8,-50" stroke="#8d96a3" stroke-width="10" fill="none" stroke-linecap="round"/><ellipse cx="11" cy="-48" rx="8" ry="4.5" fill="#1f1a17"/>
        <path d="M-40,-106 L-17,-106 L-17,-90 Q-17,-76 -28.5,-70 Q-40,-76 -40,-90Z" fill="#2e7d4f"/><path d="M-28.5,-104 L-28.5,-73 M-38,-93 L-19,-93" stroke="#f5c518" stroke-width="3.6"/>
        ${leg(-22, 'st-media-leg')}${leg(44, 'st-media-leg2')}`;
      const knight = person({ x: -6, y: -50, s: 0.9, skin: '#efc39b', top: '#c1c8d3', sleeve: '#aab3bf', bottom: '#8d96a3', armor: true, hat: 'knight', item: 'sword', arm: 'up', boots: true, act: 'raise', delay: 0 });
      const tag = (x, y, t, lx, ly, d) => at(0, 0, 1, `<line x1="${x}" y1="${y}" x2="${lx}" y2="${ly}" stroke="#2f2a55" stroke-width="2" stroke-dasharray="3 3"/><circle cx="${lx}" cy="${ly}" r="3.5" fill="#2f2a55"/><rect x="${x - 38}" y="${y - 13}" width="76" height="24" rx="8" fill="#fffaf0" stroke="#2f2a55" stroke-width="2"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="14" fill="#2f2a55">${t}</text>`, 's-in', `animation-delay:${d}s`);
      return `
        ${at(0, 0, 1, at(458, 404, 1, `<g class="st-media-gallop">${knight}${horse}</g>`), 's-from-l')}
        ${tag(398, 222, 'Espada', 472, 246, 2)}
        ${tag(354, 270, 'Armadura', 450, 304, 2.6)}
        ${tag(360, 326, 'Escudo', 424, 316, 3.2)}
        ${[[452, 214, 3.9], [530, 300, 4.1], [400, 360, 4.3]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 2 · Los campesinos: un campesino siembra, el trigo crece y un caballero del señor llega a protegerlos
    ({ at, person, sparkle }) => {
      const wheat = `<path d="M0,0 Q-1,-16 0,-32" stroke="#6a9a3a" stroke-width="2.6" fill="none"/><path d="M0,-14 Q-9,-18 -10,-11 Q-5,-11 0,-14Z" fill="#7cbf4a"/>${[0, 1, 2, 3].map((i) => `<ellipse cx="${i % 2 ? 2.6 : -2.6}" cy="${-30 - i * 4}" rx="2.4" ry="4.2" fill="#f2c14e" transform="rotate(${i % 2 ? 22 : -22} ${i % 2 ? 2.6 : -2.6} ${-30 - i * 4})"/>`).join('')}<ellipse cx="0" cy="-48" rx="2.4" ry="4.2" fill="#f2c14e"/>`;
      const label = (x, y, t, c, d) => at(x, y, 1, `<rect x="-44" y="-15" width="88" height="24" rx="8" fill="#fffaf0" stroke="${c}" stroke-width="2.2"/><text y="3" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="14" fill="${c}">${t}</text>`, 's-in', `animation-delay:${d}s`);
      return `
        ${[[276, 422], [298, 418], [320, 422], [286, 404], [308, 402]].map(([x, y], i) => at(x, y, 1, wheat, 's-grow', `animation-delay:${1.4 + i * 0.3}s`)).join('')}
        ${at(0, 0, 1, person({ x: 236, y: 416, s: 1.05, skin: '#e0a57a', top: '#8b6a45', bottom: '#5b4630', hair: '#5a3a22', hat: 'straw', item: 'pouch', act: 'sow', delay: 0 }), 's-from-l')}
        ${[0, 1, 2, 3].map((i) => at(262 + i * 7, 362, 0.62, `<circle r="3.8" fill="#f2c14e"/>`, 'a-drip', `animation-duration:1.4s;animation-delay:${0.8 + i * 0.35}s`)).join('')}
        ${at(0, 0, 1, person({ x: 436, y: 416, s: 0.98, skin: '#efc39b', top: '#c1c8d3', sleeve: '#aab3bf', bottom: '#8d96a3', armor: true, hat: 'knight', item: 'sword', shield: '#3b5bdb', boots: true, flip: true, act: 'look' }), 's-from-r', 'animation-delay:2.2s')}
        ${label(236, 282, 'Trabajo', '#7a5230', 3.4)}
        ${label(436, 282, 'Protección', '#2f5fb3', 3.8)}
        ${at(0, 0, 1, `<path d="M298,274 L372,274 M364,267 L373,274 L364,281" stroke="#7a5230" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M374,292 L300,292 M308,285 L299,292 L308,299" stroke="#2f5fb3" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, 's-fade', 'animation-delay:4.2s')}
        ${[[300, 372, 4.5], [330, 396, 4.7]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 3 · Los monasterios: un monje copia un libro a mano, letra por letra, y se levanta una gran catedral
    ({ at, person, sparkle, rnd }) => {
      const lines = [];
      const page = (x0, x1, ys) => ys.forEach((y, r) => { for (let x = (r < 2 && x0 < 340 ? x0 + 20 : x0); x < x1; x += 5.6) lines.push([x, y]); });
      page(306, 340, [256, 265, 274, 283, 292]);
      page(352, 386, [252, 261, 270, 279, 288]);
      const glyph = (i) => ['M0,0 v-5', 'M0,0 v-5 q2.5,-1 3,1 v4', 'M1.5,-2.5 m-1.8,0 a1.8,1.8 0 1 0 3.6,0 a1.8,1.8 0 1 0 -3.6,0', 'M0,0 v-7'][i % 4];
      const letters = lines.map(([x, y], i) => `<path d="${glyph(Math.floor(rnd() * 4))}" transform="translate(${x.toFixed(1)} ${y})" stroke="#3a2a20" stroke-width="1.15" fill="none" stroke-linecap="round" class="s-fade" style="animation-duration:.15s;animation-delay:${(1.5 + i * 0.045).toFixed(2)}s"/>`).join('');
      const cathedral = `
        <rect x="-44" y="-112" width="88" height="112" fill="#ece4d3"/><rect x="-62" y="-160" width="24" height="160" fill="#e2d8c4"/><rect x="38" y="-160" width="24" height="160" fill="#e2d8c4"/>
        <path d="M-56,-150 L-56,-132 Q-50,-142 -44,-132 L-44,-150Z M44,-150 L44,-132 Q50,-142 56,-132 L56,-150Z" fill="#5b4a8a"/>
        <path d="M-64,-160 L-50,-204 L-36,-160Z M36,-160 L50,-204 L64,-160Z" fill="#8f4a2a"/><path d="M-46,-112 L0,-146 L46,-112Z" fill="#a0522d"/>
        <circle cx="0" cy="-80" r="17" fill="#5b4a8a"/>${['#e23b3b', '#f5c518', '#3b82f6', '#2e9d5b', '#e23b3b', '#f5c518', '#3b82f6', '#2e9d5b'].map((c, i) => `<path d="M0,-80 L${(Math.cos((i * Math.PI) / 4) * 14).toFixed(1)},${(-80 + Math.sin((i * Math.PI) / 4) * 14).toFixed(1)} A14,14 0 0 1 ${(Math.cos(((i + 1) * Math.PI) / 4) * 14).toFixed(1)},${(-80 + Math.sin(((i + 1) * Math.PI) / 4) * 14).toFixed(1)}Z" fill="${c}"/>`).join('')}<circle cx="0" cy="-80" r="4.5" fill="#fff6c4"/>
        <path d="M-14,0 L-14,-30 Q0,-52 14,-30 L14,0Z" fill="#6b4423"/>
        <path d="M-56,-60 L-56,-84 Q-50,-96 -44,-84 L-44,-60Z M44,-60 L44,-84 Q50,-96 56,-84 L56,-60Z" fill="#5b4a8a"/>
        <path d="M-50,-204 v-12 M-55,-211 h10 M50,-204 v-12 M45,-211 h10" stroke="#5b3a1a" stroke-width="2.5"/>`;
      return `
        ${at(460, 340, 0.92, cathedral, 's-grow', 'animation-delay:3.4s;animation-duration:1.4s')}
        ${at(0, 0, 1, `<path d="M346,302 L346,350 M330,350 L362,350" stroke="#6b4423" stroke-width="5" stroke-linecap="round"/><path d="M296,302 L396,296 L396,302 L296,308Z" fill="#7a4f28"/>
          <path d="M300,300 L300,244 Q322,238 346,246 L346,300 Q322,293 300,300Z" fill="#fffaf0" stroke="#c9b28a" stroke-width="1.5"/>
          <path d="M346,300 L346,246 Q368,238 392,240 L392,296 Q368,292 346,300Z" fill="#f6efe0" stroke="#c9b28a" stroke-width="1.5"/>
          <rect x="398" y="282" width="7" height="16" rx="1.5" fill="#f4ecdc"/>${at(401.5, 282, 1, `<path d="M-3.5,0 Q-4.5,-7 0,-12 Q4.5,-7 3.5,0Z" fill="#ffb52e"/>`, 'a-flicker')}`, 's-in', 'animation-delay:.2s')}
        ${at(314, 262, 1, `<rect x="-9" y="-12" width="18" height="18" rx="2" fill="#c62828"/><text y="2" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="15" fill="#f5c518">A</text>`, 's-stamp', 'animation-delay:1.1s')}
        ${letters}
        ${at(0, 0, 1, person({ x: 262, y: 352, s: 1.1, skin: '#efc39b', top: '#6b4a2b', dress: true, hat: 'hood', act: 'paint', delay: 0 }), 's-from-l')}
        ${at(460, 362, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="15" fill="#2f2a55" stroke="#fffaf0" stroke-width="5" paint-order="stroke" stroke-linejoin="round">Catedral</text>`, 's-in', 'animation-delay:4.8s')}
        ${[[300, 232, 4.4], [396, 236, 4.6]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
  ],
};
