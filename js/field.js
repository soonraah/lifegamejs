var field = {
    nRows: 1,
    nColumns: 1,
    cells: [],
    initialize: function(nRows, nColumns, rate) {
        this.nRows = nRows;
        this.nColumns = nColumns;
        for (var i = 0; i < nRows * nColumns; ++i) {
            var c = Object.create(cell);
            if (Math.random() < rate) {
                c.born([]);
            } else {
                c.die();
            }
            this.cells.push(c);
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
            r -= this.nRows;
        }
        var c = column;
        if (c < 0) {
            c += this.nColumns;
        } else if (c >= this.nColumns) {
            c -= this.nColumns;
        }
        return r * nColumns + c;
    },
    createNextGeneration: function() {
        var next = Object.create(this);
        next.initialize(this.nRows, this.nColumns, 0.0);
        
        for (var r = 0; r < this.nRows; ++r) {
            for (var c = 0; c < this.nColumns; ++c) {
                var arounds = getArounds(r, c);
                cells[rowColumnToIndex(r, c)].goNextGeneration(arounds);
            }
        }
        
        return next;
    },
    getArounds: function(row, column) {
        var arounds = [];
        for (var r = -1; r <= 1; ++r) {
            for (var c = -1; c <= 1; ++c) {
                if (r == 0 && c == 0) {
                    continue;
                }
                var index = rowColumnToIndex(row + r, column + c);
                arounds.push(cells[index]);
            }
        }
        return arounds;
    }
};