'use strict';

describe('Directive: vnShowOnDropdownHover', function () {

  // load the directive's module
  beforeEach(module('Volusion.toolboxCommon'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should exist', inject(function ($compile) {
    element = angular.element('<ul vn-show-dnDropdown-hover></ul>');
    element = $compile(element)(scope);
    expect(element).not.toBeUndefined();

  }));
});
