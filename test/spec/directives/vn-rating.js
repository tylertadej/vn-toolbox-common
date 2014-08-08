/*global jasmine, angular, describe, module, beforeEach, inject, it, expect */

var customMatchers = {
    toBeRatedAs: function (util, customEqualityTesters) {
        'use strict';

        return {
            compare: function (actual, expected, cssClass) {
                if (expected === undefined) {
                    expected = '';
                }

                var classToMatch = cssClass || 'fa-star';
                var idx,
                    selected = 0,
                    result = {};

                for (idx = 0; idx < actual.length; idx++) {
                    if (angular.element(actual[idx]).find('i').eq(0).hasClass(classToMatch)) {
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
        scope,
        $compile;

    function compile(scopeOptions, attributes) {
        angular.extend(scope, scopeOptions);

        var html = '<vn-rating rating-value="rating" ';

        angular.forEach(attributes, function(attr) {
           html += attr.key + '="' + attr.value + '" ';
        });

        html += '></vn-rating';
        element = angular.element(html);

        $compile(element)(scope);
        scope.$digest();
    }

    beforeEach(inject(function ($rootScope, _$compile_) {
        $compile = _$compile_;
        scope = $rootScope.$new();
    }));

    it('should have container element w/ specific class name and default title', function () {
        compile({ rating: 2 }, []);
        expect(element.attr('class')).toContain('vn-rating');
        var titleElem = element.find('p');
        expect(titleElem.eq(0).text()).toBe('Rating');
    });

    it('should have list', function () {
        compile({ rating: 2 }, []);
        var list = element.find('ul');

        expect(list.length).toBe(1);
    });

    it('should have a default of 5 maximum stars', function () {
        compile({ rating: 2 }, []);
        var list = element.find('ul');

        expect(list.eq(0).find('li').length).toEqual(5);
    });

    it('should have 2 stars filled when rating value is 2"', function () {
        compile({ rating: 2 }, []);
        var list = element.find('ul'),
            items = list.eq(0).find('li');

        expect(items).toBeRatedAs(scope.rating);
    });

    it('should use passed in CSS class for filled and empty stars', function() {
        var attributes = [
            { key: "filled-class", value: "foo" },
            { key: "empty-class", value: "bar" }
        ];
        compile({ rating: 4 }, attributes);

        var list = element.find('ul'),
            items = list.eq(0).find('li');

        expect(items).toBeRatedAs(scope.rating, 'foo');
        expect(items).toBeRatedAs(5 - scope.rating, 'bar');
    });

    it('should respect the editable property', function() {
        var attributes = [
            { key: "editable", value: "isEditable" }
        ];
        compile({ rating: 3, isEditable: false }, attributes);

        var list = element.find('ul'),
            items = list.eq(0).find('li');

        var isolateScope = element.isolateScope();
        isolateScope.toggle(1);
        expect(isolateScope.ratingValue).toBe(3);

        scope.isEditable = true;
        scope.$digest();
        isolateScope.toggle(1);
        expect(isolateScope.ratingValue).toBe(2);
    });

    it('should set the maximum no. of stars passed in', function() {
        var attributes = [
            { key: "maximum", value: "maximumStars" },
            { key: "filled-class", value: "foo" },
            { key: "empty-class", value: "bar" }
        ];
        compile({ rating: 3, maximumStars: 10 }, attributes);

        var list = element.find('ul'),
            items = list.eq(0).find('li');

        expect(items).toBeRatedAs(scope.rating, 'foo');
        expect(items).toBeRatedAs(scope.maximumStars - scope.rating, 'bar');
    });

    it('should be able to show half stars', function() {
        var attributes = [
            { key: "filled-class", value: "foo" },
            { key: "half-filled-class", value: "bar" },
            { key: "empty-class", value: "baz" }
        ];
        compile({ rating: 3.5 }, attributes);

        var list = element.find('ul'),
            items = list.eq(0).find('li');
        expect(items).toBeRatedAs(3, 'foo');
        expect(items).toBeRatedAs(1, 'bar');
    });

    it('should use the title passed in', function() {
        var attributes = [
            { key: "title", value: "foo" }
        ];
        compile({ rating: 3 }, attributes);
        var titleElem = element.find('p');
        expect(titleElem.text()).toBe('foo');
    });
});
