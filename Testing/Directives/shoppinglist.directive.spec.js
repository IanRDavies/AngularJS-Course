// describe string is the name of the test in the web page
describe('shoppingList directive', function() {
  var $compile;
  var $rootScope;

  var expectedHtml = '<h3 class="ng-binding">test title</h3>\
  <ol>\
    <!-- ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope"> \
      1 of item 1 \
      <button ng-click="list.removeItem($index);">Remove Item</button> \
    </li><!-- end ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope"> \
      2 of item 2 \
      <button ng-click="list.removeItem($index);">Remove Item</button> \
    </li><!-- end ngRepeat: item in list.items --> \
  </ol>'.replace(/\s/g, ''); // removes spaces
  // string copied from dev tools in browser

  // loading the moduele
  beforeEach(module('ShoppingListDirectiveApp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  // using $rootScope makes testing element as if it is direct child of element where ng-app is declared
  // $compile since html is compiled by angular to add functionaluity and make DOM workable
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // making sure services are saved for future use
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(inject(function($templateCache) {
    // Better to use KARMA

    // placing template in the cache to stop angular making requests to server

    // only need this section if have templateUrl property
    // this avoids AJAX calls being made
    var directiveTemplate = null; 
    var req = new XMLHttpRequest();
    req.onload = function() {
        directiveTemplate = this.responseText;
    };

    // Note that the relative path may be different from your unit test HTML file.
    // Using `false` as the third parameter to open() makes the operation synchronous.
    req.open("get", "shoppingList.html", false);
    req.send();
    $templateCache.put("shoppingList.html", directiveTemplate);
  }));

  it('Replaces the element with the appropriate content', function() {
    // making sure that the list we need exists
    var list = {};
    list.items = [
      {name: "item 1", quantity: "1"},
      {name: "item 2", quantity: "2"}
    ];
    $rootScope.list = list;

    // Compile a piece of HTML containing the directive
    var html = "<shopping-list my-list='list' title='test title'></shopping-list>" // passing in the list made above and some arbitary title (according to directive design)
    var element = $compile(html)($rootScope); // compile returns function which needs an element as to where to place directive for it to work
    // binds data from rootscope to the html element we defined in the html string

    // fire all the watches, so the scope expressions will be evaluated
    $rootScope.$digest();

    // Check that the compiled element contains the templated content
    expect(element.html().replace(/\s/g, '')).toContain(expectedHtml);
  });
});
