// ReSharper disable WrongExpressionStatement
describe('Directive: vn-element', function () {

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
	beforeEach(inject(function (_$rootScope_, _$compile_) {
		// ReSharper restore InconsistentNaming
		$rootScope = _$rootScope_;
		$compile = _$compile_;
	}));

	it('supports .block__element scenario', function () {
		var bar = createElement({ 'vn-element': 'bar' }),				// bem.element('bar'),
			foo = createElement({ 'vn-block': 'foo' }).append(bar),		// bem.block('foo').append(bar),
			scope = $rootScope.$new(),
			block = $compile(foo)(scope),
			element;

		expect(block.attr('class')).toContain('foo');
		element = $(block).children().first();
		expect(element.attr('class')).toContain('foo__bar');

		bar.attr('data-vn-element', '');
		block = $compile(foo)(scope);

		expect(block.attr('class')).toContain('foo');

//		element = $(block).children().first();
//		expect(element.attr('class')).not.toContain('foo__');
	});

	it('parses handlebars expressions', function () {
		var bar = createElement({ 'vn-element': '{{bar}}' }, '{{qux}}'),		// bem.element('{{bar}}', '{{qux}}');
			foo = createElement({ 'vn-block': 'foo' }).append(bar),				// bem.block('foo').append(bar),
			scope = $rootScope.$new(),
			block,
			element;

		scope.bar = 'baz';
		scope.qux = 'thud';

		block = $compile(foo)(scope);

		expect($(block)).toHaveClass('foo');

		element = $(block).children().first();
		expect($(element)).toHaveClass('foo__baz');
		expect($(element)).toHaveClass('foo__baz--thud');
	});

	it('supports .block__element--modifier scenario', function () {
		var bar = createElement({ 'vn-element': 'bar' }, 'baz'),
			foo = createElement({ 'vn-block': 'foo' }).append(bar),		// bem.block('foo').append(bem.element('bar', 'baz'));
			block = $compile(foo)($rootScope.$new()),
			element;

		expect(block).toHaveClass('foo');

		element = $(block).children().first();
		expect(element).toHaveClass('foo__bar');
		expect(element).toHaveClass('foo__bar--baz');
	});

	it('supports .block--modifier__element scenario', function () {
		var baz = createElement({ 'vn-element': 'baz' }),
			foo = createElement({ 'vn-block': 'foo' }, 'bar').append(baz),		// bem.block('foo', 'bar').append(bem.element('baz'));
			block = $compile(foo)($rootScope.$new()),
			element;

		expect($(block)).toHaveClass('foo');
		expect($(block)).toHaveClass('foo--bar');

		element = $(block).children().first();
		expect(element).toHaveClass('foo__baz');
		expect(element).toHaveClass('foo--bar__baz');
	});

	it('supports .block--modifier__element--modifier scenarios', function () {
		var baz = createElement({ 'vn-element': 'FOO' }, 'BAR BAZ'),
			foo = createElement({ 'vn-block': 'foo' }, 'bar baz').append(baz),		// bem.block('foo', 'bar baz').append(bem.element('FOO', 'BAR BAZ'));
			block = $compile(foo)($rootScope.$new()),
			element;

		expect($(block)).toHaveClass('foo');
		expect($(block)).toHaveClass('foo--bar');
		expect($(block)).toHaveClass('foo--baz');

		element = $(block).children().first();
		expect(element).toHaveClass('foo__FOO');
		expect(element).toHaveClass('foo--bar__FOO');
		expect(element).toHaveClass('foo--baz__FOO');
		expect(element).toHaveClass('foo--bar__FOO--BAR');
		expect(element).toHaveClass('foo--baz__FOO--BAZ');
	});

	it('adds trimmed classes only', function () {
		var baz = createElement({ 'vn-element': '  FOO  ' }, '  BAR  BAZ  '),
			foo = createElement({ 'vn-block': '  foo  ' }, '  bar  baz  ').append(baz),		// bem.block('  foo  ', '  bar  baz  ').append(bem.element('  FOO  ', '  BAR  BAZ  ')),
			block = $compile(foo)($rootScope.$new()),
			element;

		expect($(block)).toHaveClass('foo');
		expect($(block)).toHaveClass('foo--bar');
		expect($(block)).toHaveClass('foo--baz');

		element = $(block).children().first();
		expect(element).toHaveClass('foo__FOO');
		expect(element).toHaveClass('foo--bar__FOO');
		expect(element).toHaveClass('foo--baz__FOO');
		expect(element).toHaveClass('foo--bar__FOO--BAR');
		expect(element).toHaveClass('foo--baz__FOO--BAZ');
	});
});
