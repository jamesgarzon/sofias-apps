#!/usr/bin/env python3
"""Pre-generate TTS for index.html. Run: python3 gen_audio.py [--check] (needs edge-tts).

Texts come straight out of the JSON block in index.html, so there is only one
source of truth and the audio can never drift from what is on screen.
"""
import json, pathlib, re, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

VOICE = "en-US-JennyNeural"
RATE = "-10%"
HERE = pathlib.Path(__file__).parent
OUT = HERE / "audio"


def content():
    html = (HERE / "index.html").read_text(encoding="utf-8")
    m = re.search(r'<script type="application/json" id="content">(.*?)</script>', html, re.S)
    return json.loads(m.group(1))


def speakable(text):
    return (text.replace("≠", " are not the same as ").replace("\n", " ").replace("·", ".")
            .replace("—", ",").replace("…", "...").replace("___", "blank").replace("  ", " "))


def jobs():
    d = content()
    out = {}
    for stall in d["stalls"]:
        for c in stall["cards"]:
            h, t = speakable(c["h"]), speakable(c["t"])
            out[c["a"]] = t if h.lower() in t.lower() else f"{h} {t}" if h[-1] in "?!." else f"{h}. {t}"
    for it in d["sort"]["items"] + d["hu"]:
        out[it["a"]] = speakable(it["n"])
    for it in d["tf"]:
        out[it["a"]] = speakable(it["s"])
    for b in d["match"]:
        out[b["a"]] = speakable(b["title"])
    for e in d["exam"]:
        out[e["a"]] = speakable(e["q"])
    out.update({k: speakable(v) for k, v in d["voice"].items()})
    return out


def tts(item):
    name, text = item
    mp3 = OUT / f"{name}.mp3"
    for _ in range(3):
        if subprocess.run(["edge-tts", "--voice", VOICE, "--rate", RATE, "--text", text,
                           "--write-media", str(mp3)], capture_output=True).returncode == 0:
            return name
    mp3.unlink(missing_ok=True)
    return f"FAILED {name}"


def main():
    todo = jobs()
    if "--check" in sys.argv:
        missing = [k for k in todo if not (OUT / f"{k}.mp3").exists()]
        extra = [p.stem for p in OUT.glob("*.mp3") if p.stem not in todo]
        print(f"{len(todo) - len(missing)}/{len(todo)} clips present")
        if missing:
            print("MISSING:", ", ".join(sorted(missing)))
        if extra:
            print("orphaned (safe to delete):", ", ".join(sorted(extra)))
        sys.exit(1 if missing else 0)

    OUT.mkdir(exist_ok=True)
    pending = [(k, v) for k, v in todo.items() if not (OUT / f"{k}.mp3").exists()]
    with ThreadPoolExecutor(6) as pool:
        for r in pool.map(tts, pending):
            print(r)
    print(f"done, {len(todo)} clips")


if __name__ == "__main__":
    main()
