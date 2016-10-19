describe("ShoppingListController", function() {

  beforeEach(module('ShoppingListApp')); // must be module to which thing tested is applied
  // this is equivalent to angular.module

  var $controller;
  var shoppingListController;

  // with multiple beforeEach functions all are called before each test
  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;

    var ShoppingListServiceErrorMock = {};
    ShoppingListServiceErrorMock.addItem = function (name, quantity) {
      throw new Error("Test message.");
    };
    ShoppingListServiceErrorMock.getItems = function () {
      return null;
    };

    shoppingListController =
      $controller('ShoppingListController',
                  {ShoppingListService: ShoppingListServiceErrorMock});

  }));

  it("should change error message in controller", function() {
    shoppingListController.addItem();
    expect(shoppingListController.errorMessage).toBe("Test message.");
  });

});
