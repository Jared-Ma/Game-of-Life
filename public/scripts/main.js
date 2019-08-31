function setup(){
  mainCanvas = createCanvas(800, 600);
  mainCanvas.style.zIndex = -1;
  mainCanvas.style.position = "relative";
  subCanvas = createCanvas(800, 600);
  subCanvas.style.zIndex = 0;
  subCanvas.style.position = "absolute";
  cellSize = 40;
  grid = createGrid(mainCanvas.width/cellSize, mainCanvas.height/cellSize);
  drawGridLines(subCanvas, grid, cellSize);

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

    grid = updateGrid();
    drawGrid(mainCanvas, grid, cellSize);
    generation++;
    writeGeneration(generation);
    writePopulation(population);
  }

  requestAnimationFrame(mainLoop);
}


let generation;
let mainCanvas;
let subCanvas;
let cellSize;
let grid;
let paused;
let lastRender;
let maxFPS;
let mouseDown;
let action;
let population;
let wrap;
let gridLines;
let patterns;

setup();

patterns.add(patterns.spaceships.glider, grid, 0, 0);
patterns.add(patterns.stillLifes.block, grid, 5, 5);

requestAnimationFrame(mainLoop);