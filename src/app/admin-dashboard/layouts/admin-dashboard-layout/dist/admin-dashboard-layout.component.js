"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminDashboardLayoutComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("@auth/services/auth.service");
var AdminDashboardLayoutComponent = /** @class */ (function () {
    function AdminDashboardLayoutComponent() {
        var _this = this;
        this.authService = core_1.inject(auth_service_1.AuthService);
        this.user = core_1.computed(function () { return _this.authService.user(); });
    }
    AdminDashboardLayoutComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-dashboard-layout',
            imports: [router_1.RouterOutlet, router_1.RouterLink, router_1.RouterLinkActive],
            templateUrl: './admin-dashboard-layout.component.html',
            styleUrls: ['./admin-dashboard-layout.component.css']
        })
    ], AdminDashboardLayoutComponent);
    return AdminDashboardLayoutComponent;
}());
exports.AdminDashboardLayoutComponent = AdminDashboardLayoutComponent;
