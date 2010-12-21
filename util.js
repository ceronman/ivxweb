function randomInteger(from, to) {
    var r = Math.random();
    return Math.floor(r * (to - from) + from);
};


Math.sign = function (n) {
    if (n === 0) {
        return 0;
    }
    return n / Math.abs(n);
};


var inherit = (function () {
    var F = function () {};
    return function (C, P) {
        F.prototype = P.prototype;
        C.prototype = new F();
        C.uber = P.prototype;
        C.prototype.constructor = C;
    };
}());

var cosole = console || {
    log: function (){}
}
