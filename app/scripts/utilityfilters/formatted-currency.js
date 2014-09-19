/**
 * @ngdoc filter
 * @name Volusion.toolboxCommon.filter:vnFormatedCurrency
 * @function
 * @description
 * # formated currency
 * Filter to format currency value to
 * [CURRENCY_SYMBOL] [CURRENCY_WHOLE]<span class="th-price--cents">[CURRENCY_FRACTION]</span>
 *
 * * @usage
 * <div ng-bind-html={{ someCurrencyValue | vnFormattedCurrency }}></div>
 */

angular.module('Volusion.toolboxCommon')
	.filter('vnFormattedCurrency', ['$filter', '$locale', function ($filter, $locale) {

		'use strict';

		return function (input, currencySymbol) {

			if (input === undefined || input === null) {
				return '';
			}

			var value = $filter('currency')(input, currencySymbol),
				price = value.split($locale.NUMBER_FORMATS.DECIMAL_SEP);

			if (price[1].indexOf('00') > -1) {
				return price[0] + price[1].substring(2);	// append any extra symbols which appear after fraction
															// i.e. closing ")" for negative price in US formatting
			}

			return price[0] + '<span class="th-price--cents">' + price[1] + '</span>';
		};
	}]);

