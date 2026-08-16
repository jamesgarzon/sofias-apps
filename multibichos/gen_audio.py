#!/usr/bin/env python3
"""Pre-generate Spanish TTS for Multibichos. Run: python3 gen_audio.py (needs edge-tts).

Tres voces: narradora (Salomé), los bichitos (Salomé con tono agudo) y el Guardián (Gonzalo).
Los clips de pregunta (q-a-b) y respuesta (r-a-b) se copian desde ../tablas/audio.
"""
import subprocess, pathlib, shutil

NARRA  = ("es-CO-SalomeNeural", "-8%",  "+0Hz")
BICHO  = ("es-CO-SalomeNeural", "+6%",  "+35Hz")
GUARDI = ("es-CO-GonzaloNeural", "-6%", "-10Hz")

# ── Los papás: cada número es un personaje, y su cuerpo explica su truco ──
PAPAS = {
 "p1":  "Espejito. Todo lo que toca sale igualito. Uno por siete, siete.",
 "p2":  "Los Gemelos. Siempre van de dos en dos. Dos por seis es seis más seis: doce. ¡El doble!",
 "p3":  "Trébol. Tiene tres hojas. Tres por seis es el doble, doce, y una vez más: dieciocho.",
 "p4":  "Patitas. Tiene cuatro patas. Cuatro por siete es el doble del doble: catorce, y otra vez, veintiocho.",
 "p5":  "Manita. Tiene cinco dedos. Cinco es la mitad de diez. Diez por seis es sesenta, y la mitad, treinta.",
 "p6":  "Escarabajo. Tiene seis patas. Seis es Manita y una vez más. Cinco por siete, treinta y cinco, más siete, cuarenta y dos.",
 "p7":  "Arcoíris. Tiene siete colores. Siete es Manita más Gemelos. Cinco por ocho, cuarenta, más dos por ocho, dieciséis: cincuenta y seis.",
 "p8":  "Pulpo. Tiene ocho brazos. Ocho es doble, doble y doble. Tres, seis, doce, veinticuatro.",
 "p9":  "Gato. Tiene nueve vidas. Nueve es Robot menos uno. Diez por seis, sesenta, menos seis, cincuenta y cuatro.",
 "p10": "Robot. Tiene diez dedos. Solo le pone un cero al número. Diez por siete, setenta.",
}

# ── Las leyendas: rimas para el bloque duro (6, 7, 8 y 9) ──
LEYENDAS = {
 "l-3x6": "Tres por seis, dieciocho. Seis patas verdes bailan sobre un corcho.",
 "l-3x7": "Tres por siete, veintiuno. Siete colores y no falta ninguno.",
 "l-3x8": "Tres por ocho, veinticuatro. Tres tréboles, ocho brazos, ¡saltos de a cuatro!",
 "l-3x9": "Tres por nueve, veintisiete. El gato se lleva el trébol de juguete.",
 "l-4x6": "Cuatro por seis, veinticuatro. Las patas del escarabajo pisan de cuatro en cuatro.",
 "l-4x7": "Cuatro por siete, veintiocho. Siete colores, cuatro patitas, y el sol a las ocho.",
 "l-4x8": "Cuatro por ocho, treinta y dos. El pulpo y las patitas corren veloz.",
 "l-4x9": "Cuatro por nueve, treinta y seis. Nueve vidas, cuatro patas: ¡ya sabes quién es!",
 "l-6x6": "Seis por seis, treinta y seis. Cuenta seis escarabajos, y seis veces los ves.",
 "l-6x7": "Seis por siete, cuarenta y dos. El escarabajo y el arcoíris comieron arroz.",
 "l-6x8": "Seis por ocho, cuarenta y ocho. El pulpo y el escarabajo se comieron un bizcocho.",
 "l-6x9": "Seis por nueve, cincuenta y cuatro. El gato y el escarabajo jugaron un rato.",
 "l-7x7": "Siete por siete, cuarenta y nueve. Dos arcoíris salen cuando llueve.",
 "l-7x8": "Cinco, seis, siete, ocho. Cincuenta y seis es siete por ocho. El arcoíris pintó los ocho brazos del pulpo.",
 "l-7x9": "Siete por nueve, sesenta y tres. El gato brincó el arcoíris y se mojó los pies.",
 "l-8x8": "Ocho por ocho, sesenta y cuatro. Dos pulpos bailando en el teatro.",
 "l-8x9": "Ocho por nueve, setenta y dos. El pulpo y el gato se dijeron adiós.",
 "l-9x9": "Nueve por nueve, ochenta y uno. Dos gatos comiendo el desayuno.",
}

