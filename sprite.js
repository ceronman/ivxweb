function Sprite(groups) {
    var that = this;
    if (groups) {
        groups.forEach(function (group) {
            group.add(that);
        });
    }
    this.groups = groups;
    this.position = {x: 0, y: 0};
};

Sprite.prototype.kill = function () {
    var that = this;
    this.groups.forEach(function (group) {
        group.remove(that);
    });
};

Sprite.prototype.alive = function () {
    this.groups.some(function (group) {
        return group;
    });
};

Sprite.prototype.getCenter = function () {
    return {
        x: this.position.x + this.frame.width/2,
        y: this.position.y + this.frame.height/2
    };
};

Sprite.prototype.setCenter = function (x, y) {
    this.position.x = x - this.frame.width/2;
    this.position.y = y - this.frame.height/2;
};

function SpriteGroup() {
    this.sprites = [];
};

SpriteGroup.prototype.add = function (sprite) {
    console.log("adding " + sprite);
    this.sprites.push(sprite);
};

SpriteGroup.prototype.remove = function (sprite) {
    var index = this.sprites.indexOf(sprite);
    if (index >= 0) {
       this.sprites.splice(index, 1);
    };
};

SpriteGroup.prototype.empty = function () {
    return (this.sprites.length == 0);
};

SpriteGroup.prototype.draw = function (surface) {
    var pos;
    this.sprites.forEach(function (sprite) {
        pos = sprite.position;
        display.context.drawImage(sprite.frame, pos.x, pos.y);
    });
};

SpriteGroup.prototype.update = function (input) {
    this.sprites.forEach(function (sprite) {
        sprite.update(input);
    });
};


