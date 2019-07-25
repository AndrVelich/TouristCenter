var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Output, Input } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService, PageOptions } from "@administrationCommon/Services/pager.service";
var PagerComponent = /** @class */ (function () {
    function PagerComponent(pagerService, activeRoute, router) {
        this.pagerService = pagerService;
        this.activeRoute = activeRoute;
        this.router = router;
        this.setPageEvent = new EventEmitter();
    }
    PagerComponent.prototype.ngOnInit = function () {
        this.getPageOptionsFromUrl();
        this.GetPageData();
    };
    PagerComponent.prototype.updatePager = function (count) {
        this.pager = this.pagerService.GetPager(count, this.pageOptions);
    };
    PagerComponent.prototype.setPage = function (page) {
        if (page > 0 && page <= this.pager.totalPages) {
            this.pageOptions.skip = (page - 1) * this.pageOptions.take;
            this.setPageOptionsToUrl();
            this.GetPageData();
        }
    };
    PagerComponent.prototype.GetPageData = function () {
        this.setPageEvent.emit(this.pageOptions);
    };
    PagerComponent.prototype.getPageOptionsFromUrl = function () {
        var queryParams = this.activeRoute.snapshot.queryParams;
        if (queryParams) {
            var skip = parseInt(queryParams.skip);
            var take = parseInt(queryParams.take);
            //CHECK THIS!!!
            if (!isNaN(skip)) {
                this.pageOptions.skip = skip;
            }
            if (!isNaN(take)) {
                this.pageOptions.take = take;
            }
        }
    };
    PagerComponent.prototype.setPageOptionsToUrl = function () {
        this.router.navigate([], {
            relativeTo: this.activeRoute,
            queryParams: this.pageOptions,
            queryParamsHandling: 'merge',
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", PageOptions)
    ], PagerComponent.prototype, "pageOptions", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PagerComponent.prototype, "setPageEvent", void 0);
    PagerComponent = __decorate([
        Component({
            selector: "pagerComponent",
            templateUrl: "pager.component.html"
        }),
        __metadata("design:paramtypes", [PagerService,
            ActivatedRoute,
            Router])
    ], PagerComponent);
    return PagerComponent;
}());
export { PagerComponent };
//# sourceMappingURL=pager.component.js.map