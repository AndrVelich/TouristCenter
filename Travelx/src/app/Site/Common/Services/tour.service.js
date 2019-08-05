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
var TourService = /** @class */ (function () {
    function TourService(httpClient) {
        this.httpClient = httpClient;
        this.url = 'api/tour/';
    }
    TourService.prototype.getTourCollection = function (tourType, country) {
        var params = new HttpParams();
        if (tourType) {
            params = params.set('tourType', tourType);
        }
        if (country) {
            params = params.set('country', country);
        }
        var options = { params: params };
        var result = this.httpClient.get('api/tours', options);
        return result;
    };
    TourService.prototype.getHotTourCollection = function (country) {
        var params = new HttpParams();
        if (country) {
            params = params.set('country', country);
        }
        var options = { params: params };
        var result = this.httpClient.get('api/hotTours', options);
        return result;
    };
    TourService.prototype.getEarlyTourCollection = function (country) {
        var params = new HttpParams();
        if (country) {
            params = params.set('country', country);
        }
        var options = { params: params };
        var result = this.httpClient.get('api/earlyTours', options);
        return result;
    };
    TourService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], TourService);
    return TourService;
}());
export { TourService };
var Tour = /** @class */ (function () {
    function Tour() {
        this.newImageCollection = new Array();
        this.oldImageCollection = new Array();
    }
    return Tour;
}());
export { Tour };
//# sourceMappingURL=tour.service.js.map