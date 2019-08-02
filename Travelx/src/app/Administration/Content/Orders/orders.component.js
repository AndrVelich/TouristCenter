var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { MatDialog } from '@angular/material';
import { OrderService } from "@administrationCommon/Services/order.service";
import { PageOptions } from "@common/Services/pager.service";
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";
import { PagerComponent } from "@administrationCommon/Components/Pager/pager.component";
var OrdersComponent = /** @class */ (function () {
    function OrdersComponent(dialog, orderService) {
        this.dialog = dialog;
        this.orderService = orderService;
        this.orderCollection = new Array();
        this.pageOptions = new PageOptions(0, 20, 10);
    }
    OrdersComponent.prototype.ngOnInit = function () {
    };
    OrdersComponent.prototype.markAsProcessed = function (order) {
        var _this = this;
        this.dialog.open(ConfirmationPopupComponent, {
            data: 'Вы уверены, что хототе пометить заявку <b>' + order.orderId + '</b> как обработанную?'
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                _this.markAsProcessedConfirm(order);
            }
        });
    };
    OrdersComponent.prototype.markAsProcessedConfirm = function (order) {
        var _this = this;
        order.isNew = false;
        this.orderService.saveOrder(order)
            .subscribe(function () {
            _this.getOrdersPage(_this.pageOptions);
        }, function (error) { return _this.errorMessage = error; });
    };
    OrdersComponent.prototype.openDeleteConfirmation = function (orderId) {
        var _this = this;
        this.dialog.open(ConfirmationPopupComponent, {
            data: 'Вы уверены, что хототе удалить заявку <b>' + orderId + '</b>?'
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                _this.orderService.deleteOrder(orderId)
                    .subscribe(function () { return _this.getOrdersPage(_this.pageOptions); });
            }
        });
    };
    OrdersComponent.prototype.getOrdersPage = function (pageOptions) {
        var _this = this;
        this.pageOptions = pageOptions;
        this.orderService.getOrdersPage(pageOptions.skip, pageOptions.take)
            .subscribe(function (data) {
            _this.orderCollection = data.collection;
            _this.pagerComponent.updatePager(data.count);
        });
    };
    __decorate([
        ViewChild(PagerComponent, { static: false }),
        __metadata("design:type", PagerComponent)
    ], OrdersComponent.prototype, "pagerComponent", void 0);
    OrdersComponent = __decorate([
        Component({
            selector: "orders",
            templateUrl: "orders.component.html",
            styleUrls: ["orders.component.css"]
        }),
        __metadata("design:paramtypes", [MatDialog,
            OrderService])
    ], OrdersComponent);
    return OrdersComponent;
}());
export { OrdersComponent };
//# sourceMappingURL=orders.component.js.map