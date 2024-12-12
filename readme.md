# Escape this.

**2D Local Multiplayer Maze Challenge Game written in JavaScript up to 4 players**

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

## 🔧 Prerequisites

Before starting the game, make sure you meet the following requirements:

-   Browser: A modern JavaScript-enabled browser (e.g., Chrome, Firefox, Edge).
-   Keyboard: A full-size keyboard to ensure all controls are accessible.
-   Monitor: A display width of at least 980 pixels for optimal gameplay experience.

## 🚀 How to Play

1. **Start the Game**: Choose the number of players (1 to 4) and the game speed (1 to 10) and press start.
2. **Move the Players**: Each player controls a square represented by a different color. Use the keyboard to move.
    - 🟥 Red Player 1: WASD (W, A, S, D)
    - 🟦 Blue Player 2: Arrow keys (Up, Down, Left, Right)
    - 🟩 Green Player 3: IJKL (I, J, K, L)
    - 🟨 Yellow Player 4: Numpad arrow keys (alternative configuration: 8, 4, 5, 6)
3. **Objective**: Guide all players to the exit represented by a blue circle with a black border in the bottom-right corner.
4. **Challenges: Malus and Bonus Items:** Some maps include special items that affect gameplay:
    - ⛓️ Malus trap: Slows the affected player for a short duration. Be strategic about avoiding these!
    - 💎 Bonus gem: Boosts the player's speed temporarily. Use it wisely to gain an advantage.
5. **Level Progression**: Once all players reach the exit, the game will load the next level. If players fail to reach the exit, they can try again.

**💡 Tips for Success**:

-   Coordinate movements with other players to avoid obstacles and optimize your path to the exit.
-   Be mindful of malus and bonus items – they can make or break your progress!
-   Adjust the speed setting to balance fun and challenge.

Good luck, and enjoy navigating the maze!⚡

## 🎯 Design and Implemented Functionalities

-   **2D Multiplayer Game**: Developed using JavaScript with HTML5 Canvas.
-   **Player Representation**: Each player is represented by a square of a distinct color for easy identification.
-   **Player Count**: Supports 1 to 4 players simultaneously using the keyboard.
-   **Game Speed**: On the welcome screen, the user can choose the speed of the players from 1 to 10.
-   **Starting Position**: All players start in the top-left corner of each level.
-   **Countdown**: A countdown timer before each level begins adds a sense of urgency (5-4-3-2-1).
-   **Exit**: The exit is shown as a blue circle with a black border located at the bottom-right corner of the screen.
-   **Level Completion**: All players must reach the exit to proceed to the next level.
-   **Level Layout**: Levels consist of rectangular rooms with walls along the edges.
-   **Movement**: Players can move in any direction, including diagonally.
-   **Collision Detection**: Collisions between players and obstacles (such as walls) are detected, preventing movement through them.
-   **Wall and Obstacle Interaction**: Walls are impassable, and players must navigate around them or find alternative paths.
-   **Moving walls**: Some walls move vertically or horizontally. Players are pushed back if a moving wall collides with them.
-   **Player Interaction**: Enable players to push the other players a little backward, adding an element of strategy and competition.
-   **Bonus appears on map**: A bonus gem appears on the map which provides a temporary boost to the player's speed.
-   **Malus appears on map**: A malus trap appears on the map which slows down the player's movement speed for a random period of time.
-   **Scoring System**: Points system where players earn points based on their performance (4-3-2-1 points for 1st to 4th place).
-   **Level and time indicator**: The current level and time passed on each level are displayed on the top part of the screen.
-   **Music and sound effects**: There is (mutable) background music and several sound effects (eg. exit reached, new level, bonus activated) to make the game more engaging.
-   **Multiple exit location**: Multiple exit locations could appear on some maps. A player could finish a map by reaching one of these.
-   **Handle window size**: The game will check your browser width and height whether you can play this game on that particular device or not. It will notice you in a pop-up.

## 🌀 Levels

-   **Level 1**: A simple demo level with a minimum amount of walls or obstacles, allowing players to learn the controls.
-   **Levels 2-4**: Vertical and horizontal walls appear, introducing corridors that require careful navigation. Some paths are blocked by dead ends, making the path to the exit is more challenging.
-   **Levels 5-8**: Walls move vertically or horizontally in a given range and speed. Players must adapt their strategy as walls continuously change position.
-   **Levels 9-12**: Add more complexity with additional elements. Malus trap and bonus gems are present on some levels. Be careful!
-   **Levels 13-15**: All previously mentioned obstacles and additional elements are present, and more than one exit is possible. Choose wisely!

## ⚙️ Future Improvement Possibilities

-   **GamePad Support**: Add support for gamepads, allowing players to use controllers for a better experience.
-   **Fans on corridors**: Fans speed up or slow down certain corridors.
-   **Electrocuting wall**: Certain walls must not be touched, otherwise you'll be electrocuted and have to start all over again.
-   **Extra level**: Create additional levels in JSON with all the available utilities.

## 🎉 GitHub page connection

Continuous deployment is present in GitHub Pages and the project is auto-updating relative to changes to the main branch. Live demo: https://adamdienes.github.io/escape-this-js-game/

    Made with ❤️ and JavaScript by Adam DIENES / Copyright © 2024
