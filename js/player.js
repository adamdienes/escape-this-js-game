class Player {
    constructor(x, y, gameSpeed, color, controls) {
        // Limit game speed to 1 - 10
        if (gameSpeed < 1) gameSpeed = 1;
        if (gameSpeed > 10) gameSpeed = 10;

        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = gameSpeed;
        this.controls = controls;
        this.dx = 0;
        this.dy = 0;
        this.reachedExit = false;
        this.isEffected = false;
    }

    move() {
        if (!this.reachedExit) {
            this.x += this.dx * this.speed;
            this.y += this.dy * this.speed;
            this.checkCollisions();
        }
    }

    checkCollisions() {
        this.checkBoundaryCollisions();
        this.checkWallCollisions();
        this.checkExitCollisions();
        this.checkPlayerCollisions();
        this.checkMalusCollisions();
        this.checkBonusCollisions();
    }

    checkBoundaryCollisions() {
        if (this.x < 0) this.x = 0;
        if (this.x + PLAYER_SIZE > canvas.width)
            this.x = canvas.width - PLAYER_SIZE;
        if (this.y < 0) this.y = 0;
        if (this.y + PLAYER_SIZE > canvas.height)
            this.y = canvas.height - PLAYER_SIZE;
    }

    checkWallCollisions() {
        walls.forEach((wall) => {
            if (
                this.x < wall.x + wall.width &&
                this.x + PLAYER_SIZE > wall.x &&
                this.y < wall.y + wall.height &&
                this.y + PLAYER_SIZE > wall.y
            ) {
                this.x -= this.dx * this.speed;
                this.y -= this.dy * this.speed;
            }
        });
    }

    checkExitCollisions() {
        const distToExit = Math.sqrt(
            (this.x + PLAYER_SIZE / 2 - exit.x) ** 2 +
                (this.y + PLAYER_SIZE / 2 - exit.y) ** 2,
        );
        if (distToExit < EXIT_RADIUS) {
            this.reachedExit = true;
            this.dx = 0;
            this.dy = 0;
            this.scorePlayer();
            exitReachedSound.play();
        }
    }

    checkPlayerCollisions() {
        players.forEach((otherPlayer) => {
            if (otherPlayer !== this && !otherPlayer.reachedExit) {
                const overlapX = Math.abs(this.x - otherPlayer.x) < PLAYER_SIZE;
                const overlapY = Math.abs(this.y - otherPlayer.y) < PLAYER_SIZE;

                if (overlapX && overlapY) {
                    const diffX = this.x - otherPlayer.x;
                    const diffY = this.y - otherPlayer.y;
                    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

                    if (distance < PLAYER_SIZE) {
                        const pushDistance = PLAYER_SIZE - distance;
                        const pushX = (diffX / distance) * pushDistance * 0.5;
                        const pushY = (diffY / distance) * pushDistance * 0.5;

                        // Adjust player positions
                        this.x += pushX;
                        this.y += pushY;
                        otherPlayer.x -= pushX;
                        otherPlayer.y -= pushY;
                    }
                }
            }
        });
    }

    checkMalusCollisions() {
        maluses.forEach((malusItem, index) => {
            if (
                this.x < malusItem.x + malusItem.width &&
                this.x + PLAYER_SIZE > malusItem.x &&
                this.y < malusItem.y + malusItem.height &&
                this.y + PLAYER_SIZE > malusItem.y
            ) {
                malusSound.play();
                maluses.splice(index, 1);

                if (!this.isEffected) {
                    this.isEffected = true;
                    const originalSpeed = this.speed;
                    this.speed = Math.random() * (malusSpeedRange[1] - 1) + 1;

                    console.log(
                        "Malus speed: " +
                            this.speed +
                            " for " +
                            malusDuration +
                            " ms",
                    );

                    setTimeout(() => {
                        this.speed = originalSpeed;
                    }, malusDuration);

                    this.isEffected = false;
                    console.log("Original speed restored: " + originalSpeed);
                }
            }
        });
    }

    checkBonusCollisions() {
        bonuses.forEach((bonusItem, index) => {
            if (
                this.x < bonusItem.x + bonusItem.width &&
                this.x + PLAYER_SIZE > bonusItem.x &&
                this.y < bonusItem.y + bonusItem.height &&
                this.y + PLAYER_SIZE > bonusItem.y
            ) {
                bonusSound.play();
                bonuses.splice(index, 1);

                if (!this.isEffected) {
                    const originalSpeed = this.speed;
                    this.speed *= 1.5;

                    console.log(
                        "Bonus speed: " +
                            this.speed +
                            " for " +
                            bonusDuration +
                            " ms",
                    );

                    this.isEffected = true;
                    setTimeout(() => {
                        this.speed = originalSpeed;
                    }, bonusDuration);
                    this.isEffected = false;

                    console.log("Original speed restored: " + originalSpeed);
                }
            }
        });
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
