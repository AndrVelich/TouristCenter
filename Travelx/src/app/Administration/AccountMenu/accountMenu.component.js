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
import { AccountService } from "@administrationCommon/Services/account.service";
var AccountMenuComponent = /** @class */ (function () {
    function AccountMenuComponent(accountService) {
        this.accountService = accountService;
    }
    AccountMenuComponent.prototype.ngOnInit = function () {
        this.getCurrentUser();
    };
    AccountMenuComponent.prototype.getCurrentUser = function () {
        var _this = this;
        this.accountService.getCurrentUser()
            .subscribe(function (user) { return _this.currentUser = user; });
    };
    AccountMenuComponent = __decorate([
        Component({
            selector: "accountMenu",
            templateUrl: "accountMenu.component.html",
            styleUrls: ["accountMenu.component.css"]
        }),
        __metadata("design:paramtypes", [AccountService])
    ], AccountMenuComponent);
    return AccountMenuComponent;
}());
export { AccountMenuComponent };
//# sourceMappingURL=accountMenu.component.js.map