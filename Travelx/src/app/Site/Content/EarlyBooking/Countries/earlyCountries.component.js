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
var EarlyCountriesComponent = /** @class */ (function () {
    function EarlyCountriesComponent(countryService, activeRoute, router, titleService, metaService, dialog, preloaderService) {
        this.countryService = countryService;
        this.activeRoute = activeRoute;
        this.router = router;
        this.titleService = titleService;
        this.metaService = metaService;
        this.dialog = dialog;
        this.preloaderService = preloaderService;
        this.countryCollection = new Array();
    }
    EarlyCountriesComponent.prototype.ngOnInit = function () {
        this.getCountryCollection();
        this.setTitleAndMeta();
    };
    EarlyCountriesComponent.prototype.getCountryCollection = function () {
        var _this = this;
        this.preloaderService.startPreloader();
        this.countryService.getEarlyCountryCollection()
            .subscribe(function (data) { return _this.countryCollection = data.collection; }, function (err) { return console.log(err); }, function () { return _this.preloaderService.finishPreloader(); });
    };
    EarlyCountriesComponent.prototype.setTitleAndMeta = function () {
        this.titleService.setTitle("Раннее Бронирование туров. Отдых 2020.");
        this.metaService.updateTag({ name: 'description', content: "➤Акция «Раннее Бронирование 2020». ➤ Экономия до 49% на отдых при оформлении тура заранее! ➤Более 6 356 вариантов отдыха! Смотреть…➥" });
        this.metaService.updateTag({ name: 'keywords', content: "Раннее Бронирование, Раннее Бронирование 2020, Раннее Бронирование из Минска, Раннее Бронирование туров, акция" });
    };
    EarlyCountriesComponent.prototype.openOrderPopup = function (button) {
        var dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    };
    EarlyCountriesComponent = __decorate([
        Component({
            selector: "earlyCountries",
            templateUrl: "earlyCountries.component.html",
            styleUrls: ["earlyCountries.component.css"]
        }),
        __metadata("design:paramtypes", [CountryService,
            ActivatedRoute,
            Router,
            Title,
            Meta,
            MatDialog,
            PreloaderService])
    ], EarlyCountriesComponent);
    return EarlyCountriesComponent;
}());
export { EarlyCountriesComponent };
//# sourceMappingURL=earlyCountries.component.js.map