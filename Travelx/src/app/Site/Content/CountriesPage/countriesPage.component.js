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
import { Title, Meta } from '@angular/platform-browser';
import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { TourTypeService } from "@common/Services/tourType.service";
import { CountryService } from "@siteCommon/Services/country.service";
import { PreloaderService } from "@common/Services/preloader.service";
var CountriesPageComponent = /** @class */ (function () {
    function CountriesPageComponent(tourTypeService, countryService, activeRoute, router, titleService, metaService, dialog, preloaderService) {
        this.tourTypeService = tourTypeService;
        this.countryService = countryService;
        this.activeRoute = activeRoute;
        this.router = router;
        this.titleService = titleService;
        this.metaService = metaService;
        this.dialog = dialog;
        this.preloaderService = preloaderService;
        this.tourType = "beach";
        this.countryCollection = new Array();
    }
    CountriesPageComponent.prototype.ngOnInit = function () {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.getCountryCollection();
        this.setTitleAndMeta();
    };
    CountriesPageComponent.prototype.getCountryCollection = function () {
        var _this = this;
        this.preloaderService.startPreloader();
        this.countryService.getCountryCollection(this.tourType)
            .subscribe(function (data) { return _this.countryCollection = data.collection; }, function (err) { return console.log(err); }, function () { return _this.preloaderService.finishPreloader(); });
    };
    CountriesPageComponent.prototype.setTitleAndMeta = function () {
        this.titleService.setTitle("Отдых 2020. Цены по странам");
        this.metaService.updateTag({ name: 'description', content: "➤ 85+ стран для отдыха. ➤Актуальные цены на все популярные направления. ➤Ответ на вопрос «Где отдохнуть?» Вы найдете здесь!" });
        this.metaService.updateTag({ name: 'keywords', content: "отдых 2020, отдых 2020 цены, где отдохнуть, страны отдых" });
    };
    CountriesPageComponent.prototype.openOrderPopup = function (button) {
        var dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    };
    CountriesPageComponent = __decorate([
        Component({
            selector: "countriesPageComponent",
            templateUrl: "countriesPage.component.html",
            styleUrls: ["countriesPage.component.css"]
        }),
        __metadata("design:paramtypes", [TourTypeService,
            CountryService,
            ActivatedRoute,
            Router,
            Title,
            Meta,
            MatDialog,
            PreloaderService])
    ], CountriesPageComponent);
    return CountriesPageComponent;
}());
export { CountriesPageComponent };
//# sourceMappingURL=countriesPage.component.js.map