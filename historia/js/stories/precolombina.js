// Historias de la Época Precolombina: escena animada que se reproduce al tocar cada chispa (mismo orden que los hotspots).
// Coordenadas del viewBox 800×500. Se ve con zoom ×1,9 centrado en la chispa: deja lo importante cerca de ella.
window.STORIES = window.STORIES || {};
window.STORIES.precolombina = {
  css: `
    .st-precolombina-drift { animation: st-precolombina-drift 5s ease-out both; }
    @keyframes st-precolombina-drift { from { transform: translateX(46px); } }
    .st-precolombina-dust { animation: st-precolombina-dust 1.4s ease-out infinite; opacity: 0; }
    @keyframes st-precolombina-dust { 0% { opacity: 0; transform: translate(0, 0); } 15% { opacity: 1; } 55% { transform: translate(calc(var(--dx) * .6), calc(var(--dy) - 26px)); } 100% { opacity: 0; transform: translate(var(--dx), calc(var(--dy) + 30px)); } }
    .st-precolombina-gold { animation: st-precolombina-gold 1.4s ease-in-out both; }
    @keyframes st-precolombina-gold { from { opacity: 0; } }
    .st-precolombina-off { animation: st-precolombina-off .9s ease-in both; }
    @keyframes st-precolombina-off { to { opacity: 0; } }
    .st-precolombina-hide { animation: st-precolombina-hide .2s linear both; }
    @keyframes st-precolombina-hide { to { opacity: 0; } }
    .st-precolombina-show { animation: st-precolombina-show .2s linear both; }
    @keyframes st-precolombina-show { from { opacity: 0; } }
    .st-precolombina-tilt { animation: st-precolombina-tilt .6s ease-in-out both; }
    @keyframes st-precolombina-tilt { to { transform: rotate(-55deg); } }
    .st-precolombina-split-l, .st-precolombina-split-r { transform-box: fill-box; transform-origin: 50% 100%; }
    .st-precolombina-split-l { animation: st-precolombina-split-l .9s ease-in both; }
    @keyframes st-precolombina-split-l { to { transform: translate(-26px, 18px) rotate(-24deg); opacity: 0; } }
    .st-precolombina-split-r { animation: st-precolombina-split-r .9s ease-in both; }
    @keyframes st-precolombina-split-r { to { transform: translate(26px, 18px) rotate(24deg); opacity: 0; } }
    .st-precolombina-fly { animation: st-precolombina-fly .8s ease-out both; opacity: 0; }
    @keyframes st-precolombina-fly { 0% { opacity: 1; transform: translate(0, 0) scale(.6); } 90% { opacity: 1; } 100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1.2); } }
    @media (prefers-reduced-motion: reduce) { .st-precolombina-dust { animation: none !important; } }
  `,
  play: [
    // 0 · Muiscas y El Dorado: en la balsa, una muisca sopla polvo de oro sobre el nuevo cacique, que queda dorado y navega por Guatavita
    ({ at, person, lin, rad, sparkle }) => {
      const cacique = (skin, top, bottom) => person({ x: 0, y: 0, s: 1.1, skin, top, bottom, hair: '#1d120b', hairStyle: 'long', hat: 'crown', arm: 'up', act: 'raise', delay: 0 });
      const dust = [[8, -30], [16, -40], [24, -22], [14, -48], [28, -34], [20, -14], [10, -18], [30, -46], [22, -56], [4, -42]];
      return `
        ${lin('st-precolombina-goldskin', [[0, '#fff1a8'], [0.45, '#f5c518'], [1, '#c68a00']], 1, 1)}
        ${rad('st-precolombina-halo', [[0, '#fff6b0', 0.8], [0.5, '#f5c518', 0.3], [1, '#f5c518', 0]])}
        ${at(0, 0, 1, `
          <ellipse cx="346" cy="358" rx="62" ry="7" fill="#0f6b6f" opacity=".45"/>
          <path d="M296,346 L394,346 L388,358 L302,358Z" fill="#c99a4b"/>${[306, 320, 334, 348, 362, 376].map((x) => `<line x1="${x}" y1="347" x2="${x + 2}" y2="357" stroke="#9c7130" stroke-width="1.6"/>`).join('')}
          <path d="M296,346 Q290,338 284,336 M394,346 Q400,338 406,336" stroke="#c99a4b" stroke-width="5" fill="none" stroke-linecap="round"/>
          <circle cx="358" cy="282" r="62" fill="url(#st-precolombina-halo)" class="s-fade" style="animation-delay:2.4s"/>
          ${at(358, 348, 1, cacique('#b9774a', '#efe2c0', '#c8b07a'))}
          ${at(358, 348, 1, cacique('url(#st-precolombina-goldskin)', 'url(#st-precolombina-goldskin)', '#e0a800'), 'st-precolombina-gold', 'animation-delay:1.8s')}
          ${person({ x: 314, y: 348, s: 0.9, skin: '#a96a40', top: '#e4d1a2', dress: true, hair: '#1d120b', hairStyle: 'long', hat: 'feathers', item: 'pouch', act: 'sow', delay: 0 })}
          ${dust.map(([dx, dy], i) => `<g transform="translate(342 300)"><circle r="${3 + (i % 2)}" fill="#ffd84a" stroke="#fff6b0" stroke-width="1" class="st-precolombina-dust" style="--dx:${dx}px;--dy:${dy}px;animation-delay:${0.5 + i * 0.12}s"/></g>`).join('')}
        `, 'st-precolombina-drift')}
        <g stroke="#bff6ee" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8">
          <path d="M392,366 q10,-4 20,0" pathLength="1" class="s-draw" style="animation-delay:1s;animation-duration:1.2s"/><path d="M398,354 q8,-3 16,0" pathLength="1" class="s-draw" style="animation-delay:1.6s;animation-duration:1.2s"/></g>
        ${at(352, 196, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="22" fill="#f5c518" stroke="#6b4e00" stroke-width="4" paint-order="stroke" stroke-linejoin="round">El Dorado</text>`, 's-in', 'animation-delay:3.6s')}
        ${[[396, 250, 2.8], [320, 232, 3.1], [404, 300, 3.4]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 1 · Los taironas: un constructor golpea las piedras de un muro de terraza, otra trae piedras en su canasta, y aparece una casa (Ciudad Perdida)
    ({ at, person, sparkle }) => {
      const rows = [0, 1, 2, 3, 4].map((r) => {
        const y = 288 - r * 14, xs = r % 2 ? [551, 573, 595] : [540, 562, 584, 606];
        return xs.map((x, i) => `<rect x="${x}" y="${y}" width="21" height="13" rx="4" fill="${(i + r) % 2 ? '#a7b0a8' : '#bcc3bc'}" stroke="#7d847d" stroke-width="1.2"/>`).join('');
      });
      const hut = `<rect x="-14" y="-22" width="28" height="22" fill="#c9a26b"/><path d="M-21,-20 L0,-50 L21,-20Z" fill="#d9b45a"/><path d="M0,-50 v-8" stroke="#8a6a2a" stroke-width="2.4"/><path d="M-5,0 L-5,-12 L5,-12 L5,0Z" fill="#6b4423"/>`;
      const stones = `<circle cx="-6" cy="-3" r="5" fill="#a7b0a8"/><circle cx="5" cy="-4" r="5.5" fill="#bcc3bc"/><circle cx="0" cy="-9" r="4.5" fill="#9aa39b"/>`;
      return `
        ${[[414, 270], [436, 278], [458, 287], [480, 296]].map(([x, y], i) => at(x, y, 1, `<ellipse rx="11" ry="4.5" fill="#bcc3bc" stroke="#7d847d" stroke-width="1.2"/>`, 's-stamp', `animation-delay:${2 + i * 0.25}s`)).join('')}
        ${rows.map((r, i) => at(0, 0, 1, r, 's-stamp', `animation-delay:${0.4 + i * 0.8}s`)).join('')}
        ${at(582, 230, 1, `<ellipse rx="50" ry="8" fill="#6fa36a"/><path d="M-50,0 A50,8 0 0 0 50,0" stroke="#a7b8a0" stroke-width="4" fill="none"/>`, 's-in', 'animation-delay:4.2s')}
        ${at(590, 232, 1, hut, 's-up', 'animation-delay:4.5s')}
        ${person({ x: 494, y: 302, s: 1.2, skin: '#a96a40', top: '#efe2c0', bottom: '#c8b07a', hair: '#1d120b', hairStyle: 'long', item: 'stone', act: 'hammer', delay: 0 })}
        ${at(0, 0, 1, at(0, 0, 1, person({ x: 394, y: 262, s: 0.95, skin: '#b9774a', top: '#e04e39', dress: true, hair: '#1d120b', hairStyle: 'long', item: 'basket', act: 'walk', delay: 0 }), 'st-precolombina-hide', 'animation-delay:1.7s'), 's-from-l', 'animation-delay:.2s')}
        ${at(0, 0, 1, person({ x: 394, y: 262, s: 0.95, skin: '#b9774a', top: '#e04e39', dress: true, hair: '#1d120b', hairStyle: 'long', item: 'basket', act: 'look', delay: 0 }) + at(394 + 22 * 0.95, 262 - 37 * 0.95, 0.95, stones), 'st-precolombina-show', 'animation-delay:1.7s')}
        ${at(452, 150, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="19" fill="#fff" stroke="#2f6b3f" stroke-width="4" paint-order="stroke" stroke-linejoin="round">Ciudad Perdida</text>`, 's-in', 'animation-delay:5s')}
        ${[[548, 196, 4.9], [636, 250, 5.2], [530, 300, 5.5]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 2 · San Agustín: un escultor talla con su piedra una estatua gigante; van apareciendo los ojos, la nariz y la boca con colmillos
    ({ at, person, sparkle }) => {
      return `
        ${at(0, 0, 1, `<rect x="296" y="316" width="56" height="88" rx="8" fill="#8f968f"/><rect x="284" y="222" width="80" height="100" rx="14" fill="#9ca39b"/><rect x="280" y="212" width="88" height="20" rx="6" fill="#868d86"/>`, 's-in', 'animation-delay:.1s')}
        ${at(0, 0, 1, `<path d="M280,214 L292,206 L318,210 L344,204 L370,212 L372,250 L366,300 L370,340 L362,404 L290,404 L282,350 L278,300Z" fill="#b2b8b0"/><path d="M300,240 l12,16 l-6,14 M346,226 l-10,20 M296,330 l14,10 M352,360 l-12,12" stroke="#8d948b" stroke-width="2" fill="none"/>`, 'st-precolombina-off', 'animation-delay:3.9s')}
        ${at(0, 0, 1, `<path d="M296,262 q12,-10 24,0 q-12,10 -24,0Z M328,262 q12,-10 24,0 q-12,10 -24,0Z" fill="#5e655e"/><circle cx="308" cy="262" r="4" fill="#3a3f3a"/><circle cx="340" cy="262" r="4" fill="#3a3f3a"/>`, 's-fade', 'animation-delay:1.2s')}
        ${at(0, 0, 1, `<path d="M318,270 L312,290 L336,290 L330,270Z" fill="#7d847d"/>`, 's-fade', 'animation-delay:2s')}
        ${at(0, 0, 1, `<rect x="298" y="296" width="52" height="17" rx="5" fill="#4e554e"/><path d="M304,296 L308,307 L312,296 M336,296 L340,307 L344,296" fill="#eef0ea"/><path d="M298,305 H350" stroke="#3a3f3a" stroke-width="1.4"/>`, 's-fade', 'animation-delay:2.8s')}
        ${at(0, 0, 1, `<path d="M298,350 Q314,364 324,350 M350,350 Q334,364 324,350" stroke="#6f766f" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M284,236 q-8,6 -2,16 M364,236 q8,6 2,16" stroke="#868d86" stroke-width="5" fill="none"/>`, 's-fade', 'animation-delay:3.4s')}
        ${at(0, 0, 1, `<path d="M290,214 q14,-6 22,2 q-12,5 -22,-2Z M340,388 q10,-6 18,0 q-10,5 -18,0Z" fill="#5f9e55" opacity=".85"/>`, 's-fade', 'animation-delay:4.4s')}
        ${person({ x: 424, y: 404, s: 1.2, flip: true, skin: '#b9774a', top: '#c8673a', bottom: '#7a4a24', hair: '#1d120b', hairStyle: 'long', hat: 'feathers', item: 'stone', act: 'hammer', delay: 0 })}
        ${at(324, 198, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="17" fill="#fff" stroke="#2f6b3f" stroke-width="4" paint-order="stroke" stroke-linejoin="round">San Agustín</text>`, 's-in', 'animation-delay:4.6s')}
        ${[[372, 240, 4.6], [288, 280, 4.9], [372, 350, 5.2]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 3 · Orfebres del oro: un orfebre vierte oro derretido en un molde de barro; el molde se abre y aparece el Poporo Quimbaya
    ({ at, person, rad, sparkle }) => {
      const mold = (side) => `<path d="${side < 0 ? 'M352,350 L338,350 Q336,362 330,368 Q312,380 312,410 Q312,440 322,452 L352,452Z' : 'M352,350 L366,350 Q368,362 374,368 Q392,380 392,410 Q392,440 382,452 L352,452Z'}" fill="#b8643a" stroke="#8f4a24" stroke-width="2"/>
        <path d="${side < 0 ? 'M324,398 q10,-6 20,0 M322,420 q12,-6 24,0' : 'M360,398 q10,-6 20,0 M358,420 q12,-6 24,0'}" stroke="#d98a5a" stroke-width="2.4" fill="none" opacity=".8"/>`;
      return `
        ${rad('st-precolombina-shine', [[0, '#fff6b0', 0.9], [0.45, '#f5c518', 0.4], [1, '#f5c518', 0]])}
        <circle cx="352" cy="410" r="70" fill="url(#st-precolombina-shine)" class="s-fade" style="animation-delay:3.9s"/>
        ${at(0, 0, 1, at(0, 0, 1, mold(-1), 'st-precolombina-split-l', 'animation-delay:3.5s'), 's-in', 'animation-delay:.1s')}
        ${at(0, 0, 1, at(0, 0, 1, mold(1), 'st-precolombina-split-r', 'animation-delay:3.5s'), 's-in', 'animation-delay:.1s')}
        ${at(352, 351, 1, `<ellipse rx="15" ry="4.5" fill="#8f4a24"/><ellipse rx="10" ry="3" fill="#ffb52e" class="s-fade" style="animation-delay:2s"/>`, 'st-precolombina-hide', 'animation-delay:3.5s')}
        ${at(0, 0, 1, `<path d="M367,332 Q357,336 354,350" pathLength="1" stroke="#ffc83a" stroke-width="5" fill="none" stroke-linecap="round" class="s-draw" style="animation-delay:1.3s;animation-duration:.5s"/>`, 'st-precolombina-hide', 'animation-delay:3s')}
        ${at(0, 0, 1, `<path d="M352,372 l-6,14 l8,8 l-6,14 M356,380 l8,10 l-4,12" pathLength="1" stroke="#5b2a12" stroke-width="2.2" fill="none" class="s-draw" style="animation-delay:3s;animation-duration:.5s"/>`, 'st-precolombina-hide', 'animation-delay:3.5s')}
        ${at(383, 329, 1, `<g class="st-precolombina-tilt" style="transform-box:view-box;transform-origin:0 0;animation-delay:.9s"><path d="M-8,-12 L12,-12 L10,6 Q0,12 -10,6Z" fill="#7a4a24" stroke="#5b2a12" stroke-width="1.6"/><ellipse cx="1" cy="-12" rx="11" ry="3.5" fill="#ffb52e"/><ellipse cx="1" cy="-12" rx="6" ry="1.8" fill="#fff1a0"/></g>`)}
        ${person({ x: 412, y: 436, s: 1.2, flip: true, skin: '#a96a40', top: '#e4d1a2', bottom: '#8a5d2e', hair: '#1d120b', hairStyle: 'long', hat: 'feathers', arm: 'up', act: 'idle', delay: 0 })}
        ${at(412, 368, 1.2, `<path d="M-11,-4 Q0,10 11,-4 Q12,6 0,9 Q-12,6 -11,-4Z" fill="#f5c518" stroke="#b27b00" stroke-width="1"/><circle cy="9" r="3.2" fill="#f5c518" stroke="#b27b00" stroke-width="1"/>`)}
        ${at(380, 288, 1, `<rect x="-58" y="-15" width="116" height="28" rx="10" fill="#fff8e1" stroke="#c68a00" stroke-width="2.5"/><text y="5" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="14" fill="#6b4e00">Poporo Quimbaya</text>`, 's-in', 'animation-delay:4.3s')}
        ${[[316, 388, 4], [390, 384, 4.2], [352, 352, 4.4], [326, 422, 4.6]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 4 · Agricultura y cerámica: un agricultor cava, el agua corre por el canal zenú, brotan los cultivos y una alfarera hace una vasija de barro
    ({ at, person, sparkle }) => {
      const label = (t) => `<text y="22" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="12" fill="#5b3a1a">${t}</text>`;
      const crops = [
        ['Maíz', `<path d="M0,10 Q-1,-6 1,-18" stroke="#4f9e3a" stroke-width="3" fill="none"/><path d="M0,0 Q-10,-6 -13,2 M0,-6 Q10,-14 13,-6" stroke="#5cb945" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="4" cy="-8" rx="3.5" ry="8" fill="#f5c518" transform="rotate(16 4 -8)"/>`],
        ['Papa', `<ellipse cx="-6" cy="6" rx="7" ry="5" fill="#b07a45"/><ellipse cx="6" cy="7" rx="6" ry="4.5" fill="#c08850"/><path d="M0,2 Q-10,-8 -6,-16 M0,2 Q8,-10 6,-16" stroke="#4f9e3a" stroke-width="2.4" fill="none"/><circle cx="-6" cy="-16" r="3.4" fill="#d9b8ff"/><circle cx="6" cy="-16" r="3.4" fill="#fff"/>`],
        ['Yuca', `<path d="M-4,10 L-8,0 M4,10 L8,1 M0,10 L0,-2" stroke="#9a5b2e" stroke-width="4" stroke-linecap="round"/><path d="M0,-2 L0,-12" stroke="#7a4a24" stroke-width="2"/>${[-60, -30, 0, 30, 60].map((a) => `<ellipse cx="0" cy="-20" rx="2.6" ry="8" fill="#5cb945" transform="rotate(${a} 0 -12)"/>`).join('')}`],
        ['Fríjol', `<path d="M0,10 V-18" stroke="#8a6a3a" stroke-width="2"/><path d="M0,8 Q-8,2 0,-4 Q8,-10 0,-16" stroke="#4f9e3a" stroke-width="2.2" fill="none"/><path d="M-3,-2 q-8,2 -9,10 q6,-2 9,-10Z M3,-10 q8,2 9,10 q-6,-2 -9,-10Z" fill="#6aa84f"/><ellipse cx="-6" cy="-8" rx="5" ry="3" fill="#5cb945"/>`],
      ];
      return `
        ${at(0, 0, 1, `<path d="M396,322 Q470,300 540,306 T638,300 Q648,306 638,314 Q590,318 540,320 T398,336Z" fill="#8a6a3a"/>`, 's-fade', 'animation-delay:.5s')}
        <path d="M398,328 Q470,308 540,313 T636,307" pathLength="1" stroke="#3cb9d6" stroke-width="8" fill="none" class="s-draw" style="animation-delay:1.1s;animation-duration:1.6s"/>
        <path d="M398,327 Q470,307 540,312 T636,306" pathLength="1" stroke="#bff6ee" stroke-width="2" fill="none" class="s-draw" style="animation-delay:1.2s;animation-duration:1.6s"/>
        ${at(470, 292, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="13" fill="#fff" stroke="#14637a" stroke-width="3.5" paint-order="stroke">Canal zenú</text>`, 's-in', 'animation-delay:2.6s')}
        ${at(380, 212, 1, `<rect width="180" height="60" rx="12" fill="#fff8e1" stroke="#8a6a3a" stroke-width="3"/>`, 's-in', 'animation-delay:.2s')}
        ${crops.map(([t, g], i) => at(403 + i * 45, 238, 1, g + label(t), 's-grow', `animation-delay:${1.4 + i * 0.6}s`)).join('')}
        ${person({ x: 560, y: 432, s: 1.15, skin: '#a96a40', top: '#efe2c0', bottom: '#c8b07a', hair: '#1d120b', hairStyle: 'short', hat: 'straw', act: 'hoe', delay: 0 })}
        ${at(686, 434, 1, `<path d="M-16,0 Q-26,-26 -14,-46 L-10,-58 L10,-58 L14,-46 Q26,-26 16,0Z" fill="#c8673a"/><ellipse cx="0" cy="-58" rx="11" ry="3" fill="#8f4a24"/>`, 's-grow', 'animation-delay:.8s;animation-duration:2.2s')}
        ${at(686, 434, 1, `<path d="M-21,-24 H21 M-23,-16 H23" stroke="#f3d9a6" stroke-width="3"/><path d="M-18,-34 l6,6 l6,-6 l6,6 l6,-6 l6,6" stroke="#5b2a12" stroke-width="2" fill="none"/>`, 's-fade', 'animation-delay:3.2s')}
        ${person({ x: 733, y: 434, s: 1.05, flip: true, skin: '#b9774a', top: '#e04e39', dress: true, hair: '#1d120b', hairStyle: 'long', act: 'press', delay: 0 })}
        ${[[540, 290, 4], [660, 360, 4.3], [420, 300, 4.6]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
  ],
};
