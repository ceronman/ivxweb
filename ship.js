function Ship() {
    this.MAX_SPEED = 10;
    this.MAX_FRAME_OFFSET = 3;
    this.speed = 0;
    this.loadFrames();
};

Ship.prototype = new Sprite();

Ship.prototype.loadFrames = function () {
    var i, frame;
    this.frames = [];

    for (i=1; i<=7; i++) {
        frame = Loader.loadImage("images/ship" + i + ".png");
        this.frames.push(frame);
    }
    this.frameOffset = 0;
    this.updateFrame();
}

Ship.prototype.init = function (display) {
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
    this.position.x = Math.max(this.position.x, 0);
    this.position.x = Math.min(this.position.x, 320);

    this.updateFrame();
};

Ship.prototype.updateFrame = function () {
    this.frame = this.frames[3 + this.frameOffset];
}
