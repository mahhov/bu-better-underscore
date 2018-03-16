const _ = require('underscore');

class B_ {
    constructor(value) {
        this.value = value;
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
        return new B_(this.value[name]);
    }

    asList(func) {
        return func(this.value);
    }

    unwrap() {
        return this.value;
    }

    get length() {
        return this.value && this.value.length;
    }
}

let b_ = (value) => new B_(value);

// add to B_ what _ includes
_.each(_.keys(_), name => {
    let orig = _[name];
    B_.prototype[name] = function () {
        return new B_(orig(this.value, ...arguments));
    };
});

// get a list of B_ native and _ methods
let methods = b_(Object.getOwnPropertyNames(B_.prototype))
    .filter(name => typeof B_.prototype[name] === 'function');

// add B_ and _ methods as static methods to b_
methods.each(name => {
    b_[name] = handler => value => b_(value)[name](handler);
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