function game() {

    display = new Display("gamecanvas");
    input = new Input();

    var starField = new StarField(display.width, display.height);
    var shipGroup = new SpriteGroup();
    var bulletGroup = new SpriteGroup();

    var ship = new Ship(shipGroup, bulletGroup);

    Loader.onload = function () {
        console.log("init");
        ship.init(display);
        starField.createStars();

        function loop() {
            starField.scroll();
            starField.draw(display);
            bulletGroup.update(input);
            shipGroup.update(input);

            bulletGroup.draw(display);
            shipGroup.draw(display);
        }
        window.setInterval(loop, 1000/35.0);
        //window.setTimeout(loop, 0);
    };
    Loader.load();
}

window.onload = game
