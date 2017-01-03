
/*
* 1. let is similar as var but only valid in block
* */
"use strict";

/*
{
    let a = 10;
    var b = 1;
}
console.log(b); // 1
console.log(a); // ReferenceError: a is not defined
*/

/*
* note: let and var declare two variables, and then call them outside the block, 'a' is wrong, and b gets the value of 1.
* so we know that let is only valid in the block where it is defined.
* */

// one useful application is for the for-loop

/*
for (let i = 0; i < 10; i++) {}
console.log(i); // ReferenceError: i is not defined, because the i is defined in for-loop body block
*/

// another example of difference between var and let in for-loop
/*
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6]();

*/

// upon code alway produce 10, because i is declared by var, in each loop the new i value will overwrite the old one, leading to get
// the last value of 10.

// in previous edition of js, we can get the responding value by dong this

/*
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = i;
    a[i] = function () {
        console.log(this);
    };
}
a[6]();

*/

// but if we use let, it will get the easier way
/*
var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); // 6
*/
// upon code, variable i is declared by let, so it is only valid in the current loop, and get the new variable.

// 2. let has not variable hoisting function
/*
console.log(foo); // undefined
var foo = 3;

console.log(bar); // ReferenceError: bar is not defined
let bar = 2;
*/

// 3. temporal dead zone, let binds the block, meaning that it will not be affected by outside
/*var tmp = 123;

if (true) {
    tmp = 'abc';
    let tmp;
}
*/
/*
* note: here exists the global variable tmp, but in the block it has let declared variable tmp, so tmp variable bind the scope,
* so before the let declaration, tmp assignment will produce error. es6 defines that if here have let and const in block, the block will
* produce a closed scope, and any call of these variable before declaration of those will bring error.
* */

/*
if (true) {
    // tdz begin
    tmp = 'abc'; // ReferenceError: tmp is not defined
    console.log(tmp); // ReferenceError: tmp is not defined

    let tmp; // tdz end
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}

*/

// a similar tdz sample
/*
function bar(x= y, y = 2) {
    return[x, y];
}
bar(); // y is not defined
*/

// the avoiding variable hoisting and tdz used to decrease the runtime error.


/*
* 4. let forbids the repeated definition of the same variable in the same scope
* */
/*
function so() {
    let a = 10;
    var a = 1; // Identifier 'a' has already been declared
}

function bb() {
    let a = 10;
    let a = 1; // Identifier 'a' has already been declared
}

*/

// same as function
/*
function func(arg) {
    let arg; // Identifier 'arg' has already been declared
}
function func1(arg) {
    {
        let arg;
    }
}
*/


// why we need block scope
/*
var tmp = new Date();

function f() {
    console.log(tmp);
    if (false) {
        var tmp = 'hello world';
    }
}
f(); // undefined

*/
/*
var s = 'hello';
for (var i = 0; i < s.length; i++) {
    console.log(s[i]); // h e l l o
}
console.log(i); // 5, here variable i used to control loop, but after loop ends, the i will become the global variable
*/

// let also increases the block scope
/*
function f1() {
    let n = 5;
    if (true) {
        let n = 10;
    }
    console.log(n);
}
f1(); // 5 , means that the outer scope is not affected by the inner scope. it will be 10 if declared by var.

*/

// block scope means that IIFE (immediately invoked function expression) is not necessary.
/*
(function () {
    var tmp = 0;
})();

// =>
{
    let tmp = 0;
}

*/

/*
* before es6, it defines that function can not be declared in block scope, but can be declared in top level scope and function scope.
* */

/* so this is illegal
if (true) {
    function f() {}
}

try {
    function f1() {}
} catch (e) {

}
*/

// but in es6, it introduces the block scope, function declaration is similar as let
/*
function f() {
    console.log('im a outside func');
}

(function () {
    if (false) {
        // repeated declare the function f
        function f() {
            console.log('im inside func');
        }
    }
    f();
}());
*/

