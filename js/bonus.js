class Bonus {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.width = size;
        this.height = size;
    }

    draw() {
        // Create a gradient for the gem color
        let grad = ctx.createLinearGradient(
            this.x,
            this.y,
            this.x + this.width,
            this.y + this.height,
        );
        grad.addColorStop(0, "cyan");
        grad.addColorStop(0.5, "blue");
        grad.addColorStop(1, "purple");

        // Set fill style as the gradient
        ctx.fillStyle = grad;

        // Draw the gem shape (a simple polygonal design for a gem)
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y); // top center
        ctx.lineTo(this.x + this.width, this.y + this.height / 2); // right center
        ctx.lineTo(this.x + this.width / 2, this.y + this.height); // bottom center
        ctx.lineTo(this.x, this.y + this.height / 2); // left center
        ctx.closePath();

        ctx.fill();

        // Optionally, add a highlight to make it look shiny
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
