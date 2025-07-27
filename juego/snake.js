const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreSpan = document.getElementById('score');
const livesSpan = document.getElementById('lives');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const resetButton = document.getElementById('resetButton');

// --- Controles para móvil ---
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

const gridSize = 20;
let snake, food, direction, nextDirection, score, lives, gameOver, gameInterval;

/**
 * Configura o reinicia el estado del juego.
 */
function setupGame() {
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    nextDirection = 'right'; // Dirección para el siguiente fotograma

    if (lives === 0 || lives === undefined) {
        score = 0;
        lives = 3;
    }
    
    gameOver = false;
    scoreSpan.textContent = score;
    livesSpan.textContent = lives;
    popup.classList.remove('show');
    
    generateFood();
    gameLoop();
}

/**
 * Inicia o reinicia el bucle principal del juego.
 */
function gameLoop() {
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(update, 180);
}

/**
 * Dibuja todos los elementos en el canvas.
 */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#2ecc71' : '#27ae60';
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }
    
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

/**
 * Maneja la lógica de colisión.
 */
function handleCrash() {
    lives--;
    livesSpan.textContent = lives;
    clearInterval(gameInterval);

    if (lives === 0) {
        gameOver = true;
        popupMessage.textContent = '¡Juego Terminado! Puntuación Final: ' + score;
        popup.classList.add('show');
    } else {
        popupMessage.textContent = `¡Has chocado! Te quedan ${lives} vidas.`;
        popup.classList.add('show');
    }
}

/**
 * Actualiza el estado del juego.
 */
function update() {
    if (gameOver) return;

    direction = nextDirection; // Actualiza la dirección al inicio del tick
    const head = { x: snake[0].x, y: snake[0].y };

    if (direction === 'up') head.y--;
    if (direction === 'down') head.y++;
    if (direction === 'left') head.x--;
    if (direction === 'right') head.x++;

    if (
        head.x < 0 || 
        head.x * gridSize >= canvas.width || 
        head.y < 0 || 
        head.y * gridSize >= canvas.height || 
        snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
    ) {
        handleCrash();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreSpan.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

    draw();
}

/**
 * Genera una nueva posición para la comida.
 */
function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        generateFood();
    }
}

/**
 * Cambia la dirección de la serpiente, evitando que se mueva hacia atrás.
 * @param {string} newDirection - La nueva dirección ('up', 'down', 'left', 'right').
 */
function changeDirection(newDirection) {
    if (newDirection === 'up' && direction !== 'down') nextDirection = 'up';
    if (newDirection === 'down' && direction !== 'up') nextDirection = 'down';
    if (newDirection === 'left' && direction !== 'right') nextDirection = 'left';
    if (newDirection === 'right' && direction !== 'left') nextDirection = 'right';
}

// --- Event Listeners para Controles ---

document.addEventListener('keydown', e => {
    const keyMap = {
        'ArrowUp': 'up', 'w': 'up',
        'ArrowDown': 'down', 's': 'down',
        'ArrowLeft': 'left', 'a': 'left',
        'ArrowRight': 'right', 'd': 'right'
    };
    if (keyMap[e.key]) {
        changeDirection(keyMap[e.key]);
    }
});

if (upBtn) {
    upBtn.addEventListener('click', () => changeDirection('up'));
    downBtn.addEventListener('click', () => changeDirection('down'));
    leftBtn.addEventListener('click', () => changeDirection('left'));
    rightBtn.addEventListener('click', () => changeDirection('right'));
}

resetButton.addEventListener('click', setupGame);

// --- Inicio del Juego ---
setupGame();