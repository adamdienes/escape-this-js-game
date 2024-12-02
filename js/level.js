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
