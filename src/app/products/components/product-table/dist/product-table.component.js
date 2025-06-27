"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductTableComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var product_image_pipe_1 = require("@products/pipes/product-image.pipe");
var ProductTableComponent = /** @class */ (function () {
    function ProductTableComponent() {
        this.products = core_1.input.required();
    }
    ProductTableComponent = __decorate([
        core_1.Component({
            selector: 'product-table',
            imports: [product_image_pipe_1.productImagePipe, router_1.RouterLink, common_1.CurrencyPipe],
            templateUrl: './product-table.component.html',
            styleUrls: ['./product-table.component.css']
        })
    ], ProductTableComponent);
    return ProductTableComponent;
}());
exports.ProductTableComponent = ProductTableComponent;
