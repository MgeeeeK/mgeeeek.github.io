class GameSelector {
  constructor() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.querySelectorAll(".game-card button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const gameType = e.target.parentElement.dataset.game;
        this.startGame(gameType);
      });
    });

    document.querySelectorAll(".back-button").forEach((button) => {
      button.addEventListener("click", () => {
        this.showGameSelector();
      });
    });
  }

  startGame(gameType) {
    document.getElementById("gameSelector").classList.remove("active");

    if (gameType === "snake") {
        document.getElementById("snakeContainer").style.display = "block";
        document.getElementById("dinoContainer").style.display = "none";
        document.getElementById("snakeMainMenu").classList.add("active");
        new SnakeGame();
    } else if (gameType === "dino") {
        document.getElementById("snakeContainer").style.display = "none";
        document.getElementById("dinoContainer").style.display = "block";
        document.getElementById("dinoMainMenu").classList.add("active");
        new DinoGame();
    }
}

  showGameSelector() {
    document.getElementById("gameSelector").classList.add("active");
    document.getElementById("snakeContainer").style.display = "none";
    document.getElementById("dinoContainer").style.display = "none";
  }
}

window.onload = () => {
  new GameSelector();
};