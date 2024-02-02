// Get the canvas element and its context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Paddle dimensions and initial positions
const paddleWidth = 10;
const paddleHeight = 60;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

// Paddle speeds
const paddleSpeed = 10;

// Ball dimensions and initial position
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Scores
let player1Score = 0;
let player2Score = 0;

// Game over condition
const maxScore = 5;
let gameOver = false;

// Draw a rectangle on the canvas
function drawRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// Draw the ball on the canvas
function drawBall(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
}

// Draw the scores on the canvas
function drawScores() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Player 1: ' + player1Score, 20, 30);
  ctx.fillText('Player 2: ' + player2Score, canvas.width - 140, 30);
}

// Draw the game over message
function drawGameOver() {
  ctx.fillStyle = 'white';
  ctx.font = '40px Arial';
  ctx.fillText('Game Over You Won', canvas.width / 2 - 120, canvas.height / 2);
  ctx.font = '20px Arial';
  ctx.fillText('Press F5 to restart', canvas.width / 2 - 100, canvas.height / 2 + 30);
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Update the game state
function update() {
  if (gameOver) return;

  // Update ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check for collisions with top and bottom walls
  if (ballY - ballSize / 2 < 0 || ballY + ballSize / 2 > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Check for collisions with paddles
  if (
    (ballX - ballSize / 2 < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
    (ballX + ballSize / 2 > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Check for scoring
  if (ballX - ballSize / 2 < 0) {
    // Player 2 scores
    player2Score++;
    resetGame();
  } else if (ballX + ballSize / 2 > canvas.width) {
    // Player 1 scores
    player1Score++;
    resetGame();
  }

  // Check for game over condition
  if (player1Score === maxScore || player2Score === maxScore) {
    gameOver = true;
  }
}

// Reset the game
function resetGame() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX; // Reverse the ball direction
  leftPaddleY = canvas.height / 2 - paddleHeight / 2;
  rightPaddleY = canvas.height / 2 - paddleHeight / 2;
}

// Draw everything on the canvas
function draw() {
  clearCanvas();

  // Draw paddles
  drawRect(0, leftPaddleY, paddleWidth, paddleHeight, 'blue');
  drawRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight, 'red');

  // Draw the ball
  drawBall(ballX, ballY, ballSize, 'white');

  // Draw scores
  drawScores();

  // Draw game over message
  if (gameOver) {
    drawGameOver();
  }
}

// Handle keyboard input
window.addEventListener('keydown', function (e) {
  if (gameOver) return;

  // Player 1 controls
  if (e.key === 'ArrowUp' && leftPaddleY > 0) {
    leftPaddleY -= paddleSpeed;
  }
  if (e.key === 'ArrowDown' && leftPaddleY < canvas.height - paddleHeight) {
    leftPaddleY += paddleSpeed;
  }

  // Player 2 controls
  if (e.key === 'w' && rightPaddleY > 0) {
    rightPaddleY -= paddleSpeed;
  }
  if (e.key === 's' && rightPaddleY < canvas.height - paddleHeight) {
    rightPaddleY += paddleSpeed;
  }
});

// Main game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();