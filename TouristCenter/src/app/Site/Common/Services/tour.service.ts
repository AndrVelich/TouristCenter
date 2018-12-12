
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {map, catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Dictionary } from "@common/Types/Dictionary";
import { Http, Response } from "@angular/http";
//import {Observable} from 'rxjs/Rx';



@Injectable()
export class TourService{
    private countries: Dictionary = new Dictionary();
    private url: string = 'api/tour/';

    constructor(private http: Http) 
    {
        
    }

    public getTourCollection(tourType: string, country?: string): Observable<Tour[]>{
        return this.http.get('api/tours/' + tourType + '/' + (country || '')).pipe(
            map((res: Response) => <Tour[]>res.json()),
            catchError(this.handleError),);
    }

    public getAllTourCollection(): Observable<Tour[]>{
        return this.http.get('api/tours/allTours').pipe(
            map((res: Response) => <Tour[]>res.json()),
            catchError(this.handleError),);
    }

    public getTour(tourType: string, countryUrlName: string, tourUrlName: string): Observable<Tour>{
        return this.http.get(this.url + tourType + '/' + countryUrlName + '/' + tourUrlName).pipe(
            map((res: Response) => <Tour>res.json()),
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

export class Tour{
    public tourId : number
    public name : string
    public urlName : string
    public city: string
    public category : string
    public price : number
    public stars : number
    public description : string
    public country : string
    public nights : number
    public isFlightIncluded : boolean
    public newImageCollection : string[]
    public oldImageCollection : number[]

    constructor()
    {
       this.newImageCollection = new Array<string>();
       this.oldImageCollection = new Array<number>();
    }
}
