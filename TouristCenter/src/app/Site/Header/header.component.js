"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var HeaderComponent = (function () {
    function HeaderComponent(dialog) {
        this.dialog = dialog;
        this.isMobileMenuVisible = false;
    }
    HeaderComponent.prototype.toggleMenu = function () {
        this.isMobileMenuVisible = !this.isMobileMenuVisible;
    };
    HeaderComponent.prototype.onClickOutsideMobileMenu = function () {
        this.isMobileMenuVisible = false;
    };
    HeaderComponent.prototype.openOrderPopup = function () {
        var dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '250px',
            data: {}
        });
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "headerComponent",
        templateUrl: "header.component.html",
        animations: [
            core_1.trigger('slideInOut', [
                core_1.transition(':enter', [
                    core_1.style({ transform: 'translateY(-100%)' }),
                    core_1.animate('300ms ease-in', core_1.style({ transform: 'translateY(0%)' }))
                ]),
                core_1.transition(':leave', [
                    core_1.animate('300ms ease-in', core_1.style({ transform: 'translateY(-100%)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MatDialog !== "undefined" && material_1.MatDialog) === "function" && _a || Object])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
var DialogOverviewExampleDialog = (function () {
    function DialogOverviewExampleDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DialogOverviewExampleDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    return DialogOverviewExampleDialog;
}());
DialogOverviewExampleDialog = __decorate([
    core_1.Component({
        selector: 'dialog-overview-example-dialog',
        template: '<p>Popup</p>',
    }),
    __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [typeof (_b = typeof material_1.MatDialogRef !== "undefined" && material_1.MatDialogRef) === "function" && _b || Object, Object])
], DialogOverviewExampleDialog);
exports.DialogOverviewExampleDialog = DialogOverviewExampleDialog;
var _a, _b;
//# sourceMappingURL=header.component.js.map