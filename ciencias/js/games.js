// Motores de juego. Cada paso se dibuja en `el` y llama done(got, max): estrellas solo al primer intento.
window.Games = (() => {
  const { esc } = Art;
  const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const shake = (b) => { b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); };
  const speak = (text, who) => `<button class="spk" type="button" aria-label="Listen" data-say="${esc(text)}" data-who="${who || 'ava'}">🔊</button>`;
  const head = (q, who) => `<div class="q"><p>${esc(q)}</p>${speak(q, who)}</div>`;
  const next = (el, label = 'Next') => new Promise((res) => { const b = h(`<button class="btn next" type="button">${label}</button>`); el.append(b); b.focus(); b.onclick = () => { Sound.sfx('pop'); res(); }; });
  const note = (el, ok, text) => { el.querySelector('.fb')?.remove(); el.append(h(`<p class="fb ${ok ? 'ok' : 'no'}" role="status">${ok ? 'Great!' : 'Almost!'} ${text ? esc(text) : ''}</p>`)); };

  const R = {};

  R.quiz = (el, s) => new Promise((done) => {
    const table = s.table ? `<div class="tbl"><table>${s.table.map((r, i) => `<tr>${r.map((c) => (i ? `<td>${esc(c)}</td>` : `<th>${esc(c)}</th>`)).join('')}</tr>`).join('')}</table></div>` : '';
    el.innerHTML = head(s.q) + table + `<div class="opts">${shuffle(s.opts.map((o, i) => [o, i])).map(([o, i]) => `<button class="opt" type="button" data-i="${i}">${esc(o)}</button>`).join('')}</div>`;
    Sound.say(s.q);
    el.querySelectorAll('.opt').forEach((b) => b.onclick = async () => {
      el.querySelectorAll('.opt').forEach((x) => (x.disabled = true));
      const ok = +b.dataset.i === s.a;
      el.querySelector(`.opt[data-i="${s.a}"]`).classList.add('right');
      if (ok) { Sound.sfx('right'); note(el, true, s.why); if (s.why) Sound.say(s.why); await wait(s.why ? 2200 : 900); return done([1, 1]); }
      b.classList.add('wrong'); Sound.sfx('almost');
      const fix = s.why || `The answer is: ${s.opts[s.a]}.`;
      note(el, false, fix); Sound.say(fix);
      await next(el); done([0, 1]);
    });
  });

  R.tf = (el, s) => new Promise((done) => {
    el.innerHTML = head(s.s) + `<div class="opts two"><button class="opt" type="button" data-v="1">True</button><button class="opt" type="button" data-v="0">False</button></div>`;
    Sound.say(s.s);
    el.querySelectorAll('.opt').forEach((b) => b.onclick = async () => {
      el.querySelectorAll('.opt').forEach((x) => (x.disabled = true));
      const ok = (b.dataset.v === '1') === s.t;
      el.querySelector(`.opt[data-v="${s.t ? 1 : 0}"]`).classList.add('right');
      if (!ok) {
        b.classList.add('wrong'); Sound.sfx('almost');
        const fix = s.t ? 'It is true.' : `It is false. ${s.fix ? s.fix[0] : ''}`;
        note(el, false, fix); Sound.say(fix);
        await next(el); return done([0, 1]);
      }
      Sound.sfx('right');
      if (!s.fix) { note(el, true); await wait(900); return done([1, 1]); }
      await wait(700);
      const why = 'Why is it false?';
      el.innerHTML = `<p class="stmt">“${esc(s.s)}” <b>False</b></p>` + head(why) + `<div class="opts">${shuffle(s.fix).map((f) => `<button class="opt" type="button">${esc(f)}</button>`).join('')}</div>`;
      Sound.say(why);
      el.querySelectorAll('.opt').forEach((c) => c.onclick = async () => {
        el.querySelectorAll('.opt').forEach((x) => { x.disabled = true; if (x.textContent === s.fix[0]) x.classList.add('right'); });
        const good = c.textContent === s.fix[0];
        if (good) { Sound.sfx('right'); note(el, true); Sound.say(s.fix[0]); await wait(1800); return done([1, 1]); }
        c.classList.add('wrong'); Sound.sfx('almost'); note(el, false, s.fix[0]); Sound.say(s.fix[0]);
        await next(el); done([0, 1]);
      });
    });
  });

  R.match = (el, s) => new Promise((done) => {
    const right = shuffle(s.pairs.map((p, i) => [p[1], i]));
    el.innerHTML = head(s.q) + `<div class="match"><div class="col">${s.pairs.map((p, i) => `<button class="opt l" type="button" data-i="${i}">${esc(p[0])}</button>`).join('')}</div>
      <div class="col">${right.map(([t, i]) => `<button class="opt r" type="button" data-i="${i}">${esc(t)}</button>`).join('')}</div></div>`;
    Sound.say(s.q);
    let sel = null, left = s.pairs.length;
    const miss = new Set();
    el.querySelectorAll('.l').forEach((b) => b.onclick = () => { el.querySelectorAll('.l').forEach((x) => x.classList.remove('sel')); b.classList.add('sel'); sel = b; Sound.sfx('pop'); Sound.say(b.textContent); });
    el.querySelectorAll('.r').forEach((b) => b.onclick = async () => {
      if (!sel) { shake(b); return; }
      if (sel.dataset.i === b.dataset.i) {
        Sound.sfx('right'); [sel, b].forEach((x) => { x.classList.remove('sel'); x.classList.add('right'); x.disabled = true; });
        sel = null;
        if (--left === 0) { note(el, true); await wait(900); done([s.pairs.length - miss.size, s.pairs.length]); }
      } else { Sound.sfx('almost'); miss.add(sel.dataset.i); shake(b); }
    });
  });

  R.order = (el, s) => new Promise((done) => {
    const name = (p) => p[0].toUpperCase() + p.slice(1);
    el.innerHTML = head(s.q) + `<div class="slots">${s.items.map((_, i) => `<span class="slot" data-n="${i + 1}"></span>`).join('')}</div>
      <div class="pool">${shuffle(s.items).map((p) => `<button class="planet" type="button" data-p="${p}">${Art.body(p, '', { still: true })}<span>${name(p)}</span></button>`).join('')}</div>`;
    Sound.say(s.q);
    let k = 0; const miss = new Set();
    el.querySelectorAll('.planet').forEach((b) => b.onclick = async () => {
      if (b.dataset.p !== s.items[k]) { Sound.sfx('almost'); miss.add(k); shake(b); return; }
      Sound.sfx('right'); Sound.say(name(b.dataset.p));
      const slot = el.querySelectorAll('.slot')[k]; slot.innerHTML = Art.body(b.dataset.p, '', { still: true }); slot.classList.add('on');
      b.disabled = true; b.classList.add('used');
      if (++k === s.items.length) { note(el, true); await wait(1200); done([s.items.length - miss.size, s.items.length]); }
    });
  });

  R.sort = (el, s) => new Promise((done) => {
    const items = shuffle(s.items);
    let i = 0, got = 0;
    el.innerHTML = head(s.q) + `<div class="card" aria-live="polite"></div><div class="opts two">${s.bins.map((b, k) => `<button class="opt bin" type="button" data-k="${k}">${esc(b)}</button>`).join('')}</div><div class="bins">${s.bins.map((_, k) => `<div class="pile" data-k="${k}"></div>`).join('')}</div>`;
    const card = el.querySelector('.card');
    const show = () => { const [t, , ic] = items[i]; card.innerHTML = `${Art.icon(ic)}<b>${esc(t)}</b>`; card.classList.remove('in'); void card.offsetWidth; card.classList.add('in'); };
    show(); Sound.say(s.q);
    el.querySelectorAll('.bin').forEach((b) => b.onclick = async () => {
      const [t, k, ic] = items[i];
      el.querySelectorAll('.bin').forEach((x) => (x.disabled = true));
      if (+b.dataset.k === k) { got++; Sound.sfx('right'); await wait(500); }
      else { Sound.sfx('almost'); b.classList.add('wrong'); el.querySelector(`.bin[data-k="${k}"]`).classList.add('right'); const fix = `${t}: ${s.bins[k].toLowerCase()}.`; Sound.say(fix); await wait(1800); }
      el.querySelector(`.pile[data-k="${k}"]`).insertAdjacentHTML('beforeend', Art.icon(ic));
      if (++i === items.length) { note(el, got === items.length); await wait(900); return done([got, items.length]); }
      el.querySelectorAll('.bin').forEach((x) => { x.disabled = false; x.classList.remove('wrong', 'right'); });
      show();
    });
  });

  R.label = (el, s) => new Promise((done) => {
    const sp = Object.fromEntries(s._stop.sparks.map((k) => [k.id, k]));
    el.innerHTML = head(s.q) + `<div class="labelwrap">${Art.scene(s._stop.id)}${s.targets.map((t, i) => `<span class="pin" data-i="${i}" style="left:${(sp[t.spark].x / 8).toFixed(1)}%;top:${(sp[t.spark].y / 4.5).toFixed(1)}%">${i + 1}</span>`).join('')}</div>
      <p class="ask"></p><div class="opts">${shuffle(s.opts).map((o) => `<button class="opt" type="button">${esc(o)}</button>`).join('')}</div>`;
    Sound.say(s.q);
    let i = 0, got = 0;
    const ask = () => { el.querySelectorAll('.pin').forEach((p, k) => p.classList.toggle('now', k === i)); el.querySelector('.ask').textContent = `Number ${i + 1}: which sphere is it?`; };
    ask();
    el.querySelectorAll('.opt').forEach((b) => b.onclick = async () => {
      const t = s.targets[i], pin = el.querySelectorAll('.pin')[i];
      el.querySelectorAll('.opt').forEach((x) => (x.disabled = true));
      if (b.textContent === t.a) { got++; Sound.sfx('right'); Sound.say(t.a); }
      else { Sound.sfx('almost'); b.classList.add('wrong'); Sound.say(`It is the ${t.a}.`); }
      pin.textContent = t.a; pin.classList.add('done'); pin.classList.toggle('miss', b.textContent !== t.a);
      await wait(b.textContent === t.a ? 900 : 2000);
      if (++i === s.targets.length) { el.querySelector('.ask').textContent = ''; note(el, got === s.targets.length); await wait(900); return done([got, s.targets.length]); }
      el.querySelectorAll('.opt').forEach((x) => { x.disabled = false; x.classList.remove('wrong'); });
      ask();
    });
  });

  R.paint = (el, s) => new Promise((done) => {
    const C = { yellow: '#ffd84a', gray: '#7d8296', blue: '#2f80ed' };
    el.innerHTML = head(s.q) + `<div class="moons">${['full', 'new'].map((m) => `<button class="moonbtn" type="button" data-m="${m}"><svg viewBox="-60 -60 120 120" aria-hidden="true"><circle r="52" fill="#16205a" stroke="#fff" stroke-width="3" stroke-dasharray="6 6"/></svg><span>${m === 'full' ? 'Full moon' : 'New moon'}</span></button>`).join('')}</div>
      <div class="paints">${Object.entries(C).map(([k, c]) => `<button class="paint" type="button" data-c="${k}" style="--c:${c}" aria-label="${k}"></button>`).join('')}</div><p class="ask">Pick a color, then tap a moon.</p>`;
    Sound.say(s.q);
    let color = null; const got = {};
    el.querySelectorAll('.paint').forEach((b) => b.onclick = () => { el.querySelectorAll('.paint').forEach((x) => x.classList.remove('sel')); b.classList.add('sel'); color = b.dataset.c; Sound.sfx('pop'); Sound.say(color); });
    el.querySelectorAll('.moonbtn').forEach((b) => b.onclick = async () => {
      if (!color) { shake(el.querySelector('.paints')); return; }
      b.querySelector('circle').setAttribute('fill', C[color]); b.querySelector('circle').removeAttribute('stroke-dasharray');
      got[b.dataset.m] = color; Sound.sfx('pop');
      if (Object.keys(got).length < 2) return;
      el.querySelectorAll('button').forEach((x) => (x.disabled = true));
      const ok = { full: got.full === 'yellow', new: got.new === 'gray' };
      const n = ok.full + ok.new;
      if (n === 2) { Sound.sfx('right'); note(el, true, 'Full moon yellow, new moon gray.'); Sound.say('Full moon: yellow. New moon: gray.'); await wait(2200); return done([2, 2]); }
      Sound.sfx('almost');
      el.querySelector('.moonbtn[data-m="full"] circle').setAttribute('fill', C.yellow);
      el.querySelector('.moonbtn[data-m="new"] circle').setAttribute('fill', C.gray);
      note(el, false, 'Full moon: yellow. New moon: gray.'); Sound.say('Full moon: yellow. New moon: gray.');
      await next(el); done([n, 2]);
    });
  });

  // ---------- Escritura: fichas (1), letra que falta (2), teclado (3) y dictado ----------
  function keyboard(onKey) {
    const k = h(`<div class="kb">${['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map((r, i) => `<div class="kr">${[...r].map((c) => `<button class="key" type="button" data-k="${c}">${c}</button>`).join('')}${i === 2 ? '<button class="key del" type="button" data-k="del" aria-label="Delete">⌫</button>' : ''}</div>`).join('')}</div>`);
    k.querySelectorAll('.key').forEach((b) => b.onclick = () => { Sound.sfx('pop'); onKey(b.dataset.k); });
    return k;
  }
  const diff = (typed, word) => [...word].map((c, i) => `<span class="${typed[i] === c ? '' : 'fix'}">${c}</span>`).join('');

  R.spell = (el, s) => new Promise((done) => {
    const W = s.word, L = s.level || 1;
    const sayWord = () => Sound.say(W.toLowerCase(), 'slow');
    const top = `<div class="clue">${s.listen ? '<p>Listen and write.</p>' : `<p>${esc(s.clue)}</p>`}<button class="spk big" type="button" aria-label="Listen">🔊</button></div>`;
    const listenBtn = () => el.querySelector('.clue .spk').onclick = () => (s.listen || L < 3 ? sayWord() : Sound.say(s.clue));

    if (L === 2) {
      el.innerHTML = top + `<div class="word">${[...W].map(() => '<span class="cell"></span>').join('')}</div><p class="ask">Tap the letters in order.</p><div class="tiles">${shuffle([...W]).map((c) => `<button class="tile" type="button">${c}</button>`).join('')}</div>`;
      listenBtn(); Sound.say(s.clue);
      let i = 0, miss = 0;
      el.querySelectorAll('.tile').forEach((b) => b.onclick = async () => {
        if (b.textContent !== W[i]) { miss++; Sound.sfx('almost'); shake(b); return; }
        Sound.sfx('pop'); b.disabled = true; b.classList.add('used');
        el.querySelectorAll('.cell')[i].textContent = W[i];
        if (++i === W.length) { Sound.sfx(miss ? 'almost' : 'right'); note(el, !miss, W); sayWord(); await wait(1400); done([miss ? 0 : 1, 1]); }
      });
      return;
    }

    if (L === 1) {
      const vow = [...W].map((c, i) => i).filter((i) => i > 0 && 'AEIOUY'.includes(W[i]));
      const gap = vow.length ? vow[Math.floor(Math.random() * vow.length)] : W.length - 1;
      const opts = shuffle([W[gap], ...shuffle([...'AEIOU'].filter((c) => c !== W[gap])).slice(0, 2)]);
      el.innerHTML = top + `<div class="word">${[...W].map((c, i) => `<span class="cell ${i === gap ? 'gap' : 'on'}">${i === gap ? '?' : c}</span>`).join('')}</div><p class="ask">Which letter is missing?</p><div class="opts three">${opts.map((c) => `<button class="opt letter" type="button">${c}</button>`).join('')}</div>`;
      listenBtn(); Sound.say(s.clue);
      el.querySelectorAll('.opt').forEach((b) => b.onclick = async () => {
        el.querySelectorAll('.opt').forEach((x) => (x.disabled = true));
        const cell = el.querySelector('.gap'); cell.textContent = W[gap]; cell.classList.add('on');
        if (b.textContent === W[gap]) { Sound.sfx('right'); note(el, true, W); sayWord(); await wait(1400); return done([1, 1]); }
        b.classList.add('wrong'); Sound.sfx('almost'); note(el, false, `${W} has ${W[gap]}.`); sayWord();
        await next(el); done([0, 1]);
      });
      return;
    }

    // Nivel 3 y dictado: teclado de la app (sin autocorrector del teléfono).
    let typed = '', tries = 0, help = false;
    el.innerHTML = top + `<div class="typed" role="textbox" aria-label="Your answer"></div><div class="row">${s.noHelp ? '' : '<button class="btn ghost" type="button" data-help>💡 Help</button>'}<button class="btn" type="button" data-check>Check</button></div>`;
    const box = el.querySelector('.typed');
    const draw = () => (box.innerHTML = [...typed].map((c, i) => `<span class="${help && i === 0 ? 'gift' : ''}">${c}</span>`).join('') + '<i class="caret"></i>');
    const kb = keyboard((k) => { if (k === 'del') typed = typed.slice(0, -1); else if (typed.length < W.length + 3) typed += k; draw(); });
    el.append(kb); draw(); listenBtn();
    if (s.listen) sayWord(); else Sound.say(s.clue);
    if (!s.noHelp) el.querySelector('[data-help]').onclick = () => {
      let i = 0; while (i < typed.length && typed[i] === W[i]) i++;
      if (i >= W.length) return;
      help = true; typed = W.slice(0, i + 1); draw(); Sound.sfx('pop');
    };
    el.querySelector('[data-check]').onclick = async () => {
      if (!typed) { shake(box); return; }
      tries++;
      if (typed === W) {
        Sound.sfx('right'); kb.remove(); note(el, true, W); sayWord();
        el.querySelector('.row').remove(); await wait(1400); return done([tries === 1 && !help ? 1 : 0, 1]);
      }
      Sound.sfx('almost');
      const missing = W.length - typed.length;
      const msg = missing > 0 && W.startsWith(typed.slice(0, 1)) ? (missing === 1 ? 'One letter is missing.' : `${missing} letters are missing.`) : 'Look at the yellow letters.';
      note(el, false, msg);
      el.querySelector('.fb').insertAdjacentHTML('beforeend', `<span class="diff">${diff(typed, W)}</span>`);
      sayWord();
      if (tries >= 2) { kb.remove(); el.querySelector('.row').remove(); await next(el); return done([0, 1]); }
      el.querySelector('[data-check]').textContent = 'Try again';
      typed = ''; draw();
    };
  });
  R.listen = (el, s) => R.spell(el, { ...s, level: 3, listen: true });

  // Juega una lista de pasos. onStep(i, n) antes de cada paso; devuelve [[got, max], …].
  async function play(el, steps, { onStep, onScore } = {}) {
    const res = [];
    for (let i = 0; i < steps.length; i++) {
      onStep?.(i, steps.length, steps[i]);
      el.innerHTML = '';
      el.classList.remove('in'); void el.offsetWidth; el.classList.add('in');
      const r = await R[steps[i].type](el, steps[i]);
      Sound.stop();
      res.push(r);
      onScore?.(r);
    }
    return res;
  }
  document.addEventListener('click', (e) => { const b = e.target.closest('.spk[data-say]'); if (b) Sound.say(b.dataset.say, b.dataset.who); });

  return { play, shuffle };
})();
