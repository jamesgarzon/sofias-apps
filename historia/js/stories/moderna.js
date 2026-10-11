// Historias de la Edad Moderna: escena animada que se reproduce al tocar cada chispa (mismo orden que los hotspots).
// Coordenadas del viewBox 800×500. Se ve con zoom ×1,9 centrado en la chispa: la persona que hace la acción va grande y al centro.
window.STORIES = window.STORIES || {};
window.STORIES.moderna = {
  css: `
    .st-moderna-hide { animation: st-moderna-hide .25s ease-in both; }
    @keyframes st-moderna-hide { to { opacity: 0; } }
    .st-moderna-platen { animation: st-moderna-platen 1.4s ease-in-out infinite; }
    @keyframes st-moderna-platen { 0%, 100% { transform: translateY(0); } 45%, 60% { transform: translateY(9px); } }
    .st-moderna-heave { animation: st-moderna-heave 1.4s ease-in-out infinite; }
    @keyframes st-moderna-heave { 0%, 100% { transform: rotate(4deg); } 45%, 60% { transform: rotate(12deg); } }
    .st-moderna-orbit { animation: st-moderna-orbit 4s linear infinite; }
    .st-moderna-unorbit { animation: st-moderna-orbit 4s linear infinite reverse; }
    @keyframes st-moderna-orbit { to { transform: rotate(360deg); } }
    .st-moderna-trip { animation: st-moderna-orbit 4s linear both; }
    .st-moderna-untrip { animation: st-moderna-orbit 4s linear both reverse; }
  `,
  play: [
    // 0 · Las carabelas de Colón: Colón señala el camino desde un bote y aparecen los nombres de las tres carabelas
    ({ at, person, caravel, sparkle }) => {
      const tag = (x, y, t, d, size = 15) => at(x, y, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="${size}" fill="#7a1f1f" stroke="#fffaf0" stroke-width="5" paint-order="stroke" stroke-linejoin="round">${t}</text>`, 's-in', `animation-delay:${d}s`);
      const sailor = (x, top) => person({ x, y: -4, s: 0.62, skin: '#e3b08a', top, bottom: '#3a4a6a', hair: '#3a2414', flip: true, act: 'row' });
      const boat = `
        
        ${sailor(10, '#e9e2d0')}${sailor(38, '#c8553d')}
        
        ${person({ x: -28, y: -4, s: 0.82, skin: '#efc39b', top: '#7a2e3a', bottom: '#3a2f2a', hair: '#d9d2c5', hairStyle: 'long', hat: 'beret', hatColor: '#2b2622', flip: true, act: 'point', delay: 0 })}
        <path d="M-60,-14 L58,-14 Q54,6 36,10 L-38,10 Q-56,6 -60,-14Z" fill="#c98a4b"/><path d="M-60,-14 L58,-14" stroke="#6b4423" stroke-width="4" stroke-linecap="round"/><path d="M-54,-4 Q0,2 54,-4" stroke="#fffaf0" stroke-width="3" fill="none"/>
        <path d="M-2,-26 L-30,12 M26,-26 L-2,12" stroke="#6b4423" stroke-width="3.2" stroke-linecap="round"/><ellipse cx="-31" cy="13" rx="6" ry="3" fill="#6b4423"/><ellipse cx="-3" cy="13" rx="6" ry="3" fill="#6b4423"/>
        <path d="M-70,14 q10,-5 20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0" stroke="#bfe9ff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".8"/>`;
      return `
        ${at(0, 0, 1, caravel(366, 300, 0.38, { d: -0.8 }), 's-from-l', 'animation-delay:.2s')}
        <defs><linearGradient id="st-moderna-sea" gradientUnits="userSpaceOnUse" x1="0" y1="270" x2="0" y2="500"><stop offset="0" stop-color="#2295c9"/><stop offset="1" stop-color="#0b4d78"/></linearGradient></defs>
        ${at(0, 0, 1, `<path d="M384,344 ${Array.from({ length: 9 }, () => 'q20,-7 40,0').join(' ')} L744,420 L384,420Z" fill="url(#st-moderna-sea)"/><path d="M384,344 ${Array.from({ length: 9 }, () => 'q20,-7 40,0').join(' ')}" stroke="#bfe9ff" stroke-width="3" fill="none" opacity=".7"/>`, 's-fade', 'animation-delay:.2s')}
        ${at(0, 0, 1, at(478, 344, 1, boat, 'a-bob'), 's-from-r', 'animation-delay:.4s')}
        ${tag(330, 166, '1492', 1.2, 24)}
        ${tag(520, 150, 'Santa María', 2)}
        ${tag(284, 222, 'Pinta', 2.6)}
        ${tag(368, 222, 'Niña', 3.2)}
        ${[[462, 146, 3.8], [580, 146, 4], [326, 204, 4.2]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 1 · Libros para todos: un impresor jala la barra de la imprenta, salen libros uno tras otro y una niña lee
    ({ at, person, sparkle }) => {
      const book = (c) => `<rect x="-17" y="-8" width="34" height="8" rx="1.5" fill="${c}"/><rect x="-14" y="-6.5" width="30" height="5" fill="#fffaf0"/><rect x="-17" y="-8" width="5" height="8" rx="1.5" fill="${c}"/>`;
      return `
        ${at(320, 445, 1.15, `
          <rect x="-32" y="-115" width="9" height="115" rx="2" fill="#7a4f28"/><rect x="25" y="-115" width="9" height="115" rx="2" fill="#7a4f28"/>
          <rect x="-38" y="-121" width="78" height="12" rx="3" fill="#8a5a2c"/><rect x="-40" y="-9" width="82" height="9" rx="2" fill="#6b4423"/>
          <rect x="-4" y="-109" width="10" height="44" fill="#9aa0a6"/>${[-103, -95, -87, -79, -71].map((y) => `<path d="M-4,${y} l10,4" stroke="#6b7177" stroke-width="2"/>`).join('')}
          <rect x="-36" y="-43" width="74" height="8" rx="2" fill="#8a5a2c"/><rect x="-22" y="-49" width="46" height="6" fill="#fffaf0"/>
          <g class="st-moderna-platen"><rect x="-20" y="-67" width="42" height="10" rx="2" fill="#5b3a1a"/></g>
          <path d="M4,-64 L35,-35" stroke="#5b3a1a" stroke-width="5" stroke-linecap="round"/><circle cx="4" cy="-64" r="4" fill="#5b3a1a"/>`, 's-in', 'animation-delay:.1s')}
        ${at(0, 0, 1, at(376, 441, 1, person({ x: 0, y: 0, s: 1, skin: '#e3b08a', top: '#3a3f5c', bottom: '#2b2622', hair: '#6b4a2b', hat: 'beret', hatColor: '#2b2622', act: 'idle', delay: 0 }), 'st-moderna-heave'), 's-from-r')}
        ${['#c62828', '#2f5fb3', '#2e9d5b', '#e0a32e', '#7a2e8e'].map((c, i) => at(256, 445 - i * 8, 1, book(c), 's-drop', `animation-delay:${1.2 + i * 0.7}s`)).join('')}
        ${at(0, 0, 1, person({ x: 206, y: 445, s: 0.82, skin: '#c58a5c', top: '#e05297', dress: true, hair: '#2b1b12', hairStyle: 'pigtails', item: 'book', itemColor: '#2f5fb3', arm: 'out', act: 'read' }), 's-from-l', 'animation-delay:3.2s')}
        ${at(320, 296, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="17" fill="#3a2a1a" stroke="#fffaf0" stroke-width="5" paint-order="stroke" stroke-linejoin="round">Imprenta</text>`, 's-in', 'animation-delay:.9s')}
        ${at(300, 258, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="18" fill="#7a1f1f" stroke="#fffaf0" stroke-width="5" paint-order="stroke" stroke-linejoin="round">¡Libros para todos!</text>`, 's-in', 'animation-delay:4.6s')}
        ${[[232, 392, 4.8], [282, 404, 5], [200, 330, 5.2]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 2 · El Renacimiento: Miguel Ángel pinta el techo de la Capilla Sixtina desde un andamio; Leonardo pinta la Mona Lisa
    ({ at, person, sparkle }) => {
      const tag = (x, y, t, d, c = '#5b2a1a') => at(x, y, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="15" fill="${c}" stroke="#fffaf0" stroke-width="5" paint-order="stroke" stroke-linejoin="round">${t}</text>`, 's-in', `animation-delay:${d}s`);
      const band = (y, c, d) => `<path d="M410,${y} L594,${y}" pathLength="1" stroke="${c}" stroke-width="15" fill="none" stroke-linecap="round" class="s-draw" style="animation-delay:${d}s;animation-duration:1s"/>`;
      return `
        ${at(0, 0, 1, `<path d="M392,372 L392,222 Q392,186 430,186 L574,186 Q612,186 612,222 L612,372Z" fill="#f3e6c8"/><path d="M392,372 L392,222 Q392,186 430,186 L574,186 Q612,186 612,222 L612,372Z" fill="none" stroke="#b89566" stroke-width="4"/>
          <path d="M392,246 L612,246" stroke="#d8c39a" stroke-width="3"/><path d="M400,372 L604,372" stroke="#b89566" stroke-width="6"/>`, 's-fade')}
        ${band(201, '#8fc3e8', 0.9)}${band(214, '#a9d2ef', 1.3)}${band(229, '#c9d9a0', 1.7)}
        ${at(0, 0, 1, `<path d="M428,229 Q450,224 474,234" stroke="#e8b48a" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="421" cy="224" r="7.5" fill="#e8b48a"/><path d="M415,220 Q421,212 428,220" fill="#6b4a2b"/>
          <path d="M432,225 Q460,212 488,216" stroke="#e8b48a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M488,216 L496,214" stroke="#e8b48a" stroke-width="3" stroke-linecap="round"/>`, 's-fade', 'animation-delay:2.2s;animation-duration:.9s')}
        ${at(0, 0, 1, `<ellipse cx="578" cy="211" rx="24" ry="13" fill="#d9798a"/><circle cx="557" cy="205" r="7.5" fill="#e8b48a"/><path d="M549.5,203 Q557,193 564.5,203" stroke="#f1f1f4" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M551,209 Q557,219 563,209 Q557,212 551,209Z" fill="#f1f1f4"/><circle cx="554" cy="205" r="1.2" fill="#2a1c14"/>
          <path d="M558,214 Q534,214 512,214" stroke="#e8b48a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M512,214 L503,214" stroke="#e8b48a" stroke-width="3" stroke-linecap="round"/>`, 's-fade', 'animation-delay:3s;animation-duration:.9s')}
        ${at(499, 214, 1, `<path d="M0,-6 L1.6,-1.6 L6,0 L1.6,1.6 L0,6 L-1.6,1.6 L-6,0 L-1.6,-1.6Z" fill="#fff6b0"/>`, 's-flash', 'animation-delay:3.8s;animation-duration:1.2s')}
        ${at(0, 0, 1, `<rect x="436" y="334" width="128" height="8" rx="2" fill="#8a5a2c"/><path d="M444,342 L444,370 M556,342 L556,370 M444,370 L556,342 M444,342 L556,370" stroke="#7a4f28" stroke-width="4" stroke-linecap="round"/>`, 's-up', 'animation-delay:.2s')}
        ${at(0, 0, 1, person({ x: 482, y: 334, s: 0.95, skin: '#efc39b', top: '#a8322d', bottom: '#3a2f2a', hair: '#3a2414', hairStyle: 'messy', item: 'stick', itemColor: '#e2b98a', act: 'dab', delay: 0 }), 's-up', 'animation-delay:.4s')}
        ${at(0, 0, 1, `<rect x="438" y="378" width="128" height="22" rx="8" fill="#fffaf0" stroke="#b89566" stroke-width="2"/><text x="502" y="394" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="14" fill="#5b2a1a">Capilla Sixtina</text>`, 's-in', 'animation-delay:4.2s')}
        ${tag(560, 300, 'Miguel Ángel', 4.4, '#2f2a55')}
        ${tag(730, 326, 'Mona Lisa', 4.8)}
        ${tag(652, 342, 'Leonardo', 5.1, '#2f2a55')}
        ${[[504, 196, 4], [700, 352, 5.2]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 3 · La ciencia: Galileo mira el cielo con su telescopio; ve la Luna y luego cómo la Tierra gira alrededor del Sol
    ({ at, person, sparkle, rad }) => {
      const stars = [[-40, -38], [30, -48], [48, 10], [-50, 20], [-14, 46], [20, 40], [-30, -8]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#fff" class="a-twinkle"/>`).join('');
      const moon = `${stars}<circle cx="6" cy="-4" r="30" fill="#f1ecd8"/><circle cx="-6" cy="-12" r="7" fill="#d9d0b4"/><circle cx="16" cy="6" r="9" fill="#d9d0b4"/><circle cx="2" cy="16" r="4.5" fill="#d9d0b4"/><circle cx="20" cy="-18" r="4" fill="#d9d0b4"/>`;
      const solar = `${stars}<circle r="50" fill="none" stroke="#9fb7e0" stroke-width="1.6" stroke-dasharray="4 4"/>
        <circle r="24" fill="url(#st-moderna-sunglow)"/><circle r="15" fill="#ffd34d"/>
        <g class="st-moderna-orbit"><g transform="translate(50 0)"><g class="st-moderna-unorbit"><circle r="9" fill="#3b82f6"/><path d="M-6,-3 q4,-5 8,-2 q-1,5 -6,5Z M2,3 q4,0 4,3 q-3,2 -5,0Z" fill="#4fbf6a"/></g></g></g>`;
      return `
        <defs>${rad('st-moderna-sunglow', [[0, '#fff3b0', 0.9], [1, '#fff3b0', 0]])}<clipPath id="st-moderna-lens"><circle cx="0" cy="0" r="66"/></clipPath></defs>
        ${at(0, 0, 1, `<path d="M262,281 L300,240 L300,322Z" fill="#fff6c4" opacity=".35"/>`, 's-fade', 'animation-delay:1.2s')}
        ${at(366, 262, 1, `<circle r="70" fill="#d4a52c"/><circle r="66" fill="#0f1e45"/>
          <g clip-path="url(#st-moderna-lens)">${at(0, 0, 1, moon, 'st-moderna-hide', 'animation-delay:3.2s')}${at(0, 0, 1, solar, 's-fade', 'animation-delay:3.2s;animation-duration:.4s')}</g>`, 's-in', 'animation-delay:1.2s')}
        ${at(366, 350, 1, ['La Tierra gira', 'alrededor del Sol'].map((t, i) => `<text y="${i * 18}" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="15" fill="#1f2f5a" stroke="#fffaf0" stroke-width="5" paint-order="stroke" stroke-linejoin="round">${t}</text>`).join(''), 's-in', 'animation-delay:3.6s')}
        ${at(0, 0, 1, `${person({ x: 190, y: 412, s: 1.1, skin: '#efc39b', top: '#4a3a5c', dress: true, hair: '#8a7a6a', arm: 'up', act: 'idle', delay: 0 })}
          <path d="M200,316 L262,281" stroke="#8a5a2c" stroke-width="9" stroke-linecap="round"/><path d="M203,314 L209,311 M248,289 L254,286" stroke="#d4a52c" stroke-width="10"/><circle cx="263" cy="281" r="5" fill="#cfe8ff"/>`, 's-from-l')}
        ${[[300, 196, 4.4], [440, 214, 4.6]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
    // 4 · La vuelta al mundo: Magallanes y Elcano señalan el globo mientras un barco le da la vuelta completa a la Tierra
    ({ at, person, sparkle }) => {
      const land = `${[0, 120].map((o) => `<g transform="translate(${o} 0)" fill="#4fbf6a"><path d="M-40,-18 q12,-12 26,-4 q8,10 -4,18 q-6,14 -16,8 q-14,-6 -6,-22Z"/><path d="M0,-24 q14,-6 22,4 q-4,10 -14,8Z"/><path d="M8,4 q12,-4 18,8 q-2,16 -12,20 q-10,-10 -6,-28Z"/><path d="M40,-14 q16,-8 30,2 q4,12 -10,14 q-14,4 -20,-16Z"/></g>`).join('')}`;
      const ship = `<path d="M-13,0 L13,0 L9,7 L-9,7Z" fill="#8b5a2b"/><line x1="0" y1="0" x2="0" y2="-22" stroke="#5b3a1a" stroke-width="2"/><path d="M-9,-20 Q0,-23 9,-20 L9,-5 Q0,-3 -9,-5Z" fill="#fbf6ea"/><rect x="-1.5" y="-17" width="3" height="10" fill="#d32f2f"/><rect x="-5" y="-13.5" width="10" height="3" fill="#d32f2f"/>`;
      const tag = (x, y, t, d) => at(x, y, 1, `<rect x="${-t.length * 3.4 - 7}" y="-13" width="${t.length * 6.8 + 14}" height="20" rx="7" fill="#fffaf0" stroke="#7a1f1f" stroke-width="2"/><text y="2" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="12" fill="#7a1f1f">${t}</text>`, 's-in', `animation-delay:${d}s`);
      return `
        <defs><clipPath id="st-moderna-globe"><circle r="46"/></clipPath></defs>
        ${at(330, 300, 1, `<rect x="-3.5" y="46" width="7" height="74" fill="#7a5230"/><ellipse cx="0" cy="122" rx="28" ry="6.5" fill="#5b3a1a"/>
          <circle r="46" fill="#2f86d1"/><g clip-path="url(#st-moderna-globe)">${at(0, 0, 1.5, land, 'a-globe')}</g>
          <ellipse cx="-15" cy="-19" rx="14" ry="9" fill="#fff" opacity=".28"/><path d="M0,-53 A53,53 0 0 1 0,53" stroke="#d4a52c" stroke-width="4.5" fill="none" transform="rotate(-20)"/>`, 's-in', 'animation-delay:.2s')}
        <path d="M392,300 A62,62 0 1 1 268,300 A62,62 0 1 1 392,300" pathLength="1" stroke="#fff6b0" stroke-width="3.5" fill="none" stroke-linecap="round" class="s-draw" style="animation-delay:1s;animation-duration:4s;animation-timing-function:linear"/>
        ${at(330, 300, 1, `<g class="st-moderna-trip" style="animation-delay:1s"><g transform="translate(62 0)"><g class="st-moderna-untrip" style="animation-delay:1s">${at(0, 4, 1.4, ship, 'a-rock')}</g></g></g>`, 's-in', 'animation-delay:.8s')}
        ${at(0, 0, 1, person({ x: 168, y: 424, s: 1, skin: '#e3b08a', top: '#2f4f7a', bottom: '#2b2622', hair: '#3a2414', hat: 'widebrim', act: 'talk' }), 's-from-l')}
        ${at(0, 0, 1, person({ x: 220, y: 424, s: 1, skin: '#d9a273', top: '#7a2e3a', bottom: '#3a2f2a', hair: '#2b1b12', act: 'point', delay: 0 }), 's-from-l', 'animation-delay:.3s')}
        ${tag(168, 272, 'Magallanes', 1.8)}
        ${tag(220, 299, 'Elcano', 2.2)}
        ${at(448, 244, 1, `<text text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="16" fill="#7a1f1f" stroke="#fffaf0" stroke-width="5" paint-order="stroke" stroke-linejoin="round">¡Vuelta</text><text y="20" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="16" fill="#7a1f1f" stroke="#fffaf0" stroke-width="5" paint-order="stroke" stroke-linejoin="round">completa!</text>`, 's-in', 'animation-delay:5s')}
        ${[[268, 300, 5.1], [330, 226, 5.3], [392, 304, 5.5]].map(([x, y, d]) => at(x, y, 1, sparkle(0, 0, 0, '#fff6b0', 1.3), 's-in', `animation-delay:${d}s`)).join('')}`;
    },
  ],
};
