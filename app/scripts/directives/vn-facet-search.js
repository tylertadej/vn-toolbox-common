/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnFacetSearch
 * @restrict EA
 * @requires $rootScope
 * @requires vnProductParams
 * @scope
 * @description
 * - docs needed for the directive scope functions available
 * - docs needed for the broadcast triggered so theme can listen for it
 * - docs needed for the html
 *
 * @usage
 * TODO: Add html and javascript here to demo it in docs.
 */
angular.module('Volusion.toolboxCommon')
	.directive('vnFacetSearch', ['$rootScope', '$window', 'vnProductParams',
		function ($rootScope, $window, vnProductParams) {

			'use strict';

			return {
				templateUrl: 'vn-faceted-search/vn-facet-search.html',
				restrict   : 'AE',
				scope      : {
					facets     : '=',
					queryProducts: '&'
				},
				link       : function postLink(scope) {

					// Manage the differences in behavior for mobile vs. deesktop
					enquire.register('screen and (max-width:767px)', {

						setup: function () {
							scope.defaultAccordianOpen = true;
						},

						unmatch: function () {
							scope.defaultAccordianOpen = true;
						},
						// transitioning to mobile mode
						match  : function () {
							scope.defaultAccordianOpen = false;
						}
					});

					scope.selectProperty = function (facet) {

						return vnProductParams.isFacetSelected(facet.id);

					};

					scope.refineFacetSearch = function (facet) {

						// Adding / Removing facet to selectedFacets
						if (!vnProductParams.isFacetSelected(facet.id)) {
							console.log(typeof facet.id);
							vnProductParams.addFacet(facet.id);
						} else {
							vnProductParams.removeFacet(facet.id);
						}
						scope.queryProducts();

					};

					scope.$watch('facets', function (facets) {
						scope.facets = facets;
					});
				}
			};
		}]);
