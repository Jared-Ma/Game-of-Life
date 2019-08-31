function Patterns(){
  this.stillLifes = {
    block: [
      [1, 1],
      [1, 1]
    ],
    beehive: [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 1, 1, 0]
    ]
  }

  this.spaceships = {
    glider: [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1]
    ]
  }


  this.add = function(pattern, grid, x, y){
    for (let i = 0; i < pattern.length; i++) {
      for (let j = 0; j < pattern[0].length; j++) {
        if (pattern[i][j] == 1) {
          addCell(grid, x + j, y + i);
        }
      }
    }

    drawGrid(mainCanvas, grid, cellSize);
  }
}