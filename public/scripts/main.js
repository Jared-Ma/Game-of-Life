function createCanvas(width, height){
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.border = "1px #bbbbbb solid";

  let main = document.getElementById("main");
  main.appendChild(canvas);

  return canvas;
}

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
          population--;
        }
      }

      else if (grid[i][j] == 0) {
        if (count == 3) {
          newGrid[i][j] = 1;
          population++;
        }
      }
    }
  }

  return newGrid;
}

function countNeighbours(grid, x, y){
  let count = 0;

  // no wrap around
  // for (let i = y-1; i <= y+1; i++) {
  //   for (let j = x-1; j <= x+1; j++) {
  //     if ((i >= 0) && (i <= grid.length-1)) {
  //       if ((j >= 0) && (j <= grid[0].length-1)) {
  //         if (((i != y) || (j != x)) && (grid[i][j] == 1)) {
  //           count++;
  //         }
  //       }
  //     }
  //   }
  // }

  // wrap around
  for (let i = y-1; i <= y+1; i++) {
    for (let j = x-1; j <= x+1; j++) {

      let row = (i + grid.length) % grid.length;
      let col = (j + grid[0].length) % grid[0].length;

      if (((row != y) || (col != x)) && (grid[row][col] == 1)) {
        count++;
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
        eraseCell(canvas, j, i, cellSize);
      }
    }
  }
}

function drawCell(canvas, x, y, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(x*cellSize+1, y*cellSize+1, cellSize-2, cellSize-2);
}

function eraseCell(canvas, x, y, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.clearRect(x*cellSize+1, y*cellSize+1, cellSize-2, cellSize-2);
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

function toggleAction(checked){
  if (checked == true) {
    action = "delete";
    document.getElementById('deleteText').style.opacity = 1.0;
    document.getElementById('addText').style.opacity = 0.5;
  }
  else if (checked == false){
    action = "add";
    document.getElementById('addText').style.opacity = 1.0;
    document.getElementById('deleteText').style.opacity = 0.5;
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
    displayGeneration(generation);
    displayPopulation(population);
  }

  requestAnimationFrame(mainLoop);
}

function displayGeneration(generation){
  document.getElementById("generationCount").innerHTML = "Generation: " + generation.toString();
}

function countCells(grid){
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 1) {
        count++;
      }
    }
  }

  return count;
}

function displayPopulation(population){
  document.getElementById("populationCount").innerHTML = "Population: " + population.toString();
}

function getMousePos(canvas, event){
  let rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function locateCell(mousePos){
  let x = Math.floor((mousePos.x-2) / cellSize);
  let y = Math.floor((mousePos.y-2) / cellSize);

  return {
    x: x,
    y: y
  };
}

function flipCell(grid, x, y){
  let newGrid = grid;

  if (newGrid[y][x] == 1) {
    newGrid[y][x] = 0;
  }
  else if (newGrid[y][x] == 0) {
    newGrid[y][x] = 1;
  }

  return newGrid;
}

function addCell(grid, x, y){
  let newGrid = grid;

  if (newGrid[y][x] == 0) {
    newGrid[y][x] = 1;
    population++;
  }

  return newGrid;
}

function deleteCell(grid, x, y){
  let newGrid = grid;

  if (newGrid[y][x] == 1) {
    newGrid[y][x] = 0;
    population--;
  }

  return newGrid;
}

function initializeEvents(){

  document.getElementById("pauseButton").addEventListener("click", () => {
    togglePause();
  })

  document.getElementById("switchInput").addEventListener("click", () => {
    let checked = document.getElementById("switchInput").checked;
    toggleAction(checked);
  })

  canvas.addEventListener("mousedown", (event) => {
    if (paused == true) {
      let mousePos = getMousePos(canvas, event);
      let index = locateCell(mousePos);

      if (action == "add") {
        grid = addCell(grid, index.x, index.y);
      }
      else if (action == "delete"){
        grid = deleteCell(grid, index.x, index.y);
      }

      mouseDown = true;
      drawGrid(canvas, grid, cellSize);
      displayPopulation(population);
    }
  })

  canvas.addEventListener("mousemove", (event) => {
    if (paused == true && mouseDown == true) {
      let mousePos = getMousePos(canvas, event);
      let index = locateCell(mousePos);

      if (action == "add") {
        grid = addCell(grid, index.x, index.y);
      }
      else if (action == "delete"){
        grid = deleteCell(grid, index.x, index.y);
      }

      drawGrid(canvas, grid, cellSize);
      displayPopulation(population);
    }
  })

  canvas.addEventListener("mouseup", (event) => {
    if (paused == true) {
      mouseDown = false;
    }
  })
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
  maxFPS = 60;
  action = "add"
  population = 0;

  initializeEvents();
}

let generation;
let canvas;
let cellSize;
let grid;
let paused;
let lastRender;
let maxFPS;
let mouseDown = false;
let action;
let population;

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
displayPopulation(population);

drawGrid(canvas, grid, cellSize);

requestAnimationFrame(mainLoop);