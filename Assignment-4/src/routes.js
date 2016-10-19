(function(){
'use strict';

angular.module("MenuCategoriesApp")
.config(RoutesConfig);


RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"]
function RoutesConfig($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state("home", {
		url: "/",
		templateUrl: "src/templates/home.template.html"
	})
	.state("listCategories", {
		url: "/categories-list",
		templateUrl: "src/templates/displaycategories.template.html",
		controller: "CategoriesController as categoryList",
		resolve: {
			categories: ["MenuDataService", function(MenuDataService){
				return MenuDataService.getAllCategories();
			}]
		}
	})
	.state("items", {
		url: "/category-items/{categoryId}",
		templateUrl: "src/templates/items.template.html",
		controller: "CategoryDetailController as categoryItems",
		// PARAMS NOT NECESSARY IT SEEMS
		// params: {
		// 	categoryId: null		
		// },
		resolve: {
			items: ["MenuDataService", "$stateParams", function(MenuDataService, $stateParams){
				return MenuDataService.getItemsForCategory($stateParams.categoryId);
			}]
		}
	});
}

})();