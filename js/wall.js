class Wall {
    constructor(
        x,
        y,
        width,
        height,
        moving = false,
        direction = null,
        speed = 0,
        range = 0,
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moving = moving;
        this.direction = direction;
        this.speed = speed;
        this.range = range;

        this.startPosition = { x: x, y: y };
        this.currentDistance = 0;
        this.directionMultiplier = 1;
    }

    update() {
        if (this.moving) {
            if (this.direction === "horizontal") {
                this.x += this.speed * this.directionMultiplier;
                this.currentDistance += this.speed;

                if (Math.abs(this.currentDistance) >= this.range) {
                    this.directionMultiplier *= -1;
                    this.currentDistance = 0;
                }
            } else if (this.direction === "vertical") {
                this.y += this.speed * this.directionMultiplier;
                this.currentDistance += this.speed;

                if (Math.abs(this.currentDistance) >= this.range) {
                    this.directionMultiplier *= -1;
                    this.currentDistance = 0;
                }
            }
            this.checkCollisions();
        }
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    checkCollisions() {
        players.forEach((player) => {
            if (this.isColliding(player)) {
                this.pushPlayer(player);
            }
        });
    }

    isColliding(player) {
        return (
            player.x < this.x + this.width &&
            player.x + PLAYER_SIZE > this.x &&
            player.y < this.y + this.height &&
            player.y + PLAYER_SIZE > this.y
        );
    }

    pushPlayer(player) {
        const overlapX = Math.min(
            player.x + PLAYER_SIZE - this.x,
            this.x + this.width - player.x,
        );
        const overlapY = Math.min(
            player.y + PLAYER_SIZE - this.y,
            this.y + this.height - player.y,
        );

        // Determine which axis to push the player
        if (overlapX < overlapY) {
            if (player.x < this.x) {
                player.x = this.x - PLAYER_SIZE;
            } else {
                player.x = this.x + this.width;
            }

            player.x += this.speed * this.directionMultiplier;
        } else {
            if (player.y < this.y) {
                player.y = this.y - PLAYER_SIZE;
            } else {
                player.y = this.y + this.height;
            }

            player.y += this.speed * this.directionMultiplier;
        }
    }
}
