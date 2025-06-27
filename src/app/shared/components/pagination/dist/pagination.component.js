"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaginationComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent() {
        var _this = this;
        this.pages = core_1.input(0);
        this.currentPage = core_1.input(1);
        this.maxVisiblePages = core_1.input(7);
        this.showNavButtons = core_1.input(true);
        this.showPageInfo = core_1.input(true);
        this.activePage = core_1.linkedSignal(this.currentPage);
        // Compute visible pages with ellipsis logic
        this.getVisiblePages = core_1.computed(function () {
            var totalPages = _this.pages();
            var current = _this.activePage();
            var maxVisible = _this.maxVisiblePages();
            if (totalPages <= maxVisible) {
                return Array.from({ length: totalPages }, function (_, i) { return i + 1; });
            }
            var half = Math.floor(maxVisible / 2);
            var start = Math.max(1, current - half);
            var end = Math.min(totalPages, start + maxVisible - 1);
            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }
            return Array.from({ length: end - start + 1 }, function (_, i) { return start + i; });
        });
        // Check if we need ellipsis
        this.showStartEllipsis = core_1.computed(function () {
            return _this.getVisiblePages()[0] > 2;
        });
        this.showEndEllipsis = core_1.computed(function () {
            var visiblePages = _this.getVisiblePages();
            return visiblePages[visiblePages.length - 1] < _this.pages() - 1;
        });
        // Check if we need first/last page buttons
        this.showFirstPage = core_1.computed(function () {
            return _this.getVisiblePages()[0] > 1;
        });
        this.showLastPage = core_1.computed(function () {
            var visiblePages = _this.getVisiblePages();
            return visiblePages[visiblePages.length - 1] < _this.pages();
        });
    }
    PaginationComponent.prototype.setActivePage = function (page) {
        if (page >= 1 && page <= this.pages() && page !== this.activePage()) {
            this.activePage.set(page);
        }
    };
    PaginationComponent.prototype.goToPreviousPage = function () {
        this.setActivePage(this.activePage() - 1);
    };
    PaginationComponent.prototype.goToNextPage = function () {
        this.setActivePage(this.activePage() + 1);
    };
    PaginationComponent.prototype.isPreviousDisabled = function () {
        return this.activePage() === 1;
    };
    PaginationComponent.prototype.isNextDisabled = function () {
        return this.activePage() === this.pages();
    };
    PaginationComponent = __decorate([
        core_1.Component({
            selector: 'app-pagination',
            standalone: true,
            imports: [router_1.RouterLink, common_1.CommonModule],
            templateUrl: './pagination.component.html',
            styleUrls: ['./pagination.component.css']
        })
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
