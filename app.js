// Get date for footer
const year = new Date().getFullYear();
document.querySelector('.date').innerHTML = year;

// Keep track of rounds
let round = 1;
document.querySelector('.round').innerHTML = round;

// Keep track of numbers
let gameNumbers = [];
let playerNumbers = [];

// Apply event listeners
let buttons = document.querySelectorAll('button:not(.start)');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    playerNumbers.push(button.value);
    console.log(playerNumbers);
  })
})

document.querySelector('.hide-rules').addEventListener('click', () => {
  document.querySelector('.rules-div').classList.add('hidden');
})

const start = document.querySelector('.start');
start.addEventListener('click', startGame);

// Start game
function startGame() {
  start.innerHTML = 'Submit';
  start.classList.add('submit');
  start.classList.remove('start');
  start.removeEventListener('click', startGame);
  document.querySelector('main').classList.remove('incorrect');
  document.querySelector('.submit').addEventListener('click', checkPlayer);
  gameNumbers = [];
  playerNumbers = [];
  round = 1;
  document.querySelector('.round').innerHTML = round;
  nextNumber();
}

// Check player input
function checkPlayer() {
  let correct = true;
  for (let i = 0; i < round; i++){
    if(gameNumbers[i] != playerNumbers[i]) correct = false;
  }
  if (correct){
    round++;
    document.querySelector('.round').innerHTML = round;
    playerNumbers = [];
    nextNumber();
  } else {
    document.querySelector('.correctAnswer').innerHTML = `Thanks for playing. The 
    correct sequence was: ${gameNumbers}.`
    document.querySelector('main').classList.remove('correct');
    document.querySelector('main').classList.add('incorrect');
    document.querySelector('.submit').removeEventListener('click', checkPlayer);
    document.querySelector('.submit').addEventListener('click', startGame);
    document.querySelector('.submit').innerHTML = 'Restart Game';
  }
}

// Get next number
function nextNumber() {
  let randomNumber = Math.floor(Math.random() * 10);
  let id = '#one';
  if (randomNumber == 2) id = '#two';
  if (randomNumber == 3) id = '#three';
  if (randomNumber == 4) id = '#four';
  if (randomNumber == 5) id = '#five';
  if (randomNumber == 6) id = '#six';
  if (randomNumber == 7) id = '#seven';
  if (randomNumber == 8) id = '#eight';
  if (randomNumber == 9) id = '#nine';

  if (randomNumber === 0) nextNumber();
  else {
    gameNumbers.push(randomNumber);
    document.querySelector(id).classList.add('display');
    setTimeout(() => {
      document.querySelector(id).classList.remove('display');
    }, 500);
  }
}