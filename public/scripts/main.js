function setup(){
  canvas = createCanvas(800, 600);
  cellSize = 40;
  grid = createGrid(canvas.width/cellSize, canvas.height/cellSize);
  drawGridLines(canvas, grid, cellSize);

  generation = 0;
  paused = true;
  lastRender = 0;
  maxFPS = 1;
  action = "add"
  population = 0;
  wrap = true;
  gridLines = true;
  mouseDown = false;

  initializeEvents();
}


function mainLoop(timestamp){
  if (paused == false) {
    if (timestamp < lastRender + (1000 / maxFPS)) {
      requestAnimationFrame(mainLoop);
      return;
    }
    lastRender = timestamp;

    grid = updateGrid();
    drawGrid(canvas, grid, cellSize);
    generation++;
    writeGeneration(generation);
    writePopulation(population);
  }

  requestAnimationFrame(mainLoop);
}


let generation;
let canvas;
let cellSize;
let grid;
let paused;
let lastRender;
let maxFPS;
let mouseDown;
let action;
let population;
let wrap;
let gridLines

setup();

grid[6][6] = 1;
grid[6][7] = 1;
grid[6][8] = 1;
grid[6][9] = 1;
grid[6][10] = 1;
grid[6][11] = 1;
grid[6][12] = 1;
grid[6][13] = 1;
grid[7][6] = 1;
grid[7][8] = 1;
grid[7][9] = 1;
grid[7][10] = 1;
grid[7][11] = 1;
grid[7][13] = 1;
grid[8][6] = 1;
grid[8][7] = 1;
grid[8][8] = 1;
grid[8][9] = 1;
grid[8][10] = 1;
grid[8][11] = 1;
grid[8][12] = 1;
grid[8][13] = 1;

population = countCells(grid);
writePopulation(population);

drawGrid(canvas, grid, cellSize);

requestAnimationFrame(mainLoop);