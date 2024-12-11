const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player1Score = document.getElementById("player1Score");
const player2Score = document.getElementById("player2Score");
const player3Score = document.getElementById("player3Score");
const player4Score = document.getElementById("player4Score");

const levelIndicator = document.getElementById("level");

const TILE_SIZE = 50;
const PLAYER_SIZE = 20;
const EXIT_RADIUS = 30;

let gameStarted = false;
let countdown = 6;
let players = [];
let walls = [];
let exit = { x: 750, y: 550 };
let timer = 0;
let scores = [0, 0, 0, 0];

let levelsData = [];
let currentLevel = 1;

// Audio elements
const backgroundMusic = new Audio("assets/sounds/background-music.mp3");
const exitReachedSound = new Audio("assets/sounds/exit-reached.mp3");
const newLevelSound = new Audio("assets/sounds/new-level.mp3");

backgroundMusic.loop = true;

function playBackgroundMusic() {
    backgroundMusic.play().catch((error) => {
        console.error("Failed to play background music:", error);
    });
}

// Wait for user interaction before playing the music
document.addEventListener("click", function handleInteraction() {
    playBackgroundMusic();
    document.removeEventListener("click", handleInteraction);
});

document.querySelectorAll(".playerSelectButton").forEach((button) => {
    button.addEventListener("click", () => {
        const numberOfPlayers = parseInt(button.dataset.players);
        startGame(numberOfPlayers);
    });
});

function startGame(numberOfPlayers) {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    for (let i = 3; i <= 4; i++) {
        document.getElementById(`player${i}Score`).style.display =
            i <= numberOfPlayers ? "block" : "none";
    }

    createPlayers(numberOfPlayers);
    createWalls();
    handleInput();
    gameLoop();
}

// Create players
function createPlayers(numberOfPlayers) {
    const playerA = new Player(10, 10, "red", {
        up: "w",
        down: "s",
        left: "a",
        right: "d",
    });

    const playerB = new Player(40, 10, "blue", {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight",
    });

    const playerC = new Player(10, 40, "green", {
        up: "i",
        down: "k",
        left: "j",
        right: "l",
    });

    const playerD = new Player(40, 40, "yellow", {
        up: "8",
        down: "5",
        left: "4",
        right: "6",
    });

    players = [playerA, playerB, playerC, playerD].slice(0, numberOfPlayers);
}

// Draw the exit
function drawExit() {
    ctx.fillStyle = "lightblue";
    ctx.beginPath();
    ctx.arc(exit.x, exit.y, EXIT_RADIUS, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
}

// Update game state
function update() {
    if (!gameStarted) return;

    players.forEach((player) => player.move());

    if (players.every((player) => player.reachedExit)) {
        // All players have reached the exit, go to next level
        nextLevel();
    }
}

// Draw the game elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    players.forEach((player) => player.draw());
    walls.forEach((wall) => wall.draw());
    drawExit();

    if (!gameStarted && countdown > 0) {
        ctx.font = "48px 'Poppins', sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);
    }

    // Display scores
    players.forEach((player, index) => {
        const scoreElement = document.getElementById(`player${index + 1}Score`);
        scoreElement.textContent = `Player ${index + 1}: ${scores[index] + 1}`;
    });
}

function nextLevel() {
    if (currentLevel > 0) {
        newLevelSound.play();
    }

    currentLevel++;
    levelIndicator.textContent = `Level ${currentLevel}`;

    resetLevel();
    createWalls();
    resetPlayers();
}

// Reset players for the new level
function resetPlayers() {
    players.forEach((player) => {
        player.x = 10;
        player.y = 10;
        player.reachedExit = false;
    });
}

// Reset level conditions
function resetLevel() {
    exit = { x: 750, y: 550 };
    countdown = 5;
    gameStarted = false;
    timer = 0;
}

async function loadLevels() {
    // Be aware for CORS policy
    const response = await fetch("assets/levels.json").then((res) =>
        res.json()
    );
    levelsData = response.levels;
    createWalls();
}

function createWalls() {
    walls = [];
    // Get the walls for the current level
    const levelData = levelsData.find((level) => level.level === currentLevel);

    // Create walls based on the level data
    if (levelData) {
        levelData.walls.forEach((wallData) => {
            walls.push(
                new Wall(
                    wallData.x,
                    wallData.y,
                    wallData.width,
                    wallData.height
                )
            );
        });
    }
}

// Game loop
function gameLoop() {
    update();
    draw();

    if (!gameStarted && countdown > 0) {
        if (timer % 60 === 0) {
            countdown--;
        }
    }

    if (countdown === 0) {
        gameStarted = true;
        //startClock();
    }

    timer++;
    requestAnimationFrame(gameLoop);
}

function startClock() {
    setInterval(() => {
        timer++;
        tickClock();
    }, 1000);
}

function tickClock() {
    const minutes = Math.floor(timer / 3600);
    const seconds = Math.floor(timer / 60) % 60;
    clock.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Initialize game
function init() {
    createPlayers();
    createWalls();
    handleInput();
    gameLoop();
}

window.addEventListener("load", () => {
    loadLevels();
});
