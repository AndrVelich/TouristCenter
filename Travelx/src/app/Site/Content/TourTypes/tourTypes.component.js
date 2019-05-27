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
var TourTypesComponent = /** @class */ (function () {
    function TourTypesComponent(dialog, titleService, metaService) {
        this.dialog = dialog;
        this.titleService = titleService;
        this.metaService = metaService;
    }
    TourTypesComponent.prototype.ngOnInit = function () {
        this.setTitleAndMeta();
    };
    TourTypesComponent.prototype.openOrderPopup = function (button) {
        var dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    };
    TourTypesComponent.prototype.setTitleAndMeta = function () {
        this.titleService.setTitle("Поиск и подбор туров в Минске");
        this.metaService.addTag({ name: 'description', content: "➤ Поиск и подбор тура. ➤Вылеты из Минска/ Москвы/ Киева. ➤Отдых на море, автобусные маршруты, авиатуры в Европу и пр." });
        this.metaService.addTag({ name: 'keywords', content: "туры из Минска, подбор тура, поиск тура, виды туров" });
    };
    TourTypesComponent = __decorate([
        Component({
            
            selector: "tourTypes",
            templateUrl: "tourTypes.component.html",
            styleUrls: ["tourTypes.component.css"]
        }),
        __metadata("design:paramtypes", [MatDialog,
            Title,
            Meta])
    ], TourTypesComponent);
    return TourTypesComponent;
}());
export { TourTypesComponent };
//# sourceMappingURL=tourTypes.component.js.map