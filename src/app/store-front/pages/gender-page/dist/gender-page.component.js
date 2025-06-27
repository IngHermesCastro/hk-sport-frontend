"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GenderPageComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_interop_1 = require("@angular/core/rxjs-interop");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var product_card_component_1 = require("../../../products/components/product-card/product-card.component");
var products_service_1 = require("@products/services/products.service");
var pagination_component_1 = require("../../../shared/components/pagination/pagination.component");
var pagination_service_1 = require("@shared/components/pagination/pagination.service");
var GenderPageComponent = /** @class */ (function () {
    function GenderPageComponent() {
        var _this = this;
        //Este fragmento hace que se filtren para las demas paginas
        this.route = core_1.inject(router_1.ActivatedRoute);
        this.gender = rxjs_interop_1.toSignal(this.route.params.pipe(rxjs_1.map(function (_a) {
            var gender = _a.gender;
            return gender;
        })));
        //Aqui finaliza. Hacia arriba
        this.productsService = core_1.inject(products_service_1.ProductsService);
        this.paginationService = core_1.inject(pagination_service_1.PaginationService);
        this.productsPerPage = 9;
        this.productsResource = rxjs_interop_1.rxResource({
            request: function () { return ({
                gender: _this.gender(),
                page: _this.paginationService.currentPage() - 1,
                limit: _this.productsPerPage
            }); },
            loader: function (_a) {
                var request = _a.request;
                return _this.productsService.getProducts({
                    gender: request.gender,
                    offset: request.page * _this.productsPerPage,
                    limit: _this.productsPerPage
                });
            }
        });
    }
    GenderPageComponent = __decorate([
        core_1.Component({
            selector: 'app-gender-page',
            imports: [product_card_component_1.ProductCardComponent, pagination_component_1.PaginationComponent],
            templateUrl: './gender-page.component.html'
        })
    ], GenderPageComponent);
    return GenderPageComponent;
}());
exports.GenderPageComponent = GenderPageComponent;
