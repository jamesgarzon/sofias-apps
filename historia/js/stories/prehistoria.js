// Historias de la Prehistoria: escena animada que se reproduce al tocar cada chispa (mismo orden que los hotspots).
// Coordenadas del viewBox 800×500. Se ve con zoom ×1,9 centrado en la chispa: deja lo importante cerca de ella.
window.STORIES = window.STORIES || {};
window.STORIES.prehistoria = {
  css: '',
  play: [
    // 0 · Pinturas rupestres: una persona estampa sus manos en la pared y otra repinta el bisonte
    ({ at, person, sparkle }) => {
      const hand = (c) => `<g fill="${c}"><ellipse cx="0" cy="0" rx="7" ry="8"/></g><path d="M-5,-4 L-8,-15 M-2,-6 L-3,-19 M1.5,-6 L2,-19 M4.5,-5 L7,-16 M6,0 L12,-5" stroke="${c}" stroke-width="3.4" stroke-linecap="round"/>`;
      const bison = 'M0,0 Q-2,-14 10,-18 Q18,-30 34,-26 Q50,-30 60,-20 Q70,-14 68,-2 Q66,6 60,6 L58,18 L54,18 L52,8 L22,8 L20,19 L16,19 L14,8 Q4,8 0,0Z';
      return `
        ${at(150, 346, 1, `<path d="M-14,0 Q-14,-10 0,-10 Q14,-10 14,0Z" fill="#7a4a2a"/><ellipse cx="0" cy="-9" rx="12" ry="3" fill="#c0452b"/><path d="M14,0 Q14,-10 28,-10 Q42,-10 42,0Z" fill="#7a4a2a"/><ellipse cx="28" cy="-9" rx="12" ry="3" fill="#f1dcc0"/>`, 's-in', 'animation-delay:.2s')}
        ${at(262, 346, 1, `<line x1="0" y1="0" x2="0" y2="-34" stroke="#6b4423" stroke-width="4" stroke-linecap="round"/>${at(0, -34, 1, `<path d="M-6,0 Q-8,-12 0,-22 Q8,-12 6,0Z" fill="#ffb52e"/><path d="M-3,0 Q-3,-8 0,-13 Q3,-8 3,0Z" fill="#fff1a0"/>`, 'a-flicker')}`, 's-in', 'animation-delay:.4s')}
        ${at(0, 0, 1, person({ x: 104, y: 346, s: 0.95, skin: '#c78b5c', top: '#8a5a2b', bottom: '#6e4524', hair: '#3a2414', hairStyle: 'messy', shoe: '#5a3a22', act: 'press', delay: 0 }), 's-from-l')}
        ${[[136, 282, '#c0452b', 0.6], [150, 274, '#f1dcc0', 1.8], [124, 292, '#d0573a', 3.0], [147, 288, '#c0452b', 4.2]].map(([x, y, c, d]) => at(x, y, 0.95, hand(c), 's-stamp', `animation-delay:${d}s`)).join('')}
        ${at(0, 0, 1, person({ x: 232, y: 346, s: 0.95, skin: '#b97b50', top: '#a46a32', dress: true, hair: '#2a180e', hairStyle: 'long', flip: true, item: 'stick', itemColor: '#c0452b', act: 'dab', delay: 0 }), 's-from-r')}
        ${at(108, 236, 1.05, `<path d="${bison}" pathLength="1" fill="none" stroke="#5a1a0a" stroke-width="2.6" class="s-draw" style="animation-delay:.6s;animation-duration:3s"/><path d="${bison}" fill="#de5a32" class="s-fade" style="animation-delay:3.4s"/>`)}
        ${[[120, 214, 3.8], [178, 222, 4.1], [150, 262, 4.4]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 1 · ¡El fuego!: la cocinera asa la carne (chisporrotea y huele rico), sube la luz y llega alguien con una antorcha
    ({ at, person, rad }) => `
      ${rad('st-pre-glow', [[0, '#ffd36b', 0.55], [1, '#ffd36b', 0]])}
      <circle cx="388" cy="410" r="190" fill="url(#st-pre-glow)" class="s-fade"/>
      ${[0, 1, 2].map((i) => at(400 + i * 11, 404, 1, `<path d="M0,0 q-5,-8 0,-16 q5,-8 0,-16" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" class="a-rise" style="animation-delay:${i * 0.5}s"/>`, 's-fade', 'animation-delay:1.2s')).join('')}
      ${[0, 1].map((i) => at(406 + i * 9, 430, 1, `<ellipse rx="1.8" ry="2.6" fill="#ffcf7a"/>`, 'a-drip', `animation-duration:1.1s;animation-delay:${0.6 + i * 0.55}s`)).join('')}
      ${[[350, 370, 0.4], [430, 372, 0.9], [395, 340, 1.4], [340, 340, 2], [452, 396, 2.6], [372, 356, 3.2]].map(([x, y, d]) => at(x, y, 1, `<path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2Z" fill="#ffd36b"/>`, 's-flash', `animation-delay:${d}s`)).join('')}
      ${at(438, 352, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="17" fill="#fff6d6" stroke="#7a3417" stroke-width="3" paint-order="stroke">¡Mmm!</text>`, 's-in', 'animation-delay:2.2s')}
      ${at(0, 0, 1, person({ x: 548, y: 458, s: 0.85, skin: '#d29a6a', top: '#a46a32', bottom: '#6e4524', hair: '#2a180e', hairStyle: 'messy', item: 'torch', arm: 'up', act: 'raise', flip: true }), 's-from-r', 'animation-delay:1s')}`,
    // 2 · Cazadores y recolectores: cazadores que se acercan al mamut y una recolectora que llena su canasta
    ({ at, person }) => {
      const bush = `<circle cx="0" cy="-16" r="18" fill="#3f8a3a"/><circle cx="-16" cy="-6" r="13" fill="#4f9e45"/><circle cx="16" cy="-6" r="13" fill="#4f9e45"/>`;
      const berries = [[-8, -20], [6, -24], [-14, -6], [12, -10], [0, -8]];
      return `
        ${at(392, 410, 1.1, bush, 's-in')}
        ${berries.map(([x, y], i) => at(392 + x * 1.1, 410 + y * 1.1, 1, `<circle r="3.6" fill="#e23b3b"/>`, 's-out', `animation-delay:${1 + i * 0.7}s`)).join('')}
        ${at(345, 412, 1, `<path d="M-14,0 L-11,-14 L11,-14 L14,0Z" fill="#c99a4b"/><path d="M-12,-7 h24" stroke="#9c7130" stroke-width="1.5"/>`, 's-in', 'animation-delay:.3s')}
        ${berries.map((_, i) => at(338 + (i % 3) * 7, 396 - Math.floor(i / 3) * 5, 1, `<circle r="3.4" fill="#e23b3b"/>`, 's-in', `animation-delay:${1.3 + i * 0.7}s`)).join('')}
        ${at(0, 0, 1, person({ x: 368, y: 414, s: 0.82, skin: '#b97b50', top: '#a46a32', dress: true, hair: '#2a180e', hairStyle: 'long', act: 'press', delay: 0 }), 's-from-l')}
        ${at(0, 0, 1, person({ x: 648, y: 412, s: 0.8, skin: '#c78b5c', top: '#8a5a2b', bottom: '#6e4524', hair: '#3a2414', hairStyle: 'messy', item: 'spear', arm: 'up', flip: true, act: 'shake' }), 's-from-r', 'animation-delay:.4s')}
        ${at(0, 0, 1, person({ x: 674, y: 414, s: 0.78, skin: '#a96a40', top: '#7a4a24', bottom: '#5b3a1a', hair: '#1d120b', item: 'spear', arm: 'up', flip: true, act: 'shake' }), 's-from-r', 'animation-delay:.8s')}
        ${at(500, 336, 1, `<path d="M0,0 l-14,-8 M0,6 l-16,2 M0,12 l-14,10" stroke="#fff" stroke-width="3" stroke-linecap="round" class="a-glow"/>`, 's-fade', 'animation-delay:2s')}`;
    },
    // 3 · Herramientas de piedra: el tallador golpea su piedra (en la escena) y aparecen las tres épocas de herramientas
    ({ at, sparkle }) => {
      const label = (t) => `<text y="26" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="13" fill="#5b3a1a">${t}</text>`;
      return `
        ${[0, 1.4, 2.8].map((d) => at(212, 408, 1, `<circle r="22" fill="none" stroke="#fff6b0" stroke-width="3"/>`, 's-flash', `animation-delay:${d}s;animation-duration:1.2s`)).join('')}
        ${at(395, 262, 1, `<rect x="-112" y="-40" width="224" height="80" rx="14" fill="#fbf3dd" stroke="#8a6a3a" stroke-width="3"/><path d="M-37,-4 l10,4 l-10,4 M37,-4 l10,4 l-10,4" stroke="#8a6a3a" stroke-width="3" fill="none" stroke-linecap="round"/>`, 's-in', 'animation-delay:.2s')}
        ${at(325, 262, 1, `<path d="M-12,4 L-14,-8 L-4,-18 L8,-14 L13,-2 L6,6Z" fill="#9aa1a8"/><path d="M-4,-18 L0,-6 L-14,-8Z M8,-14 L0,-6 L13,-2Z" fill="#7d858d"/>${label('Tallada')}`, 's-in', 'animation-delay:.8s')}
        ${at(395, 262, 1, `<path d="M-13,2 Q-14,-14 0,-18 Q14,-14 13,2 Q0,8 -13,2Z" fill="#4b6b5a"/><ellipse cx="-4" cy="-9" rx="4" ry="6" fill="#fff" opacity=".35"/>${label('Pulida')}`, 's-in', 'animation-delay:2s')}
        ${at(465, 262, 1, `<rect x="-2" y="-22" width="4" height="26" rx="2" fill="#7a5230"/><path d="M-14,-20 Q-2,-26 8,-20 L8,-8 Q-2,-14 -14,-8Z" fill="#d17a3a"/><path d="M-10,-18 L4,-20" stroke="#ffd29a" stroke-width="2"/>${label('Metal')}`, 's-in', 'animation-delay:3.2s')}
        ${[[325, 236, 1.2], [395, 236, 2.4], [465, 236, 3.6]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#f2c14e', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 4 · Agricultura y aldeas: alguien siembra, brotan las plantas, llega una oveja y se construye otra choza
    ({ at, person, smoke }) => {
      const sprout = `<path d="M0,0 Q-1,-10 0,-20" stroke="#3f8a3a" stroke-width="3" fill="none"/><path d="M0,-10 Q-10,-16 -12,-8 Q-6,-8 0,-10Z M0,-14 Q10,-22 13,-13 Q6,-12 0,-14Z" fill="#5cb945"/><ellipse cx="0" cy="-23" rx="3" ry="5" fill="#f2c14e"/>`;
      const sheep = `<g class="a-bob"><ellipse cx="0" cy="-16" rx="18" ry="12" fill="#f4f1ea"/><circle cx="-12" cy="-22" r="7" fill="#f4f1ea"/><circle cx="8" cy="-24" r="8" fill="#f4f1ea"/><ellipse cx="18" cy="-20" rx="6" ry="7" fill="#3b3330"/><circle cx="20" cy="-22" r="1.4" fill="#fff"/></g><path d="M-10,-6 v10 M-3,-6 v10 M6,-6 v10 M12,-6 v10" stroke="#3b3330" stroke-width="3" stroke-linecap="round"/>`;
      const hut = `<path d="M-38,0 Q-32,-48 0,-64 Q32,-48 38,0Z" fill="#d6aa58"/>${[-24, -12, 0, 12, 24].map((x) => `<path d="M${x * 0.3},-60 Q${x},-30 ${x * 1.25},0" stroke="#a87e36" stroke-width="2" fill="none"/>`).join('')}<path d="M-10,0 L-10,-18 Q0,-26 10,-18 L10,0Z" fill="#3a2414"/>`;
      return `
        ${at(468, 334, 0.6, hut, 's-up', 'animation-delay:3.2s')}
        ${at(0, 0, 1, smoke(738, 312, 3, 9, '#cdbfae', 4), 's-fade', 'animation-delay:1s')}
        ${[706, 730, 754].map((x, i) => at(x, 420, 1.1, sprout, 's-grow', `animation-delay:${1 + i * 0.6}s`)).join('')}
        ${at(0, 0, 1, person({ x: 672, y: 416, s: 0.82, skin: '#b97b50', top: '#a46a32', bottom: '#6e4524', hair: '#2a180e', hat: null, item: 'pouch', act: 'sow', delay: 0 }), 's-from-l')}
        ${[0, 1, 2, 3].map((i) => at(700 + i * 6, 374, 1, `<circle r="2.2" fill="#f2c14e"/>`, 'a-drip', `animation-duration:1.4s;animation-delay:${0.7 + i * 0.35}s`)).join('')}
        ${at(420, 414, 0.9, sheep, 's-from-l', 'animation-delay:1.6s')}`;
    },
  ],
};
