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
import { transition, trigger, query, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { OrderComponent } from "@siteCommon/Components/Order/order.component";
var ContentComponent = /** @class */ (function () {
    function ContentComponent(window, dialog) {
        this.window = window;
        this.dialog = dialog;
        this.isScrollToTopVisible = false;
        this.isSticky = false;
    }
    ContentComponent.prototype.onActivate = function () {
        this.fastScroll();
    };
    ContentComponent.prototype.scrolltoTop = function () {
        this.smoothScroll();
    };
    ContentComponent.prototype.onScroll = function () {
        this.setSideMenuFixed();
        this.setScrollToTopVisible();
    };
    ContentComponent.prototype.openOrderPopup = function (button) {
        var dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    };
    ContentComponent.prototype.setScrollToTopVisible = function () {
        this.isScrollToTopVisible = this.window.pageYOffset > window.innerHeight;
    };
    ContentComponent.prototype.setSideMenuFixed = function () {
        var num = this.window.pageYOffset;
        if (num > 90) {
            this.isSticky = true;
        }
        else if (this.isSticky && num < 5) {
            this.isSticky = false;
        }
    };
    ContentComponent.prototype.fastScroll = function () {
        this.window.scroll(0, 0);
    };
    ContentComponent.prototype.smoothScroll = function () {
        try {
            this.window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        }
        catch (e) {
            this.fastScroll();
        }
    };
    __decorate([
        HostListener('window:scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ContentComponent.prototype, "onScroll", null);
    ContentComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: "contentComponent",
            templateUrl: "content.component.html",
            styleUrls: ["content.component.css"],
            animations: [
                trigger('routerAnimation', [
                    transition('* => *', [
                        query(':enter', [style({ opacity: 0 })], { optional: true }),
                        query(':leave', [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))], { optional: true }),
                        query(':enter', [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))], { optional: true })
                    ])
                ])
            ]
        }),
        __param(0, Inject('window')),
        __metadata("design:paramtypes", [Window,
            MatDialog])
    ], ContentComponent);
    return ContentComponent;
}());
export { ContentComponent };
//# sourceMappingURL=content.component.js.map