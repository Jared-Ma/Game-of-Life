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


function locateCell(mousePos){
  let x = Math.floor((mousePos.x-2) / cellSize);
  let y = Math.floor((mousePos.y-2) / cellSize);

  return {
    x: x,
    y: y
  };
}