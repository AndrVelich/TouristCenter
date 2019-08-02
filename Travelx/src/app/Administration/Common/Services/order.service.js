var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var OrderService = /** @class */ (function () {
    function OrderService(httpClient) {
        this.httpClient = httpClient;
        this.url = '/api/order';
    }
    OrderService.prototype.getOrdersPage = function (skip, take) {
        var params = new HttpParams()
            .set('skip', skip.toString())
            .set('take', take.toString());
        var options = { params: params };
        var result = this.httpClient.get('api/orders', options);
        return result;
    };
    OrderService.prototype.isAnyNewOrders = function () {
        return this.httpClient.get('api/orders/isAnyNew');
    };
    OrderService.prototype.saveOrder = function (order) {
        return this.httpClient.put(this.url, order);
    };
    OrderService.prototype.deleteOrder = function (orderId) {
        return this.httpClient.delete(this.url + "/" + orderId);
    };
    OrderService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], OrderService);
    return OrderService;
}());
export { OrderService };
var Order = /** @class */ (function () {
    function Order() {
    }
    return Order;
}());
export { Order };
//# sourceMappingURL=order.service.js.map