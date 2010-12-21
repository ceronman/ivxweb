function game() {

    display = new Display("gamecanvas");
    input = new Input();

    var starField = new StarField(display.width, display.height);
    var shipGroup = new SpriteGroup();
    var bulletGroup = new SpriteGroup();
    var map = [
        [2, 0, 0, 0, 2],
        [1, 0, 0, 0, 1],
    ];
    var enemyGroup = new EnemyGroup(map);

    var ship = new Ship(shipGroup, bulletGroup);

    Loader.onload = function () {
        console.log("init");
        ship.init(display);
        starField.createStars();

        function loop() {
            starField.scroll();

            bulletGroup.update(input);
            shipGroup.update(input);
            enemyGroup.update();

            starField.draw(display);
            bulletGroup.draw(display);
            shipGroup.draw(display);
            enemyGroup.draw(display);
        }
        window.setInterval(loop, 1000/35.0);
        //window.setTimeout(loop, 0);
    };
    Loader.load();
}

window.onload = game;
