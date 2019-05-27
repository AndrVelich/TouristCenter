var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
var CountryShortListComponent = /** @class */ (function () {
    function CountryShortListComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CountryShortListComponent.prototype, "countryCollection", void 0);
    CountryShortListComponent = __decorate([
        Component({
            
            selector: "countryShortListComponent",
            templateUrl: "countryShortList.component.html",
            styleUrls: ["countryShortList.component.css"]
        })
    ], CountryShortListComponent);
    return CountryShortListComponent;
}());
export { CountryShortListComponent };
//# sourceMappingURL=countryShortList.component.js.map