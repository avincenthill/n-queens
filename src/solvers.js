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
  var newBoard = new Board({ n });
  for (let i = 0; i < n; i++) {
    newBoard.togglePiece(i, i);
  }
  let solution = newBoard.getMatrix();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  const newBoard = new Board({ n });
  let solutions = [];
  let matrix = newBoard.getMatrix();

  //inner recursive function
  let recurse = function(rowNum, coordinateArray, usedColumnNums) {
    //recursive base case (last row)
    if (rowNum === n - 1) {
      for (let y = 0; y < n; y++) {
        if (!usedColumnNums.includes(y)) {
          coordinateArray.push([rowNum, y]);
        }
      }
      //push finished array of coordinate tuples
      solutions.push(coordinateArray);
    } else {
      for (let y = 0; y < n; y++) {
        if (!usedColumnNums.includes(y)) {
          let newusedColumnNums = usedColumnNums.concat(y);
          coordinateArray.push([rowNum, y]);
          recurse(rowNum + 1, coordinateArray, newusedColumnNums);
        }
      }
    }
  };
  //invoke recursive inner function on first row, with no coordinates or used columns
  recurse(0, [], []);
  let solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var newBoard = new Board({ n });
  let solution;
  console.log(
    'Single solution for ' + n + ' queens:',
    JSON.stringify(solution)
  );
  solution = newBoard.getMatrix();
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
