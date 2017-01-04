
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
* 3. copyWithin(), array instance method, in the current array, copy the designated elements to the target element
* target (necessary): replace the elements from here;
* start (optional): read the designated elements from here
* end (optional): redad the designated elements until here
*
* it means taht this method will change the current array
* Array.prototype.copyWithin(target, start = 0, end = this.length)
* */

/*
[1, 2, 3, 4, 5].copyWithin(0, 3); // [4, 5, 3, 4, 5],

[1, 2, 3, 4, 5].copyWithin(0, 3, 4); // [4, 2, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(0, -2, -1); // [4, 2, 3, 4, 5]


// 4. array instance find() and findIndex()
// find(callback) all elements of array execute the callback, until the return boolean value is true, then return the responding element
[1, 4, -5, 10].find( (n) => n < 0); // -5

[1, 5, 10, 15].find(function (value, index, arr) {
    return value > 9;
});
 // 10

// findIndex() is similar as find(), but return the responding element index
[1, 5, 10, 15].findIndex(function (value, index, arr) {
    return value > 9;
}); // 2

[NaN].indexOf(NaN); // -1

[NaN].findIndex(y => Object.is(NaN, y)); // 0

*/

/*
* 5. fill(), used to fill the array with designated value, the second argument is the start index, and third arg is end index
* */
/*
['a', 'b', 'c'].fill(7); // [7, 7, 7]
new Array(3).fill(7); // [7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2); // ['a', 7, 'c']

*/

/*
* 6. array instance has three methods of entries(), keys(), values(). they all used for loop array, we can use for..of statement
* to loop for the array, the keys() is for key, the values() is for value, the entries() is for key-value loop
* */

/*
for (let index of ['a', 'b'].keys()) {
    console.log(index); // 0, 1
}

for (let elem of ['a', 'b'].values()) {
    console.log(elem); // 'a'  'b'
}

for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem); // 0 'a'   1 'b'
}

*/

// if we do not use the for..of loop, we can use next() method
/*
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.value); // undefined

console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
*/

/*
* 7. array instance includes() method, which means that whether the array include the designated element
* Array.prototype.includes() will return a boolean true for included and false for unincluded.
* the second argument is the start index
* */

console.log([1, 2, 3].includes(2)); // true
[1, 2, 3].includes(4); // false
[1, 2, 3, NaN].includes(NaN); // true
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true

// es5 use indexOf() !== -1
if (arr.indexOf(el) !== -1) {
//    ...
}

// a replaced function used to compatible with the different browsers
const contains = ( () =>
    Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();

contains (['foo', 'bar'], 'baz'); // false



































