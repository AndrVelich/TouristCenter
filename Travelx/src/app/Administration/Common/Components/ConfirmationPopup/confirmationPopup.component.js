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
import { Component, Inject, Renderer2 } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
var ConfirmationPopupComponent = /** @class */ (function () {
    function ConfirmationPopupComponent(dialogRef, data, renderer) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.renderer = renderer;
        this.renderer.addClass(document.body, 'modal-open');
    }
    ConfirmationPopupComponent.prototype.ngOnInit = function () {
    };
    ConfirmationPopupComponent.prototype.cancel = function () {
        this.dialogRef.close(false);
    };
    ConfirmationPopupComponent.prototype.confirm = function () {
        this.dialogRef.close(true);
    };
    ConfirmationPopupComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(document.body, 'modal-open');
    };
    ConfirmationPopupComponent = __decorate([
        Component({
            selector: "confirmationPopupComponent",
            templateUrl: "confirmationPopup.component.html",
            styleUrls: ["confirmationPopup.component.css"]
        }),
        __param(1, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef,
            Array,
            Renderer2])
    ], ConfirmationPopupComponent);
    return ConfirmationPopupComponent;
}());
export { ConfirmationPopupComponent };
//# sourceMappingURL=confirmationPopup.component.js.map