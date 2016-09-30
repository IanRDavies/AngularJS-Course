(function () {
'use strict';

angular.module('MenuCategoriesApp')
.controller('CategoryDetailController', CategoryDetailController);

CategoryDetailController.$inject = ['$stateParams', 'items'];
function CategoryDetailController($stateParams, items) {
  var categoryItems = this;
  categoryItems.items = items;

  categoryItems.category = $stateParams.categoryId;
}

})();
