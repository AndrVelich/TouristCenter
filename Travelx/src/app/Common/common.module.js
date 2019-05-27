var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { ClickOutsideDirective } from "./Directives/clickOutside.directive";
import { TourTypeService } from "./Services/tourType.service";
import { PreloaderService } from "./Services/preloader.service";
var CommonModule = /** @class */ (function () {
    function CommonModule() {
    }
    CommonModule = __decorate([
        NgModule({
            imports: [],
            entryComponents: [],
            providers: [
                TourTypeService,
                PreloaderService,
            ],
            declarations: [
                ClickOutsideDirective
            ],
            exports: [
                ClickOutsideDirective,
            ]
        })
    ], CommonModule);
    return CommonModule;
}());
export { CommonModule };
//# sourceMappingURL=common.module.js.map