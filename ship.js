function Ship(group, bulletGroup) {
    Sprite.call(this, [group]);

    this.bulletGroup = bulletGroup;
    this.speed = 0;
    this.frameOffset = 0;
    this.weapon = Missile;
};
inherit(Ship, Sprite);

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
    this.MAX_SPEED = 5;
    this.MAX_FRAME_OFFSET = 3;
    this.CENTER_FRAME = 3;

    this.updateFrame();

    this.MIN_X = 0;
    this.MAX_X = display.width - this.frame.width;

    this.position.x = display.width/2 - this.frame.width/2;
    this.position.y = display.height - this.frame.height;
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

    if (input.keys[KEYS.SPACE]) {
        this.shoot();
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
};

Ship.

Ship.prototype.shoot = function () {
    var bullet, pos = this.position;
    if (this.bulletGroup.empty()) {
        bullet = new this.weapon(this);
    }
};


function Bullet(ship) {
    Sprite.call(this, [ship.bulletGroup]);

    var point = this.startPosition(ship.getCenter());
    this.setCenter(point.x, point.y)
};
inherit(Bullet, Sprite);

Bullet.prototype.update = function (input) {
    this.position.y -= this.speed;
    this.speed += this.acceleration;

    if (this.position.y < 0) {
        this.kill();
    }
};


function Missile(ship) {
    Bullet.call(this, ship);

    this.speed = -3;
    this.acceleration = 0.5;
};
inherit(Missile, Bullet);

Missile.prototype.frame = Loader.addImage("images/missile.png");

Missile.prototype.startPosition = function (shipPosition) {
    Missile.side = Missile.side ? Missile.side * -1: 12;
    return {
        x: shipPosition.x + Missile.side,
        y: shipPosition.y
    };
};


function Laser(ship) {
    Bullet.call(this, ship);
    this.speed = 10;
    this.acceleration = 0;
}
inherit(Laser, Bullet);

Laser.prototype.frame = Loader.addImage("images/laser.png");

Laser.prototype.startPosition = function (shipPosition) {
    return shipPosition;
};


function Fireball(ship) {
    Laser.call(this, ship);
    this.speed = 1;
};
inherit(Fireball, Laser);

Fireball.prototype.frame = Loader.addImage("images/fireball.png");
