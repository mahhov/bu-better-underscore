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
        return this.list && this.list.length;
    }
}

let b_ = (list) => new B_(list);

// add to B_ what _ includes
_.each(_.keys(_), name => {
    let orig = _[name];
    B_.prototype[name] = function () {
        return new B_(orig(this.list, ...arguments));
    };
});

// get a list of B_ native and _ methods
let methods = b_(Object.getOwnPropertyNames(B_.prototype))
    .filter(name => typeof B_.prototype[name] === 'function');

// add B_ and _ methods as static methods to b_
methods.each(name => {
    b_[name] = handler => list => b_(list)[name](handler);
});

// add to prototype
b_.addPrototype = () => {
    methods.each(name => {
        Object.prototype[name] = function () {
            return b_(this)[name](...arguments);
        };
    });
};

module.exports = b_;

// todo
// move init to class static
// unwrap to getter
// rename B_.list to value