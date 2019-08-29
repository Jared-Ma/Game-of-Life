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


function countNeighbours(grid, x, y){
  let count = 0;

  if (wrap == true) {

    for (let i = y-1; i <= y+1; i++) {
      for (let j = x-1; j <= x+1; j++) {

        let row = (i + grid.length) % grid.length;
        let col = (j + grid[0].length) % grid[0].length;

        if (((row != y) || (col != x)) && (grid[row][col] == 1)) {
          count++;
        }
      }
    }
  }

  else if (wrap == false) {

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
  }

  return count;
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