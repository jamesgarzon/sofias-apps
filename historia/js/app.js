// Viajera del Tiempo — lógica de la app (pantallas, juegos, sonido, voz, progreso)
(() => {
  'use strict';
  const D = window.HISTORIA, SC = window.SCENES;
  const ERAS = D.eras, JOURNEYS = D.journeys, V = D.voice;
  const NOW = new Date().getFullYear();
  const AUDIO_OK = window.HISTORIA_AUDIO === true;
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const app = $('#app'), overlay = $('#overlay');
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reflow = (el) => void el.offsetWidth;

  // ---------- progreso (localStorage) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem('historia-' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('historia-' + k, JSON.stringify(v)); } catch { /* sin almacenamiento: seguimos igual */ } },
  };
  let stars = store.get('stars', 0);
  const seen = store.get('seen', {});
  const stamps = store.get('stamps', {});
  const best = store.get('best', {});
  const settings = Object.assign({ sound: true, voice: true }, store.get('settings', {}));
  const seenOf = (id) => (seen[id] ??= []);
  const saveBest = (k, v, lower = false) => { if (best[k] == null || (lower ? v < best[k] : v > best[k])) { best[k] = v; store.set('best', best); } };

  // ---------- años ----------
  const fmtNum = (n) => n.toLocaleString('es-CO');
  const fmtYear = (y) => (y <= 0 ? `${-y >= 10000 ? fmtNum(-y) : Math.max(1, -y)} a.C.` : y < 1000 ? `${y} d.C.` : `${y}`);
  const ago = (y) => (y < 0 ? NOW - y - 1 : NOW - y);
  function agoText(y) {
    const a = ago(y);
    if (a >= 1e6) return 'hace millones de años';
    if (a > 3000) return `hace unos ${fmtNum(Math.round(a / 500) * 500)} años`;
    return `hace ${fmtNum(a)} años`;
  }

  // ---------- efectos de sonido (WebAudio, sin archivos) ----------
  let actx = null;
  const ac = () => { if (!actx) { const C = window.AudioContext || window.webkitAudioContext; if (C) actx = new C(); } if (actx?.state === 'suspended') actx.resume(); return actx; };
  function tone(f, d, { type = 'sine', vol = 0.2, at = 0, to = null } = {}) {
    if (!settings.sound) return; const c = ac(); if (!c) return;
    const t = c.currentTime + at, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t); if (to) o.frequency.exponentialRampToValueAtTime(to, t + d);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + d + 0.05);
  }
  function noise(d, { vol = 0.2, at = 0, f0 = 400, f1 = 3000, q = 1.2 } = {}) {
    if (!settings.sound) return; const c = ac(); if (!c) return;
    const t = c.currentTime + at, len = Math.floor(c.sampleRate * d), buf = c.createBuffer(1, len, c.sampleRate), data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource(); src.buffer = buf;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = q; bp.frequency.setValueAtTime(f0, t); bp.frequency.exponentialRampToValueAtTime(f1, t + d);
    const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + d * 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    src.connect(bp).connect(g).connect(c.destination); src.start(t); src.stop(t + d);
  }
  const SFX = {
    tap: () => tone(520, 0.06, { type: 'triangle', vol: 0.1, to: 700 }),
    pop: () => { tone(500, 0.1, { type: 'triangle', vol: 0.2, to: 1100 }); tone(1500, 0.08, { vol: 0.07, at: 0.06 }); },
    ding: () => { tone(880, 0.14, { vol: 0.22 }); tone(1318, 0.3, { vol: 0.2, at: 0.1 }); tone(1760, 0.25, { vol: 0.07, at: 0.18 }); },
    buzz: () => { tone(200, 0.3, { type: 'sawtooth', vol: 0.08, to: 120 }); tone(150, 0.32, { type: 'square', vol: 0.04, at: 0.04, to: 90 }); },
    soft: () => tone(300, 0.15, { type: 'triangle', vol: 0.1, to: 220 }),
    whoosh: () => { noise(1.5, { vol: 0.22, f0: 180, f1: 4200 }); tone(110, 1.5, { vol: 0.1, to: 880 }); },
    arrive: () => { tone(660, 0.2, { type: 'triangle', vol: 0.14 }); tone(990, 0.4, { vol: 0.14, at: 0.08 }); tone(1320, 0.5, { vol: 0.06, at: 0.16 }); },
    fanfare: () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, { type: 'triangle', vol: 0.17, at: i * 0.11 })); tone(1047, 0.8, { vol: 0.15, at: 0.48 }); tone(1319, 0.8, { vol: 0.09, at: 0.48 }); },
    stamp: () => { tone(110, 0.25, { vol: 0.5, to: 50 }); noise(0.15, { vol: 0.3, f0: 300, f1: 200, q: 0.5 }); },
    flip: () => tone(700, 0.07, { type: 'triangle', vol: 0.1, to: 1000 }),
    portal: () => { tone(1200, 0.6, { vol: 0.15, to: 140 }); noise(0.5, { vol: 0.1, f0: 2000, f1: 300 }); },
    place: (k = 0) => tone(392 * Math.pow(1.122, k), 0.1, { type: 'triangle', vol: 0.15 }),
    tick: () => tone(1800, 0.02, { type: 'square', vol: 0.025 }),
  };

  // ---------- voz: mp3 pregenerado (gen_audio.py) o, si no existe, la voz del dispositivo ----------
  const voz = new Audio();
  const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
  let esVoice = null, sayTok = 0, speakingBtn = null;
  function pickVoice() {
    const vs = synth ? synth.getVoices() : [];
    for (const p of ['es-CO', 'es-419', 'es-MX', 'es-US', 'es-ES', 'es']) {
      const v = vs.find((x) => x.lang.replace('_', '-').toLowerCase().startsWith(p.toLowerCase()));
      if (v) return v;
    }
    return null;
  }
  if (synth) { esVoice = pickVoice(); synth.onvoiceschanged = () => { esVoice = pickVoice(); }; }
  const cleanText = (t) => t.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}“”]/gu, '');
  function clearSpeaking() { speakingBtn?.classList.remove('speaking'); speakingBtn = null; }
  function stopVoice() { sayTok++; voz.pause(); voz.onended = null; synth?.cancel(); clearSpeaking(); }
  function sayChain(list, btn) {
    stopVoice();
    if (!settings.voice || !list.length) return;
    const tok = sayTok;
    if (btn) { speakingBtn = btn; btn.classList.add('speaking'); }
    if (AUDIO_OK) {
      let n = 0;
      const next = () => {
        if (tok !== sayTok) return;
        if (n >= list.length) return clearSpeaking();
        voz.src = `audio/${list[n++][0]}.mp3`; voz.onended = next; voz.play().catch(clearSpeaking);
      };
      return next();
    }
    if (!synth) return clearSpeaking();
    setTimeout(() => { // Chrome pierde a veces un speak() justo después de cancel()
      if (tok !== sayTok) return;
      list.forEach(([, t], i) => {
        const u = new SpeechSynthesisUtterance(cleanText(t));
        u.lang = esVoice?.lang || 'es-CO'; if (esVoice) u.voice = esVoice; u.rate = 0.95; u.pitch = 1.08;
        if (i === list.length - 1) u.onend = u.onerror = () => { if (tok === sayTok) clearSpeaking(); };
        synth.speak(u);
      });
    }, 80);
  }
  const say = (pair, btn) => sayChain([pair], btn);
  // claves de audio: deben coincidir con gen_audio.py
  const T = {
    era: (id) => [`era-${id}`, `${ERAS[id].name}. ${ERAS[id].intro}`],
    hs: (id, k) => [`hs-${id}-${k}`, `${ERAS[id].hotspots[k].title}. ${ERAS[id].hotspots[k].text}`],
    q: (q) => [`q-${q.id}`, q.q],
    why: (q) => [`why-${q.id}`, q.why],
    v: (k) => [`v-${k}`, V[k]],
    fact: (i) => [`fact-${i}`, D.facts[i]],
  };
  // móvil: el audio sólo arranca tras un gesto; lo desbloqueamos en el primer toque
  document.addEventListener('pointerdown', () => {
    ac();
    if (AUDIO_OK) { voz.muted = true; voz.src = 'audio/v-ok-0.mp3'; voz.play().then(() => { voz.pause(); voz.muted = false; }).catch(() => { voz.muted = false; }); }
    else if (synth) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; synth.speak(u); }
  }, { once: true, capture: true });

  // ---------- cielo estrellado de fondo ----------
  const sky = $('#sky'), sctx = sky.getContext('2d');
  const fx = $('#fx'), fctx = fx.getContext('2d');
  let skyStars = [], shoot = null;
  function sizeCanvas(cv, ctx) { const dpr = Math.min(devicePixelRatio || 1, 2); cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  function initSky() {
    sizeCanvas(sky, sctx); sizeCanvas(fx, fctx);
    const n = Math.min(220, Math.round((innerWidth * innerHeight) / 7000));
    skyStars = Array.from({ length: n }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 1.4 + 0.3, p: Math.random() * 6.28, s: 0.6 + Math.random() * 1.6 }));
    if (REDUCED) drawSky(0);
  }
  function drawSky(t) {
    sctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const s of skyStars) {
      sctx.globalAlpha = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin((t / 1000) * s.s + s.p));
      sctx.fillStyle = '#fff'; sctx.beginPath(); sctx.arc(s.x, s.y, s.r, 0, 6.283); sctx.fill();
    }
    if (!REDUCED) {
      if (!shoot && Math.random() < 0.004) shoot = { x: Math.random() * innerWidth * 0.7, y: Math.random() * innerHeight * 0.4, life: 1 };
      if (shoot) {
        const len = 120 * shoot.life, g = sctx.createLinearGradient(shoot.x, shoot.y, shoot.x - len, shoot.y - len * 0.45);
        g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(255,255,255,0)');
        sctx.globalAlpha = shoot.life; sctx.strokeStyle = g; sctx.lineWidth = 2.2; sctx.beginPath(); sctx.moveTo(shoot.x, shoot.y); sctx.lineTo(shoot.x - len, shoot.y - len * 0.45); sctx.stroke();
        shoot.x += 11; shoot.y += 5; shoot.life -= 0.022; if (shoot.life <= 0) shoot = null;
      }
    }
    sctx.globalAlpha = 1;
  }
  (function skyLoop(t) { if (!document.hidden && !REDUCED) drawSky(t); requestAnimationFrame(skyLoop); })(0);
  addEventListener('resize', initSky);
  initSky();

  // ---------- confeti ----------
  let parts = [], fxRun = false;
  const COLORS = ['#ffd23f', '#ff4fa3', '#33e0ff', '#3ddc84', '#8b5cf6', '#ff9f1c', '#ffffff'];
  function confetti(x, y, n = 40, spread = 1) {
    if (REDUCED) n = Math.min(n, 10);
    for (let i = 0; i < n; i++) parts.push({ x, y, vx: (Math.random() - 0.5) * 11 * spread, vy: -Math.random() * 11 - 3, r: Math.random() * 360, vr: (Math.random() - 0.5) * 16, w: 6 + Math.random() * 6, h: 4 + Math.random() * 5, c: pick(COLORS), life: 80 + Math.random() * 50, star: Math.random() < 0.25 });
    if (!fxRun) { fxRun = true; requestAnimationFrame(fxLoop); }
  }
  const burst = (el, n = 30) => { const r = el.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2, n); };
  function fxLoop() {
    fctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter((p) => p.life-- > 0 && p.y < innerHeight + 40);
    for (const p of parts) {
      p.vy += 0.32; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      fctx.save(); fctx.translate(p.x, p.y); fctx.rotate((p.r * Math.PI) / 180); fctx.globalAlpha = Math.min(1, p.life / 30); fctx.fillStyle = p.c;
      if (p.star) { fctx.beginPath(); for (let k = 0; k < 10; k++) { const rr = k % 2 ? 3 : 7, a = (k * Math.PI) / 5; fctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } fctx.fill(); }
      else fctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      fctx.restore();
    }
    if (parts.length) requestAnimationFrame(fxLoop); else { fxRun = false; fctx.clearRect(0, 0, innerWidth, innerHeight); }
  }
  function celebrate() { confetti(innerWidth * 0.2, innerHeight * 0.4, 50, 1.2); setTimeout(() => confetti(innerWidth * 0.8, innerHeight * 0.4, 50, 1.2), 200); setTimeout(() => confetti(innerWidth / 2, innerHeight * 0.3, 60, 1.5), 420); }

  // ---------- estrellas ⭐ ----------
  function updatePill() { const p = $('#starPill'); if (!p) return; $('b', p).textContent = stars; p.classList.remove('bump'); reflow(p); p.classList.add('bump'); }
  function addStars(n, fromEl) {
    if (n <= 0) return;
    stars += n; store.set('stars', stars);
    const pill = $('#starPill');
    if (!pill) return;
    const to = pill.getBoundingClientRect();
    const fr = fromEl ? fromEl.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
    const fx0 = fr.left + fr.width / 2, fy0 = fr.top + fr.height / 2;
    for (let i = 0; i < Math.min(n, 5); i++) {
      const s = document.createElement('div'); s.className = 'fly-star'; s.textContent = '⭐';
      s.style.left = fx0 - 15 + 'px'; s.style.top = fy0 - 15 + 'px'; s.style.transitionDelay = i * 0.12 + 's';
      document.body.appendChild(s);
      requestAnimationFrame(() => requestAnimationFrame(() => { s.style.transform = `translate(${to.left + to.width / 2 - fx0}px, ${to.top + to.height / 2 - fy0}px) scale(.6) rotate(360deg)`; }));
      setTimeout(() => { s.remove(); if (i === Math.min(n, 5) - 1) updatePill(); }, 860 + i * 120);
    }
  }
  const pillHTML = () => `<div class="star-pill" id="starPill" aria-label="Estrellas"><span>⭐</span><b>${stars}</b></div>`;
  const topbar = (title, back = 'home') => `<header class="topbar"><button class="icon-btn" data-back="${back}" aria-label="Volver">⟵</button><h2 class="tb-title">${title}</h2>${pillHTML()}</header>`;

  // ---------- capa de diálogos ----------
  function openOverlay(html, { onClose, light = false } = {}) {
    overlay.innerHTML = `<div class="backdrop ${light ? 'light' : ''}" data-close></div>${html}`;
    overlay.classList.add('show'); overlay._onClose = onClose || null;
    setTimeout(() => $('.btn, .set-btn', overlay)?.focus({ preventScroll: true }), 350);
    return overlay;
  }
  function closeOverlay(silent = false) {
    if (!overlay.classList.contains('show')) return;
    overlay.classList.remove('show'); overlay.innerHTML = '';
    const f = overlay._onClose; overlay._onClose = null;
    if (f && !silent) f();
  }
  overlay.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) { SFX.tap(); closeOverlay(); } });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeOverlay(); });

  // ---------- navegación ----------
  const SCREENS = {};
  let cleanups = [];
  function go(name, params = {}) {
    stopVoice(); closeOverlay(true); cleanups.forEach((f) => f()); cleanups = [];
    $$('.warp, .fly-star, .ghost').forEach((n) => n.remove());
    app.innerHTML = '';
    const v = document.createElement('div'); v.className = 'view view-' + name; app.appendChild(v);
    SCREENS[name](v, params);
    scrollTo(0, 0);
  }
  app.addEventListener('click', (e) => { const b = e.target.closest('[data-back]'); if (b) { SFX.tap(); go(b.dataset.back); } });

  // ---------- viaje en el tiempo (pantalla de túnel) ----------
  function warp(fromY, toY, label) {
    return new Promise((res) => {
      stopVoice();
      const w = document.createElement('div'); w.className = 'warp'; w.setAttribute('role', 'status');
      w.innerHTML = `<div class="warp-tunnel"></div><div class="warp-rings"><span></span><span></span><span></span><span></span></div>
        <div class="warp-info"><div class="warp-label">${toY < fromY ? '⏪ Viajando al pasado' : '⏩ Viajando hacia el futuro'}</div><div class="warp-year">${fmtYear(fromY)}</div><div class="warp-era">${label}</div></div><div class="warp-flash"></div>`;
      document.body.appendChild(w); SFX.whoosh();
      requestAnimationFrame(() => w.classList.add('show'));
      const yEl = $('.warp-year', w), dur = REDUCED ? 250 : 1750, t0 = performance.now();
      const a0 = Math.log(ago(fromY) + 1), a1 = Math.log(ago(toY) + 1);
      let lastTick = 0;
      (function step(t) {
        if (!w.isConnected) return res();
        const k = Math.min(1, (t - t0) / dur), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        yEl.textContent = fmtYear(k >= 1 ? toY : Math.round(NOW - (Math.exp(a0 + (a1 - a0) * e) - 1)));
        if (t - lastTick > 90 && k < 0.9) { SFX.tick(); lastTick = t; }
        if (k < 1) return requestAnimationFrame(step);
        $('.warp-flash', w).classList.add('go'); SFX.arrive();
        setTimeout(() => { res(); w.classList.remove('show'); setTimeout(() => w.remove(), 320); }, 420);
      })(t0);
    });
  }

  // ---------- sello de pasaporte ----------
  let uid = 0;
  function stampSVG(id) {
    const e = ERAS[id], p = `st${++uid}`;
    return `<svg viewBox="0 0 200 200" class="stamp-svg" aria-hidden="true"><defs><path id="${p}" d="M100,100 m-73,0 a73,73 0 1,1 146,0 a73,73 0 1,1 -146,0"/></defs>
      <circle cx="100" cy="100" r="92" fill="${e.color}" opacity=".12"/>
      <g fill="none" stroke="${e.color}"><circle cx="100" cy="100" r="94" stroke-width="5"/><circle cx="100" cy="100" r="86" stroke-width="1.5" stroke-dasharray="4 4"/><circle cx="100" cy="100" r="58" stroke-width="3"/></g>
      <text font-family="Fredoka, sans-serif" font-weight="700" font-size="15" fill="${e.color}"><textPath href="#${p}" textLength="440" lengthAdjust="spacing">★ ${esc(e.short.toUpperCase())} ★ ${e.j === 'w' ? 'HISTORIA DEL MUNDO' : 'HISTORIA DE COLOMBIA'}</textPath></text>
      <text x="100" y="119" text-anchor="middle" font-size="54">${e.emoji}</text></svg>`;
  }

  // ---------- búho ----------
  const owlHTML = (cls = '') => `<span class="owl ${cls}">${SC.owl()}</span>`;

  // =================== INICIO ===================
  function portalSVG() {
    const nums = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
    return `<svg viewBox="-160 -160 320 320" class="portal-svg" aria-hidden="true">
      <defs>
        <radialGradient id="pt-g"><stop offset="0" stop-color="#fff"/><stop offset=".16" stop-color="#ffe9a8"/><stop offset=".4" stop-color="#ff5ca8"/><stop offset=".68" stop-color="#6c3bff"/><stop offset="1" stop-color="#1a0b45" stop-opacity="0"/></radialGradient>
        <linearGradient id="pt-ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0a8"/><stop offset=".5" stop-color="#ffb31f"/><stop offset="1" stop-color="#c47600"/></linearGradient>
      </defs>
      <circle r="152" fill="url(#pt-g)" class="pt-core"/>
      <g class="pt-spiral" opacity=".6">${[0, 60, 120, 180, 240, 300].map((a) => `<path d="M0,0 Q40,-18 58,-66 Q68,-108 38,-138" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" transform="rotate(${a})" opacity=".65"/>`).join('')}</g>
      <g class="pt-r3"><circle r="78" fill="none" stroke="#33e0ff" stroke-width="2.5" stroke-dasharray="3 9"/></g>
      <g class="pt-r2"><circle r="104" fill="none" stroke="url(#pt-ring)" stroke-width="10" stroke-dasharray="46 14 8 14"/></g>
      <g class="pt-r1"><circle r="134" fill="none" stroke="#ffd23f" stroke-width="2" opacity=".8"/>
        ${[...Array(60)].map((_, i) => `<line x1="0" y1="-134" x2="0" y2="${i % 5 ? -129 : -124}" stroke="#ffd23f" stroke-width="${i % 5 ? 1 : 2.2}" transform="rotate(${i * 6})"/>`).join('')}
        ${nums.map((n, i) => `<text x="0" y="-108" transform="rotate(${i * 30})" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="14" fill="#ffe9a8">${n}</text>`).join('')}</g>
      <g class="pt-hand-m"><line x1="0" y1="8" x2="0" y2="-62" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>
      <g class="pt-hand-h"><line x1="0" y1="6" x2="0" y2="-40" stroke="#ffd23f" stroke-width="7" stroke-linecap="round"/></g>
      <circle r="9" fill="#ffd23f" stroke="#fff" stroke-width="3"/>
    </svg>`;
  }
  let owlStep = 0;
  function owlTalk(wrap) {
    const owl = $('.owl', wrap), bub = $('.bubble', wrap);
    const pair = owlStep++ === 0 ? T.v('welcome') : T.fact((owlStep - 2 + D.facts.length) % D.facts.length);
    bub.textContent = pair[1]; bub.style.animation = 'none'; reflow(bub); bub.style.animation = '';
    owl.classList.remove('happy'); reflow(owl); owl.classList.add('happy', 'talk');
    setTimeout(() => owl.classList.remove('happy'), 1200);
    setTimeout(() => owl.classList.remove('talk'), Math.min(9000, pair[1].length * 65));
    SFX.pop(); say(pair);
  }
  SCREENS.home = (v) => {
    const allIds = [...JOURNEYS.w.eras, ...JOURNEYS.c.eras];
    const jCard = (j) => {
      const ids = JOURNEYS[j].eras, n = ids.filter((id) => stamps[id]).length;
      return `<button class="journey j-${j}" data-journey="${j}">
        <div class="j-head"><span class="j-emoji">${JOURNEYS[j].emoji}</span><div><b>${JOURNEYS[j].name}</b><small>5 etapas · ${ERAS[ids[0]].short} → ${ERAS[ids[4]].short}</small></div></div>
        <div class="j-line">${ids.map((id) => `<span class="jl-dot ${stamps[id] ? 'done' : ''}" title="${esc(ERAS[id].name)}">${ERAS[id].emoji}</span>`).join('<i></i>')}</div>
        <div class="j-foot"><span>🛂 ${n} de 5 sellos</span><span class="j-go">¡Explorar! ➜</span></div></button>`;
    };
    const g = (k, em, name, sub) => {
      const b = ['w', 'c', 'a'].map((s) => best[`${k}-${s}`]).filter((x) => x != null);
      return `<button class="game g-${k === 'portals' ? 'portal' : k}" data-game="${k}">${b.length ? '<span class="g-best">🏅</span>' : ''}<span class="g-emoji">${em}</span><b>${name}</b><small>${sub}</small></button>`;
    };
    v.innerHTML = `<div class="home-top">${pillHTML()}<button class="icon-btn ${settings.sound ? '' : 'off'}" data-toggle="sound" aria-label="Efectos de sonido">${settings.sound ? '🔔' : '🔕'}</button><button class="icon-btn ${settings.voice ? '' : 'off'}" data-toggle="voice" aria-label="Voz">${settings.voice ? '🗣️' : '🤐'}</button></div>
      <div class="hero">
        <div class="portal-wrap">${portalSVG()}</div>
        <div class="orbit">${allIds.map((id, i) => { const a = (i / allIds.length) * Math.PI * 2 - Math.PI / 2; return `<span style="left:${50 + Math.cos(a) * 47}%;top:${50 + Math.sin(a) * 47}%"><i>${ERAS[id].emoji}</i></span>`; }).join('')}</div>
        <button class="owl-wrap" data-owl aria-label="Hablar con Cronos, el búho">${owlHTML()}<span class="bubble">¡Hola, Sofía! Soy Cronos 🦉 Tócame y te cuento secretos del pasado.</span></button>
      </div>
      <h1 class="title"><span>Viajera</span> <span>del Tiempo</span></h1>
      <p class="subtitle">Las etapas de la historia · Ciencias Sociales</p>
      <h3 class="section-h">🧭 Elige tu viaje</h3>
      <div class="journeys">${jCard('w')}${jCard('c')}</div>
      <h3 class="section-h">🎮 Juegos</h3>
      <div class="games">${g('quiz', '❓', 'Quiz del Viajero', 'Responde y gana estrellas')}${g('order', '🧩', 'Ordena el Tiempo', '¿Qué fue primero?')}${g('portals', '🌀', 'Portales del Tiempo', '¿A qué época pertenece?')}${g('memory', '🃏', 'Memoria Histórica', 'Encuentra las parejas')}</div>
      <div class="extras">
        <button class="extra" data-go="compare"><span>🔭</span><b>Las dos líneas del tiempo</b><small>El mundo y Colombia, juntos</small></button>
        <button class="extra" data-go="passport"><span>🛂</span><b>Mi pasaporte</b><small>Sellos y trofeos</small></button>
      </div>
      <p class="foot">Hecho con 💜 para Sofía · ⭐ ${stars} estrellas</p>`;
    v.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.journey) { SFX.tap(); go('learn', { j: b.dataset.journey }); }
      else if (b.dataset.game) { SFX.tap(); openSetPicker(b.dataset.game); }
      else if (b.dataset.go) { SFX.tap(); go(b.dataset.go); }
      else if ('owl' in b.dataset) owlTalk(b);
      else if (b.dataset.toggle) {
        const k = b.dataset.toggle; settings[k] = !settings[k]; store.set('settings', settings);
        b.classList.toggle('off', !settings[k]);
        b.textContent = k === 'sound' ? (settings[k] ? '🔔' : '🔕') : settings[k] ? '🗣️' : '🤐';
        if (k === 'voice' && !settings.voice) stopVoice();
        if (k === 'voice' && settings.voice) say(T.v('ok-0'));
        SFX.tap();
      }
    });
  };

  // =================== APRENDE (escenas) ===================
  SCREENS.learn = (v, { j = 'w', i = 0 }) => {
    const ids = JOURNEYS[j].eras;
    let idx = Math.max(0, Math.min(ids.length - 1, i)), busy = true;
    v.innerHTML = `${topbar(`${JOURNEYS[j].emoji} ${JOURNEYS[j].name}`)}
      <div class="learn">
        <div class="machine"><div class="orbs">${ids.map((id, k) => `<button class="orb" data-orb="${k}" style="--oc:${ERAS[id].color}" aria-label="${esc(ERAS[id].name)}">${ERAS[id].emoji}</button>`).join('<i class="orb-line"></i>')}</div>
          <div class="yearbox"><div class="y-label">AÑO DESTINO</div><div class="y-val">${NOW}</div><div class="y-ago">hoy</div></div></div>
        <div class="learn-grid">
          <div class="scene-wrap"><div class="scene-zoom"></div><div class="hs-layer"></div><div class="scene-tip">✨ Toca las chispas para descubrir</div></div>
          <div class="era-card"></div>
        </div>
      </div>`;
    const zoom = $('.scene-zoom', v), layer = $('.hs-layer', v), card = $('.era-card', v);
    function render(arrive) {
      const id = ids[idx], e = ERAS[id], s = seenOf(id);
      v.style.setProperty('--era', e.color); v.style.setProperty('--era-dark', e.dark);
      zoom.innerHTML = SC.scene(id); zoom.style.transform = '';
      if (arrive) { zoom.classList.remove('arrive'); reflow(zoom); zoom.classList.add('arrive'); }
      layer.innerHTML = SC.hotspots[id].map(([x, y], k) => `<button class="hs ${s.includes(k) ? 'seen' : ''}" style="left:${x / 8}%;top:${y / 5}%" data-hs="${k}" aria-label="${esc(e.hotspots[k].title)}"><span>${s.includes(k) ? '✓' : '✨'}</span></button>`).join('');
      $$('.orb', v).forEach((o, k) => { o.classList.toggle('on', k === idx); o.classList.toggle('done', !!stamps[ids[k]]); });
      $('.y-val', v).textContent = (Math.abs(e.year) >= 10000 ? '≈ ' : '') + fmtYear(e.year);
      $('.y-ago', v).textContent = agoText(e.year);
      renderCard();
    }
    function renderCard() {
      const id = ids[idx], e = ERAS[id], s = seenOf(id), n = e.hotspots.length, nextId = ids[idx + 1];
      const next = nextId ? `<button class="btn" data-next aria-label="Viajar a ${esc(ERAS[nextId].name)}">${ERAS[nextId].emoji} ${ERAS[nextId].short} ➜</button>`
        : j === 'w' ? '<button class="btn btn-pink" data-goj="c">🇨🇴 ¡Ahora Colombia!</button>' : '<button class="btn btn-pink" data-gocmp>🔭 Las dos líneas</button>';
      card.innerHTML = `
        <div class="ec-head"><div class="ec-emoji">${e.emoji}</div><div><div class="ec-kicker">ETAPA ${idx + 1} DE ${ids.length}</div><h2>${e.name}</h2></div><button class="icon-btn" data-speak aria-label="Escuchar">🔊</button></div>
        <div class="ec-span"><span class="pill">${e.from}</span><span class="arrow">➜</span><span class="pill">${e.to}</span></div>
        <div class="ec-marks"><div class="mark"><span>🚩</span><div><small>Empieza</small><b>${e.start}</b></div></div><div class="mark"><span>🏁</span><div><small>Termina</small><b>${e.end}</b></div></div></div>
        <p class="ec-intro">${e.intro}</p>
        ${e.note ? `<p class="ec-note">💡 ${e.note}</p>` : ''}
        <div class="ec-progress"><div class="sparks">${e.hotspots.map((h, k) => `<button class="spark ${s.includes(k) ? 'on' : ''}" data-hs="${k}" aria-label="${esc(h.title)}">${s.includes(k) ? h.emoji : '✨'}</button>`).join('')}</div>
          <small>${s.length === n ? '¡Descubriste todo! 🛂' : `Descubiertos: ${s.length} de ${n}`}</small></div>
        <div class="ec-nav">${idx > 0 ? '<button class="btn btn-ghost" data-prev aria-label="Época anterior">⟵</button>' : ''}${next}<button class="btn btn-cyan" data-play aria-label="Jugar">🎮</button></div>`;
    }
    async function travel(k, from) {
      if (k < 0 || k >= ids.length) return;
      busy = true;
      await warp(from ?? ERAS[ids[idx]].year, ERAS[ids[k]].year, `${ERAS[ids[k]].emoji} ${ERAS[ids[k]].name}`);
      if (!v.isConnected) return;
      idx = k; render(true); busy = false;
      $('.machine', v).scrollIntoView({ block: 'start', behavior: REDUCED ? 'auto' : 'smooth' });
      setTimeout(() => { if (v.isConnected && !overlay.classList.contains('show')) say(T.era(ids[idx]), $('[data-speak]', card)); }, 700);
    }
    function openFact(k) {
      const id = ids[idx], e = ERAS[id], h = e.hotspots[k], [x, y] = SC.hotspots[id][k], s = seenOf(id);
      const first = !s.includes(k);
      if (first) { s.push(k); store.set('seen', seen); }
      const justDone = first && s.length === e.hotspots.length && !stamps[id];
      SFX.pop();
      const wr = $('.scene-wrap', v).getBoundingClientRect();
      if (wr.top < 0 || wr.bottom > innerHeight * 0.5) scrollTo({ top: Math.max(0, scrollY + wr.top - 12), behavior: REDUCED ? 'auto' : 'smooth' });
      $('.scene-tip', v)?.remove();
      zoom.style.transformOrigin = `${x / 8}% ${y / 5}%`; zoom.style.transform = 'scale(1.9)'; layer.classList.add('hide');
      openOverlay(`<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheetT" style="--era:${e.color}">
          ${first ? '<div class="reward">+1 ⭐</div>' : ''}
          <div class="sheet-emoji">${h.emoji}</div><h3 id="sheetT">${h.title}</h3><p>${h.text}</p>
          <div class="sheet-actions"><button class="icon-btn" data-say aria-label="Escuchar">🔊</button><button class="btn" data-close>¡Entendido! ✨</button></div></div>`, {
        onClose: () => {
          stopVoice(); zoom.style.transform = ''; layer.classList.remove('hide');
          const b = $(`.hs[data-hs="${k}"]`, layer); if (b) { b.classList.add('seen'); $('span', b).textContent = '✓'; }
          renderCard();
          if (justDone) setTimeout(() => stampCeremony(id), 450);
        },
        light: true,
      });
      $('[data-say]', overlay).onclick = (ev) => say(T.hs(id, k), ev.currentTarget);
      if (first) addStars(1, $('.reward', overlay));
      setTimeout(() => say(T.hs(id, k), $('[data-say]', overlay)), 380);
    }
    function stampCeremony(id) {
      if (!v.isConnected) return;
      stamps[id] = true; store.set('stamps', stamps);
      const e = ERAS[id];
      openOverlay(`<div class="modal" style="--era:${e.color}"><div class="stamp-stage">${stampSVG(id)}</div><h3>¡Sello conseguido!</h3><p>Exploraste toda ${e.name}. ¡Bonus de +2 ⭐!</p><button class="btn" data-close>¡Genial! 🛂</button></div>`, { onClose: () => render(false) });
      setTimeout(() => { SFX.stamp(); confetti(innerWidth / 2, innerHeight / 2 - 40, 70, 1.4); addStars(2, $('.stamp-stage', overlay)); say(T.v('stamp')); }, 430);
    }
    v.addEventListener('click', (e) => {
      const t = e.target.closest('button'); if (!t || busy || t.dataset.back) return;
      if (t.dataset.hs != null) openFact(+t.dataset.hs);
      else if (t.dataset.orb != null) { if (+t.dataset.orb !== idx) { SFX.tap(); travel(+t.dataset.orb); } }
      else if ('next' in t.dataset) travel(idx + 1);
      else if ('prev' in t.dataset) travel(idx - 1);
      else if ('speak' in t.dataset) say(T.era(ids[idx]), t);
      else if (t.dataset.goj) go('learn', { j: t.dataset.goj });
      else if ('gocmp' in t.dataset) go('compare');
      else if ('play' in t.dataset) { SFX.tap(); openGamePicker(j); }
    });
    travel(idx, NOW);
  };

  // =================== elegir juego / historia ===================
  const GAMES = { quiz: ['❓', 'Quiz del Viajero'], order: ['🧩', 'Ordena el Tiempo'], portals: ['🌀', 'Portales del Tiempo'], memory: ['🃏', 'Memoria Histórica'] };
  function openSetPicker(game) {
    const [em, name] = GAMES[game];
    openOverlay(`<div class="modal"><div class="modal-emoji">${em}</div><h3>${name}</h3><p>¿Qué historia quieres practicar?</p><div class="set-btns">
      <button class="set-btn set-w" data-s="w"><span>🌍</span><div>Mundo<small>Prehistoria → Edad Contemporánea</small></div></button>
      <button class="set-btn set-c" data-s="c"><span>🇨🇴</span><div>Colombia<small>Precolombina → Periodo Republicano</small></div></button>
      <button class="set-btn set-a" data-s="a"><span>🌀</span><div>¡Todo junto!<small>Mundo y Colombia mezclados</small></div></button>
      </div><button class="btn-text" data-close>Cancelar</button></div>`);
    $$('[data-s]', overlay).forEach((b) => (b.onclick = () => { SFX.tap(); go(game, { set: b.dataset.s }); }));
  }
  function openGamePicker(set) {
    openOverlay(`<div class="modal"><div class="modal-emoji">🎮</div><h3>¿A qué jugamos?</h3><p>Practica la ${set === 'w' ? 'historia del mundo' : 'historia de Colombia'}</p><div class="set-btns">
      ${Object.entries(GAMES).map(([k, [em, n]]) => `<button class="set-btn set-${set}" data-g="${k}"><span>${em}</span><div>${n}</div></button>`).join('')}
      </div><button class="btn-text" data-close>Cancelar</button></div>`);
    $$('[data-g]', overlay).forEach((b) => (b.onclick = () => { SFX.tap(); go(b.dataset.g, { set }); }));
  }
  function results({ score, total, earned, again, title, msg }) {
    const pct = total ? score / total : 1;
    const [em, m] = pct >= 0.9 ? ['🏆', '¡Increíble! ¡Eres experta en historia!'] : pct >= 0.7 ? ['🥈', '¡Muy bien! ¡Casi perfecto!'] : pct >= 0.5 ? ['🥉', '¡Buen trabajo! Sigue practicando.'] : ['💪', '¡Tú puedes! Repasa y vuelve a intentarlo.'];
    openOverlay(`<div class="modal"><div class="trophy">${em}</div><h3>${title || m}</h3><p>${msg || `Acertaste <b>${score} de ${total}</b>`}</p>
      <div class="result-stars">+${earned} ⭐</div>
      <div class="result-btns"><button class="btn" data-again>🔁 Otra vez</button><button class="btn btn-ghost" data-home>🏠 Inicio</button></div></div>`);
    $('[data-again]', overlay).onclick = () => { SFX.tap(); again(); };
    $('[data-home]', overlay).onclick = () => { SFX.tap(); go('home'); };
    SFX.fanfare(); celebrate();
    setTimeout(() => say(T.v(pct >= 0.7 ? 'win' : 'good')), 500);
  }

  // =================== QUIZ ===================
  SCREENS.quiz = (v, { set = 'w' }) => {
    const pool = D.questions.filter((q) => set === 'a' || q.id[0] === set);
    const qs = shuffle(pool).slice(0, 10).map((q) => ({ ...q, order: shuffle([0, 1, 2, 3]) }));
    let i = 0, score = 0, streak = 0, earned = 0;
    v.innerHTML = `${topbar('❓ Quiz del Viajero')}
      <div class="q-progress"><div class="q-bar"><div class="q-fill"></div><div class="q-ship">🛸</div></div><div class="q-meta"><span class="q-count"></span><span class="streak"></span></div></div>
      <div class="quiz-grid"><div class="q-slot"></div><div class="a-slot"></div></div>`;
    function progress(p) { $('.q-fill', v).style.width = p + '%'; $('.q-ship', v).style.left = p + '%'; }
    function show() {
      const q = qs[i], e = ERAS[q.era];
      progress((i / qs.length) * 100);
      $('.q-count', v).textContent = `Pregunta ${i + 1} de ${qs.length}`;
      $('.streak', v).textContent = streak >= 2 ? `🔥 ${streak} seguidas` : '';
      $('.q-slot', v).innerHTML = `<div class="q-card" style="--era:${e.color}"><button class="icon-btn" data-say aria-label="Escuchar">🔊</button><div class="q-emoji">${q.emoji}</div><h2 class="q-text">${q.q}</h2></div>`;
      $('.a-slot', v).innerHTML = `<div class="opts">${q.order.map((oi, k) => `<button class="opt" data-o="${oi}"><span class="opt-l">${'ABCD'[k]}</span><span>${q.opts[oi]}</span></button>`).join('')}</div><div class="fb-slot"></div>`;
      setTimeout(() => { if (v.isConnected && qs[i] === q) say(T.q(q), $('[data-say]', v)); }, 350);
    }
    function answer(btn) {
      const q = qs[i], ok = btn.dataset.o === '0';
      $('.opts', v).classList.add('locked');
      $$('.opt', v).forEach((b) => b.classList.add(b.dataset.o === '0' ? 'right' : b === btn ? 'wrong' : 'dim'));
      if (ok) {
        score++; streak++; earned++; SFX.ding(); burst(btn, 36); addStars(1, btn);
        if (streak >= 2) { const s = $('.streak', v); s.textContent = `🔥 ${streak} seguidas`; s.classList.remove('hot'); reflow(s); s.classList.add('hot'); }
      } else { streak = 0; SFX.buzz(); $('.streak', v).textContent = ''; }
      $('.fb-slot', v).innerHTML = `<div class="feedback">${owlHTML(ok ? 'happy' : 'sad')}<div class="fb-body"><div class="fb-title">${ok ? '¡Correcto! 🎉' : `Era: ${q.opts[0]}`}</div><p>${q.why}</p></div><button class="btn" data-next>${i + 1 < qs.length ? 'Siguiente ➜' : 'Ver resultado 🏆'}</button></div>`;
      const fb = $('.feedback', v);
      if (fb.getBoundingClientRect().bottom > innerHeight) fb.scrollIntoView({ block: 'end', behavior: REDUCED ? 'auto' : 'smooth' });
      sayChain([T.v(ok ? `ok-${Math.floor(Math.random() * 6)}` : `bad-${Math.floor(Math.random() * 3)}`), T.why(q)]);
    }
    v.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || b.dataset.back) return;
      if (b.classList.contains('opt')) answer(b);
      else if ('next' in b.dataset) { SFX.tap(); i++; if (i < qs.length) { show(); scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); } else finish(); }
      else if ('say' in b.dataset) say(T.q(qs[i]), b);
    });
    function finish() {
      progress(100); saveBest('quiz-' + set, score);
      results({ score, total: qs.length, earned, again: () => go('quiz', { set }) });
    }
    show();
  };

  // ---------- arrastrar y soltar (tarjetas, objetos) ----------
  function makeDraggable(el, { onTap, onDrop, canDrag = () => true }) {
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTap(); } });
    el.addEventListener('pointerdown', (e) => {
      if (e.button > 0 || !canDrag()) return;
      const sx = e.clientX, sy = e.clientY, r = el.getBoundingClientRect();
      let ghost = null, over = null, moved = false;
      try { el.setPointerCapture(e.pointerId); } catch { /* algunos navegadores no lo permiten */ }
      const move = (ev) => {
        const dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!moved) {
          if (Math.hypot(dx, dy) < 8) return;
          moved = true; ghost = el.cloneNode(true); ghost.classList.add('ghost'); ghost.classList.remove('wiggle', 'bad');
          Object.assign(ghost.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', margin: 0, animation: 'none' });
          document.body.appendChild(ghost); el.classList.add('src');
        }
        ghost.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.max(-8, Math.min(8, dx / 18))}deg) scale(1.06)`;
        const t = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('[data-drop]') || null;
        if (t !== over) { over?.classList.remove('over'); over = t; over?.classList.add('over'); }
      };
      const up = (ev) => {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        over?.classList.remove('over');
        if (moved) { const gr = ghost.getBoundingClientRect(); ghost.remove(); el.classList.remove('src'); onDrop(ev.type === 'pointercancel' ? null : over, gr); }
        else if (ev.type === 'pointerup') onTap();
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
  }
  // anima elementos desde su posición anterior a la nueva (técnica FLIP)
  function flip(els, mutate, from = new Map()) {
    const before = new Map(els.map((el) => [el, from.get(el) || el.getBoundingClientRect()]));
    mutate();
    if (REDUCED) return;
    for (const el of els) {
      const a = before.get(el), b = el.getBoundingClientRect();
      const dx = a.left - b.left, dy = a.top - b.top;
      if (Math.abs(dx) + Math.abs(dy) < 1) continue;
      el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.2,.9,.3,1.15)' });
    }
  }

  // =================== ORDENA EL TIEMPO ===================
  SCREENS.order = (v, { set = 'w' }) => {
    const rounds = [];
    if (set !== 'c') rounds.push({ type: 'eras', j: 'w' });
    if (set !== 'w') rounds.push({ type: 'eras', j: 'c' });
    rounds.push(set === 'a' ? { type: 'events', mix: true } : { type: 'events', j: set });
    let r = 0, tries = 0, earned = 0, perfect = 0, solved = false;
    function items(rd) {
      if (rd.type === 'eras') return JOURNEYS[rd.j].eras.map((id, k) => ({ e: ERAS[id].emoji, t: ERAS[id].name, c: ERAS[id].color, rank: k, yl: `${ERAS[id].from} – ${ERAS[id].to}` }));
      let evs;
      if (rd.mix) {
        evs = [];
        for (const ev of shuffle([...D.events.w, ...D.events.c])) { if (evs.length === 5) break; if (evs.every((c) => Math.abs(c.y - ev.y) >= 60)) evs.push(ev); }
      } else evs = JOURNEYS[rd.j].eras.map((id) => pick(D.events[rd.j].filter((x) => x.era === id)));
      return evs.sort((a, b) => a.y - b.y).map((ev, k) => ({ e: ev.e, t: ev.t, c: ERAS[ev.era].color, rank: k, yl: ev.yl }));
    }
    function round() {
      const rd = rounds[r], its = items(rd); tries = 0; solved = false;
      let mixed = shuffle(its); while (mixed.every((it, k) => it.rank === k)) mixed = shuffle(its);
      const title = rd.type === 'eras' ? `Ordena las épocas ${JOURNEYS[rd.j].emoji}` : `Ordena los hechos ${rd.mix ? '🌀' : JOURNEYS[rd.j].emoji}`;
      v.innerHTML = `${topbar('🧩 Ordena el Tiempo')}<span class="round-chip">Ronda ${r + 1} de ${rounds.length}</span>
        <h2 class="game-title">${title}</h2><p class="game-sub">Del más antiguo ⬆ al más reciente ⬇. Toca una tarjeta o arrástrala a su lugar.</p>
        <div class="order-wrap">
          <div class="board"><div class="board-end">⏳ Más antiguo</div><ol class="slots">${its.map((_, k) => `<li class="slot" data-drop="slot" data-n="${k + 1}"></li>`).join('')}</ol><div class="board-end last">📍 Más reciente</div></div>
          <div><div class="tray" data-drop="tray">${mixed.map((it) => `<div class="chip" role="button" tabindex="0" data-rank="${it.rank}" data-yl="${esc(it.yl)}" style="--cc:${it.c}"><span class="chip-e">${it.e}</span><span class="chip-t">${it.t}</span></div>`).join('')}</div>
          <div class="check-row"><button class="btn" data-check disabled>¡Comprobar! ✅</button></div></div>
        </div>`;
      $$('.chip', v).forEach((c) => makeDraggable(c, { onTap: () => tapChip(c), onDrop: (t, gr) => dropChip(c, t, gr), canDrag: () => !c.classList.contains('locked') && !solved }));
      say(T.v(rd.type === 'eras' ? 'order-eras' : 'order-events'));
    }
    const chips = () => $$('.chip', v);
    const updateCheck = () => { $('[data-check]', v).disabled = $$('.slot', v).some((s) => !s.querySelector('.chip')); };
    function tapChip(c) {
      if (c.classList.contains('locked') || solved) return;
      const inTray = c.parentElement.classList.contains('tray');
      const target = inTray ? $$('.slot', v).find((s) => !s.querySelector('.chip')) : $('.tray', v);
      if (!target) return;
      flip(chips(), () => target.appendChild(c)); SFX.place(inTray ? $$('.slot .chip', v).length : 0); updateCheck();
    }
    function dropChip(c, t, gr) {
      if (!t || solved) return;
      const from = new Map([[c, gr]]);
      if (t.classList.contains('slot')) {
        const other = t.querySelector('.chip');
        if (other === c) return;
        if (other?.classList.contains('locked')) return;
        const src = c.parentElement;
        flip(chips(), () => { if (other) src.appendChild(other); t.appendChild(c); }, from);
      } else if (t.classList.contains('tray')) flip(chips(), () => t.appendChild(c), from);
      SFX.place(2); updateCheck();
    }
    function check(btn) {
      tries++;
      const slots = $$('.slot', v); let allOk = true, okN = 0;
      slots.forEach((s, k) => {
        const c = s.querySelector('.chip'); if (!c) return;
        if (+c.dataset.rank === k) {
          if (!c.classList.contains('locked')) setTimeout(() => SFX.place(okN), okN * 90);
          okN++; s.classList.add('ok'); c.classList.add('locked');
          if (!$('.chip-y', c)) c.insertAdjacentHTML('beforeend', `<span class="chip-y">${esc(c.dataset.yl)}</span>`);
        } else { allOk = false; c.classList.remove('bad'); reflow(c); c.classList.add('bad'); }
      });
      if (allOk) {
        solved = true; const got = tries === 1 ? 3 : 1; earned += got; if (tries === 1) perfect++;
        setTimeout(() => { SFX.fanfare(); celebrate(); addStars(got, btn); say(T.v('order-ok')); }, 300);
        btn.textContent = r + 1 < rounds.length ? 'Siguiente ronda ➜' : 'Ver resultado 🏆'; btn.dataset.done = '1';
      } else {
        SFX.buzz(); say(T.v('order-bad'));
        setTimeout(() => {
          const bad = chips().filter((c) => c.classList.contains('bad'));
          flip(chips(), () => bad.forEach((c) => { c.classList.remove('bad'); $('.tray', v).appendChild(c); }));
          updateCheck();
        }, 800);
      }
    }
    v.addEventListener('click', (e) => {
      const b = e.target.closest('[data-check]'); if (!b || b.disabled) return;
      if (b.dataset.done) { SFX.tap(); r++; if (r < rounds.length) round(); else finish(); }
      else check(b);
    });
    function finish() {
      saveBest('order-' + set, perfect);
      results({ score: perfect, total: rounds.length, earned, msg: `Rondas perfectas: <b>${perfect} de ${rounds.length}</b>`, again: () => go('order', { set }) });
    }
    round();
  };

  // =================== PORTALES DEL TIEMPO ===================
  SCREENS.portals = (v, { set = 'w' }) => {
    const rounds = set === 'a' ? ['w', 'c'] : [set], per = set === 'a' ? 8 : 10;
    let r = 0, list = [], i = 0, score = 0, totalScore = 0, totalN = 0, earned = 0, misses = 0, lock = false;
    function startRound() {
      const j = rounds[r]; list = shuffle(D.items[j]).slice(0, per); i = 0; score = 0;
      v.innerHTML = `${topbar('🌀 Portales del Tiempo')}${rounds.length > 1 ? `<span class="round-chip">Ronda ${r + 1} de ${rounds.length}: ${JOURNEYS[j].emoji} ${JOURNEYS[j].name}</span>` : ''}
        <div class="pg-meta"><span class="pg-count"></span><span class="pg-score"></span></div>
        <div class="pg-stage"><div class="pg-slot"></div></div>
        <p class="pg-hint">Arrastra el objeto hasta el portal de su época… ¡o toca el portal!</p>
        <div class="portal-grid">${JOURNEYS[j].eras.map((id) => `<button class="portal" data-drop="portal" data-era="${id}" style="--pc:${ERAS[id].color}" aria-label="${esc(ERAS[id].name)}"><span class="p-swirl"></span><span class="p-in"><span class="p-e">${ERAS[id].emoji}</span><span class="p-n">${ERAS[id].short}</span></span></button>`).join('')}</div>`;
      $$('.portal', v).forEach((p) => p.addEventListener('click', () => choose(p)));
      showItem(); say(T.v('portal'));
    }
    function showItem() {
      const it = list[i]; misses = 0;
      $$('.portal.hint', v).forEach((p) => p.classList.remove('hint'));
      $('.pg-count', v).textContent = `Objeto ${i + 1} de ${list.length}`;
      $('.pg-score', v).textContent = `✅ ${score}`;
      $('.pg-slot', v).innerHTML = `<div class="pg-item" tabindex="0" role="button" aria-label="${esc(it.t)}"><span class="pi-e">${it.e}</span><span class="pi-t">${it.t}</span></div>`;
      const el = $('.pg-item', v);
      makeDraggable(el, { onTap: () => { el.classList.remove('wiggle'); reflow(el); el.classList.add('wiggle'); SFX.tap(); }, onDrop: (t, gr) => { if (t) choose(t, gr); }, canDrag: () => !lock });
    }
    function choose(portal, fromRect) {
      if (lock || !portal.dataset.era) return;
      const it = list[i], el = $('.pg-item', v);
      if (portal.dataset.era === it.era) {
        lock = true;
        if (!misses) { score++; earned++; addStars(1, portal); }
        SFX.portal(); setTimeout(SFX.ding, 280);
        const pr = portal.getBoundingClientRect(), er = el.getBoundingClientRect();
        el.style.animation = 'none';
        if (fromRect) { el.style.transform = `translate(${fromRect.left - er.left}px, ${fromRect.top - er.top}px)`; reflow(el); }
        el.classList.add('suck');
        el.style.transform = `translate(${pr.left + pr.width / 2 - (er.left + er.width / 2)}px, ${pr.top + pr.height / 2 - (er.top + er.height / 2)}px) scale(.05) rotate(540deg)`;
        el.style.opacity = '0.2';
        setTimeout(() => { portal.classList.remove('gulp'); reflow(portal); portal.classList.add('gulp'); burst(portal, 26); }, 560);
        setTimeout(() => { lock = false; i++; if (i < list.length) showItem(); else endRound(); }, 950);
      } else {
        misses++; SFX.buzz();
        portal.classList.remove('nope'); reflow(portal); portal.classList.add('nope');
        el.classList.remove('wiggle'); reflow(el); el.classList.add('wiggle');
        if (misses >= 2) $(`.portal[data-era="${it.era}"]`, v).classList.add('hint');
      }
    }
    function endRound() {
      totalScore += score; totalN += list.length; r++;
      if (r < rounds.length) {
        SFX.fanfare(); celebrate();
        openOverlay(`<div class="modal"><div class="modal-emoji">🌀</div><h3>¡Ronda completa!</h3><p>Acertaste ${score} de ${list.length}. Ahora: ${JOURNEYS[rounds[r]].emoji} ${JOURNEYS[rounds[r]].name}</p><button class="btn" data-close>¡Vamos! ➜</button></div>`, { onClose: startRound });
      } else {
        saveBest('portals-' + set, Math.round((totalScore / totalN) * 10));
        results({ score: totalScore, total: totalN, earned, again: () => go('portals', { set }) });
      }
    }
    startRound();
  };

  // =================== MEMORIA ===================
  SCREENS.memory = (v, { set = 'w' }) => {
    const eraIds = set === 'a' ? shuffle([...JOURNEYS.w.eras, ...JOURNEYS.c.eras]).slice(0, 6) : JOURNEYS[set].eras;
    const cards = shuffle(eraIds.flatMap((id) => { const [ce, ct] = pick(D.clues[id]); return [{ id, kind: 'era' }, { id, kind: 'clue', ce, ct }]; }));
    let open = [], done = 0, moves = 0, lock = false;
    v.innerHTML = `${topbar('🃏 Memoria Histórica')}<p class="game-sub">Voltea dos cartas: une cada época 🎨 con su pista 🔍.</p>
      <div class="mem-meta"><span class="mem-moves">Jugadas: 0</span><span class="mem-pairs">Parejas: 0 de ${eraIds.length}</span></div>
      <div class="mem-grid n${cards.length}">${cards.map((c, k) => {
        const e = ERAS[c.id];
        const front = c.kind === 'era' ? `<div class="mem-face mem-front era" style="--mc:${e.color}"><span class="m-t">${e.name}</span><span class="m-d">${e.from} – ${e.to}</span></div>`
          : `<div class="mem-face mem-front clue"><span class="m-e">${c.ce}</span><span class="m-t">${c.ct}</span></div>`;
        return `<button class="mem" data-k="${k}" style="animation-delay:${k * 0.05}s" aria-label="Carta ${k + 1}"><div class="mem-inner"><div class="mem-face mem-back">⏳</div>${front}</div></button>`;
      }).join('')}</div>`;
    say(T.v('memory'));
    v.addEventListener('click', (e) => {
      const b = e.target.closest('.mem'); if (!b || lock || b.classList.contains('open') || b.classList.contains('done')) return;
      SFX.flip(); b.classList.add('open'); open.push(b);
      if (open.length < 2) return;
      moves++; $('.mem-moves', v).textContent = `Jugadas: ${moves}`;
      const [a, c] = open, ca = cards[a.dataset.k], cb = cards[c.dataset.k];
      lock = true;
      if (ca.id === cb.id && ca.kind !== cb.kind) {
        setTimeout(() => {
          a.classList.add('done'); c.classList.add('done'); SFX.ding(); burst(a, 14); burst(c, 14);
          done++; open = []; lock = false;
          $('.mem-pairs', v).textContent = `Parejas: ${done} de ${eraIds.length}`;
          if (done === eraIds.length) finish(); else say(T.v('pair'));
        }, 420);
      } else setTimeout(() => { SFX.soft(); a.classList.remove('open'); c.classList.remove('open'); open = []; lock = false; }, 1050);
    });
    function finish() {
      const n = eraIds.length, got = 3 + (moves <= n + 2 ? 2 : moves <= n * 2 ? 1 : 0);
      saveBest('memory-' + set, moves, true);
      addStars(got, $('.mem-grid', v));
      setTimeout(() => results({ score: n, total: n, earned: got, title: '¡Memoria de elefante! 🐘', msg: `Encontraste las ${n} parejas en <b>${moves} jugadas</b>.`, again: () => go('memory', { set }) }), 700);
    }
  };

  // =================== LAS DOS LÍNEAS DEL TIEMPO ===================
  SCREENS.compare = (v) => {
    const W = JOURNEYS.w.eras, C = JOURNEYS.c.eras;
    const H = { prehistoria: 150, antigua: 160, media: 170, moderna: 210, contemporanea: 260 };
    const yb = [ERAS.prehistoria.year, -3500, 476, 1492, 1789, NOW], px = [0];
    W.forEach((id) => px.push(px[px.length - 1] + H[id]));
    const Y = (yr) => { for (let k = 0; k < 5; k++) if (yr <= yb[k + 1]) return px[k] + ((yr - yb[k]) / (yb[k + 1] - yb[k])) * (px[k + 1] - px[k]); return px[5]; };
    const cr = [[ERAS.precolombina.year, 1499], [1499, 1550], [1550, 1810], [1810, 1819], [1819, NOW]];
    const pos = cr.map(([a, b]) => [Y(a), Y(b)]);
    for (let k = 0; k < pos.length; k++) {
      if (k) pos[k][0] = Math.max(pos[k][0], pos[k - 1][1]);
      if (pos[k][1] - pos[k][0] < 46) pos[k][1] = pos[k][0] + 46;
    }
    const total = Math.max(px[5], pos[4][1]);
    pos[4][1] = total;
    const block = (id, top, h, k, extra = '') => {
      const e = ERAS[id], thin = h < 70;
      return `<button class="cmp-block ${thin ? 'thin' : ''}" data-era="${id}" style="top:${top + 2}px;height:${h - 4}px;--bc:${e.color};animation-delay:${k * 0.12}s" aria-label="${esc(e.name)}">
        <span class="b-e">${e.emoji}</span><span class="b-n">${e.short}</span><span class="b-d">${e.from} – ${e.to}</span>${extra}</button>`;
    };
    const events = [[-3500, 'Se inventa la escritura', 'left'], [476, 'Cae Roma', 'left'], [1492, 'Colón llega a América', ''], [1789, 'Revolución francesa', 'left'], [1810, 'Grito de Independencia', '']];
    v.innerHTML = `${topbar('🔭 Las dos líneas del tiempo')}
      <p class="cmp-intro">A la izquierda, la historia del mundo 🌍; a la derecha, la de Colombia 🇨🇴. ¡Mira qué pasaba aquí mientras tanto! Toca una época para visitarla.</p>
      <div class="cmp"><div class="cmp-head"><div>🌍 Mundo</div><div>⏳</div><div>🇨🇴 Colombia</div></div>
        <div class="cmp-body" style="height:${total}px">
          <div class="cmp-col">${W.map((id, k) => block(id, px[k], H[id], k)).join('')}</div>
          <div class="cmp-axis"><div class="cmp-year" style="top:0"><span>≈${fmtYear(yb[0])}</span></div><div class="cmp-year" style="top:${total}px"><span>Hoy</span></div></div>
          <div class="cmp-col">${C.map((id, k) => block(id, pos[k][0], pos[k][1] - pos[k][0], k + 5, id === 'precolombina' ? '<span class="b-note">Mientras en Europa había pirámides, Grecia, Roma y castillos, aquí vivían los muiscas, los taironas, los zenúes y los quimbayas.</span>' : '')).join('')}</div>
          ${events.map(([y, t, side]) => `<div class="cmp-event ${side}" style="top:${Y(y)}px"><b>${fmtYear(y)} · ${t}</b></div>`).join('')}
        </div></div>
      <p class="cmp-now"><span>📍 ${NOW}: ¡aquí estás tú!</span></p>`;
    v.addEventListener('click', (e) => {
      const b = e.target.closest('.cmp-block'); if (!b) return;
      const id = b.dataset.era, j = ERAS[id].j; SFX.tap();
      go('learn', { j, i: JOURNEYS[j].eras.indexOf(id) });
    });
    setTimeout(() => { if (v.isConnected) say(T.v('compare')); }, 500);
  };

  // =================== PASAPORTE ===================
  SCREENS.passport = (v) => {
    const slot = (id) => {
      const e = ERAS[id], s = seenOf(id).length, n = e.hotspots.length;
      return stamps[id]
        ? `<button class="stamp-slot" data-era="${id}" style="--rot:${(Math.random() * 24 - 12).toFixed(0)}deg" aria-label="Sello: ${esc(e.name)}">${stampSVG(id)}</button>`
        : `<button class="stamp-slot" data-era="${id}" aria-label="${esc(e.name)}: sin sello"><span class="stamp-empty"><span>${e.emoji}</span>${e.short}<br>✨ ${s}/${n}</span></button>`;
    };
    const count = (j) => JOURNEYS[j].eras.filter((id) => stamps[id]).length;
    const tro = (k, em, name, fmt) => {
      const vals = ['w', 'c', 'a'].map((s) => [s, best[`${k}-${s}`]]).filter(([, x]) => x != null);
      return `<div class="trophy-card"><div class="t-e">${vals.length ? em : '🔒'}</div><b>${name}</b><small>${vals.length ? vals.map(([s, x]) => `${{ w: '🌍', c: '🇨🇴', a: '🌀' }[s]} ${fmt(x, s)}`).join('<br>') : '¡Juega para ganarlo!'}</small></div>`;
    };
    v.innerHTML = `${topbar('🛂 Mi pasaporte')}
      <div class="passport">
        <div class="pp-cover"><span class="pp-e">🦉</span><div><b>PASAPORTE DEL TIEMPO</b><small>Viajera: Sofía · ⭐ ${stars} estrellas</small></div></div>
        <div class="pp-h">🌍 Historia del Mundo <small>${count('w')} de 5</small></div><div class="stamps">${JOURNEYS.w.eras.map(slot).join('')}</div>
        <div class="pp-h">🇨🇴 Historia de Colombia <small>${count('c')} de 5</small></div><div class="stamps">${JOURNEYS.c.eras.map(slot).join('')}</div>
        <div class="pp-h">🏆 Trofeos</div>
        <div class="trophies">
          ${tro('quiz', '❓', 'Quiz', (x) => `${x}/10`)}
          ${tro('order', '🧩', 'Ordena', (x, s) => `${x}/${s === 'a' ? 3 : 2} perfectas`)}
          ${tro('portals', '🌀', 'Portales', (x) => `${x}/10`)}
          ${tro('memory', '🃏', 'Memoria', (x) => `${x} jugadas`)}
        </div>
        <div class="pp-foot"><button class="btn-text" data-reset>Borrar mi progreso</button></div>
      </div>`;
    v.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || b.dataset.back) return;
      if (b.dataset.era) { const id = b.dataset.era, j = ERAS[id].j; SFX.tap(); go('learn', { j, i: JOURNEYS[j].eras.indexOf(id) }); }
      else if ('reset' in b.dataset && confirm('¿Borrar todas las estrellas, sellos y trofeos?')) {
        ['stars', 'seen', 'stamps', 'best'].forEach((k) => { try { localStorage.removeItem('historia-' + k); } catch { /* nada */ } });
        location.reload();
      }
    });
    setTimeout(() => { if (v.isConnected) say(T.v('passport')); }, 500);
  };

  go('home');
})();
