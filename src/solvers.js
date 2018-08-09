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

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      newBoard.togglePiece(i, j);
      console.log(newBoard.hasAnyRooksConflicts());
      console.log(newBoard.getMatrix());
    }
  }

  let solutionCount = 1; //solutions.length;

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
