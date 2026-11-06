#!/usr/bin/env python3
"""Genera las voces (mp3) de «Helper Town» con edge-tts (gratis).

Uso, desde la carpeta ingles/:
    pipx install edge-tts          (una sola vez; si da error 403: pipx upgrade edge-tts)
    python3 gen_audio.py           genera los mp3 que falten
    python3 gen_audio.py --check   solo cuenta los que faltan

Narradora: Ava. Cada mascota tiene su voz (VOICES). Cada archivo se llama con el hash FNV-1a del
texto (el mismo que calcula js/sound.js): si cambias un texto o una voz, borra esa carpeta de
audio/ y vuelve a correr el script. Al terminar escribe audio/ready.js.
"""
import json, pathlib, re, subprocess, sys, time

VOICES = {  # voz, velocidad, tono
    "ava": ("en-US-AvaMultilingualNeural", "-10%", "+0Hz"),
    "slow": ("en-US-AvaMultilingualNeural", "-25%", "+0Hz"),
    "biscuit": ("en-US-AnaNeural", "-5%", "+0Hz"),
    "mimi": ("en-GB-MaisieNeural", "-10%", "+0Hz"),
    "hoppy": ("en-US-EmmaMultilingualNeural", "-10%", "+10Hz"),
    "bubbles": ("en-US-JennyNeural", "-10%", "+15Hz"),
    "kiwi": ("en-AU-NatashaNeural", "-5%", "+20Hz"),
    "shelly": ("en-US-MichelleNeural", "-20%", "-5Hz"),
    "nibbles": ("en-US-EricNeural", "-5%", "+25Hz"),
    "daisy": ("en-GB-LibbyNeural", "-10%", "+0Hz"),
    "bamboo": ("en-US-GuyNeural", "-15%", "-10Hz"),
    "sparkle": ("en-US-AriaNeural", "-10%", "+10Hz"),
    "juana": ("en-NZ-MollyNeural", "-5%", "+10Hz"),
}
app = pathlib.Path(__file__).resolve().parent
js = "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.DATA))"
D = json.loads(subprocess.run(["node", "-e", js, str(app / "js" / "data.js")], capture_output=True, text=True, check=True).stdout)


def clean(t):  # igual que Sound.clean
    return re.sub(r"\s+", " ", t).strip()


def fnv(t):  # igual que Sound.hash
    h = 0x811C9DC5
    for b in t.encode("utf-8"):
        h = ((h ^ b) * 0x01000193) & 0xFFFFFFFF
    return f"{h:08x}"


jobs = {v: set() for v in VOICES}
a = jobs["ava"].add
for k, t in D["say"].items():
    if k == "hello":
        jobs["biscuit"].add(t)
    elif k in ("mission", "noMission"):  # los dice la mascota que esté ayudando
        for f in D["friends"]:
            if "x" in f:
                jobs[f["id"]].add(t)
    elif k in ("exam", "examAgain", "prize", "juanaReady", "hmm", "amazing", "didIt"):
        jobs["juana"].add(t)
    else:
        a(t)
for t in ["Perfect!", "Great job!", "Good try! Keep practicing.", "Finish the level before this one first.",
          "Unscramble the chore."]:
    a(t)
for f in D["friends"]:
    jobs[f["id"]].add(f["line"]); jobs[f["id"]].add(f["card"])
    if f["stars"]:
        a(f"Get {f['stars']} stars to meet this pet.")


def step(s):
    t = s["type"]
    for k in ("q", "why", "text"):
        if s.get(k):
            a(s[k])
    if t == "quiz" and not s.get("why"):
        a(f"The answer is: {s['opts'][s['a']]}.")
    if t == "match":
        for p in s["pairs"]:
            a(p[0])
    if t == "sort":
        for it in s["items"]:
            a(f"{it[0]}: {s['bins'][it[1]].lower()}.")
    if t == "label":
        for tg in s["targets"]:
            a(tg["a"]); a(f"The answer is: {tg['a']}.")
    if t in ("spell", "listen"):
        jobs["slow"].add(s["word"].lower())
        if t == "spell" and not s.get("mix"):
            a(s["clue"])


for st in D["stops"]:
    for k in st["sparks"]:
        a(k["text"])
    for g in st["games"]:
        for w in g.get("write", []):
            jobs["slow"].add(w["word"].lower())
            if not w.get("mix"):
                a(w["clue"])
        for s in g.get("steps", []):
            step(s)
for r in D["review"]:
    if not r.get("ref"):
        step(r)

out = app / "audio"
total = sum(len(v) for v in jobs.values())
missing = [(v, clean(t)) for v, ts in jobs.items() for t in sorted(ts) if not (out / v / f"{fnv(clean(t))}.mp3").exists()]
if "--check" in sys.argv:
    print(f"{total} frases, faltan {len(missing)}")
    sys.exit(0)

for n, (v, t) in enumerate(missing, 1):
    voice, rate, pitch = VOICES[v]
    f = out / v / f"{fnv(t)}.mp3"
    f.parent.mkdir(parents=True, exist_ok=True)
    print(f"[{n}/{len(missing)}] {v}: {t[:60]}")
    for intento in range(4):  # edge-tts falla a ratos: se reintenta antes de rendirse
        r = subprocess.run(["edge-tts", "--voice", voice, f"--rate={rate}", f"--pitch={pitch}", "--text", t, "--write-media", str(f)], capture_output=True)
        if r.returncode == 0 and f.exists() and f.stat().st_size > 0:
            break
        time.sleep(3 * (intento + 1))
    if r.returncode != 0 or not f.exists() or f.stat().st_size == 0:
        f.unlink(missing_ok=True)
        sys.exit("Falló edge-tts. Revisa la conexión (o pipx upgrade edge-tts) y vuelve a correr el script: sigue donde quedó.")

for v, ts in jobs.items():  # borra los mp3 de textos que ya no existen
    keep = {fnv(clean(t)) for t in ts}
    for p in (out / v).glob("*.mp3"):
        if p.stem not in keep:
            p.unlink()
ready = {v: sorted(p.stem for p in (out / v).glob("*.mp3")) for v in VOICES if (out / v).exists()}
(out / "ready.js").write_text("// generado por gen_audio.py: los mp3 que ya existen (por voz)\nwindow.AUDIO_READY = " + json.dumps(ready) + ";\n", encoding="utf-8")
print(f"Listo: {sum(len(x) for x in ready.values())} mp3.")
