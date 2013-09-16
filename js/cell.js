var MIN_COLOR = 64;
var TO_DIE = 0;
var TO_EXIST = 1;
var TO_BORN = 2;
var RULE = [TO_DIE, TO_DIE, TO_EXIST, TO_BORN, TO_DIE, TO_DIE, TO_DIE, TO_DIE, TO_DIE];

// セルの定義
var cell = {
    isAlive: true,
    row: -1,
    column: -1,
    colorR: 0,
    colorG: 255,
    colorB: 0,
    alpha: 1.0,
    getRgbString: function() {
        return "rgba(" +
            this.colorR + ", " +
            this.colorG + ", " +
            this.colorB + ", " +
            this.alpha + ")";
    },
    die: function() {
        this.isAlive = false;
        this.colorR = 0;
        this.colorG = 0;
        this.colorB = 0;
        this.alpha = 0.0;
    },
    born: function(cells) {
        this.isAlive = true;
        this.colorR = 0;
        this.colorG = 240;
        this.colorB = 0;
        this.alpha = 1.0;
    },
    checkSurbive: function(nAliveAround) {
        return RULE[nAliveAround];
    },
    goNextGeneration: function(cells) {
        var nAliveAround = 0;
        for (var i = 0; i < cells.length; ++i) {
            if (cells[i].isAlive) {
                nAliveAround++;
            }
        }
        switch (this.checkSurbive(nAliveAround)) {
            case TO_DIE:
                this.die;
                break;
            case TO_BORN:
                this.born(cells);
                break;
            case TO_EXIST:
            default:
                break;
        }
    }
};
