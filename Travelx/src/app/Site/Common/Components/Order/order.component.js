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
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { OrderService, Order } from "@siteCommon/Services/order.service";
var OrderComponent = /** @class */ (function () {
    function OrderComponent(dialogRef, data, renderer, fb, service, router) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.renderer = renderer;
        this.fb = fb;
        this.service = service;
        this.router = router;
        this.order = new Order();
        this.showConfirmMessage = false;
        this.isPreloaderInProgress = false;
        this.mask = ['8', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
        this.renderer.addClass(document.body, 'modal-open');
    }
    OrderComponent.prototype.ngOnInit = function () {
        this.buildForm();
        this.order.url = this.router.url;
        this.order.tourOrButton = this.data;
    };
    OrderComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    OrderComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(document.body, 'modal-open');
    };
    OrderComponent.prototype.saveOrder = function () {
        var _this = this;
        if (this.orderForm.valid) {
            this.isPreloaderInProgress = true;
            this.service.addOrder(this.order)
                .subscribe(function () {
                _this.showConfirmMessage = true;
                _this.isPreloaderInProgress = false;
            }, function (error) { return _this.errorMessage = error; });
            //this.dialogRef.close()
        }
        else {
            this.validateAllFormFields(this.orderForm);
        }
    };
    OrderComponent.prototype.buildForm = function () {
        this.orderForm = this.fb.group({
            "name": [this.order.name, [
                    Validators.required
                ]],
            "phone": [this.order.phone, [
                    Validators.required,
                    Validators.pattern('^[0-9() -]+$')
                ]],
            "description": [this.order.description]
        });
    };
    //TODO move to the service
    OrderComponent.prototype.validateAllFormFields = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsDirty({ onlySelf: true });
            }
            else if (control instanceof FormGroup) {
                _this.validateAllFormFields(control);
            }
        });
    };
    OrderComponent = __decorate([
        Component({
            selector: "orderComponent",
            templateUrl: "order.component.html",
            styleUrls: ["order.component.css"],
            providers: [OrderService]
        }),
        __param(1, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef, String, Renderer2,
            FormBuilder,
            OrderService,
            Router])
    ], OrderComponent);
    return OrderComponent;
}());
export { OrderComponent };
//# sourceMappingURL=order.component.js.map