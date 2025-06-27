"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductsAdminPageComponent = void 0;
var core_1 = require("@angular/core");
var product_table_component_1 = require("../../../products/components/product-table/product-table.component");
var products_service_1 = require("@products/services/products.service");
var rxjs_interop_1 = require("@angular/core/rxjs-interop");
var pagination_component_1 = require("../../../shared/components/pagination/pagination.component");
var pagination_service_1 = require("@shared/components/pagination/pagination.service");
var router_1 = require("@angular/router");
var ProductsAdminPageComponent = /** @class */ (function () {
    function ProductsAdminPageComponent() {
        var _this = this;
        this.productsService = core_1.inject(products_service_1.ProductsService);
        this.paginationService = core_1.inject(pagination_service_1.PaginationService);
        this.productsPerPage = core_1.signal(10);
        this.productsResource = rxjs_interop_1.rxResource({
            request: function () { return ({ page: _this.paginationService.currentPage() - 1,
                limit: _this.productsPerPage()
            }); },
            loader: function (_a) {
                var request = _a.request;
                return _this.productsService.getProducts({
                    offset: request.page * 9,
                    limit: request.limit
                });
            }
        });
    }
    ProductsAdminPageComponent = __decorate([
        core_1.Component({
            selector: 'app-products-admin-page',
            imports: [product_table_component_1.ProductTableComponent, pagination_component_1.PaginationComponent, router_1.RouterLink],
            templateUrl: './products-admin-page.component.html',
            styleUrls: ['./products-admin-page.component.css']
        })
    ], ProductsAdminPageComponent);
    return ProductsAdminPageComponent;
}());
exports.ProductsAdminPageComponent = ProductsAdminPageComponent;
