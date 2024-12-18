const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player1Score = document.getElementById("player1Score");
const player2Score = document.getElementById("player2Score");
const player3Score = document.getElementById("player3Score");
const player4Score = document.getElementById("player4Score");

const levelIndicator = document.getElementById("level");
const clock = document.getElementById("clock");
const gameSpeedInput = document.getElementById("gameSpeed");

const TILE_SIZE = 50;
const PLAYER_SIZE = 20;
const EXIT_RADIUS = 30;
const PLAYER_A_COLOR = "#E71F24";
const PLAYER_B_COLOR = "#0186FE";
const PLAYER_C_COLOR = "#6A9E84";
const PLAYER_D_COLOR = "#FEBB00";
const EXIT_COLOR = "#D9EAFF";

let gameStarted = false;
let countdown = 6;
let players = [];
let walls = [];
let maluses = [];
let bonuses = [];
let exit = { x: 750, y: 550 };
let exit_secondary = { x: 750, y: 50 };
let scores = [0, 0, 0, 0];
let malusSpeedRange = [0, 0];
let malusDuration = 0;
let bonusDuration = 0;

let levelsData = [];
let currentLevel = 1;

let clockStarted = false;
let timer = 0;
let lastTime = 0;
let deltaTime = 0;

// Audio elements
const backgroundMusic = new Audio("assets/sounds/background-music.mp3");
const exitReachedSound = new Audio("assets/sounds/exit-reached.mp3");
const newLevelSound = new Audio("assets/sounds/new-level.mp3");
const clockTickSound = new Audio("assets/sounds/clock-tick.mp3");
const successSound = new Audio("assets/sounds/success.mp3");
const malusSound = new Audio("assets/sounds/malus.mp3");
const bonusSound = new Audio("assets/sounds/bonus.mp3");

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

// Start game
function startGame(numberOfPlayers) {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    document.getElementById("footer").style.display = "none";

    for (let i = 3; i <= 4; i++) {
        document.getElementById(`player${i}Score`).style.display =
            i <= numberOfPlayers ? "block" : "none";
    }

    createPlayers(numberOfPlayers);
    createWalls();
    createMaluses();
    createBonuses();
    handleInput();
    gameLoop();
}

// Create players
function createPlayers(numberOfPlayers) {
    const gameSpeed = parseInt(gameSpeedInput.value);

    const playerA = new Player(10, 10, gameSpeed, PLAYER_A_COLOR, {
        up: "w",
        down: "s",
        left: "a",
        right: "d",
    });

    const playerB = new Player(40, 10, gameSpeed, PLAYER_B_COLOR, {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight",
    });

    const playerC = new Player(10, 40, gameSpeed, PLAYER_C_COLOR, {
        up: "i",
        down: "k",
        left: "j",
        right: "l",
    });

    const playerD = new Player(40, 40, gameSpeed, PLAYER_D_COLOR, {
        up: "8",
        down: "5",
        left: "4",
        right: "6",
    });

    players = [playerA, playerB, playerC, playerD].slice(0, numberOfPlayers);
}

// Draw the exit
function drawExit(position) {
    ctx.fillStyle = EXIT_COLOR;
    ctx.beginPath();
    ctx.arc(position.x, position.y, EXIT_RADIUS, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
}

// Update game state
function update() {
    if (!gameStarted) return;

    players.forEach((player) => player.move());
    walls.forEach((wall) => wall.update());

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
    maluses.forEach((malus) => malus.draw());
    bonuses.forEach((bonus) => bonus.draw());

    drawExit(exit);

    // Secondary exit is only available from level 13
    if (currentLevel >= 13) {
        drawExit(exit_secondary);
    }

    if (!gameStarted && countdown > 0) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "90px 'Poppins', sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);
    }

    // Display scores
    players.forEach((player, index) => {
        const scoreElement = document.getElementById(`player${index + 1}Score`);
        scoreElement.innerHTML = `Player ${
            index + 1
        } <span class="playerScore">${scores[index]}</span>`;
    });
}

