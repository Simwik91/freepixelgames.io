const board = document.getElementById('game-board');
const context = board.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-button');
const retryButton = document.getElementById('retry-button');

const gridSize = 20;
let snake;
let food;
let direction;
let score;
let gameOver;
let gameInterval;

function initGame() {
    snake = [{ x: 10, y: 10 }];
    food = {};
    direction = 'right';
    score = 0;
    gameOver = false;
    scoreElement.textContent = score;
    generateFood();
    draw();
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (board.width / gridSize)),
        y: Math.floor(Math.random() * (board.height / gridSize))
    };
}

function draw() {
    context.clearRect(0, 0, board.width, board.height);

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = i === 0 ? 'green' : 'lime';
        context.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }

    context.fillStyle = 'red';
    context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function update() {
    if (gameOver) {
        clearInterval(gameInterval);
        retryButton.style.display = 'block';
        return;
    }

    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }

    if (
        head.x < 0 || head.x >= board.width / gridSize ||
        head.y < 0 || head.y >= board.height / gridSize ||
        checkCollision(head)
    ) {
        gameOver = true;
    } else {
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreElement.textContent = score;
            generateFood();
        } else {
            snake.pop();
        }
    }

    draw();
}

function checkCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function startGame() {
    initGame();
    startButton.style.display = 'none';
    retryButton.style.display = 'none';
    gameInterval = setInterval(update, 100);
}

document.addEventListener('keydown', e => {
    if (gameOver) return;
    switch (e.key) {
        case 'ArrowUp': if (direction !== 'down') direction = 'up'; break;
        case 'ArrowDown': if (direction !== 'up') direction = 'down'; break;
        case 'ArrowLeft': if (direction !== 'right') direction = 'left'; break;
        case 'ArrowRight': if (direction !== 'left') direction = 'right'; break;
    }
});

startButton.addEventListener('click', startGame);
retryButton.addEventListener('click', startGame);

// Initial drawing of the board before the game starts
initGame();

