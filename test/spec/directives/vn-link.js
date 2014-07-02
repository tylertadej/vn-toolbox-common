/*global angular, describe, module, beforeEach, inject, it, expect */

describe('Directive: vnLink', function () {

    'use strict';

    // load the directive's module
    beforeEach(module('Volusion.toolboxCommon'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope, $compile) {
        element = angular.element('<vn-link href="/go-to-link">Some text</vn-link>');

        scope = $rootScope.$new();

        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should have class', function () {
        expect(element.attr('class')).toContain('vn-link');
    });

    it('should have target if defined', inject(function ($compile) {

        var template = $compile('<vn-link target="_blank"></vn-link>')(scope);
        scope.$digest();

        expect(template.attr('target')).toBe('_blank');
    }));

    it('should have href', function () {
        expect(element.attr('href')).toBe('/go-to-link');
    });

    it('should transclude content', function () {
        expect(element.text()).toBe('Some text');
    });
});