// Handle next level
function nextLevel() {
    const levelCount = levelsData.length;
    if (currentLevel > 0 && currentLevel < levelCount) {
        newLevelSound.play();
    }
    currentLevel++;

    if (currentLevel > levelCount) {
        currentLevel = 1;
        successSound.play();

        // Using SweetAlert for a nicer pop-up
        Swal.fire({
            title: "🎉<br>Congratulations!",
            html: `<b>You have completed all ${levelCount} levels.</b><br><br>Your scores:${scores
                .map(
                    (score, index) =>
                        `<br>Player ${index + 1}: ${score} points`,
                )
                .join("\n")}`,
            icon: "success",
            confirmButtonText: "Restart game",
            footer: "Thanks for playing! Have a great day!⚡",
            confirmButtonColor: "#1E3229",
        });
    }

    levelIndicator.innerHTML = `&#9889; Level ${currentLevel} / ${levelCount}`;

    resetLevel();
    createWalls();
    createMaluses();
    createBonuses();
    resetPlayers();
}

// Reset players for the new level
function resetPlayers() {
    const basePositions = [
        { x: 10, y: 10 },
        { x: 40, y: 10 },
        { x: 10, y: 40 },
        { x: 40, y: 40 },
    ];

    players.forEach((player, index) => {
        const position = basePositions[index] || { x: 0, y: 0 };

        player.x = position.x;
        player.y = position.y;
        player.reachedExit = false;
    });
}

// Reset level conditions
function resetLevel() {
    countdown = 6;
    gameStarted = false;
    timer = 0;
    resetPlayers();
}

// Load levels from JSON file
// Be aware for CORS policy
async function loadLevels() {
    const response = await fetch("assets/levels.json").then((res) =>
        res.json(),
    );

    levelsData = response.levels;

    const levelCount = levelsData.length;
    levelIndicator.innerHTML = `&#9889; Level ${currentLevel} / ${levelCount}`;

    createWalls();
    createMaluses();
    createMaluses();
}

// Create walls for the current level
function createWalls() {
    walls = [];
    const levelData = levelsData.find((level) => level.level === currentLevel);

    if (levelData) {
        levelData.walls.forEach((wallData) => {
            walls.push(
                new Wall(
                    wallData.x,
                    wallData.y,
                    wallData.width,
                    wallData.height,
                    wallData.moving || false,
                    wallData.direction || null,
                    wallData.speed || 0,
                    wallData.range || 0,
                    wallData.color || "black",
                ),
            );
        });
    }
}

// Create maluse traps for the current level
function createMaluses() {
    maluses = [];
    const levelData = levelsData.find((level) => level.level === currentLevel);

    if (levelData && levelData.maluses) {
        malusSpeedRange = levelData.malusSpeedRange;
        malusDuration = levelData.malusDuration;

        levelData.maluses.forEach((malusData) => {
            maluses.push(new Malus(malusData.x, malusData.y, malusData.size));
        });
    }
}

// Create bonus gems for the current level
function createBonuses() {
    bonuses = [];
    const levelData = levelsData.find((level) => level.level === currentLevel);

    if (levelData && levelData.bonuses) {
        bonusDuration = levelData.bonusDuration;

        levelData.bonuses.forEach((bonusData) => {
            bonuses.push(new Bonus(bonusData.x, bonusData.y, bonusData.size));
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
            clockTickSound.play();
        }
    }

    if (countdown === 0) {
        clockTickSound.pause();
        gameStarted = true;
        startClock();
    }

    timer++;
    requestAnimationFrame(gameLoop);
}

function startClock() {
    if (!clockStarted) {
        timer = 0;
        clockStarted = true;
        setInterval(() => {
            updateClock();
        }, 1000);
    }
}

function updateClock() {
    const minutes = Math.floor(timer / 3600);
    const seconds = Math.floor(timer / 60) % 60;
    clock.innerHTML = `&#8987; ${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
}

window.addEventListener("load", () => {
    checkScreenSize();
    loadLevels();
});
