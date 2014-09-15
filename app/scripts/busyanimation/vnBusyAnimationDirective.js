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
			templateUrl: 'template/busy-animation.html',
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
	})
	.run(['$templateCache', function ($templateCache) {

		'use strict';

		$templateCache.put(
			'template/busy-animation.html',
			'<ng-transclude></ng-transclude>' +
			'<div class="{{ class }}" title="1" data-ng-if="show">' +
				'<svg version="1.1" id="loader-1" ' +
					'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
					'x="0px" y="0px" width="40px" height="40px" ' +
					'viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">' +

					'<path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">' +
						'<animateTransform ' +
							'attributeType="xml" ' +
							'attributeName="transform" ' +
							'type="rotate" ' +
							'from="0 25 25" ' +
							'to="360 25 25" ' +
							'dur=".6s" ' +
							'repeatCount="indefinite"/>' +
					'</path>' +
				'</svg>' +
			'</div>'
		);
	}]);
