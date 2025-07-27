const boardElement = document.getElementById('board');
const statusText = document.getElementById('status');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const resetButton = document.getElementById('resetButton');

let currentPlayer, board, gameActive;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function startGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    statusText.textContent = `Turno del Jugador ${currentPlayer}`;
    boardElement.innerHTML = ''; // Limpia el tablero
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
    popup.classList.remove('show');
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    checkResult();
}

function checkResult() {
    let roundWon = false;
    let winningCombination = [];
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const a = board[condition[0]], b = board[condition[1]], c = board[condition[2]];
        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            winningCombination = condition;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        winningCombination.forEach(index => {
            boardElement.children[index].classList.add('winner');
        });
        setTimeout(() => { // Espera un poco para mostrar la animación
            popupMessage.textContent = `¡El Jugador ${currentPlayer} ha ganado!`;
            popup.classList.add('show');
        }, 500);
        return;
    }

    if (!board.includes('')) {
        gameActive = false;
        popupMessage.textContent = '¡Es un empate!';
        popup.classList.add('show');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Turno del Jugador ${currentPlayer}`;
}

resetButton.addEventListener('click', startGame);
startGame();