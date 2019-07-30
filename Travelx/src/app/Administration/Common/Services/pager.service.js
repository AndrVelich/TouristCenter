var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@angular/core";
var PagerService = /** @class */ (function () {
    function PagerService() {
    }
    PagerService.prototype.GetPager = function (totalItems, pageOptions) {
        var pagerLength = pageOptions.pagerLength;
        var floorHalfLength = Math.floor(pagerLength / 2);
        var pager = new Pager();
        pager.currentPage = Math.ceil(pageOptions.skip / pageOptions.take) + 1;
        pager.totalPages = Math.ceil(totalItems / pageOptions.take);
        if (pager.totalPages <= pagerLength) {
            pager.startPage = 1;
            pager.endPage = pager.totalPages;
        }
        else {
            if (pager.currentPage + floorHalfLength >= pager.totalPages) {
                pager.startPage = pager.totalPages - pagerLength + 1;
                pager.endPage = pager.totalPages;
            }
            else {
                if (pager.currentPage - floorHalfLength < 0) {
                    pager.startPage = 1;
                    pager.endPage = pagerLength;
                }
                else if (this.isEven(pagerLength)) {
                    pager.startPage = pager.currentPage - floorHalfLength + 1;
                    pager.endPage = pager.currentPage + floorHalfLength;
                }
                else {
                    pager.startPage = pager.currentPage - floorHalfLength;
                    pager.endPage = pager.currentPage + floorHalfLength;
                }
            }
        }
        pager.pages = this.getPagesArray(pager);
        return pager;
    };
    PagerService.prototype.getPagesArray = function (pager) {
        var emptyPageArray = new Array(pager.endPage - pager.startPage + 1);
        emptyPageArray = emptyPageArray.fill(0);
        var result = emptyPageArray.map(function (x, i) { return pager.startPage + i; });
        return result;
    };
    PagerService.prototype.isEven = function (n) {
        return n % 2 == 0;
    };
    PagerService = __decorate([
        Injectable()
    ], PagerService);
    return PagerService;
}());
export { PagerService };
var Pager = /** @class */ (function () {
    function Pager() {
    }
    return Pager;
}());
export { Pager };
;
var PageOptions = /** @class */ (function () {
    function PageOptions(skip, take, pagerLength) {
        this.skip = skip;
        this.take = take;
        this.pagerLength = pagerLength;
    }
    return PageOptions;
}());
export { PageOptions };
//# sourceMappingURL=pager.service.js.map