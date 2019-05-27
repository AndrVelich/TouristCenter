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
import { Router, ActivatedRoute } from '@angular/router';
import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { TourTypeService } from "@common/Services/tourType.service";
import { CountryService } from "@siteCommon/Services/country.service";
import { PreloaderService } from "@common/Services/preloader.service";
var CountriesComponent = /** @class */ (function () {
    function CountriesComponent(tourTypeService, countryService, activeRoute, router, dialog, preloaderService) {
        this.tourTypeService = tourTypeService;
        this.countryService = countryService;
        this.activeRoute = activeRoute;
        this.router = router;
        this.dialog = dialog;
        this.preloaderService = preloaderService;
        this.countryCollection = new Array();
    }
    CountriesComponent.prototype.ngOnInit = function () {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.setDataFromRoute();
        this.getCountryCollection();
    };
    CountriesComponent.prototype.setDataFromRoute = function () {
        var _this = this;
        this.activeRoute.pathFromRoot[1].url.subscribe(function (val) {
            _this.tourType = val[1].path;
        });
    };
    CountriesComponent.prototype.getCountryCollection = function () {
        var _this = this;
        this.preloaderService.startPreloader();
        this.countryService.getCountryCollection(this.tourType)
            .subscribe(function (data) { return _this.countryCollection = data; }, function (err) { return console.log(err); }, function () { return _this.preloaderService.finishPreloader(); });
    };
    CountriesComponent.prototype.openOrderPopup = function (button) {
        var dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    };
    CountriesComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: "countriesComponent",
            templateUrl: "countries.component.html",
            styleUrls: ["countries.component.css"]
        }),
        __metadata("design:paramtypes", [TourTypeService,
            CountryService,
            ActivatedRoute,
            Router,
            MatDialog,
            PreloaderService])
    ], CountriesComponent);
    return CountriesComponent;
}());
export { CountriesComponent };
//# sourceMappingURL=countries.component.js.map