// Contenido de la app. El bloque marcado con los comentarios JSON/END es JSON estricto:
// ../kit/v1/gen_audio.py lo lee para generar las voces (nada de comentarios ni comas finales ahí dentro).
// Esquema completo en kit/v1/README.md.
window.APP_DATA = /*JSON*/{
  "meta": {
    "id": "plantilla",
    "lang": "es",
    "title": "El Viaje de la Gota",
    "subtitle": "Plantilla del kit · Los estados del agua",
    "costume": "cientifico",
    "theme": "light",
    "strict": true,
    "topicWord": "Estado",
    "greeting": "¡Hola, Sofía! Soy Cronos, el científico. Tócame y te cuento secretos del agua.",
    "quizShip": "💧",
    "cardBack": "💧"
  },
  "groups": [
    { "id": "agua", "name": "Los estados del agua", "emoji": "💧", "sub": "Sólido, líquido y gaseoso", "gradient": "linear-gradient(135deg, #38bdf8, #6366f1 60%, #a855f7)", "topics": ["solido", "liquido", "gaseoso"] }
  ],
  "topics": {
    "solido": {
      "name": "El estado sólido", "short": "Sólido", "emoji": "🧊", "color": "#38bdf8", "dark": "#0c4a6e", "reveal": "0 °C o menos",
      "marks": [{ "icon": "📐", "label": "Forma", "text": "Tiene forma propia" }, { "icon": "🌡️", "label": "Temperatura", "text": "A 0 °C o menos, el agua se congela" }],
      "intro": "Cuando el agua está muy fría, a 0 grados o menos, se congela y se vuelve hielo. En estado sólido tiene forma propia: ¡un cubo de hielo sigue siendo un cubo!",
      "hotspots": [
        { "emoji": "🧊", "title": "El hielo", "text": "El hielo es agua en estado sólido. Es duro y tiene forma propia, por eso puedes agarrarlo con la mano." },
        { "emoji": "❄️", "title": "La nieve", "text": "Los copos de nieve son cristalitos de hielo. ¡Dicen que no hay dos copos exactamente iguales!" },
        { "emoji": "💧", "title": "Se derrite", "text": "Si el hielo se calienta, se derrite y se vuelve agua líquida. A este cambio se le llama fusión." }
      ]
    },
    "liquido": {
      "name": "El estado líquido", "short": "Líquido", "emoji": "🌊", "color": "#2563eb", "dark": "#172554", "reveal": "entre 0 °C y 100 °C",
      "marks": [{ "icon": "🥤", "label": "Forma", "text": "Toma la forma del recipiente" }, { "icon": "🌡️", "label": "Temperatura", "text": "Entre 0 °C y 100 °C" }],
      "intro": "El agua que tomamos, la de los ríos y la del mar está en estado líquido. No tiene forma propia: toma la forma del recipiente donde la pongas.",
      "hotspots": [
        { "emoji": "🥛", "title": "Toma la forma del vaso", "text": "Si pasas el agua de una botella a un vaso, cambia de forma, pero sigue siendo la misma cantidad de agua." },
        { "emoji": "🏞️", "title": "El agua fluye", "text": "Los líquidos fluyen: el agua de los ríos corre montaña abajo hasta llegar al mar." },
        { "emoji": "🌧️", "title": "La lluvia", "text": "La lluvia son gotas de agua líquida que caen de las nubes." }
      ]
    },
    "gaseoso": {
      "name": "El estado gaseoso", "short": "Gaseoso", "emoji": "♨️", "color": "#a855f7", "dark": "#3b0764", "reveal": "100 °C o más",
      "marks": [{ "icon": "💨", "label": "Forma", "text": "No tiene forma: se esparce por todas partes" }, { "icon": "🌡️", "label": "Temperatura", "text": "A 100 °C el agua hierve" }],
      "intro": "Cuando el agua se calienta mucho, se convierte en vapor de agua. En estado gaseoso no tiene forma y se esparce por todo el espacio.",
      "hotspots": [
        { "emoji": "🍲", "title": "El agua hierve", "text": "Cuando el agua de la olla llega a 100 grados, hierve y se convierte en vapor." },
        { "emoji": "☀️", "title": "La evaporación", "text": "El sol calienta los charcos y el mar, y poco a poco el agua se evapora y sube al cielo." },
        { "emoji": "💨", "title": "Se esparce", "text": "El vapor no tiene forma propia: se mezcla con el aire y llena todo el espacio." }
      ]
    }
  },
  "questions": [
    { "id": "q1", "topic": "solido", "emoji": "🧊", "q": "¿En qué estado está el hielo?", "opts": ["Sólido", "Líquido", "Gaseoso", "En ninguno"], "why": "El hielo es agua sólida: tiene forma propia." },
    { "id": "q2", "topic": "liquido", "emoji": "🥤", "q": "¿Qué estado toma la forma del recipiente?", "opts": ["El líquido", "El sólido", "El hielo", "La nieve"], "why": "Los líquidos toman la forma del vaso o de la botella." },
    { "id": "q3", "topic": "gaseoso", "emoji": "♨️", "q": "¿Qué le pasa al agua cuando hierve?", "opts": ["Se convierte en vapor", "Se convierte en hielo", "Se vuelve arena", "Se pone azul"], "why": "Al hervir, a 100 grados, el agua se vuelve vapor: estado gaseoso." },
    { "id": "q4", "topic": "solido", "emoji": "🥶", "q": "¿A qué temperatura se congela el agua?", "opts": ["0 °C", "50 °C", "100 °C", "30 °C"], "why": "A 0 grados el agua se congela y se vuelve hielo." },
    { "id": "q5", "topic": "gaseoso", "emoji": "🥵", "q": "¿A qué temperatura hierve el agua?", "opts": ["100 °C", "0 °C", "20 °C", "10 °C"], "why": "A 100 grados el agua hierve." },
    { "id": "q6", "topic": "solido", "emoji": "💧", "q": "¿Cómo se llama el cambio de sólido a líquido?", "opts": ["Fusión", "Evaporación", "Congelación", "Lluvia"], "why": "Cuando el hielo se derrite ocurre la fusión." },
    { "id": "q7", "topic": "gaseoso", "emoji": "☀️", "q": "¿Qué hace el sol con el agua de los charcos?", "opts": ["La evapora", "La congela", "La pinta de azul", "Nada"], "why": "El calor del sol evapora el agua y la sube al cielo." },
    { "id": "q8", "topic": "liquido", "emoji": "🌧️", "q": "La lluvia está en estado…", "opts": ["Líquido", "Sólido", "Gaseoso", "Mágico"], "why": "La lluvia son gotas de agua líquida." }
  ],
  "order": {
    "rounds": [
      { "set": "agua", "title": "Del más frío al más caliente 🌡️", "top": "🥶 Más frío", "bottom": "🥵 Más caliente", "topics": "agua", "say": "order-1" },
      { "set": "agua", "title": "El ciclo del agua 🔄", "top": "1️⃣ Primero", "bottom": "🔚 Al final", "say": "order-2",
        "events": [
          { "e": "☀️", "t": "El sol calienta el agua del mar", "y": 1, "c": "#f59e0b" },
          { "e": "♨️", "t": "El agua se evapora y sube", "y": 2, "c": "#a855f7" },
          { "e": "☁️", "t": "El vapor se enfría y forma nubes", "y": 3, "c": "#64748b" },
          { "e": "🌧️", "t": "Las gotas caen como lluvia", "y": 4, "c": "#2563eb" },
          { "e": "🏞️", "t": "Los ríos llevan el agua al mar", "y": 5, "c": "#0891b2" }
        ] }
    ]
  },
  "sort": {
    "items": [
      { "topic": "solido", "e": "🧊", "t": "Cubos de hielo" },
      { "topic": "solido", "e": "❄️", "t": "Copos de nieve" },
      { "topic": "solido", "e": "🏔️", "t": "Glaciar" },
      { "topic": "solido", "e": "🌨️", "t": "Granizo" },
      { "topic": "liquido", "e": "🥛", "t": "Vaso de agua" },
      { "topic": "liquido", "e": "🌊", "t": "El mar" },
      { "topic": "liquido", "e": "🌧️", "t": "Lluvia" },
      { "topic": "liquido", "e": "🚰", "t": "Agua de la llave" },
      { "topic": "gaseoso", "e": "♨️", "t": "Vapor de la olla" },
      { "topic": "gaseoso", "e": "🫖", "t": "Vapor de la tetera" },
      { "topic": "gaseoso", "e": "🚿", "t": "Vapor de la ducha caliente" }
    ]
  },
  "clues": {
    "solido": [["🧊", "Tiene forma propia"], ["❄️", "Copos de nieve"], ["🥶", "0 °C o menos"]],
    "liquido": [["🥤", "Toma la forma del vaso"], ["🌧️", "Gotas de lluvia"], ["🏞️", "Fluye como un río"]],
    "gaseoso": [["💨", "Se esparce por el aire"], ["♨️", "Vapor de la olla"], ["🥵", "Hierve a 100 °C"]]
  },
  "facts": [
    "¿Sabías que el agua es lo único que encontramos en la naturaleza en los tres estados: sólido, líquido y gaseoso?",
    "¿Sabías que el agua de la lluvia que cae hoy pudo estar en el mar hace unos días? ¡Es el ciclo del agua!",
    "¿Sabías que el hielo flota en el agua? Por eso los icebergs no se hunden."
  ],
  "voice": {
    "welcome": "¡Hola, Sofía! Soy Cronos, el científico. Tócame y te cuento secretos del agua.",
    "order-1": "Ordena los estados del agua, del más frío al más caliente.",
    "order-2": "Ahora ordena el ciclo del agua, paso a paso.",
    "termo": "Mueve el termómetro y mira cómo cambia el agua.",
    "ok-0": "¡Correcto!",
    "ok-1": "¡Excelente!",
    "ok-2": "¡Muy bien, Sofía!",
    "ok-3": "¡Eso es!",
    "ok-4": "¡Genial! Sabes mucho.",
    "ok-5": "¡Perfecto!",
    "bad-0": "¡Uy, casi!",
    "bad-1": "No era esa, ¡pero ahora ya lo sabes!",
    "bad-2": "¡Ups! Mira cuál era la correcta.",
    "win": "¡Lo lograste! ¡Lo hiciste increíble!",
    "good": "¡Muy bien! Sigue practicando y serás experta.",
    "stamp": "¡Descubriste todo! Ganaste un sello para tu pasaporte.",
    "order-ok": "¡Orden perfecto!",
    "order-bad": "Algunas no están en su lugar. ¡Inténtalo otra vez!",
    "sort": "¿A dónde pertenece? ¡Mándalo al portal correcto!",
    "memory": "Encuentra las parejas: cada estado con su pista.",
    "pair": "¡Pareja encontrada!",
    "passport": "Este es tu pasaporte. Explora cada estado para ganar todos los sellos."
  }
}/*END*/;
