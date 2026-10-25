// Contenido de «Sofía's Space Mission». Lo que va entre los comentarios JSON y END es JSON estricto (lo lee gen_audio.py).
// Datos revisados con NASA (Space Place / Planetary Fact Sheet). Lunas: conteo oficial a 2025
// (Saturno 274, Júpiter 95+, Urano 29, Neptuno 16); cambian a menudo, por eso el quiz no pregunta cifras de los gigantes.
window.DATA = /*JSON*/{
  "meta": { "id": "space", "name": "Sofía" },

  "bodies": [
    { "id": "sun", "name": "The Sun", "short": "Sun", "kind": "star", "kindLabel": "A star", "tagline": "Our star",
      "intro": "This is the Sun. It is not a planet. It is a star!",
      "facts": [
        { "e": "⭐", "t": "The Sun is a star. It is a giant ball of very hot gas." },
        { "e": "🎯", "t": "The Sun is in the center of our solar system. All the planets travel around it." },
        { "e": "💡", "t": "The Sun gives us light and heat. Plants, animals and people need it to live." },
        { "e": "📏", "t": "The Sun is huge! More than one million Earths could fit inside it." }
      ],
      "wow": "Sunlight takes about eight minutes to travel from the Sun to Earth.",
      "stats": { "size": 109, "list": [["🪐", "Travel around it", "8 planets"], ["⏱️", "Sunlight to Earth", "8 minutes"]] } },

    { "id": "mercury", "name": "Mercury", "n": 1, "kind": "rocky", "kindLabel": "Rocky planet", "tagline": "The smallest planet", "say": "MER-kyuh-ree",
      "intro": "Mercury is the planet closest to the Sun.",
      "facts": [
        { "e": "🥇", "t": "Mercury is the first planet from the Sun. It is the closest one." },
        { "e": "🤏", "t": "It is the smallest planet in our solar system. It is just a little bigger than our Moon." },
        { "e": "🕳️", "t": "Mercury is rocky and covered in craters, like our Moon." },
        { "e": "🔥", "t": "It is super hot in the day and freezing cold at night, because it has almost no air." }
      ],
      "wow": "Mercury is the fastest planet. A year there lasts only 88 days!",
      "stats": { "moons": "0", "year": "88 days", "size": 0.38 } },

    { "id": "venus", "name": "Venus", "n": 2, "kind": "rocky", "kindLabel": "Rocky planet", "tagline": "The hottest planet", "say": "VEE-nus",
      "intro": "Venus is the hottest planet of all!",
      "facts": [
        { "e": "2️⃣", "t": "Venus is the second planet from the Sun." },
        { "e": "🌡️", "t": "It is the hottest planet, even hotter than Mercury. Its thick clouds trap the heat." },
        { "e": "👯", "t": "Venus is almost the same size as Earth. People call it Earth's twin." },
        { "e": "✨", "t": "After the Moon, Venus is the brightest thing in our night sky." }
      ],
      "wow": "Venus spins backwards! On Venus, the Sun rises in the west.",
      "stats": { "moons": "0", "year": "225 days", "size": 0.95 } },

    { "id": "earth", "name": "Earth", "n": 3, "kind": "rocky", "kindLabel": "Rocky planet", "tagline": "Our home", "say": "URTH",
      "intro": "This is Earth, our home planet!",
      "facts": [
        { "e": "3️⃣", "t": "Earth is the third planet from the Sun." },
        { "e": "🌱", "t": "It is the only planet we know with life: plants, animals and people." },
        { "e": "🌊", "t": "Oceans cover most of Earth. That is why we call it the Blue Planet." },
        { "e": "🌙", "t": "Earth has one moon. We call it the Moon." }
      ],
      "wow": "Earth is the biggest of the four rocky planets.",
      "stats": { "moons": "1", "year": "365 days", "size": 1 } },

    { "id": "moon", "name": "The Moon", "short": "Moon", "kind": "moon", "kindLabel": "Earth's moon", "tagline": "Earth's partner",
      "intro": "The Moon travels around Earth.",
      "facts": [
        { "e": "🔄", "t": "The Moon travels around Earth. One trip takes about one month." },
        { "e": "🪞", "t": "The Moon does not make its own light. It shines with light from the Sun." },
        { "e": "🌗", "t": "The Moon seems to change shape. We call these shapes the phases of the Moon." },
        { "e": "👩‍🚀", "t": "Astronauts walked on the Moon for the first time in 1969." }
      ],
      "wow": "The Moon has no wind, so the astronauts' footprints are still there!",
      "stats": { "size": 0.27, "list": [["🔄", "One trip around Earth", "about 27 days"], ["👣", "First steps", "1969"]] } },

    { "id": "mars", "name": "Mars", "n": 4, "kind": "rocky", "kindLabel": "Rocky planet", "tagline": "The Red Planet", "say": "MARZ",
      "intro": "Mars is the Red Planet.",
      "facts": [
        { "e": "4️⃣", "t": "Mars is the fourth planet from the Sun." },
        { "e": "🔴", "t": "It is called the Red Planet, because its dust is red like rust." },
        { "e": "🌋", "t": "Mars has the tallest volcano in the solar system. Its name is Olympus Mons." },
        { "e": "🥔", "t": "It has two small moons, Phobos and Deimos." }
      ],
      "wow": "Robot rovers drive on Mars and send us pictures!",
      "stats": { "moons": "2", "year": "687 days", "size": 0.53 } },

    { "id": "jupiter", "name": "Jupiter", "n": 5, "kind": "gas", "kindLabel": "Gas giant", "tagline": "The biggest planet", "say": "JOO-pih-ter",
      "intro": "Jupiter is the giant of the solar system!",
      "facts": [
        { "e": "5️⃣", "t": "Jupiter is the fifth planet from the Sun." },
        { "e": "🐘", "t": "It is the biggest planet. More than 1,300 Earths could fit inside it!" },
        { "e": "💨", "t": "Jupiter is a gas giant. It has no solid ground to stand on." },
        { "e": "🌀", "t": "The Great Red Spot is a giant storm. It is bigger than Earth!" }
      ],
      "wow": "Jupiter has more than 90 moons. Ganymede is the biggest moon in the solar system.",
      "stats": { "moons": "95+", "year": "12 years", "size": 11.2 } },

    { "id": "saturn", "name": "Saturn", "n": 6, "kind": "gas", "kindLabel": "Gas giant", "tagline": "The planet with rings", "say": "SAT-ern",
      "intro": "Saturn is famous for its beautiful rings.",
      "facts": [
        { "e": "6️⃣", "t": "Saturn is the sixth planet from the Sun." },
        { "e": "💍", "t": "It has big, bright rings made of pieces of ice and rock." },
        { "e": "💨", "t": "Saturn is a gas giant. It is the second biggest planet." },
        { "e": "🌙", "t": "Saturn has the most moons of all the planets: more than 270!" }
      ],
      "wow": "Saturn is so light that it could float in a giant bathtub!",
      "stats": { "moons": "274", "year": "29 years", "size": 9.4 } },

    { "id": "uranus", "name": "Uranus", "n": 7, "kind": "ice", "kindLabel": "Ice giant", "tagline": "The sideways planet", "say": "YOOR-uh-nus",
      "intro": "Uranus is the planet that rolls on its side.",
      "facts": [
        { "e": "7️⃣", "t": "Uranus is the seventh planet from the Sun." },
        { "e": "🧊", "t": "It is an ice giant. Its color is blue-green." },
        { "e": "🎳", "t": "Uranus spins on its side, like a ball rolling around the Sun." },
        { "e": "🥶", "t": "It is very, very cold, because it is so far from the Sun." }
      ],
      "wow": "Uranus was the first planet discovered with a telescope.",
      "stats": { "moons": "29", "year": "84 years", "size": 4.0 } },

    { "id": "neptune", "name": "Neptune", "n": 8, "kind": "ice", "kindLabel": "Ice giant", "tagline": "The farthest planet", "say": "NEP-toon",
      "intro": "Neptune is the planet farthest from the Sun.",
      "facts": [
        { "e": "8️⃣", "t": "Neptune is the eighth planet. It is the farthest from the Sun." },
        { "e": "🧊", "t": "It is an ice giant. It is dark blue and very cold." },
        { "e": "🌬️", "t": "Neptune has the strongest winds in the solar system." },
        { "e": "⏳", "t": "One year on Neptune lasts 165 Earth years!" }
      ],
      "wow": "Scientists found Neptune with math, before anyone saw it in a telescope!",
      "stats": { "moons": "16", "year": "165 years", "size": 3.9 } },

    { "id": "pluto", "name": "Pluto", "kind": "dwarf", "kindLabel": "Dwarf planet", "tagline": "A dwarf planet", "say": "PLOO-toe",
      "intro": "Pluto is a dwarf planet, far, far away.",
      "facts": [
        { "e": "🤏", "t": "Pluto is a dwarf planet. It is smaller than our Moon." },
        { "e": "🧊", "t": "It is very far away, past Neptune. It is made of ice and rock." },
        { "e": "💗", "t": "Pluto has a big, heart-shaped area on it." },
        { "e": "📜", "t": "Until 2006, people called Pluto the ninth planet." }
      ],
      "wow": "A spaceship called New Horizons flew past Pluto in 2015 and took its picture.",
      "stats": { "moons": "5", "year": "248 years", "size": 0.19 } }
  ],

  "mnemonic": [
    ["My", "mercury"], ["Very", "venus"], ["Excellent", "earth"], ["Mother", "mars"],
    ["Just", "jupiter"], ["Served", "saturn"], ["Us", "uranus"], ["Nachos", "neptune"]
  ],

  "words": [
    { "id": "star", "word": "star", "art": "star", "def": "A giant ball of hot gas that makes its own light. The Sun is a star." },
    { "id": "planet", "word": "planet", "art": "planet", "def": "A big, round world that travels around a star." },
    { "id": "solar", "word": "solar system", "art": "solar", "def": "The Sun and everything that travels around it." },
    { "id": "orbit", "word": "orbit", "art": "orbit", "def": "The path a planet or a moon follows around something. Earth orbits the Sun." },
    { "id": "rotate", "word": "rotate", "art": "rotate", "def": "To spin around. Earth rotates once every 24 hours. That makes day and night." },
    { "id": "revolve", "word": "revolve", "art": "revolve", "def": "To travel around something. Earth revolves around the Sun once a year." },
    { "id": "axis", "word": "axis", "art": "axis", "def": "An imaginary line through the middle of a planet. The planet spins around it." },
    { "id": "moon", "word": "moon", "art": "moonw", "def": "An object that travels around a planet. Earth has one moon." },
    { "id": "gravity", "word": "gravity", "art": "gravity", "def": "A pulling force. The Sun's gravity keeps the planets in their orbits." },
    { "id": "rocky", "word": "rocky planet", "art": "rocky", "def": "A planet made of rock and metal, like Mercury, Venus, Earth and Mars." },
    { "id": "giant", "word": "gas giant", "art": "giant", "def": "A huge planet made mostly of gas, like Jupiter and Saturn." },
    { "id": "asteroid", "word": "asteroid", "art": "asteroid", "def": "A space rock. Many asteroids travel between Mars and Jupiter." },
    { "id": "dwarf", "word": "dwarf planet", "art": "dwarf", "def": "A round world that is too small to be a planet, like Pluto." },
    { "id": "atmosphere", "word": "atmosphere", "art": "atmo", "def": "The layer of air around a planet." }
  ],

  "quiz": [
    { "q": "I am the closest planet to the Sun. I am also the smallest planet.", "opts": ["@mercury", "@mars", "@pluto"], "why": "Mercury is the first planet from the Sun, and the smallest. Pluto is smaller, but it is a dwarf planet." },
    { "q": "I am the hottest planet. My thick clouds trap the heat.", "opts": ["@venus", "@mercury", "@mars"], "why": "Venus is the hottest planet. Its thick clouds trap the heat, like a blanket." },
    { "q": "I am the only planet we know with life.", "opts": ["@earth", "@mars", "@venus"], "why": "Earth is the only planet we know with plants, animals and people." },
    { "q": "People call me the Red Planet.", "opts": ["@mars", "@jupiter", "@venus"], "why": "Mars is the Red Planet. Its dust is red like rust." },
    { "q": "I am the biggest planet. I have a giant storm called the Great Red Spot.", "opts": ["@jupiter", "@saturn", "@neptune"], "why": "Jupiter is the biggest planet, and the Great Red Spot is a storm bigger than Earth." },
    { "q": "My big, bright rings are made of ice and rock.", "opts": ["@saturn", "@jupiter", "@uranus"], "why": "Saturn has the biggest and brightest rings in the solar system." },
    { "q": "I spin on my side, like a rolling ball.", "opts": ["@uranus", "@neptune", "@saturn"], "why": "Uranus spins on its side, like a ball rolling around the Sun." },
    { "q": "I am the farthest planet from the Sun.", "opts": ["@neptune", "@uranus", "@pluto"], "why": "Neptune is the eighth and farthest planet. Pluto is farther, but it is a dwarf planet." },
    { "q": "I am a star, and I am in the center of the solar system.", "opts": ["@sun", "@moon", "@jupiter"], "why": "The Sun is a star. All the planets travel around it." },
    { "q": "I am a dwarf planet. I am smaller than Earth's Moon.", "opts": ["@pluto", "@mercury", "@moon"], "why": "Pluto is a dwarf planet, and it is smaller than our Moon." },
    { "q": "I travel around Earth. Astronauts walked on me in 1969.", "opts": ["@moon", "@mars", "@sun"], "why": "The Moon travels around Earth. Astronauts walked on it in 1969." },
    { "q": "People call me Earth's twin, because I am almost the same size as Earth.", "opts": ["@venus", "@mars", "@mercury"], "why": "Venus is almost the same size as Earth, so people call it Earth's twin." },
    { "q": "I have two small moons, Phobos and Deimos.", "opts": ["@mars", "@earth", "@jupiter"], "why": "Mars has two small moons: Phobos and Deimos." },
    { "q": "I have the most moons of all the planets.", "opts": ["@saturn", "@earth", "@mars"], "why": "Saturn has the most moons: more than 270!" },
    { "q": "I am the fourth planet from the Sun.", "opts": ["@mars", "@earth", "@jupiter"], "why": "My Very Excellent Mother: Mercury, Venus, Earth, Mars. Mars is number four." },
    { "q": "I am the sixth planet from the Sun.", "opts": ["@saturn", "@jupiter", "@uranus"], "why": "Just Served: Jupiter is number five, and Saturn is number six." },
    { "q": "I have the tallest volcano in the solar system.", "opts": ["@mars", "@venus", "@earth"], "why": "Olympus Mons, on Mars, is the tallest volcano in the solar system." },
    { "q": "I have the strongest winds in the solar system.", "opts": ["@neptune", "@jupiter", "@earth"], "why": "Neptune has the strongest winds in the solar system." },
    { "q": "I am an ice giant with a blue-green color. I am the seventh planet.", "opts": ["@uranus", "@neptune", "@saturn"], "why": "Uranus is the seventh planet. It is a blue-green ice giant." },
    { "q": "On me, one day lasts 24 hours, and one year lasts 365 days.", "opts": ["@earth", "@mars", "@venus"], "why": "That is Earth! It spins once in 24 hours, and it goes around the Sun in 365 days." },
    { "q": "What is the Sun?", "opts": ["A star", "A planet", "A moon"], "why": "The Sun is a star: a giant ball of hot gas that makes its own light." },
    { "q": "How many planets are there in our solar system?", "opts": ["8", "9", "10"], "why": "There are eight planets. Pluto is a dwarf planet, so it is not one of them." },
    { "q": "What is between Mars and Jupiter?", "opts": ["The asteroid belt", "The Moon", "Saturn"], "why": "The asteroid belt is a ring of space rocks between Mars and Jupiter." },
    { "q": "When Earth spins around one time, we get…", "opts": ["one day and one night", "one year", "one month"], "why": "Earth rotates once every 24 hours. That gives us day and night." },
    { "q": "When Earth travels one time around the Sun, we get…", "opts": ["one year", "one day", "one week"], "why": "Earth revolves around the Sun in 365 days. That is one year." },
    { "q": "Which planets are rocky planets?", "opts": ["Mercury, Venus, Earth and Mars", "Jupiter, Saturn, Uranus and Neptune", "Only Earth"], "why": "The four planets closest to the Sun are rocky: Mercury, Venus, Earth and Mars." },
    { "q": "What keeps the planets in their orbits?", "opts": ["The Sun's gravity", "The wind", "The Moon"], "why": "The Sun's gravity pulls on the planets and keeps them in their orbits." },
    { "q": "Why does the Moon shine at night?", "opts": ["It reflects light from the Sun", "It makes its own light", "It is a small star"], "why": "The Moon has no light of its own. It shines with light from the Sun." }
  ],

  "sort": [
    { "title": "Rocky planet or giant planet?", "bins": [["rocky", "🪨", "Rocky planet"], ["giant", "🎈", "Giant planet"]],
      "items": [["mercury", "rocky"], ["venus", "rocky"], ["earth", "rocky"], ["mars", "rocky"], ["jupiter", "giant"], ["saturn", "giant"], ["uranus", "giant"], ["neptune", "giant"]],
      "say": "The four planets near the Sun are rocky. The four far away are giants." },
    { "title": "Is it a planet?", "bins": [["yes", "🪐", "Planet"], ["no", "✋", "Not a planet"]],
      "items": [["sun", "no", "The Sun is a star, not a planet."], ["moon", "no", "The Moon is Earth's moon, not a planet."], ["pluto", "no", "Pluto is a dwarf planet."], ["mars", "yes"], ["neptune", "yes"], ["venus", "yes"], ["saturn", "yes"], ["earth", "yes"]],
      "say": "Careful! The Sun, the Moon and Pluto are not planets." }
  ],

  "talk": {
    "slides": [
      { "id": "open-hello", "kind": "open", "art": "title", "title": "Planet Earth",
        "lines": ["Hello, everyone!", "My name is {name}, and today I am going to *talk* about *planet* *Earth*."] },
      { "id": "open-morning", "kind": "open", "art": "title", "title": "Planet Earth",
        "lines": ["Good *morning*, teacher and *classmates*!", "My name is {name}, and my *presentation* is about *planet* *Earth*."] },

      { "id": "hook-imagine", "kind": "hook", "art": "imagine", "title": "Imagine…",
        "lines": ["*Imagine* a planet with blue *oceans*, green *forests* and millions of *animals*.", "That planet is *real*. It is our *home*, planet Earth!"] },
      { "id": "hook-question", "kind": "hook", "art": "question", "title": "A Question",
        "lines": ["Which planet has *plants*, *animals* and *people*?", "Only *one* planet that we know: our *home*, Earth!"] },
      { "id": "hook-riddle", "kind": "hook", "art": "riddle", "title": "A Riddle",
        "lines": ["I have a *riddle* for you.", "I am *round*, I am *blue* and *green*, and I am your *home*. What am I?", "I am planet *Earth*!"] },

      { "id": "f-place", "kind": "fact", "art": "place", "title": "Third from the Sun",
        "lines": ["Earth is the *third* planet from the *Sun*.", "It is a *rocky* planet, like *Mercury*, *Venus* and *Mars*."] },
      { "id": "f-blue", "kind": "fact", "art": "blue", "title": "The Blue Planet",
        "lines": ["People call Earth the *Blue* *Planet*.", "That is because *oceans* cover *most* of it."] },
      { "id": "f-day", "kind": "fact", "art": "day", "title": "Day and Night",
        "lines": ["Earth *spins* around like a *top*.", "One spin takes *24* *hours*, and that is why we have *day* and *night*."] },
      { "id": "f-year", "kind": "fact", "art": "year", "title": "One Year",
        "lines": ["Earth also *travels* around the *Sun*.", "One trip takes *365* *days*. That is one *year*!"] },
      { "id": "f-air", "kind": "fact", "art": "air", "title": "A Blanket of Air",
        "lines": ["Earth is covered by a layer of *air* called the *atmosphere*.", "It gives us *oxygen* to *breathe*, and it *protects* us like a *blanket*."] },
      { "id": "f-moon", "kind": "fact", "art": "moon", "title": "Our Moon",
        "lines": ["Earth has *one* moon, the *Moon*.", "The Moon goes *around* Earth, and it shines with *light* from the *Sun*."] },
      { "id": "f-life", "kind": "fact", "art": "life", "title": "A Home for Life",
        "lines": ["Earth has *everything* we need to *live*.", "It has *water*, *air*, *food* and *light* from the Sun."] },
      { "id": "f-layers", "kind": "fact", "art": "layers", "title": "Inside Earth",
        "lines": ["Inside, Earth has *layers*, like a *peach*.", "They are the *crust*, the *mantle* and the *core*.", "The core is *super* *hot*!"] },
      { "id": "f-land", "kind": "fact", "art": "land", "title": "Land and Water",
        "lines": ["Earth has *seven* *continents* and *five* *oceans*.", "We live in *Colombia*, in *South* *America*."] },
      { "id": "f-seasons", "kind": "fact", "art": "seasons", "title": "Seasons",
        "lines": ["Earth is a little *tilted*.", "That is why many countries have *four* *seasons*.", "In Colombia, we have *rainy* and *dry* seasons."] },
      { "id": "f-care", "kind": "fact", "art": "care", "title": "Take Care of Earth",
        "lines": ["Earth is our *only* home, so we must *take* *care* of it.", "We can *save* *water*, *recycle* and *plant* *trees*."] },

      { "id": "close-questions", "kind": "close", "art": "thanks", "title": "Thank You!",
        "lines": ["Earth is a *wonderful* planet, and it is our *home*.", "Thank you for *listening*! Do you have any *questions*?"] },
      { "id": "close-love", "kind": "close", "art": "thanks", "title": "Thank You!",
        "lines": ["I *love* our beautiful planet, *Earth*!", "Thank you very much for *listening*!"] }
    ],
    "default": ["open-hello", "hook-imagine", "f-place", "f-blue", "f-day", "f-year", "f-air", "f-care", "close-questions"],

    "questions": [
      { "about": "f-moon", "q": "How many moons does Earth have?", "a": "Earth has one moon.", "keys": ["one"] },
      { "about": "f-blue", "q": "Why is Earth called the Blue Planet?", "a": "Because oceans cover most of Earth.", "keys": ["ocean|oceans|water|sea"] },
      { "about": "f-day", "q": "How long is one day on Earth?", "a": "One day is 24 hours long.", "keys": ["24"] },
      { "about": "f-year", "q": "How long does Earth take to go around the Sun?", "a": "It takes 365 days. That is one year.", "keys": ["365|year"] },
      { "about": "f-place", "q": "Is Earth the biggest planet?", "a": "No, it is not. Jupiter is the biggest planet.", "keys": ["jupiter"] },
      { "about": "f-life", "q": "Why can we live on Earth?", "a": "Because Earth has water, air and food.", "keys": ["water|air|food|oxygen"] },
      { "about": "f-air", "q": "What is the atmosphere?", "a": "It is the layer of air around Earth.", "keys": ["air"] },
      { "about": "f-place", "q": "Which planets are Earth's neighbors?", "a": "Venus and Mars are Earth's neighbors.", "keys": ["venus|mars"] },
      { "about": "f-layers", "q": "What is inside Earth?", "a": "Earth has layers: the crust, the mantle and the core.", "keys": ["crust|mantle|core|layer|layers"] },
      { "about": "f-care", "q": "What can we do to take care of Earth?", "a": "We can save water, recycle and plant trees.", "keys": ["water|recycle|tree|trees|plant"] }
    ],
    "rescue": "That is a great question! I don't know, but I can find out."
  },

  "say": {
    "welcome": "Hi! I am Lumi, an alien from a faraway galaxy. Can you teach me about your solar system, and about your planet, Earth?",
    "explore": "Let's fly through the solar system! Tap a planet to visit it.",
    "talk": "This is your presentation about planet Earth. Let's get ready, step by step!",
    "mnemonic": "My Very Excellent Mother Just Served Us Nachos! Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
    "visited": "Planet visited! You got a star.",
    "words": "Tap a space word to see what it means.",
    "ok-0": "Great job!", "ok-1": "Amazing!", "ok-2": "You are a star!", "ok-3": "Out of this world!", "ok-4": "Fantastic!", "ok-5": "Super!",
    "bad-0": "Not quite. Try again!", "bad-1": "Oops! Look again.", "bad-2": "Almost! Try one more time.",
    "parade-0": "Tap the planets in order, starting with the one closest to the Sun.",
    "parade-1": "Now, no names! Tap the planets in order from the Sun, using only the pictures.",
    "parade-2": "Now tap the planets from the biggest to the smallest.",
    "parade-win": "The planet parade is complete!",
    "quiz": "Listen to the riddle, and guess who I am!",
    "match": "Match each space word with its meaning.",
    "sort-intro": "Put each one in the right group!",
    "win": "Mission complete! You are a space expert!",
    "learn": "Listen to each sentence, and then say it out loud. Saying it out loud helps your brain remember!",
    "say-now": "Now you say it!",
    "rocket-1": "Stage one. Some words are missing. Say the whole sentence!",
    "rocket-2": "Stage two. You only see the first letters. You can do it!",
    "rocket-3": "Stage three. Only pictures! Say each sentence from memory.",
    "rocket-win": "We landed on the Moon! You know your presentation by heart!",
    "stage-done": "Stage complete! The rocket is going up!",
    "warm-intro": "A great presenter has a big, clear voice. Let's warm up your voice!",
    "warm-1": "Whisper like a little mouse: hello.",
    "warm-2": "Now talk like you talk to a friend: hello.",
    "warm-3": "Now use your big presenter voice: Hello, everyone!",
    "warm-bigger": "Bigger! Use your big presenter voice, like the whole class is listening.",
    "warm-win": "That is your presenter voice! Use it in your presentation.",
    "rehearse": "The Galactic Council is ready to listen. Remember: big voice, slow speed, and look at your audience!",
    "louder": "Louder, please!",
    "bravo": "Bravo! The Galactic Council loved your presentation!",
    "qa": "After your presentation, your classmates may ask you questions. Let's practice!",
    "qa-good": "Great answer!",
    "qa-idea": "Good try! Here is an idea.",
    "qa-tip": "If you do not know the answer, you can say: That is a great question! I don't know, but I can find out.",
    "show-end": "The end! You did it!",
    "build": "Build your talk! Choose your sentences. You can change the order, edit any sentence, or add your own slide.",
    "rocket": "Fly the memory rocket! Each stage hides more words. Say every sentence from memory, out loud.",
    "print": "Print your cue cards! Write only key words on your cards, not every word. Then you look at your audience, not at your paper.",
    "learn-done": "You said every sentence! Next, the memory rocket!",
    "close": "So close!",
    "goodtry": "Good try!",
    "almost": "Almost! Try again.",
    "rule-0": "Use a big voice, so everybody can hear you.",
    "rule-1": "Speak slowly, like a turtle, and pause between slides.",
    "rule-2": "Look at the people in your audience, not at the floor.",
    "rule-3": "Stand tall, and smile.",
    "rule-4": "Practice a little every day. Your brain remembers better!"
  }
}/*END*/;
