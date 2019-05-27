var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject, Renderer2, HostListener } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
var ImagesPopupComponent = /** @class */ (function () {
    function ImagesPopupComponent(dialogRef, data, renderer) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.renderer = renderer;
        this.renderer.addClass(document.body, 'modal-open');
    }
    ImagesPopupComponent.prototype.ngOnInit = function () {
        this.index = 0;
    };
    ImagesPopupComponent.prototype.handleKeyboardEvent = function (event) {
        if (event.key == 'ArrowRight') {
            this.toNext();
        }
        if (event.key == 'ArrowLeft') {
            this.toPrevious();
        }
    };
    ImagesPopupComponent.prototype.toPrevious = function () {
        if (this.isPreviousAvailable()) {
            --this.index;
        }
    };
    ImagesPopupComponent.prototype.toNext = function () {
        if (this.isNextAvailable()) {
            ++this.index;
        }
        else {
            this.index = 0;
        }
    };
    ImagesPopupComponent.prototype.isNextAvailable = function () {
        var result = this.index < this.data.length - 1;
        return result;
    };
    ImagesPopupComponent.prototype.isPreviousAvailable = function () {
        var result = this.index > 0;
        return result;
    };
    ImagesPopupComponent.prototype.getImagePath = function () {
        var result = '/api/image/' + this.data[this.index];
        return result;
    };
    ImagesPopupComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ImagesPopupComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(document.body, 'modal-open');
    };
    __decorate([
        HostListener('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ImagesPopupComponent.prototype, "handleKeyboardEvent", null);
    ImagesPopupComponent = __decorate([
        Component({
            selector: "imagesPopupComponent",
            templateUrl: "imagesPopup.component.html",
            styleUrls: ["imagesPopup.component.css"]
        }),
        __param(1, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef,
            Array,
            Renderer2])
    ], ImagesPopupComponent);
    return ImagesPopupComponent;
}());
export { ImagesPopupComponent };
//# sourceMappingURL=imagesPopup.component.js.map