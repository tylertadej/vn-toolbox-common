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

		scope.social = {
			pageTitle : 'product 1',
			pageUrl : 'http://store.com/product-1',
			imageUrl : 'http://store.com/images/product-1.jpg'
		};

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
        expect(component.find('title').text()).to.eq('foo');

        expect(component.find('meta[name="description"]').attr('content')).to.eq('bar');
        expect(component.find('meta[name="keywords"]').attr('content')).to.eq('baz');
    });

    it('updates the title and metatags when scope changes', inject(function ($compile) {
        var scope = addFixtureData($scope),
            component = $compile(angular.element('<div/>').
                attr('data-vn-meta-tags', '').
                attr('data-title', 'seo.metatagTitle').
                attr('data-description', 'seo.metatagDescription').
                attr('data-keywords', 'seo.metatagKeywords').
				attr('data-social-page-title', 'social.pageTitle').
				attr('data-social-page-url', 'social.pageUrl').
				attr('data-social-image-url', 'social.imageUrl'))(scope),
            metaTags;

        scope.$digest();

        metaTags = component.find('meta');

        expect(component.find('title').text()).to.eq('foo');
        expect(metaTags.length).to.eq(5);
        expect(component.find('meta[name="description"]').attr('content')).to.eq('bar');
        expect(component.find('meta[name="keywords"]').attr('content')).to.eq('baz');
        expect(component.find('meta[property="og:title"]').attr('content')).to.eq('product 1');
        expect(component.find('meta[property="og:url"]').attr('content')).to.eq('http://store.com/product-1');
        expect(component.find('meta[property="og:image"]').attr('content')).to.eq('http://store.com/images/product-1.jpg');

        scope.seo.metatagTitle = 'qux';
        scope.seo.metatagDescription = 'quux';
        scope.seo.metatagKeywords = 'garply';

        component = $compile(angular.element('<div/>').
            attr('data-vn-meta-tags', '').
            attr('data-title', 'seo.metatagTitle').
            attr('data-description', 'seo.metatagDescription').
            attr('data-keywords', 'seo.metatagKeywords'))(scope);

        scope.$digest();

        expect(component.find('title').text()).to.eq('qux');
        expect(component.find('meta[name="description"]').attr('content')).to.eq('quux');
        expect(component.find('meta[name="keywords"]').attr('content')).to.eq('garply');
    }));

    it('does not create title and metatags if nothing sent in', function () {
        var component = compile(addFixtureData($scope), function ($elem) {
                return $elem;
            }),
            metaTags = component.find('meta');

        expect(component.find('title').length).to.eq(0);
        expect(metaTags.length).to.eq(0);
    });

    it('appends meta tags sent in the toAppend property', function () {
        var component = compile(addFixtureData($scope, { globallyAppendedMetatags: '<meta name="qux" content="quux">' }),
            function ($elem) {
                return $elem.attr('data-title', 'seo.metatagTitle').
                    attr('data-to-append', 'seo.globallyAppendedMetatags');
            }),
            metaTags = component.find('meta');

        expect(component.find('title').text()).to.eq('foo');
        expect(metaTags.length).to.eq(1);
        expect(component.find('meta[name="qux"]').attr('content')).to.eq('quux');
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

        expect(component.find('title').text()).to.eq('foo');
        expect(metaTags.length).to.eq(4);
        expect(component.find('meta[name="robots"]').attr('content')).to.eq('index,follow');
        expect(component.find('meta[name="GOOGLEBOT"]').attr('content')).to.eq('INDEX,FOLLOW');
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

        expect(component.find('title').text()).to.eq('foo');
        expect(metaTags.length).to.eq(2);
        expect(component.find('meta[name="robots"]').attr('content')).not.to.eq('index,follow');
        expect(component.find('meta[name="GOOGLEBOT"]').attr('content')).not.to.eq('INDEX,FOLLOW');
    });
});
