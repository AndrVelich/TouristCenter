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
import { Router } from '@angular/router';
import { RegisterService } from "@administrationCommon/Services/register.service";
import { Register } from "@administrationCommon/Services/register.service";
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(registerService, fb, router) {
        this.registerService = registerService;
        this.fb = fb;
        this.router = router;
        this.registerModel = new Register();
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.registerService.register(this.registerModel)
            //TODO need notifcation
            .subscribe(function (data) {
            if (data._body == 'success') {
                _this.router.navigate(['administration']);
            }
            else {
                _this.errorMessage = data;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    RegisterComponent.prototype.buildForm = function () {
        this.registerForm = this.fb.group({
            "email": [this.registerModel.email, [
                    Validators.required,
                    Validators.email
                ]],
            passwordGroup: this.fb.group({
                "password": [this.registerModel.password, [
                        Validators.required,
                        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).*$')
                    ]],
                "confirmPassword": ['', [
                        Validators.required,
                    ]],
            }, { validator: this.checkPasswords }),
        });
    };
    RegisterComponent.prototype.checkPasswords = function (group) {
        var pass = group.controls.password.value;
        var confirmPass = group.controls.confirmPassword.value;
        return pass === confirmPass ? null : { notSame: true };
    };
    RegisterComponent = __decorate([
        Component({
            selector: "register",
            templateUrl: "register.component.html",
            styleUrls: ["register.component.css"]
        }),
        __metadata("design:paramtypes", [RegisterService,
            FormBuilder,
            Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map