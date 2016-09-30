(function () {
'use strict';

angular.module('ShoppingList')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/shoppinglist/templates/home.template.html'
  })

  // Premade list page
  .state('mainList', {
    url: '/main-list',
    templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
    controller: 'MainShoppingListController as mainList',
    resolve: {
      items: ['ShoppingListService', function (ShoppingListService) {
        return ShoppingListService.getItems();
      }]
    }
  })

  // Item detail
  .state('mainList.itemDetail', { //parent.child syntax

    // child of mainList so inherits the resolve
    
    // url: '/item-detail/{itemId}', // dont want to redirect to new route but if we did it would be concatenated with parent's url
    // so since child uses data from parent no more calls to server for data - faster and more efficient
    
    templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
    controller: 'ItemDetailController as itemDetail',
    params: { // since we got rid of url so not knowing what params to expect 
      // hence we initialise itemId
      // Id now passed by clicking in the template html (shoppinglist.template.html)
      itemId: null
    }
  });

}

})();
