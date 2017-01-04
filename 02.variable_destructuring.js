
/*
* in es6, the values can be extracted from objects and arrays, or assign value to the variable, it called destructuring
* */
/* 1. for array
var a = 1; var b = 2; var c = 3; // can be written in..
var [a, b, c] = [1, 2, 3];
*/


// the mode match, which means that the both side has the same mode of the equal sign.
/*
let [foo, [[bar], baz]] = [1, [[2], 3]];
// foo = 1, bar = 2, baz = 3

let [,,third] = ['foo','bar','baz'];
// third = baz

let [x,,y] = [1,2,3];
//x = 1, y = 3

let [head, ...tail] = [1,2,3,4];
console.log(tail); // 234

let [x, y, ...z] = ['a'];
//x = 'a'  y = undefined, z = []

//note that the value will be undefined, if the destructuring fail
var [foo] = []; // undefined
var [bar, foo] = [1]; // foo = undefined

*/

/*
// for the not completely destructuring, it also can work
let [x, y] = [1,2,3];
//x = 1, y = 2

let [a, [b], c] = [1, [2,3], 4];
// a = 1, b = 2, c = 4
*/

/*
//if the right side of equal sign is not the array, it will call error
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};

//all upon code will call error
*/


/*
// destructuring allows the default value
var [foo=true] = [];
//foo = true

[x, y='b'] = ['a']; // x =a, y = b
[x, y='b'] = ['a', undefined]; // x =a, y = b


//also note that in es6 it use strict equal ===, null !== undefined, so it will overwrite default value
var [x=1] = [undefined];
var [y=1] = [null];
console.log(y); // null
console.log(x); // 1
*/

/*
// it the default value is a expression, it will has lazy property, which means that it will works when is used.
function f() {
    console.log('aaa');
}
let [x = f()] = [1]; //
console.log(x); // here, the x can get value by equal 1, so the f() no working.

*/


/*
// the default value can also assigned by other variable, but the variable must already be declared
let [x= 1, y = x] = [];
console.log(x); console.log(y);
let [x= 1, y = x] = [2];
console.log(x); console.log(y);
let [x= 1, y = x] = [1, 2];
console.log(x); console.log(y);
let [x = y, y = 1] = []; //
console.log(x); console.log(y);

*/


/*
* 2. for object
* */


/*
var {foo, bar} = {foo:'aaa', bar: 'bbb'};
// foo = aaa, bar = bbb
// note that: the array destructuring is matched by element order in array, whereas the object destructuring is match by property

var {bar, foo} = {foo:'aaa', bar: 'bbb'};
foo = aaa, baz = bbb;

var {baz} = {foo: 'aaa', bar: 'bbb'}; // baz = undefined

*/

/*
//if the variable name is not identify to the property name, must written in
var {foo:baz} = {foo:'aaa', bar:'bbb'};
// baz = aaa

let obj = {first: "hello", last: "world"};
let {first: f, last: l} = obj;
// f = hello, l = world

//we can find that in object destructuring, it first find the same name property, and then assign the responding variable,
// the truly assigned one is the responding variable.

// but let and const can not be used in object destructuring.

*/

/*

let foo;
({foo} = {foo: 1});

let baz;
({bar:baz} = {bar: 1});

// the upon code needs parentheses, otherwise it will think the begin brace as the block.
var obj = {
    p: [
        'Hello',
        {y: 'world'}
    ]
};

var {p: [x, {y}]} = obj;
// x = hello, y = world
// here p is mode, but not the variable.

var node = {
    loc: {
        start: {
            line: 1,
            column: 5
        }
    }
};

var { loc: {start: {line}}} = node;
// line = 1, loc = error start = error, here only line is the variable

let obj = {};
let arr = [];

( {foo: obj.prop, bar: arr[0]} = {foo: 123, bar: true});
obj = {prop: 123},  arr = [true]

*/

/*
* 3. string destructuring
*
* */

// const [a, b, c, d, e] = 'hello';
// a = 'h', b = 'e', c = 'l', d = 'l', e = 'o'

// like array, string has the property of length
// let {length: len} = 'hello';
// console.log(len); // 5


/*
* 4. number and boolean destructuring
*  number and boolean encapsulation object both have toString property, so the right side of equal sign is not onbject,
*  it will transfer to object.
* */
//
// let {toString: s} = 123;
// s === Number.prototype.toString; // true
//
// let {toString: s} = true;
// s === Boolean.prototype.toString; // true

// let {prop: x} = undefined; // error
// let {prop: y} = null; // error


/*
* 5. function argument destructuring
* */
/*
function add([x, y]) {
    return x + y;
}
add([2, 4]); // 6

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// 3, 7

*/

// usage for destructuring

// 1. exchange the variable value
// [x, y] = [y, x];

// return more values from function, function only return one value, but we can return a array or object
/*
function example() {
    return [1, 2, 3];
}
var [a, b, c] = example();

function example1() {
    return {
        foo: 1,
        bar: 2
    };
}
var {foo, bar} = example1();
*/

// 3. define the function arguments

/*
function f([x, y,z]) {}
f([1, 2, 3]);

function f1({x, y, z}) {}
f1({z: 3, x: 2, x: 8});
*/

// 4. extract json data

/*
var jsonData = {
    id: 42,
    status: "ok",
    data: [45, 89]
};

let {id, status, data, number} = jsonData;
console.log(id, status, data, number); //42 'ok' [ 45, 89 ] undefined

*/

// 5. function arguments default value
/*
jQuery.ajax = function (url, {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,

    // .. more confg
}) {
    // ... do stuff
}; // after assign the default argument value, will avoid the statement like "var foo = config.foo || 'default foo'"
*/

// 6. loop Map structure
/*
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
    console.log(key + ' is ' + value);
}
// first is hello second is world

*/

// 7. input the module method
// const {SourceConsumer, SourceNode} = require("source-map");

















