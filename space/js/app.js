// Núcleo de la app: rutas (#/…), estrellas, Lumi, mapa del sistema solar, planetas, palabras y juegos.
// La parte de la presentación está en talk.js y se registra con App.route().
window.App = (() => {
  const D = window.DATA;
  const esc = Art.esc;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const BODY = Object.fromEntries(D.bodies.map((b) => [b.id, b]));
  const PLANETS = D.bodies.filter((b) => b.n).map((b) => b.id);

  // ---------- Guardado (localStorage con prefijo space-) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem('space-' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('space-' + k, JSON.stringify(v)); } catch (e) { /* modo privado */ } },
  };
  const name = () => (store.get('talk', {}).name || D.meta.name || 'Sofía').trim() || 'Sofía';

  // ---------- Estrellas ----------
  function addStars(key, n) {
    const s = store.get('stars', {});
    if ((s[key] || 0) >= n) return false;
    s[key] = n; store.set('stars', s);
    paintStars(true);
    return true;
  }
  const totalStars = () => Object.values(store.get('stars', {})).reduce((a, b) => a + b, 0);
  function paintStars(bump) {
    const el = $('#starCount');
    if (!el) return;
    el.textContent = totalStars();
    if (bump) { const p = el.parentElement; p.classList.remove('bump'); void p.offsetWidth; p.classList.add('bump'); }
  }
  const starsFor = (mistakes, a = 1, b = 3) => (mistakes <= a ? 3 : mistakes <= b ? 2 : 1);

  // ---------- Efectos ----------
  function confetti(n = 36) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = document.createElement('div');
    box.className = 'confetti';
    const em = ['⭐', '✨', '🪐', '🌍', '🚀', '💫', '🌟'];
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.textContent = pick(em);
      s.style.left = Math.random() * 100 + 'vw';
      s.style.animationDuration = 2 + Math.random() * 2 + 's';
      s.style.animationDelay = Math.random() * 0.6 + 's';
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 5000);
  }
  let toastT;
  function toast(msg) {
    let t = $('#toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600);
  }
  // setTimeout que no hace nada si ya se salió de la pantalla
  const later = (root, fn, ms) => setTimeout(() => { if (root.isConnected) fn(); }, ms);
  const praise = () => pick(['ok-0', 'ok-1', 'ok-2', 'ok-3', 'ok-4', 'ok-5']);
  const oops = () => pick(['bad-0', 'bad-1', 'bad-2']);

  // Lumi con su globo de texto. sayText: lo que lee el botón 🔊 (por defecto, el texto).
  function guide(text, { cls = '', sayText, html } = {}) {
    return `<div class="guide ${cls}">${Art.lumi()}<div class="bubble"><p>${html || esc(text)}</p>
      <button class="say" data-say="${esc(sayText || text)}" aria-label="Listen">🔊</button></div></div>`;
  }

  // ---------- Rutas ----------
  const routes = {};
  let cleanup = null, current = null;
  const view = () => $('#view');
  function route(nameR, fn) { routes[nameR] = fn; }
  function go(path) {
    if (!path.startsWith('/')) path = '/' + path;
    if (location.hash.slice(1) !== path) { current = path; location.hash = path; }
    render(path);
  }
  function render(path) {
    if (cleanup) { try { cleanup(); } catch (e) { console.error(e); } cleanup = null; }
    Voice.stop(); Voice.stopListening(); Voice.Mic.stop();
    current = path;
    const parts = path.replace(/^\/+/, '').split('/').filter(Boolean);
    let key = parts[0] || 'home', args = parts.slice(1);
    if (parts.length > 1 && routes[parts[0] + '/' + parts[1]]) { key = parts[0] + '/' + parts[1]; args = parts.slice(2); }
    const fn = routes[key] || routes.home;
    document.body.dataset.view = key.replace('/', '-');
    const root = document.createElement('div');
    root.className = 'page';
    view().replaceChildren(root);
    window.scrollTo(0, 0);
    try { cleanup = fn(root, ...args) || null; } catch (e) { console.error(e); root.innerHTML = '<p class="card">Oops! Something went wrong.</p>'; }
  }
  window.addEventListener('hashchange', () => { const p = location.hash.slice(1) || '/'; if (p !== current) render(p); });

  // Barra superior: botón atrás y título.
  function top(back, title) {
    const b = $('#backBtn');
    b.hidden = !back;
    b.dataset.go = back || '/';
    $('#topTitle').textContent = title || '';
  }

  // Clics globales: navegar (data-go) y leer en voz alta (data-say).
  document.addEventListener('click', (e) => {
    const g = e.target.closest('[data-go]');
    if (g) { e.preventDefault(); Voice.sfx.tap(); go(g.dataset.go); return; }
    const s = e.target.closest('[data-say]');
    if (s) { e.preventDefault(); Voice.say(s.dataset.say, s.dataset.who || 'guide'); }
  });

  // ---------- Inicio ----------
  route('home', (root) => {
    top(null, '');
    const seen = store.get('seen', {});
    const visited = D.bodies.filter((b) => (seen[b.id] || []).length >= b.facts.length + 1).length;
    const talk = window.Talk ? Talk.summary() : '';
    root.innerHTML = `<section class="home">
      ${guide(`Hi, ${name()}! I am Lumi, an alien from a faraway galaxy. Can you teach me about your solar system, and about your planet, Earth?`, { cls: 'big', sayText: D.say.welcome })}
      <h1 class="title"><span>${esc(name())}'s</span> Space Mission</h1>
      <div class="missions">
        <button class="mission m-explore" data-go="/explore"><div class="m-art">${Art.word('solar')}</div>
          <div class="m-txt"><b>Explore the Planets</b><small>Study the solar system in English</small><span class="m-prog">🪐 ${visited}/${D.bodies.length} visited</span></div></button>
        <button class="mission m-talk" data-go="/talk"><div class="m-art">${Art.body('earth')}</div>
          <div class="m-txt"><b>My Earth Presentation</b><small>Plan · practice · present</small><span class="m-prog">${talk}</span></div></button>
      </div></section>`;
  });

  // ---------- Explorar: mapa del sistema solar ----------
  const MAP_SIZE = { sun: 190, mercury: 34, venus: 50, earth: 52, mars: 40, jupiter: 124, saturn: 168, uranus: 84, neptune: 80, pluto: 22 };
  route('explore', (root) => {
    top('/', 'The Solar System');
    const seen = store.get('seen', {});
    const done = (id) => (seen[id] || []).length >= BODY[id].facts.length + 1;
    const item = (id) => {
      const b = BODY[id];
      const moon = id === 'earth' ? `<span class="mb-moon" data-go="/planet/moon" role="button" aria-label="The Moon">${Art.body('moon')}</span>` : '';
      return `<div class="mb-wrap mb-${id}"><button class="mb" data-go="/planet/${id}" style="--s:${MAP_SIZE[id]}px" aria-label="${esc(b.name)}">
        ${Art.body(id)}${done(id) ? '<span class="mb-done">✓</span>' : ''}</button>${moon}
        <span class="mb-label">${b.n ? `<i>${b.n}</i>` : ''}${esc(b.short || b.name)}</span>${b.kind === 'dwarf' ? '<span class="mb-sub">dwarf planet</span>' : ''}</div>`;
    };
    const rocks = Array.from({ length: 9 }, (_, i) => `<span style="--x:${(i * 37) % 60}px;--y:${(i * 53) % 150}px;--r:${4 + (i % 3) * 3}px"></span>`).join('');
    const games = [
      ['parade', '🚀', 'Planet Parade', 'Put the planets in order'],
      ['quiz', '🕵️', 'Who Am I?', 'Guess the planet from the clues'],
      ['sort', '🗂️', 'Is It a Planet?', 'Rocky or giant? Planet or not?'],
      ['match', '🧩', 'Space Words', 'Match each word with its meaning'],
    ];
    const best = store.get('best', {});
    root.innerHTML = `<section class="explore">
      ${guide(D.say.explore)}
      <div class="map-scroll" tabindex="0" aria-label="Map of the solar system"><div class="map">
        ${item('sun')}${['mercury', 'venus', 'earth', 'mars'].map(item).join('')}
        <div class="belt" aria-label="Asteroid belt"><div class="rocks">${rocks}</div><span class="mb-label">Asteroid belt</span></div>
        ${['jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].map(item).join('')}
      </div></div>
      <p class="hint">👉 Swipe to see every planet. Tap one to visit it! <span>(Sizes are not to scale.)</span></p>
      <div class="card mnemonic"><h3>Remember the order!</h3>
        <div class="mn-row">${D.mnemonic.map(([w, id]) => `<button class="mn" data-say="${esc(BODY[id].name)}"><span class="mn-planet">${Art.body(id, 'still', { still: true })}</span><b><u>${w[0]}</u>${w.slice(1)}</b><small>${BODY[id].name}</small></button>`).join('')}</div>
        <button class="btn ghost" data-say="${esc(D.say.mnemonic)}">🔊 Say it with Lumi</button></div>
      <h2 class="sec">📖 Space words</h2>
      <button class="card wide-link" data-go="/words"><span class="wl-art">${Art.word('rotate')}</span><span><b>Space Words</b><small>orbit, rotate, revolve, gravity… with animations</small></span><span class="go">▶</span></button>
      <h2 class="sec">🎮 Games</h2>
      <div class="games">${games.map(([id, e, t, s]) => `<button class="game-card" data-go="/game/${id}"><span class="ge">${e}</span><b>${t}</b><small>${s}</small><span class="gstars">${'⭐'.repeat(best[id] || 0) || '☆☆☆'}</span></button>`).join('')}</div>
    </section>`;
  });

  // ---------- Página de cada planeta ----------
  const ORDER = ['sun', 'mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
  const COLOR = { sun: '#ffc23a', mercury: '#b8b2ae', venus: '#f0c27a', earth: '#47b6ff', moon: '#cfd6ff', mars: '#ff7a45', jupiter: '#e0b083', saturn: '#f1d58e', uranus: '#8fe3ea', neptune: '#6f9bff', pluto: '#e8cba8' };
  function sizeText(b) {
    const s = b.stats.size;
    if (b.id === 'earth') return 'This is our Earth!';
    if (b.id === 'sun') return '109 Earths could fit side by side across the Sun!';
    if (s >= 1.5) return `About ${Math.round(s)} times wider than Earth`;
    if (s >= 0.9) return 'Almost the same size as Earth';
    if (s >= 0.45) return 'About half as wide as Earth';
    return 'Much smaller than Earth';
  }
  function compare(b) {
    const s = b.stats.size, max = 150;
    if (b.id === 'sun') return `<div class="cmp cmp-sun"><div class="cmp-arc"></div><div class="cmp-e">${Art.body('earth', 'still', { still: true })}<small>Earth</small></div></div>`;
    const big = Math.max(s, 1), dp = Math.max(10, (max * s) / big), de = Math.max(8, max / big);
    const box = dp / ({ saturn: 0.62, uranus: 0.8 }[b.id] || 1); // Saturno y Urano se dibujan más pequeños para que quepan los anillos
    return `<div class="cmp"><div class="cmp-i"><div style="width:${box}px;height:${box}px">${Art.body(b.id, 'still', { still: true })}</div><small>${esc(b.short || b.name)}</small></div>
      ${b.id !== 'earth' ? `<div class="cmp-i"><div style="width:${de}px;height:${de}px">${Art.body('earth', 'still', { still: true })}</div><small>Earth</small></div>` : ''}</div>`;
  }
  route('planet', (root, id) => {
    const b = BODY[id] || BODY.earth;
    const i = ORDER.indexOf(b.id);
    const prev = ORDER[(i - 1 + ORDER.length) % ORDER.length], next = ORDER[(i + 1) % ORDER.length];
    top('/explore', b.name);
    const seen = store.get('seen', {});
    const mine = new Set(seen[b.id] || []);
    root.innerHTML = `<section class="planet" style="--pc:${COLOR[b.id]}">
      <div class="p-hero"><div class="p-globe ${b.id}">${Art.body(b.id, 'big')}</div>
        <div class="p-head"><div class="p-num">${b.n ? `Planet number ${b.n} from the Sun` : esc(b.kindLabel)}</div>
          <h2>${esc(b.name)}</h2>
          ${b.say ? `<button class="pron" data-say="${esc(b.name)}" aria-label="How to say it">🔊 <span>${esc(b.say)}</span></button>` : ''}
          <div class="chips"><span>${esc(b.kindLabel)}</span><span>${esc(b.tagline)}</span></div></div></div>
      <div class="stats">
        ${(b.stats.list || [['🌙', 'Moons', b.stats.moons], ['🗓️', 'One trip around the Sun', b.stats.year]]).map(([e, l, v]) => `<div><span>${e}</span><small>${esc(l)}</small><b>${esc(v)}</b></div>`).join('')}
        <div><span>📏</span><small>Size</small><b class="sm">${esc(sizeText(b))}</b></div>
      </div>
      ${compare(b)}
      <h3 class="sec">Tap each fact to hear it</h3>
      <div class="facts">${b.facts.map((f, k) => `<button class="fact ${mine.has(k) ? 'heard' : ''}" data-k="${k}"><span class="fe">${f.e}</span><span class="ft">${esc(f.t)}</span><span class="fok">✓</span></button>`).join('')}
        <button class="fact wow ${mine.has('w') ? 'heard' : ''}" data-k="w"><span class="fe">🤩</span><span class="ft"><b>Wow!</b> ${esc(b.wow)}</span><span class="fok">✓</span></button></div>
      <div class="pnav"><button class="btn ghost" data-go="/planet/${prev}">◀ ${esc(BODY[prev].short || BODY[prev].name)}</button>
        <button class="btn" data-go="/planet/${next}">${esc(BODY[next].short || BODY[next].name)} ▶</button></div>
    </section>`;
    root.addEventListener('click', (e) => {
      const f = e.target.closest('.fact');
      if (!f) return;
      const k = f.dataset.k === 'w' ? 'w' : +f.dataset.k;
      Voice.say(k === 'w' ? b.wow : b.facts[k].t);
      f.classList.add('heard', 'flash');
      setTimeout(() => f.classList.remove('flash'), 600);
      mine.add(k);
      const s = store.get('seen', {}); s[b.id] = [...mine]; store.set('seen', s);
      if (mine.size >= b.facts.length + 1 && addStars('visit-' + b.id, 1)) {
        setTimeout(() => { Voice.sfx.win(); confetti(20); toast(`⭐ ${b.short || b.name} visited!`); }, 300);
      }
    });
    Voice.sfx.whoosh();
    Voice.say([b.name, b.intro]);
  });

  // ---------- Palabras del espacio ----------
  route('words', (root) => {
    top('/explore', 'Space Words');
    const seen = new Set(store.get('words', []));
    root.innerHTML = `<section class="words">${guide(D.say.words)}
      <div class="wgrid">${D.words.map((w, i) => `<button class="wcard ${seen.has(w.id) ? 'seen' : ''}" data-i="${i}">${Art.word(w.art)}<b>${esc(w.word)}</b><p>${esc(w.def)}</p></button>`).join('')}</div></section>`;
    root.addEventListener('click', (e) => {
      const c = e.target.closest('.wcard');
      if (!c) return;
      const w = D.words[+c.dataset.i];
      c.classList.add('open', 'seen');
      Voice.say([w.word, w.def]);
      seen.add(w.id); store.set('words', [...seen]);
      if (seen.size === D.words.length && addStars('words', 2)) { confetti(20); toast('⭐⭐ You know all the space words!'); }
    });
  });

  // ---------- Juegos ----------
  function finish(root, { game, stars, title, msg, again }) {
    const best = store.get('best', {});
    if ((best[game] || 0) < stars) { best[game] = stars; store.set('best', best); }
    addStars('game-' + game, stars);
    Voice.sfx.win(); confetti();
    Voice.say(D.say.win);
    root.innerHTML = `<section class="result card">${Art.lumi('cheer')}<h2>${esc(title)}</h2>
      <div class="big-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div><p>${esc(msg)}</p>
      <div class="row"><button class="btn" data-go="${again}">🔁 Play again</button><button class="btn ghost" data-go="/explore">🪐 Back to the planets</button></div></section>`;
  }

  // Desfile de planetas: tocar en orden desde el Sol (con nombres, sin nombres) y de mayor a menor.
  const BY_SIZE = ['jupiter', 'saturn', 'uranus', 'neptune', 'earth', 'venus', 'mars', 'mercury'];
  route('game/parade', (root) => {
    top('/explore', 'Planet Parade');
    const rounds = [
      { order: PLANETS, names: true, say: 'parade-0', title: 'Tap the planets in order, from the Sun.' },
      { order: PLANETS, names: false, say: 'parade-1', title: 'No names now! Use the pictures.' },
      { order: BY_SIZE, names: true, say: 'parade-2', title: 'From the biggest to the smallest!', size: true },
    ];
    let r = 0, k = 0, mistakes = 0;
    function draw() {
      const R = rounds[r];
      k = 0;
      root.innerHTML = `<section class="game parade">
        <div class="rdots">${rounds.map((_, i) => `<span class="${i < r ? 'done' : i === r ? 'now' : ''}"></span>`).join('')}</div>
        ${guide(R.title, { sayText: D.say[R.say] })}
        <div class="track">${R.size ? '<span class="t-end">Biggest</span>' : `<span class="t-sun">${Art.body('sun', 'still', { still: true })}<small>Sun</small></span>`}
          ${R.order.map((_, i) => `<div class="slot" data-i="${i}"><i>${i + 1}</i></div>`).join('')}${R.size ? '<span class="t-end">Smallest</span>' : ''}</div>
        <p class="ptip" aria-live="polite">${r === 0 ? 'Tip: My Very Excellent Mother Just Served Us Nachos!' : ''}</p>
        <div class="pool">${shuffle(R.order).map((id) => `<button class="pp" data-id="${id}" aria-label="${R.names ? esc(BODY[id].name) : 'planet'}">${Art.body(id)}${R.names ? `<small>${esc(BODY[id].name)}</small>` : ''}</button>`).join('')}</div>
      </section>`;
      Voice.say(D.say[R.say]);
    }
    root.addEventListener('click', (e) => {
      const p = e.target.closest('.pp');
      if (!p || p.classList.contains('gone')) return;
      const R = rounds[r], want = R.order[k];
      if (p.dataset.id === want) {
        const slot = $(`.slot[data-i="${k}"]`, root);
        slot.innerHTML = `${Art.body(want)}<small>${esc(BODY[want].name)}</small>`;
        slot.classList.add('filled');
        p.classList.add('gone');
        Voice.sfx.pop(k); Voice.say(BODY[want].name);
        k++;
        $('.ptip', root).textContent = '';
        if (k === R.order.length) {
          Voice.sfx.good();
          later(root, () => Voice.say(D.say['parade-win']), 700);
          later(root, () => { r++; if (r < rounds.length) draw(); else finish(root, { game: 'parade', stars: starsFor(mistakes, 2, 6), title: 'Planet Parade complete!', msg: `You made ${mistakes} mistake${mistakes === 1 ? '' : 's'}.`, again: '/game/parade' }); }, 2200);
        }
      } else {
        mistakes++;
        Voice.sfx.bad();
        p.classList.remove('shake'); void p.offsetWidth; p.classList.add('shake');
        const hint = R.size ? 'Hint: find the biggest planet that is left.' : `Hint: planet number ${k + 1} starts with "${D.mnemonic[k][0][0]}" — ${D.mnemonic.slice(0, k + 1).map((m) => m[0]).join(' ')}…`;
        $('.ptip', root).textContent = hint;
      }
    });
    draw();
  });

  // ¿Quién soy? Adivinanzas con explicación.
  route('game/quiz', (root) => {
    top('/explore', 'Who Am I?');
    const qs = shuffle(D.quiz).slice(0, 10);
    let i = 0, ok = 0;
    const optHtml = (o) => (o[0] === '@' ? `${Art.body(o.slice(1))}<small>${esc(BODY[o.slice(1)].name)}</small>` : `<span>${esc(o)}</span>`);
    function draw() {
      const q = qs[i];
      const bodies = q.opts[0][0] === '@';
      root.innerHTML = `<section class="game quiz">
        <div class="qhead"><span>Question ${i + 1} of ${qs.length}</span><span>✅ ${ok}</span></div>
        <div class="riddle card">${Art.lumi()}<p>${esc(q.q)}</p><button class="say" data-say="${esc(q.q)}" aria-label="Listen">🔊</button></div>
        <div class="opts ${bodies ? 'bodies' : 'texts'}">${shuffle(q.opts).map((o) => `<button class="opt" data-o="${esc(o)}">${optHtml(o)}</button>`).join('')}</div>
        <div class="why card" hidden></div>
        <button class="btn next" hidden>${i + 1 < qs.length ? 'Next ▶' : 'Finish 🏁'}</button></section>`;
      Voice.say(q.q);
    }
    root.addEventListener('click', (e) => {
      const q = qs[i];
      if (e.target.closest('.next')) {
        i++;
        if (i < qs.length) draw();
        else finish(root, { game: 'quiz', stars: ok >= 9 ? 3 : ok >= 7 ? 2 : 1, title: `${ok} out of ${qs.length}!`, msg: ok >= 9 ? 'You are a real space detective!' : 'Visit the planets and try again to get more stars!', again: '/game/quiz' });
        return;
      }
      const b = e.target.closest('.opt');
      if (!b || root.querySelector('.opt.locked')) return;
      $$('.opt', root).forEach((x) => x.classList.add('locked'));
      const right = b.dataset.o === q.opts[0];
      $$('.opt', root).forEach((x) => { if (x.dataset.o === q.opts[0]) x.classList.add('right'); });
      if (right) { ok++; Voice.sfx.good(); } else { b.classList.add('wrong'); Voice.sfx.bad(); }
      const w = $('.why', root);
      w.hidden = false;
      w.innerHTML = `<b>${right ? '✅ ' + esc(D.say[praise()]) : '❌ Not this time.'}</b> ${esc(q.why)}`;
      $('.next', root).hidden = false;
      Voice.say([right ? D.say[praise()] : D.say[oops()], q.why]);
    });
    draw();
  });

  // ¿Es un planeta? Clasificar en dos grupos.
  route('game/sort', (root) => {
    top('/explore', 'Is It a Planet?');
    let r = 0, k = 0, mistakes = 0, items = [];
    function round() { items = shuffle(D.sort[r].items); k = 0; draw(); Voice.say([D.say['sort-intro'], D.sort[r].title]); }
    function draw() {
      const R = D.sort[r], it = items[k], b = BODY[it[0]];
      root.innerHTML = `<section class="game sort">
        <div class="rdots">${D.sort.map((_, i) => `<span class="${i < r ? 'done' : i === r ? 'now' : ''}"></span>`).join('')}</div>
        <h2 class="gtitle">${esc(R.title)}</h2>
        <div class="sort-item"><div class="si-globe">${Art.body(b.id)}</div><b>${esc(b.name)}</b><small>${k + 1} / ${items.length}</small></div>
        <p class="ptip" aria-live="polite"></p>
        <div class="bins">${R.bins.map(([id, e, t]) => `<button class="bin" data-bin="${id}"><span>${e}</span>${esc(t)}</button>`).join('')}</div></section>`;
    }
    let busy = false;
    root.addEventListener('click', (e) => {
      const bin = e.target.closest('.bin');
      if (!bin || busy) return;
      const it = items[k], b = BODY[it[0]], right = bin.dataset.bin === it[1];
      const label = D.sort[r].bins.find((x) => x[0] === it[1])[2];
      const why = it[2] || `${b.name}: ${label.toLowerCase()}.`;
      busy = true;
      if (right) { Voice.sfx.good(); bin.classList.add('right'); $('.sort-item', root).classList.add('fly'); }
      else { mistakes++; Voice.sfx.bad(); bin.classList.add('wrong'); }
      $('.ptip', root).textContent = (right ? '✅ ' : '❌ ') + why;
      Voice.say(why).then(() => {
        if (!root.isConnected) return;
        busy = false;
        k++;
        if (k < items.length) draw();
        else { r++; if (r < D.sort.length) { $('.ptip', root).textContent = '💡 ' + D.sort[r - 1].say; Voice.say(D.sort[r - 1].say).then(() => later(root, round, 600)); } else finish(root, { game: 'sort', stars: starsFor(mistakes, 1, 3), title: 'Great sorting!', msg: D.sort[r - 1].say, again: '/game/sort' }); }
      });
    });
    round();
  });

  // Palabras del espacio: unir palabra y significado (3 rondas de 4).
  route('game/match', (root) => {
    top('/explore', 'Space Words');
    const all = shuffle(D.words).slice(0, 12);
    const rounds = [all.slice(0, 4), all.slice(4, 8), all.slice(8, 12)];
    let r = 0, sel = null, mistakes = 0, left = 0;
    function draw() {
      const R = rounds[r];
      left = R.length; sel = null;
      root.innerHTML = `<section class="game match">
        <div class="rdots">${rounds.map((_, i) => `<span class="${i < r ? 'done' : i === r ? 'now' : ''}"></span>`).join('')}</div>
        ${guide('Tap a word, then tap what it means.', { sayText: D.say.match })}
        <div class="mwords">${shuffle(R).map((w) => `<button class="mw" data-id="${w.id}"><span class="mw-art">${Art.word(w.art)}</span><b>${esc(w.word)}</b></button>`).join('')}</div>
        <div class="mdefs">${shuffle(R).map((w) => `<button class="md" data-id="${w.id}">${esc(w.def)}</button>`).join('')}</div></section>`;
    }
    root.addEventListener('click', (e) => {
      const el = e.target.closest('.mw, .md');
      if (!el || el.classList.contains('done')) return;
      const kind = el.classList.contains('mw') ? 'mw' : 'md';
      if (!sel || sel.classList.contains(kind)) {
        $$('.mw, .md', root).forEach((x) => x.classList.remove('sel'));
        sel = el; el.classList.add('sel'); Voice.sfx.tap();
        if (kind === 'mw') Voice.say(D.words.find((w) => w.id === el.dataset.id).word);
        return;
      }
      if (sel.dataset.id === el.dataset.id) {
        const w = D.words.find((x) => x.id === el.dataset.id);
        [sel, el].forEach((x) => { x.classList.remove('sel'); x.classList.add('done'); });
        Voice.sfx.good(); Voice.say([w.word, w.def]);
        sel = null; left--;
        if (!left) later(root, () => { r++; if (r < rounds.length) draw(); else finish(root, { game: 'match', stars: starsFor(mistakes, 1, 4), title: 'Word expert!', msg: 'You matched all the space words.', again: '/game/match' }); }, 1800);
      } else {
        mistakes++; Voice.sfx.bad();
        [sel, el].forEach((x) => { x.classList.remove('shake'); void x.offsetWidth; x.classList.add('shake'); });
        sel.classList.remove('sel'); sel = null;
      }
    });
    draw();
    Voice.say(D.say.match);
  });

  function start() {
    paintStars();
    render(location.hash.slice(1) || '/');
  }

  return { D, BODY, store, later, name, addStars, totalStars, confetti, toast, guide, route, go, top, $, $$, shuffle, pick, praise, oops, esc, start };
})();
