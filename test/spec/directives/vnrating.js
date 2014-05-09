/*global angular, describe, module, beforeEach, inject, it, expect */

describe('Directive: vnRating', function () {

    'use strict';

    // load the directive's module
    beforeEach(module('toolboxCommon'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<vn-rating></vn-rating>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('');
    }));
});
