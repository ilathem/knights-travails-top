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
  if (nextY >= 0 && nextX >= 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go up 2 left 1
  nextY = y + 2;
  nextX = x - 1;
  if (nextY >= 0 && nextX >= 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go up 2 right 1
  nextY = y + 2;
  nextX = x + 1;
  if (nextY >= 0 && nextX >= 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go up 1 right 2
  nextY = y + 1;
  nextX = x + 2;
  if (nextY >= 0 && nextX >= 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go down 1 left 2
  nextY = y - 1;
  nextX = x - 2;
  if (nextY >= 0 && nextX >= 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go down 2 left 1
  nextY = y - 2;
  nextX = x - 1;
  if (nextY >= 0 && nextX >= 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go down 1 right 2
  nextY = y - 1;
  nextX = x + 2;
  if (nextY >= 0 && nextX >= 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  // try to go down 2 right 1
  nextY = y - 2;
  nextX = x + 1;
  if (nextY >= 0 && nextX >= 0 && nextY < 8 && nextX < 8)
    possibleMoves.push([nextX, nextY]);
  return possibleMoves;
};

const dijkstra = (start) => {
  const [startX, startY] = start;
  const adjList = buildAdjList(); // edjes for each node
  // Initialize arrays for keeping track of traversal
  const distances = new Array(8); // distances from start to each node
  const visitedNodes = new Array(8); // keep track of unvisited nodes
  const previousNodes = new Array(8); // keep track of the node before to get shortest path
  for (let i = 0; i < distances.length; i++) {
    distances[i] = new Array(8).fill(Infinity); // all are inifinitely far
    visitedNodes[i] = new Array(8).fill(false); // all are unvisited
    previousNodes[i] = new Array(8).fill(null); // all are empty first
  }
  distances[startX][startY] = 0; // start at first node, so distance is 0
  const queue = [start]; // for keeping track of where we are
  while (queue.length > 0) {
    const [currentNodeX, currentNodeY] = queue.shift(); // remove from front
    // if visited already, skip
    if (visitedNodes[currentNodeX][currentNodeY]) continue;
    // mark as visited
    visitedNodes[currentNodeX][currentNodeY] = true;
    // check neighbors
    adjList[currentNodeX][currentNodeY].forEach((neighbor) => {
      // get tentative distance to neighbor through currnet node (every edge is weight 1)
      const tentative_distance = distances[currentNodeX][currentNodeY] + 1; 
      if (
        !visitedNodes[neighbor[0]][neighbor[1]] && // if neighbor hasn't been visited
        tentative_distance < distances[neighbor[0]][neighbor[1]] // and the tentative distance is smaller than what we already have
      ) {
        // if tentative distance is smaller, update it
        distances[neighbor[0]][neighbor[1]] = tentative_distance;
        // enqueue neighbor for potential visitation in the future
        queue.unshift(neighbor);
        // add previous node to neighbor's previous node array
        previousNodes[neighbor[0]][neighbor[1]] = [currentNodeX, currentNodeY];
      }
    });
  }
  return { distances, previousNodes };
};

const runner = (start, end) => {
  const { distances, previousNodes } = dijkstra(start);
  const [ endX, endY ] = end;
  const route = [];
  let node = previousNodes[endX][endY];
  route.unshift(end);
  while (node) {
    route.unshift(node);
    node = previousNodes[node[0]][node[1]];
  }
  console.log(`Moving from [${start}] to [${end}]`);
  console.log(`You made it in ${route.length} moves!, here's your path:`);
  route.forEach(node => console.log(node));
  console.log(distances[endX][endY])
};

// runner([0, 0], [1, 2]);
// runner([0, 0], [3, 3]);
// runner([0, 0], [7, 7]);
runner([3, 3], [4, 3]);
