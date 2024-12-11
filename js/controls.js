// Mute/Unmute functionality
const muteButton = document.getElementById("muteButton");
const muteIcon = document.getElementById("muteIcon");
const nextLevelButton = document.getElementById("nextLevelButton");

let isMuted = false;

muteButton.addEventListener("click", () => {
    isMuted = !isMuted;
    muteIcon.src = isMuted
        ? "assets/images/unmute.png"
        : "assets/images/mute.png";

    backgroundMusic.muted = isMuted;
});

const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", () => {
    resetLevel();
    alert("Level restarted!");
});

nextLevelButton.addEventListener("click", () => {
    nextLevel();
});
