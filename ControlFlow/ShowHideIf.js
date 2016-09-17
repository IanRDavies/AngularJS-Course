(function () {
"use strict";

angular.module("ShoppingListApp", [])
.controller("ShoppingListController", ShoppingListController)
.provider("ShoppingList", ShoppingListProvider)
.config(Config);

Config.$inject = ["ShoppingListProvider"];
// since config is called before anything else cannot inject regular components
// that is we may only inject providers

function Config(ShoppingListProvider) {
	// To save making too long lists
	// this masks the default in the provider function
	ShoppingListProvider.defaults.maxItems = 5;
}


ShoppingListController.$inject = ["ShoppingList"]; // inject service provided/created by the provider
function ShoppingListController(ShoppingList) {
	var list = this;

	list.items = ShoppingList.getItems();

	list.itemName = "";
	list.itemQuantity = "";

	list.addItem = function() {
		try {
			ShoppingList.addItem(list.itemName, list.itemQuantity);
		} catch(error) {
			list.errorMessage = error.message;
		}
	}
	list.removeItem = function(itemIndex) {
		ShoppingList.removeItem(itemIndex);
	};
}
function ShoppingListService(maxItems) {
	var service = this;

	var items = [];

	service.addItem = function (itemName, quantity) {
		if ((maxItems === undefined) || (maxItems!== undefined) && (items.length < maxItems)) {
			var item = {
				name:itemName,
				quantity:quantity
			};
			items.push(item);
		} else {
			throw new Error("Max Items ("+maxItems+") reached.")
		}
	};

	service.removeItem = function(itemIndex) {
		items.splice(itemIndex, 1);
	};

	service.getItems = function() {
		return items;
	};
}

function ShoppingListProvider() {
	var provider = this;

	// the new thing for providers
	provider.defaults = {
		maxItems: 10
	};

	provider.$get = function () { // Constructor
		var shoppingList = new ShoppingListService(provider.defaults.maxItems);
		return shoppingList;
	};
}

})();