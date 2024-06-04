// Variables for game state
var gameStarted = false;
var runImageNumber = 1;
var runAnimationId = 0;
var runSoundClip = new Audio("assets/run.mp3");
runSoundClip.loop = true;
var x = 0;
var moveBackgroundAnimationId = 0;
var score = 0;
var scoreAnimationId = 0;
var jumpImageNumber = 1;
var jumpAnimationId = 0;
var jumpSoundClip = new Audio("assets/jump.mp3");
var boyMarginTop = 400;
var boxMarginLeft = 300;
var boxAnimationId = 0;
var deadImageNumber = 0;
var deadAnimationID = 0;
var deadSoundClip = new Audio("dead.mp3");

// Function to start the game
function startGame() {
  gameStarted = true;
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  createBoxes();

  document.body.onkeyup = function (event) {
    if (gameStarted) {
      keyCheck(event);
    }
  };
}

// Function to handle key events
function keyCheck(event) {
  if (!gameStarted) return;

  var keyCode = event.which;

  if (keyCode == 13) {
    // Start game on Enter key
    if (runAnimationId == 0) {
      runAnimationId = setInterval(boyRun, 100);
      runSoundClip.play();
      moveBackgroundAnimationId = setInterval(moveBackground, 100);
      scoreAnimationId = setInterval(updateScore, 100);
      boxAnimationId = setInterval(moveBoxes, 100);
    }
  }

  if (keyCode == 32) {
    // Jump on Space key
    if (jumpAnimationId == 0) {
      clearInterval(runAnimationId);
      runSoundClip.pause();
      jumpAnimationId = setInterval(boyJump, 100);
      jumpSoundClip.play();
    }
  }
}

// Function to handle the running animation
function boyRun() {
  runImageNumber = runImageNumber + 1;

  if (runImageNumber == 9) {
    runImageNumber = 1;
  }

  document.getElementById("boy").src =
    "assets/Run (" + runImageNumber + ").png";
}

// Function to move the background
function moveBackground() {
  x = x - 20;

  document.getElementById("backgroundBox").style.backgroundPositionX = x + "px";
}

// Function to update the score
function updateScore() {
  score = score + 5;

  document.getElementById("score").innerHTML = score;
}

// Function to handle the jumping animation
function boyJump() {
  if (jumpImageNumber <= 6) {
    boyMarginTop = boyMarginTop - 30;
    document.getElementById("boy").style.marginTop = boyMarginTop + "px";
  }

  if (jumpImageNumber >= 7) {
    boyMarginTop = boyMarginTop + 30;
    document.getElementById("boy").style.marginTop = boyMarginTop + "px";
  }

  jumpImageNumber = jumpImageNumber + 1;

  if (jumpImageNumber == 13) {
    jumpImageNumber = 1;
    clearInterval(jumpAnimationId);
    jumpAnimationId = 0;
    runAnimationId = setInterval(boyRun, 100);
    runSoundClip.play();

    if (moveBackgroundAnimationId == 0) {
      moveBackgroundAnimationId = setInterval(moveBackground, 100);
    }
    if (scoreAnimationId == 0) {
      scoreAnimationId = setInterval(updateScore, 100);
    }
    if (boxAnimationId == 0) {
      boxAnimationId = setInterval(moveBoxes, 100);
    }
  }
  document.getElementById("boy").src =
    "assets/Jump (" + jumpImageNumber + ").png";
}

// Function to create boxes in the game
function createBoxes() {
  for (var i = 0; i < 10; i++) {
    var box = document.createElement("div");
    box.className = "box";
    box.id = "box" + i;

    if (i <= 5) {
      boxMarginLeft = boxMarginLeft + 800;
    }

    if (i >= 6) {
      boxMarginLeft = boxMarginLeft + 500;
    }

    box.style.marginLeft = boxMarginLeft + "px";
    document.getElementById("backgroundBox").appendChild(box);
  }
}

// Function to move boxes in the game
function moveBoxes() {
  for (var i = 0; i < 10; i++) {
    var box = document.getElementById("box" + i);
    var currentMarginLeft = getComputedStyle(box).marginLeft;
    var newMarginLeft = parseInt(currentMarginLeft) - 20;
    box.style.marginLeft = newMarginLeft + "px";

    if (newMarginLeft >= 60 && newMarginLeft <= 180) {
      if (boyMarginTop > 365) {
        clearInterval(runAnimationId);
        runSoundClip.pause();
        runAnimationId = -1;

        clearInterval(jumpAnimationId);
        jumpSoundClip.pause();
        jumpAnimationId = -1;

        clearInterval(moveBackgroundAnimationId);
        moveBackgroundAnimationId = -1;

        clearInterval(scoreAnimationId);
        scoreAnimationId = -1;

        clearInterval(boxAnimationId);
        boxAnimationId = -1;

        deadAnimationID = setInterval(boyDead, 100);
        deadSoundClip.play();
      }
    }
  }
}

// Function to handle the death animation
function boyDead() {
  deadImageNumber = deadImageNumber + 1;

  if (deadImageNumber == 11) {
    deadImageNumber = 10;
    document.getElementById("boy").style.marginTop = "400px";

    document.getElementById("endGame").style.visibility = "visible";
    document.getElementById("endScore").innerHTML = score;
  }

  document.getElementById("boy").src =
    "assets/Dead (" + deadImageNumber + ").png";
}

// Function to reload the game
function reload() {
  location.reload();
}
