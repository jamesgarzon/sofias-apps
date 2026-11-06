#!/usr/bin/env node
// Revisa que cada pregunta del taller esté en un juego de su parada y en The Big Review.
// Uso: node ingles/tools/cobertura.js   (termina con código 1 si falta algo)
global.window = {};
require('../js/data.js');
const D = window.DATA;
const errs = [];
const ids = (s) => [].concat(s.ws || []);
const points = (s) => ({ match: s.pairs?.length, sort: s.items?.length, label: s.targets?.length })[s.type] || 1;

// Con `mix`, la pista son las letras del taller revueltas: deben ser justo las de la respuesta.
const letters = (t) => [...t.toUpperCase().replace(/[^A-Z]/g, '')].sort().join('');
const mixed = (w, where) => w.mix && letters(w.clue) !== letters(w.word) && errs.push(`${where}: «${w.clue}» no tiene las letras de ${w.word}`);
const inStops = new Set();
let max = 0;
for (const stop of D.stops) {
  const sparks = new Set(stop.sparks.map((k) => k.id));
  for (const g of stop.games) {
    if (g.write) { g.write.forEach((w) => { inStops.add(w.ws); mixed(w, `${stop.id}/write`); }); max += g.write.length * 3; continue; }
    for (const s of g.steps) {
      ids(s).forEach((w) => inStops.add(w)); max += points(s);
      if (s.type === 'label') s.targets.forEach((t) => sparks.has(t.spark) || errs.push(`${stop.id}/${g.id}: chispa ${t.spark} no existe`));
      if (s.type === 'quiz' && !(s.a in s.opts)) errs.push(`${stop.id}/${g.id}: respuesta fuera de las opciones`);
    }
  }
}
const inReview = new Set();
for (const r of D.review) {
  let s = r;
  if (r.ref) {
    const [st, g, i] = r.ref.split('/');
    s = D.stops.find((x) => x.id === st)?.games.find((x) => x.id === g)?.steps?.[i];
    if (!s) { errs.push(`review: ${r.ref} no existe`); continue; }
  }
  if (s.type === 'spell') mixed(s, 'review');
  ids(s).forEach((w) => inReview.add(w)); max += points(s);
}
for (const w of Object.keys(D.ws)) {
  if (!inStops.has(w)) errs.push(`#${w} (${D.ws[w]}) no está en ninguna parada`);
  if (!inReview.has(w)) errs.push(`#${w} (${D.ws[w]}) no está en The Big Review`);
}
for (const w of [...inStops, ...inReview]) if (!(w in D.ws)) errs.push(`#${w} no es una pregunta del taller`);
// Ritmo de las mascotas: cada día (New day) rinde lo mismo × la mejor mascota ayudante. Se simula jugando al 60, 80 y 100 %.
const pace = (pct) => {
  let total = 0; const have = new Set(['biscuit']), days = [];
  for (let d = 1; d <= 8 && have.size < D.friends.length; d++) {
    const x = Math.max(...D.friends.filter((f) => have.has(f.id) && f.x).map((f) => f.x));
    total += Math.round(max * pct) * x;
    const got = D.friends.filter((f) => !have.has(f.id) && f.stars <= total).map((f) => f.id);
    got.forEach((id) => have.add(id)); days.push(got);
  }
  return days;
};
const sim = new Map([0.6, 0.8, 1].map((p) => [p, pace(p)]));
const first = D.friends.filter((f) => f.stars).sort((a, b) => a.stars - b.stars)[0];
if (first.stars < 45) errs.push(`${first.name} sale con ${first.stars} ⭐: tocando al azar se ganan ~40`);
sim.get(1).forEach((g, i) => g.length > 3 && errs.push(`al 100 %, el día ${i + 1} trae ${g.length} mascotas`));
const juanaDay = sim.get(0.8).findIndex((g) => g.includes('juana')) + 1;
if (!juanaDay || juanaDay > 3) errs.push(`al 80 %, Juana llega el día ${juanaDay || 'nunca'}`);

console.log(`${Object.keys(D.ws).length} preguntas del taller · ${max} estrellas posibles por día`);
for (const [p, days] of sim) console.log(`  al ${p * 100} %: ` + days.map((g, i) => `día ${i + 1}: ${g.join(', ') || '—'}`).join(' · '));
if (errs.length) { console.error('❌ ' + errs.join('\n❌ ')); process.exit(1); }
console.log('✅ Todo el taller está en las paradas y en The Big Review.');
