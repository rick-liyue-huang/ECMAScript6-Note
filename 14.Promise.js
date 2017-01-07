

/*
*  1. Promise is a solution for asynchronous programming, it is a container, containing some asynchronous operation result.
*  Promise is an object, from which can be gotten the asynchronous operation information. Promise provides the uniform API for all kinds of
*  asynchronous operation
*
*  Promise object has two characters: --
*  -- Promise object's state is insulated from outside, Promise object is an asynchronous operation, which has three states: Pending, Resolved,
*  and Rejected. Only the asynchronous operation result can define the state.
*
*  -- once the Promise object state changes, it will never change again. the Promise object state only changes from Pending to Resolved ,
*  and from Pending to Rejected. Once the the two states happens, it will keep this state (Resolved, or Reject). After the state changed, you only
*  can get this current state, even you add the callback function. This is very different from event, which cannot get the result once you miss it.
*  So, we can believe that Promise object can make the asynchronous code change to synchronous code, it will avoid the nesting callback, besides
*  the Promise object provides the uniform interface for all kinds of asynchronous operation
*
*  Promise also has some shortcoming: promise can not be canceled and must be called; if no callback inside, the throw error will leak outside;
*  when in Pending state, no one know the the next state.
* */

/*
*  the baisc usage: Promise object is a constructor, used to generate the Promise instance.
*
*  Promise constructor receives a function as argument, which has two argument: resolve and reject, and they both are function provided by js engine.
*  resolve function will change Promise object from pending to resolved. this resolve function will execute when asynchronous operation successful, and
*  send the result to outside. the reject function will execute when asynchronous operation fail, and send the error to outside.
* */

/*
var promise = new Promise(function (resolve, reject) {

    // some code
    if (asynchronous operation successful) {
        resolve(value);
    } else {
        reject(error);
    }
});

*/

// after the Promise instance created, we can use .then() method to designate the resolved state and reject state.
/*
promise.then(function (value) {

}, function (error) {

});

*/

// some example for Promise object
/*
function timeout(ms) {
    return new Promise( (resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(100).then( (value) => {
    console.log(value);
});

*/
/*
let promise = new Promise(function (resolve, reject) {
    console.log('Promise');
    resolve();
});

promise.then(function () {
    console.log('Resolved');
});

console.log('Hi');

// promise hi resolved

*/

// asynchronously load image
/*
function loadImageAsync(url) {

    return new Promise(function (resolve, reject) {
        var image = new Image();

        image.onload = function () {
            resolve(image);
        };

        image.onerror = function () {
            reject(new Error('could not load image at ' + url));
        };
        image.src = url;
    });
}
*/

/* getJson is the encapsulation of XMLHttpRequest object
var getJson = function (url) {

    var promise = new Promise(function (resolve, reject) {

        var client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.end();

        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status == 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
    });
    return promise;
};

getJson('/posts.json').then(function (json) {
    console.log('Content: ' + json);
}, function (error) {
    console.error('its wrong', error);
});

*/


// one promise instance can be the other promise instance's argument
/*
var p1 = new Promise(function (resolve, reject) {});

var p2 = new Promise(function (resolve, reject) {
    resolve(p1);
})
*/

/*
 var p1 = new Promise(function (resolve, reject) {
 setTimeout(() => reject(new Error('fail')), 3000)
 })

 var p2 = new Promise(function (resolve, reject) {
 setTimeout(() => resolve(p1), 1000)
 })

 p2
 .then(result => console.log(result))
 .catch(error => console.log(error))
 // Error: fail
 */




/*
*  2. Promise.prototype.then(), then() can be used by chain programming

* */
/*
getJson("/posts.json").then(function (json) {
    return json.post;
}).then(function (post) {

});
*/

// by chaining programming, we can designate an array of callback, the first callback function can return a new promise
// object,
/*
 getJSON("/post/1.json").then(function(post) {
 return getJSON(post.commentURL);
 }).then(function funcA(comments) {
 console.log("Resolved: ", comments);
 }, function funcB(err){
 console.log("Rejected: ", err);
 });
* */

/*
 getJSON("/post/1.json").then(
 post => getJSON(post.commentURL)
 ).then(
 comments => console.log("Resolved: ", comments),
 err => console.log("Rejected: ", err)
 );
 */


/*
*  3. Promise.prototype.catch() is alias of .then(null, rejectioin).
* */

/*
 p.then((val) => console.log("fulfilled:", val))
 .catch((err) => console.log("rejected:", err));

 // same as
 p.then((val) => console.log("fulfilled:", val))
 .then(null, (err) => console.log("rejected:", err));
 */














