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
import { Title, Meta } from '@angular/platform-browser';
var BeachCountryComponent = /** @class */ (function () {
    function BeachCountryComponent(titleService, metaService) {
        this.titleService = titleService;
        this.metaService = metaService;
    }
    BeachCountryComponent.prototype.ngOnInit = function () {
        this.setTitleAndMeta();
    };
    BeachCountryComponent.prototype.setTitleAndMeta = function () {
        this.titleService.setTitle("Пляжный отдых");
        this.metaService.addTag({ name: 'description', content: "Пляжный отдых" });
    };
    BeachCountryComponent = __decorate([
        Component({
            selector: "beachCountry",
            templateUrl: "beachCountry.component.html",
            styleUrls: ["beachCountry.component.css"]
        }),
        __metadata("design:paramtypes", [Title,
            Meta])
    ], BeachCountryComponent);
    return BeachCountryComponent;
}());
export { BeachCountryComponent };
//# sourceMappingURL=beachCountry.component.js.map