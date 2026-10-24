// Pantallas propias para aprender de memoria el poema y la biografía (data.texts → versos en data.voice):
//   memoria   «De memoria»: escalera de 4 escalones que esconde cada vez más palabras. Cada parte tiene una matica
//             que crece cuando Sofía la recita sin mirar (🌰 semilla → 🌺 flor). Si el navegador sabe escuchar
//             (Web Speech API), las palabras escondidas florecen cuando ella las dice en voz alta.
//   completa  «Completa»: ¿qué palabra falta? y ¿qué verso sigue?, recorriendo el texto en orden.
// Progreso en localStorage: mariela-memo = { "poema:e2": 3, "bio:all": 1, … } (escalón más alto superado sin mirar).
window.MEMORIA_SCREENS = (() => {
  'use strict';
  const D = window.APP_DATA, V = D.voice, TX = D.texts;
  const $ = (s, el) => el.querySelector(s), $$ = (s, el) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  const LEVELS = [
    { n: 1, e: '👀', t: 'Leer', sub: 'Lee y escucha' },
    { n: 2, e: '🙈', t: 'Faltan palabras', sub: 'Algunas se esconden' },
    { n: 3, e: '🔤', t: 'Primera letra', sub: 'Solo se ve la primera' },
    { n: 4, e: '🧠', t: '¡De memoria!', sub: 'Todo escondido' },
  ];
  const STAGES = ['una semilla', 'un brote', 'una matica con hojas', 'una matica con botón', '¡una flor!'];
  // palabritas que no se esconden en el escalón 2 ni se preguntan en «Completa»
  const STOP = new Set('y a o de la el los las en un una con se su sus que como les no lo me mas es ha al del por muy asi ella'.split(' '));

  // ---------- palabras ----------
  const plain = (w) => w.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
  // forma «fonética» para comparar lo que oye el micrófono: b/v, s/z/c, ll/y, k/c/qu y la h muda suenan igual
  const phon = (w) => plain(w).replace(/h/g, '').replace(/v/g, 'b').replace(/z/g, 's').replace(/c([ei])/g, 's$1').replace(/ll/g, 'y').replace(/qu/g, 'k').replace(/c/g, 'k');
  function lev(a, b) {
    let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[b.length];
  }
  const near = (a, b) => { if (a === b) return true; const n = Math.min(a.length, b.length), tol = n >= 7 ? 2 : n >= 4 ? 1 : 0; return tol > 0 && Math.abs(a.length - b.length) <= tol && lev(a, b) <= tol; };
  const NUM = new Set('mil novecientos cuarenta y ocho'.split(' ').map(phon)); // «1948» dicho en palabras
  const hears = (t, h) => (/^\d+$/.test(t.plain) ? h === t.plain || NUM.has(h) : near(t.p, h));
  function tokenize(s, start) {
    return s.split(/\s+/).filter(Boolean).map((raw, k) => {
      const [, pre, core, post] = raw.match(/^([«"¿¡(]*)(.*?)([»".,;:!?)…]*)$/);
      return { i: start + k, pre, core, post, plain: plain(core), p: phon(core), first: k === 0 };
    });
  }
  /** Partes del texto `tid` ('all' = todas), con sus versos partidos en palabras numeradas en orden. */
  function build(tid, sel) {
    const T = TX[tid]; let n = 0;
    const parts = (sel === 'all' ? T.parts : T.parts.filter((p) => p.id === sel)).map((p) => ({
      ...p, lines: p.lines.map((key) => { const toks = tokenize(V[key], n); n += toks.length; return { key, toks }; }),
    }));
    return { T, parts, lines: parts.flatMap((p) => p.lines.map((l) => ({ ...l, part: p }))), toks: parts.flatMap((p) => p.lines.flatMap((l) => l.toks)) };
  }

  // ---------- la matica que crece (viewBox 60×80): 0 semilla · 1 brote · 2 hojas · 3 botón · 4 flor de geranio ----------
  function plant(stage) {
    const leaf = (x, y, r, s = 1, flip = false) => `<path d="M0,0 Q-9,-10 -18,-3 Q-9,5 0,0Z" fill="${flip ? '#16a34a' : '#22c55e'}" transform="translate(${x} ${y}) rotate(${r}) scale(${flip ? -s : s} ${s})"/>`;
    const stem = (h) => `<path d="M30,57 Q28,${57 - h / 2} 30,${57 - h}" stroke="#15803d" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
    const top = [
      `<ellipse cx="30" cy="54.5" rx="5" ry="3.4" fill="#8b5a2b"/><path d="M27,53.5 q3,-2 6,0" stroke="#c08a52" stroke-width="1.2" fill="none"/>`,
      `${stem(13)}${leaf(30, 46, 18, 0.7)}${leaf(30, 46, -18, 0.7, true)}`,
      `${stem(28)}${leaf(30, 46, 10, 0.9)}${leaf(30, 42, -14, 0.9, true)}${leaf(30, 32, 22, 0.7)}${leaf(30, 31, -20, 0.7, true)}`,
      `${stem(36)}${leaf(30, 48, 10)}${leaf(30, 44, -14, 1, true)}${leaf(30, 34, 22, 0.8)}${leaf(30, 33, -20, 0.8, true)}<ellipse cx="30" cy="19" rx="5" ry="7" fill="#4ade80"/><path d="M27,15 Q30,9 33,15Z" fill="#e11d48"/>`,
      `${stem(36)}${leaf(30, 48, 10)}${leaf(30, 44, -14, 1, true)}${leaf(30, 34, 22, 0.8)}${leaf(30, 33, -20, 0.8, true)}<g transform="translate(30 16) scale(.82)">${window.SCN ? SCN.geranio('#e11d48', '#fecdd3') : '<circle r="9" fill="#e11d48"/>'}</g>
        <g fill="#fbbf24">${[[10, 12], [50, 18], [46, 4]].map(([x, y]) => `<path d="M${x},${y - 4} l1.2,2.8 l2.8,1.2 l-2.8,1.2 l-1.2,2.8 l-1.2,-2.8 l-2.8,-1.2 l2.8,-1.2Z"/>`).join('')}</g>`,
    ][Math.max(0, Math.min(4, stage))];
    return `<svg viewBox="0 0 60 80" class="mm-plant-svg" aria-hidden="true">${top}<path d="M18,62 L42,62 L39,78 L21,78Z" fill="#c2410c"/><rect x="15" y="56" width="30" height="7" rx="2.5" fill="#ea580c"/><path d="M21,66 h18" stroke="#9a3412" stroke-width="1.4" opacity=".5"/></svg>`;
  }

  // ---------- leer en voz alta verso por verso, resaltando el que suena ----------
  // Usa K.say(par, el): el kit le pone la clase .speaking a `el` mientras suena y se la quita al terminar.
  // Si la voz está apagada (o no hay voz en el dispositivo) resalta cada verso un ratico con .reading.
  function reader(K, v) {
    let run = null;
    const ms = (t) => 900 + t.length * 55;
    function play(items, onDone) {
      stop();
      const tok = (run = {});
      let i = 0;
      const next = () => {
        if (run !== tok || !v.isConnected) return;
        if (i >= items.length) { run = null; onDone?.(); return; }
        const { key, el } = items[i++], t0 = performance.now();
        el.scrollIntoView?.({ block: 'nearest', behavior: REDUCED ? 'auto' : 'smooth' });
        const manual = () => { el.classList.add('reading'); setTimeout(() => { el.classList.remove('reading'); next(); }, ms(V[key] || '')); };
        // por si el navegador nunca avisa que terminó de hablar
        const guard = setTimeout(() => { if (run === tok && el.classList.contains('speaking')) { mo.disconnect(); el.classList.remove('speaking'); next(); } }, 4000 + (V[key] || '').length * 150);
        const mo = new MutationObserver(() => {
          if (el.classList.contains('speaking')) return;
          mo.disconnect(); clearTimeout(guard);
          if (run !== tok) return;
          performance.now() - t0 < 250 ? manual() : setTimeout(next, 220);
        });
        K.say([`v-${key}`, V[key]], el);
        if (!el.classList.contains('speaking')) { clearTimeout(guard); return manual(); }
        mo.observe(el, { attributes: true, attributeFilter: ['class'] });
      };
      next();
    }
    function stop() { if (run) { run = null; K.stopVoice(); } $$('.reading', v).forEach((e) => e.classList.remove('reading')); }
    return { play, stop, get on() { return !!run; } };
  }

  // =================== DE MEMORIA ===================
  function memoria(v, params, K) {
    const memo = K.store.get('memo', {});
    const last = memo._last || {};
    let tid = params.t || last.t || 'poema', sel = params.s || last.s || TX[tid].parts[0].id, lvl = params.l || last.l || 1;
    if (!TX[tid]) tid = 'poema';
    if (sel !== 'all' && !TX[tid].parts.some((p) => p.id === sel)) sel = TX[tid].parts[0].id;
    let B, hidden, peeks = 0, said = new Set(), finished = false;
    const voice = reader(K, v);
    const keyOf = (s = sel) => `${tid}:${s}`;
    const save = () => { memo._last = { t: tid, s: sel, l: lvl }; K.store.set('memo', memo); };

    v.innerHTML = `${K.topbar('🌱 De memoria')}
      <div class="mm-tabs" role="tablist">${Object.entries(TX).map(([id, T]) => `<button class="mm-tab" role="tab" data-t="${id}">${T.emoji} ${T.name}</button>`).join('')}</div>
      <div class="mm-parts" role="group" aria-label="¿Qué parte?"></div>
      <div class="mm-ladder" role="group" aria-label="Escalones">${LEVELS.map((L) => `<button class="mm-step" data-l="${L.n}"><span class="mm-step-e">${L.e}</span><span class="mm-step-t"><b>${L.n}. ${L.t}</b><small>${L.sub}</small></span></button>`).join('')}</div>
      <div class="mm-coach">${K.owlHTML()}<p class="mm-hint"></p></div>
      <div class="mm-page"><div class="mm-text"></div></div>
      <div class="mm-heard" aria-live="polite"></div>
      <div class="mm-tools"></div>`;
    const page = $('.mm-text', v), tools = $('.mm-tools', v), heard = $('.mm-heard', v);

    function renderNav() {
      $$('.mm-tab', v).forEach((b) => b.setAttribute('aria-selected', b.dataset.t === tid));
      const T = TX[tid], chips = [...T.parts.map((p) => [p.id, p.name, K.TOPICS[p.topic].color]), ['all', tid === 'poema' ? 'Todo el poema' : 'Toda la biografía', '#f59e0b']];
      $('.mm-parts', v).innerHTML = chips.map(([id, name, c]) => `<button class="mm-part-btn ${id === sel ? 'on' : ''}" data-s="${id}" style="--pc:${c}" aria-pressed="${id === sel}"><span class="mm-plant">${plant(memo[keyOf(id)] || 0)}</span><span>${esc(name)}</span></button>`).join('');
      const got = memo[keyOf()] || 0;
      $$('.mm-step', v).forEach((b) => { const n = +b.dataset.l; b.classList.toggle('on', n === lvl); b.classList.toggle('done', n <= got); b.setAttribute('aria-pressed', n === lvl); });
    }

    function wordHTML(t) {
      if (!hidden.has(t.i)) return `${esc(t.pre)}<span class="w" data-i="${t.i}">${esc(t.core)}</span>${esc(t.post)}`;
      const inner = lvl === 3 ? `<b>${esc(t.core[0])}</b><i>${esc(t.core.slice(1))}</i>` : `<i>${esc(t.core)}</i>`;
      return `${esc(t.pre)}<span class="w hid${lvl === 3 ? ' first' : ''}" data-i="${t.i}" role="button" tabindex="0" aria-label="Palabra escondida: toca para verla">${inner}</span>${esc(t.post)}`;
    }
    function pickHidden() {
      if (lvl === 1) return new Set();
      if (lvl >= 3) return new Set(B.toks.map((t) => t.i));
      const out = new Set(); // escalón 2: casi la mitad de las palabras importantes, al menos una por verso
      B.lines.forEach((l) => { const c = K.shuffle(l.toks.filter((t) => !STOP.has(t.plain))); c.slice(0, Math.max(1, Math.round(c.length * 0.45))).forEach((t) => out.add(t.i)); });
      return out;
    }
    function renderPage() {
      stopAll();
      B = build(tid, sel); hidden = pickHidden(); peeks = 0; said = new Set(); finished = false;
      const head = sel === 'all' ? `<div class="mm-title"><b>${esc(B.T.title)}</b><small>${esc(B.T.by)}</small></div>` : '';
      page.className = `mm-text t-${tid} l${lvl}`;
      page.innerHTML = head + B.parts.map((p) => `<section class="mm-sec" style="--pc:${K.TOPICS[p.topic].color}">
          <h3 class="mm-h"${p.say ? ` data-say="${p.say}"` : ''}>${esc(p.name)}</h3>
          ${p.lines.map((l) => `<p class="ln" data-k="${l.key}">${l.toks.map(wordHTML).join(' ')}</p>`).join('')}
          ${p.more ? `<p class="mm-more">${esc(p.more)}</p>` : ''}</section>`).join('');
      renderTools();
    }
    function renderTools() {
      const mic = SR ? `<button class="btn btn-cyan mm-mic" data-act="mic" aria-pressed="false">🎤 <span>Escúchame</span></button>` : '';
      tools.innerHTML = lvl === 1
        ? `<button class="btn btn-ghost" data-act="listen">🔊 <span>Escuchar</span></button>${mic}<button class="btn" data-act="done">✅ ¡Ya lo leí!</button>`
        : `<button class="btn btn-ghost" data-act="hint">💡 Pista</button>${mic}<button class="btn" data-act="done">✅ ¡Listo!</button>`;
      $('.mm-hint', v).textContent = V[`mem-${lvl}`] || '';
      heard.textContent = SR ? (lvl === 1 ? '🎤 Toca «Escúchame» y lee en voz alta: cada palabra que dices se pone verde.' : '🎤 Toca «Escúchame» y recita: las palabras escondidas aparecen cuando las dices.') : '';
    }
    function renderAll(sayHint = false) { renderNav(); renderPage(); save(); if (sayHint) K.say(K.T.v(`mem-${lvl}`)); }

    // ---------- descubrir palabras ----------
    function reveal(i, how) {
      const el = $(`.w[data-i="${i}"]`, page); if (!el) return;
      if (el.classList.contains('hid')) {
        el.classList.remove('hid', 'first'); el.classList.add(how);
        el.removeAttribute('role'); el.removeAttribute('tabindex'); el.removeAttribute('aria-label');
        el.textContent = B.toks[i].core;
      } else if (how === 'said') el.classList.add('said');
    }
    function peek(i) { if (finished || !hidden.has(i) || said.has(i)) return; if (!$(`.w.hid[data-i="${i}"]`, page)) return; peeks++; reveal(i, 'peek'); K.SFX.soft(); }
    function hint() { const t = B.toks.find((x) => hidden.has(x.i) && $(`.w.hid[data-i="${x.i}"]`, page)); if (t) { peek(t.i); $(`.w[data-i="${t.i}"]`, page).scrollIntoView({ block: 'nearest', behavior: REDUCED ? 'auto' : 'smooth' }); } }

    // ---------- el micrófono: las palabras florecen al decirlas ----------
    let rec = null, listening = false, sessStart = 0, lastStart = 0, quick = 0, watch = null;
    const lastSaid = () => { let m = -1; said.forEach((i) => { if (i > m) m = i; }); return m; };
    function markSaid(i) {
      if (said.has(i)) return;
      said.add(i);
      const wasHidden = !!$(`.w.hid[data-i="${i}"]`, page);
      reveal(i, 'said');
      if (wasHidden) K.SFX.place(said.size % 8);
    }
    /** Alinea lo que oyó el micrófono (desde que empezó esta escucha) con las palabras del texto. */
    function feed(txt) {
      if (finished) return;
      const hs = txt.split(/\s+/).map(phon).filter(Boolean), toks = B.toks;
      heard.textContent = `🎤 «${txt.trim().split(/\s+/).slice(-7).join(' ')}»`;
      let p = sessStart;
      for (let j = 0; j < hs.length; j++) {
        const h = hs[j], h2 = hs[j + 1];
        let k = -1;
        for (let q = p; q < Math.min(toks.length, p + 4) && k < 0; q++) if (hears(toks[q], h) || (h2 && near(toks[q].p, h + h2))) k = q;
        // ¿volvió a empezar o se saltó un pedazo? lo reconocemos por dos palabras seguidas
        for (let q = 0; k < 0 && h2 && q < toks.length - 1; q++) if (hears(toks[q], h) && hears(toks[q + 1], h2)) k = q;
        if (k < 0) continue;
        // el reconocedor a veces se come las palabritas cortas (y, en, la…): si quedó una en medio, cuenta
        if (k - p <= 2) for (let q = p; q < k; q++) if (toks[q].plain.length <= 3) markSaid(q);
        markSaid(k); p = k + 1;
      }
      if (toks.every((t) => said.has(t.i))) { micStop(); setTimeout(() => finish(true), 500); }
    }
    function micStart() {
      if (!SR || listening) return;
      voice.stop(); K.stopVoice();
      listening = true; quick = 0;
      rec = new SR(); rec.lang = 'es-CO'; rec.continuous = true; rec.interimResults = true; rec.maxAlternatives = 1;
      rec.onresult = (e) => { let txt = ''; for (let r = 0; r < e.results.length; r++) txt += ' ' + e.results[r][0].transcript; feed(txt); };
      rec.onerror = (e) => {
        if (['not-allowed', 'service-not-allowed', 'audio-capture'].includes(e.error)) micFail('No pude usar el micrófono. Revisa el permiso del navegador, o recita y usa 💡 y ✅.');
        else if (e.error === 'network') micFail('Para escucharte necesito internet. Recita igual y toca ✅ al terminar.');
      };
      rec.onend = () => { // muchos navegadores cortan tras un silencio: seguimos escuchando
        if (!listening || !v.isConnected) return micStop();
        if (performance.now() - lastStart > 1500) quick = 0; else if (++quick > 4) return micStop();
        setTimeout(() => { if (listening && v.isConnected) begin(); }, 200);
      };
      watch = setInterval(() => { if (!v.isConnected) micStop(); }, 1000);
      begin(); micButton();
    }
    function begin() { lastStart = performance.now(); sessStart = lastSaid() + 1; try { rec.start(); } catch { /* ya estaba escuchando */ } }
    function micStop() { listening = false; clearInterval(watch); if (rec) { rec.onend = null; try { rec.abort(); } catch { /* nada */ } rec = null; } micButton(); }
    function micFail(msg) { micStop(); heard.textContent = `⚠️ ${msg}`; }
    function micButton() { const b = $('[data-act="mic"]', tools); if (!b) return; b.classList.toggle('on', listening); b.setAttribute('aria-pressed', listening); $('span', b).textContent = listening ? 'Te escucho…' : 'Escúchame'; }
    function stopAll() { voice.stop(); if (listening) micStop(); }

    // ---------- terminar el escalón ----------
    function finish(byMic = false) {
      if (finished) return;
      finished = true; stopAll();
      $$('.w.hid', page).forEach((el) => reveal(+el.dataset.i, 'late'));
      const clean = lvl === 1 || peeks === 0, key = keyOf(), before = memo[key] || 0, after = clean ? Math.max(before, lvl) : before;
      memo[key] = after; save(); renderNav();
      const earned = lvl === 1 ? 1 : clean ? (lvl === 4 ? 3 : 2) : 1;
      const T = TX[tid], idx = T.parts.findIndex((p) => p.id === sel), nextPart = sel === 'all' ? null : T.parts[idx + 1]?.id || 'all';
      let title, msg, vkey, primary;
      if (lvl === 1) { title = '¡Muy bien! 📖'; msg = 'Ya lo leíste. En el escalón 2 escondo algunas palabras: ¡a ver si te acuerdas!'; vkey = 'good'; primary = ['next', `Escalón 2 ➜`]; }
      else if (!clean) { title = '¡Casi! 💪'; msg = `Miraste ${peeks} ${peeks === 1 ? 'palabra' : 'palabras'}. Recítalo otra vez sin mirar para que tu matica crezca.`; vkey = 'mem-peek'; primary = ['again', '🔁 Otra vez']; }
      else if (lvl < 4) { title = byMic ? '¡Te escuché todo! 🎤' : '¡Sin mirar! 🌟'; msg = `Tu matica creció: ahora es ${STAGES[after]}`; vkey = 'mem-grow'; primary = ['next', `Escalón ${lvl + 1} ➜`]; }
      else { title = '¡Lo sabes de memoria! 🌺'; msg = '¡Tu matica floreció!'; vkey = 'mem-flower'; primary = nextPart ? ['part', nextPart === 'all' ? '¡Ahora todo junto! ➜' : 'Siguiente parte ➜'] : ['home', '🏠 Inicio']; }
      const second = primary[0] === 'again' ? (lvl < 4 ? ['next', `Escalón ${lvl + 1} ➜`] : null) : ['again', '🔁 Otra vez'];
      K.openOverlay(`<div class="modal mm-result"><div class="mm-grow">${plant(before)}</div><h3>${title}</h3><p>${msg}</p>
        <div class="result-stars">+${earned} ⭐</div><div class="result-btns"><button class="btn" data-r="${primary[0]}">${primary[1]}</button>${second ? `<button class="btn btn-ghost" data-r="${second[0]}">${second[1]}</button>` : ''}</div></div>`, { onClose: () => renderAll() }); // cerrar sin elegir: el mismo escalón otra vez
      const ov = document.getElementById('overlay'), grow = $('.mm-grow', ov);
      if (after > before) setTimeout(() => { grow.innerHTML = plant(after); grow.classList.add('grew'); K.SFX.ding(); K.burst(grow, 26); }, 650);
      K.addStars(earned, $('.result-stars', ov));
      if (clean && lvl === 4) { K.SFX.fanfare(); K.celebrate(); } else K.SFX.arrive();
      setTimeout(() => K.say(K.T.v(vkey)), 400);
      $$('[data-r]', ov).forEach((b) => (b.onclick = () => {
        K.SFX.tap(); K.closeOverlay(true);
        const r = b.dataset.r;
        if (r === 'home') return K.go('home');
        if (r === 'next') lvl = Math.min(4, lvl + 1);
        if (r === 'part') { sel = nextPart; lvl = Math.min(4, (memo[keyOf(nextPart)] || 0) + 1); }
        renderAll(r !== 'again');
      }));
    }

    // ---------- eventos ----------
    v.addEventListener('click', (e) => {
      const b = e.target.closest('button, .w.hid, .ln, .mm-h'); if (!b || b.dataset.back != null) return;
      if (b.dataset.t && b.dataset.t !== tid) { K.SFX.tap(); tid = b.dataset.t; sel = TX[tid].parts[0].id; lvl = Math.min(4, (memo[keyOf()] || 0) + 1); renderAll(); }
      else if (b.dataset.s && b.dataset.s !== sel) { K.SFX.tap(); sel = b.dataset.s; lvl = Math.min(4, (memo[keyOf()] || 0) + 1); renderAll(true); }
      else if (b.dataset.l && +b.dataset.l !== lvl) { K.SFX.tap(); lvl = +b.dataset.l; renderAll(true); }
      else if (b.classList.contains('hid')) peek(+b.dataset.i);
      else if (b.classList.contains('ln') && lvl === 1 && !listening) voice.play([{ key: b.dataset.k, el: b }]);
      else if (b.classList.contains('mm-h') && b.dataset.say && lvl === 1 && !listening) voice.play([{ key: b.dataset.say, el: b }]);
      else if (b.dataset.act === 'listen') {
        if (voice.on) return voice.stop();
        if (listening) micStop();
        const items = [];
        if ($('.mm-title', page) && sel === 'all') items.push({ key: B.T.say, el: $('.mm-title', page) });
        $$('.mm-sec', page).forEach((s) => { const h = $('.mm-h[data-say]', s); if (h) items.push({ key: h.dataset.say, el: h }); $$('.ln', s).forEach((l) => items.push({ key: l.dataset.k, el: l })); });
        const btn = b; $('span', btn).textContent = 'Parar'; btn.firstChild.textContent = '⏹ ';
        voice.play(items, () => { if (btn.isConnected) { $('span', btn).textContent = 'Escuchar'; btn.firstChild.textContent = '🔊 '; } });
      }
      else if (b.dataset.act === 'hint') hint();
      else if (b.dataset.act === 'mic') listening ? micStop() : micStart();
      else if (b.dataset.act === 'done') finish();
    });
    v.addEventListener('keydown', (e) => { const w = e.target.closest?.('.w.hid'); if (w && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); peek(+w.dataset.i); } });
    v.feedSpeech = (txt) => { sessStart = lastSaid() + 1; feed(txt); }; // para las pruebas automáticas

    renderAll();
    setTimeout(() => { if (v.isConnected && !listening) K.say(K.T.v('memoria')); }, 400);
  }

  // =================== COMPLETA ===================
  function completa(v, params, K) {
    const tid = TX[params.t] ? params.t : 'poema', B = build(tid, 'all');
    // palabras con contenido de todo el texto (sin repetir), para los distractores
    const pool = [...new Map(B.toks.filter((t) => !STOP.has(t.plain) && t.plain.length >= 3).map((t) => [t.plain, t])).values()];
    let idx = B.lines.map((_, i) => i);
    if (idx.length > 10) idx = K.shuffle(idx).slice(0, 10).sort((a, b) => a - b);
    const rounds = idx.map((li, r) => {
      const L = B.lines[li], next = B.lines[li + 1];
      if (r % 3 === 2 && next) return { type: 'next', li, opts: K.shuffle([next, ...K.shuffle(B.lines.filter((x) => x !== next && x !== L)).slice(0, 2)]), ok: next };
      const cands = L.toks.filter((t) => !STOP.has(t.plain) && t.plain.length >= 3), t = K.pick(cands.length ? cands : L.toks);
      const dist = K.shuffle(pool.filter((w) => w.plain !== t.plain).sort((a, b) => Math.abs(a.core.length - t.core.length) - Math.abs(b.core.length - t.core.length)).slice(0, 7)).slice(0, 3);
      return { type: 'word', li, t, opts: K.shuffle([t, ...dist]), ok: t };
    });
    let r = 0, score = 0, earned = 0, lock = false;
    v.innerHTML = `${K.topbar('✏️ Completa')}
      <div class="mm-tabs" role="tablist">${Object.entries(TX).map(([id, T]) => `<button class="mm-tab" role="tab" data-t="${id}" aria-selected="${id === tid}">${T.emoji} ${T.name}</button>`).join('')}</div>
      <div class="q-progress"><div class="q-bar"><div class="q-fill"></div><div class="q-ship">🌱</div></div><div class="q-meta"><span class="q-count"></span><span class="cp-score"></span></div></div>
      <div class="cp-stage"></div>`;
    const stage = $('.cp-stage', v);
    const lineText = (L, blank) => L.toks.map((t) => `${esc(t.pre)}${t === blank ? '<span class="cp-blank">　　　</span>' : esc(t.core)}${esc(t.post)}`).join(' ');
    function show() {
      const R = rounds[r], L = B.lines[R.li], prev = B.lines[R.li - 1], part = L.part, c = K.TOPICS[part.topic].color;
      const p = (r / rounds.length) * 100; $('.q-fill', v).style.width = p + '%'; $('.q-ship', v).style.left = p + '%';
      $('.q-count', v).textContent = `Pregunta ${r + 1} de ${rounds.length}`; $('.cp-score', v).textContent = `✅ ${score}`;
      const ctx = prev && prev.part === part ? `<p class="cp-prev">${lineText(prev)}</p>` : '';
      stage.innerHTML = R.type === 'word'
        ? `<div class="cp-card" style="--pc:${c}"><span class="cp-chip">${esc(part.name)}</span><h2 class="cp-q">¿Qué palabra falta?</h2>${ctx}<p class="cp-line">${lineText(L, R.t)}</p></div>
           <div class="opts cp-opts">${R.opts.map((o, k) => `<button class="opt" data-o="${k}"><span class="opt-l">${'ABCD'[k]}</span><span>${esc(o.first ? o.core.toLowerCase() : o.core)}</span></button>`).join('')}</div><div class="fb-slot"></div>`
        : `<div class="cp-card" style="--pc:${c}"><span class="cp-chip">${esc(part.name)}</span><h2 class="cp-q">¿Qué sigue después de…?</h2>${ctx}<p class="cp-line">${lineText(L)}</p></div>
           <div class="opts cp-opts">${R.opts.map((o, k) => `<button class="opt" data-o="${k}"><span class="opt-l">${'ABC'[k]}</span><span>${esc(V[o.key])}</span></button>`).join('')}</div><div class="fb-slot"></div>`;
      lock = false;
      K.say(K.T.v(R.type === 'word' ? 'completa' : 'next-line'));
    }
    function answer(btn) {
      if (lock) return; lock = true;
      const R = rounds[r], pickd = R.opts[+btn.dataset.o], ok = pickd === R.ok || (R.type === 'word' && pickd.plain === R.ok.plain);
      $$('.opt', stage).forEach((b) => { const o = R.opts[+b.dataset.o]; b.classList.add(o === R.ok || (R.type === 'word' && o.plain === R.ok.plain) ? 'right' : b === btn ? 'wrong' : 'dim'); });
      $('.opts', stage).classList.add('locked');
      if (R.type === 'word') { const bl = $('.cp-blank', stage); bl.textContent = R.ok.core; bl.classList.add(ok ? 'good' : 'fixed'); }
      else $('.cp-card', stage).insertAdjacentHTML('beforeend', `<p class="cp-line cp-new ${ok ? 'good' : 'fixed'}">${esc(V[R.ok.key])}</p>`);
      if (ok) { score++; earned++; K.SFX.ding(); K.burst(btn, 30); K.addStars(1, btn); } else K.SFX.buzz();
      $('.cp-score', v).textContent = `✅ ${score}`;
      const L = B.lines[R.li], fullKey = R.type === 'word' ? L.key : R.ok.key;
      $('.fb-slot', stage).innerHTML = `<div class="feedback">${K.owlHTML(ok ? 'happy' : 'sad')}<div class="fb-body"><div class="fb-title">${ok ? '¡Correcto! 🎉' : `Era: ${esc(R.type === 'word' ? R.ok.core : V[R.ok.key])}`}</div><p>«${esc(V[fullKey])}»</p></div><button class="btn" data-next>${r + 1 < rounds.length ? 'Siguiente ➜' : 'Ver resultado 🏆'}</button></div>`;
      const fb = $('.feedback', stage);
      if (fb.getBoundingClientRect().bottom > innerHeight) fb.scrollIntoView({ block: 'end', behavior: REDUCED ? 'auto' : 'smooth' });
      K.sayChain([K.T.v(ok ? `ok-${Math.floor(Math.random() * 6)}` : `bad-${Math.floor(Math.random() * 3)}`), [`v-${fullKey}`, V[fullKey]]]);
    }
    v.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || b.dataset.back != null) return;
      if (b.dataset.t && b.dataset.t !== tid) { K.SFX.tap(); K.go('completa', { t: b.dataset.t }); }
      else if (b.classList.contains('opt')) answer(b);
      else if ('next' in b.dataset) {
        K.SFX.tap(); r++;
        if (r < rounds.length) { show(); scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); }
        else { $('.q-fill', v).style.width = '100%'; $('.q-ship', v).style.left = '100%'; K.results({ score, total: rounds.length, earned, again: () => K.go('completa', { t: tid }) }); }
      }
    });
    show();
  }

  return { memoria, completa };
})();
