#!/usr/bin/env python3
"""Pre-generate natural Latin American Spanish TTS for index.html. Run: python3 gen_audio.py (needs edge-tts)."""
import pathlib, subprocess

VOICE = "es-CO-SalomeNeural"

# ── lecciones (definiciones literales de los apuntes) ──
LESSONS = {
    "actividades":
        "Actividades económicas. Son todas las acciones y trabajos que hacen las personas para producir, "
        "distribuir y consumir los bienes, que son cosas que se pueden tocar como juguetes o comida, "
        "y los servicios, como la educación o la salud, que necesitamos.",
    "bienes":
        "Los bienes. Son todas las cosas u objetos materiales que podemos ver, tocar y usar. "
        "Nos sirven para satisfacer una necesidad o un deseo, y se caracterizan por tener un valor económico.",
    "servicios":
        "Los servicios. Es una actividad, acción o trabajo intangible que alguien o una institución realiza "
        "para satisfacer las necesidades de otras personas. A diferencia de los objetos físicos, "
        "no se pueden tocar ni almacenar, sino que se consumen en el momento en que se presentan.",
    "produccion":
        "La producción. Es el proceso de crear o fabricar cosas útiles, ya sean objetos, como juguetes y ropa, "
        "o servicios, como cortar el cabello. Consiste en tomar las materias primas y, mediante el trabajo y "
        "las herramientas, transformarlas en algo nuevo y valioso que la gente pueda usar.",
    "distribucion":
        "La distribución. Es el proceso de repartir, organizar o colocar cosas de manera que lleguen a su "
        "destino o estén al alcance de todos. Por ejemplo, es la forma en que los juguetes, la ropa o los "
        "alimentos viajan desde la fábrica hasta el supermercado, la tienda o el almacén, para que puedan comprarlos.",
    "consumo":
        "El consumo. Es la acción de usar, comer, gastar o comprar cosas, bienes y servicios, para satisfacer "
        "nuestras necesidades. Significa utilizar lo que necesitamos para vivir, aprender y divertirnos, "
        "como comer alimentos, usar ropa o encender la luz.",
    "sectores":
        "Los sectores económicos. Son grupos en los que se dividen todos los trabajos y actividades que hacen "
        "las personas para producir bienes o brindar servicios. Son cinco. ¡Toca cada uno para conocerlo!",
    "s1":
        "Sector primario, el de la naturaleza. Son los trabajos que se encargan de obtener los recursos "
        "directamente de la naturaleza. Son la base, porque de aquí salen las materias primas para crear otras cosas.",
    "s2":
        "Sector secundario, el de las fábricas. Son los trabajos que transforman lo que nos da la naturaleza, "
        "las materias primas, en productos terminados o listos para usar.",
    "s3":
        "Sector terciario, el de los servicios. Son trabajos que no producen cosas materiales, sino que prestan "
        "un servicio para ayudar y cuidar a las personas.",
    "s4":
        "Sector cuaternario, el de las nuevas tecnologías. Se vincula con el desarrollo tecnológico, "
        "la investigación científica, la informática, la electrónica, la educación avanzada y el desarrollo.",
    "s5":
        "Sector quinario, el de los servicios humanos. Es una subdivisión de la economía enfocada en la "
        "prestación de servicios sin ánimo de lucro, el cuidado social y la toma de decisiones de alto nivel. "
        "A diferencia de otros sectores, no busca generar riqueza material, sino garantizar el bienestar ciudadano.",
}

