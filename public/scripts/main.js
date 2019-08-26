function createCanvas(width, height){
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.border = "2px #bbbbbb solid";

  return canvas;
}

function updateCanvas(canvas){
  let body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);

  return;
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

  for (let i = 1; i < grid.length; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i*cellSize);
    ctx.lineTo(grid[0].length*cellSize, i*cellSize);
    ctx.stroke();
  }

  for (let j = 1; j < grid[0].length; j++) {
    ctx.beginPath();
    ctx.moveTo(j*cellSize, 0);
    ctx.lineTo(j*cellSize, grid.length*cellSize);
    ctx.stroke();
  }

  return;
}

function updateGrid(grid){
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

var generation = 0;
var canvas = createCanvas(800, 600);
const cellSize = 40;
var grid = createGrid(canvas.width/cellSize, canvas.height/cellSize);
drawGridLines(canvas, grid, cellSize);

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

setInterval(() => {
  grid = updateGrid(grid);
  drawGrid(canvas, grid, cellSize);
  updateCanvas(canvas);
}, 1000);
