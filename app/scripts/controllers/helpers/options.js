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
			$scope.itemToken = $scope.option.id + ':' + $scope.item.id;

			$scope.$on('VN_PRODUCT_SELECTED', function (event, selection) {

				for (var key in selection.product.optionSelections) {
					if (selection.product.optionSelections.hasOwnProperty(key)) {

						var selectionToken = selection.option.id + ':' + selection.option.selected;

						if (selectionToken !== $scope.itemToken &&
							key.indexOf(selectionToken) > -1 &&
							key.indexOf($scope.itemToken) > -1) {

							$scope.isItemAvailable = ($scope.product.optionSelections[key].available > 0);  // TODO: What about the state?
						}
					}
				}
			});

		}]);
