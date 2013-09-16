var CELL_INTERVAL = 10;
var CELL_MARGIN = 1;

var lifeGame = {
    gameField: null,
    nRows: 1,
    nColumns: 1,
    rects: null,
    svg: null,
    initialize: function(height, width, aliveRate, svg) {
        this.gameField = Object.create(field);
        this.nRows = Math.floor(height / CELL_INTERVAL);
        this.nColumns = Math.floor(width / CELL_INTERVAL);
        this.gameField.initialize(this.nRows, this.nColumns, aliveRate);
        this.svg = svg;
        this.updateSvg();
        
    },
    updateSvg: function() {
        rects = svg
            .selectAll("rect")
            .data(this.gameField.cells)
            .enter()
            .append("rect");
        
        var gf = this.gameField;
        var temp = [];
        rects
            .attr("x", function(d, i) {
                return gf.indexToColumn(i) * CELL_INTERVAL;
            })
            .attr("y", function(d, i) {
                return gf.indexToRow(i) * CELL_INTERVAL;
            })
            .attr("width", CELL_INTERVAL - CELL_MARGIN)
            .attr("height", CELL_INTERVAL - CELL_MARGIN)
            .attr("fill", function(d) {
                temp.push(d.isAlive);
                return d.getRgbString();
            });
        console.log(temp);
    },
    start: function() {
        var lg = this;
        
        setInterval(function() {
            lg.gameField = lg.gameField.createNextGeneration();
            lg.updateSvg();
            //console.log("step.");
        }, 2000);
    }
};
