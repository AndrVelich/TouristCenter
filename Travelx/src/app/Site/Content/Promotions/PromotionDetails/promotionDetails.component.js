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
import { PromotionService } from "@siteCommon/Services/promotion.service";
import { Promotion } from "@siteCommon/Services/promotion.service";
var PromotionDetailsComponent = /** @class */ (function () {
    function PromotionDetailsComponent(dialog, promotionService, activeRoute, router, titleService, metaService) {
        this.dialog = dialog;
        this.promotionService = promotionService;
        this.activeRoute = activeRoute;
        this.router = router;
        this.titleService = titleService;
        this.metaService = metaService;
        this.promotion = new Promotion();
    }
    PromotionDetailsComponent.prototype.ngOnInit = function () {
        this.setDataFromRoute();
        this.getPromotion();
    };
    PromotionDetailsComponent.prototype.setDataFromRoute = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            _this.promotion.urlName = params['promotion'];
        });
    };
    PromotionDetailsComponent.prototype.getPromotion = function () {
        var _this = this;
        this.promotionService.getPromotion(this.promotion.urlName)
            .subscribe(function (data) {
            _this.promotion = data;
            _this.setTitleAndMeta();
        });
    };
    PromotionDetailsComponent.prototype.setTitleAndMeta = function () {
        if (this.promotion) {
            if (this.promotion.title != null) {
                this.titleService.setTitle(this.promotion.title);
            }
            else {
                this.titleService.setTitle(this.promotion.name);
            }
        }
        if (this.promotion && this.promotion.metaDescription != null) {
            this.metaService.addTag({ name: 'description', content: this.promotion.metaDescription });
        }
        if (this.promotion && this.promotion.metaKeywords != null) {
            this.metaService.addTag({ name: 'keywords', content: this.promotion.metaKeywords });
        }
    };
    PromotionDetailsComponent.prototype.openOrderPopup = function (button) {
        var dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    };
    PromotionDetailsComponent = __decorate([
        Component({
            
            selector: "promotionDetails",
            templateUrl: "promotionDetails.component.html",
            styleUrls: ["promotionDetails.component.css"]
        }),
        __metadata("design:paramtypes", [MatDialog,
            PromotionService,
            ActivatedRoute,
            Router,
            Title,
            Meta])
    ], PromotionDetailsComponent);
    return PromotionDetailsComponent;
}());
export { PromotionDetailsComponent };
//# sourceMappingURL=promotionDetails.component.js.map