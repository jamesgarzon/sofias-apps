// Escenas SVG de cada tema (viewBox 800×500), sus puntos ✨ (hs: [x, y] en el mismo viewBox) y sus historias
// (story: una por chispa, en el orden de hs; se reproducen al tocarla — ver «Historias» en kit/v1/README.md).
// Están repartidas en archivos que se suman a window.APP_SCENES:
//   scenes.js        piezas compartidas (window.SCN): personajes, etiquetas y objetos que se repiten
//   scenes-poema.js  estrofa1, estrofa2, estrofa3
//   scenes-bio1.js   quien, vida, crecio
//   scenes-bio2.js   importante, obras, opinion
// Reglas: hs separados ≥110 unidades, sin tapar caras; lo animado va con at(..., 'a-clase').
// Historias: con el zoom ×1,9 sobre la chispa (hx, hy) solo se ve x ∈ [0,474·hx, hx + 0,526·(800−hx)] e
// y ∈ [0,474·hy, hy + 0,526·(500−hy)]; la persona va grande, haciendo la acción, en el centro de esa ventana.
window.APP_SCENES = {};
window.SCN = (() => {
  const { at, delay } = KitSVG;

  // Etiqueta corta (1–3 palabras) que aparece con rebote; el borde blanco la hace legible sobre cualquier fondo.
  const label = (x, y, t, d = 0, fill = '#7c2d12', size = 19) => at(x, y, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="${size}" fill="${fill}" stroke="#fff" stroke-width="5" stroke-linejoin="round" paint-order="stroke">${t}</text>`, 's-in', delay(d));

  // ---------- personajes (se combinan con { x, y, s, act… } en KitSVG.person) ----------
  // Mariela siempre con su vestido naranja «del sol»; de niña, con colitas y vestido amarillo.
  const mariela = { skin: '#d9a06f', hair: '#3b2416', hairStyle: 'long', dress: true, top: '#f97316', shoe: '#7a4f28', itemColor: '#7c3aed' };
  const marielaNina = { skin: '#d9a06f', hair: '#3b2416', hairStyle: 'pigtails', dress: true, top: '#facc15', shoe: '#7a4f28', itemColor: '#e11d48' };
  // Una niña como Sofía (la que hace la exposición) y gente del pueblo para llenar las escenas.
  const sofia = { skin: '#f1c7a5', hair: '#6b3a1e', hairStyle: 'long', top: '#8b5cf6', bottom: '#3a3f5c', shoe: '#5b3a29', itemColor: '#f59e0b' };
  const gente = [
    { skin: '#8d5a3b', hair: '#1f140d', top: '#2a9d8f', bottom: '#264653', shoe: '#2b2622' },
    { skin: '#c68a5e', hair: '#2b1b12', hairStyle: 'bun', dress: true, top: '#e76f51', shoe: '#7a4f28' },
    { skin: '#e3a97c', hair: '#5b3a1a', top: '#3b82f6', bottom: '#3a3f5c', shoe: '#3b2a20', hat: 'straw' },
    { skin: '#a96a40', hair: '#1b1209', hairStyle: 'curly', dress: true, top: '#a855f7', shoe: '#3b2a20' },
    { skin: '#f1c7a5', hair: '#9a6a3a', top: '#ef476f', bottom: '#264653', shoe: '#5b3a29' },
    { skin: '#b97b50', hair: '#e8e2da', hairStyle: 'bun', dress: true, top: '#0ea5e9', shoe: '#5b3a29' }, // abuela de pelo blanco
  ];

  // ---------- objetos ----------
  // Geranio: ramillete de flores (centro en 0,0; ≈ 34 de ancho). c = color de las flores.
  const geranio = (c = '#e11d48', c2 = '#fb7185') => `<g>${[[-10, -4], [8, -7], [0, -14], [-4, 6], [11, 5]].map(([x, y]) => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map((a) => `<ellipse cy="-4" rx="3.4" ry="4.6" fill="${c}" transform="rotate(${a})"/>`).join('')}<circle r="2" fill="${c2}"/></g>`).join('')}</g>`;
  // Maceta con geranios y hojas (base en 0,0).
  const maceta = (c = '#e11d48', c2 = '#fb7185') => `<path d="M-16,-18 L16,-18 L12,0 L-12,0Z" fill="#c2410c"/><rect x="-18" y="-22" width="36" height="6" rx="2" fill="#ea580c"/>
    <g fill="#3f9a4a"><ellipse cx="-14" cy="-28" rx="10" ry="6" transform="rotate(-20 -14 -28)"/><ellipse cx="14" cy="-28" rx="10" ry="6" transform="rotate(20 14 -28)"/><ellipse cx="0" cy="-32" rx="9" ry="6"/></g>
    <g transform="translate(0 -42)">${geranio(c, c2)}</g>`;
  // Brote que crece (base en 0,0): tallo y dos hojas.
  const brote = (c = '#22c55e') => `<path d="M0,0 Q-2,-14 0,-26" stroke="#15803d" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M0,-18 Q-16,-26 -18,-12 Q-6,-10 0,-18Z" fill="${c}"/><path d="M0,-24 Q16,-34 19,-19 Q6,-16 0,-24Z" fill="${c}"/>`;
  // Libro cerrado de pie (base en 0,0), con un título corto opcional en el lomo/portada.
  const libro = (c = '#7c3aed', w = 34, h = 46, t = '') => `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="3" fill="${c}"/><rect x="${-w / 2 + 3}" y="${-h + 3}" width="${w - 6}" height="${h - 6}" rx="2" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.5"/>
    <rect x="${w / 2 - 4}" y="${-h + 2}" width="3" height="${h - 4}" fill="#fff" opacity=".7"/>${t ? `<text y="${-h / 2 + 4}" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="${Math.min(12, (w * 1.6) / t.length)}" fill="#fff">${t}</text>` : ''}`;
  // Libro abierto visto de frente (centro del lomo en 0,0; ≈ 2·w de ancho).
  const libroAbierto = (w = 40, c = '#7c3aed') => `<path d="M0,4 Q${-w / 2},-4 ${-w},2 L${-w},${-w * 0.7} Q${-w / 2},${-w * 0.78} 0,${-w * 0.68}Z" fill="#fffdf6" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/><path d="M0,4 Q${w / 2},-4 ${w},2 L${w},${-w * 0.7} Q${w / 2},${-w * 0.78} 0,${-w * 0.68}Z" fill="#fffdf6" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
    <g stroke="#cbb79a" stroke-width="1.6" stroke-linecap="round">${[0.22, 0.36, 0.5].map((k) => `<path d="M${-w * 0.82},${-w * k} q${w * 0.32},-3 ${w * 0.64},0 M${w * 0.18},${-w * k} q${w * 0.32},-3 ${w * 0.64},0"/>`).join('')}</g>`;
  // Hoja de cuaderno con renglones (esquina superior izquierda en 0,0).
  const hoja = (w = 60, h = 76) => `<rect width="${w}" height="${h}" rx="3" fill="#fffdf6" stroke="#d6c7a8" stroke-width="1.5"/><path d="M${w * 0.18},0 V${h}" stroke="#fca5a5" stroke-width="1.2"/>${[...Array(Math.floor(h / 12))].map((_, i) => `<path d="M3,${14 + i * 12} H${w - 3}" stroke="#bfdbfe" stroke-width="1"/>`).join('')}`;
  // Cordillera (la de Villavicencio, al pie de los Andes) que va del borde izquierdo al derecho a la altura y.
  const cordillera = (y, c1 = '#7aa0c4', c2 = '#9bbbd9') => `<path d="M0,${y} L60,${y - 90} L120,${y - 50} L190,${y - 130} L260,${y - 70} L330,${y - 110} L400,${y - 40} L800,${y - 10} L800,${y + 40} L0,${y + 40}Z" fill="${c1}"/><path d="M0,${y + 10} L90,${y - 50} L170,${y - 10} L250,${y - 60} L330,${y - 20} L440,${y - 30} L800,${y} L800,${y + 40} L0,${y + 40}Z" fill="${c2}"/>`;
  // Garza blanca del Llano, de pie (patas en 0,0).
  const garza = `<path d="M0,0 L-2,-22 M6,0 L4,-22" stroke="#d6a43a" stroke-width="2"/><ellipse cx="4" cy="-30" rx="15" ry="9" fill="#fff" stroke="#d9dee5" stroke-width="1.2"/><path d="M14,-34 Q22,-44 16,-56" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="17" cy="-58" r="5" fill="#fff"/><path d="M21,-58 L33,-56 L21,-55Z" fill="#e8b931"/><circle cx="18.5" cy="-59" r="1" fill="#222"/>`;

  return { label, mariela, marielaNina, sofia, gente, geranio, maceta, brote, libro, libroAbierto, hoja, cordillera, garza };
})();
