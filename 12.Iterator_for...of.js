
/*
*  1. Iterator :
*
*   since ES6, it contains four types of set -- Array, Object, Set, Map, so we need a unit interface to
*   deal with the different data structure.
*
*   Iterator is thus this rule, which deals with the data structure --- it will provide the visit mechanism,
*   to visit all the members
*
*   the usage of iterator:
*   1> it provides the uniform visit interface for different data structure;
*   2> make the data structure members in some order
*   3> es6 create the new iterate operator for...of
*
* */


/*
* Iterator going through the members likes this:
* 1> create a pointer object, pointing the current data structure start location, so we can say that Iterator
* object is the pointer object in nature.
* 2> the first time calling pointer object next() method will point to the first member.
* 3> the second time calling pointer object next() method will point to the second member.
* 4> continuously call the pointer object next() method until point to the last member
* 5> each next() method, it will return the current data structure member information, which will contain
* the value and done property, value is the current member value, done is a boolean value.
*
* */

/*
// one simulated function to next() method, and Iterator object
var it = makeIterator(['a', 'b']);

it.next();
it.next();
it.next();

function makeIterator(array) {
    var nextIndex = 0;
    return {
        next() {
            return nextIndex < array.length ?
            {value: array[nextIndex++], done: false} :
            {value: undefined, done : true}
        }
    };
}

*/

/*
// actually Iterator seperated from the target data structure, so we can do that
var it = idMaker();

console.log(it.next().value); // 0
console.log(it.next().value); // 1
console.log(it.next().value); // 2

function idMaker() {
    var index = 0;

    return {
        next () {
            return {value: index++, done: false};
        }
    };
}

*/

/*
* 2. some data structures have default Iterator interface, so they can us for...of...
* and the object of these data structure can be acted as iterable.
* they are array, array-like object, Set, and Map
* */
/*
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator];

iter.next();
iter.next();
iter.next();
// here arr is an array, it has the iterator property in Symbol.iterator property, so iter use arr's iterator
// property, which make it has the same iterator property


*/

// if one object can be for...of operated, it will have [Symbol.iterator] property
/*
class RangeIterator {

    constructor(start, stop) {
        this.value = start;
        this.stop = stop;
    }

    [Symbol.iterator]() { return this; }

    next() {
        var value = this.value;
        if (value < this.stop) {
            this.value++;
            return {done: false, value: value};
        } else {
            return {done: true, value: undefined};
        }
    }
}

function range(start, stop) {
    return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
    console.log(value); // 0 1 2
}
*/


// using the iterator to simulate pointer
/*
function Obj(value) {
    this.value = value;
    this.next = null;
}

Obj.prototype[Symbol.iterator] = function () {
    var iterator = {
        next: next
    };

    var current = this;

    function next() {
        if (current) {
            var value = current.value;
            current = current.next;
            return {
                done: false,
                value: value
            };
        } else {
            return {
                done: true
            };
        }
    }
    return iterator;
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;

for (var i of one) {
    console.log(i); // 1 2 3
}


*/

// add iterator interface for an object
/*
let obj = {
    data: ['hello', 'world'],
    [Symbol.iterator]() {
        const self = this;
        let index = 0;

        return {
            next() {
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done: false
                    };
                } else {
                    return {
                        value:undefined,
                        done: true
                    };
                }
            }
        };
    }
};

*/


// for those array-like object, we have a simplier way

/*

NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

// or

NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];

[...document.querySelectorAll('div')] // can execute the for...of..

*/
// application
/*
let iterable = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};

for (let item of iterable) {
    console.log(item); // a b c
}

*/

// but if we apply Symbol.iterator to un-array-like object, it will not work at all

/*
 let iterable = {
 a: 'a',
 b: 'b',
 c: 'c',
 length: 3,
 [Symbol.iterator]: Array.prototype[Symbol.iterator]
 };
 for (let item of iterable) {
 console.log(item); // undefined, undefined, undefined
 }
 */


/*
*  3. in some scenes, it will call Symbol.iterator interface
*
*
*
* */

// 1> in destructuring application

/*
let set = new Set().add('a').add('b').add('c');

let [x, y] = set; // x = 'a' y = 'b'

let [first, ...rest] = set; // first = 'a'   rest = ['b', 'c'];
*/

// 2> ...operator
/*
var str = 'hello';
[...str]; //  ['h','e','l','l','o']

let arr = ['b', 'c'];
['a', ...arr, 'd']; // ['a', 'b', 'c', 'd']
*/

// 3> yield*

/*
 let generator = function* () {
 yield 1;
 yield* [2,3,4];
 yield 5;
 };

 var iterator = generator();

 iterator.next() // { value: 1, done: false }
 iterator.next() // { value: 2, done: false }
 iterator.next() // { value: 3, done: false }
 iterator.next() // { value: 4, done: false }
 iterator.next() // { value: 5, done: false }
 iterator.next() // { value: undefined, done: true }
 */


