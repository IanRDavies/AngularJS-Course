(function() {
'use strict';

angular.module("ShoppingList")
.controller("ItemDetailController", ItemDetailController);

// Item is injected through state's resolve
ItemDetailController.$inject = ["item"]
function ItemDetailController(item) {
	var itemdetail = this;
	// Copying over items properties to work in template
	itemdetail.name = item.name;
	itemdetail.quantity = item.quantity;
	itemdetail.description = item.description;

}	


})();