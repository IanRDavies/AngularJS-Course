(function() {
'use strict';
angular.module("NarrowItDownApp")
.service("MenuSearchService", MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

MenuSearchService.$inject = ["$q", "$http", "ApiBasePath"]
function MenuSearchService($q, $http, ApiBasePath) {
	var service = this;

	service.getMatchedMenuItems = function(searchTerm) {
		return $http(
		{
			method: "GET",
			url: (ApiBasePath + "/menu_items.json")
		}).then(function(result) {
			console.log(result);
			var menu = result.data.menu_items;
			var foundItems = [];
			for(var i=0; i<menu.length; i++) {
				var description = menu[i].description.toLowerCase();
				if(description.indexOf(searchTerm) !== -1) {
					foundItems.push(menu[i]);
				}
			}
			console.log(foundItems);
			return foundItems;
		});
	};


};

})();

