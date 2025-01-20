const cardValues = [...Array(18).keys(), ...Array(18).keys()]; // Create pairs of cards
let shuffledCards = shuffle(cardValues);
let selectedCards = [];
let matchedCards = 0;
let score = 0; // Initialize score
let timerInterval; // Variable to hold the timer interval
let elapsedTime = 0; // Variable to hold elapsed time in seconds

const gameBoard = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const scoreDisplay = document.getElementById('score-display'); // Get score display element
const timerDisplay = document.getElementById('timer-display'); // Get timer display element
const modal = document.getElementById('modal'); // Modal for win message
const finalScoreDisplay = document.getElementById('final-score'); // Final score in modal

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

        updateScore(10); // Increase score by 10

        // Check if all cards are matched
        if (matchedCards === shuffledCards.length) {
            stopTimer();
            setTimeout(() => {
                document.getElementById('final-score').textContent = score; // Set final score
                document.getElementById('win-message').classList.remove('hidden'); // Show win modal
            }, 500);
        }
    } else {
        // Deduct 5 points, but prevent negative score
        score = Math.max(score - 5, 0);
        scoreDisplay.textContent = `Score: ${score}`;

        // Flip cards back
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1000);
    }

    selectedCards = [];
    gameBoard.classList.remove('no-clicks'); // Enable clicking again
}



// Reset the game
function resetGame() {
    matchedCards = 0;
    score = 0;
    elapsedTime = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: 00:00`;
    clearInterval(timerInterval);
    shuffledCards = shuffle(cardValues);
    createBoard();
    startTimer();
    document.getElementById('win-message').classList.add('hidden'); // Hide modal
}

// Event listener for "Play Again" button
document.getElementById('play-again-btn').addEventListener('click', resetGame);


// Event listeners for reset and play again buttons
resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

// Initialize the game
createBoard();
startTimer(); // Start the timer when the game initializes
