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
        var pager = new Pager();
        //CHECK!!!
        pager.currentPage = Math.ceil(pageOptions.skip / pageOptions.take) + 1;
        pager.totalPages = Math.ceil(totalItems / pageOptions.take);
        if (pager.totalPages <= pageOptions.take) {
            pager.startPage = 1;
            pager.endPage = pager.totalPages;
        }
        else {
            if (pager.currentPage <= 6) {
                pager.startPage = 1;
                pager.endPage = 10;
            }
            else if (pager.currentPage + 4 >= pager.totalPages) {
                pager.startPage = pager.totalPages - 9;
                pager.endPage = pager.totalPages;
            }
            else {
                pager.startPage = pager.currentPage - 5;
                pager.endPage = pager.currentPage + 4;
            }
        }
        // calculate start and end item indexes
        pager.startIndex = (pager.currentPage - 1) * pageOptions.take;
        pager.endIndex = Math.min(pager.startIndex + pageOptions.take - 1, totalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        pager.pages = new Array(pager.endPage - pager.startPage + 1).fill(0).map(function (x, i) { return i + 1; });
        // return object with all pager properties required by the view
        return pager;
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
    function PageOptions(skip, take) {
        this.skip = skip;
        this.take = take;
    }
    return PageOptions;
}());
export { PageOptions };
//# sourceMappingURL=pager.service.js.map