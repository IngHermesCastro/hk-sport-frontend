"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.productImagePipe = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var baseUrl = environment_1.environment.baseUrl;
var productImagePipe = /** @class */ (function () {
    function productImagePipe() {
    }
    productImagePipe.prototype.transform = function (value) {
        if (value === null || value === undefined) {
            return './assets/images/no-image.jpg';
        }
        if (typeof value === 'string' && value.startsWith('blob:')) {
            return value;
        }
        if (typeof value === 'string') {
            return baseUrl + "/files/product/" + value;
        }
        var image = value.at(0);
        if (!image) {
            return './assets/images/no-image.jpg';
        }
        return baseUrl + "/files/product/" + image;
    };
    productImagePipe = __decorate([
        core_1.Pipe({
            name: 'productImage'
        })
    ], productImagePipe);
    return productImagePipe;
}());
exports.productImagePipe = productImagePipe;
