function StarFieldLayer(width, height, numStars, color, speed) {
    this.numStars = numStars;
    this.color = color;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.stars = [];
};

StarFieldLayer.prototype.createRandomStars = function () {
    var i, star;

    this.stars = [];

    for (i=0; i<this.numStars; i++) {
        star = {
            x: randomInteger(0, this.width),
            y: randomInteger(0, this.height)
        };
        this.stars.push(star);
    }
};

StarFieldLayer.prototype.scroll = function () {
    var i, star;

    for (i=0; i<this.stars.length; i++) {
        this.stars[i].y += this.speed;

        if (this.stars[i].y > this.height) {
            this.stars[i].x = randomInteger(0, this.width);
            this.stars[i].y = 0;
        }
    }
};

StarFieldLayer.prototype.draw = function (pixels) {
    var i, star;

    for (i=0; i<this.stars.length; i++) {
        star = this.stars[i];
        pixels.putPixel(star.x, star.y, this.color);
    }
};


function StarField(w, h) {

    this.layers = [
        new StarFieldLayer(w, h, 50, new Color(255, 255, 255, 255), 4),
        new StarFieldLayer(w, h, 50, new Color(200, 200, 200, 255), 2),
        new StarFieldLayer(w, h, 50, new Color(100, 100, 100, 255), 1)
    ];
};

StarField.prototype.createStars = function () {
    for (var i=0; i<this.layers.length; i++) {
        this.layers[i].createRandomStars();
    }
};

StarField.prototype.draw = function (display) {
    var pixels = display.createPixelData();
    for (var i=0; i<this.layers.length; i++) {
        this.layers[i].draw(pixels);
    }
    display.putPixelData(pixels);
};

StarField.prototype.scroll = function () {
    for (var i=0; i<this.layers.length; i++) {
        this.layers[i].scroll();
    }
};
