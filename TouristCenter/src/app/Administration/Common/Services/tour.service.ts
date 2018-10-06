import { Injectable } from "@angular/core";
import { Dictionary } from "@common/Types/Dictionary";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
//import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TourService{
    private countries: Dictionary = new Dictionary();
    private url: string = 'api/tour/';

    constructor(private http: Http) 
    {
        
    }

    public getTourCollection(tourType: string, country?: string): Observable<Tour[]>{
        return this.http.get('api/tours/' + tourType + '/' + (country || ''))
            .map((res: Response) => <Tour[]>res.json())
            .catch(this.handleError);
    }

    public getAllTourCollection(): Observable<Tour[]>{
        return this.http.get('api/tours/allTours')
            .map((res: Response) => <Tour[]>res.json())
            .catch(this.handleError);
    }

    public getTour(tourType: string, countryUrlName: string, tourUrlName: string): Observable<Tour>{
        return this.http.get(this.url + tourType + '/' + countryUrlName + '/' + tourUrlName)
            .map((res: Response) => <Tour>res.json())
            .catch(this.handleError);
    }

    public addTour(tour){
        return this.http.post(this.url, tour)
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
