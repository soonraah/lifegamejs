var MIN_COLOR = 64;
var TO_DIE = 0;
var TO_EXIST = 1;
var TO_BORN = 2;
var RULE = [TO_DIE, TO_DIE, TO_EXIST, TO_BORN, TO_DIE, TO_DIE, TO_DIE, TO_DIE, TO_DIE];

function Cell() {
    this.isAlive = true;
    this.colorR = 0;
    this.colorG = 0;
    this.colorB = 0;
    this.alpha = 1.0;
    this.getRgbString = function() {
        var s = "rgba(" +
            this.colorR + ", " +
            this.colorG + ", " +
            this.colorB + ", " +
            this.alpha + ")";
        console.log(s);
        return s;
    };
    this.die = function() {
        this.isAlive = false;
        this.colorR = 0;
        this.colorG = 0;
        this.colorB = 0;
        this.alpha = 0.0;
    };
    this.born = function(cells) {
        this.isAlive = true;
        this.colorR = 0;
        this.colorG = 240;
        this.colorB = 0;
        this.alpha = 1.0;
    };
    this.checkSurbive = function(nAliveAround) {
        return RULE[nAliveAround];
    };
    this.goNextGeneration = function(cells) {
        var nAliveAround = 0;
        for (var i = 0; i < cells.length; ++i) {
            if (cells[i].isAlive) {
                nAliveAround++;
            }
        }
        switch (this.checkSurbive(nAliveAround)) {
            case TO_DIE:
                if (this.isAlive) {
                    this.die();
                }
                break;
            case TO_BORN:
                console.log("x");
                if (!this.isAlive) {
                    this.born(cells);
                }
                break;
            case TO_EXIST:
            default:
                console.log("x");
                break;
        }
    };
};
