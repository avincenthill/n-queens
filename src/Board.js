// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {
  window.Board = Backbone.Model.extend({
    initialize: function(params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log(
          'Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:'
        );
        console.log(
          '\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: grey;'
        );
        console.log(
          '\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: grey;'
        );
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(
          this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)
        ) ||
        this.hasMinorDiagonalConflictAt(
          this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex)
        )
      );
    },

    hasAnyQueensConflicts: function() {
      return (
        this.hasAnyRooksConflicts() ||
        this.hasAnyMajorDiagonalConflicts() ||
        this.hasAnyMinorDiagonalConflicts()
      );
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex &&
        rowIndex < this.get('n') &&
        0 <= colIndex &&
        colIndex < this.get('n')
      );
    },

    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex, optionalMatrix) {
      let matrix = optionalMatrix || this.getMatrix();
      const row = matrix[rowIndex];
      let hasConflict = false;
      let counter = 0;
      row.forEach((rowEl, index) => {
        counter += rowEl;
        if (counter > 1) {
          hasConflict = true;
        }
      });
      return hasConflict;
    },

    getMatrix: function() {
      let matrix = [];
      for (key in this.attributes) {
        if (Array.isArray(this.attributes[key])) {
          matrix.push(this.attributes[key]);
        }
      }
      return matrix;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function(optionalMatrix) {
      let matrix = optionalMatrix || this.getMatrix();
      let hasConflict = false;
      for (let i = 0; i < matrix.length; i++) {
        hasConflict = this.hasRowConflictAt(i, matrix) || hasConflict;
      }
      return hasConflict;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let matrix = this.getMatrix();
      let tmatrix = math.transpose(matrix);
      return this.hasRowConflictAt(colIndex, tmatrix);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let matrix = this.getMatrix();
      let tmatrix = math.transpose(matrix);
      return this.hasAnyRowConflicts(tmatrix);
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(
      majorDiagonalColumnIndexAtFirstRow,
      optionalMatrix
    ) {
      let matrix = optionalMatrix || this.getMatrix();
      let n = this.attributes.n;
      let total = 0;
      if (
        majorDiagonalColumnIndexAtFirstRow >= n ||
        majorDiagonalColumnIndexAtFirstRow <= -n
      ) {
        return false;
      } else {
        for (let i = 0; i < n; i++) {
          if (matrix[i][i + majorDiagonalColumnIndexAtFirstRow] !== undefined) {
            total += matrix[i][i + majorDiagonalColumnIndexAtFirstRow];
          }
        }
      }
      return total > 1 ? true : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function(optionalMatrix) {
      let n = this.attributes.n;
      let matrix = optionalMatrix || this.getMatrix();
      let hasConflict = false;
      for (let i = -(n - 1); i < matrix.length; i++) {
        hasConflict = this.hasMajorDiagonalConflictAt(i, matrix) || hasConflict;
      }
      return hasConflict;
    },

    getMirrorMatrix: function(matrix) {
      let mirrorMatrix = [];
      for (array of matrix) {
        mirrorMatrix.push(array.reverse());
      }
      return mirrorMatrix;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let matrix = this.getMatrix();
      let mirrorMatrix = this.getMirrorMatrix(matrix);
      return this.hasMajorDiagonalConflictAt(
        minorDiagonalColumnIndexAtFirstRow,
        mirrorMatrix
      );
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let matrix = this.getMatrix();
      let mirrorMatrix = this.getMirrorMatrix(matrix);
      return this.hasAnyMajorDiagonalConflicts(mirrorMatrix);
    }

    /*--------------------  End of Helper Functions  ---------------------*/
  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };
})();
