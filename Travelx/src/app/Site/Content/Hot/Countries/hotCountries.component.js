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
import { CountryService } from "@siteCommon/Services/country.service";
import { PreloaderService } from "@common/Services/preloader.service";
var HotCountriesComponent = /** @class */ (function () {
    function HotCountriesComponent(countryService, activeRoute, router, titleService, metaService, dialog, preloaderService) {
        this.countryService = countryService;
        this.activeRoute = activeRoute;
        this.router = router;
        this.titleService = titleService;
        this.metaService = metaService;
        this.dialog = dialog;
        this.preloaderService = preloaderService;
        this.countryCollection = new Array();
    }
    HotCountriesComponent.prototype.ngOnInit = function () {
        this.getCountryCollection();
        this.setTitleAndMeta();
    };
    HotCountriesComponent.prototype.getCountryCollection = function () {
        var _this = this;
        this.preloaderService.startPreloader();
        this.countryService.getHotCountryCollection()
            .subscribe(function (data) { return _this.countryCollection = data.collection; }, function (err) { return console.log(err); }, function () { return _this.preloaderService.finishPreloader(); });
    };
    HotCountriesComponent.prototype.setTitleAndMeta = function () {
        this.titleService.setTitle("Горящие туры. Путёвки из Минска.");
        this.metaService.addTag({ name: 'description', content: "➤ Горящие туры на море. ➤Путёвки из Минска, Москвы и Киева. ➤Более 6 830 горячих предложений. ➤Экономия до 39% здесь ➥" });
        this.metaService.addTag({ name: 'keywords', content: "горящие туры из Минска, горящие путевки, горящие туры цены, горящие туры на двоих, горячие туры" });
    };
    HotCountriesComponent.prototype.openOrderPopup = function (button) {
        var dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    };
    HotCountriesComponent = __decorate([
        Component({
            selector: "hotCountriesComponent",
            templateUrl: "hotCountries.component.html",
            styleUrls: ["hotCountries.component.css"]
        }),
        __metadata("design:paramtypes", [CountryService,
            ActivatedRoute,
            Router,
            Title,
            Meta,
            MatDialog,
            PreloaderService])
    ], HotCountriesComponent);
    return HotCountriesComponent;
}());
export { HotCountriesComponent };
//# sourceMappingURL=hotCountries.component.js.map