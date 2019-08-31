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
    document.getElementById('offText').style.opacity = 1.0;
    document.getElementById('onText').style.opacity = 0.5;
  }
  else if (wrap == false){
    wrap = true;
    document.getElementById('onText').style.opacity = 1.0;
    document.getElementById('offText').style.opacity = 0.5;
  }
}


function toggleGridLines(){
  if(gridLines == true){
    gridLines = false;
    clearGridLines(subCanvas, grid, cellSize);
  }
  else if (gridLines == false){
    gridLines = true;
    drawGridLines(subCanvas, grid, cellSize);
  }
}


function updateFPS(){
  maxFPS = document.getElementById("fpsInput").value;
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

    drawGrid(mainCanvas, grid, cellSize);
    writePopulation(population);
  }
}


function endDrawInput(event){
  if (paused == true) {
    mouseDown = false;
  }
}


function initializeEvents(){
  document.getElementById("pauseButton").addEventListener("click", () => togglePause());

  document.getElementById("clearButton").addEventListener("click", () => clearGrid());

  document.getElementById("actionInput").addEventListener("click", () => toggleAction());

  document.getElementById("wrapInput").addEventListener("click", () => toggleWrap());

  document.getElementById("linesInput").addEventListener("click", () => toggleGridLines());

  document.getElementById("fpsInput").addEventListener("input", () => updateFPS());

  subCanvas.addEventListener("mousedown", (event) => beginDrawInput(event));

  subCanvas.addEventListener("mousemove", (event) => drawInput(event));

  subCanvas.addEventListener("mouseup", (event) => endDrawInput(event));
}