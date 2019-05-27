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
import { MatDialog } from '@angular/material';
import { Title, Meta } from '@angular/platform-browser';
import { OrderComponent } from "@siteCommon/Components/Order/order.component";
var ContactsComponent = /** @class */ (function () {
    function ContactsComponent(dialog, titleService, metaService) {
        this.dialog = dialog;
        this.titleService = titleService;
        this.metaService = metaService;
    }
    ContactsComponent.prototype.ngOnInit = function () {
        this.setTitleAndMeta();
    };
    ContactsComponent.prototype.openOrderPopup = function () {
        var dialogRef = this.dialog.open(OrderComponent);
    };
    ContactsComponent.prototype.setTitleAndMeta = function () {
        this.titleService.setTitle("Контакты | «Travel X» на карте, адрес и телефоны компании, электронная почта, где находится и как лучше доехать до турфирмы. ");
        this.metaService.addTag({ name: 'description', content: "➤ Контакты «Travel X»: телефоны, e-mail, адрес. ➤Как нас найти, как добраться, как пройти. Посмотреть на карте где находится компания. ➥" });
        this.metaService.addTag({ name: 'keywords', content: ": контакты, телефоны, адрес компании, организации, электронная почта, как доехать, как пройти, где находится, как связаться, тревел х на карте" });
    };
    ContactsComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: "contacts",
            templateUrl: "contacts.component.html",
            styleUrls: ["contacts.component.css"]
        }),
        __metadata("design:paramtypes", [MatDialog,
            Title,
            Meta])
    ], ContactsComponent);
    return ContactsComponent;
}());
export { ContactsComponent };
//# sourceMappingURL=contacts.component.js.map