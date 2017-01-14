
/*
* 1. Class used to define the object,
* */

// the old method
/*
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2); // (1, 2)

*/



// the new method
/*
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
*/

// we can find that class is essentially the constructor
/*
typeof Point;// 'function'
Point === Point.prototype.constructor; // true

*/
// also use new operator to get the instance
/*
class Bar {
    doStuff() {
        console.log('stuff');
    }
}

var b = new Bar();
b.doStuff();// stuff

*/

/* all class method are defined on prototype property.
class Point {
    constructor() {}
    toString() {}
    toValue () {}
}

Point.prototype = {
    toString() {},
    toValue() {}
};

*/

/* b is the instance of B, and its constructor is essentially the class prototype constructor
class B{}
let b = new B();
b.constructor === B.prototype.constructor; // true

*/

/* Object.assign() method can add new methods on class prototype property
class Point {
    constructor () {}
    // ...
}

Object.assign(Point.prototype, {
    toString() {},
    toValue() {}
});

*/

// Point.prototype.constructor === Point; // true

// all methods defined in class are non-enumerable
/*
class Point {
    constructor () {}

    toString() {}
}
Object.keys(Point.prototype);
// []

Object.getOwnPropertyNames(Point.prototype); // ['constructor', 'toString']

*/

// the class property represent in expression
/*
let methodName = 'getArea';
class Square {
    constructor (length) {}
    [methodName]() {}
}
*/

/*
* 2. constructor method default return the instance (this), but also can do some change
*
* */
/*
class Foo {
    constructor() {
        return Object.create(null);
    }
}
new Foo() instanceof Foo; // false

*/


/*
*  3. the instance property can be defined on itself or the prototype
* */
/*
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString () {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

var point = new Point(2, 3);

point.toString(); // (2， 3）

point.hasOwnProperty('x'); // true, becasue it defines on this
point.hasOwnProperty('y'); // true
point.hasOwnProperty('toString'); // false
point.__proto__.hasOwnProperty('toString');// true

*/

/*
var p1 = new Point(2, 3);
var p2 = new Point(3, 2);
p1.__proto__ === p2.__proto__; // true

*/

/*
var p1 = new Point(2, 3);
var p2 = new Point(3, 2);

p1.__proto__.printName = function () {
    return 'oops';
};

p1.printName();// 'oops'
p2.printName(); // 'oops'

var p3 = new Point(4, 2);
p3.printName(); // 'oops'

*/

// class has not hoist
// new Foo(); // referenceError

/*
{
    let Foo = class {};
    class Bar extends Foo {}
}
*/

/*
*  4. class expression
* */
/*
const MyClass = class Me {
    getClassName() {
        return Me.name;
    }
};

*/

/* use class expression to IIFE (immediately invoked function expression)
let person = new class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}('rick');

person.sayName(); // rick
*/

// class private methods

// method one, foo method is public method, and inside it calls bar method, som make bar metod become the private method
/*
class Widget {
    foo (baz) {
        bar.call(this, baz);
    }
}


function bar(baz) {
    return this.snaf = baz;
}
*/


// method two: by Symbol, here bar and sanf are both Symbol values, so outside can not get them.
/*
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default  class myClass {

    foo(baz) {
        this[bar] (baz);
    }

    [bar](baz) {
        return this(snaf) = baz;
    }
};

*/

/*
*  5. class use extend to realize inheritance
* */

// class ColorPoint extends Point {} // ColorPoint inherit from Point



class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);// call parent class constructor
        this.color = color;
    }

    toString() {
        return this.color + ' ' + super.toString(); // call parent toString()
    }
}
























