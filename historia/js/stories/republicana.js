// Historias del Periodo Republicano: escena animada que se reproduce al tocar cada chispa (mismo orden que los hotspots).
// Coordenadas del viewBox 800×500. Se ve con zoom ×1,9 centrado en la chispa: deja lo importante cerca de ella.
window.STORIES = window.STORIES || {};
window.STORIES.republicana = (() => {
  // Objeto propio en la mano: se dibuja una carta (o un pincel con act 'paint') y se cambia por `svg` en coordenadas de la mano.
  const HAND = { down: [22, -37.5], up: [25, -89], out: [32, -52], wave: [31, -85] };
  const LETTER = /<rect x="[-\d.]+" y="[-\d.]+" width="20" height="14" rx="1.5" fill="#fffaf0" stroke="#c9b28a"\/><path d="[^"]*" stroke="#c9b28a" fill="none"\/><circle cx="[-\d.]+" cy="[-\d.]+" r="2.6" fill="#c62828"\/>/;
  const BRUSH = /<line x1="([-\d.]+)" y1="([-\d.]+)" x2="[-\d.]+" y2="[-\d.]+" stroke="#c99a2e" stroke-width="3" stroke-linecap="round"\/><path d="M[-\d.]+,[-\d.]+ l4,-6 l2,2Z" fill="#c0452b"\/>/;
  const hold = (person, o, pose, svg) => { const [hx, hy] = HAND[pose]; return person({ ...o, arm: pose, item: 'letter' }).replace(LETTER, `<g transform="translate(${hx} ${hy})">${svg}</g>`); };
  const withPen = (svg, pen) => svg.replace(BRUSH, (m, x1, y1) => `<g transform="translate(${+x1 + 4} ${+y1 - 6})">${pen}</g>`);
  const txt = (x, y, t, fs, c, w = 600) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="${w}" font-size="${fs}" fill="${c}">${t}</text>`;
  const label = (x, y, t, c, fs = 15) => {
    const w = t.length * fs * 0.58 + 18;
    return `<rect x="${x - w / 2}" y="${y - fs * 0.9 - 4}" width="${w}" height="${fs * 1.25 + 8}" rx="${fs * 0.7}" fill="#fff" stroke="${c}" stroke-width="2.5"/>${txt(x, y + 2, t, fs, c)}`;
  };
  const ribbon = (x, y, t, c, fs = 16) => {
    const w = t.length * fs * 0.6 + 34;
    return `<path d="M${x - w / 2},${y - 15} H${x + w / 2} L${x + w / 2 - 10},${y} L${x + w / 2},${y + 15} H${x - w / 2} L${x - w / 2 + 10},${y}Z" fill="${c}"/>${txt(x, y + fs * 0.36, t, fs, '#fff', 700)}`;
  };
  // banda presidencial (tricolor) en diagonal sobre el pecho de un personaje no volteado con los pies en (x,y) y escala s
  const sash = (x, y, s) => [['#fcd116', 0], ['#003893', 4.5 * s], ['#ce1126', 8 * s]].map(([c, o]) => `<path d="M${x - 12 * s + o * 0.6},${y - 66 * s} L${x + 12 * s + o * 0.6},${y - 34 * s}" stroke="${c}" stroke-width="${(o ? 3.6 : 5) * s}" stroke-linecap="round"/>`).join('');
  const dove = '<ellipse cx="0" cy="0" rx="12" ry="8" fill="#fff"/><circle cx="-10" cy="-6" r="6" fill="#fff"/><path d="M-16,-6 l-5,2 l5,1Z" fill="#f2a43a"/><circle cx="-11" cy="-7" r="1.3" fill="#222"/><g class="a-wing"><path d="M2,-4 Q10,-22 22,-18 Q14,-8 2,-4Z" fill="#eef1f6"/></g><path d="M10,2 L22,6 L12,-2Z" fill="#eef1f6"/>';
  return {
    css: `
      .st-republicana-in, .st-republicana-apart { transform-box: fill-box; transform-origin: 50% 50%; }
      .st-republicana-in { animation: st-republicana-in 1s cubic-bezier(.3, 1.3, .5, 1) both; }
      @keyframes st-republicana-in { from { transform: translate(var(--x), var(--y)) rotate(var(--r)); opacity: 0; } 30% { opacity: 1; } }
      .st-republicana-apart { animation: st-republicana-apart .9s ease-out both; }
      @keyframes st-republicana-apart { to { transform: translate(var(--x), var(--y)) rotate(var(--r)); } }
      .st-republicana-hide { animation: st-republicana-hide .35s ease-in both; }
      @keyframes st-republicana-hide { to { opacity: 0; } }
      .st-republicana-tug { animation: st-republicana-tug .25s ease-in-out infinite alternate; }
      @keyframes st-republicana-tug { to { transform: translateY(-2px); } }
      .st-republicana-drop { transform-box: fill-box; transform-origin: 50% 0; animation: st-republicana-drop .9s ease-in both; }
      @keyframes st-republicana-drop { to { transform: translate(var(--x), 34px) rotate(var(--r)); opacity: 0; } }
      .st-republicana-fly { animation: st-republicana-fly 2.6s ease-out both; }
      @keyframes st-republicana-fly { from { transform: translate(0, 0) scale(.5); opacity: 0; } 12% { opacity: 1; } to { transform: translate(var(--x), var(--y)); } }
      .st-republicana-toc { animation: st-republicana-toc .8s infinite; opacity: 0; }
      @keyframes st-republicana-toc { 0%, 40% { opacity: 0; } 47% { opacity: 1; } 75%, 100% { opacity: 0; } }
      @media (prefers-reduced-motion: reduce) { .st-republicana-tug, .st-republicana-toc { animation: none; } }`,
    play: [
      // 0 · La Gran Colombia: cuatro piezas (Panamá, Venezuela, Ecuador y Colombia) se unen, Bolívar es el presidente y en 1830 se separan
      ({ at, person, flagBody, sparkle }) => {
        const W = 60, FH = 30, TH = 46;
        const tile = (type, name) => `<g>${flagBody(type, W, FH)}</g><rect y="${FH}" width="${W}" height="${TH - FH}" fill="#fff"/>${txt(W / 2, FH + 12.5, name, 12, '#33415c')}<rect width="${W}" height="${TH}" rx="3" fill="none" stroke="#fff" stroke-width="3"/>`;
        const pieces = [['pan', 'Panamá', 220, 210, -90, -50, -20, -14, -8, -4], ['ven', 'Venezuela', 280, 210, 90, -60, 20, 14, -8, 4], ['ecu', 'Ecuador', 220, 256, -90, 50, 15, -14, 8, 4], ['col', 'Colombia', 280, 256, 80, 60, -15, 14, 8, -4]];
        return `
        ${pieces.map(([type, name, x, y, ix, iy, r, ox, oy, or], i) => at(0, 0, 1, at(x, y, 1, tile(type, name), 'st-republicana-in', `--x:${ix}px;--y:${iy}px;--r:${r}deg;animation-delay:${0.3 + i * 0.4}s`), 'st-republicana-apart', `--x:${ox}px;--y:${oy}px;--r:${or}deg;animation-delay:4.3s`)).join('')}
        ${at(0, 0, 1, at(0, 0, 1, `<rect x="215" y="205" width="130" height="102" rx="6" fill="none" stroke="#e8b931" stroke-width="5"/>`, 's-fade', 'animation-delay:2s'), 's-out', 'animation-delay:4.1s')}
        ${at(0, 0, 1, at(280, 256, 1, ribbon(0, 0, 'Gran Colombia', '#1f4fa3', 16), 's-stamp', 'animation-delay:2.2s'), 's-out', 'animation-delay:4.1s')}
        ${at(0, 0, 1, person({ x: 398, y: 425, s: 1.05, skin: '#e3b08a', top: '#1f3a8a', bottom: '#f4f1e8', hair: '#1d120b', hat: 'bicorne', epaulettes: true, cape: '#a8322d', boots: true, act: 'wave', delay: 0 }) + sash(398, 425, 1.05), 's-from-r')}
        ${at(404, 280, 1, label(0, 0, 'Presidente', '#a8322d', 13), 's-in', 'animation-delay:2.8s')}
        ${at(280, 256, 1, ribbon(0, 0, '1830', '#c62828', 17), 's-stamp', 'animation-delay:4.6s')}
        ${[[214, 214, 2.6], [350, 300, 2.9]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd23f', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
      },
      // 1 · El Capitolio: el poder se divide en tres; el presidente saluda, el Congreso hace una ley y el juez golpea su mazo
      ({ at, person }) => {
        const law = `<rect x="-6" y="-34" width="36" height="28" rx="2" fill="#fffaf0" stroke="#9aa6bb" stroke-width="1.5"/>${txt(12, -15, 'LEY', 12, '#1f4fa3', 700)}`;
        const gavel = `<rect x="-2" y="-26" width="4" height="30" rx="2" fill="#7a4a24"/><rect x="-11" y="-37" width="22" height="12" rx="3" fill="#5b3418"/><rect x="-11" y="-37" width="5" height="12" rx="2" fill="#8b5a2b"/>`;
        return `
        ${at(0, 0, 1, person({ x: 292, y: 357, s: 1, skin: '#e3b08a', top: '#2b2b3a', bottom: '#2b2b3a', hair: '#3a2416', act: 'wave', delay: 0 }) + sash(292, 357, 1), 's-up', 'animation-delay:.2s')}
        ${at(292, 214, 1, label(0, 0, 'Presidente', '#9a6b00', 15), 's-in', 'animation-delay:.8s')}
        ${at(0, 0, 1, hold(person, { x: 400, y: 357, s: 1, skin: '#c58a5c', top: '#2e7d6a', dress: true, hair: '#2b1b12', hairStyle: 'long', act: 'raise', delay: 0 }, 'up', law), 's-up', 'animation-delay:1.4s')}
        ${at(400, 214, 1, label(0, 0, 'Congreso', '#1f4fa3', 15), 's-in', 'animation-delay:2s')}
        ${at(0, 0, 1, `<rect x="548" y="282" width="42" height="75" rx="3" fill="#8b5a2b"/><rect x="544" y="278" width="50" height="8" rx="3" fill="#6b4423"/><path d="M556,300 h26 M556,320 h26" stroke="#6b4423" stroke-width="2"/>`, 's-up', 'animation-delay:2.6s')}
        ${at(0, 0, 1, hold(person, { x: 508, y: 357, s: 1, skin: '#8a5a3a', top: '#1d1d2b', dress: true, hair: '#cfd2da', act: 'hammer', delay: 0 }, 'up', gavel), 's-up', 'animation-delay:2.6s')}
        ${at(508, 214, 1, label(0, 0, 'Jueces', '#5b3a1a', 15), 's-in', 'animation-delay:3.2s')}
        ${at(0, 0, 1, `<g class="st-republicana-toc">${txt(572, 250, '¡Toc!', 16, '#5b3a1a', 700).replace('<text', '<text stroke="#fff" stroke-width="4" paint-order="stroke"')}</g>`, 's-fade', 'animation-delay:3.4s')}`;
      },
      // 2 · Fin de la esclavitud (1851): un hombre y una mujer rompen la cadena, celebran su libertad y vuelan las palomas
      ({ at, person, sparkle }) => {
        const links = (x1, x2, y) => Array.from({ length: 6 }, (_, i) => {
          const t = (i + 0.5) / 6, x = x1 + (x2 - x1) * t, yy = y + Math.sin(Math.PI * t) * 7;
          return `<ellipse cx="${x.toFixed(1)}" cy="${yy.toFixed(1)}" rx="${i % 2 ? 4.6 : 3.4}" ry="${i % 2 ? 3 : 4.2}" fill="none" stroke="#8d949c" stroke-width="2.4"/>`;
        });
        const chain = (x1, x2, y, d) => {
          const L = links(x1, x2, y);
          return at(0, 0, 1, `<g class="st-republicana-drop" style="--x:-10px;--r:-50deg;animation-delay:${d}s">${L.slice(0, 3).join('')}</g><g class="st-republicana-drop" style="--x:10px;--r:50deg;animation-delay:${d}s">${L.slice(3).join('')}</g>`, 'st-republicana-tug');
        };
        const man = { x: 334, y: 400, s: 1.2, skin: '#5a3825', top: '#f6f3ea', bottom: '#7a6a52', hair: '#16100b', hairStyle: 'curly', delay: 0 };
        const woman = { x: 432, y: 400, s: 1.15, skin: '#6b4226', top: '#e8a33d', dress: true, hair: '#16100b', hat: 'scarf', scarfColor: '#e23b3b', delay: 0 };
        const flash = '<path d="M0,-16 L4,-5 L15,-6 L6,2 L12,13 L1,6 L-4,16 L-5,4 L-16,6 L-7,-1 L-14,-11 L-3,-5Z" fill="#fff6b0"/>';
        return `
        ${at(0, 0, 1, person({ ...man, act: 'none' }), 'st-republicana-hide', 'animation-delay:1.8s')}
        ${at(0, 0, 1, person({ ...woman, act: 'none' }), 'st-republicana-hide', 'animation-delay:1.8s')}
        ${chain(308, 360, 355, 1.7)}${chain(407, 457, 357, 1.7)}
        ${[[334, 362], [432, 364]].map(([x, y]) => at(x, y, 1, flash, 's-flash', 'animation-delay:1.6s')).join('')}
        ${at(0, 0, 1, person({ ...man, act: 'cheer' }), 's-fade', 'animation-delay:1.8s;animation-duration:.3s')}
        ${at(0, 0, 1, person({ ...woman, act: 'cheer' }), 's-fade', 'animation-delay:1.8s;animation-duration:.3s')}
        ${at(384, 218, 1, `<rect x="-76" y="-32" width="152" height="64" rx="6" fill="#fffaf0" stroke="#c9a26b" stroke-width="3"/>${txt(0, -4, '1851', 24, '#1f4fa3', 700)}${txt(0, 20, '¡Libertad!', 17, '#2e7d32', 700)}`, 's-stamp', 'animation-delay:2.4s')}
        ${[[380, 268, -118, -68, 2.6], [386, 268, 92, -64, 2.9], [382, 276, -92, -30, 3.3]].map(([x, y, dx, dy, d]) => at(x, y, 1, at(0, 0, 0.8, dove), 'st-republicana-fly', `--x:${dx}px;--y:${dy}px;animation-delay:${d}s`)).join('')}
        ${[[296, 196, 4.4], [474, 206, 4.7]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd23f', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
      },
      // 3 · Nuestro nombre: un pintor cambia el letrero: Nueva Granada → Estados Unidos de Colombia → República de Colombia (1886)
      ({ at, person, sparkle }) => `
        ${at(0, 0, 1, `<path d="M456,286 V334 M620,286 V334" stroke="#6b4423" stroke-width="6" stroke-linecap="round"/>
          <rect x="430" y="210" width="216" height="78" rx="6" fill="#fffaf0" stroke="#8b5a2b" stroke-width="5"/>`, 's-in', 'animation-delay:.1s')}
        ${at(0, 0, 1, `${txt(538, 257, 'Nueva Granada', 24, '#3a5a8a', 700)}<path d="M448,250 L628,250" pathLength="1" stroke="#c62828" stroke-width="5" stroke-linecap="round" class="s-draw" style="animation-delay:1.5s;animation-duration:.5s"/>`, 'st-republicana-hide', 'animation-delay:2.3s')}
        ${at(0, 0, 1, `<g class="s-fade" style="animation-delay:2.5s">${txt(538, 243, 'Estados Unidos', 21, '#7a3d9a', 700)}${txt(538, 270, 'de Colombia', 21, '#7a3d9a', 700)}</g><path d="M452,268 L624,234" pathLength="1" stroke="#c62828" stroke-width="5" stroke-linecap="round" class="s-draw" style="animation-delay:3.5s;animation-duration:.5s"/>`, 'st-republicana-hide', 'animation-delay:4.3s')}
        <g class="s-stamp" style="animation-delay:4.5s">${txt(538, 245, 'República', 24, '#1f4fa3', 700)}${txt(538, 273, 'de Colombia', 22, '#1f4fa3', 700)}</g>
        ${at(538, 308, 1, ribbon(0, 0, '1886', '#c62828', 17), 's-stamp', 'animation-delay:5s')}
        ${at(438, 334, 1, `<path d="M-10,0 L-12,-18 L12,-18 L10,0Z" fill="#9aa6bb"/><ellipse cy="-18" rx="12" ry="3.5" fill="#1f4fa3"/><path d="M-12,-18 Q0,-30 12,-18" stroke="#5a6478" stroke-width="1.6" fill="none"/>`, 's-in', 'animation-delay:.3s')}
        ${at(0, 0, 1, person({ x: 396, y: 332, s: 1.12, skin: '#c58a5c', top: '#2f6fb3', bottom: '#2f6fb3', hair: '#2b1b12', hat: 'beret', hatColor: '#f5c518', act: 'paint', delay: 0 }), 's-from-l')}
        ${[[452, 214, 5.3], [628, 284, 5.6]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd23f', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`,
      // 4 · La Constitución de 1991: una constituyente la firma y su luz protege los derechos de todos, también de los niños
      ({ at, person, sparkle }) => {
        const pen = '<path d="M-6,-24 L14,6" stroke="#1f4fa3" stroke-width="4" stroke-linecap="round"/><path d="M12,3 L16,9" stroke="#e8b931" stroke-width="2.4" stroke-linecap="round"/>';
        const shield = `<path d="M-28,-30 L28,-30 L28,0 Q28,24 0,34 Q-28,24 -28,0Z" fill="#fff8e1" stroke="#e8b931" stroke-width="4"/><path d="M0,12 C-20,-2 -12,-22 0,-10 C12,-22 20,-2 0,12Z" fill="#ec3d8c"/>`;
        const kid = (o, act) => person({ ...o, act, delay: 0 });
        const girl = { x: 338, y: 440, s: 0.76, skin: '#a86b45', top: '#f2ecdc', dress: true, belt: '#e04e39', hair: '#1b120c', hairStyle: 'long' };
        const boy = { x: 390, y: 440, s: 0.74, skin: '#5a3825', top: '#f5c518', bottom: '#2f5d8a', hair: '#16100b', hairStyle: 'curly' };
        return `
        ${at(560, 318, 1, ribbon(0, 0, 'Constitución', '#1f4fa3', 15), 's-stamp', 'animation-delay:.6s')}
        ${at(0, 0, 1, withPen(person({ x: 470, y: 440, s: 1.05, skin: '#d29a6a', top: '#7a3d9a', bottom: '#2b2b3a', hair: '#2b1b12', hairStyle: 'long', act: 'paint', delay: 0 }), pen), 's-from-l')}
        ${at(0, 0, 1, kid(girl, 'look'), 'st-republicana-hide', 'animation-delay:3.2s')}${at(0, 0, 1, kid(boy, 'look'), 'st-republicana-hide', 'animation-delay:3.2s')}
        ${at(0, 0, 1, kid(girl, 'cheer'), 's-fade', 'animation-delay:3.2s;animation-duration:.3s')}${at(0, 0, 1, kid(boy, 'cheer'), 's-fade', 'animation-delay:3.2s;animation-duration:.3s')}
        <path d="M538,364 Q476,282 400,296" pathLength="1" fill="none" stroke="#ffd23f" stroke-width="5" stroke-linecap="round" opacity=".9" class="s-draw" style="animation-delay:2s;animation-duration:1s"/>
        ${at(364, 300, 1, shield, 's-in', 'animation-delay:2.8s')}
        ${at(364, 248, 1, label(0, 0, 'Derechos', '#c2185b', 15), 's-in', 'animation-delay:3.3s')}
        ${at(314, 284, 1, `<rect x="-12" y="-10" width="24" height="18" rx="2" fill="#2f6fb3"/><path d="M0,-10 V8" stroke="#fff" stroke-width="2"/><path d="M-9,-6 h6 M-9,-2 h6 M3,-6 h6 M3,-2 h6" stroke="#fff" stroke-width="1.4"/>`, 's-in', 'animation-delay:3.7s')}
        ${at(314, 320, 1, `<circle r="10" fill="#fff" stroke="#33415c" stroke-width="2"/><path d="M-4,-3 L0,-6 L4,-3 L3,2 L-3,2Z" fill="#33415c"/>`, 's-in', 'animation-delay:4.1s')}
        ${[[412, 268, 4.4], [318, 236, 4.7], [600, 352, 5]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd23f', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
      },
      // 5 · ¡A votar!: una mujer vota en 1957 (la primera vez que votaron las mujeres) y otro ciudadano espera su turno
      ({ at, person, sparkle }) => {
        const urn = `<rect x="-26" y="-44" width="52" height="44" rx="4" fill="#e9eef7" stroke="#9aa6bb" stroke-width="2"/><rect x="-14" y="-48" width="28" height="5" rx="2" fill="#5a6478"/><rect x="-26" y="-26" width="52" height="10" fill="#fcd116"/><rect x="-26" y="-16" width="52" height="5" fill="#003893"/><rect x="-26" y="-11" width="52" height="5" fill="#ce1126"/>`;
        return `
        ${at(426, 447, 1.15, urn, 's-in', 'animation-delay:.1s')}
        ${at(426, 384, 1, `<g class="a-vote"><rect x="-7" y="-14" width="14" height="16" rx="1.5" fill="#fff" stroke="#b9c2d0"/><path d="M-3,-6 l3,3 l5,-7" stroke="#2e9d5b" stroke-width="2" fill="none"/></g>`, 's-fade', 'animation-delay:.6s')}
        ${at(0, 0, 1, person({ x: 478, y: 447, s: 1.08, skin: '#e3b08a', top: '#3b82c4', dress: true, hair: '#2b1b12', hairStyle: 'bun', hat: 'beret', hatColor: '#e23b3b', item: 'ballot', arm: 'out', flip: true, act: 'vote', delay: 0 }), 's-from-r')}
        ${at(560, 236, 1, ribbon(0, 0, '1957 · ¡Votan las mujeres!', '#c2185b', 15), 's-stamp', 'animation-delay:2s')}
        ${at(426, 340, 1, `<circle r="13" fill="#2e9d5b"/><path d="M-6,0 l4,5 l8,-10" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, 's-in', 'animation-delay:3.4s')}
        ${[[392, 330, 3.8], [470, 300, 4.1], [660, 280, 4.4]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#ffd23f', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
      },
    ],
  };
})();
