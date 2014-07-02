'use strict';

describe('Controller: VnProductOptionCtrl', function() {

	// load the controller's module
	beforeEach(module('Volusion.toolboxCommon'));

	var controller;
	var rootScope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		rootScope = $rootScope;
		controller = $controller;
	}));

	//describe('onOptionChanged', function() {

	//	it('stores selected item ID in the saveTo object', function() {
	//		var scope = createScope({
	//			optionItems: {
	//				foo: { id: 'foo' },
	//				bar: { id: 'bar' }
	//			},
	//			optionSelections: {
	//				template: {}
	//			}
	//		});
	//		var option = { id: 'option1' };
	//		scope.onOptionChanged(option, { id: 'foo' });
	//		expect(scope.saveTo[option.id]).to.eq('foo');
	//		scope.onOptionChanged(option, { id: 'bar' });
	//		expect(scope.saveTo[option.id]).to.eq('bar');
	//	});

	//	describe('VN_PRODUCT_SELECTED event', function() {

	//		var defaultProduct = {
	//			optionItems: {
	//				foo: { id: 'foo' },
	//				bar: { id: 'bar' }
	//			},
	//			optionSelections: {
	//				template: {}
	//			}
	//		};

	//		function onSelected(callback) {
	//			var stopListening = rootScope.$on('VN_PRODUCT_SELECTED', function(event, selection) {
	//				stopListening();
	//				callback(selection);
	//			});
	//		}

	//		it('emits a selection with product, option, item and isValid properties', function(done) {
	//			var scope = createScope(defaultProduct);
	//			onSelected(function(selection) {
	//				expect(selection).to.have.property('product');
	//				expect(selection).to.have.property('option');
	//				expect(selection).to.have.property('item');
	//				expect(selection).to.have.property('isValid');
	//				done();
	//			});
	//			scope.onOptionChanged({ id: null }, { id: 'foo' });
	//		});

	//		it('validates the selection only when all required options are selected', function(done) {
	//			var options = [
	//				{
	//					id: 'option1',
	//					isRequired: true,
	//					items: ['foo']
	//				},
	//				{
	//					id: 'option2',
	//					isRequired: true,
	//					items: ['foo']
	//				}
	//			];
	//			var scope = createScope(angular.extend(defaultProduct, {
	//				options: options
	//			}));
	//			onSelected(function(s1) {
	//				expect(s1.isValid).to.be.false;
	//				onSelected(function(s2) {
	//					expect(s2.isValid).to.be.true;
	//					done();
	//				});
	//				scope.onOptionChanged({ id: 'option2' }, { id: 'foo' });
	//			});
	//			scope.onOptionChanged({ id: 'option1' }, { id: 'foo' });
	//		});

	//		it('only builds the selection of options with isComputedInSelection: true', function(done) {
	//			var options = [
	//				{
	//					id: 'option1',
	//					isComputedInSelection: true,
	//					items: ['foo']
	//				},
	//				{
	//					id: 'option2',
	//					items: ['bar']
	//				},
	//				{
	//					id: 'option3',
	//					isComputedInSelection: true,
	//					items: ['baz']
	//				}
	//			];
	//			var scope = createScope(angular.extend(defaultProduct, {
	//				options: options,
	//				optionItems: {
	//					foo: { id: 'foo' },
	//					bar: { id: 'bar' },
	//					baz: { id: 'baz' }
	//				},
	//				optionSelections: {
	//					template: {
	//						value: null
	//					},
	//					'option1:foo': {
	//						value: 'foo'
	//					},
	//					'option1:foo|option3:baz': {
	//						value: 'foobaz'
	//					}
	//				}
	//			}));
	//			onSelected(function(s1) {
	//				expect(s1.value).to.eq('foo');
	//				onSelected(function(s2) {
	//					expect(s2.value).to.eq('foo');
	//					onSelected(function(s3) {
	//						expect(s3.value).to.eq('foobaz');
	//						done();
	//					});
	//					scope.onOptionChanged({ id: 'option3' }, { id: 'baz' });
	//				});
	//				scope.onOptionChanged({ id: 'option2' }, { id: 'bar' });
	//			});
	//			scope.onOptionChanged({ id: 'option1' }, { id: 'foo' });
	//		});

	//	});

	//});

	//describe('onCheckboxClicked', function() {

	//	var scope;
	//	var option;
	//	beforeEach(function() {
	//		scope = createScope();
	//		option = { id: 'option1' };
	//	});

	//	it('sets cart item option to an array of selected items', function() {
	//		scope.onCheckboxClicked(option, 'foo');
	//		expect(scope.saveTo[option.id]).to.deep.equal(['foo']);
	//		scope.onCheckboxClicked(option, 'bar');
	//		expect(scope.saveTo[option.id]).to.deep.equal(['foo', 'bar']);
	//	});

	//	it('deletes cart item from options array when unchecked', function() {
	//		scope.onCheckboxClicked(option, 'foo');
	//		scope.onCheckboxClicked(option, 'bar');
	//		expect(scope.saveTo[option.id]).to.deep.equal(['foo', 'bar']);
	//		scope.onCheckboxClicked(option, 'foo');
	//		expect(scope.saveTo[option.id]).to.deep.equal(['bar']);
	//	});

	//});

	//function createScope(product) {
	//	var scope = rootScope.$new();
	//	angular.extend(scope, {
	//		product: product || {},
	//		saveTo: {}
	//	});
	//	controller('ProductOptionCtrl', {
	//		$scope: scope
	//	});
	//	return scope;
	//}

});
