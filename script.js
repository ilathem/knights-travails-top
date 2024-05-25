/** 
  Builds a 3d array that contains the adjacency list for all possible moves the 
  knight can take from each square on the chess board.
  Returns array[x][y][k], where
  x = board row
  y = board column
  k = index to the tuple that the knight can go to from [x, y].
  So for a vertex [x, y], there exists an array of vertices adjacent to it, 
  accessed with k.
*/
const buildAdjList = () => {
  const boardLength = 8;
  const list = new Array(boardLength);
  for (let i = 0; i < boardLength; i++) {
    list[i] = new Array(boardLength);
    for (let j = 0; j < boardLength; j++) {
      list[i][j] = new Array();
      list[i][j].push(...getPossibleMoves(i, j));
    }
  }
  return list;
};

/** Returns array of all possible moves from input coordinates. */
const getPossibleMoves = (x, y) => {
  const possibleMoves = [];
  // try to go up 1 left 2
  let nextY = y + 1;
  let nextX = x - 2;
  if (nextY > 0 && nextX > 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go up 2 left 1
  nextY = y + 2;
  nextX = x - 1;
  if (nextY > 0 && nextX > 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go up 2 right 1
  nextY = y + 2;
  nextX = x + 1;
  if (nextY > 0 && nextX > 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go up 1 right 2
  nextY = y + 1;
  nextX = x + 2;
  if (nextY > 0 && nextX > 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go down 1 left 2
  nextY = y - 1;
  nextX = x - 2;
  if (nextY > 0 && nextX > 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go down 2 left 1
  nextY = y - 2;
  nextX = x - 1;
  if (nextY > 0 && nextX > 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go down 1 right 2
  nextY = y - 1;
  nextX = x + 2;
  if (nextY > 0 && nextX > 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go down 2 right 1
  nextY = y - 2;
  nextX = x + 1;
  if (nextY > 0 && nextX > 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  return possibleMoves;
};

const list = buildAdjList();
console.log("Possible moves from (0, 0) are...");
console.log(list[0][0]);
console.log("Possible moves from (3, 3) are...");
console.log(list[3][3]);
console.log("Possible moves from (7, 7) are...");
console.log(list[7][7]);