// 4> some other scenes: for...of,   Array.from(),  Map(), Set(), WeakMap(), WeakSet()
//    Promise.all(),  Promise.race()


/*
*
*  4. string's iterator interface
*  string also has iterator interce
* */

/*
var someString = 'hi';

typeof someString(Symbol.iterator);// function

var iterator = someString[Symbol.iterator]();

iterator.next();  // { value: "h", done: false }
iterator.next(); // { value: "i", done: false }
iterator.next(); // { value: undefined, done: true }
*/

// we also can overwrite the original Symobl.iterator method
/*
var str = new String('hi');
[...str]; // [h i]

str[Symbol.iterator] = function () {

    return {
        next: function () {
            if (this._first) {
                this._first = false;
                return {value: 'bye', done: false};
            } else {
                return {done: true};
            }
        },
        _first: true
    };
};

console.log([...str]); // [ 'bye' ]
console.log(str); //[String: 'hi']

*/


/*
*  5. use Generator to realize Iterator interface
* */

/*
var myIterable = {};

myIterable[Symbol.iterator] = function *() {
    yield 1;
    yield 2;
    yield 3;
};

[...myIterable] // [1 2 3]

let obj = {
    * [Symbol.iterator]() {
        yield 'hello';
        yield 'world';
        }
};

for (let x of obj) {
    console.log(x); // hello   world
}

*/



/*
*
* 6. for...of , for those data structures who have iterator interface
* */

// for array
/*
const arr = ['red', 'green', 'blue'];

for (let v of arr) {
    console.log(v); // red  green   blue
}

const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for (let v of obj) {
    console.log(v); // red green blue
}

*/

// the difference between for...of and for...in, for...in only get key, while for...of can get value
/*
var arr = ['a', 'b', 'c', 'd'];

for (let a in arr) {
    console.log(a); // 0 1 2 3
}
for (let a of arr) {
    console.log(a); // a b c d
}
*/

/*
let arr = [3, 5, 7];
arr.foo = 'hello';
for (let i in arr) {
    console.log(i); // 0 1 2 foo
}
for (let i of arr) {
    console.log(i); // 3 5 7
}

*/

// for Set and Map structure,

/*
var engines = new Set(['gecko', 'trident', 'webkit', 'webkit']);
for (var e of engines) {
    console.log(e); // gecko trident, webkit
}

var es6 = new Map();
se6.set('edition', 6);
se6.set('committee', 'tc39');
se6.set('standard', 'es262');
for (var [name, value] of es6) {
    console.log(name + ": " + value);
}
// eition: 6    committee: tc39,   standard: es262

// note that, for..of return the value in Set structure, and return the key,value in Map
*/


// for some computed structure, we use keys(), values() and entries()

/*
let arr = ['a', 'b', 'c', 'd'];
for (let paire of arr.entries()) {
    console.log(paire);  // [0, a]  [1, b]  [2, c] [3, d]
}

*/

// for some array-like object
/*
let str = 'hello';
for (let s of str) {
    console.log(s); // h e l l o
}

let paras = document.querySelectorAll('p');
for (let p of paras) {
    p.classList.add('test');
}

function printArgs() {
    for (let x of arguments) {
        console.log(x);
    }
}
printArgs('a', 'b');
*/

// we should note that not all array-like data structure have for..of method, so we use Array.from

/*
let arrayLike = {length: 2, 0: 'a', 1: 'b'};

// for (let x of arrayLike) {
//     console.log(x); // arrayLike[Symbol.iterator] is not a function
// }

for (let x of Array.from(arrayLike)) {
    console.log(x); // a b
}
*/

// for Object data structure

/*
 var es6 = {
 edition: 6,
 committee: "TC39",
 standard: "ECMA-262"
 };

 for (let e in es6) {
 console.log(e);
 }
 // edition
 // committee
 // standard

 for (let e of es6) {
 console.log(e);
 }
 // TypeError: es6 is not iterable
 */


// so we can use Object.keys()
/* method one: ---
for (var key of Object.keys(someObject)) {
    console.log(key + ": " + someObject[key]);
}

*/

/* method two: ---
 jQuery.prototype[Symbol.iterator] =
 Array.prototype[Symbol.iterator];
 */

/* method three: ---
 function* entries(obj) {
 for (let key of Object.keys(obj)) {
 yield [key, obj[key]];
 }
 }

 for (let [key, value] of entries(obj)) {
 console.log(key, "->", value);
 }
 // a -> 1
 // b -> 2
 // c -> 3
 */


/*
* 7. some iterate ways :
*
* */
/*
// 1> for(;;)
for (var index = 0; index < myArray.length; index++) {
    console.log(myArray[index]);
}

// 2> forEach
myArray.forEach(function (value) {
    console.log(value);
});

// 3> for...in
for (var index in myArray) {
    console.log(myArray[index]);
}
// 4> for...of
for (let value of myArray) {
    console.log(value);
}

// 5> for...of can use break
for (let n of fibonacci) {
    if (n > 1000) {
        break;
    }
    console.log(n);
}

*/






















