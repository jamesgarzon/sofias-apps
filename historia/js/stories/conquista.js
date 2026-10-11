// Historias de la Conquista: escena animada que se reproduce al tocar cada chispa (mismo orden que los hotspots).
// Coordenadas del viewBox 800×500. Se ve con zoom ×1,9 centrado en la chispa: deja lo importante cerca de ella.
// Encuentro de culturas sin violencia gráfica: nadie sale herido.
window.STORIES = window.STORIES || {};
window.STORIES.conquista = {
  css: `
    .st-conquista-bob { transform-box: fill-box; transform-origin: 50% 100%; animation: st-conquista-bob 3s ease-in-out infinite; }
    @keyframes st-conquista-bob { 0%, 100% { transform: rotate(-1.5deg) translateY(0); } 50% { transform: rotate(1.5deg) translateY(-3px); } }
    .st-conquista-ride { animation: st-conquista-ride 2.4s ease-out both; }
    @keyframes st-conquista-ride { from { transform: translateX(170px); opacity: 0; } 15% { opacity: 1; } }
    .st-conquista-leg-a, .st-conquista-leg-b { transform-box: fill-box; transform-origin: 50% 0%; animation: st-conquista-leg .3s ease-in-out 8 alternate; }
    .st-conquista-leg-b { animation-direction: alternate-reverse; }
    @keyframes st-conquista-leg { from { transform: rotate(-16deg); } to { transform: rotate(16deg); } }
    .st-conquista-trot { animation: st-conquista-trot .3s ease-in-out 8 alternate; }
    @keyframes st-conquista-trot { to { transform: translateY(-3px); } }
    .st-conquista-coin { animation: st-conquista-coin 1.1s ease-in-out both; opacity: 0; }
    @keyframes st-conquista-coin { 0% { opacity: 0; transform: translate(0, 0); } 10% { opacity: 1; } 50% { transform: translate(calc(var(--dx) * .5), calc(var(--dy) * .5 - 60px)); } 90% { opacity: 1; } 100% { opacity: 0; transform: translate(var(--dx), var(--dy)); } }
  `,
  play: [
    // 0 · Llegan los barcos: Alonso de Ojeda llega en un bote, señala la tierra («¡Tierra!»); aparecen sus otros barcos (1499, La Guajira)
    ({ at, person, caravel, sparkle }) => {
      const bubble = (w, t) => `<rect x="${-w / 2}" y="-30" width="${w}" height="28" rx="12" fill="#fff" stroke="#b03a2e" stroke-width="2.5"/><path d="M8,-3.5 L16,8 L20,-3.5Z" fill="#fff" stroke="#b03a2e" stroke-width="2.5" stroke-linejoin="round"/><rect x="6" y="-6" width="16" height="4" fill="#fff"/>
        <text y="-10" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="16" fill="#b03a2e">${t}</text>`;
      return `
        ${at(0, 0, 1, caravel(440, 274, 0.27, { flag: 'burgundy', cross: '#c8102e', d: -1 }), 's-fade', 'animation-delay:1.4s')}
        ${at(0, 0, 1, caravel(486, 280, 0.3, { flag: 'burgundy', cross: '#c8102e', d: -2.5 }), 's-fade', 'animation-delay:1.9s')}
        ${at(0, 0, 1, at(0, 0, 1, `
          <path d="M398,318 L404,330 L404,338 L398,338Z" fill="#7a4a22"/>
          ${person({ x: 336, y: 324, s: 1, flip: true, skin: '#f0c49c', top: '#b03a2e', bottom: '#d9a441', armor: true, hat: 'morrion', boots: true, belt: '#5b3a1a', act: 'point', delay: 0 })}
          <path d="M296,316 Q300,346 330,348 L380,348 Q400,344 404,318Z" fill="#8b5a2b"/><path d="M298,326 Q350,334 402,326" stroke="#c48b4c" stroke-width="3" fill="none"/><path d="M296,316 L404,316" stroke="#5b3a1a" stroke-width="3" stroke-linecap="round"/>
          <line x1="398" y1="318" x2="398" y2="282" stroke="#5b3a1a" stroke-width="2.4"/>${at(399, 282, 1, '<path d="M0,0 L22,6 L0,12Z" fill="#c8102e"/>', 'a-flag')}`, 'st-conquista-bob'), 's-from-r', 'animation-delay:.2s')}
        ${at(338, 178, 1, bubble(82, '¡Tierra!'), 's-in', 'animation-delay:1.1s')}
        ${at(318, 248, 1, `<line x1="0" y1="0" x2="0" y2="-26" stroke="#5b3a1a" stroke-width="2.4"/><path d="M0,-26 L18,-20 L0,-14Z" fill="#f5c518"/>`, 's-drop', 'animation-delay:2.4s')}
        ${at(338, 218, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="14" fill="#fff" stroke="#2f6b3f" stroke-width="3.5" paint-order="stroke" stroke-linejoin="round">La Guajira</text>`, 's-in', 'animation-delay:2.7s')}
        ${at(470, 150, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="26" fill="#fff" stroke="#7a1f17" stroke-width="5" paint-order="stroke" stroke-linejoin="round">1499</text>`, 's-in', 'animation-delay:3.2s')}
        ${[[420, 130, 3.6], [520, 140, 3.9], [300, 280, 4.2]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 1 · Los conquistadores: llega un jinete con armadura y arcabuz; el indígena se sorprende al ver un caballo por primera vez
    ({ at, person, sparkle }) => {
      const legs = [[-27, 'a'], [-17, 'b'], [17, 'b'], [27, 'a']].map(([x, k]) => `<g class="st-conquista-leg-${k}" style="animation-delay:.2s"><rect x="${x - 3.5}" y="-32" width="7" height="30" rx="3" fill="#7a4a24"/><rect x="${x - 4}" y="-5" width="8" height="5" rx="1.5" fill="#2b1d12"/></g>`).join('');
      const horse = `${legs}
        <path d="M34,-48 Q50,-44 48,-20 Q44,-30 36,-36Z" fill="#3b2414"/>
        <ellipse cx="0" cy="-42" rx="40" ry="17" fill="#8b5a2b"/>
        <path d="M-30,-48 Q-40,-62 -46,-80 L-34,-86 Q-24,-66 -14,-54Z" fill="#8b5a2b"/>
        <path d="M-46,-80 Q-60,-86 -66,-76 Q-68,-70 -58,-68 Q-48,-68 -40,-70Z" fill="#8b5a2b"/>
        <path d="M-34,-86 Q-26,-74 -18,-58" stroke="#3b2414" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M-40,-86 L-36,-94 L-33,-85Z" fill="#7a4a24"/><circle cx="-50" cy="-78" r="2.2" fill="#1b1b24"/><circle cx="-64" cy="-72" r="1.4" fill="#3b2414"/>
        <path d="M-14,-58 Q0,-62 16,-58 L18,-44 L-14,-44Z" fill="#c62828"/><path d="M-14,-46 L18,-46" stroke="#f5c518" stroke-width="2"/>`;
      const icon = (x, d, ic, t) => at(x, 216, 1, `${ic}<text y="22" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="12" fill="#7a1f17">${t}</text>`, 's-in', `animation-delay:${d}s`);
      return `
        ${at(156, 190, 1, `<rect width="236" height="50" rx="12" fill="#fff8e7" stroke="#b03a2e" stroke-width="3"/>`, 's-in', 'animation-delay:.3s')}
        ${icon(196, 2.6, `<path d="M-9,-10 Q0,-14 9,-10 Q11,0 7,8 Q0,11 -7,8 Q-11,0 -9,-10Z" fill="#cdd4de" stroke="#8a93a0" stroke-width="1.4"/><path d="M0,-11 V9" stroke="#8a93a0" stroke-width="1.4"/>`, 'Armadura')}
        ${icon(274, 3.2, `<path d="M-18,2 L10,-8 L14,-4 L-14,6Z" fill="#3a3f5c"/><path d="M-20,0 L-12,-2 L-8,8 L-18,10Z" fill="#7a4a22"/>`, 'Arcabuz')}
        ${icon(352, 3.8, `<path d="M-4,10 Q-6,-2 2,-10 L8,-12 L14,-4 Q12,0 6,-2 Q4,4 6,10Z" fill="#8b5a2b"/><path d="M2,-10 Q-6,-4 -6,8" stroke="#3b2414" stroke-width="3" fill="none"/>`, 'Caballo')}
        ${at(0, 0, 1, at(490, 412, 1, at(0, 0, 1, `
          <line x1="16" y1="-60" x2="40" y2="-118" stroke="#3a3f5c" stroke-width="4" stroke-linecap="round"/><line x1="12" y1="-50" x2="20" y2="-70" stroke="#7a4a22" stroke-width="6" stroke-linecap="round"/>
          ${person({ x: 4, y: -24, s: 0.85, flip: true, skin: '#f0c49c', top: '#b03a2e', bottom: '#d9a441', armor: true, hat: 'morrion', boots: true, arm: 'out', act: 'idle', delay: 0 })}
          ${horse}
          <path d="M-23,-68 Q-34,-70 -42,-74" stroke="#5b3a1a" stroke-width="1.6" fill="none"/>
          <path d="M6,-52 L4,-30 L-6,-28 L-6,-24 L8,-24 L10,-52Z" fill="#1f1a17"/>`, 'st-conquista-trot', 'animation-delay:.2s'), 'st-conquista-ride', 'animation-delay:.2s'))}
        ${[[478, 360, 2.6], [326, 410, 2.9], [528, 296, 3.3]].map(([x, y, d]) => at(x, y, 1, `<path d="M0,-10 L2.5,-2.5 L10,0 L2.5,2.5 L0,10 L-2.5,2.5 L-10,0 L-2.5,-2.5Z" fill="#fff"/>`, 's-flash', `animation-delay:${d}s`)).join('')}
        ${at(212, 340, 1, `<circle r="15" fill="#fff" stroke="#e04e39" stroke-width="2.5"/><text y="7" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="20" fill="#e04e39">!</text><circle cx="-10" cy="16" r="3.5" fill="#fff" stroke="#e04e39" stroke-width="2"/>`, 's-in', 'animation-delay:2.4s')}
        ${[[300, 300, 4.2], [430, 270, 4.5]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 2 · Nuevas ciudades: el fundador alza la bandera, un constructor levanta una casa y aparecen Santa Marta, Cartagena y Bogotá con su año
    ({ at, person, sparkle }) => {
      const row = (y, d, name, year, star) => at(0, 0, 1, `<g transform="translate(386 ${y})"><rect x="-8" y="-6" width="16" height="11" fill="#f6efe2"/><path d="M-10,-5 L0,-13 L10,-5Z" fill="#c0533a"/><rect x="-2" y="0" width="4" height="5" fill="#6b4423"/></g>
        <text x="402" y="${y + 5}" font-family="Fredoka, sans-serif" font-weight="600" font-size="13" fill="#7a1f17">${name} <tspan fill="#c0533a">${year}</tspan></text>${star ? `<path d="M${508},${y - 7} l2.4,5 5.4,.6 -4,3.7 1.1,5.3 -4.9,-2.7 -4.9,2.7 1.1,-5.3 -4,-3.7 5.4,-.6Z" fill="#f5c518" stroke="#c68a00" stroke-width=".8"/>` : ''}`, 's-in', `animation-delay:${d}s`);
      return `
        ${at(370, 182, 1, `<rect width="152" height="88" rx="12" fill="#fff8e7" stroke="#b03a2e" stroke-width="3"/>`, 's-in', 'animation-delay:.3s')}
        ${row(206, 1, 'Santa Marta', '1525', true)}${row(232, 1.9, 'Cartagena', '1533')}${row(258, 2.8, 'Bogotá', '1538')}
        ${at(0, 0, 1, `${[622, 640, 658].map((x) => `<rect x="${x - 2}" y="356" width="4" height="44" fill="#8a5d2e"/>`).join('')}<rect x="618" y="354" width="44" height="4" fill="#8a5d2e"/>`, 's-grow', 'animation-delay:.5s')}
        ${at(0, 0, 1, `<rect x="620" y="358" width="40" height="42" fill="#f6efe2"/><path d="M634,400 L634,384 Q640,378 646,384 L646,400Z" fill="#6b4423"/><rect x="624" y="366" width="8" height="8" fill="#7a4a24"/>`, 's-fade', 'animation-delay:1.8s')}
        ${at(640, 356, 1, `<path d="M-26,2 L0,-20 L26,2Z" fill="#c0533a"/>`, 's-drop', 'animation-delay:3s')}
        ${person({ x: 712, y: 402, s: 1, flip: true, skin: '#e9b48a', top: '#4f7cff', bottom: '#5b3a1a', hair: '#3a2414', hat: 'straw', item: 'stone', act: 'hammer', delay: 0 })}
        ${person({ x: 556, y: 404, s: 1.2, skin: '#f0c49c', top: '#7a2e8e', bottom: '#d9a441', armor: true, hat: 'widebrim', cape: '#c62828', boots: true, belt: '#5b3a1a', item: 'flag', flag: 'burgundy', arm: 'up', act: 'raise', delay: 0 })}
        ${[[640, 320, 3.6], [500, 300, 3.9], [700, 300, 4.2]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 3 · En busca de El Dorado: un conquistador mira su mapa y sueña con la ciudad de oro, que nunca encuentra (?); el oro viaja en barco a España
    ({ at, person, sparkle }) => {
      const city = `${[[-30, 16, 12], [-14, 26, 14], [2, 34, 12], [18, 22, 14], [32, 14, 10]].map(([x, h, w]) => `<rect x="${x - w / 2}" y="${-h}" width="${w}" height="${h}" fill="#f5c518" stroke="#c68a00" stroke-width="1"/><path d="M${x - w / 2 - 1},${-h} L${x},${-h - 8} L${x + w / 2 + 1},${-h}Z" fill="#ffd84a" stroke="#c68a00" stroke-width="1"/>`).join('')}`;
      const map = `<g transform="translate(32 -52) rotate(-8)"><rect x="-4" y="-16" width="30" height="22" rx="2" fill="#f3e3c3" stroke="#a8752a" stroke-width="1.4"/><path d="M0,0 Q8,-12 14,-4 T22,-12" stroke="#8a6a3a" stroke-width="1.4" stroke-dasharray="2 2" fill="none"/><path d="M19,-15 l5,5 M24,-15 l-5,5" stroke="#c62828" stroke-width="2"/></g>`;
      return `
        ${at(0, 0, 1, `<circle cx="470" cy="290" r="4" fill="#fff" stroke="#7a6a5a" stroke-width="1.5"/><circle cx="454" cy="278" r="6" fill="#fff" stroke="#7a6a5a" stroke-width="1.5"/>
          <path d="M350,232 Q346,206 372,204 Q384,188 406,196 Q426,184 442,198 Q466,198 462,222 Q472,242 448,250 Q438,266 412,258 Q394,268 378,256 Q350,260 350,232Z" fill="#fff" stroke="#7a6a5a" stroke-width="2"/>`, 's-in', 'animation-delay:.8s')}
        ${at(0, 0, 1, at(406, 246, 1, `${city}<text y="-44" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="12" fill="#a87400">El Dorado</text>`), 's-out', 'animation-delay:2.6s')}
        ${at(406, 224, 1, at(0, 0, 1, `<text y="14" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#7a6a5a">?</text>`, 's-in', 'animation-delay:3s'))}
        ${person({ x: 500, y: 418, s: 1.15, skin: '#f0c49c', top: '#b03a2e', bottom: '#d9a441', armor: true, hat: 'morrion', boots: true, belt: '#5b3a1a', arm: 'out', act: 'look', delay: 0 })}
        <g transform="translate(500 418) scale(1.15)"><g class="pa pa-breathe" style="animation-delay:0s">${map}</g></g>
        ${[0, 1, 2].map((i) => `<g transform="translate(${462 + i * 10} 436)"><g class="st-conquista-coin" style="--dx:${128 - i * 10}px;--dy:-130px;animation-delay:${3.6 + i * 0.45}s"><ellipse rx="7" ry="4.5" fill="#f5c518" stroke="#c68a00" stroke-width="1.2"/></g></g>`).join('')}
        ${at(588, 392, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="15" fill="#fff" stroke="#7a1f17" stroke-width="4" paint-order="stroke" stroke-linejoin="round">a España</text><path d="M-30,8 H26 M18,3 L26,8 L18,13" stroke="#7a1f17" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, 's-in', 'animation-delay:4.4s')}
        ${[[600, 300, 4.8], [560, 330, 5.1]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd84a', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 4 · La resistencia indígena: la cacica Gaitana alza su lanza y guía a su pueblo; llegan más guerreros a defender su tierra
    ({ at, person, sparkle }) => `
      ${at(0, 0, 1, person({ x: 130, y: 352, s: 0.8, skin: '#a96a40', top: '#e4d1a2', bottom: '#c8b07a', hair: '#1d120b', hat: 'feathers', item: 'spear', arm: 'up', act: 'shake', delay: 0 }), 's-from-l', 'animation-delay:1.2s')}
      ${at(0, 0, 1, person({ x: 216, y: 350, s: 0.8, skin: '#b9774a', top: '#efe2c0', dress: true, hair: '#1d120b', hairStyle: 'long', hat: 'feathers', item: 'bow', arm: 'out', act: 'raise', delay: 0 }), 's-from-l', 'animation-delay:1.6s')}
      ${person({ x: 270, y: 432, s: 1.25, skin: '#a96a40', top: '#f1e6c8', dress: true, hair: '#1d120b', hairStyle: 'long', hat: 'feathers', item: 'spear', arm: 'up', act: 'shake', delay: 0 })}
      <g transform="translate(270 432) scale(1.25)"><g class="pa pa-bob" style="animation-delay:0s"><path d="M-16,-44 L16,-44 M-19,-30 L19,-30" stroke="#e04e39" stroke-width="3"/><path d="M-15,-37 l5,-4 l5,4 l5,-4 l5,4 l5,-4 l5,4" stroke="#2e9d5b" stroke-width="2" fill="none"/></g></g>
      ${at(214, 206, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="20" fill="#fff" stroke="#7a1f17" stroke-width="4.5" paint-order="stroke" stroke-linejoin="round">La Gaitana</text>`, 's-in', 'animation-delay:.8s')}
      ${[[250, 240, 2.4], [330, 230, 2.7], [180, 250, 3]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd84a', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`,
  ],
};
