function createCanvas(width, height){
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.border = "1px #bbbbbb solid";
  canvas.style.left = 0;
  canvas.style.top = 0;

  let main = document.getElementById("main");
  main.appendChild(canvas);

  return canvas;
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


function clearGridLines(canvas, grid, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.clearRect(1, 1, grid[0].length*cellSize-2, grid.length*cellSize-2);
}


function drawCell(canvas, x, y, cellSize){
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
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


function clearGrid(){
  grid = createGrid(grid[0].length, grid.length);
  drawGrid(mainCanvas, grid, cellSize);
}


function writeGeneration(generation){
  document.getElementById("generationCount").innerHTML = "Generation: " + generation.toString();
}


function writePopulation(population){
  document.getElementById("populationCount").innerHTML = "Population: " + population.toString();
}