'use strict';

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnScrollToAnchor
 * @restrict A
 * @scope
 *
 *
 * @description
 * Directive to automatically scroll to the `hash` location in
 * the page.
 *
 * @usage
 *
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnScrollToAnchor', ['$location', '$anchorScroll',
		function ($location, $anchorScroll) {

			return {
				restrict: 'AC',
				compile : function () {

					return function (scope, element, attr) {
						element.bind('click', function (event) {
							event.preventDefault();
							$location.hash(attr.vnScrollToAnchor);
							$anchorScroll();
						});
					};
				}
			};
		}]);
