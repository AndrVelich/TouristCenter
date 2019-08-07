
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {map, catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Dictionary } from "@common/Types/Dictionary";
import { Http, Response } from "@angular/http";
//import {Observable} from 'rxjs/Rx';



@Injectable()
export class PromotionService{
    private url: string = 'api/promotion/';

    constructor(private http: Http) 
    {
        
    }

    public getPromotionCollection(): Observable<Promotion[]>{
        return this.http.get('api/promotions').pipe(
            map((res: Response) => <Promotion[]>res.json()),
            catchError(this.handleError),);
    }

    public getPromotion(promotionUrlName: string): Observable<Promotion>{
        return this.http.get(this.url + promotionUrlName).pipe(
            map((res: Response) => <Promotion>res.json()),
            catchError(this.handleError),);
    }

    public addPromotion(promotion){
        return this.http.post(this.url, promotion).pipe(
            catchError(this.handleError));
    }

    public deletePromotion(promotionId){
        return this.http.delete(this.url + promotionId).pipe(
            catchError(this.handleError));
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

export class Promotion{
    public promotionId : number
    public name : string
    public urlName : string
    public description : string
    public untilDate : Date
    public title: string
    public isActive: boolean
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
