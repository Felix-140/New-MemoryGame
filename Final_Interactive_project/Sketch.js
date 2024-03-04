let cols = 3;
let rows = 3;
let cellSize;
let grid;
let initialPattern; 

function setup() {
  createCanvas(400, 400);
  cellSize = width / cols;

  initialPattern = randomGrid(cols, rows)
  grid = initialPattern.slice();
  startTimer();
}

function draw() {
  background('black');
  drawGrid(grid);
  
}

function drawGrid(grid) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cellX = i * cellSize;
      let cellY = j * cellSize;
      stroke(0);
      if (grid[i * cols + j]) {
        square(cellX, cellY, cellSize);
      }
    }
  }
}

function mousePressed() {
  let i = floor(mouseX / cellSize);
  let j = floor(mouseY / cellSize);     
  if (i >= 0 && i < width && j >= 0 && j < height) {
    grid[i * cols + j] = !grid[i * cols + j];
  }
}

function randomGrid(cols, rows) {
  newGrid = new Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) {
    newGrid[i] = random() > 0.5;
  }
  return newGrid;
}

function startTimer() {
  timer = setTimeout( function() {
    resetGrid();
  }, 2 * cols * 1000);
}

function stopTimer() {
  clearTimeout(timer);
}

function resetGrid() {
for (let i = 0; i < cols; i++) {     
    for (let j = 0; j < rows; j++) {
      grid[i * cols + j] = true;
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < cols * rows; i++) {
    if (grid[i] !== initialPattern[i]) {
      return;
    }
  }

  if (cols < 10 && rows < 10) {
    cols++;
    rows++;
    cellSize = width / cols;
    initialPattern = randomGrid(cols, rows);
    grid = initialPattern.slice();
    startTimer();
  }
}