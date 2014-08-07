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
						var item = option.items[i],
							haveThisOption = isThisOptionSelected(item);

						if (haveThisOption.length > 0) {
							if (filter(option)) {
								callback(option, item);
							}
							if (option.options && option.options.length > 0) {
								traverseSelectedOptions(option.options, filter, callback);
							}
							break;
						}
					}
				});
			}

			function getCurrentSelections () {
				var selections = [],
					filter = function (option) {
						return option.isComputedInSelection;
					};

				traverseSelectedOptions($scope.product.options, filter, function (option, item) {
					selections.push([
						option.key,
						item.key
					].join(':'));
				});

				return selections.join('|');
			}

			function buildSelection() {
				var selections = getCurrentSelections(),
					optionSelections = {},
					optionTemplateSelection = $scope.product.optionSelections.filter(function (selection) {
						return selection.key === 'template';
					})[0];

				optionSelections = $scope.product.optionSelections.filter(function (selection) {
					return selection.key === selections;
				})[0];

				return angular.extend({}, optionTemplateSelection, optionSelections);
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

			function buildAndBroadcast (option, item) {
				var buildSel = buildSelection(),
					currentSel = getCurrentSelections(),
					verifySel = verifyRequiredOptionsAreSelected($scope.product.options);

				$rootScope.$broadcast('VN_PRODUCT_SELECTED',
					angular.extend({}, {
						product: $scope.product,
						option : option,
						item   : item,
						isValid: verifySel
					}, buildSel),
					currentSel);
			}

			$scope.onOptionChanged = function (option, item) {

				$scope.currentSelectionText = item.text;

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
				buildAndBroadcast(option, item);
			};

			$scope.onCheckboxClicked = function(option, item) {
				var optionKey = option.key,
					haveThisOption = $scope.saveTo.filter(function (obj) {
						return obj.id === item.id;
					});

				if (0 === haveThisOption.length) {
					$scope.saveTo.push({ id: item.id, option: optionKey });
				} else {
					$scope.saveTo = $scope.saveTo.filter(function (obj) {
						return obj.id !== item.id;
					});
				}

				buildAndBroadcast(option, item);
			};
		}]);
