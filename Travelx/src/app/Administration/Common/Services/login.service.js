var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
var LoginService = /** @class */ (function () {
    function LoginService(http) {
        this.http = http;
        this.url = '/api/account/login';
    }
    LoginService.prototype.login = function (login) {
        return this.http.post(this.url, login).pipe(map(function (res) { return res.json(); }), catchError(this.handleError));
    };
    LoginService.prototype.handleError = function (error, cought) {
        var message = "";
        if (error instanceof Response) {
            var errorData = error.json().error || JSON.stringify(error.json());
            message = error.status + " - " + (error.statusText || '') + " " + errorData;
        }
        else {
            message = error.message ? error.message : error.toString();
        }
        console.error(message);
        return observableThrowError(message);
    };
    LoginService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], LoginService);
    return LoginService;
}());
export { LoginService };
var Login = /** @class */ (function () {
    function Login() {
    }
    return Login;
}());
export { Login };
//# sourceMappingURL=login.service.js.map