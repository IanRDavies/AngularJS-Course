(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController)
.filter('loves', LovesFilterFactory)  // Filter name will be lovesFilter
.filter('truth', TruthFilter); // Creating filter function 'truth' using filter service (filter factory)

MsgController.$inject = ['$scope', 'lovesFilter']; // Injectting filter function
// No need to inject filters to be used in {{ x | filter }} HTML way
function MsgController($scope, lovesFilter) {
  $scope.stateOfBeing = "hungry";

  $scope.sayMessage = function () {
    var msg = "Yaakov likes to eat healthy snacks at night!";
    return msg;
  };

  $scope.sayLovesMessage = function () {
    var msg = "Yaakov likes to eat healthy snacks at night!";
    msg = lovesFilter(msg) // Calls filter function
    return msg;
  };

  $scope.feedYaakov = function () {
    $scope.stateOfBeing = "fed";
  };
}

function LovesFilterFactory() { // Making a filter factory
  return function (input) {
    input = input || "";
    input = input.replace("likes", "loves");
    return input;
  };
}

function TruthFilter() { // Making another filter factory
  return function (input, target, replace) {
    input = input || "";
    input = input.replace(target, replace);
    return input;
  }
}

})();
