// Voz (mp3 de gen_audio.py o la voz del dispositivo) y efectos con Web Audio. Un solo botón de silencio para todo.
window.Sound = (() => {
  const READY = window.AUDIO_READY || {};
  const have = {};
  for (const k in READY) have[k] = new Set(READY[k]);
  // Si no hay mp3: voz del dispositivo con un tono por personaje.
  const SYS = { ava: [0.9, 1.05], slow: [0.7, 1.05], cosmo: [0.95, 1.6], luna: [0.85, 0.95], sunny: [0.95, 1.1], gaia: [0.85, 1], jupi: [0.8, 0.6], rocky: [1, 1.25], venus: [0.9, 1.15], mars: [0.9, 0.85], saturn: [0.9, 1], uranus: [0.95, 1.1] };
  const player = new Audio();
  let muted = false, token = 0, pending = [];
  try { muted = localStorage.getItem('ciencias-mute') === '1'; } catch (e) { /* sin almacenamiento */ }

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

  function tone(freq, at, dur, { type = 'triangle', gain = 0.18, to } = {}) {
    const c = ac(); if (!c) return;
    const t = c.currentTime + at, o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
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
  };
  const sfx = (k) => { if (!muted && SFX[k]) SFX[k](); };

  function toggle() {
    muted = !muted;
    try { localStorage.setItem('ciencias-mute', muted ? '1' : '0'); } catch (e) { /* nada */ }
    if (muted) stop();
    return muted;
  }

  return { say, stop, sfx, toggle, isMuted: () => muted, hash, clean };
})();
