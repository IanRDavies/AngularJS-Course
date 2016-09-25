(function() {
'use strict';

angular.module("NarrowItDownApp")
.controller("NarrowItDownController", NarrowItDownController);

NarrowItDownController.$inject = ["MenuSearchService"];
function NarrowItDownController(MenuSearchService) {
	var menu = this;
	menu.searchTerm = "";


	menu.search = function(searchTerm) {
        searchTerm = searchTerm.toLowerCase();

		menu.promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm)
		.then(function(foundItems){
			menu.found = foundItems;
		});

	};

    menu.removeItem = function(itemIndex) {
        MenuSearchService.removeItem(itemIndex, menu.found);
    }

};

})();