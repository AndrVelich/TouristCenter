
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {map, catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Dictionary } from "@common/Types/Dictionary";
import { Http, Response } from "@angular/http";
//import {Observable} from 'rxjs/Rx';



@Injectable()
export class CountryService{
    private url: string = '/api/country';
    private countries: Dictionary = new Dictionary();

    constructor(private http: Http) 
    {
        
    }

    public getCountryCollection(tourType?: string): Observable<Country[]>{
        return this.http.get('api/countries/' + (tourType || '')).pipe(
            map((res: Response) => <Country[]>res.json()),
            catchError(this.handleError),);
    }

    public getCountry(tourType: string, countryUrlName: string): Observable<Country>{
        return this.http.get('api/country/' + tourType + '/' + countryUrlName).pipe(
            map((res: Response) => <Country>res.json()),
            catchError(this.handleError),);
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

        return observableThrowError(message);
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
    public pageHeader : string
    public title : string
    public pageContent : string
    public pageContentBottom : string
    public metaDescription : string
    public metaKeywords : string
    public newImageCollection : string[]
    public oldImageCollection : number[]

    constructor()
    {
       this.newImageCollection = new Array<string>();
       this.oldImageCollection = new Array<number>();
    }
}