# ── Los bichitos (voz aguda) ──
BICHOS = {
 "b-hambre1": "¡Tengo hambre!",
 "b-hambre2": "¿Me das de comer?",
 "b-hambre3": "¡Ñam, ñam! ¿Cuántas bayas?",
 "b-hambre4": "¡Me toca a mí!",
 "b-rico1": "¡Mmm, qué rico!",
 "b-rico2": "¡Gracias! Ya estoy llenito.",
 "b-rico3": "¡Delicioso!",
 "b-rico4": "¡Ay, qué bueno!",
 "b-casi": "Mmm… con esas no me lleno. Mira cuántas me faltan.",
 "b-crece": "¡Estoy creciendo!",
 "b-grande": "¡Ya soy grande! ¡Mírame!",
 "b-nace": "¡Hola! ¡Acabo de nacer!",
 "b-adios": "¡Adiós! ¡Vuelve pronto!",
 "b-gracias": "¡Gracias por cuidarme!",
 "b-dormir": "Qué sueño… hasta mañana.",
 "b-cosquillas": "¡Ja, ja! ¡Me haces cosquillas!",
}

# ── El Guardián del Valle (voz grave) ──
GUARDIAN = {
 "g-bienvenida": "Bienvenida a la Guardería de los Multibichos. Aquí cada número tiene una familia, y tú eres su cuidadora.",
 "g-tuto1": "Cada Multibicho nace de dos papás. El Pulpo tiene ocho brazos, el Arcoíris tiene siete colores, y su bebé se llama Cincuenta y seis.",
 "g-tuto2": "Para darle de comer necesitas saber cuántas bayas caben en su bandeja. Si no lo sabes, cuéntalas. Aquí nadie tiene prisa.",
 "g-gemelo": "Recuerda: siete por ocho y ocho por siete son el mismo bicho. Un bebé, dos papás. Por eso sólo hay cincuenta y cinco.",
 "g-huevo": "Hay un huevo a punto de abrirse. Termina la comida y verás quién nace.",
 "g-hoy": "Hay bichitos con hambre esperándote.",
 "g-hito1": "Ya tienes cinco Multibichos. El valle empieza a llenarse.",
 "g-hito2": "Quince Multibichos. Se nota que los cuidas bien.",
 "g-hito3": "Treinta Multibichos. Ya conoces a casi todas las familias.",
 "g-hito4": "Cuarenta y cinco. Faltan muy poquitos.",
 "g-hito5": "¡Los cincuenta y cinco Multibichos están en casa! Lo lograste, cuidadora.",
 "g-descanso": "Ya trabajaste bastante hoy. Los bichitos se van a dormir contentos.",
 "g-errar": "Equivocarse no rompe nada. Aquí los bichos esperan lo que haga falta.",
}

outdir = pathlib.Path("audio")
outdir.mkdir(exist_ok=True)

# Reutiliza las preguntas y respuestas ya generadas para El Jardín de las Tablas.
origen = pathlib.Path("../tablas/audio")
if origen.is_dir():
    for f in origen.glob("[qr]-*.mp3"):
        dst = outdir / f.name
        if not dst.exists():
            shutil.copy2(f, dst)

jobs = [(NARRA, PAPAS), (NARRA, LEYENDAS), (BICHO, BICHOS), (GUARDI, GUARDIAN)]

for (voz, rate, pitch), textos in jobs:
    for name, text in textos.items():
        out = outdir / f"{name}.mp3"
        if out.exists() and out.stat().st_size > 0:
            continue
        subprocess.run(["edge-tts", "--voice", voz, "--rate", rate, "--pitch", pitch,
                        "--text", text, "--write-media", str(out)], check=True)
        print(out, flush=True)
print("done")
