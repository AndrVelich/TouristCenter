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
import { ActivatedRoute } from '@angular/router';
import { RouterService } from "@common/Services/router.service";
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service";
import { PageOptions } from "@common/Services/pager.service";
import { PagerComponent } from "@administrationCommon/Components/Pager/pager.component";
import { PreloaderService } from "@common/Services/preloader.service";
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";
import { CountryService } from "@administrationCommon/Services/country.service";
import { TourService } from "@administrationCommon/Services/tour.service";
var ToursComponent = /** @class */ (function () {
    function ToursComponent(dialog, activeRoute, routerService, tourTypeService, countryService, tourService, preloaderService) {
        this.dialog = dialog;
        this.activeRoute = activeRoute;
        this.routerService = routerService;
        this.tourTypeService = tourTypeService;
        this.countryService = countryService;
        this.tourService = tourService;
        this.preloaderService = preloaderService;
        this.starsArray = Array;
        this.countryCollection = new Dictionary();
        this.tourCollection = new Array();
        this.pageOptions = new PageOptions(0, 10, 10);
    }
    ToursComponent.prototype.ngOnInit = function () {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.setPageOptionsFromUrl();
        this.getCountryCollection();
    };
    ToursComponent.prototype.tourTypeFiterChange = function () {
        this.activeCountry = '';
        this.filterChange();
        this.getCountryCollection();
    };
    ToursComponent.prototype.countryFiterChange = function () {
        this.filterChange();
    };
    ToursComponent.prototype.isCountrySelectDisabled = function () {
        var result = this.isCountriesLoading || !this.countryCollection;
        return result;
    };
    ToursComponent.prototype.getTourTypeName = function (tourTypeKey) {
        var result = this.tourTypes[tourTypeKey];
        return result;
    };
    ToursComponent.prototype.openDeleteConfirmation = function (tourId, tourName) {
        var _this = this;
        this.dialog.open(ConfirmationPopupComponent, {
            data: 'Вы уверены, что хототе удалить тур <b>' + tourName + '</b>?'
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                _this.preloaderService.startPreloader();
                _this.tourService.deleteTour(tourId)
                    .subscribe(function () { return _this.getToursPage(_this.pageOptions); }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
            }
        });
    };
    ToursComponent.prototype.getCountryCollection = function () {
        var _this = this;
        this.isCountriesLoading = true;
        this.countryCollection = new Dictionary();
        this.countryService.getCountriesPage(this.activeTourType)
            .subscribe(function (data) {
            data.collection.map(function (country) { return _this.countryCollection.add(country.urlName, country.name); });
            _this.isCountriesLoading = false;
        });
    };
    ToursComponent.prototype.getToursPage = function (pageOptions) {
        var _this = this;
        this.preloaderService.startPreloader();
        this.pageOptions = pageOptions;
        this.tourService.getToursPage(this.activeTourType, this.activeCountry, pageOptions.skip, pageOptions.take)
            .subscribe(function (data) {
            _this.tourCollection = data.collection;
            _this.pagerComponent.updatePager(data.count);
        }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
    };
    ToursComponent.prototype.filterChange = function () {
        this.setFilterOptionsToUrl();
        this.pagerComponent.resetPager();
    };
    ToursComponent.prototype.setFilterOptionsToUrl = function () {
        var newParams = {
            tourType: this.activeTourType,
            country: this.activeCountry,
        };
        this.routerService.updateQueryParams(newParams);
    };
    ToursComponent.prototype.setPageOptionsFromUrl = function () {
        var queryParams = this.activeRoute.snapshot.queryParams;
        if (queryParams) {
            var tourType = queryParams.tourType;
            if (tourType) {
                this.activeTourType = tourType;
            }
            var country = queryParams.country;
            if (country) {
                this.activeCountry = country;
            }
        }
    };
    __decorate([
        ViewChild(PagerComponent, { static: false }),
        __metadata("design:type", PagerComponent)
    ], ToursComponent.prototype, "pagerComponent", void 0);
    ToursComponent = __decorate([
        Component({
            selector: "tours",
            templateUrl: "tours.component.html",
            styleUrls: ["tours.component.css"]
        }),
        __metadata("design:paramtypes", [MatDialog,
            ActivatedRoute,
            RouterService,
            TourTypeService,
            CountryService,
            TourService,
            PreloaderService])
    ], ToursComponent);
    return ToursComponent;
}());
export { ToursComponent };
//# sourceMappingURL=tours.component.js.map