(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListAddController', ShoppingListAddController)
.controller('ShoppingListShowController', ShoppingListShowController)
.service('ShoppingLstService', ShoppingListService);
// Services are guaranteed to be singleton (limited to one instance) in AngularJS
// So everything that depends on this service references the same instance and hence can be useful for sharing data across controllers
// service is only created if needed (lazy instantiation)

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
