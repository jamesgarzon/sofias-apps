#!/usr/bin/env python3
"""Pre-generate natural TTS audio for index.html. Run: python3 gen_audio.py (needs pipx-installed edge-tts)."""
import re, subprocess, pathlib

LINES = [
    "Hello, everyone!",
    "Today I want to talk about my favorite animal.",
    "My favorite animal is the dog.",
    "It is a domestic animal.",
    "This is its habitat.",
    "It lives in the house with a yard.",
    "Its habitat is dry and warm.",
    "There are trees, grass, rocks and water in its habitat.",
    "It eats dog food, carrots and meat.",
    "It can run and jump.",
    "I like this animal because it is cute, beautiful, friendly and playful.",
    "Thank you for listening!",
]
EXTRAS = [
    "Great job!", "Amazing!", "Super!", "You are a star!", "Wonderful!", "Fantastic!",
    "Hello! My favorite animal is the dog!",
    "You listened to everything!",
    "You finished all the missing words!",
    "You practiced every line!",
    "So close! Try once more!",
    "Good try! Listen and try again!",
    "Wow! You did the whole presentation! You are ready! I am so proud of you, Sofia!",
]
VOICES = {"jenny": "en-US-JennyNeural", "ana": "en-US-AnaNeural"}

def slug(text):  # must match slug() in index.html
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:40]

for name, voice in VOICES.items():
    outdir = pathlib.Path("audio") / name
    outdir.mkdir(parents=True, exist_ok=True)
    for text, rate in [(t, "-15%") for t in LINES] + [(t, "+0%") for t in EXTRAS]:
        out = outdir / f"{slug(text)}.mp3"
        if out.exists():
            continue
        subprocess.run(["edge-tts", "--voice", voice, "--rate", rate,
                        "--text", text, "--write-media", str(out)], check=True)
        print(out)
print("done")
