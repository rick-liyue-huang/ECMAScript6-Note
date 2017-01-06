
/*
* 1. Set is one data structure, which includes a group of unrepeated data.
* set receive the array as argument
* */
/*
var s = new Set();

[2,3,4,5,4,2,2].map(x => s.add(x));
for (let i of s) {
    console.log(i); // 2 3 4 5,  it show that set can add the repeated data
}
*/


/*
var set = new Set([1, 2, 3, 4, 4]);
console.log(set); // Set {1, 2 3 4}
console.log([...set]); //[ 1, 2, 3, 4 ]

var items = new Set([1,2,3,4,5,5,5]);
console.log(items.size); // 5

function divs() {
    return [...document.querySelectorAll('div')];
}

var set = new Set(divs());
set.size;//

// =>
divs().forEach(div => set.add(div));
set.size; // same as upon code
*/

// so we also have one method to eliminate the repeated element
// [...new Set(array)]; //


// when add element to Set, it will not transfer the type automatically. but remember that NaN = NaN

/*
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set;// Set {NaN} only one NaN

*/

// additionally, any two objects are not equal
/*
let set = new Set();
set.add({});
set.size; // 1
set.add({});
set.size; // 2

*/

/*
* 2. Set instance properties
* Set.prototype.constructor: the constructor, is Set defaultly
* Set.prototype.size: return Set instance member number
* */


/*
* 3. Set instance methods divided two types:
* the operate methods and iterate method
* */

// add(value),  delete(value), has(value)  clear()
/*
var s = new Set();
s.add(1).add(2).add(2);

s.size; // 2

s.has(1); // true
s.has(2); // true
s.has(3); // false

s.delete(1);
s.has(1); // false

s.clear();
s.size; // 0

*/

// match the difference between Object and Set
/*
// for object
var properties = {
    'width': 1,
    'height': 1
};

if (properties[someName]) {
    // do something
}
// for set
var properties2 = new Set();
properties2.add('width');
properties2.add('height');

if (properties2.has(someName)) {
    // do something
}

*/

/*
// Array.from() also can transfer set to array
var items = new Set([1, 2, 3, 4, 4]);
var array = Array.from(items); // [1 ,2, 3, 4]

// so we can get the other way to delete the duplicate element
function dedupe(array) {
    return Array.from(new Set(array));
}
*/

// the other one is iterate methods:
// keys(), values(), entries(), forEach()

// the first three are all Iterator object, because Set only has value no key, so keys() === values()

/*
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
    console.log(item); // red green blue
}

for (let item of set.values()) {
    console.log(item); // red green blue
}

for (let item of set.entries()) {
    console.log(item);
}

// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

*/

/*
let set = new Set(['red', 'blue', 'green']);
for (let item of set) {
    console.log(item); // red blue green
}

// same as the set.values()

*/


// forEach() method used to do something for each element of set. actually, ...operator is using forEach inside
/*
let set = new Set([1, 2, 3]);
set.forEach( (value, key) => console.log(value * 2)); // 2 4 6
console.log(set); // Set {1 ,2, 3}
*/


// the array methods, map and filter, also can use for Set
/*
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
console.log(set); // Set {2, 4, 6}

let set1 = new Set([1, 2, 3, 4, 5]);
set1 = new Set([...set1].filter(x => (x % 2) == 0));
console.log(set1); // Set {2, 4}

*/

/*
// some applications for Union, Intersect, and Difference

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// Union
let union = new Set([...a, ...b]); // Set {1, 2, 3, 4}

// Intersect
let intersect = new Set([...a].filter(x => b.has(x))); // Set {2, 3}

// Difference
let difference = new Set([...a].filter(x => !b.has(x))); // Set {1}
*/

/*
// if we want to change the original set after iterate the element of set
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2)); // Set {2, 4, 6}

let set1 new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2)); // Set {2, 4, 6}

*/


/*
*  3. WeakSet, is similar as Set, which has no repeated element, but also has two difference:
*  WeakSet only contains the object element;
*  the object element are weak index
*
*  remember: weakset can NOT iterate
* */

//
// var ws = new WeakSet();
// ws.add(1); // TypeError: Invalid value used in weak set
//
// var a = [[1, 2], [3, 4]];
// var ws = new WeakSet(a);
// console.log(ws); // {}

/*
*  4. WeakSet has three methods:
*  WeakSet.prototype.add(value),  WeakSet.prototype.delete(value),  WeakSet.prototype.has(value)
*
*
* */
/*
var ws = new WeakSet();
var obj = {};
var foo = {};

ws.add(foo);
ws.add(obj);

ws.has(obj); // true
ws.has(foo); // false

ws.delete(obj);
console.log(ws);

console.log(ws.size); // undefined
*/


/*
* WeakSet cannot iterate, because the member of WeakSet are all weak indexed, they can disappeared anytime.
*
* but it can use to store the Dom node,
*
* the following code will ensure that the instance method only used on instance
* */
/*
const foos = new WeakSet();
class Foo {
    constructor() {
        foos.add(this);
    }

    method() {
        if (!foo.has(this)) {
            throw new  TypeError('Foo.prototype.method only use in Foo instance！');
        }
    }
}
*/


/*
*
* 5. Map: is similar as Object, but the key can be any type {anytype: value}
* */

/*
var m = new Map();
var o = {p: 'hello world'};

m.set(o, 'content');
m.get(o); // 'content'

m.has(o);// true
m.delete(o);
m.has(o)// false
*/

