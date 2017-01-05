
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

/*
[1, 2].concat(more);
[1, 2, ...more];

var arr1 = ['a', 'b'], arr2 = ['c'], arr3 = ['d', 'e'];
[...arr1, ...arr2, ...arr3];


const [first, ...rest] = [1, 2, 3, 4, 5];
// first = 1, rest = [2, 3, 4, 5]

const [first, ...rest] = [];
//first = undefined, rest = []

const [first, ...rest] = ['foo'];
//first = 'foo', rest = []

*/

// ... used for function return value
// var dataField = readDataField(database);
// var d = new Date(...dataField);

// ... used to transfer the string to array
// [...'hello'] //  [ "h", "e", "l", "l", "o" ]


// this also can differentiate the 32bit unicode
// 'x\uD83D\uDE80y'.length // 4
// [...'x\uD83D\uDE80y'].length // 3


// any iterator object data can be transfer to the true array by ...
// var nodeList = document.querySelectorAll('div');
// var array = [...nodeList];

// for those function arguments the ...operator does not work, but can use Array.from()
/*
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

let arr = Array.from(arrayLike);
*/

// ... also can be used in map and generator

/*
let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
]);
let arr = [...map.keys()]; // [1, 2, 3]

var go = function *() {
    yield 1;
    yield 2;
    yield 3;
};
[...go()]; // [1, 2, 3]
*/


/*
*
* 8. use stricit should know that: if the function arguments use default value, destructuring, or ...rest, in the
* function body can not be set as "use strict";
* */

/*
function doSomething(a, b = a) {
    'use strict';
    // code --- error
}

const doSomething = function ({a, b}) {
    'use strict';
    // code -- error
};

const doSomething = (...a) => {
    'use strict';

    // code --- error
};
*/

// in order to avoid the error, we have two methods:
// the first one use strict mode in global environment

/*
'use strict';
function dosomething(a, b = a) {
    // code
}

// the second one use the iife
const dosomething = (function () {
    'use strict';
    return function (value = 42) {
        return value;
    };
}());

*/

/*
* 9. function name property will return the function's name
* */

/*
var func1 = function () {};
console.log(func1.name); // func1

(new Function).name; // anonymous

function foo() {}
foo.bind({}).name; // bound foo

*/


/*
*  => arror to define the function
* */

/*
var f = v => v; // var f = function(v) {return v;}

// because {} act as block, so need parentheses
var getTempItem = id => ({id: id, name: 'temp'});

const full = ({first, last}) => first + ' ' + last;

const isEven = n => n % 2 == 0;
const square = n => n * n;

[1, 2, 3].map(x => x * x);

var result = values.sort((a, b) => a - b);

const numbers = (...nums) => nums;
const headAndTail = (head, ...tail) => [head, tail];

*/

/*
*  the => should note something:
*  1. in the function body, the 'this' points to the object, where the function defined, but not points to the
*  object, where the function call.
*  2. can not be as constructor, can not use new.
*  3. can not use arguments, the argumnets object does not exist, we can use ...rest
 *  4. can not use yield, so => function can not be use as generator function
* */


// some applications for this in => function


// for => function, it is valid on foo is called, so it will be 42.
// in one word, the => function make the 'this' bind with the function defined scope, but not the runtime scope.
/*
function foo() {
    setTimeout( () => {
        console.log('id', this.id);
    }, 100);
}

var id = 21;

foo.call({id: 42}); // id 42

function foo1() {
    setTimeout(function () {
        console.log('id', this.id);
    }, 1000);
}
var id = 21;

foo1.call({id: 42}); // id undefined, because var id is hoisted, and has not been assigned value.
*/


/*
function Timer() {
    this.s1 = 0;
    this.s2 = 0;

    setInterval( () => this.s1++, 1000);

    setInterval(function () {
        this.s2++;
    }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100); // 3
setTimeout(() => console.log('s2: ', timer.s2), 3100); // 0

*/

// => function make this points to the fixed object, so it useful for callback encapsulation
// for example, we can encapsulate the dom event callback in an object
/*
var handler = {
    id: '123456',

    init: function () {
        document.addEventListener('click',
        event => this.doSomething(event.type), false);
    },
    doSomething: function (type) {
        console.log('handling ' + type + ' for' + this.id);
    }
}; // here the this always points to the handling object

*/


// the principle of this is that : => function has not the this, it belong to the outside block

/*function foo() {
    setTimeout( () => {
        console.log('id: ', this.id);
    }, 100);
}

// =>
function foo() {
    var _this = this;
    setTimeout(function () {
        console.log('id: ', _this.id );
    }, 100);
}
*/

// here only has one this, because they all have the this theirselve.
/*
function foo() {
    return () => {
        return () => {
            return () => {
                console.log('id:', this.id);
            };
        };
    };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
*/

/*
(function() {
    return [
        (() => this.x).bind({ x: 'inner' })()
    ];
}).call({ x: 'outer' });
// ['outer']
*/

/*
* 10. nesting => function can make pipeline rule,
* */

/*
const plus1 = a => a + 1;
const mult2 = a => a * 2;

mult2(plus1(5)); // 12
*/


/*
* 11. tail call -- the last step of one function is to call the other function
* */
/*
function f(x) {
    return g(x);
} // this is the standard tail call
*/


/*
// they all are not tail call
function f(x) {
    let y = g(x);
    return y;
}
function f(x) {
    return g(x) + 1;
}
function f(x) {
    g(x);
}
*/

/*
// tail call is just the execute step
function f(x) {
    if (x > 0) {
        return m(x);
    }
    return n(x);
}
*/

// note that, only the last step tail call never use the outter function's variable, it call tail call
/*
function addOne(a) {
    var one = 1; // addOne's inside variable
    function inner(b) {
        return b + one;
    }
    return inner(a);
} // this is not the tail call.
*/


/*
* 12. tail recursion --- tail call self
* */
/*
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
} // to much O(n), so its bad


// the following code is good,
function factorial1(n, total) {
    if (n === 1) return total;
    return factorial(n-1, n * total);
}
factorial(5, 1);
*/
/*
function Fibonacci(n, ac1 = 1, ac2 = 1) {
    if (n <= 1) {return ac2; }
    return Fibonacci(n - 1, ac2, ac1 + ac2);
}

console.log(Fibonacci(100));
console.log(Fibonacci(1000));
console.log(Fibonacci(10000));

*/

/*
* 13. the incursion function optimization ---
* here has two ways: the currying (transfer several argument function to sole argument function ),
* and in es6 function argument default value method
* */

// first one currying
/*
function currying(fn, n) {
    return function (m) {
        return fn.call(this, m, n);
    };
}

function tailFactorial(n, total) {
    if (n === 1) return total;
    return tailFactorial(n - 1, n * total);
}
const factorial = currying(tailFactorial, 1);

factorial(5); // 120
*/

// the second one
/*
function factorial(n, total = 1) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
}

*/

/*
* 14. for some environment, it does not support es6, we can do it by trampoline way
*
* */

/*
function tco(f) {
    var value;
    var active = false;
    var accumulated = [];

    return function accumulator() {
        accumulated.push(arguments);
        if (!active) {
            active = true;
            while (accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }
            active = false;
            return value;
        }
    };
}

var sum = tco(function(x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1)
    }
    else {
        return x
    }
});

sum(1, 100000)

*/




















