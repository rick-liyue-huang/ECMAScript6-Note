
// 1. string unicode expression
/*
// js allow to use \uxxxx format to express one character,
console.log('\u0061'); //

// but it only limits between \0000 - \ffff, if exceeding it, will use two character.
console.log('\ud842\udfb7'); // 𠮷

// in es6, the brace will used to analyze the unicode
console.log('\u{20bb7}'); //𠮷
console.log('\u{41}\u{42}\u{43}'); // ABC

let hello = 123;
console.log('hell\u{6f}'); //hello
console.log('\u{1f680}' === '\ud83d\ude80'); // true, means that brace format is identified to utf-16

// so
// '\z' === 'z' === '\172' === 'x7a' == 'u007a' === 'u{7a}';

*/


/*
* 2. codePointAt(), in js, character includes two bytes, and stores in utf-16 format
* */

/*
// in es5 earlier, it usually used in,
var s = '𠮷'; // code is 0x20bb7, in utf-16 format, it is 0xd842, and 0xdfb7 , in decimal format, it is 55362 and 57271
s.length; // 2, its wrong , it can not analyze the length
s.charAt(0); // "" , wrong, it cannot be used charAt
s.charAt(1);

s.charCodeAt(0); //  55362, only can return value in decimal format
s.charCodeAt(1); // 57271
*/

/*
// in es6, it provides codePointAt() method, used to deal with more than two characters string
var s = '𠮷a';

s.codePointAt(0); // 134071 , the first one return the 20bb7 in decimal format
s.codePointAt(1); // 57271 , the same as the charCodeAt
s.codePointAt(2); // 97 , the same as the charCodeAt

// if want to return the value in utf-16 format, use toString()

 var s = '𠮷a';
 s.codePointAt(0).toString(16); // '20bb7'
 s.codePointAt(1).toString(16);  // '61'
*/

// codePointAt method used to test whether the character is composed of two or four byte
/*
function is32Bit(c) {
    return c.codePointAt(0) > 0xffff;
}
is32Bit('𠮷'); // true
is32Bit('a'); // false
*/


// es6 also provides the method of String.fromCodePoint() method, and this method will bind with String object
// String.fromCodePoint(0x20bb7); // '𠮷'
// String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\ud83d\ude80y';


// 3. for... of statement used to loop string

/*
for (let codePoint of 'foo') {
    console.log(codePoint);
}
// f o o

var text = String.fromCodePoint(0x20bb7);
for (let i of text) {
    console.log(i); // '𠮷'
}
*/


// 4. at() to locate the unicode of the string
/*
console.log('abc'.at(0)); // 'a'
console.log('𠮷'.at(0)); //

*/

// 5. normalize(), to normalize the different format to the uniform code
// '\u01d1'.normalize() === '\u004f\u030c'.normalize(); // true


/**
 * 6. includes(), startsWith(), endsWith() will return boolean to confirm whether it match the arguments
 *  they all support the second argument, express the start location
 */
/*
var s = 'Hello world';
s.startsWith('Hello'); //true
s.endsWith('d'); //true
s.includes('o'); // true

s.startsWith('world', 6); // true
s.endsWith('Hello', 5); // true
s.includes('Hello', 6); // false
*/

/*
* 7. repeat(n) used to return a new string in n time of old string， if n is decimal number 0.2, will transfer to integer.
* if n is minus or infinity will produce error, if n is string, will firstly transfer to number, then execute repeat() method
* */
// console.log('x'.repeat(4)); // 'xxxx'
// 'hello'.repeat(2); //hellohello
// 'na'.repeat(0); //''

/*
* 8. es6 introduces the template string ``, it can define several line string, or implant variables
* */

$('#result').append(`
There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);

var name = 'bob', time = 'today';
`hello ${name}, how are you ${time}?`


































