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
import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { Title, Meta } from '@angular/platform-browser';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(dialog, titleService, metaService) {
        this.dialog = dialog;
        this.titleService = titleService;
        this.metaService = metaService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.setTitleAndMeta();
    };
    HomeComponent.prototype.openOrderPopup = function (button) {
        var dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    };
    HomeComponent.prototype.setTitleAndMeta = function () {
        this.titleService.setTitle("Турфирма в Минске| Центр организации отдыха «Travel X»");
        this.metaService.addTag({ name: 'description', content: "➤Турфирма «Travel X» в Минске. ➤Поиск по 9.430 турам. ➤Актуальные цены от 96$. ➤Организация отдыха «под ключ». Заходите на сайт и выбирайте путёвку! ➥" });
        this.metaService.addTag({ name: 'keywords', content: "турфирма Минск, поиск тура, турагентство Минск, туристическая фирма, трэвел х, трэвел икс, тревел х, тревел икс, турфирма, турагентство, туристическая компания, надежная турфирма" });
    };
    HomeComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: "home",
            templateUrl: "home.component.html",
            styleUrls: ["home.component.css"]
        }),
        __metadata("design:paramtypes", [MatDialog,
            Title,
            Meta])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map