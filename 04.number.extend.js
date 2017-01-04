
/*
*  1. the new written syntax
* */
// 0b111110111 === 503; //true
// 0o767 === 503; // true
/*
(function () {
    'use strict';
    console.log(0o11 === 11); // false
})();
*/

// use Number() method to transfer 0b and 0o number to decimal number
// Number('0b111'); // 7
// Number('0o10'); // 8


// 2. Number.isFinite() and Number.isNaN()

/*
Number.isFinite(15); // true
Number.isFinite(0.8); //true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

// but we also can define a function to confirm a number is finite
(function (global) {
    var global_isFinite = global.isFinite;

    Object.defineProperties(Number, 'isFinite', {
        value: function isFinite(value) {
            return typeof value === 'number' && global_isFinite(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
})(this);


Number.isNaN(NaN); // true
Number.isNaN(15); //false
Number.isNaN('15'); // false
Number.isNaN(true); // false
Number.isNaN(9/NaN); // true
Number.isNaN('true'/0); // true
Number.isNaN('true'/'true'); // true

// in es5
(function (global) {
    var global_isNaN = global.isNaN;

    Object.defineProperties(Number, 'isNaN', {
        value: function isNaN(value) {
            return typeof value === 'number' && global_isNaN(value);
        },
        configurable:true,
        enumerable:false,
        writable: true
    });
})(this);

*/

// the new isFinite and isNaN method only valid for the true number value, without transfer from other type.

/*
* 3. Number.parseInt() and Number.parseFloat() means that the two method implant from the global to Number,
*  doing this is to decrease the global methods
* */
/*
Number.parseInt('12,23'); // 12
Number.parseFloat('123.45#'); // 123.45
*/

/*
* 4. Number.isInteger(), here note that 3 === 3.0
* */

/*
Number.isInteger(3); // true
Number.isInteger(3.0); // true
Number.isInteger(25.1); // false
Number.isInteger('15'); // false
Number.isInteger(true); // false

// for es5
(function (global) {
    var floor = Math.floor,
        isFinite = global.isFinite;

    Object.defineProperty(Number, 'isInteger', {
        value: function isInteger(value) {
            return typeof value === 'number' && isFinite(value) &&
                value > -9007199254740992 && value < 9007199254740992 &&
                floor(value) === value;
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
})(this);


*/

// 5. Number.EPSILON used to increase a extremly small value, for floating calculating
/*
Number.EPSILON // 2.220446.....E-16
Number.EPSILON.toFixed(20); // 0.0000000000000022204

// so we can define a function to confirm the deviation arrange
function withinErrorMarin(left, right) {
    return Math.abs(left - right) < Number.EPSILON;
}

withinErrorMarin(0.1+0.2, 0.3); // true
withinErrorMarin(0.2 + 0.2, 0.3); // false

*/

// 6. safe integer Number.isSafeInteger(), define -Math.pow(2, 53) ~ Math.pow(2, 53)

/*
Number.isSafeInteger('a'); // false
Number.isSafeInteger(null); //false
Number.isSafeInteger(NaN); // false
Number.isSafeInteger(Infinity); // false
Number.isSafeInteger(-Infinity); // false
Number.isSafeInteger(3); // true
Number.isSafeInteger(1.2); // false
Number.isSafeInteger(9007199254740990); // true
Number.isSafeInteger(9007199254740992); // false

Number.isSafeInteger = function (n) {
    return (typeof n === 'number' &&
    Math.round(n) === n &&
    Number.MIN_SAFE_INTEGER <= n &&
    n <= Number.MAX_SAFE_INTEGER);
};

// one more accurate function
function trusty (left, right, result) {
    if (
        Number.isSafeInteger(left) &&
        Number.isSafeInteger(right) &&
        Number.isSafeInteger(result)
    ) {
        return result;
    }
    throw new RangeError('Operation cannot be trusted!');
}

trusty(9007199254740993, 990, 9007199254740993 - 990)
// RangeError: Operation cannot be trusted!

trusty(1, 2, 3)
// 3

*/

// 8.1 . extend Math , to trim the decimal number
/*
Math.trunc(4.1); // 4
Math.trunc(-4.2); //-4
Math.trunc(-0.123); //0

Math.trunc('123.456'); // 123, transfer to number then get integer number

// a simulated function
Math.trunc = Math.trunc || function (x) {
        return x < 0 ? Math.ceil(x) : Math.floor(x);
};
 */

// 8,2 Math.sign()

Math.sign(-5); // -1
Math.sign(3); //+1
Math.sign(0); // +0
Math.sign(-0); // -0
Math.sign(NaN); // NaN
Math.sign('foo'); // NaN
Math.sign(); // NaN

Math.sign = Math.sign || function (x) {
        x = +x; // convert to a number
        if (x === 0 || isNaN(x)) {
            return x;
        }
        return x > 0 ? 1 : -1;
    };
















