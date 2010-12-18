function Ship() {
    this.speed = 0;
    this.frameOffset = 0;
};

Ship.prototype = new Sprite();

Ship.prototype.frames = [
    Loader.addImage("images/ship-left-max.png"),
    Loader.addImage("images/ship-left-mid.png"),
    Loader.addImage("images/ship-left-min.png"),
    Loader.addImage("images/ship-center.png"),
    Loader.addImage("images/ship-right-min.png"),
    Loader.addImage("images/ship-right-mid.png"),
    Loader.addImage("images/ship-right-max.png"),
];

Ship.prototype.init = function (display) {
    this.MAX_SPEED = 10;
    this.MAX_FRAME_OFFSET = 3;
    this.CENTER_FRAME = 3;

    this.updateFrame();

    this.MIN_X = this.frame.width/2;
    this.MAX_X = display.width - this.frame.width/2;

    this.position.x = display.width/2;
    this.position.y = display.height - this.frame.height/2;
};

Ship.prototype.update = function (input) {
    var accelerated = false;

    if (input.keys[KEYS.RIGHT]) {
        this.speed = Math.min(this.speed+1, this.MAX_SPEED);
        this.frameOffset = Math.min(this.frameOffset+1, this.MAX_FRAME_OFFSET);
        accelerated = true;
    }

    if (input.keys[KEYS.LEFT]) {
        this.speed = Math.max(this.speed-1, -this.MAX_SPEED);
        this.frameOffset = Math.max(this.frameOffset-1, -this.MAX_FRAME_OFFSET);
        accelerated = true;
    }

    if (!accelerated) {
       this.speed += Math.sign(this.speed) * -1;
       this.frameOffset += Math.sign(this.frameOffset) * -1;
    }

    this.position.x += this.speed;
    this.position.x = Math.max(this.position.x, this.MIN_X);
    this.position.x = Math.min(this.position.x, this.MAX_X);

    this.updateFrame();
};

Ship.prototype.updateFrame = function () {
    this.frame = this.frames[this.CENTER_FRAME + this.frameOffset];
}
