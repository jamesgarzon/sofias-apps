// Escenas de los datos (Trayectoria, Obras importantes) — ver la cabecera de scenes.js (reglas, encuadre de las historias y piezas compartidas en SCN).
Object.assign(window.APP_SCENES, (() => {
  const { lin, at, delay, sun, cloud, birds, sparkle, person } = KitSVG;
  const { label, mariela, sofia, gente, libroAbierto, hoja } = SCN;
  const grillo = (canta) => SCN.grillo(canta); // el mismo grillo de «Sus obras» (scenes-bio2.js), para que las portadas coincidan

  // ---------- piezas propias ----------
  const txt = (x, y, t, size = 16, fill = '#3a2216', weight = 700) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="${weight}" font-size="${size}" fill="${fill}">${t}</text>`;
  const corazon = (c = '#ec4899') => `<path d="M0,7 C-14,-3 -9,-15 0,-8 C9,-15 14,-3 0,7Z" fill="${c}"/>`;
  const nota = (c = '#7c3aed') => `<ellipse cx="-1" cy="0" rx="6.5" ry="5" fill="${c}" transform="rotate(-20 -1 0)"/><path d="M4.5,-1 V-26 Q12,-22 15,-14" stroke="${c}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
  // Renglones escritos a mano (ondas) que se dibujan uno tras otro desde el instante d0.
  const renglones = (x, y, w, n, gap, d0, c = '#475569') => [...Array(n)].map((_, i) => `<path d="M${x},${y + i * gap} q4,-4 8,0${' t8,0'.repeat(Math.max(0, Math.floor((w - (i === n - 1 ? 30 : 0)) / 8) - 1))}" pathLength="1" stroke="${c}" stroke-width="2.2" fill="none" stroke-linecap="round" class="s-draw" style="animation-duration:.55s;${delay(d0 + i * 0.45)}"/>`).join('');
  // Globo de diálogo: caja (x, y, w, h) con la colita hacia (tx, ty) y un texto corto.
  const globo = (x, y, w, h, tx, ty, t) => `<path d="M${x + 14},${y} H${x + w - 14} Q${x + w},${y} ${x + w},${y + 14} V${y + h - 14} Q${x + w},${y + h} ${x + w - 14},${y + h} H${tx + 14} L${tx},${ty} L${tx - 6},${y + h} H${x + 14} Q${x},${y + h} ${x},${y + h - 14} V${y + 14} Q${x},${y} ${x + 14},${y}Z" fill="#fff" stroke="#94a3b8" stroke-width="2"/>${txt(x + w / 2, y + h / 2 + 6, t, 17, '#334155')}`;
  // Micrófono de mano (el agarre en 0,0), inclinado hacia adelante, con el cubito del canal.
  const mic = `<g transform="rotate(30)"><rect x="-3.5" y="-6" width="7" height="22" rx="3" fill="#1f2937"/><rect x="-7" y="-15" width="14" height="10" rx="2" fill="#e11d48"/>${txt(0, -7.5, 'TV', 7, '#fff')}<circle cy="-22" r="8.5" fill="#64748b"/><path d="M-6,-24 h12 M-7,-20 h14" stroke="#94a3b8" stroke-width="1.2"/></g>`;
  // Cámara de televisión en su trípode (base en 0,0), mirando a la derecha.
  const camara = `<path d="M0,-118 L-28,0 M0,-118 L28,0 M0,-118 V0" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
    <rect x="-34" y="-150" width="60" height="36" rx="6" fill="#334155"/><rect x="26" y="-144" width="16" height="24" rx="3" fill="#1f2937"/><circle cx="44" cy="-132" r="10" fill="#0f172a"/><circle cx="44" cy="-132" r="5" fill="#38bdf8"/>
    <rect x="-28" y="-160" width="34" height="10" rx="3" fill="#475569"/><circle cx="-24" cy="-140" r="3.5" fill="#ef4444" class="a-twinkle"/>${txt(-6, -124, 'TV', 11, '#e2e8f0')}`;
  // Televisor, radio y periódico (centrados en 0,0): los medios de comunicación.
  const tele = `<rect x="-34" y="-24" width="68" height="46" rx="6" fill="#1f2937"/><rect x="-28" y="-18" width="56" height="34" rx="3" fill="#bae6fd"/>
    <clipPath id="st-tr-tv"><rect x="-28" y="-18" width="56" height="34" rx="3"/></clipPath><g clip-path="url(#st-tr-tv)">${person({ ...mariela, x: -6, y: 30, s: 0.36, act: 'none' })}</g>
    <rect x="6" y="-15" width="20" height="8" rx="2" fill="#ef4444"/>${txt(16, -9, 'EN VIVO', 5.4, '#fff')}<path d="M-10,-24 L-18,-36 M10,-24 L18,-36" stroke="#475569" stroke-width="2.5" stroke-linecap="round"/><rect x="-14" y="22" width="28" height="5" rx="2" fill="#475569"/>`;
  const radio = `<rect x="-30" y="-17" width="60" height="34" rx="8" fill="#f97316"/><circle cx="-12" cy="0" r="10" fill="#7c2d12"/><circle cx="-12" cy="0" r="5" fill="#fdba74"/><rect x="5" y="-8" width="18" height="6" rx="2" fill="#fff7ed"/><circle cx="9" cy="8" r="3" fill="#fff7ed"/><circle cx="19" cy="8" r="3" fill="#fff7ed"/><path d="M18,-17 L28,-34" stroke="#475569" stroke-width="2.5" stroke-linecap="round"/>
    ${at(36, -6, 1, '<path d="M0,-8 q6,8 0,16 M7,-13 q10,13 0,26" stroke="#f97316" stroke-width="2.6" fill="none" stroke-linecap="round"/>', 'a-pulse')}`;
  const diario = (head = 'NOTICIAS', w = 70, h = 46) => `<rect x="${-w / 2 + 3}" y="${-h / 2 + 3}" width="${w}" height="${h}" rx="2" fill="#000" opacity=".12"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="2" fill="#f8f5ee" stroke="#9ca3af" stroke-width="1.5"/>
    ${txt(0, -h / 2 + 12, head, 10, '#1f2937')}<path d="M${-w / 2 + 5},${-h / 2 + 16} H${w / 2 - 5}" stroke="#1f2937" stroke-width="1.5"/><rect x="${-w / 2 + 5}" y="${-h / 2 + 20}" width="${w * 0.36}" height="${h - 25}" fill="#bfe3ff"/>
    <g stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round">${[0, 1, 2].map((i) => `<path d="M${-w / 2 + 10 + w * 0.36},${-h / 2 + 24 + i * 7} H${w / 2 - 6}"/>`).join('')}</g>`;
  // Casas de colores de la plaza (de x a x+w, con el techo en y y la base en 300).
  const casa = (x, w, y, c, ventanas = true) => `<rect x="${x}" y="${y}" width="${w}" height="${300 - y}" fill="${c}"/><rect x="${x - 4}" y="${y - 8}" width="${w + 8}" height="12" rx="2" fill="#c2410c"/>
    ${ventanas ? [...Array(Math.max(1, Math.floor(w / 46)))].map((_, i, a) => { const wx = x + (w / a.length) * (i + 0.5); return `<rect x="${wx - 11}" y="${y + 26}" width="22" height="28" rx="3" fill="#7dd3fc" stroke="#fff" stroke-width="3"/><rect x="${wx - 16}" y="${y + 26}" width="5" height="28" fill="#15803d"/><rect x="${wx + 11}" y="${y + 26}" width="5" height="28" fill="#15803d"/>`; }).join('') : ''}`;
  // Fondo de primer plano para las historias: pared y piso de la plaza (tapa lo que hay detrás dentro de la ventana del zoom).
  const telon = (x, y, w, h, piso, pared = '#fef3c7') => `<rect x="${x}" y="${y}" width="${w}" height="${piso - y}" fill="${pared}"/><rect x="${x}" y="${piso}" width="${w}" height="${y + h - piso}" fill="url(#tr-piso)"/><rect x="${x}" y="${piso}" width="${w}" height="10" fill="#d6c3a5"/>`;
  // Carpa del taller: techo de rayas con borde de ondas (de x0 a x1, techo arriba en y).
  const techoCarpa = (x0, x1, y) => {
    const n = Math.round((x1 - x0) / 30), w = (x1 - x0) / n;
    return `<path d="M${x0 - 6},${y + 34} L${x0 + 20},${y} L${x1 - 20},${y} L${x1 + 6},${y + 34}Z" fill="#f97316"/>${[...Array(n)].map((_, i) => (i % 2 ? `<path d="M${x0 + i * w},${y + 34} L${x0 + 20 + i * (w - 40 / n)},${y} L${x0 + 20 + (i + 1) * (w - 40 / n)},${y} L${x0 + (i + 1) * w},${y + 34}Z" fill="#fff7ed"/>` : '')).join('')}
      ${[...Array(n)].map((_, i) => `<path d="M${x0 + i * w},${y + 34} q${w / 2},${16} ${w},0Z" fill="${i % 2 ? '#fff7ed' : '#f97316'}"/>`).join('')}`;
  };

  // ---------- Obras importantes: portadas del estante de la feria ----------
  // Portada (base en x, y): 150 × 160; el dibujo va recortado en el recuadro (x −58 a 64, y −150 a −64) y el título debajo.
  const portada = (x, y, c, id, arte, titulo) => `<g transform="translate(${x} ${y})">
    <path d="M73,-158 L82,-152 L82,2 L73,0Z" fill="#fff7e6" stroke="#e5d3b3" stroke-width="1.5"/>
    <rect x="-75" y="-160" width="150" height="160" rx="8" fill="${c}"/><rect x="-75" y="-160" width="14" height="160" rx="6" fill="#000" opacity=".16"/>
    <rect x="-61" y="-153" width="128" height="92" rx="10" fill="#fff" opacity=".9"/><clipPath id="${id}"><rect x="-58" y="-150" width="122" height="86" rx="8"/></clipPath>
    <g clip-path="url(#${id})">${arte}</g>
    ${titulo.map((t, i) => txt(3, -40 + i * 17 + (2 - titulo.length) * 8.5, t, 14, '#fff')).join('')}</g>`;
  // Sol con carita (centro en 0,0).
  const solcito = (r = 14) => `${at(0, 0, 1, [...Array(10)].map((_, i) => `<path d="M-3,${-r - 3} L0,${-r - 11} L3,${-r - 3}Z" fill="#f59e0b" transform="rotate(${i * 36})"/>`).join(''), 'a-spin')}<circle r="${r}" fill="#facc15"/>
    <circle cx="${-r * 0.35}" cy="${-r * 0.15}" r="${r * 0.11}" fill="#7c2d12"/><circle cx="${r * 0.35}" cy="${-r * 0.15}" r="${r * 0.11}" fill="#7c2d12"/><path d="M${-r * 0.4},${r * 0.25} Q0,${r * 0.6} ${r * 0.4},${r * 0.25}" stroke="#7c2d12" stroke-width="${r * 0.1}" fill="none" stroke-linecap="round"/>`;
  // Perrito sentado mirando a la derecha (patas en 0,0; ≈ 52 de alto).
  const perro = (c = '#d6a46a', c2 = '#8b5a2b') => `<path d="M-24,-10 Q-36,-20 -31,-32" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="-6" cy="-16" rx="21" ry="15" fill="${c}"/><rect x="-18" y="-12" width="8" height="12" rx="3" fill="${c}"/><rect x="2" y="-14" width="8" height="14" rx="3" fill="${c}"/>
    <circle cx="14" cy="-36" r="15" fill="${c}"/><ellipse cx="3" cy="-37" rx="6" ry="11" fill="${c2}" transform="rotate(18 3 -37)"/>
    <ellipse cx="25" cy="-31" rx="8" ry="6" fill="#fef3c7"/><circle cx="31" cy="-33" r="3" fill="#1f2937"/><circle cx="17" cy="-40" r="2.6" fill="#1f2937"/><path d="M21,-26 q4,2.5 8,0" stroke="#7c2d12" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
  // Sonajero (el agarre en 0,0, la cabeza arriba) y sus ondas de sonido.
  const sonajero = `<rect x="-3.5" y="-6" width="7" height="30" rx="3.5" fill="#f59e0b"/><circle cy="-22" r="17" fill="#ec4899" stroke="#be185d" stroke-width="2"/>
    <g fill="#fdf2f8">${[[-7, -27], [6, -30], [-2, -16], [8, -17], [-10, -16]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6"/>`).join('')}</g><path d="M-8,-4 q8,6 16,0" stroke="#22c55e" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const ondas = (c = '#a855f7') => `<path d="M24,-34 q9,12 0,24 M32,-40 q14,18 0,36 M-24,-34 q-9,12 0,24 M-32,-40 q-14,18 0,36" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  // Dibujos de las seis portadas (en el orden de la hoja de Sofía).
  const ARTE = [
    `<rect x="-60" y="-152" width="130" height="92" fill="#bae6fd"/>${at(-24, -124, 1, solcito(12))}<path d="M-60,-90 Q-20,-108 20,-92 T70,-96 L70,-60 L-60,-60Z" fill="#86efac"/><path d="M-60,-78 Q0,-92 70,-80 L70,-60 L-60,-60Z" fill="#4ade80"/><rect x="26" y="-96" width="18" height="14" fill="#fff7ed"/><path d="M23,-96 L35,-106 L47,-96Z" fill="#e11d48"/>`,
    `<rect x="-60" y="-152" width="130" height="92" fill="#fef3c7"/><path d="M-60,-76 H70 V-60 H-60Z" fill="#fcd34d"/>${at(-36, -66, 0.78, perro('#d6a46a', '#8b5a2b'))}${at(4, -66, 0.62, perro('#f8fafc', '#94a3b8'))}${txt(42, -122, '¡guau!', 12, '#0369a1')}${at(46, -102, 1, '<circle r="6" fill="#ef4444"/><path d="M-6,0 h12" stroke="#fff" stroke-width="1.6"/>')}`,
    `<rect x="-60" y="-152" width="130" height="92" fill="#ede9fe"/>${at(-26, -64, 0.62, grillo(true))}${at(28, -122, 1.1, nota('#7c3aed'), 'a-bob')}${at(46, -94, 0.9, nota('#db2777'), 'a-bob', delay(-1))}`,
    `<rect x="-60" y="-152" width="130" height="92" fill="#fce7f3"/>${at(-14, -80, 0.95, at(0, 0, 1, sonajero, 'st-shake'))}${at(-14, -102, 0.8, ondas('#a855f7'), 'a-pulse')}${txt(40, -122, 'chiqui', 11, '#be185d')}`,
    `<rect x="-60" y="-152" width="130" height="92" fill="#fef9c3"/><path d="M-60,-112 L-30,-132 L0,-118 L30,-138 L70,-114 L70,-92 L-60,-92Z" fill="#bbf7d0"/><path d="M-60,-76 Q0,-88 70,-78 L70,-60 L-60,-60Z" fill="#d6b98c"/>
      ${person({ ...gente[2], x: -34, y: -70, s: 0.28, act: 'walk', delay: 0 })}${person({ ...gente[1], x: -6, y: -72, s: 0.28, act: 'walk', delay: -0.3 })}${person({ ...gente[0], x: 20, y: -70, s: 0.24, act: 'walk', delay: -0.15 })}`,
    `<rect x="-60" y="-152" width="130" height="92" fill="#ccfbf1"/><rect x="-60" y="-74" width="130" height="14" fill="#5eead4"/>${person({ skin: '#f1c7a5', hair: '#3b2416', hairStyle: 'bun', dress: true, top: '#0f766e', shoe: '#3b2a20', x: -26, y: -62, s: 0.5, act: 'read', item: 'book', itemColor: '#be185d' })}
      ${at(36, -110, 1, '<rect x="-12" y="-16" width="24" height="32" rx="2" fill="#f59e0b"/><rect x="-9" y="-13" width="18" height="12" fill="#fde68a"/><path d="M-7,6 h14 M-7,10 h10" stroke="#fff" stroke-width="1.6"/>')}`,
  ];
  const TITULOS = [['El país de los', 'días eternos'], ['Memorias', 'y ladridos'], ['Las cantas', 'de Grillo'], ['Sonajerías'], ['Gente', 'que camina'], ['La catalana']];
  const COLORES = ['#f59e0b', '#0ea5e9', '#7c3aed', '#ec4899', '#16a34a', '#0d9488'];
  const CX = [330, 512, 694], BASE = [245, 425]; // columnas y bases de las dos repisas
  // Ventana de historia: marco de 368 × 218 centrado en (0,0), con el dibujo recortado adentro.
  const marco = (id, c, fondo, adentro) => `<rect x="-184" y="-109" width="368" height="218" rx="16" fill="#fffaf0" stroke="${c}" stroke-width="6"/>
    <clipPath id="${id}"><rect x="-176" y="-101" width="352" height="202" rx="11"/></clipPath>
    <g clip-path="url(#${id})"><rect x="-176" y="-101" width="352" height="202" fill="${fondo}"/>${adentro}</g>`;
  // Centro de la ventana del zoom de la chispa k de «Obras importantes» (ver hs abajo).
  const HS_OBRAS = [[370, 115], [552, 115], [734, 115], [370, 295], [552, 295], [734, 295]];
  const centro = (k) => { const [hx, hy] = HS_OBRAS[k]; return [Math.round(0.474 * hx + 210.4), Math.round(0.474 * hy + 131.5)]; };

  return {
    // ===== Trayectoria: la plaza del pueblo. Reportera con la cámara de TV, el quiosco de periódicos, el mural del barrio y la carpa del taller =====
    trayectoria: {
      hs: [[52, 318], [372, 262], [540, 200], [702, 392]],
      svg: () => `<defs>${lin('tr-sky', [[0, '#bfe7ff'], [1, '#fff4dc']])}${lin('tr-piso', [[0, '#f1dfc0'], [1, '#e2c79d']])}</defs>
        <rect width="800" height="500" fill="url(#tr-sky)"/>
        ${sun(70, 64, 22, '#fff6c4', '#fff1a0')}${cloud(250, 64, 0.7)}${cloud(620, 46, 0.55, 0.9, 'a-drift2', -6)}${birds(96, 3, '#6b4a3a', 28, -8, 0.8)}
        ${casa(0, 130, 150, '#fde68a')}${casa(130, 140, 128, '#fbcfe8')}${casa(270, 150, 160, '#bfdbfe')}${casa(420, 180, 140, '#fff7ea', false)}${casa(600, 200, 150, '#c7f0d0')}
        <rect x="430" y="164" width="160" height="124" rx="4" fill="#fffdf6" stroke="#e7d7b8" stroke-width="3"/>
        <rect x="433" y="167" width="154" height="70" fill="#bae6fd"/><path d="M433,237 Q480,214 520,232 T587,226 L587,285 L433,285Z" fill="#86efac"/>
        ${at(540, 200, 1, '<circle r="20" fill="#facc15"/>' + [...Array(8)].map((_, i) => `<path d="M-3,-24 L0,-32 L3,-24Z" fill="#f59e0b" transform="rotate(${i * 45})"/>`).join(''))}
        <g fill="none" stroke="#a8a29e" stroke-width="2" stroke-dasharray="5 4"><circle cx="465" cy="262" r="10"/><circle cx="505" cy="268" r="10"/><path d="M470,190 q12,-8 24,0"/></g>
        <rect y="300" width="800" height="12" fill="#d6c3a5"/><rect y="312" width="800" height="188" fill="url(#tr-piso)"/>
        <g stroke="#d4b183" stroke-width="2" opacity=".7"><path d="M0,350 H800 M0,400 H800 M0,456 H800"/>${[80, 230, 380, 530, 680].map((x) => `<path d="M${x},312 L${x - 30},500"/>`).join('')}</g>
        ${[[448, 312, '#3b82f6'], [574, 312, '#ef4444']].map(([x, y, c]) => `<path d="M${x - 9},${y} L${x - 7},${y - 16} L${x + 7},${y - 16} L${x + 9},${y}Z" fill="#94a3b8"/><ellipse cx="${x}" cy="${y - 16}" rx="7" ry="2.5" fill="${c}"/>`).join('')}
        ${person({ ...gente[4], x: 452, y: 318, s: 0.9, act: 'paint', item: 'brush' })}
        ${person({ ...gente[0], x: 582, y: 334, s: 0.85, flip: true, arm: 'up', act: 'shake', item: 'stick', itemColor: '#e11d48' })}
        <path d="M290,214 V392 M390,214 V392" stroke="#7c4a24" stroke-width="6"/><path d="M276,214 L404,214 L392,186 L288,186Z" fill="#e11d48"/>${[0, 1, 2, 3].map((i) => `<path d="M${296 + i * 26},186 L${306 + i * 26},186 L${300 + i * 26},214 L${290 + i * 26},214Z" fill="#fff"/>`).join('')}
        <path d="M296,228 H384" stroke="#475569" stroke-width="1.5"/>
        ${at(320, 260, 1, diario('NOTICIAS', 42, 56))}${at(366, 260, 1, diario('CRÓNICA', 42, 56))}
        <rect x="280" y="330" width="120" height="62" rx="4" fill="#0ea5e9"/><rect x="280" y="330" width="120" height="10" fill="#0369a1"/>${txt(340, 372, 'PERIÓDICOS', 13, '#fff')}
        ${at(52, 450, 1, camara)}
        ${person({ ...mariela, x: 140, y: 450, s: 1.05, arm: 'out', act: 'idle' })}${at(173, 397, 1.05, mic)}
        ${person({ ...gente[2], x: 242, y: 450, s: 1.05, flip: true, act: 'talk' })}
        ${techoCarpa(612, 792, 160)}<path d="M616,196 V448 M788,196 V448" stroke="#9a3412" stroke-width="5"/>
        <rect x="630" y="210" width="146" height="40" rx="5" fill="#fff7ed" stroke="#f97316" stroke-width="2"/>${txt(703, 227, 'Taller de lectura', 13, '#9a3412')}${txt(703, 243, 'y escritura', 13, '#9a3412')}
        ${person({ ...sofia, x: 640, y: 450, s: 0.85, act: 'read', item: 'book', itemColor: '#0ea5e9' })}
        ${person({ ...gente[5], x: 765, y: 450, s: 0.85, flip: true, act: 'read', item: 'book', itemColor: '#f59e0b' })}
        <rect x="664" y="398" width="76" height="8" rx="3" fill="#b45309"/><rect x="670" y="406" width="6" height="40" fill="#92400e"/><rect x="728" y="406" width="6" height="40" fill="#92400e"/>
        <rect x="676" y="384" width="30" height="7" rx="1.5" fill="#22c55e"/><rect x="679" y="377" width="26" height="7" rx="1.5" fill="#e11d48"/>${at(722, 395, 1, libroAbierto(14, '#7c3aed'))}`,
      story: [
        // 0 · Reportera: Mariela le pregunta al vecino con el micrófono, la cámara graba… y la noticia sale en la tele, la radio y el periódico
        () => `
          ${at(52, 284, 1, `<circle cx="-16" cy="0" r="5" fill="#ef4444"/>${txt(6, 5, 'REC', 13, '#b91c1c')}`, 'a-twinkle')}
          ${at(0, 0, 1, globo(70, 228, 120, 46, 146, 330, '¿Qué pasó?'), 's-in', delay(0.4))}
          ${at(0, 0, 1, globo(196, 270, 116, 44, 240, 334, '¡Le cuento!'), 's-in', delay(1.4))}
          ${label(190, 206, '¡Reportera!', 2.2, '#9a3412', 26)}
          ${at(0, 0, 1, `<rect x="334" y="166" width="100" height="236" rx="14" fill="#fff" opacity=".93" stroke="#cbd5e1" stroke-width="2"/>${txt(384, 186, 'medios de', 13, '#0f766e')}${txt(384, 201, 'comunicación', 13, '#0f766e')}`, 's-fade', delay(2.4))}
          ${at(384, 246, 1, tele, 's-in', delay(2.8))}${at(380, 316, 1, radio, 's-in', delay(3.3))}${at(384, 370, 1, diario('NOTICIAS'), 's-in', delay(3.8))}`,
        // 1 · Cronista: Mariela mira la plaza y escribe en su libreta; en la hoja aparece su crónica con dibujitos… y sale en el periódico
        () => `
          ${at(0, 0, 1, telon(166, 118, 440, 280, 318), 's-fade', 'animation-duration:.4s')}
          ${at(0, 0, 1, person({ ...mariela, x: 252, y: 382, s: 1.15, arm: 'out', act: 'idle' }), 's-from-l')}
          ${at(292, 320, 1, `${libroAbierto(15, '#0d9488')}${at(4, -14, 1, '<g transform="rotate(25)"><rect x="-2.5" y="-24" width="5" height="18" fill="#facc15"/><path d="M-2.5,-6 L0,1 L2.5,-6Z" fill="#3a2216"/></g>', 'a-rock', 'animation-duration:.8s')}`, 's-in', delay(0.5))}
          ${at(330, 162, 1, `<rect x="4" y="5" width="166" height="186" rx="4" fill="#000" opacity=".12"/>${hoja(166, 186)}`, 's-in', delay(0.8))}
          ${at(0, 0, 1, txt(420, 186, 'Crónica', 19, '#be123c'), 's-fade', delay(1.1))}
          ${renglones(366, 212, 116, 5, 20, 1.4)}
          ${[[372, 328, '<path d="M-14,0 V-16 H14 V0Z M-18,-15 L0,-28 L18,-15Z" fill="#f97316"/>'], [414, 328, '<rect x="-2" y="-14" width="4" height="14" fill="#92400e"/><circle cy="-20" r="10" fill="#22c55e"/>'], [460, 316, '<circle r="10" fill="#facc15"/>']].map(([x, y, d], i) => at(x, y, 1, d, 's-in', delay(3.6 + i * 0.25))).join('')}
          ${at(544, 286, 1, diario('CRÓNICA', 76, 60), 's-drop', delay(4.2))}
          ${label(256, 222, '¡Cronista!', 2, '#9a3412', 26)}
          ${label(446, 376, 'historias de verdad', 4.6, '#0f766e', 15)}`,
        // 2 · Proyectos culturales: los vecinos pintan juntos un mural del Llano mientras otro toca las maracas
        () => `
          ${at(0, 0, 1, telon(246, 90, 440, 280, 312, '#fff7ea'), 's-fade', 'animation-duration:.4s')}
          ${at(0, 0, 1, '<rect x="300" y="132" width="332" height="172" rx="6" fill="#fffdf6" stroke="#e7d7b8" stroke-width="4"/>', 's-fade', 'animation-duration:.4s')}
          ${at(0, 0, 1, '<rect x="306" y="138" width="320" height="110" fill="#bae6fd"/>', 's-fade', delay(0.5))}
          ${at(372, 182, 1, '<circle r="24" fill="#facc15"/>' + [...Array(10)].map((_, i) => `<path d="M-3,-28 L0,-38 L3,-28Z" fill="#f59e0b" transform="rotate(${i * 36})"/>`).join(''), 's-in', delay(0.9))}
          ${at(0, 0, 1, '<path d="M306,248 Q380,214 460,240 T626,228 L626,298 L306,298Z" fill="#86efac"/><path d="M306,270 Q470,250 626,272 L626,298 L306,298Z" fill="#4ade80"/>', 's-grow', delay(1.4))}
          ${['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#8b5cf6'].map((c, i) => { const r = 78 - i * 8; return `<path d="M${520 - r},246 A${r},${r} 0 0 1 ${520 + r},246" pathLength="1" stroke="${c}" stroke-width="7" fill="none" class="s-draw" style="animation-duration:.6s;${delay(2 + i * 0.12)}"/>`; }).join('')}
          ${[[340, 284, '#e11d48'], [380, 290, '#f472b6'], [560, 288, '#facc15'], [600, 282, '#e11d48']].map(([x, y, c], i) => at(x, y, 1, `<circle r="8" fill="${c}"/><circle r="3" fill="#fff7c2"/>`, 's-in', delay(2.9 + i * 0.2))).join('')}
          ${[[440, 168, '#7c3aed'], [470, 152, '#db2777'], [604, 160, '#0f766e']].map(([x, y, c], i) => at(x, y, 1.2, nota(c), 's-in', delay(3.6 + i * 0.25))).join('')}
          ${at(0, 0, 1, person({ ...gente[4], x: 318, y: 350, s: 1, act: 'paint', item: 'brush', delay: 0 }), 's-from-l')}
          ${at(0, 0, 1, person({ ...gente[3], x: 614, y: 350, s: 1, flip: true, act: 'dab', item: 'brush', delay: -0.5 }), 's-from-r')}
          ${at(0, 0, 1, person({ ...gente[0], x: 468, y: 352, s: 0.95, arm: 'up', act: 'shake', item: 'stick', itemColor: '#e11d48' }), 's-up', delay(0.6))}
          ${label(466, 128, '¡Proyectos culturales!', 4.2, '#9a3412', 22)}`,
        // 3 · Talleres de lectura y escritura: en la carpa Mariela lee en voz alta; una niña lee, una abuela escribe y salen letras y corazones
        () => `
          ${at(0, 0, 1, `<rect x="326" y="180" width="434" height="276" fill="#fff7ed"/><rect x="326" y="404" width="434" height="52" fill="url(#tr-piso)"/>${techoCarpa(326, 760, 180)}`, 's-fade', 'animation-duration:.4s')}
          ${at(0, 0, 1, person({ ...mariela, x: 410, y: 436, s: 1.15, arm: 'out', act: 'talk', item: 'book', itemColor: '#0d9488' }), 's-from-l')}
          ${at(0, 0, 1, person({ ...sofia, x: 552, y: 436, s: 1, act: 'read', item: 'book', itemColor: '#f59e0b' }), 's-in', delay(0.4))}
          ${at(0, 0, 1, `<rect x="612" y="384" width="104" height="8" rx="3" fill="#b45309"/><rect x="618" y="392" width="6" height="44" fill="#92400e"/><rect x="704" y="392" width="6" height="44" fill="#92400e"/><path d="M626,384 L668,384 L664,378 L630,378Z" fill="#fffdf6" stroke="#d6c7a8"/>`, 's-fade', delay(0.6))}
          ${at(0, 0, 1, person({ ...gente[5], x: 690, y: 436, s: 1, flip: true, arm: 'out', act: 'idle' }), 's-in', delay(0.7))}
          ${at(652, 376, 1, '<g transform="rotate(-25)"><rect x="-2.5" y="-22" width="5" height="17" fill="#facc15"/><path d="M-2.5,-5 L0,2 L2.5,-5Z" fill="#3a2216"/></g>', 'a-rock', 'animation-duration:.7s')}
          ${at(0, 0, 1, `<rect x="604" y="252" width="122" height="70" rx="4" fill="#fffdf6" stroke="#d6c7a8" stroke-width="2"/><path d="M604,272 H726 M604,292 H726 M604,312 H726" stroke="#bfdbfe"/>`, 's-in', delay(1))}
          ${at(0, 0, 1, txt(665, 284, 'Me gusta', 17, '#0f766e', 600), 'st-reveal', delay(1.5))}${at(0, 0, 1, txt(665, 306, 'leer ♥', 17, '#be123c', 600), 'st-reveal', delay(2.6))}
          ${[[452, 330, 'a'], [470, 316, 'b'], [440, 300, 'c']].map(([x, y, t], i) => at(x, y, 1, txt(0, 0, t, 22, ['#7c3aed', '#0ea5e9', '#e11d48'][i]), 'a-rise', `animation-duration:2.6s;${delay(1 + i * 0.7)}`)).join('')}
          ${[[566, 360], [584, 352]].map(([x, y], i) => at(x, y, 1.2, corazon(['#ec4899', '#f43f5e'][i]), 'a-rise', `animation-duration:2.4s;${delay(1.6 + i * 0.9)}`)).join('')}
          ${label(540, 226, 'Talleres de lectura', 3.4, '#9a3412', 20)}${label(540, 250, 'y escritura', 3.8, '#9a3412', 20)}`,
      ],
    },

    // ===== Obras importantes: el puesto de la Feria del Libro con las seis portadas; Mariela firma libros =====
    obrasimp: {
      hs: HS_OBRAS,
      svg: () => `<defs>${lin('oi-sky', [[0, '#bae6fd'], [1, '#fdf4ff']])}</defs>
        <rect width="800" height="500" fill="url(#oi-sky)"/>
        ${cloud(110, 60, 0.6)}${birds(120, 3, '#6b4a3a', 26, -5, 0.8)}
        ${[[40, 300, '#fbcfe8'], [130, 310, '#fde68a'], [196, 304, '#bbf7d0']].map(([x, y, c]) => `<path d="M${x - 40},${y} L${x},${y - 56} L${x + 40},${y}Z" fill="${c}"/><rect x="${x - 34}" y="${y}" width="68" height="40" fill="${c}" opacity=".7"/>`).join('')}
        <path d="M0,40 Q120,70 240,40" stroke="#94a3b8" stroke-width="1.5" fill="none"/>${[30, 70, 110, 150, 190].map((x, i) => `<path d="M${x - 9},${46 + Math.sin(i) * 4 + (i === 2 ? 8 : 0)} L${x + 9},${46 + Math.sin(i) * 4 + (i === 2 ? 8 : 0)} L${x},${64 + (i === 2 ? 8 : 0)}Z" fill="${['#ef4444', '#facc15', '#22c55e', '#3b82f6', '#a855f7'][i]}"/>`).join('')}
        <rect y="440" width="800" height="60" fill="#d9f99d"/><rect y="440" width="800" height="6" fill="#a3e635"/>
        <rect x="236" y="62" width="550" height="384" rx="6" fill="#92400e"/><rect x="248" y="70" width="526" height="370" fill="#fde7c4"/>
        <rect x="244" y="${BASE[0]}" width="534" height="11" fill="#b45309"/><rect x="244" y="${BASE[1]}" width="534" height="13" fill="#b45309"/>
        ${[...Array(12)].map((_, i) => `<path d="M${226 + i * 47},${28} h47 v26 q-23.5,16 -47,0Z" fill="${i % 2 ? '#f0fdfa' : '#0d9488'}"/>`).join('')}
        <rect x="400" y="14" width="224" height="40" rx="8" fill="#be185d"/>${txt(512, 42, 'FERIA DEL LIBRO', 21, '#fff')}
        ${ARTE.map((a, k) => portada(CX[k % 3], BASE[Math.floor(k / 3)], COLORES[k], `oi-c${k}`, a, TITULOS[k])).join('')}
        ${person({ ...mariela, x: 92, y: 452, s: 1.15, arm: 'out', act: 'idle' })}
        ${at(130, 386, 1, '<g transform="rotate(20)"><rect x="-2.5" y="-20" width="5" height="16" fill="#1f2937"/><path d="M-2.5,-4 L0,2 L2.5,-4Z" fill="#94a3b8"/></g>', 'a-rock', 'animation-duration:.9s')}
        <rect x="24" y="392" width="160" height="10" rx="3" fill="#b45309"/><rect x="30" y="402" width="148" height="44" fill="#0d9488"/>${txt(104, 429, 'Firma de libros', 13, '#fff')}
        ${at(140, 391, 1, '<path d="M-14,0 L14,0 L12,-6 L-12,-6Z" fill="#fffdf6" stroke="#d6c7a8"/>')}<rect x="38" y="368" width="34" height="8" rx="2" fill="#f59e0b"/><rect x="40" y="376" width="30" height="8" rx="2" fill="#7c3aed"/><rect x="36" y="384" width="36" height="8" rx="2" fill="#0ea5e9"/>
        ${person({ ...sofia, x: 206, y: 456, s: 0.92, flip: true, arm: 'out', act: 'idle', item: 'book', itemColor: '#16a34a' })}
        ${[[262, 80], [790, 252], [246, 262]].map(([x, y], i) => sparkle(x, y, i * 0.6, '#fde047', 1.2)).join('')}`,
      story: [
        // 0 · «El país de los días eternos»: el sol baja hacia las montañas… y vuelve a subir: ¡siempre es de día! Los niños saltan
        () => { const [x, y] = centro(0); return `<defs>${lin('st-oi0', [[0, '#fde68a'], [1, '#bae6fd']])}</defs>
          ${at(x, y, 1, marco('st-oi0c', '#f59e0b', 'url(#st-oi0)', `${at(-60, -44, 1, at(0, 0, 1, solcito(24), 'st-nosun', delay(0.6)))}
            <path d="M-176,26 Q-90,-6 0,20 T176,10 L176,101 L-176,101Z" fill="#86efac"/><path d="M-176,58 Q0,34 176,60 L176,101 L-176,101Z" fill="#4ade80"/>
            <rect x="104" y="-2" width="34" height="26" fill="#fff7ed"/><path d="M99,-2 L121,-20 L143,-2Z" fill="#e11d48"/><rect x="116" y="10" width="10" height="14" fill="#92400e"/>
            ${person({ ...gente[0], x: 10, y: 92, s: 0.62, act: 'cheer' })}${person({ ...sofia, x: 60, y: 94, s: 0.6, act: 'cheer', delay: -0.4 })}`), 's-in')}
          ${label(x, y - 76, 'El país de los días eternos', 1.2, '#b45309', 19)}${label(x - 92, y + 82, '¡Siempre es de día!', 3.6, '#0369a1', 16)}`; },
        // 1 · «Memorias y ladridos»: dos perritos ladran ¡guau! y en sus globos aparecen sus recuerdos: la pelota, la casa, su niño
        () => { const [x, y] = centro(1); return `
          ${at(x, y, 1, marco('st-oi1c', '#0ea5e9', '#e0f2fe', `<path d="M-176,52 Q0,40 176,54 L176,101 L-176,101Z" fill="#bbf7d0"/>
            ${at(-104, 88, 1.35, perro('#d6a46a', '#8b5a2b'))}${at(40, 90, 1.15, perro('#f8fafc', '#94a3b8'))}`), 's-in')}
          ${[[x - 64, y - 32, 0.8], [x + 76, y - 34, 2.2]].map(([gx, gy, d], i) => at(gx, gy, 1, `<ellipse rx="54" ry="34" fill="#fff" stroke="#bae6fd" stroke-width="3"/><circle cx="${i ? -44 : -38}" cy="40" r="7" fill="#fff" stroke="#bae6fd" stroke-width="2.5"/>
            ${i ? `<path d="M-30,10 V-6 H-6 V10Z M-34,-5 L-18,-18 L-2,-5Z" fill="#f97316"/>${person({ ...gente[4], x: 22, y: 20, s: 0.36, act: 'none' })}${at(4, -14, 0.8, corazon())}` : `<circle cx="-18" cy="0" r="12" fill="#ef4444"/><path d="M-30,0 h24" stroke="#fff" stroke-width="2"/><path d="M8,6 l22,-12 M4,2 a4,4 0 1,1 4,4 M30,-10 a4,4 0 1,1 4,4" stroke="#fef3c7" stroke-width="6" stroke-linecap="round" fill="none"/><path d="M8,6 l22,-12" stroke="#d6d3d1" stroke-width="5" stroke-linecap="round"/>`}`, 's-in', delay(d))).join('')}
          ${label(x - 58, y + 32, '¡Guau!', 0.5, '#0369a1', 18)}${label(x + 104, y + 36, '¡Guau, guau!', 1.9, '#0369a1', 16)}
          ${label(x, y + 84, 'Memorias y ladridos', 3.4, '#0369a1', 20)}`; },
        // 2 · «Las cantas de Grillo»: de noche, el grillo canta sobre su piedra y las notas suben al cielo: ¡poemas para niños!
        () => { const [x, y] = centro(2); return `<defs>${lin('st-oi2', [[0, '#4c1d95'], [1, '#a78bfa']])}</defs>
          ${at(x, y, 1, marco('st-oi2c', '#7c3aed', 'url(#st-oi2)', `<g fill="#fef9c3">${[[-150, -80], [-60, -90], [60, -70], [150, -84], [110, -30], [-120, -34]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.6"/>`).join('')}</g>
            <path d="M126,-84 A18,18 0 1,0 126,-48 A13,13 0 1,1 126,-84Z" fill="#fde68a"/>
            <path d="M-176,62 Q0,46 176,62 L176,101 L-176,101Z" fill="#4d7c0f"/><ellipse cx="-62" cy="76" rx="62" ry="17" fill="#a8a29e"/>
            ${at(-62, 78, 1, grillo(true), 'a-bob', 'animation-duration:1.2s')}`), 's-in')}
          ${[[30, -16, '#fde68a', 0], [60, 4, '#f9a8d4', 0.6], [90, -20, '#bef264', 1.2], [118, 0, '#fde68a', 1.8]].map(([dx, dy, c, d]) => at(x + dx, y + dy, 1.5, nota(c), 'a-rise', `animation-duration:2.6s;${delay(0.9 + d)}`)).join('')}
          ${label(x, y - 76, 'Las cantas de Grillo', 1.2, '#6d28d9', 20)}${label(x + 92, y + 82, 'poemas para niños', 3.4, '#6d28d9', 15)}`; },
        // 3 · «Sonajerías»: una niña sacude el sonajero, ¡chiqui-chiqui!, y salen ondas de sonido y estrellitas
        () => { const [x, y] = centro(3); return `
          ${at(x, y, 1, marco('st-oi3c', '#ec4899', '#fdf2f8', `<rect x="-176" y="60" width="352" height="41" fill="#fbcfe8"/>
            ${person({ ...sofia, x: -60, y: 96, s: 1.05, arm: 'up', act: 'none' })}
            ${at(-34, 2, 1.25, `${at(0, 0, 1, sonajero, 'st-shake')}${at(0, 0, 1, ondas('#a855f7'), 'a-pulse')}`)}`), 's-in')}
          ${[[x + 36, y - 40, 'chiqui', 0.7], [x + 104, y - 8, 'chiqui', 1.3], [x + 64, y + 30, '¡chiqui!', 1.9]].map(([a, b, t, d]) => label(a, b, t, d, '#be185d', 20)).join('')}
          ${[[x + 140, y - 60], [x + 20, y - 70], [x + 150, y + 40]].map(([a, b], i) => at(a, b, 1, sparkle(0, 0, 0, '#facc15', 1.6), 's-in', delay(2.2 + i * 0.3))).join('')}
          ${label(x, y - 76, 'Sonajerías', 2.6, '#be185d', 22)}${label(x + 92, y + 82, 'poemas para niños', 3.4, '#be185d', 15)}`; },
        // 4 · «Gente que camina»: por el camino del Llano pasa una fila de gente caminando con sus cosas
        () => { const [x, y] = centro(4); const fila = [
            { ...gente[5], x: -110, s: 0.7, item: 'stick', itemColor: '#7a5230' }, { ...gente[2], x: -44, s: 0.74, item: 'basket' },
            { ...sofia, x: 14, s: 0.56, item: 'flower', itemColor: '#e11d48' }, { ...gente[1], x: 76, s: 0.72, item: 'pouch' }];
          return `<defs>${lin('st-oi4', [[0, '#fef9c3'], [1, '#dcfce7']])}</defs>
          ${at(x, y, 1, marco('st-oi4c', '#16a34a', 'url(#st-oi4)', `<path d="M-176,-10 L-120,-56 L-60,-22 L10,-70 L80,-30 L140,-56 L176,-30 L176,40 L-176,40Z" fill="#bbf7d0"/>
            <path d="M-176,40 Q0,20 176,38 L176,101 L-176,101Z" fill="#86efac"/><path d="M-176,76 Q0,62 176,78 L176,101 L-176,101Z" fill="#d6b98c"/>${KitSVG.palm(-140, 46, 0.4)}${KitSVG.palm(150, 40, 0.36, -1)}
            ${at(0, 0, 1, fila.map((p) => person({ ...p, y: 92, act: 'walk' })).join(''), 'st-move', `--dx:-230px;animation-duration:3.6s;animation-timing-function:ease-out;${delay(0.4)}`)}`), 's-in')}
          ${label(x, y - 76, 'Gente que camina', 3.4, '#15803d', 20)}`; },
        // 5 · «La catalana»: una señora abre su libro: la novela de la vida de Rosa Bosch; las páginas brillan
        () => { const [x, y] = centro(5); return `
          ${at(x, y, 1, marco('st-oi5c', '#0d9488', '#ecfeff', `<rect x="-176" y="64" width="352" height="37" fill="#99f6e4"/><rect x="88" y="-60" width="64" height="80" rx="4" fill="#fde68a" stroke="#d97706" stroke-width="3"/><path d="M120,-60 V20 M88,-20 H152" stroke="#d97706" stroke-width="3"/>
            ${person({ skin: '#f1c7a5', hair: '#3b2416', hairStyle: 'bun', dress: true, top: '#0f766e', shoe: '#3b2a20', x: -70, y: 96, s: 1.05, arm: 'out', act: 'idle' })}`), 's-in')}
          ${at(x - 2, y + 2, 1, libroAbierto(46, '#0d9488'), 's-in', delay(0.8))}
          ${[[x - 22, y - 40], [x + 26, y - 50], [x + 4, y - 66]].map(([a, b], i) => at(a, b, 1, sparkle(0, 0, 0, '#facc15', 1.6), 's-in', delay(1.6 + i * 0.3))).join('')}
          ${at(0, 0, 1, `<path d="M${x + 8},${y - 26} q6,-4 12,0 t12,0 t12,0 M${x + 8},${y - 16} q6,-4 12,0 t12,0" stroke="#64748b" stroke-width="1.6" fill="none"/><path d="M${x - 40},${y - 26} q6,-4 12,0 t12,0 t12,0 M${x - 40},${y - 16} q6,-4 12,0 t12,0 t12,0" stroke="#64748b" stroke-width="1.6" fill="none"/>`, 's-fade', delay(1.4))}
          ${label(x, y - 76, 'La catalana', 2.2, '#0f766e', 22)}${label(x + 92, y + 82, 'una novela', 3.2, '#0f766e', 16)}`; },
      ],
    },
  };
})());
