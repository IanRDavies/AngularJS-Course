(function() {
"use strict";

angular.module("MenuCategoriesApp")
.component("categories",{
	templateUrl: 'src/templates/categories.template.html',
	bindings: {
		categories: "<"
	}
});

})();