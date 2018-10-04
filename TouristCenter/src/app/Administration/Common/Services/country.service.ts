import { Injectable } from "@angular/core";
import { Dictionary } from "@common/Types/Dictionary";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
//import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CountryService{
    private url: string = '/api/country';
    private countries: Dictionary = new Dictionary();

    constructor(private http: Http) 
    {
        
    }

    public GetCountries(){
        
        this.countries.add('bali', 'Бали');
        this.countries.add('greece', 'Греция');
        this.countries.add('corporate', 'Испания');
        this.countries.add('individual', 'Индия');
        this.countries.add('newYear', 'Морокко');
        this.countries.add('skiing', 'Мексика');

        return this.countries;
    }

    public getCountryCollection(tourType?: string): Observable<Country[]>{
        return this.http.get('api/countries/' + (tourType || ''))
            .map((res: Response) => <Country[]>res.json())
            .catch(this.handleError);
    }

    public getCountry(tourType: string, countryUrlName: string): Observable<Country>{
        return this.http.get('api/country/' + tourType + '/' + countryUrlName)
            .map((res: Response) => <Country>res.json())
            .catch(this.handleError);
    }

    public addCountry(country){
        return this.http.post(this.url, country)
            .catch(this.handleError);
    }

    private handleError(error: any, cought: Observable<any>): any 
    {
        let message = "";

        if (error instanceof Response) {
            let errorData = error.json().error || JSON.stringify(error.json());
            message = `${error.status} - ${error.statusText || ''} ${errorData}`
        } else {
            message = error.message ? error.message : error.toString();
        }

        console.error(message);

        return Observable.throw(message);
    }
}

export class Country{
    public countryId : number
    public name : string
    public urlName : string
    public category : string
    public threeStarsPrice : number
    public fourStarsPrice : number
    public fiveStarsPrice : number
    public description : string
    public pageContent : string
    public newImageCollection : string[]
    public oldImageCollection : number[]

    constructor()
    {
       this.newImageCollection = new Array<string>();
       this.oldImageCollection = new Array<number>();
    }
}
