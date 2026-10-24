// Escenas de la biografía (¿Quién es?, Su vida, Cuando creció) — ver la cabecera de scenes.js (reglas, encuadre de las historias y piezas compartidas en SCN).
Object.assign(window.APP_SCENES, (() => {
  const { lin, at, delay, sun, cloud, birds, hill, grass, palm, tree, flagPole, person, sparkle } = KitSVG;
  const { label, mariela, marielaNina, gente, maceta, libroAbierto, hoja, cordillera, garza } = SCN;

  // ---------- piezas propias de estas escenas ----------
  const txt = (x, y, t, size = 16, fill = '#3a2216', weight = 700, anchor = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Fredoka, sans-serif" font-weight="${weight}" font-size="${size}" fill="${fill}">${t}</text>`;
  // Lápiz con la punta en (0,0), inclinado hacia arriba a la izquierda (rot > 0: hacia la derecha, para no tapar lo escrito).
  const lapiz = (s = 1, rot = -25) => `<g transform="scale(${s}) rotate(${rot})"><rect x="-3" y="-30" width="6" height="22" fill="#facc15" stroke="#ca8a04" stroke-width="1"/><rect x="-3" y="-35" width="6" height="5" rx="1.5" fill="#f472b6"/><rect x="-3" y="-31" width="6" height="2" fill="#a1a1aa"/><path d="M-3,-8 L3,-8 L0,0Z" fill="#f6d1a3"/><path d="M-1.2,-3 L1.2,-3 L0,0Z" fill="#3f3f46"/></g>`;
  // Persona que escribe: act 'read' (inclina la cabeza) con el brazo 'out' y un lápiz que gira con el mismo brazo
  // (mismo pivote del hombro y misma animación pa-read-arm, con delay 0 para que vayan juntos).
  const escribe = (o) => `${person({ ...o, arm: 'out', act: 'read', delay: 0 })}<g transform="translate(${o.x} ${o.y}) scale(${o.s})"><g transform="translate(13 -63)"><g class="pa pa-read-arm" style="animation-delay:0s"><g transform="translate(-13 63)">${at(38, -45, 1, lapiz(1), 'st-scribble')}<circle cx="32" cy="-52" r="4.6" fill="${o.skin}"/></g></g></g></g>`;
  // Renglones escritos a mano (ondas) para hojas y periódicos.
  const renglones = (x, y, w, n, gap = 9, c = '#64748b') => [...Array(n)].map((_, i) => `<path d="M${x},${y + i * gap} q3,-3 6,0${' t6,0'.repeat(Math.max(0, Math.floor(w / 6) - 1))}" stroke="${c}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`).join('');
  // Periódico abierto (esquina superior izquierda en 0,0).
  const periodico = (w = 150, h = 108, head = 'NOTICIAS') => `<rect x="4" y="4" width="${w}" height="${h}" rx="3" fill="#000" opacity=".12"/><rect width="${w}" height="${h}" rx="3" fill="#f8f5ee" stroke="#9ca3af" stroke-width="1.5"/>
    ${txt(w / 2, 22, head, 19, '#1f2937')}<path d="M8,30 H${w - 8}" stroke="#1f2937" stroke-width="2"/>
    <rect x="8" y="37" width="${w * 0.44}" height="${h - 46}" fill="#bfe3ff"/><circle cx="${8 + w * 0.3}" cy="52" r="7" fill="#fbbf24"/><path d="M8,${h - 9} L${8 + w * 0.14},${h - 28} L${8 + w * 0.26},${h - 18} L${8 + w * 0.44},${h - 32} L${8 + w * 0.44},${h - 9}Z" fill="#6fae5a"/>
    <g stroke="#94a3b8" stroke-width="2.4" stroke-linecap="round">${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${w * 0.54},${42 + i * 10} H${w - 9}"/>`).join('')}</g>`;
  // Hoja con un poema: título, versos ondulados y una florecita.
  const hojaPoema = (w = 96, h = 118) => `${hoja(w, h)}${txt(w / 2 + 6, 22, 'Poema', 15, '#be185d')}<g stroke="#7c3aed" stroke-width="1.8" fill="none" stroke-linecap="round">${[0, 1, 3, 4].map((i) => `<path d="M${w * 0.26},${40 + i * 13} q4,-4 8,0 t8,0 t8,0 t8,0 ${i % 3 ? 't8,0 t8,0' : ''}"/>`).join('')}</g>
    <g transform="translate(${w - 20} ${h - 18})">${[0, 72, 144, 216, 288].map((a) => `<ellipse cy="-5" rx="3.5" ry="5" fill="#fb7185" transform="rotate(${a})"/>`).join('')}<circle r="2.5" fill="#fbbf24"/></g>`;
  // Alfiler de mapa con la punta en (0,0).
  const pin = '<path d="M0,0 C-6,-14 -20,-22 -20,-38 A20,20 0 1 1 20,-38 C20,-22 6,-14 0,0Z" fill="#e11d48" stroke="#9f1239" stroke-width="2"/><circle cy="-38" r="8" fill="#fff"/>';
  // Calendario de pared (borde superior en 0,0, centrado) y su año grande.
  const calendario = `<rect x="-58" y="0" width="116" height="122" rx="10" fill="#fff" stroke="#d6c7a8" stroke-width="2.5"/><path d="M-58,10 Q-58,0 -48,0 L48,0 Q58,0 58,10 L58,34 L-58,34Z" fill="#e11d48"/>${txt(0, 25, 'AÑO', 17, '#fff')}
    <rect x="-36" y="-8" width="8" height="16" rx="4" fill="#9ca3af"/><rect x="28" y="-8" width="8" height="16" rx="4" fill="#9ca3af"/>`;
  const anio = (y, c = '#3a2216') => txt(0, 96, y, 40, c);
  const corazon = (c = '#f43f5e') => `<path d="M0,6 C-12,-2 -10,-12 -4,-12 C-1,-12 0,-9 0,-8 C0,-9 1,-12 4,-12 C10,-12 12,-2 0,6Z" fill="${c}"/>`;
  // Bebé envuelto en su cobija (centro en 0,0), dormidito.
  const bebe = '<ellipse rx="19" ry="12" fill="#fbcfe8" stroke="#f472b6" stroke-width="1.5"/><path d="M-6,-10 Q8,-14 16,-2" stroke="#f9a8d4" stroke-width="3" fill="none"/><circle cx="-9" cy="-5" r="8" fill="#d9a06f"/><path d="M-13,-6 q2,2 4,0 M-8,-6 q2,2 4,0" stroke="#5a2e1e" stroke-width="1.2" fill="none" stroke-linecap="round"/><circle cx="-9" cy="-12" r="3" fill="#3b2416"/>';
  // Globo de diálogo: caja (x, y, w, h) con la colita hacia (tx, ty).
  const globo = (x, y, w, h, tx, ty) => `<path d="M${x + 16},${y} H${x + w - 16} Q${x + w},${y} ${x + w},${y + 16} V${y + h - 16} Q${x + w},${y + h} ${x + w - 16},${y + h} H${tx + 22} L${tx},${ty} L${tx + 4},${y + h} H${x + 16} Q${x},${y + h} ${x},${y + h - 16} V${y + 16} Q${x},${y} ${x + 16},${y}Z" fill="#fff" stroke="#d6c7a8" stroke-width="2.5" stroke-linejoin="round"/>`;
  const flor = (c = '#e11d48', h = 26) => `<path d="M0,0 Q-2,${-h / 2} 0,${-h}" stroke="#15803d" stroke-width="3" fill="none"/><ellipse cx="-6" cy="${-h / 2}" rx="6" ry="3" fill="#22c55e" transform="rotate(-30 -6 ${-h / 2})"/><g transform="translate(0 ${-h})">${[0, 72, 144, 216, 288].map((a) => `<ellipse cy="-6" rx="4.5" ry="6.5" fill="${c}" transform="rotate(${a})"/>`).join('')}<circle r="3.6" fill="#fbbf24"/></g>`;
  const mariposa = (c = '#f59e0b') => `${at(0, 0, 1, `<ellipse cx="-7" cy="-4" rx="8" ry="6" fill="${c}"/><ellipse cx="-6" cy="5" rx="5" ry="4" fill="${c}"/><ellipse cx="7" cy="-4" rx="8" ry="6" fill="${c}"/><ellipse cx="6" cy="5" rx="5" ry="4" fill="${c}"/>`, 'a-flap')}<rect x="-1.5" y="-8" width="3" height="16" rx="1.5" fill="#3a2216"/>`;
  // Garza volando (centro en 0,0), con las alas que aletean.
  const garzaVuela = `${at(0, -2, 1, '<path d="M-4,0 Q-20,-22 -40,-14 Q-22,-8 -4,4Z M4,0 Q20,-22 40,-14 Q22,-8 4,4Z" fill="#fff" stroke="#d9dee5" stroke-width="1.2"/>', 'a-flap')}<ellipse rx="16" ry="7" fill="#fff" stroke="#d9dee5" stroke-width="1.2"/><path d="M14,-2 Q24,-4 28,-8" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="29" cy="-9" r="4.5" fill="#fff"/><path d="M33,-9 L44,-8 L33,-6Z" fill="#e8b931"/><path d="M-14,2 L-30,6" stroke="#d6a43a" stroke-width="2"/>`;
  // Máquina de escribir (base en 0,0).
  const maquina = `<rect x="-44" y="-40" width="88" height="10" rx="5" fill="#475569"/><rect x="-40" y="-31" width="80" height="31" rx="7" fill="#334155"/><rect x="-32" y="-26" width="64" height="5" rx="2" fill="#1f2937"/>
    <g fill="#e2e8f0">${[0, 1, 2].map((r) => [...Array(8 - r)].map((_, i) => `<circle cx="${-26 + r * 3.5 + i * 7.4}" cy="${-15 + r * 6}" r="2.4"/>`).join('')).join('')}</g><circle cx="-48" cy="-35" r="5" fill="#64748b"/><circle cx="48" cy="-35" r="5" fill="#64748b"/>`;
  // Micrófono de radio en su pie (base en 0,0; cabeza ≈ 186 arriba).
  const microfono = `<path d="M-18,0 L18,0 L5,-7 L-5,-7Z" fill="#374151"/><rect x="-2.5" y="-176" width="5" height="170" fill="#6b7280"/><g transform="translate(0 -180) rotate(-28)"><rect x="-8" y="-26" width="16" height="30" rx="8" fill="#1f2937"/><path d="M-8,-14 H8 M-8,-8 H8" stroke="#9ca3af" stroke-width="2"/></g>`;
  // Pupitre de frente (tapa a la altura y), para tapar las piernas de quien está detrás.
  const pupitre = (x, y, w = 70) => `<rect x="${x - w / 2}" y="${y}" width="${w}" height="7" rx="2" fill="#a0662f"/><rect x="${x - w / 2 + 4}" y="${y + 7}" width="${w - 8}" height="${474 - y - 7}" fill="#c4874a"/><path d="M${x - w / 2 + 10},${y + 20} H${x + w / 2 - 10}" stroke="#a0662f" stroke-width="2"/>`;

  return {
    // ====================== ¿Quién es? — Villavicencio, al pie de la cordillera ======================
    quien: {
      hs: [[588, 396], [414, 302], [215, 262], [700, 150]],
      svg: () => {
        const edif = [[70, 26, 34, '#f4c7a1'], [98, 22, 50, '#fde68a'], [122, 30, 28, '#bfdbfe'], [154, 26, 58, '#fecaca'], [272, 26, 42, '#c7f0d0'], [300, 32, 26, '#fbcfe8'], [334, 22, 36, '#fde68a']];
        const ciudad = edif.map(([x, w, h, c]) => `<rect x="${x}" y="${292 - h}" width="${w}" height="${h}" fill="${c}"/><rect x="${x - 1}" y="${292 - h}" width="${w + 2}" height="4" fill="#000" opacity=".12"/>${[...Array(Math.floor((h - 10) / 12))].map((_, r) => [...Array(Math.floor(w / 9))].map((_, i) => `<rect x="${x + 4 + i * 9}" y="${292 - h + 9 + r * 12}" width="4" height="5" fill="#6b8fb3" opacity=".7"/>`).join('')).join('')}`).join('')
          // catedral con su torre
          + '<rect x="200" y="244" width="58" height="48" fill="#fff7ea"/><path d="M196,246 L229,224 L262,246Z" fill="#c2410c"/><rect x="205" y="208" width="18" height="40" fill="#fff7ea"/><path d="M203,210 L214,190 L225,210Z" fill="#c2410c"/><path d="M214,178 V190 M209,183 H219" stroke="#7a4f28" stroke-width="2.4"/><path d="M222,292 V272 Q229,262 236,272 V292Z" fill="#8b5a2b"/><circle cx="214" cy="226" r="4" fill="#fbbf24"/>';
        return `<defs>${lin('qu-sky', [[0, '#9fd3f7'], [0.55, '#ffe9c4'], [1, '#ffd49a']])}${lin('qu-llano', [[0, '#cfe39a'], [1, '#8cc265']])}${lin('qu-rio', [[0, '#a5dcf7'], [1, '#3b9ad9']])}</defs>
        <rect width="800" height="500" fill="url(#qu-sky)"/>
        ${sun(700, 150, 34, '#fff3c4', '#ffd27a')}
        ${cloud(300, 66, 0.9)}${cloud(520, 108, 0.6, 0.85, 'a-drift2', -5)}
        ${birds(104, 3, '#6b4a3a', 30, -9, 0.9)}
        ${cordillera(258, '#6f9d8c', '#8fb9a2')}
        <path d="M0,288 Q300,272 560,282 Q700,290 800,280 L800,500 L0,500Z" fill="url(#qu-llano)"/>
        ${ciudad}
        <path d="M606,284 Q648,300 700,334 Q760,372 800,384 L800,438 Q728,418 664,372 Q616,330 586,286Z" fill="url(#qu-rio)"/>
        ${at(0, 0, 1, '<path d="M640,312 q8,-3 16,0 M690,350 q10,-3 20,0 M740,380 q10,-3 20,0" stroke="#e0f2fe" stroke-width="2.4" fill="none" stroke-linecap="round"/>', 'a-bob')}
        ${palm(566, 290, 0.42, -1)}${palm(612, 288, 0.34, -2, 10)}${palm(470, 286, 0.3, -3)}
        ${at(706, 384, 0.8, garza)}${at(748, 404, 0.7, garza, 'a-bob', delay(-1.2))}
        ${grass(410, 22, '#5e9e46')}
        <rect x="136" y="334" width="9" height="104" fill="#7a4f28"/><rect x="286" y="334" width="9" height="104" fill="#7a4f28"/>
        <rect x="104" y="318" width="222" height="60" rx="10" fill="#8b5a2b"/><rect x="110" y="324" width="210" height="48" rx="7" fill="#c98a4a"/>
        ${txt(215, 341, '¡Bienvenidos a', 13, '#4a2a12', 600)}${txt(215, 365, 'VILLAVICENCIO', 23, '#3b1f0e')}
        ${at(126, 446, 0.8, maceta())}${at(306, 446, 0.8, maceta('#f59e0b', '#fde68a'))}
        ${flagPole(388, 446, 156, 'col', 52, 34)}
        <path d="M542,414 L536,474 M626,414 L632,474" stroke="#7a4f28" stroke-width="6" stroke-linecap="round"/>
        <path d="M526,414 L642,414 L634,390 L534,390Z" fill="#a0662f"/><rect x="524" y="412" width="120" height="6" rx="2" fill="#7a4f28"/>
        <path d="M546,409 L602,409 L598,394 L550,394Z" fill="#fffdf6"/><path d="M556,404 h34 M558,399 h30" stroke="#94a3b8" stroke-width="1.2"/>
        <g><rect x="606" y="396" width="30" height="7" rx="1.5" fill="#7c3aed"/><rect x="608" y="389" width="27" height="7" rx="1.5" fill="#0ea5e9"/><rect x="605" y="382" width="29" height="7" rx="1.5" fill="#e11d48"/></g>
        ${escribe({ ...mariela, x: 500, y: 468, s: 1.3 })}`;
      },
      story: [
        // 0 · Escritora: sobre el escritorio aparece una hoja grande y el lápiz escribe «Había una vez / un llano / lleno de sol…»
        ({ at }) => {
          const lines = ['Había una vez', 'un llano', 'lleno de sol…'];
          return `
          ${at(548, 218, 1, hoja(132, 152), 's-in')}
          ${lines.map((t, i) => at(0, 0, 1, txt(574, 264 + i * 30, t, 15, '#1e3a8a', 600, 'start'), 'st-reveal', delay(0.7 + i * 1.1))).join('')}
          ${at(574, 268, 1, lapiz(1.5, 28), 'st-write3', '--w1:96px;--w2:58px;--w3:92px;animation-delay:.7s')}
          ${at(0, 0, 1, '<path d="M610,350 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0 M610,334 v-6 M626,350 h6 M594,350 h-6 M621,339 l4,-4 M599,339 l-4,-4" pathLength="1" stroke="#f59e0b" stroke-width="2.4" fill="none" stroke-linecap="round" class="s-draw" style="animation-duration:1.2s;animation-delay:3.9s"/>')}
          ${label(452, 226, '¡Escritora!', 3.6, '#c2410c', 24)}`;
        },
        // 1 · Poeta y periodista: de la mano de Mariela salen volando una hoja con un poema y un periódico; la bandera dice «colombiana»
        ({ at, sparkle }) => `
          ${at(218, 162, 1, hojaPoema(98, 120), 'st-move', '--dx:290px;--dy:200px;--s0:.15;animation-duration:1.3s;animation-delay:.3s')}
          ${label(267, 304, 'Poeta', 1.6, '#be185d', 22)}
          ${at(430, 160, 1, periodico(148, 106), 'st-move', '--dx:70px;--dy:200px;--s0:.15;animation-duration:1.3s;animation-delay:2s')}
          ${label(504, 292, 'Periodista', 3.2, '#1f2937', 22)}
          ${label(402, 350, 'colombiana', 4.4, '#1d4ed8', 19)}
          ${[[372, 300, 4.5], [458, 290, 4.7], [452, 324, 4.9]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#f59e0b', 1.4), 's-in', delay(d))).join('')}`,
        // 2 · Villavicencio: un alfiler de mapa cae sobre la ciudad, al pie de la cordillera y junto a los Llanos
        ({ at }) => `
          ${at(229, 250, 1, at(0, 0, 1, '<ellipse rx="22" ry="7" fill="none" stroke="#e11d48" stroke-width="3"/>', 'a-pulse'), 's-in', delay(1))}
          ${at(229, 248, 1, pin, 's-drop', delay(0.3))}
          ${label(222, 172, 'Villavicencio', 1.2, '#9f1239', 27)}
          ${label(222, 304, 'capital del Meta', 2.3, '#7c2d12', 17)}
          ${label(452, 208, 'los Llanos', 3.4, '#166534', 19)}${label(452, 230, 'Orientales', 3.6, '#166534', 19)}
          ${at(0, 0, 1, at(0, 0, 1, '<path d="M452,240 Q462,262 470,286" pathLength="1" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" class="s-draw" style="animation-duration:.7s;animation-delay:4s"/><path d="M452,240 Q462,262 470,286" pathLength="1" stroke="#15803d" stroke-width="4" fill="none" stroke-linecap="round" class="s-draw" style="animation-duration:.7s;animation-delay:4s"/>'), 's-fade', delay(4))}
          ${at(472, 292, 1, '<path d="M-9,-10 L0,2 L9,-10" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M-9,-10 L0,2 L9,-10" stroke="#15803d" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>', 's-in', delay(4.6))}`,
        // 3 · En 1948: el calendario pasa 1946, 1947… ¡1948! y una mamá llega con su bebé en brazos: ¡nació Mariela!
        ({ at, person }) => {
          const flipYear = (y, d0, d1) => at(0, 0, 1, at(0, 0, 1, anio(y), 's-in', delay(d0)), 's-out', delay(d1));
          return `
          ${at(436, 108, 1, `${calendario}${flipYear('1946', 0.4, 1.1)}${flipYear('1947', 1.2, 1.9)}${at(0, 0, 1, anio('1948', '#e11d48'), 's-stamp', delay(2))}`, 's-in')}
          ${at(0, 0, 1, `${person({ ...gente[1], x: 566, y: 320, s: 1.1, arm: 'out', act: 'idle' })}${at(592, 262, 1.2, bebe)}`, 's-up', delay(2.6))}
          ${[0, 0.6, 1.2].map((d) => at(626 + d * 14, 250, 0.9, corazon(), 'a-rise', `animation-duration:2.4s;${delay(3.3 + d)}`)).join('')}
          ${label(596, 104, '¡Nació Mariela!', 3.4, '#be185d', 22)}`;
        },
      ],
    },

    // ====================== Su vida — Mariela niña en el Llano ======================
    vida: {
      hs: [[352, 404], [496, 404], [150, 300], [640, 412]],
      svg: () => `<defs>${lin('vi-sky', [[0, '#8fd0f5'], [1, '#eaf8ff']])}${lin('vi-rio', [[0, '#a5dcf7'], [1, '#3b9ad9']])}</defs>
        <rect width="800" height="500" fill="url(#vi-sky)"/>
        ${sun(690, 78, 32, '#fff6c4', '#fff1a0')}${cloud(390, 78, 0.8)}${cloud(150, 118, 0.6, 0.9, 'a-drift2', -6)}
        ${birds(150, 3, '#334155', 26, -4)}
        ${hill(300, '#c3e6a4', 30)}
        ${[[520, 316, 0.34], [556, 312, 0.3], [600, 318, 0.38], [338, 314, 0.3], [304, 318, 0.26]].map(([x, y, s], i) => palm(x, y, s, -i * 0.8, 8)).join('')}
        ${hill(334, '#a6d98b', 22)}
        <path d="M0,348 Q400,332 800,346 L800,500 L0,500Z" fill="#8cc96a"/>
        <path d="M560,500 Q610,436 690,414 Q752,398 800,394 L800,452 Q748,458 708,472 Q672,484 650,500Z" fill="url(#vi-rio)"/>
        ${at(0, 0, 1, '<path d="M640,470 q8,-3 16,0 M700,440 q10,-3 20,0 M752,422 q8,-3 16,0" stroke="#e0f2fe" stroke-width="2.4" fill="none" stroke-linecap="round"/>', 'a-bob')}
        ${palm(780, 392, 0.85, -1, 12)}
        <rect x="40" y="300" width="172" height="124" fill="#fff8ec"/><rect x="40" y="410" width="172" height="14" fill="#c9a77c"/>
        <path d="M132,424 V368 Q150,352 168,368 V424Z" fill="#8b5a2b"/><circle cx="160" cy="398" r="2.4" fill="#f5c518"/>
        <rect x="62" y="334" width="44" height="38" fill="#7cc6ef" stroke="#8b5a2b" stroke-width="4"/><path d="M84,334 V372 M62,353 H106" stroke="#8b5a2b" stroke-width="3"/>
        ${at(84, 384, 0.7, maceta())}
        <path d="M22,308 L126,232 L230,308 L214,316 L126,252 L38,316Z" fill="#b8863f"/><path d="M28,306 L126,236 L224,306" fill="#d2a85a"/>
        <g stroke="#a07c3a" stroke-width="2" stroke-linecap="round">${[[60, 290, 72, 274], [84, 274, 94, 262], [108, 258, 116, 248], [140, 252, 148, 262], [162, 268, 172, 280], [186, 284, 196, 296]].map(([a, b, c, d]) => `<path d="M${a},${b} L${c},${d}"/>`).join('')}</g>
        ${tree(430, 392, 1.75, '#3f9a4a', '#57b55e')}
        ${person({ ...gente[5], x: 255, y: 452, s: 1.2, act: 'talk' })}
        ${escribe({ ...marielaNina, x: 420, y: 458, s: 1.05 })}
        <rect x="318" y="412" width="204" height="9" rx="3" fill="#a0662f"/><rect x="326" y="421" width="188" height="14" fill="#8b5a2b"/><rect x="332" y="435" width="8" height="44" fill="#7a4f28"/><rect x="500" y="435" width="8" height="44" fill="#7a4f28"/>
        ${at(352, 413, 1, libroAbierto(24, '#e11d48'))}
        ${at(482, 413, 1, libroAbierto(20, '#2563eb'))}
        ${[[566, 478, '#e11d48'], [588, 470, '#f59e0b'], [610, 480, '#a855f7'], [548, 470, '#fb7185']].map(([x, y, c], i) => at(x, y, 0.9, flor(c), 'a-sway', delay(-i * 0.7))).join('')}
        ${at(590, 380, 1, mariposa('#f59e0b'), 'a-bob')}
        ${at(690, 458, 0.85, garza)}${at(744, 440, 0.75, garza, 'a-bob', delay(-1))}
        ${grass(440, 18, '#5e9e46', 0, 560)}`,
      story: [
        // 0 · Leer: Mariela levanta un libro grande y de sus páginas salen volando letras, una estrella y un pajarito
        ({ at }) => {
          const letra = (t, c) => `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="36" fill="${c}" stroke="#fff" stroke-width="5" stroke-linejoin="round" paint-order="stroke">${t}</text>`;
          const salen = [['A', 300, 300, '#e11d48'], ['b', 352, 250, '#2563eb'], ['c', 500, 290, '#16a34a']];
          return `
          ${at(420, 428, 1, libroAbierto(50, '#e11d48'), 's-up', delay(0.2))}
          ${salen.map(([t, x, y, c], i) => at(x, y, 1, letra(t, c), 'st-move', `--dx:${420 - x}px;--dy:${400 - y}px;--s0:.2;animation-duration:1.1s;${delay(0.9 + i * 0.4)}`)).join('')}
          ${at(250, 262, 1.6, '<path d="M0,-9 L2.6,-3 L9,-2.6 L4,1.6 L5.6,8 L0,4.6 L-5.6,8 L-4,1.6 L-9,-2.6 L-2.6,-3Z" fill="#fbbf24" stroke="#fff" stroke-width="1.5"/>', 'st-move', `--dx:170px;--dy:138px;--s0:.2;animation-duration:1.1s;${delay(2.1)}`)}
          ${at(548, 236, 1.6, at(0, 0, 1, '<path d="M-9,0 Q-4.5,-6 0,0 Q4.5,-6 9,0" fill="none" stroke="#334155" stroke-width="2.6" stroke-linecap="round"/>', 'a-flap'), 'st-move', `--dx:-128px;--dy:164px;--s0:.2;animation-duration:1.3s;${delay(2.5)}`)}
          ${label(330, 222, '¡Le gustaba leer!', 3.4, '#be123c', 22)}`;
        },
        // 1 · Escribir: el cuaderno se ve en grande y el lápiz de Mariela escribe «Mariela», «a e i o u» y «mi llano»
        ({ at }) => {
          const lines = [['Mariela', 20], ['a e i o u', 17], ['mi llano', 17]];
          return `
          ${at(500, 230, 1, hoja(124, 150), 's-in')}
          ${lines.map(([t, sz], i) => at(0, 0, 1, txt(526, 270 + i * 32, t, sz, '#1e3a8a', 600, 'start'), 'st-reveal', delay(0.7 + i * 1.1))).join('')}
          ${at(526, 274, 1, lapiz(1.5, 28), 'st-write3', '--w1:76px;--w2:72px;--w3:68px;animation-delay:.7s')}
          ${label(392, 222, '¡Le gustaba escribir!', 3.8, '#1d4ed8', 21)}`;
        },
        // 2 · Historias: la abuela le cuenta un cuento a Mariela y en el globo aparecen una canoa en el río, el sol y la luna
        ({ at }) => `
          ${at(0, 0, 1, globo(110, 160, 290, 136, 262, 322), 's-in', delay(0.2))}
          ${at(0, 0, 1, txt(255, 188, 'Había una vez…', 17, '#7c2d12', 600), 'st-reveal', delay(0.7))}
          ${at(172, 258, 1.4, '<path d="M-36,10 q9,-4 18,0 t18,0 t18,0 t18,0" stroke="#3b9ad9" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M-26,0 L26,0 L18,9 L-18,9Z" fill="#8b5a2b"/><path d="M-4,0 V-26 L14,-6Z" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>', 's-in', delay(1.6))}
          ${at(262, 244, 1.3, '<circle r="16" fill="#fbbf24"/><g stroke="#f59e0b" stroke-width="3" stroke-linecap="round">' + [0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<path d="M0,-21 V-27" transform="rotate(${a})"/>`).join('') + '</g><circle cx="-5" cy="-3" r="2" fill="#7c2d12"/><circle cx="5" cy="-3" r="2" fill="#7c2d12"/><path d="M-6,5 Q0,10 6,5" stroke="#7c2d12" stroke-width="2" fill="none"/>', 's-in', delay(2.4))}
          ${at(346, 246, 1.3, '<circle r="18" fill="#fde68a" stroke="#eab308" stroke-width="1.5"/><circle cx="9" cy="-5" r="15" fill="#fff"/><path d="M22,-12 l2,4 l4,1 l-3,3 l1,4 l-4,-2 l-4,2 l1,-4 l-3,-3 l4,-1Z" fill="#fde047"/>', 's-in', delay(3.2))}
          ${[0, 0.5].map((d) => at(450 + d * 20, 316, 1.2, corazon(), 'a-rise', `animation-duration:2.2s;${delay(3.8 + d)}`)).join('')}
          ${label(176, 388, 'Historias', 4.2, '#7c2d12', 21)}`,
        // 3 · La naturaleza: brota una flor grande, una mariposa llega a ella y una garza levanta el vuelo sobre el río
        ({ at }) => `
          ${at(0, 0, 1, '<path d="M548,446 Q590,432 632,446Z" fill="#7cbf5c"/>', 's-fade')}
          ${at(590, 442, 1.9, flor('#ec4899', 40), 's-grow', `animation-duration:1.6s;${delay(0.3)}`)}
          ${at(600, 328, 1.3, mariposa('#8b5cf6'), 'st-move', `--dx:-168px;--dy:-36px;animation-duration:2.2s;${delay(1.4)}`)}
          ${at(560, 262, 1.1, garzaVuela, 'st-move', `--dx:130px;--dy:190px;--s0:.6;animation-duration:2.6s;${delay(1.8)}`)}
          ${[[540, 330, 3.2], [650, 310, 3.5], [620, 400, 3.8]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fde047', 1.4), 's-in', delay(d))).join('')}
          ${label(520, 228, '¡La naturaleza!', 4, '#166534', 22)}`,
      ],
    },

    // ====================== Cuando creció — la sala de noticias y la clase de lectura ======================
    crecio: {
      hs: [[238, 398], [352, 282], [696, 446]],
      svg: () => `<defs>${lin('cr-win', [[0, '#9fd3f7'], [1, '#e0f4ff']])}</defs>
        <rect width="402" height="500" fill="#fbe7c6"/><rect x="402" width="398" height="500" fill="#e2f4e3"/>
        <g stroke="#f3d6a8" stroke-width="2">${[30, 90, 150, 210, 270, 330].map((x) => `<path d="M${x},0 V440"/>`).join('')}</g>
        <rect y="440" width="402" height="60" fill="#c08a5a"/><rect x="402" y="440" width="398" height="60" fill="#b9895e"/>
        <g stroke="#a06d42" stroke-width="2">${[460, 480].map((y) => `<path d="M0,${y} H800"/>`).join('')}</g>
        <rect x="392" width="18" height="500" fill="#e8c99a"/><rect x="408" width="4" height="500" fill="#000" opacity=".08"/>
        <rect x="26" y="66" width="104" height="104" rx="4" fill="url(#cr-win)" stroke="#8b5a2b" stroke-width="6"/><path d="M78,66 V170 M26,118 H130" stroke="#8b5a2b" stroke-width="4"/>
        ${palm(108, 168, 0.5, -1, 8)}
        <circle cx="236" cy="62" r="24" fill="#fff" stroke="#7a4f28" stroke-width="5"/>${at(236, 62, 1, '<path d="M0,0 V-15" stroke="#334155" stroke-width="3" stroke-linecap="round"/>', 'a-spin')}<path d="M236,62 L247,62" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
        <rect x="150" y="108" width="190" height="104" rx="6" fill="#d6a26b" stroke="#a0662f" stroke-width="4"/>
        ${at(160, 118, 0.52, periodico(150, 108, 'NOTICIAS'))}${at(250, 122, 0.5, hojaPoema(96, 118))}${at(302, 120, 0.42, periodico(80, 90, 'HOY'))}
        <circle cx="210" cy="120" r="4" fill="#e11d48"/><circle cx="274" cy="124" r="4" fill="#2563eb"/><circle cx="318" cy="122" r="4" fill="#16a34a"/>
        <rect x="292" y="28" width="94" height="28" rx="8" fill="#7f1d1d"/>${at(306, 42, 1, '<circle r="6" fill="#ef4444"/>', 'a-glow')}${txt(348, 48, 'RADIO', 15, '#fecaca')}
        ${at(352, 470, 1, microfono)}
        ${person({ ...mariela, x: 150, y: 470, s: 1.25, arm: 'out', act: 'press' })}
        <rect x="56" y="418" width="270" height="9" rx="3" fill="#8b5a2b"/><rect x="64" y="427" width="254" height="44" fill="#a0662f"/><path d="M78,442 H304" stroke="#8b5a2b" stroke-width="2"/>
        ${at(230, 420, 1, maquina)}<rect x="212" y="358" width="36" height="22" fill="#fff"/><path d="M218,366 h22 M218,372 h16" stroke="#94a3b8" stroke-width="1.5"/>
        <g><rect x="276" y="410" width="44" height="8" rx="1.5" fill="#f8f5ee" stroke="#9ca3af"/><rect x="278" y="403" width="42" height="8" rx="1.5" fill="#f8f5ee" stroke="#9ca3af"/><rect x="275" y="396" width="44" height="8" rx="1.5" fill="#f8f5ee" stroke="#9ca3af"/></g>
        <rect x="432" y="76" width="356" height="226" rx="8" fill="#8b5a2b"/><rect x="442" y="86" width="336" height="206" rx="4" fill="#2f5d46"/>
        <g opacity=".93">${txt(468, 136, 'a  e  i  o  u', 32, '#fff', 600, 'start')}${txt(468, 182, 'ma  me  mi  mo  mu', 24, '#fde68a', 600, 'start')}</g>
        <rect x="448" y="292" width="324" height="8" rx="2" fill="#a0662f"/><rect x="700" y="287" width="22" height="5" rx="2" fill="#fff"/>
        ${person({ ...gente[0], x: 520, y: 476, s: 1.3, act: 'read', item: 'book', arm: 'out', itemColor: '#e11d48' })}
        ${person({ ...gente[3], x: 638, y: 476, s: 1.3, act: 'read', item: 'book', arm: 'out', itemColor: '#2563eb' })}
        ${person({ ...gente[4], x: 750, y: 476, s: 1.3, act: 'raise', arm: 'up' })}
        ${pupitre(530, 430, 92)}${pupitre(648, 430, 92)}${pupitre(752, 430, 80)}`,
      story: [
        // 0 · Periodista: Mariela teclea, la hoja sube en la máquina (¡clac, clac!) y sale volando un periódico con las noticias
        ({ at }) => `
          ${at(0, 0, 1, '<rect x="212" y="286" width="36" height="74" fill="#fff" stroke="#cbd5e1"/>', 's-grow', `animation-duration:1.6s;${delay(0.2)}`)}
          ${[0, 1, 2, 3].map((i) => at(0, 0, 1, `<rect x="217" y="${296 + i * 12}" width="${i % 2 ? 18 : 26}" height="3" fill="#334155"/>`, 's-fade', delay(0.6 + i * 0.35))).join('')}
          ${[[290, 340, 0.5], [178, 296, 1.1], [292, 308, 1.7]].map(([x, y, d]) => at(x, y, 1, at(0, 0, 1, txt(0, 0, '¡clac!', 15, '#7c2d12'), 's-in', delay(d)), 's-out', delay(d + 0.6))).join('')}
          ${at(298, 200, 1, periodico(182, 124, 'EL PERIÓDICO'), 'st-move', `--dx:-150px;--dy:100px;--s0:.15;animation-duration:1.2s;${delay(2.3)}`)}
          ${label(390, 354, '¡Periodista!', 3.6, '#c2410c', 24)}`,
        // 1 · ¿Qué hace una periodista?: aparece un televisor y en él Mariela entrevista con su micrófono a un campesino: pregunta, escucha y escribe
        ({ at, person, lin }) => {
          const mic = '<g transform="rotate(60)"><rect x="-4.5" y="-14" width="9" height="16" rx="4.5" fill="#1f2937"/><rect x="-1.5" y="1" width="3" height="12" fill="#6b7280"/></g>';
          const pantalla = `<defs>${lin('st-cr-tv', [[0, '#9fd3f7'], [1, '#fff3d6']])}<clipPath id="st-cr-clip"><rect x="-120" y="-76" width="240" height="152" rx="10"/></clipPath></defs>
            <g clip-path="url(#st-cr-clip)"><rect x="-120" y="-76" width="240" height="152" fill="url(#st-cr-tv)"/><path d="M-120,30 Q0,18 120,28 L120,76 L-120,76Z" fill="#9fd585"/>
              ${at(96, 34, 0.5, '<path d="M0,0 Q4,-60 10,-120" stroke="#8b5e34" stroke-width="11" fill="none"/>' + [-170, -140, -110, -70, -35, 0].map((a, i) => `<path d="M10,-120 Q46,-144 90,-114 Q50,-124 10,-120Z" fill="${i % 2 ? '#2f9e52' : '#3cb963'}" transform="rotate(${a} 10 -120)"/>`).join(''))}
              ${person({ ...mariela, x: -50, y: 66, s: 0.8, arm: 'out', act: 'idle' })}${at(-50 + 26, 66 - 42, 0.8, mic)}
              ${person({ ...gente[2], x: 44, y: 66, s: 0.8, act: 'talk', flip: true })}
              ${at(-30, -50, 1, at(0, 0, 1, globo(-22, -20, 44, 30, -14, 18) + txt(0, 2, '¿?', 18, '#1d4ed8'), 's-in', delay(1.2)), 's-out', delay(2.4))}
              ${at(0, 0, 1, '<g fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"><path d="M14,4 q6,6 0,12"/><path d="M20,0 q10,10 0,20"/></g>', 'a-pulse')}
              ${at(-104, -66, 1, '<rect width="66" height="18" rx="5" fill="#dc2626"/>' + txt(33, 13.5, 'EN  VIVO', 11, '#fff'), 'a-glow')}</g>`;
          return `
          ${at(375, 262, 1, `<rect x="-136" y="-92" width="272" height="184" rx="20" fill="#374151"/><path d="M-30,-92 L-58,-116 M30,-92 L58,-116" stroke="#4b5563" stroke-width="4" stroke-linecap="round"/><circle cx="-58" cy="-116" r="5" fill="#4b5563"/><circle cx="58" cy="-116" r="5" fill="#4b5563"/>${pantalla}`, 's-in', delay(0.2))}
          ${label(272, 386, '¡Pregunta!', 1.4, '#1d4ed8', 20)}
          ${label(378, 386, '¡Escucha!', 2.6, '#7c3aed', 20)}
          ${label(482, 386, '¡Escribe!', 3.8, '#c2410c', 20)}
          ${at(482, 336, 1, `<g transform="rotate(-8)"><rect x="-16" y="-20" width="32" height="40" rx="3" fill="#fffdf6" stroke="#d6c7a8" stroke-width="1.5"/>${renglones(-11, -10, 22, 4, 7, '#2563eb')}</g>`, 's-in', delay(4))}`;
        },
        // 2 · Enseñó a leer: Mariela entra a la clase, señala el tablero y aparece «m + a = ma»; los alumnos leen y uno dice «¡ma-má!»
        ({ at, person }) => {
          const tiza = [['m', 492], ['+', 528], ['a', 562], ['=', 598], ['ma', 646]];
          return `
          ${tiza.map(([t, x], i) => at(0, 0, 1, txt(x, 278, t, 30, '#fde047', 600), 's-in', delay(1 + i * 0.4))).join('')}
          ${at(0, 0, 1, person({ ...mariela, x: 440, y: 456, s: 1.2, act: 'point', item: 'stick', itemColor: '#fff' }), 's-from-l', delay(0.1))}
          ${at(0, 0, 1, globo(578, 296, 92, 36, 618, 346) + txt(624, 320, '¡ma-má!', 17, '#be185d'), 's-in', delay(3.3))}
          ${[[700, 330, 3.6], [560, 334, 3.9]].map(([x, y, d]) => at(x, y, 0.9, corazon(), 'a-rise', `animation-duration:2.2s;${delay(d)}`)).join('')}
          ${label(610, 244, '¡A leer y escribir!', 2.6, '#166534', 22)}`;
        },
      ],
    },
  };
})());