// the upon code is same as following in es5
/*
function f() {
    console.log('im outside func');
}
(function () {
    function f() {
        console.log('im inside func');
    }
    if (false) {}
    f();
}());

// whereas in es6 it will become that, it because that the inside func f is a inside function and abandon from outside outside
function f() {
    console.log('im outside func');
}
(function () {
    f();
}());

*/

/*
* so we get the three rules:
* allow function declaration in block scope;
* function declaration is similar as var, which will hoist to the top in the function scope;
* function declaration also hoists to the top in the block scope.
*
* so should avoid function declaration in block scope, if has to, it can transfer to function expression.
* */
/*
{
    let a = 'secret';
    let f = function () {
        return a;
    };
}

*/

/*
* 5. do expression, block scope is a statement, which encapsulate some operation, and no return value.
* but we can use do expression to return the whole scope value
* */
//
// {
//     let t = f();
//     t = t * t + 1;
// }

// =>
/*
let x = do {
    let t = f();
    t * t + 1;
};
console.log(x);
*/


/*
* 6. const, used to declare a constant value,
* */
/*
const PI = 3.1416;
PI;
PI = 3; // TypeError: Assignment to constant variable.
*/

// const declaration must with assignment,
// const foo; // SyntaxError: Missing initializer in const declaration

// const variable is same as let variable, which is valid in the current scope
/*
if (true) {
    const MAX = 5;
}
MAX; //ReferenceError: MAX is not defined
*/

// const also has the character of tdz
/*
if (true) {
    console.log(MAX); // ReferenceError: MAX is not defined
    const MAX = 5;
}
*/

// const variable can not repeat declaration as let
/*
var message = 'hello';
let age = 25;

const message = 'goodbye'; //SyntaxError: Identifier 'message' has already been declared
const age = 30; //SyntaxError: Identifier 'message' has already been declared
*/

/*
* for compound variable, the variable name does not index to actual data, but index to the address of data, const command just ensure that
* the address is unchangeable, and not confirm the address's data unchangeable. so must care for the object as constant
* */

/*
const foo = {};
foo.prop = 123;

foo.prop;

foo = {}; // TypeError: Assignment to constant variable

*/
/*
const a = [];
a.push('hello');
a.length = 0;
a = ['dave']; // TypeError: Assignment to constant variable.
*/

// if also make the data unchangeable, use Object.freeze({})
/*
const foo = Object.freeze({});

foo.prop = 123; //TypeError: Can't add property prop, object is not extensible
*/

/*
* 6. let, const, and class declared variable are not the properties of window (the global object).
* */

/*
var a = 1;
console.log(this.a);

let b = 10;
console.log(this.b);
*/

/*
* 7. global object:
*
* in browser, the top object is window, but in node and web work, here has no window,
* in browser and web worker, self index to top object, but node.js has such app
* in node.js, top object is global, but not support in others.
* so we usually use this to point to top object
*
* in global environment, this will point to top object, in node module and es6 module, this points to current module.
* in function, if this function does not act as the method of object, but just as function itself, this will points to top object,
* but in strict mode, this will points to undefined.
* whichever strict mode or normal mode, new Function('return this')(), always points to global object, but if browser has CSP (content
* security policy), the eval and new Function can not work.
* */

// so some self-defined methods used to points to top object
(typeof window !== 'undefined'
        ? window
        : (typeof process === 'object' &&
            typeof require === 'function' &&
            typeof global === 'object')
            ? global
            : this);

// or

var getGlobal = function () {
    if (typeof self !== 'undefined') {return self;}
    if (typeof window !== 'undefined') {return window;}
    if (typeof global !== 'undefined') {return global;}
    throw new Error('unable to locate gloable object');
};

// we do that
require('system.global/shim')(); // commonjs

import shim from 'system.global/shim'; shim(); // es6

// then
var global = require('system.global')(); // commonjs

import getGlobal from 'system.global';
const global = getGlobal();














