(function() {

angular.module("MenuCategoriesApp")
.component("items", {
	templateUrl: "/templates/items.template.html",
	controller: "ItemController as category",
	bindings: {
		menuItems: "<"

	}
});


})();