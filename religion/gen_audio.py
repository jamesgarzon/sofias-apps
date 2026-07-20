#!/usr/bin/env python3
"""Pre-generate natural Latin American Spanish TTS for index.html. Run: python3 gen_audio.py (needs edge-tts)."""
import pathlib, subprocess

VOICE = "es-CO-SalomeNeural"

ITEMS = {
    # dones
    "sabiduria": "Sabiduría", "entendimiento": "Entendimiento", "concejo": "Concejo",
    "ciencia": "Ciencia", "piedad": "Piedad", "fortaleza": "Fortaleza",
    "temor": "Temor de Dios",
    # frutos
    "caridad": "Caridad", "gozo": "Gozo", "paz": "Paz", "paciencia": "Paciencia",
    "longanimidad": "Longanimidad", "bondad": "Bondad", "benignidad": "Benignidad",
    "mansedumbre": "Mansedumbre", "fidelidad": "Fidelidad", "modestia": "Modestia",
    "templanza": "Continencia o Templanza", "castidad": "Castidad",
    # sacramentos
    "bautismo": "Bautismo", "confirmacion": "Confirmación", "eucaristia": "Eucaristía",
    "confesion": "Confesión", "matrimonio": "Matrimonio", "orden": "Orden sacerdotal",
    "uncion": "Unción de los enfermos",
}

SACRAMENTOS = {
    "bautismo": "El Bautismo. Sacramento de iniciación cristiana.",
    "confirmacion": "La Confirmación. Sacramento de iniciación cristiana.",
    "eucaristia": "La Eucaristía. Sacramento de iniciación cristiana.",
    "confesion": "La Confesión o Reconciliación. Sacramento de curación.",
    "uncion": "La Unción de los enfermos. Sacramento de curación.",
    "matrimonio": "El Matrimonio.",
    "orden": "El Orden sacerdotal.",
}

LESSONS = {
    "dones": "Los siete dones del Espíritu Santo son regalos que Dios nos da para vivir bien. ¡Toca cada vitral para escucharlo!",
    "frutos": "Los doce frutos del Espíritu Santo son lo que crece en nosotros cuando dejamos actuar a Dios, ¡como frutos en un árbol!",
    "sacra": "¿Qué son los sacramentos? Son signos sensibles, instituidos por Jesucristo para comunicarnos la gracia divina. Son siete.",
}

QUESTIONS = [
    "¿Qué son los sacramentos?",
    "¿Cuántos dones del Espíritu Santo hay?",
    "¿Cuántos frutos del Espíritu Santo hay?",
    "¿Cuál de estos es un don del Espíritu Santo?",
    "¿Cuál de estos es un fruto del Espíritu Santo?",
    "¿Cuál de estos es un sacramento?",
    "¿Cuáles son los sacramentos de iniciación cristiana?",
    "¿Cuáles son los sacramentos de curación?",
]

FEEDBACK = {
    "bienvenida": "¡Bienvenida al Vitral del Espíritu! Toca una ventana para comenzar.",
    "bravo": "¡Bravo! ¡Correcto!",
    "esa-era": "¡Esa era!",
    "intenta": "Uy… ¡intenta otra vez!",
    "perfecta": "¡Perfecto! ¡Brillas como un vitral!",
    "estrella": "¡Muy bien! ¡Ganaste estrellas!",
    "es-don": "¡Es un don del Espíritu Santo!",
    "es-fruto": "¡Es un fruto del Espíritu Santo!",
    "es-sacra": "¡Es un sacramento!",
}

outdir = pathlib.Path("audio")
outdir.mkdir(exist_ok=True)

jobs = [(f"item-{k}", t) for k, t in ITEMS.items()] + \
       [(f"sac-{k}", t) for k, t in SACRAMENTOS.items()] + \
       [(f"lesson-{k}", t) for k, t in LESSONS.items()] + \
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
