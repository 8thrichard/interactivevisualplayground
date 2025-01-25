// Variable declarations
let x, y; // Variables for Random Walk
let ballX = 200, ballY = 200; // Ball position for animation
let ballXSpeed = 2, ballYSpeed = 3; // Ball speed for animation
let currentColor; // Current background color 
let showMenu = true; // Menu visibility toggle
let mode = 0; // Current mode (0 = Menu)
let showWelcome = false; // Show welcome/instructions screen
let welcomeMessage = ""; // Welcome message
let welcomeTimer; // Timer for welcome message

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize variables
  currentColor = color(255, 0, 0); // Default background color
  x = width / 2;
  y = height / 2;

  // Initial screen shows the menu
  welcomeMessage = "Move your mouse to start the Animation";
}

function draw() {
  // Display menu or the current mode
  if (showMenu) {
    displayMenu();
  } else if (showWelcome) {
    displayWelcomeMessage();
  } else {
    runMode(mode);
  }
}

function displayMenu() {
  background(30);
  fill(255);
  textAlign(CENTER, CENTER);

  // Menu box
  fill(50, 50, 100, 200);
  stroke(200, 100, 100);
  strokeWeight(2);
  rectMode(CENTER);
  rect(width / 2, height / 2, 400, 350, 20);

  // Menu text
  noStroke();
  fill(255);
  textSize(24);
  text("Interactive Visual Playground", width / 2, height / 2 - 100);

  textSize(18);
  text("Press 1: Dynamic Background", width / 2, height / 2 - 40);
  text("Press 2: Animated Object", width / 2, height / 2);
  text("Press 3: Pattern Generation", width / 2, height / 2 + 40);
  text("Press 4: Random Walk", width / 2, height / 2 + 80);
  text("Press 'M' to hide/show menu", width / 2, height / 2 + 140);
}

function displayWelcomeMessage() {
  background(30);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(welcomeMessage, width / 2, height / 2);
}

function runMode(currentMode) {
  switch (currentMode) {
    case 1: // Dynamic Background
      if (showWelcome) {
        setWelcomeTimer();
      } else {
        dynamicBackground();
      }
      break;

    case 2: // Animated Object
      if (showWelcome) {
        setWelcomeTimer();
      } else {
        animateBall();
      }
      break;

    case 3: // Pattern Generation
      if (showWelcome) {
        setWelcomeTimer();
      } else {
        patternGeneration();
      }
      break;

    case 4: // Random Walk
      if (showWelcome) {
        setWelcomeTimer(); 
      } else {
        randomWalk();
        showWelcome = false;
      }
      break;
  }
}

function setWelcomeTimer() {
  clearTimeout(welcomeTimer);
  welcomeTimer = setTimeout(() => {
    showWelcome = false;
  }, 3000); // Adjusted timing for better experience
}

// Key press to toggle menu and switch modes
function keyPressed() {
  if (key === 'M' || key === 'm') {
    showMenu = !showMenu;
    if (!showMenu) {
      showWelcome = true;
    }
  } else if (key >= '1' && key <= '4') {
    mode = int(key);
    showMenu = false;
    showWelcome = true;
  }
}

function mouseMoved() {
  if (showWelcome) {
    showWelcome = false; // Animation starts when mouse is moved
  }
}

function dynamicBackground() {
  let r = map(mouseX, 0, width, 0, 255);
  let g = map(mouseY, 0, height, 0, 255);
  let b = map(mouseX + mouseY, 0, width + height, 0, 255);
  background(r, g, b);
}

function animateBall() {
  background(30);
  fill(255, 100, 100);
  ellipse(ballX, ballY, 30, 30);

  ballX += ballXSpeed;
  ballY += ballYSpeed;

  if (ballX > width || ballX < 0) ballXSpeed *= -1;
  if (ballY > height || ballY < 0) ballYSpeed *= -1;
}

function patternGeneration() {
  background(30);
  let gridSize = 50;
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      fill(random(255), random(255), random(255));
      rect(x, y, gridSize, gridSize);
    }
  }
}

function randomWalk() {
  // Fade background for trail effect
  noStroke();
  fill(0, 20); // Slight opacity to create fade effect
  rect(0, 0, width, height);

  // Draw walker
  stroke(random(255), random(255), random(255));
  strokeWeight(4);
  point(x, y);

  // Random movement
  x += random([-5, 0, 5]);
  y += random([-5, 0, 5]);

  // Boundary check with smooth wrap around
  if (x < 0) x = width;
  if (x > width) x = 0;
  if (y < 0) y = height;
  if (y > height) y = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
