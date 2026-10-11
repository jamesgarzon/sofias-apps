// Escenas SVG de cada tema (viewBox 800×500), sus puntos ✨ (hs: [x, y] en el mismo viewBox) y sus historias
// (story: una por chispa, en el orden de hs; se reproducen al tocarla — ver «Historias» en kit/v1/README.md).
// Reglas: hs separados ≥110 unidades, sin tapar caras; lo animado va con at(..., 'a-clase').
// Historias: con el zoom ×1,9 sobre la chispa (hx, hy) solo se ve x ∈ [0,474·hx, hx + 0,526·(800−hx)] e
// y ∈ [0,474·hy, hy + 0,526·(500−hy)]; la persona va grande, haciendo la acción, en el centro de esa ventana.
window.APP_SCENES = (() => {
  const { lin, rad, at, delay, sun, cloud, birds, hill, waves, grass, sparkle, tree } = KitSVG;

  const penguin = `<ellipse cx="0" cy="-34" rx="22" ry="34" fill="#1f2937"/><ellipse cx="0" cy="-28" rx="15" ry="26" fill="#fff"/>
    <circle cx="-6" cy="-52" r="3" fill="#111"/><circle cx="6" cy="-52" r="3" fill="#111"/><circle cx="-5" cy="-53" r="1" fill="#fff"/><circle cx="7" cy="-53" r="1" fill="#fff"/>
    <path d="M-5,-46 L5,-46 L0,-39Z" fill="#f59e0b"/><circle cx="-11" cy="-44" r="3" fill="#fb7185" opacity=".5"/><circle cx="11" cy="-44" r="3" fill="#fb7185" opacity=".5"/>
    <path d="M-21,-40 Q-34,-24 -24,-12" stroke="#1f2937" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M21,-40 Q34,-24 24,-12" stroke="#1f2937" stroke-width="8" fill="none" stroke-linecap="round"/>
    <ellipse cx="-9" cy="0" rx="9" ry="4" fill="#f59e0b"/><ellipse cx="9" cy="0" rx="9" ry="4" fill="#f59e0b"/>`;
  const flake = (x, y, s, d) => at(x, y, s, `<g stroke="#7cc4ea" stroke-width="2.4" stroke-linecap="round">${[0, 60, 120].map((a) => `<path d="M0,-9 V9 M-4,-6 L0,-9 L4,-6 M-4,6 L0,9 L4,6" transform="rotate(${a})"/>`).join('')}</g>`, 'a-drip', `animation-duration:${5 + (d % 3)}s;${delay(-d)}`);

  // ---------- piezas de las historias (story): se reproducen al tocar cada chispa ----------
  // Etiqueta corta (1–2 palabras) que aparece con rebote; el borde blanco la hace legible sobre cualquier fondo.
  const label = (x, y, t, d, fill = '#0c4a6e', size = 19) => at(x, y, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="${size}" fill="${fill}" stroke="#fff" stroke-width="5" stroke-linejoin="round" paint-order="stroke">${t}</text>`, 's-in', delay(d));
  const drop = (c = '#3b82f6') => `<path d="M0,-8 Q-6,1 0,5 Q6,1 0,-8Z" fill="${c}"/>`;
  // Cubo de hielo con la base en (0,0): ancho ≈ 34, alto ≈ 38.
  const iceCube = `<g stroke="#5aa9d6" stroke-width="1.5" stroke-linejoin="round"><path d="M-17,-30 L-9,-38 L17,-38 L9,-30Z" fill="#f4fcff"/><path d="M9,-30 L17,-38 L17,-8 L9,0Z" fill="#a9daf6"/><rect x="-17" y="-30" width="26" height="30" fill="#d4f0ff"/></g><path d="M-12,-24 h12 M-12,-18 h6" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`;
  // Ropa de los niños de las historias (se combinan con { x, y, s, act… } en person()).
  // Para que sostengan algo propio (cubo, botella, tetera): act 'none' o 'idle' y el objeto dibujado en la mano:
  // brazo 'out' → (x + 32·s, y − 52·s) · 'up' → (x + 25·s, y − 89·s) · 'wave' → (x + 31·s, y − 85·s) · 'down' → (x ± 22·s, y − 37,5·s).
  const kids = {
    ana: { skin: '#f1c7a5', hair: '#6b3a1e', hairStyle: 'pigtails', top: '#ef476f', bottom: '#3a3f5c', shoe: '#5b3a29' },
    leo: { skin: '#8d5a3b', hair: '#1f140d', top: '#2a9d8f', bottom: '#264653', shoe: '#2b2622' },
    mia: { skin: '#c68a5e', hair: '#2b1b12', hairStyle: 'long', dress: true, top: '#ffb703', shoe: '#7a4f28' },
  };

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
      // Historias: una por chispa, en el orden de hs. Solo se ve la ventana del zoom alrededor de la chispa.
      story: [
        // 0 · El hielo: dos niños en un témpano; Ana sostiene un cubo de hielo con las manos y Leo golpea un bloque: ¡toc, toc, es duro!
        ({ at, person, sparkle }) => {
          const block = `<g stroke="#4a9bd0" stroke-width="2" stroke-linejoin="round"><path d="M0,-74 L12,-84 L60,-84 L48,-74Z" fill="#eefaff"/><path d="M48,-74 L60,-84 L60,-10 L48,0Z" fill="#8ccbf0"/><rect y="-74" width="48" height="74" fill="#bfe6ff"/></g><path d="M9,-62 v36 M17,-64 v16" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
          const mitten = (x) => `<circle cx="${x}" cy="-37.5" r="6" fill="#ffd166" stroke="#e0a526" stroke-width="1.5"/>`;
          // astillas de hielo al ritmo del golpe: usan la misma animación que las del kit (pa-chip) y el mismo delay que Leo (0)
          const chips = [[-14, -26], [10, -30], [22, -10]].map(([dx, dy]) => `<path d="M0,-4 L4,0 L0,4 L-4,0Z" fill="#5aa9d6" class="pa pa-chip" style="animation-delay:0s;--dx:${dx}px;--dy:${dy}px"/>`).join('');
          return `
          ${at(452, 362, 1, `<ellipse rx="156" ry="15" fill="#f4fbff" stroke="#9fd3f2" stroke-width="2"/><path d="M-144,6 Q0,24 144,6 Q120,20 0,22 Q-120,20 -144,6Z" fill="#7cc4ea" opacity=".6"/>`, 's-fade')}
          ${at(520, 356, 1, block, 's-drop', delay(0.3))}
          ${at(0, 0, 1, person({ ...kids.leo, x: 478, y: 356, s: 1.1, item: 'stone', act: 'hammer', delay: 0 }), 's-from-l', delay(0.5))}
          ${at(526, 283, 1, chips, 's-fade', delay(1.9))}
          ${at(368, 356, 1.15, `${person({ ...kids.ana })}${at(2, -22, 1.15, iceCube)}${mitten(-22)}${mitten(22)}`, 's-from-l')}
          ${label(552, 254, '¡Duro!', 2.2)}
          ${label(368, 212, 'Forma propia', 3.4)}
          ${[[328, 298, 3.6], [416, 292, 3.9], [420, 336, 4.2]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffffff', 1.4), 's-in', delay(d))).join('')}`;
        },
        // 1 · La nieve: Mía atrapa copos con la mano y cada uno sale en grande, como con lupa: ¡ninguno es igual!
        ({ at, person }) => {
          const six = (f) => [0, 60, 120, 180, 240, 300].map((a) => `<g transform="rotate(${a})">${f}</g>`).join('');
          const crystals = [
            six('<path d="M0,0 V-24 M0,-10 L-7,-16 M0,-10 L7,-16 M0,-17 L-5,-22 M0,-17 L5,-22"/>'),
            `<path d="M0,-22 L19,-11 L19,11 L0,22 L-19,11 L-19,-11Z" fill="#dff3ff"/><path d="M0,-12 L10,-6 L10,6 L0,12 L-10,6 L-10,-6Z"/>${six('<path d="M0,0 V-12"/>')}`,
            six('<path d="M0,0 V-16"/><path d="M0,-16 L-6,-22 L0,-26 L6,-22Z" fill="#dff3ff"/>'),
          ];
          const lens = (c) => `<circle r="34" fill="#ffffff" stroke="#7cc4ea" stroke-width="3.5"/><g stroke="#2b8fd0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">${c}</g>`;
          const tiny = `<g stroke="#2b8fd0" stroke-width="2.6" stroke-linecap="round">${six('<path d="M0,0 V-9"/>')}</g>`;
          const [hx, hy] = [256, 236]; // la mano de Mía (brazo 'out')
          return `
          ${at(0, 0, 1, `<path d="M130,330 Q150,288 230,286 Q320,284 360,330Z" fill="#ffffff"/><path d="M150,312 Q240,300 340,316" stroke="#cfe8f8" stroke-width="3" fill="none"/>`, 's-fade')}
          ${[[180, 80], [250, 60], [330, 175], [420, 70], [510, 90], [460, 230], [200, 150], [540, 200]].map(([x, y], i) => flake(x, y, 0.9, i * 0.7)).join('')}
          ${at(0, 0, 1, person({ ...kids.mia, x: 222, y: 292, s: 1.05, arm: 'out', act: 'warm' }), 's-from-l')}
          ${[[388, 112], [484, 168], [392, 228]].map(([x, y], i) => `
            ${at(hx, hy - 6, 1, at(0, 0, 1, tiny, 's-out', delay(1.6 + i * 1.3)), 's-drop', delay(0.7 + i * 1.3))}
            ${at(x, y, 1, lens(crystals[i]), 'st-move', `--dx:${hx - x}px;--dy:${hy - y}px;--s0:.15;animation-duration:1s;${delay(1.6 + i * 1.3)}`)}`).join('')}
          ${label(440, 292, '¡Ninguno es igual!', 5)}`;
        },
        // 2 · Se derrite: el sol calienta el cubo de hielo en la mano de Ana; se encoge, gotea y queda un charco (fusión)
        ({ at, person, rad, lin }) => `
          <defs>${rad('st-so-warm', [[0, '#ffd166', 0.75], [1, '#ffd166', 0]])}${lin('st-so-ray', [[0, '#fff3b0', 0], [1, '#ffd166', 0.6]])}</defs>
          ${at(0, 0, 1, `<path d="M70,150 L150,150 L292,330 L254,344Z" fill="url(#st-so-ray)" class="a-glow"/>`, 's-fade', delay(0.2))}
          ${at(270, 330, 1, '<circle r="44" fill="url(#st-so-warm)"/>', 's-fade', delay(0.6))}
          ${person({ ...kids.ana, x: 232, y: 410, s: 1.05, arm: 'out' })}
          ${at(268, 352, 1.3, iceCube, 'st-shrink', `--sx:.5;--sy:0;--o1:0;animation-duration:3.4s;${delay(1)}`)}
          ${at(268, 354, 1, '<ellipse rx="10" ry="3.5" fill="#60a5fa"/>', 's-in', delay(2.6))}
          ${[0, 0.7, 1.4].map((d) => at(268, 360, 0.55, drop('#3b82f6'), 'a-drip', `animation-duration:2.1s;${delay(1.6 + d)}`)).join('')}
          ${at(268, 414, 1, '<ellipse rx="30" ry="7" fill="#93c5fd" stroke="#60a5fa" stroke-width="2"/><ellipse cx="-8" cy="-2" rx="10" ry="2" fill="#dbeafe"/>', 's-in', `animation-duration:1.6s;${delay(2.2)}`)}
          ${label(372, 236, 'Fusión', 4.2, '#0c4a6e', 26)}
          ${at(372, 264, 1, `<g font-family="Fredoka, sans-serif" font-weight="600" font-size="16" text-anchor="middle" stroke="#fff" stroke-width="5" stroke-linejoin="round" paint-order="stroke"><text x="-36" fill="#0369a1">hielo</text><text fill="#0c4a6e">→</text><text x="36" fill="#2563eb">agua</text></g>`, 's-in', delay(4.6))}`,
      ],
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
      story: [
        // 0 · Toma la forma del vaso: Leo inclina su botella y vierte el agua en el vaso vacío; la botella se vacía y el vaso se llena
        ({ at, person, sparkle }) => {
          // botella agarrada por la base, con la mano en (0,0) y el cuello hacia arriba; st-tilt la gira para verter
          const bottle = `<path d="M-10,-46 L-10,-6 Q-10,0 -4,0 L4,0 Q10,0 10,-6 L10,-46 L4,-52 L4,-62 L-4,-62 L-4,-52Z" fill="#e0f2fe" stroke="#7cc4ea" stroke-width="2.5" stroke-linejoin="round"/>
            ${at(0, -2, 1, '<rect x="-8" y="-40" width="16" height="40" rx="2" fill="#3b82f6"/>', 'st-shrink', `--sy:0;animation-duration:2.6s;${delay(1.3)}`)}
            <rect x="-11" y="-32" width="22" height="9" fill="#ffffff" stroke="#7cc4ea" stroke-width="1.5"/>`;
          // el vaso de la escena se tapa con uno vacío para que se vea cómo se llena
          return `
          <path d="M620,330 L700,330 L692,420 L628,420Z" fill="#eaf7ff" stroke="#bae6fd" stroke-width="3"/>
          ${at(0, 0, 1, '<path d="M627,374 L693,374 L690,417 L630,417Z" fill="#3b82f6" opacity=".85"/><path d="M628,376 q11,-4 22,0 t22,0 t21,0" stroke="#bfdbfe" stroke-width="2" fill="none"/>', 's-grow', `animation-duration:2.8s;animation-timing-function:ease-in-out;${delay(1.4)}`)}
          ${at(0, 0, 1, '<path d="M470,446 Q478,424 530,423 Q586,422 600,446Z" fill="#6ab85e"/>', 's-fade')}
          ${at(0, 0, 1, person({ ...kids.leo, x: 534, y: 430, s: 1.45, arm: 'wave', act: 'none' }), 's-fade')}
          ${at(579, 307, 1, bottle, 'st-tilt', `--rot:100deg;animation-duration:1.1s;${delay(0.4)}`)}
          ${at(0, 0, 1, '<path d="M640,318 Q648,322 650,334 L652,416" pathLength="1" stroke="#3b82f6" stroke-width="6" fill="none" class="s-draw" style="animation-duration:.5s;animation-delay:1.3s"/>', 's-out', delay(4))}
          ${label(648, 280, '¡La misma agua!', 4.6)}
          ${[[628, 350, 4.8], [690, 360, 5.1]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffffff', 1.3), 's-in', delay(d))).join('')}`;
        },
        // 1 · El agua fluye: un barquito de papel baja con la corriente desde la cascada hacia el mar; Mía lo señala desde la orilla
        ({ at, person }) => {
          const path = 'M276,200 Q280,280 282,326 Q290,356 360,360 Q450,364 514,371';
          const boat = `<path d="M-24,-8 L24,-8 L14,6 L-14,6Z" fill="#fef3c7" stroke="#d97706" stroke-width="2" stroke-linejoin="round"/><path d="M-12,-8 L0,-30 L12,-8Z" fill="#fde68a" stroke="#d97706" stroke-width="2" stroke-linejoin="round"/>`;
          return `
          <path d="${path}" pathLength="1" stroke="#ffffff" stroke-width="11" fill="none" stroke-linecap="round" class="s-draw" style="animation-duration:2.4s;animation-delay:.3s"/>
          <path d="${path}" pathLength="1" stroke="#1e3a8a" stroke-width="5" fill="none" stroke-linecap="round" class="s-draw" style="animation-duration:2.4s;animation-delay:.3s"/>
          ${at(516, 371, 1, '<g transform="rotate(7)" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-12,-12 L4,0 L-12,12" stroke="#ffffff" stroke-width="11"/><path d="M-12,-12 L4,0 L-12,12" stroke="#1e3a8a" stroke-width="5"/></g>', 's-in', delay(2.6))}
          ${at(0, 0, 1, person({ ...kids.mia, x: 362, y: 344, s: 1.05, act: 'point' }), 's-from-r')}
          ${at(430, 367, 1, at(0, 0, 1, boat, 'a-rock'), 'st-move', `--dx:-134px;--dy:-15px;animation-duration:4.2s;animation-timing-function:ease-out;${delay(0.6)}`)}
          ${label(500, 320, '¡Al mar!', 3.2)}`;
        },
        // 2 · La lluvia: llega una nube gris y llueve; Ana se cubre con su paraguas y a sus pies se forma un charco
        ({ at, person, cloud }) => {
          // gota que cae `fall` unidades (a-drip baja 90: se escala el recorrido y se compensa el tamaño de la gota)
          const rain = (x, y, fall, d) => at(x, y, fall / 90, `<g transform="scale(${(90 / fall).toFixed(2)})">${drop('#2563eb')}</g>`, 'a-drip', `animation-duration:${(0.5 + fall / 220).toFixed(2)}s;${delay(d)}`);
          const umbrella = `<path d="M-50,0 Q-48,-38 0,-40 Q48,-38 50,0 Q38,-8 25,0 Q12,-8 0,0 Q-12,-8 -25,0 Q-38,-8 -50,0Z" fill="#8b5cf6" stroke="#6d28d9" stroke-width="2" stroke-linejoin="round"/><path d="M0,-40 Q-14,-20 -25,0 M0,-40 Q14,-20 25,0" stroke="#6d28d9" stroke-width="1.5" fill="none"/><path d="M0,-40 V-46" stroke="#6d28d9" stroke-width="3" stroke-linecap="round"/><path d="M0,0 V58 Q0,66 -7,64" stroke="#4c1d95" stroke-width="3" fill="none" stroke-linecap="round"/>`;
          return `
          ${at(0, 0, 1, cloud(392, 116, 1.35, 1, '', 0, '#8494aa'), 's-from-r')}
          ${at(0, 0, 1, [328, 340, 452, 464].map((x, i) => rain(x, 142, 150, -(i * 0.37) % 1)).join('') + [354, 372, 390, 408, 426, 444].map((x, i) => rain(x, 142, 22, -(i * 0.21) % 0.6)).join(''), 's-fade', delay(0.9))}
          ${at(370, 303, 1, '<ellipse rx="46" ry="7" fill="#60a5fa" opacity=".85"/><ellipse cx="-12" cy="-2" rx="16" ry="2.4" fill="#dbeafe"/>', 's-in', `animation-duration:2s;${delay(1.6)}`)}
          ${person({ ...kids.ana, x: 370, y: 302, s: 0.95, arm: 'up', act: 'idle' })}
          ${at(394, 210, 1, umbrella, 's-in')}
          ${label(250, 292, '¡Agua líquida!', 4.2)}`;
        },
      ],
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
      story: [
        // 0 · El agua hierve: el termómetro de la olla sube hasta 100 °C, el agua borbotea y sale mucho vapor; Mía, de chef, lo señala
        ({ at, person }) => {
          const ticks = [0, 1, 2, 3, 4].map((i) => `<path d="M6,${-i * 20} h6" stroke="#64748b" stroke-width="2"/>`).join('');
          // la olla se vuelve a dibujar encima del termómetro para que este quede "dentro"
          const pot = '<path d="M134,372 L246,372 L240,432 Q190,442 140,432Z" fill="#94a3b8"/><rect x="126" y="364" width="128" height="12" rx="6" fill="#64748b"/><path d="M128,388 h-14 M252,388 h14" stroke="#475569" stroke-width="6" stroke-linecap="round"/>';
          const bubble = '<circle r="7" fill="#eff6ff" stroke="#60a5fa" stroke-width="2.5"/>';
          const steam = (x, y, d) => at(x, y, 1, '<g fill="#ffffff" stroke="#d6cbff" stroke-width="1.5"><circle r="14"/><circle cx="12" cy="-7" r="10"/></g>', 'a-smoke', `animation-duration:3s;${delay(d)}`);
          return `
          ${at(226, 356, 1, `<rect x="-7" y="-96" width="14" height="110" rx="7" fill="#ffffff" stroke="#64748b" stroke-width="2.5"/>${ticks}<rect x="-3" y="-20" width="6" height="30" rx="3" fill="#ef4444"/>${at(0, -18, 1, '<rect x="-3" y="-66" width="6" height="66" rx="3" fill="#ef4444"/>', 's-grow', `animation-duration:2.6s;animation-timing-function:ease-in-out;${delay(0.4)}`)}`, 's-fade')}
          ${pot}
          ${[150, 172, 194, 214, 234].map((x, i) => at(x, 364, 0.3, `<g transform="scale(3.3)">${bubble}</g>`, 'a-rise', `animation-duration:1s;${delay(2.6 + i * 0.19)}`)).join('')}
          ${at(0, 0, 1, [0, 1, 2, 3, 4, 5].map((i) => steam(142 + (i % 3) * 22, 346, -i * 0.5)).join(''), 's-fade', delay(2.8))}
          ${at(0, 0, 1, person({ ...kids.mia, x: 344, y: 404, s: 1.1, flip: true, hat: 'chef', act: 'point' }), 's-from-r')}
          ${label(226, 248, '100 °C', 3, '#b91c1c', 20)}
          ${label(140, 224, '¡Vapor!', 4.2)}`;
        },
        // 1 · La evaporación: el sol calienta el charco, el agua sube como vapor y el charco se achica; arriba se forma una nube
        ({ at, person, hill, lin, cloud }) => {
          const wisp = '<path d="M0,0 q-7,-10 0,-20 q7,-10 0,-20" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round"/>';
          // se repinta el suelo (tapa el charco de la escena) y encima va un charco propio que se achica
          return `
          <defs>${lin('st-ga-ray', [[0, '#fff7c2', 0], [1, '#fde047', 0.55]])}</defs>
          ${hill(370, '#8fd486', 24)}<path d="M0,410 Q300,392 560,420 Q700,436 800,420 L800,500 L0,500Z" fill="#e7cf9f"/>
          ${at(0, 0, 1, '<path d="M660,150 L730,150 L650,436 L560,436Z" fill="url(#st-ga-ray)" class="a-glow"/>', 's-fade', delay(0.2))}
          ${at(600, 446, 1, '<ellipse cy="-16" rx="90" ry="16" fill="#60a5fa"/><ellipse cx="-16" cy="-20" rx="40" ry="5" fill="#bfdbfe"/>', 'st-shrink', `transform-origin:50% 50%;--sx:.22;--sy:.3;animation-duration:4.6s;${delay(0.8)}`)}
          ${[548, 580, 612, 644].map((x, i) => at(x, 424, 1.2, wisp, 'a-rise', `animation-duration:2.6s;${delay(0.9 + i * 0.5)}`)).join('')}
          ${[[540, 262], [566, 252], [592, 264], [556, 270], [580, 258]].map(([x, y], i) => at(x, y, 1, '<circle r="10" fill="#ffffff" stroke="#b9a7f5" stroke-width="2"/>', 'st-move', `--dx:${600 - x}px;--dy:${420 - y}px;--s0:.3;animation-duration:2s;${delay(1.2 + i * 0.5)}`)).join('')}
          ${at(0, 0, 1, cloud(560, 262, 1.05, 1, '', 0, '#ffffff'), 's-in', `animation-duration:1s;${delay(3.6)}`)}
          ${at(0, 0, 1, person({ ...kids.ana, x: 414, y: 426, s: 1.1, hat: 'straw', arm: 'up', act: 'raise' }), 's-from-l')}
          ${label(560, 222, '¡Se evapora!', 4.2)}`;
        },
        // 2 · Se esparce: de la tetera de Leo sale vapor que se va a todas partes hasta llenar el aire
        ({ at, person }) => {
          const kettle = '<path d="M-15,12 Q-16,-4 0,-4 Q16,-4 15,12" stroke="#3a3f5c" stroke-width="3.5" fill="none"/><path d="M16,22 Q30,18 34,6" stroke="#e76f51" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cy="24" rx="21" ry="15" fill="#e76f51"/><ellipse cy="11" rx="10" ry="3.5" fill="#c2553b"/><circle cy="7" r="3" fill="#3a3f5c"/><ellipse cx="-8" cy="20" rx="5" ry="7" fill="#fff" opacity=".35"/>';
          const puff = '<g fill="#ffffff" stroke="#b9a7f5" stroke-width="2"><circle r="11"/><circle cx="10" cy="-5" r="8"/></g>';
          const [sx, sy] = [304, 252]; // pico de la tetera
          const spots = [[340, 230], [372, 170], [404, 260], [430, 110], [446, 196], [480, 250], [500, 140], [526, 200], [380, 95], [536, 96], [470, 290], [410, 140], [330, 140], [530, 280], [356, 280], [488, 80], [276, 178], [210, 140], [296, 100]];
          return `
          ${at(0, 0, 1, '<path d="M150,330 Q238,270 330,330Z" fill="#a7e3a0"/>', 's-fade')}
          ${at(0, 0, 1, person({ ...kids.leo, x: 236, y: 304, s: 1.05, arm: 'out', act: 'none' }), 's-from-l')}
          ${at(270, 250, 1, kettle, 's-from-l')}
          ${at(sx, sy, 1, '<path d="M0,0 q-6,-8 0,-16 q6,-8 0,-16" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round"/>', 'a-rise', 'animation-duration:1.6s;animation-delay:1.2s')}
          ${spots.map(([x, y], i) => at(x, y, 1, at(0, 0, 1, puff, 'a-bob', delay(-i * 0.4)), 'st-move', `--dx:${sx - x}px;--dy:${sy - y}px;--s0:.2;animation-duration:2.2s;${delay(1 + i * 0.14)}`)).join('')}
          ${label(430, 300, '¡Se esparce!', 4.6)}`;
        },
      ],
    },
  };
  return S;
})();
