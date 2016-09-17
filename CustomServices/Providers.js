// PROVIDERS - like factories but configured to your custom desites at the first point the script is run
// STEP 1: Create provider function
// needs $get property linked to a factory function in which service is created
// STEP 2: register Provider with module - .provider("NameofService", ServiceProvider)
// STEP 3: Inject service into controllers
// STEP 4A: [OPTIONAL] Make config function (need to be registered below .provider using .config(Config)
// STEP 4B: [OPTIONAL] Define config function
// Config.$Inject = ['NameofServiceProvider'];
// Config = function(NameofServiceProvider) {NameofService.Provider.config.property = value;};

(function () {
"use strict";

angular.module("ShoppingListApp",[])
.controller("ShoppingListController", ShoppingListController)
.provider("ShoppingListService", ShoppingListServiceProvider)
.config(Config);

Config.$inject = ["ShoppingListServiceProvider"];
// since config is called before anything else cannot inject regular components
// that is we may only inject providers

function Config(ShoppingListServiceProvider) {
	// To save making too long lists
	// this masks the default in the provider funtion
	ShoppingListProvider.defaults.maxItems = 2;
};


ShoppingListController.$inject = ["ShoppingListService"]; // inject service provided/created by the provider
function ShoppingListController(ShoppingListService) {
	var list = this;

	list.items = ShoppingListService.getItems();

	list.itemName = "";
	list.itemQuantity = "";

	list.addItem = function() {
		try {
			ShoppingListService.addItem(list.itemName, list.itemQuantity);
		} catch(error) {
			list.errorMessage = error.message;
		}
	};
	list.removeItem = function(itemIndex) {
		ShoppingListService.removeItem(itemIndex);
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
		maxItems = 10
	};

	provider.$get = function () { // Constructor
		var shoppingList = new ShoppingListService(provider.defaults.maxItems);
		return shoppingList;
	};
}

})();