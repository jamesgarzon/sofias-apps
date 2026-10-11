// Historias de la Edad Contemporánea: escena animada que se reproduce al tocar cada chispa (mismo orden que los hotspots).
// Coordenadas del viewBox 800×500. Se ve con zoom ×1,9 centrado en la chispa: deja lo importante cerca de ella.
window.STORIES = window.STORIES || {};
window.STORIES.contemporanea = {
  css: `
    .st-contemporanea-lever { animation: st-contemporanea-lever 1.2s ease-in-out infinite; }
    @keyframes st-contemporanea-lever { 0%, 100% { transform: rotate(0deg); } 45%, 60% { transform: rotate(34deg); } }
    .st-contemporanea-needle { animation: st-contemporanea-needle 2.4s ease-out both; }
    @keyframes st-contemporanea-needle { from { transform: rotate(-70deg); } to { transform: rotate(60deg); } }
    .st-contemporanea-off { animation: st-contemporanea-off 1s ease-in both; }
    @keyframes st-contemporanea-off { from { opacity: .62; } to { opacity: 0; } }
    .st-contemporanea-walk { animation: st-contemporanea-walk 3.2s linear both; }
    @keyframes st-contemporanea-walk { from { transform: translateX(140px); } to { transform: translateX(0); } }
    .st-contemporanea-hop { animation: st-contemporanea-hop .8s ease-in-out infinite; }
    @keyframes st-contemporanea-hop { 50% { transform: translateY(-7px); } }
    .st-contemporanea-hide { animation: st-contemporanea-hide .25s linear both; }
    @keyframes st-contemporanea-hide { to { opacity: 0; } }
    .st-contemporanea-show { animation: st-contemporanea-show .25s linear both; }
    @keyframes st-contemporanea-show { from { opacity: 0; } }
    .st-contemporanea-zip { animation: st-contemporanea-zip 1.3s ease-in-out infinite; opacity: 0; }
    @keyframes st-contemporanea-zip { 0% { opacity: 0; transform: translate(0, 0); } 15% { opacity: 1; } 50% { transform: translate(calc(var(--dx) * .5), calc(var(--dy) * .5 - 34px)); } 85% { opacity: 1; } 100% { opacity: 0; transform: translate(var(--dx), var(--dy)); } }
    .st-contemporanea-puff { transform-box: fill-box; transform-origin: 50% 50%; animation: st-contemporanea-puff 1.8s ease-out infinite; opacity: 0; }
    @keyframes st-contemporanea-puff { 0% { opacity: 0; transform: translate(0, 0) scale(.5); } 20% { opacity: .9; } 100% { opacity: 0; transform: translate(14px, -46px) scale(1.6); } }
    .st-contemporanea-hi { transform-box: fill-box; transform-origin: 50% 100%; animation: st-contemporanea-hi .5s ease-in-out infinite alternate; }
    @keyframes st-contemporanea-hi { from { transform: rotate(-16deg); } to { transform: rotate(16deg); } }
    @media (prefers-reduced-motion: reduce) { .st-contemporanea-hop, .st-contemporanea-zip, .st-contemporanea-puff, .st-contemporanea-hi { animation: none !important; } }
  `,
  play: [
    // 0 · Revolución francesa: el pueblo celebra en una tarima, alguien escribe los «Derechos» y aparece el lema
    ({ at, person, sparkle }) => {
      const word = (x, t, c) => at(x, 100, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="15" fill="${c}">${t}</text>`, 's-in', `animation-delay:${{ Libertad: 1, Igualdad: 1.8, Fraternidad: 2.6 }[t]}s`);
      const lines = [174, 192, 210, 228, 246].map((y, i) => `<path d="M306,${y} H${i === 4 ? 372 : 398}" pathLength="1" stroke="#5b3a1a" stroke-width="3" stroke-linecap="round" class="s-draw" style="animation-delay:${0.9 + i * 0.7}s;animation-duration:.7s"/>`).join('');
      return `
        ${at(0, 0, 1, `<rect x="84" y="296" width="364" height="44" rx="4" fill="#7a4a24"/><rect x="84" y="296" width="364" height="7" fill="#a8693a"/>
          ${[0, 1, 2, 3].map((i) => `<path d="M${96 + i * 88},303 q14,18 28,0Z" fill="#0055a4"/><path d="M${124 + i * 88},303 q16,20 32,0Z" fill="#fff"/><path d="M${156 + i * 88},303 q14,18 28,0Z" fill="#ef4135"/>`).join('')}`, 's-up', 'animation-delay:.1s')}
        ${at(176, 88, 1, `<path d="M0,0 H280 L268,12 L280,24 H0 L12,12Z" fill="#fbf3dd" stroke="#c9b28a" stroke-width="2"/>`, 's-in', 'animation-delay:.5s')}
        ${word(226, 'Libertad', '#0055a4')}${word(306, 'Igualdad', '#3a3f5c')}${word(392, 'Fraternidad', '#d62828')}
        ${at(0, 0, 1, `<rect x="292" y="132" width="120" height="146" rx="3" fill="#fbf3dd"/><rect x="286" y="124" width="132" height="12" rx="6" fill="#e8d5a8" stroke="#c9b28a" stroke-width="2"/><rect x="286" y="274" width="132" height="12" rx="6" fill="#e8d5a8" stroke="#c9b28a" stroke-width="2"/>
          <text x="352" y="157" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="16" fill="#35207a">Derechos</text>`, 's-in', 'animation-delay:.3s')}
        ${lines}
        ${at(0, 0, 1, person({ x: 272, y: 300, s: 1.2, skin: '#f0c49c', top: '#35407a', bottom: '#3a2a1e', hair: '#5a3a22', hat: 'beret', hatColor: '#d62828', act: 'paint', delay: 0 }), 's-from-l', 'animation-delay:.2s')}
        ${at(0, 0, 1, person({ x: 140, y: 300, s: 1.05, skin: '#c98b5e', top: '#f1f1f4', dress: true, hair: '#2a180e', hairStyle: 'long', hat: 'beret', hatColor: '#d62828', act: 'cheer', delay: 0 }), 's-from-l', 'animation-delay:.6s')}
        ${at(390, 256, 1, `<circle r="19" fill="#c62828"/><circle r="15" fill="none" stroke="#ffd36b" stroke-width="1.6"/><text y="4.5" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="12" fill="#fff">1789</text>`, 's-stamp', 'animation-delay:4.5s')}
        ${[[300, 128, 4.7], [412, 200, 5], [200, 150, 5.2]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 1 · Revolución Industrial: un obrero mueve la palanca de la máquina de vapor, se enciende el fuego, la rueda gira y el tren silba
    ({ at, person, sparkle, smoke }) => {
      const X = 365, Y = 414, s = 1.3;
      const wheel = `<circle r="22" fill="none" stroke="#e63946" stroke-width="6"/>${[0, 45, 90, 135].map((a) => `<line x1="-20" y1="0" x2="20" y2="0" stroke="#e63946" stroke-width="3.5" transform="rotate(${a})"/>`).join('')}<circle r="5" fill="#ffd36b"/>`;
      return `
        ${at(0, 0, 1, `<rect x="224" y="398" width="78" height="16" rx="3" fill="#4c3f7a"/>
          <rect x="282" y="318" width="18" height="16" rx="3" fill="#e0b04a"/><line x1="298" y1="326" x2="304" y2="292" stroke="#c9ccd6" stroke-width="4" stroke-linecap="round"/>
          <rect x="228" y="298" width="54" height="102" rx="12" fill="#2f8a6a"/><rect x="232" y="302" width="10" height="94" rx="5" fill="#fff" opacity=".18"/>
          ${[310, 392].map((y) => `<rect x="226" y="${y}" width="58" height="6" rx="3" fill="#e0b04a"/>`).join('')}
          <rect x="249" y="262" width="12" height="38" fill="#2b2d42"/><rect x="244" y="256" width="22" height="8" rx="3" fill="#1b1c2e"/>
          <rect x="238" y="356" width="34" height="32" rx="5" fill="#1b1c2e" stroke="#e0b04a" stroke-width="2.5"/>
          <rect x="280" y="345" width="10" height="8" rx="2" fill="#e0b04a"/>
          <circle cx="255" cy="333" r="12" fill="#f1f3f8" stroke="#e0b04a" stroke-width="3"/>`, 's-up', 'animation-delay:.1s')}
        ${at(255, 378, 1, `<ellipse rx="13" ry="8" fill="#ff8f3a" class="a-glow"/>${at(0, 8, 1, `<path d="M-10,0 Q-11,-13 -3,-19 Q-1,-9 2,-15 Q9,-7 10,0Z" fill="#ffd36b"/>`, 'a-flicker')}`, 's-fade', 'animation-delay:1.1s')}
        ${at(255, 333, 1, `<g class="st-contemporanea-needle" style="transform-box:view-box;transform-origin:0 0;animation-delay:1.3s"><line x1="0" y1="0" x2="0" y2="-9" stroke="#d62828" stroke-width="2.4" stroke-linecap="round"/></g><circle r="2.2" fill="#2b2d42"/>`)}
        ${at(304, 292, 1, wheel, 'a-spin', 'animation-duration:1s;animation-delay:1.6s')}
        ${at(0, 0, 1, [0, 1, 2].map((i) => at(255, 252, 1, `<circle r="8" fill="#f1f1f6"/>`, 'st-contemporanea-puff', `animation-delay:${-i * 0.6}s`)).join(''), 's-fade', 'animation-delay:1.8s')}
        <g transform="translate(${X} ${Y}) scale(${-s} ${s})"><g transform="translate(60 -50)"><g class="pa st-contemporanea-lever" style="animation-delay:0s">
          <line x1="0" y1="0" x2="-30" y2="1.6" stroke="#c9ccd6" stroke-width="4" stroke-linecap="round"/><circle cx="-31" cy="1.7" r="5" fill="#e63946"/></g>
          <circle r="4.5" fill="#e0b04a"/></g></g>
        ${person({ x: X, y: Y, s, flip: true, skin: '#d9a07a', top: '#4f7cff', bottom: '#3a3f5c', shoe: '#1f1a17', hair: '#3a2414', hat: 'beret', hatColor: '#a0703c', act: 'press', delay: 0 })}
        ${at(470, 296, 1, `<ellipse cx="0" cy="8" rx="34" ry="16" fill="#f1f1f6"/><ellipse cx="-22" cy="16" rx="18" ry="11" fill="#f1f1f6"/><ellipse cx="22" cy="16" rx="18" ry="11" fill="#f1f1f6"/>
          <text y="16" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="15" fill="#d62828">¡Chuuu!</text>`, 's-in', 'animation-delay:3s')}
        ${[[300, 256, 2.4], [232, 280, 2.7], [550, 270, 3.4]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd36b', 1.1), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 2 · La electricidad: Edison enrosca la bombilla, el cable lleva la luz a las casas, la ciudad se ilumina y llegan carro y avión
    ({ at, person, rad, sparkle }) => {
      const wins = [];
      [226, 270].forEach((y, r) => [60, 84, 108, 132, 156].forEach((x, i) => wins.push(`<rect x="${x - 6}" y="${y}" width="12" height="20" rx="6" fill="#fff3b0" class="s-fade" style="animation-delay:${2.6 + r * 0.3 + i * 0.1}s"/>`)));
      const car = `<path d="M-34,-6 L-34,-18 L-14,-20 L-8,-34 L18,-34 L26,-20 L36,-18 L36,-6Z" fill="#d62828"/><path d="M-5,-31 L-1,-21 L10,-21 L10,-31Z M13,-31 L13,-21 L22,-21 L17,-31Z" fill="#bfe8ff"/>
        ${[-20, 22].map((x) => `<circle cx="${x}" cy="-5" r="8" fill="#1b1b24"/><circle cx="${x}" cy="-5" r="3" fill="#cfcfd8"/>`).join('')}<circle cx="36" cy="-14" r="3" fill="#fff3b0"/><path d="M39,-14 L62,-22 L62,-6Z" fill="#ffe08a" opacity=".55"/>`;
      const plane = `<path d="M30,-2 L38,-18 L44,-18 L42,-2Z" fill="#e63946"/><path d="M-32,0 Q-30,-8 -16,-8 L36,-5 Q42,0 36,4 L-16,6 Q-30,6 -32,0Z" fill="#f1f3f8"/>
        <path d="M-6,-1 L12,-1 L20,14 L8,14Z" fill="#5ee7ff"/>${[-20, -12, -4, 4, 12, 20].map((x) => `<circle cx="${x}" cy="-3" r="1.8" fill="#4c4f6e"/>`).join('')}<path d="M-32,0 Q-30,-6 -24,-7 L-24,0Z" fill="#4c4f6e"/>`;
      return `
        ${rad('st-contemporanea-bulb', [[0, '#fff7c2', 0.95], [0.35, '#ffd36b', 0.5], [1, '#ffd36b', 0]])}
        <rect x="0" y="120" width="480" height="300" fill="#080a24" class="st-contemporanea-off" style="animation-delay:3.4s"/>
        ${at(0, 0, 1, `<path d="M296,386 L296,232 Q296,220 284,220 L270,220" stroke="#8a8fb5" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="288" y="378" width="16" height="9" rx="2" fill="#8a8fb5"/><rect x="263" y="219" width="12" height="16" rx="2" fill="#c9ccd6"/>`, 's-up', 'animation-delay:.1s')}
        <path d="M290,226 Q236,262 178,214" pathLength="1" stroke="#cfd3f0" stroke-width="2.6" fill="none" class="s-draw" style="animation-delay:2s;animation-duration:.7s"/>
        <circle cx="269" cy="252" r="66" fill="url(#st-contemporanea-bulb)" class="s-fade" style="animation-delay:1.6s"/>
        ${at(269, 236, 1, `<rect x="-5" y="-2" width="10" height="7" rx="1.5" fill="#c9ccd6"/><path d="M-5,4 Q-5,8 -10,13 A11,11 0 1,0 10,13 Q5,8 5,4Z" fill="#e8f1ff" stroke="#9aa6c4" stroke-width="1.5"/>`)}
        ${at(269, 236, 1, `<path d="M-5,4 Q-5,8 -10,13 A11,11 0 1,0 10,13 Q5,8 5,4Z" fill="#fff3b0"/><path d="M-3,6 L-3,14 Q0,19 3,14 L3,6" stroke="#e8a12e" stroke-width="1.6" fill="none"/>
          ${[-150, -110, -70, -30, 10, 50].map((a) => `<line x1="20" y1="0" x2="30" y2="0" stroke="#fff3b0" stroke-width="3" stroke-linecap="round" transform="translate(0 16) rotate(${a})"/>`).join('')}`, 's-in', 'animation-delay:1.6s')}
        ${person({ x: 236, y: 386, s: 1.25, skin: '#f0c49c', top: '#f1f1f4', bottom: '#3a3f5c', shoe: '#1b1b24', hair: '#4a3424', act: 'dab', delay: 0 })}
        ${wins.join('')}
        ${at(134, 386, 1, car, 's-from-l', 'animation-delay:4s')}
        ${at(330, 186, 1, plane, 's-from-r', 'animation-delay:4.4s')}
        ${[[254, 214, 1.9], [310, 270, 2.2], [120, 210, 3.6]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 3 · ¡A la Luna!: aterriza el módulo, Neil Armstrong camina dejando huellas, aparece la bandera y saluda (1969)
    ({ at, person, sparkle }) => {
      const astro = (act) => `<rect x="-21" y="-74" width="42" height="40" rx="8" fill="#d8dbe2"/>${person({ x: 0, y: 0, s: 1, skin: '#f0c49c', top: '#f1f3f8', bottom: '#f1f3f8', shoe: '#9aa1ad', hair: '#6b4a2e', act, delay: 0 })}
        <g class="pa ${act === 'walk' ? 'pa-walk-body' : 'pa-breathe'}" style="animation-delay:0s"><circle cx="0" cy="-86" r="24" fill="#bfe3ff" opacity=".3" stroke="#f4f6fa" stroke-width="5"/><path d="M-14,-100 Q-6,-108 6,-106" stroke="#fff" stroke-width="3" fill="none" opacity=".8" stroke-linecap="round"/><rect x="-10" y="-62" width="20" height="8" rx="2" fill="#5ee7ff"/></g>`;
      const flag = `<line x1="0" y1="0" x2="0" y2="-80" stroke="#cfd3db" stroke-width="3"/><line x1="0" y1="-78" x2="42" y2="-78" stroke="#cfd3db" stroke-width="2"/>
        <g transform="translate(1 -77)">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect y="${i * 4}" width="41" height="4" fill="${i % 2 ? '#fff' : '#d62828'}"/>`).join('')}<rect width="18" height="16" fill="#3b5bdb"/>${[[4, 4], [9, 4], [14, 4], [6.5, 8.5], [11.5, 8.5], [4, 13], [9, 13], [14, 13]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.1" fill="#fff"/>`).join('')}</g>`;
      const lander = `<path d="M-22,-20 L-36,0 M22,-20 L36,0 M-10,-18 L-16,0 M10,-18 L16,0" stroke="#b9bdc8" stroke-width="3" stroke-linecap="round"/><ellipse cx="-36" cy="0" rx="6" ry="2.4" fill="#b9bdc8"/><ellipse cx="36" cy="0" rx="6" ry="2.4" fill="#b9bdc8"/>
        <path d="M-26,-40 L26,-40 L30,-22 L26,-14 L-26,-14 L-30,-22Z" fill="#d9a441"/><path d="M-20,-36 L-6,-18 M2,-38 L16,-16" stroke="#f2c14e" stroke-width="2" opacity=".8"/>
        <path d="M-18,-40 L-20,-58 L-8,-70 L10,-70 L20,-58 L18,-40Z" fill="#dfe2e8"/><path d="M-10,-62 L-2,-62 L-6,-52Z" fill="#2b2d42"/><path d="M4,-62 L12,-62 L8,-52Z" fill="#2b2d42"/><line x1="12" y1="-70" x2="20" y2="-84" stroke="#b9bdc8" stroke-width="2"/><circle cx="20" cy="-85" r="3" fill="#dfe2e8"/>`;
      const print = (x, y, d) => at(x, y, 1, `<ellipse rx="6" ry="2.6" fill="#8d919e"/><path d="M-4,0 h8" stroke="#6f7380" stroke-width="1"/>`, 's-stamp', `animation-delay:${d}s`);
      return `
        ${at(0, 0, 1, `<circle cx="540" cy="900" r="668" fill="#c9ccd6"/><circle cx="540" cy="904" r="668" fill="none" stroke="#e3e5ec" stroke-width="5" opacity=".6"/>
          ${[[388, 262, 16, 4], [604, 290, 22, 5], [700, 258, 12, 3.5], [480, 296, 10, 3]].map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#a9adb9"/><ellipse cx="${x}" cy="${y - 1}" rx="${rx - 3}" ry="${ry - 1.5}" fill="#b8bbc6"/>`).join('')}`, 's-up', 'animation-delay:.1s')}
        ${at(690, 83, 1, `<circle r="36" fill="#3b82f6"/><path d="M-22,-20 Q-8,-28 2,-16 Q-6,-6 -16,-8 Q-26,-6 -22,-20Z M8,2 Q24,-6 30,8 Q22,22 10,24 Q2,14 8,2Z M-30,8 Q-20,4 -16,14 Q-22,22 -28,18Z" fill="#5cb945"/><path d="M-26,-2 Q-10,-8 6,-4 M-4,30 Q10,24 24,28" stroke="#fff" stroke-width="3" fill="none" opacity=".75" stroke-linecap="round"/>`, 's-in', 'animation-delay:.5s')}
        ${at(660, 262, 1, lander, 's-drop', 'animation-delay:.3s')}
        ${print(616, 272, 2)}${print(592, 278, 2.55)}${print(566, 272, 3.15)}${print(540, 278, 3.75)}
        ${at(0, 0, 1, at(0, 0, 1, at(506, 268, 1, at(0, 0, 1, `<g transform="scale(-1.2 1.2)">${astro('walk')}</g>`, 'st-contemporanea-hop'), 'st-contemporanea-walk', 'animation-delay:1s'), 'st-contemporanea-hide', 'animation-delay:4.2s'), 'st-contemporanea-show', 'animation-delay:.9s')}
        ${at(0, 0, 1, at(506, 268, 1.2, astro('wave')), 'st-contemporanea-show', 'animation-delay:4.2s')}
        ${at(424, 274, 1, flag, 's-drop', 'animation-delay:4.5s')}
        ${at(394, 104, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="24" fill="#fff6d6">1969</text>`, 's-in', 'animation-delay:4.9s')}
        ${[[470, 170, 5], [560, 150, 5.3], [440, 236, 5.6]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 4 · Computadores e internet: una niña con su celular saluda a un amigo de otro país en la pantalla; los mensajes viajan en segundos
    ({ at, person, sparkle }) => {
      const bubble = (w, t, c, tail) => `<rect x="${-w / 2}" y="-30" width="${w}" height="28" rx="12" fill="#fff" stroke="${c}" stroke-width="2.5"/><path d="M${tail - 6},-3.5 L${tail},8 L${tail + 6},-3.5Z" fill="#fff" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/><rect x="${tail - 7}" y="-6" width="14" height="4" fill="#fff"/>
        <text y="-11" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="15" fill="${c}">${t}</text>`;
      const env = `<rect x="-9" y="-6.5" width="18" height="13" rx="2" fill="#fff"/><path d="M-9,-6.5 L0,1 L9,-6.5" stroke="#7b5cff" stroke-width="1.6" fill="none"/>`;
      return `
        ${at(486, 252, 1, `<circle r="30" fill="#3b82f6"/><path d="M-18,-16 Q-6,-24 4,-14 Q-4,-4 -14,-6 Q-24,-4 -18,-16Z M8,2 Q22,-6 26,8 Q20,20 8,22 Q0,12 8,2Z M-26,8 Q-16,4 -12,14 Q-18,20 -24,16Z" fill="#5cb945"/>
          <text y="48" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="13" fill="#bfefff">Internet</text>`, 's-in', 'animation-delay:1.3s')}
        <path d="M574,372 Q530,290 496,276" pathLength="1" stroke="#5ee7ff" stroke-width="2.4" stroke-dasharray=".04 .03" fill="none" class="s-draw" style="animation-delay:1.6s;animation-duration:.8s"/>
        <path d="M516,250 Q640,226 690,384" pathLength="1" stroke="#5ee7ff" stroke-width="2.4" fill="none" class="s-draw" style="animation-delay:2s;animation-duration:.8s"/>
        ${at(0, 0, 1, person({ x: 604, y: 436, s: 1.25, skin: '#c98b5e', top: '#ff6fa8', bottom: '#4b3f8f', shoe: '#ffffff', hair: '#2a180e', hairStyle: 'long', act: 'wave', delay: 0 })
          + `<g transform="translate(576 389)"><rect x="-6" y="-11" width="12" height="20" rx="2.5" fill="#1b1c2e"/><rect x="-4.5" y="-8.5" width="9" height="14" rx="1.5" fill="#5ee7ff"/></g>`, 's-from-l', 'animation-delay:.2s')}
        ${at(556, 286, 1, bubble(70, '¡Hola!', '#d6336c', 18), 's-in', 'animation-delay:.9s')}
        ${at(690, 418, 1, `<rect x="-42" y="-28" width="84" height="52" rx="3" fill="#bfefff"/><circle cx="0" cy="2" r="14" fill="#8a5a3a"/>
          <g fill="#1d120b">${[-12, -5, 2, 9].map((x, i) => `<circle cx="${x + 2}" cy="${-10 - (i % 2) * 2}" r="6"/>`).join('')}</g>
          <circle cx="-5" cy="2" r="1.8" fill="#1d120b"/><circle cx="5" cy="2" r="1.8" fill="#1d120b"/><path d="M-4,8 Q0,12 4,8" stroke="#1d120b" stroke-width="1.6" fill="none" stroke-linecap="round"/>
          <path d="M-14,24 Q0,12 14,24Z" fill="#f5c518"/>
          <g class="st-contemporanea-hi"><path d="M22,22 L25,2" stroke="#f5c518" stroke-width="7" stroke-linecap="round"/><circle cx="25" cy="-2" r="5.5" fill="#8a5a3a"/></g>`, 's-in', 'animation-delay:2.6s')}
        ${at(690, 370, 1, bubble(74, 'Hello!', '#7b5cff', -4), 's-in', 'animation-delay:3.2s')}
        ${[0, 0.65].map((d) => `<g transform="translate(576 376)"><g class="st-contemporanea-zip" style="--dx:110px;--dy:16px;animation-delay:${2.6 + d}s">${env}</g></g>`).join('')}
        ${[[640, 300, 3.8], [722, 318, 4.1], [432, 232, 4.4]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.2), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
  ],
};
