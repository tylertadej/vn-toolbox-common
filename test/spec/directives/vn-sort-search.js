'use strict';

describe('Directive: vnSortSearch', function () {

  // load the directive's module
  beforeEach(module('Volusion.toolboxCommon'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<vn-sort-search></vn-sort-search>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the vnSortSearch directive');
  }));
});
