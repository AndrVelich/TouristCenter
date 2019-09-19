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
var BusToursComponent = /** @class */ (function () {
    function BusToursComponent(titleService, metaService, dialog) {
        this.titleService = titleService;
        this.metaService = metaService;
        this.dialog = dialog;
    }
    BusToursComponent.prototype.ngOnInit = function () {
        this.setTitleAndMeta();
    };
    BusToursComponent.prototype.setTitleAndMeta = function () {
        this.titleService.setTitle("Европа: автобусные туры и экскурсии из Минска");
        this.metaService.updateTag({ name: 'description', content: "➤Автобусные туры в Европу по 47 направлениям! Экскурсионные маршруты 2020 из Минска и других городов. ➤Каталог из 3 857 предложений здесь➥" });
        this.metaService.updateTag({ name: 'keywords', content: "автобусные туры, автобусные туры из Минска, автобусные туры по Европе, туры по Европе, туры выходного дня, экскурсии, маршруты, тур на автобусе" });
    };
    BusToursComponent.prototype.openOrderPopup = function (button) {
        var dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    };
    BusToursComponent = __decorate([
        Component({
            selector: "busToursComponent",
            templateUrl: "busTours.component.html",
            styleUrls: ["busTours.component.css"]
        }),
        __metadata("design:paramtypes", [Title,
            Meta,
            MatDialog])
    ], BusToursComponent);
    return BusToursComponent;
}());
export { BusToursComponent };
//# sourceMappingURL=busTours.component.js.map