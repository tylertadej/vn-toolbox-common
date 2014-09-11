angular.module('Volusion.toolboxCommon')
	.filter('reverse', function() {

		'use strict';

		return function(items) {
			return (items === undefined) ? null : items.slice().reverse();
		};
	});
