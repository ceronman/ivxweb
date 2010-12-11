function Position() {
    this.x = 0;
    this.y = 0;
}

Position.prototype.moveTo = function (x, y) {
    this.x = x;
    this.y = y;
}


function Sprite() {
    this.position = new Position();
};

Sprite.prototype.draw = function (display) {
    var x = this.position.x - this.frame.width/2;
    var y = this.position.y - this.frame.height/2;
    display.context.drawImage(this.frame, x, y);
};
