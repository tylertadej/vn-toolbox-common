angular.module('Volusion.toolboxCommon')
	.filter('seoFriendly', function seoFriendly() {

		'use strict';

		return function (input) {
			var words = input.match(/[0-9a-z]+/gi);
			return words ? words.join('-') : '';
		};
	});
