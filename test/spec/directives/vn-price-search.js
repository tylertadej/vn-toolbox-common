'use strict';

describe('Directive: vnPriceSearch', function () {

  // load the directive's module
  beforeEach(module('Volusion.toolboxCommon'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<vn-price-search></vn-price-search>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the vnPriceSearch directive');
  }));
});
