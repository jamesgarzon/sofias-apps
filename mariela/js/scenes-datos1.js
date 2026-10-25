// Escenas de los datos (Profesión, Estudios) — ver la cabecera de scenes.js (reglas, encuadre de las historias y piezas compartidas en SCN).
Object.assign(window.APP_SCENES, (() => {
  const { lin, at, delay, sun, cloud, birds, tree, palm, person, sparkle } = KitSVG;
  const { label, mariela, gente, sofia, maceta, libroAbierto, hoja } = SCN;

  // ---------- piezas propias de estas escenas ----------
  const txt = (x, y, t, size = 16, fill = '#3a2216', weight = 700, anchor = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Fredoka, sans-serif" font-weight="${weight}" font-size="${size}" fill="${fill}">${t}</text>`;
  // Lápiz con la punta en (0,0), inclinado (rot) para no tapar lo escrito.
  const lapiz = (s = 1, rot = -25) => `<g transform="scale(${s}) rotate(${rot})"><rect x="-3" y="-30" width="6" height="22" fill="#facc15" stroke="#ca8a04" stroke-width="1"/><rect x="-3" y="-35" width="6" height="5" rx="1.5" fill="#f472b6"/><rect x="-3" y="-31" width="6" height="2" fill="#a1a1aa"/><path d="M-3,-8 L3,-8 L0,0Z" fill="#f6d1a3"/><path d="M-1.2,-3 L1.2,-3 L0,0Z" fill="#3f3f46"/></g>`;
  // Persona con un objeto en la mano derecha (brazo 'out') que se mueve con el mismo brazo: mismo pivote del hombro y
  // misma animación (pa-<arm>, delay 0). `obj` va en coordenadas de la persona, con la mano en (32,-52).
  const conObjeto = (o, act, armCls, obj) => `${person({ ...o, arm: 'out', act, delay: 0 })}<g transform="translate(${o.x} ${o.y}) scale(${o.flip ? -o.s : o.s} ${o.s})"><g transform="translate(13 -63)"><g class="pa ${armCls}" style="animation-delay:0s"><g transform="translate(-13 63)">${obj}<circle cx="32" cy="-52" r="4.6" fill="${o.skin}"/></g></g></g></g>`;
  // Escribe con lápiz (act 'read': inclina la cabeza; el lápiz tiembla como escribiendo).
  const escribe = (o) => conObjeto(o, 'read', 'pa-read-arm', at(38, -45, 1, lapiz(1), 'st-scribble'));
  // Micrófono de mano (la mano en 32,-52) con ondas de voz que laten.
  const microMano = `<path d="M31,-50 L37,-74" stroke="#1f2937" stroke-width="5" stroke-linecap="round"/><circle cx="38.5" cy="-79" r="7" fill="#374151"/><path d="M33,-80 h11 M34,-76 h9" stroke="#9ca3af" stroke-width="1.4"/>
    ${[0, 1, 2].map((i) => at(52 + i * 7, -86 - i * 3, 1, `<path d="M0,-${6 + i * 3} Q${5 + i * 2},0 0,${6 + i * 3}" stroke="#f59e0b" stroke-width="2.6" fill="none" stroke-linecap="round"/>`, 'a-pulse', delay(i * 0.25))).join('')}`;
  // Hoja suelta con renglones (centro en 0,0), para las páginas que vuelan al libro.
  const pagina = `<rect x="-13" y="-17" width="26" height="34" rx="2" fill="#fffdf6" stroke="#d6c7a8" stroke-width="1.5"/><path d="M-8,-9 h16 M-8,-3 h16 M-8,3 h12 M-8,9 h14" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round"/>`;
  // Periódico abierto (esquina superior izquierda en 0,0).
  const periodico = (w = 150, h = 108, head = 'NOTICIAS') => `<rect x="4" y="4" width="${w}" height="${h}" rx="3" fill="#000" opacity=".12"/><rect width="${w}" height="${h}" rx="3" fill="#f8f5ee" stroke="#9ca3af" stroke-width="1.5"/>
    ${txt(w / 2, 22, head, 19, '#1f2937')}<path d="M8,30 H${w - 8}" stroke="#1f2937" stroke-width="2"/>
    <rect x="8" y="37" width="${w * 0.44}" height="${h - 46}" fill="#bfe3ff"/><circle cx="${8 + w * 0.3}" cy="52" r="7" fill="#fbbf24"/><path d="M8,${h - 9} L${8 + w * 0.14},${h - 28} L${8 + w * 0.26},${h - 18} L${8 + w * 0.44},${h - 32} L${8 + w * 0.44},${h - 9}Z" fill="#6fae5a"/>
    <g stroke="#94a3b8" stroke-width="2.4" stroke-linecap="round">${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${w * 0.54},${42 + i * 10} H${w - 9}"/>`).join('')}</g>`;
  // Globo de diálogo: caja (x, y, w, h) con la colita hacia (tx, ty).
  const globo = (x, y, w, h, tx, ty) => `<path d="M${x + 16},${y} H${x + w - 16} Q${x + w},${y} ${x + w},${y + 16} V${y + h - 16} Q${x + w},${y + h} ${x + w - 16},${y + h} H${tx + 22} L${tx},${ty} L${tx + 4},${y + h} H${x + 16} Q${x},${y + h} ${x},${y + h - 16} V${y + 16} Q${x},${y} ${x + 16},${y}Z" fill="#fff" stroke="#d6c7a8" stroke-width="2.5" stroke-linejoin="round"/>`;
  // Flor con tallo (base en 0,0; alto h).
  const flor = (c = '#e11d48', h = 26) => `<path d="M0,0 Q-2,${-h / 2} 0,${-h}" stroke="#15803d" stroke-width="3" fill="none"/><ellipse cx="-6" cy="${-h / 2}" rx="6" ry="3" fill="#22c55e" transform="rotate(-30 -6 ${-h / 2})"/><g transform="translate(0 ${-h})">${[0, 72, 144, 216, 288].map((a) => `<ellipse cy="-6" rx="4.5" ry="6.5" fill="${c}" transform="rotate(${a})"/>`).join('')}<circle r="3.6" fill="#fbbf24"/></g>`;
  const corazon = (c = '#f43f5e') => `<path d="M0,6 C-12,-2 -10,-12 -4,-12 C-1,-12 0,-9 0,-8 C0,-9 1,-12 4,-12 C10,-12 12,-2 0,6Z" fill="${c}"/>`;
  // Carpa del festival (base centrada en 0,0; ancho ≈ 100), con techo a rayas.
  const carpa = (c = '#0ea5e9', h = 82) => `<rect x="-44" y="${-h * 0.55}" width="88" height="${h * 0.55}" fill="#fffdf6" stroke="#d6c7a8" stroke-width="1.5"/><path d="M-14,0 V${-h * 0.42} H14 V0Z" fill="#fde68a"/>
    <path d="M-52,${-h * 0.52} L0,${-h} L52,${-h * 0.52}Z" fill="${c}"/>${[-30, -10, 10, 30].map((x) => `<path d="M${x * 0.3},${-h + 6} L${x},${-h * 0.53}" stroke="#fff" stroke-width="5" opacity=".75"/>`).join('')}
    <path d="M-52,${-h * 0.52} Q-39,${-h * 0.42} -26,${-h * 0.52} Q-13,${-h * 0.42} 0,${-h * 0.52} Q13,${-h * 0.42} 26,${-h * 0.52} Q39,${-h * 0.42} 52,${-h * 0.52}" fill="${c}"/><path d="M0,${-h} V${-h - 12}" stroke="#7a4f28" stroke-width="2"/><path d="M0,${-h - 12} L12,${-h - 8} L0,${-h - 4}Z" fill="#f43f5e"/>`;
  // Banderines de colores colgados de una cuerda curva de (x0,y0) a (x1,y1), bajando dip en el medio.
  const banderines = (x0, y0, x1, y1, dip = 30, n = 14) => {
    const pts = [...Array(n)].map((_, i) => { const t = (i + 0.5) / n, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t + dip * 4 * t * (1 - t); return [x, y]; });
    const cols = ['#e11d48', '#f59e0b', '#16a34a', '#0ea5e9', '#a855f7', '#f97316'];
    return `<path d="M${x0},${y0} Q${(x0 + x1) / 2},${(y0 + y1) / 2 + dip * 2} ${x1},${y1}" stroke="#7a4f28" stroke-width="1.6" fill="none"/>${pts.map(([x, y], i) => `<path d="M${(x - 8).toFixed(1)},${(y - 1).toFixed(1)} L${(x + 8).toFixed(1)},${(y - 1).toFixed(1)} L${x.toFixed(1)},${(y + 16).toFixed(1)}Z" fill="${cols[i % cols.length]}"/>`).join('')}`;
  };
  // Bombillos de colores en una cuerda (para la tarima).
  const bombillos = (x0, y0, x1, y1, dip = 18, n = 9) => `<path d="M${x0},${y0} Q${(x0 + x1) / 2},${y0 + dip * 2} ${x1},${y1}" stroke="#374151" stroke-width="1.5" fill="none"/>${[...Array(n)].map((_, i) => { const t = (i + 0.5) / n, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t + dip * 4 * t * (1 - t) * 0.98; return `<circle cx="${x.toFixed(1)}" cy="${(y + 5).toFixed(1)}" r="4.2" fill="${['#fde047', '#fb7185', '#7dd3fc', '#86efac'][i % 4]}" class="a-twinkle" style="${delay((i * 0.3) % 1.5)}"/>`; }).join('')}`;

  // ---------- Profesión: festival de lectura en la plaza ----------
  // Fondo limpio (cielo, banderines, casas coloniales y piso de la plaza); las historias lo repintan para dejar el escenario despejado.
  const pfBase = () => {
    const casas = [[0, 96, 88, '#fde68a'], [96, 104, 72, '#bfdbfe'], [200, 92, 96, '#fecaca'], [292, 110, 80, '#c7f0d0'], [402, 96, 92, '#fbcfe8'], [498, 104, 74, '#fde68a'], [602, 96, 98, '#bfdbfe'], [698, 102, 82, '#fed7aa']];
    return `<rect width="800" height="500" fill="url(#pf-sky)"/>
      ${casas.map(([x, w, h, c]) => `<rect x="${x}" y="${270 - h}" width="${w}" height="${h}" fill="${c}"/><path d="M${x - 4},${272 - h} L${x + w + 4},${272 - h} L${x + w},${262 - h} L${x},${262 - h}Z" fill="#c2410c"/>
        ${[0, 1].map((i) => `<rect x="${x + 16 + i * (w - 48)}" y="${292 - h}" width="16" height="22" rx="2" fill="#6b8fb3"/><rect x="${x + 13 + i * (w - 48)}" y="${314 - h}" width="22" height="4" fill="#7a4f28"/>`).join('')}
        <path d="M${x + w / 2 - 11},270 V${248 - Math.min(10, h - 70)} Q${x + w / 2},${236 - Math.min(10, h - 70)} ${x + w / 2 + 11},${248 - Math.min(10, h - 70)} V270Z" fill="#8b5a2b"/>`).join('')}
      <path d="M0,268 H800 V500 H0Z" fill="url(#pf-floor)"/>
      <g stroke="#c9a173" stroke-width="1.5" opacity=".55">${[300, 340, 390, 450].map((y) => `<path d="M0,${y} H800"/>`).join('')}${[...Array(9)].map((_, i) => `<path d="M${-120 + i * 130},500 L${170 + i * 70},268"/>`).join('')}</g>
      ${banderines(-10, 26, 810, 34, 22)}`;
  };
  const pfDefs = () => `<defs>${lin('pf-sky', [[0, '#8fd3ff'], [0.6, '#dff2ff'], [1, '#fff3dc']])}${lin('pf-floor', [[0, '#f5e1bf'], [1, '#e2bf8c']])}${lin('pf-curtain', [[0, '#7c3aed'], [1, '#5b21b6']], 1, 0)}</defs>`;
  // Tarima del festival: postes, letrero, bombillos y telón (centro x = (x0 + x1) / 2).
  const tarima = (x0, x1, top, floor, letrero = true) => `<rect x="${x0 + 6}" y="${top + 38}" width="${x1 - x0 - 12}" height="${floor - top - 38}" fill="url(#pf-curtain)"/>
    <g fill="#c4b5fd" opacity=".35">${[...Array(Math.floor((x1 - x0 - 12) / 22))].map((_, i) => `<rect x="${x0 + 12 + i * 22}" y="${top + 38}" width="7" height="${floor - top - 38}"/>`).join('')}</g>
    <rect x="${x0}" y="${top + 34}" width="8" height="${floor - top - 30}" fill="#7a4f28"/><rect x="${x1 - 8}" y="${top + 34}" width="8" height="${floor - top - 30}" fill="#7a4f28"/>
    <rect x="${x0 - 6}" y="${floor}" width="${x1 - x0 + 12}" height="12" fill="#a0662f"/><rect x="${x0 - 2}" y="${floor + 12}" width="${x1 - x0 + 4}" height="10" fill="#7a4f28"/>
    ${letrero ? `<rect x="${x0 - 4}" y="${top}" width="${x1 - x0 + 8}" height="38" rx="8" fill="#e11d48" stroke="#9f1239" stroke-width="2"/>${txt((x0 + x1) / 2, top + 26, 'Festival de lectura', 20, '#fff')}` : ''}
    ${bombillos(x0 + 4, top + 44, x1 - 4, top + 44, 10)}`;
  // Mesa de escribir (tapa en y; de x0 a x1).
  const mesa = (x0, x1, y, h = 58) => `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="10" rx="3" fill="#a0662f"/><rect x="${x0 + 8}" y="${y + 10}" width="8" height="${h}" fill="#7a4f28"/><rect x="${x1 - 16}" y="${y + 10}" width="8" height="${h}" fill="#7a4f28"/>`;
  // Atril con un tablero (esquina superior izquierda en x,y; ancho w, alto h; patas hasta y + h + legs).
  const atril = (x, y, w, h, legs = 56) => `<path d="M${x + w * 0.2},${y + h} L${x + w * 0.12},${y + h + legs} M${x + w * 0.8},${y + h} L${x + w * 0.88},${y + h + legs} M${x + w / 2},${y + h} L${x + w / 2},${y + h + legs - 8}" stroke="#7a4f28" stroke-width="5" stroke-linecap="round"/>
    <rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 8}" rx="5" fill="#a16207"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#fffdf6"/>`;
  // Kiosco de periódicos (de x0 a x1; techo en top, mostrador hasta el piso en floor).
  const kiosco = (x0, x1, top, floor) => `<rect x="${x0 + 6}" y="${top + 20}" width="8" height="${floor - top - 20}" fill="#64748b"/><rect x="${x1 - 14}" y="${top + 20}" width="8" height="${floor - top - 20}" fill="#64748b"/>
    <rect x="${x0 + 6}" y="${top + 20}" width="${x1 - x0 - 12}" height="${floor - top - 20}" fill="#e0f2fe" opacity=".5"/>
    <path d="M${x0 - 8},${top + 24} L${x0 + 6},${top} L${x1 - 6},${top} L${x1 + 8},${top + 24}Z" fill="#0ea5e9"/>${[...Array(7)].map((_, i) => `<path d="M${x0 + 6 + i * ((x1 - x0 - 12) / 7)},${top} l${-6 + i * 2},24 h${(x1 - x0 - 12) / 14} l${4 - i * 1.4},-24Z" fill="#fff" opacity=".85"/>`).join('')}
    <path d="M${x0 + 10},${top + 36} H${x1 - 10}" stroke="#475569" stroke-width="1.5"/>
    ${[0, 1, 2].map((i) => at(x0 + 18 + i * ((x1 - x0 - 36) / 3), top + 36, 1, `<rect width="${(x1 - x0 - 48) / 3}" height="38" rx="2" fill="#f8f5ee" stroke="#9ca3af"/><rect x="4" y="5" width="${(x1 - x0 - 48) / 3 - 8}" height="5" fill="#1f2937"/><path d="M4,16 h${(x1 - x0 - 48) / 3 - 8} M4,22 h${(x1 - x0 - 48) / 3 - 14} M4,28 h${(x1 - x0 - 48) / 3 - 10}" stroke="#94a3b8" stroke-width="2"/>`, 'a-sway', delay(-i * 0.7))).join('')}
    <rect x="${x0}" y="${floor - 62}" width="${x1 - x0}" height="62" rx="4" fill="#0284c7"/><rect x="${x0 - 4}" y="${floor - 66}" width="${x1 - x0 + 8}" height="8" rx="3" fill="#075985"/>
    ${txt((x0 + x1) / 2, floor - 26, 'PRENSA', 18, '#fff')}`;
  // Alfombra de los cuentos (centro en 0,0).
  const alfombra = (rx = 130, ry = 24) => `<ellipse rx="${rx}" ry="${ry}" fill="#c4b5fd"/><ellipse rx="${rx - 14}" ry="${ry - 6}" fill="none" stroke="#a78bfa" stroke-width="3" stroke-dasharray="10 8"/>`;

  // ---------- Estudios: la Universidad Distrital, en Bogotá ----------
  // Cerros orientales con Monserrate en la punta, la universidad de ladrillo, el prado y el camino a la entrada.
  const esBase = () => `<rect width="800" height="500" fill="url(#es-sky)"/>
    ${cloud(150, 66, 0.9, 0.95, 'a-drift', 0, '#f8fafc')}${cloud(470, 48, 0.65, 0.9, 'a-drift2', -4, '#f1f5f9')}
    <path d="M0,200 L70,160 L150,178 L240,128 L330,166 L430,116 L530,146 L630,84 L720,124 L800,108 L800,270 L0,270Z" fill="#8fb39b"/>
    <path d="M0,232 L100,196 L200,214 L300,186 L410,210 L520,184 L640,206 L800,188 L800,280 L0,280Z" fill="#5f8f6e"/>
    <g transform="translate(630 84)"><rect x="-11" y="-14" width="22" height="14" fill="#fff"/><path d="M-13,-13 L0,-22 L13,-13Z" fill="#e2e8f0"/><rect x="-10" y="-30" width="7" height="17" fill="#fff"/><path d="M-11,-30 L-6.5,-37 L-2,-30Z" fill="#e2e8f0"/><path d="M-6.5,-41 V-37 M-8.5,-39 H-4.5" stroke="#94a3b8" stroke-width="1.3"/></g>
    ${birds(120, 3, '#475569', 30, -8, 0.8)}
    <rect y="326" width="800" height="174" fill="url(#es-lawn)"/>
    <rect x="140" y="214" width="76" height="116" fill="#a8483a"/><rect x="584" y="214" width="76" height="116" fill="#a8483a"/>
    ${[150, 178, 594, 622].map((x) => [228, 262, 296].map((y) => `<rect x="${x}" y="${y}" width="18" height="22" rx="1.5" fill="#cfe3f5" stroke="#f5efe6" stroke-width="2"/>`).join('')).join('')}
    <rect x="208" y="170" width="384" height="160" fill="url(#es-brick)"/><rect x="200" y="164" width="400" height="10" fill="#f5efe6"/><rect x="200" y="326" width="400" height="6" fill="#f5efe6"/>
    <g stroke="#9c4532" stroke-width="1" opacity=".5">${[186, 200, 214, 228, 242, 256, 270, 284, 298, 312].map((y) => `<path d="M208,${y} H592"/>`).join('')}</g>
    ${[226, 262, 298, 470, 506, 542].map((x) => [244, 284].map((y) => `<rect x="${x}" y="${y}" width="24" height="28" rx="2" fill="#cfe3f5" stroke="#f5efe6" stroke-width="2.5"/><path d="M${x + 12},${y} V${y + 28}" stroke="#f5efe6" stroke-width="2"/>`).join('')).join('')}
    <rect x="298" y="186" width="204" height="48" rx="6" fill="#fff7ea" stroke="#7c2d12" stroke-width="2.5"/>${txt(400, 207, 'UNIVERSIDAD DISTRITAL', 15, '#7c2d12')}${txt(400, 225, 'Francisco José de Caldas', 11.5, '#9a3412', 600)}
    <rect x="352" y="246" width="96" height="84" fill="#f5efe6"/><rect x="360" y="254" width="80" height="76" fill="#1e3a5f"/>
    <path d="M392,174 V140" stroke="#64748b" stroke-width="2.5"/><rect x="393" y="140" width="26" height="9" fill="#facc15"/><rect x="393" y="149" width="26" height="9" fill="#dc2626"/>
    <path d="M336,330 H464 L472,340 H328Z" fill="#e7e5e4"/><path d="M328,340 H472 L478,348 H322Z" fill="#d6d3d1"/>
    <path d="M340,348 L460,348 L520,500 L280,500Z" fill="#e7dccb"/>
    ${tree(40, 334, 0.82)}${tree(756, 334, 0.78, '#2f8a43', '#4fae55', -1.2)}`;
  // Puertas de vidrio de la entrada (encima del hueco oscuro); en la historia se abren.
  const puertas = `<rect x="360" y="254" width="40" height="76" fill="#bfe3ff" stroke="#94a3b8" stroke-width="2"/><rect x="400" y="254" width="40" height="76" fill="#bfe3ff" stroke="#94a3b8" stroke-width="2"/><path d="M394,290 v8 M406,290 v8" stroke="#475569" stroke-width="2.5" stroke-linecap="round"/><path d="M366,262 l12,-6 M406,262 l12,-6" stroke="#fff" stroke-width="3" opacity=".7"/>`;
  const esDefs = () => `<defs>${lin('es-sky', [[0, '#9cc3e6'], [0.6, '#dfeaf5'], [1, '#f2f6fb']])}${lin('es-lawn', [[0, '#a3d97f'], [1, '#6fb35a']])}${lin('es-brick', [[0, '#bf5b41'], [1, '#a14a35']])}</defs>`;
  // Pizarra verde en su atril (esquina superior izquierda en x,y).
  const pizarra = (x, y, w, h, legs = 46) => `<path d="M${x + w * 0.22},${y + h} L${x + w * 0.14},${y + h + legs} M${x + w * 0.78},${y + h} L${x + w * 0.86},${y + h + legs}" stroke="#7a4f28" stroke-width="5" stroke-linecap="round"/>
    <rect x="${x - 5}" y="${y - 5}" width="${w + 10}" height="${h + 10}" rx="5" fill="#a16207"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#1f513a"/><rect x="${x + w - 26}" y="${y + h - 2}" width="18" height="4" rx="2" fill="#f8fafc"/>`;
  const tiza = (x, y, t, size = 18) => txt(x, y, t, size, '#f8fafc', 600);
  // Libros apilados (base centrada en 0,0).
  const pila = `<rect x="-26" y="-12" width="52" height="12" rx="2" fill="#2563eb"/><rect x="-22" y="-24" width="46" height="12" rx="2" fill="#e11d48"/><rect x="-24" y="-36" width="44" height="12" rx="2" fill="#f59e0b"/><path d="M-20,-6 h40 M-16,-18 h36 M-20,-30 h36" stroke="#fff" stroke-width="1.5" opacity=".6"/>`;
  // Banca del parque (asiento en y; de x0 a x1).
  const banca = (x0, x1, y) => `<rect x="${x0}" y="${y - 30}" width="${x1 - x0}" height="8" rx="3" fill="#a0662f"/><rect x="${x0 + 6}" y="${y - 22}" width="5" height="22" fill="#7a4f28"/><rect x="${x1 - 11}" y="${y - 22}" width="5" height="22" fill="#7a4f28"/>
    <rect x="${x0 - 4}" y="${y}" width="${x1 - x0 + 8}" height="9" rx="3" fill="#b7793f"/><rect x="${x0 + 6}" y="${y + 9}" width="6" height="26" fill="#7a4f28"/><rect x="${x1 - 12}" y="${y + 9}" width="6" height="26" fill="#7a4f28"/>`;
  // Libro abierto que flota con un dibujito en la página derecha (x de la página derecha ≈ +8 … +40).
  const libroCon = (dibujo, c) => `${libroAbierto(42, c)}<g transform="translate(22 -16)">${dibujo}</g>`;
  const castillo = '<rect x="-11" y="-6" width="22" height="16" fill="#a78bfa"/><rect x="-13" y="-14" width="7" height="10" fill="#8b5cf6"/><rect x="6" y="-14" width="7" height="10" fill="#8b5cf6"/><path d="M-3,10 V3 Q0,0 3,3 V10Z" fill="#5b21b6"/><path d="M-10,-14 v-6 l6,3Z" fill="#f43f5e"/>';
  const florcita = `<g transform="translate(0 10) scale(.7)">${flor('#f43f5e', 22)}</g>`;
  const muchas = '<g stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round"><path d="M-12,-10 h24 M-12,-5 h24 M-12,0 h24 M-12,5 h24 M-12,10 h18"/></g>';

  return {
    // ====================== Profesión — un festival de lectura en la plaza ======================
    // Chispas: 0 mesa de la escritora · 1 atril del poema · 2 kiosco de prensa · 3 la ronda de cuentos · 4 la tarima del festival
    profesion: {
      hs: [[120, 380], [250, 272], [690, 300], [450, 474], [535, 214]],
      svg: () => `${pfDefs()}${pfBase()}
        ${sun(84, 74, 26, '#fff6c4', '#ffe9a0')}${cloud(260, 78, 0.75)}${cloud(690, 96, 0.55, 0.9, 'a-drift2', -6)}
        ${tarima(422, 648, 128, 262)}
        ${atril(198, 222, 104, 96)}${txt(250, 244, 'Poema', 15, '#be185d')}<g stroke="#7c3aed" stroke-width="2" fill="none" stroke-linecap="round">${[0, 1, 2, 3].map((i) => `<path d="M214,${262 + i * 14} q5,-4 10,0 t10,0 t10,0 t10,0 t10,0${i % 2 ? '' : ' t10,0 t10,0'}"/>`).join('')}</g>
        ${at(316, 378, 0.8, maceta('#e11d48', '#fb7185'))}
        ${kiosco(618, 764, 238, 404)}
        ${mesa(40, 200, 392)}<g transform="translate(58 392)"><rect x="0" y="-8" width="40" height="8" rx="1" fill="#fffdf6" stroke="#d6c7a8"/><rect x="3" y="-14" width="40" height="6" rx="1" fill="#fffdf6" stroke="#d6c7a8"/><rect x="-1" y="-19" width="40" height="5" rx="1" fill="#fffdf6" stroke="#d6c7a8"/></g>
        ${at(140, 392, 1, libroAbierto(24, '#0d9488'))}${at(186, 392, 1, '<rect x="-7" y="-12" width="14" height="12" rx="3" fill="#1f2937"/><path d="M0,-12 L10,-40" stroke="#7c3aed" stroke-width="2.5"/><path d="M10,-40 q8,-2 6,-14 q-8,6 -6,14Z" fill="#c4b5fd"/>')}
        ${person({ ...gente[3], x: 348, y: 336, s: 0.6, act: 'read', item: 'book', itemColor: '#16a34a' })}
        ${at(452, 460, 1, alfombra(126, 24))}
        ${person({ ...mariela, x: 452, y: 452, s: 0.92, arm: 'out', item: 'book', act: 'talk' })}
        ${person({ ...gente[4], x: 354, y: 478, s: 0.6, act: 'look' })}${person({ ...sofia, x: 548, y: 480, s: 0.6, flip: true, act: 'idle' })}${person({ ...gente[0], x: 600, y: 470, s: 0.55, flip: true, act: 'look' })}
        ${[[300, 158, 0], [372, 96, 1.2], [720, 186, 0.6]].map(([x, y, d]) => sparkle(x, y, d, '#fff6b0', 1.2)).join('')}`,
      story: [
        // 0 · Escritora: Mariela escribe en su mesa y las hojas vuelan, una por una, a un libro abierto: ¡escribe libros!
        ({ at, sparkle }) => `
          ${at(0, 0, 1, pfBase(), 's-fade', 'animation-duration:.5s')}
          ${at(0, 0, 1, mesa(188, 336, 368, 60), 's-fade', 'animation-duration:.5s')}
          ${at(0, 0, 1, '<path d="M200,366 L252,366 L258,360 L206,360Z" fill="#fffdf6" stroke="#d6c7a8"/>', 's-fade', 'animation-duration:.5s')}
          ${at(0, 0, 1, escribe({ ...mariela, x: 160, y: 430, s: 1.2 }), 's-from-l', 'animation-duration:.9s')}
          ${at(392, 302, 1.5, libroAbierto(34, '#0d9488'), 's-in', delay(0.5))}
          ${[0, 1, 2].map((i) => at(392 + (i - 1) * 10, 268, 1, at(0, 0, 1, pagina, 's-out', delay(2 + i * 0.6)), 'st-move', `--dx:${232 - 392 - (i - 1) * 10}px;--dy:${352 - 268}px;--s0:.5;animation-duration:1s;${delay(1.1 + i * 0.6)}`)).join('')}
          ${[[340, 268, 3], [446, 262, 3.2], [400, 230, 3.4]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fbbf24', 1.5), 's-in', delay(d))).join('')}
          ${label(300, 222, '¡Escritora!', 3.2, '#0f766e', 28)}
          ${label(300, 250, 'escribe libros', 3.8, '#7c2d12', 18)}`,
        // 1 · Poeta: en el atril grande aparece un poema verso a verso (¡el comienzo de «Mártires»!) y al pie brotan flores
        ({ at, person }) => `
          ${at(0, 0, 1, pfBase(), 's-fade', 'animation-duration:.5s')}
          ${at(0, 0, 1, atril(292, 168, 232, 152, 58), 's-fade', 'animation-duration:.5s')}
          ${at(0, 0, 1, txt(408, 194, 'Poema', 17, '#be185d'), 's-fade', delay(0.3))}
          ${['Cuando un luchador muere', 'se siembra con él', 'semilla buena.'].map((v, i) => at(0, 0, 1, txt(308, 232 + i * 32, v, 16.5, '#4c1d95', 600, 'start'), 'st-reveal', delay(0.7 + i * 1))).join('')}
          ${person({ ...mariela, x: 256, y: 378, s: 1.12, act: 'paint', itemColor: '#7c3aed' })}
          ${[[352, '#f43f5e'], [404, '#facc15'], [456, '#a855f7'], [508, '#fb923c']].map(([x, c], i) => at(x, 378, 1, flor(c, 30), 's-grow', delay(3.3 + i * 0.25))).join('')}
          ${label(196, 196, '¡Poeta!', 3.6, '#be185d', 28)}
          ${label(196, 224, 'escribe poemas', 4.1, '#7c2d12', 16)}`,
        // 2 · Periodista: Mariela habla por el micrófono y sale volando el periódico con las noticias
        ({ at, sparkle }) => `
          ${at(0, 0, 1, pfBase(), 's-fade', 'animation-duration:.5s')}
          ${at(0, 0, 1, kiosco(636, 790, 238, 404), 's-fade', 'animation-duration:.5s')}
          ${at(0, 0, 1, conObjeto({ ...mariela, x: 420, y: 392, s: 1.15 }, 'talk', 'pa-talk-arm', microMano), 's-from-l', 'animation-duration:.9s')}
          ${at(512, 172, 1, periodico(168, 118, 'NOTICIAS'), 'st-move', `--dx:150px;--dy:90px;--s0:.25;animation-duration:1.1s;${delay(1.2)}`)}
          ${[[506, 168, 2.3], [686, 286, 2.5]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fbbf24', 1.4), 's-in', delay(d))).join('')}
          ${label(596, 330, '¡Periodista!', 2.8, '#0369a1', 28)}
          ${label(596, 358, 'cuenta las noticias', 3.4, '#7c2d12', 17)}`,
        // 3 · Narradora: Mariela cuenta un cuento con su libro y en el globo aparece la historia; los niños escuchan felices
        ({ at, person, palm }) => `
          ${at(0, 0, 1, pfBase(), 's-fade', 'animation-duration:.5s')}
          ${at(430, 462, 1, alfombra(156, 22), 's-fade', 'animation-duration:.5s')}
          ${person({ ...mariela, x: 398, y: 452, s: 1.08, arm: 'out', item: 'book', act: 'talk' })}
          ${at(0, 0, 1, person({ ...gente[4], x: 286, y: 470, s: 0.68, act: 'look' }), 's-from-l', delay(0.2))}
          ${at(0, 0, 1, person({ ...sofia, x: 548, y: 470, s: 0.68, flip: true, act: 'idle' }), 's-from-r', delay(0.3))}
          ${at(0, 0, 1, person({ ...gente[0], x: 604, y: 474, s: 0.58, flip: true, act: 'look' }), 's-from-r', delay(0.5))}
          ${at(0, 0, 1, globo(444, 244, 172, 90, 428, 342), 's-in', delay(0.6))}
          ${at(0, 0, 1, txt(530, 266, 'Había una vez…', 15, '#6d28d9', 600), 's-fade', delay(1))}
          ${at(482, 302, 1, `${[...Array(8)].map((_, i) => `<path d="M0,-17 V-12" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" transform="rotate(${i * 45})"/>`).join('')}<circle r="9" fill="#fbbf24"/>`, 's-in', delay(1.5))}
          ${at(0, 0, 1, palm(530, 322, 0.22, 0, 6), 's-in', delay(2))}
          ${at(578, 312, 1, '<path d="M-16,0 L16,0 L10,9 L-10,9Z" fill="#b45309"/><path d="M-1,0 V-20 L13,-4Z" fill="#fff" stroke="#d6c7a8"/><path d="M-22,12 q6,-4 11,0 t11,0 t11,0 t11,0" stroke="#38bdf8" stroke-width="2.5" fill="none"/>', 's-in', delay(2.5))}
          ${[[286, 380, 3.1], [548, 382, 3.3], [604, 400, 3.5]].map(([x, y, d]) => at(x, y, 1, at(0, 0, 1, corazon(), 'a-rise', 'animation-duration:2.4s'), 's-in', delay(d))).join('')}
          ${label(300, 262, '¡Narradora!', 3.4, '#6d28d9', 28)}
          ${label(300, 290, 'cuenta historias', 3.9, '#7c2d12', 17)}`,
        // 4 · Gestora cultural: Mariela organiza el festival: sube el letrero, se arma la carpa y llega la gente aplaudiendo
        ({ at, person, sparkle }) => `
          ${at(0, 0, 1, pfBase(), 's-fade', 'animation-duration:.5s')}
          ${at(0, 0, 1, tarima(426, 642, 128, 318, false), 's-fade', 'animation-duration:.6s')}
          ${at(0, 0, 1, `<rect x="422" y="128" width="224" height="38" rx="8" fill="#e11d48" stroke="#9f1239" stroke-width="2"/>${txt(534, 154, 'Festival de lectura', 20, '#fff')}`, 's-up', delay(0.5))}
          ${person({ ...mariela, x: 534, y: 318, s: 1, flip: true, act: 'point' })}
          ${at(324, 334, 1, carpa('#0ea5e9', 92), 's-in', delay(1.4))}
          ${at(0, 0, 1, person({ ...gente[1], x: 296, y: 352, s: 0.72, act: 'cheer' }), 's-from-l', delay(2.2))}
          ${at(0, 0, 1, person({ ...gente[2], x: 394, y: 352, s: 0.74, act: 'cheer' }), 's-from-l', delay(2.6))}
          ${at(0, 0, 1, person({ ...gente[5], x: 610, y: 354, s: 0.72, flip: true, act: 'cheer' }), 's-from-r', delay(3))}
          ${[[426, 128, 1.1], [646, 128, 1.3], [534, 112, 1.5]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fde047', 1.6), 's-in', delay(d))).join('')}
          ${label(360, 200, '¡Gestora cultural!', 3.4, '#0f766e', 22)}
          ${label(360, 224, 'organiza el festival', 3.9, '#7c2d12', 16)}`,
      ],
    },

    // ====================== Estudios — la Universidad Distrital Francisco José de Caldas, en Bogotá ======================
    // Chispas: 0 la entrada de la universidad · 1 la pizarra (lingüística) · 2 los libros de la banca (literatura)
    estudios: {
      hs: [[400, 300], [122, 336], [668, 392]],
      svg: () => `${esDefs()}${esBase()}${puertas}
        ${pizarra(64, 302, 116, 64)}${tiza(122, 326, 'a b c', 17)}${tiza(122, 352, 'Hola', 16)}
        ${banca(610, 730, 420)}${at(668, 420, 1, pila)}
        ${person({ ...gente[4], x: 246, y: 446, s: 0.84, act: 'talk' })}${person({ ...gente[1], x: 300, y: 450, s: 0.84, flip: true, act: 'idle', item: 'book', arm: 'out' })}
        ${person({ ...gente[0], x: 470, y: 402, s: 0.66, flip: true, act: 'walk' })}
        ${person({ ...mariela, x: 556, y: 472, s: 0.96, act: 'read', arm: 'out', item: 'book', itemColor: '#2563eb' })}`,
      story: [
        // 0 · La universidad: el letrero brilla, se abren las puertas y Mariela llega caminando con sus libros: ¡a estudiar en Bogotá!
        ({ at, person, sparkle }) => `
          ${at(0, 0, 1, esBase(), 's-fade', 'animation-duration:.5s')}
          ${at(0, 0, 1, at(0, 0, 1, '<rect x="292" y="180" width="216" height="60" rx="9" fill="none" stroke="#fde047" stroke-width="6"/>', 'a-glow'), 's-in', delay(0.4))}
          ${at(0, 0, 1, puertas, 's-out', delay(1.1))}
          ${at(0, 0, 1, '<rect x="360" y="254" width="80" height="76" fill="#fde68a" opacity=".6"/>', 's-fade', delay(1.2))}
          ${at(0, 0, 1, person({ ...mariela, x: 404, y: 392, s: 1.12, flip: true, act: 'walk', item: 'book', itemColor: '#2563eb', delay: 0 }), 'st-move', `--dx:180px;animation-duration:2.6s;animation-timing-function:ease-out;${delay(0.3)}`)}
          ${[[340, 262, 2.8], [466, 262, 3], [400, 244, 3.2]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fde047', 1.5), 's-in', delay(d))).join('')}
          ${label(522, 302, 'en Bogotá', 3, '#0f766e', 22)}
          ${label(276, 302, '¡A estudiar!', 3.6, '#be185d', 22)}`,
        // 1 · Lingüística: un estudiante dice «¡Hola!», la palabra vuela a la pizarra y Mariela escribe «a e i o u»: cómo hablamos y escribimos
        ({ at, person }) => `
          ${at(0, 0, 1, esBase(), 's-fade', 'animation-duration:.5s')}
          ${at(0, 0, 1, pizarra(96, 202, 196, 104, 54), 's-fade', 'animation-duration:.5s')}
          ${person({ ...gente[4], x: 420, y: 402, s: 1, flip: true, act: 'talk' })}
          ${person({ ...mariela, x: 330, y: 404, s: 1.08, flip: true, act: 'point' })}
          ${at(0, 0, 1, `${globo(358, 190, 102, 50, 400, 268)}${txt(409, 223, '¡Hola!', 21, '#1e3a8a')}`, 's-in', delay(0.4))}
          ${at(194, 290, 1, tiza(0, 0, 'hola', 26), 'st-move', `--dx:215px;--dy:-67px;--s0:.7;animation-duration:1.2s;${delay(1.3)}`)}
          ${at(0, 0, 1, tiza(194, 248, 'a e i o u', 28), 'st-reveal', delay(2.6))}
          ${label(194, 190, 'Lingüística', 3.4, '#1e3a8a', 26)}
          ${label(194, 384, 'cómo hablamos y escribimos', 3.9, '#7c2d12', 15)}`,
        // 2 · Literatura: Mariela lee y de su libro salen volando tres libros abiertos: poemas, cuentos y novelas
        ({ at, person, sparkle }) => `
          ${at(0, 0, 1, esBase(), 's-fade', 'animation-duration:.5s')}
          ${person({ ...mariela, x: 382, y: 434, s: 1.12, act: 'read', arm: 'out', item: 'book', itemColor: '#2563eb' })}
          <path d="M424,372 Q450,330 478,318" pathLength="1" stroke="#a855f7" stroke-width="3" fill="none" stroke-linecap="round" class="s-draw" style="animation-duration:.7s;animation-delay:.6s"/>
          ${[[482, libroCon(florcita, '#be185d'), 'poemas'], [578, libroCon(castillo, '#7c3aed'), 'cuentos'], [670, libroCon(muchas, '#0d9488'), 'novelas']].map(([x, b, t], i) => `
            ${at(x, 304, 1, at(0, 0, 1, b, 'a-bob', delay(-i * 0.5)), 's-in', delay(1 + i * 0.7))}
            ${label(x, 334, t, 1.3 + i * 0.7, '#7c2d12', 17)}`).join('')}
          ${[[530, 262, 3.2], [626, 258, 3.4], [700, 300, 3.6]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fbbf24', 1.4), 's-in', delay(d))).join('')}
          ${label(578, 232, '¡Literatura!', 3.3, '#be185d', 28)}`,
      ],
    },
  };
})());
