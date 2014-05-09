'use strict';

describe('Directive: vnImage', function () {

  // load the directive's module
  beforeEach(module('vnToolboxCommonApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<vn-image></vn-image>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the vnImage directive');
  }));
});
