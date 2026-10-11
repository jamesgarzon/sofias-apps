#!/usr/bin/env python3
"""Genera las voces (mp3) de Viajera del Tiempo con edge-tts.

Uso:  pipx install edge-tts   y luego, desde esta carpeta:   python3 gen_audio.py

Lee los textos de js/data.js (el bloque JSON) y crea audio/<clave>.mp3 con la voz
es-CO-SalomeNeural. Al terminar marca audio/ready.js para que la app use los mp3;
mientras no existan, la app usa la voz del dispositivo. Las claves deben coincidir
con el objeto T de js/app.js. Si cambias un texto, borra su mp3 y vuelve a correrlo.
"""
import json, pathlib, re, subprocess, sys

VOICE, RATE = "es-CO-SalomeNeural", "-8%"
here = pathlib.Path(__file__).resolve().parent
src = (here / "js" / "data.js").read_text(encoding="utf-8")
D = json.loads(re.search(r"/\*JSON\*/(.*)/\*END\*/", src, re.S).group(1))

jobs = []
for eid, e in D["eras"].items():
    jobs.append((f"era-{eid}", f"{e['name']}. {e['intro']}"))
    for k, h in enumerate(e["hotspots"]):
        jobs.append((f"hs-{eid}-{k}", f"{h['title']}. {h['text']}"))
for q in D["questions"]:
    jobs.append((f"q-{q['id']}", q["q"]))
    jobs.append((f"why-{q['id']}", q["why"]))
for k, t in D["voice"].items():
    jobs.append((f"v-{k}", t))
for i, t in enumerate(D["facts"]):
    jobs.append((f"fact-{i}", t))

out = here / "audio"
out.mkdir(exist_ok=True)
clean = lambda t: re.sub(r"[\U0001F000-\U0001FFFF☀-➿️‍“”]", "", t)
for n, (key, text) in enumerate(jobs, 1):
    f = out / f"{key}.mp3"
    if f.exists() and f.stat().st_size > 0:
        continue
    print(f"[{n}/{len(jobs)}] {key}")
    r = subprocess.run(["edge-tts", "--voice", VOICE, f"--rate={RATE}", "--text", clean(text), "--write-media", str(f)])
    if r.returncode != 0:
        f.unlink(missing_ok=True)
        sys.exit(f"Falló {key}. Revisa tu conexión y vuelve a correr el script (continúa donde quedó).")

(out / "ready.js").write_text("// generado por gen_audio.py\nwindow.HISTORIA_AUDIO = true;\n", encoding="utf-8")
print(f"Listo: {len(jobs)} audios en audio/. La app ya usa la voz de Salomé.")
