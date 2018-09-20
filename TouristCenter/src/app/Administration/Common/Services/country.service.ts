import { Injectable } from "@angular/core";
import { Dictionary } from "@common/Types/Dictionary";

@Injectable()
export class CountryService{
    private countries: Dictionary = new Dictionary();

    constructor() {
        this.FillTourTypes();
    }

    private FillTourTypes(){
        this.countries.add('bali', 'Бали');
        this.countries.add('Greece', 'Греция');
        this.countries.add('corporate', 'Испания');
        this.countries.add('individual', 'Индия');
        this.countries.add('newYear', 'Морокко');
        this.countries.add('skiing', 'Мексика');
    }

    public GetCountries(){
      return this.countries;
    }
}
