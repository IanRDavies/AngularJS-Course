(function(){
'use strict';

angular.module('Loader')
.component('itemsLoaderIndicator', {
	templateUrl: 'loader/itemsloaderindicator.template.html',
	controller: LoaderController
});


LoaderController.$inject = ['$rootScope']
function LoaderController($rootScope) {
 	var $ctrl = this;

 	var cancelListener = $rootScope.$on('menu:processing', function(event, data){
 		console.log(event);
 		if(data.on) {
 			$ctrl.showLoader = true;
 		}
 		else{
 			$ctrl.showLoader = false;
 		}
 	});

};

})();