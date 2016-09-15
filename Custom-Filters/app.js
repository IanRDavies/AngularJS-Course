(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController)
.filter('loves', LovesFilterFactory)  // Filter name will be lovesFilter
.filter('truth', TruthFilter); // Creating filter function 'truth' using filter service (filter factory)
// semi-colon only comes once controller and all its filters are called
// Necessary for controller to run well
// Register all filters regardless of how they are implemented (HTML vs JS)

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
// OUTSIDE CONTROLLER
function LovesFilterFactory() { // Making a filter factory
  return function (input) {
    input = input || ""; // i.e. if input is undefined then take the empty string
    input = input.replace("likes", "loves");
    return input;
  };
}

function TruthFilter() { // Making another filter factory
// creates and returns and instance of the filter function
  return function (input, target, replace) {
    input = input || "";
    input = input.replace(target, replace);
    return input;
  }


$scope.onceCounter = 0;

$scope.countOnce = function() {
  $scope.onceCounter = 1;
  $scope.counter = 0;
};
// Set up a watcher on property onceCounter
// Watcher will fire every time onceCounter is changed (from 1)
// This is just an example - should never use $watch in a controller (may be used in services, directives or components however)
$scope.$watch('onceCounter', function (newValue, oldValue) {
  console.log("Old value: ", oldValue);
  console.log("New value: ", newValue);
})
$scope.$watch(function() {
  console.log("Digest loop fired"); // Will run on each digest loop as $digest will try to work out what this watch is montioring and hence will fire the console.log 
})
}
})();
// For watchers should be automatic - set up by Angular
// e.g. on ng-model = "var_name" or using {{ expresion }} (interpolation)