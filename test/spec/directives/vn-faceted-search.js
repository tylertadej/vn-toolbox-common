'use strict';

describe('Directive: vnFacetedSearch', function () {

  // load the directive's module
  beforeEach(module('Volusion.toolboxCommon'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<vn-faceted-search></vn-faceted-search>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the vnFacetedSearch directive');
  }));
});
