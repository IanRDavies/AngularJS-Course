(function () {
'use strict';

angular.module('ShoppingListPromiseApp', [])
.controller('ShoppingListController', ShoppingListController)
.service('ShoppingListService', ShoppingListService)
.service('WeightLossFilterService', WeightLossFilterService);

ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {
  var list = this;

  list.items = ShoppingListService.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    ShoppingListService.addItem(list.itemName, list.itemQuantity);
  }

  list.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}


ShoppingListService.$inject = ['$q', 'WeightLossFilterService']
function ShoppingListService($q, WeightLossFilterService) {
  var service = this;

  // List of shopping items
  var items = [];

  // service.addItem = function (name, quantity) {

  //   // check the name
  //   var promise = WeightLossFilterService.checkName(name);
  //   // then check the quantity
  //   promise.then(function (response) {
  //     var nextPromise = WeightLossFilterService.checkQuantity(quantity);
  //     // then if ok add to list and if not do error
  //     nextPromise.then(function (result) {
  //       var item = {
  //         name: name,
  //         quantity: quantity
  //       };
  //       items.push(item);
  //     }, function (errorResponse) {
  //       console.log(errorResponse.message);
  //     });
  //   }, function (errorResponse) {
  //     console.log(errorResponse.message);
  //   });
  // };


  // service.addItem = function (name, quantity) {
  //   var promise = WeightLossFilterService.checkName(name);
  //
  //   promise
  //   // dont have function for error as its not needed if errors bubble up
  //   .then(function (response) {
  //     return WeightLossFilterService.checkQuantity(quantity);
  //     // returns a promise that will then get picked up by the next then method
  //   })

  //   // only run this .then if quantitty check passed
  //   .then(function (response) {
  //     var item = {
  //       name: name,
  //       quantity: quantity
  //     };
  //     items.push(item);
  //   })
  //   // catches any errors from promises chained above
  //   .catch(function (errorResponse) {
  //     console.log(errorResponse.message);
  //   });
  // };

// DOING BOTH ChECKS IN PARALLEL
  service.addItem = function (name, quantity) {
    // capture name promise
    var namePromise = WeightLossFilterService.checkName(name);

    // Capture quantity promise
    var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

    // $q service is the angular implementation of the promise API (coming in ES6)
    $q.all([namePromise, quantityPromise])
    // only executes of all of promises in array result
    .then(function (response) {
      var item = {
        name: name,
        quantity: quantity
      };
      items.push(item);
    })
    // execultes if any of the promises get rejected -- once a rejection is noted - do not have to wait for all to resolve
    .catch(function (errorResponse) {
      console.log(errorResponse.message);
    });
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


WeightLossFilterService.$inject = ['$q', '$timeout']
function WeightLossFilterService($q, $timeout) {
  var service = this;

  service.checkName = function (name) {
    // Async environment setup
    var deferred = $q.defer();

    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for cookies
      if (name.toLowerCase().indexOf('cookie') === -1) {
        deferred.resolve(result) // resolve means success
      }
      else {
        result.message = "Stay away from cookies, Yaakov!";
        deferred.reject(result); // reject means uncessful
      }
    }, 3000);

    return deferred.promise; // return promse to caller
  };


  service.checkQuantity = function (quantity) {
    var deferred = $q.defer();
    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for too many boxes
      if (quantity < 6) {
        deferred.resolve(result);
      }
      else {
        result.message = "That's too much, Yaakov!";
        deferred.reject(result);
      }
    }, 1000);

    return deferred.promise;
  };
}

})();


// Use $q.all([]) to do many 'tests' at once
// use .then on promises to make sequential structure