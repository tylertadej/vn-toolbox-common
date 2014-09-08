/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnMetaTags
 * @restrict EA
 * @requires NotApplicableYet ported from Method Theme
 * @description
 *
 * #vnMetaTags Directive
 * Given the seo data from a product or category (Need-to-confirm), update these meta tags:
 * - title
 * - description
 * - keywords
 * - toAppend ?? Not sure what this is
 * - robots
 *
 * Dev Note, these were pulled directly from the elements method theme was watching.
 *
 * @usage
 <head data-vn-meta-tags data-title="seo.metaTagTitle"
 data-description="seo.metaTagDescription" data-keywords="seo.metaTagKeywords"
 data-robots="seo.enableRobotsMetatags" data-to-append="seo.globallyAppendedMetatags">

 */
angular.module('Volusion.toolboxCommon')
    .directive('vnMetaTags', function () {
        'use strict';

        return {
            restrict: 'EA',
            scope   : {
                title      : '=',
                description: '=',
                keywords   : '=',
                toAppend   : '=',
                robots     : '=',
				socialPageTitle : '=',
				socialPageUrl : '=',
				socialImageUrl : '='
            },
            link    : function (scope, elem) {

                var appendElement = function (elementToAppend) {
                    if (typeof elementToAppend !== 'undefined') {
                        elem.append(elementToAppend);
                    }
                };

                var setTitleTag = function (titleText) {
                    var titleTag = elem.find('title');
                    if (titleTag.length > 0) {
                        titleTag.remove();
                    }
                    if (titleText) {
                        elem.append(angular.element('<title/>').text(titleText));
                    }
                };

                var setMetaTag = function (metaTagName, metaTagContent, attributeName) {
                    var metaTag = elem.find('meta[' + attributeName + '="' + metaTagName + '"]');

                    if (metaTag.length > 0) {
                        metaTag.remove();
                    }
                    if (metaTagContent) {
                        elem.append(angular.element('<meta/>').attr(attributeName, metaTagName).
                            attr('content', metaTagContent));
                    }
                };

                var setDescription = function (description) {
                    setMetaTag('description', description, 'name');
                };

                var setKeywords = function (keywords) {
                    setMetaTag('keywords', keywords, 'name');
                };

				var setFacebookOpenGraphPageTitle = function (pageTitle) {
					setMetaTag('og:title', pageTitle, 'property');
				};

				var setFacebookOpenGraphPageUrl = function (pageUrl) {
					setMetaTag('og:url', pageUrl, 'property');
				};

				var setFacebookOpenGraphImageUrl = function (imageUrl) {
					setMetaTag('og:image', imageUrl, 'property');
				};

				scope.$watch('socialPageTitle', setFacebookOpenGraphPageTitle);
				scope.$watch('socialPageUrl', setFacebookOpenGraphPageUrl);
				scope.$watch('socialImageUrl', setFacebookOpenGraphImageUrl);
                scope.$watch('title', setTitleTag);
                scope.$watch('description', setDescription);
                scope.$watch('keywords', setKeywords);
                scope.$watch('toAppend', appendElement);
                scope.$watch('robots', function (newValue) {
                    if (typeof newValue !== 'undefined' &&
                        JSON.parse(newValue) === true) {
                        setMetaTag('robots', 'index,follow', 'name');
                        setMetaTag('GOOGLEBOT', 'INDEX,FOLLOW', 'name');
                    }
                });
            }
        };
    });
