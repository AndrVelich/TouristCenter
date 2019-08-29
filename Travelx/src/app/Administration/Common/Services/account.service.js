var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
var AccountService = /** @class */ (function () {
    function AccountService(httpClient) {
        this.httpClient = httpClient;
        this.url = '/api/account/';
    }
    AccountService.prototype.getCurrentUser = function () {
        return this.httpClient.get(this.url + 'currentuser/');
    };
    AccountService.prototype.getUsersPage = function (skip, take) {
        return this.httpClient.get(this.url + 'usersPage/' + skip + '/' + take);
    };
    AccountService.prototype.updateUser = function (user) {
        return this.httpClient.put(this.url + 'user/', user);
    };
    AccountService.prototype.confirmEmailUser = function (email) {
        var headerOptions = new HttpHeaders();
        headerOptions.set('Content-Type', 'application/json');
        return this.httpClient.put(this.url + 'confirm/', email, { headers: headerOptions });
    };
    AccountService.prototype.deleteUser = function (userId) {
        return this.httpClient.delete(this.url + 'user/' + userId);
    };
    AccountService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
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
//# sourceMappingURL=account.service.js.map