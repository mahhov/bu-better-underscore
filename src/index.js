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

    static addPrototype() {
        _.each(_.keys(_), name => {
            Object.prototype[name] = function () {
                return _[name](this, ...arguments);
            };
        });
    }
}

_.each(_.keys(_), name => {
    let orig = _[name];
    B_.prototype[name] = function () {
        return new B_(orig(this.list, ...arguments));
    };
    B_[name] = handler => list => orig(list, handler);
});

module.exports = B_;