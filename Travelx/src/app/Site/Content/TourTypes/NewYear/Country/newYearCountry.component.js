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
var NewYearCountryComponent = /** @class */ (function () {
    function NewYearCountryComponent(titleService, metaService) {
        this.titleService = titleService;
        this.metaService = metaService;
    }
    NewYearCountryComponent.prototype.ngOnInit = function () {
        this.setTitleAndMeta();
    };
    NewYearCountryComponent.prototype.setTitleAndMeta = function () {
        this.titleService.setTitle("Новогодние туры");
        this.metaService.addTag({ name: 'description', content: "Новогодние туры" });
    };
    NewYearCountryComponent = __decorate([
        Component({
            selector: "newYearCountry",
            templateUrl: "newYearCountry.component.html",
            styleUrls: ["newYearCountry.component.css"]
        }),
        __metadata("design:paramtypes", [Title,
            Meta])
    ], NewYearCountryComponent);
    return NewYearCountryComponent;
}());
export { NewYearCountryComponent };
//# sourceMappingURL=newYearCountry.component.js.map