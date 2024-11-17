const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = 50;
const PLAYER_SIZE = 20;
const EXIT_RADIUS = 30;

let gameStarted = false;
let countdown = 6;
let players = [];
let walls = [];
let level = 1;
let exit = { x: 750, y: 550 };
let timer = 0;
let scores = [0, 0, 0, 0];
,
// Player class
class Player {
    constructor(x, y, color, controls) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = 3;
        this.controls = controls;
        this.dx = 0;
        this.dy = 0;
        this.reachedExit = false;
    }

    move() {
        if (!this.reachedExit) {
            this.x += this.dx * this.speed;
            this.y += this.dy * this.speed;
            this.checkCollisions();
        }
    }

    checkCollisions() {
        // Boundary collisions
        if (this.x < 0) this.x = 0;
        if (this.x + PLAYER_SIZE > canvas.width)
            this.x = canvas.width - PLAYER_SIZE;
        if (this.y < 0) this.y = 0;
        if (this.y + PLAYER_SIZE > canvas.height)
            this.y = canvas.height - PLAYER_SIZE;

        // Wall collisions
        walls.forEach((wall) => {
            if (
                this.x < wall.x + wall.width &&
                this.x + PLAYER_SIZE > wall.x &&
                this.y < wall.y + wall.height &&
                this.y + PLAYER_SIZE > wall.y
            ) {
                // Simple collision resolution (push back)
                this.x -= this.dx * this.speed;
                this.y -= this.dy * this.speed;
            }
        });

        // Exit collision
        const distToExit = Math.sqrt(
            (this.x + PLAYER_SIZE / 2 - exit.x) ** 2 +
                (this.y + PLAYER_SIZE / 2 - exit.y) ** 2
        );
        if (distToExit < EXIT_RADIUS) {
            this.reachedExit = true;
            this.dx = 0;
            this.dy = 0;
            this.scorePlayer();
        }
    }

    scorePlayer() {
        const rank = players.filter((p) => p.reachedExit).length + 1;
        scores[players.indexOf(this)] += 5 - rank;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, PLAYER_SIZE, PLAYER_SIZE);
    }
}

// Wall class
class Wall {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Create players
function createPlayers(numberOfPlayers = 4) {
    // TODO: Implement number of players selection

    players = [
        new Player(10, 10, "red", {
            up: "w",
            down: "s",
            left: "a",
            right: "d",
        }),
        new Player(40, 10, "blue", {
            up: "ArrowUp",
            down: "ArrowDown",
            left: "ArrowLeft",
            right: "ArrowRight",
        }),
        new Player(10, 40, "green", {
            up: "i",
            down: "k",
            left: "j",
            right: "l",
        }),
        new Player(40, 40, "yellow", {
            up: "8",
            down: "5",
            left: "4",
            right: "6",
        }),
    ];
}

// Handle player controls
function handleInput() {
    document.addEventListener("keydown", (e) => {
        players.forEach((player) => {
            if (e.key === player.controls.up) player.dy = -1;
            if (e.key === player.controls.down) player.dy = 1;
            if (e.key === player.controls.left) player.dx = -1;
            if (e.key === player.controls.right) player.dx = 1;
        });
    });

    document.addEventListener("keyup", (e) => {
        players.forEach((player) => {
            if (e.key === player.controls.up || e.key === player.controls.down)
                player.dy = 0;
            if (
                e.key === player.controls.left ||
                e.key === player.controls.right
            )
                player.dx = 0;
        });
    });
}

// Create walls based on the level
function createWalls() {
    walls = [];
    if (level >= 2) {
        walls.push(new Wall(200, 0, 50, 400)); // vertical wall
        walls.push(new Wall(500, 200, 300, 50)); // horizontal wall
    }
    if (level >= 4) {
        walls.push(new Wall(400, 300, 50, 300)); // vertical wall
    }
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

    // Countdown before start
    if (!gameStarted && countdown > 0) {
        ctx.font = "48px 'Poppins', sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);
    }
}

// Move to the next level
function nextLevel() {
    level++;
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
    }

    timer++;
    requestAnimationFrame(gameLoop);
}

// Initialize game
function init() {
    createPlayers();
    createWalls();
    handleInput();
    gameLoop();
}

init();
