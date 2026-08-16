#!/usr/bin/env python3
"""Pre-generate Spanish TTS for index.html. Run: python3 gen_audio.py (needs edge-tts)."""
import subprocess, pathlib

VOICE = "es-CO-SalomeNeural"

LESSONS = {
    "concepto": "Multiplicar es hacer grupos iguales. Tres por cuatro son tres grupos de cuatro fichas. Uno, dos, tres grupos, y en cada uno hay cuatro. En total, doce.",
    "conmutativa": "Aquí va un truco mágico. Si giras el rectángulo, sigue teniendo las mismas fichas. Por eso tres por siete y siete por tres dan lo mismo. Cada vez que aprendes uno, ¡el otro te sale gratis!",
    "t1": "La tabla del uno no cambia nada. Uno por lo que sea, sigue siendo lo mismo. Uno por siete, siete.",
    "t2": "La tabla del dos son los dobles. Dos por seis es seis más seis, doce. Si sabes sumar dos veces, ya te sabes la tabla del dos.",
    "t3": "La tabla del tres es el doble, más una vez más. Tres por seis: dos por seis es doce, y le sumas otro seis, dieciocho.",
    "t4": "La tabla del cuatro es el doble del doble. Cuatro por siete: primero dos por siete, catorce; y el doble de catorce, veintiocho.",
    "t5": "La tabla del cinco es la mitad de la del diez. Diez por seis es sesenta, y la mitad es treinta. Todos terminan en cinco o en cero.",
    "t6": "La tabla del seis es la del cinco, más una vez más. Seis por siete: cinco por siete es treinta y cinco, más siete, cuarenta y dos.",
    "t7": "La tabla del siete parece difícil, pero quedan poquitas por aprender. Recuerda esta: cinco, seis, siete, ocho. Cincuenta y seis es siete por ocho.",
    "t8": "La tabla del ocho es el doble, del doble, del doble. Ocho por tres: dos por tres, seis; el doble, doce; y el doble otra vez, veinticuatro.",
    "t9": "La tabla del nueve tiene truco: multiplicas por diez y le quitas el número. Nueve por seis: diez por seis es sesenta, menos seis, cincuenta y cuatro. Y fíjate, los dos dígitos siempre suman nueve.",
    "t10": "La tabla del diez es la más fácil de todas: pones el número y le añades un cero. Diez por siete, setenta.",
    "tcuad": "Los cuadrados son cuando un número se multiplica por sí mismo. Tres por tres, nueve. Cuatro por cuatro, dieciséis. Con las fichas forman un cuadrado perfecto.",
}

STRATS = {
    "s-igual": "Por uno no cambia nada.",
    "s-dobles": "Piensa en el doble.",
    "s-doble-mas": "El doble, y le sumas una vez más.",
    "s-doble-doble": "El doble del doble.",
    "s-mitad-diez": "La mitad de la tabla del diez.",
    "s-cinco-mas": "Cinco veces, y le sumas una vez más.",
    "s-cinco-dos": "Sepáralo: cinco veces más dos veces.",
    "s-doble-tres": "El doble, del doble, del doble.",
    "s-diez-menos": "Diez veces, y le quitas el número.",
    "s-cero": "Le añades un cero.",
    "s-cuadrado": "Es un cuadrado: el número por sí mismo.",
    "s-cinco-seis": "Cinco, seis, siete, ocho. Cincuenta y seis es siete por ocho.",
}

FEEDBACK = {
    "bienvenida": "¡Bienvenida a tu jardín de las tablas! Cada cosa que aprendes hace crecer una flor.",
    "correcto": "¡Correcto!",
    "muy-bien": "¡Muy bien pensado!",
    "esa-es": "¡Esa es!",
    "estrategia": "Me gustó cómo lo pensaste.",
    "casi": "Casi. Mira cómo se saca:",
    "dificil": "Esa es de las difíciles. La miramos juntas.",
    "normal": "Equivocarse es parte de aprender. Así el cerebro fija lo nuevo.",
    "sin-prisa": "Sin prisa. Tómate el tiempo que quieras.",
    "volvamos": "Volvamos a las que ya dominas.",
    "flor": "¡Creció una flor nueva en tu jardín!",
    "brote": "¡Salió un brote nuevo!",
    "sesion": "¡Buen trabajo hoy! Ganaste una estrella.",
    "hasta-manana": "Ya practicamos bastante por hoy. ¡Buen trabajo!",
    "dados": "Lanza los dados.",
}

outdir = pathlib.Path("audio")
outdir.mkdir(exist_ok=True)

jobs = [(k, v) for k, v in LESSONS.items()] + \
       [(k, v) for k, v in STRATS.items()] + \
       [(f"fb-{k}", v) for k, v in FEEDBACK.items()] + \
       [(f"q-{a}-{b}", f"¿Cuánto es {a} por {b}?") for a in range(1, 11) for b in range(1, 11)] + \
       [(f"r-{a}-{b}", f"{a} por {b} es {a*b}.") for a in range(1, 11) for b in range(1, 11)]

for name, text in jobs:
    out = outdir / f"{name}.mp3"
    if out.exists() and out.stat().st_size > 0:
        continue
    subprocess.run(["edge-tts", "--voice", VOICE, "--rate", "-8%",
                    "--text", text, "--write-media", str(out)], check=True)
    print(out, flush=True)
print("done")
