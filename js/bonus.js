class Bonus {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.width = size;
        this.height = size;
    }

    draw() {
        let grad = ctx.createLinearGradient(
            this.x,
            this.y,
            this.x + this.width,
            this.y + this.height,
        );
        grad.addColorStop(0, "cyan");
        grad.addColorStop(0.5, "blue");
        grad.addColorStop(1, "purple");
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height / 2);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height / 2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 3,
            this.y + this.height / 3,
            this.width / 6,
            0,
            Math.PI * 2,
            false,
        );
        ctx.fill();
    }
}
