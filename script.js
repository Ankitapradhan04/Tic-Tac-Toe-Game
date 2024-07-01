const cells = document.querySelectorAll('.cell');
const playerDisplay = document.querySelector('.player');
const resetButton = document.getElementById('reset');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game');
const confetti = document.getElementById('confetti');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showResultScreen(`Player ${currentPlayer} Wins!`);
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        showResultScreen('Draw!');
        gameActive = false;
        return;
    }
}

function showResultScreen(message) {
    resultMessage.textContent = message;
    resultScreen.style.display = 'flex';
    document.querySelector('.container').style.display = 'none';
    if (message.includes('Wins')) {
        document.body.style.backgroundColor = '#4CAF50'; // Green for win
        launchConfetti();
    } else {
        document.body.style.backgroundColor = '#FF9800'; // Orange for draw
    }
}

function launchConfetti() {
    confetti.style.display = 'block';
    for (let i = 0; i < 100; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');
        confettiPiece.style.left = Math.random() * 100 + 'vw';
        confettiPiece.style.animationDelay = Math.random() * 2 + 's';
        confetti.appendChild(confettiPiece);
    }
    setTimeout(() => {
        confetti.style.display = 'none';
        confetti.innerHTML = '';
    }, 3000);
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    playerDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.textContent = '');
    resultScreen.style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    document.body.style.background = 'linear-gradient(135deg, #ff7e5f, #feb47b)';
    confetti.innerHTML = ''; // Clear any remaining confetti pieces
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);

// Initially show the game board
document.querySelector('.container').style.display = 'block';
