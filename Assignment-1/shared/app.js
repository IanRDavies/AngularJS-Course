(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);
//protection from minification
LunchCheckController.$inject = ['$scope']

// Setting up the controller
function LunchCheckController($scope) {
	// initialisiing the messages and the input to empty strings
	$scope.message = "";
	$scope.menu = "";
	$scope.mealCheck = function() {
		$scope.menu = $scope.menu.trim();
		if(!$scope.menu) { // if whitespace/nothing entered
			$scope.message = "Please enter data first";
			$scope.changeTextColor("red");
			$scope.changeBoxColor("red");
		} else { // if some list of items is entered
				$scope.menuList = $scope.menu.split(",");
				$scope.menuLength = $scope.menuList.length;
				$scope.changeTextColor("green");
				$scope.changeBoxColor("green");
				if($scope.menuLength<=3) {
					$scope.message = "Enjoy!";
				} else {
					$scope.message="Too Much!"
				}
		}
};
    // Section for the extension tasks - changing the style functions (look at ng-style tags in the HTML)
	$scope.messageStyle = {};
	$scope.changeTextColor = function(color) {
		$scope.messageStyle.style = {'color':color};
	};
	$scope.textboxStyle = {};
	$scope.changeBoxColor = function(color) {
		$scope.textboxStyle.style = {'border-color':color};
	};
};
})();