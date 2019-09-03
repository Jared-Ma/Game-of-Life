function createCanvas(width, height){
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  let main = document.getElementById("main");
  main.appendChild(canvas);

  let header = document.getElementById("mainHeader");
  header.style.width = (canvas.width+2).toString() + "px";

  return canvas;
}


function drawBorders(canvas, grid, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#9e9e9e";
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
  ctx.strokeStyle = "#9e9e9e";
  ctx.lineWidth = 2;

  drawBorders(canvas, grid, cellSize);
  
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
}


function clearGridLines(canvas, grid, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.clearRect(1, 1, grid[0].length*cellSize-2, grid.length*cellSize-2);
}


function drawCell(canvas, x, y, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
}


function eraseCell(canvas, x, y, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.clearRect(x*cellSize, y*cellSize, cellSize, cellSize);
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


function writeGeneration(generation){
  document.getElementById("generationCount").innerHTML = "Generation: " + generation.toString();
}


function writePopulation(population){
  document.getElementById("populationCount").innerHTML = "Population: " + population.toString();
}