function Color(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
};

Color.prototype.toArray = function () {
    return [this.r, this.g, this.b, this.a];
};

Color.prototype.toCss = function () {
    return "rgba(" + this.toArray().join(",") + ")";
};


function PixelData(imageData) {
    this.imageData = imageData;
};

PixelData.prototype.putPixel = function (x, y, color) {
    var index = (x + y * this.imageData.width) * 4;
    this.imageData.data[index + 0] = color.r;
    this.imageData.data[index + 1] = color.g;
    this.imageData.data[index + 2] = color.b;
    this.imageData.data[index + 3] = color.a;
};


function Display(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.style.backgroundColor = "black";
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.context = this.canvas.getContext("2d");
};

Display.prototype.createPixelData = function () {
    var imageData = this.context.createImageData(this.width, this.height);
    return new PixelData(imageData);
};

Display.prototype.getPixelData = function () {
    var imageData = this.context.getImageData(0, 0, this.width, this.heigth);
    return new PixelData(imageData);
};

Display.prototype.putPixelData = function (pixelData) {
    this.context.putImageData(pixelData.imageData, 0, 0);
};

var KEYS = {
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
};

function Input(event) {
    var that = this;
    this.keys = {};

    document.onkeydown = function (event){
        //console.log("keydown: " + event.keyCode)
        that.keys[event.keyCode] = true;
    };

    document.onkeyup = function (event) {
        that.keys[event.keyCode] = false;
    };
};


Loader = {
    imagesMap: {},

    sources: function () {
        return Object.keys(this.imagesMap);
    },

    images: function () {
        var that = this;
        return this.sources().map(function (src) {
            return that.imagesMap[src];
        });
    },

    onload: function () {
        console.log("empty onload");
    },

    addImage: function (src) {
        var image;
        this.awaiting += 1;
        image = new Image();
        image.loaded = false;
        this.imagesMap[src] = image;
        return image;
    },

    checkLoad: function () {
        var loaded = this.images().every(function (image) {
            return image.loaded;
        });

        if (loaded) {
            this.onload();
        }
    },

    load: function () {
        var images, src, that=this;

        function loadImage(src) {
            var image = that.imagesMap[src];
            image.src = src;
            image.onload = function () {
                console.log("loaded " + src);
                image.loaded = true;
                that.checkLoad();
            };
        }

        this.sources().forEach(function (source) {
            loadImage(source)
        });
    },
};
