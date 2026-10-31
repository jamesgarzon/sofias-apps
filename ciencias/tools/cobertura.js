#!/usr/bin/env node
// Revisa que cada pregunta del taller esté en un juego de su parada y en The Big Review.
// Uso: node ciencias/tools/cobertura.js   (termina con código 1 si falta algo)
global.window = {};
require('../js/data.js');
const D = window.DATA;
const errs = [];
const ids = (s) => [].concat(s.ws || []);
const points = (s) => ({ match: s.pairs?.length, sort: s.items?.length, label: s.targets?.length, order: s.items?.length, paint: 2 })[s.type] || 1;

const inStops = new Set();
let max = 0;
for (const stop of D.stops) {
  const sparks = new Set(stop.sparks.map((k) => k.id));
  for (const g of stop.games) {
    if (g.write) { g.write.forEach((w) => inStops.add(w.ws)); max += g.write.length * 3; continue; }
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
  ids(s).forEach((w) => inReview.add(w)); max += points(s);
}
for (const w of Object.keys(D.ws)) {
  if (!inStops.has(w)) errs.push(`#${w} (${D.ws[w]}) no está en ninguna parada`);
  if (!inReview.has(w)) errs.push(`#${w} (${D.ws[w]}) no está en The Big Review`);
}
for (const w of [...inStops, ...inReview]) if (!(w in D.ws)) errs.push(`#${w} no es una pregunta del taller`);
// Al menos 6 amigos se conocen en el primer viaje sin tener que sacar todo perfecto; el resto, en viajes nuevos.
const first = D.friends.filter((f) => f.stars <= max * 0.6).length;
if (first < 6) errs.push(`solo ${first} amigos caben en el primer viaje (hasta ${Math.floor(max * 0.6)} estrellas)`);

console.log(`${Object.keys(D.ws).length} preguntas del taller · ${max} estrellas posibles · ${first} de ${D.friends.length} amigos en el primer viaje`);
if (errs.length) { console.error('❌ ' + errs.join('\n❌ ')); process.exit(1); }
console.log('✅ Todo el taller está en las paradas y en The Big Review.');
