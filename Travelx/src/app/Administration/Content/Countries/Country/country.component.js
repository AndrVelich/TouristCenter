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
import { PreloaderService } from "@common/Services/preloader.service";
import { TourTypeService } from "@common/Services/tourType.service";
import { CountryService } from "@administrationCommon/Services/country.service";
import { Country } from "@administrationCommon/Services/country.service";
var CountryComponent = /** @class */ (function () {
    function CountryComponent(tourTypeService, countryService, fb, activeRoute, router, preloaderService) {
        this.tourTypeService = tourTypeService;
        this.countryService = countryService;
        this.fb = fb;
        this.activeRoute = activeRoute;
        this.router = router;
        this.preloaderService = preloaderService;
        this.country = new Country();
        this.tourTypes = this.tourTypeService.GetTourTypes();
    }
    CountryComponent.prototype.ngOnInit = function () {
        this.setDataFromRoute();
        this.getCountry();
        this.buildForm();
    };
    CountryComponent.prototype.onSelectImage = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                _this.country.newImageCollection.push(reader.result);
                event.target.value = null;
            };
        }
    };
    CountryComponent.prototype.removeNewImage = function (removeUrl) {
        this.country.newImageCollection = this.country.newImageCollection.filter(function (url) { return url != removeUrl; });
    };
    CountryComponent.prototype.removeOldImage = function (removeUrl) {
        this.country.oldImageCollection = this.country.oldImageCollection.filter(function (url) { return url != removeUrl; });
    };
    CountryComponent.prototype.saveCountry = function () {
        var _this = this;
        this.preloaderService.startPreloader();
        this.countryService.addCountry(this.country)
            .subscribe(function () {
            _this.router.navigate(['administration/countries']);
        }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
    };
    CountryComponent.prototype.setDataFromRoute = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            _this.tourType = params['tourType'];
            _this.countryUrlName = params['country'];
        });
    };
    CountryComponent.prototype.getCountry = function () {
        var _this = this;
        if (this.countryUrlName) {
            this.preloaderService.startPreloader();
            this.countryService.getCountry(this.tourType, this.countryUrlName)
                .subscribe(function (data) { return _this.country = data; }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
        }
    };
    CountryComponent.prototype.buildForm = function () {
        this.countryForm = this.fb.group({
            "name": [this.country.name, [
                    Validators.required,
                ]],
            "urlName": [this.country.urlName, [
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.-]+$')
                ]],
            "threeStarsPrice": [this.country.threeStarsPrice, [
                    Validators.required,
                    Validators.min(0)
                ]],
            "fourStarsPrice": [this.country.fourStarsPrice, [
                    Validators.required,
                    Validators.min(0)
                ]],
            "fiveStarsPrice": [this.country.fiveStarsPrice, [
                    Validators.required,
                    Validators.min(0)
                ]],
            "description": [this.country.description, [
                    Validators.required
                ]],
            "category": [this.country.category, [
                    Validators.required
                ]],
            "pageHeader": [this.country.pageHeader, []],
            "pageContent": [this.country.pageContent, [
                    Validators.required
                ]],
            "pageContentBottom": [this.country.pageContentBottom, []],
            "title": [this.country.title, []],
            "metaDescription": [this.country.metaDescription, []],
            "metaKeywords": [this.country.metaKeywords, []],
        });
    };
    CountryComponent = __decorate([
        Component({
            selector: "country",
            templateUrl: "country.component.html",
            styleUrls: ["country.component.css"]
        }),
        __metadata("design:paramtypes", [TourTypeService,
            CountryService,
            FormBuilder,
            ActivatedRoute,
            Router,
            PreloaderService])
    ], CountryComponent);
    return CountryComponent;
}());
export { CountryComponent };
//# sourceMappingURL=country.component.js.map