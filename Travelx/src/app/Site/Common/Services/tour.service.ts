import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from "@common/Services/pager.service";

@Injectable()
export class TourService
{
    private url: string = 'api/tour/';

    constructor(private httpClient: HttpClient){ }

    public getTourCollection(tourType: string, country?: string): Observable<Page<Tour>>
    {
        let params = new HttpParams();
        if (tourType) {
            params = params.set('tourType', tourType)
        }
        if (country) {
            params = params.set('country', country)
        }

        const options = { params: params };
        let result = this.httpClient.get<Page<Tour>>('api/tours', options);

        return result;
    }

    public getHotTourCollection(country?: string): Observable<Page<Tour>>
    {
        let params = new HttpParams();
        if (country) {
            params = params.set('country', country)
        }

        const options = { params: params };
        let result = this.httpClient.get<Page<Tour>>('api/hotTours', options);

        return result;
    }

    public getEarlyTourCollection(country?: string): Observable<Page<Tour>> {
        let params = new HttpParams();
        if (country) {
            params = params.set('country', country)
        }

        const options = { params: params };
        let result = this.httpClient.get<Page<Tour>>('api/earlyTours', options);
        return result;
    }

    //public getAllTourCollection(): Observable<Tour[]>{
    //    return this.http.get('api/tours/allTours');
    //}

    //public getTour(tourType: string, countryUrlName: string, tourUrlName: string): Observable<Tour>{
    //    return this.http.get(this.url + tourType + '/' + countryUrlName + '/' + tourUrlName);
    //}

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
