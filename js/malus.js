class Malus {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.width = size;
        this.height = size;
    }

    draw() {
        ctx.fillStyle = "brown";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw spikes
        ctx.fillStyle = "gray";
        let spikeHeight = 10;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x + i * (this.width / 5), this.y);
            ctx.lineTo(
                this.x + (i + 0.5) * (this.width / 5),
                this.y - spikeHeight,
            );
            ctx.lineTo(this.x + (i + 1) * (this.width / 5), this.y);
            ctx.closePath();
            ctx.fill();
        }
    }
}
