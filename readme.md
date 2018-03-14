# bu-better-underscore

## Setup

`npm i -save bu-better-underscore`

`const B_ = require('bu-better-underscore');`

or

`require('bu-better-underscore').addPrototype();`

## Overview

`new B_(array).map(func)`

`array.map(func)`

`B_.map(func)(list)`

## Reads left to right and 1 less parameter

undrescore provides static methods that take in as a parameter the very object they are operating on.

```
const _ = require('underscore')

let list = [0, 1, 2, 3, 4];
let notZero = num => num !== 0;
let inverse = num => 1 / num;

_.map(_.filter(list, notZero), inverse); 
```

bu-better-underscore, on the other hand, allows invoking methods directly on the object.

```
const B_ = require('bu-better-underscore');

let list = new B_([0, 1, 2, 3, 4]);
let notZero = num => num !== 0;
let inverse = num => 1 / num;

list.filter(notZero).map(inverse).unwrap();
```

bu-better-underscore can also optionally add the utility methods directly to the object prototype to avoid using `new B_();` and `.unwrap();`

```
require('bu-better-underscore').addPrototype();

let list = [0, 1, 2, 3, 4];
let notZero = num => num !== 0;
let inverse = num => 1 / num;

list.filter(notZero).map(inverse);
```

## Helps create wrapper functions

underscore is overly verbose when working with promises and requires wrapping the handler functions inside other functions.

```
let promise = Promise.resolve([1, 2, 3, 4, 5]);
promise.then(list => _.map(list, num => num * 3));
```

bu-better-underscore, on the other hand, can create the wrapping function for you.

```
let promise = Promise.resolve([1, 2, 3, 4, 5]);
promise.then(B_.map(num => num * 3));
```

## Adds utility methods

There are 3 additional utility methods bu-better-underscore provides.

### `set(field, func)`

sets a property on each element

```
let students = new B_([{name: 'joe', score1: 10, score2: 30}, {name: 'joey', score1: 20, score2: 15}]);
students
    .set('totalScore', student => Math.max(student.score1, student.score2))
    .set('id', (student, index, students) => `student_${index}_of_${students.length}_${student.name}`);
```

Results in 

```
  [{
      name: 'joe',
      score1: 10,
      score2: 30,
      totalScore: 30,
      id: 'student_0_of_2_joe'
  }, {
      name: 'joey',
      score1: 20,
      score2: 15,
      totalScore: 20,
      id: 'student_1_of_2_joey'
  }] 

```

### `repeat(count)`

replaces each element with a list containing that element repeated `count` times

```
let list = new B_([1, 2, 3]);
list.repeat(3);
// [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
```

### `asList()`

invokes the handler function exactly once

```
let pickSecond = array => array.length >= 2 && array[1]; 
let list = new B_([1, 2, 3]);
list.asList(pickSecond)
// 2
```

### `unwrap()`

returns a javascript array, object, primitive representing the B_ object's value

```
new B_([1, 2, 3]).unwrap() // array: [1, 2, 3]
new B_({v: 1}).unwrap() // object {v: 1}
new B_(1).unwrap() // primitive 1
```

### `length`

returns length

```
new B_([1, 2, 3]).length // 3
```

# Examples

## Basic Example
 
### Given

```
const people = {
    "men": {
        "bio": [
            {'name': 'joe', 'height': 4.5, 'weight': 130},
            {'name': 'bob', 'height': 5.4, 'weight': 97},
            {'name': 'foo', 'height': 5.2, 'weight': 175},
            {'name': 'fatcarl', 'height': 4.8, 'weight': 394}
        ]
    }, "women": {
        "bio": [
            {'name': 'jessica', 'height': 14.5, 'weight': 130},
            {'name': 'britny', 'height': 6.1, 'weight': 97},
            {'name': 'foo', 'height': 6.2, 'weight': 175},
            {'name': 'kristy', 'height': 6.3, 'weight': 394},
            {'name': 'kristy2.0', 'height': 6.0, 'weight': 394}
        ]
    }
};
```
 
### With undrescore

```
const _ = require('underscore');

let bios = [people.men, people.women];
let ratios = _.map(_.flatten(_.pluck(_.union(bios), 'bio')), person => person.height / person.weight);
let average = _.reduce(ratios, (a, b) => a + b) / ratios.length;

console.log(average);
// 0.041472713284006396
```

### With bu-better-underscore

```
const B_ = require('bu-better-underscore');

let bios = new B_([people.men, people.women]);
let ratios = bios.union().pluck('bio').flatten().map(person => person.height / person.weight);
let average = ratios.reduce((a, b) => a + b).unwrap() / ratios.length;

console.log(average);
// 0.041472713284006396
```

### With bu-better-underscore `addPrototype`

```
require('bu-better-underscore').addPrototype();

let bios = [people.men, people.women];
let ratios = bios.union().pluck('bio').flatten().map(person => person.height / person.weight);
let average = ratios.reduce((a, b) => a + b) / ratios.length;

console.log(average);
// 0.041472713284006396
```

## Example with Promises

### Given

-- coming soon --