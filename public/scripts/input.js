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


function reset(){
  prevGrids = [];
  grid = createGrid(grid[0].length, grid.length);
  drawGrid(mainCanvas, grid, cellSize);
  generation = 0;
  population = 0;
  writeGeneration(generation);
  writePopulation(population);
}


function toggleAction(){
  if (action == "add") {
    action = "delete";
    document.getElementById('deleteText').style.opacity = 1.0;
    document.getElementById('addText').style.opacity = 0.5;
  }
  else if (action == "delete"){
    action = "add";
    document.getElementById('addText').style.opacity = 1.0;
    document.getElementById('deleteText').style.opacity = 0.5;
  }
}


function toggleWrap(){
  if (wrap == true) {
    wrap = false;
    document.getElementById('offWrapText').style.opacity = 1.0;
    document.getElementById('onWrapText').style.opacity = 0.5;
  }
  else if (wrap == false){
    wrap = true;
    document.getElementById('onWrapText').style.opacity = 1.0;
    document.getElementById('offWrapText').style.opacity = 0.5;
  }
}


function toggleGridLines(){
  if(gridLines == true){
    gridLines = false;
    clearGridLines(subCanvas, grid, cellSize);
    document.getElementById('offLinesText').style.opacity = 1.0;
    document.getElementById('onLinesText').style.opacity = 0.5;
  }
  else if (gridLines == false){
    gridLines = true;
    drawGridLines(subCanvas, grid, cellSize);
    document.getElementById('onLinesText').style.opacity = 1.0;
    document.getElementById('offLinesText').style.opacity = 0.5;
  }
}


function updateFPS(){
  maxFPS = document.getElementById("fpsInput").value;
}


function updateCellSize(){
  let newCellSize = document.getElementById("cellSizeInput").value;
  let newGrid = createGrid(mainCanvas.width/newCellSize, mainCanvas.height/newCellSize);

  for (let i = 0; i < Math.min(newGrid.length, grid.length); i++) {
    for (let j = 0; j < Math.min(newGrid[0].length, grid[0].length); j++) {
      newGrid[i][j] = grid[i][j];
    }
  }

  prevGrids = [];
  cellSize = newCellSize;
  // cellSize = document.getElementById("cellSizeInput").value;
  grid = newGrid;
  drawGrid(mainCanvas, grid, cellSize);
}


function getMousePos(canvas, event){
  let rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}


function beginDrawInput(event){
  if (paused == true) {
    let mousePos = getMousePos(subCanvas, event);
    let index = locateCell(mousePos);

    if (action == "add") {
      grid = addCell(grid, index.x, index.y);
    }
    else if (action == "delete"){
      grid = deleteCell(grid, index.x, index.y);
    }

    mouseDown = true;
    prevGrids[generation] = grid;
    drawGrid(mainCanvas, grid, cellSize);
    writePopulation(population);
  }
}


function drawInput(event){
  if (paused == true && mouseDown == true) {
    let mousePos = getMousePos(subCanvas, event);
    let index = locateCell(mousePos);

    if (action == "add") {
      grid = addCell(grid, index.x, index.y);
    }
    else if (action == "delete"){
      grid = deleteCell(grid, index.x, index.y);
    }

    prevGrids[generation] = grid;
    drawGrid(mainCanvas, grid, cellSize);
    writePopulation(population);
  }
}


function endDrawInput(event){
  if (paused == true) {
    mouseDown = false;
  }
}


function nextState(){
  prevGrids[generation] = grid;
  generation++;

  // Saves drawings in a generation
  if (prevGrids[generation]) {
    grid = prevGrids[generation];
  }
  else {
    grid = updateGrid();
  }

  drawGrid(mainCanvas, grid, cellSize);
  writeGeneration(generation);
  writePopulation(population);
}


function prevState(){
  if (generation > 0) {
    generation--;
    grid = prevGrids[generation];
    drawGrid(mainCanvas, grid, cellSize);
    writeGeneration(generation);
    writePopulation(population);
  }
}


function initializeEvents(){
  document.getElementById("pauseButton").addEventListener("click", () => togglePause());

  document.getElementById("resetButton").addEventListener("click", () => reset());

  document.getElementById("forwardButton").addEventListener("click", () => nextState());

  document.getElementById("backwardButton").addEventListener("click", () => prevState());

  document.getElementById("actionInput").addEventListener("click", () => toggleAction());

  document.getElementById("wrapInput").addEventListener("click", () => toggleWrap());

  document.getElementById("linesInput").addEventListener("click", () => toggleGridLines());

  document.getElementById("fpsInput").addEventListener("input", () => updateFPS());

  document.getElementById("cellSizeInput").addEventListener("input", () => updateCellSize());

  subCanvas.addEventListener("mousedown", (event) => beginDrawInput(event));

  subCanvas.addEventListener("mousemove", (event) => drawInput(event));

  subCanvas.addEventListener("mouseup", (event) => endDrawInput(event));
}