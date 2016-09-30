(function(){
'use strict';

angular.module('Spinner')
.component('loadingSpinner', {
	templateUrl: 'src/spinner/loadingspinner.template.html',
	controller: SpinnerController
});

SpinnerController.$inject = ['$rootScope']
function SpinnerController($rootScope) {
	var $ctrl = this;
	var cancellers = [];

	$ctrl.$onInit = function() {
		var cancel = $rootScope.$on('$stateChangeStart', //starting transition
			function(event, toState, toParams, fromState, fromParams, options){
				// call event.preventDefault(); if want to stop state change (e.g. on error)
				$ctrl.showSpinner = true;
			});
		cancellers.push(cancel);

		cancel = $rootScope.$on('$stateChangeSuccess', // Transition completed
			function(event, toState, toParams, fromState, fromParams){
				$ctrl.showSpinner = false;
			});
		cancellers.push(cancel);

		cancel = $rootScope.$on('$stateChangeError', // if there are errors
			function(event, toParams, toState, fromParams, fromState, error){
				// catches all errors (lest they be swallowed & hidden)
				$ctrl.showSpinner = false;
			});
		cancellers.push(cancel);
	};

	$ctrl.$onDestroy = function() {
		cancellers.forEach(function(item){
			item(); // cancelling the listeners
		})
	}

}
	
})();