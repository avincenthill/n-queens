/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  //O(n) time complexity
  var newBoard = new Board({ n });
  for (let i = 0; i < n; i++) {
    newBoard.togglePiece(i, i);
  }
  let solution = newBoard.getMatrix();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, isQueens = false) {
  //O(n!) time complexity
  const newBoard = new Board({ n });
  let solutions = [];
  let matrix = newBoard.getMatrix();
  let newusedColumnNums = [];

  // if (n > 4) {
  //   return 0;
  // }

  //inner recursive function
  let recurse = function(x, coordinateArray, usedColumnNums) {
    //recursive base case (last row)
    if (x === n - 1) {
      for (let y = 0; y < n; y++) {
        if (!usedColumnNums.includes(y)) {
          coordinateArray.push([x, y]);
        }
      }
      //push finished array of coordinate tuples
      solutions.push(coordinateArray);
    } else {
      for (let y = 0; y < n; y++) {
        if (x === 0) {
          coordinateArray = [];
        }
        newusedColumnNums = usedColumnNums.concat(y);
        if (!usedColumnNums.includes(y)) {
          coordinateArray.push([x, y]);
          recurse(x + 1, coordinateArray, newusedColumnNums);
        }
      }
    }
  };
  //invoke recursive inner function on first row, with no coordinates or used columns
  recurse(0, [], []);

  let solutionCount = solutions.length;

  if (!isQueens) {
    console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  }

  if (isQueens) {
    return solutions;
  }
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // run variable queens and build first soln in solutions array that works
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let rookSolutions = window.countNRooksSolutions(n, true);
  let numQueenSolns = 0;
  if (n === 0) {
    return 0;
  }

  for (let i = 0; i < rookSolutions.length; i++) {
    let tempBoard = new Board({
      n: n
    });
    for (let j = 0; j < n; j++) {
      tempBoard.togglePiece(rookSolutions[i][j][0], rookSolutions[i][j][1]);
    }
    if (!tempBoard.hasAnyDiagonalConflicts()) {
      numQueenSolns++;
    }
  }

  return numQueenSolns;
};
