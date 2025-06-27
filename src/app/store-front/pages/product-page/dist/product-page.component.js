"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductPageComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_interop_1 = require("@angular/core/rxjs-interop");
var router_1 = require("@angular/router");
var products_service_1 = require("@products/services/products.service");
var carrusel_image_component_1 = require("../../../products/components/carrusel-image/carrusel-image.component");
var common_1 = require("@angular/common");
var ProductPageComponent = /** @class */ (function () {
    function ProductPageComponent() {
        var _this = this;
        //Producto que se va a mostrar en la pagina usando rxResource
        this.activateRouter = core_1.inject(router_1.ActivatedRoute);
        this.productService = core_1.inject(products_service_1.ProductsService);
        this.productIdSlug = this.activateRouter.snapshot.params['idSlug'];
        this.productResource = rxjs_interop_1.rxResource({
            request: function () { return ({ idSlug: _this.productIdSlug }); },
            loader: function (_a) {
                var request = _a.request;
                return _this.productService.getProductByIdSlug(request.idSlug);
            }
        });
        //rxResource
        //   @if (productResource.hasValue() ) {
        // <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
        //   <!-- imagenes -->
        //    <product-carousel
        //    [images] = "productResource.value().images"
        //    ></product-carousel>
        //   <div>
        //     <h2 class="text-2xl font-bold">
        //       {{ productResource.value().title}}
        //     </h2>
        //     <div class="divider"></div>
        //     <p>
        //       {{ productResource.value().description}}
        //     </p>
        //   </div>
        // </div>
        // }
    }
    ProductPageComponent = __decorate([
        core_1.Component({
            selector: 'app-product-page',
            imports: [router_1.RouterLink, carrusel_image_component_1.CarruselImageComponent, common_1.DecimalPipe],
            // imports: [ProductCarouselComponent],
            templateUrl: './product-page.component.html',
            styleUrls: ['./product-page.component.css']
        })
    ], ProductPageComponent);
    return ProductPageComponent;
}());
exports.ProductPageComponent = ProductPageComponent;
