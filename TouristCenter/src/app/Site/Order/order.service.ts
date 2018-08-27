import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Order } from "./order";

import { Observable } from "rxjs/Observable";
//import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrderService{

    private url: string = '/api/order';

    constructor(private http: Http) { }

    public addOrder(order: Order) {
        return this.http.post(this.url, order)
            .catch(this.handleError);
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
