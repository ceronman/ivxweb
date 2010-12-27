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
    return this.groups.some(function (group) {
        return group;
    });
};

Sprite.collision = function(sprite1, sprite2) {
    var frame1 = sprite1.frame,
        frame2 = sprite2.frame,
        pos1 = sprite1.position,
        pos2 = sprite2.position;

    return (Math.abs(pos1.y - pos2.y) < (frame1.height + frame2.height)/2)
           && (Math.abs(pos1.x - pos2.x) < (frame1.width + frame2.width)/2);
};


function SpriteGroup() {
    this.sprites = [];
};

SpriteGroup.prototype.getSprites = function () {
    return this.sprites.slice(0);
}

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
    this.getSprites().forEach(function (sprite) {
        x = sprite.position.x - sprite.frame.width/2;
        y = sprite.position.y - sprite.frame.height/2;
        surface.context.drawImage(sprite.frame, x, y);
    });
};

SpriteGroup.prototype.update = function (input, log) {
    var args = arguments;
    this.getSprites().forEach(function (sprite) {
        sprite.update.apply(sprite, args);
    });
};

SpriteGroup.collision = function (group1, group2, callback) {
    // TODO: Improve this slow collition detection algorithm.
    group1.getSprites().forEach(function(sprite1) {
        group2.getSprites().forEach(function(sprite2) {
            if (Sprite.collision(sprite1, sprite2)) {
                callback(sprite1, sprite2);
            }
        });
    });
};
