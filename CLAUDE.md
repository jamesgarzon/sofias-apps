# Sofia's Apps

Apps educativas para Sofía (≈8 años). Hub en `index.html`, desplegado en GitHub Pages: https://jamesgarzon.github.io/sofias-apps/

## Estándar para apps nuevas (desde «Viajera del Tiempo», octubre 2026)

**Toda app nueva o renovada se hace con el kit v1** — sigue la skill `nueva-app` (`.claude/skills/nueva-app/SKILL.md`).

- **Kit compartido** `kit/v1/` (API y esquema en `kit/v1/README.md`): pantallas, juegos, sonido, voz, estrellas, pasaporte y Cronos. Cada app = `js/data.js` (contenido) + `js/scenes.js` (escenas) + `tema.css` (estética). Se empieza copiando `plantilla/`.
- **Estructura**: una carpeta por app con `index.html`, `tema.css`, `js/`, `audio/` (y `img/` si hay fotos). HTML/CSS/JS vanilla, sin frameworks, sin build, sin npm. Google Fonts permitido (Fredoka + Nunito).
- **Aprende**: escenas **ilustradas en SVG y animadas**, propias de cada tema, con chispas ✨ que hacen zoom al dato, lo leen en voz alta y dan un sello 🛂 al completar el tema.
- **Juegos**: los del kit (Quiz con explicación, Ordena arrastrando, Portales para clasificar, Memoria) y, si aporta, una pantalla propia interactiva.
- **Guía**: Cronos, el búho, con el disfraz de la materia (`meta.costume`); el mismo personaje en todas las apps.
- **Diseño**: cada app con estética propia (paleta, escenas, tema claro u oscuro); mobile-first (teléfono/tablet), botones ≥44 px, contraste suficiente, funciona sin sonido y respeta «reducir movimiento».
- **Fotos reales**: opcionales, solo cuando el realismo importa (cuerpo, animales, plantas). Wikimedia Commons, ~640 px JPEG en `img/`, con autor + licencia (`hotspots[].photo`; el kit muestra los créditos). Revisar cada foto visualmente.
- **Idioma**: según el curso (español o inglés: `meta.lang`). Textos de estudio literales de los apuntes de Sofía cuando los haya (es preparación de examen).
- **Progreso**: estrellas ⭐ en `localStorage` con claves `<app>-stars`, `<app>-seen`, `<app>-stamps`, `<app>-best`.
- **Voz**: mp3 pregenerados con `python3 ../kit/v1/gen_audio.py` (edge-tts instalado con pipx; `es-CO-SalomeNeural` -8 %, `en-US-JennyNeural` -10 %). Sin mp3 la app usa la mejor voz del dispositivo. Desde las sesiones en la nube edge-tts no funciona: lo corre James en su computador.
- **Verificación**: antes de publicar, capturas en teléfono y tablet con `kit/v1/tools/capturas.js` y revisarlas; jugar cada juego completo.

## Apps anteriores

Las apps hechas antes del kit (`teatro/`, `dog-presentation/`, `economia/`, …) son de un solo `index.html` con fotos de Wikimedia y audio propio (`gen_audio.py` en su carpeta). No se migran todas: se renuevan con el kit una por una cuando Sofía vaya a usarlas para un examen. `historia/` es la app original del estándar (no usa el kit, pero el kit salió de ella).

## Deploy

1. Enlazar la app en el hub `index.html` con su emoji (la `plantilla/` y el `kit/` no van en el hub).
2. Commit y push a `main` → GitHub Pages publica automáticamente.
3. Verificar en https://jamesgarzon.github.io/sofias-apps/ (desde la nube `github.io` está bloqueado: revisar la Action «pages build and deployment»).

## No trackear

`ruvector.db`, `.remember/`, archivos locales de herramientas (ya en `.gitignore`).
