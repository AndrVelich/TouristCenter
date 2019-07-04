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
import { TourTypeService } from "@common/Services/tourType.service";
import { CountryService } from "@administrationCommon/Services/country.service";
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";
var CountriesComponent = /** @class */ (function () {
    function CountriesComponent(dialog, tourTypeService, countryService) {
        this.dialog = dialog;
        this.tourTypeService = tourTypeService;
        this.countryService = countryService;
        this.countryCollection = new Array();
    }
    CountriesComponent.prototype.ngOnInit = function () {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.getCountryCollection();
    };
    CountriesComponent.prototype.getCountryCollection = function (tourType) {
        var _this = this;
        this.countryService.getCountryCollection(tourType)
            .subscribe(function (data) { return _this.countryCollection = data; });
    };
    CountriesComponent.prototype.getTourTypeName = function (tourTypeKey) {
        var result = this.tourTypes.keys().filter(function (tt) { return tt == tourTypeKey; })[0];
        return result;
    };
    CountriesComponent.prototype.tourTypeFiterChange = function () {
        this.getCountryCollection(this.activeTourType);
    };
    CountriesComponent.prototype.openDeleteConfirmation = function (countryId, countryName) {
        var _this = this;
        this.dialog.open(ConfirmationPopupComponent, {
            data: 'Вы уверены, что хототе удалить страну <b>' + countryName + '</b> и все туры этой страны?'
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                _this.countryService.deleteCountry(countryId)
                    .subscribe(function () { return _this.getCountryCollection(); });
            }
        });
    };
    CountriesComponent = __decorate([
        Component({
            selector: "countries",
            templateUrl: "countries.component.html",
            styleUrls: ["countries.component.css"]
        }),
        __metadata("design:paramtypes", [MatDialog,
            TourTypeService,
            CountryService])
    ], CountriesComponent);
    return CountriesComponent;
}());
export { CountriesComponent };
//# sourceMappingURL=countries.component.js.map