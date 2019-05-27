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
import { Dictionary } from "@common/Types/Dictionary";
var TourTypeService = /** @class */ (function () {
    function TourTypeService() {
        this.tourTypes = new Dictionary();
        this.FillTourTypes();
    }
    TourTypeService.prototype.FillTourTypes = function () {
        this.tourTypes.add('beach', 'Пляжный отдых');
        this.tourTypes.add('corporate', 'Корпоративные туры');
        this.tourTypes.add('individual', 'Индивидуальные туры');
        this.tourTypes.add('newYear', 'Новогодние туры');
        this.tourTypes.add('skiing', 'Горнолыжные туры');
    };
    TourTypeService.prototype.GetTourTypes = function () {
        return this.tourTypes;
    };
    TourTypeService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], TourTypeService);
    return TourTypeService;
}());
export { TourTypeService };
//# sourceMappingURL=tourType.service.js.map