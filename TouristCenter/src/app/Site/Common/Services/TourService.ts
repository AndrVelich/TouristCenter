import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Tour } from "./Models/tour";

import { Observable } from "rxjs/Observable";
//import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TourService{

    private url: string = '/api/tour';

    constructor(private http: Http) { }

    public getTourCollection(): Observable<Tour[]> {
        let result = this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
        return result;
    }

    private extractData(res: Response) {
        let result = res.json();
        return result;
    } 

    private handleError(error: any, cought: Observable<any>): any {
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
