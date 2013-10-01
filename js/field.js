function Field() {
    this.nRows = 1;
    this.nColumns = 1;
    this.cells = [];
    this.ruleId = 1;
    this.initialize = function(numRows, numColumns, rate, ruleId) {
        this.nRows = numRows;
        this.nColumns = numColumns;
        this.cells = [];
        for (var i = 0; i < this.nRows * this.nColumns; ++i) {
            var cell = new Cell(Math.random() < rate);
            this.cells.push(cell);
        }
        this.ruleId = ruleId;
    };
    this.indexToRow = function(index) {
        return Math.floor(index / this.nColumns);
    };
    this.indexToColumn = function(index) {
        return index % this.nColumns;
    };
    this.rowColumnToIndex = function(row, column) {
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
    };
    this.update = function() {
        for (var r = 0; r < this.nRows; ++r) {
            for (var c = 0; c < this.nColumns; ++c) {
                var arounds = this.getArounds(r, c);
                this.cells[this.rowColumnToIndex(r, c)].predict(arounds, this.ruleId);
            }
        }
        for (var i = 0; i < this.cells.length; ++i) {
            this.cells[i].changeGeneration();
        }
    };
    this.getArounds = function(row, column) {
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
    };
};