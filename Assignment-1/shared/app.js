(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'] //protection from minification
function LunchCheckController($scope) {
	$scope.message = "";
	$scope.menu = "";
	$scope.mealCheck = function() {
		$scope.menu = $scope.menu.trim();
		if(!$scope.menu) {
			$scope.message = "Please enter data first";
			$scope.changeTextColor("red");
			$scope.changeBoxColor("red");
		} else {
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