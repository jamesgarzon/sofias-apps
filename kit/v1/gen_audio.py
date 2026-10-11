#!/usr/bin/env python3
"""Genera las voces (mp3) de cualquier app hecha con el kit v1, con edge-tts.

Uso, desde la carpeta de la app:
    pipx install edge-tts          (una sola vez)
    python3 ../kit/v1/gen_audio.py           genera los mp3 que falten
    python3 ../kit/v1/gen_audio.py --check   sólo lista los que faltan o sobran

Lee el bloque JSON de js/data.js y crea audio/<clave>.mp3 con las mismas claves que usa
kit.js (topic-*, hs-*, q-*, why-*, v-*, fact-*). Voz según meta.lang: español
es-CO-SalomeNeural, inglés en-US-JennyNeural. Al terminar marca audio/ready.js para
que la app use los mp3. Si cambias un texto, borra su mp3 y vuelve a correrlo.
"""
import json, pathlib, re, subprocess, sys

VOICES = {"es": ("es-CO-SalomeNeural", "-8%"), "en": ("en-US-JennyNeural", "-10%")}

app = pathlib.Path.cwd()
data_js = app / "js" / "data.js"
if not data_js.exists():
    sys.exit("Corre este script desde la carpeta de la app (donde está js/data.js).")
D = json.loads(re.search(r"/\*JSON\*/(.*)/\*END\*/", data_js.read_text(encoding="utf-8"), re.S).group(1))
voice, rate = VOICES.get(D["meta"].get("lang", "es"), VOICES["es"])

jobs = []
for tid, t in D["topics"].items():
    jobs.append((f"topic-{tid}", f"{t['name']}. {t['intro']}"))
    for k, h in enumerate(t["hotspots"]):
        jobs.append((f"hs-{tid}-{k}", f"{h['title']}. {h['text']}"))
for q in D.get("questions", []):
    jobs.append((f"q-{q['id']}", q["q"]))
    if q.get("why"):
        jobs.append((f"why-{q['id']}", q["why"]))
for k, txt in D.get("voice", {}).items():
    jobs.append((f"v-{k}", txt))
for i, txt in enumerate(D.get("facts", [])):
    jobs.append((f"fact-{i}", txt))

out = app / "audio"
out.mkdir(exist_ok=True)
clean = lambda t: re.sub(r"<[^>]+>|[\U0001F000-\U0001FFFF☀-➿️‍“”]", "", t)

if "--check" in sys.argv:
    want = {k for k, _ in jobs}
    have = {p.stem for p in out.glob("*.mp3")}
    print(f"Faltan {len(want - have)}:", *sorted(want - have)[:40])
    print(f"Sobran {len(have - want)}:", *sorted(have - want)[:40])
    sys.exit(0)

for n, (key, text) in enumerate(jobs, 1):
    f = out / f"{key}.mp3"
    if f.exists() and f.stat().st_size > 0:
        continue
    print(f"[{n}/{len(jobs)}] {key}")
    r = subprocess.run(["edge-tts", "--voice", voice, f"--rate={rate}", "--text", clean(text), "--write-media", str(f)])
    if r.returncode != 0:
        f.unlink(missing_ok=True)
        sys.exit(f"Falló {key}. Revisa la conexión y vuelve a correr el script (sigue donde quedó).")

(out / "ready.js").write_text("// generado por gen_audio.py\nwindow.APP_AUDIO = true;\n", encoding="utf-8")
print(f"Listo: {len(jobs)} audios en {out.name}/ con la voz {voice}.")
