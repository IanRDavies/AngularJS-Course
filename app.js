(function () { //iffy to make sure no variables bleed into global scope
'use strict'; // protects us from being bad at coding throws errors if we have errors

angular.module('applicationName', []) //list of dependences

.controller('MyFirstController', function($scope) {
	$scope.name = "";
	$scope.totalValue = 0;

	$scope.displayNumeric = function() {
		var totalNameValue = calculateValue($scope.name);
		$scope.totalValue = totalNameValue;
	}

	function calculateValue(name) {
		var total = 0;
		for(var i = 0; i < name.length; i++) {
			total += name.charCodeAt(i);
		}
		return total;
	}
});
// $ denotes something that angular provides

})();