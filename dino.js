class DinoGame {
  constructor() {
    this.canvas = document.getElementById("dinoCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.score = 0;
    this.highScore = localStorage.getItem("dinoHighScore") || 0;
    this.gameTime = 0;
    this.dinoImage = new Image();
    this.dinoImage.src = "assets/profile.jpg";
    this.obstacles = [];
    this.clouds = [];
    this.birds = [];
    this.setupGame();
    this.setupEventListeners();
  }

  setupGame() {
    this.resizeCanvas();
    this.resetGame();
  }

  resizeCanvas() {
    const containerWidth = this.canvas.parentElement.offsetWidth;
    this.canvas.width = containerWidth;
    this.canvas.height = 300;
    this.ground = this.canvas.height - 60;
  }

  resetGame() {
    this.dino = {
      x: 50,
      y: this.ground,
      width: 60,
      height: 60,
      velocity: 0,
      jumping: false,
      ducking: false,
    };

    this.gameSpeed = 6;
    this.gravity = 0.8;
    this.jumpForce = -15;
    this.score = 0;
    this.gameTime = 0;
    this.obstacles = [];
    this.clouds = [];
    this.birds = [];
    this.gameOver = false;
    this.lastObstacleSpawn = 0;
    this.obstacleSpawnRate = 1500;
  }

  jump() {
    if (!this.dino.jumping) {
      this.dino.jumping = true;
      this.dino.velocity = this.jumpForce;
    }
  }

  duck(isDucking) {
    this.dino.ducking = isDucking;
    if (isDucking) {
      this.dino.height = 30;
      this.dino.y = this.ground + 30;
    } else {
      this.dino.height = 60;
      this.dino.y = this.ground;
    }
  }

  update(currentTime) {
    if (this.gameOver) return;

    const deltaTime = currentTime - (this.lastUpdate || currentTime);
    this.lastUpdate = currentTime;

    this.gameTime += deltaTime;
    this.gameSpeed += deltaTime * 0.0001;

    // Update dino
    if (this.dino.jumping) {
      this.dino.velocity += this.gravity;
      this.dino.y += this.dino.velocity;

      if (this.dino.y >= this.ground) {
        this.dino.y = this.ground;
        this.dino.jumping = false;
        this.dino.velocity = 0;
      }
    }

    // Spawn obstacles
    if (currentTime - this.lastObstacleSpawn > this.obstacleSpawnRate) {
      this.spawnObstacle();
      this.lastObstacleSpawn = currentTime;
      this.obstacleSpawnRate = Math.max(1000, 1500 - this.gameTime / 20);
    }

    // Update obstacles
    this.obstacles = this.obstacles.filter((obstacle) => {
      obstacle.x -= this.gameSpeed;
      return obstacle.x > -obstacle.width;
    });

    // Check collisions
    this.checkCollisions();

    // Update score
    this.score = Math.floor(this.gameTime / 100);

    this.draw();
    requestAnimationFrame(this.update.bind(this));
  }

  spawnObstacle() {
    const types = ["cactus", "bird"];
    const type = types[Math.floor(Math.random() * types.length)];

    if (type === "cactus") {
      this.obstacles.push({
        x: this.canvas.width,
        y: this.ground,
        width: 30,
        height: 60,
        type: "cactus",
      });
    } else {
      const birdHeight = Math.random() * 120 + 60;
      this.obstacles.push({
        x: this.canvas.width,
        y: birdHeight,
        width: 40,
        height: 40,
        type: "bird",
      });
    }
  }

  checkCollisions() {
    for (const obstacle of this.obstacles) {
      if (this.isColliding(this.dino, obstacle)) {
        this.gameOver = true;
        if (this.score > this.highScore) {
          this.highScore = this.score;
          localStorage.setItem("dinoHighScore", this.highScore);
        }
        document.getElementById("dinoGameOverMenu").classList.add("active");
        break;
      }
    }
  }

  isColliding(dino, obstacle) {
    return !(
      dino.x + dino.width < obstacle.x ||
      dino.x > obstacle.x + obstacle.width ||
      dino.y + dino.height < obstacle.y ||
      dino.y > obstacle.y + obstacle.height
    );
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = "#f7f7f7";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw ground
    this.ctx.fillStyle = "#666666";
    this.ctx.fillRect(0, this.ground + 60, this.canvas.width, 2);

    // Draw dino
    if (this.dinoImage) {
      this.ctx.drawImage(
        this.dinoImage,
        this.dino.x,
        this.dino.y,
        this.dino.width,
        this.dino.height
      );
    } else {
      this.ctx.fillStyle = "#333";
      this.ctx.fillRect(
        this.dino.x,
        this.dino.y,
        this.dino.width,
        this.dino.height
      );
    }

    // Draw obstacles
    this.obstacles.forEach((obstacle) => {
      this.ctx.fillStyle = obstacle.type === "cactus" ? "#2d5a27" : "#666";
      this.ctx.fillRect(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height
      );
    });

    // Update score display
    document.getElementById("dinoScore").textContent = this.score;
    document.getElementById("dinoFinalScore").textContent = this.score;
    document.getElementById("dinoHighScore").textContent = this.highScore;
  }

  setupEventListeners() {
    // Keyboard controls
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        this.jump();
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        this.duck(true);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.code === "ArrowDown") {
        this.duck(false);
      }
    });

    // Mobile controls
    document
      .getElementById("jumpButton")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.jump();
      });

    document
      .getElementById("duckButton")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.duck(true);
      });

    document.getElementById("duckButton").addEventListener("touchend", () => {
      this.duck(false);
    });

    // Window resize
    window.addEventListener("resize", () => this.resizeCanvas());

    // Menu buttons
    document.getElementById("startDino").addEventListener("click", () => {
      document.getElementById("dinoMainMenu").classList.remove("active");
      this.resetGame();
      requestAnimationFrame(this.update.bind(this));
    });

    document.getElementById("restartDino").addEventListener("click", () => {
      document.getElementById("dinoGameOverMenu").classList.remove("active");
      this.resetGame();
      requestAnimationFrame(this.update.bind(this));
    });
  }
}
