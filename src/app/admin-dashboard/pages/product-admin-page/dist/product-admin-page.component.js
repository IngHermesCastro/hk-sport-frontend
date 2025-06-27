"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductAdminPageComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_interop_1 = require("@angular/core/rxjs-interop");
var router_1 = require("@angular/router");
var products_service_1 = require("@products/services/products.service");
var rxjs_1 = require("rxjs");
var product_details_component_1 = require("./product-details/product-details.component");
var ProductAdminPageComponent = /** @class */ (function () {
    function ProductAdminPageComponent() {
        var _this = this;
        this.activatedRoute = core_1.inject(router_1.ActivatedRoute);
        this.router = core_1.inject(router_1.Router);
        this.productService = core_1.inject(products_service_1.ProductsService);
        this.productId = rxjs_interop_1.toSignal(this.activatedRoute.params.pipe(rxjs_1.map(function (params) { return params['id']; })));
        this.productResource = rxjs_interop_1.rxResource({
            request: function () { return ({ id: _this.productId() }); },
            loader: function (_a) {
                var request = _a.request;
                return _this.productService.getProductById(request.id);
            }
        });
        this.redirectEffect = core_1.effect(function () {
            if (_this.productResource.error()) {
                _this.router.navigate(['/admin/products']);
            }
        });
    }
    ProductAdminPageComponent = __decorate([
        core_1.Component({
            selector: 'app-product-admin-page',
            imports: [product_details_component_1.ProductDetailsComponent],
            templateUrl: './product-admin-page.component.html'
        })
    ], ProductAdminPageComponent);
    return ProductAdminPageComponent;
}());
exports.ProductAdminPageComponent = ProductAdminPageComponent;
