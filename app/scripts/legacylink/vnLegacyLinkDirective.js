'use strict';

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon:vnLegacyLink
 * @restrict AE
 *
 *
 * @description
 * The `vnLegacyLink` directive is used to link to URLs
 * which are not part of the Single Page Application.
 *
 * @usage
 * <a data-vn-legacy-link="/reviewnew.asp?productcode={{product.code}}">
 *     Write a Review
 * </a>
 *
 *
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnLegacyLink', [
		'$window',
		function ($window) {

			return {
				restrict: 'AE',
				link    : function (scope, element, attrs) {

					attrs.$observe('vnLegacyLink', function (newValue) {
						element.attr('href', newValue);
					});

					element.on('click', function (e) {
						e.preventDefault();
						$window.location.assign(this.href);
					});
				}
			};
		}
	]);
