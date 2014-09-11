'use strict';

// ReSharper disable WrongExpressionStatement
describe('Filter: vnLegacyLinkify', function() {

	// load the filter's module
	beforeEach(module('Volusion.toolboxCommon'));

	// initialize a new instance of the filter before each test
	var legacyLinkify;
	beforeEach(inject(function($filter) {
		legacyLinkify = $filter('vnLegacyLinkify');
	}));

	it('adds target="_self" to all links without a target', function() {
		expect(legacyLinkify('<a></a><a></a>')).toEqual('<a target="_self"></a><a target="_self"></a>');
	});

	it('preserves link targets if they already exists', function() {
		expect(legacyLinkify('<a target="foo"></a>')).toEqual('<a target="foo"></a>');
	});

});

