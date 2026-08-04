#!/usr/bin/env python3
"""Pre-generate TTS for index.html. Run: python3 gen_audio.py (needs edge-tts).

Keep VERBS in sync with the VERBS array at the top of index.html.
"""
import subprocess, pathlib, sys

EN = "en-US-AnaNeural"
ES = "es-CO-SalomeNeural"

# slug, infinitive, past, spanish, example sentence (past)
VERBS = [
    ("arrive", "arrive", "arrived", "llegar", "We arrived at school early."),
    ("call",   "call",   "called",  "llamar", "She called her grandma yesterday."),
    ("clean",  "clean",  "cleaned", "limpiar", "I cleaned my room on Sunday."),
    ("close",  "close",  "closed",  "cerrar", "He closed the window because it was cold."),
    ("cook",   "cook",   "cooked",  "cocinar", "My dad cooked pasta for dinner."),
    ("be",     "be",     "was / were", "ser o estar", "I was happy and my friends were happy too."),
    ("build",  "build",  "built",   "construir", "They built a big sandcastle."),
    ("do",     "do",     "did",     "hacer", "I did my homework before dinner."),
    ("eat",    "eat",    "ate",     "comer", "We ate pizza on Friday."),
    ("find",   "find",   "found",   "encontrar", "She found her lost cat in the garden."),
]

FEEDBACK = {
    "bien": "¡Muy bien! ¡Correcto!",
    "casi": "¡Casi! Mira otra vez.",
    "esa": "Esta era la respuesta.",
    "ronda": "¡Ronda completa! ¡Ganaste una estrella!",
    "perfecto": "¡Perfecto! ¡Dominas los verbos en pasado!",
    "bienvenida": "¡Bienvenida a la Máquina del Tiempo! Aquí los verbos viajan del presente al pasado. Toca una palanca para empezar.",
}

jobs = []
for slug, inf, past, es, ex in VERBS:
    jobs += [(f"{slug}-inf", inf, EN, "-10%"),
             (f"{slug}-past", past.replace("/", "or"), EN, "-10%"),
             (f"{slug}-es", es, ES, "-8%"),
             (f"{slug}-ex", ex, EN, "-8%")]
jobs += [(f"fb-{k}", t, ES, "-8%") for k, t in FEEDBACK.items()]

outdir = pathlib.Path("audio")
outdir.mkdir(exist_ok=True)

for name, text, voice, rate in jobs:
    out = outdir / f"{name}.mp3"
    if out.exists():
        continue
    subprocess.run(["edge-tts", "--voice", voice, "--rate", rate,
                    "--text", text, "--write-media", str(out)], check=True)
    print(out)

missing = [n for n, *_ in jobs if not (outdir / f"{n}.mp3").exists()]
if missing:
    sys.exit(f"MISSING: {missing}")
print(f"done — {len(jobs)} clips ok")
