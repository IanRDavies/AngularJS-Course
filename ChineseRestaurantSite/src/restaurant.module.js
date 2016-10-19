(function() {
"use strict";

// two modules public and admin to deal with different areas of the site

/*
Restaurant module that includes the public module as a dependency
 */
angular.module('restaurant', ['public', 'admin'])
.config(config);

config.$inject = ['$urlRouterProvider'];
function config($urlRouterProvider) {

  // If user goes to a path that doesn't exist, redirect to public root
  $urlRouterProvider.otherwise('/');
}

})();
