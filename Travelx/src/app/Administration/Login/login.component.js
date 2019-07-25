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
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from "@administrationCommon/Services/login.service";
import { Login } from "@administrationCommon/Services/login.service";
var LoginComponent = /** @class */ (function () {
    function LoginComponent(loginService, fb, activatedRoute, router) {
        this.loginService = loginService;
        this.fb = fb;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.loginModel = new Login();
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.buildForm();
        this.setReturnUrl();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loginService.login(this.loginModel)
            .subscribe(function (result) {
            if (result.isSuccess) {
                if (_this.redirectUrl) {
                    _this.router.navigateByUrl(_this.redirectUrl);
                }
                else {
                    _this.router.navigate(['administration']);
                }
            }
            else {
                if (result.errorMessage === "lockedOut") {
                    _this.errorMessage = "User is locked. Try to login later";
                }
                else {
                    _this.errorMessage = "User name or password is incorrect";
                }
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
            "rememberMe": [this.loginModel.rememberMe]
        });
    };
    LoginComponent.prototype.setReturnUrl = function () {
        this.redirectUrl = this.activatedRoute.snapshot.queryParams['ReturnUrl'];
    };
    LoginComponent = __decorate([
        Component({
            selector: "login",
            templateUrl: "login.component.html",
            styleUrls: ["login.component.css"]
        }),
        __metadata("design:paramtypes", [LoginService,
            FormBuilder,
            ActivatedRoute,
            Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map