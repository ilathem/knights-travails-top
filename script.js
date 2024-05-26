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

/**
 * Get all paths from one location to another.
 * currentLocation = [x, y] starting location.
 * destination = [x, y] where you want to go.
 * returns array of all possible paths.
 */
const getPaths = (currentLocation, destination) => {
  const list = buildAdjList(); // get adjacency list
  const paths = []; // an array of all paths
  // list of vertices from current location
  const currentVertexAdjList = list[currentLocation[0]][currentLocation[1]];
  // for each vertex in the adjacency list
  for (let i = 0; i < currentVertexAdjList.length; i++) {
    // create a new array representing a path continuing from the starting
    // location to the first vertex
    const path = [currentLocation, currentVertexAdjList[i]];
    let vertexNum = 0; // for keeping track of the current vertex in the adjacency list
    let lastVisitedVertex = path[path.length - 1]; // the vertex at the end of the path
    let nextNode = list[lastVisitedVertex[0]][lastVisitedVertex[1]][vertexNum]; // the next candidate vertex to put on the path
    for (
      vertexNum;
      vertexNum < list[lastVisitedVertex[0]][lastVisitedVertex[1]].length;
      vertexNum++
    ) {
      nextNode = list[lastVisitedVertex[0]][lastVisitedVertex[1]][vertexNum]; // the next candidate vertex to put on the path
      if (path.contains(nextNode)) continue; // if we've already visited that vertex, skip it
      if (nextNode === destination) {
        path.push(nextNode);
      }
    }
  }
};

const getPathsRec = (curr, dest) => {
  const list = buildAdjList();
  const paths = [];
  for (let i = 0; i < list[curr[0]][curr[1]].length; i++) {
    const path = [curr];
    getPathRec(list, path, list[curr[0]][curr[i]][i], dest);
    paths.push(path);
  }
  console.log("\n\npaths:");
  paths.forEach((path) => {
    console.log(path);
  });
};

const containsDuplicates = array => {
  const seen = {};
  return array.some(elem => {
    if (seen.hasOwnProperty(elem)) return true;
    seen[elem] = false
  });
}

const containsTarget = (array, target) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].toString() === target.toString()) {
      console.log(array[i].toString());
      console.log(target.toString());
      return true;
    }
  }
  return false;
}

// todo for next:
// for each vertex in the list of the current vertex's adjacency list,
// before making the recursive call to the iterator's vertex, make a
// new path, containing everything up to that point, and after the recursive
// call, if that path ends in the destination, add that path to the list of 
// paths, so that we make get as many paths as possible

const getPathRec = (list, path, vertex, destination) => {
  console.log("\n\n");
  console.log("vertex, path, destination:");
  console.log(vertex, path, destination);
  console.log("path includes destination? ", containsTarget(path, destination));
  let duplicate = containsDuplicates(path);
  console.log("contains duplicate entries? ", duplicate);
  if (duplicate) return null;
  if (containsTarget(path, vertex) || containsTarget(path, destination)) return null;
  path.push(vertex);
  console.log(list[vertex[0]][vertex[1]]);
  for (let i = 0; i < list[vertex[0]][vertex[1]].length; i++) {
    getPathRec(list, path, list[vertex[0]][vertex[1]][i], destination);
  }
};

const test = () => {
  const array = [
    [3, 7],
    [1, 6],
    [0, 4],
    [2, 5],
    [0, 6],
    [2, 7],
    [0, 6],
    [2, 5],
    [1, 7],
    [0, 5],
    [1, 7],
    [3, 6],
    [1, 7],
    [2, 5],
    [3, 7],
  ];
  console.log(containsTarget(array, [1, 6]));
  // const seen = {};
  // return array.some(elem => {
  //   if (seen.hasOwnProperty(elem)) {
  //     return true
  //   }
  //   else return (seen[elem] = false);
  // })
};

getPathsRec([0, 0], [1, 2]);
// test();
