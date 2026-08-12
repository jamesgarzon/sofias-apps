#!/usr/bin/env python3
"""Pre-generate TTS for index.html. Run: python3 gen_audio.py [--check] (needs edge-tts).

Texts come straight out of the JSON block in index.html, so there is only one
source of truth and the audio can never drift from what is on screen.
"""
import json, pathlib, re, subprocess, sys

VOICE = "en-US-JennyNeural"
RATE = "-10%"
HERE = pathlib.Path(__file__).parent
OUT = HERE / "audio"


def content():
    html = (HERE / "index.html").read_text(encoding="utf-8")
    m = re.search(r'<script type="application/json" id="content">(.*?)</script>', html, re.S)
    return json.loads(m.group(1))


def speakable(text):
    return text.replace("·", ".").replace("—", ",").replace("…", "...")


def jobs():
    d = content()
    out = {}
    for hall in d["halls"]:
        for c in hall["cards"]:
            out[c["a"]] = speakable(f'{c["h"]}. {c["t"]}')
    for q in d["quiz"]:
        out[q["a"]] = speakable(q["q"])
    out.update({k: speakable(v) for k, v in d["voice"].items()})
    return out


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
    for name, text in todo.items():
        mp3 = OUT / f"{name}.mp3"
        if mp3.exists():
            continue
        subprocess.run(["edge-tts", "--voice", VOICE, "--rate", RATE,
                        "--text", text, "--write-media", str(mp3)], check=True)
        print(mp3.name)
    print(f"done — {len(todo)} clips")


if __name__ == "__main__":
    main()
