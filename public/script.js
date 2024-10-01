const cardValues = [...Array(18).keys(), ...Array(18).keys()]; // Create pairs of cards
let shuffledCards = shuffle(cardValues);
let selectedCards = [];
let matchedCards = 0;
let score = 0; // Initialize score
let timerInterval; // Variable to hold the timer interval
let elapsedTime = 0; // Variable to hold elapsed time in seconds

const gameBoard = document.getElementById('game-board');
const winMessage = document.getElementById('win-message');
const resetBtn = document.getElementById('reset-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const scoreDisplay = document.getElementById('score-display'); // Get score display element
const timerDisplay = document.getElementById('timer-display'); // Get timer display element
const leaderboardBody = document.getElementById('leaderboard-body'); // Get leaderboard body element
let leaderboard = []; // Array to store leaderboard entries
let idCounter = 1; // To assign unique IDs to leaderboard entries

// Shuffle the cards array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create the game board
function createBoard() {
  gameBoard.innerHTML = ''; // Clear the game board
  shuffledCards.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value; // Store card value
    card.dataset.index = index;

    // Create card front and back elements
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.style.backgroundImage = "url('./theme1.png')"; // Front image path

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.style.backgroundImage = `url('./images/img${value + 1}.jpg')`; // Back image path

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card); // Add card to the board
  });
}

// Function to update the score display
function updateScore(points) {
  score += points;
  scoreDisplay.textContent = `Score: ${score}`;
}

// Start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    elapsedTime++;
    const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
    const seconds = String(elapsedTime % 60).padStart(2, '0');
    timerDisplay.textContent = `Time: ${minutes}:${seconds}`;
  }, 1000);
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Flip card function
function flipCard() {
  const card = this;

  // Prevent flipping more than 2 cards or flipping matched cards
  if (selectedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
    card.classList.add('flipped');
    selectedCards.push(card);

    if (selectedCards.length === 2) {
      gameBoard.classList.add('no-clicks'); // Disable further clicks
      setTimeout(() => checkMatch(), 500); // Delay before checking for a match
    }
  }
}

// Check if the selected cards match
function checkMatch() {
  const [firstCard, secondCard] = selectedCards;
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards += 2;

    // Update score for a correct match
    updateScore(10); // Add points for a correct guess

    // If all cards are matched, display win message
    if (matchedCards === shuffledCards.length) {
      stopTimer(); // Stop the timer
      setTimeout(() => {
        winMessage.classList.remove('hidden');
        onGameEnd(score, elapsedTime); // Update leaderboard
      }, 500);
    }
  } else {
    // Update score for an incorrect match
    updateScore(-5); // Subtract points for an incorrect guess

    // Flip cards back if not matched
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
    }, 1000);
  }
  selectedCards = [];
  gameBoard.classList.remove('no-clicks'); // Re-enable clicks
}

// Reset the game
function resetGame() {
  matchedCards = 0;
  score = 0; // Reset score to 0
  elapsedTime = 0; // Reset elapsed time
  scoreDisplay.textContent = `Score: ${score}`; // Update score display
  timerDisplay.textContent = `Time: 00:00`; // Reset timer display
  clearInterval(timerInterval); // Clear any existing timer
  shuffledCards = shuffle(cardValues); // Reshuffle cards
  createBoard();
  startTimer(); // Start the timer when the game resets
  winMessage.classList.add('hidden'); // Hide win message
}

// Function to add a leaderboard entry
function addLeaderboardEntry(score, timePlayed) {
  const newEntry = {
    id: idCounter++,
    score: score,
    timePlayed: formatTime(timePlayed)
  };

  leaderboard.push(newEntry);
  updateLeaderboardDisplay(); // Update the display
}

// Function to update the leaderboard display
function updateLeaderboardDisplay() {
  leaderboardBody.innerHTML = ''; // Clear existing entries

  // Sort leaderboard by score (highest to lowest)
  leaderboard.sort((a, b) => b.score - a.score);

  // Add entries to the leaderboard table
  leaderboard.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.id}</td>
      <td>${entry.score}</td>
      <td>${entry.timePlayed}</td>
    `;
    leaderboardBody.appendChild(row);
  });
}

// Call this function at the end of the game to add the entry to the leaderboard
function onGameEnd(score, elapsedTime) {
  addLeaderboardEntry(score, elapsedTime); // Add entry to leaderboard
}

// Helper function to format time
function formatTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${secs}`;
}

// Event listeners for reset and play again buttons
resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

// Initialize the game
createBoard();
startTimer(); // Start the timer when the game initializes
