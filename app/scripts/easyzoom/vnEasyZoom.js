'use strict';

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnEasyZoom
 * @restrict A
 * @scope
 *
 *
 * @description
 * Directive to show the zoomed in image when hovering
 * over an image. It wraps the easyzoom.js library
 * (http://i-like-robots.github.io/EasyZoom/)
 *
 * @usage
 * <img easy-zoom
 *     ng-src="product.image.medium"
 *     ez-zoom-src="product.image.large"
 *     ez-adjacent="isInDesktopMode"
 *     ez-overlay="!isInDesktopMode"
 *     alt="{{product.name}}">
 *
 *
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnEasyZoom', function() {


		var imageHash = {};

		function swapImages(zoomApi) {
			if (imageHash.standardSrc && imageHash.zoomSrc) {
				zoomApi.swap(imageHash.standardSrc, imageHash.zoomSrc);
				imageHash = {};
			}
		}

		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'easyzoom/vnEasyZoom.tpl.html',
			scope: {
				ngSrc: '=',
				ezAdjacent: '=',
				ezOverlay: '=',
				ezZoomSrc: '=',
				alt: '@'
			},
			link: function(scope, element) {
				var easyzoom = element.easyZoom(),
					api = easyzoom.data('easyZoom');

				scope.$watch('ngSrc', function(newValue) {
					if (newValue === undefined) {
						return;
					}

					imageHash.standardSrc = newValue;
					swapImages(api);
				});

				scope.$watch('ezZoomSrc', function(newValue) {
					if (newValue === undefined) {
						return;
					}

					imageHash.zoomSrc = newValue;
					swapImages(api);
				});

				scope.$on('$destroy', function() {
					api.teardown();
				});
			}
		};
	});
