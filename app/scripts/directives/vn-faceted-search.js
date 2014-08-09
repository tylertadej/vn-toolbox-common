/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnFacetedSearch
 * @restrict EA
 * @requires vnProductParams
 * @scope
 * @description
 * - Used on pages that have a list of products and need to filter
 * or narrow the list with 'things'
 * - Some things are returned from the /products api endpoint:
 *     - category object
 *     - facet object
 * - Other things need to be build into the product query:
 *     - min & max price
 *     - sorting strategy
 *
 * ## Notes:
 * - The parent controller for the directive must implement a queryProducts() function
 * - The Function must implement its get products routine with the vnParamsObject
 *
 * @usage
 * TODO: Add html and javascript here to demo it in docs.
 */
angular.module('Volusion.toolboxCommon')
	.directive('vnFacetedSearch', ['$window', '$location', 'vnProductParams',
		function ($window, $location, vnProductParams) {

			'use strict';

			return {
				templateUrl: 'vn-faceted-search/vn-faceted-search.html',
				restrict   : 'EA',
				link       : function postLink(scope, element) {

					var window = angular.element($window);
					window.bind('click', function(evt){
						console.log(element, evt.target);
//						if (evt.target === element[0]){
//							console.log('directive click detection.', evt);
////							scope.directiveToggler = false;
////							scope.$apply();
//
//						} else {
//							console.log('not directive click detection.', evt);
////							scope.directiveToggler = true;
////							scope.$apply();
//						}
					});

					element.bind('click', function (evt) {
						console.log('facet click here yo', evt);
					});

					scope.showCategorySearch = false;
					scope.showFacetSearch = true;
					scope.showApplyButton = false;

					/* Control for the sort directive UI */
					// Only be visible on search pages
					var location = $location.url(),
						matcher;
					matcher = /^\/search/;
					scope.onSearchPage = matcher.test(location);

					scope.$watch('categoryList', function (categoryList) {
						if (categoryList) {
							scope.showCategorySearch = true;
						}
					});

					scope.$watch('facets', function (facets) {
						if (facets) {
							scope.showFacetSearch = true;
						}
					});

					scope.$watch(
						function() {
							return vnProductParams.getSort();
						},
						function(strategy) {
							scope.currentSort = strategy;
						}
					);

					enquire.register('screen and (max-width:767px)', {

						setup  : function () {
							scope.showApplyButton = false;
							scope.mobileDisplay = true;
							scope.showMobileSearch = false;
							scope.isMobileAndVisible = false;
							scope.isMobileAndHidden = true;
							scope.categoryAccordiansOpen = true;
							scope.priceAccordiansOpen = true;
							scope.sortAccordianIsOpen = true;
						},
						unmatch: function () {
							scope.showApplyButton = false;
							scope.mobileDisplay = true; // default cats and facets to open
							scope.showMobileSearch = false;
							scope.isMobileAndVisible = false;
							scope.isMobileAndHidden = true;
							scope.categoryAccordiansOpen = true;
							scope.priceAccordiansOpen = true;
							scope.sortAccordianIsOpen = true;
						},
						// transitioning to mobile mode
						match  : function () {
							scope.showApplyButton = true;
							scope.mobileDisplay = false; // default cats and facets default to closed
							scope.showMobileSearch = true;
							scope.isMobileAndVisible = false;
							scope.isMobileAndHidden = true;
							scope.categoryAccordiansOpen = false;
							scope.priceAccordiansOpen = false;
							scope.sortAccordianIsOpen = false;
						}
					});
				}
			};
		}]);

