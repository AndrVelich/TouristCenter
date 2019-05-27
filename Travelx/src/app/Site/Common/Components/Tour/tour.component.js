var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
import { MatDialog } from '@angular/material';
import { ImagesPopupComponent } from '@siteCommon/Components/ImagesPopup/imagesPopup.component';
import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { Tour } from "@siteCommon/Services/tour.service";
var TourComponent = /** @class */ (function () {
    function TourComponent(dialog) {
        this.dialog = dialog;
        this.starsArray = Array;
    }
    TourComponent.prototype.openOrderPopup = function (button) {
        var dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    };
    TourComponent.prototype.openImagesPopup = function (imageIds) {
        var dialogRef = this.dialog.open(ImagesPopupComponent, {
            data: imageIds
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Tour)
    ], TourComponent.prototype, "tour", void 0);
    TourComponent = __decorate([
        Component({
            
            selector: "tourComponent",
            templateUrl: "tour.component.html",
            styleUrls: ["tour.component.css"]
        }),
        __metadata("design:paramtypes", [MatDialog])
    ], TourComponent);
    return TourComponent;
}());
export { TourComponent };
//# sourceMappingURL=tour.component.js.map