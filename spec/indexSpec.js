const b_ = require('../src/index.js');

describe('b_', () => {
    describe('built in _ methods', () => {
        it('#each', () => {
            let handler = jasmine.createSpy('handler');
            b_([1, 2, 3]).each(handler);
            expect(handler).toHaveBeenCalledTimes(3);
            expect(handler).toHaveBeenCalledWith(1, 0, [1, 2, 3]);
            expect(handler).toHaveBeenCalledWith(2, 1, [1, 2, 3]);
            expect(handler).toHaveBeenCalledWith(3, 2, [1, 2, 3]);
        });
    });

    describe('static function wrappers', () => {
        it('#each', () => {
            let handler = jasmine.createSpy('handler');
            b_.each(handler)([1, 2, 3]);
            expect(handler).toHaveBeenCalledTimes(3);
            expect(handler).toHaveBeenCalledWith(1, 0, [1, 2, 3]);
            expect(handler).toHaveBeenCalledWith(2, 1, [1, 2, 3]);
            expect(handler).toHaveBeenCalledWith(3, 2, [1, 2, 3]);
        });
    });

    describe('addPrototype', () => {
        it('#each', function () {
            b_.addPrototype();
            let handler = jasmine.createSpy('handler');
            [1, 2, 3].each(handler);
            expect(handler).toHaveBeenCalledTimes(3);
            expect(handler).toHaveBeenCalledWith(1, 0, [1, 2, 3]);
            expect(handler).toHaveBeenCalledWith(2, 1, [1, 2, 3]);
            expect(handler).toHaveBeenCalledWith(3, 2, [1, 2, 3]);
        });
    });

    describe('additional methods', () => {
        describe('#set', () => {
            it('should set the property on all elements', () => {
                let list = b_([{}, {}, {}]);
                list.set('key', () => 'value');
                expect(list.list).toEqual([{key: 'value'}, {key: 'value'}, {key: 'value'}]);
            });

            it('should pass in element, index, and entire array as arguments to handler function', () => {
                let list = b_([{value: 4}, {value: 6}, {value: 8}]);
                list.set('sum', (elem, index, array) => elem.value + index + array.length);
                expect(list.list).toEqual([{value: 4, sum: 7}, {value: 6, sum: 10}, {value: 8, sum: 13}]);
            });
        });

        describe('#repeat', () => {
            it('should replace each element with a list containing that element repeated `n` times', () => {
                let list = b_([1, 2, 3]);
                list = list.repeat(3);
                expect(list.list).toEqual([[1, 1, 1], [2, 2, 2], [3, 3, 3]]);
            });
        });

        describe('#field', () => {
            it('should return named field as a B_ object', () => {
                let obj = b_({dog: 3});
                expect(obj.field('dog').list).toEqual(3);
            });
        });

        describe('#asList', () => {
            it('should invoke the handler function once with the value of the B_ object', () => {
                let list = b_([1, 2, 3]);
                let handler = jasmine.createSpy('handler').and.returnValue('return');
                expect(list.asList(handler)).toEqual('return');
                expect(handler).toHaveBeenCalledTimes(1);
                expect(handler).toHaveBeenCalledWith([1, 2, 3]);
            });
        });

        describe('#unwrap', () => {
            it('should return the B_ object as js array', () => {
                let list = b_([1, 2, 3]);
                expect(list.unwrap()).toEqual([1, 2, 3]);
            });
        });

        describe('#length', () => {
            it('should return the length of the value of the B_ object', () => {
                expect(b_([1, 2, 3]).length).toEqual(3);
            });
        });
    });
});