// Escenas de los datos (Profesión, Estudios) — ver la cabecera de scenes.js (reglas, encuadre de las historias y piezas compartidas en SCN).
Object.assign(window.APP_SCENES, (() => {
  const { sun, cloud } = KitSVG;
  // BORRADOR: fondo liso hasta que se dibuje la escena.
  const draft = (c) => `<rect width="800" height="500" fill="${c}" opacity=".25"/>${sun(680, 90, 30)}${cloud(200, 90)}`;
  return {
    profesion: { hs: [[120, 120], [400, 120], [680, 260], [400, 400], [120, 380], [680, 420]], svg: () => draft('#0d9488'), story: [] },
    estudios: { hs: [[120, 120], [400, 120], [680, 260], [400, 400], [120, 380], [680, 420]], svg: () => draft('#0d9488'), story: [] },
  };
})());
