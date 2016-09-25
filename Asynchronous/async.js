// Promise Object: An object which can be passed around or returned that holds references to the outcome of asyncronous behaviour
// Created using $q service
// first thing in async function var deferred = $q.defer(); 
// This creates an async environment with all the hooks into it including the promise object
// Then deferred.resolve(result); marks successful completion of function and wraps data for promise
// deferred.reject(error); marks unsuccessful completion of function and wraps error for promise
// Finally return deferred.promise; enables us to return the data from the function easily to the caller of then function

// Using output of asyncronous functions is done as follows

var promise = asyncFunction();
promise.then(
	function (result) {
		// Do something with result
	},
	function (error) {
		// Do something with the error
	}
);


// .then is chainable

// Can resolve multiple promises acnycronously using
// (i.e. run all promises at the same time)
$q.all([promise1, promise2])
// This also gives us the ability to define how to deal with the results of all promises at the same time
.then(
	function (result) {
		// Do something with result
	},
	function (error) {
		// Do something with the error
	}
);