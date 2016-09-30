(function () {
'use strict';

angular.module('ShoppingList')
.controller('MainShoppingListController', MainShoppingListController);


// MainShoppingListController.$inject = ['ShoppingListService'];

MainShoppingListController.$inject = ['items'] // items from route resolve
function MainShoppingListController(items) {
  var mainList = this;
  mainList.items = items; // mow wont change until data is got


// NOT NEEDED IF DOING THE RESOLVE
  // mainList.$onInit = function () {
  //   ShoppingListService.getItems() // Async service -- returns a promise
  //   .then(function (result) {
  //     mainList.items = result;
  //   });
  // };
}

})();
