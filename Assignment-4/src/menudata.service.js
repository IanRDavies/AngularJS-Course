(function() {
'use strict';

angular.module("Data")
.service("MenuDataService", MenuDataService)
.constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ["$http", "ApiBasePath"]
function MenuDataService($http, ApiBasePath){
	var service = this;

	service.getAllCategories = function(){
		return $http({
			method: "GET",
			url: (ApiBasePath + "/categories.json")
		})
		.then(function(result) {
			var categoriesList = result.data;
			var categoryShortNames = [];
			for(var i=0; i<categoriesList.length; i++){
				var shortName = categoriesList[i].short_name;
				categoryShortNames.push(shortName);
			}
			return categoryShortNames;
		});
	};

	service.getItemsForCategory = function(categoryShortName){
		return $http({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json"),
			params: {
				category: categoryShortName
			}
		})
		.then(function(result){
			var menuItems = result.data.menu_items;
			return menuItems;
		});
	};
};

})();