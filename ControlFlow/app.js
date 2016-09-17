(function () {
'use strict';

var shoppingList1 = ["Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate Flavour)", "Pepto Bismol (Cookie Flavour)"];

var shoppingList2 = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity:"200"
  },
  {
    name: "Chocolates",
    quantity: "5"
  }
];

angular.module('ShoppingListApp', [])

.controller('ShoppingListController', ShoppingListController);
ShoppingListController.$inject = ["$scope"];

function ShoppingListController($scope) {
    $scope.shoppingList1 = shoppingList1;
    $scope.shoppingList2 = shoppingList2;

$scope.addToList = function() {
    shoppingList1.push($scope.newItemName);
    shoppingList2.push(
             {
                name: $scope.newItemName,
                quantity: $scope.newItemQuantity
             }
        );
    }
}

})();
