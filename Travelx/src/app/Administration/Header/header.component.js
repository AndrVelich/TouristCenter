var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { trigger, transition, animate, style } from '@angular/animations';
import { interval } from 'rxjs';
import { MatDialog } from '@angular/material';
import { OrderService } from "@administrationCommon/Services/order.service";
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(dialog, orderService) {
        this.dialog = dialog;
        this.orderService = orderService;
        this.isMobileMenuVisible = false;
        this.isAnyNewOrders = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkIsAnyNewOrders(this);
        this.timer = interval(60000);
        this.timer.subscribe(function () { return _this.checkIsAnyNewOrders(_this); });
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.timer.unsubscribe();
    };
    HeaderComponent.prototype.checkIsAnyNewOrders = function (context) {
        context.orderService.isAnyNewOrders()
            .subscribe(function (data) {
            context.isAnyNewOrders = data;
        });
    };
    HeaderComponent.prototype.toggleMenu = function () {
        this.isMobileMenuVisible = !this.isMobileMenuVisible;
    };
    HeaderComponent.prototype.onClickOutsideMobileMenu = function () {
        this.isMobileMenuVisible = false;
    };
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
        __metadata("design:paramtypes", [MatDialog,
            OrderService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map