/*
var map = new Map([
    ['name', 'rick'],
    ['title', 'author']
]);

map.size; // 2
map.has('name');// true
map.get('name'); // rick
map.has('title'); // true
map.get('title'); // author

*/

/*
var m = new Map([
    [true, 'foo'],
    ['true', 'bar']
]);
m.get(true); // foo
m.get('true'); // bar

*/

// if assign the same key, the last one is valid

/*
let map = new Map();

map
    .set(1, 'aaa')
    .set(1, 'bbb');
map.get(1); // bbb

*/

/*
var map = new Map();

map.set(['a'], 222);
console.log(map.get(['a'])); // undefined, the two ['a'] are not the same one

var map2 = new Map();

var arr = new Array('a');
console.log(arr); // ['a']

map2.set(arr, 666);
console.log(map2.get(arr)); // 666, thery are all arr

*/

// same as
/*
var map = new Map();

var k1 = ['a'];
var k2 = ['a'];

map
    .set(k1, 111)
    .set(k2, 222);
map.get(k1); // 111
map.get(k2); // 222
*/

// map will set +0 -0 as same one, and see NaN as one

/*
*  6. we already known that map.get(key), map.set(key, value), map.delete(key), map.has(key) map.clear()
*
*  it also has iterate methods:
*  keys(), values(), entries(), forEach()
* */

/*
let map = new Map([
    ['F', 'no'],
    ['T', 'yes']
]);

for (let key of map.keys()) {
    console.log(key); // 'F'  'T'
}

for (let value of map.values()) {
    console.log(value); // 'no'  'yes'
}

for (let item of map.entries()) {
    console.log(item); // [ 'F', 'no' ]  [ 'T', 'yes' ]
}

for (let [key, value] of map) {
    console.log([key, value]); // same as entries()
}

*/

/*
let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
]);

[...map.keys()]; // [1, 2, 3]
[...map.values()]; // [one two three]
[...map.entries()]; // [[1,'one'], [2, 'two'], [3, 'three']]
[...map]; // [[1,'one'], [2, 'two'], [3, 'three']]

*/

// map can transfer to arry and then use filter and map methods

/*
let map0 = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');

let map1 = new Map([...map0].filter(([k, v]) => k < 3));

console.log(map1); // Map { 1 => 'a', 2 => 'b' }

let map2 = new Map( [...map0].map( ([k, v]) => [k * 2, ' ' + v]));
console.log(map2); // Map { 2 => ' a', 4 => ' b', 6 => ' c' }
*/

/*
// forEach method can receive the second argument to bind this
// here the callback this point to reporter
var reporter = {
    report: function (key, value) {
        console.log("Key: %s, Value: %s", key, value);
    }
};

map.forEach(function (value, key, map) {
    this.report(key, value);
}, reporter);

*/



/*
*  7. the ransferation between Map , Array, Object, JSON
* */


/*
// ONE, map to array
let myMap = new Map().set(true, 8).set(['foo', 3], ['abc']);
console.log([...myMap]); //[ [ true, 8 ], [ [ 'foo', 3 ], [ 'abc' ] ] ]

// TWO, array to map
let arr1 = new Map([ [ true, 8 ], [ [ 'foo', 3 ], [ 'abc' ] ] ]);
console.log(arr1); // Map { true => 8, [ 'foo', 3 ] => [ 'abc' ] }

// THREE, map to object
function strMapToObj(strMap) {

    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}


let map1 = new Map().set('yes', true).set('no', false);
let obj1 = strMapToObj(map1);
console.log(obj1); // { yes: true, no: false }


// FOUR, obj to map
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}

let map2 = objToStrMap({yes: true, no: false});
console.log(map2); // Map { 'yes' => true, 'no' => false }

// FIVE, map to JSON
function strMapToJSON(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}

let map3 = new Map().set('yes', true).set('no', false);
let json1 = strMapToJSON(map3);
console.log(json1); // {"yes":true,"no":false}



// SIX, map key has non-string, map to json
function mapToArrayJson(map) {
    return JSON.stringify([...map]);
}

let map4 = new Map().set(true, 8).set({foo: 6}, ['abc']);
let json2 = mapToArrayJson(map4);
console.log(json2); // [[true,8],[{"foo":6},["abc"]]]


// SEVEN, json to map
function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}

let map5 = jsonToStrMap('{"yes":true,"no":false}');
console.log(map5); //Map { 'yes' => true, 'no' => false }

// EIGHT, json is array, json to map
function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}

let map6 = jsonToMap('[[true,7],[{"foo":3},["abc"]]]');
console.log(map6); // Map { true => 7, { foo: 3 } => [ 'abc' ] }


*/


/*
*  7. WeakMap,  the key only is object
* */

/*
var wm = new WeakMap();
var element = document.querySelectorAll('.element');

vm.set(element, 'original');
vs.get(element); // 'original'

element.parentNode.removeChild(element);
element = null;
vm.get(element); // undefined
*/


// one application is to use weakmap to set private properties
/*
let _counter = new WeakMap();
let _action = new WeakMap();

class Countdown {
    constructor(counter, action) {
        _counter.set(this, counter);
        _action.set(this, action);
    }
    dec() {
        let counter = _counter.get(this);
        if (counter < 1) return;
        counter--;
        _counter.set(this, counter);
        if (counter === 0) {
            _action.get(this)();
        }
    }
}

let c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
*/

// here _counter and _action are weak index, if the instance is deleted, they both disappear.



















