
/*
*  1. Proxy used change some default action, is one kind of meta programming.
*  proxy can be acted as a layer the target object, which can change the acton to the object.
*
* */

// var proxy = new Proxy(target, handler);

// here nw Proxy() will produce a proxy instance, target is the target object, handler is the action

/*
var proxy = new Proxy({}, {
    get: function (target, property) {
        return 35;
    }
});

proxy.time// 35
proxy.name; // 35
proxy.title; // 35

*/


// var object = {proxy: new Proxy(target, handler)}; // set object.proxy = proxy


// Proxy instance can be acted as the prototype object of other object
/*
var proxy = new Proxy({}, {
    get(target, property) {
        return 36;
    }
});

let obj = Object.create(proxy);
console.log(obj.time); // 36

*/

// 2. one handler can be used to handle more than one action

/*
var handler = {
    get(target, name) {
        if (name === 'prototype') {
            return Object.prototype;
        }
        return 'hello, ' + name;
    },

    apply(target, thisBinding, args) {
        return args[0];
    },

    construct(target, args) {
        return {value: args[1]};
    }
};

var fproxy = new Proxy(function (x, y) {
    return x + y;
}, handler);

console.log(fproxy(1, 2)); // 1
console.log(new fproxy(1, 2)); // { value: 2 }

fproxy.prototype === Object.prototype // true
console.log(fproxy.foo); // hello, foo

*/


/*
* 3. some handles :
*
* get(target, propkey, receiver),
* set(target, propkey, value, receiver)
* has(target, propkey)
* deleteProperty(target, propkey)
* ownKeys(target)
* getOwnProperty(target, propKey, propDesc)
* defineProperty(target, propkey, propdesc)
* preventExtensions(target)
* getPrototypeOf(target)
* isExtensible(target)
* setPrototypeOf(target, proto)
* apply(target, object, args)
* construct(target, args)
* */



/*
*  4. proxy instance method
* */

// get()
/*
var person = {
    name: 'rick'
};

var proxy = new Proxy(person, {
    get(target, property) {
        if (property in target) {
            return target[property];
        } else {
            throw new ReferenceError("Property \"" + property + "\" does not exist.");
        }
    }
});

console.log(proxy.name); // rick
// console.log(proxy.age); // ReferenceError: Property "age" does not exist.

*/

// get method can be inherited
/*
let proto = new Proxy({}, {
    get(target, propertyKey, receiver) {
        console.log('GET ' + propertyKey);
        return target[propertyKey];
    }
});

let obj = Object.create(proto);
console.log(obj.xxx); // GET xxx undefined
*/

// one application to read the index of minus value by get()

/*
function createArray(...elements) {

    let handler = {
        get(target, propkey, receiver) {
            let index = Number(propkey);

            if (index < 0) {
                propkey = String(target.length + index);
            }
            return Reflect.get(target, propkey, receiver);
        }
    };

    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
console.log(arr[-1]); // c

*/

// by proxy get() method, we also can execute some function, which simulates the chaining operation

/*
var pipe =(function () {

    return function (value) {
        var funcStack = [];
        var oproxy = new Proxy({}, {
            get(pipeObject, fnName) {
                if (fnName === 'get') {
                    return funcStack.reduce(function (val, fn) {
                        return fn(val);
                    }, value);
                }
                funcStack.push(window[fnName]);
                return oproxy;
            }
        });

        return oproxy;
    }
}());

var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63

*/

// by get(), we can produce a function to get the dom node

/*
 const dom = new Proxy({}, {
 get(target, property) {
 return function(attrs = {}, ...children) {
 const el = document.createElement(property);
 for (let prop of Object.keys(attrs)) {
 el.setAttribute(prop, attrs[prop]);
 }
 for (let child of children) {
 if (typeof child === 'string') {
 child = document.createTextNode(child);
 }
 el.appendChild(child);
 }
 return el;
 }
 }
 });

 const el = dom.div({},
 'Hello, my name is ',
 dom.a({href: '//example.com'}, 'Mark'),
 '. I like:',
 dom.ul({},
 dom.li({}, 'The web'),
 dom.li({}, 'Food'),
 dom.li({}, '…actually that\'s it')
 )
 );

 document.body.appendChild(el);
* */


// set(), used to property assignment
/*
let validator = {
    set: function (obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('the age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('the age seems invalide');
            }
        }
        obj[prop] = value;
    }
};

let person = new Proxy({}, validator);

person.age = 100;
person.age; // 100

person.age = 'young'; // error
person.age = 300; //error

*/

// use the set() and get() to avoid the properties to be seen by outside
/*
var handler = {
    get (target, key) {
        invariant(key, 'get');
        return target[key];
    },

    set (target, key, value) {
        invariant(key, 'set');
        target[key] = value;
        return true;
    }
};

function invariant(key, action) {
    if (key[0] === '_') {
        throw new Error(`invalid attempt to ${action} private "${key}" property`);
    }
}

var target = {};
var proxy = new Proxy(target, handler);
proxy._prop; // error
proxy._prop = 'c';// error

*/

// apply method used to handle call and apply, it receive three arguments: target, context object
// and target's argument array

var hander = {
    apply (target, ctx, args) {
        return Reflect.apply(...arguments);
    }
};

// one application

/*
var target = function () {
    return 'i am the target';
};

var handler = {
    apply() {
        return 'i am the proxy';
    }
};

var p = new Proxy(target, handler);
console.log(p()); // im the proxy

// one more application
var twice = {
    apply (target, ctx, args) {
        return Reflect.apply(...arguments) * 2;
    }
};

function sum(left, right) {
    return left + right;
}

var proxy = new Proxy(sum, twice);
proxy(1, 2); // 6
proxy.call(null, 5, 6); // 22
proxy.apply(null, [7, 8]); // 30
*/


// has() used to confirm whether object has some property
/*
var handler = {
    has(target, key) {
        if (key[0] === '_') {
            return false;
        }
        return key in target;
    }
};

var target = {_prop: 'foo', prop: 'foo'};
var proxy = new Proxy(target, handler);
'_prop' in proxy; // false

*/

// note that: has() only can confirm HasProperty but not the HasOwnProperty
// by the way, has is invalid to for...in..
/*
let stu1 = {name: 'rick', score: 55};
let stu2 = {name: 'leo', score: 96};

let handler = {
    has (target, prop) {
        if (prop === 'score' && target[prop] < 60) {
            console.log(`${target.name} is fail`);
            return false;
        }
        return prop in target;
    }
};

let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);

'score' in oproxy1; // fail
'score' in oproxy2; // true

for (let a in oproxy1) {
    console.log(oproxy1[a]); // rick 55
}

for (let b in oproxy2) {
    console.log(oproxy2[b]); // leo 96
}

*/

// construct() will handle the new operator, and  must return object



























