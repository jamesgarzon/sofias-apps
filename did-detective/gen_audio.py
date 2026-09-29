#!/usr/bin/env python3
"""Pre-generate TTS for index.html. Run: python3 gen_audio.py [--check] (needs edge-tts).

Every spoken text is a literal string in the JSON block of index.html and its mp3 is
audio/<slug(text)>.mp3 (same slug() as index.html), so audio can't drift from the screen.
--check also asserts the tiles of each case rebuild exactly the sentence that is spoken.
"""
import json, pathlib, re, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

VOICE = "en-US-JennyNeural"
RATE = "-10%"
HERE = pathlib.Path(__file__).parent
OUT = HERE / "audio"


def slug(text):  # must match slug() in index.html
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:80]


def speakable(text):
    return (text.replace("3-B", "three B").replace("→", " becomes ").replace("=", " is ")
            .replace("+", " plus ").replace("…", "..."))


def content():
    html = (HERE / "index.html").read_text(encoding="utf-8")
    m = re.search(r'<script type="application/json" id="content">(.*?)</script>', html, re.S)
    return json.loads(m.group(1))


def jobs():
    d = content()
    texts = [l["t"] for l in d["lessons"]] + [l["st"] for l in d["lessons"] if "st" in l]
    for c in d["cases"]:
        q = c["type"] == "q"
        target = c["q"] if q else c["neg"]
        assert " ".join(c["parts"]) + ("?" if q else ".") == target, f"tiles != sentence: {c['id']}"
        assert c["past"] not in c["parts"], f"trap tile equals a real tile: {c['id']}"
        texts += [c["aff"], target] + ([c["yes"], c["no"]] if q else [])
    texts += [t["q"] for t in d["theory"]] + list(d["voice"].values())
    out = {}
    for t in texts:
        assert out.setdefault(slug(t), t) == t, f"slug clash: {t!r} / {out[slug(t)]!r}"
    return out


def tts(item):
    name, text = item
    mp3 = OUT / f"{name}.mp3"
    for _ in range(3):
        if subprocess.run(["edge-tts", "--voice", VOICE, f"--rate={RATE}", "--text", speakable(text),
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
