import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from "@common/Services/pager.service";

@Injectable()
export class CountryService{
    private url: string = 'api/country/';

    constructor(private httpClient: HttpClient) { }

    public getCountriesPage(tourType?: string, skip?: number, take?: number): Observable<Page<Country>>
    {
        let params = new HttpParams();
        if (tourType)
        {
            params = params.set('tourType', tourType)
        }
        if (skip)
        {
            params = params.set('skip', skip.toString());
        }
        if (take)
        {
            params = params.set('take', take.toString());
        }
        
        const options = { params: params };
        let result = this.httpClient.get<Page<Country>>('api/countries', options);

        return result;
    }

    public getCountry(tourType: string, countryUrlName: string): Observable<Country>{
        return this.httpClient.get<Country>(this.url + tourType + '/' + countryUrlName);
    }

    public addCountry(country) {
        return this.httpClient.post(this.url, country);
    }

    public deleteCountry(countryId){
        return this.httpClient.delete(this.url + countryId);
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
