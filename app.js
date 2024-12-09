let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "blue", "green"];
let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector(".h2");
let highScoreElement = document.getElementById("high-score");
let startButton = document.getElementById("start-button");

// Check if a high score exists in localStorage
if (localStorage.getItem("highScore")) {
    highScore = parseInt(localStorage.getItem("highScore"));
    highScoreElement.innerText = `High Score: ${highScore}`;
}

// Start the game when the "Start Now" button is clicked
startButton.addEventListener("click", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        level = 0;
        gameSeq = [];
        userSeq = []; // Ensure user sequence is reset
        h2.innerText = `Level ${level}`; // Reset the level display
        h2.classList.remove("flash-red"); // Remove the flashing red class if it was there
        nextSequence();
    }
});

// Function to update the high score
function updateHighScore(currentLevel) {
    if (currentLevel > highScore) {
        highScore = currentLevel;
        highScoreElement.innerText = `High Score: ${highScore}`;
        localStorage.setItem("highScore", highScore); // Save high score to localStorage
    }
}

// Function for the next sequence
function nextSequence() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomNum = Math.floor(Math.random() * 4);
    let randomChosenColor = btns[randomNum];
    gameSeq.push(randomChosenColor);

    // Flash the button
    document.getElementById(randomChosenColor).classList.add("flash");
    setTimeout(() => {
        document.getElementById(randomChosenColor).classList.remove("flash");
    }, 300);

    console.log("Game Sequence:", gameSeq);
}

// When the user clicks a button
document.querySelectorAll(".btns").forEach(button => {
    button.addEventListener("click", function () {
        if (!started) return;

        let userChosenColor = this.id;
        userSeq.push(userChosenColor);

        checkAnswer(userSeq.length - 1);
    });
});

// Check user's answer
function checkAnswer(currentIndex) {
    if (gameSeq[currentIndex] === userSeq[currentIndex]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        // Game Over Logic
        gameOver();
    }
}

// Function to handle Game Over logic
function gameOver() {
    h2.innerText = "Game Over!";
    h2.classList.add("flash-red");
    started = false;

    // Update High Score
    updateHighScore(level);

    // Play game-over sound
    playSound("gameOver");

    // Flash the body to indicate game over
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 200);

    console.log("Game Over sound should play.");
}

// Global function to play sounds
function playSound(color) {
    const sounds = {
        green: new Audio('assets/audio/audio.mp3'),
        red: new Audio('assets/audio/audio.mp3'),
        yellow: new Audio('assets/audio/audio.mp3'),
        blue: new Audio('assets/audio/audio.mp3'),
        gameOver: new Audio('assets/audio/gameover.mp3'),
    };

    if (sounds[color]) {
        console.log(`Playing sound for: ${color}`);
        sounds[color].currentTime = 0; // Reset sound to the start
        sounds[color].play().catch((error) => {
            console.error("Audio playback failed:", error);
        });
    }
}

// Adding click sound functionality
document.addEventListener("DOMContentLoaded", () => {
    // Get all the buttons
    const buttons = document.querySelectorAll(".btns");

    // Add event listener to each button
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const color = button.id; // Get the button color from the id
            playSound(color);
        });
    });
});
