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
import { ImagesPopupComponent } from '@siteCommon/Components/ImagesPopup/imagesPopup.component';
import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { CountryService } from "@siteCommon/Services/country.service";
import { Country } from "@siteCommon/Services/country.service";
import { TourService } from "@siteCommon/Services/tour.service";
import { PreloaderService } from "@common/Services/preloader.service";
var EarlyToursComponent = /** @class */ (function () {
    function EarlyToursComponent(tourService, countryService, activeRoute, router, titleService, metaService, dialog, preloaderService) {
        this.tourService = tourService;
        this.countryService = countryService;
        this.activeRoute = activeRoute;
        this.router = router;
        this.titleService = titleService;
        this.metaService = metaService;
        this.dialog = dialog;
        this.preloaderService = preloaderService;
        this.starsArray = Array;
        this.country = new Country();
        this.tourCollection = new Array();
    }
    EarlyToursComponent.prototype.ngOnInit = function () {
        this.setDataFromRoute();
        this.getCountry();
        this.getTourCollection();
    };
    EarlyToursComponent.prototype.openOrderPopup = function (button) {
        var dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    };
    EarlyToursComponent.prototype.openImagesPopup = function (imageIds) {
        var dialogRef = this.dialog.open(ImagesPopupComponent, {
            data: imageIds
        });
    };
    EarlyToursComponent.prototype.setDataFromRoute = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            _this.country.urlName = params['country'];
        });
    };
    EarlyToursComponent.prototype.getCountry = function () {
        var _this = this;
        this.countryService.getCountry('beach', this.country.urlName)
            .subscribe(function (data) {
            _this.country = data;
            _this.setTitleAndMeta();
        });
    };
    EarlyToursComponent.prototype.getTourCollection = function () {
        var _this = this;
        this.preloaderService.startPreloader();
        this.tourService.getEarlyTourCollection(this.country.urlName)
            .subscribe(function (data) { return _this.tourCollection = data.sort(function () { return 0.5 - Math.random(); }); }, function (err) { return console.log(err); }, function () { return _this.preloaderService.finishPreloader(); });
    };
    EarlyToursComponent.prototype.setTitleAndMeta = function () {
        if (this.country) {
            if (this.country.title != null) {
                this.titleService.setTitle(this.country.title);
            }
            else {
                this.titleService.setTitle(this.country.name);
            }
        }
        if (this.country && this.country.metaDescription != null) {
            this.metaService.addTag({ name: 'description', content: this.country.metaDescription });
        }
        if (this.country && this.country.metaKeywords != null) {
            this.metaService.addTag({ name: 'keywords', content: this.country.metaKeywords });
        }
    };
    EarlyToursComponent = __decorate([
        Component({
            selector: "earlyTours.component",
            templateUrl: "earlyTours.component.html",
            styleUrls: ["earlyTours.component.css"]
        }),
        __metadata("design:paramtypes", [TourService,
            CountryService,
            ActivatedRoute,
            Router,
            Title,
            Meta,
            MatDialog,
            PreloaderService])
    ], EarlyToursComponent);
    return EarlyToursComponent;
}());
export { EarlyToursComponent };
//# sourceMappingURL=earlyTours.component.js.map