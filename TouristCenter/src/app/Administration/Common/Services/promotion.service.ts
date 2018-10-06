import { Injectable } from "@angular/core";
import { Dictionary } from "@common/Types/Dictionary";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
//import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PromotionService{
    private url: string = '/api/promotion';

    constructor(private http: Http) 
    {
        
    }

    public getPromotionCollection(): Observable<Promotion[]>{
        return this.http.get('api/promotions')
            .map((res: Response) => <Promotion[]>res.json())
            .catch(this.handleError);
    }

    public getPromotion(promotionUrlName: string): Observable<Promotion>{
        return this.http.get('api/promotion/' + promotionUrlName)
            .map((res: Response) => <Promotion>res.json())
            .catch(this.handleError);
    }

    public addPromotion(promotion){
        return this.http.post(this.url, promotion)
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

export class Promotion{
    public promotionId : number
    public name : string
    public urlName : string
    public description : string
    public untilDate : string
    public newImageCollection : string[]
    public oldImageCollection : number[]

    constructor()
    {
       this.newImageCollection = new Array<string>();
       this.oldImageCollection = new Array<number>();
    }
}
