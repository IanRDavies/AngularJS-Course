(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://course-server.herokuapp.com')
.config(config);


// dealing with our loading spinner
config.$inject = ['$httpProvider'];
function config($httpProvider) {
  // add our interceptor to the http process
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
