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
            exitReachedSound.play();
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
