(function() {
'use strict';

angular.module('public')
.directive('email', emailTest);

emailTest.$inject = ["LogInService"]
function emailTest(LogInService) {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl){
			// adding cutstom valudation
			ctrl.$validators.email = function(modelValue, viewValue){
				if(ctrl.$isEmpty(modelValue)){
					// consider empty models as valid
					return true;
				}

				return LogInService.uniqueUser(viewValue)
			}
		},
		// directive to be used as attribute (on an input) ONLY
		restrict: 'A'
	}
}


})();