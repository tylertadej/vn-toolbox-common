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

			// Initialize availability
			$scope.isItemAvailable = false;
			$scope.itemToken = $scope.option.key + ':' + $scope.item.key;

			for (var idx = 0; idx < $scope.product.optionSKUs.length; idx++) {
				if ($scope.product.optionSKUs[idx].key !== $scope.itemToken &&
					$scope.product.optionSKUs[idx].key.indexOf($scope.itemToken) > -1 &&
					$scope.product.optionSKUs[idx].quantityInStock > 0) {

					$scope.isItemAvailable = true;
					break;
				}
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
