---
name: nueva-app
description: Crear una app educativa nueva para Sofía (o rehacer una vieja) con el estándar del kit v1 — escenas SVG animadas con chispas, viaje con túnel, 4 juegos, pasaporte, Cronos disfrazado y voz. Úsala cuando pidan una app de estudio, repaso, quiz o examen para Sofía, o cuando pidan renovar una app existente.
---

# Nueva app para Sofía (kit v1)

Referencias: `kit/v1/README.md` (API y esquema), `plantilla/` (app de ejemplo completa),
`historia/` (la app original de la que salió el kit), `kit/v1/catalogo.html` (piezas y disfraces).

## 1. Entender el encargo
- Materia, curso e **idioma** (español para clases en español, inglés para clases en inglés).
- Temas exactos. Los textos de estudio salen **literalmente de los apuntes de Sofía** cuando los haya (es preparación de examen). Si no hay apuntes, usa contenido estándar de su curso (≈ 3.º de primaria, Colombia) y **dilo** al entregar, señalando las fechas o definiciones donde los libros difieren (ej.: fin de la Edad Media 1453 vs 1492 → `note`).
- Agrupa en 1–2 `groups` de 3–6 `topics`. Cada tema: intro corta + 3–6 chispas (datos de 1–3 frases).

## 2. Crear la carpeta
```bash
cp -r plantilla <app>      # nombre corto, en minúsculas
```
- `js/data.js`: `meta.id = "<app>"`, título, disfraz de Cronos según la materia (`viajero explorador cientifico doctor chef detective artista actor profe astronauta jardinero`), `theme` claro u oscuro según la estética.
- Llena preguntas (12–40, la 1.ª opción es la correcta, con `why`), rondas de Ordena, objetos de Portales y pistas de Memoria.
- Cuida que los juegos **no regalen la respuesta**: emojis o colores iguales entre pregunta y opción, distractores absurdos en todas las preguntas, pistas de Memoria con el mismo emoji que el tema.
- Borra o cambia la pantalla de ejemplo (termómetro) en `js/app.js`. Añade pantallas propias solo si aportan (ej.: `historia` tiene «Las dos líneas del tiempo»).

## 3. Dibujar las escenas (lo que más impacta)
- Una escena por tema en `js/scenes.js`, viewBox 800×500, con capas (cielo → fondo → medio → primer plano) y 3–6 elementos animados.
- Usa `KitSVG` (personas, nubes, árboles, banderas…) y dibuja a mano lo característico del tema.
- **Los personajes deben estar haciendo algo** propio del tema con `person({ act })`: campesinos cavando, caballeros luchando, gente celebrando, alguien leyendo o pintando. Revisa la pose congelando la animación en varios instantes (`document.getAnimations().forEach(a => { a.pause(); a.currentTime = t })`) y capturando.
- Proceso iterativo: dibuja → captura → mira la imagen → corrige. Revisa: proporciones, que nada quede cortado, contraste, chispas sobre el objeto correcto (sin tapar caras, ≥110 unidades entre sí).
- Representa a las personas con respeto (mismo estilo de cara para todos; sin estereotipos).
- Fotos reales solo cuando el realismo importa (cuerpo humano, animales, plantas): Wikimedia Commons, ~640 px JPEG en `img/`, en `hotspots[].photo` con autor + licencia. Revisa cada foto antes de usarla.

## 4. Verificar
```bash
python3 -m http.server 8765 &
NODE_PATH=/opt/node22/lib/node_modules node kit/v1/tools/capturas.js http://localhost:8765/<app>/ <scratchpad>/capturas
```
- Abre las capturas (teléfono y tablet) y revísalas de verdad. La herramienta falla si hay errores de JavaScript.
- Juega cada juego completo al menos una vez (los scripts de Playwright deben usar `click(..., { force: true })` porque los elementos animados nunca están quietos).
- Valida el JSON: `python3 -c "import re,json;json.loads(re.search(r'/\*JSON\*/(.*)/\*END\*/',open('<app>/js/data.js').read(),re.S).group(1))"`.

## 5. Voz
- `python3 ../kit/v1/gen_audio.py` desde la carpeta de la app (necesita `edge-tts`, instalado con `pipx`).
- En las sesiones en la nube **no funciona** (el proxy no deja pasar WebSocket): deja la app con la voz del dispositivo y pídele al papá que corra el script en su computador y haga commit de `audio/`.

## 6. Publicar
1. Enlazar la app en el hub `index.html` con su emoji (la plantilla y el kit **no** van en el hub).
2. Commit y push a `main` solo cuando el usuario lo pida → GitHub Pages publica solo.
3. `github.io` está bloqueado desde la nube: verifica el despliegue con las GitHub Actions («pages build and deployment»).

## Errores ya aprendidos
- Animación CSS en un elemento SVG con `transform="…"` lo mueve de sitio → anima un `<g>` interno (`at(..., 'a-clase')`).
- `transform-origin: center` en SVG con `transform-box: view-box` gira alrededor del centro del viewBox, no del dibujo.
- Un hijo absoluto dentro de un `display: grid; place-items: center` desplaza el contenido si no es `position: absolute`.
- Tarjetas con texto largo + `white-space: nowrap` desbordan el teléfono: deja que el texto se parta y pon `min-width: 0` en los hijos de grid/flex.
- `color-mix()` necesita un `background-color` de respaldo antes.
