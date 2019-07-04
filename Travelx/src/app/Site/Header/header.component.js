var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, HostListener, Inject } from "@angular/core";
import { trigger, transition, animate, style } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { OrderComponent } from "@siteCommon/Components/Order/order.component";
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(window, dialog) {
        this.window = window;
        this.dialog = dialog;
        this.isMobileMenuVisible = false;
        this.isSticky = false;
    }
    HeaderComponent.prototype.onScroll = function () {
        var num = this.window.pageYOffset;
        if (num > 90) {
            this.isSticky = true;
        }
        else if (this.isSticky && num < 5) {
            this.isSticky = false;
        }
    };
    HeaderComponent.prototype.toggleMenu = function () {
        this.isMobileMenuVisible = !this.isMobileMenuVisible;
    };
    HeaderComponent.prototype.onClickOutsideMobileMenu = function () {
        this.isMobileMenuVisible = false;
    };
    HeaderComponent.prototype.openOrderPopup = function (button) {
        var dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    };
    __decorate([
        HostListener('window:scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], HeaderComponent.prototype, "onScroll", null);
    HeaderComponent = __decorate([
        Component({
            selector: "headerComponent",
            templateUrl: "header.component.html",
            styleUrls: ["header.component.css"],
            animations: [
                trigger('slideInOut', [
                    transition(':enter', [
                        style({ transform: 'translateY(-100%)' }),
                        animate('300ms ease-in', style({ transform: 'translateY(0%)' }))
                    ]),
                    transition(':leave', [
                        animate('300ms ease-in', style({ transform: 'translateY(-100%)' }))
                    ])
                ])
            ]
        }),
        __param(0, Inject('window')),
        __metadata("design:paramtypes", [Window,
            MatDialog])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map