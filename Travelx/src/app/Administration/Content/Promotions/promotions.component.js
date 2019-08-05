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
import { PreloaderService } from "@common/Services/preloader.service";
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";
import { PromotionService } from "@administrationCommon/Services/promotion.service";
var PromotionsComponent = /** @class */ (function () {
    function PromotionsComponent(dialog, promotionService, preloaderService) {
        this.dialog = dialog;
        this.promotionService = promotionService;
        this.preloaderService = preloaderService;
        this.promotionCollection = new Array();
    }
    PromotionsComponent.prototype.ngOnInit = function () {
        this.getPromotionCollection();
    };
    PromotionsComponent.prototype.openDeleteConfirmation = function (promotionId, promotionName) {
        var _this = this;
        this.dialog.open(ConfirmationPopupComponent, {
            data: 'Вы уверены, что хототе удалить акцию <b>' + promotionName + '</b>?'
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                _this.promotionService.deletePromotion(promotionId)
                    .subscribe(function () { return _this.getPromotionCollection(); }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
            }
        });
    };
    PromotionsComponent.prototype.getPromotionCollection = function () {
        var _this = this;
        this.preloaderService.startPreloader();
        this.promotionService.getPromotionCollection()
            .subscribe(function (data) { return _this.promotionCollection = data; }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
    };
    PromotionsComponent = __decorate([
        Component({
            selector: "promotions",
            templateUrl: "promotions.component.html",
            styleUrls: ["promotions.component.css"]
        }),
        __metadata("design:paramtypes", [MatDialog,
            PromotionService,
            PreloaderService])
    ], PromotionsComponent);
    return PromotionsComponent;
}());
export { PromotionsComponent };
//# sourceMappingURL=promotions.component.js.map