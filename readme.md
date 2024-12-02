# Escape this

2D Local Multiplayer Game written in JavaScript up to 4 players

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## How to Play

1. **Start the Game**: Choose the number of players (1 to 4) and press start.
2. **Move the Players**: Each player controls a square represented by a different color. Use the keyboard to move.
    - Player 1: Arrow keys (Up, Down, Left, Right)
    - Player 2: WASD (W, A, S, D)
    - Player 3: IJKL (I, J, K, L)
    - Player 4: Arrow keys (alternative configuration)
3. **Objective**: Guide all players to the exit represented by a blue circle with a black border in the bottom-right corner.
4. **Level Progression**: Once all players reach the exit, the game will load the next level. If players fail to reach the exit, they can try again.

## Design and Implemented Functionalities

-   **2D Multiplayer Game**: Developed using JavaScript with HTML5 Canvas.
-   **Player Representation**: Each player is represented by a square of a distinct color for easy identification.
-   **Player Count**: Supports 1 to 4 players simultaneously using the keyboard.
-   **Starting Position**: All players start in the top-left corner of each level.
-   **Countdown**: A countdown timer before each level begins adds a sense of urgency (5-4-3-2-1).
-   **Exit**: The exit is shown as a blue circle with a black border located at the bottom-right corner of the screen.
-   **Level Completion**: All players must reach the exit to proceed to the next level.
-   **Level Layout**: Levels consist of rectangular rooms with walls along the edges.
-   **Movement**: Players can move in any direction, including diagonally.
-   **Collision Detection**: Collisions between players and obstacles (such as walls) are detected, preventing movement through them.
-   **Wall and Obstacle Interaction**: Walls are impassable, and players must navigate around them or find alternative paths.
-   **Scoring System**: Points system where players earns points based on their performance (4-3-2-1 points for 1st to 4th place).

## Levels

-   **Level 1**: A simple demo level with no walls or obstacles, allowing players to learn the controls.
-   **Levels 2-4**: Vertical walls appear, introducing corridors that require careful navigation. Some paths are blocked by dead ends, making the path to the exit more challenging.
-   **Levels 4-8**: Walls move vertically or horizontally, adding a dynamic element to the level design. Players must adapt their strategy as walls change position.
-   **Levels 8-15**: _TODO_ (Add more complexity with additional obstacles, moving platforms, or more challenging maze-like layouts).
-   **Levels 15-20**: _TODO_ (Introduce new mechanics or environments, such as time-limited challenges or multi-exit levels).

## Future Improvement Possibilities

-   **GamePad Support**: Add support for gamepads, allowing players to use controllers for a better experience.
-   **Player Interaction**: Enable players to push other players, adding an element of strategy and competition.

## Github pages connection

Continuous deployment is live to a Github Pages and the app is auto-updating relative to changes to the main branch. https://adamdienes.github.io/2d_multiplayer_game/

Made with ❤️ and JavaScript.
