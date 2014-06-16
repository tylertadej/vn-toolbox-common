/*global angular, describe, module, beforeEach, inject, it, expect */
// ReSharper disable WrongExpressionStatement
describe('Directive: vnMetaTags', function () {
    'use strict';

    function compile(scope, fn) {
        var $div = angular.element('<div/>').attr('data-vn-meta-tags', ''),
            component;

        if (typeof fn === 'function') {
            inject(function ($compile) {
                component = $compile(fn($div))(scope);
            });
        }

        scope.$digest();
        return component;
    }

    function addFixtureData(scope, extensions) {
        scope.seo = angular.extend({
            metatagTitle: 'foo',
            metatagDescription: 'bar',
            metatagKeywords: 'baz'
        }, extensions);

        return scope;
    }

    // load the directive's module
    beforeEach(module('Volusion.toolboxCommon'));

//    var $rootScope;
//    var $compile;
    var $scope;

    /*jshint camelcase: false */
    beforeEach(inject(function (_$rootScope_) {
//        $rootScope = _$rootScope_;
//        $compile = _$compile_;
        $scope = _$rootScope_.$new();
    }));
    /*jshint camelcase: true */

    it('creates title and metatags', function () {
        var component = compile(addFixtureData($scope),
            function ($elem) {

                return $elem.attr('data-title', 'seo.metatagTitle').
                    attr('data-description', 'seo.metatagDescription').
                    attr('data-keywords', 'seo.metatagKeywords');
            });
        expect(component.find('title').text()).toBe('foo');

        expect(component.find('meta').eq(0).attr('content')).toBe('bar');
        expect(component.find('meta').eq(1).attr('content')).toBe('baz');
    });

    it('updates the title and metatags when scope changes', inject(function ($compile) {
        var scope = addFixtureData($scope),
            component = $compile(angular.element('<div/>').
                attr('data-vn-meta-tags', '').
                attr('data-title', 'seo.metatagTitle').
                attr('data-description', 'seo.metatagDescription').
                attr('data-keywords', 'seo.metatagKeywords'))(scope),
            metaTags;

        scope.$digest();

        metaTags = component.find('meta');

        expect(component.find('title').text()).toBe('foo');
        expect(metaTags.length).toBe(2);
        expect(component.find('meta').eq(0).attr('content')).toBe('bar');
        expect(component.find('meta').eq(1).attr('content')).toBe('baz');

        scope.seo.metatagTitle = 'qux';
        scope.seo.metatagDescription = 'quux';
        scope.seo.metatagKeywords = 'garply';

        component = $compile(angular.element('<div/>').
            attr('data-vn-meta-tags', '').
            attr('data-title', 'seo.metatagTitle').
            attr('data-description', 'seo.metatagDescription').
            attr('data-keywords', 'seo.metatagKeywords'))(scope);

        scope.$digest();

        expect(component.find('title').text()).toBe('qux');
        expect(component.find('meta').eq(0).attr('content')).toBe('quux');
        expect(component.find('meta').eq(1).attr('content')).toBe('garply');
    }));

    it('does not create title and metatags if nothing sent in', function () {
        var component = compile(addFixtureData($scope), function ($elem) {
                return $elem;
            }),
            metaTags = component.find('meta');

        expect(component.find('title').length).toBe(0);
        expect(metaTags.length).toBe(0);
    });

    it('appends meta tags sent in the toAppend property', function () {
        var component = compile(addFixtureData($scope, { globallyAppendedMetatags: '<meta name="qux" content="quux">' }),
            function ($elem) {
                return $elem.attr('data-title', 'seo.metatagTitle').
                    attr('data-to-append', 'seo.globallyAppendedMetatags');
            }),
            metaTags = component.find('meta');

        expect(component.find('title').text()).toBe('foo');
        expect(metaTags.length).toBe(1);
        expect(component.find('meta').eq(0).attr('content')).toBe('quux');
    });

    it('appends robots meta tags if enableRobots is true', function () {
        var component = compile(addFixtureData($scope, { enableRobotsMetatags: true }),
            function ($elem) {
                return $elem.attr('data-title', 'seo.metatagTitle').
                    attr('data-description', 'seo.metatagDescription').
                    attr('data-keywords', 'seo.metatagKeywords').
                    attr('data-robots', 'seo.enableRobotsMetatags');
            }),
            metaTags = component.find('meta');

        expect(component.find('title').text()).toBe('foo');
        expect(metaTags.length).toBe(4);
        expect(component.find('meta').eq(2).attr('content')).toBe('index,follow');
        expect(component.find('meta').eq(3).attr('content')).toBe('INDEX,FOLLOW');
    });


    it('does not append robots meta tags if enableRobots is false', function () {
        var component = compile(addFixtureData($scope, { enableRobotsMetatags: false }),
            function ($elem) {
                return $elem.attr('data-title', 'seo.metatagTitle').
                    attr('data-description', 'seo.metatagDescription').
                    attr('data-keywords', 'seo.metatagKeywords').
                    attr('data-robots', 'seo.enableRobotsMetatags');
            }),
            metaTags = component.find('meta');

        expect(component.find('title').text()).toBe('foo');
        expect(metaTags.length).toBe(2);
        expect(component.find('meta').eq(2).attr('content')).not.toBe('index,follow');
        expect(component.find('meta').eq(3).attr('content')).not.toBe('INDEX,FOLLOW');
    });
});
