const B_ = require('../src/index.js');

describe('B_', () => {
    describe('built in _ methods', () => {

    });

    describe('static function wrappers', () => {

    });

    describe('additional methods', () => {
        describe('#set', () => {
            it('should set the property on all elements', () => {
                let list = new B_([{}, {}, {}]);
                list.set('key', () => 'value');
                expect(list.list).toEqual([{key: 'value'}, {key: 'value'}, {key: 'value'}]);
            });

            it('should pass in element, index, and entire array as arguments to handler function', () => {
                let list = new B_([{value: 4}, {value: 6}, {value: 8}]);
                list.set('sum', (elem, index, array) => elem.value + index + array.length);
                expect(list.list).toEqual([{value: 4, sum: 7}, {value: 6, sum: 10}, {value: 8, sum: 13}]);
            });
        });

        describe('#repeat', () => {
            it('should replace each element with a list containing that element repeated `n` times', () => {
                let list = new B_([1, 2, 3]);
                list = list.repeat(3);
                expect(list.list).toEqual([[1, 1, 1], [2, 2, 2], [3, 3, 3]]);
            });
        });

        // describe('#mapInner', () => {
        //     it('', () => {
        //         let list = new B_({a: 5, list: [{c: 3}, {c: 4}]});
        //         expect(list.mapInner('list', (elem, parent) => elem.c * parent.a).list)
        //             .toEqual([15, 20]);
        //     });
        // });
        //
        // describe('#eachMapInner', () => {
        //     it('', () => {
        //         let list = new B_([{a: 5, list: [{c: 3}, {c: 4}]}, {a: 6, list: [{c: 5}, {c: 6}]}]);
        //         expect(list.eachMapInner('list', (elem, parent) => elem.c * parent.a).list)
        //             .toEqual([[15, 20], [30, 36]]);
        //     });
        // });
        //
        // describe('flatObject', () => {
        //     it('', () => {
        //         let list = new B_({a: 5, list: [{c: 3}, {c: 4}]});
        //         expect(list.flatObject('list', 'b', 'd').list)
        //             .toEqual([{b: {c: 3}, d: {a: 5}}, {b: {c: 4}, d: {a: 5}}]);
        //     });
        // });
        //
        // describe('eachFlatObject', () => {
        //     it('', () => {
        //         let list = new B_([{a: 5, list: [{c: 3}, {c: 4}]}, {a: 6, list: [{c: 5}, {c: 6}]}]);
        //         expect(list.eachFlatObject('list', 'b', 'd').list)
        //             .toEqual([
        //                 [{b: {c: 3}, d: {a: 5}}, {b: {c: 4}, d: {a: 5}}],
        //                 [{b: {c: 5}, d: {a: 6}}, {b: {c: 6}, d: {a: 6}}]]);
        //     });
        // });

        describe('#asList', () => {
            it('should invoke the handler function once with the value of the B_ object', () => {
                let list = new B_([1, 2, 3]);
                let spy = jasmine.createSpy('handler').and.returnValue('return');
                expect(list.asList(spy)).toEqual('return');
                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy).toHaveBeenCalledWith([1, 2, 3]);
            });
        });

        describe('#unwrap', () => {
            it('should return the B_ object as js array', () => {
                let list = new B_([1, 2, 3]);
                expect(list.unwrap()).toEqual([1, 2, 3]);
            });
        });

        describe('#length', () => {
            it('should return the length of the value of the B_ object', () => {
                expect(new B_([1, 2, 3]).length).toEqual(3);
            });
        });
    });
});