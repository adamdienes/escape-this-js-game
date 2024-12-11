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
let exit = { x: 750, y: 550 };
let scores = [0, 0, 0, 0];

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
    document.getElementById("footer").style.display = "none";

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
function drawExit() {
    ctx.fillStyle = EXIT_COLOR;
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

function nextLevel() {
    if (currentLevel > 0) {
        newLevelSound.play();
    }

    currentLevel++;
    const levelCount = levelsData.length;

    if (currentLevel > levelCount) {
        currentLevel = 1;

        // Using SweetAlert for a nicer pop-up
        Swal.fire({
            title: "🎉<br>Congratulations!",
            html: `<b>You have completed all levels.</b><br><br>Your scores:${scores
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
    countdown = 6;
    gameStarted = false;
    timer = 0;
}

async function loadLevels() {
    // Be aware for CORS policy
    const response = await fetch("assets/levels.json").then((res) =>
        res.json(),
    );

    levelsData = response.levels;

    const levelCount = levelsData.length;
    levelIndicator.innerHTML = `&#9889; Level ${currentLevel} / ${levelCount}`;

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
                    wallData.height,
                ),
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
    // Ensure startClock is only called once
    if (!clockStarted) {
        timer = 0;
        clockStarted = true; // Set flag to true
        setInterval(() => {
            updateClock();
        }, 1000); // Update every second
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
    loadLevels();
});
