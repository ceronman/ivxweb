function game() {

    display = new Display("gamecanvas");
    input = new Input();

    var starField = new StarField(display.width, display.height);

    var ship = new Ship();

    Loader.onload = function () {
        console.log("init");
        ship.init(display);
        starField.createStars();

        function loop() {
            starField.scroll();
            starField.draw(display);
            ship.update(input);
            ship.draw(display);
        }
        window.setInterval(loop, 40);
        //window.setTimeout(loop, 0);
    }
}

window.onload = game
