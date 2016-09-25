// TRIED TO COMBINE A LOT OF WORK IN ONE FILE -- IT DOESNT WORK
(function () {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.factory('ShoppingListFactory', ShoppingListFactory)
.controller('ShoppingListDirectiveController', ShoppingListDirectiveController)

// Registering our new directives to be used in HTML
// directive takes two arguments a normalised name for the HTML tag
// and the factory function that makes DDOs (Directive definition object)
// The tag will be the name here but all lowercase with - in between words
// so the fist one will be list-item-description (replaces capitals with -lowercase)
.directive('listItemDescription', ListItemDescription)
.directive('listItem', ListItem)
.directive('shoppingList', ShoppingList);

function ShoppingList() {
  var ddo = {
    templateUrl: "shoppingList.html",
    scope: {
      items: '<',
      title: '@',
      onRemove: '&' // Represents a reference binding
    },
    // if want to use controller as defined just below the module do
    // controller: "ShoppingListDirective Controller as list" and then can cut the next three lines
    // This way (commented) can be better if woking over multiple JS files
    controller: ShoppingListDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
};

function ShoppingListDirectiveController() {
  var list = this;

  list.cookiesInList = function() {
    for(var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if(name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }
    return false;
  };
}

// Directives can be ussed as attributes or as tags
// this will depend on how they are designed


// Could inject things here, if needed
function ListItem() {
  var ddo = {
    templateUrl: 'listItem.html',
    // Defining the isolate scope
    scope: {
      // Bidirectional bining with =
      // just "=" name will be assumed to be the same as the attriubte name
      // =? means that the property is optional
      // This must then be defined in the HTML Tag
      // @ is unidirectional binding from directory to property
      // @ Always results in directive property being a string
      // < leads to one way binding watching parent property but not that in the directive
      // best to use this to avoid having too many watchers and to use best practice of not changing proprties in the directive     
    },
    restrict: 'E'
  };

  return ddo;
}

function ListItemDescription() {
  var ddo = {
    template: '{{ item.quantity }} of {{ item.name }}',
    // Scope of driective is the same as the scope of the container
    // unless otherwise stated (injected)

    restrict: 'E' // Defaults to AE - A is Attribute E is element
    // best practice is to use restrict
    // If defined as A but used as E or vice versa Angular will ignor it like any other meaningless HTML
    // So need to make sure you use it in the right context
  };

  return ddo;
}


// LIST #1 - controller
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {
  var list = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  list.items = shoppingList.getItems();

  var origTitle = "Shopping List # 1";
  list.title = origTitle + "(" + list.items.length + " items)";

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + "(" + list.items.length + " items)";

  }

  list.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
  list.title = origTitle + "(" + list.items.length + " items)";

  };
}


// LIST #2 - controller
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {
  var list = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory(3);

  list.items = shoppingList.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    try {
      shoppingList.addItem(list.itemName, list.itemQuantity);
    } catch (error) {
      list.errorMessage = error.message;
    }

  }

  list.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
  };
}


// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();
