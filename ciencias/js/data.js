// Contenido de Science Galaxy: taller de repaso de Ciencias, 4.º periodo (3.º grado).
// Chispas: `x, y` = el botón en la escena (800×450); `z: [x, y, radio]` opcional = a qué apuntan el zoom y el aro de su historia.
// Cada paso de juego lleva `ws`: el número de la pregunta del taller que practica (tools/cobertura.js lo revisa).
window.DATA = {
  meta: { id: 'ciencias', title: 'Science Galaxy', exam: 'Thursday, November 5' },

  // Las preguntas del taller (no hay pregunta 6). Todas deben estar en una parada y en The Big Review.
  ws: {
    '1': 'Write the 4 spheres on the Earth', '2a': 'Geosphere = the surface', '2b': 'Biosphere = living things',
    '2c': 'Hydrosphere = water', '2d': 'Atmosphere = the sky', '3': 'Urban and rural', '4a': 'Urban = cities, rural = countryside',
    '4b': 'Stars: gas, light and heat', '4c': 'Mercury is made of rocks', '4d': 'Neptune is the coldest', '4e': 'Jupiter is the largest',
    '4f': 'The Sun: main source of energy and light', '5': 'Number the planets in order', '7a': 'Rotation makes day and night',
    '7b': 'The Moon has 4 main phases (not 10)', '7c': 'Rotation and translation', '7d': 'Rotation = 1 day, translation = 1 year',
    '8': 'Stars have their own light', '9': 'Write the planets in order', '10': 'The biggest planet is Jupiter (the Sun is a star)',
    '11': 'The Sun is our main source of light', '12a': 'Saturn is made of gas', '12b': 'Only Earth has living things',
    '13': 'Neptune takes the longest (165 years)', '14a': 'Mercury: closest to the Sun', '14b': 'Earth: we live here',
    '14c': 'Neptune: the coldest', '14d': 'Jupiter: the largest', '15': 'The Moon is 400 times smaller than the Sun',
    '16': 'Full moon yellow, new moon gray', '17': 'Colombia: dry season and rainy season',
  },

  say: {
    hello: 'Hi Sofía! Welcome to Science Galaxy. Let’s fly!',
    locked: 'First, open all the sparks of this planet.',
    stopLocked: 'Finish the stop before this one first.',
    reviewLocked: 'The Big Review opens when you have all 8 stamps.',
    stamp: 'You got the stamp! Now you can play.',
    right: 'Great!', wrong: 'Almost!', end: 'Mission complete!',
    chest: 'You have a new friend! Open the chest!',
    mission: 'Let’s practice what you missed.',
    noMission: 'Nothing to practice. Great job!',
    trip: 'Choose a new co-pilot! The map starts again, and your co-pilot multiplies every new star.',
    newTrip: 'New trip! Visit every planet again and win more stars.',
  },

  // Amigos: Cosmo vuela contigo desde el principio; los demás salen del cofre al juntar estrellas.
  // `x`: cuánto multiplica las estrellas cuando es el copiloto (New trip).
  friends: [
    { id: 'cosmo', name: 'Cosmo', from: 'Neptune', x: 1, stars: 0, line: 'Hi Sofía! I am Cosmo. I am from Neptune, the coldest planet!',
      card: 'Hello from Neptune! It is the coldest planet. It goes around the Sun in 165 years.' },
    { id: 'luna', name: 'Luna', from: 'the Moon', x: 2, stars: 15, line: 'I am Luna, the Moon. I have 4 main phases.',
      card: 'Hello from the Moon! I am 400 times smaller than the Sun.' },
    { id: 'gaia', name: 'Gaia', from: 'Earth', x: 3, stars: 30, line: 'I am Gaia, the Earth. I am the planet we live on.',
      card: 'Hello from Earth! I have 4 spheres: geosphere, hydrosphere, atmosphere and biosphere.' },
    { id: 'rocky', name: 'Rocky', from: 'Mercury', x: 4, stars: 45, line: 'I am Rocky. Mercury is made of rocks. It is the closest planet to the Sun!',
      card: 'Hello from Mercury! I am made of rocks and I am the closest planet to the Sun.' },
    { id: 'jupi', name: 'Jupi', from: 'Jupiter', x: 5, stars: 60, line: 'I am Jupi. Jupiter is the largest planet!',
      card: 'Hello from Jupiter! I am the largest planet. The Sun is bigger, but the Sun is a star.' },
    { id: 'venus', name: 'Vee', from: 'Venus', x: 6, stars: 75, line: 'I am Vee, from Venus. I am planet number 2 from the Sun!',
      card: 'Hello from Venus! I am the second planet. I am between Mercury and Earth.' },
    // Estos piden más del 60 % de un viaje: casi siempre llegan con «New trip».
    { id: 'mars', name: 'Marty', from: 'Mars', x: 7, stars: 100, line: 'I am Marty, from Mars. I am planet number 4!',
      card: 'Hello from Mars! I am the fourth planet. Only Earth has living things, so I have no plants or animals.' },
    { id: 'saturn', name: 'Sati', from: 'Saturn', x: 8, stars: 150, line: 'I am Sati, from Saturn. I am made of gas, not rocks!',
      card: 'Hello from Saturn! I am planet number 6. I am made of gas and I have beautiful rings.' },
    { id: 'uranus', name: 'Uri', from: 'Uranus', x: 9, stars: 220, line: 'I am Uri, from Uranus. I am planet number 7!',
      card: 'Hello from Uranus! I am the seventh planet. I am between Saturn and Neptune.' },
    { id: 'sunny', name: 'Sunny', from: 'the Sun', x: 10, stars: 300, line: 'I am Sunny, the Sun. I am a star! I give light and heat.',
      card: 'Hello from the Sun! I am the main source of energy and light.' },
  ],

  stops: [
    {
      id: 'spheres', title: 'Earth’s Spheres', icon: 'earth',
      sparks: [
        { id: 'geo', x: 560, y: 300, title: 'Geosphere', text: 'Geosphere: everything that is part of the surface. Rocks, soil and mountains.' },
        { id: 'hydro', x: 170, y: 380, title: 'Hydrosphere', text: 'Hydrosphere: all the water on Earth. Oceans, rivers and lakes.' },
        { id: 'atmo', x: 330, y: 80, title: 'Atmosphere', text: 'Atmosphere: everything in the sky. The air and the clouds.' },
        { id: 'bio', x: 700, y: 360, z: [730, 316, 52], title: 'Biosphere', text: 'Biosphere: all the living things. People, plants and animals.' },
      ],
      games: [
        { id: 'label', title: 'Label the Earth', steps: [
          { type: 'label', ws: '1', q: 'Write the spheres on the Earth.', opts: ['Geosphere', 'Hydrosphere', 'Atmosphere', 'Biosphere'],
            targets: [{ spark: 'atmo', a: 'Atmosphere' }, { spark: 'hydro', a: 'Hydrosphere' }, { spark: 'geo', a: 'Geosphere' }, { spark: 'bio', a: 'Biosphere' }] },
        ] },
        { id: 'match', title: 'Match the spheres', steps: [
          { type: 'match', ws: ['2a', '2b', '2c', '2d'], q: 'Match each sphere with its description.', pairs: [
            ['Geosphere', 'Everything that is part of the surface'], ['Biosphere', 'All the living things: people, plants and animals'],
            ['Hydrosphere', 'All the water on Earth'], ['Atmosphere', 'Everything in the sky'] ] },
        ] },
        { id: 'quiz', title: 'Which sphere?', steps: [
          { type: 'quiz', ws: '2a', q: 'Rocks, soil and mountains are part of the…', opts: ['Geosphere', 'Hydrosphere', 'Atmosphere'], a: 0 },
          { type: 'quiz', ws: '2b', q: 'People, plants and animals are part of the…', opts: ['Atmosphere', 'Biosphere', 'Geosphere'], a: 1 },
          { type: 'quiz', ws: '2c', q: 'Oceans, rivers and lakes are part of the…', opts: ['Hydrosphere', 'Biosphere', 'Geosphere'], a: 0 },
          { type: 'quiz', ws: '2d', q: 'The air and the clouds are part of the…', opts: ['Geosphere', 'Hydrosphere', 'Atmosphere'], a: 2 },
        ] },
        { id: 'write', title: 'Write it!', write: [
          { word: 'GEOSPHERE', clue: 'Everything that is part of the surface', ws: '1' },
          { word: 'HYDROSPHERE', clue: 'All the water on Earth', ws: '1' },
          { word: 'ATMOSPHERE', clue: 'Everything in the sky', ws: '1' },
          { word: 'BIOSPHERE', clue: 'All the living things', ws: '1' },
        ] },
      ],
    },
    {
      id: 'landscapes', title: 'Landscapes', icon: 'land',
      sparks: [
        { id: 'two', x: 400, y: 70, title: 'Two landscapes', text: 'There are two types of landscape: urban and rural.' },
        { id: 'urban', x: 190, y: 250, title: 'Urban', text: 'Urban landscapes are cities. Tall buildings, cars and many people.' },
        { id: 'rural', x: 610, y: 260, z: [637, 385, 46], title: 'Rural', text: 'Rural landscapes are the countryside. Farms, animals and trees.' },
      ],
      games: [
        { id: 'sort', title: 'City or countryside?', steps: [
          { type: 'sort', ws: ['3', '4a'], q: 'Is it urban or rural?', bins: ['Urban', 'Rural'], items: [
            ['Tall buildings', 0, 'building'], ['A cow', 1, 'cow'], ['A bus', 0, 'bus'], ['A farm', 1, 'farm'],
            ['A traffic light', 0, 'light'], ['Big trees', 1, 'tree'], ['Many cars', 0, 'car'], ['A horse', 1, 'horse'] ] },
        ] },
        { id: 'quiz', title: 'Pick the word', steps: [
          { type: 'quiz', ws: '3', q: 'The two types of landscape are…', opts: ['Urban and rural', 'Cities and buildings', 'Hot and cold'], a: 0 },
          { type: 'quiz', ws: '4a', q: 'Urban landscapes are…', opts: ['cities', 'the countryside', 'the ocean'], a: 0 },
          { type: 'quiz', ws: '4a', q: 'Rural landscapes are…', opts: ['cities', 'the countryside', 'the ocean'], a: 1 },
        ] },
        { id: 'write', title: 'Write it!', write: [
          { word: 'URBAN', clue: 'Landscapes of cities', ws: '3' },
          { word: 'RURAL', clue: 'Landscapes of the countryside', ws: '3' },
        ] },
      ],
    },
    {
      id: 'sun', title: 'The Sun & Stars', icon: 'sun',
      sparks: [
        { id: 'gas', x: 640, y: 110, title: 'Stars', text: 'Stars are made of gas. They give light and heat.' },
        { id: 'own', x: 520, y: 330, title: 'Their own light', text: 'Stars have their own light. Planets and moons do not.' },
        { id: 'star', x: 250, y: 160, z: [250, 240, 115], title: 'The Sun is a star', text: 'The Sun is a star!' },
        { id: 'main', x: 250, y: 330, title: 'Main source', text: 'The Sun is our main source of energy and light.' },
      ],
      games: [
        { id: 'quiz', title: 'Sun and stars quiz', steps: [
          { type: 'quiz', ws: '4b', q: '___ are made of gas and give light and heat.', opts: ['Stars', 'Planets', 'Moons'], a: 0 },
          { type: 'quiz', ws: '8', q: 'Which ones have their own light?', opts: ['Planets', 'Stars', 'Moons'], a: 1 },
          { type: 'quiz', ws: '4f', q: 'The ___ is the main source of energy and light.', opts: ['Moon', 'Sun', 'Earth'], a: 1 },
          { type: 'quiz', ws: '11', q: 'What is our main source of light?', opts: ['The Moon', 'Jupiter', 'The Sun'], a: 2 },
          { type: 'tf', ws: '8', s: 'The Sun is a star.', t: true },
        ] },
        { id: 'write', title: 'Write it!', write: [
          { word: 'STARS', clue: 'Made of gas. They give light and heat.', ws: '4b' },
          { word: 'SUN', clue: 'Our main source of energy and light', ws: '4f' },
        ] },
      ],
    },
    {
      id: 'order', title: 'Planets in Order', icon: 'saturn',
      sparks: [
        { id: 'eight', x: 400, y: 80, title: '8 planets', text: 'There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune.' },
        { id: 'first', x: 150, y: 330, z: [110, 225, 18], title: 'From the Sun', text: 'Mercury is the closest to the Sun. Neptune is the farthest.' },
        { id: 'trick', x: 620, y: 360, title: 'A trick', text: 'A trick to remember: My Very Excellent Mother Just Served Us Noodles.' },
      ],
      games: [
        { id: 'order', title: 'Order the planets', steps: [
          { type: 'order', ws: '5', q: 'Tap the planets from the closest to the Sun to the farthest.',
            items: ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'] },
        ] },
        { id: 'write', title: 'Write it!', write: [
          { word: 'MERCURY', clue: 'Planet number 1', ws: '9' }, { word: 'VENUS', clue: 'Planet number 2', ws: '9' },
          { word: 'EARTH', clue: 'Planet number 3', ws: '9' }, { word: 'MARS', clue: 'Planet number 4', ws: '9' },
          { word: 'JUPITER', clue: 'Planet number 5', ws: '9' }, { word: 'SATURN', clue: 'Planet number 6', ws: '9' },
          { word: 'URANUS', clue: 'Planet number 7', ws: '9' }, { word: 'NEPTUNE', clue: 'Planet number 8', ws: '9' },
        ] },
      ],
    },
    {
      id: 'facts', title: 'Planet Facts', icon: 'jupiter',
      sparks: [
        { id: 'mercury', x: 110, y: 230, title: 'Mercury', text: 'Mercury is made of rocks. It is the closest planet to the Sun.' },
        { id: 'earth', x: 260, y: 140, title: 'Earth', text: 'Earth is the planet we live on. Only Earth has living things.' },
        { id: 'jupiter', x: 420, y: 250, z: [420, 260, 96], title: 'Jupiter', text: 'Jupiter is the largest planet. The Sun is bigger, but the Sun is a star, not a planet.' },
        { id: 'saturn', x: 590, y: 130, title: 'Saturn', text: 'Saturn is made of gas, not rocks.' },
        { id: 'neptune', x: 710, y: 300, title: 'Neptune', text: 'Neptune is the coldest planet. It goes around the Sun in 165 years.' },
      ],
      games: [
        { id: 'match', title: 'Match planet and fact', steps: [
          { type: 'match', ws: ['14a', '14b', '14c', '14d'], q: 'Match each planet with its fact.', pairs: [
            ['Mercury', 'The closest to the Sun'], ['Earth', 'The planet we live on'], ['Jupiter', 'The largest planet'], ['Neptune', 'The coldest planet'] ] },
        ] },
        { id: 'quiz', title: 'Planet quiz', steps: [
          { type: 'quiz', ws: '4c', q: 'This planet is made of rocks:', opts: ['Saturn', 'Mercury', 'Jupiter'], a: 1 },
          { type: 'quiz', ws: '4d', q: 'The coldest planet is…', opts: ['Mercury', 'Mars', 'Neptune'], a: 2 },
          { type: 'quiz', ws: '4e', q: 'The largest planet is…', opts: ['Jupiter', 'Venus', 'Mars'], a: 0 },
          { type: 'quiz', ws: '10', q: 'What is the biggest planet?', opts: ['The Sun', 'Jupiter', 'Earth'], a: 1, why: 'The Sun is a star, not a planet.' },
          { type: 'quiz', ws: '13', q: 'Which planet takes the longest to go around the Sun?', opts: ['Mercury', 'Earth', 'Jupiter', 'Neptune'], a: 3,
            table: [['Planet', 'Time to go around the Sun'], ['Mercury', '88 days'], ['Earth', '365 days (1 year)'], ['Jupiter', '12 years'], ['Neptune', '165 years']] },
        ] },
        { id: 'tf', title: 'True or False', steps: [
          { type: 'tf', ws: '12a', s: 'Saturn is made of rocks.', t: false, fix: ['Saturn is made of gas.', 'Saturn is made of water.', 'Saturn is made of metal.'] },
          { type: 'tf', ws: '12b', s: 'Mars is the only planet with living things.', t: false, fix: ['Only Earth has living things.', 'Only Jupiter has living things.', 'No planet has living things.'] },
          { type: 'tf', ws: '4c', s: 'Mercury is made of rocks.', t: true },
          { type: 'tf', ws: '14a', s: 'Mercury is the closest planet to the Sun.', t: true },
        ] },
      ],
    },
    {
      id: 'movements', title: 'Day & Night', icon: 'earth',
      sparks: [
        { id: 'rotation', x: 520, y: 140, title: 'Rotation', text: 'Rotation: the Earth spins on its axis. One rotation takes one day.' },
        { id: 'daynight', x: 650, y: 300, title: 'Day and night', text: 'Rotation makes day and night.' },
        { id: 'translation', x: 230, y: 360, title: 'Translation', text: 'Translation: the Earth goes around the Sun. One translation takes one year.' },
        { id: 'two', x: 140, y: 90, title: 'Two movements', text: 'The Earth has two movements: rotation and translation.' },
      ],
      games: [
        { id: 'tf', title: 'True or False', steps: [
          { type: 'tf', ws: '7a', s: 'We have day and night because of the rotation.', t: true },
          { type: 'tf', ws: '7c', s: 'Rotation and translation are the movements of the Earth.', t: true },
          { type: 'tf', ws: '7d', s: 'The Earth takes one year to make a full rotation on its axis.', t: false,
            fix: ['One rotation takes one day. One translation takes one year.', 'One rotation takes one year. One translation takes one day.', 'One rotation takes one week. One translation takes one month.'] },
        ] },
        { id: 'quiz', title: 'Movements quiz', steps: [
          { type: 'quiz', ws: '7d', q: 'One rotation takes…', opts: ['one day', 'one year', 'one month'], a: 0 },
          { type: 'quiz', ws: '7d', q: 'One translation takes…', opts: ['one day', 'one year', 'one month'], a: 1 },
          { type: 'quiz', ws: '7a', q: 'What makes day and night?', opts: ['Rotation', 'Translation', 'The Moon'], a: 0 },
        ] },
        { id: 'write', title: 'Write it!', write: [
          { word: 'ROTATION', clue: 'The Earth spins on its axis', ws: '7c' },
          { word: 'TRANSLATION', clue: 'The Earth goes around the Sun', ws: '7c' },
        ] },
      ],
    },
    {
      id: 'moon', title: 'The Moon', icon: 'moon',
      sparks: [
        { id: 'phases', x: 400, y: 330, title: '4 main phases', text: 'The Moon has 4 main phases: new moon, first quarter, full moon and last quarter.' },
        { id: 'full', x: 600, y: 120, z: [600, 130, 70], title: 'Full moon', text: 'Full moon: we see all the Moon. Paint it yellow.' },
        { id: 'new', x: 200, y: 120, z: [200, 130, 70], title: 'New moon', text: 'New moon: we can’t see the Moon. Paint it gray.' },
        { id: 'size', x: 730, y: 330, title: '400 times', text: 'The Moon is 400 times smaller than the Sun.' },
      ],
      games: [
        { id: 'paint', title: 'Paint the Moon', steps: [{ type: 'paint', ws: '16', q: 'Paint the full moon and the new moon.' }] },
        { id: 'quiz', title: 'Moon quiz', steps: [
          { type: 'tf', ws: '7b', s: 'The Moon has ten phases.', t: false, fix: ['The Moon has 4 main phases.', 'The Moon has 8 main phases.', 'The Moon has 2 main phases.'] },
          { type: 'quiz', ws: '15', q: 'The Moon is ___ times smaller than the Sun.', opts: ['4', '40', '400'], a: 2 },
          { type: 'quiz', ws: '7b', q: 'How many main phases does the Moon have?', opts: ['4', '10', '8'], a: 0 },
        ] },
      ],
    },
    {
      id: 'seasons', title: 'Colombia’s Seasons', icon: 'rain',
      sparks: [
        { id: 'two', x: 400, y: 70, title: 'Two seasons', text: 'Colombia has two seasons: the dry season and the rainy season.' },
        { id: 'dry', x: 200, y: 260, title: 'Dry season', text: 'Dry season: very little rain and lots of sun.' },
        { id: 'rainy', x: 600, y: 260, title: 'Rainy season', text: 'Rainy season: lots of rain.' },
      ],
      games: [
        { id: 'quiz', title: 'Seasons quiz', steps: [
          { type: 'quiz', ws: '17', q: 'How many seasons does Colombia have?', opts: ['2', '4', '3'], a: 0 },
          { type: 'quiz', ws: '17', q: 'Colombia has the dry season and the…', opts: ['windy season', 'rainy season', 'snowy season'], a: 1 },
        ] },
        { id: 'write', title: 'Write it!', write: [
          { word: 'DRY', clue: 'Season with very little rain', ws: '17' },
          { word: 'RAINY', clue: 'Season with lots of rain', ws: '17' },
        ] },
      ],
    },
  ],

  // The Big Review: el taller en su orden. `ref` = parada/juego/paso; los demás pasos solo existen aquí.
  review: [
    { ref: 'spheres/label/0', title: '1 · Label the Earth' },
    { ref: 'spheres/match/0', title: '2 · Match the spheres' },
    { ref: 'landscapes/quiz/0', title: '3 · Landscapes' },
    { ref: 'landscapes/quiz/1', title: '4 · Complete' },
    { ref: 'sun/quiz/0', title: '4 · Complete' },
    { ref: 'facts/quiz/0', title: '4 · Complete' },
    { ref: 'facts/quiz/1', title: '4 · Complete' },
    { ref: 'facts/quiz/2', title: '4 · Complete' },
    { ref: 'sun/quiz/2', title: '4 · Complete' },
    { ref: 'order/order/0', title: '5 · Planets in order' },
    { ref: 'movements/tf/0', title: '7 · True or False' },
    { ref: 'moon/quiz/0', title: '7 · True or False' },
    { ref: 'movements/tf/1', title: '7 · True or False' },
    { ref: 'movements/tf/2', title: '7 · True or False' },
    { ref: 'sun/quiz/1', title: '8 · Own light' },
    { type: 'listen', ws: '9', word: 'MERCURY', title: '9 · Listen and write' },
    { type: 'listen', ws: '9', word: 'JUPITER', title: '9 · Listen and write' },
    { type: 'listen', ws: '9', word: 'SATURN', title: '9 · Listen and write' },
    { type: 'listen', ws: '9', word: 'NEPTUNE', title: '9 · Listen and write' },
    { ref: 'facts/quiz/3', title: '10 · The biggest planet' },
    { ref: 'sun/quiz/3', title: '11 · Main source of light' },
    { ref: 'facts/tf/0', title: '12 · True or False' },
    { ref: 'facts/tf/1', title: '12 · True or False' },
    { ref: 'facts/quiz/4', title: '13 · Read the table' },
    { ref: 'facts/match/0', title: '14 · Match' },
    { ref: 'moon/quiz/1', title: '15 · Complete' },
    { ref: 'moon/paint/0', title: '16 · Paint the Moon' },
    { type: 'listen', ws: '17', word: 'DRY', title: '17 · Listen and write' },
    { type: 'listen', ws: '17', word: 'RAINY', title: '17 · Listen and write' },
    { type: 'listen', ws: '1', word: 'HYDROSPHERE', title: 'Bonus · Listen and write' },
  ],
};
