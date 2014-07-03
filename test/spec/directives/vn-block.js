
// ReSharper disable WrongExpressionStatement
describe('Directive: vn-block', function() {

	'use strict';

	function createElement(dataAttrs, modifiers) {
		dataAttrs = dataAttrs || {};
		dataAttrs['vn-modifiers'] = modifiers || '';

		var elem = angular.element('<div/>');

		Object.keys(dataAttrs).forEach(function (key) {
			elem.attr('data-' + key, dataAttrs[key]);
		});

		return elem;
	}

	// load the directive's module
	beforeEach(module('Volusion.toolboxCommon'));

	var $rootScope,
		$compile;

	// ReSharper disable InconsistentNaming
	beforeEach(inject(function(_$rootScope_, _$compile_) {
		// ReSharper restore InconsistentNaming
		$rootScope = _$rootScope_;
		$compile = _$compile_;
	}));

	it('adds a .block class when vn-block attribute is provided', function() {
		var foo = createElement({ 'vn-block': 'foo' }),		// bem.block('foo'),
			block = $compile(foo)($rootScope.$new());

		expect($(block)).toHaveClass('foo');
	});

	it('adds multiple .block--modifier classes when vn-modifiers exist', function() {
		var foo = createElement({ 'vn-block': 'foo' }, 'bar baz'),		// bem.block('foo', 'bar baz');
			scope = $rootScope.$new(),
			block = $compile(foo)(scope);

		expect($(block)).toHaveClass('foo');
		expect($(block)).toHaveClass('foo--bar');
		expect($(block)).toHaveClass('foo--baz');

		foo.attr('data-vn-modifiers', '');
		block = $compile(foo)(scope);

		expect($(block)).toHaveClass('foo');
		expect($(block)).not.toHaveClass('foo--');
	});

	it('parses handlebars expressions', function() {
		var foo = createElement({ 'vn-block': '{{foo}}' }, '{{bar}} thud'),		// bem.block('{{foo}}', '{{bar}} thud');
			scope = $rootScope.$new(),
			block;

		scope.foo = 'baz';
		scope.bar = 'qux';

		block = $compile(foo)(scope);

		expect($(block)).toHaveClass('baz');
		expect($(block)).toHaveClass('baz--qux');
		expect($(block)).toHaveClass('baz--thud');
	});

});
