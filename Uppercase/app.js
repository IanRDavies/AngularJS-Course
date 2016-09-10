(function () { 
'use strict';

angular.module('DIApp', []) //list of dependences

.controller('DIController', ['$scope', '$filter', DIController]); // use array to protect services in minification
// could also protect it by leaving it as was (only function passed not array with strings for parameters)
// and adding:
// DIController.$inject = ['$scope', '$filter']
function DIController($scope, $filter) {
	$scope.name = "";

	$scope.upper = function() {
		var upCase = $filter('uppercase');
		$scope.name = upCase($scope.name);
	};
	$scope.imageChoice = "NY.jpg";
	$scope.imageClick = function() {
			if($scope.imageChoice==="NY.jpg") {
				$scope.imageChoice = "Columbia.png";
			} else {
				$scope.imageChoice = "NY.jpg";
			}
	};
}

})();