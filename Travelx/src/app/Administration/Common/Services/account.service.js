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
import { map, catchError } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
var AccountService = /** @class */ (function () {
    function AccountService(http) {
        this.http = http;
        this.url = '/api/account/';
    }
    AccountService.prototype.getUsersPage = function (skip, take) {
        return this.http.get(this.url + 'usersPage/' + skip + '/' + take).pipe(map(function (res) { return res.json(); }), catchError(this.handleError));
    };
    AccountService.prototype.deleteUser = function (userId) {
        return this.http.delete(this.url + 'user/' + userId).pipe(catchError(this.handleError));
    };
    AccountService.prototype.handleError = function (error, cought) {
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
    AccountService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], AccountService);
    return AccountService;
}());
export { AccountService };
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
export { User };
var UsersPage = /** @class */ (function () {
    function UsersPage() {
    }
    return UsersPage;
}());
export { UsersPage };
//# sourceMappingURL=account.service.js.map