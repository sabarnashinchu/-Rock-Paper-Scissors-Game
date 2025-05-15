const choices = document.querySelectorAll('.choice');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const resultText = document.getElementById('result-text');
const historyList = document.getElementById('history-list');
const resetButton = document.getElementById('reset-game');

let playerScore = 0;
let computerScore = 0;

// Game choices
const gameChoices = ['rock', 'paper', 'scissors'];

// Win conditions
const winConditions = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
};

// Get computer choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return gameChoices[randomIndex];
}

// Determine winner
function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    return winConditions[playerChoice] === computerChoice ? 'player' : 'computer';
}

// Update score
function updateScore(winner) {
    if (winner === 'player') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
    } else if (winner === 'computer') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
}

// Update result text
function updateResultText(playerChoice, computerChoice, winner) {
    const results = {
        player: 'You win! 🎉',
        computer: 'Computer wins! 😢',
        draw: "It's a draw! 🤝"
    };
    
    resultText.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${results[winner]}`;
}

// Add to history
function addToHistory(playerChoice, computerChoice, winner) {
    const historyItem = document.createElement('li');
    const result = winner === 'draw' ? 'Draw' : `${winner === 'player' ? 'You' : 'Computer'} won`;
    historyItem.textContent = `You: ${playerChoice} vs Computer: ${computerChoice} - ${result}`;
    historyList.prepend(historyItem);
    
    // Keep only last 5 entries
    if (historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}

// Handle player choice
function handleChoice(event) {
    const playerChoice = event.currentTarget.dataset.choice;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    
    updateScore(winner);
    updateResultText(playerChoice, computerChoice, winner);
    addToHistory(playerChoice, computerChoice, winner);
    
    // Animate the result text
    resultText.style.animation = 'none';
    resultText.offsetHeight; // Trigger reflow
    resultText.style.animation = null;
}

// Reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    resultText.textContent = 'Choose your move!';
    historyList.innerHTML = '';
}

// Add event listeners
choices.forEach(choice => {
    choice.addEventListener('click', handleChoice);
});

resetButton.addEventListener('click', resetGame); 