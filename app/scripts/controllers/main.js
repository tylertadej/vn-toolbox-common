
angular.module('Volusion.toolboxCommon')
	.controller('MainCtrl', ['$scope', '$translate', 'vnApi',
		function ($scope, $translate, vnApi) {

			'use strict';

//            console.log(vnApi.Category().get( {slug: 'men'} ));
//            console.log(vnApi.Category().query());

//            console.log(vnApi.Product().query());
//            var prodParams = {
//                categoryIds  : 1477,
//                search       : '',
//                facets       : '',
//                minPrice     : '',
//                maxPrice     : '',
//                accessoriesOf: '',
//                sort         : '',
//                pageNumber   : '',
//                pageSize     : ''
//            };
//            console.log(vnApi.Product().get(prodParams));

//            console.log('navs', vnApi.Nav().get({navId: 1}));

            console.log(vnApi.Configuration().get());

			$scope.toggleLang = function () {
				if ('en' === $translate.use()) {
					$translate.use('es');
				} else {
					$translate.use($translate.preferredLanguage());
				}
			};

			// Mock category list
			$scope.categoryList = [
				{name            : 'Apparel',
					subCategories: [
						{id: 123, name: 'Women'},
						{id: 234, name: 'Men'}
					]},
				{name            : 'Home decor',
					subCategories: [
						{id: 123, name: 'Furniture'},
						{id: 234, name: 'Home Accessories'}
					]},
				{name            : 'Beauty',
					subCategories: [
						{id: 123, name: 'Bath and Body'},
						{id: 234, name: 'Hair Care'}
					]},
				{name            : 'Gourmet food',
					subCategories: [
						{id: 123, name: 'Speciality Items'},
						{id: 234, name: 'Sweets'}
					]}
			];

			// Mock image list
			$scope.imageList = [
				{src: 'http://lorempixel.com/450/300/people/0', alt: 'Random people image'},
				{src: 'http://lorempixel.com/450/300/people/1', alt: 'Random people image'},
				{src: 'http://lorempixel.com/450/300/people/2', alt: 'Random people image'},
				{src: 'http://lorempixel.com/450/300/people/3', alt: 'Random people image'}
			];

			// Mock rating
			$scope.rating = '3';

		}]);
