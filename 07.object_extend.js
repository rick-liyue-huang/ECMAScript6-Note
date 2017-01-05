
/*
* 1. object property become more simplified, and the simplified property name is string type
* */

/*
var foo = 'bar';
var baz = {foo};
console.log(baz); //{ foo: 'bar' }

function f(x, y) {
    return {x, y};
}
f(1, 2); //{x: 1, y: 2}
*/

// the method also become simplified
/*
var o = {
    method() {
        return 'hello';
    }
};

// =>
var o = {
    method: function () {
        return 'hello';
    }
};

*/

/*
var birth = '01/01/2000';

var Person = {
    name: 'rick',
    birth,
    hello() {
        console.log('my name  is ', this.name);
    }
};

*/

// it will make CommonJs module exports become easier
/*
var ms = {};

function getItem(key) {
    return key in ms ? ms[key] : null;
}

function setItem(key, value) {
    ms[key] = value;
}
function clear() {
    ms = {};
}

module.exports = {getItem, setItem, clear};
// =>
// module.exports = {
//     getItem: getItem,
//     setItem: setItem,
//     clear: clear
// };

*/

// the property setter and getter is same as upon code
/*
var cart = {
    _wheels: 4,

    get wheels() {
        return this._wheels;
    },

    set wheels(value) {
        if (value < this._wheels) {
            throw new Error('value is too small');
        }
        this._wheels = value;
    }
};
*/



/*
* 2. object property name expression,
* */
/*
obj.foo = true;
obj['ab'+'c'] = 123;
*/
/*
var obj = {
    foo: true,
    abc: 123
};
*/
/*
let propKey = 'foo';
let obj = {
    [propKey]: true,
    ['a'+'bc']: 123
};
*/

/*
var lastWord = 'last word';

var a = {
    'first word': 'hello',
    [lastWord]: 'world'
};
a['first word']; // hello
a[lastWord]; // world
a['last word']; // world
*/

// can also used in method
/*
let obj = {
    ['h'+'ello']() {
        console.log('hi');
    }
};

obj.hello(); // hi
*/
/*
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
    [keyA]: 'valueA',
    [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}

*/


/*
* 3. method name property
* */

/*
var person = {
    sayName() {
        console.log(this.name);
    },
    get firstName() {
        return 'rick';
    }
};
console.log(person.sayName.name); // sayName
console.log(person.firstName.name); // undefined or get firstName

console.log((new Function()).name);

var doSomething = function () {}; // anonymous
console.log(doSomething.bind().name); // bound doSomething

*/


/*
* 4. Object.is() used to confirm whether two variable is equal
* */
/*

Object.is('foo', 'foo'); //true
Object.is({}, {}); // false

Object.is(+0, -0); // false
Object.is(NaN, NaN);// false

// also can write a function to simulate Object.is()
Object.defineProperty(Object, 'is', {
    value: function(x, y) {
        if (x === y) {
            // 针对+0 不等于 -0的情况
            return x !== 0 || 1 / x === 1 / y;
        }
        // 针对NaN的情况
        return x !== x && y !== y;
    },
    configurable: true,
    enumerable: false,
    writable: true
});

*/


/*
*  5. Object.assign()， used to combine object, it also overwrite the property with the same name
* */

/*
var target = {a: 1};
var source1 = {b: 2};
var source2 = {c: 3};

Object.assign(target, source1, source2);
target; // {a: 1, b: 2, c: 3}
*/

/*
var target = { a: 1, b: 1 };

var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
*/

// if Object.assign() only has one argument, it will return the argument

// var obj = {a: 1};
// Object.assign(obj) === obj; // true

// if the argument is not object, it will transfert o object firstly.
// typeof Object.assign(2); // object

// if the first argument is undefined or null, it will call error
//if the other argument is undefined or null, it will jump over the argument
/*
Object.assign(undefined); // error
Object.assign(null); // error

let obj = {a: 1};
Object.assign(obj, undefined) === obj; // true
Object.assign(obj, null) === obj;  // true
*/

