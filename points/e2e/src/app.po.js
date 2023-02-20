"use strict";
exports.__esModule = true;
exports.AppPage = void 0;
var protractor_1 = require("protractor");
var AppPage = /** @class */ (function () {
    function AppPage() {
    }
    AppPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    AppPage.prototype.getPageTitle = function () {
        return (0, protractor_1.element)(protractor_1.by.css('ion-title')).getText();
    };
    return AppPage;
}());
exports.AppPage = AppPage;
