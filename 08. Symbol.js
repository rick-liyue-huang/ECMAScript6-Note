
/*
*  1. Symbol is a new data type, express an unique value. the previous six data types are: number, string, boolean,
*  Object, undefined and null, which means object property name has two type, one is the previous string, the other
*  is belong to Symbol type.
*
*  Symbol type is similar as String type.
*
* */
/*
let s = Symbol();
typeof s; // symbol
*/

// Symbol function can has one string as argument

/*
var s1 = Symbol('foo');
var s2 = Symbol('bar');

console.log(s1); // Symbol(foo)
console.log(typeof s2); // symbol

console.log(s1.toString());
console.log(typeof s2.toString()); // string
*/


// if the argument is object, which will transfer string by toString()
/*
const obj = {
    toString() {
        return 'abc';
    }
};
const sym = Symbol(obj);
sym; // Symbol(abc)
*/

// Symbol is unique, so
/*
var s1 = Symbol();
var s2 = Symbol();

s1 === s2; // false

var s3 = Symbol('foo');
var s4 = Symbol('foo');

s3 === s4; // false
*/

// Symbol can transfer to string
/*
var sym = Symbol('My symbol');

String(sym); //'Symbol(My symbol)'
sym.toString(); // 'Symbol(My symbol)'
*/

// Symbol can transfer to boolean
/*
var sym = Symbol();
Boolean(sym); // true
!sym; // false

if (stym) {
    // ...
}

// but can not transfer to Number type
*/

// Symbol can act as object property name, and can ensure no repeated name property
/*
var mySymbol = Symbol();

var a = {};
a[mySymbol] = 'hello';

var a = {
    [mySymbol]: 'hello'
};

var a = {};
Object.defineProperty(a, mySymbol, {value: 'hello'});

// all can get
a[mySymbol]; // 'hello'

// but remember that : can not use dot method
a.mySymbol = 'hello';
a[mySymbol]; // undefined

*/

// inside the object, we use [] to wrap the symbol type

/*
let s = Symbol();

let obj = {
    [s]: function (arg) {
        // ...
    }
};
obj[s](123);
*/

// Symbol type can used to define constant value
/*
 const COLOR_RED    = Symbol();
 const COLOR_GREEN  = Symbol();

 function getComplement(color) {
 switch (color) {
 case COLOR_RED:
 return COLOR_GREEN;
 case COLOR_GREEN:
 return COLOR_RED;
 default:
 throw new Error('Undefined color');
 }
 }
* */


// one example to eliminate magic string

/*
var shapeType = {
    triangle: Symbol()
};

function getArea(shap, options) {
    var area = 0;
    switch (shap) {
        case shapeType.triangle:
            area = .5 * options.width * options.height;
            break;
    }
    return area;
}

getArea(shapeType.triangle, {width: 100, height: 100});

*/

// 2. loop the symbol property, using Object.getOWnPropertySymbols() method
/*
 var obj = {};
 var a = Symbol('a');
 var b = Symbol('b');

 obj[a] = 'Hello';
 obj[b] = 'World';

 var objectSymbols = Object.getOwnPropertySymbols(obj);

 objectSymbols
 // [Symbol(a), Symbol(b)]
* */

/*
*  3. Symbol.for() used to reuse the same Symbol value.
*  firstly it search whether it exists previously, otherwise it will create new one.
* */

/*
var s1 = Symbol.for('foo'); // create new one
var s2 = Symbol.for('foo'); // use the upon one

s1 === s2; // true

*/

/*
*  4. module Singleton mode
*  it means that it call a class, and return the sole instance at anytime
* */

// mod.js
/*
const FOO_KEY = Symbol.for('foo');

function A() {
    this.foo = 'hello';
}

if (!global[FOO_KEY]) {
    global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];

// and then
var a = require('./mod.js');
global[Symbol.for('foo')] = 123;// can not overwritten
*/





























