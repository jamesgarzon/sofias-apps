#!/usr/bin/env python3
"""Pre-generate natural Latin American Spanish TTS for index.html. Run: python3 gen_audio.py (needs edge-tts)."""
import re, subprocess, pathlib

VOICE = "es-CO-SalomeNeural"

LESSONS = [
    "El teatro. El teatro es una forma de contar historias usando personajes que actúan frente a un público. ¡Tú eres la actriz y el público te mira!",
    "La escena. Es una parte de la historia donde participan algunos personajes. Cuando cambian los personajes o el lugar, ¡comienza otra escena!",
    "El acto. Un acto está formado por varias escenas. ¡Es como un capítulo de la historia!",
    "Los parlamentos. Son las intervenciones de los personajes: todo lo que dicen en la obra. Se clasifican en diálogos, apartes y monólogos.",
    "El diálogo. Cuando dos o más personajes hablan entre ellos. Diálogo: dos o más voces conversando.",
    "El aparte. Cuando un personaje se dirige al público. ¡Es como contarle un secreto solo a ti!",
    "El monólogo. Cuando un personaje actúa solo en escena. Mono significa uno solo. ¡Un solo personaje hablando!",
    "La pantomima. Los actores no pueden hablar: todo se cuenta con gestos y con el cuerpo. ¡Como un mimo!",
    "Teatro de sombras. Hacen figuras con las manos detrás de una luz. ¡Un perrito, un pájaro, con tus propias manos!",
    "Teatro de sala. Los actores actúan normalmente, en un escenario frente al público. El teatro clásico de toda la vida.",
    "Teatro callejero. Actúan caminando, en un lugar abierto como una plaza o la calle. ¡El escenario es la ciudad entera!",
    "La ópera. Los personajes dicen sus frases cantando. ¡Todo se canta!",
]

QUESTIONS = [
    "¿Qué es el teatro?",
    "¿Cuándo comienza una nueva escena?",
    "¿Qué es un acto?",
    "¿Qué son los parlamentos?",
    "¿Qué es un diálogo?",
    "¿Qué es un aparte?",
    "¿Qué es un monólogo?",
    "En la pantomima, los actores…",
    "¿Qué hacen en el teatro de sombras?",
    "En el teatro callejero, los actores…",
    "En la ópera, los personajes…",
    "En el teatro de sala, los actores…",
]

FEEDBACK = {
    "bravo": "¡Bravo! ¡Correcto!",
    "esa-era": "¡Esa era!",
    "intenta": "Uy… ¡intenta otra vez!",
    "ronda": "¡Ronda completa! ¡Ganaste una estrella!",
    "perfecta": "¡Función perfecta! ¡El público está de pie!",
    "bienvenida": "¡Bienvenida al Gran Teatro de Sofía! Toca un boleto para entrar a la función.",
}

outdir = pathlib.Path("audio")
outdir.mkdir(exist_ok=True)

jobs = [(f"lesson-{i}", t) for i, t in enumerate(LESSONS)] + \
       [(f"q-{i}", t) for i, t in enumerate(QUESTIONS)] + \
       [(f"fb-{k}", t) for k, t in FEEDBACK.items()]

for name, text in jobs:
    out = outdir / f"{name}.mp3"
    if out.exists():
        continue
    subprocess.run(["edge-tts", "--voice", VOICE, "--rate", "-8%",
                    "--text", text, "--write-media", str(out)], check=True)
    print(out)
print("done")
