/**
 * @ngdoc function
 * @name Volusion.toolboxCommon.controller:VnProductOptionCtrl
 * @description
 * # VnProductOptionCtrl
 * Controller of the Volusion.toolboxCommon
 */

angular.module('Volusion.toolboxCommon')
	.controller('VnProductOptionCtrl', ['$rootScope','$scope',
		function($rootScope, $scope) {

			'use strict';

			function preserveSubOptions() {
				traverseSelectedOptions($scope.product.options, null, function (option, item) {
					option.selected = item.key;
				});
			}

			function traverseSelectedOptions(options, filter, callback) {
				if (!options) {
					return;
				}

				filter = filter || function () {
					return true;
				};

				function isThisOptionSelected (item) {
					return $scope.saveTo.filter(function (obj) {
						return obj.id === item.id;
					});
				}

				angular.forEach(options, function (option) {
					var itemKeys = option.items;
					if (!itemKeys) {
						return;
					}
					for (var i = 0, len = itemKeys.length; i < len; i++) {
						var itemKey = itemKeys[i],
							item = $scope.product.optionItems[itemKey],
							haveThisOption = isThisOptionSelected(item);

						if (haveThisOption.length > 0) {
							if (filter(option)) {
								callback(option, item);
							}
							if (option.options) {
								traverseSelectedOptions(option.options, filter, callback);
							}
							break;
						}
					}
				});
			}

			function buildSelection() {
				var selections = [],
					optionSelections = $scope.product.optionSelections,
					filter = function (option) {
						return option.isComputedInSelection;
					};

				traverseSelectedOptions($scope.product.options, filter, function (option, item) {
					selections.push([
						option.key,
						item.key
					].join(':'));
				});

				return angular.extend({}, optionSelections.template, optionSelections[selections.join('|')]);
			}

			function verifyRequiredOptionsAreSelected(options) {
				if (!options) {
					return true;
				}

				for (var i = 0, len = options.length; i < len; i++) {
					var option = options[i];
					if (option.isRequired && !option.hasOwnProperty('selected')) {
						return false;
					}
					if (option.options.length >0 && verifyRequiredOptionsAreSelected(option.options) === false) {
						return false;
					}
				}

				return true;
			}

			$scope.onOptionChanged = function (option, item) {

				var optionKey = option.key,
					haveThisOption = $scope.saveTo.filter(function (obj) {
						return obj.id === item.id;
					}),
					haveAnotherFromThisOption = $scope.saveTo.filter(function (obj) {
						return obj.option === optionKey;
					});

				if (0 !== haveAnotherFromThisOption.length && 0 === haveThisOption.length) {
					$scope.saveTo = $scope.saveTo.filter(function (obj) {
						return obj.option !== optionKey;
					});
				}

				if (0 === haveThisOption.length) {
					$scope.saveTo.push({ id: item.id, option: optionKey });
				}

				preserveSubOptions();

				$rootScope.$broadcast('VN_PRODUCT_SELECTED', angular.extend({}, {
					product: $scope.product,
					option : option,
					item   : item,
					isValid: verifyRequiredOptionsAreSelected($scope.product.options)
				}, buildSelection()));
			};

			$scope.onCheckboxClicked = function(option, itemKey) {
				var saveTo = $scope.saveTo;
				var items = saveTo[option.key] = saveTo[option.key] || [];
				var idx = items.indexOf(itemKey);
				if (idx > -1) {
					items.splice(idx, 1);
				} else {
					items.push(itemKey);
				}
				if (!items.length) {
					delete saveTo[option.key];
				}
			};
		}]);
