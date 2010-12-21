function Enemy(group) {
    Sprite.call(this, [group]);
};
inherit(Enemy, Sprite);


function FlubberEnemy(group) {
    Enemy.call(this, group);
};
inherit(FlubberEnemy, Enemy);

FlubberEnemy.prototype.frame = Loader.addImage("images/flubber-enemy.png");


function SpikeEnemy(group) {
    Enemy.call(this, group);
};
inherit(SpikeEnemy, Enemy);

SpikeEnemy.prototype.frame = Loader.addImage("images/spike-enemy.png");


function CrabEnemy(group) {
    Enemy.call(this, group);
};
inherit(CrabEnemy, Enemy);

CrabEnemy.prototype.frame = Loader.addImage("images/crab-enemy.png");


function EnemyGroup(map) {
    SpriteGroup.call(this);

    this.H_PADDING = 40;
    this.V_PADDING = 30;
    this.MIN_X = 10;
    this.MIN_Y = 10;
    this.MAX_X = 85;
    this.MAX_Y = 60;

    this.position = {x: 10, y: 10};
    this.speed = {x: 1, y: 1};

    this.loadMap(map);
};
inherit(EnemyGroup, SpriteGroup);

EnemyGroup.prototype.loadMap = function (map) {
    var row, col, enemy, enemyType;

    for (row=0; row<map.length; row++) {
        for (col=0; col<map[row].length; col++) {
            enemyType = map[row][col];
            switch (enemyType) {
            case 0:
                enemy = new FlubberEnemy(this);
                break;
            case 1:
                enemy = new SpikeEnemy(this);
                break;
            case 2:
                enemy = new CrabEnemy(this);
                break;
            }
            enemy.position.x = this.position.x + this.H_PADDING * col;
            enemy.position.y = this.position.y + this.V_PADDING * row;
        }
    }
};

EnemyGroup.prototype.update = function () {
    var that = this;
    this.position.x += this.speed.x;
    if (this.position.x > this.MAX_X || this.position.x < this.MIN_X) {
        this.speed.x = this.speed.x * -1;
    }
    this.position.y += this.speed.y;
    if (this.position.y > this.MAX_Y || this.position.y < this.MIN_Y) {
        this.speed.y = this.speed.y * -1;
    }
    this.sprites.forEach(function (enemy) {
        enemy.position.x += that.speed.x;
        enemy.position.y += that.speed.y;
    });
}
