const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

// Adjust canvas size based on viewport
function resizeCanvas() {
  if (window.innerWidth < 600) {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerWidth * 0.9;
  } else {
    canvas.width = 500;
    canvas.height = 500;
  }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Game variables
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let velocityX = 0;
let velocityY = 0;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let tailLength = 1;
let gameInterval;
let headImage = null;

// Load custom head image if uploaded
const headImageInput = document.getElementById("headImageInput");
headImageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    headImage = new Image();
    headImage.src = URL.createObjectURL(file);
  }
});

// Game loop
function gameLoop() {
  update();
  draw();
}

function startGame() {
  gameInterval = setInterval(gameLoop, 1000 / 15); // 15 FPS
}

function update() {
  // Move snake
  const head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };
  snake.unshift(head);

  // Wrap snake position on edge
  if (head.x < 0) head.x = tileCount - 1;
  if (head.x >= tileCount) head.x = 0;
  if (head.y < 0) head.y = tileCount - 1;
  if (head.y >= tileCount) head.y = 0;

  // Check collision with self
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      resetGame();
      return;
    }
  }

  // Check collision with food
  if (head.x === food.x && head.y === food.y) {
    tailLength++;
    placeFood();
  }

  // Trim snake tail
  while (snake.length > tailLength) {
    snake.pop();
  }
}

function draw() {
  // Clear canvas
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    const segment = snake[i];
    if (i === 0 && headImage) {
      // Draw head with custom image
      ctx.drawImage(
        headImage,
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize,
        gridSize
      );
    } else {
      ctx.fillStyle = "lime";
      ctx.fillRect(
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize - 2,
        gridSize - 2
      );
    }
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(
    food.x * gridSize,
    food.y * gridSize,
    gridSize - 2,
    gridSize - 2
  );
}

function placeFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
}

function resetGame() {
  clearInterval(gameInterval);
  alert("Game Over!");
  // Reset variables
  velocityX = 0;
  velocityY = 0;
  snake = [{ x: 10, y: 10 }];
  tailLength = 1;
  placeFood();
  startGame();
}

// Handle keyboard input
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowLeft":
      if (velocityX === 1) break;
      velocityX = -1;
      velocityY = 0;
      break;
    case "ArrowUp":
      if (velocityY === 1) break;
      velocityX = 0;
      velocityY = -1;
      break;
    case "ArrowRight":
      if (velocityX === -1) break;
      velocityX = 1;
      velocityY = 0;
      break;
    case "ArrowDown":
      if (velocityY === -1) break;
      velocityX = 0;
      velocityY = 1;
      break;
  }
});

// Handle touch input
let touchStartX = null;
let touchStartY = null;

canvas.addEventListener("touchstart", function (e) {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

canvas.addEventListener("touchmove", function (e) {
  if (!touchStartX || !touchStartY) return;

  const touch = e.touches[0];
  const touchEndX = touch.clientX;
  const touchEndY = touch.clientY;

  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Horizontal swipe
    if (diffX > 0 && velocityX !== -1) {
      // Swipe right
      velocityX = 1;
      velocityY = 0;
    } else if (diffX < 0 && velocityX !== 1) {
      // Swipe left
      velocityX = -1;
      velocityY = 0;
    }
  } else {
    // Vertical swipe
    if (diffY > 0 && velocityY !== -1) {
      // Swipe down
      velocityX = 0;
      velocityY = 1;
    } else if (diffY < 0 && velocityY !== 1) {
      // Swipe up
      velocityX = 0;
      velocityY = -1;
    }
  }

  touchStartX = null;
  touchStartY = null;
});

// Start the game
placeFood();
startGame();
