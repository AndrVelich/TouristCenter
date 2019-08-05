import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from "@common/Services/pager.service";

@Injectable()
export class TourService
{
    private url: string = 'api/tour/';

    constructor(private httpClient: HttpClient) { }

    public getToursPage(tourType: string, country?: string, skip?: number, take?: number): Observable<Page<Tour>> {
        let params = new HttpParams();
        if (tourType) {
            params = params.set('tourType', tourType)
        }
        if (country) {
            params = params.set('country', country)
        }
        if (skip) {
            params = params.set('skip', skip.toString());
        }
        if (take) {
            params = params.set('take', take.toString());
        }

        const options = { params: params };
        let result = this.httpClient.get<Page<Tour>>('api/tours', options);

        return result;
    }

    public getTour(tourType: string, countryUrlName: string, tourUrlName: string): Observable<Tour>{
        return this.httpClient.get<Tour>(this.url + tourType + '/' + countryUrlName + '/' + tourUrlName)
    }

    public addTour(tour){
        return this.httpClient.post(this.url, tour)
    }

    public deleteTour(tourId){
        return this.httpClient.delete(this.url + tourId)
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
