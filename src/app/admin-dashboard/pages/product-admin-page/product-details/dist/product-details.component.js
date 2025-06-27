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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ProductDetailsComponent = void 0;
var core_1 = require("@angular/core");
var carrusel_image_component_1 = require("../../../../products/components/carrusel-image/carrusel-image.component");
var forms_1 = require("@angular/forms");
var form_utils_1 = require("@utils/form-utils");
var form_error_label_component_1 = require("../../../../shared/components/form-error-label/form-error-label.component");
var products_service_1 = require("@products/services/products.service");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var ProductDetailsComponent = /** @class */ (function () {
    function ProductDetailsComponent() {
        var _this = this;
        this.product = core_1.input.required();
        this.productsService = core_1.inject(products_service_1.ProductsService);
        this.router = core_1.inject(router_1.Router);
        this.wasSaved = core_1.signal(false);
        this.imageFileList = undefined;
        this.tempImages = core_1.signal([]);
        this.imagesToCarrousel = core_1.computed(function () {
            var currentProductImages = __spreadArrays(_this.product().images, _this.tempImages());
            return currentProductImages;
        });
        this.fb = core_1.inject(forms_1.FormBuilder);
        this.productForm = this.fb.group({
            title: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            slug: [
                '',
                [forms_1.Validators.required, forms_1.Validators.pattern(form_utils_1.FormUtils.slugPattern)],
            ],
            price: [0, [forms_1.Validators.required, forms_1.Validators.min(0)]],
            stock: [0, [forms_1.Validators.required, forms_1.Validators.min(0)]],
            sizes: [['']],
            images: [[]],
            tags: [''],
            gender: [
                'men',
                [forms_1.Validators.required, forms_1.Validators.pattern(/men|women|kid|unisex/)],
            ]
        });
        this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
        // this.productForm.reset(this.product() as any);
        this.setFormValue(this.product());
    };
    ProductDetailsComponent.prototype.setFormValue = function (formLike) {
        var _a;
        this.productForm.reset(this.product());
        this.productForm.patchValue({ tags: (_a = formLike.tags) === null || _a === void 0 ? void 0 : _a.join(',') });
        // this.productForm.patchValue(formLike as any);
    };
    //método para guardar los toques de cada boton de las tallas
    ProductDetailsComponent.prototype.onSizeClicked = function (size) {
        var _a;
        var currentSizes = (_a = this.productForm.value.sizes) !== null && _a !== void 0 ? _a : [];
        if (currentSizes.includes(size)) {
            currentSizes.splice(currentSizes.indexOf(size), 1);
        }
        else {
            currentSizes.push(size);
        }
        this.productForm.patchValue({ sizes: currentSizes });
    };
    //Método para guardar el Formulario
    ProductDetailsComponent.prototype.onSubmit = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var isValid, formValue, productLike, product;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        isValid = this.productForm.valid;
                        this.productForm.markAllAsTouched();
                        if (!isValid)
                            return [2 /*return*/];
                        formValue = this.productForm.value;
                        productLike = __assign(__assign({}, formValue), { tags: (_b = (_a = formValue.tags) === null || _a === void 0 ? void 0 : _a.toLowerCase().split(',').map(function (tag) { return tag.trim(); })) !== null && _b !== void 0 ? _b : [] });
                        if (!(this.product().id === 'new')) return [3 /*break*/, 2];
                        return [4 /*yield*/, rxjs_1.firstValueFrom(this.productsService.createProduct(productLike, this.imageFileList))];
                    case 1:
                        product = _c.sent();
                        this.router.navigate(['/admin/products', product.id]);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, rxjs_1.firstValueFrom(this.productsService.updateProduct(this.product().id, productLike, this.imageFileList))];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        this.wasSaved.set(true);
                        setTimeout(function () {
                            _this.wasSaved.set(false);
                        }, 3000);
                        return [2 /*return*/];
                }
            });
        });
    };
    //Manejo de Imagenes
    ProductDetailsComponent.prototype.onFilesChanged = function (event) {
        var filesList = event.target.files;
        this.imageFileList = filesList !== null && filesList !== void 0 ? filesList : undefined;
        //this.tempImages.set([]);
        var imageUrls = Array.from(filesList !== null && filesList !== void 0 ? filesList : []).map(function (file) { return URL.createObjectURL(file); });
        this.tempImages.set(imageUrls);
    };
    ProductDetailsComponent = __decorate([
        core_1.Component({
            selector: 'product-details',
            imports: [carrusel_image_component_1.CarruselImageComponent, forms_1.ReactiveFormsModule, form_error_label_component_1.FormErrorLabelComponent],
            templateUrl: './product-details.component.html',
            styleUrls: ['./product-details.component.css']
        })
    ], ProductDetailsComponent);
    return ProductDetailsComponent;
}());
exports.ProductDetailsComponent = ProductDetailsComponent;
