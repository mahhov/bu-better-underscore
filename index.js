const _ = require('underscore');

class ArrayX {
    constructor(list) {
        this.list = list;
    }

    toList() {
        return this.list;
    }
}

_.each(_.keys(_), name => {
    let orig = _[name];
    ArrayX.prototype[name] = function () {
        return new ArrayX(orig(this.list, ...arguments));
    };
});

module.exports = ArrayX;