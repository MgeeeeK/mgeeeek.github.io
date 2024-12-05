class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.gameTime = 0;
        this.snakeHeadImage = null;
        this.setupGame();
        this.setupEventListeners();
    }

    setupGame() {
        this.gridSize = 20;
        this.tileCount = 20;
        this.resizeCanvas();
        this.resetGame();
    }

    resizeCanvas() {
        const containerWidth = this.canvas.parentElement.offsetWidth;
        const size = Math.min(containerWidth, window.innerHeight - 200);
        this.canvas.width = size;
        this.canvas.height = size;
        this.tileSize = size / this.tileCount;
    }

    resetGame() {
        this.snake = [{x: 10, y: 10}];
        this.velocity = {x: 0, y: 0};
        this.food = this.generateFood();
        this.score = 0;
        this.gameTime = 0;
        this.speed = 150;
        this.lastRenderTime = 0;
        this.gameOver = false;
    }

    generateFood() {
        const position = {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
        
        // Ensure food doesn't spawn on snake
        while (this.snake.some(segment => segment.x === position.x && segment.y === position.y)) {
            position.x = Math.floor(Math.random() * this.tileCount);
            position.y = Math.floor(Math.random() * this.tileCount);
        }
        
        return position;
    }

    update(currentTime) {
        if (this.gameOver) return;

        const deltaTime = currentTime - this.lastRenderTime;
        if (deltaTime < this.speed) {
            requestAnimationFrame(this.update.bind(this));
            return;
        }

        this.lastRenderTime = currentTime;
        this.gameTime += deltaTime;

        this.moveSnake();
        this.checkCollision();
        this.draw();
        this.updateScore();
        this.updateTimer();

        requestAnimationFrame(this.update.bind(this));
    }

    moveSnake() {
        const newHead = {
            x: this.snake[0].x + this.velocity.x,
            y: this.snake[0].y + this.velocity.y
        };

        this.snake.unshift(newHead);

        if (newHead.x === this.food.x && newHead.y === this.food.y) {
            this.food = this.generateFood();
            this.score += 10;
            this.speed = Math.max(50, this.speed - 2);
        } else {
            this.snake.pop();
        }
    }

    checkCollision() {
        const head = this.snake[0];

        // Wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver = true;
        }

        // Self collision
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                this.gameOver = true;
            }
        }

        if (this.gameOver) {
            if (this.score > this.highScore) {
                this.highScore = this.score;
                localStorage.setItem('snakeHighScore', this.highScore);
            }
            document.getElementById('gameOverMenu').classList.add('active');
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.snake.forEach((segment, index) => {
            if (index === 0 && this.snakeHeadImage) {
                this.ctx.save();
                this.ctx.translate(
                    segment.x * this.tileSize + this.tileSize / 2,
                    segment.y * this.tileSize + this.tileSize / 2
                );
                
                // Rotate head based on direction
                let angle = 0;
                if (this.velocity.x === 1) angle = 0;
                if (this.velocity.x === -1) angle = Math.PI;
                if (this.velocity.y === -1) angle = -Math.PI/2;
                if (this.velocity.y === 1) angle = Math.PI/2;
                
                this.ctx.rotate(angle);
                this.ctx.drawImage(
                    this.snakeHeadImage,
                    -this.tileSize/2,
                    -this.tileSize/2,
                    this.tileSize,
                    this.tileSize
                );
                this.ctx.restore();
            } else {
                this.ctx.fillStyle = index === 0 ? '#4CAF50' : '#45a049';
                this.ctx.fillRect(
                    segment.x * this.tileSize,
                    segment.y * this.tileSize,
                    this.tileSize - 2,
                    this.tileSize - 2
                );
            }
        });

        // Draw food
        this.ctx.fillStyle = '#ff0000';
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.tileSize + this.tileSize/2,
            this.food.y * this.tileSize + this.tileSize/2,
            this.tileSize/2 - 2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('highScore').textContent = this.highScore;
    }

    updateTimer() {
        const seconds = Math.floor(this.gameTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        document.getElementById('time').textContent = 
            `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                    if (this.velocity.y !== 1) {
                        this.velocity = {x: 0, y: -1};
                    }
                    break;
                case 'ArrowDown':
                    if (this.velocity.y !== -1) {
                        this.velocity = {x: 0, y: 1};
                    }
                    break;
                case 'ArrowLeft':
                    if (this.velocity.x !== 1) {
                        this.velocity = {x: -1, y: 0};
                    }
                    break;
                case 'ArrowRight':
                    if (this.velocity.x !== -1) {
                        this.velocity = {x: 1, y: 0};
                    }
                    break;
            }
        });

        // Mobile controls
        ['up', 'down', 'left', 'right'].forEach(direction => {
            document.getElementById(`${direction}Button`).addEventListener('touchstart', (e) => {
                e.preventDefault();
                switch(direction) {
                    case 'up':
                        if (this.velocity.y !== 1) this.velocity = {x: 0, y: -1};
                        break;
                    case 'down':
                        if (this.velocity.y !== -1) this.velocity = {x: 0, y: 1};
                        break;
                    case 'left':
                        if (this.velocity.x !== 1) this.velocity = {x: -1, y: 0};
                        break;
                    case 'right':
                        if (this.velocity.x !== -1) this.velocity = {x: 1, y: 0};
                        break;
                }
            });
        });

        // Window resize
        window.addEventListener('resize', () => this.resizeCanvas());

        // Custom snake head upload
        document.getElementById('snakeHeadUpload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        this.snakeHeadImage = img;
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Menu buttons
        document.getElementById('startGame').addEventListener('click', () => {
            document.getElementById('mainMenu').classList.remove('active');
            this.resetGame();
            requestAnimationFrame(this.update.bind(this));
        });

        document.getElementById('restartGame').addEventListener('click', () => {
            document.getElementById('gameOverMenu').classList.remove('active');
            this.resetGame();
            requestAnimationFrame(this.update.bind(this));
        });

        document.getElementById('mainMenuButton').addEventListener('click', () => {
            document.getElementById('gameOverMenu').classList.remove('active');
            document.getElementById('mainMenu').classList.add('active');
        });
    }
}

// Start the game
window.onload = () => {
    new SnakeGame();
};