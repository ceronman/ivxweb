var IVX = function () {

    var CANVAS_WIDTH = 320;
    var CANVAS_HEIGHT = 200;


    function randomInteger(from, to) {
        var r = Math.random();
        return Math.floor(r * (to - from) + from);
    }


    function putPixel(imageData, x, y, color) {
        var index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = color.r;
        imageData.data[index + 1] = color.g;
        imageData.data[index + 2] = color.b;
        imageData.data[index + 3] = color.a;
    }


    function Color(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.array = [r, g, b, a];
        this.css = "rgba(" + this.array.join(",") + ")";
    }

    function StarFieldLayer(numStars, color, speed) {
        this.numStars = numStars;
        this.color = color;
        this.speed = speed;
        this.stars = [];
    }

    StarFieldLayer.prototype.createRandomStars = function () {
        var i, star;

        this.stars = [];

        for (i=0; i<this.numStars; i++) {
            star = {
                x: randomInteger(0, CANVAS_WIDTH),
                y: randomInteger(0, CANVAS_HEIGHT)
            }
            this.stars.push(star);
        }
    }

    StarFieldLayer.prototype.scroll = function () {
        var i, star;

        for (i=0; i<this.stars.length; i++) {
            this.stars[i].y += this.speed;

            if (this.stars[i].y > CANVAS_HEIGHT) {
                this.stars[i].x = randomInteger(0, CANVAS_WIDTH);
                this.stars[i].y = 0;
            }
        }
    }

    StarFieldLayer.prototype.draw = function (data) {
        var i, star;

        for (i=0; i<this.stars.length; i++) {
            star = this.stars[i];
            putPixel(data, star.x, star.y, this.color);
        }
    }

    function StarField() {

        this.layers = [
            new StarFieldLayer(50, new Color(255, 255, 255, 255), 4),
            new StarFieldLayer(50, new Color(200, 200, 200, 255), 2),
            new StarFieldLayer(50, new Color(100, 100, 100, 255), 1),
        ];

        this.createStars = function () {
            var i;
            for (i=0; i<this.layers.length; i++) {
                this.layers[i].createRandomStars();
            }
        };

        this.draw = function (context) {
            var data = context.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);

            for (i=0; i<this.layers.length; i++) {
                this.layers[i].draw(data);
            }

            context.putImageData(data, 0, 0);
        };

        this.scroll = function () {
            var i;
            for (i=0; i<this.layers.length; i++) {
                this.layers[i].scroll();
            }
        };
    }


    function game() {
        var canvas = document.getElementById("gamecanvas");
        canvas.style["background-color"] = "rgb(0,0,0)"
        var context = canvas.getContext("2d");

        var starField = new StarField();
        starField.createStars();

        function loop() {
            starField.scroll();
            starField.draw(context);
        }

        window.setInterval(loop, 40);
        //window.setTimeout(loop, 0);
    }

     // Public methods.
    return {
        game: game
    };
}();
