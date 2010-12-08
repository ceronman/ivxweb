function game() {

    display = new Display("gamecanvas");

    var starField = new StarField(display.width, display.height);
    starField.createStars();

    function loop() {
        starField.scroll();
        starField.draw(display);
    }

    window.setInterval(loop, 40);
    //window.setTimeout(loop, 0);
}

window.onload = game
