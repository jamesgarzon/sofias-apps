// Arranque de la app. Todo lo genérico (inicio, aprende, 4 juegos, pasaporte) lo pone el kit;
// aquí van las pantallas propias para memorizar (en js/memoria.js): «De memoria» y «Completa».
window.APP = Kit.start({
  data: window.APP_DATA,
  scenes: window.APP_SCENES,
  extras: [
    { emoji: '🌱', title: 'De memoria', sub: 'Recita y haz crecer tu matica', screen: 'memoria' },
    { emoji: '✏️', title: 'Completa', sub: '¿Qué palabra falta?', screen: 'completa' },
  ],
  screens: window.MEMORIA_SCREENS,
});
