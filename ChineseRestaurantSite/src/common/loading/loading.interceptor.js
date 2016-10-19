(function() {
"use strict";

// File to ensure that spinner is on when requests made

angular.module('common')
.factory('loadingHttpInterceptor', LoadingHttpInterceptor);
// see common module for configuration using this

LoadingHttpInterceptor.$inject = ['$rootScope', '$q'];
/**
 * Tracks when a request begins and finishes. When a
 * request starts, a progress event is emitted to allow
 * listeners to determine when a request has been initiated.
 * When the response completes or a response error occurs,
 * we assume the request has ended and emit a finish event.
 */
function LoadingHttpInterceptor($rootScope, $q) {

  var loadingCount = 0;
  var loadingEventName = 'spinner:activate';

  return {
    request: function (config) {
      // config object is everything needed to make $http request
      // runs this function before making request 

      // console.log("Inside interceptor, config: ", config);

      if (++loadingCount === 1) {
        // above: incremet then test vs 1
        // to deal with multiple things at a time
        // change only happens at 1/0 boundary 
        $rootScope.$broadcast(loadingEventName, {on: true});
      }

      return config;
    },

    response: function (response) {
      if (--loadingCount === 0) {
        $rootScope.$broadcast(loadingEventName, {on: false});
      }

      return response;
    },

    responseError: function (response) {
      if (--loadingCount === 0) {
        $rootScope.$broadcast(loadingEventName, {on: false});
      }

      return $q.reject(response); 
      // reject promise to ensure that caller is not returned a success in the case of error
    }
  };
}

})();