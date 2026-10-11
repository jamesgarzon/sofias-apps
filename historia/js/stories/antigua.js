// Historias de la Edad Antigua: escena animada que se reproduce al tocar cada chispa (mismo orden que los hotspots).
// Coordenadas del viewBox 800×500. Se ve con zoom ×1,9 centrado en la chispa: deja lo importante cerca de ella.
window.STORIES = window.STORIES || {};
window.STORIES.antigua = {
  css: `
    .st-antigua-ramp { animation: st-antigua-ramp 3.2s ease-in-out .6s both; }
    @keyframes st-antigua-ramp { to { transform: translate(55px, -63px); } }
    .st-antigua-walk { animation: st-antigua-walk 10s linear infinite; }
    @keyframes st-antigua-walk { from { transform: translateX(-60px); } to { transform: translateX(440px); } }
    .st-antigua-walk-back { animation: st-antigua-walk-back 12s linear infinite; }
    @keyframes st-antigua-walk-back { from { transform: translateX(60px); } to { transform: translateX(-440px); } }`,
  play: [
    // 0 · La escritura: el escriba llena una tablilla de barro nueva con signos cuneiformes, uno por uno
    ({ at, sparkle }) => {
      const signs = [];
      for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++) {
        const x = 624 + c * 13 + (r % 2) * 4, y = 400 + r * 13, i = r * 5 + c;
        const g = i % 3 === 0 ? 'M0,0 l8,0 l-4,7Z' : 'M0,0 l3,-1 l1,8 l-2,0Z M4,1 l6,0 l-3,4Z';
        signs.push(`<g transform="translate(${x} ${y})"><path d="${g}" fill="#6e4021" class="s-stamp" style="animation-delay:${(0.5 + i * 0.12).toFixed(2)}s"/></g>`);
      }
      return `
        <rect x="617" y="389" width="72" height="86" rx="11" fill="url(#an-tab)"/>
        ${signs.join('')}
        ${at(520, 266, 1, `<rect x="-96" y="-22" width="192" height="44" rx="12" fill="#fff8e6" stroke="#9a6237" stroke-width="3"/><text y="7" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="19" fill="#7a3f17">¡Empieza la Historia!</text>`, 's-in', 'animation-delay:4.4s')}
        ${[[652, 378, 4.6], [700, 400, 4.8], [606, 380, 5]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 1 · Egipto: un obrero sube un bloque por la pirámide, se pone la punta dorada y aparecen jeroglíficos
    ({ at, person, sparkle }) => {
      const glyphs = [
        `<path d="M-10,0 Q0,-8 10,0 Q0,8 -10,0Z" fill="none" stroke="#2a3a6b" stroke-width="2.2"/><circle r="3" fill="#2a3a6b"/><path d="M-4,5 l-2,8 M2,5 q4,6 8,4" stroke="#2a3a6b" stroke-width="2" fill="none"/>`,
        `<path d="M-8,9 Q-10,-2 -2,-6 Q4,-12 8,-8 L12,-6 L8,-4 Q8,4 2,9Z" fill="#2a3a6b"/><path d="M-2,9 v5 M3,9 v5" stroke="#2a3a6b" stroke-width="1.8"/>`,
        `<ellipse cx="0" cy="-7" rx="4" ry="5.5" fill="none" stroke="#c0452b" stroke-width="2.6"/><path d="M0,-1 V13 M-7,1 H7" stroke="#c0452b" stroke-width="2.6"/>`,
        `<path d="M-10,-3 l3,-3 l3,3 l3,-3 l3,3 l3,-3 l3,3 M-10,5 l3,-3 l3,3 l3,-3 l3,3 l3,-3 l3,3" stroke="#3f7fc4" stroke-width="2" fill="none"/>`,
      ];
      return `
        ${at(0, 0, 1, `<g class="st-antigua-ramp">
          <rect x="141" y="234" width="18" height="12" rx="1.5" fill="#e9c27e" stroke="#a87634" stroke-width="1.5"/>
          ${person({ x: 128, y: 268, s: 0.42, skin: '#a96a40', top: '#a96a40', sleeve: '#a96a40', bottom: '#f4efe2', hair: '#1b1209', belt: '#d4a52c', act: 'press', delay: 0 })}
        </g>`, 's-fade')}
        ${at(0, 0, 1, `<path d="M232,146 L214,168 L232,168Z" fill="#ffd84a"/><path d="M232,146 L232,168 L250,168Z" fill="#e0a520"/>`, 's-drop', 'animation-delay:3.9s')}
        ${[[232, 150, 4.5], [246, 162, 4.8]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}
        ${at(446, 168, 1, `<rect x="-58" y="-28" width="116" height="56" rx="8" fill="#f3e3b5" stroke="#b8893e" stroke-width="3"/>`, 's-in', 'animation-delay:.6s')}
        ${glyphs.map((g, i) => at(410 + i * 24, 168, 1, g, 's-in', `animation-delay:${1.2 + i * 0.5}s`)).join('')}
        ${at(446, 214, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="15" fill="#fff" stroke="#7a4a1c" stroke-width="3" paint-order="stroke">Jeroglíficos</text>`, 's-in', 'animation-delay:3.2s')}`;
    },
    // 2 · Junto a los grandes ríos: el agua del Nilo corre por un canal y hace crecer el trigo que cuida un campesino
    ({ at, person }) => {
      const wheat = `<path d="M0,0 Q2,-22 0,-44" stroke="#c99a2e" stroke-width="2.4" fill="none"/>${[0, 1, 2, 3].map((i) => `<ellipse cx="${i % 2 ? 3 : -3}" cy="${-30 - i * 5}" rx="2.6" ry="4.8" fill="#f2c14e" transform="rotate(${i % 2 ? 25 : -25} ${i % 2 ? 3 : -3} ${-30 - i * 5})"/>`).join('')}<ellipse cx="0" cy="-52" rx="2.6" ry="4.8" fill="#f2c14e"/>`;
      return `
        <path d="M358,374 L440,374" stroke="#8a5a2c" stroke-width="10" stroke-linecap="round" opacity=".35" class="s-fade"/>
        <path d="M398,398 L398,374 L438,374" pathLength="1" stroke="#3fa3e0" stroke-width="6" fill="none" stroke-linecap="round" class="s-draw" style="animation-delay:.5s;animation-duration:1.6s"/>
        <path d="M398,374 L360,374" pathLength="1" stroke="#3fa3e0" stroke-width="6" fill="none" stroke-linecap="round" class="s-draw" style="animation-delay:1.4s;animation-duration:.8s"/>
        ${[366, 382, 398, 414, 430].map((x, i) => at(x, 370, 0.9, wheat, 's-grow', `animation-delay:${2 + i * 0.3}s`)).join('')}
        ${at(0, 0, 1, person({ x: 462, y: 388, s: 0.7, skin: '#a96a40', top: '#f4efe2', bottom: '#f4efe2', hair: '#1b1209', belt: '#3f7fc4', act: 'hoe', flip: true }), 's-from-r')}
        ${at(170, 424, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="17" fill="#fff" stroke="#1f5f96" stroke-width="3.5" paint-order="stroke">Río Nilo</text>`, 's-in', 'animation-delay:1s')}`;
    },
    // 3 · Grecia: los Juegos Olímpicos. Sube el podio (3.º, 2.º y 1.º) y el ganador recibe su corona de olivo
    ({ at, person, sparkle }) => {
      const block = (x, w, h, n, c, d) => at(x, 374, 1, `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="#d0733a"/><rect x="${-w / 2}" y="${-h}" width="${w}" height="7" fill="#e89a5c"/><text y="${-h / 2 + 10}" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="24" fill="${c}" stroke="#7a3417" stroke-width="2" paint-order="stroke">${n}</text>`, 's-grow', `animation-delay:${d}s`);
      const wreath = `<path d="M-19,-90 Q0,-106 19,-90" stroke="#3f7a32" stroke-width="2.4" fill="none"/>${[-16, -10, -4, 4, 10, 16].map((x, i) => { const y = -95 - (3 - Math.abs(x) / 6); return `<ellipse cx="${x}" cy="${y}" rx="5" ry="2.6" fill="${i % 2 ? '#5cae45' : '#3f8a3a'}" transform="rotate(${x < 0 ? -30 : 30} ${x} ${y})"/>`; }).join('')}`;
      const winner = { x: 601, y: 320, s: 0.62, skin: '#e3a97c', top: '#2f6fd6', bottom: '#f4efe2', hair: '#3a2414', hairStyle: 'curly', act: 'cheer', delay: 0 };
      return `
        ${block(653, 52, 26, 3, '#f0b27a', 0.2)}${block(549, 52, 38, 2, '#e8edf3', 0.5)}${block(601, 52, 54, 1, '#ffd84a', 0.8)}
        ${at(0, 0, 1, person({ x: 653, y: 348, s: 0.6, skin: '#d29a6a', top: '#2e9d5b', bottom: '#f4efe2', hair: '#5b3a1a', hairStyle: 'bun', dress: true, act: 'wave', flip: true }), 's-drop', 'animation-delay:1.3s')}
        ${at(0, 0, 1, person({ x: 549, y: 336, s: 0.6, skin: '#b97b50', top: '#d94b4b', bottom: '#f4efe2', hair: '#2a180e', act: 'wave' }), 's-drop', 'animation-delay:1.9s')}
        ${at(0, 0, 1, person(winner), 's-drop', 'animation-delay:2.5s')}
        ${at(0, 0, 1, person(Object.assign({}, winner, { hat: 'laurel' })), 's-fade', 'animation-delay:3.4s')}
        ${at(601, 320, 0.62, `<g class="s-out" style="animation-delay:3.4s;animation-duration:.2s">${wreath}</g>`, 's-drop', 'animation-delay:2.9s;animation-duration:.6s')}
        ${at(601, 168, 1, `<rect x="-104" y="-22" width="208" height="42" rx="12" fill="#fff8e6" stroke="#2f6fd6" stroke-width="3"/><text y="7" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="20" fill="#1d3f8f">Juegos Olímpicos</text>`, 's-in', 'animation-delay:.3s')}
        ${[[562, 236, 3.8], [640, 228, 4], [601, 210, 4.2], [520, 270, 4.4], [690, 280, 4.6]].map(([x, y, d], i) => at(x, y, 1, sparkle(0, 0, 0, ['#ffd84a', '#fff6b0', '#ff9ec4'][i % 3], 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 4 · Roma: una ventana al Imperio romano. El Coliseo, gente que camina por los caminos y el puente, y el agua del acueducto
    ({ at, person, lin }) => {
      const W = 376, Hh = 226;
      let arches = '';
      for (let r = 0; r < 3; r++) for (let i = 0; i < 11; i++) arches += `<path d="M${-66 + i * 13},${-6 - r * 20} v-8 a4,4 0 0 1 8,0 v8Z" fill="#9a6a3a"/>`;
      const coliseo = `<path d="M-76,0 L-76,-66 Q-20,-82 40,-74 L48,-64 L60,-70 L76,-60 L76,0Z" fill="#e6c48e"/>
        <path d="M-76,-20 Q0,-26 76,-20 M-76,-40 Q0,-48 76,-40 M-76,-60 Q-20,-70 40,-66" stroke="#c99a5a" stroke-width="2.4" fill="none"/>${arches}`;
      let aq = `<rect x="0" y="0" width="150" height="6" fill="#d9b585"/>`;
      for (let i = 0; i < 6; i++) aq += `<path d="M${i * 25},6 v26 h4 q0,-18 8.5,-18 q8.5,0 8.5,18 h4 v-26Z" fill="#d9b585"/>`;
      let bridge = `<rect x="0" y="0" width="170" height="10" fill="#c9a06a"/>`;
      for (let i = 0; i < 4; i++) bridge += `<path d="M${i * 42 + 2},10 v34 h6 q0,-26 15,-26 q15,0 15,26 h6 v-34Z" fill="#c9a06a"/>`;
      const walker = (x, y, cls, d, o) => at(x, y, 1, person(Object.assign({ x: 0, y: 0, s: 0.5, act: 'walk', bottom: '#f4efe2' }, o)), cls, `animation-delay:${d}s`);
      return at(236, 146, 1, `
        <defs><clipPath id="st-an-card"><rect width="${W}" height="${Hh}" rx="16"/></clipPath>
          ${lin('st-an-sky', [[0, '#7cc4f5'], [1, '#e9f6ff']])}</defs>
        <g clip-path="url(#st-an-card)">
          <rect width="${W}" height="${Hh}" fill="url(#st-an-sky)"/>
          <path d="M0,118 Q60,92 130,110 T260,104 T376,96 L376,226 L0,226Z" fill="#8cc97a"/>
          ${at(16, 70, 1, aq)}
          <path d="M16,72 L166,72" pathLength="1" stroke="#3fa3e0" stroke-width="4" fill="none" class="s-draw" style="animation-delay:1s;animation-duration:2.4s"/>
          ${at(170, 76, 1, `<path d="M0,0 q3,6 0,12" stroke="#3fa3e0" stroke-width="3" fill="none" stroke-linecap="round" class="a-drip" style="animation-duration:1.2s"/>`, 's-fade', 'animation-delay:3.2s')}
          ${[[186, 150, 1], [362, 148, 0.8], [200, 150, 0.7]].map(([x, y, k]) => at(x, y, k, `<path d="M0,0 Q-9,-22 0,-52 Q9,-22 0,0Z" fill="#2f7a3a"/><rect x="-1.5" y="-2" width="3" height="6" fill="#6b4423"/>`)).join('')}
          ${at(282, 150, 1, coliseo, 's-up', 'animation-delay:.3s')}
          ${at(196, 166, 1, `<line x1="0" y1="0" x2="0" y2="-30" stroke="#6b4423" stroke-width="3"/><path d="M-4,-30 h40 l7,-8 l-7,-8 h-40Z" fill="#f6e7c1" stroke="#7a3417" stroke-width="1.5"/><text x="16" y="-34" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="11" fill="#7a3417">ROMA</text>`, 's-in', 'animation-delay:1.6s')}
          <path d="M0,166 Q90,152 170,174 L170,226 L0,226Z" fill="#4aa8e0"/>
          ${at(0, 150, 1, bridge)}
          <rect x="170" y="150" width="${W - 170}" height="16" fill="#b9b2a6"/>
          <path d="M170,158 H${W}" stroke="#8f877a" stroke-width="1.5" stroke-dasharray="10 6"/>
          <path d="M170,166 Q260,172 376,166 L376,226 L170,226Z" fill="#7cbc6a"/>
          ${walker(0, 152, 'st-antigua-walk', -1, { skin: '#d29a6a', top: '#f7f3ea', dress: true, cape: '#b3261e', hair: '#3a2414' })}
          ${walker(0, 152, 'st-antigua-walk', -5, { skin: '#b97b50', top: '#3f6db3', hair: '#2a180e', hairStyle: 'long', dress: true })}
          ${walker(W, 154, 'st-antigua-walk-back', -3, { skin: '#e3a97c', top: '#c99a2e', hair: '#5b3a1a', flip: true })}
          ${walker(W, 154, 'st-antigua-walk-back', -9, { skin: '#a96a40', top: '#b3261e', hair: '#1b1209', item: 'spear', arm: 'up', flip: true })}
          <rect x="0" y="0" width="${W}" height="34" fill="#7a3417" opacity=".88"/>
          <text x="${W / 2}" y="24" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="19" fill="#ffe7a8">Imperio romano</text>
        </g>
        <rect width="${W}" height="${Hh}" rx="16" fill="none" stroke="#7a3417" stroke-width="4"/>`, 's-in');
    },
  ],
};
