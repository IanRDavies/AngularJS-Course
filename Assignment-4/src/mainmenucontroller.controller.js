(function(){
'use strict';

angular.module("MenuCategoriesApp")
.controller("CategoriesController", CategoriesController);

CategoriesController.$inject = ["categories"];
function CategoriesController(categories){
	var CategoryList = this;
	CategoryList.categories = categories;
}

})();