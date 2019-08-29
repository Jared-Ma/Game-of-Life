function createCanvas(width, height){
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.border = "1px #bbbbbb solid";

  let main = document.getElementById("main");
  main.appendChild(canvas);

  return canvas;
}


function drawBorders(canvas, grid, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#bbbbbb";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(grid[0].length*cellSize, 0);
  ctx.lineTo(grid[0].length*cellSize, grid.length*cellSize);
  ctx.lineTo(0, grid.length*cellSize);
  ctx.lineTo(0, 0);
  ctx.stroke();
}


function drawGridLines(canvas, grid, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#bbbbbb";
  ctx.lineWidth = 2;

  for (let i = 1; i <= grid.length-1; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i*cellSize);
    ctx.lineTo(grid[0].length*cellSize, i*cellSize);
    ctx.stroke();
  }

  for (let j = 1; j <= grid[0].length-1; j++) {
    ctx.beginPath();
    ctx.moveTo(j*cellSize, 0);
    ctx.lineTo(j*cellSize, grid.length*cellSize);
    ctx.stroke();
  }

  drawBorders(canvas, grid, cellSize);
}


function clearGridLines(canvas, grid, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = document.getElementsByTagName("body")[0].style.backgroundColor;
  ctx.lineWidth = 2;

  for (let i = 1; i <= grid.length-1; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i*cellSize);
    ctx.lineTo(grid[0].length*cellSize, i*cellSize);
    ctx.stroke();
  }

  for (let j = 1; j <= grid[0].length-1; j++) {
    ctx.beginPath();
    ctx.moveTo(j*cellSize, 0);
    ctx.lineTo(j*cellSize, grid.length*cellSize);
    ctx.stroke();
  }

  drawBorders(canvas, grid, cellSize);
}


function drawCell(canvas, x, y, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(x*cellSize+1, y*cellSize+1, cellSize-2, cellSize-2);
}


function eraseCell(canvas, x, y, cellSize){
  let ctx = canvas.getContext("2d");
  // ctx.fillStyle = "black";
  ctx.clearRect(x*cellSize+1, y*cellSize+1, cellSize-2, cellSize-2);

  // either fill opposite color or clear
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


function clearGrid(){
  grid = createGrid(grid[0].length, grid.length);
  drawGrid(canvas, grid, cellSize);
}


function writeGeneration(generation){
  document.getElementById("generationCount").innerHTML = "Generation: " + generation.toString();
}


function writePopulation(population){
  document.getElementById("populationCount").innerHTML = "Population: " + population.toString();
}