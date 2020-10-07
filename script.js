
'use strict';

// Create canvas
const canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 420;
const ctx = canvas.getContext("2d");
const footer = document.querySelector("footer");
document.body.insertBefore(canvas, footer);

// Create background image
let showBackground = false;
const backgroundImage = new Image();
backgroundImage.onload = function () {
    showBackground = true;
};
backgroundImage.src = "images/leaf.jpg";

// Create bug image
let showBug = false;
const bugImage = new Image();
bugImage.onload = function () {
    showBug = true;
};
bugImage.src = "images/bug1.png";

// Create bug image
let showSplat = false;
const splatImage = new Image();
splatImage.src = "images/splat2.png";

// Create game objects 
const bug = {
  x: 0,
  y: 0,
  delay: 1500
}

const splat = {
  x: 0,
  y: 0,
}

// Player Input
canvas.onmousedown = function (e) {

  const x = e.offsetX;
  const y = e.offsetY;

  // (x,y) originaly at top left corner of image
  const bugCenterX = bug.x + (bugImage.naturalWidth / 2);
  const bugCenterY = bug.y + (bugImage.naturalHeight / 2);

  console.log(x, y);
  console.log('center:', bugCenterX, bugCenterY);
   
  const clickDistanceFromBug = Math.sqrt(Math.pow(bugCenterX - x, 2) + Math.pow(bugCenterY - y, 2));
  console.log('clickDistanceFromBug:', clickDistanceFromBug);

  const bugRadius = 30;

  if (clickDistanceFromBug < bugRadius) {
    console.log('inside');
    score++;
    bug.delay -= 50;   
    then = Date.now()
    
    showSplat = true;
    showBug = false;
  }
}

// Update object - change location of bug 
const reset =()=> {
  splat.x = bug.x;
  splat.y = bug.y;

  bug.x = 20 + (Math.random() * (canvas.width - 90)); // Math.random returns value 0 to 1, bug will say within the boundaries of the canvas
  bug.y = 20 + (Math.random() * (canvas.height - 90));
}

// Render objects
const render =()=> {
  if (showBackground) {
    ctx.drawImage(backgroundImage, 0, 0);
  }
  if (showBug) {
    ctx.drawImage(bugImage, bug.x, bug.y);
  }
  if (showSplat) {
    ctx.drawImage(splatImage, bug.x, bug.y)
  }

  const scoreContainer = document.getElementById('score-container');
  scoreContainer.innerHTML = score;
}

// Main game loop
const main =()=> {
	const now = Date.now();
	const delta = now - then;

  // Change bug location after delay time passes
  if (delta > bug.delay) {
    showBug = true;
    showSplat = false;
    reset();
    then = now;
  }
	render();
  requestAnimationFrame(main); // when dom is ready to render, run main
};

// Crossbrowser handling
const w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Start game
let score = 0;
reset();
let then = Date.now();
main();

// Reset game stats
function resetSpeed() {
  bug.delay = 1500;
}

function resetScore() {
  score = 0;
  resetSpeed();
}

var resetScoreBtn = document.getElementById("reset-score");
var resetSpeedBtn = document.getElementById("reset-speed");

resetScoreBtn.addEventListener("click", resetScore, false);
resetSpeedBtn.addEventListener("click", resetSpeed, false)





