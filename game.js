function game() {
    var display = new Display("gamecanvas");
    var input = new Input();

    var starField = new StarField(display.width, display.height);
    var shipGroup = new SpriteGroup();
    var bulletGroup = new SpriteGroup();
    var explosionGroup = new SpriteGroup();
    var map = [
        [2, 0, 0, 0, 2],
        [1, 0, 0, 0, 1],
    ];
    var enemyGroup = new EnemyGroup(map);

    var ship = new Ship(shipGroup, bulletGroup);

    var explosion, pos;

    Loader.onload = function () {
        console.log("init");
        ship.init(display);

        function loop() {
            if (input.keys[KEYS.DELETE] && ship.alive()) {
                pos = ship.position;
                explosion = new Explosion(explosionGroup, pos.x, pos.y);
                ship.kill();
            }

            onCollision = function (enemy, bullet) {
                var pos = enemy.position;
                explosion = new Explosion(explosionGroup, pos.x, pos.y);
                enemy.kill();
                bullet.impact();
            };
            SpriteGroup.collision(enemyGroup, bulletGroup, onCollision);

            starField.update();
            bulletGroup.update(input);
            shipGroup.update(input);
            enemyGroup.update();
            explosionGroup.update(null, true);

            starField.draw(display);
            bulletGroup.draw(display);
            shipGroup.draw(display);
            enemyGroup.draw(display);
            explosionGroup.draw(display);
        }
        window.setInterval(loop, 1000/35.0);
        //window.setTimeout(loop, 0);
    };
    Loader.load();
}

window.onload = game;
