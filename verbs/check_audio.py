#!/usr/bin/env python3
"""Verifica que cada clip que index.html pide exista en audio/. Run: python3 check_audio.py"""
import re, pathlib, sys

html = pathlib.Path("index.html").read_text()
slugs = re.findall(r'\{s:"(\w+)"', html)
fbs = set(re.findall(r'"(fb-[\w-]+)"', html) + re.findall(r"'(fb-[\w-]+)'", html))

need = {f"{s}-{k}" for s in slugs for k in ("inf", "past", "es", "ex")} | fbs
missing = sorted(n for n in need if not pathlib.Path("audio", n + ".mp3").exists())

assert slugs, "no se encontraron verbos en index.html"
if missing:
    sys.exit(f"FALTAN {len(missing)} clips: {missing}")
print(f"ok — {len(slugs)} verbos, {len(need)} clips presentes")
