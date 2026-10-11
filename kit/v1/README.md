# Kit v1 — piezas compartidas de las apps de Sofía

Extraído de `historia/` («Viajera del Tiempo»). Una app nueva = **contenido** (`js/data.js`) +
**escenas SVG** (`js/scenes.js`) + **tema** (`tema.css`). El kit pone todo lo demás:

- Inicio con Cronos (búho guía con disfraz), viajes, juegos, extras y créditos de fotos.
- **Aprende**: escenas animadas con chispas ✨ → zoom + dato + voz; sello 🛂 al descubrir todo; viaje con túnel (con contador de años si los temas tienen `year`).
- **4 juegos**: Quiz (con explicación), Ordena (arrastrar), Portales (clasificar), Memoria.
- Pasaporte con sellos y trofeos, estrellas ⭐ en `localStorage`, confeti, sonidos WebAudio, voz (mp3 o del dispositivo), español/inglés, tema oscuro o claro.

Archivos: `kit.js` (motor y pantallas) · `kit-svg.js` (dibujo y Cronos) · `kit.css` (estilos) ·
`gen_audio.py` (voces) · `tools/capturas.js` (verificación) · `catalogo.html` (vitrina visual).
La app de ejemplo completa es **`/plantilla/`**: cópiala para empezar.

> **Versionado**: las apps cargan `../kit/v1/…`. Arreglos y mejoras compatibles van en v1.
> Un cambio que rompa el esquema o la API va en `kit/v2/` (las apps viejas siguen en v1).

## Empezar una app

```bash
cp -r plantilla mi-app          # carpeta nueva junto a las demás
# editar mi-app/js/data.js (meta.id = "mi-app"), mi-app/js/scenes.js, mi-app/tema.css
# borrar la pantalla de ejemplo (termómetro) de mi-app/js/app.js si no aplica
```

`index.html` carga, en este orden: `kit-svg.js`, `js/data.js`, `js/scenes.js`, `audio/ready.js`, `kit.js`, `js/app.js`.

## Esquema de `js/data.js`

`window.APP_DATA = /*JSON*/{ … }/*END*/;` — **JSON estricto** entre los comentarios (lo lee `gen_audio.py`).

| Clave | Contenido |
|---|---|
| `meta` | `id` (prefijo de localStorage: usar el nombre de la carpeta), `lang` (`es`/`en`), `title` (1.ª palabra y resto en dos colores), `subtitle`, `costume` (disfraz de Cronos), `theme` (`dark`/`light`), `sky` (`stars`/`bubbles`/`none`), `topicWord` («Etapa», «Tema»…), `greeting`, `tip`, `quizShip`, `cardBack`, `games` (renombrar juegos: `{"quiz": ["❓","Quiz del Chef","sub"]}`) |
| `groups` | `[{id, name, emoji, sub, gradient, topics: [ids]}]`. Con 1 grupo no hay selector; con 2+ aparece «¡Todo junto!». |
| `topics` | `{id: {name, short, emoji, color, dark, intro, hotspots, year?, chips?, marks?, reveal?, note?}}` |
| `topics.*.hotspots` | `[{emoji, title, text, photo?: {src, credit}}]` — uno por chispa de la escena, en el mismo orden que `hs`. `photo` (opcional) muestra una foto real en la tarjeta y su crédito en el inicio. |
| `topics.*.year` | Número (negativo = a.C.). Si **todos** los temas de un grupo lo tienen, el viaje cuenta años. |
| `topics.*.chips` / `marks` | Chips de la tarjeta (`["476","1492"]` → `476 ➜ 1492`) y filas `[{icon, label, text}]` («Empieza / Termina», «Forma / Temperatura»…). |
| `questions` | `[{id, topic, emoji?, q, opts: [correcta, …], why}]` — **la primera opción es la correcta** (se barajan). `quizSize` (raíz) = preguntas por partida (10). |
| `order` | `{top?, bottom?, sub?, rounds: [...]}`. Ronda de temas: `{set, title, topics: groupId}` (orden de `groups.topics`, revela `reveal` o `chips`). Ronda de hechos: `{set, title, events: [{topic?, e, t, y, reveal?, c?}], pick?}` (se ordena por `y`; `pick` toma uno por tema). `say`: clave de voz al empezar. |
| `sort` | `{items: [{topic, e, t}], per?, hint?}` — Portales: un portal por tema del grupo. |
| `clues` | `{topicId: [[emoji, texto], …]}` — Memoria (≥3 temas). Varias pistas por tema = partidas distintas. |
| `facts` | Datos curiosos que cuenta Cronos al tocarlo. |
| `voice` | Frases con voz: `welcome`, `ok-0..5`, `bad-0..2`, `win`, `good`, `stamp`, `order-ok`, `order-bad`, `sort`, `memory`, `pair`, `passport` + las de rondas y pantallas propias. Copiarlas de la plantilla. |

