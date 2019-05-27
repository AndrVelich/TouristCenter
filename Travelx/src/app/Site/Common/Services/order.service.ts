import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

@Injectable()
export class OrderService{

    private url: string = '/api/order';

    constructor(private http: Http) { }

    public addOrder(order: Order) {
        return this.http.post(this.url, order).pipe(
            catchError(this.handleError));
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

        return observableThrowError(message);
    }
}

export class Order {
    public name: string;
    public phone: number;
    public description: string;
    public url: string;
    public tourOrButton: string
}
