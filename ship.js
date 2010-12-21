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
    this.MAX_OFFSET = 3;
    this.CENTER_FRAME = 3;

    this.frame = this.frames[this.CENTER_FRAME];

    this.MIN_X = this.frame.width/2;
    this.MAX_X = display.width - this.frame.width/2;

    this.position.x = display.width/2;
    this.position.y = display.height - this.frame.height/2;
};

Ship.prototype.update = function (input) {
    var accelerated = false;

    if (this.explosion) {
        this.frame = this.explosion.frame;
        this.explosion.update();

        if (this.explosion.end) {
            delete this.explosion;
        }
        return;
    }

    if (input.keys[KEYS.RIGHT]) {
        this.speed = Math.min(this.speed+1, this.MAX_SPEED);
        this.frameOffset = Math.min(this.frameOffset+1, this.MAX_OFFSET);
        accelerated = true;
    }

    if (input.keys[KEYS.LEFT]) {
        this.speed = Math.max(this.speed-1, -this.MAX_SPEED);
        this.frameOffset = Math.max(this.frameOffset-1, -this.MAX_OFFSET);
        accelerated = true;
    }

    if (input.keys[KEYS.SPACE]) {
        this.shoot();
        //this.explode();
    }

    if (!accelerated) {
        this.speed += Math.sign(this.speed) * -1;
        this.frameOffset += Math.sign(this.frameOffset) * -1;
    }

    this.position.x += this.speed;
    this.position.x = Math.max(this.position.x, this.MIN_X);
    this.position.x = Math.min(this.position.x, this.MAX_X);

    this.frame = this.frames[this.CENTER_FRAME + this.frameOffset];
};

Ship.prototype.shoot = function () {
    var bullet, pos = this.position;
    if (this.bulletGroup.empty()) {
        bullet = new this.weapon(this);
    }
};

Ship.prototype.explode = function () {
    this.explosion = new Explosion();
};


function Bullet(ship) {
    Sprite.call(this, [ship.bulletGroup]);
    this.acceleration = 0;
    this.speed = 0;
    this.position.x = ship.position.x;
    this.position.y = ship.position.y;
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

    Missile.side = Missile.side ? Missile.side * -1: 12;
    this.position.x = ship.position.x + Missile.side;

    this.speed = -3;
    this.acceleration = 0.5;
};
inherit(Missile, Bullet);

Missile.prototype.frame = Loader.addImage("images/missile.png");


function Laser(ship) {
    Bullet.call(this, ship);
    this.speed = 10;
}
inherit(Laser, Bullet);

Laser.prototype.frame = Loader.addImage("images/laser.png");


function Fireball(ship) {
    Bullet.call(this, ship);
    this.speed = 1;
};
inherit(Fireball, Bullet);

Fireball.prototype.frame = Loader.addImage("images/fireball.png");


function Explosion() {
    this.MAX_FRAME = 6;
    this.frameIndex = 0;
    this.end = false;
    this.updateFrame();
};

Explosion.prototype.frames = [
    Loader.addImage("images/explosion1.png"),
    Loader.addImage("images/explosion2.png"),
    Loader.addImage("images/explosion3.png"),
    Loader.addImage("images/explosion4.png"),
    Loader.addImage("images/explosion5.png"),
    Loader.addImage("images/explosion6.png"),
    Loader.addImage("images/explosion7.png"),
];

Explosion.prototype.update = function () {
    this.updateFrame();
    this.frameIndex += 0.5;
    if (this.frameIndex > this.MAX_FRAME) {
        this.end = true;
    }
};

Explosion.prototype.updateFrame = function () {
    this.frame = this.frames[Math.floor(this.frameIndex)];
};
