"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarruselImageComponent = void 0;
var core_1 = require("@angular/core");
var product_image_pipe_1 = require("../../pipes/product-image.pipe");
var CarruselImageComponent = /** @class */ (function () {
    function CarruselImageComponent() {
        this.images = [];
        this.carouselTitle = '';
        this.autoPlay = false;
        this.autoPlayInterval = 4000;
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
    }
    CarruselImageComponent.prototype.ngOnInit = function () {
        if (this.autoPlay && this.images.length > 1) {
            this.startAutoPlay();
        }
    };
    CarruselImageComponent.prototype.ngOnDestroy = function () {
        this.stopAutoPlay();
    };
    CarruselImageComponent.prototype.startAutoPlay = function () {
        var _this = this;
        this.autoPlayTimer = setInterval(function () {
            if (!_this.isTransitioning) {
                _this.nextImage();
            }
        }, this.autoPlayInterval);
    };
    CarruselImageComponent.prototype.stopAutoPlay = function () {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = undefined;
        }
    };
    CarruselImageComponent.prototype.nextImage = function () {
        var _this = this;
        if (this.isTransitioning || this.images.length <= 1)
            return;
        this.isTransitioning = true;
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        // Reset transition lock after animation completes
        setTimeout(function () {
            _this.isTransitioning = false;
        }, 600); // Match CSS transition duration
    };
    CarruselImageComponent.prototype.prevImage = function () {
        var _this = this;
        if (this.isTransitioning || this.images.length <= 1)
            return;
        this.isTransitioning = true;
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        setTimeout(function () {
            _this.isTransitioning = false;
        }, 600);
    };
    CarruselImageComponent.prototype.goToImage = function (index) {
        var _this = this;
        if (this.isTransitioning || index === this.currentIndex)
            return;
        this.isTransitioning = true;
        this.currentIndex = index;
        setTimeout(function () {
            _this.isTransitioning = false;
        }, 600);
    };
    CarruselImageComponent.prototype.getCardClass = function (index) {
        if (this.images.length === 0)
            return '';
        var totalImages = this.images.length;
        var position = (index - this.currentIndex + totalImages) % totalImages;
        switch (totalImages) {
            case 1:
                return 'center';
            case 2:
                switch (position) {
                    case 0: return 'center';
                    case 1: return 'right-1';
                    default: return 'hidden';
                }
            case 3:
                switch (position) {
                    case 0: return 'center';
                    case 1: return 'right-1';
                    case 2: return 'left-1';
                    default: return 'hidden';
                }
            default:
                // Handling for 4+ images
                switch (position) {
                    case 0: return 'center';
                    case 1: return 'right-1';
                    case 2: return 'right-2';
                    case totalImages - 1: return 'left-1';
                    case totalImages - 2: return 'left-2';
                    default: return 'hidden';
                }
        }
    };
    // Keyboard navigation
    CarruselImageComponent.prototype.handleKeyboardEvent = function (event) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this.prevImage();
        }
        else if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.nextImage();
        }
    };
    // Touch events for mobile
    CarruselImageComponent.prototype.onTouchStart = function (event) {
        this.touchStartX = event.touches[0].clientX;
        this.stopAutoPlay(); // Stop auto-play on user interaction
    };
    CarruselImageComponent.prototype.onTouchEnd = function (event) {
        this.touchEndX = event.changedTouches[0].clientX;
        this.handleSwipe();
        if (this.autoPlay) {
            this.startAutoPlay(); // Restart auto-play after interaction
        }
    };
    CarruselImageComponent.prototype.handleSwipe = function () {
        var swipeThreshold = 50;
        var diff = this.touchStartX - this.touchEndX;
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextImage(); // Swipe left - next image
            }
            else {
                this.prevImage(); // Swipe right - previous image
            }
        }
    };
    CarruselImageComponent.prototype.onMouseEnter = function () {
        this.stopAutoPlay();
    };
    CarruselImageComponent.prototype.onMouseLeave = function () {
        if (this.autoPlay && this.images.length > 1) {
            this.startAutoPlay();
        }
    };
    __decorate([
        core_1.Input()
    ], CarruselImageComponent.prototype, "images");
    __decorate([
        core_1.Input()
    ], CarruselImageComponent.prototype, "carouselTitle");
    __decorate([
        core_1.Input()
    ], CarruselImageComponent.prototype, "autoPlay");
    __decorate([
        core_1.Input()
    ], CarruselImageComponent.prototype, "autoPlayInterval");
    __decorate([
        core_1.HostListener('document:keydown', ['$event'])
    ], CarruselImageComponent.prototype, "handleKeyboardEvent");
    CarruselImageComponent = __decorate([
        core_1.Component({
            selector: 'carrusel-image',
            imports: [product_image_pipe_1.productImagePipe],
            templateUrl: './carrusel-image.component.html',
            styleUrls: ['./carrusel-image.component.css']
        })
    ], CarruselImageComponent);
    return CarruselImageComponent;
}());
exports.CarruselImageComponent = CarruselImageComponent;
