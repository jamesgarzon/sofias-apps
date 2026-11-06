// Voz (mp3 de gen_audio.py o la voz del dispositivo) y efectos con Web Audio. Un solo botón de silencio para todo.
window.Sound = (() => {
  const READY = window.AUDIO_READY || {};
  const have = {};
  for (const k in READY) have[k] = new Set(READY[k]);
  // Si no hay mp3: voz del dispositivo con un tono por personaje.
  const SYS = { ava: [0.9, 1.05], slow: [0.7, 1.05], biscuit: [0.95, 1.5], mimi: [0.9, 1.3], hoppy: [1, 1.35], bubbles: [0.9, 1.2], kiwi: [1.05, 1.4], shelly: [0.8, 0.95], nibbles: [1.05, 1.25], daisy: [0.9, 1.15], bamboo: [0.85, 0.8], sparkle: [0.95, 1.3], juana: [1, 1.25] };
  const player = new Audio();
  let muted = false, token = 0, pending = [];
  try { muted = localStorage.getItem('ingles-mute') === '1'; } catch (e) { /* sin almacenamiento */ }

  // FNV-1a de 32 bits sobre UTF-8: el mismo nombre de archivo que calcula gen_audio.py
  function hash(text) {
    let h = 0x811c9dc5;
    for (const b of new TextEncoder().encode(text)) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }
  const clean = (t) => String(t).replace(/\s+/g, ' ').trim();

  let sysVoice = null;
  function pickVoice() {
    const rank = (v) => (/natural|neural|premium|enhanced/i.test(v.name) ? 0 : /Ava|Samantha|Allison|Google US English|Jenny|Aria/i.test(v.name) ? 1 : 2);
    const vs = (window.speechSynthesis ? speechSynthesis.getVoices() : []).filter((v) => /^en/i.test(v.lang));
    vs.sort((a, b) => rank(a) - rank(b) || (/US/.test(b.lang) - /US/.test(a.lang)));
    sysVoice = vs[0] || null;
  }
  if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }

  let ctx = null;
  function ac() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  // iOS: el primer toque desbloquea el <audio> y el AudioContext.
  document.addEventListener('pointerdown', () => {
    ac();
    player.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
    player.play().catch(() => {});
  }, { once: true, capture: true });

  function stop() {
    token++;
    const p = pending; pending = []; p.forEach((r) => r());
    try { player.pause(); } catch (e) { /* nada */ }
    if (window.speechSynthesis) speechSynthesis.cancel();
  }

  // Dice un texto con la voz `who`; la promesa se cumple al terminar (o enseguida si está en silencio).
  function say(text, who = 'ava') {
    stop();
    text = clean(text);
    if (muted || !text) return Promise.resolve();
    const my = token, h = hash(text);
    if (have[who] && have[who].has(h)) {
      return new Promise((res) => {
        pending.push(res);
        player.onended = res;
        player.onerror = () => sys(text, who, my).then(res);
        player.src = `audio/${who}/${h}.mp3`;
        player.play().catch(() => sys(text, who, my).then(res));
        setTimeout(res, 3000 + text.length * 120); // si el mp3 se queda trabado, que la chispa no espere para siempre
      });
    }
    return sys(text, who, my);
  }
  function sys(text, who, my) {
    if (!window.speechSynthesis || my !== token) return Promise.resolve();
    return new Promise((res) => {
      pending.push(res);
      const u = new SpeechSynthesisUtterance(text);
      if (sysVoice) u.voice = sysVoice;
      u.lang = 'en-US';
      [u.rate, u.pitch] = SYS[who] || SYS.ava;
      let done = false;
      const fin = () => { if (!done) { done = true; res(); } };
      u.onend = fin; u.onerror = fin;
      setTimeout(fin, 1500 + text.length * 120); // por si el navegador nunca avisa
      speechSynthesis.speak(u);
    });
  }

  function tone(freq, at, dur, { type = 'triangle', gain = 0.18, to, out } = {}) {
    const c = ac(); if (!c) return;
    const t = c.currentTime + at, o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(out || c.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }
  function noise(dur, from, to) {
    const c = ac(); if (!c) return;
    const t = c.currentTime, n = c.sampleRate * dur, buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = buf; f.type = 'bandpass'; f.Q.value = 1.2;
    f.frequency.setValueAtTime(from, t);
    f.frequency.exponentialRampToValueAtTime(to, t + dur * 0.6);
    f.frequency.exponentialRampToValueAtTime(from, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.35, t + dur * 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(c.destination);
    src.start(t);
  }
  function hiss(at, dur, freq, gain) {
    const c = ac(); if (!c) return;
    const t = c.currentTime + at, n = Math.ceil(c.sampleRate * dur), buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = buf; f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = 1.5;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(c.destination);
    src.start(t);
  }
  const still = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SFX = {
    star: () => [1047, 1319, 1568, 2093].forEach((f, i) => tone(f, i * 0.07, 0.25, { gain: 0.14 })),
    right: () => { tone(784, 0, 0.14); tone(1047, 0.12, 0.3); },
    almost: () => { tone(392, 0, 0.18, { type: 'sine', gain: 0.16 }); tone(311, 0.16, 0.28, { type: 'sine', gain: 0.14 }); },
    pop: () => tone(900, 0, 0.09, { type: 'sine', gain: 0.25, to: 220 }),
    whoosh: () => { if (!still()) noise(0.7, 300, 2600); },
    chest: () => {
      [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.08, 0.3, { gain: 0.12 }));
      [523, 659, 784].forEach((f) => tone(f, 0.45, 0.9, { type: 'sine', gain: 0.08 }));
      [2093, 2637, 3136].forEach((f, i) => tone(f, 0.5 + i * 0.09, 0.2, { type: 'sine', gain: 0.05 }));
    },
    // La película del examen final.
    bubbles: () => [0, 0.12, 0.2, 0.34, 0.5].forEach((t, i) => tone(320 + i * 90, t, 0.09, { type: 'sine', gain: 0.16, to: 900 + i * 120 })),
    scribble: () => [0, 0.17, 0.36, 0.52, 0.7, 0.86].forEach((t) => hiss(t, 0.11, 3800, 0.06)),
    woof: () => [0, 0.24].forEach((t) => { tone(560, t, 0.14, { type: 'square', gain: 0.1, to: 230 }); hiss(t, 0.09, 700, 0.12); }),
    ding: () => tone(1568, 0, 0.2, { type: 'sine', gain: 0.12 }),
    drumroll: () => { for (let i = 0; i < 28; i++) hiss(i * 0.055, 0.06, 260, 0.05 + i * 0.006); },
    puff: () => tone(160, 0, 0.5, { type: 'sine', gain: 0.3, to: 720 }),
    stamp: () => { tone(110, 0, 0.22, { type: 'square', gain: 0.18, to: 55 }); hiss(0, 0.12, 900, 0.25); },
    fanfare: () => {
      [523, 659, 784].forEach((f, i) => tone(f, i * 0.14, 0.16, { type: 'sawtooth', gain: 0.07 }));
      [523, 659, 784, 1047].forEach((f) => tone(f, 0.42, 1.1, { type: 'sawtooth', gain: 0.05 }));
      [2093, 2637, 3136, 4186].forEach((f, i) => tone(f, 0.5 + i * 0.08, 0.25, { type: 'sine', gain: 0.05 }));
    },
  };
  const sfx = (k) => { if (!muted && SFX[k]) SFX[k](); };

  // Música de fondo de la película: ukelele y guitarra hawaiana con una melodía propia.
  // 8 compases hasta el «CHAMPION!» (14,6 s) y 4 de fiesta; hush() la apaga al cambiar de pantalla.
  let bus = null;
  function hush() {
    if (!bus) return;
    const b = bus; bus = null;
    b.gain.setTargetAtTime(0.0001, b.context.currentTime, 0.15);
    setTimeout(() => b.disconnect(), 900);
  }
  function music() {
    hush();
    const c = ac(); if (muted || !c) return;
    bus = c.createGain(); bus.gain.value = 0.5; bus.connect(c.destination);
    const out = bus, B = 1.825 / 4, hz = (m) => 440 * 2 ** ((m - 69) / 12);
    const CH = { C: [60, 64, 67, 72], A7: [57, 61, 64, 67], D7: [62, 66, 69, 72], G7: [55, 59, 62, 65], F: [53, 57, 60, 65] };
    const turn = [['C', [[0, 76, 1.5], [2, 79, 1.5]]], ['A7', [[0, 76, 1.5], [2, 73, 1.5]]], ['D7', [[0, 78, 1.5], [2, 81, 1.5]]], ['G7', [[0, 79, 1], [1.5, 77, 1], [2.5, 74, 1.5]]]];
    const party = [['C', [[0, 79, 1], [1, 84, 2.5]]], ['F', [[0, 81, 1], [1, 84, 2.5]]], ['G7', [[0, 83, 1], [1, 86, 1], [2, 89, 1.5]]], ['C', [[0, 84, 3.5]]]];
    [...turn, ...turn, ...party].forEach(([ch, mel], bar) => {
      const t0 = bar * 4 * B, notes = CH[ch];
      [0, 1, 1.5, 2.5, 3].forEach((beat) => {
        const up = beat % 1 !== 0;
        (up ? [...notes].reverse() : notes).forEach((m, i) => tone(hz(m), t0 + beat * B + i * 0.012, 0.28, { gain: up ? 0.035 : 0.05, out }));
      });
      tone(hz(notes[0] - 12), t0, 0.4, { type: 'sine', gain: 0.12, out });
      tone(hz(notes[2] - 12), t0 + 2 * B, 0.4, { type: 'sine', gain: 0.1, out });
      mel.forEach(([beat, m, len]) => {
        const t = c.currentTime + t0 + beat * B, d = len * B, o = c.createOscillator(), g = c.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(hz(m - 1), t);
        o.frequency.exponentialRampToValueAtTime(hz(m), t + 0.09);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.07, t + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(g).connect(out);
        o.start(t); o.stop(t + d + 0.02);
      });
    });
  }

  function toggle() {
    muted = !muted;
    try { localStorage.setItem('ingles-mute', muted ? '1' : '0'); } catch (e) { /* nada */ }
    if (muted) { stop(); hush(); }
    return muted;
  }

  return { say, stop, sfx, music, hush, toggle, isMuted: () => muted, hash, clean };
})();
