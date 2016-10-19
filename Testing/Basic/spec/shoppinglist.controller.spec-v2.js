describe("Spec v2: ShoppingListController", function() {
// describe function is a place to write all our tests
// stings in function calls from jasmine jst describe the aim so are somewhat irrelevant

  beforeEach(function () {
  // runs before each test to make sure we reset to a known set of parameters 

    // setting up a mock service
    // module is like a config on module
    // $provide enables us to create a new service as part of the module
    // used to take things common to tests out of separate tests - avoids code rewriting
    module(function ($provide) {
      $provide.service('ShoppingListServiceErrorMock', function () {
        var service = this;
        // mocking bits of servcie needed for testing
        service.addItem = function (name, quantity) {
          throw new Error("Test message.");
        };

        service.getItems = function () {
          return null;
        };
      });
    });

    module('ShoppingListApp'); 
  });

  var $controller;
  var shoppingListController;

  // now inject controller and service into each test
  beforeEach(inject(function (_$controller_, ShoppingListServiceErrorMock) {
    $controller = _$controller_; //angular.mock's inject method strips _s
    // this avoids renaming the standard $controller service

    // create controller
    shoppingListController =
      $controller('ShoppingListController',
                  {ShoppingListService: ShoppingListServiceErrorMock});
      // initialising controller with mocked service as ShoppingListService
      // an object accessible to it function
      // $controller used to instantiate controller wanted for tests

  }));
  // it function is the actual test
  // the it function should NOT return true
  // place x before it (xit) or even before describe to temporarily disable tests
  it("should change error message in controller", function() {
    shoppingListController.addItem();
    expect(shoppingListController.errorMessage).toBe("Test message."); // if needed can also do .not.toBe(result)
    // other extentions include .toEqual 
  });

});
