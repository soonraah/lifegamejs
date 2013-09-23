var CELL_INTERVAL = 10;
var CELL_MARGIN = 1;

function LifeGame() {
    this.gameField = null;
    this.nRows = 1;
    this.nColumns = 1;
    this.rects = null;
    this.svg = null;
    this.initialize = function(height, width, aliveRate, svg) {
        this.gameField = new Field();
        this.nRows = Math.floor(height / CELL_INTERVAL);
        this.nColumns = Math.floor(width / CELL_INTERVAL);
        this.gameField.initialize(this.nRows, this.nColumns, aliveRate);
        this.svg = svg;
        this.initSvg();
    };
    this.initSvg = function() {
        rects = svg
            .selectAll("rect")
            .data(this.gameField.cells)
            .enter()
            .append("rect");
        
        var gf = this.gameField;
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
                return d.color.getRgbaString();
            });
    };
    this.updateSvg = function() {
        svg
            .selectAll("rect")
            .data(this.gameField.cells)
            .transition()
            .duration(0)
            .attr("fill", function(d) {
                // console.log(d.color.getRgbaString());
                return d.color.getRgbaString();
            });
    };
    this.start = function() {
        var lg = this;
        setInterval(function() {
            //lg.gameField = lg.gameField.createNextGeneration();
            lg.gameField.update();
            lg.updateSvg();
            console.log("step.");
        }, 2000);
    };
};