Un juego aparece sólo si tiene datos (`questions`, `order.rounds`, `sort.items`, `clues`).

## Escenas (`js/scenes.js`)

```js
window.APP_SCENES = { topicId: { svg: () => '<rect …/>…', hs: [[x, y], …] } };
```

- viewBox **800×500**; `hs` en esas coordenadas, uno por hotspot del tema.
- Ayudantes en `KitSVG`: `lin`, `rad`, `at`, `sun`, `cloud`, `stars`, `birds`, `smoke`, `palm`, `tree`, `hill`, `waves`, `grass`, `sparkle`, `house`, `flagBody`, `flagPole`, `person({...})`, `owl(costume)`. Mira `catalogo.html`.
- Animaciones: clases `a-bob a-drift a-flicker a-spin a-sway a-twinkle a-glow a-smoke a-wave a-rock a-fly a-flap a-flag a-pulse a-rise a-drip a-flow…` (en `kit.css`).
- **Una animación CSS reemplaza el `transform` del mismo elemento**: lo animado va dentro de un `<g>` posicionado → `at(x, y, s, inner, 'a-bob')`.
- En SVG, `transform-origin: center` NO es el centro del dibujo; con `transform-box: view-box` usa `0 0` si el dibujo está centrado en el origen.
- Chispas: ≥110 unidades entre sí (en teléfono miden 46 px) y sin tapar caras.

## Pantallas propias y API

```js
Kit.start({
  data: APP_DATA, scenes: APP_SCENES,
  hero: (K) => '…',                                   // opcional: reemplaza el portal del inicio
  extras: [{ emoji, title, sub, screen: 'mipantalla' }],
  screens: { mipantalla(v, params, K) { v.innerHTML = K.topbar('Título') + '…'; } },
});
```

`K` trae: `go(screen, params)`, `topbar`, `say([clave, texto], botón?)`, `sayChain`, `stopVoice`, `T` (claves de voz: `T.v('clave')`, `T.topic(id)`…),
`SFX` (`tap pop ding buzz soft whoosh arrive fanfare stamp flip portal place tick`), `addStars(n, el)`, `confetti`, `burst(el)`, `celebrate`,
`openOverlay(html, {onClose, light})`, `closeOverlay`, `results({score, total, earned, again, title?, msg?})`, `warp({fromY?, toY?, name})`,
`makeDraggable(el, {onTap, onDrop, canDrag})`, `flip(els, mutate)`, `owlHTML(clase)`, `stampSVG(id)`, `store`, `shuffle`, `pick`, `esc`, `TOPICS`, `GROUPS`, `D`, `M`.

## Tema visual (`tema.css`)

Variables `--k-*` de `kit.css`: fondo (`--k-bg`, `--k-bg-image`), tinta (`--k-ink`, `-2`, `-3`), paneles, modales,
botón principal (`--k-acc-top/bot/edge/ink`), fuentes (`--k-font-h/b`), `--k-hero` (brillo del inicio).
`meta.theme: "light"` activa la base clara. Cada app debe tener **su** estética: colores, escenas y disfraz.

## Voz

Claves: `topic-<id>`, `hs-<id>-<n>`, `q-<id>`, `why-<id>`, `v-<clave>`, `fact-<n>`.
`python3 ../kit/v1/gen_audio.py` (desde la carpeta de la app, con `edge-tts` instalado con pipx) crea `audio/*.mp3` y marca
`audio/ready.js`. Sin mp3, la app usa la mejor voz del dispositivo; si falta un mp3 suelto, sigue con la del dispositivo.
Voces: español `es-CO-SalomeNeural` (-8 %), inglés `en-US-JennyNeural` (-10 %).

## Verificar antes de publicar

```bash
python3 -m http.server 8765 &
node kit/v1/tools/capturas.js http://localhost:8765/mi-app/ /tmp/capturas   # teléfono + tablet; falla si hay errores JS
```
