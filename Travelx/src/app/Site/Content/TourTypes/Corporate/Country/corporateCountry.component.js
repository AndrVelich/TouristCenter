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
var CorporateCountryComponent = /** @class */ (function () {
    function CorporateCountryComponent(titleService, metaService) {
        this.titleService = titleService;
        this.metaService = metaService;
    }
    CorporateCountryComponent.prototype.ngOnInit = function () {
        this.setTitleAndMeta();
    };
    CorporateCountryComponent.prototype.setTitleAndMeta = function () {
        this.titleService.setTitle("Корпоративные туры");
        this.metaService.addTag({ name: 'description', content: "Корпоративные туры" });
    };
    CorporateCountryComponent = __decorate([
        Component({
            
            selector: "corporateCountry",
            templateUrl: "corporateCountry.component.html",
            styleUrls: ["corporateCountry.component.css"]
        }),
        __metadata("design:paramtypes", [Title,
            Meta])
    ], CorporateCountryComponent);
    return CorporateCountryComponent;
}());
export { CorporateCountryComponent };
//# sourceMappingURL=corporateCountry.component.js.map