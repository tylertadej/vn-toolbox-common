/**
 * @ngdoc function
 * @name Volusion.toolboxCommon.controller:OptionsCtrl
 * @description
 * # Helper - OptionsCtrl
 * Controller of the Volusion.toolboxCommon
 */

angular.module('Volusion.toolboxCommon')
	.controller('OptionsCtrl', ['$rootScope','$scope',
		function($rootScope, $scope) {

			'use strict';

			function findOptionsAndOptionSKU(options) {
				var optionsToSKU = [];

				if (!options) {
					return optionsToSKU;
				}

				for (var i = 0; i < options.length; i++) {
					var option = options[i];

					if (option.isRequired && option.derivesToSKU) {
						optionsToSKU.push(option.label);
					}
				}

				return optionsToSKU;
			}

			// Initialize availability
			$scope.isItemAvailable = false;
			$scope.itemToken = $scope.option.key + ':' + $scope.item.key;

			var optionsAnsSKU = findOptionsAndOptionSKU($scope.product.options).length;

			if ($scope.product.optionSKUs.length > 0) {

				for (var idx = 0; idx < $scope.product.optionSKUs.length; idx++) {

					// find if there is more than one option to derive SKU
					// if there are more than one option - do not check self options in  optionSKUs (i.e 'color:blue')
					var takeOptionInConsideration = (optionsAnsSKU === 1 ||
						$scope.product.optionSKUs[idx].key !== $scope.itemToken);

					if (takeOptionInConsideration) {
						if ($scope.product.optionSKUs[idx].key.indexOf($scope.itemToken) > -1 &&
							$scope.product.optionSKUs[idx].quantityInStock > 0) {

							$scope.isItemAvailable = true;
							break;
						}
					}
				}
			} else {
				$scope.isItemAvailable = ($scope.product.availability.allowBackOrders ||
					$scope.product.availability.quantityInStock === null ||
					$scope.product.availability.quantityInStock > 0);
			}

			// Process item selected
			$scope.$on('VN_PRODUCT_SELECTED', function (event, selection, currentSelections) {

				var optionIdx = 0;
				for (var idxOpt = 0; idxOpt < $scope.product.options.length; idxOpt++) {
					if ($scope.product.options[idxOpt].key === $scope.option.key) {
						optionIdx = idxOpt;
						break;
					}
				}

				// Replace selected item in current selections to filter optionSelections
				// for currently selected item *************************************************************************
				var selections = currentSelections.split('|');
				selections[optionIdx] = $scope.itemToken;
				var tempSelections = selections.join('|');
				// *****************************************************************************************************

				for (var idx = 0; idx < $scope.product.optionSKUs.length; idx++) {

					if (tempSelections !== $scope.itemToken &&
						$scope.product.optionSKUs[idx].key.indexOf(tempSelections) > -1) {

						// TODO: What about the optionSelection's state?
						// According to Kevin at this moment we do not care ...
						$scope.isItemAvailable = ($scope.product.optionSKUs[idx].quantityInStock > 0);
					}
				}
			});
		}]);
