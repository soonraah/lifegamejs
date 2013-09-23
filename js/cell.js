var MIN_COLOR = 100;
var CENTER_COLOR = Math.round((255 + MIN_COLOR) / 2);
var HALF_COLOR_RANGE = (255 - MIN_COLOR) / 2;
var ADJAST_RATE = 0.2;
var TO_DIE = 0;
var TO_EXIST = 1;
var TO_BORN = 2;
// var RULE = [TO_DIE, TO_DIE, TO_EXIST, TO_BORN, TO_DIE, TO_DIE, TO_DIE, TO_DIE, TO_DIE];
var RULE = [TO_DIE, TO_EXIST, TO_EXIST, TO_EXIST, TO_BORN, TO_DIE, TO_DIE, TO_DIE, TO_DIE];

function Color(red, green, blue, alpha) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
    this.setRandomly = function() {
        this.red = Math.floor(Math.random() * (255 - MIN_COLOR)) + MIN_COLOR;
        this.green = Math.floor(Math.random() * (255 - MIN_COLOR)) + MIN_COLOR;
        this.blue = Math.floor(Math.random() * (255 - MIN_COLOR)) + MIN_COLOR;
        this.alpha = 1.0;
    };
    this.adjustColorValue = function(value) {
        var ret = 0;
        if (value < CENTER_COLOR) {
            ret = value - (value - MIN_COLOR) * ADJAST_RATE;
            ret = Math.max(Math.round(ret), MIN_COLOR);
        } else {
            ret = value + (255 - value) * ADJAST_RATE;
            ret = Math.min(Math.round(ret), 255);
        }
        return ret;
    };
    this.mix = function(colors) {
        if (colors.length == 0) {
            this.setRandomly();
        } else {
            var sumR = 0;
            var sumG = 0;
            var sumB = 0;
            for (var i = 0; i < colors.length; ++i) {
                sumR += colors[i].red;
                sumG += colors[i].green;
                sumB += colors[i].blue;
            }
            this.red = this.adjustColorValue(sumR / colors.length);
            this.green = this.adjustColorValue(sumG / colors.length);
            this.blue = this.adjustColorValue(sumB / colors.length);
        }
        this.alpha = 1.0;
    };
    this.setColor = function(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    };
    this.setBy = function(other) {
        this.red = other.red;
        this.green = other.green;
        this.blue = other.blue;
        this.alpha = other.alpha;
    };
    this.getRgbaString = function() {
        var s = "rgba(" +
            this.red + ", " +
            this.green + ", " +
            this.blue + ", " +
            this.alpha + ")";
        //console.log(s);
        return s;
    };
}

function Cell(flagIsAlive) {
    this.isAlive = false;
    this.next = TO_DIE;
    this.color = new Color(0, 0, 0, 0.0);
    this.nextColor = new Color(0, 0, 0, 0.0);
    this.die = function() {
        this.isAlive = false;
    };
    this.born = function() {
        this.isAlive = true;
    };
    this.checkSurbive = function(nAliveAround) {
        return RULE[nAliveAround];
    };
    this.predict = function(cells) {
        var nAliveAround = 0;
        for (var i = 0; i < cells.length; ++i) {
            if (cells[i].isAlive) {
                nAliveAround++;
            }
        }
        // console.log("nAliveAround = " + nAliveAround);
        this.next = this.checkSurbive(nAliveAround);
        this.updateColor(cells);
    };
    this.changeGeneration = function() {
        switch (this.next) {
            case TO_DIE:
                this.die();
                break;
            case TO_BORN:
                this.born();
                break;
            case TO_EXIST:
            default:
                break;
        }
        this.color.setBy(this.nextColor);
    };
    this.getRandomColorValue = function() {
        return Math.floor(Math.random() * (255 - MIN_COLOR)) + MIN_COLOR;
    };
    this.updateColor = function(cells) {
        if (this.next == TO_BORN && !(this.isAlive)) {
            var colors = [];
            for (var i = 0; i < cells.length; ++i) {
                if (cells[i].isAlive) {
                    colors.push(cells[i].color);
                }
            }
            this.nextColor.mix(colors);
        } else if (this.next == TO_DIE && this.isAlive) {
            this.nextColor.setColor(0, 0, 0, 0.0);
        }
    };
    if (flagIsAlive) {
        this.next = TO_BORN;
        this.isAlive = false;
        this.updateColor([]);
        this.changeGeneration();
    } else {
        this.next = TO_DIE;
        this.isAlive = true;
        this.updateColor([]);
        this.changeGeneration();
    };
};
