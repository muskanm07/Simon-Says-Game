const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

const levelTitle = document.getElementById("level-title");
const startBtn = document.querySelector(".start");

// ---------- PLAY SOUND ----------
function playSound(color) {
  const audio = document.getElementById(color + "-sound");
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

// ---------- BUTTON ANIMATION ----------
function animatePress(color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");

  setTimeout(() => {
    btn.classList.remove("pressed");
  }, 200);
}

// ---------- NEXT SEQUENCE ----------
function nextSequence() {
  userPattern = []; // reset clicks

  level++;
  levelTitle.textContent = "Level " + level;

  const randomIndex = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomIndex];

  gamePattern.push(randomColor);

  // Flash + sound for the chosen box
  setTimeout(() => {
    playSound(randomColor);
    animatePress(randomColor);
  }, 500);
}

// ---------- CHECK USER'S ANSWER ----------
function checkAnswer(currentIndex) {
  if (userPattern[currentIndex] === gamePattern[currentIndex]) {
    // Full sequence completed
    if (userPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 900);
    }
  } else {
    // WRONG CLICK
    playSound("wrong");
    document.body.classList.add("game-over");
    levelTitle.textContent = "Game Over! Press Start to Try Again";

    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 300);

    startOver();
  }
}

// ---------- USER BUTTON CLICK ----------
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (!started) return; // Do nothing if game not started

    const chosenColor = this.id;

    userPattern.push(chosenColor); // store clicked color

    playSound(chosenColor);
    animatePress(chosenColor);

    // Check last clicked color ONLY
    checkAnswer(userPattern.length - 1);
  });
});

// ---------- START GAME ----------
startBtn.addEventListener("click", function () {
  if (!started) {
    started = true;
    level = 0;
    gamePattern = [];
    nextSequence();
  }
});

// ---------- RESET GAME ----------
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userPattern = [];
}
