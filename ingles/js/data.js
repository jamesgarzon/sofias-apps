// Contenido de Helper Town: taller de repaso de Inglés, 4.º periodo (3.º grado). Frases literales del taller.
// Chispas: `x, y` = el botón en la escena (800×450); `z: [x, y, radio]` opcional = a qué apunta el zoom; `full: true` = muestra toda la escena.
// Cada paso de juego lleva `ws`: el ejercicio del taller que practica (tools/cobertura.js lo revisa).
window.DATA = {
  meta: { id: 'ingles', title: 'Helper Town', exam: 'Friday, November 13' },

  ws: {
  '1': 'Unscramble the chores',
  '2a': 'Earache: pain in your ear', '2b': 'Fever: your body is very hot', '2c': 'Sore throat: pain when you swallow',
  '2d': 'Toothache: pain in your tooth', '2e': 'Dizzy: the room is spinning around', '2f': 'Stomachache: pain in your stomach',
  '3a': 'Did you clean your bedroom? Yes, I did.', '3b': 'Did you sweep the floor? No, I didn’t.',
  '3c': 'Did you take out the trash yesterday?', '3d': 'I didn’t go to school',
  '4a': 'Cut finger: you should put on a clean bandage', '4b': 'Tired: you should go to sleep early',
  '4c': 'A cold: you shouldn’t play outside in the rain', '4d': 'Thirsty: you should drink some fresh water',
  '5a': 'How many bandages are there?', '5b': 'How much cough syrup is there?', '5c': 'How many pills are there?', '5d': 'How much cream is there?',
  '6a': 'Bandages: a lot', '6b': 'Cough syrup: some', '6c': 'Pills: none', '6d': 'Cream: a lot',
  '7': 'Your friend feels sick: should and shouldn’t',
  },

  say: {
  hello: 'Hi Sofía! Welcome to Helper Town. Let’s help!',
  locked: 'First, open all the sparks.',
  stopLocked: 'Finish the stop before this one first.',
  reviewLocked: 'The Big Review opens when you have all 8 stamps.',
  stamp: 'You got the stamp! Now you can play.',
  chest: 'You have a new pet! Open the gift!',
  mission: 'Let’s practice what you missed.',
  noMission: 'Nothing to practice. Great job!',
  trip: 'Choose a new helper pet! The town starts again, and your pet multiplies every new star.',
  newTrip: 'New day! Visit every place again and win more stars.',
  // Juana (la perrita de Sofía) llega a las 1000 ⭐ con el examen final; si lo pasa, su película y el premio.
  exam: 'Woof! This is my final exam! Answer everything without help. Get 28 out of 40 to win the prize.',
  examAgain: 'Almost! Study a little more and try again. You can do it!',
  prize: 'Sofía, you worked so hard! You earned this prize!',
  juanaReady: 'Woof! Sofía’s exam is here!',
  hmm: 'Hmm… let me see.',
  amazing: 'A plus! Amazing!',
  didIt: 'Sofía, you are a super helper!',
  },

  // Mascotas: Biscuit ayuda desde el principio; las demás salen del regalo al juntar estrellas, en este orden.
  // `x`: cuánto multiplica las estrellas cuando es la mascota ayudante (New day). Como cada día rinde más,
  // los umbrales crecen rápido: salen 1 o 2 mascotas por día (node tools/cobertura.js muestra el ritmo).
  friends: [
  { id: 'biscuit', name: 'Biscuit', kind: 'Puppy', x: 1, stars: 0, line: 'Hi Sofía! I am Biscuit. Let’s help at home!',
  card: 'Woof! Feed the pets, please. I am hungry!' },
  { id: 'mimi', name: 'Mimi', kind: 'Kitten', x: 2, stars: 50, line: 'I am Mimi, the kitten.',
  card: 'Meow! Did you feed the pets? Yes, I did!' },
  { id: 'hoppy', name: 'Hoppy', kind: 'Bunny', x: 3, stars: 120, line: 'I am Hoppy, the bunny.',
  card: 'I have a toothache. I shouldn’t eat a lot of candy.' },
  { id: 'bubbles', name: 'Bubbles', kind: 'Goldfish', x: 4, stars: 300, line: 'I am Bubbles, the goldfish.',
  card: 'Water the plants! And drink some fresh water.' },
  { id: 'kiwi', name: 'Kiwi', kind: 'Parrot', x: 5, stars: 500, line: 'I am Kiwi, the parrot.',
  card: 'Sweep the floor! Mop the floor! Vacuum the floor!' },
  { id: 'shelly', name: 'Shelly', kind: 'Turtle', x: 6, stars: 800, line: 'I am Shelly, the turtle.',
  card: 'I feel very tired. I should go to sleep early tonight.' },
  // Juana no es ayudante (no tiene `x`): trae el examen final y el premio.
  { id: 'juana', name: 'Juana', kind: 'Sofía’s dog', stars: 1000, line: 'Woof! I am Juana, Sofía’s dog. I have a final exam for you!',
  card: 'Pass my final exam and win a big prize! Woof!' },
  { id: 'nibbles', name: 'Nibbles', kind: 'Hamster', x: 7, stars: 1200, line: 'I am Nibbles, the hamster.',
  card: 'How many pills are there? None!' },
  { id: 'daisy', name: 'Daisy', kind: 'Pony', x: 8, stars: 1700, line: 'I am Daisy, the pony.',
  card: 'I have a sore throat. It hurts when I swallow.' },
  { id: 'bamboo', name: 'Bamboo', kind: 'Panda', x: 9, stars: 2300, line: 'I am Bamboo, the panda.',
  card: 'Make the bed and put away toys. Clean your bedroom!' },
  { id: 'sparkle', name: 'Sparkle', kind: 'Unicorn', x: 10, stars: 3000, line: 'I am Sparkle, the unicorn!',
  card: 'You worked so hard! You are a super helper!' },
  ],

  stops: [
  {
  id: 'kitchen', title: 'The Kitchen', icon: 'kitchen',
  sparks: [
    { id: 'dishes', x: 215, y: 215, z: [150, 330, 80], title: 'Wash the dishes', text: 'Wash the dishes: clean the plates and cups with soap and water.' },
    { id: 'table', x: 440, y: 205, z: [420, 320, 90], title: 'Set the table', text: 'Set the table: put the plates, the forks and the cups on the table.' },
    { id: 'mop', x: 575, y: 300, z: [575, 370, 80], title: 'Mop the floor', text: 'Mop the floor: clean the floor with a mop and water.' },
    { id: 'trash', x: 720, y: 190, z: [715, 330, 85], title: 'Take out the trash', text: 'Take out the trash: carry the trash bag outside.' },
  ],
  games: [
    { id: 'quiz', title: 'What chore is it?', steps: [
    { type: 'quiz', ws: '1', pic: 'dishes', q: 'What chore is it?', opts: ['Wash the dishes', 'Set the table', 'Mop the floor'], a: 0 },
    { type: 'quiz', ws: '1', pic: 'table', q: 'What chore is it?', opts: ['Take out the trash', 'Set the table', 'Wash the dishes'], a: 1 },
    { type: 'quiz', ws: '1', pic: 'trash', q: 'What chore is it?', opts: ['Mop the floor', 'Feed the pets', 'Take out the trash'], a: 2 },
    { type: 'quiz', ws: '1', pic: 'mop', q: 'What chore is it?', opts: ['Mop the floor', 'Dust the furniture', 'Set the table'], a: 0 },
    ] },
    { id: 'write', title: 'Write it!', write: [
    { word: 'WASH THE DISHES', clue: 's h a w t h e s h e s i d', pic: 'dishes', mix: true, ws: '1' },
    { word: 'SET THE TABLE', clue: 't e s t h e b l e t a', pic: 'table', mix: true, ws: '1' },
    { word: 'TAKE OUT THE TRASH', clue: 'k a t e t u o t h e h s a r t', pic: 'trash', mix: true, ws: '1' },
    { word: 'MOP THE FLOOR', clue: 'p o m t h e r o o l f', pic: 'mop', mix: true, ws: '1' },
    ] },
  ],
  },
  {
  id: 'living', title: 'The Living Room', icon: 'living',
  sparks: [
    { id: 'dust', x: 120, y: 120, z: [130, 300, 95], title: 'Dust the furniture', text: 'Dust the furniture: clean the dust on the shelves and the sofa.' },
    { id: 'vacuum', x: 330, y: 215, z: [345, 360, 90], title: 'Vacuum the floor', text: 'Vacuum the floor: clean the carpet with the vacuum cleaner.' },
    { id: 'plants', x: 560, y: 160, z: [580, 330, 95], title: 'Water the plants', text: 'Water the plants: give the plants some water.' },
    { id: 'sweep', x: 725, y: 250, z: [720, 360, 85], title: 'Sweep the floor', text: 'Sweep the floor: clean the floor with a broom.' },
  ],
  games: [
    { id: 'label', title: 'Who does what?', steps: [
    { type: 'label', ws: '1', q: 'What are they doing?', ask: 'what chore is it?', opts: ['Dust the furniture', 'Vacuum the floor', 'Water the plants', 'Sweep the floor'],
    targets: [{ spark: 'plants', a: 'Water the plants' }, { spark: 'dust', a: 'Dust the furniture' }, { spark: 'sweep', a: 'Sweep the floor' }, { spark: 'vacuum', a: 'Vacuum the floor' }] },
    ] },
    { id: 'match', title: 'Tools and chores', steps: [
    { type: 'match', ws: '1', q: 'Match each thing with its chore.', pairs: [
    ['A broom', 'Sweep the floor'], ['A mop', 'Mop the floor'], ['A vacuum cleaner', 'Vacuum the floor'],
    ['A watering can', 'Water the plants'], ['A duster', 'Dust the furniture'], ['Soap and water', 'Wash the dishes'] ] },
    ] },
    { id: 'write', title: 'Write it!', write: [
    { word: 'DUST THE FURNITURE', clue: 't s u d t h e r e f u n i t u r', pic: 'duster', mix: true, ws: '1' },
    { word: 'VACUUM THE FLOOR', clue: 'c a u u v m t h e r o o l f', pic: 'vacuum', mix: true, ws: '1' },
    { word: 'WATER THE PLANTS', clue: 'r e t a w t h e s t n a l p', pic: 'plant', mix: true, ws: '1' },
    { word: 'SWEEP THE FLOOR', clue: 'e p e w s t h e r o o l f', pic: 'broom', mix: true, ws: '1' },
    ] },
  ],
  },
  {
  id: 'bedroom', title: 'The Bedroom', icon: 'bedroom',
  sparks: [
    { id: 'clean', x: 420, y: 60, full: true, title: 'Clean your bedroom', text: 'Clean your bedroom: make the bed and put away toys.' },
    { id: 'bed', x: 160, y: 200, z: [190, 330, 100], title: 'Make the bed', text: 'Make the bed: put the sheets and the pillow in order.' },
    { id: 'toys', x: 440, y: 230, z: [450, 350, 85], title: 'Put away toys', text: 'Put away toys: put your toys in the toy box.' },
    { id: 'pets', x: 680, y: 200, z: [680, 350, 95], title: 'Feed the pets', text: 'Feed the pets: give food to the dog, the cat and the fish.' },
  ],
  games: [
    { id: 'quiz', title: 'What chore is it?', steps: [
    { type: 'quiz', ws: '1', pic: 'bed', q: 'What chore is it?', opts: ['Make the bed', 'Put away toys', 'Feed the pets'], a: 0 },
    { type: 'quiz', ws: '1', pic: 'toys', q: 'What chore is it?', opts: ['Water the plants', 'Put away toys', 'Make the bed'], a: 1 },
    { type: 'quiz', ws: '1', pic: 'petfood', q: 'What chore is it?', opts: ['Wash the dishes', 'Sweep the floor', 'Feed the pets'], a: 2 },
    { type: 'quiz', ws: '3a', q: 'Make the bed and put away toys. You…', opts: ['clean your bedroom', 'take out the trash', 'water the plants'], a: 0 },
    ] },
    { id: 'write', title: 'Write it!', write: [
    { word: 'MAKE THE BED', clue: 'k a m e t h e d e b', pic: 'bed', mix: true, ws: '1' },
    { word: 'PUT AWAY TOYS', clue: 'p u t y a w a s y o t', pic: 'toys', mix: true, ws: '1' },
    { word: 'FEED THE PETS', clue: 'f e d e t h e s t e p', pic: 'petfood', mix: true, ws: '1' },
    ] },
  ],
  },
  {
  id: 'yesterday', title: 'Yesterday', icon: 'calendar',
  sparks: [
    { id: 'did', x: 330, y: 70, z: [360, 150, 100], title: 'Did you…?', text: 'To ask about yesterday, say: Did you…? Did you clean your bedroom?' },
    { id: 'yes', x: 560, y: 60, z: [570, 150, 100], title: 'Yes, I did.', text: 'Did you clean your bedroom? Yes, I did.' },
    { id: 'no', x: 140, y: 345, z: [140, 210, 110], title: 'No, I didn’t.', text: 'Did you sweep the floor? No, I didn’t.' },
    { id: 'didnt', x: 700, y: 300, z: [690, 220, 95], title: 'I didn’t go', text: 'I had a bad cough, so I didn’t go to school. Didn’t + go, not went.' },
  ],
  games: [
    { id: 'quiz', title: 'Complete the conversation', steps: [
    { type: 'quiz', ws: '3a', q: 'Charlie: ___ you clean your bedroom, Lin?', opts: ['Did', 'Do', 'Does'], a: 0, why: 'Did you…? asks about the past.' },
    { type: 'quiz', ws: '3a', q: 'Charlie: Did you clean your bedroom, Lin? Lin: Yes, ___.', opts: ['I did', 'I didn’t', 'I do'], a: 0 },
    { type: 'quiz', ws: '3b', q: 'Charlie: Lin, ___ you sweep the floor?', opts: ['did', 'does', 'are'], a: 0 },
    { type: 'quiz', ws: '3b', q: 'Charlie: Did you sweep the floor? Lin: No, ___.', opts: ['I didn’t', 'I did', 'I don’t'], a: 0 },
    { type: 'quiz', ws: '3c', q: 'Charlie: ___ you take out the trash yesterday?', opts: ['Did', 'Do', 'Are'], a: 0 },
    { type: 'quiz', ws: '3d', q: 'Lin: No, I had a bad cough, so I ___ to school.', opts: ['didn’t go', 'didn’t went', 'don’t go'], a: 0, why: 'After didn’t, say go, not went.' },
    ] },
    { id: 'chart', title: 'Lin’s chores', steps: [
    { type: 'quiz', ws: '3a', table: [['Yesterday', 'Lin'], ['Clean the bedroom', '✅'], ['Sweep the floor', '❌'], ['Take out the trash', '❌'], ['Feed the pets', '✅']],
    q: 'Charlie: Did you feed the pets, Lin?', opts: ['Yes, I did.', 'No, I didn’t.'], a: 0 },
    { type: 'quiz', ws: '3b', table: [['Yesterday', 'Lin'], ['Clean the bedroom', '✅'], ['Sweep the floor', '❌'], ['Take out the trash', '❌'], ['Feed the pets', '✅']],
    q: 'Charlie: Did you sweep the floor, Lin?', opts: ['Yes, I did.', 'No, I didn’t.'], a: 1 },
    { type: 'quiz', ws: '3c', table: [['Yesterday', 'Lin'], ['Clean the bedroom', '✅'], ['Sweep the floor', '❌'], ['Take out the trash', '❌'], ['Feed the pets', '✅']],
    q: 'Charlie: Did you take out the trash, Lin?', opts: ['Yes, I did.', 'No, I didn’t.'], a: 1 },
    { type: 'quiz', ws: '3a', table: [['Yesterday', 'Lin'], ['Clean the bedroom', '✅'], ['Sweep the floor', '❌'], ['Take out the trash', '❌'], ['Feed the pets', '✅']],
    q: 'Charlie: Did you clean your bedroom, Lin?', opts: ['Yes, I did.', 'No, I didn’t.'], a: 0 },
    ] },
    { id: 'build', title: 'Build the sentence', steps: [
    { type: 'build', ws: '3b', q: 'Ask Lin about the floor.', text: 'Did you sweep the floor?', extra: ['swept'] },
    { type: 'build', ws: '3b', q: 'Lin did not sweep the floor. Answer.', text: 'No, I didn’t.', extra: ['Yes,', 'did.'] },
    { type: 'build', ws: '3d', q: 'Lin had a bad cough.', text: 'I didn’t go to school.', extra: ['went'] },
    { type: 'build', ws: '3c', q: 'Ask Lin about the trash.', text: 'Did you take out the trash yesterday?', extra: ['took'] },
    ] },
  ],
  },
  {
  id: 'doctor', title: 'The Doctor’s Office', icon: 'doctor',
  sparks: [
    { id: 'earache', x: 70, y: 200, z: [70, 320, 70], title: 'Earache', text: 'Earache: pain in your ear.' },
    { id: 'fever', x: 200, y: 200, z: [200, 320, 70], title: 'Fever', text: 'Fever: your body is very hot because of an illness.' },
    { id: 'throat', x: 330, y: 200, z: [330, 320, 70], title: 'Sore throat', text: 'Sore throat: pain in your throat when you swallow.' },
    { id: 'tooth', x: 465, y: 200, z: [465, 320, 70], title: 'Toothache', text: 'Toothache: pain in your tooth.' },
    { id: 'dizzy', x: 600, y: 200, title: 'Dizzy', text: 'Dizzy: you feel that the room is spinning around.' },
    { id: 'stomach', x: 730, y: 200, z: [730, 320, 70], title: 'Stomachache', text: 'Stomachache: pain in your stomach.' },
  ],
  games: [
    { id: 'match', title: 'What’s the matter?', steps: [
    { type: 'match', ws: ['2a', '2b', '2c', '2d', '2e', '2f'], q: 'Read the description and match the word.', pairs: [
    ['Earache', 'Pain in your ear'], ['Fever', 'When your body is very hot because of an illness'],
    ['Sore throat', 'Pain in your throat when you swallow'], ['Toothache', 'Pain in your tooth'],
    ['Dizzy', 'When you feel that the room is spinning around'], ['Stomachache', 'Pain in your stomach'] ] },
    ] },
    { id: 'quiz', title: 'Who feels sick?', steps: [
    { type: 'quiz', ws: '2a', pic: 'ear', q: 'What’s the matter?', opts: ['Earache', 'Toothache', 'Fever'], a: 0 },
    { type: 'quiz', ws: '2b', pic: 'fever', q: 'What’s the matter?', opts: ['Dizzy', 'Fever', 'Stomachache'], a: 1 },
    { type: 'quiz', ws: '2c', pic: 'throat', q: 'What’s the matter?', opts: ['Earache', 'Stomachache', 'Sore throat'], a: 2 },
    { type: 'quiz', ws: '2d', pic: 'tooth', q: 'What’s the matter?', opts: ['Toothache', 'Sore throat', 'Dizzy'], a: 0 },
    { type: 'quiz', ws: '2e', pic: 'dizzy', q: 'What’s the matter?', opts: ['Fever', 'Dizzy', 'Earache'], a: 1 },
    { type: 'quiz', ws: '2f', pic: 'stomach', q: 'What’s the matter?', opts: ['Toothache', 'Fever', 'Stomachache'], a: 2 },
    ] },
    { id: 'write', title: 'Write it!', write: [
    { word: 'EARACHE', clue: 'Pain in your ear', pic: 'ear', ws: '2a' },
    { word: 'FEVER', clue: 'Your body is very hot because of an illness', pic: 'fever', ws: '2b' },
    { word: 'SORE THROAT', clue: 'Pain in your throat when you swallow', pic: 'throat', ws: '2c' },
    { word: 'TOOTHACHE', clue: 'Pain in your tooth', pic: 'tooth', ws: '2d' },
    { word: 'DIZZY', clue: 'You feel that the room is spinning around', pic: 'dizzy', ws: '2e' },
    { word: 'STOMACHACHE', clue: 'Pain in your stomach', pic: 'stomach', ws: '2f' },
    ] },
  ],
  },
  {
  id: 'advice', title: 'Doctor’s Advice', icon: 'advice',
  sparks: [
    { id: 'rule', x: 400, y: 225, full: true, title: 'Should and shouldn’t', text: 'Should: it is a good idea. Shouldn’t: it is a bad idea.' },
    { id: 'cut', x: 320, y: 60, z: [200, 120, 105], title: 'I cut my finger', text: 'I cut my finger with a piece of paper. You should put on a clean bandage.' },
    { id: 'tired', x: 720, y: 60, z: [600, 120, 105], title: 'I feel very tired', text: 'I feel very tired and sleepy during class. You should go to sleep early tonight.' },
    { id: 'cold', x: 320, y: 290, z: [200, 340, 105], title: 'I have a cold', text: 'I have a high temperature and a cold. You shouldn’t play outside in the rain.' },
    { id: 'thirsty', x: 720, y: 290, z: [600, 340, 105], title: 'I am very thirsty', text: 'I am very thirsty after playing soccer. You should drink some fresh water.' },
  ],
  games: [
    { id: 'quiz', title: 'Should or shouldn’t?', steps: [
    { type: 'quiz', ws: '4a', q: 'Charlie: I cut my finger with a piece of paper. Lin: You ___ put on a clean bandage.', opts: ['should', 'shouldn’t'], a: 0 },
    { type: 'quiz', ws: '4c', q: 'Lin: I have a high temperature and a cold. Charlie: You ___ play outside in the rain.', opts: ['should', 'shouldn’t'], a: 1 },
    { type: 'quiz', ws: '4b', q: 'Charlie: I feel very tired and sleepy during class. Lin: You ___ go to sleep early tonight.', opts: ['should', 'shouldn’t'], a: 0 },
    { type: 'quiz', ws: '4d', q: 'Lin: I am very thirsty after playing soccer. Charlie: You ___ drink some fresh water.', opts: ['should', 'shouldn’t'], a: 0 },
    { type: 'quiz', ws: '7', q: 'I have a toothache. You ___ eat a lot of candy.', opts: ['should', 'shouldn’t'], a: 1 },
    { type: 'quiz', ws: '7', q: 'I have a stomachache. You ___ go to the doctor.', opts: ['should', 'shouldn’t'], a: 0 },
    ] },
    { id: 'sort', title: 'Good idea or bad idea?', steps: [
    { type: 'sort', ws: '7', q: 'Your friend feels sick. Should or shouldn’t?', bins: ['You should', 'You shouldn’t'], items: [
    ['Drink water', 0, 'water'], ['Eat a lot of candy', 1, 'candy'], ['Go to the doctor', 0, 'doctor'], ['Play outside in the rain', 1, 'rain'],
    ['Rest in bed', 0, 'bed'], ['Go to school', 1, 'school'], ['Take your medicine', 0, 'syrup'] ] },
    ] },
  ],
  },
  {
  id: 'pharmacy', title: 'The Pharmacy', icon: 'pharmacy',
  sparks: [
    { id: 'rule', x: 150, y: 60, z: [150, 170, 100], title: 'Is or are?', text: 'How many … are there? How much … is there?' },
    { id: 'many', x: 380, y: 75, z: [470, 165, 100], title: 'How many?', text: 'How many: for things we can count. How many bandages are there?' },
    { id: 'much', x: 690, y: 60, z: [680, 160, 70], title: 'How much?', text: 'How much: for things we can’t count. How much cough syrup is there?' },
    { id: 'alot', x: 560, y: 210, z: [470, 165, 100], title: 'A lot', text: 'There are a lot of bandages.' },
    { id: 'some', x: 700, y: 215, z: [680, 160, 70], title: 'Some', text: 'There is some cough syrup.' },
    { id: 'none', x: 730, y: 330, z: [725, 345, 60], title: 'None', text: 'How many pills are there? None. There are no pills.' },
  ],
  games: [
    { id: 'quiz', title: 'Complete the questions', steps: [
    { type: 'quiz', ws: '5a', pic: 'shelf', q: 'How ___ bandages ___ there?', opts: ['many … are', 'many … is', 'much … are', 'much … is'], a: 0, why: 'We can count bandages: How many bandages are there?' },
    { type: 'quiz', ws: '5b', pic: 'shelf', q: 'How ___ cough syrup ___ there?', opts: ['many … are', 'many … is', 'much … are', 'much … is'], a: 3, why: 'We can’t count cough syrup: How much cough syrup is there?' },
    { type: 'quiz', ws: '5c', pic: 'shelf', q: 'How ___ pills ___ there?', opts: ['many … are', 'many … is', 'much … are', 'much … is'], a: 0, why: 'We can count pills: How many pills are there?' },
    { type: 'quiz', ws: '5d', pic: 'shelf', q: 'How ___ cream ___ there?', opts: ['many … are', 'many … is', 'much … are', 'much … is'], a: 3, why: 'We can’t count cream: How much cream is there?' },
    ] },
    { id: 'shelf', title: 'A lot, some or none?', steps: [
    { type: 'quiz', ws: '6a', pic: 'shelf', q: 'How many bandages are there?', opts: ['A lot', 'Some', 'None'], a: 0 },
    { type: 'quiz', ws: '6b', pic: 'shelf', q: 'How much cough syrup is there?', opts: ['A lot', 'Some', 'None'], a: 1 },
    { type: 'quiz', ws: '6c', pic: 'shelf', q: 'How many pills are there?', opts: ['A lot', 'Some', 'None'], a: 2 },
    { type: 'quiz', ws: '6d', pic: 'shelf', q: 'How much cream is there?', opts: ['A lot', 'Some', 'None'], a: 0 },
    ] },
    { id: 'sort', title: 'How many or how much?', steps: [
    { type: 'sort', ws: ['5a', '5b'], q: 'How many or how much?', bins: ['How many', 'How much'], items: [
    ['Bandages', 0, 'bandage'], ['Cough syrup', 1, 'syrup'], ['Pills', 0, 'pills'], ['Cream', 1, 'cream'],
    ['Toys', 0, 'toys'], ['Water', 1, 'water'], ['Plates', 0, 'dishes'], ['Juice', 1, 'juice'] ] },
    ] },
  ],
  },
  {
  id: 'card', title: 'Get Well Card', icon: 'card',
  sparks: [
    { id: 'sick', x: 190, y: 110, z: [190, 280, 100], title: 'My friend feels sick', text: 'Your friend feels sick today! What should your friend do?' },
    { id: 'medicine', x: 330, y: 290, z: [320, 360, 70], title: 'Medicine', text: 'You should take your medicine. You should go to the doctor.' },
    { id: 'should', x: 760, y: 150, z: [600, 190, 120], title: 'You should…', text: 'You should rest in bed. You should drink water.' },
    { id: 'shouldnt', x: 760, y: 330, z: [600, 320, 120], title: 'You shouldn’t…', text: 'You shouldn’t go to school. You shouldn’t play outside in the rain.' },
  ],
  games: [
    { id: 'build', title: 'Write the card', steps: [
    { type: 'build', ws: '7', q: 'Your friend feels sick. Write good advice.', text: 'You should drink water.', extra: ['shouldn’t'] },
    { type: 'build', ws: '7', q: 'Your friend feels sick. Write good advice.', text: 'You should go to the doctor.', extra: ['shouldn’t'] },
    { type: 'build', ws: '7', q: 'Your friend feels sick. Write good advice.', text: 'You shouldn’t go to school.', extra: ['should'] },
    { type: 'build', ws: '7', q: 'Your friend feels sick. Write good advice.', text: 'You should take your medicine.', extra: ['shouldn’t'] },
    { type: 'build', ws: '7', q: 'Your friend feels sick. Write good advice.', text: 'You shouldn’t play outside in the rain.', extra: ['should'] },
    ] },
    { id: 'quiz', title: 'Good advice', steps: [
    { type: 'quiz', ws: '7', q: 'Your friend has a fever. You should…', opts: ['rest in bed', 'play outside in the rain', 'eat a lot of candy'], a: 0 },
    { type: 'quiz', ws: '7', q: 'Your friend has a stomachache. You shouldn’t…', opts: ['drink water', 'eat a lot of candy', 'go to the doctor'], a: 1 },
    { type: 'quiz', ws: '7', q: 'Your friend has a bad cough. You should…', opts: ['go to school', 'play soccer in the rain', 'take your medicine'], a: 2 },
    { type: 'quiz', ws: '7', q: 'Your friend feels dizzy. You should…', opts: ['sit down and rest', 'run and jump', 'eat a lot of candy'], a: 0 },
    ] },
  ],
  },
  ],

  // The Big Review: el taller en su orden. `ref` = parada/juego/paso; los demás pasos solo existen aquí.
  review: [
  ...[['FEED THE PETS', 'f e d e t h e s t e p'], ['MOP THE FLOOR', 'p o m t h e r o o l f'], ['DUST THE FURNITURE', 't s u d t h e r e f u n i t u r'],
  ['MAKE THE BED', 'k a m e t h e d e b'], ['WATER THE PLANTS', 'r e t a w t h e s t n a l p'], ['VACUUM THE FLOOR', 'c a u u v m t h e r o o l f'],
  ['WASH THE DISHES', 's h a w t h e s h e s i d'], ['PUT AWAY TOYS', 'p u t y a w a s y o t'], ['SWEEP THE FLOOR', 'e p e w s t h e r o o l f'],
  ['SET THE TABLE', 't e s t h e b l e t a'], ['TAKE OUT THE TRASH', 'k a t e t u o t h e h s a r t']]
  .map(([word, clue]) => ({ type: 'spell', level: 2, mix: true, ws: '1', word, clue, title: '1 · Unscramble the chore' })),
  { ref: 'doctor/match/0', title: '2 · Health problems' },
  { ref: 'yesterday/quiz/0', title: '3 · Complete the conversation' },
  { ref: 'yesterday/quiz/1', title: '3 · Complete the conversation' },
  { ref: 'yesterday/quiz/2', title: '3 · Complete the conversation' },
  { ref: 'yesterday/quiz/3', title: '3 · Complete the conversation' },
  { ref: 'yesterday/quiz/4', title: '3 · Complete the conversation' },
  { ref: 'yesterday/quiz/5', title: '3 · Complete the conversation' },
  { ref: 'advice/quiz/0', title: '4 · Should or shouldn’t' },
  { ref: 'advice/quiz/2', title: '4 · Should or shouldn’t' },
  { ref: 'advice/quiz/1', title: '4 · Should or shouldn’t' },
  { ref: 'advice/quiz/3', title: '4 · Should or shouldn’t' },
  { ref: 'pharmacy/quiz/0', title: '5 · Complete the questions' },
  { ref: 'pharmacy/quiz/1', title: '5 · Complete the questions' },
  { ref: 'pharmacy/quiz/2', title: '5 · Complete the questions' },
  { ref: 'pharmacy/quiz/3', title: '5 · Complete the questions' },
  { ref: 'pharmacy/shelf/0', title: '6 · A lot, some or none' },
  { ref: 'pharmacy/shelf/1', title: '6 · A lot, some or none' },
  { ref: 'pharmacy/shelf/2', title: '6 · A lot, some or none' },
  { ref: 'pharmacy/shelf/3', title: '6 · A lot, some or none' },
  { ref: 'card/build/0', title: '7 · Your friend feels sick' },
  { ref: 'card/build/2', title: '7 · Your friend feels sick' },
  { ref: 'card/build/4', title: '7 · Your friend feels sick' },
  { type: 'listen', ws: '2d', word: 'TOOTHACHE', title: 'Bonus · Listen and write' },
  { type: 'listen', ws: '2c', word: 'SORE THROAT', title: 'Bonus · Listen and write' },
  ],
};