# ── tarjetas del modo Aprende ──
CARDS = {
    # bienes
    "b-bicicleta": "La bicicleta. Es un bien: la puedes ver, tocar y usar.",
    "b-manzana": "La manzana. Es un bien: la puedes tocar y comer.",
    "b-oso": "El oso de peluche. Es un bien: es un objeto material.",
    "b-casa": "La casa. Es un bien: satisface la necesidad de vivienda.",
    "b-libro": "El libro. Es un bien: lo puedes tocar y leer.",
    "b-edificio": "El edificio. También es un bien material, y tiene valor económico.",
    # servicios
    "sv-educacion": "Educación y aprendizaje. Es un servicio: el maestro te enseña, y eso no se puede tocar.",
    "sv-salud": "Salud y bienestar. Es un servicio: el médico y la enfermera te cuidan.",
    "sv-transporte": "Transporte. Es un servicio: el bus te lleva de un lugar a otro.",
    "sv-seguridad": "Seguridad y emergencias. Es un servicio: los bomberos y la policía te protegen.",
    # producción
    "p-trigo": "Primero, cultivar el trigo. El trigo es la materia prima.",
    "p-pan": "Luego, el panadero usa el trigo para hornear el pan.",
    "p-madera": "Primero, cortar la madera. La madera es la materia prima.",
    "p-mesa": "Luego, con clavos y pintura, se fabrica la mesa.",
    # distribución
    "d-camion": "El camión lleva los productos desde la fábrica.",
    "d-supermercado": "Llegan al supermercado, la tienda o el almacén, para que puedas comprarlos.",
    # consumo
    "c-alimentacion": "Alimentación. Comer alimentos es consumir un bien.",
    "c-juguetes": "Juguetes. Cuando juegas con ellos, estás consumiendo un bien.",
    "c-vestimenta": "Vestimenta. Usar ropa también es consumo de bienes.",
    "c-energia": "Energía. Encender la luz es consumir un servicio.",
    "c-transporte": "Transporte. Viajar en bus es consumir un servicio.",
    "c-entretenimiento": "Entretenimiento. Divertirnos también es consumir un servicio.",
    # sector primario
    "pr-agricultura": "La agricultura. Cultivar tomate, papa y arroz.",
    "pr-ganaderia": "La ganadería. Cuidar vacas y gallinas para obtener leche, carne y huevos.",
    "pr-pesca": "La pesca. Atrapar peces en el mar o en los ríos.",
    "pr-mineria": "La minería. Extraer oro, carbón o sal de la tierra.",
    # sector secundario
    "se-textil": "La industria textil. Convertir el algodón en camisetas.",
    "se-construccion": "La construcción. Usar madera, cemento y ladrillos para hacer casas y edificios.",
    "se-galletas": "Fabricación de alimentos. Usar trigo y leche para hacer galletas empaquetadas.",
    "se-carpinteria": "La carpintería. Transformar la madera en muebles.",
    # sector terciario
    "te-educacion": "La educación. Los maestros que te enseñan en el colegio.",
    "te-salud": "La salud. Los médicos y enfermeras que te curan cuando estás enfermo.",
    "te-transporte": "El transporte. Los conductores de buses o aviones que te llevan.",
    "te-comercio": "El comercio. Las personas que atienden en la tienda para que puedas comprar lo que necesitas.",
    # sector cuaternario
    "cu-tecnologia": "Tecnología e información. Inteligencia artificial, robótica, programación y desarrollo de software.",
    "cu-biotecnologia": "Salud y biotecnología. La investigación farmacéutica, la edición genética y los avances biomédicos.",
    "cu-universidad": "Educación superior. Investigación científica a nivel universitario y desarrollo de tecnología.",
    "cu-aeroespacial": "Industria aeroespacial. El diseño y desarrollo de tecnología para la exploración espacial y la aeronáutica.",
    # sector quinario
    "qu-educacion": "Educación pública. Servicios gratuitos que da el gobierno para mejorar el conocimiento.",
    "qu-ong": "Organizaciones no gubernamentales, las oenegés. Son independientes y sin ánimo de lucro, destinadas a lograr un cambio.",
    "qu-salud": "Servicios de salud del gobierno. Incluyen medicina y odontología para todos.",
}

# ── nombres cortos (juego Bien o Servicio: no deben revelar la respuesta) ──
NAMES = {
    "n-bicicleta": "La bicicleta",
    "n-manzana": "La manzana",
    "n-oso": "El oso de peluche",
    "n-casa": "La casa",
    "n-libro": "El libro",
    "n-edificio": "El edificio",
    "n-educacion": "La clase de la maestra",
    "n-salud": "La consulta del médico",
    "n-transporte": "El viaje en bus",
    "n-seguridad": "Los bomberos apagando un incendio",
    "n-cabello": "Cortar el cabello",
    "n-energia": "La luz de la casa",
}

# ── preguntas del quiz ──
QUESTIONS = [
    "¿Qué son las actividades económicas?",
    "¿Qué son los bienes?",
    "¿Cuál de estos es un bien?",
    "¿Qué son los servicios?",
    "¿Cuál de estos es un servicio?",
    "¿Se pueden almacenar los servicios?",
    "¿Qué es la producción?",
    "¿Qué son las materias primas?",
    "Para hacer pan, ¿cuál es la materia prima?",
    "¿Qué es la distribución?",
    "¿Qué es el consumo?",
    "¿Cuántos sectores económicos hay?",
    "¿Qué hace el sector primario?",
    "La minería y la pesca, ¿de qué sector son?",
    "¿Qué hace el sector secundario?",
    "La construcción y la carpintería, ¿de qué sector son?",
    "¿Qué hace el sector terciario?",
    "Los médicos y los maestros, ¿de qué sector son?",
    "¿Con qué se relaciona el sector cuaternario?",
    "¿Qué busca el sector quinario?",
    "Una ONG, ¿de qué sector es?",
    "¿De qué sector es convertir el algodón en camisetas?",
]

# ── frases de refuerzo ──
FEEDBACK = {
    "bienvenida": "¡Bienvenida a la Ciudad Económica! Toca un lugar para empezar a estudiar.",
    "bravo": "¡Muy bien! ¡Correcto!",
    "esa-era": "¡Esa era!",
    "intenta": "Uy… ¡intenta otra vez!",
    "ronda": "¡Ronda completa! ¡Ganaste estrellas!",
    "perfecta": "¡Perfecto! ¡Eres la alcaldesa de la economía!",
    "es-bien": "¡Es un bien! Se puede tocar.",
    "es-servicio": "¡Es un servicio! No se puede tocar.",
}

outdir = pathlib.Path(__file__).parent / "audio"
outdir.mkdir(exist_ok=True)

jobs = list(LESSONS.items()) + list(CARDS.items()) + list(NAMES.items()) + \
       [(f"q-{i}", t) for i, t in enumerate(QUESTIONS)] + \
       [(f"fb-{k}", t) for k, t in FEEDBACK.items()]

fails = []
for name, text in jobs:
    out = outdir / f"{name}.mp3"
    if out.exists() and out.stat().st_size > 0:
        continue
    try:
        subprocess.run(["edge-tts", "--voice", VOICE, "--rate", "-8%",
                        "--text", text, "--write-media", str(out)], check=True)
        print(out)
    except subprocess.CalledProcessError:
        fails.append(name)  # ponytail: re-run the script to retry, it skips what exists
print("done", f"({len(fails)} fallos: {fails})" if fails else "")
