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
