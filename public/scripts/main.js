function setup(){
  cellSize = 20;
  canvasWidth = Math.floor(1600/cellSize) * cellSize;
  canvasHeight = Math.floor(700/cellSize) * cellSize;
  mainCanvas = createCanvas(canvasWidth, canvasHeight);
  mainCanvas.id = "mainCanvas"
  subCanvas = createCanvas(canvasWidth, canvasHeight);
  subCanvas.id = "subCanvas"

  grid = createGrid(mainCanvas.width/cellSize, mainCanvas.height/cellSize);
  drawGridLines(subCanvas, grid, cellSize);
  prevGrids = [];

  generation = 0;
  paused = true;
  lastRender = 0;
  maxFPS = 1;
  action = "add"
  population = 0;
  wrap = true;
  gridLines = true;
  mouseDown = false;
  patterns = new Patterns();

  initializeEvents();
}


function mainLoop(timestamp){
  if (paused == false) {
    if (timestamp < lastRender + (1000 / maxFPS)) {
      requestAnimationFrame(mainLoop);
      return;
    }

    lastRender = timestamp;
    nextState();
  }

  requestAnimationFrame(mainLoop);
}

let canvasWidth
let canvasHeight
let generation;
let mainCanvas;
let subCanvas;
let cellSize;
let grid;
let prevGrids;
let paused;
let lastRender;
let maxFPS;
let mouseDown;
let action;
let population;
let wrap;
let gridLines;
let patterns;
let cellColor;
let gridLineColor;


setup();

patterns.add(patterns.spaceships.glider, grid, 0, 0);
patterns.add(patterns.stillLifes.block, grid, 5, 5);

requestAnimationFrame(mainLoop);