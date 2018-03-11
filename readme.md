# bu-better-underscore

## Setup

`npm i -save bu-better-underscore`

`const B_ = require('bu-better-underscore');`

or

`require('bu-better-underscore').addPrototype();`

## What's this do?

`new B_(array).map(func)`

`array.map(func)`

`B_.map(func)(list)`

## How's this different than underscore?

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

bu-better-underscore can also optionally add the utility methods directly to the object prototype.

```
require('bu-better-underscore').addPrototype();

let list = [0, 1, 2, 3, 4];
let notZero = num => num !== 0;
let inverse = num => 1 / num;

list.filter(notZero).map(inverse);
```

## What about promises?

underscore is overly verbose and requires wrapping your function inside another function.

```
let promise = Promise.resolve([1, 2, 3, 4, 5]);
promise.then(list => _.map(list, num => num * 3));
```

bu-better-underscore, on the other hand, can create the wrapping function for you.

```
let promise = Promise.resolve([1, 2, 3, 4, 5]);
promise.then(B_.map(num => num * 3));
```

## Example
 
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
let heightWeightRatios = _.map(_.flatten(_.pluck(_.union(bios), 'bio')), person => person.height / person.weight);
let averageheightWeightRatio = _.reduce(heightWeightRatios, (a, b) => a + b) / heightWeightRatios.length;

console.log(averageheightWeightRatio);
// 0.041472713284006396
```

### With bu-better-underscore

```
const B_ = require('bu-better-underscore');

let bios = new B_([people.men, people.women]);
let heightWeightRatios = bios.union().pluck('bio').flatten().map(person => person.height / person.weight);
let averageheightWeightRatio = heightWeightRatios.reduce((a, b) => a + b).unwrap() / heightWeightRatios.length;

console.log(averageheightWeightRatio);
// 0.041472713284006396
```

### With bu-better-underscore `addPrototype`

```
require('bu-better-underscore').addPrototype();

let bios = [people.men, people.women];
let heightWeightRatios = bios.union().pluck('bio').flatten().map(person => person.height / person.weight);
let averageheightWeightRatio = heightWeightRatios.reduce((a, b) => a + b) / heightWeightRatios.length;

console.log(averageheightWeightRatio);
// 0.041472713284006396
```