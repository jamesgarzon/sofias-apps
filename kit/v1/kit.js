// Kit v1 · motor compartido de las apps de Sofía.
// Uso:  Kit.start({ data: window.APP_DATA, scenes: window.APP_SCENES, screens?, extras?, hero? })
// El contenido (data.js) y las escenas (scenes.js) son de cada app; aquí viven las pantallas,
// los 4 juegos, el sonido, la voz, las estrellas y el pasaporte. Ver kit/v1/README.md.
window.Kit = (() => {
  'use strict';
  const svg = window.KitSVG;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reflow = (el) => void el.offsetWidth;

  // ---------- textos de la interfaz ----------
  const L = {
    es: {
      back: 'Volver', listen: 'Escuchar', sound: 'Efectos de sonido', voice: 'Voz', stars: 'Estrellas',
      chooseJourney: '🧭 Elige tu viaje', games: '🎮 Juegos', explore: '¡Explorar! ➜', stampsOf: (n, t) => `🛂 ${n} de ${t} sellos`,
      passport: 'Mi pasaporte', passportSub: 'Sellos y trofeos', foot: 'Hecho con 💜 para Sofía', credits: '📷 Créditos de las fotos', tapOwl: 'Tócame y te cuento secretos.',
      tip: '✨ Toca las chispas para descubrir', stepOf: (w, i, n) => `${w} ${i} de ${n}`, discovered: (s, n) => `Descubiertos: ${s} de ${n}`, allFound: '¡Descubriste todo! 🛂',
      gotIt: '¡Entendido! ✨', stampTitle: '¡Sello conseguido!', stampText: (n) => `Descubriste todo sobre ${n}. ¡Bonus de +2 ⭐!`, great: '¡Genial! 🛂', prev: 'Anterior', play: 'Jugar', now: (g) => `${g.emoji} ¡Ahora ${g.name}!`,
      toPast: '⏪ Viajando al pasado', toFuture: '⏩ Viajando hacia el futuro', travelTo: '✨ Viajando a…', destYear: 'Año destino', topicOf: 'Tema',
      bc: 'a.C.', ad: 'd.C.', agoMillions: 'hace millones de años', agoAbout: (n) => `hace unos ${n} años`, ago: (n) => `hace ${n} años`,
      question: (i, n) => `Pregunta ${i} de ${n}`, streak: (n) => `🔥 ${n} seguidas`, correct: '¡Correcto! 🎉', itWas: (a) => `Era: ${a}`, next: 'Siguiente ➜', seeResult: 'Ver resultado 🏆',
      medals: ['¡Increíble! ¡Eres experta!', '¡Muy bien! ¡Casi perfecto!', '¡Buen trabajo! Sigue practicando.', '¡Tú puedes! Repasa y vuelve a intentarlo.'],
      youGot: (s, t) => `Acertaste <b>${s} de ${t}</b>`, again: '🔁 Otra vez', home: '🏠 Inicio',
      whichSet: '¿Qué quieres practicar?', allTogether: '¡Todo junto!', allSub: 'Todo mezclado', cancel: 'Cancelar', whatPlay: '¿A qué jugamos?',
      round: (r, n) => `Ronda ${r} de ${n}`, check: '¡Comprobar! ✅', nextRound: 'Siguiente ronda ➜', trayEmpty: '¡Todas las tarjetas están en la línea! 👆', perfectRounds: (p, n) => `Rondas perfectas: <b>${p} de ${n}</b>`,
      orderSub: 'Toca una tarjeta o arrástrala a su lugar.', top: '⬆ Primero', bottom: '⬇ Último',
      item: (i, n) => `Objeto ${i} de ${n}`, sortHint: 'Arrastra el objeto hasta su portal… ¡o toca el portal!', roundDone: '¡Ronda completa!', roundDoneText: (s, n, nx) => `Acertaste ${s} de ${n}. Ahora: ${nx}`, go: '¡Vamos! ➜',
      memSub: 'Voltea dos cartas: une cada tema 🎨 con su pista 🔍.', moves: (n) => `Jugadas: ${n}`, pairs: (d, n) => `Parejas: ${d} de ${n}`, memTitle: '¡Memoria de elefante! 🐘', memText: (n, m) => `Encontraste las ${n} parejas en <b>${m} jugadas</b>.`, card: (k) => `Carta ${k}`,
      ppTitle: 'PASAPORTE', ppWho: (s) => `Viajera: Sofía · ⭐ ${s} estrellas`, trophies: '🏆 Trofeos', playToWin: '¡Juega para ganarlo!', reset: 'Borrar mi progreso', resetConfirm: '¿Borrar todas las estrellas, sellos y trofeos?', perfect: 'perfectas', movesShort: 'jugadas', noStamp: 'sin sello',
      games4: { quiz: ['❓', 'Quiz', 'Responde y gana estrellas'], order: ['🧩', 'Ordena', '¿Qué va primero?'], sort: ['🌀', 'Portales', '¿A dónde pertenece?'], memory: ['🃏', 'Memoria', 'Encuentra las parejas'] },
      voice: { 'ok-0': '¡Correcto!', 'ok-1': '¡Excelente!', 'ok-2': '¡Muy bien, Sofía!', 'ok-3': '¡Eso es!', 'ok-4': '¡Genial! Sabes mucho.', 'ok-5': '¡Perfecto!', 'bad-0': '¡Uy, casi!', 'bad-1': 'No era esa, ¡pero ahora ya lo sabes!', 'bad-2': '¡Ups! Mira cuál era la correcta.', win: '¡Lo lograste! ¡Lo hiciste increíble!', good: '¡Muy bien! Sigue practicando y serás experta.', stamp: '¡Descubriste todo! Ganaste un sello para tu pasaporte.', 'order-ok': '¡Orden perfecto!', 'order-bad': 'Algunas no están en su lugar. ¡Inténtalo otra vez!', sort: '¿A dónde pertenece? ¡Mándalo al portal correcto!', memory: 'Encuentra las parejas: cada tema con su pista.', pair: '¡Pareja encontrada!', passport: 'Este es tu pasaporte. Explora cada tema para ganar todos los sellos.' },
    },
    en: {
      back: 'Back', listen: 'Listen', sound: 'Sound effects', voice: 'Voice', stars: 'Stars',
      chooseJourney: '🧭 Choose your journey', games: '🎮 Games', explore: "Let's go! ➜", stampsOf: (n, t) => `🛂 ${n} of ${t} stamps`,
      passport: 'My passport', passportSub: 'Stamps and trophies', foot: 'Made with 💜 for Sofia', credits: '📷 Photo credits', tapOwl: 'Tap me for a secret!',
      tip: '✨ Tap the sparkles to discover', stepOf: (w, i, n) => `${w} ${i} of ${n}`, discovered: (s, n) => `Discovered: ${s} of ${n}`, allFound: 'You found everything! 🛂',
      gotIt: 'Got it! ✨', stampTitle: 'Stamp earned!', stampText: (n) => `You discovered everything about ${n}. Bonus +2 ⭐!`, great: 'Awesome! 🛂', prev: 'Previous', play: 'Play', now: (g) => `${g.emoji} Now: ${g.name}!`,
      toPast: '⏪ Traveling to the past', toFuture: '⏩ Traveling to the future', travelTo: '✨ Traveling to…', destYear: 'Destination', topicOf: 'Topic',
      bc: 'BC', ad: 'AD', agoMillions: 'millions of years ago', agoAbout: (n) => `about ${n} years ago`, ago: (n) => `${n} years ago`,
      question: (i, n) => `Question ${i} of ${n}`, streak: (n) => `🔥 ${n} in a row`, correct: 'Correct! 🎉', itWas: (a) => `It was: ${a}`, next: 'Next ➜', seeResult: 'See results 🏆',
      medals: ['Amazing! You are an expert!', 'Great job! Almost perfect!', 'Good work! Keep practicing.', 'You can do it! Review and try again.'],
      youGot: (s, t) => `You got <b>${s} of ${t}</b>`, again: '🔁 Again', home: '🏠 Home',
      whichSet: 'What do you want to practice?', allTogether: 'Everything!', allSub: 'All mixed up', cancel: 'Cancel', whatPlay: "Let's play!",
      round: (r, n) => `Round ${r} of ${n}`, check: 'Check! ✅', nextRound: 'Next round ➜', trayEmpty: 'All the cards are on the line! 👆', perfectRounds: (p, n) => `Perfect rounds: <b>${p} of ${n}</b>`,
      orderSub: 'Tap a card or drag it to its place.', top: '⬆ First', bottom: '⬇ Last',
      item: (i, n) => `Item ${i} of ${n}`, sortHint: 'Drag the item to its portal… or tap the portal!', roundDone: 'Round complete!', roundDoneText: (s, n, nx) => `You got ${s} of ${n}. Next: ${nx}`, go: "Let's go! ➜",
      memSub: 'Flip two cards: match each topic 🎨 with its clue 🔍.', moves: (n) => `Moves: ${n}`, pairs: (d, n) => `Pairs: ${d} of ${n}`, memTitle: 'Elephant memory! 🐘', memText: (n, m) => `You found all ${n} pairs in <b>${m} moves</b>.`, card: (k) => `Card ${k}`,
      ppTitle: 'PASSPORT', ppWho: (s) => `Explorer: Sofia · ⭐ ${s} stars`, trophies: '🏆 Trophies', playToWin: 'Play to win it!', reset: 'Reset my progress', resetConfirm: 'Delete all stars, stamps and trophies?', perfect: 'perfect', movesShort: 'moves', noStamp: 'no stamp yet',
      games4: { quiz: ['❓', 'Quiz', 'Answer and win stars'], order: ['🧩', 'In Order', 'What comes first?'], sort: ['🌀', 'Portals', 'Where does it belong?'], memory: ['🃏', 'Memory', 'Find the pairs'] },
      voice: { 'ok-0': 'Correct!', 'ok-1': 'Excellent!', 'ok-2': 'Great job, Sofia!', 'ok-3': "That's right!", 'ok-4': 'Awesome! You know a lot.', 'ok-5': 'Perfect!', 'bad-0': 'Oops, almost!', 'bad-1': "Not that one, but now you know!", 'bad-2': "Oops! Look at the right answer.", win: 'You did it! Amazing work!', good: 'Good job! Keep practicing.', stamp: 'You found everything! You earned a passport stamp.', 'order-ok': 'Perfect order!', 'order-bad': 'Some cards are not in place. Try again!', sort: 'Where does it belong? Send it to the right portal!', memory: 'Find the pairs: each topic with its clue.', pair: 'You found a pair!', passport: 'This is your passport. Explore every topic to earn all the stamps.' },
    },
  };

  function start(cfg) {
    const D = cfg.data, SC = cfg.scenes || {}, M = D.meta;
    const T_ = L[M.lang] || L.es;
    const VOICE = Object.assign({}, T_.voice, D.voice || {});
    const TOPICS = D.topics, GROUPS = D.groups;
    const groupOf = (tid) => GROUPS.find((g) => g.topics.includes(tid));
    const GRADS = ['linear-gradient(135deg, #1e8bd8, #6a3df0 55%, #c43ec4)', 'linear-gradient(135deg, #f2b705, #f08c1a 30%, #2b59c3 62%, #d42a4a)', 'linear-gradient(135deg, #20c3a0, #1b6fd8)', 'linear-gradient(135deg, #ff5ca8, #a43cf0)'];
    const jg = (g) => `--jg:${g?.gradient || GRADS[Math.max(0, GROUPS.indexOf(g)) % GRADS.length]}`;
    const NOW = new Date().getFullYear();
    const AUDIO_OK = window.APP_AUDIO === true;
    const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const GAMES = Object.assign({}, T_.games4, M.games || {});
    const app = $('#app'), overlay = $('#overlay');
    if (M.theme === 'light') document.body.dataset.kTheme = 'light';

    // ---------- progreso: <id>-stars, <id>-seen, <id>-stamps, <id>-best ----------
    const store = {
      get(k, d) { try { const v = localStorage.getItem(`${M.id}-${k}`); return v == null ? d : JSON.parse(v); } catch { return d; } },
      set(k, v) { try { localStorage.setItem(`${M.id}-${k}`, JSON.stringify(v)); } catch { /* sin almacenamiento: seguimos igual */ } },
    };
    let stars = store.get('stars', 0);
    const seen = store.get('seen', {}), stamps = store.get('stamps', {}), best = store.get('best', {});
    const settings = Object.assign({ sound: true, voice: true }, store.get('settings', {}));
    const seenOf = (id) => (seen[id] ??= []);
    const saveBest = (k, v, lower = false) => { if (best[k] == null || (lower ? v < best[k] : v > best[k])) { best[k] = v; store.set('best', best); } };

    // ---------- años (sólo si los temas tienen "year") ----------
    const fmtNum = (n) => n.toLocaleString(M.lang === 'en' ? 'en-US' : 'es-CO');
    const fmtYear = (y) => (y <= 0 ? `${-y >= 10000 ? fmtNum(-y) : Math.max(1, -y)} ${T_.bc}` : y < 1000 ? `${y} ${T_.ad}` : `${y}`);
    const ago = (y) => (y < 0 ? NOW - y - 1 : NOW - y);
    const agoText = (y) => { const a = ago(y); return a >= 1e6 ? T_.agoMillions : a > 3000 ? T_.agoAbout(fmtNum(Math.round(a / 500) * 500)) : T_.ago(fmtNum(a)); };

    // ---------- efectos de sonido (WebAudio) ----------
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

    // ---------- voz: mp3 pregenerado (audio/<clave>.mp3) o voz del dispositivo ----------
    const voz = new Audio();
    const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
    const LANGS = M.lang === 'en' ? ['en-US', 'en-GB', 'en'] : ['es-CO', 'es-419', 'es-MX', 'es-US', 'es-ES', 'es'];
    let devVoice = null, sayTok = 0, speakingBtn = null;
    function pickVoice() {
      const vs = synth ? synth.getVoices() : [];
      const good = (v) => /natural|neural|premium|enhanced|google|siri/i.test(v.name);
      for (const p of LANGS) {
        const cands = vs.filter((x) => x.lang.replace('_', '-').toLowerCase().startsWith(p.toLowerCase()));
        if (cands.length) return cands.find(good) || cands[0];
      }
      return null;
    }
    if (synth) { devVoice = pickVoice(); synth.onvoiceschanged = () => { devVoice = pickVoice(); }; }
    const cleanText = (t) => String(t).replace(/<[^>]+>/g, '').replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}“”]/gu, '');
    function clearSpeaking() { speakingBtn?.classList.remove('speaking'); speakingBtn = null; }
    function stopVoice() { sayTok++; voz.pause(); voz.onended = voz.onerror = null; synth?.cancel(); clearSpeaking(); }
    function speakDevice(list, tok) {
      if (!synth) return clearSpeaking();
      setTimeout(() => { // Chrome pierde a veces un speak() justo después de cancel()
        if (tok !== sayTok) return;
        list.forEach(([, t], i) => {
          const u = new SpeechSynthesisUtterance(cleanText(t));
          u.lang = devVoice?.lang || LANGS[0]; if (devVoice) u.voice = devVoice; u.rate = 0.95; u.pitch = 1.08;
          if (i === list.length - 1) u.onend = u.onerror = () => { if (tok === sayTok) clearSpeaking(); };
          synth.speak(u);
        });
      }, 80);
    }
    /** Lee una lista de [clave, texto] seguidos; si falta un mp3, sigue con la voz del dispositivo. */
    function sayChain(list, btn) {
      stopVoice();
      if (!settings.voice || !list.length) return;
      const tok = sayTok;
      if (btn) { speakingBtn = btn; btn.classList.add('speaking'); }
      if (!AUDIO_OK) return speakDevice(list, tok);
      let n = 0;
      const next = () => {
        if (tok !== sayTok) return;
        if (n >= list.length) return clearSpeaking();
        const cur = n++;
        voz.src = `audio/${list[cur][0]}.mp3`; voz.onended = next;
        voz.onerror = () => { if (tok === sayTok) speakDevice(list.slice(cur), tok); };
        voz.play().catch(() => {});
      };
      next();
    }
    const say = (pair, btn) => sayChain([pair], btn);
    // claves de audio — gen_audio.py genera exactamente estas
    const T = {
      topic: (id) => [`topic-${id}`, `${TOPICS[id].name}. ${TOPICS[id].intro}`],
      hs: (id, k) => [`hs-${id}-${k}`, `${TOPICS[id].hotspots[k].title}. ${TOPICS[id].hotspots[k].text}`],
      q: (q) => [`q-${q.id}`, q.q],
      why: (q) => [`why-${q.id}`, q.why],
      v: (k) => [`v-${k}`, VOICE[k] || ''],
      fact: (i) => [`fact-${i}`, D.facts[i]],
    };
    document.addEventListener('pointerdown', () => {
      ac();
      if (AUDIO_OK) { voz.muted = true; voz.src = 'audio/v-ok-0.mp3'; voz.play().then(() => { voz.pause(); voz.muted = false; }).catch(() => { voz.muted = false; }); }
      else if (synth) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; synth.speak(u); }
    }, { once: true, capture: true });

    // ---------- fondo animado (estrellas o burbujas) y confeti ----------
    const sky = $('#sky'), sctx = sky.getContext('2d'), fx = $('#fx'), fctx = fx.getContext('2d');
    const SKY = M.sky || (M.theme === 'light' ? 'bubbles' : 'stars');
    let dots = [], shoot = null;
    function sizeCanvas(cv, ctx) { const dpr = Math.min(devicePixelRatio || 1, 2); cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function initSky() {
      sizeCanvas(sky, sctx); sizeCanvas(fx, fctx);
      const n = SKY === 'none' ? 0 : SKY === 'bubbles' ? 26 : Math.min(220, Math.round((innerWidth * innerHeight) / 7000));
      const pal = ['#ff9ec7', '#9ad8ff', '#ffd76b', '#b7f0a8', '#c9b4ff'];
      dots = Array.from({ length: n }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: SKY === 'bubbles' ? 8 + Math.random() * 26 : Math.random() * 1.4 + 0.3, p: Math.random() * 6.28, s: 0.6 + Math.random() * 1.6, c: pick(pal) }));
      if (REDUCED) drawSky(0);
    }
    function drawSky(t) {
      sctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const s of dots) {
        if (SKY === 'bubbles') {
          s.y -= 0.25 * s.s; if (s.y < -40) { s.y = innerHeight + 40; s.x = Math.random() * innerWidth; }
          sctx.globalAlpha = 0.16; sctx.fillStyle = s.c; sctx.beginPath(); sctx.arc(s.x + Math.sin(t / 1500 + s.p) * 12, s.y, s.r, 0, 6.283); sctx.fill();
        } else {
          sctx.globalAlpha = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin((t / 1000) * s.s + s.p));
          sctx.fillStyle = '#fff'; sctx.beginPath(); sctx.arc(s.x, s.y, s.r, 0, 6.283); sctx.fill();
        }
      }
      if (SKY === 'stars' && !REDUCED) {
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
      const pill = $('#starPill'); if (!pill) return;
      const to = pill.getBoundingClientRect(), fr = fromEl ? fromEl.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
      const x0 = fr.left + fr.width / 2, y0 = fr.top + fr.height / 2, k = Math.min(n, 5);
      for (let i = 0; i < k; i++) {
        const s = document.createElement('div'); s.className = 'fly-star'; s.textContent = '⭐';
        s.style.left = x0 - 15 + 'px'; s.style.top = y0 - 15 + 'px'; s.style.transitionDelay = i * 0.12 + 's';
        document.body.appendChild(s);
        requestAnimationFrame(() => requestAnimationFrame(() => { s.style.transform = `translate(${to.left + to.width / 2 - x0}px, ${to.top + to.height / 2 - y0}px) scale(.6) rotate(360deg)`; }));
        setTimeout(() => { s.remove(); if (i === k - 1) updatePill(); }, 860 + i * 120);
      }
    }
    const pillHTML = () => `<div class="star-pill" id="starPill" aria-label="${T_.stars}"><span>⭐</span><b>${stars}</b></div>`;
    const topbar = (title, back = 'home') => `<header class="topbar"><button class="icon-btn" data-back="${back}" aria-label="${T_.back}">⟵</button><h2 class="tb-title">${title}</h2>${pillHTML()}</header>`;
    const owlHTML = (cls = '') => `<span class="owl ${cls}">${svg.owl(M.costume)}</span>`;

    // ---------- diálogos ----------
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
    function go(name, params = {}) {
      stopVoice(); closeOverlay(true);
      $$('.warp, .fly-star, .ghost').forEach((n) => n.remove());
      app.innerHTML = '';
      const v = document.createElement('div'); v.className = 'view view-' + name; app.appendChild(v);
      SCREENS[name](v, params, K);
      scrollTo(0, 0);
    }
    app.addEventListener('click', (e) => { const b = e.target.closest('[data-back]'); if (b) { SFX.tap(); go(b.dataset.back); } });

    // ---------- viaje con túnel (con años si los temas los tienen) ----------
    function warp({ fromY, toY, name }) {
      return new Promise((res) => {
        stopVoice();
        const years = fromY != null && toY != null;
        const w = document.createElement('div'); w.className = 'warp'; w.setAttribute('role', 'status');
        w.innerHTML = `<div class="warp-tunnel"></div><div class="warp-rings"><span></span><span></span><span></span><span></span></div>
          <div class="warp-info"><div class="warp-label">${years ? (toY < fromY ? T_.toPast : T_.toFuture) : T_.travelTo}</div>${years ? `<div class="warp-big">${fmtYear(fromY)}</div>` : ''}<div class="warp-name">${name}</div></div><div class="warp-flash"></div>`;
        document.body.appendChild(w); SFX.whoosh();
        requestAnimationFrame(() => w.classList.add('show'));
        const big = $('.warp-big', w), dur = REDUCED ? 250 : years ? 1750 : 1100, t0 = performance.now();
        const a0 = years ? Math.log(ago(fromY) + 1) : 0, a1 = years ? Math.log(ago(toY) + 1) : 0;
        let lastTick = 0;
        (function step(t) {
          if (!w.isConnected) return res();
          const k = Math.min(1, (t - t0) / dur), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
          if (big) big.textContent = fmtYear(k >= 1 ? toY : Math.round(NOW - (Math.exp(a0 + (a1 - a0) * e) - 1)));
          if (t - lastTick > 90 && k < 0.9) { SFX.tick(); lastTick = t; }
          if (k < 1) return requestAnimationFrame(step);
          $('.warp-flash', w).classList.add('go'); SFX.arrive();
          setTimeout(() => { res(); w.classList.remove('show'); setTimeout(() => w.remove(), 320); }, 420);
        })(t0);
      });
    }

    // ---------- sello ----------
    function stampSVG(id) {
      const e = TOPICS[id], g = groupOf(id), p = svg.uid('st');
      return `<svg viewBox="0 0 200 200" class="stamp-svg" aria-hidden="true"><defs><path id="${p}" d="M100,100 m-73,0 a73,73 0 1,1 146,0 a73,73 0 1,1 -146,0"/></defs>
        <circle cx="100" cy="100" r="92" fill="${e.color}" opacity=".12"/>
        <g fill="none" stroke="${e.color}"><circle cx="100" cy="100" r="94" stroke-width="5"/><circle cx="100" cy="100" r="86" stroke-width="1.5" stroke-dasharray="4 4"/><circle cx="100" cy="100" r="58" stroke-width="3"/></g>
        <text font-family="Fredoka, sans-serif" font-weight="700" font-size="15" fill="${e.color}"><textPath href="#${p}" textLength="440" lengthAdjust="spacing">★ ${esc(e.short.toUpperCase())} ★ ${esc((g?.name || M.title).toUpperCase())}</textPath></text>
        <text x="100" y="119" text-anchor="middle" font-size="54">${e.emoji}</text></svg>`;
    }

    // ---------- arrastrar y soltar + animación FLIP ----------
    function makeDraggable(el, { onTap, onDrop, canDrag = () => true }) {
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTap(); } });
      el.addEventListener('pointerdown', (e) => {
        if (e.button > 0 || !canDrag()) return;
        const sx = e.clientX, sy = e.clientY, r = el.getBoundingClientRect();
        let ghost = null, over = null, moved = false;
        try { el.setPointerCapture(e.pointerId); } catch { /* sin captura */ }
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
    function flip(els, mutate, from = new Map()) {
      const before = new Map(els.map((el) => [el, from.get(el) || el.getBoundingClientRect()]));
      mutate();
      if (REDUCED) return;
      for (const el of els) {
        const a = before.get(el), b = el.getBoundingClientRect(), dx = a.left - b.left, dy = a.top - b.top;
        if (Math.abs(dx) + Math.abs(dy) < 1) continue;
        el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.2,.9,.3,1.15)' });
      }
    }

    // ---------- resultado y selector de historia/juego ----------
    function results({ score, total, earned, again, title, msg }) {
      const pct = total ? score / total : 1, mi = pct >= 0.9 ? 0 : pct >= 0.7 ? 1 : pct >= 0.5 ? 2 : 3;
      openOverlay(`<div class="modal"><div class="trophy">${['🏆', '🥈', '🥉', '💪'][mi]}</div><h3>${title || T_.medals[mi]}</h3><p>${msg || T_.youGot(score, total)}</p>
        <div class="result-stars">+${earned} ⭐</div><div class="result-btns"><button class="btn" data-again>${T_.again}</button><button class="btn btn-ghost" data-home>${T_.home}</button></div></div>`);
      $('[data-again]', overlay).onclick = () => { SFX.tap(); again(); };
      $('[data-home]', overlay).onclick = () => { SFX.tap(); go('home'); };
      SFX.fanfare(); celebrate();
      setTimeout(() => say(T.v(pct >= 0.7 ? 'win' : 'good')), 500);
    }
    const setBtn = (g) => `<button class="set-btn" data-s="${g.id}" style="${jg(g)}"><span>${g.emoji}</span><div>${g.name}${g.sub ? `<small>${g.sub}</small>` : ''}</div></button>`;
    function openSetPicker(game) {
      if (GROUPS.length === 1) return go(game, { set: GROUPS[0].id });
      const [em, name] = GAMES[game];
      openOverlay(`<div class="modal"><div class="modal-emoji">${em}</div><h3>${name}</h3><p>${T_.whichSet}</p><div class="set-btns">${GROUPS.map(setBtn).join('')}
        <button class="set-btn" data-s="a"><span>🌀</span><div>${T_.allTogether}<small>${T_.allSub}</small></div></button></div><button class="btn-text" data-close>${T_.cancel}</button></div>`);
      $$('[data-s]', overlay).forEach((b) => (b.onclick = () => { SFX.tap(); go(game, { set: b.dataset.s }); }));
    }
    function openGamePicker(set) {
      const g = GROUPS.find((x) => x.id === set);
      openOverlay(`<div class="modal"><div class="modal-emoji">🎮</div><h3>${T_.whatPlay}</h3>${g ? `<p>${g.emoji} ${g.name}</p>` : ''}<div class="set-btns">
        ${available().map((k) => `<button class="set-btn" data-g="${k}" style="${g ? jg(g) : ''}"><span>${GAMES[k][0]}</span><div>${GAMES[k][1]}</div></button>`).join('')}
        </div><button class="btn-text" data-close>${T_.cancel}</button></div>`);
      $$('[data-g]', overlay).forEach((b) => (b.onclick = () => { SFX.tap(); go(b.dataset.g, { set }); }));
    }
    const inSet = (tid, set) => set === 'a' || groupOf(tid)?.id === set;
    const available = () => ['quiz', 'order', 'sort', 'memory'].filter((k) => ({ quiz: D.questions?.length, order: D.order?.rounds?.length, sort: D.sort?.items?.length, memory: D.clues && Object.keys(D.clues).length >= 3 })[k]);

    // =================== INICIO ===================
    let owlStep = 0;
    function owlTalk(btn) {
      const owl = $('.owl', btn), bub = $('.bubble', btn);
      const facts = D.facts || [];
      const pair = owlStep++ === 0 || !facts.length ? T.v('welcome') : T.fact((owlStep - 2 + facts.length) % facts.length);
      if (!pair[1]) return;
      bub.textContent = pair[1]; bub.style.animation = 'none'; reflow(bub); bub.style.animation = '';
      owl.classList.remove('happy'); reflow(owl); owl.classList.add('happy', 'talk');
      setTimeout(() => owl.classList.remove('happy'), 1200);
      setTimeout(() => owl.classList.remove('talk'), Math.min(9000, pair[1].length * 65));
      SFX.pop(); say(pair);
    }
    SCREENS.home = (v) => {
      const allIds = GROUPS.flatMap((g) => g.topics);
      const jCard = (g) => {
        const n = g.topics.filter((id) => stamps[id]).length;
        return `<button class="journey" data-journey="${g.id}" style="${jg(g)}">
          <div class="j-head"><span class="j-emoji">${g.emoji}</span><div><b>${g.name}</b><small>${g.sub || ''}</small></div></div>
          <div class="j-line">${g.topics.map((id) => `<span class="jl-dot ${stamps[id] ? 'done' : ''}" title="${esc(TOPICS[id].name)}">${TOPICS[id].emoji}</span>`).join('<i></i>')}</div>
          <div class="j-foot"><span>${T_.stampsOf(n, g.topics.length)}</span><span class="j-go">${T_.explore}</span></div></button>`;
      };
      const gTile = (k) => {
        const [em, name, sub] = GAMES[k], played = ['a', ...GROUPS.map((g) => g.id)].some((s) => best[`${k}-${s}`] != null);
        return `<button class="game g-${k}" data-game="${k}">${played ? '<span class="g-best">🏅</span>' : ''}<span class="g-emoji">${em}</span><b>${name}</b><small>${sub}</small></button>`;
      };
      const photos = Object.values(TOPICS).flatMap((t) => t.hotspots.filter((h) => h.photo).map((h) => h.photo));
      const [t1, ...tr] = M.title.split(' ');
      const hero = cfg.hero ? cfg.hero(K) : `<div class="hero-glow"></div><div class="hero-ring"></div>
        <div class="orbit">${allIds.map((id, i) => { const a = (i / allIds.length) * Math.PI * 2 - Math.PI / 2; return `<span style="left:${50 + Math.cos(a) * 46}%;top:${50 + Math.sin(a) * 46}%"><i>${TOPICS[id].emoji}</i></span>`; }).join('')}</div>
        <button class="hero-owl" data-owl aria-label="Cronos">${owlHTML()}<span class="bubble">${esc(M.greeting || T_.tapOwl)}</span></button>`;
      v.innerHTML = `<div class="home-top">${pillHTML()}<button class="icon-btn ${settings.sound ? '' : 'off'}" data-toggle="sound" aria-label="${T_.sound}">${settings.sound ? '🔔' : '🔕'}</button><button class="icon-btn ${settings.voice ? '' : 'off'}" data-toggle="voice" aria-label="${T_.voice}">${settings.voice ? '🗣️' : '🤐'}</button></div>
        <div class="hero">${hero}</div>
        <h1 class="title"><span>${t1}</span> <span>${tr.join(' ')}</span></h1>
        ${M.subtitle ? `<p class="subtitle">${M.subtitle}</p>` : ''}
        <h3 class="section-h">${T_.chooseJourney}</h3>
        <div class="journeys n${Math.min(GROUPS.length, 2)}">${GROUPS.map(jCard).join('')}</div>
        ${available().length ? `<h3 class="section-h">${T_.games}</h3><div class="games">${available().map(gTile).join('')}</div>` : ''}
        <div class="extras">${(cfg.extras || []).map((x) => `<button class="extra" data-go="${x.screen}"><span>${x.emoji}</span><b>${x.title}</b><small>${x.sub || ''}</small></button>`).join('')}
          <button class="extra" data-go="passport"><span>🛂</span><b>${T_.passport}</b><small>${T_.passportSub}</small></button></div>
        ${photos.length ? `<details class="credits"><summary>${T_.credits}</summary><ul>${photos.map((p) => `<li>${esc(p.credit)}</li>`).join('')}</ul></details>` : ''}
        <p class="foot">${T_.foot} · ⭐ ${stars}</p>`;
      v.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        if (b.dataset.journey) { SFX.tap(); go('learn', { set: b.dataset.journey }); }
        else if (b.dataset.game) { SFX.tap(); openSetPicker(b.dataset.game); }
        else if (b.dataset.go) { SFX.tap(); go(b.dataset.go); }
        else if ('owl' in b.dataset) owlTalk(b);
        else if (b.dataset.toggle) {
          const k = b.dataset.toggle; settings[k] = !settings[k]; store.set('settings', settings);
          b.classList.toggle('off', !settings[k]);
          b.textContent = k === 'sound' ? (settings[k] ? '🔔' : '🔕') : settings[k] ? '🗣️' : '🤐';
          if (k === 'voice') settings.voice ? say(T.v('ok-0')) : stopVoice();
          SFX.tap();
        }
      });
    };

    // =================== APRENDE ===================
    SCREENS.learn = (v, { set, i = 0 }) => {
      const g = GROUPS.find((x) => x.id === set) || GROUPS[0], ids = g.topics;
      const years = ids.every((id) => typeof TOPICS[id].year === 'number');
      let idx = Math.max(0, Math.min(ids.length - 1, i)), busy = true;
      v.innerHTML = `${topbar(`${g.emoji} ${g.name}`)}
        <div class="machine"><div class="orbs">${ids.map((id, k) => `<button class="orb" data-orb="${k}" style="--oc:${TOPICS[id].color}" aria-label="${esc(TOPICS[id].name)}">${TOPICS[id].emoji}</button>`).join('<i class="orb-line"></i>')}</div>
          <div class="yearbox"><div class="y-label">${years ? T_.destYear : M.topicWord || T_.topicOf}</div><div class="y-val"></div><div class="y-sub"></div></div></div>
        <div class="learn-grid"><div class="scene-wrap"><div class="scene-zoom"></div><div class="hs-layer"></div><div class="scene-tip">${M.tip || T_.tip}</div></div><div class="era-card"></div></div>`;
      const zoom = $('.scene-zoom', v), layer = $('.hs-layer', v), card = $('.era-card', v);
      function render(arrive) {
        const id = ids[idx], e = TOPICS[id], s = seenOf(id), sc = SC[id] || {};
        v.style.setProperty('--era', e.color); v.style.setProperty('--era-dark', e.dark || e.color);
        zoom.innerHTML = sc.svg ? `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="scene-svg" role="img" aria-label="${esc(e.name)}">${sc.svg()}</svg>` : '';
        zoom.style.transform = '';
        if (arrive) { zoom.classList.remove('arrive'); reflow(zoom); zoom.classList.add('arrive'); }
        layer.innerHTML = (sc.hs || []).map(([x, y], k) => `<button class="hs ${s.includes(k) ? 'seen' : ''}" style="left:${x / 8}%;top:${y / 5}%" data-hs="${k}" aria-label="${esc(e.hotspots[k].title)}"><span>${s.includes(k) ? '✓' : '✨'}</span></button>`).join('');
        $$('.orb', v).forEach((o, k) => { o.classList.toggle('on', k === idx); o.classList.toggle('done', !!stamps[ids[k]]); });
        $('.y-val', v).textContent = years ? (Math.abs(e.year) >= 10000 ? '≈ ' : '') + fmtYear(e.year) : `${idx + 1} / ${ids.length}`;
        $('.y-sub', v).textContent = years ? agoText(e.year) : e.short;
        renderCard();
      }
      function renderCard() {
        const id = ids[idx], e = TOPICS[id], s = seenOf(id), n = e.hotspots.length, nextId = ids[idx + 1];
        const gi = GROUPS.indexOf(g), ng = GROUPS[gi + 1];
        const next = nextId ? `<button class="btn" data-next>${TOPICS[nextId].emoji} ${TOPICS[nextId].short} ➜</button>`
          : ng ? `<button class="btn btn-pink" data-goset="${ng.id}">${T_.now(ng)}</button>` : `<button class="btn btn-pink" data-gohome>${T_.home}</button>`;
        card.innerHTML = `
          <div class="ec-head"><div class="ec-emoji">${e.emoji}</div><div><div class="ec-kicker">${T_.stepOf(M.topicWord || T_.topicOf, idx + 1, ids.length)}</div><h2>${e.name}</h2></div><button class="icon-btn" data-speak aria-label="${T_.listen}">🔊</button></div>
          ${e.chips?.length ? `<div class="ec-span">${e.chips.map((c) => `<span class="pill">${c}</span>`).join('<span class="arrow">➜</span>')}</div>` : ''}
          ${e.marks?.length ? `<div class="ec-marks">${e.marks.map((m) => `<div class="mark"><span>${m.icon}</span><div><small>${m.label}</small><b>${m.text}</b></div></div>`).join('')}</div>` : ''}
          <p class="ec-intro">${e.intro}</p>
          ${e.note ? `<p class="ec-note">💡 ${e.note}</p>` : ''}
          <div class="ec-progress"><div class="sparks">${e.hotspots.map((h, k) => `<button class="spark ${s.includes(k) ? 'on' : ''}" data-hs="${k}" aria-label="${esc(h.title)}">${s.includes(k) ? h.emoji : '✨'}</button>`).join('')}</div>
            <small>${s.length === n ? T_.allFound : T_.discovered(s.length, n)}</small></div>
          <div class="ec-nav">${idx > 0 ? `<button class="btn btn-ghost" data-prev aria-label="${T_.prev}">⟵</button>` : ''}${next}${available().length ? `<button class="btn btn-cyan" data-play aria-label="${T_.play}">🎮</button>` : ''}</div>`;
      }
      async function travel(k, first = false) {
        if (k < 0 || k >= ids.length) return;
        busy = true;
        const to = TOPICS[ids[k]];
        await warp({ fromY: years ? (first ? NOW : TOPICS[ids[idx]].year) : null, toY: years ? to.year : null, name: `${to.emoji} ${to.name}` });
        if (!v.isConnected) return;
        idx = k; render(true); busy = false;
        $('.machine', v).scrollIntoView({ block: 'start', behavior: REDUCED ? 'auto' : 'smooth' });
        setTimeout(() => { if (v.isConnected && !overlay.classList.contains('show')) say(T.topic(ids[idx]), $('[data-speak]', card)); }, 700);
      }
      function openFact(k) {
        const id = ids[idx], e = TOPICS[id], h = e.hotspots[k], [x, y] = (SC[id]?.hs || [])[k] || [400, 250], s = seenOf(id);
        const first = !s.includes(k);
        if (first) { s.push(k); store.set('seen', seen); }
        const justDone = first && s.length === e.hotspots.length && !stamps[id];
        SFX.pop();
        const wr = $('.scene-wrap', v).getBoundingClientRect();
        if (wr.top < 0 || wr.bottom > innerHeight * 0.5) scrollTo({ top: Math.max(0, scrollY + wr.top - 12), behavior: REDUCED ? 'auto' : 'smooth' });
        $('.scene-tip', v)?.remove();
        zoom.style.transformOrigin = `${x / 8}% ${y / 5}%`; zoom.style.transform = 'scale(1.9)'; layer.classList.add('hide');
        const story = SC[id]?.story?.[k]; // historia animada de esta chispa (opcional): se inserta encima de la escena
        if (story) $('.scene-svg', zoom)?.insertAdjacentHTML('beforeend', `<g class="story">${story(window.KitSVG)}</g>`);
        openOverlay(`<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheetT" style="--era:${e.color}">
            ${first ? '<div class="reward">+1 ⭐</div>' : ''}<div class="sheet-emoji">${h.emoji}</div><h3 id="sheetT">${h.title}</h3><p>${h.text}</p>
            ${h.photo ? `<figure><img src="${esc(h.photo.src)}" alt="${esc(h.title)}" loading="lazy"><figcaption>${esc(h.photo.credit)}</figcaption></figure>` : ''}
            <div class="sheet-actions"><button class="icon-btn" data-say aria-label="${T_.listen}">🔊</button><button class="btn" data-close>${T_.gotIt}</button></div></div>`, {
          light: true,
          onClose: () => {
            stopVoice(); zoom.style.transform = ''; layer.classList.remove('hide');
            $$('.story', zoom).forEach((n) => n.remove());
            const b = $(`.hs[data-hs="${k}"]`, layer); if (b) { b.classList.add('seen'); $('span', b).textContent = '✓'; }
            renderCard();
            if (justDone) setTimeout(() => stampCeremony(id), 450);
          },
        });
        $('[data-say]', overlay).onclick = (ev) => say(T.hs(id, k), ev.currentTarget);
        if (first) addStars(1, $('.reward', overlay));
        setTimeout(() => say(T.hs(id, k), $('[data-say]', overlay)), 380);
      }
      function stampCeremony(id) {
        if (!v.isConnected) return;
        stamps[id] = true; store.set('stamps', stamps);
        const e = TOPICS[id];
        openOverlay(`<div class="modal" style="--era:${e.color}"><div class="stamp-stage">${stampSVG(id)}</div><h3>${T_.stampTitle}</h3><p>${T_.stampText(e.name)}</p><button class="btn" data-close>${T_.great}</button></div>`, { onClose: () => render(false) });
        setTimeout(() => { SFX.stamp(); confetti(innerWidth / 2, innerHeight / 2 - 40, 70, 1.4); addStars(2, $('.stamp-stage', overlay)); say(T.v('stamp')); }, 430);
      }
      v.addEventListener('click', (e) => {
        const t = e.target.closest('button'); if (!t || busy || t.dataset.back) return;
        if (t.dataset.hs != null) openFact(+t.dataset.hs);
        else if (t.dataset.orb != null) { if (+t.dataset.orb !== idx) { SFX.tap(); travel(+t.dataset.orb); } }
        else if ('next' in t.dataset) travel(idx + 1);
        else if ('prev' in t.dataset) travel(idx - 1);
        else if ('speak' in t.dataset) say(T.topic(ids[idx]), t);
        else if (t.dataset.goset) go('learn', { set: t.dataset.goset });
        else if ('gohome' in t.dataset) go('home');
        else if ('play' in t.dataset) { SFX.tap(); openGamePicker(g.id); }
      });
      travel(idx, true);
    };

    // =================== QUIZ ===================
    SCREENS.quiz = (v, { set = 'a' }) => {
      const qs = shuffle(D.questions.filter((q) => inSet(q.topic, set))).slice(0, D.quizSize || 10).map((q) => ({ ...q, order: shuffle(q.opts.map((_, i) => i)) }));
      let i = 0, score = 0, streak = 0, earned = 0;
      v.innerHTML = `${topbar(`${GAMES.quiz[0]} ${GAMES.quiz[1]}`)}
        <div class="q-progress"><div class="q-bar"><div class="q-fill"></div><div class="q-ship">${M.quizShip || '🛸'}</div></div><div class="q-meta"><span class="q-count"></span><span class="streak"></span></div></div>
        <div class="quiz-grid"><div class="q-slot"></div><div class="a-slot"></div></div>`;
      const progress = (p) => { $('.q-fill', v).style.width = p + '%'; $('.q-ship', v).style.left = p + '%'; };
      function show() {
        const q = qs[i], e = TOPICS[q.topic];
        progress((i / qs.length) * 100);
        $('.q-count', v).textContent = T_.question(i + 1, qs.length);
        $('.streak', v).textContent = streak >= 2 ? T_.streak(streak) : '';
        $('.q-slot', v).innerHTML = `<div class="q-card" style="--era:${e.color}"><button class="icon-btn" data-say aria-label="${T_.listen}">🔊</button><div class="q-emoji">${q.emoji || e.emoji}</div><h2 class="q-text">${q.q}</h2></div>`;
        $('.a-slot', v).innerHTML = `<div class="opts">${q.order.map((oi, k) => `<button class="opt" data-o="${oi}"><span class="opt-l">${'ABCDEF'[k]}</span><span>${q.opts[oi]}</span></button>`).join('')}</div><div class="fb-slot"></div>`;
        setTimeout(() => { if (v.isConnected && qs[i] === q) say(T.q(q), $('[data-say]', v)); }, 350);
      }
      function answer(btn) {
        const q = qs[i], ok = btn.dataset.o === '0';
        $('.opts', v).classList.add('locked');
        $$('.opt', v).forEach((b) => b.classList.add(b.dataset.o === '0' ? 'right' : b === btn ? 'wrong' : 'dim'));
        if (ok) {
          score++; streak++; earned++; SFX.ding(); burst(btn, 36); addStars(1, btn);
          if (streak >= 2) { const s = $('.streak', v); s.textContent = T_.streak(streak); s.classList.remove('hot'); reflow(s); s.classList.add('hot'); }
        } else { streak = 0; SFX.buzz(); $('.streak', v).textContent = ''; }
        $('.fb-slot', v).innerHTML = `<div class="feedback">${owlHTML(ok ? 'happy' : 'sad')}<div class="fb-body"><div class="fb-title">${ok ? T_.correct : T_.itWas(q.opts[0])}</div><p>${q.why || ''}</p></div><button class="btn" data-next>${i + 1 < qs.length ? T_.next : T_.seeResult}</button></div>`;
        const fb = $('.feedback', v);
        if (fb.getBoundingClientRect().bottom > innerHeight) fb.scrollIntoView({ block: 'end', behavior: REDUCED ? 'auto' : 'smooth' });
        sayChain([T.v(ok ? `ok-${Math.floor(Math.random() * 6)}` : `bad-${Math.floor(Math.random() * 3)}`), ...(q.why ? [T.why(q)] : [])]);
      }
      v.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b || b.dataset.back) return;
        if (b.classList.contains('opt')) answer(b);
        else if ('next' in b.dataset) { SFX.tap(); i++; if (i < qs.length) { show(); scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); } else finish(); }
        else if ('say' in b.dataset) say(T.q(qs[i]), b);
      });
      function finish() { progress(100); saveBest('quiz-' + set, score); results({ score, total: qs.length, earned, again: () => go('quiz', { set }) }); }
      show();
    };

    // =================== ORDENA ===================
    // data.order.rounds: [{ set, title, sub?, top?, bottom?, topics: groupId }  |  { set, title, events: [{topic?, e, t, y, reveal?}], pick? }]
    SCREENS.order = (v, { set = 'a' }) => {
      const O = D.order, rounds = O.rounds.filter((r) => set === 'a' || r.set === set);
      let r = 0, tries = 0, earned = 0, perfect = 0, solved = false;
      function items(rd) {
        if (rd.topics) return GROUPS.find((g) => g.id === rd.topics).topics.map((id, k) => ({ e: TOPICS[id].emoji, t: TOPICS[id].name, c: TOPICS[id].color, rank: k, reveal: TOPICS[id].reveal || (TOPICS[id].chips || []).join(' – ') }));
        let evs = rd.events;
        const n = Math.min(rd.pick || evs.length, evs.length);
        if (n < evs.length) {
          const byTopic = {}; evs.forEach((ev) => (byTopic[ev.topic || '_'] ??= []).push(ev));
          const keys = Object.keys(byTopic);
          evs = keys.length >= n && keys[0] !== '_' ? shuffle(keys).slice(0, n).map((k) => pick(byTopic[k])) : shuffle(evs).slice(0, n);
        }
        return [...evs].sort((a, b) => a.y - b.y).map((ev, k) => ({ e: ev.e, t: ev.t, c: TOPICS[ev.topic]?.color || ev.c || '#8b5cf6', rank: k, reveal: ev.reveal || '' }));
      }
      function round() {
        const rd = rounds[r], its = items(rd); tries = 0; solved = false;
        let mixed = shuffle(its); while (its.length > 1 && mixed.every((it, k) => it.rank === k)) mixed = shuffle(its);
        v.innerHTML = `${topbar(`${GAMES.order[0]} ${GAMES.order[1]}`)}<span class="round-chip">${T_.round(r + 1, rounds.length)}</span>
          <h2 class="game-title">${rd.title}</h2><p class="game-sub">${rd.sub || O.sub || ''} ${T_.orderSub}</p>
          <div class="order-wrap"><div class="board"><div class="board-end">${rd.top || O.top || T_.top}</div><ol class="slots">${its.map((_, k) => `<li class="slot" data-drop="slot" data-n="${k + 1}"></li>`).join('')}</ol><div class="board-end last">${rd.bottom || O.bottom || T_.bottom}</div></div>
            <div><div class="tray" data-drop="tray" data-empty="${esc(T_.trayEmpty)}">${mixed.map((it) => `<div class="chip" role="button" tabindex="0" data-rank="${it.rank}" data-rev="${esc(it.reveal)}" style="--cc:${it.c}"><span class="chip-e">${it.e}</span><span class="chip-t">${it.t}</span></div>`).join('')}</div>
            <div class="check-row"><button class="btn" data-check disabled>${T_.check}</button></div></div></div>`;
        $$('.chip', v).forEach((c) => makeDraggable(c, { onTap: () => tapChip(c), onDrop: (t, gr) => dropChip(c, t, gr), canDrag: () => !c.classList.contains('locked') && !solved }));
        if (rd.say) say([`v-${rd.say}`, VOICE[rd.say] || '']);
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
          if (other === c || other?.classList.contains('locked')) return;
          const src = c.parentElement;
          flip(chips(), () => { if (other) src.appendChild(other); t.appendChild(c); }, from);
        } else if (t.classList.contains('tray')) flip(chips(), () => t.appendChild(c), from);
        SFX.place(2); updateCheck();
      }
      function check(btn) {
        tries++;
        let allOk = true, okN = 0;
        $$('.slot', v).forEach((s, k) => {
          const c = s.querySelector('.chip'); if (!c) return;
          if (+c.dataset.rank === k) {
            if (!c.classList.contains('locked')) setTimeout(() => SFX.place(okN), okN * 90);
            okN++; s.classList.add('ok'); c.classList.add('locked');
            if (c.dataset.rev && !$('.chip-y', c)) c.insertAdjacentHTML('beforeend', `<span class="chip-y">${esc(c.dataset.rev)}</span>`);
          } else { allOk = false; c.classList.remove('bad'); reflow(c); c.classList.add('bad'); }
        });
        if (allOk) {
          solved = true; const got = tries === 1 ? 3 : 1; earned += got; if (tries === 1) perfect++;
          setTimeout(() => { SFX.fanfare(); celebrate(); addStars(got, btn); say(T.v('order-ok')); }, 300);
          btn.textContent = r + 1 < rounds.length ? T_.nextRound : T_.seeResult; btn.dataset.done = '1';
        } else {
          SFX.buzz(); say(T.v('order-bad'));
          setTimeout(() => { const bad = chips().filter((c) => c.classList.contains('bad')); flip(chips(), () => bad.forEach((c) => { c.classList.remove('bad'); $('.tray', v).appendChild(c); })); updateCheck(); }, 800);
        }
      }
      v.addEventListener('click', (e) => {
        const b = e.target.closest('[data-check]'); if (!b || b.disabled) return;
        if (b.dataset.done) { SFX.tap(); r++; r < rounds.length ? round() : finish(); } else check(b);
      });
      function finish() { saveBest('order-' + set, perfect); results({ score: perfect, total: rounds.length, earned, msg: T_.perfectRounds(perfect, rounds.length), again: () => go('order', { set }) }); }
      round();
    };

    // =================== PORTALES (clasificar) ===================
    SCREENS.sort = (v, { set = 'a' }) => {
      const rounds = set === 'a' ? GROUPS : GROUPS.filter((g) => g.id === set), per = D.sort.per || (rounds.length > 1 ? 8 : 10);
      let r = 0, list = [], i = 0, score = 0, totalScore = 0, totalN = 0, earned = 0, misses = 0, lock = false;
      function startRound() {
        const g = rounds[r]; list = shuffle(D.sort.items.filter((it) => g.topics.includes(it.topic))).slice(0, per); i = 0; score = 0;
        v.innerHTML = `${topbar(`${GAMES.sort[0]} ${GAMES.sort[1]}`)}${rounds.length > 1 ? `<span class="round-chip">${T_.round(r + 1, rounds.length)}: ${g.emoji} ${g.name}</span>` : ''}
          <div class="pg-meta"><span class="pg-count"></span><span class="pg-score"></span></div><div class="pg-stage"><div class="pg-slot"></div></div>
          <p class="pg-hint">${D.sort.hint || T_.sortHint}</p>
          <div class="portal-grid">${g.topics.map((id) => `<button class="portal" data-drop="portal" data-topic="${id}" style="--pc:${TOPICS[id].color}" aria-label="${esc(TOPICS[id].name)}"><span class="p-swirl"></span><span class="p-in"><span class="p-e">${TOPICS[id].emoji}</span><span class="p-n">${TOPICS[id].short}</span></span></button>`).join('')}</div>`;
        $$('.portal', v).forEach((p) => p.addEventListener('click', () => choose(p)));
        showItem(); say(T.v('sort'));
      }
      function showItem() {
        const it = list[i]; misses = 0;
        $$('.portal.hint', v).forEach((p) => p.classList.remove('hint'));
        $('.pg-count', v).textContent = T_.item(i + 1, list.length); $('.pg-score', v).textContent = `✅ ${score}`;
        $('.pg-slot', v).innerHTML = `<div class="pg-item" tabindex="0" role="button" aria-label="${esc(it.t)}"><span class="pi-e">${it.e}</span><span class="pi-t">${it.t}</span></div>`;
        const el = $('.pg-item', v);
        makeDraggable(el, { onTap: () => { el.classList.remove('wiggle'); reflow(el); el.classList.add('wiggle'); SFX.tap(); }, onDrop: (t, gr) => { if (t) choose(t, gr); }, canDrag: () => !lock });
      }
      function choose(portal, fromRect) {
        if (lock || !portal.dataset.topic) return;
        const it = list[i], el = $('.pg-item', v);
        if (portal.dataset.topic === it.topic) {
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
          setTimeout(() => { lock = false; i++; i < list.length ? showItem() : endRound(); }, 950);
        } else {
          misses++; SFX.buzz();
          portal.classList.remove('nope'); reflow(portal); portal.classList.add('nope');
          el.classList.remove('wiggle'); reflow(el); el.classList.add('wiggle');
          if (misses >= 2) $(`.portal[data-topic="${it.topic}"]`, v).classList.add('hint');
        }
      }
      function endRound() {
        totalScore += score; totalN += list.length; r++;
        if (r < rounds.length) {
          SFX.fanfare(); celebrate();
          openOverlay(`<div class="modal"><div class="modal-emoji">${GAMES.sort[0]}</div><h3>${T_.roundDone}</h3><p>${T_.roundDoneText(score, list.length, `${rounds[r].emoji} ${rounds[r].name}`)}</p><button class="btn" data-close>${T_.go}</button></div>`, { onClose: startRound });
        } else {
          saveBest('sort-' + set, Math.round((totalScore / totalN) * 10));
          results({ score: totalScore, total: totalN, earned, again: () => go('sort', { set }) });
        }
      }
      startRound();
    };

    // =================== MEMORIA ===================
    SCREENS.memory = (v, { set = 'a' }) => {
      const pool = Object.keys(D.clues).filter((id) => inSet(id, set));
      const ids = shuffle(pool).slice(0, set === 'a' ? 6 : Math.min(6, pool.length));
      const cards = shuffle(ids.flatMap((id) => { const [ce, ct] = pick(D.clues[id]); return [{ id, kind: 'topic' }, { id, kind: 'clue', ce, ct }]; }));
      let open = [], done = 0, moves = 0, lock = false;
      v.innerHTML = `${topbar(`${GAMES.memory[0]} ${GAMES.memory[1]}`)}<p class="game-sub">${T_.memSub}</p>
        <div class="mem-meta"><span class="mem-moves">${T_.moves(0)}</span><span class="mem-pairs">${T_.pairs(0, ids.length)}</span></div>
        <div class="mem-grid n${cards.length}">${cards.map((c, k) => {
          const e = TOPICS[c.id];
          const front = c.kind === 'topic' ? `<div class="mem-face mem-front topic" style="--mc:${e.color}"><span class="m-t">${e.name}</span>${e.chips?.length ? `<span class="m-d">${e.chips.join(' – ')}</span>` : ''}</div>`
            : `<div class="mem-face mem-front clue"><span class="m-e">${c.ce}</span><span class="m-t">${c.ct}</span></div>`;
          return `<button class="mem" data-k="${k}" style="animation-delay:${k * 0.05}s" aria-label="${T_.card(k + 1)}"><div class="mem-inner"><div class="mem-face mem-back">${M.cardBack || '⏳'}</div>${front}</div></button>`;
        }).join('')}</div>`;
      say(T.v('memory'));
      v.addEventListener('click', (e) => {
        const b = e.target.closest('.mem'); if (!b || lock || b.classList.contains('open') || b.classList.contains('done')) return;
        SFX.flip(); b.classList.add('open'); open.push(b);
        if (open.length < 2) return;
        moves++; $('.mem-moves', v).textContent = T_.moves(moves);
        const [a, c] = open, ca = cards[a.dataset.k], cb = cards[c.dataset.k];
        lock = true;
        if (ca.id === cb.id && ca.kind !== cb.kind) {
          setTimeout(() => {
            a.classList.add('done'); c.classList.add('done'); SFX.ding(); burst(a, 14); burst(c, 14);
            done++; open = []; lock = false; $('.mem-pairs', v).textContent = T_.pairs(done, ids.length);
            if (done === ids.length) finish(); else say(T.v('pair'));
          }, 420);
        } else setTimeout(() => { SFX.soft(); a.classList.remove('open'); c.classList.remove('open'); open = []; lock = false; }, 1050);
      });
      function finish() {
        const n = ids.length, got = 3 + (moves <= n + 2 ? 2 : moves <= n * 2 ? 1 : 0);
        saveBest('memory-' + set, moves, true); addStars(got, $('.mem-grid', v));
        setTimeout(() => results({ score: n, total: n, earned: got, title: T_.memTitle, msg: T_.memText(n, moves), again: () => go('memory', { set }) }), 700);
      }
    };

    // =================== PASAPORTE ===================
    SCREENS.passport = (v) => {
      const slot = (id) => {
        const e = TOPICS[id], s = seenOf(id).length, n = e.hotspots.length;
        return stamps[id] ? `<button class="stamp-slot" data-topic="${id}" style="--rot:${(Math.random() * 24 - 12).toFixed(0)}deg" aria-label="${esc(e.name)}">${stampSVG(id)}</button>`
          : `<button class="stamp-slot" data-topic="${id}" aria-label="${esc(e.name)}: ${T_.noStamp}"><span class="stamp-empty"><span>${e.emoji}</span>${e.short}<br>✨ ${s}/${n}</span></button>`;
      };
      const setIcon = (s) => (s === 'a' ? '🌀' : GROUPS.find((g) => g.id === s)?.emoji || '');
      const tro = (k, fmt) => {
        const vals = ['a', ...GROUPS.map((g) => g.id)].map((s) => [s, best[`${k}-${s}`]]).filter(([, x]) => x != null);
        return `<div class="trophy-card"><div class="t-e">${vals.length ? GAMES[k][0] : '🔒'}</div><b>${GAMES[k][1]}</b><small>${vals.length ? vals.map(([s, x]) => `${setIcon(s)} ${fmt(x, s)}`).join('<br>') : T_.playToWin}</small></div>`;
      };
      const fmts = { quiz: (x) => `${x}/${D.quizSize || 10}`, order: (x, s) => `${x}/${D.order.rounds.filter((r) => s === 'a' || r.set === s).length} ${T_.perfect}`, sort: (x) => `${x}/10`, memory: (x) => `${x} ${T_.movesShort}` };
      v.innerHTML = `${topbar(`🛂 ${T_.passport}`)}
        <div class="passport"><div class="pp-cover"><span class="pp-e">${svg.owl(M.costume)}</span><div><b>${T_.ppTitle} · ${esc(M.title.toUpperCase())}</b><small>${T_.ppWho(stars)}</small></div></div>
          ${GROUPS.map((g) => `<div class="pp-h">${g.emoji} ${g.name} <small>${g.topics.filter((id) => stamps[id]).length} / ${g.topics.length}</small></div><div class="stamps">${g.topics.map(slot).join('')}</div>`).join('')}
          ${available().length ? `<div class="pp-h">${T_.trophies}</div><div class="trophies">${available().map((k) => tro(k, fmts[k])).join('')}</div>` : ''}
          <div class="pp-foot"><button class="btn-text" data-reset>${T_.reset}</button></div></div>`;
      v.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b || b.dataset.back) return;
        if (b.dataset.topic) { const g = groupOf(b.dataset.topic); SFX.tap(); go('learn', { set: g.id, i: g.topics.indexOf(b.dataset.topic) }); }
        else if ('reset' in b.dataset && confirm(T_.resetConfirm)) { ['stars', 'seen', 'stamps', 'best'].forEach((k) => { try { localStorage.removeItem(`${M.id}-${k}`); } catch { /* nada */ } }); location.reload(); }
      });
      setTimeout(() => { if (v.isConnected) say(T.v('passport')); }, 500);
    };

    // ---------- API para pantallas propias de la app ----------
    const K = { D, M, T_, TOPICS, GROUPS, groupOf, go, say, sayChain, stopVoice, T, SFX, addStars, confetti, burst, celebrate, openOverlay, closeOverlay, results, warp, topbar, owlHTML, stampSVG, makeDraggable, flip, fmtYear, agoText, store, shuffle, pick, esc, NOW };
    Object.assign(SCREENS, cfg.screens || {});
    go('home');
    return K;
  }

  return { start, svg, L };
})();
