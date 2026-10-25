#!/usr/bin/env python3
"""Genera las voces (mp3) de «Sofía's Space Mission» con edge-tts.

Uso, desde la carpeta space/:
    pipx install edge-tts          (una sola vez)
    python3 gen_audio.py           genera los mp3 que falten
    python3 gen_audio.py --check   sólo cuenta los que faltan

Voces: Jenny (guía, en-US-JennyNeural -10 %) y Ana (voz de niña para las frases de la
presentación y las respuestas modelo, en-US-AnaNeural -15 %). Cada archivo se llama con el
hash FNV-1a del texto (el mismo que calcula js/voice.js), así que si cambias un texto se
genera uno nuevo. Al terminar escribe audio/ready.js con la lista de mp3 disponibles.
"""
import json, pathlib, re, subprocess, sys

VOICES = {"jenny": ("en-US-JennyNeural", "-10%"), "ana": ("en-US-AnaNeural", "-15%")}
app = pathlib.Path(__file__).resolve().parent
D = json.loads(re.search(r"/\*JSON\*/(.*)/\*END\*/", (app / "js" / "data.js").read_text(encoding="utf-8"), re.S).group(1))


def clean(t):  # igual que Voice.clean
    return re.sub(r"\s+", " ", t.replace("*", "")).strip()


def fnv(t):  # igual que Voice.hash
    h = 0x811C9DC5
    for b in t.encode("utf-8"):
        h = ((h ^ b) * 0x01000193) & 0xFFFFFFFF
    return f"{h:08x}"


jobs = {"jenny": set(), "ana": set()}
g, k = jobs["jenny"].add, jobs["ana"].add
for t in D["say"].values():
    g(t)
for b in D["bodies"]:
    g(b["name"]); g(b["intro"]); g(b["wow"])
    for f in b["facts"]:
        g(f["t"])
for w in D["words"]:
    g(w["word"]); g(w["def"])
for q in D["quiz"]:
    g(q["q"]); g(q["why"])
names = {b["id"]: b["name"] for b in D["bodies"]}
for r in D["sort"]:
    g(r["title"]); g(r["say"])
    labels = {b[0]: b[2] for b in r["bins"]}
    for it in r["items"]:
        g(it[2] if len(it) > 2 else f"{names[it[0]]}: {labels[it[1]].lower()}.")
T = D["talk"]
name = D["meta"]["name"]
for s in T["slides"]:
    for line in s["lines"]:
        text = clean(line.replace("{name}", name))
        k(text)
        for w in text.split():  # palabras sueltas (tocar una palabra la lee)
            m = re.match(r"^[^\w]*(.*?)[^\w]*$", w)
            if m and m.group(1):
                k(m.group(1))
for q in T["questions"]:
    g(q["q"]); g(q["a"]); k(q["a"])
k(T["rescue"])

out = app / "audio"
total = sum(len(v) for v in jobs.values())
missing = [(v, t) for v, ts in jobs.items() for t in sorted(ts) if not (out / v / f"{fnv(clean(t))}.mp3").exists()]
if "--check" in sys.argv:
    print(f"{total} frases, faltan {len(missing)}")
    sys.exit(0)

for n, (v, t) in enumerate(missing, 1):
    voice, rate = VOICES[v]
    f = out / v / f"{fnv(clean(t))}.mp3"
    f.parent.mkdir(parents=True, exist_ok=True)
    print(f"[{n}/{len(missing)}] {v}: {clean(t)[:60]}")
    r = subprocess.run(["edge-tts", "--voice", voice, f"--rate={rate}", "--text", clean(t), "--write-media", str(f)])
    if r.returncode != 0 or not f.exists() or f.stat().st_size == 0:
        f.unlink(missing_ok=True)
        sys.exit("Falló edge-tts. Revisa la conexión y vuelve a correr el script (sigue donde quedó).")

ready = {v: sorted(p.stem for p in (out / v).glob("*.mp3")) for v in VOICES if (out / v).exists()}
(out / "ready.js").write_text("// generado por gen_audio.py: los mp3 que ya existen (por voz)\nwindow.AUDIO_READY = " + json.dumps(ready) + ";\n", encoding="utf-8")
print(f"Listo: {sum(len(x) for x in ready.values())} mp3. Haz commit de audio/.")
