var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Dictionary } from "@common/Types/Dictionary";
import { Http, Response } from "@angular/http";
//import {Observable} from 'rxjs/Rx';
var TourService = /** @class */ (function () {
    function TourService(http) {
        this.http = http;
        this.countries = new Dictionary();
        this.url = 'api/tour/';
    }
    TourService.prototype.getTourCollection = function (tourType, country) {
        return this.http.get('api/tours/' + tourType + '/' + (country || '')).pipe(map(function (res) { return res.json(); }), catchError(this.handleError));
    };
    TourService.prototype.getAllTourCollection = function () {
        return this.http.get('api/tours/allTours').pipe(map(function (res) { return res.json(); }), catchError(this.handleError));
    };
    TourService.prototype.getTour = function (tourType, countryUrlName, tourUrlName) {
        return this.http.get(this.url + tourType + '/' + countryUrlName + '/' + tourUrlName).pipe(map(function (res) { return res.json(); }), catchError(this.handleError));
    };
    TourService.prototype.addTour = function (tour) {
        return this.http.post(this.url, tour).pipe(catchError(this.handleError));
    };
    TourService.prototype.deleteTour = function (tourId) {
        return this.http.delete(this.url + tourId).pipe(catchError(this.handleError));
    };
    TourService.prototype.handleError = function (error, cought) {
        var message = "";
        if (error instanceof Response) {
            var errorData = error.json().error || JSON.stringify(error.json());
            message = error.status + " - " + (error.statusText || '') + " " + errorData;
        }
        else {
            message = error.message ? error.message : error.toString();
        }
        console.error(message);
        return observableThrowError(message);
    };
    TourService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
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