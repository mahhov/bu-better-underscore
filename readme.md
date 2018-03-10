## Setup

`npm i -save bu-better-underscore`

`const B_ = require('bu-better-underscore');`

## How's this different than underscore?

undrescore provides static methods that take in as a parameter the very object they are operating on.

```
let list = [0, 1, 2, 3, 4];
let notZero = num => num !== 0;
let inverse = num => 1 / num;

_.map(_.filter(list, notZero), inverse); 
```

bu-better-underscore on the other hand allows invoking methods directly on the object.

```
let list = new B_([0, 1, 2, 3, 4]);
let notZero = num => num !== 0;
let inverse = num => 1 / num;

list.filter(notZero).map(inverse).unwrap();
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
 
### With Undrescore

```
const _ = require('underscore');

let bios = [people.men, people.women];
let heightWeightRatios = _.map(_.flatten(_.pluck(_.union(bios), 'bio')), person => person.height / person.weight);
let averageheightWeightRatio = _.reduce(heightWeightRatios, (a, b) => a + b) / heightWeightRatios.length;

console.log(averageheightWeightRatio);
// 0.041472713284006396
```

### With Better-Underscore

```
const B_ = require('bu-better-underscore');

let bios = new B_([people.men, people.women]);
let heightWeightRatios = bios.union().pluck('bio').flatten().map(person => person.height / person.weight);
let averageheightWeightRatio = heightWeightRatios.reduce((a, b) => a + b).unwrap() / heightWeightRatios.length;

console.log(averageheightWeightRatio);
// 0.041472713284006396
```