const B_ = require('../src/index.js');

describe('B_', function () {
    describe('built in _ methods', function () {

    });

    describe('static function wrappers', function () {

    });

    describe('additional methods', function () {
        describe('#set', function () {
            it('should set the property on all elements', function () {
                let list = new B_([{}, {}, {}]);
                list.set('key', () => 'value');
                expect(list.list).toEqual([{key: 'value'}, {key: 'value'}, {key: 'value'}]);
            });

            it('should pass in element, index, and entire array as arguments to handler function', function () {
                let list = new B_([{value: 4}, {value: 6}, {value: 8}]);
                list.set('sum', (elem, index, array) => elem.value + index + array.length);
                expect(list.list).toEqual([{value: 4, sum: 7}, {value: 6, sum: 10}, {value: 8, sum: 13}]);
            });
        });

        describe('#repeat', function () {
            it('should replace each element with a list containing that element repeated `n` times', function () {
                let list = new B_([1, 2, 3]);
                list = list.repeat(3);
                expect(list.list).toEqual([[1, 1, 1], [2, 2, 2], [3, 3, 3]]);
            });
        });

        describe('#asList', function () {
            it('should invoke the handler function once with the value of the B_ object', function () {
                let list = new B_([1, 2, 3]);
                let spy = jasmine.createSpy('handler').and.returnValue('return');
                expect(list.asList(spy)).toEqual('return');
                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy).toHaveBeenCalledWith([1, 2, 3]);
            });
        });

        describe('#unwrap', function () {
            it('should return the B_ object as js array', function () {
                let list = new B_([1, 2, 3]);
                expect(list.unwrap()).toEqual([1, 2, 3]);
            });
        });

        describe('#length', function () {
            it('should return the length of the value of the B_ object', function () {
                expect(new B_([1, 2, 3]).length).toEqual(3);
            });
        });
    });
});