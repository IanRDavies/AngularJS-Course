(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListAddController', ShoppingListAddController)
.controller('ShoppingListShowController', ShoppingListShowController)
.service('ShoppingLstService', ShoppingListService);
// Services are guaranteed to be singleton (limited to one instance) in AngularJS
// So everything that depends on this service references the same instance and hence can be useful for sharing data across controllers
// service is only created if something depends on them (lazy instantiation)
// A factory is not a service it produces objects (can be services or many instances)
// A service is infact a much more limited factory - it always produces the same type of singleton service which is not so easily customisable
// .factory("CustomService", CustonService) // function is expected to produce a service rather than being the service as in the case with .service
// // factory gives more control over how to initialise new service
// // can return function that returns new Service
// // can also return an object literal with a key value pair where value is a function that returns a new Service
// // implementation choice will affect usage
// // OBJECT LITERAL APPROACH
// var someService = CustonService.getService();
// // OBJECT FUNTION APPROACH
// var someService = CustomService()

ShoppingListAddController.$inject = ['ShoppingLstService'];
function ShoppingListAddController(ShoppingListService) {
  var itemAdder = this;

  itemAdder.itemName = "";
  itemAdder.itemQuantity = "";

  itemAdder.addItem = function () {
    ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
  }
}


ShoppingListShowController.$inject = ['ShoppingLstService'];
function ShoppingListShowController(ShoppingListService) {
  var showList = this;

  showList.items = ShoppingListService.getItems();

  showList.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}


function ShoppingListService() {
  var service = this;
  // Service used to share info across controllers
  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1); 
    // splice takes index you want to remove from and how many items to remove
  };

  service.getItems = function () {
    // avoids direct access to items list
    return items;
  };
}

})();
