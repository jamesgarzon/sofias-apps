// Escenas SVG de cada tema (viewBox 800×500) y sus puntos ✨ (hs: [x, y] en el mismo viewBox).
// Reglas: hs separados ≥110 unidades, sin tapar caras; lo animado va con at(..., 'a-clase').
window.APP_SCENES = (() => {
  const { lin, rad, at, delay, sun, cloud, birds, hill, waves, grass, sparkle, tree } = KitSVG;

  const penguin = `<ellipse cx="0" cy="-34" rx="22" ry="34" fill="#1f2937"/><ellipse cx="0" cy="-28" rx="15" ry="26" fill="#fff"/>
    <circle cx="-6" cy="-52" r="3" fill="#111"/><circle cx="6" cy="-52" r="3" fill="#111"/><circle cx="-5" cy="-53" r="1" fill="#fff"/><circle cx="7" cy="-53" r="1" fill="#fff"/>
    <path d="M-5,-46 L5,-46 L0,-39Z" fill="#f59e0b"/><circle cx="-11" cy="-44" r="3" fill="#fb7185" opacity=".5"/><circle cx="11" cy="-44" r="3" fill="#fb7185" opacity=".5"/>
    <path d="M-21,-40 Q-34,-24 -24,-12" stroke="#1f2937" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M21,-40 Q34,-24 24,-12" stroke="#1f2937" stroke-width="8" fill="none" stroke-linecap="round"/>
    <ellipse cx="-9" cy="0" rx="9" ry="4" fill="#f59e0b"/><ellipse cx="9" cy="0" rx="9" ry="4" fill="#f59e0b"/>`;
  const flake = (x, y, s, d) => at(x, y, s, `<g stroke="#7cc4ea" stroke-width="2.4" stroke-linecap="round">${[0, 60, 120].map((a) => `<path d="M0,-9 V9 M-4,-6 L0,-9 L4,-6 M-4,6 L0,9 L4,6" transform="rotate(${a})"/>`).join('')}</g>`, 'a-drip', `animation-duration:${5 + (d % 3)}s;${delay(-d)}`);

  const S = {
    solido: {
      hs: [[600, 250], [300, 120], [168, 372]],
      svg: () => `<defs>${lin('so-sky', [[0, '#9fdcff'], [1, '#effaff']])}${lin('so-sea', [[0, '#3aa6d8'], [1, '#1d6fa3']])}${lin('so-ice', [[0, '#ffffff'], [1, '#bfe6ff']], 1, 1)}</defs>
        <rect width="800" height="500" fill="url(#so-sky)"/>
        ${sun(110, 80, 32, '#fff8d6', '#fff3b0')}${cloud(420, 70, 0.9)}${cloud(680, 120, 0.6, 0.9, 'a-drift2', -4)}
        <path d="M0,290 L90,200 L150,240 L240,170 L330,250 L420,210 L520,260 L800,240 L800,330 L0,330Z" fill="#dbeefe"/>
        <path d="M90,200 L110,222 L100,226 L120,240 L150,240 L120,214Z M240,170 L262,198 L250,200 L272,222 L292,218Z" fill="#b9dcf5"/>
        <rect y="320" width="800" height="70" fill="url(#so-sea)"/>${waves(342, '#c9eeff', 7)}${waves(368, '#c9eeff', 9)}
        ${at(600, 340, 1, `<path d="M-120,0 L-90,-120 L-40,-170 L10,-150 L60,-200 L110,-110 L130,0Z" fill="url(#so-ice)"/><path d="M-40,-170 L-20,-60 L-90,-120Z M60,-200 L40,-80 L10,-150Z" fill="#a8d8f5" opacity=".7"/><path d="M-120,0 L130,0 L100,30 L-90,30Z" fill="#7cc4ea" opacity=".6"/>`, 'a-bob-s')}
        <path d="M0,380 Q200,350 420,382 Q620,410 800,384 L800,500 L0,500Z" fill="#ffffff"/>
        <path d="M0,430 Q240,404 520,440 Q680,460 800,440 L800,500 L0,500Z" fill="#e3f2ff"/>
        ${at(168, 418, 1, `<path d="M-40,0 L-40,-56 L-14,-74 L40,-74 L40,-18 L14,0Z" fill="#cfeeff" opacity=".9"/><path d="M-40,-56 L-14,-74 L40,-74 L14,-56Z" fill="#eefaff"/><path d="M14,-56 L40,-74 L40,-18 L14,0Z" fill="#a9daf6"/><path d="M-32,-48 L-10,-48 M-32,-40 L-20,-40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`)}
        ${[0, 1.1].map((d) => at(150 + d * 20, 420, 1, `<path d="M0,0 Q-5,8 0,12 Q5,8 0,0Z" fill="#60a5fa"/>`, 'a-drip', `animation-duration:2.4s;${delay(-d)}`)).join('')}
        <ellipse cx="166" cy="476" rx="54" ry="8" fill="#93c5fd" opacity=".6"/>
        ${at(330, 452, 1, penguin, 'a-bob')}${at(400, 460, 0.7, penguin, 'a-bob', delay(-0.8))}
        ${at(300, 120, 2.4, `<circle r="13" fill="#fff" opacity=".7"/><g stroke="#38a3e0" stroke-width="2.4" stroke-linecap="round">${[0, 60, 120].map((a) => `<path d="M0,-9 V9 M-4,-6 L0,-9 L4,-6 M-4,6 L0,9 L4,6" transform="rotate(${a})"/>`).join('')}</g>`, 'a-spin-slow')}
        ${[[60, 30], [200, 10], [470, 40], [560, 0], [720, 20], [140, 150], [520, 150], [760, 180]].map(([x, y], i) => flake(x, y, 0.8 + (i % 3) * 0.3, i)).join('')}`,
    },
    liquido: {
      hs: [[660, 380], [330, 290], [150, 120]],
      svg: () => `<defs>${lin('li-sky', [[0, '#7cc8ff'], [1, '#e9f7ff']])}${lin('li-water', [[0, '#5ab8f0'], [1, '#2563eb']])}${lin('li-glass', [[0, '#e0f2fe', 0.7], [1, '#bae6fd', 0.5]], 1, 0)}</defs>
        <rect width="800" height="500" fill="url(#li-sky)"/>
        ${sun(690, 80, 34, '#fff6c4', '#fff1a0')}
        ${at(150, 110, 1.4, `<g fill="#94a3b8"><ellipse cx="0" cy="0" rx="50" ry="18"/><ellipse cx="-24" cy="-10" rx="26" ry="18"/><ellipse cx="14" cy="-18" rx="30" ry="22"/><ellipse cx="38" cy="-4" rx="20" ry="13"/></g>`, 'a-drift', 'animation-duration:24s')}
        ${[...Array(10)].map((_, i) => at(100 + i * 13, 140, 1, `<path d="M0,0 Q-3,8 0,12 Q3,8 0,0Z" fill="#3b82f6"/>`, 'a-drip', `animation-duration:1.4s;${delay(-(i * 0.37) % 1.4)}`)).join('')}
        ${birds(70, 3, '#334155', 26, -6)}
        ${hill(300, '#9be08a', 40)}${hill(340, '#7cc96f', 30)}
        <path d="M210,180 L300,170 L330,330 L190,340Z" fill="#8b6b4a"/><path d="M210,180 L300,170 L310,200 L220,210Z" fill="#6fbf62"/>
        <path d="M250,200 Q262,260 256,330 L292,330 Q300,260 290,198Z" fill="#7cc8ff"/>
        <path d="M258,210 v110 M270,206 v120 M282,204 v118" stroke="#e0f2fe" stroke-width="3" stroke-dasharray="10 14" opacity=".9" class="a-flow"/>
        <path d="M150,330 Q300,320 420,350 Q560,390 800,370 L800,430 Q560,450 420,410 Q300,380 150,380Z" fill="url(#li-water)"/>
        ${waves(360, '#dbeafe', 5)}${waves(392, '#dbeafe', 7, 0.45)}
        ${at(470, 380, 1, `<path d="M-14,0 Q0,-12 14,0 Q0,10 -14,0Z" fill="#f97316"/><path d="M14,0 L22,-7 L22,7Z" fill="#f97316"/><circle cx="-7" cy="-2" r="1.6" fill="#111"/>`, 'a-bob')}
        <path d="M0,430 Q200,410 400,440 Q600,470 800,450 L800,500 L0,500Z" fill="#6ab85e"/>${grass(440, 18, '#3f8a3a')}
        ${tree(80, 360, 0.9)}${tree(740, 330, 0.7, '#2f8a43', '#4fae55', -1)}
        <rect x="590" y="420" width="150" height="12" rx="4" fill="#a16207"/><rect x="604" y="432" width="10" height="50" fill="#854d0e"/><rect x="716" y="432" width="10" height="50" fill="#854d0e"/>
        <path d="M620,330 L700,330 L692,420 L628,420Z" fill="url(#li-glass)" stroke="#bae6fd" stroke-width="3"/>
        <path d="M624,366 L696,366 L692,420 L628,420Z" fill="#3b82f6" opacity=".75"/>${at(0, 0, 1, `<path d="M626,368 q12,-5 24,0 t24,0 t24,0" stroke="#bfdbfe" stroke-width="2" fill="none"/>`, 'a-bob')}
        <path d="M708,340 L708,322 L716,314 L716,300 L728,300 L728,314 L736,322 L736,420 L708,420Z" fill="url(#li-glass)" stroke="#bae6fd" stroke-width="3"/><path d="M709,380 L735,380 L735,419 L709,419Z" fill="#3b82f6" opacity=".75"/>`,
    },
    gaseoso: {
      hs: [[190, 330], [600, 386], [330, 120]],
      svg: () => `<defs>${lin('ga-sky', [[0, '#c4b5fd'], [0.6, '#e9e4ff'], [1, '#fff4e6']])}${rad('ga-heat', [[0, '#fde68a', 0.9], [1, '#fde68a', 0]])}</defs>
        <rect width="800" height="500" fill="url(#ga-sky)"/>
        <g fill="#fff" opacity=".85">${[[260, 110, 1.6], [360, 80, 1.3], [450, 130, 1.1]].map(([x, y, s], i) => at(x, y, s, `<ellipse rx="44" ry="18"/><ellipse cx="-20" cy="-8" rx="24" ry="16"/><ellipse cx="16" cy="-14" rx="26" ry="20"/>`, 'a-drift', `animation-duration:${18 + i * 4}s`)).join('')}</g>
        ${sun(660, 110, 46, '#fde047', '#fde68a')}
        ${at(660, 110, 1, [...Array(12)].map((_, i) => `<path d="M-5,-64 L0,-88 L5,-64Z" fill="#facc15" transform="rotate(${i * 30})"/>`).join(''), 'a-spin-slow')}
        ${hill(330, '#a7e3a0', 30)}${hill(370, '#8fd486', 24)}
        <path d="M0,410 Q300,392 560,420 Q700,436 800,420 L800,500 L0,500Z" fill="#e7cf9f"/>
        <ellipse cx="600" cy="430" rx="90" ry="16" fill="#60a5fa" opacity=".8"/><ellipse cx="584" cy="426" rx="40" ry="5" fill="#bfdbfe" opacity=".8"/>
        ${[0, 1, 2, 3].map((i) => at(560 + i * 26, 418, 1, `<path d="M0,0 q-6,-10 0,-20 q6,-10 0,-20" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round"/>`, 'a-rise', `animation-duration:3s;${delay(-i * 0.75)}`)).join('')}
        <circle cx="190" cy="440" r="70" fill="url(#ga-heat)" class="a-glow"/>
        <rect x="130" y="440" width="120" height="16" rx="6" fill="#475569"/><rect x="140" y="456" width="10" height="34" fill="#334155"/><rect x="230" y="456" width="10" height="34" fill="#334155"/>
        ${at(190, 440, 1, `<path d="M-20,0 Q-24,-18 -8,-30 Q-8,-14 4,-12 Q2,-24 12,-32 Q26,-14 20,0Z" fill="#fb923c"/><path d="M-8,0 Q-10,-12 0,-20 Q10,-12 8,0Z" fill="#fde047"/>`, 'a-flicker')}
        <path d="M134,372 L246,372 L240,432 Q190,442 140,432Z" fill="#94a3b8"/><rect x="126" y="364" width="128" height="12" rx="6" fill="#64748b"/><path d="M128,388 h-14 M252,388 h14" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
        ${[0, 1, 2, 3, 4].map((i) => at(150 + i * 20, 356, 1.1, `<circle r="12" fill="#ffffff"/><circle cx="10" cy="-6" r="9" fill="#ffffff"/>`, 'a-rise', `animation-duration:3.4s;${delay(-i * 0.68)}`)).join('')}
        ${grass(424, 14, '#a3843f', 0, 800)}
        ${[[420, 200], [520, 240], [300, 230]].map(([x, y], i) => sparkle(x, y, i * 0.6, '#ffffff', 1.4)).join('')}`,
    },
  };
  return S;
})();
