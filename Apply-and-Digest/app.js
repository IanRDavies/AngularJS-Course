(function () {
'use strict';

angular.module('CounterApp', [])
.controller('CounterController', CounterController);

CounterController.$inject = ['$scope', '$timeout'];
function CounterController($scope, $timeout) {
  // Need to inject $timeout to get it to work
  // Without this setTimeout will run as per the standard JavaScript implementation but this fails to fire a digest loop since it will then run outside of Angular
  // This is the timeout function built into AngularJS 
  // With stuff not written into Angular then best to use $apply 
  $scope.counter = 0;

  $scope.upCounter = function () {
    $timeout(function () {
      $scope.counter++;
      console.log("Counter incremented!");
    }, 2000); //Waits two seconds to then increment counter
  };

  // $scope.upCounter = function () {
  //   setTimeout(function () {
  //     $scope.$apply(function () {
    //APPLY TAKE A FUNCTION AND RUNS IT AND THEN RUNS THE DIGEST AS APPLY RUNS THROUGH AngularJS
  //       $scope.counter++;
  //       console.log("Counter incremented!");
  //     });
  //   }, 2000);
  // };

  // $scope.upCounter = function () {
  //   setTimeout(function () {
  //     $scope.counter++;
  //     console.log("Counter incremented!");
  //     $scope.$digest(); // MANUALLY STARTING DIGEST CYCLE BUT THIS PREVENTS ERRORS THROWN GOING THROUGH AngularJS
  //   }, 2000);
  // };
}

})();

// 2 way binding (as in the case of input & ng-model) means that there is a listener in the HTML and an watcher on the variable
// In this case if the variable is changed by some means other than the input in the HTML then the input box changes to display the new value - the second way

// {{ value }} is one-way binding it only goes from the scope to the browser (no reverse link)

// Dont want more than 2000 watchers per page - so one time binding is better for performance

// Onetime binding {{ :: propertyName }}
// The watcher will be cut from the digest cycle as soon as the propertyName is initialised 
// (so dont initialise it to empty or 0 or w/e)
