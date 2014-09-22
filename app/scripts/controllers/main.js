
angular.module('Volusion.toolboxCommon')
	.controller('MainCtrl', ['$scope', '$translate', 'vnApi',
		function ($scope, $translate) {

			'use strict';

			$scope.toggleLang = function () {
				if ('en' === $translate.use()) {
					$translate.use('es');
				} else {
					$translate.use($translate.preferredLanguage());
				}
			};

			// Mock category list
			$scope.categoryList = [
				{'id':1477,'name':'Home Decor','slug':'home-decor','url':'/c/home-decor','bannerImgUrl':'//cdn3.volusion.com/glvus.qafjh/v/vspfiles/photos/categories/1477.jpg?1409664332','description':null,'showProductCollection':true,'showSubCategories':true,
					'subCategories':[{'id':1516,'name':'Furniture','slug':'furniture','url':'/c/furniture','description':null,'subCategories':[]},
						{'id':1517,'name':'Home Accessories','slug':'home-accessories','url':'/c/home-accessories','description':null,'subCategories':[]}]},
				{'id':1513,'name':'Beauty','slug':'beauty','url':'/c/beauty','description':null,'showProductCollection':true,'showSubCategories':true,
					'subCategories':[{'id':1553,'name':'Bath and Body','slug':'bath-and-body','url':'/c/bath-and-body','description':null,'subCategories':[]},
						{'id':1554,'name':'Hair Care','slug':'hair-care','url':'/c/hair-care','description':null,'subCategories':[]}]},
				{'id':1514,'name':'Gourmet Food','slug':'gourmet-food','url':'/c/gourmet-food','bannerImgUrl':'//cdn3.volusion.com/glvus.qafjh/v/vspfiles/photos/categories/1514.jpg','description':'Let your taste buds indulge in a delicacy of flavors like never before. Rich chocolates for any occasion. Fresh fruit, organic and sourced locally. Natural flavors that bring a delicate balance of fruit flavors to the palate.<br /><br /><b>Taste the rainbow!</b><br />','showProductCollection':true,'showSubCategories':true,
					'subCategories':[{'id':1632,'name':'Specialty Items','slug':'specialty-items','url':'/c/specialty-items','description':null,'subCategories':[]},
						{'id':1673,'name':'Sweets','slug':'sweets','url':'/c/sweets','description':null,'subCategories':[]}]},
				{'id':1814,'name':'Apparel','slug':'apparel','url':'/c/apparel','description':'Let your taste buds indulge in a delicacy of flavors like never before. Rich chocolates for any occasion. Fresh fruit, organic and sourced locally. Natural flavors that bring a delicate balance of fruit flavors to the palate.<br /><br /><b>Taste the rainbow!</b>','showProductCollection':true,'showSubCategories':true,
					'subCategories':[{'id':1815,'name':'Women','slug':'women','url':'/c/women','description':null,'subCategories':[]},
						{'id':1816,'name':'Men','slug':'men','url':'/c/men','description':null,'subCategories':[]}]},
				{'id':1819,'name':'Stuff','slug':'stuff','url':'http://www.volusion.com/','description':null,'showProductCollection':true,'showSubCategories':true,
					'subCategories':[{'id':1851,'name':'Sub Test','slug':null,'url':null,'description':'<span style=\'font-family: Arial, Helvetica, sans-serif; text-align: right;\'>Category Description</span>','subCategories':[]},
						{'id':1852,'name':'Sub Test','slug':null,'url':null,'description':'<span style=\'font-family: Arial, Helvetica, sans-serif; text-align: right;\'>Category Description</span>','subCategories':[]}]}
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
