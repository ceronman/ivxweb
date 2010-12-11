function game() {

    display = new Display("gamecanvas");
    input = new Input();

    var starField = new StarField(display.width, display.height);
    starField.createStars();

    var ship = new Ship();
    console.log("created");
    ship.init(display);
    console.log("init")

    function loop() {
        starField.scroll();
        starField.draw(display);
        ship.update(input);
        ship.draw(display);
    }

    //window.setInterval(loop, 40);
    window.setTimeout(loop, 0);
}

window.onload = game
