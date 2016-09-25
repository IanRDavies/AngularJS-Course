(function() {
'use strict';
angular.module("NarrowItDownApp")
.service("MenuSearchService", MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

MenuSearchService.$inject = ["$http", "ApiBasePath"]
function MenuSearchService($http, ApiBasePath) {
	var service = this;
	service.showList = true;

	service.getMatchedMenuItems = function(searchTerm) {
		return $http(
		{
			method: "GET",
			url: (ApiBasePath + "/menu_items.json")
		}).then(function(result) {
			var menu = result.data.menu_items;
			searchTerm = searchTerm.toLowerCase();
			var foundItems = [];
			for(var i=0; i<menu.length; i++) {
				var description = menu[i].description.toLowerCase();
				if(description.indexOf(searchTerm) !== -1) {
					foundItems.push(menu[i]);
				}
			}
			return foundItems;
		});
	};

	service.removeItem = function(itemIndex, list) {
		list.splice(itemIndex, 1);
	};


};

})();

