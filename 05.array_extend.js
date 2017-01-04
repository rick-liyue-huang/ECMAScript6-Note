
/*
* 1. Array.from() used to transfer two type of object (array-like-object and iterable object) to true array.
* Array.from() method support the array-like object, if one object has length property, it will be look like array
* */

/*
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

var arr1 = [].slice.call(arrayLike); // in es5
console.log(arr1);

var arr2 = Array.from(arrayLike); // in es6
console.log(arr2);

let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
    console.log(p);
});

function foo() {
    var args = Array.from(arguments);
}

*/

// also can deal with iterable object
/*
var str = Array.from('hello');
console.log(str); // [ 'h', 'e', 'l', 'l', 'o' ]

let nameSet = new Set(['a', 'b']);
Array.from(nameSet); // ['a', 'b']

*/

// function foo() {
//     var args = [...arguments];
// }

// Array.from({length: 3}); // [undefined, undefined, undefined]

// if has not function Array.from, can define one self function
/*
const toArray = ( () => {
    Array.from ? Array.from : obj => [].slice.call(obj);
});

// Array.from() also support the second argument
Array.from(arrayLike, x => x * x);

// <=>
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x); // [1, 4, 9]

// for example
let spans = document.querySelectorAll('span.name');

// map()
let name1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.from()
let name2 = Array.from(spans, s => s.textContent)


// transfer the false value element to 0 in an array
Array.from([1, , 2, , 3], (n) => n || 0); // [1 0 2 0 3]
*/


// return the type of the elements in array

/*
function typeOf() {
    return Array.from(arguments, value => typeof value);
}
console.log(typeOf(null, [], NaN)); // [ 'object', 'object', 'number' ]

*/


// two more examples for Array.from()
// Array.from({length: 2}, () => 'jack'); // ['jack', 'jack']

/*
function countSymbols(string) {
    return Array.from(string).length;
} // this function can calculate the length of string

*/

/*
* 2. Array.of() transfer a group values to array, can replace Array() or new Array()
* */

/*
Array.of(3, 4, 8); // [3, 4, 8]
Array.of(3); // [3]
Array.of(3).length; // 1
Array.of(); // []
Array.of(undefined); // [undefined]

// simulate the array.of method
function ArrayOf() {
    return [].slice.call(arguments);
}
*/


/*
* 3. copyWithin()
* */



































