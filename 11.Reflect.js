
/*
*  1. Reflect is used to :
*
*  1> put some special methods (such as defineProperty) to Reflect object from Object object
*  2> modify some Object method, and let them return the different results;
*  3> make some Object operator change to function operator
*  4> Reflect object method matches with Proxy object methods
* */


// 2>
/* old method
try {
    Object.defineProperty(target, property, attributes);
    // success
} catch (e) {
    // failure
}

// new method
if (Reflect.defineProperty(target, property, attributes)) {
    // success
} else {
    // failure
}

 */

// 3>
/*
// old method
'assign' in Object // true

// new method
Reflect.has(Object, 'assign') // true
*/

// 4>

/*

 Proxy(target, {
 set: function(target, name, value, receiver) {
 var success = Reflect.set(target,name, value, receiver);
 if (success) {
 log('property ' + name + ' on ' + target + ' set to ' + value);
 }
 return success;
 }
 });
 */

/*
 var loggedObj = new Proxy(obj, {
 get(target, name) {
 console.log('get', target, name);
 return Reflect.get(target, name);
 },
 deleteProperty(target, name) {
 console.log('delete' + name);
 return Reflect.deleteProperty(target, name);
 },
 has(target, name) {
 console.log('has' + name);
 return Reflect.has(target, name);
 }
 });

 */






























