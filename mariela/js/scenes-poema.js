// Escenas del poema «Mártires» (estrofa1, estrofa2, estrofa3) — ver la cabecera de scenes.js (reglas, encuadre de las historias y piezas compartidas en SCN).
// Imágenes suaves: semillas, flores, palomas, luz y fiesta (nada de armas ni tumbas).
Object.assign(window.APP_SCENES, (() => {
  const { lin, rad, at, delay, sun, cloud, stars, birds, palm, sparkle, person } = KitSVG;
  const { label, gente, geranio, brote, libroAbierto, hoja, cordillera, garza } = SCN;

  // ---------- piezas propias del poema ----------
  // Paloma blanca de perfil, mirando a la derecha, con una ramita en el pico (centro del cuerpo en 0,0; ≈ 75 de ancho).
  const paloma = `<path d="M-20,2 L-34,-7 L-31,9Z" fill="#fff" stroke="#cbd5e1" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M-22,2 Q-8,-12 12,-6 Q22,-3 24,3 Q12,12 -6,9 Q-16,8 -22,2Z" fill="#fff" stroke="#cbd5e1" stroke-width="1.5"/>
    <circle cx="20" cy="-8" r="7" fill="#fff" stroke="#cbd5e1" stroke-width="1.5"/><path d="M26,-9 L34,-7 L26,-5Z" fill="#f59e0b"/><circle cx="22" cy="-10" r="1.4" fill="#1f2937"/>
    <path d="M32,-7 q6,-2 10,2" stroke="#16a34a" stroke-width="1.8" fill="none"/><ellipse cx="38" cy="-7" rx="3.2" ry="1.7" fill="#22c55e" transform="rotate(-20 38 -7)"/><ellipse cx="41" cy="-2" rx="3.2" ry="1.7" fill="#22c55e" transform="rotate(30 41 -2)"/>
    <g class="st-wing"><path d="M-6,-3 Q-18,-32 6,-38 Q2,-18 10,-4Z" fill="#fff" stroke="#cbd5e1" stroke-width="1.5" stroke-linejoin="round"/></g>`;
  const palomaIzq = `<g transform="scale(-1 1)">${paloma}</g>`;
  // Florecita de cinco pétalos (centro en 0,0; radio de pétalo r).
  const flor = (c = '#f472b6', r = 5) => `${[0, 72, 144, 216, 288].map((a) => `<ellipse cy="${-r}" rx="${(r * 0.62).toFixed(1)}" ry="${r}" fill="${c}" transform="rotate(${a})"/>`).join('')}<circle r="${(r * 0.55).toFixed(1)}" fill="#fde047"/>`;
  // Tallo con hojas (base en 0,0; alto ≈ 70) y planta completa con su flor arriba.
  const tallo = `<path d="M0,0 Q-4,-40 0,-70" stroke="#15803d" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M0,-24 Q-26,-36 -30,-14 Q-10,-10 0,-24Z" fill="#22c55e"/><path d="M0,-42 Q26,-56 30,-32 Q10,-28 0,-42Z" fill="#16a34a"/>`;
  const planta = (c = '#f43f5e') => `${tallo}<g transform="translate(0 -76)">${flor(c, 11)}</g>`;
  const semilla = '<ellipse rx="4.5" ry="3" fill="#6b3f1d" transform="rotate(-25)"/><ellipse cx="-1.2" cy="-1" rx="1.6" ry=".9" fill="#c08457" transform="rotate(-25)"/>';
  const corazon = (c = '#f43f5e') => `<path d="M0,7 C-14,-3 -9,-15 0,-8 C9,-15 14,-3 0,7Z" fill="${c}" stroke="#fff" stroke-width="1.5"/>`;
  const nota = (c = '#fde68a') => `<ellipse cx="-4" cy="4" rx="5.5" ry="4" fill="${c}" transform="rotate(-20 -4 4)"/><path d="M1,3 V-16 Q8,-12 10,-5" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  // Fuegos artificiales (petardo que revienta): rayos y chispitas alrededor de (0,0), radio r.
  const fuego = (c, r = 40, c2 = '#fff7c2') => `<g stroke="${c}" stroke-width="3.4" stroke-linecap="round">${[...Array(12)].map((_, i) => { const a = (i * Math.PI) / 6, x = Math.cos(a), y = Math.sin(a); return `<path d="M${(x * r * 0.3).toFixed(1)},${(y * r * 0.3).toFixed(1)} L${(x * r * 0.84).toFixed(1)},${(y * r * 0.84).toFixed(1)}"/>`; }).join('')}</g>
    ${[...Array(12)].map((_, i) => { const a = ((i + 0.5) * Math.PI) / 6; return `<circle cx="${(Math.cos(a) * r).toFixed(1)}" cy="${(Math.sin(a) * r).toFixed(1)}" r="${(r / 14).toFixed(1)}" fill="${c2}"/>`; }).join('')}<circle r="${(r * 0.16).toFixed(1)}" fill="${c2}"/>`;
  // El luchador de la estrofa 1: camisa blanca y la bandera de Colombia en alto.
  const luchador = { skin: '#8d5a3b', hair: '#1f140d', top: '#f8fafc', bottom: '#264653', shoe: '#2b2622', x: 660, y: 412, s: 1.1, flip: true, act: 'raise', arm: 'up', item: 'flag', flag: 'col' };

  // ---------- capas de fondo (se repintan en las historias para dejar el escenario limpio) ----------
  // Estrofa 1: amanecer en el Llano, con la cordillera atrás y un campo arado.
  const e1Base = (anim = true) => `
    <rect width="800" height="500" fill="url(#e1-sky)"/>
    <circle cx="590" cy="252" r="230" fill="url(#e1-dawn)"/>
    ${anim ? at(590, 250, 1, [...Array(12)].map((_, i) => `<path d="M-4,-58 L0,-92 L4,-58Z" fill="#fff3c4" opacity=".6" transform="rotate(${i * 30})"/>`).join(''), 'a-spin-slow') : ''}
    ${cordillera(258, '#b8a5d8', '#cbb9e6')}
    ${anim ? sun(590, 250, 40, '#fff4b8', '#ffe08a') : '<circle cx="590" cy="250" r="40" fill="#fff4b8"/>'}
    <path d="M0,258 Q200,250 400,256 T800,254 L800,340 L0,340Z" fill="#a8d67c"/><path d="M0,286 Q260,276 520,284 T800,282 L800,340 L0,340Z" fill="#94cb6c"/>
    <path d="M0,318 Q400,300 800,316 L800,500 L0,500Z" fill="url(#e1-soil)"/>
    ${[[352, 3], [386, 4], [424, 5], [468, 6]].map(([y, w]) => `<path d="M0,${y} Q400,${y - 14} 800,${y}" stroke="#7a4a26" stroke-width="${w}" fill="none" opacity=".5"/><path d="M0,${y - w} Q400,${y - 14 - w} 800,${y - w}" stroke="#d6a574" stroke-width="2" fill="none" opacity=".6"/>`).join('')}`;
  // Estrofa 2: el cielo de la noche de fiesta y el piso de la plaza.
  const e2Plaza = (x0, x1, y0 = 338, y1 = 500) => `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="url(#e2-floor)"/>
    <g stroke="#7c5a45" stroke-width="1.5" opacity=".5">${[364, 396, 434, 478].filter((y) => y > y0 && y < y1).map((y) => `<path d="M${x0},${y} H${x1}"/>`).join('')}</g>`;
  // Estrofa 3: la tierra del Llano y el camino que va hacia el sol.
  const e3Land = () => `<path d="M0,264 Q200,258 400,266 T800,262 L800,500 L0,500Z" fill="url(#e3-land)"/>
    <path d="M230,500 C330,420 520,330 618,270 L634,270 C620,320 560,400 610,500Z" fill="#ecd3a6"/><path d="M262,500 C350,430 528,336 620,272" stroke="#d9b98a" stroke-width="3" fill="none" opacity=".6"/>`;
  const e3Marcher = (o) => person(Object.assign({ act: 'walk', delay: 0 }, o));

  const S = {
    // =================== ESTROFA 1 · Cuando un luchador muere / se siembra con él semilla buena ===================
    estrofa1: {
      hs: [[660, 380], [400, 420], [230, 100]],
      svg: () => `<defs>${lin('e1-sky', [[0, '#8ccaf5'], [0.42, '#ffe0b0'], [0.55, '#ffbf87']])}${lin('e1-soil', [[0, '#c08a55'], [1, '#8a5a32']])}${rad('e1-dawn', [[0, '#fff3c4', 0.85], [1, '#ffd38a', 0]])}</defs>
        ${e1Base()}
        ${cloud(140, 72, 0.9)}${cloud(430, 46, 0.6, 0.9, 'a-drift2', -6)}${cloud(705, 112, 0.7, 0.85, 'a-drift', -3)}
        ${birds(150, 3, '#7a4a5a', 28, -10, 0.8)}
        ${palm(470, 270, 0.3)}${palm(505, 272, 0.24, -1)}${palm(735, 268, 0.3, -2)}${palm(40, 272, 0.28, -0.5)}
        ${[[352, 0.42], [386, 0.58], [424, 0.78], [468, 1]].map(([y, s], r) => {
          const step = 64 * s + 26;
          let g = '';
          for (let x = 24 + (r % 2) * 18; x < 790; x += step) {
            if (Math.abs(x - 400) < 46 && y > 400) continue;
            if (x < 330) g += at(x, y - 2, s, semilla);
            else if (x < 560) g += at(x, y, s, brote(), 'a-sway', delay(-((x + r) % 7) * 0.5));
            else g += at(x, y, s, `${brote()}<g transform="translate(0 -30)">${flor(['#f472b6', '#fb923c', '#facc15', '#f43f5e', '#c084fc'][(x + r) % 5], 6)}</g>`, 'a-sway', delay(-((x + r) % 7) * 0.5));
          }
          return g;
        }).join('')}
        ${at(400, 452, 1.1, planta('#f43f5e'), 'a-sway')}
        ${at(452, 420, 1, `<g fill="#fb923c"><ellipse cx="-5" cy="0" rx="6" ry="4" transform="rotate(-30 -5 0)"/><ellipse cx="5" cy="0" rx="6" ry="4" transform="rotate(30 5 0)"/></g><path d="M0,-4 V4" stroke="#3a2216" stroke-width="2"/>`, 'a-bob')}
        ${person({ ...gente[1], x: 105, y: 362, s: 0.7, act: 'sow', item: 'pouch' })}
        ${[0, 0.5, 1].map((d) => at(132, 330, 36 / 90, `<g transform="scale(2.5)">${semilla}</g>`, 'a-drip', `animation-duration:1.4s;${delay(-d)}`)).join('')}
        ${person({ ...gente[2], x: 250, y: 405, s: 0.85, act: 'sow', item: 'pouch' })}
        ${[0, 0.5, 1].map((d) => at(282, 364, 40 / 90, `<g transform="scale(2.25)">${semilla}</g>`, 'a-drip', `animation-duration:1.4s;${delay(-d)}`)).join('')}
        <ellipse cx="660" cy="414" rx="56" ry="11" fill="#7fbf5f"/>${[640, 660, 684].map((x) => `<path d="M${x},414 l-4,-9 m4,9 l0,-11 m0,11 l4,-9" stroke="#3f8a3a" stroke-width="2" fill="none"/>`).join('')}
        ${person(luchador)}
        ${at(230, 100, 1, paloma, 'a-bob')}
        ${at(0, 52, 0.55, paloma, 'a-fly', 'animation-duration:30s;animation-delay:-12s')}`,
      story: [
        // 0 · Un luchador: la gente llega corriendo a su lado y celebra; él sigue con la bandera en alto. ¡Valiente!
        ({ at, person, sparkle }) => `
          ${[[1, 432, 0.3], [4, 494, 0.9], [3, 556, 1.5]].map(([g, x, d]) => at(0, 0, 1, person({ ...gente[g], x, y: 408, s: 0.95, act: 'cheer' }), 's-from-l', delay(d))).join('')}
          ${[[466, 2.2], [526, 2.8], [496, 3.4]].map(([x, d]) => at(x, 300, 0.6, `<g transform="scale(1.7)">${corazon()}</g>`, 'a-rise', `animation-duration:2.6s;${delay(d)}`)).join('')}
          ${[[704, 300, 1.2], [612, 214, 1.6], [714, 236, 2]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff7c2', 1.5), 's-in', delay(d))).join('')}
          ${label(560, 210, '¡Valiente!', 1.4, '#9a3412', 26)}
          ${label(448, 252, 'Lucha por su gente', 3, '#14532d', 18)}`,
        // 1 · Semilla buena: una sembradora deja caer una semilla; brota, crece, florece… ¡y nacen más flores alrededor!
        ({ at, person, sparkle }) => `
          ${at(0, 0, 1, e1Base(false), 's-fade')}
          ${person({ ...gente[3], x: 252, y: 444, s: 1.3, arm: 'out', item: 'pouch', act: 'idle' })}
          ${at(336, 448, 1.8, semilla, 'st-move', `--dx:-40px;--dy:-70px;animation-duration:.9s;animation-timing-function:ease-in;${delay(0.6)}`)}
          ${at(336, 452, 1.6, at(0, 0, 1, brote(), 's-out', delay(2.3)), 's-grow', delay(1.4))}
          ${at(336, 454, 1.25, tallo, 's-grow', `animation-duration:1.2s;${delay(2.2)}`)}
          ${at(336, 359, 1.4, flor('#f43f5e', 11), 's-in', delay(3))}
          ${[[400, 452, '#facc15', 3.4], [452, 444, '#c084fc', 3.7], [504, 452, '#fb923c', 4], [556, 444, '#f472b6', 4.3], [584, 404, '#facc15', 4.6], [430, 404, '#f472b6', 4.5]].map(([x, y, c, d]) => at(x, y, 0.95, `${brote()}<g transform="translate(0 -32)">${flor(c, 8)}</g>`, 's-grow', delay(d))).join('')}
          ${[[372, 332, 3.3], [480, 376, 4.4], [566, 366, 4.9]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff7c2', 1.5), 's-in', delay(d))).join('')}
          ${label(440, 252, '¡Semilla buena!', 2.4, '#14532d', 26)}
          ${label(460, 290, 'nacen cosas buenas', 4.2, '#9a3412', 18)}`,
        // 2 · Los mártires: crece un árbol que florece, de él salen palomas y la gente le lleva flores: su ejemplo sigue vivo.
        ({ at, person, tree }) => `
          ${at(0, 0, 1, e1Base(false), 's-fade')}
          ${at(0, 0, 1, tree(320, 296, 1.55), 's-grow', `animation-duration:1.4s;${delay(0.3)}`)}
          ${[[288, 162, '#f472b6'], [348, 150, '#facc15'], [320, 204, '#fb7185'], [272, 214, '#c084fc'], [368, 210, '#fb923c'], [318, 128, '#f43f5e']].map(([x, y, c], i) => at(x, y, 1, geranio(c, '#fff1f2'), 's-in', delay(1.5 + i * 0.22))).join('')}
          ${[[168, 128, -150, 60, palomaIzq], [470, 112, 150, 70, paloma], [430, 170, 110, 10, paloma]].map(([x, y, dx, dy, p], i) => at(x, y, 0.8, p, 'st-move', `--dx:${-dx / 0.8}px;--dy:${dy / 0.8}px;--s0:.3;animation-duration:1.6s;${delay(2.6 + i * 0.4)}`)).join('')}
          ${[[154, 4, false], [208, 1, false], [432, 0, true], [486, 5, true]].map(([x, g, flip], i) => at(0, 0, 1, person({ ...gente[g], x, y: 292, s: 0.72, arm: 'out', item: 'flower', itemColor: ['#f472b6', '#facc15', '#fb923c', '#c084fc'][i], flip, act: 'idle' }), 's-up', delay(2.2 + i * 0.25))).join('')}
          ${label(320, 82, 'Su ejemplo sigue vivo', 3.8, '#9a3412', 21)}`,
      ],
    },

    // =================== ESTROFA 2 · No les fue fácil / dormirse en la vigilia / cuando aún / reventaban los geranios… ===================
    estrofa2: {
      hs: [[160, 268], [402, 186], [564, 432], [650, 85]],
      svg: () => {
        const wall = 'url(#e2-wall)';
        // farolitos de colores colgados entre las casas
        const bulbs = [...Array(13)].map((_, i) => {
          const t = (i + 0.5) / 13, x = (1 - t) ** 2 * 240 + 2 * (1 - t) * t * 405 + t * t * 570, y = (1 - t) ** 2 * 252 + 2 * (1 - t) * t * 312 + t * t * 256;
          return `<circle cx="${x.toFixed(0)}" cy="${(y + 5).toFixed(0)}" r="5" fill="${['#fde047', '#f472b6', '#67e8f9', '#86efac'][i % 4]}" class="a-twinkle" style="${delay(-(i % 4) * 0.6)}"/>`;
        }).join('');
        return `<defs>${lin('e2-sky', [[0, '#1e1b4b'], [0.22, '#3b1f6e'], [0.34, '#7c3a8a']])}${lin('e2-wall', [[0, '#b9a6d3'], [1, '#efd9bd']])}${lin('e2-lit', [[0, '#fff3c4'], [1, '#f59e0b']])}${lin('e2-floor', [[0, '#b69273'], [1, '#8d6e5a']])}${rad('e2-glow', [[0, '#fde68a', 0.8], [1, '#fde68a', 0]])}
          <mask id="e2-moon"><circle r="24" fill="#fff"/><circle cx="10" cy="-7" r="20" fill="#000"/></mask></defs>
        <rect width="800" height="500" fill="url(#e2-sky)"/>
        ${stars(46, 150)}
        ${at(80, 56, 1, '<circle r="24" fill="#fef9c3" mask="url(#e2-moon)"/>')}
        ${at(650, 85, 1, fuego('#fde047', 40), 'st-burst')}${at(478, 66, 1, fuego('#f472b6', 28, '#fff'), 'st-burst', delay(-1.1))}${at(330, 104, 1, fuego('#67e8f9', 22, '#fff'), 'st-burst', delay(-2))}
        <path d="M0,150 L250,150 L250,340 L0,340Z" fill="${wall}"/><path d="M-6,152 L125,118 L256,152Z" fill="#7f1d1d"/><path d="M-6,152 L256,152 L256,160 L-6,160Z" fill="#991b1b"/>
        <rect x="70" y="165" width="110" height="92" fill="url(#e2-lit)"/>
        ${person({ ...gente[5], x: 118, y: 282, s: 0.85, act: 'look' })}
        <rect x="0" y="257" width="250" height="83" fill="${wall}"/><rect x="70" y="165" width="110" height="92" fill="none" stroke="#6b4423" stroke-width="5"/>
        <rect x="50" y="165" width="20" height="92" fill="#0f766e"/><rect x="180" y="165" width="20" height="92" fill="#0f766e"/><rect x="62" y="255" width="126" height="9" rx="2" fill="#a16207"/>
        <circle cx="160" cy="230" r="34" fill="url(#e2-glow)" class="a-glow"/><rect x="155" y="234" width="10" height="21" rx="2" fill="#fef9c3" stroke="#e7c37a"/>${at(160, 234, 1, '<path d="M-4,0 Q-5,-8 0,-14 Q5,-8 4,0Z" fill="#fbbf24"/><path d="M-2,0 Q-2,-5 0,-8 Q2,-5 2,0Z" fill="#fff7c2"/>', 'a-flicker')}
        <path d="M150,340 L150,286 Q180,268 210,286 L210,340Z" fill="#6b4423"/><rect x="28" y="282" width="56" height="40" fill="#5b4a7a"/><rect x="24" y="320" width="64" height="7" rx="2" fill="#a16207"/>${at(56, 320, 0.6, SCN.maceta('#f43f5e'))}
        <path d="M250,128 L560,128 L560,340 L250,340Z" fill="${wall}"/><path d="M244,130 L405,100 L566,130Z" fill="#7f1d1d"/><path d="M244,130 L566,130 L566,138 L244,138Z" fill="#991b1b"/>
        ${[300, 420].map((x) => `<rect x="${x}" y="150" width="50" height="95" fill="url(#e2-lit)"/><rect x="${x}" y="150" width="50" height="95" fill="none" stroke="#6b4423" stroke-width="4"/><path d="M${x + 25},150 V245" stroke="#6b4423" stroke-width="2"/>`).join('')}
        <rect x="266" y="245" width="278" height="10" fill="#78350f"/>
        ${[...Array(15)].map((_, i) => `<rect x="${270 + i * 19}" y="212" width="4" height="33" fill="#92400e"/>`).join('')}<rect x="266" y="208" width="278" height="6" rx="2" fill="#92400e"/>
        ${[290, 335, 380, 425, 470, 515].map((x, i) => at(x, 208, 0.8, SCN.maceta(['#e11d48', '#f472b6', '#fb7185', '#e11d48', '#f43f5e', '#f472b6'][i], '#fff1f2'))).join('')}
        ${[280, 380, 480].map((x) => `<path d="M${x},340 L${x},288 Q${x + 25},268 ${x + 50},288 L${x + 50},340Z" fill="#4b3a6a"/>`).join('')}
        <path d="M560,168 L800,168 L800,340 L560,340Z" fill="${wall}"/><path d="M554,170 L680,146 L806,170Z" fill="#7f1d1d"/><path d="M554,170 L806,170 L806,178 L554,178Z" fill="#991b1b"/>
        ${[610, 700].map((x) => `<rect x="${x}" y="190" width="44" height="64" fill="url(#e2-lit)"/><rect x="${x}" y="190" width="44" height="64" fill="none" stroke="#6b4423" stroke-width="4"/><rect x="${x - 6}" y="254" width="56" height="7" rx="2" fill="#a16207"/>${at(x + 22, 254, 0.6, SCN.maceta('#fb7185', '#fff1f2'))}`).join('')}
        <path d="M640,340 L640,290 Q665,272 690,290 L690,340Z" fill="#6b4423"/>
        <path d="M240,252 Q405,372 570,256" stroke="#3f2a1d" stroke-width="1.5" fill="none"/>${bulbs}
        ${e2Plaza(0, 800)}
        ${person({ ...gente[4], x: 330, y: 452, s: 0.95, act: 'cheer' })}
        ${person({ ...gente[2], x: 420, y: 470, s: 0.75, act: 'cheer', hat: null })}
        ${person({ ...gente[1], x: 540, y: 458, s: 1, arm: 'out', act: 'idle' })}${person({ ...gente[0], x: 590, y: 458, s: 1, arm: 'out', flip: true, act: 'idle' })}
        ${at(565, 360, 0.6, `<g transform="scale(1.6)">${corazon()}</g>`, 'a-rise', 'animation-duration:3s')}
        ${person({ ...gente[3], x: 718, y: 462, s: 1, act: 'cheer', flip: true })}
        ${person({ ...gente[0], skin: '#c68a5e', top: '#f59e0b', x: 110, y: 456, s: 0.95, act: 'wave' })}`;
      },
      story: [
        // 0 · Vigilia: de noche, la abuela sigue despierta junto a la vela; afuera suena la fiesta. ¡No les fue fácil dormirse!
        ({ at, person, sparkle }) => `
          ${at(0, 0, 1, `<rect x="60" y="110" width="300" height="290" fill="url(#e2-wall)"/><rect x="360" y="110" width="160" height="290" fill="url(#e2-sky)"/>${stars(14, 300, 370, 510)}
            <path d="M360,110 V400" stroke="#8b7aa8" stroke-width="3"/><g transform="translate(440 172)"><circle r="24" fill="#fef9c3" mask="url(#e2-moon)"/></g>`, 's-fade', 'animation-duration:.5s')}
          <rect x="110" y="160" width="220" height="170" fill="url(#e2-lit)"/>
          ${person({ ...gente[5], x: 200, y: 366, s: 1.35, act: 'look' })}
          ${at(0, 0, 1, '<rect x="60" y="330" width="300" height="70" fill="url(#e2-wall)"/><rect x="110" y="160" width="220" height="170" fill="none" stroke="#6b4423" stroke-width="7"/><rect x="84" y="160" width="26" height="170" fill="#0f766e"/><rect x="330" y="160" width="26" height="170" fill="#0f766e"/><rect x="100" y="326" width="240" height="12" rx="3" fill="#a16207"/>')}
          <circle cx="292" cy="284" r="46" fill="url(#e2-glow)" class="a-glow"/><rect x="285" y="292" width="14" height="34" rx="3" fill="#fef9c3" stroke="#e7c37a" stroke-width="1.5"/>
          ${at(292, 292, 1.5, '<path d="M-4,0 Q-5,-8 0,-14 Q5,-8 4,0Z" fill="#fbbf24"/><path d="M-2,0 Q-2,-5 0,-8 Q2,-5 2,0Z" fill="#fff7c2"/>', 'a-flicker')}
          ${at(146, 326, 0.9, SCN.maceta('#e11d48', '#fff1f2'))}
          ${at(452, 250, 1, fuego('#f472b6', 26, '#fff'), 's-in', delay(1.6))}${at(404, 300, 1, fuego('#fde047', 18), 's-in', delay(2.4))}
          ${[[420, 372, 1.2], [462, 380, 1.9], [440, 376, 2.6]].map(([x, y, d]) => at(x, y, 1.2, nota('#fde68a'), 'a-rise', `animation-duration:2.4s;${delay(d)}`)).join('')}
          ${label(438, 224, 'En vigilia', 0.9, '#4c1d95', 19)}
          ${label(282, 374, '¡No les fue fácil!', 3, '#9f1239', 22)}`,
        // 1 · Reventaban los geranios: en el balcón, los botones se abren uno tras otro, ¡pop, pop!, y la vecina los señala
        ({ at, person, sparkle }) => {
          const pots = [230, 280, 330, 470, 520, 570];
          const pot = '<path d="M-16,-18 L16,-18 L12,0 L-12,0Z" fill="#c2410c"/><rect x="-18" y="-22" width="36" height="6" rx="2" fill="#ea580c"/><g fill="#3f9a4a"><ellipse cx="-14" cy="-28" rx="10" ry="6" transform="rotate(-20 -14 -28)"/><ellipse cx="14" cy="-28" rx="10" ry="6" transform="rotate(20 14 -28)"/><ellipse cx="0" cy="-32" rx="9" ry="6"/></g>';
          const buds = '<g fill="#65a30d" stroke="#3f6212" stroke-width="1">' + [[-8, -2], [6, -5], [0, -12], [-2, 6], [9, 4]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="4.5"/><path d="M${x},${y - 4.5} v-1" stroke="#e11d48" stroke-width="2"/>`).join('') + '</g>';
          return `
          ${at(0, 0, 1, '<rect x="180" y="80" width="440" height="280" fill="url(#e2-wall)"/>', 's-fade', 'animation-duration:.5s')}
          <rect x="345" y="104" width="110" height="196" fill="url(#e2-lit)"/><rect x="345" y="104" width="110" height="196" fill="none" stroke="#6b4423" stroke-width="6"/>
          ${person({ ...gente[3], x: 398, y: 300, s: 1.15, act: 'point' })}
          <rect x="196" y="300" width="408" height="14" fill="#78350f"/>
          ${[...Array(21)].map((_, i) => `<rect x="${203 + i * 19.4}" y="252" width="5" height="48" fill="#92400e"/>`).join('')}<rect x="196" y="244" width="408" height="9" rx="3" fill="#92400e"/>
          ${pots.map((x, i) => at(x, 244, 1, `${pot}<g transform="translate(0 -42) scale(1.3)">${at(0, 0, 1, buds, 's-out', delay(0.9 + i * 0.5))}${at(0, 0, 1, geranio(['#e11d48', '#f472b6', '#fb7185', '#e11d48', '#f43f5e', '#f472b6'][i], '#fff1f2'), 's-in', delay(0.9 + i * 0.5))}</g>`)).join('')}
          ${pots.map((x, i) => at(x, 188, 1, sparkle(0, 0, 0, '#fff7c2', 1.8), 's-flash', delay(1 + i * 0.5))).join('')}
          ${label(400, 132, '¡Reventaban los geranios!', 3.9, '#9f1239', 22)}`;
        },
        // 2 · Brazos y palmas: dos amigos llegan corriendo y se abrazan (sus brazos se cruzan); alrededor todos aplauden y saltan de alegría
        ({ at, person, sparkle }) => `
          ${at(0, 0, 1, e2Plaza(250, 700, 336, 470), 's-fade', 'animation-duration:.5s')}
          ${at(0, 0, 1, person({ ...gente[1], x: 455, y: 450, s: 1.25, arm: 'out', act: 'idle' }), 's-from-l', 'animation-duration:1.2s')}
          ${at(0, 0, 1, person({ ...gente[0], x: 505, y: 450, s: 1.25, arm: 'out', flip: true, act: 'idle' }), 's-from-r', 'animation-duration:1.2s')}
          ${[[456, 1.4], [504, 1.9], [480, 2.5]].map(([x, d]) => at(x, 320, 0.6, `<g transform="scale(1.9)">${corazon()}</g>`, 'a-rise', `animation-duration:2.2s;${delay(d)}`)).join('')}
          ${at(0, 0, 1, person({ ...gente[4], x: 322, y: 450, s: 1.05, act: 'cheer' }), 's-up', delay(2))}
          ${at(0, 0, 1, person({ ...gente[3], x: 640, y: 450, s: 1.05, act: 'cheer', flip: true }), 's-up', delay(2.4))}
          ${[[296, 346, 2.4], [348, 346, 2.6], [614, 346, 2.8], [666, 346, 3]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fde047', 1.6), 's-in', delay(d))).join('')}
          ${label(480, 244, '¡Brazos y palmas!', 3.2, '#9f1239', 24)}`,
        // 3 · Petardos: suben tres cohetes y revientan en el cielo: ¡pum, pum, pum! ¡Es fiesta!
        ({ at, stars }) => {
          const cohete = (path, x, y, c, r, d) => `
            ${at(0, 0, 1, `<path d="${path}" pathLength="1" stroke="#fff7c2" stroke-width="3" fill="none" stroke-linecap="round" class="s-draw" style="animation-duration:.7s;${delay(d)}"/>`, 's-out', delay(d + 0.9))}
            ${at(x, y, 1, fuego(c, r), 'st-boom', delay(d + 0.7))}
            ${[0, 1, 2, 3].map((k) => at(x - r * 0.5 + k * r * 0.33, y + r * 0.5, 1, `<circle r="2.4" fill="${c}"/>`, 'a-fall', `animation-duration:1.6s;${delay(d + 1 + k * 0.2)}`)).join('')}
            ${label(x, y + 8, '¡Pum!', d + 0.9, '#7c2d12', 22)}`;
          return `
          <defs><linearGradient id="st-e2-sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="500"><stop offset="0" stop-color="#1e1b4b"/><stop offset=".22" stop-color="#3b1f6e"/><stop offset=".34" stop-color="#7c3a8a"/></linearGradient></defs>
          ${at(0, 0, 1, `<path d="M296,24 L744,24 L744,158 L680,146 L566,168 L566,130 L405,100 L296,121Z" fill="url(#st-e2-sky)"/>${stars(16, 96, 310, 730)}`, 's-fade', 'animation-duration:.4s')}
          ${cohete('M432,176 Q440,140 455,102', 455, 100, '#fde047', 44, 0.2)}
          ${cohete('M642,178 Q632,140 625,108', 625, 106, '#f472b6', 40, 1.3)}
          ${cohete('M372,160 Q366,140 362,124', 362, 122, '#67e8f9', 28, 2.4)}
          ${label(520, 282, '¡Fiesta!', 3.8, '#4c1d95', 28)}`;
        },
      ],
    },

    // =================== ESTROFA 3 · No les era fácil / marchar… ===================
    estrofa3: {
      hs: [[410, 436], [696, 398], [150, 422]],
      svg: () => `<defs>${lin('e3-sky', [[0, '#f9c5dd'], [0.35, '#fed7aa'], [0.53, '#fde68a']])}${lin('e3-land', [[0, '#c4e59e'], [1, '#7fbe62']])}</defs>
        <rect width="800" height="500" fill="url(#e3-sky)"/>
        ${at(640, 262, 1, [...Array(14)].map((_, i) => `<path d="M-4,-66 L0,-104 L4,-66Z" fill="#fff7c2" opacity=".6" transform="rotate(${i * (360 / 14)})"/>`).join(''), 'a-spin-slow')}
        ${cloud(150, 80, 0.85, 0.95, 'a-drift', 0, '#fff1f2')}${cloud(420, 54, 0.6, 0.9, 'a-drift2', -5, '#fff1f2')}
        ${birds(110, 3, '#7a3a5a', 26, -6, 0.9)}
        ${cordillera(266, '#d6b3d6', '#e7c6e2')}
        ${sun(640, 262, 50, '#fff7c2', '#fde68a')}
        ${e3Land()}
        ${palm(70, 284, 0.36)}${palm(112, 282, 0.28, -1)}${palm(726, 280, 0.32, -2)}${palm(768, 284, 0.26, -0.6)}
        <ellipse cx="262" cy="322" rx="62" ry="12" fill="#7dd3fc"/><ellipse cx="248" cy="319" rx="26" ry="3.5" fill="#e0f2fe"/>${at(236, 330, 0.85, garza)}${at(284, 328, 0.75, garza)}
        ${[[200, 470], [180, 380], [640, 470], [700, 470], [760, 455], [250, 330], [600, 395]].map(([x, y], i) => at(x, y, 0.8, `<path d="M0,0 l-5,-11 m5,11 l0,-14 m0,14 l5,-11" stroke="#3f8a3a" stroke-width="2.2" fill="none"/><g transform="translate(${i % 2 ? 6 : -6} -14)">${flor(['#f472b6', '#facc15', '#fb923c'][i % 3], 4)}</g>`)).join('')}
        ${e3Marcher({ ...gente[3], x: 610, y: 315, s: 0.4 })}${e3Marcher({ ...gente[2], x: 595, y: 340, s: 0.5 })}
        ${e3Marcher({ ...gente[5], x: 570, y: 375, s: 0.65, item: 'flag', flag: 'col' })}${e3Marcher({ ...gente[4], x: 535, y: 410, s: 0.8 })}
        ${e3Marcher({ ...gente[1], x: 485, y: 448, s: 0.95, item: 'flag', flag: '#ffffff' })}${e3Marcher({ ...gente[0], x: 410, y: 462, s: 1 })}
        ${e3Marcher({ ...gente[3], skin: '#e3a97c', hairStyle: 'long', x: 330, y: 472, s: 1.05, item: 'flag', flag: 'col' })}
        <rect x="692" y="300" width="7" height="132" rx="2" fill="#7a4f28"/>
        <path d="M650,306 L734,306 L748,320 L734,334 L650,334Z" fill="#e11d48" stroke="#9f1239" stroke-width="2"/><text x="694" y="327" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="19" fill="#fff">fue · 2</text>
        <path d="M650,344 L734,344 L748,358 L734,372 L650,372Z" fill="#f59e0b" stroke="#b45309" stroke-width="2"/><text x="694" y="365" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="19" fill="#fff">era · 3</text>
        <path d="M118,470 L122,442 L178,442 L182,470Z" fill="#8b5a2b"/><ellipse cx="150" cy="442" rx="28" ry="7" fill="#c08457"/><ellipse cx="150" cy="442" rx="16" ry="3.5" fill="none" stroke="#8b5a2b" stroke-width="1.5"/>
        ${at(150, 440, 1, libroAbierto(30, '#d97706'))}
        ${person({ ...SCN.sofia, x: 68, y: 474, s: 0.9, act: 'point' })}`,
      story: [
        // 0 · Marchar: un grupo entra caminando por el camino, todos al mismo paso (las piernas van iguales), con sus banderas
        ({ at, person }) => `
          ${at(0, 0, 1, e3Land(), 's-fade', 'animation-duration:.5s')}
          ${at(0, 0, 1, [[262, 3, { item: 'flag', flag: 'col' }], [352, 0, {}], [442, 1, { item: 'flag', flag: '#ffffff' }], [532, 4, {}]].map(([x, g, o]) => e3Marcher({ ...gente[g], ...o, x, y: 445, s: 1.05 })).join(''), 'st-move', '--dx:-240px;animation-duration:4s;animation-timing-function:ease-out')}
          ${label(405, 252, '¡Marchar!', 1.2, '#9a3412', 28)}
          ${label(405, 286, 'todos al mismo paso', 3, '#14532d', 18)}`,
        // 1 · ¿Fue o era?: llegan dos tarjetas; la estrofa 2 dice FUE y la estrofa 3 dice ERA (¡sello!)
        ({ at, sparkle }) => {
          const Y = 206; // borde de arriba de las tarjetas
          const card = (x, c, n) => `<rect x="${x}" y="${Y}" width="175" height="150" rx="14" fill="#fffdf6" stroke="${c}" stroke-width="3"/><path d="M${x},${Y + 14} Q${x},${Y} ${x + 14},${Y} L${x + 161},${Y} Q${x + 175},${Y} ${x + 175},${Y + 14} L${x + 175},${Y + 34} L${x},${Y + 34}Z" fill="${c}"/>
            <text x="${x + 87}" y="${Y + 24}" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="18" fill="#fff">Estrofa ${n}</text>
            <g font-family="Fredoka, sans-serif" font-weight="600" font-size="19" fill="#3a2216" text-anchor="middle"><text x="${x + 87}" y="${Y + 64}">No les</text><text x="${x + 87}" y="${Y + 138}">fácil</text></g>`;
          const word = (x, c, w, d) => at(x + 87, Y + 106, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="40" fill="${c}" stroke="#fff" stroke-width="4" paint-order="stroke">${w}</text>`, 's-stamp', delay(d));
          return `
          ${at(0, 0, 1, card(345, '#e11d48', 2), 's-from-l', delay(0.2))}
          ${at(0, 0, 1, card(560, '#d97706', 3), 's-from-r', delay(0.9))}
          ${word(345, '#e11d48', 'FUE', 1.8)}${word(560, '#d97706', 'ERA', 2.6)}
          ${[[482, 284, 2], [698, 284, 2.8]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fbbf24', 1.6), 's-in', delay(d))).join('')}
          ${label(540, 408, '¡No los confundas!', 3.6, '#7c2d12', 24)}`;
        },
        // 2 · Versos y estrofas: en la hoja del cuaderno aparecen los versos de la estrofa 2 uno por uno; una llave los junta: ¡una estrofa!
        ({ at }) => {
          const versos = ['No les fue fácil', 'dormirse en la vigilia', 'cuando aún', 'reventaban los geranios', 'y el amor batía brazos', 'y palmas', 'y petardos.'];
          return `
          ${at(88, 214, 1, `<rect x="4" y="5" width="250" height="236" rx="4" fill="#000" opacity=".12"/>${hoja(250, 236)}`, 's-in', delay(0.1))}
          ${at(213, 242, 1, '<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="19" fill="#c2410c">Mártires</text>', 's-fade', delay(0.4))}
          ${at(0, 0, 1, '<rect x="134" y="250" width="134" height="22" rx="6" fill="#fde68a"/>', 's-fade', delay(3))}
          ${versos.map((v, i) => at(140, 266 + i * 25, 1, `<text font-family="Fredoka, sans-serif" font-weight="500" font-size="16" fill="#3a2216">${v}</text>`, 's-fade', delay(0.7 + i * 0.32))).join('')}
          ${label(304, 267, '← verso', 3.2, '#c2410c', 16)}
          <path d="M346,250 Q362,250 362,276 L362,318 Q362,336 376,336 Q362,336 362,354 L362,396 Q362,424 346,424" pathLength="1" stroke="#e11d48" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" class="s-draw" style="animation-duration:.9s;${delay(3.8)}"/>
          ${label(428, 330, 'estrofa', 4.5, '#9f1239', 24)}
          ${label(428, 354, '7 versos', 4.9, '#7c2d12', 16)}`;
        },
      ],
    },
  };
  return S;
})());
