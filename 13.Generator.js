
/*
* 1. basic concept --- Generator is created for asynchronous programming
* Generator function encapsulate many states. In another side, Generator function
* will return an Iterator object. The returned Iterator object will go through
* the each state of Generator function
*
* formally, Generator function is function * funcname() {}, then inside the function body, it has yield
* */
/*
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();
// here Generator function produce three states: hello, world and return state. If execute the hw function,
//it will point the three states, if we always use the next() method, it will go through the states until meet with ruturn state.
console.log(hw.next()); // { value: 'hello', done: false }
console.log(hw.next()); // { value: 'world', done: false }
console.log(hw.next()); // { value: 'ending', done: true }

// each time, when call next() method, it wll return a Iterator object, including value and done properties
*/


/*
*  2. yield statement: make next() method paused, so we can say that the next() will run until meet with yield and return state
*
* */
/*
function* gen() {
    yield 123 + 456
};
console.log(gen().next()); // { value: 579, done: false }

*/


// if the generator function has no yield, it will become pure delay function
/*
function* f() {
    console.log('is executed');
}
var gen = f();

// console.log(gen.next());

setTimeout(function () {
    gen.next(); // is executed
}, 2000);
*/

// note that: can not use yield statement in normal function

/* this is wrong one, because yield statement used in forEach function
 var arr = [1, [[2, 3], 4], [5, 6]];

 var flat = function* (a) {
 a.forEach(function (item) {
 if (typeof item !== 'number') {
 yield* flat(item);
 } else {
 yield item;
 }
 }
 };

 for (var f of flat(arr)){
 console.log(f);
 }
 */


/* but we can change to for loop, this function used to go through all element of an array
 var arr = [1, [[2, 3], 4], [5, 6]];

 var flat = function* (a) {
 var length = a.length;
 for (var i = 0; i < length; i++) {
 var item = a[i];

 if (typeof item !== 'number') {
 yield* flat(item);
 } else {
 yield item;
 }
 }
 };

 for (var f of flat(arr)) {
 console.log(f); // 1 2 3 4 5 6
 }

 */


/*
*  3. the relationship between Symbol.iterator and Generator: any object's Symbol.iterator method will equal to the object's
*  iterator creation function, and Generator function is thus the iterator creation function, so we can say,
*  the Generator can be assigned to object's Symbol.iterator property
* */
/*
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

[...myIterable]; // [1, 2, 3]
*/
/*
function* gen() {}
var g = gen();
g[Symbol.iterator] === g /// true
// here, gen is Generator function, which is called to generate a iterator object g, and this iterator object g has a
//property Symbol.iterator, called to return itself.
*/






































