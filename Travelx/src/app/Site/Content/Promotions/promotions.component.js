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
import { Title, Meta } from '@angular/platform-browser';
import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { PromotionService } from "@siteCommon/Services/promotion.service";
import { PreloaderService } from "@common/Services/preloader.service";
var PromotionsComponent = /** @class */ (function () {
    function PromotionsComponent(promotionService, titleService, metaService, dialog, preloaderService) {
        this.promotionService = promotionService;
        this.titleService = titleService;
        this.metaService = metaService;
        this.dialog = dialog;
        this.preloaderService = preloaderService;
        this.promotionCollection = new Array();
    }
    PromotionsComponent.prototype.ngOnInit = function () {
        this.getPromotionCollection();
        this.setTitleAndMeta();
    };
    PromotionsComponent.prototype.getPromotionCollection = function () {
        var _this = this;
        this.preloaderService.startPreloader();
        this.promotionService.getPromotionCollection()
            .subscribe(function (data) { return _this.promotionCollection = data; }, function (err) { return console.log(err); }, function () { return _this.preloaderService.finishPreloader(); });
    };
    PromotionsComponent.prototype.openOrderPopup = function (button) {
        var dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    };
    PromotionsComponent.prototype.setTitleAndMeta = function () {
        this.titleService.setTitle("Акции");
        this.metaService.addTag({ name: 'description', content: "Акции" });
    };
    PromotionsComponent = __decorate([
        Component({
            
            selector: "promotions",
            templateUrl: "promotions.component.html",
            styleUrls: ["promotions.component.css"]
        }),
        __metadata("design:paramtypes", [PromotionService,
            Title,
            Meta,
            MatDialog,
            PreloaderService])
    ], PromotionsComponent);
    return PromotionsComponent;
}());
export { PromotionsComponent };
//# sourceMappingURL=promotions.component.js.map