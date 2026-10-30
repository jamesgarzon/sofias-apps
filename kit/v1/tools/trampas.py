#!/usr/bin/env python3
"""Busca respuestas regaladas en js/data.js de una app del kit (lo mecánico; el agente anti-trampas revisa el resto).
Uso (desde la raíz del repo):  python3 kit/v1/tools/trampas.py <app>      ·      python3 kit/v1/tools/trampas.py --test
Termina con código 1 si encuentra algo. Puede haber falsos positivos: cada hallazgo se revisa a mano."""
import json, re, sys, unicodedata

ORDINALES = r'\b(primer[oa]?|segund[oa]|luego|despues|finalmente|al final|ultim[oa]|first|second|then|after|finally|last)\b'


def norm(s):
    s = re.sub(r'<[^>]+>', '', str(s)).lower()
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')


def palabras(s):
    return {w for w in re.findall(r'\w+', norm(s)) if len(w) >= 5}


def revisar(d):
    T, out = d['topics'], []
    if not d['meta'].get('strict'):
        out.append('meta.strict no está en true: los juegos no piden sellos y las chispas no esperan')
    qs, larga = d.get('questions', []), 0
    for q in qs:
        qid, ok, malas = q.get('id'), q['opts'][0], q['opts'][1:]
        if len(q['opts']) < 3:
            out.append(f'pregunta {qid}: solo {len(q["opts"])} opciones (adivina con 50 %)')
        if len({norm(o) for o in q['opts']}) < len(q['opts']):
            out.append(f'pregunta {qid}: opciones repetidas')
        if not malas:
            continue
        lo, lm = len(norm(ok)), max(len(norm(o)) for o in malas)
        larga += lo > lm
        if lo >= 1.6 * lm and lo - lm >= 10:
            out.append(f'pregunta {qid}: la correcta es mucho más larga que las demás')
        t = T[q['topic']]
        em = q.get('emoji') or t['emoji']
        if em in ok and not any(em in o for o in malas):
            out.append(f'pregunta {qid}: el emoji {em} de la pregunta está en la correcta')
        if em == t['emoji'] and norm(ok) in (norm(t['name']), norm(t['short'])):
            out.append(f'pregunta {qid}: la respuesta es el tema «{t["short"]}» y la pregunta muestra su emoji {em}')
        comun = palabras(ok) & palabras(q['q'])
        if comun and not any(palabras(o) & palabras(q['q']) for o in malas):
            out.append(f'pregunta {qid}: la pregunta ya dice «{", ".join(sorted(comun))}», que solo está en la correcta')
    if len(qs) >= 6 and larga > len(qs) / 2:
        out.append(f'quiz: la correcta es la opción más larga en {larga} de {len(qs)} preguntas')

    def delata(tid, e, txt):
        t = T.get(tid)
        return t and (e == t['emoji'] or t['emoji'] in txt or palabras(t['short']) & palabras(txt))
    for tid, pistas in d.get('clues', {}).items():
        for e, txt in pistas:
            if delata(tid, e, txt):
                out.append(f'memoria {tid}: la pista «{e} {txt}» repite el emoji o el nombre del tema')
    for it in d.get('sort', {}).get('items', []):
        if delata(it['topic'], it['e'], it['t']):
            out.append(f'portales {it["topic"]}: «{it["e"]} {it["t"]}» repite el emoji o el nombre del portal')
    for r in d.get('order', {}).get('rounds', []):
        for ev in r.get('events', []):
            y = abs(ev.get('y', 0))
            if (y > 31 and str(y) in ev['t']) or re.search(ORDINALES, norm(ev['t'])):
                out.append(f'ordena «{r["title"]}»: la tarjeta «{ev["t"]}» dice su posición o su año')
    return out


def test():
    d = {'meta': {}, 'topics': {'sol': {'name': 'Sólido', 'short': 'Sólido', 'emoji': '🧊'}},
         'questions': [{'id': 'a', 'topic': 'sol', 'q': '¿Cómo es el hielo?', 'opts': ['Sólido', 'Gas']}],
         'clues': {'sol': [['🧊', 'Frío']]}, 'sort': {'items': [{'topic': 'sol', 'e': '❄️', 't': 'Hielo sólido'}]},
         'order': {'rounds': [{'title': 'x', 'events': [{'t': 'Primero llueve', 'y': 1}, {'t': 'Colón en 1492', 'y': 1492}]}]}}
    got = revisar(d)
    for clave in ('meta.strict', '50 %', 'muestra su emoji', 'memoria', 'portales', 'Primero', '1492'):
        assert any(clave in x for x in got), (clave, got)
    d['meta']['strict'] = True
    assert len(revisar({**d, 'questions': [], 'clues': {}, 'sort': {}, 'order': {}})) == 0
    print('✅ test ok')


if __name__ == '__main__':
    if sys.argv[1:] == ['--test']:
        sys.exit(test())
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    src = open(f'{sys.argv[1].rstrip("/")}/js/data.js', encoding='utf-8').read()
    hallazgos = revisar(json.loads(re.search(r'/\*JSON\*/(.*)/\*END\*/', src, re.S).group(1)))
    print('\n'.join(f'⚠️  {h}' for h in hallazgos) or '✅ Sin hallazgos mecánicos')
    sys.exit(1 if hallazgos else 0)
