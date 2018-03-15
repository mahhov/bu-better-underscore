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

    repeat(count) {
        return this.map(elem => _.times(count, () => elem));
    }

    field(name) {
        return new B_(this.list[name]);
    }

    asList(func) {
        return func(this.list);
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
// move init to class static
// add custom utility functions (e.g. set) to B_.static methods list