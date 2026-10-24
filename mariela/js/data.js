// Contenido de la app. El bloque marcado con los comentarios JSON/END es JSON estricto:
// ../kit/v1/gen_audio.py lo lee para generar las voces (nada de comentarios ni comas finales ahí dentro).
// Esquema completo en kit/v1/README.md. Textos literales de los apuntes de Sofía (poema «Mártires» y su biografía de Mariela Zuluaga).
// "texts" es propio de esta app (pantallas «De memoria» y «Completa»): cada parte lista sus versos o frases
// como claves de "voice", para que gen_audio.py genere un mp3 por verso.
window.APP_DATA = /*JSON*/{
  "meta": {
    "id": "mariela",
    "lang": "es",
    "title": "Semilla Buena",
    "subtitle": "El poema «Mártires» y la biografía de Mariela Zuluaga · ¡de memoria!",
    "costume": "profe",
    "theme": "light",
    "topicWord": "Parte",
    "greeting": "¡Hola, Sofía! Soy Cronos. Vamos a sembrar el poema en tu memoria, verso a verso. Tócame y te cuento secretos.",
    "quizShip": "🌱",
    "cardBack": "🌻",
    "games": {
      "order": ["🧩", "Ordena", "¿Qué va primero?"],
      "sort": ["🌀", "Portales", "¿De qué parte es?"],
      "memory": ["🃏", "Memoria", "Une cada parte con su frase"]
    }
  },
  "groups": [
    { "id": "poema", "name": "El poema «Mártires»", "emoji": "📜", "sub": "De Mariela Zuluaga · verso a verso", "gradient": "linear-gradient(135deg, #e11d48, #f97316 55%, #fbbf24)", "topics": ["estrofa1", "estrofa2", "estrofa3"] },
    { "id": "bio", "name": "La biografía de Mariela", "emoji": "✍️", "sub": "¿Quién es? · Su vida · Sus obras · Mi opinión", "gradient": "linear-gradient(135deg, #0284c7, #6366f1 55%, #a855f7)", "topics": ["quien", "vida", "crecio", "importante", "obras", "opinion"] }
  ],
  "topics": {
    "estrofa1": {
      "name": "Estrofa 1", "short": "Estrofa 1", "emoji": "🌱", "color": "#16a34a", "dark": "#14532d", "chips": ["2 versos"], "reveal": "Cuando un luchador muere…",
      "intro": "Cuando un luchador muere <br>se siembra con él semilla buena.",
      "note": "El poema se llama «Mártires» y lo escribió Mariela Zuluaga.",
      "hotspots": [
        { "emoji": "💪", "title": "Un luchador", "text": "Un luchador es una persona valiente que lucha por algo bueno: por su gente, por la justicia o por la paz." },
        { "emoji": "🌾", "title": "Semilla buena", "text": "Cuando un luchador muere, lo bueno que hizo no se pierde: queda sembrado como una semilla, y de esa semilla nacen cosas buenas." },
        { "emoji": "🕊️", "title": "Los mártires", "text": "El poema se llama «Mártires». Los mártires son personas que dieron su vida por defender lo que es justo. Su ejemplo sigue vivo." }
      ]
    },
    "estrofa2": {
      "name": "Estrofa 2", "short": "Estrofa 2", "emoji": "🌺", "color": "#e11d48", "dark": "#4c0519", "chips": ["7 versos"], "reveal": "No les fue fácil…",
      "intro": "No les fue fácil <br>dormirse en la vigilia <br>cuando aún <br>reventaban los geranios <br>y el amor batía brazos <br>y palmas <br>y petardos.",
      "note": "Truco: los tres últimos versos empiezan con «y»: y el amor…, y palmas, y petardos.",
      "hotspots": [
        { "emoji": "🌙", "title": "Dormirse en la vigilia", "text": "La vigilia es estar despierto, acompañando y esperando. «Dormirse» aquí es una forma suave de decir «morir»: no fue fácil irse." },
        { "emoji": "🌸", "title": "Reventaban los geranios", "text": "Los geranios son flores de colores. «Reventaban» quiere decir que se abrían, que florecían: ¡todo estaba lleno de vida!" },
        { "emoji": "👏", "title": "Brazos y palmas", "text": "«El amor batía brazos y palmas»: la gente se abrazaba y aplaudía con alegría." },
        { "emoji": "🎆", "title": "Y petardos", "text": "Los petardos son cohetes que truenan en las fiestas: ¡pum, pum! Había fiesta y alegría, por eso no era fácil irse." }
      ]
    },
    "estrofa3": {
      "name": "Estrofa 3", "short": "Estrofa 3", "emoji": "🚩", "color": "#d97706", "dark": "#451a03", "chips": ["empieza así"], "reveal": "No les era fácil…",
      "intro": "No les era fácil <br>marchar…",
      "note": "Esta estrofa sigue en la otra hoja de tu cuaderno.",
      "hotspots": [
        { "emoji": "👣", "title": "Marchar", "text": "Marchar es caminar junto a otras personas, todos al mismo paso, por algo en lo que creen." },
        { "emoji": "🔁", "title": "¿Fue o era?", "text": "¡Ojo! La estrofa 2 dice «No les fue fácil» y la estrofa 3 dice «No les era fácil». ¡No los confundas!" },
        { "emoji": "📏", "title": "Versos y estrofas", "text": "Cada renglón del poema es un verso, y un grupo de versos es una estrofa. Un poema se aprende estrofa por estrofa." }
      ]
    },
    "quien": {
      "name": "¿Quién es?", "short": "¿Quién es?", "emoji": "🙋‍♀️", "color": "#0284c7", "dark": "#082f49", "reveal": "Escritora, poeta y periodista",
      "marks": [{ "icon": "📍", "label": "Nació en", "text": "Villavicencio" }, { "icon": "🎂", "label": "Año", "text": "1948" }],
      "intro": "Mariela Zuluaga, ella es una escritora, también es poeta y periodista colombiana. Nació en Villavicencio en 1948.",
      "hotspots": [
        { "emoji": "✍️", "title": "Escritora", "text": "Mariela Zuluaga, ella es una escritora: escribe cuentos, poemas y novelas." },
        { "emoji": "📰", "title": "Poeta y periodista", "text": "También es poeta y periodista colombiana. Una poeta escribe poemas, y una periodista cuenta las noticias." },
        { "emoji": "🏞️", "title": "Villavicencio", "text": "Nació en Villavicencio, la capital del Meta, en los Llanos Orientales de Colombia." },
        { "emoji": "🎂", "title": "En 1948", "text": "Nació en 1948: ¡mil novecientos cuarenta y ocho!" }
      ]
    },
    "vida": {
      "name": "Su vida", "short": "Su vida", "emoji": "📖", "color": "#059669", "dark": "#022c22", "reveal": "Leer, escribir, historias y naturaleza",
      "intro": "A ella desde pequeña le gustaba leer y escribir. También le gustaba conocer historias y le gustaba mucho la naturaleza.",
      "hotspots": [
        { "emoji": "📚", "title": "Leer", "text": "A ella desde pequeña le gustaba leer." },
        { "emoji": "✏️", "title": "Escribir", "text": "Desde pequeña también le gustaba escribir." },
        { "emoji": "👵", "title": "Historias", "text": "También le gustaba conocer historias: las que le contaban y las que leía." },
        { "emoji": "🌳", "title": "La naturaleza", "text": "Y le gustaba mucho la naturaleza: los ríos, los árboles y los pájaros del Llano." }
      ]
    },
    "crecio": {
      "name": "Cuando creció", "short": "Cuando creció", "emoji": "📰", "color": "#ea580c", "dark": "#431407", "reveal": "Periodista y maestra de lectura",
      "intro": "Cuando creció consiguió trabajo como periodista. También ayudó a personas a aprender a escribir y leer.",
      "note": "En tu cuaderno esta parte va dentro de «Su vida».",
      "hotspots": [
        { "emoji": "📰", "title": "Periodista", "text": "Cuando creció consiguió trabajo como periodista." },
        { "emoji": "🎤", "title": "¿Qué hace una periodista?", "text": "Una periodista pregunta, escucha y escribe lo que pasa, para contárselo a todos en el periódico, la radio o la televisión." },
        { "emoji": "🧑‍🏫", "title": "Enseñó a leer", "text": "También ayudó a personas a aprender a escribir y leer." }
      ]
    },
    "importante": {
      "name": "¿Por qué es importante?", "short": "Importante", "emoji": "💡", "color": "#7c3aed", "dark": "#2e1065", "reveal": "Nos comparte su imaginación",
      "intro": "Es importante porque dedicó parte de su vida a escribir. Con sus historias y poemas nos comparte su imaginación y así disfrutamos más la lectura.",
      "hotspots": [
        { "emoji": "⏳", "title": "Dedicó su vida a escribir", "text": "Es importante porque dedicó parte de su vida a escribir." },
        { "emoji": "💭", "title": "Su imaginación", "text": "Con sus historias y poemas nos comparte su imaginación." },
        { "emoji": "😊", "title": "Disfrutamos la lectura", "text": "Y así disfrutamos más la lectura." }
      ]
    },
    "obras": {
      "name": "Sus obras", "short": "Sus obras", "emoji": "📚", "color": "#db2777", "dark": "#500724", "reveal": "Cuentos, poemas y novelas",
      "intro": "Ella ha escrito cuentos, poemas y novelas como «El país de los días eternos», «Gente que camina» y «Las cartas de Grillo».",
      "hotspots": [
        { "emoji": "📚", "title": "Cuentos, poemas y novelas", "text": "Ella ha escrito cuentos, poemas y novelas. Muchas de sus obras son para niños y niñas." },
        { "emoji": "☀️", "title": "El país de los días eternos", "text": "Una de sus obras se llama «El país de los días eternos»." },
        { "emoji": "🚶", "title": "Gente que camina", "text": "Otra se llama «Gente que camina»: es una novela." },
        { "emoji": "🦗", "title": "Las cartas de Grillo", "text": "Y otra se llama «Las cartas de Grillo»." }
      ]
    },
    "opinion": {
      "name": "Mi opinión", "short": "Mi opinión", "emoji": "💬", "color": "#c026d3", "dark": "#4a044e", "reveal": "Me gustó saber de su vida",
      "intro": "Me gustó saber de su vida porque me gusta lo que escribe, como sus poemas, y cómo con su imaginación creó bonitas y grandes historias.",
      "note": "Es tu opinión: dila mirando a tus compañeros y con una sonrisa.",
      "hotspots": [
        { "emoji": "💜", "title": "Me gustó saber de su vida", "text": "Me gustó saber de su vida…" },
        { "emoji": "📜", "title": "Lo que escribe", "text": "…porque me gusta lo que escribe, como sus poemas…" },
        { "emoji": "🌈", "title": "Grandes historias", "text": "…y cómo con su imaginación creó bonitas y grandes historias." }
      ]
    }
  },
  "texts": {
    "poema": {
      "name": "El poema", "emoji": "📜", "title": "Mártires", "by": "Mariela Zuluaga", "say": "poema-titulo",
      "parts": [
        { "id": "e1", "topic": "estrofa1", "name": "Estrofa 1", "lines": ["poema-1-1", "poema-1-2"] },
        { "id": "e2", "topic": "estrofa2", "name": "Estrofa 2", "lines": ["poema-2-1", "poema-2-2", "poema-2-3", "poema-2-4", "poema-2-5", "poema-2-6", "poema-2-7"] },
        { "id": "e3", "topic": "estrofa3", "name": "Estrofa 3", "lines": ["poema-3-1", "poema-3-2"], "more": "Sigue en la otra hoja de tu cuaderno ✏️" }
      ]
    },
    "bio": {
      "name": "La biografía", "emoji": "✍️", "title": "Biografía", "by": "Mariela Zuluaga", "say": "bio-titulo",
      "parts": [
        { "id": "quien", "topic": "quien", "name": "¿Quién es?", "say": "bio-h-quien", "lines": ["bio-quien-1", "bio-quien-2", "bio-quien-3"] },
        { "id": "vida", "topic": "vida", "name": "Su vida", "say": "bio-h-vida", "lines": ["bio-vida-1", "bio-vida-2", "bio-vida-3", "bio-crecio-1", "bio-crecio-2"] },
        { "id": "importante", "topic": "importante", "name": "¿Por qué es importante?", "say": "bio-h-importante", "lines": ["bio-importante-1", "bio-importante-2", "bio-importante-3"] },
        { "id": "obras", "topic": "obras", "name": "Sus obras", "say": "bio-h-obras", "lines": ["bio-obras-1", "bio-obras-2", "bio-obras-3"] },
        { "id": "opinion", "topic": "opinion", "name": "Mi opinión", "say": "bio-h-opinion", "lines": ["bio-opinion-1", "bio-opinion-2", "bio-opinion-3"] }
      ]
    }
  },
  "quizSize": 10,
  "questions": [
    { "id": "p1", "topic": "estrofa1", "emoji": "📜", "q": "¿Cómo se llama el poema?", "opts": ["Mártires", "Luchadores", "Semilla buena", "Los geranios"], "why": "El poema se llama «Mártires» y lo escribió Mariela Zuluaga." },
    { "id": "p2", "topic": "estrofa1", "emoji": "✍️", "q": "¿Quién escribió el poema «Mártires»?", "opts": ["Mariela Zuluaga", "Rafael Pombo", "Gabriel García Márquez", "Gloria Fuertes"], "why": "Lo escribió Mariela Zuluaga, escritora, poeta y periodista colombiana." },
    { "id": "p3", "topic": "estrofa1", "emoji": "🧩", "q": "Completa: «Cuando un luchador…»", "opts": ["muere", "canta", "duerme", "marcha"], "why": "«Cuando un luchador muere / se siembra con él semilla buena.»" },
    { "id": "p4", "topic": "estrofa1", "emoji": "🧩", "q": "Completa: «se siembra con él…»", "opts": ["semilla buena", "flor bonita", "semilla nueva", "árbol grande"], "why": "«Cuando un luchador muere / se siembra con él semilla buena.»" },
    { "id": "p5", "topic": "estrofa1", "emoji": "🤔", "q": "¿Cuál es el primer verso del poema?", "opts": ["Cuando un luchador muere", "No les fue fácil", "No les era fácil", "se siembra con él semilla buena"], "why": "El poema empieza: «Cuando un luchador muere»." },
    { "id": "p6", "topic": "estrofa1", "emoji": "🤔", "q": "¿Qué es un mártir?", "opts": ["Alguien que dio su vida por lo que es justo", "Un tipo de flor", "Un cohete de fiesta", "Un juego de niños"], "why": "Los mártires dieron su vida por defender lo que es justo. Su ejemplo es como una semilla buena." },
    { "id": "p7", "topic": "estrofa2", "emoji": "🔍", "q": "¿Cómo empieza la estrofa 2?", "opts": ["No les fue fácil", "No les era fácil", "Cuando un luchador muere", "y el amor batía brazos"], "why": "La estrofa 2 empieza «No les FUE fácil»; la estrofa 3, «No les ERA fácil»." },
    { "id": "p8", "topic": "estrofa2", "emoji": "🧩", "q": "Completa: «No les fue fácil / dormirse en la…»", "opts": ["vigilia", "noche", "cama", "mañana"], "why": "«No les fue fácil / dormirse en la vigilia»." },
    { "id": "p9", "topic": "estrofa2", "emoji": "🧩", "q": "Completa: «cuando aún / reventaban los…»", "opts": ["geranios", "petardos", "girasoles", "globos"], "why": "«cuando aún / reventaban los geranios»." },
    { "id": "p10", "topic": "estrofa2", "emoji": "🧩", "q": "Completa: «y el amor batía…»", "opts": ["brazos", "alas", "tambores", "palmas"], "why": "«y el amor batía brazos / y palmas / y petardos». Primero van los brazos." },
    { "id": "p11", "topic": "estrofa2", "emoji": "➡️", "q": "¿Qué verso sigue después de «y el amor batía brazos»?", "opts": ["y palmas", "y petardos", "cuando aún", "y geranios"], "why": "«y el amor batía brazos / y palmas / y petardos»." },
    { "id": "p12", "topic": "estrofa2", "emoji": "🔚", "q": "¿Cuál es el último verso de la estrofa 2?", "opts": ["y petardos", "y palmas", "cuando aún", "dormirse en la vigilia"], "why": "La estrofa 2 termina: «y palmas / y petardos»." },
    { "id": "p13", "topic": "estrofa2", "emoji": "➡️", "q": "¿Qué verso va entre «dormirse en la vigilia» y «reventaban los geranios»?", "opts": ["cuando aún", "y palmas", "No les fue fácil", "y petardos"], "why": "«dormirse en la vigilia / cuando aún / reventaban los geranios»." },
    { "id": "p14", "topic": "estrofa2", "emoji": "🤔", "q": "¿Qué son los geranios?", "opts": ["Unas flores", "Unos cohetes", "Unos pájaros", "Unas montañas"], "why": "Los geranios son flores de colores. En el poema «reventaban»: se abrían, florecían." },
    { "id": "p15", "topic": "estrofa2", "emoji": "🤔", "q": "¿Qué son los petardos?", "opts": ["Cohetes que truenan en las fiestas", "Flores rojas", "Aplausos con las manos", "Semillas pequeñas"], "why": "Los petardos truenan en las fiestas: ¡pum, pum!" },
    { "id": "p16", "topic": "estrofa2", "emoji": "🤔", "q": "¿Qué es la vigilia?", "opts": ["Estar despierto, acompañando y esperando", "Una flor del Llano", "Un baile de fiesta", "Un tipo de semilla"], "why": "La vigilia es estar despierto, acompañando y esperando." },
    { "id": "p17", "topic": "estrofa2", "emoji": "🔢", "q": "¿Cuántos versos tiene la estrofa 2?", "opts": ["7", "2", "5", "10"], "why": "No les fue fácil / dormirse en la vigilia / cuando aún / reventaban los geranios / y el amor batía brazos / y palmas / y petardos: ¡7 versos!" },
    { "id": "p18", "topic": "estrofa1", "emoji": "🔢", "q": "¿Cuántos versos tiene la estrofa 1?", "opts": ["2", "7", "4", "1"], "why": "«Cuando un luchador muere» y «se siembra con él semilla buena»: 2 versos." },
    { "id": "p19", "topic": "estrofa3", "emoji": "🔍", "q": "¿Cómo empieza la estrofa 3?", "opts": ["No les era fácil", "No les fue fácil", "cuando aún", "y palmas"], "why": "La estrofa 3 empieza «No les ERA fácil». ¡No la confundas con la 2, que dice «fue»!" },
    { "id": "p20", "topic": "estrofa3", "emoji": "🧩", "q": "Completa: «No les era fácil…»", "opts": ["marchar", "dormirse", "cantar", "sembrar"], "why": "«No les era fácil / marchar…»." },
    { "id": "b1", "topic": "quien", "emoji": "🤔", "q": "¿Quién es Mariela Zuluaga?", "opts": ["Una escritora colombiana", "Una cantante mexicana", "Una científica española", "Una futbolista argentina"], "why": "Mariela Zuluaga, ella es una escritora, también es poeta y periodista colombiana." },
    { "id": "b2", "topic": "quien", "emoji": "🖋️", "q": "Además de escritora, Mariela Zuluaga es…", "opts": ["poeta y periodista", "pintora y doctora", "cantante y actriz", "profesora de inglés"], "why": "También es poeta y periodista colombiana." },
    { "id": "b3", "topic": "quien", "emoji": "🗺️", "q": "¿Dónde nació Mariela Zuluaga?", "opts": ["En Villavicencio", "En Bogotá", "En Medellín", "En Cali"], "why": "Nació en Villavicencio en 1948." },
    { "id": "b4", "topic": "quien", "emoji": "📅", "q": "¿En qué año nació?", "opts": ["1948", "1984", "1848", "2008"], "why": "Nació en Villavicencio en 1948: ¡mil novecientos cuarenta y ocho!" },
    { "id": "b5", "topic": "vida", "emoji": "👧", "q": "Desde pequeña, ¿qué le gustaba hacer?", "opts": ["Leer y escribir", "Jugar fútbol", "Cocinar", "Ver televisión"], "why": "A ella desde pequeña le gustaba leer y escribir." },
    { "id": "b6", "topic": "vida", "emoji": "💚", "q": "¿Qué más le gustaba de pequeña?", "opts": ["Conocer historias y la naturaleza", "Los videojuegos", "Ir de compras", "Los carros"], "why": "También le gustaba conocer historias y le gustaba mucho la naturaleza." },
    { "id": "b7", "topic": "crecio", "emoji": "💼", "q": "Cuando creció, ¿en qué consiguió trabajo?", "opts": ["Como periodista", "Como doctora", "Como piloto", "Como cocinera"], "why": "Cuando creció consiguió trabajo como periodista." },
    { "id": "b8", "topic": "crecio", "emoji": "🤝", "q": "¿A qué ayudó a las personas?", "opts": ["A aprender a escribir y leer", "A aprender a cocinar", "A aprender a nadar", "A aprender a sembrar"], "why": "También ayudó a personas a aprender a escribir y leer." },
    { "id": "b9", "topic": "importante", "emoji": "⭐", "q": "¿Por qué es importante Mariela Zuluaga?", "opts": ["Porque dedicó parte de su vida a escribir", "Porque ganó un partido de fútbol", "Porque fue presidenta", "Porque inventó el teléfono"], "why": "Es importante porque dedicó parte de su vida a escribir." },
    { "id": "b10", "topic": "importante", "emoji": "🎁", "q": "Con sus historias y poemas, ¿qué nos comparte?", "opts": ["Su imaginación", "Su comida", "Sus juguetes", "Su dinero"], "why": "Con sus historias y poemas nos comparte su imaginación." },
    { "id": "b11", "topic": "importante", "emoji": "😊", "q": "Gracias a ella, ¿qué disfrutamos más?", "opts": ["La lectura", "La televisión", "El fútbol", "La lluvia"], "why": "…y así disfrutamos más la lectura." },
    { "id": "b12", "topic": "obras", "emoji": "🖋️", "q": "¿Qué ha escrito Mariela Zuluaga?", "opts": ["Cuentos, poemas y novelas", "Recetas de cocina", "Libros de matemáticas", "Diccionarios"], "why": "Ella ha escrito cuentos, poemas y novelas." },
    { "id": "b13", "topic": "obras", "emoji": "🔍", "q": "¿Cuál de estos libros es de Mariela Zuluaga?", "opts": ["Gente que camina", "Cien años de soledad", "El renacuajo paseador", "Harry Potter"], "why": "«Gente que camina» es de Mariela Zuluaga. «Cien años de soledad» es de Gabriel García Márquez y «El renacuajo paseador», de Rafael Pombo." },
    { "id": "b14", "topic": "obras", "emoji": "🧩", "q": "Completa el nombre de su obra: «El país de los días…»", "opts": ["eternos", "felices", "soleados", "largos"], "why": "«El país de los días eternos»." },
    { "id": "b15", "topic": "obras", "emoji": "🧩", "q": "Completa el nombre de su obra: «Las cartas de…»", "opts": ["Grillo", "Sapo", "Pájaro", "Abuela"], "why": "«Las cartas de Grillo»." },
    { "id": "b16", "topic": "opinion", "emoji": "🧩", "q": "Completa tu opinión: «Me gustó saber de su vida porque…»", "opts": ["me gusta lo que escribe", "es muy famosa", "vive muy lejos", "tiene muchos libros"], "why": "«Me gustó saber de su vida porque me gusta lo que escribe, como sus poemas…»" },
    { "id": "b17", "topic": "opinion", "emoji": "🧩", "q": "Completa: «…y cómo con su imaginación creó…»", "opts": ["bonitas y grandes historias", "muchos dibujos", "una casa muy grande", "canciones de cuna"], "why": "«…y cómo con su imaginación creó bonitas y grandes historias.»" }
  ],
  "order": {
    "rounds": [
      { "set": "poema", "title": "Ordena los versos de la estrofa 2 🌺", "top": "⬆ Primer verso", "bottom": "⬇ Último verso", "say": "order-1",
        "events": [
          { "e": "🌺", "t": "No les fue fácil", "y": 1, "c": "#e11d48" },
          { "e": "🌺", "t": "dormirse en la vigilia", "y": 2, "c": "#e11d48" },
          { "e": "🌺", "t": "cuando aún", "y": 3, "c": "#e11d48" },
          { "e": "🌺", "t": "reventaban los geranios", "y": 4, "c": "#e11d48" },
          { "e": "🌺", "t": "y el amor batía brazos", "y": 5, "c": "#e11d48" },
          { "e": "🌺", "t": "y palmas", "y": 6, "c": "#e11d48" },
          { "e": "🌺", "t": "y petardos", "y": 7, "c": "#e11d48" }
        ] },
      { "set": "poema", "title": "¿Qué va primero en el poema? 📜", "top": "⬆ Primero", "bottom": "⬇ Después", "say": "order-2", "pick": 5,
        "events": [
          { "e": "📜", "t": "Cuando un luchador muere", "y": 1, "c": "#f97316" },
          { "e": "📜", "t": "se siembra con él semilla buena", "y": 2, "c": "#f97316" },
          { "e": "📜", "t": "No les fue fácil", "y": 3, "c": "#f97316" },
          { "e": "📜", "t": "dormirse en la vigilia", "y": 4, "c": "#f97316" },
          { "e": "📜", "t": "cuando aún", "y": 5, "c": "#f97316" },
          { "e": "📜", "t": "reventaban los geranios", "y": 6, "c": "#f97316" },
          { "e": "📜", "t": "y el amor batía brazos", "y": 7, "c": "#f97316" },
          { "e": "📜", "t": "y palmas", "y": 8, "c": "#f97316" },
          { "e": "📜", "t": "y petardos", "y": 9, "c": "#f97316" },
          { "e": "📜", "t": "No les era fácil", "y": 10, "c": "#f97316" },
          { "e": "📜", "t": "marchar", "y": 11, "c": "#f97316" }
        ] },
      { "set": "poema", "title": "Arma el segundo verso 🌱", "sub": "Ordena las palabras.", "top": "⬆ Primera palabra", "bottom": "⬇ Última palabra", "say": "order-3",
        "events": [
          { "e": "🌱", "t": "se", "y": 1, "c": "#16a34a" },
          { "e": "🌱", "t": "siembra", "y": 2, "c": "#16a34a" },
          { "e": "🌱", "t": "con", "y": 3, "c": "#16a34a" },
          { "e": "🌱", "t": "él", "y": 4, "c": "#16a34a" },
          { "e": "🌱", "t": "semilla", "y": 5, "c": "#16a34a" },
          { "e": "🌱", "t": "buena", "y": 6, "c": "#16a34a" }
        ] },
      { "set": "bio", "title": "Ordena las partes de la biografía 📝", "top": "⬆ Primero", "bottom": "⬇ Al final", "topics": "bio", "say": "order-4" },
      { "set": "bio", "title": "Arma la frase de «¿Quién es?» 🙋‍♀️", "sub": "Ordena los pedacitos.", "say": "order-5",
        "events": [
          { "e": "✍️", "t": "Mariela Zuluaga,", "y": 1, "c": "#0284c7" },
          { "e": "✍️", "t": "ella es una escritora,", "y": 2, "c": "#0284c7" },
          { "e": "✍️", "t": "también es poeta", "y": 3, "c": "#0284c7" },
          { "e": "✍️", "t": "y periodista colombiana.", "y": 4, "c": "#0284c7" },
          { "e": "✍️", "t": "Nació en Villavicencio", "y": 5, "c": "#0284c7" },
          { "e": "✍️", "t": "en 1948.", "y": 6, "c": "#0284c7" }
        ] },
      { "set": "bio", "title": "Arma tu opinión 💬", "sub": "Ordena los pedacitos.", "say": "order-6",
        "events": [
          { "e": "💜", "t": "Me gustó saber de su vida", "y": 1, "c": "#c026d3" },
          { "e": "💜", "t": "porque me gusta lo que escribe,", "y": 2, "c": "#c026d3" },
          { "e": "💜", "t": "como sus poemas,", "y": 3, "c": "#c026d3" },
          { "e": "💜", "t": "y cómo con su imaginación", "y": 4, "c": "#c026d3" },
          { "e": "💜", "t": "creó bonitas y grandes historias.", "y": 5, "c": "#c026d3" }
        ] }
    ]
  },
  "sort": {
    "hint": "¿En qué parte va? Arrástralo a su portal… ¡o toca el portal!",
    "items": [
      { "topic": "estrofa1", "e": "📜", "t": "Cuando un luchador muere" },
      { "topic": "estrofa1", "e": "📜", "t": "se siembra con él semilla buena" },
      { "topic": "estrofa2", "e": "📜", "t": "No les fue fácil" },
      { "topic": "estrofa2", "e": "📜", "t": "dormirse en la vigilia" },
      { "topic": "estrofa2", "e": "📜", "t": "cuando aún" },
      { "topic": "estrofa2", "e": "📜", "t": "reventaban los geranios" },
      { "topic": "estrofa2", "e": "📜", "t": "y el amor batía brazos" },
      { "topic": "estrofa2", "e": "📜", "t": "y palmas" },
      { "topic": "estrofa2", "e": "📜", "t": "y petardos" },
      { "topic": "estrofa3", "e": "📜", "t": "No les era fácil" },
      { "topic": "estrofa3", "e": "📜", "t": "marchar" },
      { "topic": "quien", "e": "📝", "t": "Es escritora, poeta y periodista colombiana" },
      { "topic": "quien", "e": "📝", "t": "Nació en Villavicencio en 1948" },
      { "topic": "vida", "e": "📝", "t": "Desde pequeña le gustaba leer y escribir" },
      { "topic": "vida", "e": "📝", "t": "Le gustaba conocer historias" },
      { "topic": "vida", "e": "📝", "t": "Le gustaba mucho la naturaleza" },
      { "topic": "crecio", "e": "📝", "t": "Consiguió trabajo como periodista" },
      { "topic": "crecio", "e": "📝", "t": "Ayudó a personas a aprender a escribir y leer" },
      { "topic": "importante", "e": "📝", "t": "Dedicó parte de su vida a escribir" },
      { "topic": "importante", "e": "📝", "t": "Nos comparte su imaginación" },
      { "topic": "importante", "e": "📝", "t": "Así disfrutamos más la lectura" },
      { "topic": "obras", "e": "📝", "t": "Cuentos, poemas y novelas" },
      { "topic": "obras", "e": "📝", "t": "«El país de los días eternos»" },
      { "topic": "obras", "e": "📝", "t": "«Gente que camina»" },
      { "topic": "obras", "e": "📝", "t": "«Las cartas de Grillo»" },
      { "topic": "opinion", "e": "📝", "t": "Me gustó saber de su vida" },
      { "topic": "opinion", "e": "📝", "t": "Me gusta lo que escribe, como sus poemas" },
      { "topic": "opinion", "e": "📝", "t": "Creó bonitas y grandes historias" }
    ]
  },
  "clues": {
    "estrofa1": [["💪", "Cuando un luchador muere"], ["🌾", "se siembra con él semilla buena"]],
    "estrofa2": [["🌙", "dormirse en la vigilia"], ["🌸", "reventaban los geranios"], ["🎆", "y palmas y petardos"]],
    "estrofa3": [["👣", "No les era fácil marchar"]],
    "quien": [["🇨🇴", "Escritora, poeta y periodista colombiana"], ["🏞️", "Nació en Villavicencio en 1948"]],
    "vida": [["👧", "Desde pequeña le gustaba leer y escribir"], ["🌳", "Le gustaba mucho la naturaleza"]],
    "crecio": [["🎤", "Consiguió trabajo como periodista"], ["✏️", "Ayudó a personas a aprender a escribir y leer"]],
    "importante": [["⏳", "Dedicó parte de su vida a escribir"], ["💭", "Nos comparte su imaginación"]],
    "obras": [["🚶", "«Gente que camina»"], ["☀️", "«El país de los días eternos»"]],
    "opinion": [["💜", "Me gustó saber de su vida"], ["🌈", "Creó bonitas y grandes historias"]]
  },
  "facts": [
    "¿Sabías que cada renglón de un poema se llama verso, y que un grupo de versos se llama estrofa?",
    "Truco para memorizar: lee una estrofa en voz alta, tápala y dila otra vez. ¡Repetir es como regar la semilla!",
    "¿Sabías que el poema «Mártires» está en un libro de Mariela Zuluaga que se llama «La palabra del sol»?",
    "¿Sabías que a Villavicencio la llaman «la puerta del Llano»? Es la capital del departamento del Meta.",
    "Truco: en la estrofa 2 hay tres versos que empiezan con «y»: y el amor, y palmas, y petardos. ¡Cuéntalos con los dedos!",
    "¿Sabías que los geranios son flores que se siembran mucho en los balcones y las ventanas?",
    "Truco para tu exposición: habla despacio, en voz alta y mirando a tus compañeros. ¡Lo vas a hacer muy bien!"
  ],
  "voice": {
    "welcome": "¡Hola, Sofía! Soy Cronos. Vamos a sembrar el poema en tu memoria, verso a verso. Tócame y te cuento secretos.",
    "order-1": "Ordena los versos de la estrofa dos, del primero al último.",
    "order-2": "¿Qué va primero en el poema? Ordena los versos.",
    "order-3": "Arma el segundo verso del poema: ordena las palabras.",
    "order-4": "Ordena las partes de la biografía, como en tu cuaderno.",
    "order-5": "Arma la frase de ¿Quién es?, pedacito a pedacito.",
    "order-6": "Ahora arma tu opinión, pedacito a pedacito.",
    "memoria": "Elige qué quieres memorizar y sube los escalones. ¡Cada vez escondo más palabras!",
    "mem-1": "Escucha y lee en voz alta. Toca un verso para oírlo otra vez.",
    "mem-2": "Escondí algunas palabras. Recita y toca una palabra solo si no te acuerdas.",
    "mem-3": "Ahora solo ves la primera letra de cada palabra. ¡Tú puedes!",
    "mem-4": "¡Todo escondido! Recítalo de memoria.",
    "mem-mic": "Te escucho. Recita en voz alta, y las palabras florecen cuando las dices.",
    "mem-grow": "¡Lo dijiste sin mirar! Tu planta creció.",
    "mem-peek": "¡Muy bien! Miraste algunas palabras. Inténtalo otra vez sin mirar para que tu planta crezca.",
    "mem-flower": "¡Tu planta floreció! Ya lo sabes de memoria.",
    "completa": "¿Qué palabra falta? Elige la correcta.",
    "next-line": "¿Qué verso sigue? Elige el correcto.",
    "poema-titulo": "Mártires. De Mariela Zuluaga.",
    "poema-1-1": "Cuando un luchador muere",
    "poema-1-2": "se siembra con él semilla buena.",
    "poema-2-1": "No les fue fácil",
    "poema-2-2": "dormirse en la vigilia",
    "poema-2-3": "cuando aún",
    "poema-2-4": "reventaban los geranios",
    "poema-2-5": "y el amor batía brazos",
    "poema-2-6": "y palmas",
    "poema-2-7": "y petardos.",
    "poema-3-1": "No les era fácil",
    "poema-3-2": "marchar",
    "bio-titulo": "Biografía de Mariela Zuluaga.",
    "bio-h-quien": "¿Quién es?",
    "bio-h-vida": "Su vida.",
    "bio-h-importante": "¿Por qué es importante?",
    "bio-h-obras": "Sus obras.",
    "bio-h-opinion": "Mi opinión.",
    "bio-quien-1": "Mariela Zuluaga, ella es una escritora,",
    "bio-quien-2": "también es poeta y periodista colombiana.",
    "bio-quien-3": "Nació en Villavicencio en 1948.",
    "bio-vida-1": "A ella desde pequeña le gustaba leer y escribir.",
    "bio-vida-2": "También le gustaba conocer historias",
    "bio-vida-3": "y le gustaba mucho la naturaleza.",
    "bio-crecio-1": "Cuando creció consiguió trabajo como periodista.",
    "bio-crecio-2": "También ayudó a personas a aprender a escribir y leer.",
    "bio-importante-1": "Es importante porque dedicó parte de su vida a escribir.",
    "bio-importante-2": "Con sus historias y poemas nos comparte su imaginación",
    "bio-importante-3": "y así disfrutamos más la lectura.",
    "bio-obras-1": "Ella ha escrito cuentos, poemas y novelas",
    "bio-obras-2": "como «El país de los días eternos»,",
    "bio-obras-3": "«Gente que camina» y «Las cartas de Grillo».",
    "bio-opinion-1": "Me gustó saber de su vida",
    "bio-opinion-2": "porque me gusta lo que escribe, como sus poemas,",
    "bio-opinion-3": "y cómo con su imaginación creó bonitas y grandes historias.",
    "ok-0": "¡Correcto!",
    "ok-1": "¡Excelente!",
    "ok-2": "¡Muy bien, Sofía!",
    "ok-3": "¡Eso es!",
    "ok-4": "¡Genial! Lo sabes de memoria.",
    "ok-5": "¡Perfecto!",
    "bad-0": "¡Uy, casi!",
    "bad-1": "No era esa, ¡pero ahora ya lo sabes!",
    "bad-2": "¡Ups! Mira cuál era la correcta.",
    "win": "¡Lo lograste! ¡Lo hiciste increíble!",
    "good": "¡Muy bien! Sigue practicando y te lo sabrás de memoria.",
    "stamp": "¡Descubriste todo! Ganaste un sello para tu pasaporte.",
    "order-ok": "¡Orden perfecto!",
    "order-bad": "Algunas no están en su lugar. ¡Inténtalo otra vez!",
    "sort": "¿De qué parte es? ¡Mándalo al portal correcto!",
    "memory": "Encuentra las parejas: cada parte con su frase.",
    "pair": "¡Pareja encontrada!",
    "passport": "Este es tu pasaporte. Explora cada parte para ganar todos los sellos."
  }
}/*END*/;
