'use strict';

// ReSharper disable WrongExpressionStatement
describe('Filter: vnCacheBustFilter', function() {
	beforeEach(module('Volusion.toolboxCommon'));

	var vnCacheBustFilter, cacheBustingToken;

	cacheBustingToken = 'qux';
	/*jshint camelcase: false */
	beforeEach(inject(function (_vnCacheBustFilter_, vnTokenGenerator) {
        vnCacheBustFilter = _vnCacheBustFilter_;
		sinon.stub(vnTokenGenerator, 'getCacheBustingToken', function() {
			return cacheBustingToken;
		});
	}));
	/*jshint camelcase: true */

	it('appends cache busting token as a query string', function() {
		expect(vnCacheBustFilter('foo')).to.eq('foo?_=qux');
	});


	it('appends cache busting token to existing query string params', function() {
		expect(vnCacheBustFilter('foo?bar=baz')).to.eq('foo?bar=baz&_=qux');
	});


	it('does not append cache busting token to an empty string', function() {
		expect(vnCacheBustFilter('')).to.be.empty; // jshint ignore:line
	});

	it('does not append cache busting token to undefined value', function() {
		expect(vnCacheBustFilter()).to.be.undefined; // jshint ignore:line
	});

});
