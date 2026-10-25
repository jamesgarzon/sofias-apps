// «My Earth Presentation»: armar la charla, aprenderla (escuchar y decir en voz alta, desvanecer el texto),
// calentar la voz, ensayar ante el Consejo Galáctico, practicar preguntas, presentar y imprimir fichas.
window.Talk = (() => {
  const { D, store, esc, $, $$, route, top, guide, addStars, confetti, toast, later, shuffle } = App;
  const T = D.talk;
  const SLIDE = Object.fromEntries(T.slides.map((s) => [s.id, s]));
  const KIND = { open: '👋 Hello', hook: '🎣 Catch their attention', fact: '🌍 Earth fact', close: '🙏 The end' };
  const WPM = 95; // palabras por minuto de una niña de 8 años presentando en inglés, con calma

  // ---------- La charla guardada ----------
  const st = () => store.get('talk', {});
  const save = (patch) => store.set('talk', { ...st(), ...patch });
  const ids = () => { const d = st().deck; return Array.isArray(d) && d.length ? d.filter((id) => SLIDE[id] || (st().custom || {})[id]) : T.default.slice(); };
  function deck() {
    const s = st(), nm = App.name();
    return ids().map((id) => {
      const base = SLIDE[id] || { ...(s.custom || {})[id], id, kind: 'fact', art: 'custom' };
      const lines = ((s.edits || {})[id] || base.lines).map((l) => l.replace(/\{name\}/g, nm));
      return { ...base, id, lines, ctx: { name: nm, emoji: base.emoji } };
    });
  }
  const plain = (raw) => raw.replace(/\*/g, '');
  function flat(dk = deck()) {
    const out = [];
    dk.forEach((s, si) => s.lines.forEach((raw, li) => { const text = plain(raw); out.push({ si, li, raw, text, key: Voice.hash(text), slide: s }); }));
    return out;
  }
  const countWords = (dk) => dk.reduce((n, s) => n + s.lines.reduce((m, l) => m + plain(l).split(/\s+/).filter(Boolean).length, 0), 0);
  const secsFor = (dk) => Math.round((countWords(dk) / WPM) * 60 + dk.length * 2);
  const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s) % 60).padStart(2, '0')}`;

  // Palabras de una frase; las marcadas con *asteriscos* son las palabras clave.
  function toks(raw) {
    const list = raw.split(/\s+/).filter(Boolean).map((t) => {
      const key = t.includes('*'), c = t.replace(/\*/g, '');
      const m = c.match(/^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/u);
      return { key, pre: m[1], w: m[2], post: m[3] };
    });
    if (!list.some((t) => t.key)) list.forEach((t, i) => { if (t.w.length >= 4 && i % 2 === 1) t.key = true; });
    if (!list.some((t) => t.key) && list.length) list.reduce((a, b) => (b.w.length > a.w.length ? b : a)).key = true;
    return list;
  }
  // Cómo se muestra la frase: full | missing | letters | hidden
  function show(raw, mode) {
    if (mode === 'hidden') return '<span class="hid">🙈 Say it from memory!</span>';
    return toks(raw).map((t) => {
      let w = esc(t.w);
      if (mode === 'full') w = `<span class="w" data-w="${esc(t.w)}">${w}</span>`;
      else if (mode === 'missing' && t.key) w = `<span class="blank" style="--n:${Math.max(2, t.w.length)}"></span>`;
      else if (mode === 'letters' && t.w) w = `<span class="fl">${esc([...t.w][0])}<span class="dots">${'·'.repeat(Math.max(1, [...t.w].length - 1))}</span></span>`;
      return esc(t.pre) + w + esc(t.post);
    }).join(' ');
  }
  const cues = (raw) => { const k = toks(raw).filter((t) => t.key).map((t) => t.w); return k.join(' · '); };
  const marked = (heard, text) => Voice.marks(heard, plain(text)).map((m) => (m.ok ? `<span class="ok">${esc(m.t)}</span>` : `<span class="miss">${esc(m.t)}</span>`)).join(' ');

  function slideHtml(s, { still = false, cls = '' } = {}) {
    const titleInArt = s.art === 'title' || s.art === 'thanks';
    return `<div class="slide ${cls}">${Art.scene(s.art, s.ctx, still ? 'still' : '')}${titleInArt ? '' : `<div class="s-title">${esc(s.title)}</div>`}</div>`;
  }

  // ---------- Días de práctica (la práctica espaciada funciona mejor que todo el último día) ----------
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  function practiced() {
    const days = store.get('days', []);
    if (!days.includes(today())) { days.push(today()); store.set('days', days.slice(-60)); }
  }
  function daysLeft() {
    const d = st().date;
    if (!d) return null;
    const [y, m, dd] = d.split('-').map(Number), t = new Date(y, m - 1, dd), now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.round((t - now) / 86400000);
  }

  // ---------- Estado de cada paso ----------
  function progress() {
    const L = flat(), learn = store.get('learn', {}), rocket = store.get('rocket', {}), qa = store.get('qa', {});
    const learned = L.filter((l) => learn[l.key] != null).length;
    const stage = [3, 2, 1].find((k) => rocket[k]) || 0;
    const reh = store.get('rehearse', []);
    return {
      build: !!st().built, learned, total: L.length, stage, voice: !!store.get('voice', null), reh: reh.length,
      qa: Object.keys(qa).length, show: !!st().shown,
    };
  }
  function summary() {
    const p = progress();
    const done = [p.build, p.learned >= p.total, p.stage >= 3, p.voice, p.reh > 0, p.qa >= T.questions.length, p.show].filter(Boolean).length;
    const dl = daysLeft();
    return `🎤 ${done}/7 steps${dl != null && dl >= 0 ? ` · ${dl === 0 ? 'today!' : `${dl} day${dl === 1 ? '' : 's'} to go`}` : ''}`;
  }

  // ---------- Hub de la presentación ----------
  route('talk', (root) => {
    top('/', 'My Earth Presentation');
    const p = progress(), dk = deck(), dl = daysLeft();
    const days = store.get('days', []);
    const week = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; return { on: days.includes(k), l: 'SMTWTFS'[d.getDay()] }; });
    const step = (go, n, e, t, sub, status, done) => `<button class="step ${done ? 'done' : ''}" data-go="${go}"><span class="sn">${done ? '✓' : n}</span><span class="se">${e}</span><span class="st"><b>${t}</b><small>${sub}</small></span><span class="ss">${status}</span></button>`;
    root.innerHTML = `<section class="talk">
      <div class="talk-hero card">${slideHtml(dk[0], { cls: 'hero-slide' })}
        <div class="th-info"><p>🖼️ ${dk.length} slides · ⏱ about ${mmss(secsFor(dk))}</p>
          ${dl != null && dl >= 0 ? `<p class="countdown">${dl === 0 ? '🎉 Today is presentation day! You’ve got this!' : `📅 Presentation in <b>${dl}</b> day${dl === 1 ? '' : 's'}`}</p>` : ''}
          ${nextStep(p)}
          <div class="week" aria-label="Days you practiced this week"><small>Days you practiced:</small>${week.map((d) => `<span class="${d.on ? 'on' : ''}">${d.l}</span>`).join('')}</div></div></div>
      ${guide('This is your presentation about planet Earth. Let’s get ready, step by step!', { sayText: D.say.talk })}
      <div class="steps">
        ${step('/talk/build', 1, '🛠️', 'Build my talk', 'Choose your sentences and slides', p.build ? `${dk.length} slides` : 'Start here!', p.build)}
        ${step('/talk/learn', 2, '👂', 'Listen & say', 'Hear each sentence and say it out loud', `${p.learned}/${p.total}`, p.learned >= p.total)}
        ${step('/talk/rocket', 3, '🚀', 'Memory rocket', 'Fewer words each time, until you know it by heart', `${'⭐'.repeat(p.stage) || 'stage 1'}`, p.stage >= 3)}
        ${step('/talk/voice', 4, '📣', 'Voice warm-up', 'Find your big presenter voice', p.voice ? 'ready' : '', p.voice)}
        ${step('/talk/rehearse', 5, '👽', 'Galactic rehearsal', 'Present to an alien audience', p.reh ? `${p.reh}×` : '', p.reh > 0)}
        ${step('/talk/questions', 6, '🙋', 'Questions time', 'Answer your classmates’ questions', `${p.qa}/${T.questions.length}`, p.qa >= T.questions.length)}
        ${step('/talk/show', 7, '🖥️', 'Show time!', 'Your slides, full screen, for the real presentation', '', p.show)}
        <button class="step print" data-go="/talk/print"><span class="sn">🖨️</span><span class="se">🗂️</span><span class="st"><b>Cue cards & script</b><small>Print small cards with key words</small></span><span class="ss"></span></button>
      </div>
      <div class="card rules"><h3>⭐ Star speaker rules</h3>
        ${[['📣', 'Big voice'], ['🐢', 'Slow speed'], ['👀', 'Look at people'], ['🧍', 'Stand tall & smile'], ['📅', 'Practice every day']].map(([e, t], i) => `<button class="rule" data-say="${esc(D.say['rule-' + i])}"><span>${e}</span>${t}</button>`).join('')}</div>
      ${parents()}
    </section>`;
  });

  // Botón al siguiente paso que falta, para que no tenga que pensar por dónde seguir.
  function nextStep(p) {
    const steps = [[!p.build, '/talk/build', '🛠️ Build my talk'], [p.learned < p.total, '/talk/learn', '👂 Listen & say'],
      [p.stage < 3, `/talk/rocket/${p.stage + 1}`, `🚀 Rocket stage ${p.stage + 1}`], [!p.voice, '/talk/voice', '📣 Voice warm-up'],
      [!p.reh, '/talk/rehearse', '👽 Galactic rehearsal'], [p.qa < T.questions.length, '/talk/questions', '🙋 Questions time']];
    const n = steps.find((x) => x[0]);
    const [, go, t] = n || [true, '/talk/rehearse', '👽 Rehearse again'];
    return `<button class="btn next-step" data-go="${go}">Next: ${t} ▶</button>`;
  }

  function parents() {
    return `<details class="card parents"><summary>👨‍👧 Para papá o mamá: cómo usar esta parte</summary>
      <p>La app sigue lo que dice la investigación sobre cómo preparan bien una exposición los niños:</p>
      <ol>
        <li><b>Armar la charla</b>: saludo, gancho, 4–6 datos y cierre (inicio, desarrollo y final). Si la profe dio una guía (duración, temas obligatorios), ajústenla aquí: se puede cambiar el orden, editar cualquier frase o añadir una diapositiva propia.</li>
        <li><b>Escuchar y decir</b>: decir las frases <i>en voz alta</i> se recuerda mejor que leerlas en silencio (el «efecto de producción», comprobado en niños de 7 a 10 años).</li>
        <li><b>Cohete de memoria</b>: cada etapa esconde más palabras. Lo que fija el texto es <i>recordarlo</i>, no releerlo, y rinde más practicar 10 minutos varios días que una hora el último día.</li>
        <li><b>Voz y ensayo</b>: el calentamiento enseña la diferencia entre susurrar, hablar y «voz de presentadora». En el ensayo, el Consejo Galáctico avisa si la voz baja, mide el tiempo y puede grabar en audio o video para verse después. Ensayar frente a un público, aunque sea de mentira o de peluches, prepara para los nervios.</li>
        <li><b>Preguntas</b>: respuestas cortas a lo que suelen preguntar los compañeros, y una frase de rescate para cuando no sepa.</li>
        <li><b>Show time</b>: las diapositivas a pantalla completa (se avanzan tocando, deslizando o con flechas y control remoto) y <b>fichas para imprimir</b> solo con palabras clave, para que mire al público y no lea.</li>
      </ol>
      <p><b>Plan sugerido:</b> día 1 armar + escuchar y decir · día 2 escuchar y decir + cohete 1 · día 3 cohete 2 + calentar la voz · día 4 cohete 3 + ensayo · día 5 dos ensayos (uno frente a la familia) + preguntas · el día de la exposición, un repaso tranquilo con las fichas.</p>
      <p class="small">La revisión con micrófono (🎤) funciona mejor en Chrome (Android o computador). En iPhone/iPad, si no responde, se usa «✅ I said it». Las grabaciones no salen del dispositivo. Los datos de la Tierra son de nivel 3.º de primaria; si la profe dio un texto o apuntes, pueden copiar las frases exactas en «Build my talk».</p>
    </details>`;
  }

  // ---------- 1. Armar la charla ----------
  // Un dato nuevo va antes de «Take care of Earth» (que cierra los datos) o antes del final.
  function insertAt(list) {
    const care = list.indexOf('f-care'), close = list.findIndex((id) => (SLIDE[id] || {}).kind === 'close');
    return care >= 0 ? care : close >= 0 ? close : list.length;
  }
  const EMOJIS = ['🌍', '🌋', '🏔️', '🌊', '🐋', '🌳', '🦜', '🌧️', '❄️', '☀️', '🔥', '🛰️'];
  route('talk/build', (root) => {
    top('/talk', 'Build my talk');
    if (!st().built) save({ built: true, deck: ids() });
    let editing = null, adding = false;
    function draw() {
      const s = st(), dk = deck(), facts = dk.filter((x) => x.kind === 'fact').length;
      const used = new Set(ids());
      const pool = T.slides.filter((x) => x.kind === 'fact' && !used.has(x.id));
      root.innerHTML = `<section class="build">
        ${guide(D.say.build)}
        <div class="card form">
          <label>My name <input id="fName" value="${esc(App.name())}" maxlength="24" autocomplete="off"></label>
          <label>Presentation day <input id="fDate" type="date" value="${esc(s.date || '')}"></label>
          <p class="small">📊 ${dk.length} slides · about ${mmss(secsFor(dk))}. Ask your teacher how long your presentation should be.</p></div>
        <ol class="deck">${dk.map((x, i) => editing === x.id ? editor(x) : `<li class="ds" data-id="${x.id}">
            <div class="ds-thumb">${slideHtml(x, { still: true })}</div>
            <div class="ds-body"><small class="ds-kind">${i + 1}. ${KIND[x.kind]}</small><b>${esc(x.title)}</b>
              <p>${x.lines.map((l) => esc(plain(l))).join(' ')}</p></div>
            <div class="ds-tools">
              ${x.kind !== 'fact' && T.slides.filter((o) => o.kind === x.kind).length > 1 ? `<button class="tool" data-act="cycle" title="Change">🔄 Change</button>` : ''}
              ${x.kind === 'fact' ? `<button class="tool" data-act="up" ${dk[i - 1] && dk[i - 1].kind === 'fact' ? '' : 'disabled'} aria-label="Move up">⬆️</button>
                <button class="tool" data-act="down" ${dk[i + 1] && dk[i + 1].kind === 'fact' ? '' : 'disabled'} aria-label="Move down">⬇️</button>
                <button class="tool" data-act="del" ${facts <= 3 ? 'disabled' : ''} aria-label="Remove">✖️</button>` : ''}
              <button class="tool" data-act="edit" aria-label="Edit">✏️</button>
              <button class="tool" data-act="hear" aria-label="Listen">🔊</button></div></li>`).join('')}</ol>
        <div class="card addbox"><h3>➕ Add an Earth fact ${facts >= 8 ? '<small>(8 facts is the maximum)</small>' : ''}</h3>
          <div class="pool">${pool.map((x) => `<button class="addf" data-id="${x.id}" ${facts >= 8 ? 'disabled' : ''}><span class="af-thumb">${slideHtml({ ...x, ctx: {} }, { still: true })}</span><b>${esc(x.title)}</b><small>${esc(plain(x.lines[0]))}</small></button>`).join('') || '<p>You are using all the facts!</p>'}</div>
          ${adding ? custom() : `<button class="btn ghost" data-act="custom" ${facts >= 8 ? 'disabled' : ''}>✏️ Make my own slide</button>`}</div>
        <div class="sum">📊 ${dk.length} slides · ${countWords(dk)} words · about <b>${mmss(secsFor(dk))}</b>
          ${secsFor(dk) > 200 ? '<small>That is long! Ask your teacher how long it should be.</small>' : ''}
          <div class="row"><button class="btn ghost" data-go="/talk/show">▶ Preview</button><button class="btn" data-go="/talk/learn">Done! Let’s learn it ✓</button></div></div>
      </section>`;
    }
    const editor = (x) => `<li class="ds editing" data-id="${x.id}"><div class="ds-body"><b>✏️ ${esc(x.title)}</b>
      ${x.lines.map((l, k) => `<textarea data-k="${k}" rows="2">${esc(plain(l))}</textarea>`).join('')}
      <div class="row"><button class="btn" data-act="saveEdit">Save</button><button class="btn ghost" data-act="resetEdit">Original text</button><button class="btn ghost" data-act="cancel">Cancel</button></div></div></li>`;
    const custom = () => `<div class="custom"><label>Title <input id="cTitle" maxlength="30" placeholder="Volcanoes"></label>
      <div class="emojis">${EMOJIS.map((e, i) => `<button class="emo ${i === 0 ? 'sel' : ''}" data-e="${e}">${e}</button>`).join('')}</div>
      <textarea id="cL0" rows="2" placeholder="First sentence"></textarea><textarea id="cL1" rows="2" placeholder="Second sentence (optional)"></textarea>
      <div class="row"><button class="btn" data-act="saveCustom">Add slide</button><button class="btn ghost" data-act="cancel">Cancel</button></div></div>`;

    root.addEventListener('change', (e) => {
      if (e.target.id === 'fName') { save({ name: e.target.value.trim() }); App.toast('Name saved'); draw(); }
      if (e.target.id === 'fDate') { save({ date: e.target.value }); App.toast('Date saved'); }
    });
    root.addEventListener('click', (e) => {
      const emo = e.target.closest('.emo');
      if (emo) { $$('.emo', root).forEach((x) => x.classList.remove('sel')); emo.classList.add('sel'); return; }
      const add = e.target.closest('.addf');
      if (add) {
        const list = ids();
        list.splice(insertAt(list), 0, add.dataset.id);
        save({ deck: list }); Voice.sfx.pop(2); draw(); return;
      }
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const li = b.closest('.ds'), id = li && li.dataset.id, list = ids(), i = list.indexOf(id);
      const act = b.dataset.act;
      if (act === 'hear') { const x = deck()[i]; Voice.say(x.lines.map(plain), 'kid'); return; }
      if (act === 'cycle') { const opts = T.slides.filter((o) => o.kind === SLIDE[id].kind).map((o) => o.id); list[i] = opts[(opts.indexOf(id) + 1) % opts.length]; save({ deck: list }); }
      if (act === 'up' && i > 0) [list[i - 1], list[i]] = [list[i], list[i - 1]];
      if (act === 'down') [list[i + 1], list[i]] = [list[i], list[i + 1]];
      if (act === 'up' || act === 'down') save({ deck: list });
      if (act === 'del') { list.splice(i, 1); save({ deck: list }); }
      if (act === 'edit') editing = id;
      if (act === 'cancel') { editing = null; adding = false; }
      if (act === 'custom') adding = true;
      if (act === 'saveEdit' || act === 'resetEdit') {
        const s = st(), edits = { ...(s.edits || {}) };
        const orig = (SLIDE[id] || (s.custom || {})[id]).lines;
        const typed = $$('textarea', li).map((t) => t.value.trim().replace(/\s+/g, ' ')).filter(Boolean);
        const nm = App.name();
        const same = typed.length === orig.length && typed.every((t, k) => t === plain(orig[k]).replace(/\{name\}/g, nm));
        const nameRe = new RegExp(`(^|[^\\p{L}])${nm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`, 'gu');
        if (act === 'resetEdit' || same || !typed.length) delete edits[id]; else edits[id] = typed.map((t) => t.replace(nameRe, '$1{name}'));
        save({ edits }); editing = null;
      }
      if (act === 'saveCustom') {
        const title = $('#cTitle', root).value.trim(), lines = [$('#cL0', root).value, $('#cL1', root).value].map((t) => t.trim().replace(/\s+/g, ' ')).filter(Boolean);
        if (!title || !lines.length) { toast('Write a title and at least one sentence ✏️'); return; }
        const cid = 'c-' + Date.now().toString(36), s = st();
        list.splice(insertAt(list), 0, cid);
        save({ deck: list, custom: { ...(s.custom || {}), [cid]: { title, lines, emoji: ($('.emo.sel', root) || {}).dataset?.e || '🌍' } } });
        adding = false;
      }
      Voice.sfx.tap();
      draw();
    });
    draw();
  });

  // ---------- Micrófono para una frase: escuchar y calificar ----------
  // Devuelve { s, heard } o null si no se pudo; muestra lo que va oyendo en `out`.
  async function hear(btn, out) {
    btn.classList.add('listening'); btn.setAttribute('aria-pressed', 'true');
    out.innerHTML = '<i>🔴 Listening… say it now!</i>';
    try {
      const alts = await Voice.listen({ onInterim: (t) => { out.innerHTML = `<i>I hear: “${esc(t)}”</i>`; } });
      return alts;
    } catch (err) {
      out.innerHTML = err === 'not-allowed' || err === 'service-not-allowed' ? 'Please allow the microphone 🎤 — or tap “✅ I said it”.'
        : err === 'unsupported' ? 'This browser can’t check your voice. Say it out loud and tap “✅ I said it”.'
        : 'I didn’t hear you. Tap 🎤 and speak a little louder!';
      return null;
    } finally { btn.classList.remove('listening'); btn.setAttribute('aria-pressed', 'false'); }
  }
  const starsOf = (s) => (s >= 0.999 ? 3 : s >= 0.75 ? 2 : s >= 0.4 ? 1 : 0); // 3 estrellas solo si es palabra por palabra

  // Graba unos segundos y los reproduce (para quien no tiene reconocimiento de voz).
  async function recordClip(btn, out) {
    if (Voice.Mic.recorder) { btn.textContent = '🎙️ Record me'; const blob = await Voice.Mic.stopRecord(); Voice.Mic.stop(); if (blob) { const a = new Audio(URL.createObjectURL(blob)); a.play().catch(() => {}); out.innerHTML = '▶️ Listen to yourself! Then compare with 🔊.'; } return; }
    try { await Voice.Mic.start(); } catch (e) { out.textContent = 'Please allow the microphone 🎙️'; return; }
    Voice.Mic.record();
    btn.textContent = '⏹ Stop';
    out.innerHTML = '<i>🔴 Recording… say the sentence, then tap stop.</i>';
    later(btn, () => { if (Voice.Mic.recorder) btn.click(); }, 12000);
  }

  // ---------- 2. Escuchar y decir ----------
  route('talk/learn', (root, start) => {
    top('/talk', 'Listen & say');
    const L = flat();
    let i = Math.min(+start || 0, L.length - 1);
    const learn = store.get('learn', {});
    function draw(auto = true) {
      const l = L[i], s = l.slide, nIn = s.lines.length;
      root.innerHTML = `<section class="learn">
        <div class="lprog"><span>Slide ${l.si + 1} of ${deck().length} · sentence ${l.li + 1} of ${nIn}</span><span>${L.filter((x) => learn[x.key] != null).length}/${L.length} ✓</span></div>
        <div class="bar"><span style="width:${((i + 1) / L.length) * 100}%"></span></div>
        ${slideHtml(s, { cls: 'mini' })}
        <p class="line" lang="en">${show(l.raw, 'full')}</p>
        <p class="tiny">Tap a word to hear it.</p>
        <div class="row"><button class="btn" data-act="listen">🔊 Listen</button><button class="btn ghost ${Voice.slow ? 'on' : ''}" data-act="slow" aria-pressed="${Voice.slow}">🐢 Slow</button></div>
        <div class="micbox">${Voice.canListen ? '<button class="mic" data-act="mic" aria-label="Say it">🎤</button>' : '<button class="btn rec" data-act="rec">🎙️ Record me</button>'}
          <div class="said"><p class="heard" aria-live="polite">${Voice.canListen ? 'Tap 🎤 and say the sentence!' : 'Say the sentence out loud!'}</p><div class="stars-earned"></div></div>
          <button class="btn ghost" data-act="self">✅ I said it</button></div>
        <div class="row nav"><button class="btn ghost" data-act="prev" ${i === 0 ? 'disabled' : ''}>◀ Back</button><button class="btn" data-act="next">${i + 1 < L.length ? 'Next ▶' : 'Finish 🏁'}</button></div>
      </section>`;
      if (auto) Voice.say(l.text, 'kid');
    }
    function grade(sc, heard) {
      const l = L[i], k = starsOf(sc);
      learn[l.key] = Math.max(learn[l.key] || 0, sc); store.set('learn', learn); practiced();
      $('.line', root).innerHTML = marked(heard, l.raw);
      $('.stars-earned', root).textContent = '⭐'.repeat(k) || '💪';
      const msg = k === 3 ? D.say[App.praise()] : k === 2 ? 'So close! Look at the red words.' : k === 1 ? 'Good try! Listen again, and try once more.' : 'Let’s listen together first.';
      $('.heard', root).innerHTML = `<b>${esc(msg)}</b><br><i>I heard: “${esc(heard)}”</i>`;
      if (k === 3) { Voice.sfx.good(); Voice.say(msg); } else if (k === 0) Voice.say(l.text, 'kid'); else Voice.say(D.say[k === 2 ? 'close' : 'goodtry']);
    }
    root.addEventListener('click', async (e) => {
      const w = e.target.closest('.w');
      if (w) { Voice.say(w.dataset.w, 'kid'); return; }
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const a = b.dataset.act, l = L[i];
      if (a === 'listen') Voice.say(l.text, 'kid');
      if (a === 'slow') { Voice.setSlow(!Voice.slow); b.classList.toggle('on', Voice.slow); b.setAttribute('aria-pressed', Voice.slow); Voice.say(l.text, 'kid'); }
      if (a === 'mic') {
        if (b.classList.contains('listening')) { Voice.stopListening(); return; }
        const alts = await hear(b, $('.heard', root));
        if (alts && root.isConnected) { const r = Voice.best(alts, l.text); grade(r.s, r.heard); }
      }
      if (a === 'rec') recordClip(b, $('.heard', root));
      if (a === 'self') { learn[l.key] = Math.max(learn[l.key] || 0, 0.5); store.set('learn', learn); practiced(); Voice.sfx.good(); $('.stars-earned', root).textContent = '✅'; next(); }
      if (a === 'prev' && i > 0) { i--; draw(); }
      if (a === 'next') next();
    });
    function next() {
      if (i + 1 < L.length) { i++; draw(); return; }
      const avg = L.reduce((n, l) => n + (learn[l.key] || 0), 0) / L.length;
      addStars('talk-learn', avg >= 0.8 ? 3 : 2);
      Voice.sfx.win(); confetti();
      root.innerHTML = `<section class="result card">${Art.lumi('cheer')}<h2>You said every sentence!</h2><p>Saying it out loud helps your brain remember. Next: the memory rocket! 🚀</p>
        <div class="row"><button class="btn" data-go="/talk/rocket">🚀 Memory rocket</button><button class="btn ghost" data-go="/talk">Back</button></div></section>`;
      Voice.say(D.say['learn-done']);
    }
    draw();
  });

  // ---------- 3. Cohete de memoria ----------
  const STAGES = [
    { mode: 'missing', e: '🧩', t: 'Missing words', sub: 'The key words are hidden', say: 'rocket-1' },
    { mode: 'letters', e: '🔤', t: 'First letters', sub: 'Only the first letter of each word', say: 'rocket-2' },
    { mode: 'hidden', e: '🙈', t: 'Pictures only', sub: 'Say it all from memory', say: 'rocket-3' },
  ];
  route('talk/rocket', (root, stageArg) => {
    top('/talk', 'Memory rocket');
    const rocket = store.get('rocket', {});
    if (stageArg) return runStage(root, +stageArg);
    const reached = [3, 2, 1].find((k) => rocket[k]) || 0;
    root.innerHTML = `<section class="rocket-page">
      ${guide(D.say.rocket)}
      <div class="flight">
        <div class="fl-moon">${Art.body('moon')}<small>The Moon = you know it by heart!</small></div>
        <div class="fl-path"><div class="fl-rocket" style="--h:${reached / 3}">${Art.rocket()}</div></div>
        <div class="fl-stages">${STAGES.map((s, k) => k).reverse().map((k) => { const S = STAGES[k], n = k + 1, open = n === 1 || rocket[n - 1]; return `<button class="stage ${rocket[n] ? 'done' : ''}" data-go="/talk/rocket/${n}" ${open ? '' : 'disabled'}>
          <span class="se">${open ? S.e : '🔒'}</span><span class="st"><b>Stage ${n}: ${S.t}</b><small>${S.sub}</small></span><span class="ss">${rocket[n] ? '⭐'.repeat(rocket[n]) : ''}</span></button>`; }).join('')}</div>
        <div class="fl-earth">${Art.body('earth')}</div>
      </div></section>`;
  });
  function runStage(root, n) {
    const S = STAGES[n - 1] || STAGES[0];
    top('/talk/rocket', `Stage ${n}: ${S.t}`);
    const L = flat();
    let i = 0, got = 0, peeks = 0, tried = false;
    function draw() {
      const l = L[i];
      tried = false;
      root.innerHTML = `<section class="learn stage-run">
        <div class="lprog"><span>${S.e} Stage ${n} · sentence ${i + 1} of ${L.length}</span><span>🧠 ${got}</span></div>
        <div class="bar"><span style="width:${((i + 1) / L.length) * 100}%"></span></div>
        ${slideHtml(l.slide, { cls: 'mini' })}
        <p class="line hint-${S.mode}" lang="en">${show(l.raw, S.mode)}</p>
        <div class="micbox">${Voice.canListen ? '<button class="mic" data-act="mic" aria-label="Say it">🎤</button>' : ''}
          <div class="said"><p class="heard" aria-live="polite">${Voice.canListen ? 'Tap 🎤 and say the whole sentence!' : 'Say the whole sentence out loud!'}</p></div></div>
        <div class="row"><button class="btn ghost" data-act="peek">👀 Peek</button><button class="btn ghost" data-act="self">✅ I said it</button></div>
        <div class="row"><button class="btn" data-act="next">${i + 1 < L.length ? 'Next ▶' : 'Finish 🏁'}</button></div></section>`;
    }
    root.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const a = b.dataset.act, l = L[i];
      if (a === 'mic') {
        if (b.classList.contains('listening')) { Voice.stopListening(); return; }
        const alts = await hear(b, $('.heard', root));
        if (!alts || !root.isConnected) return;
        const r = Voice.best(alts, l.text), ok = r.s >= 0.75;
        practiced();
        $('.line', root).innerHTML = marked(r.heard, l.raw);
        if (ok && !tried) got++;
        tried = true;
        $('.heard', root).innerHTML = ok ? `<b>🧠 ${esc(D.say[App.praise()])}</b>` : '<b>Almost! Look at the red words, and try again.</b>';
        if (ok) { Voice.sfx.good(); Voice.say(D.say[App.praise()]); } else Voice.say(D.say.almost);
      }
      if (a === 'peek') { peeks++; tried = true; $('.line', root).innerHTML = show(l.raw, 'full'); Voice.say(l.text, 'kid'); }
      if (a === 'self') { if (!tried) got++; tried = true; practiced(); Voice.sfx.good(); next(); }
      if (a === 'next') next();
    });
    function next() {
      if (i + 1 < L.length) { i++; draw(); return; }
      const pct = got / L.length, stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1;
      const r = store.get('rocket', {});
      r[n] = Math.max(r[n] || 0, stars); store.set('rocket', r);
      addStars('talk-rocket-' + n, stars);
      Voice.sfx.win(); confetti();
      const last = n === 3;
      root.innerHTML = `<section class="result card">${last ? Art.body('moon', 'big') : Art.rocket('launch')}<h2>${last ? 'We landed on the Moon!' : `Stage ${n} complete!`}</h2>
        <div class="big-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div><p>You remembered ${got} of ${L.length} sentences${peeks ? ` (${peeks} peek${peeks === 1 ? '' : 's'})` : ''}.</p>
        <div class="row">${last ? '<button class="btn" data-go="/talk/rehearse">👽 Galactic rehearsal</button>' : `<button class="btn" data-go="/talk/rocket/${n + 1}">🚀 Stage ${n + 1}</button>`}<button class="btn ghost" data-go="/talk/rocket/${n}">🔁 Again</button><button class="btn ghost" data-go="/talk/rocket">Back</button></div></section>`;
      Voice.say(last ? D.say['rocket-win'] : D.say['stage-done']);
    }
    draw();
    Voice.say(D.say[S.say]);
  }

  // ---------- 4. Calentar la voz (susurro, normal, voz de presentadora) ----------
  // Percentil p de una lista de niveles en dB
  const pctl = (a, p) => { if (!a.length) return -100; const s = a.slice().sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; };
  function meterHtml() { return `<div class="meter" aria-hidden="true"><span class="m-fill"></span><span class="m-target"></span></div>`; }
  route('talk/voice', (root) => {
    top('/talk', 'Voice warm-up');
    const steps = [
      { e: '🐭', t: 'Whisper', w: 'hello', say: 'warm-1' },
      { e: '🙂', t: 'Talking voice', w: 'hello', say: 'warm-2' },
      { e: '🌟', t: 'Presenter voice', w: 'Hello, everyone!', say: 'warm-3' },
    ];
    const res = [];
    let live = null, stopped = false;
    root.innerHTML = `<section class="voice">
      ${guide('A great presenter has a big, clear voice. Let’s warm up your voice!', { sayText: D.say['warm-intro'] })}
      <div class="vsteps">${steps.map((s, k) => `<div class="vstep" data-k="${k}"><span class="ve">${s.e}</span><b>${s.t}</b><small>“${esc(s.w)}”</small><span class="vres"></span></div>`).join('')}</div>
      ${meterHtml()}
      <p class="vnow" aria-live="polite">Stand up, and tap Start.</p>
      <div class="row"><button class="btn big" data-act="start">🎤 Start</button></div></section>`;
    const fill = $('.m-fill', root), now = $('.vnow', root);
    const tick = (lo = -70, hi = -10) => { const lv = Voice.Mic.level(); fill.style.width = Math.max(0, Math.min(100, ((lv - lo) / (hi - lo)) * 100)) + '%'; return lv; };
    function measure(ms) {
      return new Promise((resolve) => {
        const frames = [], t0 = performance.now();
        const id = setInterval(() => { frames.push(tick()); if (performance.now() - t0 > ms || stopped) { clearInterval(id); resolve(frames); } }, 50);
      });
    }
    async function run() {
      try { await Voice.Mic.start(); } catch (e) { now.textContent = 'Please allow the microphone 🎤 to warm up your voice.'; return; }
      if (stopped) { Voice.Mic.stop(); return; }
      $('[data-act="start"]', root).hidden = true;
      live = setInterval(() => tick(), 80);
      for (let k = 0; k < steps.length && !stopped; k++) {
        const el = $(`.vstep[data-k="${k}"]`, root);
        el.classList.add('now');
        for (let tries = 0; tries < 3 && !stopped; tries++) {
          now.innerHTML = `${steps[k].e} <b>${steps[k].t}</b>: listen to Lumi…`;
          clearInterval(live);
          await Voice.say(tries ? D.say['warm-bigger'] : D.say[steps[k].say]);
          if (stopped) return;
          const quiet = await measure(500);
          now.innerHTML = `${steps[k].e} Now! Say <b>“${esc(steps[k].w)}”</b>`;
          const frames = await measure(3200);
          const floor = pctl(quiet, 0.5), peak = pctl(frames, 0.9);
          res[k] = { floor, peak };
          if (k < 2 || peak >= res[1].peak + 3) break;
        }
        el.classList.remove('now'); el.classList.add('done');
        $('.vres', el).textContent = '✓';
        Voice.sfx.pop(k);
      }
      if (stopped) return;
      const calib = { w: res[0].peak, n: res[1].peak, b: Math.max(res[2].peak, res[1].peak + 3), floor: Math.min(...res.map((r) => r.floor)) };
      store.set('voice', calib); practiced();
      addStars('talk-voice', 2);
      Voice.sfx.win(); confetti(20);
      const target = (calib.n + calib.b) / 2, lo = calib.floor, hi = calib.b + 8;
      $('.m-target', root).style.left = ((target - lo) / (hi - lo)) * 100 + '%';
      root.querySelector('.meter').classList.add('calibrated');
      now.innerHTML = '🌟 <b>That is your presenter voice!</b> Now try it: keep the bar past the yellow line while you say your first sentence.';
      Voice.say(D.say['warm-win']);
      live = setInterval(() => { const lv = tick(lo, hi); root.querySelector('.meter').classList.toggle('loud', lv >= target); }, 80);
      root.querySelector('.row').innerHTML = `<button class="btn" data-go="/talk/rehearse">👽 Galactic rehearsal</button><button class="btn ghost" data-go="/talk/voice">🔁 Again</button>`;
    }
    root.addEventListener('click', (e) => { if (e.target.closest('[data-act="start"]')) run(); });
    return () => { stopped = true; clearInterval(live); };
  });

  // ---------- 5. Ensayo ante el Consejo Galáctico ----------
  route('talk/rehearse', (root) => {
    top('/talk', 'Galactic rehearsal');
    const prefs = store.get('rehprefs', { help: 'letters', meter: true, film: false });
    root.innerHTML = `<section class="rehearse-setup">
      <div class="council idle">${[0, 1, 2, 3, 4].map((k) => `<div class="seat">${Art.alien(k)}</div>`).join('')}</div>
      ${guide('The Galactic Council is ready to listen. Remember: big voice, slow speed, and look at your audience!', { sayText: D.say.rehearse })}
      <div class="card opts-card">
        <h3>What can you see while you present?</h3>
        <div class="seg">${[['full', '📝 All the words'], ['letters', '🔤 First letters'], ['hidden', '🖼️ Pictures only']].map(([v, t]) => `<button class="segb ${prefs.help === v ? 'sel' : ''}" data-help="${v}">${t}</button>`).join('')}</div>
        <label class="tog"><input type="checkbox" id="oMeter" ${prefs.meter ? 'checked' : ''}> 🎤 Voice meter (the aliens listen to your voice)</label>
        <label class="tog"><input type="checkbox" id="oFilm" ${prefs.film ? 'checked' : ''}> 🎥 Film me (watch yourself afterwards)</label>
        <p class="small">Stand up! Put the phone or tablet in front of you, like your class. Nothing you record leaves this device.</p></div>
      <div class="row"><button class="btn big" data-act="go">▶ Start my presentation</button></div></section>`;
    root.addEventListener('click', (e) => {
      const h = e.target.closest('[data-help]');
      if (h) { $$('.segb', root).forEach((x) => x.classList.remove('sel')); h.classList.add('sel'); prefs.help = h.dataset.help; store.set('rehprefs', prefs); return; }
      if (e.target.closest('[data-act="go"]')) {
        prefs.meter = $('#oMeter', root).checked; prefs.film = $('#oFilm', root).checked; store.set('rehprefs', prefs);
        perform(root, prefs);
      }
    });
    let off = null;
    function perform(root, prefs) {
      off = rehearse(root, prefs);
    }
    return () => { if (off) off(); };
  });

  function rehearse(root, prefs) {
    const dk = deck(), goal = secsFor(dk);
    const calib = store.get('voice', null);
    let si = 0, t0 = 0, timer = null, loop = null, ended = false, floor = -60, target = -30;
    let spk = 0, loudN = 0, lastSign = 0;
    const recent = [];
    const useMic = prefs.meter || prefs.film;
    document.body.classList.add('immersive');
    root.innerHTML = `<section class="rh">
      <div class="rh-top"><span class="rh-time">⏱ 0:00</span><span class="rh-n"></span><button class="tool" data-act="quit" aria-label="Stop">✕</button></div>
      <div class="rh-slide"><div class="rh-art"></div><p class="line rh-help" lang="en"></p><span class="rh-look">👀 Look at your audience!</span></div>
      <div class="rh-council"><div class="council">${[0, 1, 2, 3, 4].map((k) => `<div class="seat">${Art.alien(k)}${k === 2 ? '<span class="sign">📣 Louder, please!</span>' : ''}</div>`).join('')}</div>${prefs.meter ? meterHtml() : ''}</div>
      <div class="rh-nav"><button class="btn ghost" data-act="back" aria-label="Previous slide">◀</button><button class="btn big" data-act="next">Next ▶</button></div>
      ${prefs.film ? '<video class="selfie" muted playsinline autoplay></video>' : ''}
      <div class="countdown-ov"><span>3</span></div></section>`;
    const council = $('.council', root), sign = $('.sign', root), fill = $('.m-fill', root);
    function paint() {
      const s = dk[si];
      $('.rh-art', root).innerHTML = slideHtml(s);
      $('.rh-help', root).innerHTML = s.lines.map((l) => show(l, prefs.help === 'hidden' ? 'hidden' : prefs.help)).join('<br>');
      if (prefs.help === 'hidden') $('.rh-help', root).innerHTML = '';
      $('.rh-n', root).textContent = `Slide ${si + 1} / ${dk.length}`;
      $('[data-act="next"]', root).textContent = si + 1 < dk.length ? 'Next ▶' : 'Finish 🎉';
      const look = $('.rh-look', root); look.classList.remove('on'); void look.offsetWidth; look.classList.add('on');
    }
    function meterTick() {
      const lv = Voice.Mic.level();
      const speaking = lv > floor + 10, loud = lv >= target;
      if (speaking) spk++;
      if (speaking && loud) loudN++;
      recent.push([speaking, loud]); if (recent.length > 25) recent.shift();
      const sp = recent.filter((r) => r[0]).length, ld = recent.filter((r) => r[1]).length;
      council.classList.toggle('happy', ld >= 5);
      if (sign && sp >= 10 && ld <= 2 && performance.now() - lastSign > 6000) {
        lastSign = performance.now(); sign.classList.add('on'); council.classList.add('cup');
        setTimeout(() => { sign.classList.remove('on'); council.classList.remove('cup'); }, 2400);
      }
      if (fill) { const lo = floor, hi = target + 12; fill.style.width = Math.max(0, Math.min(100, ((lv - lo) / (hi - lo)) * 100)) + '%'; root.querySelector('.meter').classList.toggle('loud', loud); }
    }
    async function begin() {
      if (useMic) {
        try {
          const stream = await Voice.Mic.start({ video: prefs.film });
          if (ended) { Voice.Mic.stop(); return; } // salió mientras pedía permiso
          if (prefs.film) { const v = $('.selfie', root); v.srcObject = stream; v.play().catch(() => {}); }
          Voice.Mic.record();
        } catch (e) { toast('No microphone — the aliens will just watch 👽'); prefs = { ...prefs, meter: false, film: false }; const m = root.querySelector('.meter'); if (m) m.remove(); }
      }
      // Cuenta regresiva; mientras tanto se mide el ruido de la sala.
      const ov = $('.countdown-ov', root), quiet = [];
      const q = useMic ? setInterval(() => quiet.push(Voice.Mic.level()), 60) : null;
      for (const n of ['3', '2', '1']) { if (ended) { clearInterval(q); return; } ov.firstChild.textContent = n; Voice.sfx.pop(+n); await new Promise((r) => setTimeout(r, 900)); }
      clearInterval(q);
      if (ended) return;
      ov.firstChild.textContent = 'Go!';
      setTimeout(() => ov.remove(), 600);
      floor = quiet.length ? pctl(quiet, 0.3) : -60;
      target = calib ? (calib.n + calib.b) / 2 : floor + 22;
      target = Math.max(target, floor + 12);
      if (fill) { const lo = floor, hi = target + 12; $('.m-target', root).style.left = ((target - lo) / (hi - lo)) * 100 + '%'; root.querySelector('.meter').classList.add('calibrated'); }
      t0 = performance.now();
      timer = setInterval(() => { $('.rh-time', root).textContent = '⏱ ' + mmss((performance.now() - t0) / 1000); }, 250);
      if (prefs.meter && Voice.Mic.analyser) loop = setInterval(meterTick, 100);
      council.classList.add('listening');
      paint();
    }
    async function end() {
      if (ended) return;
      ended = true;
      clearInterval(timer); clearInterval(loop);
      const secs = (performance.now() - t0) / 1000;
      const blob = await Voice.Mic.stopRecord();
      Voice.Mic.stop();
      document.body.classList.remove('immersive');
      const loudPct = spk > 20 ? Math.round((loudN / spk) * 100) : null;
      practiced();
      const log = store.get('rehearse', []); log.push({ d: today(), secs: Math.round(secs), loud: loudPct, help: prefs.help }); store.set('rehearse', log.slice(-30));
      const speed = secs < goal * 0.7 ? '🐇 A little fast! Next time, speak slowly, like a turtle, and pause between slides.' : secs > goal * 1.6 ? '🐢 Nice and calm! Keep practicing, and it will flow even better.' : '👍 Great speed!';
      const media = blob ? URL.createObjectURL(blob) : null;
      const checks = ['📣 I used a big voice', '🐢 I spoke slowly', '👀 I looked at my audience', '🧍 I stood tall and smiled', '🙈 I didn’t read every word'];
      root.innerHTML = `<section class="rh-done">
        <div class="council cheer">${[0, 1, 2, 3, 4].map((k) => `<div class="seat">${Art.alien(k)}</div>`).join('')}</div>
        <h2>🎉 Bravo, ${esc(App.name())}!</h2>
        <div class="results">
          <div class="res"><span>⏱</span><b>${mmss(secs)}</b><small>Your time (goal: about ${mmss(goal)})</small></div>
          ${loudPct != null ? `<div class="res"><span>📣</span><b>${loudPct}%</b><small>of the time with your big voice</small></div>` : ''}
          <div class="res"><span>🖼️</span><b>${dk.length}</b><small>slides</small></div></div>
        <p class="card speed">${speed}${loudPct != null && loudPct < 60 ? '<br>📣 Use your big presenter voice the whole time — even at the end of each sentence!' : ''}</p>
        ${media ? (prefs.film ? `<video class="replay" src="${media}" controls playsinline></video>` : `<audio class="replay" src="${media}" controls></audio>`) + '<p class="small">Watch or listen to yourself. What did you do well? What can be even better?</p>' : ''}
        <div class="card selfcheck"><h3>How did you do? Tap what you did:</h3>${checks.map((c, k) => `<button class="chk" data-k="${k}" aria-pressed="false">${c}</button>`).join('')}</div>
        <div class="row"><button class="btn" data-act="saveCheck">⭐ Get my stars</button><button class="btn ghost" data-go="/talk/rehearse">🔁 Again</button><button class="btn ghost" data-go="/talk">Back</button></div></section>`;
      Voice.sfx.clap(); confetti();
      Voice.say(D.say.bravo);
    }
    root.addEventListener('click', (e) => {
      const c = e.target.closest('.chk');
      if (c) { c.classList.toggle('on'); c.setAttribute('aria-pressed', c.classList.contains('on')); Voice.sfx.tap(); return; }
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const a = b.dataset.act;
      if (a === 'next' && t0) { Voice.sfx.tap(); if (si + 1 < dk.length) { si++; paint(); } else end(); }
      if (a === 'back' && t0 && si > 0) { si--; paint(); }
      if (a === 'quit') { ended = true; clearInterval(timer); clearInterval(loop); Voice.Mic.stop(); document.body.classList.remove('immersive'); App.go('/talk'); }
      if (a === 'saveCheck') {
        const n = $$('.chk.on', root).length, log = store.get('rehearse', []), last = log[log.length - 1] || {};
        const stars = 1 + (n >= 4 ? 1 : 0) + ((last.loud == null ? n >= 1 : last.loud >= 70) ? 1 : 0);
        addStars('talk-rehearse', stars);
        Voice.sfx.win(); toast(`${'⭐'.repeat(stars)} Great rehearsal!`);
        b.disabled = true;
      }
    });
    begin();
    return () => { ended = true; clearInterval(timer); clearInterval(loop); Voice.Mic.stop(); document.body.classList.remove('immersive'); };
  }

  // ---------- 6. Preguntas de los compañeros ----------
  route('talk/questions', (root) => {
    top('/talk', 'Questions time');
    const mine = new Set(ids());
    const qs = T.questions.map((q, k) => ({ ...q, k })).sort((a, b) => (mine.has(b.about) ? 1 : 0) - (mine.has(a.about) ? 1 : 0));
    const qa = store.get('qa', {});
    let i = 0;
    function draw() {
      if (i >= qs.length) return rescue();
      const q = qs[i];
      root.innerHTML = `<section class="qa">
        <div class="lprog"><span>Question ${i + 1} of ${qs.length}</span><span>${Object.keys(qa).length} ✓</span></div>
        <div class="asker card"><div class="seat">${Art.alien(i)}</div><div><small>A classmate asks:</small><p class="qtext">${esc(q.q)}</p></div><button class="say" data-say="${esc(q.q)}" aria-label="Listen">🔊</button></div>
        <div class="micbox">${Voice.canListen ? '<button class="mic" data-act="mic" aria-label="Answer">🎤</button>' : ''}
          <div class="said"><p class="heard" aria-live="polite">${Voice.canListen ? 'Tap 🎤 and answer in English!' : 'Answer out loud in English!'}</p></div></div>
        <div class="answer card" hidden><small>💡 You can say:</small><p>${esc(q.a)}</p><button class="say" data-say="${esc(q.a)}" data-who="kid" aria-label="Listen">🔊</button></div>
        <div class="row"><button class="btn ghost" data-act="idea">💡 Show an idea</button><button class="btn" data-act="next">Next ▶</button></div></section>`;
      Voice.say(q.q);
    }
    function done(q) { qa[q.k] = 1; store.set('qa', qa); practiced(); }
    function rescue() {
      addStars('talk-qa', 2);
      root.innerHTML = `<section class="qa">${guide('If you don’t know the answer, it’s OK! You can say:', { sayText: D.say['qa-tip'] })}
        <div class="answer card big-ans"><p>“${esc(T.rescue)}”</p><button class="say" data-say="${esc(T.rescue)}" data-who="kid" aria-label="Listen">🔊</button></div>
        <div class="micbox">${Voice.canListen ? '<button class="mic" data-act="mic" aria-label="Say it">🎤</button>' : ''}<div class="said"><p class="heard" aria-live="polite">Practice saying it!</p></div></div>
        <div class="row"><button class="btn" data-go="/talk">Done ✓</button><button class="btn ghost" data-go="/talk/questions">🔁 Again</button></div></section>`;
      Voice.say(D.say['qa-tip']);
    }
    root.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const a = b.dataset.act, q = qs[i];
      if (a === 'mic') {
        if (b.classList.contains('listening')) { Voice.stopListening(); return; }
        const alts = await hear(b, $('.heard', root));
        if (!alts || !root.isConnected) return;
        if (!q) { const r = Voice.best(alts, T.rescue); $('.heard', root).innerHTML = r.s >= 0.6 ? `<b>🌟 ${esc(D.say[App.praise()])}</b>` : `<i>I heard: “${esc(r.heard)}”</i> Try again!`; return; }
        const good = alts.some((h) => Voice.hasKeys(h, q.keys));
        $('.heard', root).innerHTML = `<i>I heard: “${esc(alts[0])}”</i><br><b>${good ? '🌟 ' + esc(D.say['qa-good']) : esc(D.say['qa-idea'])}</b>`;
        $('.answer', root).hidden = false;
        if (good) { Voice.sfx.good(); Voice.say(D.say['qa-good']); done(q); } else Voice.say([D.say['qa-idea'], q.a], 'guide');
      }
      if (a === 'idea') { $('.answer', root).hidden = false; Voice.say(q.a, 'kid'); done(q); }
      if (a === 'next') { done(q); i++; draw(); }
    });
    draw();
  });

  // ---------- 7. Show time: diapositivas a pantalla completa ----------
  route('talk/show', (root, startArg) => {
    top('/talk', 'Show time');
    const dk = deck();
    let i = Math.min(+startArg || 0, dk.length - 1), notes = false, lock = null;
    document.body.classList.add('immersive', 'showing');
    root.innerHTML = `<section class="showtime" tabindex="-1">
      <div class="show-stage"><div class="frame"></div></div>
      <p class="rotate-hint">🔄 Turn your phone sideways for bigger slides</p>
      <div class="notes" hidden></div>
      <div class="sbar"><button class="tool" data-act="exit" aria-label="Exit">✕</button><button class="tool" data-act="prev" aria-label="Previous">◀</button>
        <span class="sn"></span><button class="tool" data-act="next" aria-label="Next">▶</button>
        <button class="tool" data-act="notes" aria-pressed="false" title="Cue words">📝</button><button class="tool" data-act="fs" title="Full screen">⛶</button></div></section>`;
    const frame = $('.frame', root);
    function paint() {
      frame.innerHTML = slideHtml(dk[i], { cls: 'big' });
      $('.sn', root).textContent = `${i + 1} / ${dk.length}`;
      $('.notes', root).innerHTML = dk[i].lines.map((l) => `• ${esc(cues(l))}`).join('<br>');
    }
    const move = (d) => {
      if (i + d >= dk.length) { save({ shown: true }); addStars('talk-show', 1); frame.innerHTML = `<div class="slide big theend">${Art.scene('thanks', {})}<div class="te">The end 🎉</div></div>`; Voice.say(D.say['show-end']); i = dk.length; return; }
      i = Math.max(0, Math.min(dk.length - 1, i + d)); paint();
    };
    const exit = () => { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); App.go('/talk'); };
    const key = (e) => {
      ui();
      if (['ArrowRight', 'PageDown', ' ', 'Enter', 'ArrowDown'].includes(e.key)) { e.preventDefault(); move(1); }
      if (['ArrowLeft', 'PageUp', 'ArrowUp', 'Backspace'].includes(e.key)) { e.preventDefault(); move(-1); }
      if (e.key === 'Escape' && !document.fullscreenElement) exit();
    };
    let sx = null, uiT = null;
    const ui = () => { const el = $('.showtime', root); if (!el) return; el.classList.add('ui'); clearTimeout(uiT); uiT = setTimeout(() => el.classList.remove('ui'), 2800); };
    root.addEventListener('pointerdown', (e) => { sx = e.clientX; ui(); });
    root.addEventListener('pointermove', ui);
    root.addEventListener('pointerup', (e) => {
      if (sx == null || e.target.closest('.sbar')) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
      else if (e.target.closest('.show-stage')) move(e.clientX < window.innerWidth / 3 ? -1 : 1);
    });
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const a = b.dataset.act;
      if (a === 'exit') exit();
      if (a === 'prev') move(-1);
      if (a === 'next') move(1);
      if (a === 'notes') { notes = !notes; $('.notes', root).hidden = !notes; b.setAttribute('aria-pressed', notes); }
      if (a === 'fs') { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); else root.requestFullscreen?.().catch(() => {}); }
    });
    document.addEventListener('keydown', key);
    try { root.requestFullscreen?.().catch(() => {}); } catch (e) { /* iPhone: sin pantalla completa */ }
    if (navigator.wakeLock) navigator.wakeLock.request('screen').then((l) => { lock = l; }).catch(() => {});
    paint();
    ui();
    $('.showtime', root).focus();
    return () => { document.removeEventListener('keydown', key); document.body.classList.remove('immersive', 'showing'); if (lock) lock.release().catch(() => {}); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); };
  });

  // ---------- Fichas y guion para imprimir ----------
  route('talk/print', (root) => {
    top('/talk', 'Cue cards & script');
    const dk = deck();
    const cards = () => dk.map((s, k) => `<div class="cue"><div class="cue-n">${k + 1}</div><div class="cue-art">${slideHtml(s, { still: true })}</div>
      <b>${esc(s.title)}</b><ul>${s.lines.map((l) => `<li>${esc(cues(l))}</li>`).join('')}</ul><div class="cue-foot">📣 big voice · 🐢 slow · 👀 look up</div></div>`).join('');
    const script = () => `<div class="script"><h1>Planet Earth</h1><p class="by">by ${esc(App.name())} · about ${mmss(secsFor(dk))}</p>
      ${dk.map((s, k) => `<div class="sc-slide"><h2>${k + 1}. ${esc(s.title)}</h2>${s.lines.map((l) => `<p>${esc(plain(l))}</p>`).join('')}</div>`).join('')}
      <p class="practice">Practice: ☐ Mon ☐ Tue ☐ Wed ☐ Thu ☐ Fri ☐ Sat ☐ Sun</p></div>`;
    const slidesP = () => dk.map((s) => `<div class="pslide">${slideHtml(s, { still: true, cls: 'big' })}</div>`).join('');
    root.innerHTML = `<section class="printer">
      ${guide(D.say.print)}
      <div class="row"><button class="btn" data-print="cards">🖨️ Cue cards</button><button class="btn ghost" data-print="script">🖨️ Full script</button><button class="btn ghost" data-print="slides">🖨️ Slides</button></div>
      <p class="small">Tip: print the cue cards on thick paper and cut them out. Number them, so they stay in order.</p>
      <div class="cues">${cards()}</div></section>`;
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-print]');
      if (!b) return;
      let area = document.getElementById('printArea');
      if (!area) { area = document.createElement('div'); area.id = 'printArea'; document.body.appendChild(area); }
      const kind = b.dataset.print;
      area.className = 'p-' + kind;
      area.innerHTML = kind === 'cards' ? `<div class="cues">${cards()}</div>` : kind === 'script' ? script() : slidesP();
      document.body.classList.add('printing');
      setTimeout(() => { window.print(); }, 150);
    });
    const after = () => document.body.classList.remove('printing');
    window.addEventListener('afterprint', after);
    return () => { window.removeEventListener('afterprint', after); after(); };
  });

  return { summary, deck, flat, show, toks, cues, secsFor };
})();
