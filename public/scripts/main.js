function createCanvas(width, height){
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.border = "1px #bbbbbb solid";

  let main = document.getElementById("main");
  main.appendChild(canvas);

  return canvas;
}

// function updateCanvas(canvas){
//   let main = document.getElementById("main");
//   main.appendChild(canvas);

//   return;
// }

function createGrid(width, height){
  let grid = new Array(height);

  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(width);
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = 0;
    }
  }

  return grid;
}

function drawGridLines(canvas, grid, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#bbbbbb";
  ctx.lineWidth = 2;

  for (let i = 0; i <= grid.length; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i*cellSize);
    ctx.lineTo(grid[0].length*cellSize, i*cellSize);
    ctx.stroke();
  }

  for (let j = 0; j <= grid[0].length; j++) {
    ctx.beginPath();
    ctx.moveTo(j*cellSize, 0);
    ctx.lineTo(j*cellSize, grid.length*cellSize);
    ctx.stroke();
  }

  return;
}

function updateGrid(){
  let newGrid = createGrid(grid[0].length, grid.length);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {

      let count = countNeighbours(grid, j, i);

      if (grid[i][j] == 1) {
        if (count == 2 || count == 3) {
          newGrid[i][j] = 1;
        }
        else {
          newGrid[i][j] = 0;
        }
      }

      else if (grid[i][j] == 0) {
        if (count == 3) {
          newGrid[i][j] = 1;
        }
        else {
          newGrid[i][j] = 0;
        }
      }
    }
  }

  return newGrid;
}

function countNeighbours(grid, x, y){
  let count = 0;

  // use modulo to wrap around
  for (let i = y-1; i <= y+1; i++) {
    for (let j = x-1; j <= x+1; j++) {
      if ((i >= 0) && (i <= grid.length-1)) {
        if ((j >= 0) && (j <= grid[0].length-1)) {
          if (((i != y) || (j != x)) && (grid[i][j] == 1)) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

function drawGrid(canvas, grid, cellSize){
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 1) {
        drawCell(canvas, j, i, cellSize);
      }
      else if (grid[i][j] == 0) {
        clearCell(canvas, j, i, cellSize);
      }
    }
  }

  return;
}

function drawCell(canvas, x, y, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(x*cellSize+1, y*cellSize+1, cellSize-2, cellSize-2);

  return;
}

function clearCell(canvas, x, y, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.clearRect(x*cellSize+1, y*cellSize+1, cellSize-2, cellSize-2);

  return;
}

function togglePause(){
  if (paused == false) {
    paused = true;
    document.getElementById('pauseButton').innerHTML = 'Resume';
  }
  else if (paused == true) {
    paused = false;
    document.getElementById('pauseButton').innerHTML = 'Pause';
  }
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
    // updateCanvas(canvas);
    generation++;
    writeGeneration(generation);
  }

  requestAnimationFrame(mainLoop);
}

function writeGeneration(generation){
  document.getElementById("generationCount").innerHTML = "Generation: " + generation.toString();
}

function getMousePos(canvas, event){
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function locateCell(mousePos){
  // let x = Math.floor((mousePos.x-1) / cellSize);
  // let y = Math.floor((mousePos.y-1) / cellSize);
  // BOUNDARY CHECK
  let x = Math.floor(mousePos.x / cellSize);
  let y = Math.floor(mousePos.y / cellSize);
  return {
    x: x,
    y: y
  }
}

function updateCell(grid, x, y){
  let newGrid = grid;

  if (newGrid[y][x] == 1) {
    console.log('a')
    newGrid[y][x] = 0;
    console.log(newGrid[y][x])
  }
  else if (newGrid[y][x] == 0) {
    console.log('b')
    console.log(y)
    console.log(x)
    newGrid[y][x] = 1;
    console.log(newGrid[y][x])
  }

  return newGrid;
}

function setup(){
  // setup variables and canvas
  canvas = createCanvas(800, 600);
  cellSize = 40;
  grid = createGrid(canvas.width/cellSize, canvas.height/cellSize);
  drawGridLines(canvas, grid, cellSize);

  generation = 0;
  paused = true;
  lastRender = 0;
  maxFPS = 1;

  // setup interactivity
  document.getElementById("pauseButton").addEventListener("click", ()=>{
    togglePause();
  })

  canvas.addEventListener("click", (event) => {
    if (paused == true) {
      var mousePos = getMousePos(canvas, event);
      var index = locateCell(mousePos);
      grid = updateCell(grid, index.x, index.y);
      drawGrid(canvas, grid, cellSize);
    }
  })
}

let generation;
let canvas;
let cellSize;
let grid;
let paused;
let lastRender;
let maxFPS;

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
drawGrid(canvas, grid, cellSize);

requestAnimationFrame(mainLoop);