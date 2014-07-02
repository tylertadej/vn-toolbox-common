'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: vn-block', function() {

	// load the directive's module
	beforeEach(module('Volusion.toolboxCommon'));

	var $rootScope,
		$compile,
		bem;

	// ReSharper disable InconsistentNaming
	beforeEach(inject(function(_$rootScope_, _$compile_, _bem_) {
		// ReSharper restore InconsistentNaming
		$rootScope = _$rootScope_;
		$compile = _$compile_;
		bem = _bem_;
	}));

	xit('adds a .block class when vn-block attribute is provided', function() {
		var $foo = bem.block('foo'),
			$block = $compile($foo)($rootScope.$new());

		expect($block).to.have.class('foo');
	});

	xit('adds multiple .block--modifier classes when vn-modifiers exist', function() {
		var $foo = bem.block('foo', 'bar baz');
		var $block = $compile($foo)($rootScope.$new());
		expect($block).to.have.class('foo');
		expect($block).to.have.class('foo--bar');
		expect($block).to.have.class('foo--baz');

		$foo.attr('data-vn-modifiers', '');
		$block = $compile($foo)($rootScope.$new());
		expect($block).to.have.class('foo');
		expect($block).not.to.have.class('foo--');
	});

	xit('parses handlebars expressions', function() {
		var $foo = bem.block('{{foo}}', '{{bar}} thud');
		var $scope = $rootScope.$new();
		$scope.foo = 'baz';
		$scope.bar = 'qux';
		var $block = $compile($foo)($scope);
		expect($block).to.have.class('baz');
		expect($block).to.have.class('baz--qux');
		expect($block).to.have.class('baz--thud');
	});

});
