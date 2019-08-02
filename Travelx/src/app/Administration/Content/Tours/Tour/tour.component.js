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
import { FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service";
import { CountryService } from "@administrationCommon/Services/country.service";
import { TourService } from "@administrationCommon/Services/tour.service";
import { Tour } from "@administrationCommon/Services/tour.service";
var TourComponent = /** @class */ (function () {
    function TourComponent(tourTypeService, countryService, tourService, fb, activeRoute, router) {
        this.tourTypeService = tourTypeService;
        this.countryService = countryService;
        this.tourService = tourService;
        this.fb = fb;
        this.activeRoute = activeRoute;
        this.router = router;
        this.countries = new Dictionary();
        this.tour = new Tour();
        this.tourTypes = this.tourTypeService.GetTourTypes();
    }
    TourComponent.prototype.ngOnInit = function () {
        this.setDataFromRoute();
        this.getCountries();
        this.getTour();
        this.buildForm();
    };
    TourComponent.prototype.onSelectImage = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                _this.tour.newImageCollection.push(reader.result);
                event.target.value = null;
            };
        }
    };
    TourComponent.prototype.removeNewImage = function (removeUrl) {
        this.tour.newImageCollection = this.tour.newImageCollection.filter(function (url) { return url != removeUrl; });
    };
    TourComponent.prototype.removeOldImage = function (removeUrl) {
        this.tour.oldImageCollection = this.tour.oldImageCollection.filter(function (url) { return url != removeUrl; });
    };
    TourComponent.prototype.saveTour = function () {
        var _this = this;
        this.tourService.addTour(this.tour)
            //TODO need notifcation
            .subscribe(function () {
            _this.router.navigate(['administration/tours']);
        }, function (error) { return _this.errorMessage = error; });
    };
    TourComponent.prototype.setDataFromRoute = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            _this.tour.category = params['tourType'];
            _this.tour.country = params['country'];
            _this.tour.urlName = params['tour'];
        });
    };
    TourComponent.prototype.isCountrySelectDisabled = function () {
        var result = this.isCountriesLoaded || !this.tour.category;
        return result;
    };
    TourComponent.prototype.onChangeCategory = function () {
        this.getCountries();
    };
    TourComponent.prototype.getTour = function () {
        var _this = this;
        if (this.tour.category && this.tour.country && this.tour.urlName) {
            this.tourService.getTour(this.tour.category, this.tour.country, this.tour.urlName)
                .subscribe(function (data) { return _this.tour = data; });
        }
    };
    TourComponent.prototype.getCountries = function () {
        var _this = this;
        if (this.tour.category) {
            this.isCountriesLoaded = true;
            this.countryService.getCountriesPage(this.tour.category)
                .subscribe(function (data) {
                _this.countries = new Dictionary();
                data.collection.map(function (country) { return _this.countries.add(country.urlName, country.name); });
                _this.isCountriesLoaded = false;
            });
        }
    };
    TourComponent.prototype.buildForm = function () {
        this.tourForm = this.fb.group({
            "name": [this.tour.name, [
                    Validators.required,
                ]],
            "urlName": [this.tour.urlName, [
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.-]+$')
                ]],
            "city": [this.tour.city, [
                    Validators.required
                ]],
            "price": [this.tour.price, [
                    Validators.required,
                    Validators.min(0)
                ]],
            "stars": [this.tour.stars, [
                    Validators.required,
                    Validators.min(2),
                    Validators.max(5)
                ]],
            "description": [this.tour.description],
            "country": [this.tour.country, [
                    Validators.required
                ]],
            "category": [this.tour.category, [
                    Validators.required
                ]],
            "nights": [this.tour.nights, [
                    Validators.required,
                    Validators.min(0)
                ]],
            "isFlightIncluded": [this.tour.isFlightIncluded],
        });
    };
    TourComponent = __decorate([
        Component({
            selector: "tour",
            templateUrl: "tour.component.html",
            styleUrls: ["tour.component.css"],
            providers: [CountryService]
        }),
        __metadata("design:paramtypes", [TourTypeService,
            CountryService,
            TourService,
            FormBuilder,
            ActivatedRoute,
            Router])
    ], TourComponent);
    return TourComponent;
}());
export { TourComponent };
//# sourceMappingURL=tour.component.js.map