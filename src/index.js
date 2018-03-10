const _ = require('underscore');

class B_ {
    constructor(list) {
        this.list = list;
    }

    unwrap() {
        return this.list;
    }

    get length() {
        return this.list.length;
    }
}

_.each(_.keys(_), name => {
    let orig = _[name];
    B_.prototype[name] = function () {
        return new B_(orig(this.list, ...arguments));
    };
});

module.exports = B_;