// the other type of data (number, string, boolean) is not in first argument, it also does not call error, but
// only the string can transfer to array, and number and boolean will jump over
/*
var v1 = 'abc';
var v2 = true;
var v3 = 10;
var obj = Object.assign({}, v1, v2, v3);
console.log(obj); //{ '0': 'a', '1': 'b', '2': 'c' }
*/

// Object.assign() is shallow copy, which means only copy the index of the object
/*
var obj1 = {a:{b: 1}};
var obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b; // 2
*/

// if the property names are same, it will REPLACE the original property,
/*
var target = {a: {b: 'c', d: 'e'}};
var source = {a : {b: 'hello'}};
Object.assign(target, source);
target; // {a : {b: 'hello'}};
*/

// Object.assign() also work with array
// Object.assign([1, 2, 3], [4, 5]); // [4, 5, 3]


/*
*  the Object.assign() applications ------
* */

// 1. add property on object
class Point {
    constructor(x, y) {
        Object.assign(this, {x, y}); // add properties x and y to Point instance
    }
}

// 2. add method on object

/*
Object.assign(SomeClass.prototype, {

    someMethod(arg1, arg2) {
        // ...
    },
    anotherMethod() {
        // ...
    }
});

// <=>
SomeClass.prototype.someMethod = function (arg1, arg2) {};
SomeClass.prototype.anotherMethod = function () {};
*/

// 3. clone object -- will clone the self value

/*
function clone(origin) {
    return Object.assign({}, origin);
}

// if want to clone the parent value
function clone1(origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto), origin);
}


*/

// 4. combine several object
/*
const merge = (target, ...source) => Object.assign(target, ...source);
const merge1 = (...source) => Object.assign({}, ...source);

*/

// 5. assign default value to property
/*
const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
};

function processContent(options) {
    options = Object.assign({}, DEFAULTS, options);
}

*/



/*
* 6. property's enumerable attribute
* */
/*
let obj = {foo: 123};
Object.getOwnPropertyDescriptor(obj, 'foo');

//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
*/



/*
* 7. properties loop ----
* */

// 1. for..in, used to loop object itself and inheritance properties

// 2. Object.keys(obj), which returns an array, including itself enumerable properties, but not inheritance ones

// 3. Object.getOwnPropertyNames(obj), return an array including itself properties

// 4. Object.getOwnPropertySymbols(obj), return itself all symbol properties

// 5. Reflect.ownKeys(obj), return an array, including all properties, (including symbol)

/*
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
*/



/*
* 8. __proto__ and Object.setPrototypeOf(), Object.getPrototypeOf()
* */

/*
var obj = {
    method: function () {}
};
obj.__proto__ = someOtherObj;

// in fact, __proto__ call  Object.prototype.__proto__

Object.setPrototypeOf(object, prototype);
var o = Object.setPrototypeOf({}, null);

// same as
function f(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}

*/


// one example
/*
let proto = {};
let obj = {x: 10};
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 30;

obj.x; // 10
obj.y; // 20
obj.z; // 30
*/


// Object.getPrototypeOf(obj)
/*
function Rectangle() {}

var rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype; // true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype; // false

*/

/*
*
* 9. Object.keys(), Object.values(), Object.entries()
* */

// var obj = {foo:'bar', baz: 42};
// Object.keys(obj); // ['foo', 'baz']

/*
let {keys, values, entries} = Object;

let obj = {a: 1, b: 2, c: 3};

for (let key of keys(obj)) {
    console.log(key);
}

for (let value of values(obj)) {
    console.log(value);
}

for (let entry of entries(obj)) {
    console.log(entry);
}

*/


// simulate Object.entries() method
function entries(obj) {
    let arr = [];
    for (let key of Object.keys(obj)) {
        arr.push(key, obj[key]);
    }
    return arr;
}








































