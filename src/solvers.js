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
window.findSolution = function(row, n, board, validator, cb) {
  if (row === n) {
    return cb();
  }
  for (let i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if (!board[validator]()) {
      let result = findSolution(row + 1, n, board, validator, cb);
      if (result) {
        return result;
      }
    }
    board.togglePiece(row, i);
  }
};

window.findNRooksSolution = function(n) {
  const board = new Board({ n });
  return findSolution(0, n, board, 'hasAnyRooksConflicts', () => {
    return _.map(board.rows(), row => {
      return row.slice();
    });
  });
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let counter = 0;
  const board = new Board({ n });
  let solution = findSolution(0, n, board, 'hasAnyRooksConflicts', () => {
    counter++;
  });
  return counter;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  const board = new Board({ n });
  // debugger;
  return (
    findSolution(0, n, board, 'hasAnyQueensConflicts', () => {
      return _.map(board.rows(), row => {
        // debugger;
        return row.slice();
      });
    }) || board.rows()
  );
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let counter = 0;
  var board = new Board({ n });
  let solution = findSolution(0, n, board, 'hasAnyQueensConflicts', () => {
    counter++;
  });
  return counter;
};
