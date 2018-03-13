const _ = require('underscore');

class B_ {
    constructor(list) {
        this.list = list;
    }

    set(field, func) {
        return this.each(function (elem) {
            elem[field] = func(...arguments);
        });
    }

    asList(func) {
        return func(this.list)
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

// todo
// implement and document repeat
// document set and as list
// B_ = require('./src/index');
// x = new B_([{w:1},{w:2}])
// x.set('a', (a, b, c) => {console.log(a, b, c)})