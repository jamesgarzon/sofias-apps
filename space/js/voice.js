// Voz: mp3 pregenerados (gen_audio.py) o la mejor voz del dispositivo; reconocimiento de voz para
// revisar lo que dice Sofía; medidor de volumen y grabadora; sonidos cortos con WebAudio.
window.Voice = (() => {
  const READY = window.AUDIO_READY || {};
  const have = {};
  for (const k in READY) have[k] = new Set(READY[k]);
  const VOICES = { guide: 'jenny', kid: 'ana' };
  const player = new Audio();
  player.preload = 'auto';
  let slow = localStorage.getItem('space-slow') === '1';
  let token = 0;
  let pending = []; // promesas de say() en curso: stop() las cumple para que nadie quede esperando

  // FNV-1a de 32 bits sobre UTF-8: el mismo nombre de archivo que calcula gen_audio.py
  function hash(text) {
    let h = 0x811c9dc5;
    for (const b of new TextEncoder().encode(text)) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }
  const clean = (t) => String(t).replace(/\*/g, '').replace(/\s+/g, ' ').trim();

  let sysVoice = null;
  function pickVoice() {
    const rank = (v) => (/natural|neural|premium|enhanced/i.test(v.name) ? 0 : /Samantha|Ava|Allison|Zoe|Google US English|Jenny|Aria/i.test(v.name) ? 1 : /Google|Microsoft/i.test(v.name) ? 2 : 3);
    const vs = (window.speechSynthesis ? speechSynthesis.getVoices() : []).filter((v) => /^en[-_]US/i.test(v.lang) || /^en/i.test(v.lang));
    vs.sort((a, b) => rank(a) - rank(b) || (/US/.test(b.lang) - /US/.test(a.lang)));
    sysVoice = vs[0] || null;
  }
  if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }

  function silentWav() { // 0,05 s de silencio: un WAV válido para desbloquear el <audio>
    const n = 400, b = new DataView(new ArrayBuffer(44 + n));
    const w = (o, str) => [...str].forEach((c, i) => b.setUint8(o + i, c.charCodeAt(0)));
    w(0, 'RIFF'); b.setUint32(4, 36 + n, true); w(8, 'WAVEfmt '); b.setUint32(16, 16, true); b.setUint16(20, 1, true); b.setUint16(22, 1, true);
    b.setUint32(24, 8000, true); b.setUint32(28, 8000, true); b.setUint16(32, 1, true); b.setUint16(34, 8, true); w(36, 'data'); b.setUint32(40, n, true);
    for (let i = 0; i < n; i++) b.setUint8(44 + i, 128);
    return URL.createObjectURL(new Blob([b], { type: 'audio/wav' }));
  }
  // Desbloquea el audio en iOS con el primer toque (un mismo <audio> reutilizado).
  let unlocked = false;
  function unlock() {
    if (unlocked) return;
    unlocked = true;
    try { player.src = silentWav(); player.play().catch(() => {}); } catch (e) { /* sin audio */ }
    ctx();
  }
  document.addEventListener('pointerdown', unlock, { once: true, capture: true });

  function stop() {
    token++;
    const p = pending; pending = []; p.forEach((r) => r());
    try { player.pause(); } catch (e) { /* nada */ }
    if (window.speechSynthesis) speechSynthesis.cancel();
  }

  // Dice un texto (o una lista de textos en cadena). Devuelve una promesa que se cumple al terminar.
  function say(texts, who = 'guide') {
    stop();
    const my = token;
    const list = (Array.isArray(texts) ? texts : [texts]).map(clean).filter(Boolean);
    return list.reduce((p, t) => p.then(() => (my === token ? one(t, who, my) : null)), Promise.resolve());
  }
  function one(text, who, my) {
    const vkey = VOICES[who] || 'jenny';
    const h = hash(text);
    if (have[vkey] && have[vkey].has(h)) {
      return new Promise((res) => {
        pending.push(res);
        player.onended = res; player.onerror = () => sys(text, who, my).then(res);
        player.src = `audio/${vkey}/${h}.mp3`;
        player.playbackRate = slow ? 0.75 : 1;
        player.play().catch(() => sys(text, who, my).then(res));
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
      u.rate = (who === 'kid' ? 0.85 : 0.92) * (slow ? 0.72 : 1);
      u.pitch = who === 'kid' ? 1.25 : 1.05;
      let done = false;
      const fin = () => { if (!done) { done = true; res(); } };
      u.onend = fin; u.onerror = fin;
      setTimeout(fin, 1500 + text.length * 160); // por si el navegador nunca avisa
      speechSynthesis.speak(u);
    });
  }
  const setSlow = (v) => { slow = v; localStorage.setItem('space-slow', v ? '1' : '0'); };

  // ---------- Reconocimiento de voz ----------
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null;
  function listen({ onInterim, maxMs = 12000 } = {}) {
    stop();
    return new Promise((resolve, reject) => {
      if (!SR) return reject('unsupported');
      const r = new SR();
      rec = r;
      r.lang = 'en-US'; r.interimResults = true; r.maxAlternatives = 4; r.continuous = false;
      let alts = null, interim = '', err = null;
      r.onresult = (e) => {
        let txt = '';
        for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript + ' ';
        interim = txt.trim();
        const last = e.results[e.results.length - 1];
        if (last.isFinal) {
          const before = Array.from(e.results).slice(0, -1).map((x) => x[0].transcript).join(' ');
          alts = Array.from(last).map((a) => `${before} ${a.transcript}`.trim());
        }
        if (onInterim) onInterim(interim);
      };
      r.onerror = (e) => { err = e.error; };
      r.onend = () => {
        clearTimeout(t); rec = null;
        if (alts && alts.length) resolve(alts);
        else if (interim) resolve([interim]);
        else reject(err || 'no-speech');
      };
      const t = setTimeout(() => { try { r.stop(); } catch (e) { /* ya paró */ } }, maxMs);
      try { r.start(); } catch (e) { reject('busy'); }
    });
  }
  function stopListening() { if (rec) try { rec.stop(); } catch (e) { /* nada */ } }

  // ---------- Comparar lo que dijo con el texto ----------
  const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function numWords(n) {
    if (n < 20) return ONES[n];
    if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
    if (n < 1000) return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + numWords(n % 100) : '');
    if (n < 10000) return numWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + numWords(n % 1000) : '');
    return String(n);
  }
  const ALIAS = { sophia: 'sofia', sofie: 'sofia', sophie: 'sofia', its: 'its', okay: 'ok', colombian: 'colombia', columbia: 'colombia' };
  function words(text) {
    return String(text).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/(\d),(\d)/g, '$1$2').replace(/\d+/g, (d) => ' ' + numWords(+d) + ' ')
      .replace(/&/g, ' and ').replace(/['’]/g, '').replace(/[^a-z ]+/g, ' ')
      .split(/\s+/).filter(Boolean).map((w) => ALIAS[w] || w);
  }
  // Puntaje 0..1 por distancia de edición entre palabras (palabras de más, de menos o cambiadas cuestan).
  function score(said, target) {
    const a = words(said), b = words(target);
    if (!b.length) return 0;
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 0; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return Math.max(0, 1 - d[a.length][b.length] / b.length);
  }
  // Marca qué palabras del texto se oyeron (subsecuencia común más larga).
  function marks(said, target) {
    const a = words(said);
    const tokens = String(target).split(/\s+/).filter(Boolean);
    const b = tokens.map((t) => words(t).join(' '));
    const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    const eq = (x, y) => y.split(' ').includes(x) || x === y;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      dp[i][j] = eq(a[i - 1], b[j - 1]) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    const ok = Array(b.length).fill(false);
    let i = a.length, j = b.length;
    while (i > 0 && j > 0) {
      if (eq(a[i - 1], b[j - 1]) && dp[i][j] === dp[i - 1][j - 1] + 1) { ok[j - 1] = true; i--; j--; }
      else if (dp[i - 1][j] >= dp[i][j - 1]) i--; else j--;
    }
    return tokens.map((t, k) => ({ t, ok: ok[k] || !b[k] }));
  }
  function best(alts, target) {
    let top = { s: -1, heard: '' };
    for (const h of alts) { const s = score(h, target); if (s > top.s) top = { s, heard: h }; }
    return top;
  }
  // ¿La respuesta menciona alguna de las claves? keys: ["ocean|water", "air"] → todas las claves, cualquiera de sus variantes.
  function hasKeys(said, keys) {
    const w = ' ' + words(said).join(' ') + ' ';
    return keys.every((k) => k.split('|').some((v) => w.includes(' ' + words(v).join(' ') + ' ')));
  }

  // ---------- Micrófono: volumen y grabación ----------
  let actx = null;
  function ctx() {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    if (!actx) actx = new C();
    if (actx.state === 'suspended') actx.resume().catch(() => {});
    return actx;
  }
  const Mic = {
    stream: null, analyser: null, buf: null, recorder: null, chunks: [],
    async start({ video = false } = {}) {
      this.stop();
      const audio = { echoCancellation: false, noiseSuppression: false, autoGainControl: false };
      this.stream = await navigator.mediaDevices.getUserMedia({ audio, video: video ? { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } : false });
      const c = ctx();
      if (c) {
        const src = c.createMediaStreamSource(this.stream);
        this.analyser = c.createAnalyser();
        this.analyser.fftSize = 1024;
        this.buf = new Float32Array(this.analyser.fftSize);
        src.connect(this.analyser);
      }
      return this.stream;
    },
    // Nivel en dB (≈ -100 silencio … 0 máximo)
    level() {
      if (!this.analyser) return -100;
      this.analyser.getFloatTimeDomainData(this.buf);
      let sum = 0;
      for (let i = 0; i < this.buf.length; i++) sum += this.buf[i] * this.buf[i];
      return Math.max(-100, 10 * Math.log10(sum / this.buf.length + 1e-12));
    },
    record() {
      if (!this.stream || !window.MediaRecorder) return false;
      this.chunks = [];
      try { this.recorder = new MediaRecorder(this.stream); } catch (e) { return false; }
      this.recorder.ondataavailable = (e) => { if (e.data && e.data.size) this.chunks.push(e.data); };
      this.recorder.start(500);
      return true;
    },
    stopRecord() {
      return new Promise((res) => {
        const r = this.recorder;
        if (!r || r.state === 'inactive') return res(null);
        r.onstop = () => { const blob = new Blob(this.chunks, { type: r.mimeType || 'audio/webm' }); this.recorder = null; res(blob); };
        r.stop();
      });
    },
    stop() {
      if (this.recorder && this.recorder.state !== 'inactive') try { this.recorder.stop(); } catch (e) { /* nada */ }
      this.recorder = null;
      if (this.stream) this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null; this.analyser = null;
    },
  };

  // ---------- Sonidos ----------
  function beep(f, dur, type = 'sine', vol = 0.12, when = 0) {
    const c = ctx();
    if (!c) return;
    const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + when;
    o.type = type; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur);
  }
  const sfx = {
    good: () => { beep(660, 0.14); beep(880, 0.25, 'sine', 0.12, 0.12); },
    bad: () => beep(190, 0.3, 'triangle', 0.14),
    tap: () => beep(520, 0.07, 'sine', 0.08),
    pop: (k = 0) => beep(440 + k * 70, 0.12, 'sine', 0.1),
    whoosh: () => { const c = ctx(); if (!c) return; const o = c.createOscillator(), g = c.createGain(); o.type = 'sawtooth'; o.frequency.setValueAtTime(120, c.currentTime); o.frequency.exponentialRampToValueAtTime(900, c.currentTime + 0.5); g.gain.setValueAtTime(0.04, c.currentTime); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.6); o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.6); },
    win: () => [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.25, 'sine', 0.11, i * 0.12)),
    clap: () => { const c = ctx(); if (!c) return; for (let k = 0; k < 14; k++) { const b = c.createBuffer(1, c.sampleRate * 0.05, c.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length); const s = c.createBufferSource(), g = c.createGain(); s.buffer = b; g.gain.value = 0.18; s.connect(g); g.connect(c.destination); s.start(c.currentTime + k * 0.09 + Math.random() * 0.05); } },
  };

  return { say, stop, hash, clean, get slow() { return slow; }, setSlow, canListen: !!SR, listen, stopListening, words, score, marks, best, hasKeys, Mic, sfx, unlock };
})();
