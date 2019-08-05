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
import { PromotionService } from "@administrationCommon/Services/promotion.service";
import { Promotion } from "@administrationCommon/Services/promotion.service";
var PromotionComponent = /** @class */ (function () {
    function PromotionComponent(promotionService, fb, activeRoute, router, preloaderService) {
        this.promotionService = promotionService;
        this.fb = fb;
        this.activeRoute = activeRoute;
        this.router = router;
        this.preloaderService = preloaderService;
        this.promotion = new Promotion();
    }
    PromotionComponent.prototype.ngOnInit = function () {
        this.setDataFromRoute();
        this.getPromotion();
        this.buildForm();
    };
    PromotionComponent.prototype.onSelectImage = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                _this.promotion.newImageCollection.push(reader.result);
                event.target.value = null;
            };
        }
    };
    PromotionComponent.prototype.removeNewImage = function (removeUrl) {
        this.promotion.newImageCollection = this.promotion.newImageCollection.filter(function (url) { return url != removeUrl; });
    };
    PromotionComponent.prototype.removeOldImage = function (removeUrl) {
        this.promotion.oldImageCollection = this.promotion.oldImageCollection.filter(function (url) { return url != removeUrl; });
    };
    PromotionComponent.prototype.savePromotion = function () {
        var _this = this;
        this.preloaderService.startPreloader();
        this.promotionService.addPromotion(this.promotion)
            .subscribe(function () {
            _this.router.navigate(['administration/promotions']);
        }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
    };
    PromotionComponent.prototype.setDataFromRoute = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            var urlParameter = params['promotion'];
            if (urlParameter && urlParameter != 'new') {
                _this.promotion.urlName = urlParameter;
            }
        });
    };
    PromotionComponent.prototype.getPromotion = function () {
        var _this = this;
        if (this.promotion && this.promotion.urlName) {
            this.preloaderService.startPreloader();
            this.promotionService.getPromotion(this.promotion.urlName)
                .subscribe(function (data) { return _this.promotion = data; }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
        }
    };
    PromotionComponent.prototype.buildForm = function () {
        this.promotionForm = this.fb.group({
            "name": [this.promotion.name, [
                    Validators.required,
                ]],
            "urlName": [this.promotion.urlName, [
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.-]+$')
                ]],
            "description": [this.promotion.description, [
                    Validators.required
                ]],
            "untilDate": [this.promotion.untilDate, [
                    Validators.required
                ]],
            "title": [this.promotion.title, []],
            "metaDescription": [this.promotion.metaDescription, []],
            "metaKeywords": [this.promotion.metaKeywords, []],
        });
    };
    PromotionComponent = __decorate([
        Component({
            selector: "promotion",
            templateUrl: "promotion.component.html",
            styleUrls: ["promotion.component.css"]
        }),
        __metadata("design:paramtypes", [PromotionService,
            FormBuilder,
            ActivatedRoute,
            Router,
            PreloaderService])
    ], PromotionComponent);
    return PromotionComponent;
}());
export { PromotionComponent };
//# sourceMappingURL=promotion.component.js.map