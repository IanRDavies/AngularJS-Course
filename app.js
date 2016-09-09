(function () { //iffy to make sure no variables bleed into global scope
'use strict'; // protects us from being bad at coding throws errors if we have errors

angular.module('applicationName', []) //list of dependences

.controller('MyFirstController', function($scope) {
	$scope.name = "Ian";
});
// $ denotes something that angular provides

})();