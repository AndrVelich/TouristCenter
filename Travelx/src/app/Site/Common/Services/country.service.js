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
var CountryService = /** @class */ (function () {
    function CountryService(httpClient) {
        this.httpClient = httpClient;
        this.url = '/api/country';
    }
    CountryService.prototype.getCountryCollection = function (tourType) {
        var params = new HttpParams();
        if (tourType) {
            params = params.set('tourType', tourType);
        }
        var options = { params: params };
        var result = this.httpClient.get('api/countries', options);
        return result;
    };
    CountryService.prototype.getCountry = function (tourType, countryUrlName) {
        return this.httpClient.get('api/country/' + tourType + '/' + countryUrlName);
    };
    CountryService.prototype.getHotCountryCollection = function () {
        var result = this.httpClient.get('api/hotCountries');
        return result;
    };
    CountryService.prototype.getEarlyCountryCollection = function () {
        var result = this.httpClient.get('api/earlyCountries');
        return result;
    };
    CountryService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
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