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

function SpriteGroup() {
    this.sprites = [];
};

SpriteGroup.prototype.add = function (sprite) {
    this.sprites.push(sprite);
};

SpriteGroup.prototype.remove = function (sprite) {
    var index = this.sprites.indexOf(sprite);
    if (index >= 0) {
        this.sprites.splice(index, 1);
    };
};

SpriteGroup.prototype.empty = function () {
    return (this.sprites.length === 0);
};

SpriteGroup.prototype.draw = function (surface) {
    var x, y;
    this.sprites.forEach(function (sprite) {
        x = sprite.position.x - sprite.frame.width/2;
        y = sprite.position.y - sprite.frame.height/2;
        surface.context.drawImage(sprite.frame, x, y);
    });
};

SpriteGroup.prototype.update = function (input) {
    this.sprites.forEach(function (sprite) {
        sprite.update(input);
    });
};


