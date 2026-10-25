// Escenas de la biografía (Importante, Sus obras, Mi opinión) — ver la cabecera de scenes.js (reglas, encuadre de las historias y piezas compartidas en SCN).
Object.assign(window.APP_SCENES, (() => {
  const { lin, rad, at, delay, sun, cloud, birds, hill, grass, sparkle, person } = KitSVG;
  const { label, mariela, sofia, gente, geranio, maceta, libro, libroAbierto, hoja } = SCN;

  // ---------- piezas propias ----------
  const corazon = (c = '#ec4899') => `<path d="M0,7 C-14,-3 -9,-15 0,-8 C9,-15 14,-3 0,7Z" fill="${c}"/>`;
  const estrella = (c = '#facc15', r = 9) => `<path d="M${[...Array(10)].map((_, i) => { const a = (Math.PI / 5) * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; return `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`; }).join(' L')}Z" fill="${c}"/>`;
  // Sol con rayos y carita (centro en 0,0).
  const solcito = (r = 16) => `${at(0, 0, 1, [...Array(10)].map((_, i) => `<path d="M-3,${-r - 4} L0,${-r - 13} L3,${-r - 4}Z" fill="#f59e0b" transform="rotate(${i * 36})"/>`).join(''), 'a-spin')}<circle r="${r}" fill="#facc15"/>
    <circle cx="${-r * 0.35}" cy="${-r * 0.15}" r="${r * 0.11}" fill="#7c2d12"/><circle cx="${r * 0.35}" cy="${-r * 0.15}" r="${r * 0.11}" fill="#7c2d12"/><path d="M${-r * 0.4},${r * 0.25} Q0,${r * 0.6} ${r * 0.4},${r * 0.25}" stroke="#7c2d12" stroke-width="${r * 0.1}" fill="none" stroke-linecap="round"/>`;
  const luna = `<path d="M4,-18 A18,18 0 1,0 4,18 A13,13 0 1,1 4,-18Z" fill="#fde68a" stroke="#f59e0b" stroke-width="1.5"/>${at(16, -12, 1, estrella('#fef3c7', 5))}`;
  const pez = `<path d="M-14,0 Q0,-12 14,0 Q0,10 -14,0Z" fill="#38bdf8"/><path d="M14,0 L23,-8 L23,8Z" fill="#0ea5e9"/><circle cx="-7" cy="-2" r="1.8" fill="#111"/>`;
  const barco = `<path d="M-22,-6 L22,-6 L13,7 L-13,7Z" fill="#fef3c7" stroke="#d97706" stroke-width="2" stroke-linejoin="round"/><path d="M-11,-6 L0,-27 L11,-6Z" fill="#fde68a" stroke="#d97706" stroke-width="2" stroke-linejoin="round"/>`;
  const pajaro = `${at(0, 0, 1, '<path d="M-14,-2 Q-7,-14 0,-2 Q7,-14 14,-2" stroke="#7c3aed" stroke-width="3.5" fill="none" stroke-linecap="round"/>', 'a-flap')}<circle r="4" fill="#7c3aed"/>`;
  // Lápiz con la punta en (0,0) hacia abajo, como en una mano derecha que escribe.
  const lapiz = `<g transform="rotate(35)"><rect x="-3" y="-30" width="6" height="22" rx="1" fill="#facc15"/><rect x="-3" y="-34" width="6" height="5" rx="1.5" fill="#f472b6"/><path d="M-3,-8 L0,0 L3,-8Z" fill="#f6d1a3"/><path d="M-1.2,-3 L0,0 L1.2,-3Z" fill="#3a2216"/></g>`;
  // Nota musical (corchea) con la cabeza en (0,0).
  const nota = (c = '#7c3aed') => `<ellipse cx="-1" cy="0" rx="6.5" ry="5" fill="${c}" transform="rotate(-20 -1 0)"/><path d="M4.5,-1 V-26 Q12,-22 15,-14" stroke="${c}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
  // Grillo de pie (el de «Las cantas de Grillo»), patas en (0,0), ≈ 125 de alto; mira un poco a la derecha.
  // canta: abre la boca y levanta los brazos. También lo usa scenes-datos2.js («Obras importantes»), por eso va en SCN.
  const grillo = (canta = false) => `
    <path d="M-12,-26 L-30,-54 L-20,-2 M12,-26 L30,-54 L22,-2" stroke="#3f6212" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M-7,-14 L-9,0 M7,-14 L9,0" stroke="#3f6212" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="0" cy="-38" rx="17" ry="26" fill="#65a30d"/><ellipse cx="2" cy="-36" rx="9" ry="17" fill="#bef264"/>
    ${canta ? '<path d="M-12,-52 Q-26,-60 -30,-74 M12,-52 Q26,-60 30,-74" stroke="#3f6212" stroke-width="4" fill="none" stroke-linecap="round"/>'
    : '<path d="M-12,-52 Q-24,-44 -24,-34 M12,-52 Q24,-44 24,-34" stroke="#3f6212" stroke-width="4" fill="none" stroke-linecap="round"/>'}
    ${at(0, -88, 1, '<path d="M-5,0 Q-12,-26 -30,-34 M5,0 Q10,-28 30,-38" stroke="#3f6212" stroke-width="2.4" fill="none" stroke-linecap="round"/>', 'a-sway')}
    <circle cx="0" cy="-74" r="17" fill="#65a30d"/>
    <circle cx="-6" cy="-77" r="6.5" fill="#fff"/><circle cx="7" cy="-77" r="6.5" fill="#fff"/><circle cx="-4.5" cy="-77" r="3.4" fill="#1a1a1a"/><circle cx="8.5" cy="-77" r="3.4" fill="#1a1a1a"/><circle cx="-3.5" cy="-78.5" r="1.1" fill="#fff"/><circle cx="9.5" cy="-78.5" r="1.1" fill="#fff"/>
    <circle cx="-11" cy="-68" r="3" fill="#fb7185" opacity=".45"/><circle cx="12" cy="-68" r="3" fill="#fb7185" opacity=".45"/>
    ${canta ? '<ellipse cx="1" cy="-64" rx="4.5" ry="5.5" fill="#1a2e05"/><ellipse cx="1" cy="-61.5" rx="2.6" ry="2" fill="#fb7185"/>' : '<path d="M-4,-66 Q1,-62 6,-66" stroke="#1a2e05" stroke-width="1.8" fill="none" stroke-linecap="round"/>'}`;
  SCN.grillo = grillo;
  // Niños de las escenas (además de Sofía).
  const ninos = [
    { skin: '#f1c7a5', hair: '#9a6a3a', top: '#ef476f', bottom: '#264653', shoe: '#5b3a29' },
    { skin: '#8d5a3b', hair: '#1f140d', hairStyle: 'pigtails', dress: true, top: '#22c55e', shoe: '#2b2622' },
    { skin: '#c68a5e', hair: '#2b1b12', hairStyle: 'curly', top: '#ffb703', bottom: '#3a3f5c', shoe: '#3b2a20' },
    { skin: '#a96a40', hair: '#1b1209', top: '#0ea5e9', bottom: '#264653', shoe: '#2b2622' },
  ];

  // ---------- Sus obras: estante y libros grandes ----------
  // Una fila de libros de lomos de colores apoyados en y (de x0 a x1).
  const fila = (y, x0, x1, k = 0) => {
    const W = [16, 20, 14, 22, 18, 15, 24, 17, 19, 21], H = [52, 62, 48, 58, 66, 54, 60, 50, 64, 56];
    const C = ['#e11d48', '#0ea5e9', '#f59e0b', '#16a34a', '#7c3aed', '#db2777', '#0d9488', '#f97316', '#6366f1', '#84cc16'];
    let s = '', x = x0, i = k;
    while (x + 14 < x1) {
      const w = W[i % 10], h = H[(i * 3) % 10], c = C[(i * 7) % 10];
      s += `<rect x="${x}" y="${y - h}" width="${w - 2}" height="${h}" rx="2" fill="${c}"/><rect x="${x + 3}" y="${y - h + 8}" width="${w - 8}" height="3" fill="#fff" opacity=".5"/><rect x="${x + 3}" y="${y - 14}" width="${w - 8}" height="2" fill="#fff" opacity=".35"/>`;
      x += w; i++;
    }
    return s;
  };
  // Libro grande de pie sobre la mesa (base en x, 428): portada de color, dibujo recortado y título en 2–3 renglones.
  const tapa = (x, c, id, arte, titulo) => `<g transform="translate(${x} 428)">
    <path d="M68,-184 L78,-178 L78,2 L68,0Z" fill="#fff7e6" stroke="#e5d3b3" stroke-width="1.5"/>
    <rect x="-70" y="-186" width="140" height="186" rx="8" fill="${c}"/><rect x="-70" y="-186" width="16" height="186" rx="6" fill="#000" opacity=".16"/>
    <clipPath id="${id}"><rect x="-52" y="-172" width="110" height="96" rx="8"/></clipPath>
    <rect x="-55" y="-175" width="116" height="102" rx="10" fill="#fff" opacity=".9"/>
    <g clip-path="url(#${id})">${arte}</g>
    ${titulo.map((t, i) => `<text x="3" y="${-46 - (titulo.length - 2) * 9 + i * 18}" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="16" fill="#fff">${t}</text>`).join('')}</g>`;
  // Dibujos de las tres portadas (coordenadas de la tapa: el recuadro va de x -52 a 58 y de y -172 a -76).
  const arteDias = `<rect x="-60" y="-180" width="130" height="110" fill="#bae6fd"/>${at(3, -140, 1, solcito(15))}
    <path d="M-60,-98 Q-20,-120 20,-100 T70,-104 L70,-70 L-60,-70Z" fill="#86efac"/><path d="M-60,-88 Q0,-104 70,-90 L70,-70 L-60,-70Z" fill="#4ade80"/>
    <rect x="22" y="-104" width="18" height="14" fill="#fff7ed"/><path d="M19,-104 L31,-114 L43,-104Z" fill="#e11d48"/>`;
  const arteGente = `<rect x="-60" y="-180" width="130" height="110" fill="#fef9c3"/><path d="M-60,-120 L-30,-140 L0,-126 L30,-146 L70,-122 L70,-100 L-60,-100Z" fill="#bbf7d0"/>
    <path d="M-60,-84 Q0,-96 70,-86 L70,-70 L-60,-70Z" fill="#d6b98c"/>
    ${person({ ...gente[2], x: -30, y: -82, s: 0.3, act: 'walk', delay: 0 })}${person({ ...gente[1], x: 2, y: -84, s: 0.3, act: 'walk', delay: -0.3 })}${person({ ...ninos[3], x: 30, y: -82, s: 0.24, act: 'walk', delay: -0.15 })}`;
  const arteGrillo = `<rect x="-60" y="-180" width="130" height="110" fill="#ede9fe"/>${at(-14, -76, 0.72, grillo(true))}
    ${at(32, -130, 1.2, nota('#7c3aed'), 'a-bob')}${at(44, -98, 1, nota('#db2777'), 'a-bob', delay(-1))}`;

  // ---------- Mi opinión: el salón ----------
  const pupitre = (x) => `<rect x="${x - 52}" y="438" width="104" height="10" rx="3" fill="#d97706"/><rect x="${x - 46}" y="448" width="92" height="52" fill="#b45309"/><rect x="${x - 38}" y="456" width="76" height="3" fill="#92400e" opacity=".5"/>`;
  const ninoL = { ...ninos[3] }, ninoA = { ...ninos[0] }, ninoB = { ...ninos[2], hairStyle: 'curly' };

  return {
    // ===== ¿Por qué es importante? Un libro gigante abierto en la pradera del que sale la imaginación =====
    importante: {
      hs: [[238, 404], [430, 282], [664, 446]],
      svg: () => `<defs>${lin('im-sky', [[0, '#c9b8ff'], [0.55, '#fbe2f0'], [1, '#fff3dc']])}${rad('im-glow', [[0, '#fff7c2', 0.95], [0.5, '#fde68a', 0.45], [1, '#fde68a', 0]])}</defs>
        <rect width="800" height="500" fill="url(#im-sky)"/>
        ${sun(80, 70, 24, '#fff6c4', '#fff1a0')}${cloud(210, 62, 0.75)}${cloud(690, 96, 0.7, 0.9, 'a-drift2', -5)}
        ${hill(330, '#d4ecbd', 34)}${hill(372, '#b4dd98', 24)}
        <path d="M0,420 Q400,398 800,424 L800,500 L0,500Z" fill="#94d07c"/>${grass(428, 22, '#5fae4f')}
        <circle cx="430" cy="320" r="175" fill="url(#im-glow)" class="a-glow"/>
        ${['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#8b5cf6'].map((c, i) => { const r = 118 - i * 12; return `<path d="M${430 - r},336 A${r},${r} 0 0 1 ${430 + r},336" stroke="${c}" stroke-width="12.5" fill="none" opacity=".88"/>`; }).join('')}
        ${birds(128, 3, '#6d28d9', 26, -9, 0.9)}
        ${at(300, 150, 1, luna, 'a-bob')}${at(560, 172, 1, pez, 'a-bob', delay(-1))}${at(520, 96, 1, barco, 'a-rock')}
        ${[[360, 120], [460, 70], [610, 130], [250, 200], [600, 240], [340, 210]].map(([x, y], i) => at(x, y, 1, estrella(['#facc15', '#f472b6', '#38bdf8'][i % 3], 8), 'a-twinkle', delay(i * 0.4))).join('')}
        ${[['a', 395], ['M', 430], ['b', 465]].map(([t, x], i) => at(x, 300, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="22" fill="#7c3aed">${t}</text>`, 'a-rise', `animation-duration:3.6s;${delay(-i * 1.2)}`)).join('')}
        ${at(430, 404, 1, `<path d="M-150,10 L150,10 L150,-4 Q75,-14 0,-2 Q-75,-14 -150,-4Z" fill="#5b21b6"/>${libroAbierto(140, '#7c3aed')}`)}
        ${person({ ...mariela, x: 165, y: 440, s: 1.05, arm: 'out', act: 'read' })}
        <rect x="176" y="389" width="128" height="9" rx="3" fill="#b45309"/><rect x="182" y="398" width="116" height="12" fill="#92400e"/><rect x="186" y="410" width="8" height="34" fill="#78350f"/><rect x="286" y="410" width="8" height="34" fill="#78350f"/>
        <path d="M186,389 L238,389 L233,382 L191,382Z" fill="#fffdf6" stroke="#d6c7a8"/><path d="M196,385 h30" stroke="#94a3b8" stroke-width="1.5"/>
        ${at(199, 386, 1, lapiz, 'a-rock', 'animation-duration:.8s')}
        <rect x="248" y="378" width="46" height="11" rx="2" fill="#0ea5e9"/><rect x="252" y="367" width="40" height="11" rx="2" fill="#e11d48"/><rect x="249" y="356" width="44" height="11" rx="2" fill="#facc15"/>
        <rect x="290" y="367" width="2" height="11" fill="#fff" opacity=".6"/><rect x="290" y="378" width="2" height="11" fill="#fff" opacity=".6"/><rect x="289" y="356" width="2" height="11" fill="#fff" opacity=".6"/>
        ${person({ ...ninos[0], x: 598, y: 448, s: 0.82, act: 'read' })}${at(598, 426, 1, libroAbierto(19, '#0ea5e9'))}
        <ellipse cx="598" cy="462" rx="46" ry="25" fill="#f472b6"/><ellipse cx="584" cy="452" rx="20" ry="7" fill="#fbcfe8" opacity=".7"/>
        ${person({ ...ninos[1], x: 708, y: 452, s: 0.82, act: 'read', flip: true })}${at(708, 430, 1, libroAbierto(19, '#f59e0b'))}
        <ellipse cx="708" cy="466" rx="46" ry="25" fill="#60a5fa"/><ellipse cx="722" cy="456" rx="20" ry="7" fill="#bfdbfe" opacity=".7"/>
        ${[[646, 402], [662, 406]].map(([x, y], i) => at(x, y, 0.8, corazon(), 'a-rise', `animation-duration:3s;${delay(-i * 1.5)}`)).join('')}`,
      story: [
        // 0 · Dedicó su vida a escribir: Mariela escribe y escribe; pasan días y noches (sol, luna…) y la pila de libros crece y crece
        () => {
          const libros = ['#22c55e', '#f97316', '#a855f7', '#14b8a6', '#ef4444', '#3b82f6'];
          const cielo = [solcito(16), luna, solcito(16), luna, solcito(16)];
          return `
          ${cielo.map((ic, i) => at(198, 252, 1, i < cielo.length - 1 ? at(0, 0, 1, ic, 's-out', delay(1.05 + i * 0.75)) : ic, 's-in', delay(0.3 + i * 0.75))).join('')}
          ${libros.map((c, i) => at(271, 356 - i * 11, 1, `<rect x="${-22 + (i % 2) * 3}" y="-11" width="${44 - (i % 3) * 4}" height="10.5" rx="2" fill="${c}"/><rect x="${17 - (i % 3) * 4 + (i % 2) * 3}" y="-11" width="2" height="10.5" fill="#fff" opacity=".6"/>`, 's-drop', delay(0.5 + i * 0.55))).join('')}
          ${[0, 1, 2].map((i) => `<path d="M${196 + i * 2},${384 - i * 1.6} q4,-3 8,0 t8,0 t8,0" pathLength="1" stroke="#475569" stroke-width="1.4" fill="none" class="s-draw" style="animation-duration:.9s;${delay(0.3 + i * 1.2)}"/>`).join('')}
          ${label(372, 228, '¡Años escribiendo!', 3.8, '#5b21b6', 21)}`;
        },
        // 1 · Su imaginación: Mariela muestra su libro y de las páginas salen volando un pájaro, una estrella, un sol, un pez, un barco… ¡y un grillo!
        () => {
          const cosas = [[300, 196, pajaro], [384, 176, estrella('#facc15', 15)], [592, 232, solcito(15)], [512, 238, pez], [322, 262, barco], [588, 304, `<g transform="scale(.42)">${grillo(false)}</g>`]];
          return `
          ${at(430, 318, 1, '<ellipse rx="125" ry="36" fill="#fffbe0"/>', 's-flash', `animation-duration:1.4s;${delay(0.3)}`)}
          ${cosas.map(([x, y, t], i) => at(x, y, 1, at(0, 0, 1, t, 'a-bob', delay(-i * 0.5)), 'st-move', `--dx:${430 - x}px;--dy:${318 - y}px;--s0:.2;animation-duration:1.3s;${delay(0.5 + i * 0.4)}`)).join('')}
          ${at(0, 0, 1, person({ ...mariela, x: 252, y: 412, s: 1.05, act: 'point' }), 's-from-l')}
          ${label(430, 156, '¡Su imaginación!', 3.6, '#5b21b6', 22)}`;
        },
        // 2 · Disfrutamos más la lectura: llega una niña feliz con su libro en alto y de los libros de todos salen corazones
        () => `
          ${at(0, 0, 1, person({ ...sofia, x: 500, y: 452, s: 1, act: 'cheer', item: 'book', itemColor: '#f59e0b' }), 's-from-l')}
          ${[[640, 398], [668, 404], [530, 352]].map(([x, y], k) => [0, 1, 2].map((j) => at(x + j * 10 - 10, y, 1.3, corazon(['#ec4899', '#f43f5e', '#a855f7'][j]), 'a-rise', `animation-duration:2.4s;${delay(0.6 + k * 0.3 + j * 0.8)}`)).join('')).join('')}
          ${[[560, 286], [705, 312], [640, 262], [470, 300]].map(([x, y], i) => at(x, y, 1, sparkle(0, 0, 0, '#facc15', 1.7), 's-in', delay(2 + i * 0.3))).join('')}
          ${label(612, 246, '¡Qué rico leer!', 3, '#5b21b6', 22)}`,
      ],
    },

    // ===== Sus obras: biblioteca con tres libros grandes; Mariela los muestra =====
    obras: {
      hs: [[400, 118], [212, 338], [400, 272], [596, 268]],
      svg: () => `<defs>${lin('ob-wall', [[0, '#fdf2f8'], [1, '#fbcfe8']])}</defs>
        <rect width="800" height="500" fill="url(#ob-wall)"/>
        <g fill="#f9a8d4" opacity=".35">${[...Array(9)].map((_, i) => `<circle cx="${40 + i * 90}" cy="${262 + (i % 2) * 40}" r="5"/>`).join('')}</g>
        <rect x="46" y="36" width="708" height="196" rx="8" fill="#92400e"/><rect x="58" y="46" width="684" height="172" fill="#6b3410"/>
        ${fila(128, 64, 740)}<rect x="52" y="128" width="696" height="9" fill="#a16207"/>
        ${fila(216, 64, 740, 5)}<rect x="52" y="216" width="696" height="10" fill="#a16207"/>
        <rect y="440" width="800" height="60" fill="#e7c9a0"/><path d="M0,462 H800 M0,484 H800" stroke="#d4b183" stroke-width="2"/>
        <rect x="110" y="428" width="580" height="14" rx="4" fill="#b45309"/><rect x="122" y="442" width="556" height="44" fill="#92400e"/><rect x="134" y="452" width="532" height="3" fill="#78350f" opacity=".5"/>
        ${at(140, 428, 0.85, maceta('#e11d48', '#fb7185'))}
        ${tapa(230, '#f59e0b', 'ob-c1', arteDias, ['El país de', 'los días', 'eternos'])}
        ${tapa(400, '#16a34a', 'ob-c2', arteGente, ['Gente', 'que camina'])}
        ${tapa(570, '#7c3aed', 'ob-c3', arteGrillo, ['Las cantas', 'de Grillo'])}
        ${person({ ...mariela, x: 724, y: 474, s: 1.05, act: 'point', flip: true })}
        ${[[315, 250], [485, 236], [655, 254], [150, 330]].map(([x, y], i) => sparkle(x, y, i * 0.5, '#fde047', 1.3)).join('')}`,
      story: [
        // 0 · Cuentos, poemas y novelas: Mariela pone en la repisa sus libros: un cuento, un libro de poemas y una novela
        () => {
          const cuento = `${libro('#0ea5e9', 56, 96)}<path d="M-16,-40 v-18 h7 v6 h7 v-6 h7 v6 h7 v-6 h7 v18Z" fill="#fde68a"/>${at(0, -70, 1, estrella('#fff', 7))}`;
          const poemas = `${libro('#e11d48', 56, 96)}<g transform="translate(-1 -56) scale(1.2)">${geranio('#fde68a', '#f59e0b')}</g><path d="M-1,-44 v16" stroke="#bbf7d0" stroke-width="2.5"/>`;
          const novela = `${libro('#16a34a', 66, 100)}<path d="M-20,-70 h36 M-20,-60 h30 M-20,-50 h36 M-20,-40 h26" stroke="#fff" stroke-width="2.5" opacity=".7" stroke-linecap="round"/>`;
          return `
          ${at(0, 0, 1, '<rect x="160" y="30" width="480" height="320" fill="#fce7f3"/><g fill="#f9a8d4" opacity=".35"><circle cx="220" cy="90" r="5"/><circle cx="560" cy="80" r="5"/><circle cx="600" cy="170" r="5"/></g><rect x="160" y="300" width="480" height="50" fill="#e7c9a0"/><path d="M160,312 H640" stroke="#d4b183" stroke-width="2"/>', 's-fade')}
          ${at(0, 0, 1, '<rect x="330" y="232" width="282" height="12" rx="3" fill="#b45309"/><path d="M350,244 l10,18 M590,244 l-10,18" stroke="#92400e" stroke-width="6" stroke-linecap="round"/>', 's-fade', delay(0.2))}
          ${at(0, 0, 1, person({ ...mariela, x: 262, y: 318, s: 1.15, arm: 'up', item: 'book', itemColor: '#f59e0b', act: 'raise' }), 's-from-l', delay(0.1))}
          ${at(366, 232, 1, cuento, 's-drop', delay(0.7))}${at(462, 232, 1, poemas, 's-drop', delay(1.7))}${at(558, 232, 1, novela, 's-drop', delay(2.7))}
          ${label(366, 120, 'Cuentos', 1.2, '#0369a1', 19)}${label(462, 120, 'Poemas', 2.2, '#be123c', 19)}${label(558, 120, 'Novelas', 3.2, '#15803d', 19)}
          ${[[414, 170], [510, 186], [596, 150]].map(([x, y], i) => at(x, y, 1, sparkle(0, 0, 0, '#facc15', 1.5), 's-in', delay(3.8 + i * 0.25))).join('')}`;
        },
        // 1 · «El país de los días eternos»: la portada se abre y el sol baja… pero vuelve a subir: ¡nunca se pone! Los niños juegan
        () => `<defs>${lin('st-ob1-sky', [[0, '#fde68a'], [1, '#bae6fd']])}</defs>
          ${at(320, 282, 1, `<rect x="-190" y="-118" width="380" height="236" rx="14" fill="#fffaf0" stroke="#f59e0b" stroke-width="6"/>
            <clipPath id="st-ob1"><rect x="-180" y="-108" width="360" height="216" rx="10"/></clipPath>
            <g clip-path="url(#st-ob1)"><rect x="-180" y="-108" width="360" height="216" fill="url(#st-ob1-sky)"/>
              <path d="M-180,46 Q-90,6 0,34 T180,24 L180,108 L-180,108Z" fill="#86efac"/><path d="M-180,74 Q0,46 180,76 L180,108 L-180,108Z" fill="#4ade80"/>
              <rect x="100" y="12" width="34" height="26" fill="#fff7ed"/><path d="M95,12 L117,-6 L139,12Z" fill="#e11d48"/><rect x="112" y="24" width="10" height="14" fill="#92400e"/></g>`, 's-in')}
          ${at(300, 200, 1, at(0, 0, 1, solcito(26), 'st-nosun', delay(0.8)), 's-in', delay(0.4))}
          ${at(0, 0, 1, person({ ...ninos[1], x: 210, y: 372, s: 0.95, act: 'cheer' }), 's-in', delay(0.8))}
          ${at(0, 0, 1, person({ ...ninos[3], x: 408, y: 380, s: 0.9, act: 'wave', flip: true }), 's-in', delay(1.1))}
          ${label(320, 395, 'El país de los días eternos', 3.2, '#b45309', 18)}${label(196, 228, '¡Nunca anochece!', 4.4, '#0369a1', 17)}`,
        // 2 · «Gente que camina»: la portada se abre y por el camino pasa una fila de gente caminando con sus cosas
        () => {
          const caminantes = [
            { ...gente[5], x: -110, s: 0.78, item: 'stick', itemColor: '#7a5230' },
            { ...gente[2], x: -40, s: 0.82, item: 'basket' },
            { ...ninos[2], x: 22, s: 0.6, item: 'flower', itemColor: '#e11d48' },
            { ...gente[1], x: 90, s: 0.8, item: 'pouch' },
          ];
          return `<defs>${lin('st-ob2-sky', [[0, '#fef9c3'], [1, '#dcfce7']])}</defs>
          ${at(400, 262, 1, `<rect x="-190" y="-118" width="380" height="236" rx="14" fill="#fffaf0" stroke="#16a34a" stroke-width="6"/>
            <clipPath id="st-ob2"><rect x="-180" y="-108" width="360" height="216" rx="10"/></clipPath>
            <g clip-path="url(#st-ob2)"><rect x="-180" y="-108" width="360" height="216" fill="url(#st-ob2-sky)"/>
              <path d="M-180,-10 L-120,-60 L-60,-22 L10,-74 L80,-30 L140,-56 L180,-30 L180,40 L-180,40Z" fill="#bbf7d0"/>
              <path d="M-180,40 Q0,20 180,38 L180,108 L-180,108Z" fill="#86efac"/><path d="M-180,78 Q0,64 180,80 L180,108 L-180,108Z" fill="#d6b98c"/>
              ${KitSVG.tree(-140, 52, 0.5)}${KitSVG.tree(150, 46, 0.45)}
              ${at(0, 0, 1, caminantes.map((p) => person({ ...p, y: 94, act: 'walk' })).join(''), 'st-move', `--dx:-240px;animation-duration:3.4s;animation-timing-function:ease-out;${delay(0.5)}`)}</g>`, 's-in')}
          ${label(400, 375, 'Gente que camina', 3.4, '#15803d', 19)}`;
        },
        // 3 · «Las cantas de Grillo»: de noche, el grillo sube a su piedra y canta; las notas suben al cielo (son poemas para niños)
        () => `<defs>${lin('st-ob3-sky', [[0, '#4c1d95'], [1, '#a78bfa']])}</defs>
          ${at(492, 258, 1, `<rect x="-190" y="-118" width="380" height="236" rx="14" fill="#fffaf0" stroke="#7c3aed" stroke-width="6"/>
            <rect x="-180" y="-108" width="360" height="216" rx="10" fill="url(#st-ob3-sky)"/>
            <g fill="#fef9c3">${[[-150, -80], [-60, -92], [60, -70], [150, -86], [120, -30], [-120, -30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6"/>`).join('')}</g>
            ${at(126, -66, 1, '<path d="M4,-18 A18,18 0 1,0 4,18 A13,13 0 1,1 4,-18Z" fill="#fde68a"/>')}
            <path d="M-180,60 Q0,44 180,60 L180,108 L-180,108Z" fill="#4d7c0f"/><ellipse cx="-58" cy="74" rx="62" ry="18" fill="#a8a29e"/><ellipse cx="-70" cy="68" rx="30" ry="6" fill="#d6d3d1"/>`, 's-in')}
          ${at(434, 334, 1, at(0, 0, 1.1, grillo(true), 'a-bob', 'animation-duration:1.2s'), 's-from-l', delay(0.3))}
          ${[[470, 230, '#fde68a', 0], [500, 250, '#f9a8d4', 0.6], [530, 226, '#bef264', 1.2], [560, 246, '#fde68a', 1.8], [590, 228, '#f9a8d4', 2.4]].map(([x, y, c, d]) => at(x, y, 1.5, nota(c), 'a-rise', `animation-duration:2.6s;${delay(1.1 + d)}`)).join('')}
          ${label(560, 300, '♪ cri, cri ♪', 1.4, '#6d28d9', 18)}
          ${label(492, 371, 'Las cantas de Grillo', 3.4, '#6d28d9', 20)}`,
      ],
    },

    // ===== Mi opinión: en el salón, una niña como Sofía presenta su cartelera «BIOGRAFÍA» =====
    opinion: {
      hs: [[262, 262], [500, 276], [662, 456]],
      svg: () => `<defs><linearGradient id="op-wall" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="400"><stop offset="0" stop-color="#fdf4ff"/><stop offset="1" stop-color="#f5d0fe"/></linearGradient>
          ${lin('op-sky', [[0, '#7dd3fc'], [1, '#e0f2fe']])}<clipPath id="op-win"><rect x="610" y="62" width="120" height="116"/></clipPath></defs>
        <rect width="800" height="400" fill="url(#op-wall)"/>
        <rect y="400" width="800" height="100" fill="#e9d5b0"/><path d="M0,430 H800 M0,462 H800" stroke="#dcc49a" stroke-width="2"/><rect y="394" width="800" height="8" fill="#e9a8f7" opacity=".6"/>
        <rect x="48" y="56" width="276" height="158" rx="6" fill="#a16207"/><rect x="58" y="66" width="256" height="136" rx="3" fill="#1f5f4a"/>
        <g font-family="Fredoka, sans-serif" font-weight="600" fill="#f8fafc" text-anchor="middle"><text x="186" y="104" font-size="22">Mi exposición</text><text x="186" y="138" font-size="16" opacity=".85">Mariela Zuluaga</text></g>
        <g stroke="#f8fafc" stroke-width="2" fill="none" opacity=".8" stroke-linecap="round"><path d="M90,186 q10,-14 20,0 q10,-14 20,0"/><path d="M250,186 v-16 m-8,8 h16"/><circle cx="160" cy="176" r="7"/></g>
        <rect x="52" y="202" width="268" height="8" rx="3" fill="#ca8a04"/>
        <rect x="602" y="54" width="136" height="132" rx="4" fill="#ffffff"/><rect x="610" y="62" width="120" height="116" fill="url(#op-sky)"/>
        <g clip-path="url(#op-win)">${cloud(640, 100, 0.55, 0.95, 'a-drift')}${cloud(700, 150, 0.4, 0.9, 'a-drift2', -6)}</g><path d="M670,62 V178 M610,120 H730" stroke="#ffffff" stroke-width="6"/>
        <g transform="translate(0 14)"><path d="M475,148 L428,400 M475,148 L522,400" stroke="#92400e" stroke-width="7" stroke-linecap="round"/>
        <rect x="395" y="158" width="160" height="182" rx="4" fill="#fffdf6" stroke="#d6c7a8" stroke-width="2"/>
        <path d="M404,170 q8,-4 16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0 M404,330 q8,-4 16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0" stroke="#a78bfa" stroke-width="1.5" fill="none"/>
        ${[[404, 166], [546, 166], [404, 332], [546, 332]].map(([x, y]) => at(x, y, 1, estrella('#a78bfa', 6))).join('')}
        <text x="475" y="196" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="22" fill="#c4b5fd" stroke="#5b21b6" stroke-width="1.2">BIOGRAFÍA</text>
        <clipPath id="op-foto"><rect x="406" y="208" width="44" height="54" rx="4"/></clipPath><rect x="406" y="208" width="44" height="54" rx="4" fill="#fde68a"/>
        <g clip-path="url(#op-foto)">${person({ ...mariela, x: 428, y: 290, s: 0.52, act: 'none' })}</g>
        <path d="M458,216 h86 M458,228 h80 M458,240 h86 M458,252 h70 M408,276 h136 M408,288 h128 M408,300 h136" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        ${at(430, 324, 0.5, libro('#f59e0b', 26, 30))}${at(475, 324, 0.5, libro('#16a34a', 26, 30))}${at(520, 324, 0.5, libro('#7c3aed', 26, 30))}
        <rect x="388" y="338" width="174" height="8" rx="3" fill="#b45309"/></g>
        ${person({ ...sofia, x: 320, y: 440, s: 1.3, act: 'point' })}
        ${person({ ...ninoL, x: 104, y: 466, s: 0.85, act: 'look' })}${pupitre(104)}
        ${person({ ...ninoA, x: 588, y: 466, s: 0.85, act: 'look', flip: true })}${pupitre(588)}
        ${person({ ...ninoB, x: 718, y: 466, s: 0.85, arm: 'up', act: 'raise', flip: true })}${pupitre(718)}`,
      story: [
        // 0 · Me gustó saber de su vida: Sofía piensa en la vida de Mariela (que lee y escribe) y le salen corazones
        () => `
          ${at(0, 0, 1, '<circle cx="346" cy="290" r="7" fill="#fff" stroke="#e9d5ff" stroke-width="2.5"/><circle cx="366" cy="266" r="11" fill="#fff" stroke="#e9d5ff" stroke-width="2.5"/>', 's-in', delay(0.3))}
          ${at(440, 200, 1, `<ellipse rx="104" ry="66" fill="#fff" stroke="#e9d5ff" stroke-width="3"/>
            <clipPath id="st-op0"><ellipse rx="98" ry="60"/></clipPath><g clip-path="url(#st-op0)"><path d="M-110,40 Q0,20 110,42 L110,70 L-110,70Z" fill="#bbf7d0"/>
            ${person({ ...mariela, x: -38, y: 52, s: 0.62, arm: 'out', item: 'book', itemColor: '#7c3aed', act: 'read' })}${at(54, -28, 1, solcito(13))}${at(40, 36, 0.8, libroAbierto(26, '#e11d48'))}</g>`, 's-in', delay(0.6))}
          ${[[266, 372], [240, 350], [268, 326]].map(([x, y], i) => at(x, y, 1.4, corazon(['#ec4899', '#a855f7', '#f43f5e'][i]), 'a-rise', `animation-duration:2.6s;${delay(1 + i * 0.7)}`)).join('')}
          ${at(228, 214, 1, at(0, 0, 2.4, corazon('#ec4899'), 'a-pulse'), 's-in', delay(2.4))}
          ${label(232, 158, '¡Me gustó!', 3, '#a21caf', 26)}`,
        // 1 · Me gusta lo que escribe, como sus poemas: sobre la cartelera aparece una hoja; se escriben los versos y florecen geranios
        () => `
          ${at(380, 142, 1, hoja(184, 216), 's-in')}
          <text x="485" y="178" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="20" fill="#be123c" class="s-in" style="${delay(0.5)}">Poemas</text>
          ${[0, 1, 2, 3, 4].map((i) => `<path d="M${424},${210 + i * 26} q7,-6 14,0 t14,0 t14,0 t14,0 t14,0 t14,0${i % 2 ? '' : ' t14,0'}" pathLength="1" stroke="#475569" stroke-width="2.4" fill="none" stroke-linecap="round" class="s-draw" style="animation-duration:.6s;${delay(0.8 + i * 0.45)}"/>`).join('')}
          <path d="M394,154 Q404,204 392,250 T396,344" pathLength="1" stroke="#16a34a" stroke-width="3" fill="none" class="s-draw" style="animation-duration:1.2s;${delay(2.9)}"/>
          ${[[392, 164], [548, 160], [396, 344], [550, 344], [394, 252]].map(([x, y], i) => at(x, y, 1.15, geranio(i % 2 ? '#f43f5e' : '#e11d48', '#fde68a'), 's-in', delay(3.2 + i * 0.22))).join('')}
          ${label(306, 214, '¡Sus poemas!', 4.3, '#be123c', 22)}`,
        // 2 · Bonitas y grandes historias: de un libro crece un castillo enorme con arcoíris y los compañeros aplauden felices
        () => `
          <rect x="530" y="330" width="270" height="70" fill="url(#op-wall)"/><rect x="530" y="400" width="270" height="50" fill="#e9d5b0"/><path d="M530,430 H800" stroke="#dcc49a" stroke-width="2"/><rect x="530" y="394" width="270" height="8" fill="#e9a8f7" opacity=".6"/>
          ${person({ ...ninoA, x: 588, y: 466, s: 0.85, act: 'cheer', flip: true })}${pupitre(588)}
          ${person({ ...ninoB, x: 718, y: 466, s: 0.85, act: 'cheer', flip: true, delay: -0.4 })}${pupitre(718)}
          ${at(450, 452, 1, libroAbierto(48, '#c026d3'), 's-in', delay(0.2))}
          ${['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#8b5cf6'].map((c, i) => { const r = 100 - i * 9; return at(0, 0, 1, `<path d="M${450 - r},440 A${r},${r} 0 0 1 ${450 + r},440" stroke="${c}" stroke-width="10" fill="none"/>`, 's-fade', delay(0.6 + i * 0.12)); }).join('')}
          ${at(450, 436, 1, `<rect x="-26" y="-118" width="52" height="118" fill="#fde68a" stroke="#d97706" stroke-width="2"/><path d="M-26,-118 v-12 h10 v8 h10 v-8 h12 v8 h10 v-8 h10 v12Z" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
            <path d="M-8,0 v-26 q8,-12 16,0 v26Z" fill="#92400e"/><rect x="-14" y="-90" width="10" height="14" rx="5" fill="#7dd3fc"/><rect x="4" y="-90" width="10" height="14" rx="5" fill="#7dd3fc"/>
            <path d="M0,-130 v-26" stroke="#92400e" stroke-width="2.5"/><path d="M0,-156 l18,6 l-18,6Z" fill="#e11d48"/>`, 's-grow', `animation-duration:1.4s;${delay(1)}`)}
          ${[[372, 300], [530, 286], [452, 250], [404, 360], [500, 344]].map(([x, y], i) => at(x, y, 1, estrella(['#facc15', '#f472b6', '#38bdf8'][i % 3], 10), 's-in', delay(2.2 + i * 0.2))).join('')}
          ${label(590, 252, '¡Grandes historias!', 3.4, '#a21caf', 21)}`,
      ],
    },
  };
})());
