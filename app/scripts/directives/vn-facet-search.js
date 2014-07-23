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
					facets: '='
				},
				link       : function postLink(scope) {

					function mobalizeFacetList(fList) {

						angular.forEach(fList, function(facet) {
							facet.show = false;
						});

					}

					function desktopizeFacetList(fList) {

						angular.forEach(fList, function(facet) {
							facet.show = true;
						});
					}

					// Manage the differences in behavior for mobile vs. deesktop
					enquire.register('screen and (max-width:767px)', {

						setup: function() {
							scope.isDesktopFacet = true;
							scope.isMobileMode = false;
							console.log('window width setup: ', $window.innerWidth);
						},

						unmatch: function () {
							desktopizeFacetList(scope.facets);
							scope.isDesktopFacet = true;
							scope.isMobileMode = false;
						},
						// transitioning to mobile mode
						match  : function () {
							mobalizeFacetList(scope.facets);
							scope.isDesktopFacet = false;
							scope.isMobileMode = true;
						}
					});

					// Handle the hide/show of a facet item's properties.
					scope.toggleFacetItems = function(idx) {
						console.log('facet item: ', scope.facets[idx]);
						if(scope.facets[idx].show) {
							scope.facets[idx].show = false;
							return;
						}
						scope.facets[idx].show = true;
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

					scope.isMobileMode = false; // default to desktop
//					function isMobileMode() {
//						return scope.isMobileMode;
//					}

					scope.$watch('facets', function (facets) {
						scope.facets = facets;
						// Default the facets to show

						// will need a more complicated routine here for checking if is selected
//						var isDesktopFacet = isMobileMode();
						angular.forEach(scope.facets, function (facet) {
							var displayDefault = { show: false };
							angular.extend(facet, displayDefault);
						});

						// Need this to pre process responses and page load items
						if ($window.innerWidth < 767) {
							mobalizeFacetList(scope.facets);
						} else {
							desktopizeFacetList(scope.facets);
						}
					});
				}
			};
		}]);
