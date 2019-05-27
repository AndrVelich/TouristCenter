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
import { PreloaderService } from "@common/Services/preloader.service";
var SiteComponent = /** @class */ (function () {
    function SiteComponent(preloaderService) {
        this.preloaderService = preloaderService;
    }
    SiteComponent.prototype.isPreloaderInProgress = function () {
        var result = this.preloaderService.isPreloaderInProgress();
        return result;
    };
    SiteComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: "siteComponent",
            templateUrl: "site.component.html",
            styleUrls: ["site.component.css"],
        }),
        __metadata("design:paramtypes", [PreloaderService])
    ], SiteComponent);
    return SiteComponent;
}());
export { SiteComponent };
//# sourceMappingURL=site.component.js.map