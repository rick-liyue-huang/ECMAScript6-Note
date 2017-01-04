
/*
* 1. basic usage, in es6 we can set the argument with default value, and we can not declare the same argument by let or const in
* function body
* */

/*
function log(x, y = 'world') {
    console.log(x, y);
}
log('hello'); // hello world
log('hello', 'china'); // hello china
log('hello', ''); // hello


//one more example
function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}
var p = new Point();
console.log(p); //Point { x: 0, y: 0 }


function foo(x = 5) {
    let x = 1; // SyntaxError: Identifier 'x' has already been declared
    // const x = 2; // SyntaxError: Identifier 'x' has already been declared
}

*/

/*
* 2. destructuring and argument default value combination, and we also put the argument with default value at the last one
* */

/*
function foo({x, y = 5}) {
    console.log(x, y);
}
foo({}); // undefined, 5
foo({x: 1}); // 1, 5
foo({x: 1, y: 2}); // 1, 2
foo(); //  only the argument is a object, it can work, otherwise it bring error
*/

/*
* 3. function's length, which is the number of arguments without default value,
* */

/*
(function (a) {}).length; // 1

(function (a = 5) {}).length; // 0
(function (a, b, c = 5) {}).length // 2
(function (a = 0, b, c) {}).length; // 0
(function (a, b = 1, c) {}).length; // 1

*/

/*
* 4. scope, if the argument's default value is variable, the variable is in the current scope firstly, and then the global scope
* */

/*
var x = 1;
function f(x, y = x) {
    console.log(y);
}
f(2); // 2, first x = 2, then y = x = 2

*/
/*
let x = 1;
function f(y = x) {
    let x = 2;
    console.log(y);
}
f(); // 1,

*/

/*
function f(y = x) {
    let x = 2;
    console.log(y);
}
f(); // error x isnot defined

// if the default value is a function
let foo = 'outer';

function bar(func = x => foo) {
    let foo = 'inner';
    console.log(func());
}
bar(); // outer
*/
//one more example
/*
var x = 1;
function foo(x, y = function() { x = 2; }) {
    var x = 3;
    y();
    console.log(x);
}

foo(); // 3

*/

// the application by arguments default value -- we can declare a function to determine that one argument can not be omit,
//otherwise will produce error

/*
function throwIfMission() {
    throw new Error('missing parameter');
}
function foo(mustBeProvided = throwIfMission()) {
    return mustBeProvided;
}

foo(); // Error: missing parameter. if the foo() has not parameter, it will set the default value -- throwIfMissing func, so produce error

*/


/*
*  5. rest arguments: in format of '...variable name', which means that it does not need arguments, the rest argument is an array.
*  the function length property does not include the ...rest
* */

/*
function add(...values) {
    let sum = 0;

    for (var val of values) {
        sum += val;
    }
    return sum;
}

add(2, 5, 3); // 10


*/
// the difference between arguments and rest for a function

/*
function sortNumbers() {
    return Array.prototype.slice.call(arguments).sort();
}

const sortNumbers1 = (...numbers) => numbers.sort(); // here numbers is an array
*/

/*
function push(array, ...items) {
    items.forEach(function (item) {
        array.push(item);
        console.log(item);
    });
}

var arr = [];
push(arr, 1, 2, 3);
*/

/*
* 6. ... extension operator, used to transfer the array to the series of data
* */
/*
console.log(...[1, 2, 3]); // 1 2 3
console.log(1, ...[2, 3, 4], 5); // 1 2 3 4 5
[...document.querySelectorAll('div')]; // [div, div, div]
*/

/*
function add(x, y) {
    return x + y;
}
var numbers = [4, 35];
add(...numbers);
*/

/*
* 7. because ... extension operator can extract array, we do not need apply
* */

/*
function f(x, y, z) {

}
var args = [0, 1, 2];
f(...args);

//
Math.max(...[13, 5, 6]);

// push one array to the other
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);

new Date(...[2016, 1, 1]);

*/

/*
* ...operator can concat the array
* */

[1, 2].concat(more);
[1, 2, ...more];

var arr1 = ['a', 'b'], arr2 = ['c'], arr3 = ['d', 'e'];
[...arr1, ...arr2, ...arr3];











