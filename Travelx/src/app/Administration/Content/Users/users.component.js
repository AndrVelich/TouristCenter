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
import { PageOptions } from "@common/Services/pager.service";
import { PreloaderService } from "@common/Services/preloader.service";
import { AccountService } from "@administrationCommon/Services/account.service";
import { PagerComponent } from "@administrationCommon/Components/Pager/pager.component";
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";
var UsersComponent = /** @class */ (function () {
    function UsersComponent(dialog, accountService, preloaderService) {
        this.dialog = dialog;
        this.accountService = accountService;
        this.preloaderService = preloaderService;
        this.userCollection = new Array();
        this.pageOptions = new PageOptions(0, 20, 5);
    }
    UsersComponent.prototype.ngOnInit = function () {
    };
    UsersComponent.prototype.openDeleteConfirmation = function (user) {
        var _this = this;
        this.dialog.open(ConfirmationPopupComponent, {
            data: 'Вы уверены, что хототе удалить пользователя <b>' + user.email + '</b>?'
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                _this.preloaderService.startPreloader();
                _this.accountService.deleteUser(user.userId)
                    .subscribe(function () { return _this.getUsersPage(_this.pageOptions); }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
            }
        });
    };
    UsersComponent.prototype.openActivateConfirmation = function (user) {
        var _this = this;
        this.dialog.open(ConfirmationPopupComponent, {
            data: 'Вы уверены, что хототе активировать пользователя <b>' + user.email + '</b>?'
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                _this.preloaderService.startPreloader();
                _this.accountService.confirmEmailUser(user.email)
                    .subscribe(function () { return _this.getUsersPage(_this.pageOptions); }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
            }
        });
    };
    UsersComponent.prototype.openEnableNotifyConfirmation = function (user) {
        var _this = this;
        this.dialog.open(ConfirmationPopupComponent, {
            data: 'Вы уверены, что хототе активировать уведомления по заявкам для пользователя <b>' + user.email + '</b>?'
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                user.notificationEnabled = true;
                _this.preloaderService.startPreloader();
                _this.accountService.updateUser(user)
                    .subscribe(function () { return _this.getUsersPage(_this.pageOptions); }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
            }
        });
    };
    UsersComponent.prototype.openDisableNotifyConfirmation = function (user) {
        var _this = this;
        this.dialog.open(ConfirmationPopupComponent, {
            data: 'Вы уверены, что хототе отключить уведомления по заявкам для пользователя <b>' + user.email + '</b>?'
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                user.notificationEnabled = false;
                _this.preloaderService.startPreloader();
                _this.accountService.updateUser(user)
                    .subscribe(function () { return _this.getUsersPage(_this.pageOptions); }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
            }
        });
    };
    UsersComponent.prototype.getUsersPage = function (pageOptions) {
        var _this = this;
        this.preloaderService.startPreloader();
        this.pageOptions = pageOptions;
        this.accountService.getUsersPage(pageOptions.skip, pageOptions.take)
            .subscribe(function (data) {
            _this.userCollection = data.collection;
            _this.pagerComponent.updatePager(data.count);
        }, function (error) { return _this.errorMessage = error; }, function () { return _this.preloaderService.finishPreloader(); });
    };
    __decorate([
        ViewChild(PagerComponent, { static: false }),
        __metadata("design:type", PagerComponent)
    ], UsersComponent.prototype, "pagerComponent", void 0);
    UsersComponent = __decorate([
        Component({
            selector: "users",
            templateUrl: "users.component.html",
            styleUrls: ["users.component.css"]
        }),
        __metadata("design:paramtypes", [MatDialog,
            AccountService,
            PreloaderService])
    ], UsersComponent);
    return UsersComponent;
}());
export { UsersComponent };
//# sourceMappingURL=users.component.js.map