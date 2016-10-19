(function() {
"use strict";

angular.module('common')
.component('loading', {
  template: '<img src="images/spinner.svg" ng-if="$ctrl.show">',
  controller: LoadingController
});


LoadingController.$inject = ['$rootScope'];
function LoadingController ($rootScope) {
  var $ctrl = this;
  var listener;

  $ctrl.$onInit = function() {
    $ctrl.show = false;
    listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
    // event will be called spinner:activate
  };

  $ctrl.$onDestroy = function() {
    listener(); // destructor generation in onInit
    // avoids memory leaks
  };

  function onSpinnerActivate(event, data) {
    $ctrl.show = data.on; // on property will be a boolean
  }
}

})();
