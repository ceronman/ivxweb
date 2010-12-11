

function Ship() {
    var i, frame;
    this.frames = [];

    for (i=1; i<=7; i++) {
        frame = this.loadFrame("images/ship" + i + ".png");
        this.frames.push(frame);
    }
    this.frame = this.frames[0];
};

Ship.prototype = new Sprite();

Ship.prototype.init = function (display) {
    this.position.x = display.width/2;
    this.position.y = display.height - this.frame.height/2;
};

Ship.prototype.update = function (input) {
    if (input.keys[KEYS.LEFT]) {
        this.position.x -= 1;
    };

    if (input.keys[KEYS.RIGHT]) {
        this.position.x += 1;
    };
};
