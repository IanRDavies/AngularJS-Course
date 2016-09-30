(function(){
'use strict';
angular.module('loader')
.component('itemsLoaderIndicator', {
	templateUrl: 'loader/itemsloaderindicator.template.html',
	controller: LoaderController
});

loaderController.$inject = ['$rootScope']
function LoaderController($rootScope) {
	var $ctrl = this;

	var cancelListener = $rootScope.$on('menu:processing', function(event, data){
		if(data.on){
			$ctrl.showLoader = true;
		} else {
			$ctrl.showLoader = false;
		}
	});

	$ctrl.$onDestroy = function() {
		cancelListener();
	};
};

})();