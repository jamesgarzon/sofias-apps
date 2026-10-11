// Contenido de la app. El bloque marcado con los comentarios JSON/END es JSON estricto:
// gen_audio.py lo lee para generar las voces, así que nada de comentarios ni comas finales ahí dentro.
window.HISTORIA = /*JSON*/{
  "journeys": {
    "w": { "name": "Historia del Mundo", "emoji": "🌍", "eras": ["prehistoria", "antigua", "media", "moderna", "contemporanea"] },
    "c": { "name": "Historia de Colombia", "emoji": "🇨🇴", "eras": ["precolombina", "conquista", "colonia", "independencia", "republicana"] }
  },
  "eras": {
    "prehistoria": {
      "j": "w", "name": "La Prehistoria", "short": "Prehistoria", "emoji": "🦣",
      "color": "#f08a3c", "dark": "#7a3417", "year": -2500000,
      "from": "Hace millones de años", "to": "3500 a.C.",
      "start": "Aparecen los primeros seres humanos",
      "end": "Se inventa la escritura",
      "intro": "La Prehistoria es la etapa más larga de la historia. Empieza cuando aparecen los primeros seres humanos y termina cuando se inventa la escritura, hace unos 5.500 años. Tiene tres partes: Paleolítico, Neolítico y Edad de los Metales.",
      "hotspots": [
        { "emoji": "🖐️", "title": "Pinturas rupestres", "text": "Los seres humanos pintaban en las paredes de las cuevas animales como bisontes, caballos y venados. ¡También dejaban marcadas sus manos! Hacían los colores con tierra y carbón." },
        { "emoji": "🔥", "title": "¡El fuego!", "text": "Aprender a usar el fuego lo cambió todo: les daba calor y luz en la noche, los protegía de los animales y les permitía cocinar." },
        { "emoji": "🦣", "title": "Cazadores y recolectores", "text": "Al principio eran nómadas: no tenían casa fija. Iban de un lugar a otro cazando animales, como el mamut, y recolectando frutos y raíces." },
        { "emoji": "🪨", "title": "Herramientas de piedra", "text": "Primero tallaban la piedra a golpes: el Paleolítico. Luego la pulían para hacerla más fina: el Neolítico. Al final aprendieron a usar el cobre, el bronce y el hierro: la Edad de los Metales." },
        { "emoji": "🌾", "title": "Agricultura y aldeas", "text": "En el Neolítico aprendieron a sembrar plantas y a criar animales. Ya no tenían que viajar: se volvieron sedentarios y construyeron las primeras aldeas." }
      ]
    },
    "antigua": {
      "j": "w", "name": "La Edad Antigua", "short": "Edad Antigua", "emoji": "🏛️",
      "color": "#f2b632", "dark": "#7a5410", "year": -3500,
      "from": "3500 a.C.", "to": "476 d.C.",
      "start": "Se inventa la escritura",
      "end": "Cae el Imperio romano de Occidente",
      "intro": "La Edad Antigua empieza con la invención de la escritura, hace unos 5.500 años, y termina en el año 476, cuando cayó el Imperio romano de Occidente. Fue la época de las grandes civilizaciones: Mesopotamia, Egipto, Grecia y Roma.",
      "hotspots": [
        { "emoji": "📜", "title": "La escritura", "text": "En Mesopotamia inventaron la escritura cuneiforme: marcaban signos en tablillas de barro. ¡Con la escritura empieza la Historia!" },
        { "emoji": "🔺", "title": "Egipto", "text": "Los egipcios construyeron enormes pirámides como tumbas para sus reyes, los faraones. Escribían con dibujos llamados jeroglíficos." },
        { "emoji": "⛵", "title": "Junto a los grandes ríos", "text": "Las primeras civilizaciones nacieron cerca de grandes ríos, como el Nilo en Egipto o el Tigris y el Éufrates en Mesopotamia. El agua les ayudaba a cultivar." },
        { "emoji": "🏛️", "title": "Grecia", "text": "Los griegos inventaron la democracia, que significa “el gobierno del pueblo”, y los Juegos Olímpicos. También tuvieron grandes pensadores llamados filósofos." },
        { "emoji": "🏟️", "title": "Roma", "text": "Los romanos formaron un imperio enorme. Construyeron caminos, puentes y acueductos para llevar agua. Hablaban latín, ¡y de él viene nuestro idioma español!" }
      ]
    },
    "media": {
      "j": "w", "name": "La Edad Media", "short": "Edad Media", "emoji": "🏰",
      "color": "#4fbf6a", "dark": "#1f5a30", "year": 476,
      "from": "476", "to": "1492",
      "start": "Cae el Imperio romano de Occidente",
      "end": "Cristóbal Colón llega a América",
      "note": "Algunos libros dicen que la Edad Media termina en 1453, con la caída de Constantinopla.",
      "intro": "La Edad Media empieza en el año 476, con la caída del Imperio romano, y termina en 1492, cuando Cristóbal Colón llegó a América. Duró unos mil años. ¡Es la época de los castillos y los caballeros!",
      "hotspots": [
        { "emoji": "🏰", "title": "El castillo", "text": "Los reyes y los señores feudales vivían en castillos con murallas y torres para defenderse. Eran los dueños de las tierras. A esta forma de vivir se le llama feudalismo." },
        { "emoji": "🛡️", "title": "Los caballeros", "text": "Los caballeros eran guerreros con armadura, escudo y espada. Peleaban a caballo y protegían al señor feudal y a su castillo." },
        { "emoji": "🌾", "title": "Los campesinos", "text": "La mayoría de las personas eran campesinos o siervos. Trabajaban las tierras del señor feudal y a cambio recibían protección." },
        { "emoji": "⛪", "title": "Los monasterios", "text": "La Iglesia era muy importante. En los monasterios, los monjes copiaban los libros a mano, ¡letra por letra! También se construyeron grandes catedrales." }
      ]
    },
    "moderna": {
      "j": "w", "name": "La Edad Moderna", "short": "Edad Moderna", "emoji": "⛵",
      "color": "#2bb3d6", "dark": "#0f4a66", "year": 1492,
      "from": "1492", "to": "1789",
      "start": "Cristóbal Colón llega a América",
      "end": "La Revolución francesa",
      "intro": "La Edad Moderna empieza en 1492, cuando Cristóbal Colón llegó a América, y termina en 1789 con la Revolución francesa. Fue una época de grandes viajes, descubrimientos, arte y ciencia.",
      "hotspots": [
        { "emoji": "⛵", "title": "Las carabelas de Colón", "text": "En 1492, Cristóbal Colón cruzó el océano Atlántico con tres carabelas: la Niña, la Pinta y la Santa María. Así los europeos llegaron a América." },
        { "emoji": "📖", "title": "Libros para todos", "text": "Poco antes, Gutenberg había inventado la imprenta, una máquina para hacer muchos libros rápido. En la Edad Moderna los libros llegaron a muchísimas personas." },
        { "emoji": "🎨", "title": "El Renacimiento", "text": "Fue una época de mucho arte. Leonardo da Vinci pintó la Mona Lisa y Miguel Ángel pintó el techo de la Capilla Sixtina." },
        { "emoji": "🔭", "title": "La ciencia", "text": "Galileo Galilei usó el telescopio para observar el cielo y ayudó a demostrar que la Tierra gira alrededor del Sol." },
        { "emoji": "🌍", "title": "La vuelta al mundo", "text": "Los exploradores Magallanes y Elcano hicieron el primer viaje alrededor del mundo. ¡Demostraron que se podía dar la vuelta completa a la Tierra navegando!" }
      ]
    },
    "contemporanea": {
      "j": "w", "name": "La Edad Contemporánea", "short": "Edad Contemporánea", "emoji": "🚀",
      "color": "#9b6bff", "dark": "#35207a", "year": 1789,
      "from": "1789", "to": "hoy",
      "start": "La Revolución francesa",
      "end": "¡Todavía no termina! Es la época en que vivimos",
      "intro": "La Edad Contemporánea empieza en 1789 con la Revolución francesa y llega hasta hoy. ¡Es la época en la que tú vives! Ha tenido muchísimos inventos.",
      "hotspots": [
        { "emoji": "🇫🇷", "title": "La Revolución francesa", "text": "En 1789, el pueblo de Francia se rebeló contra el rey. Pedían libertad, igualdad y fraternidad, y se escribieron los derechos de las personas." },
        { "emoji": "🏭", "title": "La Revolución Industrial", "text": "Se inventó la máquina de vapor. Aparecieron las fábricas y los trenes, y muchas cosas se empezaron a hacer con máquinas." },
        { "emoji": "💡", "title": "La electricidad", "text": "La electricidad llegó a las casas y a las ciudades. Thomas Edison mejoró la bombilla, ¡y la noche se llenó de luz! Después llegaron los carros y los aviones." },
        { "emoji": "🚀", "title": "¡A la Luna!", "text": "En 1969, el astronauta Neil Armstrong fue el primer ser humano en caminar sobre la Luna." },
        { "emoji": "💻", "title": "Computadores e internet", "text": "Hoy tenemos computadores, internet y celulares para comunicarnos con todo el mundo en segundos. ¡Y la historia la seguimos escribiendo nosotros!" }
      ]
    },
    "precolombina": {
      "j": "c", "name": "La Época Precolombina", "short": "Precolombina", "emoji": "🛶",
      "color": "#f5c518", "dark": "#6b4e00", "year": -10000,
      "from": "Hace miles de años", "to": "1499",
      "start": "Llegan los primeros pobladores a nuestro territorio",
      "end": "Llegan los españoles",
      "intro": "La época precolombina es la historia de los pueblos indígenas antes de que llegaran los europeos. Se llama así porque es antes de Colón: pre, colombina. Aquí vivían muchos pueblos, como los muiscas, los taironas, los zenúes y los quimbayas.",
      "hotspots": [
        { "emoji": "🛶", "title": "Los muiscas y El Dorado", "text": "Los muiscas vivían en el altiplano, donde hoy está Bogotá. Cuando tenían un nuevo cacique, lo cubrían de polvo de oro y navegaba en una balsa por la laguna de Guatavita. ¡De ahí nació la leyenda de El Dorado!" },
        { "emoji": "⛰️", "title": "Los taironas", "text": "Los taironas vivían en la Sierra Nevada de Santa Marta. Construyeron Ciudad Perdida, con terrazas y caminos de piedra en medio de la selva." },
        { "emoji": "🗿", "title": "San Agustín", "text": "En San Agustín, en el Huila, un pueblo antiguo talló cientos de estatuas gigantes de piedra. ¡Todavía hoy podemos visitarlas!" },
        { "emoji": "✨", "title": "Orfebres del oro", "text": "Los indígenas eran grandes orfebres: hacían figuras y joyas de oro. El Poporo Quimbaya es una de las más famosas y está en el Museo del Oro de Bogotá." },
        { "emoji": "🌽", "title": "Agricultura y cerámica", "text": "Cultivaban maíz, papa, yuca y fríjol, y hacían vasijas de barro. Los zenúes construyeron canales para controlar las inundaciones de los ríos." }
      ]
    },
    "conquista": {
      "j": "c", "name": "La Conquista", "short": "Conquista", "emoji": "⚔️",
      "color": "#ff6b5b", "dark": "#7a1f17", "year": 1499,
      "from": "1499", "to": "1550",
      "start": "Los españoles llegan a La Guajira",
      "end": "España ya domina el territorio",
      "intro": "La Conquista empieza en 1499, cuando los españoles llegaron a las costas de La Guajira. Venían a tomar estas tierras para el rey de España y a buscar oro. Los pueblos indígenas lucharon para defender su territorio.",
      "hotspots": [
        { "emoji": "⛵", "title": "Llegan los barcos", "text": "En 1499, Alonso de Ojeda llegó con sus barcos al Cabo de la Vela, en La Guajira. Fueron los primeros españoles en llegar a nuestro territorio." },
        { "emoji": "⚔️", "title": "Los conquistadores", "text": "Los conquistadores tenían armaduras de metal, armas de fuego y caballos, unos animales que los indígenas nunca habían visto." },
        { "emoji": "🏘️", "title": "Nuevas ciudades", "text": "Los españoles fundaron ciudades: Santa Marta en 1525, ¡la más antigua de Colombia!, Cartagena en 1533 y Santafé de Bogotá en 1538, fundada por Gonzalo Jiménez de Quesada." },
        { "emoji": "💰", "title": "En busca de El Dorado", "text": "Los conquistadores oyeron la leyenda de El Dorado y buscaron una ciudad llena de oro. Nunca la encontraron, pero se llevaron mucho oro a España." },
        { "emoji": "🏹", "title": "La resistencia indígena", "text": "Muchos pueblos indígenas lucharon con valentía, como la cacica Gaitana. Por desgracia, muchos murieron por la guerra y por enfermedades que llegaron de Europa." }
      ]
    },
    "colonia": {
      "j": "c", "name": "La Colonia", "short": "Colonia", "emoji": "👑",
      "color": "#ff9f43", "dark": "#7a3d00", "year": 1550,
      "from": "1550", "to": "1810",
      "start": "España organiza su gobierno aquí",
      "end": "El Grito de Independencia, en 1810",
      "intro": "Durante la Colonia, España gobernó nuestro territorio por más de 250 años. Se llamaba Nuevo Reino de Granada y después Virreinato de la Nueva Granada. Aquí se mezclaron las culturas indígena, española y africana.",
      "hotspots": [
        { "emoji": "👑", "title": "El virrey", "text": "El rey de España vivía muy lejos, así que enviaba a un virrey para gobernar en su nombre. Las leyes y los impuestos venían de España." },
        { "emoji": "🏰", "title": "Las murallas de Cartagena", "text": "Los piratas querían robar el oro de los barcos. Por eso Cartagena se rodeó de murallas y fuertes, como el Castillo de San Felipe de Barajas." },
        { "emoji": "🤝", "title": "Mezcla de culturas", "text": "Aquí se mezclaron indígenas, españoles y africanos traídos a la fuerza como esclavos. Los hijos de esas mezclas se llamaron mestizos, y los hijos de españoles nacidos aquí, criollos." },
        { "emoji": "⛪", "title": "La religión y el idioma", "text": "Los españoles trajeron la religión católica y el idioma español. Construyeron muchas iglesias, y cada pueblo tenía su plaza principal con su iglesia." },
        { "emoji": "🌺", "title": "La Expedición Botánica", "text": "José Celestino Mutis dirigió la Expedición Botánica: estudiaron y dibujaron miles de plantas de nuestro territorio." },
        { "emoji": "📜", "title": "Los Comuneros", "text": "En 1781 el pueblo protestó porque los impuestos eran muy altos. Manuela Beltrán rompió el aviso de los nuevos impuestos. ¡Fue la Revolución de los Comuneros!" }
      ]
    },
    "independencia": {
      "j": "c", "name": "La Independencia", "short": "Independencia", "emoji": "🏺",
      "color": "#3d8bff", "dark": "#123a7a", "year": 1810,
      "from": "1810", "to": "1819",
      "start": "El Grito de Independencia, 20 de julio de 1810",
      "end": "La Batalla de Boyacá, 7 de agosto de 1819",
      "intro": "La Independencia fue la lucha para liberarnos del gobierno de España. Empezó el 20 de julio de 1810, con el Grito de Independencia, y terminó con la Batalla de Boyacá, el 7 de agosto de 1819.",
      "hotspots": [
        { "emoji": "🏺", "title": "El Florero de Llorente", "text": "El 20 de julio de 1810, unos criollos le pidieron prestado un florero al español José González Llorente. Él se negó, hubo una pelea y el pueblo se reunió en la plaza: ¡fue el Grito de Independencia!" },
        { "emoji": "🎖️", "title": "Simón Bolívar", "text": "Simón Bolívar es llamado El Libertador. Dirigió la Campaña Libertadora y cruzó con su ejército las montañas heladas de los Andes." },
        { "emoji": "📘", "title": "Francisco de Paula Santander", "text": "Santander luchó junto a Bolívar. Lo llaman el Hombre de las Leyes porque ayudó a organizar el nuevo país con leyes y escuelas." },
        { "emoji": "💌", "title": "La Pola", "text": "Policarpa Salavarrieta, La Pola, fue una heroína muy valiente: llevaba mensajes secretos para ayudar a los patriotas." },
        { "emoji": "🌉", "title": "La Batalla de Boyacá", "text": "El 7 de agosto de 1819, en el Puente de Boyacá, el ejército patriota venció a los españoles. ¡Así se logró la independencia!" }
      ]
    },
    "republicana": {
      "j": "c", "name": "El Periodo Republicano", "short": "República", "emoji": "🗳️",
      "color": "#ff4f8b", "dark": "#7a1240", "year": 1819,
      "from": "1819", "to": "hoy",
      "start": "Después de la Batalla de Boyacá ya somos libres",
      "end": "¡Llega hasta hoy!",
      "intro": "El Periodo Republicano empieza en 1819, cuando ya éramos libres, y llega hasta hoy. En una república, el pueblo elige a sus gobernantes y todos debemos cumplir la Constitución.",
      "hotspots": [
        { "emoji": "🗺️", "title": "La Gran Colombia", "text": "Primero formamos la Gran Colombia junto con Venezuela, Ecuador y Panamá. Simón Bolívar fue su presidente. En 1830 se separó." },
        { "emoji": "🏛️", "title": "El Capitolio", "text": "En el Capitolio Nacional se reúne el Congreso, que hace las leyes. El poder se divide en tres: el presidente, el Congreso y los jueces." },
        { "emoji": "🕊️", "title": "Fin de la esclavitud", "text": "En 1851 se abolió la esclavitud en Colombia. Desde entonces, ninguna persona puede ser dueña de otra." },
        { "emoji": "🇨🇴", "title": "Nuestro nombre", "text": "Nuestro país tuvo varios nombres, como Nueva Granada y Estados Unidos de Colombia. ¡Desde 1886 se llama República de Colombia!" },
        { "emoji": "📘", "title": "La Constitución de 1991", "text": "La Constitución es la ley más importante del país. La de 1991 protege los derechos de todas las personas, ¡también los de los niños!" },
        { "emoji": "🗳️", "title": "¡A votar!", "text": "En la república, los ciudadanos votan para elegir al presidente. Las mujeres votaron por primera vez en 1957." }
      ]
    }
  },
  "questions": [
    { "id": "w1", "era": "prehistoria", "emoji": "🦣", "q": "¿Cuál es la etapa más larga de la historia?", "opts": ["La Prehistoria", "La Edad Media", "La Edad Moderna", "La Edad Contemporánea"], "why": "La Prehistoria duró millones de años: ¡muchísimo más que todas las otras juntas!" },
    { "id": "w2", "era": "antigua", "emoji": "📜", "q": "¿Qué invento marca el fin de la Prehistoria y el inicio de la Edad Antigua?", "opts": ["La escritura", "La rueda", "La imprenta", "La bombilla"], "why": "La escritura se inventó en Mesopotamia hace unos 5.500 años. Con ella empieza la Edad Antigua." },
    { "id": "w3", "era": "prehistoria", "emoji": "🖐️", "q": "¿Dónde pintaban los seres humanos de la Prehistoria?", "opts": ["En las paredes de las cuevas", "En cuadernos de papel", "En pantallas", "En las paredes de los castillos"], "why": "Se llaman pinturas rupestres: animales y manos pintados en las cuevas." },
    { "id": "w4", "era": "prehistoria", "emoji": "🚶", "q": "Las personas que viajaban de un lugar a otro, sin casa fija, se llaman…", "opts": ["Nómadas", "Sedentarios", "Faraones", "Caballeros"], "why": "Los nómadas se movían buscando comida. Los sedentarios se quedan a vivir en un solo lugar." },
    { "id": "w5", "era": "prehistoria", "emoji": "🌾", "q": "¿Qué aprendieron a hacer en el Neolítico?", "opts": ["Sembrar plantas y criar animales", "Construir castillos", "Imprimir libros", "Viajar a la Luna"], "why": "Con la agricultura y la ganadería se volvieron sedentarios y crearon aldeas." },
    { "id": "w6", "era": "prehistoria", "emoji": "🔥", "q": "¿Qué descubrimiento les dio calor, luz y la posibilidad de cocinar?", "opts": ["El fuego", "La electricidad", "El vapor", "El oro"], "why": "Usar el fuego fue uno de los grandes logros de la Prehistoria." },
    { "id": "w7", "era": "antigua", "emoji": "🔺", "q": "¿Quiénes construyeron las pirámides para sus faraones?", "opts": ["Los egipcios", "Los romanos", "Los muiscas", "Los vikingos"], "why": "Las pirámides de Egipto eran tumbas para los faraones." },
    { "id": "w8", "era": "antigua", "emoji": "🏛️", "q": "¿Qué inventaron los griegos?", "opts": ["La democracia y los Juegos Olímpicos", "La imprenta y el telescopio", "El tren y la bombilla", "Los castillos y las armaduras"], "why": "Democracia significa “el gobierno del pueblo”. ¡Y los Juegos Olímpicos todavía existen!" },
    { "id": "w9", "era": "antigua", "emoji": "🗣️", "q": "Nuestro idioma español viene del latín, que era el idioma de…", "opts": ["Los romanos", "Los egipcios", "Los griegos", "Los muiscas"], "why": "Los romanos hablaban latín, y de él nacieron el español, el italiano y el francés." },
    { "id": "w10", "era": "antigua", "emoji": "🏛️", "q": "¿Con qué hecho termina la Edad Antigua?", "opts": ["La caída del Imperio romano, en el año 476", "La llegada de Colón a América", "La Revolución francesa", "La invención de la escritura"], "why": "En el año 476 cayó el Imperio romano de Occidente y empezó la Edad Media." },
    { "id": "w11", "era": "media", "emoji": "🏰", "q": "¿Qué época es famosa por los castillos y los caballeros?", "opts": ["La Edad Media", "La Prehistoria", "La Edad Contemporánea", "La Edad Antigua"], "why": "En la Edad Media los señores feudales vivían en castillos protegidos por caballeros." },
    { "id": "w12", "era": "media", "emoji": "✍️", "q": "En la Edad Media, ¿quiénes copiaban los libros a mano?", "opts": ["Los monjes", "Los faraones", "Los astronautas", "Los cazadores"], "why": "En los monasterios, los monjes copiaban los libros letra por letra." },
    { "id": "w13", "era": "media", "emoji": "🌾", "q": "¿Cómo se llama la forma de vivir en la que los señores eran dueños de la tierra y los campesinos la trabajaban?", "opts": ["El feudalismo", "La democracia", "El Renacimiento", "La Revolución Industrial"], "why": "En el feudalismo, los siervos trabajaban para el señor feudal y él los protegía." },
    { "id": "w14", "era": "moderna", "emoji": "⛵", "q": "¿Con qué hecho termina la Edad Media y empieza la Edad Moderna?", "opts": ["Colón llega a América en 1492", "Cae el Imperio romano", "Se inventa la escritura", "El ser humano llega a la Luna"], "why": "En 1492 Cristóbal Colón llegó a América. ¡Empieza la Edad Moderna!" },
    { "id": "w15", "era": "moderna", "emoji": "⛵", "q": "¿Cómo se llamaban las tres carabelas de Colón?", "opts": ["La Niña, la Pinta y la Santa María", "La Bella, la Grande y la Rápida", "La Rosa, la Estrella y la Luna", "La Pinta, la Perla y la Sirena"], "why": "La Niña, la Pinta y la Santa María cruzaron el océano Atlántico." },
    { "id": "w16", "era": "moderna", "emoji": "🎨", "q": "¿Quién pintó la Mona Lisa?", "opts": ["Leonardo da Vinci", "Cristóbal Colón", "Galileo Galilei", "Simón Bolívar"], "why": "Leonardo da Vinci fue un gran artista e inventor del Renacimiento." },
    { "id": "w17", "era": "moderna", "emoji": "🔭", "q": "¿Qué usó Galileo para observar el cielo?", "opts": ["Un telescopio", "Una lupa", "Un celular", "Un microscopio"], "why": "Con su telescopio, Galileo ayudó a demostrar que la Tierra gira alrededor del Sol." },
    { "id": "w18", "era": "contemporanea", "emoji": "🇫🇷", "q": "¿Con qué hecho empieza la Edad Contemporánea?", "opts": ["La Revolución francesa, en 1789", "La llegada de Colón a América", "La caída del Imperio romano", "La invención de internet"], "why": "En 1789 el pueblo francés se rebeló. Desde ahí hasta hoy es la Edad Contemporánea." },
    { "id": "w19", "era": "contemporanea", "emoji": "🗣️", "q": "¿Qué pedía el pueblo en la Revolución francesa?", "opts": ["Libertad, igualdad y fraternidad", "Más castillos y caballeros", "Más impuestos para el rey", "Volver a vivir en cuevas"], "why": "Libertad, igualdad y fraternidad fue su gran lema." },
    { "id": "w20", "era": "contemporanea", "emoji": "🚂", "q": "¿Qué máquina impulsó la Revolución Industrial?", "opts": ["La máquina de vapor", "La rueda", "La imprenta", "El arado"], "why": "La máquina de vapor movía las fábricas y los trenes." },
    { "id": "w21", "era": "contemporanea", "emoji": "🌕", "q": "¿En qué año llegó el ser humano a la Luna?", "opts": ["1969", "1492", "1789", "476"], "why": "En 1969 Neil Armstrong caminó sobre la Luna." },
    { "id": "w22", "era": "contemporanea", "emoji": "📱", "q": "¿En qué época vives tú?", "opts": ["En la Edad Contemporánea", "En la Edad Media", "En la Edad Moderna", "En la Prehistoria"], "why": "¡La Edad Contemporánea llega hasta hoy!" },
    { "id": "w23", "era": "moderna", "emoji": "➡️", "q": "¿Qué época viene justo después de la Edad Media?", "opts": ["La Edad Moderna", "La Edad Antigua", "La Prehistoria", "La Edad Contemporánea"], "why": "El orden es: Prehistoria, Antigua, Media, Moderna y Contemporánea." },
    { "id": "w24", "era": "antigua", "emoji": "⬅️", "q": "¿Qué época viene justo antes de la Edad Media?", "opts": ["La Edad Antigua", "La Edad Moderna", "La Edad Contemporánea", "La Prehistoria"], "why": "Primero la Edad Antigua y, cuando cae Roma, la Edad Media." },
    { "id": "w25", "era": "prehistoria", "emoji": "🧭", "q": "¿Cuál es el orden correcto de las etapas de la historia?", "opts": ["Prehistoria, Antigua, Media, Moderna, Contemporánea", "Antigua, Prehistoria, Media, Moderna, Contemporánea", "Prehistoria, Media, Antigua, Contemporánea, Moderna", "Prehistoria, Antigua, Moderna, Media, Contemporánea"], "why": "¡Prehistoria, Antigua, Media, Moderna y Contemporánea!" },
    { "id": "w26", "era": "prehistoria", "emoji": "🪨", "q": "¿Cuáles son las tres partes de la Prehistoria?", "opts": ["Paleolítico, Neolítico y Edad de los Metales", "Egipto, Grecia y Roma", "Castillos, caballeros y monjes", "Mañana, tarde y noche"], "why": "Paleolítico: piedra tallada. Neolítico: piedra pulida y agricultura. Edad de los Metales: cobre, bronce y hierro." },

    { "id": "c1", "era": "precolombina", "emoji": "🛶", "q": "¿Cómo se llama la época de los pueblos indígenas antes de que llegaran los españoles?", "opts": ["La Época Precolombina", "La Colonia", "La Independencia", "El Periodo Republicano"], "why": "Precolombina quiere decir “antes de Colón”." },
    { "id": "c2", "era": "precolombina", "emoji": "🤔", "q": "¿Qué quiere decir “precolombina”?", "opts": ["Antes de Colón", "Después de Colón", "Durante la Colonia", "En la República"], "why": "“Pre” significa antes. Es la época antes de que llegaran Colón y los europeos." },
    { "id": "c3", "era": "precolombina", "emoji": "🛶", "q": "¿Qué pueblo hacía la ceremonia de la balsa de oro en la laguna de Guatavita?", "opts": ["Los muiscas", "Los taironas", "Los zenúes", "Los españoles"], "why": "Los muiscas cubrían de oro a su nuevo cacique y navegaba en una balsa." },
    { "id": "c4", "era": "precolombina", "emoji": "✨", "q": "¿Qué leyenda nació de la ceremonia de la balsa muisca?", "opts": ["La leyenda de El Dorado", "La leyenda de la Llorona", "La leyenda del Mohán", "La leyenda de la Madremonte"], "why": "Los españoles imaginaron un lugar lleno de oro: El Dorado." },
    { "id": "c5", "era": "precolombina", "emoji": "⛰️", "q": "¿Qué construyeron los taironas en la Sierra Nevada de Santa Marta?", "opts": ["Ciudad Perdida", "Las pirámides", "El Capitolio", "Las murallas de Cartagena"], "why": "Ciudad Perdida tiene terrazas y caminos de piedra en la selva." },
    { "id": "c6", "era": "precolombina", "emoji": "🗿", "q": "¿Dónde están las estatuas gigantes de piedra de un pueblo antiguo?", "opts": ["En San Agustín, Huila", "En Cartagena", "En el Capitolio", "En La Guajira"], "why": "En San Agustín hay cientos de estatuas de piedra." },
    { "id": "c7", "era": "precolombina", "emoji": "🏺", "q": "¿Qué famosa pieza de oro está en el Museo del Oro?", "opts": ["El Poporo Quimbaya", "La Mona Lisa", "El Florero de Llorente", "La Constitución"], "why": "El Poporo Quimbaya fue hecho por grandes orfebres indígenas." },
    { "id": "c8", "era": "precolombina", "emoji": "🌽", "q": "¿Qué cultivaban los pueblos indígenas?", "opts": ["Maíz, papa y yuca", "Manzanas y uvas", "Trigo y arroz", "Nada, solo cazaban"], "why": "El maíz, la papa y la yuca eran muy importantes para ellos." },
    { "id": "c9", "era": "conquista", "emoji": "⛵", "q": "¿Con qué hecho empieza la Conquista?", "opts": ["Los españoles llegan a La Guajira en 1499", "El Grito de Independencia", "La Batalla de Boyacá", "La Constitución de 1991"], "why": "En 1499 Alonso de Ojeda llegó al Cabo de la Vela, en La Guajira." },
    { "id": "c10", "era": "conquista", "emoji": "💰", "q": "¿Qué buscaban los conquistadores españoles?", "opts": ["Oro y tierras para el rey de España", "Unas vacaciones en la playa", "Aprender a hablar muisca", "Un lugar para hacer pirámides"], "why": "Buscaban oro, como el de El Dorado, y tierras para el rey." },
    { "id": "c11", "era": "conquista", "emoji": "🏘️", "q": "¿Cuál es la ciudad más antigua de Colombia, fundada en 1525?", "opts": ["Santa Marta", "Bogotá", "Medellín", "Cali"], "why": "Rodrigo de Bastidas fundó Santa Marta en 1525." },
    { "id": "c12", "era": "conquista", "emoji": "🏙️", "q": "¿Quién fundó Santafé de Bogotá en 1538?", "opts": ["Gonzalo Jiménez de Quesada", "Simón Bolívar", "Cristóbal Colón", "José Celestino Mutis"], "why": "Gonzalo Jiménez de Quesada fundó Bogotá en 1538." },
    { "id": "c13", "era": "conquista", "emoji": "🐴", "q": "¿Qué animal trajeron los españoles que los indígenas nunca habían visto?", "opts": ["El caballo", "El jaguar", "El cóndor", "El colibrí"], "why": "No había caballos en América: los trajeron los españoles." },
    { "id": "c14", "era": "conquista", "emoji": "🏹", "q": "¿Qué cacica indígena luchó con valentía contra los conquistadores?", "opts": ["La Gaitana", "La Pola", "Manuela Beltrán", "Antonia Santos"], "why": "La cacica Gaitana dirigió a su pueblo contra los conquistadores." },
    { "id": "c15", "era": "colonia", "emoji": "👑", "q": "Durante la Colonia, ¿quién gobernaba aquí en nombre del rey de España?", "opts": ["El virrey", "El presidente", "El cacique", "El faraón"], "why": "El virrey gobernaba el Virreinato de la Nueva Granada en nombre del rey." },
    { "id": "c16", "era": "colonia", "emoji": "🏴‍☠️", "q": "¿Por qué Cartagena construyó murallas y fuertes?", "opts": ["Para protegerse de los piratas", "Para jugar a las escondidas", "Para guardar animales", "Para separar los barrios"], "why": "Las murallas y el Castillo de San Felipe defendían la ciudad de los piratas." },
    { "id": "c17", "era": "colonia", "emoji": "🧒", "q": "¿Cómo se llamaban los hijos de españoles nacidos en América?", "opts": ["Criollos", "Mestizos", "Virreyes", "Caciques"], "why": "Criollos: hijos de españoles nacidos aquí. Mestizos: hijos de la mezcla de culturas." },
    { "id": "c18", "era": "colonia", "emoji": "🌺", "q": "¿Quién dirigió la Expedición Botánica, que estudió nuestras plantas?", "opts": ["José Celestino Mutis", "Antonio Nariño", "Alonso de Ojeda", "Gonzalo Jiménez de Quesada"], "why": "Mutis y su equipo dibujaron miles de plantas." },
    { "id": "c19", "era": "colonia", "emoji": "📜", "q": "¿Qué heroína rompió el aviso de impuestos en la Revolución de los Comuneros?", "opts": ["Manuela Beltrán", "Policarpa Salavarrieta", "La cacica Gaitana", "Antonia Santos"], "why": "En 1781 Manuela Beltrán rompió el aviso de los impuestos." },
    { "id": "c20", "era": "colonia", "emoji": "🤝", "q": "¿Qué culturas se mezclaron durante la Colonia?", "opts": ["Indígena, española y africana", "Egipcia, griega y romana", "China, japonesa y coreana", "Ninguna, no hubo mezcla"], "why": "De esa mezcla nació gran parte de lo que somos hoy." },
    { "id": "c21", "era": "independencia", "emoji": "🏺", "q": "¿Qué pasó el 20 de julio de 1810?", "opts": ["El Grito de Independencia", "La Batalla de Boyacá", "La llegada de Colón", "La fundación de Bogotá"], "why": "Por eso el 20 de julio celebramos la independencia." },
    { "id": "c22", "era": "independencia", "emoji": "🏺", "q": "¿Qué objeto causó la pelea del 20 de julio de 1810?", "opts": ["Un florero", "Una ventana", "Un espejo", "Una corona"], "why": "El famoso Florero de Llorente." },
    { "id": "c23", "era": "independencia", "emoji": "🎖️", "q": "¿A quién llamamos El Libertador?", "opts": ["Simón Bolívar", "Francisco de Paula Santander", "Antonio Nariño", "Cristóbal Colón"], "why": "Simón Bolívar dirigió la Campaña Libertadora." },
    { "id": "c24", "era": "independencia", "emoji": "📘", "q": "¿A quién llaman el Hombre de las Leyes?", "opts": ["Francisco de Paula Santander", "Simón Bolívar", "José González Llorente", "Alonso de Ojeda"], "why": "Santander organizó el nuevo país con leyes y escuelas." },
    { "id": "c25", "era": "independencia", "emoji": "💌", "q": "¿Quién fue La Pola?", "opts": ["Una heroína que llevaba mensajes secretos", "Una reina de España", "Una cacica muisca", "Una pintora del Renacimiento"], "why": "Policarpa Salavarrieta ayudó a los patriotas con mensajes secretos." },
    { "id": "c26", "era": "independencia", "emoji": "🌉", "q": "¿Qué batalla del 7 de agosto de 1819 nos dio la independencia?", "opts": ["La Batalla de Boyacá", "La Batalla de Cartagena", "La Batalla del Florero", "La Batalla de Guatavita"], "why": "En el Puente de Boyacá vencieron los patriotas." },
    { "id": "c27", "era": "republicana", "emoji": "🗺️", "q": "¿Qué países formaban la Gran Colombia?", "opts": ["Colombia, Venezuela, Ecuador y Panamá", "Colombia, España, Francia e Italia", "Colombia, Perú, Chile y Argentina", "Colombia, México, Cuba y Brasil"], "why": "La Gran Colombia unió a estos cuatro países, con Bolívar como presidente." },
    { "id": "c28", "era": "republicana", "emoji": "📘", "q": "¿Cuál es la ley más importante de Colombia?", "opts": ["La Constitución", "El himno", "El periódico", "El reglamento del colegio"], "why": "Todas las demás leyes deben respetar la Constitución." },
    { "id": "c29", "era": "republicana", "emoji": "📘", "q": "¿En qué año se escribió nuestra Constitución actual?", "opts": ["1991", "1810", "1492", "1819"], "why": "La Constitución de 1991 protege los derechos de todos." },
    { "id": "c30", "era": "republicana", "emoji": "🇨🇴", "q": "¿Desde qué año nuestro país se llama República de Colombia?", "opts": ["1886", "1499", "1550", "1969"], "why": "Antes tuvo otros nombres, como Nueva Granada." },
    { "id": "c31", "era": "republicana", "emoji": "🗳️", "q": "En una república, ¿cómo se elige al presidente?", "opts": ["Los ciudadanos votan", "Lo escoge el rey de España", "Gana el más fuerte", "Lo escoge el virrey"], "why": "En la república, el pueblo elige votando." },
    { "id": "c32", "era": "republicana", "emoji": "🕊️", "q": "¿En qué año se abolió la esclavitud en Colombia?", "opts": ["1851", "1492", "1991", "1538"], "why": "Desde 1851 ninguna persona puede ser dueña de otra." },
    { "id": "c33", "era": "precolombina", "emoji": "🧭", "q": "¿Cuál es el orden correcto de la historia de Colombia?", "opts": ["Precolombina, Conquista, Colonia, Independencia, República", "Conquista, Precolombina, Colonia, República, Independencia", "Precolombina, Colonia, Conquista, Independencia, República", "Colonia, Conquista, Precolombina, Independencia, República"], "why": "¡Precolombina, Conquista, Colonia, Independencia y Periodo Republicano!" },
    { "id": "c34", "era": "independencia", "emoji": "➡️", "q": "¿Qué época viene justo después de la Colonia?", "opts": ["La Independencia", "La Conquista", "La Época Precolombina", "La Edad Media"], "why": "Después de la Colonia vino la lucha por la Independencia." },
    { "id": "c35", "era": "republicana", "emoji": "⚖️", "q": "¿En cuántas ramas se divide el poder en Colombia?", "opts": ["En tres", "En una", "En diez", "En ninguna"], "why": "Ejecutivo (presidente), legislativo (Congreso) y judicial (jueces)." }
  ],
  "events": {
    "w": [
      { "era": "prehistoria", "e": "🖐️", "y": -15000, "t": "Se pintan animales en las cuevas", "yl": "hace miles de años" },
      { "era": "prehistoria", "e": "🌾", "y": -8000, "t": "Se construyen las primeras aldeas", "yl": "hace unos 10.000 años" },
      { "era": "antigua", "e": "📜", "y": -3500, "t": "Se inventa la escritura", "yl": "3500 a.C." },
      { "era": "antigua", "e": "🔺", "y": -2560, "t": "Los egipcios construyen las pirámides", "yl": "hace unos 4.500 años" },
      { "era": "antigua", "e": "🏅", "y": -776, "t": "Primeros Juegos Olímpicos en Grecia", "yl": "776 a.C." },
      { "era": "media", "e": "🏰", "y": 1100, "t": "Se construyen castillos y catedrales", "yl": "Edad Media" },
      { "era": "media", "e": "✍️", "y": 800, "t": "Los monjes copian libros a mano", "yl": "Edad Media" },
      { "era": "moderna", "e": "⛵", "y": 1492, "t": "Colón llega a América", "yl": "1492" },
      { "era": "moderna", "e": "🎨", "y": 1503, "t": "Leonardo da Vinci pinta la Mona Lisa", "yl": "1503" },
      { "era": "moderna", "e": "🔭", "y": 1609, "t": "Galileo observa el cielo con su telescopio", "yl": "1609" },
      { "era": "contemporanea", "e": "🚂", "y": 1825, "t": "Aparecen los trenes de vapor", "yl": "1825" },
      { "era": "contemporanea", "e": "💡", "y": 1879, "t": "Edison mejora la bombilla", "yl": "1879" },
      { "era": "contemporanea", "e": "🚀", "y": 1969, "t": "El ser humano llega a la Luna", "yl": "1969" }
    ],
    "c": [
      { "era": "precolombina", "e": "🛶", "y": 1400, "t": "Los muiscas hacen la ceremonia de la balsa de oro", "yl": "antes de 1499" },
      { "era": "precolombina", "e": "⛰️", "y": 800, "t": "Los taironas construyen Ciudad Perdida", "yl": "hace unos 1.200 años" },
      { "era": "precolombina", "e": "🗿", "y": 0, "t": "Se tallan las estatuas de San Agustín", "yl": "hace unos 2.000 años" },
      { "era": "conquista", "e": "⛵", "y": 1499, "t": "Alonso de Ojeda llega a La Guajira", "yl": "1499" },
      { "era": "conquista", "e": "🏘️", "y": 1525, "t": "Se funda Santa Marta", "yl": "1525" },
      { "era": "conquista", "e": "🏙️", "y": 1538, "t": "Se funda Santafé de Bogotá", "yl": "1538" },
      { "era": "colonia", "e": "📜", "y": 1781, "t": "Revolución de los Comuneros", "yl": "1781" },
      { "era": "colonia", "e": "🌺", "y": 1783, "t": "Empieza la Expedición Botánica", "yl": "1783" },
      { "era": "colonia", "e": "🧱", "y": 1650, "t": "Se construyen las murallas de Cartagena", "yl": "Colonia" },
      { "era": "independencia", "e": "🏺", "y": 1810, "t": "Grito de Independencia: el Florero de Llorente", "yl": "20 de julio de 1810" },
      { "era": "independencia", "e": "🌉", "y": 1819, "t": "Batalla de Boyacá", "yl": "7 de agosto de 1819" },
      { "era": "republicana", "e": "🕊️", "y": 1851, "t": "Se abolió la esclavitud", "yl": "1851" },
      { "era": "republicana", "e": "🇨🇴", "y": 1886, "t": "El país se llama República de Colombia", "yl": "1886" },
      { "era": "republicana", "e": "📘", "y": 1991, "t": "Nueva Constitución", "yl": "1991" }
    ]
  },
  "items": {
    "w": [
      { "era": "prehistoria", "e": "🦣", "t": "Mamuts" },
      { "era": "prehistoria", "e": "🖐️", "t": "Pinturas en cuevas" },
      { "era": "prehistoria", "e": "🪨", "t": "Hachas de piedra" },
      { "era": "prehistoria", "e": "🛖", "t": "Primeras aldeas" },
      { "era": "antigua", "e": "🔺", "t": "Pirámides de Egipto" },
      { "era": "antigua", "e": "🏛️", "t": "Templos griegos" },
      { "era": "antigua", "e": "📜", "t": "Tablillas con escritura" },
      { "era": "antigua", "e": "🏅", "t": "Primeros Juegos Olímpicos" },
      { "era": "media", "e": "🏰", "t": "Castillos" },
      { "era": "media", "e": "🛡️", "t": "Caballeros con armadura" },
      { "era": "media", "e": "✍️", "t": "Monjes copiando libros" },
      { "era": "media", "e": "🌾", "t": "Siervos y señores feudales" },
      { "era": "moderna", "e": "⛵", "t": "Carabelas de Colón" },
      { "era": "moderna", "e": "🎨", "t": "La Mona Lisa" },
      { "era": "moderna", "e": "🔭", "t": "Telescopio de Galileo" },
      { "era": "moderna", "e": "🌍", "t": "Primera vuelta al mundo" },
      { "era": "contemporanea", "e": "🚂", "t": "Trenes de vapor" },
      { "era": "contemporanea", "e": "💡", "t": "Bombilla eléctrica" },
      { "era": "contemporanea", "e": "🚀", "t": "Viaje a la Luna" },
      { "era": "contemporanea", "e": "📱", "t": "Celulares" }
    ],
    "c": [
      { "era": "precolombina", "e": "🛶", "t": "Balsa Muisca de oro" },
      { "era": "precolombina", "e": "🗿", "t": "Estatuas de San Agustín" },
      { "era": "precolombina", "e": "⛰️", "t": "Ciudad Perdida" },
      { "era": "precolombina", "e": "✨", "t": "Poporo Quimbaya" },
      { "era": "conquista", "e": "⛵", "t": "Llegada de Alonso de Ojeda" },
      { "era": "conquista", "e": "🐴", "t": "Llegan los primeros caballos" },
      { "era": "conquista", "e": "🏘️", "t": "Fundación de Santa Marta" },
      { "era": "conquista", "e": "🏹", "t": "La cacica Gaitana" },
      { "era": "colonia", "e": "👑", "t": "El virrey" },
      { "era": "colonia", "e": "🧱", "t": "Murallas de Cartagena" },
      { "era": "colonia", "e": "🌺", "t": "Expedición Botánica" },
      { "era": "colonia", "e": "📜", "t": "Manuela Beltrán y los Comuneros" },
      { "era": "independencia", "e": "🏺", "t": "Florero de Llorente" },
      { "era": "independencia", "e": "🎖️", "t": "Simón Bolívar, El Libertador" },
      { "era": "independencia", "e": "💌", "t": "La Pola" },
      { "era": "independencia", "e": "🌉", "t": "Batalla de Boyacá" },
      { "era": "republicana", "e": "🗳️", "t": "Elecciones para presidente" },
      { "era": "republicana", "e": "📘", "t": "Constitución de 1991" },
      { "era": "republicana", "e": "🗺️", "t": "La Gran Colombia" },
      { "era": "republicana", "e": "🕊️", "t": "Fin de la esclavitud" }
    ]
  },
  "clues": {
    "prehistoria": [["🦣", "Mamuts y cuevas"], ["🔥", "Descubren el fuego"], ["🪨", "Herramientas de piedra"]],
    "antigua": [["🔺", "Pirámides de Egipto"], ["📜", "Empieza la escritura"], ["🏛️", "Grecia y Roma"]],
    "media": [["🏰", "Castillos y caballeros"], ["✍️", "Monjes copian libros"], ["🛡️", "Señores feudales"]],
    "moderna": [["⛵", "Colón llega a América"], ["🎨", "Leonardo y el arte"], ["🔭", "Galileo mira el cielo"]],
    "contemporanea": [["🚀", "Llegamos a la Luna"], ["🏭", "Fábricas y trenes"], ["📱", "¡La época de hoy!"]],
    "precolombina": [["🛶", "La balsa de El Dorado"], ["🗿", "Estatuas de San Agustín"], ["⛰️", "Ciudad Perdida"]],
    "conquista": [["⛵", "Llegan los españoles"], ["🏘️", "Fundan Santa Marta"], ["💰", "Buscan El Dorado"]],
    "colonia": [["👑", "Gobierna el virrey"], ["🧱", "Murallas de Cartagena"], ["🌺", "Expedición Botánica"]],
    "independencia": [["🏺", "El Florero de Llorente"], ["🎖️", "Bolívar, El Libertador"], ["🌉", "Batalla de Boyacá"]],
    "republicana": [["🗳️", "Votamos al presidente"], ["📘", "Constitución de 1991"], ["🗺️", "La Gran Colombia"]]
  },
  "facts": [
    "¿Sabías que la Prehistoria duró millones de años? ¡Es la etapa más larga de todas!",
    "¿Sabías que la Historia empieza cuando se inventa la escritura? Antes de eso es la Prehistoria.",
    "¿Sabías que nuestro idioma, el español, viene del latín, el idioma de los romanos?",
    "¿Sabías que en la Edad Media los libros se copiaban a mano? ¡Un libro podía tardar años!",
    "¿Sabías que mientras en Europa había castillos, aquí los muiscas hacían su balsa de oro?",
    "¿Sabías que Santa Marta, fundada en 1525, es la ciudad más antigua de Colombia?",
    "¿Sabías que cada 20 de julio celebramos el Grito de Independencia?",
    "¿Sabías que cada 7 de agosto recordamos la Batalla de Boyacá?",
    "¿Sabías que los muiscas intercambiaban sal y esmeraldas con otros pueblos?",
    "¿Sabías que tú vives en la Edad Contemporánea y en el Periodo Republicano al mismo tiempo?"
  ],
  "voice": {
    "welcome": "¡Hola, Sofía! Soy Cronos, el búho viajero del tiempo. ¿Lista para viajar por la historia?",
    "stamp": "¡Descubriste todo! Ganaste un sello para tu pasaporte.",
    "ok-0": "¡Correcto!",
    "ok-1": "¡Excelente, viajera!",
    "ok-2": "¡Muy bien, Sofía!",
    "ok-3": "¡Eso es!",
    "ok-4": "¡Genial! Sabes mucho de historia.",
    "ok-5": "¡Perfecto!",
    "bad-0": "¡Uy, casi!",
    "bad-1": "No era esa, ¡pero ahora ya lo sabes!",
    "bad-2": "¡Ups! Mira cuál era la correcta.",
    "win": "¡Lo lograste! ¡Eres una gran viajera del tiempo!",
    "good": "¡Muy buen viaje! Sigue practicando y serás experta.",
    "order-eras": "Ordena las épocas, de la más antigua a la más reciente.",
    "order-events": "Ahora ordena estos hechos, del más antiguo al más reciente.",
    "order-ok": "¡Orden perfecto!",
    "order-bad": "Algunas no están en su lugar. ¡Inténtalo otra vez!",
    "portal": "¿A qué época pertenece? ¡Mándalo al portal correcto!",
    "memory": "Encuentra las parejas: cada época con su pista.",
    "pair": "¡Pareja encontrada!",
    "compare": "Mira las dos líneas del tiempo juntas. Mientras en Europa había castillos, aquí los muiscas hacían su balsa de oro.",
    "passport": "Este es tu pasaporte del tiempo. Explora cada época para ganar todos los sellos."
  }
}/*END*/;
