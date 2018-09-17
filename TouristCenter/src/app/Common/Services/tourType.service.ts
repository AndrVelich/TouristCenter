import { Injectable } from "@angular/core";
import { Dictionary } from "@common/Types/Dictionary";

@Injectable()
export class TourTypeService{
    private tourTypes: Dictionary = new Dictionary();

    constructor() {
        this.FillTourTypes();
    }

    private FillTourTypes(){
        this.tourTypes.add('beach', 'Пляжный отдых');
        this.tourTypes.add('bus', 'Автобусные туры');
        this.tourTypes.add('corporate', 'Корпоративные туры');
        this.tourTypes.add('individual', 'Индивидуальные туры');
        this.tourTypes.add('newYear', 'Новогодние туры');
        this.tourTypes.add('skiing', 'Горнолыжные туры');
    }

    public GetTourTypes(){
      return this.tourTypes;
    }
}
