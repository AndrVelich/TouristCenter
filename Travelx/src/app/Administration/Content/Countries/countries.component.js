var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterService } from "@common/Services/router.service";
import { TourTypeService } from "@common/Services/tourType.service";
import { PageOptions } from "@common/Services/pager.service";
import { PreloaderService } from "@common/Services/preloader.service";
import { PagerComponent } from "@administrationCommon/Components/Pager/pager.component";
import { CountryService } from "@administrationCommon/Services/country.service";
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";
var CountriesComponent = /** @class */ (function () {
    function CountriesComponent(dialog, tourTypeService, countryService, router, activeRoute, routerService, preloaderService) {
        this.dialog = dialog;
        this.tourTypeService = tourTypeService;
        this.countryService = countryService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.routerService = routerService;
        this.preloaderService = preloaderService;
        this.countryCollection = new Array();
        this.pageOptions = new PageOptions(0, 10, 10);
    }
    CountriesComponent.prototype.ngOnInit = function () {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.setPageOptionsFromUrl();
    };
    CountriesComponent.prototype.getTourTypeName = function (tourTypeKey) {
        var result = this.tourTypes.keys().filter(function (tt) { return tt == tourTypeKey; })[0];
        return result;
    };
    CountriesComponent.prototype.tourTypeFiterChange = function () {
        this.setFilterOptionsToUrl();
        this.pagerComponent.resetPager();
    };
    CountriesComponent.prototype.openDeleteConfirmation = function (countryId, countryName) {
        var _this = this;
        this.dialog.open(ConfirmationPopupComponent, {
            data: 'Вы уверены, что хототе удалить страну <b>' + countryName + '</b> и все туры этой страны?'
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                _this.preloaderService.startPreloader();
                _this.countryService.deleteCountry(countryId)
                    .subscribe(function () { return _this.getCountriesPage(_this.pageOptions); }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
            }
        });
    };
    CountriesComponent.prototype.getCountriesPage = function (pageOptions) {
        var _this = this;
        this.preloaderService.startPreloader();
        this.pageOptions = pageOptions;
        this.countryService.getCountriesPage(this.activeTourType, pageOptions.skip, pageOptions.take)
            .subscribe(function (data) {
            _this.countryCollection = data.collection;
            _this.pagerComponent.updatePager(data.count);
        }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
    };
    CountriesComponent.prototype.setFilterOptionsToUrl = function () {
        var newParams = { tourType: this.activeTourType };
        this.routerService.updateQueryParams(newParams);
    };
    CountriesComponent.prototype.setPageOptionsFromUrl = function () {
        var queryParams = this.activeRoute.snapshot.queryParams;
        if (queryParams) {
            var tourType = queryParams.tourType;
            if (tourType) {
                this.activeTourType = tourType;
            }
        }
    };
    __decorate([
        ViewChild(PagerComponent, { static: false }),
        __metadata("design:type", PagerComponent)
    ], CountriesComponent.prototype, "pagerComponent", void 0);
    CountriesComponent = __decorate([
        Component({
            selector: "countries",
            templateUrl: "countries.component.html",
            styleUrls: ["countries.component.css"]
        }),
        __metadata("design:paramtypes", [MatDialog,
            TourTypeService,
            CountryService,
            Router,
            ActivatedRoute,
            RouterService,
            PreloaderService])
    ], CountriesComponent);
    return CountriesComponent;
}());
export { CountriesComponent };
//# sourceMappingURL=countries.component.js.map