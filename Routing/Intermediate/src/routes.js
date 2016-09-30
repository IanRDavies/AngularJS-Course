(function () {
'use strict';

angular.module('ShoppingList')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/'); // reroutes to home

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
    resolve: { // using this so that promise is resolved (data found) before view change
      // that is thr promise in items is reslolved before view will change
      // if promise rejected view will not change
      items: ['ShoppingListService', function(ShoppingListService) { // array to inject and protect from minification
        return ShoppingListService.getItems()
      }]
      // can use resolve w/o promise as a way to inject values directly into controller responsible for state
    }
    // can also do controller:
    // controllerAs: ... as in components
  })
  // using UI-ROUTER
  .state("itemDetail", {
    url: '/item-detail/{itemId}',
    templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
    controller: "ItemDetailController as itemDetail",
    resolve: {
      // url parameters are stored in $stateParams object
      item: ["$stateParams", "ShoppingListService",
        function($stateParams, ShoppingListService){
          return ShoppingListService.getItems()
          .then(function(items) {
            return items[$stateParams.itemId];
          });
      }]
    }
  })
}

})();


// Controller stores attributes and functions
// service holds the actual content