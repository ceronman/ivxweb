function randomInteger(from, to) {
    var r = Math.random();
    return Math.floor(r * (to - from) + from);
};

Math.sign = function (n) {
    if (n === 0) {
        return 0;
    }
    return n / Math.abs(n);
}
