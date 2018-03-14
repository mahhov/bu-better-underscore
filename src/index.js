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

    // objectify(name) {
    //     return this.map(elem => {
    //         let obj = {};
    //         obj[name] = elem;
    //         return obj;
    //     });
    // }
    //
    // // todo document & test
    // field(name) {
    //     return new B_(this.list[name]);
    // }
    //
    // // todo document & test name
    // mapInner(listName, func) {
    //     return this.field(listName).map(elem => {
    //         return func(elem, this.list)
    //     });
    // }
    //
    // // todo document & test name
    // eachMapInner(listName, func) {
    //     return this.map(elem => new B_(elem).mapInner(listName, func).unwrap());
    // }
    //
    // // todo document & test name
    // flatObject(listName, elemName, parentName) {
    //     let list = this.field(listName);
    //     delete this.list[listName];
    //     return list.map(elem => {
    //         let flat = {};
    //         flat[elemName] = elem;
    //         flat[parentName] = this.list;
    //         return flat;
    //     });
    // }
    //
    // // todo document & test name
    // eachFlatObject(listName, elemName, parentName) {
    //     return this.map(elem => new B_(elem).flatObject(listName, elemName, parentName).unwrap());
    // }

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