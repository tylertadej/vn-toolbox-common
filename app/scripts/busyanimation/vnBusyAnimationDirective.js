/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnBusyAnimation
 * @restrict A
 * @requires
 * @scope
 * @description
 *
 * Adds spinning icon to the element
 *
 * @usage
 <button class="btn btn-primary btn-lg btn-block"
	 busy-animation
	 busy-animation-show="{{ buttonWait }}"
	 busy-animation-class="btn__icon--loader">

	 <span data-ng-if="!buttonWait">Click Me!</span>

 </button>
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnBusyAnimation', function () {

		'use strict';

		return {
			templateUrl: 'busyanimation/vnBusyAnimation.tpl.html',
			transclude : true,
			restrict: 'A',
			link    : function postLink(scope, element, attrs) {
				scope.show = false;
				scope.class = attrs.vnBusyAnimationClass;

				attrs.$observe('vnBusyAnimationShow', function (value) {
					scope.show = (value === 'true');
				});
			}
		};
	});
