/*global angular, describe, module, beforeEach, inject, it, expect */

describe('Directive: vnLink', function () {

    'use strict';

    // load the directive's module
    beforeEach(module('toolboxCommon'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<vn-link></vn-link>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('');
    }));
});
