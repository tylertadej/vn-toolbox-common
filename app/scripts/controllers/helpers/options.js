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

			$scope.isItemAvailable = true;
			$scope.itemToken = $scope.option.key + ':' + $scope.item.key;

			$scope.$on('VN_PRODUCT_SELECTED', function (event, selection, currentSelections) {

				var selections = currentSelections.split('|');

				for (var idxSel = 0; idxSel < selections.length; idxSel++) {
					console.log(selections[idxSel]);
				}

				for (var idx = 0; idx < selection.product.optionSelections.length; idx++) {
					if (selection.key !== $scope.itemToken &&
						$scope.product.optionSelections[idx].key.indexOf(selection.key) > -1 &&
						$scope.product.optionSelections[idx].key.indexOf($scope.itemToken) > -1) {

						// TODO: What about the optionSelection's state?
						// According to Kevin at this moment we do not care ...
						$scope.isItemAvailable = ($scope.product.optionSelections[idx].available > 0);
					}
				}

			});

		}]);
