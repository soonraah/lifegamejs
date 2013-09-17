var field = {
    nRows: 1,
    nColumns: 1,
    cells: [],
    initialize: function(numRows, numColumns, rate) {
        this.nRows = numRows;
        this.nColumns = numColumns;
        for (var i = 0; i < this.nRows * this.nColumns; ++i) {
            var cell = new Cell();
            if (Math.random() < rate) {
                cell.born([]);
            } else {
                cell.die();
            }
            this.cells.push(cell);
        }
    },
    indexToRow: function(index) {
        return Math.floor(index / this.nColumns);
    },
    indexToColumn: function(index) {
        return index % this.nColumns;
    },
    rowColumnToIndex: function(row, column) {
        var r = row;
        if (r < 0) {
            r += this.nRows;
        } else if (r >= this.nRows) {
            r = r - this.nRows;
        }
        var c = column;
        if (c < 0) {
            c += this.nColumns;
        } else if (c >= this.nColumns) {
            c = c - this.nColumns;
        }
        return r * this.nColumns + c;
    },
    update: function() {
        newCells = []
        for (var r = 0; r < this.nRows; ++r) {
            for (var c = 0; c < this.nColumns; ++c) {
                var arounds = this.getArounds(r, c);
                var newCell = new Cell();
                newCell.goNextGeneration(arounds);
                newCells.push(newCell);
            }
        }
        this.cells = newCells;
    },
    getArounds: function(row, column) {
        var arounds = [];
        for (var r = -1; r <= 1; ++r) {
            for (var c = -1; c <= 1; ++c) {
                if (r == 0 && c == 0) {
                    continue;
                }
                var index = this.rowColumnToIndex(row + r, column + c);
                arounds.push(this.cells[index]);
            }
        }
        return arounds;
    }
};