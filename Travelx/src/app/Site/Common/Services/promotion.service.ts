import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class PromotionService{
    private url: string = '/api/promotion';

    constructor(private httpClient: HttpClient) { }

    public getActivePromotionCollection(): Observable<Promotion[]>{
        return this.httpClient.get<Promotion[]>('api/promotions/active');
    }

    public getActivePromotion(promotionUrlName: string): Observable<Promotion>{
        return this.httpClient.get<Promotion>('api/promotion/active/' + promotionUrlName);
    }

}

export class Promotion{
    public promotionId : number
    public name : string
    public urlName : string
    public description : string
    public untilDate : string
    public title : string
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
