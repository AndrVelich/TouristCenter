var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@angular/core";
var PreloaderService = /** @class */ (function () {
    function PreloaderService() {
        this.isInProgress = false;
    }
    PreloaderService.prototype.isPreloaderInProgress = function () {
        return this.isInProgress;
    };
    PreloaderService.prototype.startPreloader = function () {
        this.isInProgress = true;
        //var bodyContentClassList = document.getElementsByClassName("preloader");
        //if(!bodyContentClassList.contains("preloader"))
        //{
        //   bodyContentClassList.add("preloader");
        //}
    };
    PreloaderService.prototype.finishPreloader = function () {
        this.isInProgress = false;
        //document.getElementsByClassName("body-content")[0].classList.remove("preloader");
    };
    PreloaderService = __decorate([
        Injectable()
    ], PreloaderService);
    return PreloaderService;
}());
export { PreloaderService };
//# sourceMappingURL=preloader.service.js.map