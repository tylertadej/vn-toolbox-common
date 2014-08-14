describe('Filter: vnProductImageFilter', function () {

	'use strict';

	// load the filter's module
	beforeEach(module('Volusion.toolboxCommon'));

	// initialize a new instance of the filter before each test
	var vnProductImageFilter;
	beforeEach(inject(function ($filter) {
		vnProductImageFilter = $filter('vnProductImageFilter');
	}));

	it('should return a blank string when no match is found:"', function () {
		expect(vnProductImageFilter({})).to.equal('');
	});

	it('should return empty string when not called with an imageCollection', function() {
		expect(function() { vnProductImageFilter(); }).to.throw('vnProductImageFilter was unable to process the arguments supplied.');
	});

});
