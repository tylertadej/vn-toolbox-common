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
	.directive('vnFacetSearch', ['$rootScope', 'vnProductParams',
		function ($rootScope, vnProductParams) {
			'use strict';

			return {
				templateUrl: 'vn-faceted-search/vn-facet-search.html',
				restrict   : 'AE',
				scope      : {
					facets: '='
				},
				link       : function postLink(scope) {

					scope.$watch('facets', function (facets) {
						scope.facets = facets;
						// Default the facets to show
						angular.each(scope.facets, function(facet) {
							angular.extend(facet, {hide:false});
//							facet.hide = false;
						});
					});

					enquire.register('screen and (max-width:767px)', {

						setup: function() {
							scope.areFacetItemsVisible = true;
						},
						unmatch: function () {
							scope.areFacetItemsVisible = true;
						},
						// transitioning to mobile mode
						match  : function () {
							scope.areFacetItemsVisible = false;
						}
					});

					scope.toggleFacetItems = function(idx) {
						console.log('facet items: ', scope.facets);
						console.log('toggle facet item: for index: ', idx);
						if(scope.areFacetItemsVisible && scope.fasets[idx].show) {
							scope.fasets[idx].show = false;
							return;
						}
						scope.fasets[idx].show = true;
					};

					scope.selectProperty = function (facet) {
						return vnProductParams.isFacetSelected(facet.id);
					};

					scope.refineFacetSearch = function (facet) {

						// Adding / Removing facet to selectedFacets
						if (!vnProductParams.isFacetSelected(facet.id)) {
							vnProductParams.addFacet(facet.id);
						} else {
							vnProductParams.removeFacet(facet.id);
						}

						// Broadcast an update to whomever if any is subscribed.
						$rootScope.$broadcast('ProductSearch.facetsUpdated');
					};
				}
			};
		}]);
