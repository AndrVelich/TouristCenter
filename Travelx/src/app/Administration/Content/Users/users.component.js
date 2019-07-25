var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { MatDialog } from '@angular/material';
import { AccountService } from "@administrationCommon/Services/account.service";
import { PageOptions } from "@administrationCommon/Services/pager.service";
import { PagerComponent } from "@administrationCommon/Components/Pager/pager.component";
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";
var usersComponent = /** @class */ (function () {
    function usersComponent(dialog, accountService) {
        this.dialog = dialog;
        this.accountService = accountService;
        this.userCollection = new Array();
        this.pageOptions = new PageOptions(0, 20);
    }
    usersComponent.prototype.ngOnInit = function () {
    };
    usersComponent.prototype.openDeleteConfirmation = function (user) {
        var _this = this;
        this.dialog.open(ConfirmationPopupComponent, {
            data: 'Вы уверены, что хототе удалить пользователя <b>' + user.email + '</b>?'
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                _this.accountService.deleteUser(user.userId)
                    .subscribe(function () { return _this.getUsersPage(_this.pageOptions); });
            }
        });
    };
    usersComponent.prototype.getUsersPage = function (pageOptions) {
        var _this = this;
        this.pageOptions = pageOptions;
        this.accountService.getUsersPage(pageOptions.skip, pageOptions.take)
            .subscribe(function (data) {
            _this.userCollection = data.userCollection;
            _this.pagerComponent.updatePager(data.usersCount);
        });
    };
    __decorate([
        ViewChild(PagerComponent, { static: false }),
        __metadata("design:type", PagerComponent)
    ], usersComponent.prototype, "pagerComponent", void 0);
    usersComponent = __decorate([
        Component({
            selector: "users",
            templateUrl: "users.component.html"
        }),
        __metadata("design:paramtypes", [MatDialog,
            AccountService])
    ], usersComponent);
    return usersComponent;
}());
export { usersComponent };
//# sourceMappingURL=users.component.js.map