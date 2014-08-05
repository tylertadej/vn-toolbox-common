'use strict';

describe('Filter: vnProductImageFilter', function () {

	// load the filter's module
	beforeEach(module('Volusion.toolboxCommon'));

	// initialize a new instance of the filter before each test
	var vnProductImageFilter;
	beforeEach(inject(function ($filter) {
		vnProductImageFilter = $filter('vnProductImageFilter');
	}));

	xit('should return the input prefixed with "vnProductImageFilter filter:"', function () {
		var text = 'angularjs';
		expect(vnProductImageFilter(text)).toBe('vnProductImageFilter filter: ' + text);
	});

});
