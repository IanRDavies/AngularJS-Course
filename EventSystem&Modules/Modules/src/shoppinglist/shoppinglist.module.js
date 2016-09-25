(function () {
'use strict';

angular.module('ShoppingList', ['Spinner']);
// two arguments so declaring module here

angular.module('ShoppingList')
.config(function () {
  console.log("ShoppingList config fired.");
})
.run(function () { // run method runs immediately after .config
  console.log("ShoppingList run fired.");
});

})();

// with dependencies all configs are run with dependencies first
// then .run s are run in the same order