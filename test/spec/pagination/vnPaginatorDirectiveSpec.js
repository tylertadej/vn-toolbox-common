'use strict';

describe('Directive: vnPaginator', function () {

    // load the directive's module
    beforeEach(module('Volusion.toolboxCommon'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should exist', inject(function ($compile) {
        element = angular.element('<div data-vn-paginator></div>');
        element = $compile(element)(scope);
        expect(!!element).toBe(true);
    }));
});
