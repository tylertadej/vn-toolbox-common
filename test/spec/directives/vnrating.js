/*global jasmine, angular, describe, module, beforeEach, inject, it, expect */

var customMatchers = {
    toBeRatedAs: function (util, customEqualityTesters) {

        'use strict';

        return {
            compare: function (actual, expected) {
                if (expected === undefined) {
                    expected = '';
                }

                var idx,
                    selected = 0,
                    result = {};

                for (idx = 0; idx < actual.length; idx++) {
                    if (angular.element(actual[idx]).hasClass('filled')) {
                        selected++;
                    }
                }

                result.pass = util.equals(selected, expected, customEqualityTesters);

                if (result.pass) {
                    result.message = 'Rating is set to ' + expected + '.';
                } else {
                    result.message = 'Expected rating to be ' + expected + ' instead of ' + selected + '.';
                }

                return result;
            }
        };
    }
};

describe('Directive: vnRating', function () {

    'use strict';

    beforeEach(function () {
        jasmine.addMatchers(customMatchers);
    });

    // load the directive's module
    beforeEach(module('Volusion.toolboxCommon'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.rating = 2;

        element = angular.element('<vn-rating rating-value="rating"></vn-rating>');

        $compile(element)(scope);
        scope.$digest();
    }));

    it('should have container element w/ specific class name', function () {
        expect(element.attr('class')).toContain('vn-rating');
    });

    it('should have list', function () {
        var list = element.find('ul');

        expect(list.length).toBe(1);
    });

    it('should have 5 list items', function () {
        var list = element.find('ul');

        expect(list.eq(0).find('li').length).toEqual(5);
    });

    it('should have 2 list items with class "filled"', function () {
        var list = element.find('ul'),
            items = list.eq(0).find('li');

        expect(items).toBeRatedAs(scope.rating);
    });

    it('should have 5 list items with class "filled"', function () {
        scope.rating = 5;
        scope.$digest();

        var list = element.find('ul'),
            items = list.eq(0).find('li');

        expect(items).toBeRatedAs(scope.rating);
    });
});
