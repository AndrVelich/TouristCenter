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
import { LoginService } from "@administrationCommon/Services/login.service";
import { Login } from "@administrationCommon/Services/login.service";
var LoginComponent = /** @class */ (function () {
    function LoginComponent(loginService, fb, router) {
        this.loginService = loginService;
        this.fb = fb;
        this.router = router;
        this.loginModel = new Login();
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loginService.login(this.loginModel)
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
    LoginComponent.prototype.buildForm = function () {
        this.loginForm = this.fb.group({
            "email": [this.loginModel.email, [
                    Validators.required
                ]],
            "password": [this.loginModel.password, [
                    Validators.required
                ]],
        });
    };
    LoginComponent = __decorate([
        Component({
            
            selector: "login",
            templateUrl: "login.component.html",
            styleUrls: ["login.component.css"]
        }),
        __metadata("design:paramtypes", [LoginService,
            FormBuilder,
            Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map