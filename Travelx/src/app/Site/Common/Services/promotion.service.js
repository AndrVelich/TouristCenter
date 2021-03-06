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
import { HttpClient } from '@angular/common/http';
var PromotionService = /** @class */ (function () {
    function PromotionService(httpClient) {
        this.httpClient = httpClient;
        this.url = '/api/promotion';
    }
    PromotionService.prototype.getActivePromotionCollection = function () {
        return this.httpClient.get('api/promotions/active');
    };
    PromotionService.prototype.getActivePromotion = function (promotionUrlName) {
        return this.httpClient.get('api/promotion/active/' + promotionUrlName);
    };
    PromotionService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], PromotionService);
    return PromotionService;
}());
export { PromotionService };
var Promotion = /** @class */ (function () {
    function Promotion() {
        this.newImageCollection = new Array();
        this.oldImageCollection = new Array();
    }
    return Promotion;
}());
export { Promotion };
//# sourceMappingURL=promotion.service.js.map