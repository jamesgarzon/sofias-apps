// Pantallas: inicio, mapa, parada (escena + chispas), juegos, The Big Review, misión de la mascota, mis mascotas, regalo y nuevo día.
(() => {
  const D = window.DATA, { esc } = Art;
  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app');

  // ---------- Progreso (localStorage) ----------
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(`ingles-${k}`)) ?? d; } catch (e) { return d; } };
  const save = (k, v) => { try { localStorage.setItem(`ingles-${k}`, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } };
  const P = { seen: load('seen', {}), stamps: load('stamps', {}), best: load('best', {}), friends: load('friends', ['biscuit']), missed: load('missed', []), write: load('write', {}),
    pilot: load('pilot', 'biscuit'), bank: load('bank', 0), prize: load('prize', false) };
  // Cada día nuevo (como un «rebirth») guarda las estrellas en `bank`; las del día se multiplican por la `x` de la mascota ayudante.
  const pilot = () => D.friends.find((f) => f.id === P.pilot);
  const stars = () => P.bank + Object.values(P.best).reduce((a, b) => a + b, 0) * pilot().x;
  const keep = (k) => { save(k, P[k]); if (k === 'best') save('stars', stars()); };

  const stopById = (id) => D.stops.find((s) => s.id === id);
  const stopIndex = (id) => D.stops.findIndex((s) => s.id === id);
  const open = (stop) => stopIndex(stop.id) === 0 || P.stamps[D.stops[stopIndex(stop.id) - 1].id];
  const stamps = () => D.stops.filter((s) => P.stamps[s.id]).length;
  const nextFriend = () => D.friends.find((f) => !P.friends.includes(f.id) && stars() >= f.stars);

  // Pasos con su clave (para la misión) y la parada (para el juego de rotular).
  function steps(stop, game, level) {
    if (game.write) return Games.shuffle(game.write).map((w) => ({ type: 'spell', level, ...w, key: `${stop.id}/write/${w.word}` }));
    return Games.shuffle(game.steps.map((s, i) => ({ ...s, _stop: stop, key: `${stop.id}/${game.id}/${i}` })));
  }
  function resolve(key) {
    if (key.startsWith('review/')) { const r = D.review[key.split('/')[1]]; return r && !r.ref && { ...r, key }; }
    const [st, g, i] = key.split('/'), stop = stopById(st), game = stop?.games.find((x) => x.id === g);
    if (!game) return null;
    if (game.write) { const w = game.write.find((x) => x.word === i); return w && { type: 'spell', level: Math.max(2, P.write[st] || 1), ...w, key }; }
    return game.steps[i] && { ...game.steps[i], _stop: stop, key };
  }
  const reviewSteps = () => D.review.map((r, i) => ({ ...(r.ref ? { ...resolve(r.ref), title: r.title } : { ...r, key: `review/${i}` }), noHelp: true }));
  const writeKey = (stop, L) => `${stop.id}/write/L${L}`;
  const bestOf = (stop, game) => (game.write ? [1, 2, 3].reduce((a, L) => a + (P.best[writeKey(stop, L)] || 0), 0) : P.best[`${stop.id}/${game.id}`] || 0);
  const pts = (s) => ({ match: s.pairs?.length, sort: s.items?.length, label: s.targets?.length }[s.type] || 1);
  // New day se abre con el 70 % de The Big Review.
  const dayOpen = () => (P.best.review || 0) >= Math.ceil(reviewSteps().reduce((a, s) => a + pts(s), 0) * 0.7);
  const maxOf = (game) => (game.write ? game.write.length * 3 : game.steps.reduce((a, s) => a + pts(s), 0));

  // ---------- Encabezado ----------
  function header(title, back) {
    return `<header class="top">${back ? `<button class="round" type="button" data-back aria-label="Back">‹</button>` : '<span class="logo">🏡</span>'}
      <h1>${esc(title)}</h1><span class="pill" aria-label="${stars()} stars">⭐ ${stars()}${pilot().x > 1 ? ` · ×${pilot().x}` : ''}</span>
      <button class="round" type="button" data-mute aria-label="Sound on or off">${Sound.isMuted() ? '🔇' : '🔊'}</button></header>`;
  }
  function wire(back) {
    const b = $('[data-back]'); if (b) b.onclick = () => { Sound.stop(); Sound.sfx('pop'); back(); };
    $('[data-mute]').onclick = (e) => { e.currentTarget.textContent = Sound.toggle() ? '🔇' : '🔊'; };
  }
  const go = (html) => { Sound.stop(); Sound.hush(); app.innerHTML = html; window.scrollTo(0, 0); };

  // ---------- Inicio ----------
  function start() {
    go(`<section class="splash">${Art.town()}
      <div class="hello">${Art.friend(P.pilot, 'big')}<h1>Helper Town</h1><p>Exam: ${esc(D.meta.exam)}</p>
      <button class="btn big" type="button" data-go>Let’s go! 🏡</button></div></section>`);
    $('[data-go]').onclick = () => { Sound.sfx('whoosh'); map(); P.pilot === 'biscuit' ? Sound.say(D.say.hello, 'biscuit') : Sound.say(pilot().line, P.pilot); };
  }

  // ---------- Mapa ----------
  function map() {
    const cur = D.stops.find((s) => !P.stamps[s.id]);
    const fr = nextFriend(), nx = D.friends.find((f) => !P.friends.includes(f.id) && stars() < f.stars);
    const review = stamps() === D.stops.length, pl = pilot();
    go(header('Helper Town') + `<main class="map">
      ${dayOpen() ? `<button class="chest-card trip" type="button" data-trip><span class="chest">☀️</span><b>New day!</b><small>Choose a helper pet that gives more stars.</small></button>` : ''}
      ${fr ? `<button class="chest-card" type="button" data-chest><span class="chest">🎁</span><b>Open the gift!</b><small>A new pet is waiting.</small></button>` : ''}
      ${P.friends.includes('juana') ? `<button class="chest-card exam" type="button" data-exam><span class="chest">${P.prize ? '🏆' : '📝'}</span><b>${P.prize ? 'You are a super helper!' : 'Final exam'}</b><small>${P.prize ? 'See your prize.' : 'Juana has a final exam for you.'}</small></button>` : ''}
      <div class="path">${D.stops.map((s, i) => {
        const ok = open(s), done = P.stamps[s.id];
        return `<button class="stop ${done ? 'done' : ''} ${ok ? '' : 'locked'} ${i % 2 ? 'r' : 'l'}" type="button" data-stop="${s.id}">
          <span class="globe">${Art.stopIcon(s.icon)}${s === cur ? Art.marker : ''}</span>
          <span class="name"><small>Stop ${i + 1}</small>${esc(s.title)}</span><span class="badge">${done ? '🛂' : ok ? '' : '🔒'}</span></button>`;
      }).join('')}
        <button class="stop review ${review ? '' : 'locked'}" type="button" data-review><span class="globe star">★</span>
          <span class="name"><small>${stamps()}/${D.stops.length} stamps</small>The Big Review</span><span class="badge">${review ? (P.best.review != null ? `⭐ ${P.best.review}` : '') : '🔒'}</span></button>
      </div>
      <div class="copilot">${Art.friend(pl.id)}<div><b>${esc(pl.name)} <span class="boost">⭐ ×${pl.x}</span></b><p>${P.missed.length ? `Mission: practice what you missed (${P.missed.length}).` : 'No mission now. Keep helping!'}</p>${nx && !fr ? `<small class="goal">🎁 Next gift: ⭐ ${stars()} / ${nx.stars}</small>` : ''}
        <div class="row"><button class="btn small" type="button" data-mission ${P.missed.length ? '' : 'disabled'}>Mission</button><button class="btn small ghost" type="button" data-crew>My pets</button></div></div></div>
    </main>`);
    wire();
    app.querySelectorAll('[data-stop]').forEach((b) => b.onclick = () => {
      const s = stopById(b.dataset.stop);
      if (!open(s)) { Sound.sfx('almost'); Sound.say(D.say.stopLocked); return; }
      Sound.sfx('whoosh'); stop(s);
    });
    $('[data-review]').onclick = () => { if (!review) { Sound.sfx('almost'); Sound.say(D.say.reviewLocked); return; } Sound.sfx('whoosh'); bigReview(); };
    $('[data-mission]').onclick = mission;
    $('[data-crew]').onclick = crew;
    if (fr) $('[data-chest]').onclick = () => chest(fr);
    if (dayOpen()) $('[data-trip]').onclick = trip;
    if (P.friends.includes('juana')) $('[data-exam]').onclick = () => (P.prize ? prize() : examIntro());
  }

  // ---------- Parada ----------
  function stop(s) {
    const seen = new Set(P.seen[s.id] || []);
    const stamped = !!P.stamps[s.id];
    go(header(s.title, true) + `<main class="stopview">
      <div class="scenewrap">${Art.scene(s.id)}${s.sparks.map((k) => `<button class="spark ${seen.has(k.id) ? 'seen' : ''}" type="button" data-k="${k.id}" style="left:${(k.x / 8).toFixed(1)}%;top:${(k.y / 4.5).toFixed(1)}%" aria-label="${esc(k.title)}">✨</button>`).join('')}</div>
      <p class="hint">${stamped ? 'You have the stamp 🛂. Play the games!' : `Tap the sparks ✨ (${seen.size}/${s.sparks.length})`}</p>
      <div class="games">${s.games.map((g) => `<button class="game ${stamped ? '' : 'locked'}" type="button" data-g="${g.id}"><b>${stamped ? '' : '🔒 '}${esc(g.title)}${g.write ? ` · Level ${P.write[s.id] || 1}` : ''}</b><span>⭐ ${bestOf(s, g)}/${maxOf(g)}</span></button>`).join('')}</div>
    </main>`);
    wire(map);
    app.querySelectorAll('.spark').forEach((b) => b.onclick = () => spark(s, s.sparks.find((k) => k.id === b.dataset.k)));
    app.querySelectorAll('[data-g]').forEach((b) => b.onclick = () => {
      if (!P.stamps[s.id]) { Sound.sfx('almost'); Sound.say(D.say.locked); return; }
      const g = s.games.find((x) => x.id === b.dataset.g);
      g.write ? writeLevels(s, g) : game(s, g);
    });
  }

  // Chispa: historia animada + voz. La primera vez el botón espera a que terminen las dos.
  function spark(s, k) {
    const first = !(P.seen[s.id] || []).includes(k.id);
    const st = Art.story(s.id, k);
    const sheet = document.createElement('div');
    sheet.className = 'sheet';
    sheet.innerHTML = `<div class="panel" role="dialog" aria-modal="true" aria-label="${esc(k.title)}">${st.svg}<h2>${esc(k.title)}</h2><p>${esc(k.text)}</p>
      <div class="row"><button class="btn ghost" type="button" data-again>🔊 Again</button><button class="btn" type="button" data-close ${first ? 'disabled' : ''}>${first ? 'Listen…' : 'Close'}</button></div></div>`;
    document.body.append(sheet);
    Sound.sfx('star');
    const close = $('[data-close]', sheet);
    let voice = Sound.say(k.text);
    const min = new Promise((r) => setTimeout(r, Math.max(st.ms, k.text.length * 50)));
    (async () => { await min; let v; do { v = voice; await v; } while (v !== voice); close.disabled = false; close.textContent = 'Got it!'; })();
    $('[data-again]', sheet).onclick = () => { voice = Sound.say(k.text); };
    close.onclick = () => {
      Sound.stop(); sheet.remove();
      const seen = new Set(P.seen[s.id] || []); seen.add(k.id); P.seen[s.id] = [...seen]; keep('seen');
      if (!P.stamps[s.id] && seen.size === s.sparks.length) {
        P.stamps[s.id] = true; keep('stamps'); stop(s); Sound.sfx('chest'); Sound.say(D.say.stamp);
        $('.hint')?.classList.add('stamp-anim');
      } else stop(s);
    };
  }

  // ---------- Juegos ----------
  function runner(title, back) {
    go(header(title, true) + `<main class="gameview"><div class="progress"><i></i></div><p class="steptitle"></p><div class="stage"></div></main>`);
    wire(back);
    return { stage: $('.stage'), onStep: (i, n, st) => { $('.progress i').style.width = `${(i / n) * 100}%`; $('.steptitle').textContent = st.title || `${i + 1} / ${n}`; } };
  }
  function trackMissed(list, res) {
    const m = new Set(P.missed);
    list.forEach((st, i) => { if (!st.key) return; res[i][0] < res[i][1] ? m.add(st.key) : m.delete(st.key); });
    P.missed = [...m]; keep('missed');
  }
  function result(got, max, again, back, extra = '') {
    const msg = got === max ? 'Perfect!' : got >= max * 0.7 ? 'Great job!' : 'Good try! Keep practicing.';
    go(header('Mission complete', true) + `<main class="result"><div class="big-stars">⭐</div><h2>${got} / ${max}</h2><p>${msg}</p>${extra}
      <div class="row"><button class="btn ghost" type="button" data-again>Play again</button><button class="btn" type="button" data-done>Back</button></div></main>`);
    wire(back);
    Sound.sfx(got === max ? 'chest' : 'star'); Sound.say(msg);
    $('[data-again]').onclick = again; $('[data-done]').onclick = back;
  }
  // Guarda el mejor puntaje y dice cuántas estrellas nuevas ganó (ya multiplicadas).
  function award(k, got) {
    const x = pilot().x, add = Math.max(0, got - (P.best[k] || 0)) * x;
    P.best[k] = Math.max(P.best[k] || 0, got); keep('best');
    return add ? `<p class="unlock">+${add} ⭐${x > 1 ? ` (×${x} with ${esc(pilot().name)})` : ''}</p>` : '';
  }
  async function game(s, g) {
    const list = steps(s, g);
    const r = runner(g.title, () => stop(s));
    const res = await Games.play(r.stage, list, { onStep: r.onStep });
    if (!r.stage.isConnected) return;
    const got = res.reduce((a, x) => a + x[0], 0), max = res.reduce((a, x) => a + x[1], 0);
    const won = award(`${s.id}/${g.id}`, got);
    trackMissed(list, res);
    result(got, max, () => game(s, g), () => stop(s), won);
  }
  function writeLevels(s, g) {
    const top = P.write[s.id] || 1;
    const names = ['Missing letter', 'Letter tiles', 'Keyboard'];
    go(header('Write it!', true) + `<main class="levels">${names.map((n, i) => `<button class="game ${i + 1 > top ? 'locked' : ''}" type="button" data-l="${i + 1}"><b>${i + 1 > top ? '🔒 ' : ''}Level ${i + 1} · ${n}</b><span>⭐ ${P.best[writeKey(s, i + 1)] || 0}/${g.write.length}</span></button>`).join('')}
      <p class="hint">Get ${Math.ceil(g.write.length * 0.7)} stars in a level to open the next one.</p></main>`);
    wire(() => stop(s));
    app.querySelectorAll('[data-l]').forEach((b) => b.onclick = async () => {
      const L = +b.dataset.l;
      if (L > top) { Sound.sfx('almost'); Sound.say('Finish the level before this one first.'); return; }
      const list = steps(s, g, L);
      const r = runner(`Write it! · Level ${L}`, () => writeLevels(s, g));
      const res = await Games.play(r.stage, list, { onStep: r.onStep });
      if (!r.stage.isConnected) return;
      const got = res.reduce((a, x) => a + x[0], 0);
      let extra = award(writeKey(s, L), got);
      trackMissed(list, res);
      if (L === top && L < 3 && got >= Math.ceil(g.write.length * 0.7)) { P.write[s.id] = L + 1; keep('write'); extra += `<p class="unlock">Level ${L + 1} is open! 🔓</p>`; }
      result(got, list.length, () => b.onclick(), () => writeLevels(s, g), extra);
    });
  }
  async function bigReview() {
    const list = reviewSteps();
    const r = runner('The Big Review', map);
    const res = await Games.play(r.stage, list, { onStep: r.onStep });
    if (!r.stage.isConnected) return;
    const got = res.reduce((a, x) => a + x[0], 0), max = res.reduce((a, x) => a + x[1], 0);
    const wasOpen = dayOpen();
    const won = award('review', got);
    trackMissed(list, res);
    const party = won + (dayOpen() ? (wasOpen ? '' : `<div class="party">${P.friends.map((f) => Art.friend(f)).join('')}</div><p>Your pets are so proud of you!</p><p class="unlock">New day is open! ☀️</p>`)
      : `<p class="unlock">Get ${Math.ceil(max * 0.7)} / ${max} to open New day ☀️</p>`);
    result(got, max, bigReview, map, party);
  }
  async function mission() {
    const list = Games.shuffle(P.missed).slice(0, 6).map(resolve).filter(Boolean);
    if (!list.length) { Sound.say(D.say.noMission, P.pilot); return; }
    const r = runner(`${pilot().name}’s mission`, map);
    $('.gameview').insertAdjacentHTML('afterbegin', `<div class="copilot mini">${Art.friend(P.pilot)}<p>${esc(D.say.mission)}</p></div>`);
    Sound.say(D.say.mission, P.pilot);
    const res = await Games.play(r.stage, list, { onStep: r.onStep });
    if (!r.stage.isConnected) return;
    trackMissed(list, res);
    const got = res.reduce((a, x) => a + x[0], 0), max = res.reduce((a, x) => a + x[1], 0);
    result(got, max, mission, map, `<p>${P.missed.length ? `${P.missed.length} left to practice.` : 'All clear! 🎉'}</p>`);
  }

  // ---------- Amigos ----------
  function crew() {
    go(header('My pets', true) + `<main class="crew">${D.friends.map((f) => {
      const got = P.friends.includes(f.id);
      return `<button class="mate ${got ? '' : 'locked'}" type="button" data-f="${f.id}">${got ? Art.friend(f.id) : `<span class="shadow">${Art.friend(f.id)}</span>`}
        <b>${got ? esc(f.name) : '???'}</b>${f.x ? `<span class="boost">⭐ ×${f.x}</span>` : ''}<small>${f.id === P.pilot ? 'Helper 🐾' : got ? esc(f.kind) : `at ${f.stars} stars`}</small></button>`;
    }).join('')}</main>`);
    wire(map);
    app.querySelectorAll('[data-f]').forEach((b) => b.onclick = () => {
      const f = D.friends.find((x) => x.id === b.dataset.f);
      if (!P.friends.includes(f.id)) { Sound.sfx('almost'); Sound.say(`Get ${f.stars} stars to meet this pet.`); return; }
      postcard(f, crew);
    });
  }
  function postcard(f, back) {
    go(header(f.name, true) + `<main class="postcard"><div class="card-art">${Art.friend(f.id, 'big')}</div><div class="paper"><p>${esc(f.card)}</p><small>— ${esc(f.name)}</small></div>
      <div class="row"><button class="btn ghost" type="button" data-again>🔊 Again</button><button class="btn" type="button" data-done>Back</button></div></main>`);
    wire(back);
    const read = () => Sound.say(f.line, f.id).then(() => Sound.say(f.card, f.id));
    read(); $('[data-again]').onclick = read; $('[data-done]').onclick = back;
  }
  function chest(f) {
    go(header('A new pet!', true) + `<main class="chestview"><button class="chest-big" type="button" aria-label="Open the gift">🎁</button><p>Tap the gift!</p></main>`);
    wire(map);
    Sound.say(D.say.chest);
    $('.chest-big').onclick = (e) => {
      e.currentTarget.classList.add('open'); Sound.sfx('chest');
      if (!P.friends.includes(f.id)) { P.friends.push(f.id); keep('friends'); }
      setTimeout(() => postcard(f, map), 900);
    };
  }

  // ---------- Nuevo día ----------
  function trip() {
    go(header('New day', true) + `<main class="crew"><p class="hint span">Choose a new helper pet. The town starts again, but you keep your stars and your pets. Your helper multiplies every new star!</p>
      ${D.friends.filter((f) => f.x && f.id !== P.pilot).map((f) => {
        const got = P.friends.includes(f.id);
        return `<button class="mate ${got ? '' : 'locked'}" type="button" data-f="${f.id}">${got ? Art.friend(f.id) : `<span class="shadow">${Art.friend(f.id)}</span>`}
          <b>${got ? esc(f.name) : '???'}</b><span class="boost">⭐ ×${f.x}</span>${got ? '' : `<small>at ${f.stars} stars</small>`}</button>`;
      }).join('')}</main>`);
    wire(map);
    Sound.say(D.say.trip);
    app.querySelectorAll('[data-f]').forEach((b) => b.onclick = () => {
      const f = D.friends.find((y) => y.id === b.dataset.f);
      if (!P.friends.includes(f.id)) { Sound.sfx('almost'); Sound.say(`Get ${f.stars} stars to meet this pet.`); return; }
      board(f);
    });
  }
  function board(f) {
    go(header(f.name, true) + `<main class="postcard"><div class="card-art">${Art.friend(f.id, 'big')}</div><div class="paper"><p>Help with ${esc(f.name)}? The town starts again. Every new star is worth ×${f.x}!</p></div>
      <div class="row"><button class="btn ghost" type="button" data-done>Not now</button><button class="btn" type="button" data-go>Let’s go! ☀️</button></div></main>`);
    wire(trip);
    Sound.say(f.line, f.id);
    $('[data-done]').onclick = trip;
    $('[data-go]').onclick = () => {
      P.bank = stars(); P.pilot = f.id;
      Object.assign(P, { seen: {}, stamps: {}, best: {}, write: {} });
      ['bank', 'pilot', 'seen', 'stamps', 'best', 'write'].forEach(keep);
      Sound.sfx('chest'); map(); Sound.say(D.say.newTrip);
    };
  }

  // ---------- Examen final (Juana, a las 1000 estrellas) ----------
  function examIntro() {
    go(header('Final exam', true) + `<main class="postcard"><div class="card-art">${Art.friend('juana', 'big')}</div><div class="paper"><p>${esc(D.say.exam)}</p><small>— Juana</small></div>
      <div class="row"><button class="btn ghost" type="button" data-done>Not now</button><button class="btn" type="button" data-go>Start! 📝</button></div></main>`);
    wire(map);
    Sound.say(D.say.exam, 'juana');
    $('[data-done]').onclick = map;
    $('[data-go]').onclick = finalExam;
  }
  async function finalExam() {
    const list = Games.shuffle(reviewSteps());
    const r = runner('Final exam', map);
    const res = await Games.play(r.stage, list, { onStep: r.onStep });
    if (!r.stage.isConnected) return;
    trackMissed(list, res);
    const got = res.reduce((a, x) => a + x[0], 0), max = res.reduce((a, x) => a + x[1], 0);
    if (got >= Math.ceil(max * 0.7)) { P.prize = true; keep('prize'); return examMovie(); }
    result(got, max, examIntro, map, `<p>You need ${Math.ceil(max * 0.7)} to win the prize.</p>`);
    Sound.say(D.say.examAgain, 'juana');
  }
  // Al pasar el examen: la película de Juana y luego el premio.
  function examMovie() {
    go(header('Final exam', true) + `<main class="movie-wrap">${Art.juanaMovie(D.say)}<button class="btn" type="button" data-go disabled>See my prize 🏆</button></main>`);
    wire(map);
    const mv = $('.movie'), btn = $('[data-go]');
    btn.onclick = prize;
    const scenes = ['s1', 's2', 's3', 's4', 's5', 's6'];
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { mv.classList.add(...scenes); btn.disabled = false; Sound.sfx('fanfare'); Sound.say(D.say.didIt, 'juana'); return; }
    const at = (s, f) => setTimeout(() => mv.isConnected && f(), s * 1000);
    [0, 3, 6.2, 9.6, 12.4, 14.4].forEach((s, i) => at(s, () => mv.classList.add(scenes[i])));
    [[0.9, 'juanaReady'], [3.9, 'hmm'], [11, 'amazing'], [15.2, 'didIt']].forEach(([s, k]) => at(s, () => Sound.say(D.say[k], 'juana')));
    Sound.music();
    const fx = [[0, 'woof'], [3, 'whoosh'], [9.6, 'drumroll'], [10.6, 'stamp'], [12.4, 'fanfare'], [14.4, 'woof']];
    for (let i = 0; i < 5; i++) fx.push([6.4 + i * 0.5, 'ding']);
    fx.forEach(([s, k]) => at(s, () => Sound.sfx(k)));
    at(18, () => { btn.disabled = false; });
  }
  function prize() {
    go(header('Your prize!', true) + `<main class="postcard"><div class="trophy">🏆</div><h2 class="champ">Helper Town Super Helper</h2><div class="card-art">${Art.friend('juana', 'big')}</div>
      <div class="paper"><p>${esc(D.say.prize)}</p><small>— Juana</small></div><div class="party">${P.friends.filter((f) => f !== 'juana').map((f) => Art.friend(f)).join('')}</div>
      <div class="row"><button class="btn ghost" type="button" data-again>🔊 Again</button><button class="btn" type="button" data-done>Back</button></div>
      <button class="btn ghost" type="button" data-movie>↺ Watch Juana again</button></main>`);
    wire(map);
    Sound.sfx('chest'); Sound.say(D.say.prize, 'juana');
    $('[data-movie]').onclick = examMovie;
    $('[data-again]').onclick = () => Sound.say(D.say.prize, 'juana');
    $('[data-done]').onclick = map;
  }

  start();
})();
