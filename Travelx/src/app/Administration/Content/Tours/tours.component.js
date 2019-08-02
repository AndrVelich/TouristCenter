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
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service";
import { CountryService } from "@administrationCommon/Services/country.service";
import { TourService } from "@administrationCommon/Services/tour.service";
var ToursComponent = /** @class */ (function () {
    function ToursComponent(dialog, tourTypeService, countryService, tourService) {
        this.dialog = dialog;
        this.tourTypeService = tourTypeService;
        this.countryService = countryService;
        this.tourService = tourService;
        this.starsArray = Array;
        this.countryCollection = new Dictionary();
        this.tourCollection = new Array();
    }
    ToursComponent.prototype.ngOnInit = function () {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.getAllTourCollection();
    };
    ToursComponent.prototype.tourTypeFiterChange = function () {
        this.getCountryCollection();
        this.getTourCollection();
    };
    ToursComponent.prototype.countryFiterChange = function () {
        this.getTourCollection();
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
                _this.tourService.deleteTour(tourId)
                    .subscribe(function () { return _this.updateTourCollection(); });
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
    ToursComponent.prototype.updateTourCollection = function () {
        if (this.activeTourType) {
            this.getTourCollection();
        }
        else {
            this.getAllTourCollection();
        }
    };
    ToursComponent.prototype.getAllTourCollection = function () {
        var _this = this;
        this.tourService.getAllTourCollection()
            .subscribe(function (data) { return _this.tourCollection = data; });
    };
    ToursComponent.prototype.getTourCollection = function () {
        var _this = this;
        this.tourService.getTourCollection(this.activeTourType, this.activeCountry)
            .subscribe(function (data) { return _this.tourCollection = data; });
    };
    ToursComponent = __decorate([
        Component({
            selector: "tours",
            templateUrl: "tours.component.html",
            styleUrls: ["tours.component.css"]
        }),
        __metadata("design:paramtypes", [MatDialog,
            TourTypeService,
            CountryService,
            TourService])
    ], ToursComponent);
    return ToursComponent;
}());
export { ToursComponent };
//# sourceMappingURL=tours.component.js.map