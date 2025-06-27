"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ProductsService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var product_interface_1 = require("@products/interfaces/product.interface");
var rxjs_1 = require("rxjs");
var environment_1 = require("src/environments/environment");
var baseUrl = environment_1.environment.baseUrl;
var emptyProduct = {
    id: 'new',
    title: '',
    price: 0,
    description: '',
    slug: '',
    stock: 0,
    sizes: [],
    gender: product_interface_1.Gender.Men,
    tags: [],
    images: [],
    user: {}
};
var ProductsService = /** @class */ (function () {
    function ProductsService() {
        this.http = core_1.inject(http_1.HttpClient);
        this.productCache = new Map();
        this.productsCache = new Map();
    }
    ProductsService.prototype.getProducts = function (options) {
        var _a = options.limit, limit = _a === void 0 ? 18 : _a, _b = options.offset, offset = _b === void 0 ? 0 : _b, _c = options.gender, gender = _c === void 0 ? '' : _c;
        var key = limit + "-" + offset + "-" + gender; // 9-0-''
        if (this.productsCache.has(key)) {
            return rxjs_1.of(this.productsCache.get(key));
        }
        return this.http.get(baseUrl + "/products", {
            params: {
                limit: limit,
                offset: offset,
                gender: gender
            }
        }).pipe(rxjs_1.tap(function (resp) { return console.log(); }));
    };
    // Obtener el producto por id
    ProductsService.prototype.getProductByIdSlug = function (idSlug) {
        return this.http.get(baseUrl + "/products/" + idSlug);
    };
    ProductsService.prototype.getProductById = function (id) {
        var _this = this;
        if (id === 'new') {
            return rxjs_1.of(emptyProduct);
        }
        if (id === 'new') {
            return rxjs_1.of(emptyProduct);
        }
        if (this.productCache.has(id)) {
            return rxjs_1.of(this.productCache.get(id));
        }
        return this.http
            .get(baseUrl + "/products/" + id)
            .pipe(rxjs_1.tap(function (product) { return _this.productCache.set(id, product); }));
    };
    //metodo para actualizar un producto
    ProductsService.prototype.updateProduct = function (id, productLike, imageFileList) {
        var _this = this;
        var _a;
        var currentImages = (_a = productLike.images) !== null && _a !== void 0 ? _a : [];
        return this.uploadImages(imageFileList).pipe(rxjs_1.map(function (imageNames) { return (__assign(__assign({}, productLike), { images: __spreadArrays(currentImages, imageNames) })); }), rxjs_1.switchMap(function (updatedProduct) {
            return _this.http.patch(baseUrl + "/products/" + id, updatedProduct);
        }), rxjs_1.tap(function (product) { return _this.updateProductCache(product); }));
    };
    //   return this.http
    //     .patch<Product>(`${baseUrl}/products/${id}`, productLike)
    //     .pipe(tap((product) => this.updateProductCache(product)));
    // }
    ProductsService.prototype.updateProductCache = function (product) {
        var productId = product.id;
        this.productCache.set(productId, product);
        this.productsCache.forEach(function (productResponse) {
            productResponse.products = productResponse.products.map(function (currentProduct) {
                return currentProduct.id === productId ? product : currentProduct;
            });
        });
        console.log('Caché actualizado');
    };
    ProductsService.prototype.createProduct = function (productLike, imageFileList) {
        var _this = this;
        var _a;
        var currentImages = (_a = productLike.images) !== null && _a !== void 0 ? _a : [];
        return this.uploadImages(imageFileList).pipe(rxjs_1.map(function (imageNames) { return (__assign(__assign({}, productLike), { images: __spreadArrays(currentImages, imageNames) })); }), rxjs_1.switchMap(function (updatedProduct) {
            return _this.http.post(baseUrl + "/products", updatedProduct);
        }), rxjs_1.tap(function (product) {
            _this.productCache.set(product.id, product);
            _this.productsCache.clear(); // Limpiar caché de productos
        }));
    };
    //Tome un fileList(Objeto que tine una lista de Files) y lo suba
    // /api/files/product
    ProductsService.prototype.uploadImages = function (images) {
        var _this = this;
        if (!images)
            return rxjs_1.of([]);
        var uploadObservables = Array.from(images).map(function (imageFile) {
            return _this.uploadImage(imageFile);
        });
        return rxjs_1.forkJoin(uploadObservables).pipe(rxjs_1.tap(function (imageNames) { return console.log('Imágenes subidas:', imageNames); }));
    };
    ProductsService.prototype.uploadImage = function (imageFile) {
        var formData = new FormData();
        formData.append('file', imageFile);
        return this.http.post(baseUrl + "/files/product", formData)
            .pipe(rxjs_1.map(function (resp) { return resp.fileName; }) // Extraer el nombre del archivo de la respuesta
        );
    };
    ProductsService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], ProductsService);
    return ProductsService;
}());
exports.ProductsService = ProductsService;
