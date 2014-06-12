/*global beforeEach, describe, it, expect, browser, element, by */

describe('Volusion.Toolbox Link component', function () {

    'use strict';

    var links;

    browser.get('http://localhost:9000/');

    beforeEach(function () {
        links = element.all(by.css('a.vn-link'));
    });

    it('should 3 demo links', function () {
        expect(links.count()).toBe(3);
    });

    it('should follow the link', function () {
        var link = links.get(0), // select a anchor w/o target as Protractor does not work with multiple tabs
            href = '',
            appWindow = browser.getWindowHandle(),
            newWindowHandle;

        link.getAttribute('href').then(function (loc) {
            href = loc;
        });

        link.click().then(function () {

            browser.getAllWindowHandles().then(function (handles) {
                newWindowHandle = handles[1];
                browser.switchTo().window(newWindowHandle).then(function () {
                    expect(browser.driver.getCurrentUrl()).toBe(href);

                    // In most cases Protractor should switch back to the application window upon closing the new window,
                    // but it is better to not assume.
                    browser.driver.close().then(function () {
                        browser.switchTo().window(appWindow);
                    });
                });
            });

        });
    });
});
