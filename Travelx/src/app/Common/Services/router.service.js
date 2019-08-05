var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
var RouterService = /** @class */ (function () {
    function RouterService(router, activatedRoute) {
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    RouterService.prototype.updateQueryParams = function (newParameters) {
        var _this = this;
        setTimeout(function () {
            _this.changeQueryParams(newParameters);
        });
    };
    RouterService.prototype.changeQueryParams = function (newParameters) {
        var queryParams = this.activatedRoute.snapshot.queryParams;
        var resultParams = Object.assign({}, queryParams, newParameters);
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: resultParams,
            queryParamsHandling: 'merge',
        });
    };
    RouterService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router,
            ActivatedRoute])
    ], RouterService);
    return RouterService;
}());
export { RouterService };
//# sourceMappingURL=router.service.js.map