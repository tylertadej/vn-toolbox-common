/**
 * @ngdoc constant
 * @name Volusion.toolboxCommon.vnResourceTypes
 * @description
 *
 * # vnResourceTypes
 * The vnResourceTypes constant is used to specify the resource type,
 * which would be passed in the HTTP headers. This is useful to identify
 * in the HTTP response interceptor which API call caused the error.
 *
 */

angular.module('Volusion.toolboxCommon')
    .constant('vnResourceTypes', {
        article: 'article',
        cart: 'cart',
        category: 'category',
        config: 'config',
        countries: 'countries',
        nav: 'nav',
        product: 'product',
        reviews: 'reviews',
        themesettings: 'themesettings'

    });
