describe('menucategories', function () {

  var menucategories;
  var $httpBackend; // Angular built in thing to prevent server calls and lets us send our own data
  var ApiBasePath;

  beforeEach(function () {
    module('MenuCategoriesApp');

    inject(function ($injector) {
      // now pulling from the angular context for reference in it
      // injection to service is handeled by angular automagically
      menucategories = $injector.get('MenuCategoriesService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiBasePath');
    }); // use get method of injector to get things injected to the service
  });

  it('should return categories list', function() {
    $httpBackend.whenGET(ApiBasePath + '/categories.json').respond(['Lunch', 'Dessert']);
    // whenGET to respond to a GET method

    // now we have set up response can set up test
    menucategories.getMenuCategories().then(function(response) {
      expect(response.data).toEqual(['Lunch', 'Dessert']);
    });
    $httpBackend.flush(); // needed to prevent need to wrtie asncronous tests - code still runs asyncronously
    // makes async call behave as if it were sync
  });

});
