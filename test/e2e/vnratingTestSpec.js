/*global beforeEach, describe, it, expect, browser, element, by */

describe('Volusion.Toolbox Ratings component', function () {

    'use strict';

    var ratingElem,
        newRating;

    browser.get('http://localhost:9000/');

    beforeEach(function () {
        newRating = 0;
        ratingElem = element.all(by.repeater('star in stars'));
    });

    it('should set rating to 1', function () {
        ratingElem.first().click();
        newRating = element.all(by.css('.filled')).count();
        expect(newRating).toBe(1);
    });

    it('should set rating to 5', function () {
        ratingElem.last().click();
        newRating = element.all(by.css('.filled')).count();
        expect(newRating).toBe(5);
    });

    it('should set rating to 4', function () {
        ratingElem.get(3).click(); // zero based index
        newRating = element.all(by.css('.filled')).count();
        expect(newRating).toBe(4);
    });

    // Playground for experiments
    xit('should select an element', function () {
        var ratings = element.all(by.repeater('star in stars'));
        var rating = element(by.css('[class="rating"]'));
        var rat = element.all(by.css('.filled'));

        element.all(by.repeater('star in stars')).then(function (items) {
            expect(items.length).toBe(5);
        });

        var webElem = rating.getWebElement();

        webElem.getOuterHtml().then(function (text) {
//            console.log('result: ', text);
        });

        expect(ratings.count()).toBe(5);
        expect(rat.count()).toBe(3);
        expect(rat.get(2).getText()).toBe('');

        ratings.each(function (element) {
            element.getText().then(function () {
//                console.log;
            });
        });

        element.all(by.repeater('star in stars')).each(function (element) {
            element.getText().then(function () {
//                console.log('more test');
            });
        });
    });
});
