'use strict';

/**
 * @ngdoc filter
 * @name Volusion.toolboxCommon.filter:vnProductImageFilter
 * @param {String} optionName is the name of the image collection to parse for
 * @param {String} imageSize is the name of the image size to parse for
 * @function
 * @description
 * # vnProductImageFilter
 * Filter for product.imageCollections
 *
 * ## Default behavior
 * Given a product.imageCollections object, return the url of the medium size image
 *
 * - If callee wants default: $filter('vnProductImageFilter')(product.imageCollections);
 * - if callee want default,small: $filter('vnProductImageFilter')(product.imageCollections, 'default', 'small');
 * - If callee want option named fuzzyFoo: $filter('vnProductImageFilter')(product.imageCollections, 'fuzzyFoo', 'medium');
 * - if no match is found an empty string is returned so callee can handle it with the theme default.
 */
angular.module('Volusion.toolboxCommon')
	.filter('vnProductImageFilter', function () {
		return function (imageCollections, optionName, imageSize) {

			/**
			 * @ngdoc method
			 * @name parseImage
			 * @param {String} option is the option name to parse the imageCollections for. Example: 'default'
			 * @param {String} imageSize is the string representation of the size property in an image collection. Example: 'medium'.
			 * @methodOf Volusion.toolboxCommon.filter:vnProductImageFilter
			 * @returns {String} imagePath is the configured url for the image site needs to display
			 *
			 * @description
			 * Uses the given option and size params to return a string with an image url in it
			 */
			function parseImage(option, size) {
				var imagePath = '';

				if(imageCollections.length === 0) {
					imagePath = '/images/theme/tcp-no-image.jpg';
				} else {
					for(var i = imageCollections.length - 1; i >=0; i--) {
						var currentImageCollection = imageCollections[i];
						if(option === currentImageCollection.key) {
							imagePath =  'http:' + currentImageCollection.images[0][size];
						}
					}
				}

				return imagePath;
			}

			var imagePath = '';
			if (imageCollections.length <= 0) {
				throw new Error('vnPRoductImageFilter needs an image collection to work correctly.');
			} else if (!optionName && !imageSize) {
				// do the default
				imagePath = parseImage('default', 'medium');
			} else if(!optionName || !imageSize) {
				// return theme default
				return '';
			} else {
				// use option name and image size to parse the corrent url
				imagePath = parseImage(optionName, imageSize);
			}

			return imagePath;
		};
	});
