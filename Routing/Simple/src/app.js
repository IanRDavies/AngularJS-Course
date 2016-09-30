(function () {

angular.module('RoutingApp',['ui.router']); // dependency of ui.router

angular.module('RoutingApp')
.config(RoutesConfig); // configuring Router

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
// Provides configure state services 
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to tab 1 if no other URL matches
  $urlRouterProvider.otherwise('/tab1');
  // if no state or if state not recognised then go to tab 1

  // Setting up UI states
  $stateProvider
    .state('tab1', {
      url: '/tab1',
      templateUrl: 'src/tab1.html'
    })

    .state('tab2', {
      url: '/tab2', // url not needed if using sref but will have href aswell but then cant go straight to tab 2
      templateUrl: 'src/tab2.html'
    });
}


})();
