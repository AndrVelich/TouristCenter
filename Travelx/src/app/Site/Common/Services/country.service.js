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
import { map, catchError } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Dictionary } from "@common/Types/Dictionary";
import { Http, Response } from "@angular/http";
//import {Observable} from 'rxjs/Rx';
var CountryService = /** @class */ (function () {
    function CountryService(http) {
        this.http = http;
        this.url = '/api/country';
        this.countries = new Dictionary();
    }
    CountryService.prototype.getCountryCollection = function (tourType) {
        return this.http.get('api/countries/' + (tourType || '')).pipe(map(function (res) { return res.json(); }), catchError(this.handleError));
    };
    CountryService.prototype.getCountry = function (tourType, countryUrlName) {
        return this.http.get('api/country/' + tourType + '/' + countryUrlName).pipe(map(function (res) { return res.json(); }), catchError(this.handleError));
    };
    CountryService.prototype.getHotCountryCollection = function () {
        return this.http.get('api/hotCountries').pipe(map(function (res) { return res.json(); }), catchError(this.handleError));
    };
    CountryService.prototype.getEarlyCountryCollection = function () {
        return this.http.get('api/earlyCountries').pipe(map(function (res) { return res.json(); }), catchError(this.handleError));
    };
    CountryService.prototype.handleError = function (error, cought) {
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
    CountryService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], CountryService);
    return CountryService;
}());
export { CountryService };
var Country = /** @class */ (function () {
    function Country() {
        this.newImageCollection = new Array();
        this.oldImageCollection = new Array();
    }
    return Country;
}());
export { Country };
//# sourceMappingURL=country.service.js.map