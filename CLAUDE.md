# Sofia's Apps

Apps educativas para Sofía (≈8 años). Hub en `index.html`, desplegado en GitHub Pages: https://jamesgarzon.github.io/sofias-apps/

## Estructura

- Una carpeta por app (`teatro/`, `dog-presentation/`, …) con un único `index.html` autocontenido.
- Assets opcionales (audio pregenerado, imágenes) en subcarpetas dentro de la app (`audio/`).
- Cada app nueva se enlaza desde el hub `index.html` con su emoji.

## Estándares de las apps

- **Stack**: HTML/CSS/JS vanilla en un solo archivo. Sin frameworks, sin build step, sin dependencias npm. Google Fonts está permitido.
- **Idioma**: según el curso — español para clases en español, inglés para clases en inglés. Textos de estudio tomados literalmente de los apuntes de Sofía (es preparación de examen).
- **Diseño**: cada app tiene una estética temática propia y profesional (no plantilla genérica). Botones grandes, emojis, tipografía legible, mobile-first (se usa en teléfono/tablet).
- **Didáctica**: siempre un modo "Aprende" (contenido) + al menos un modo de juego (quiz, emparejar, hablar). Feedback inmediato con animación y sonido.
- **Progreso**: estrellas ⭐ acumuladas en `localStorage` (clave `<app>-stars`).
- **Sonido**: WebAudio para efectos (ding/buzz/aplausos) sin archivos; voz con Web Speech API o audio pregenerado con `edge-tts` (ver `dog-presentation/gen_audio.py`).
- **Accesibilidad mínima**: contraste suficiente, tamaños táctiles ≥44px, funciona sin sonido.

## Deploy

1. Enlazar la app en el hub `index.html`.
2. Commit y push a `main` → GitHub Pages publica automáticamente.
3. Verificar en https://jamesgarzon.github.io/sofias-apps/

## No trackear

`ruvector.db`, `.remember/`, archivos locales de herramientas (ya en `.gitignore`).
