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
import { MatDialog } from '@angular/material';
import { TourTypeService } from "@common/Services/tourType.service";
import { OrderService } from "@administrationCommon/Services/order.service";
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";
var OrdersComponent = /** @class */ (function () {
    function OrdersComponent(dialog, tourTypeService, orderService) {
        this.dialog = dialog;
        this.tourTypeService = tourTypeService;
        this.orderService = orderService;
        this.take = 20;
        this.currentPage = 1;
        this.ordersCount = 0;
        this.orderCollection = new Array();
    }
    OrdersComponent.prototype.ngOnInit = function () {
        this.getOrdersPage();
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
            _this.getOrdersPage();
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
                    .subscribe(function () { return _this.getOrdersPage(); });
            }
        });
    };
    OrdersComponent.prototype.getOrdersPage = function () {
        var _this = this;
        var skip = (this.currentPage - 1) * this.take;
        this.orderService.getOrdersPage(skip, this.take)
            .subscribe(function (data) {
            _this.orderCollection = data.orderCollection;
            _this.ordersCount = data.ordersCount;
            _this.pager = _this.GetPager(_this.ordersCount, _this.orderCollection, _this.take);
        });
    };
    OrdersComponent.prototype.setPage = function (page) {
        if (page > 0 || page <= this.pager.totalPages) {
            this.currentPage = page;
            this.getOrdersPage();
        }
    };
    OrdersComponent.prototype.GetPager = function (totalItems, currentPage, pageSize) {
        var pager = new Pager();
        pager.currentPage = currentPage;
        pager.pageSize = pageSize;
        pager.totalPages = Math.ceil(totalItems / pager.pageSize);
        if (pager.totalPages <= pageSize) {
            pager.startPage = 1;
            pager.endPage = pager.totalPages;
        }
        else {
            if (pager.currentPage <= 6) {
                pager.startPage = 1;
                pager.endPage = 10;
            }
            else if (pager.currentPage + 4 >= pager.totalPages) {
                pager.startPage = pager.totalPages - 9;
                pager.endPage = pager.totalPages;
            }
            else {
                pager.startPage = pager.currentPage - 5;
                pager.endPage = pager.currentPage + 4;
            }
        }
        // calculate start and end item indexes
        pager.startIndex = (pager.currentPage - 1) * pager.pageSize;
        pager.endIndex = Math.min(pager.startIndex + pager.pageSize - 1, totalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        pager.pages = new Array(pager.endPage - pager.startPage + 1).fill(0).map(function (x, i) { return i + 1; });
        // return object with all pager properties required by the view
        return pager;
    };
    OrdersComponent = __decorate([
        Component({
            
            selector: "orders",
            templateUrl: "orders.component.html",
            styleUrls: ["orders.component.css"]
        }),
        __metadata("design:paramtypes", [MatDialog,
            TourTypeService,
            OrderService])
    ], OrdersComponent);
    return OrdersComponent;
}());
export { OrdersComponent };
var Pager = /** @class */ (function () {
    function Pager() {
    }
    return Pager;
}());
export { Pager };
;
//# sourceMappingURL=orders.component.js.map