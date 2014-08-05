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
			 * This is a private function used by the filter to parse images.
			 * If it doesn't find an image it returns an empty string.
			 * It uses the given option and size params to build and return a string with an image url in it If available.
			 */
			function parseImage(option, size) {
				var imagePath = '';

				if(imageCollections.length >= 0) {
					for(var i = imageCollections.length - 1; i >=0; i--) {
						var currentImageCollection = imageCollections[i];
						if(option === currentImageCollection.key) {
							imagePath = currentImageCollection.images[0][size];
							break;
						}
					}
				}

				return imagePath;
			}


			// Filter logic and gaurd code
			var imagePath = '';

			if (!imageCollections || imageCollections.length <= 0) {										// Guard for when not a valid image collection
//				throw new Error('vnProductImageFilter needs an image collection.');
				imagePath = '';
			} else if (arguments.length === 1) {										// When only imageCollections arg is passed, do default
				// do the default
				imagePath = parseImage('default', 'medium');
			} else if(arguments.length === 3) {										// Get non-default image url from one of imageCollections.
				// return theme default
				imagePath = parseImage(optionName, imageSize);
			} else {
				throw new Error('vnProductImageFilter was unable to process the arguments supplied.');
			}

			return imagePath;
		};
	});
