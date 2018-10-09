import { Injectable } from "@angular/core";
import { Dictionary } from "@common/Types/Dictionary";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
//import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrderService{
    private url: string = '/api/order';

    constructor(private http: Http) 
    {
        
    }

    public getOrdersPage(skip: number, take: number): Observable<OrdersPage>{
        return this.http.get('api/ordersPage/' + skip + '/' + take)
            .map((res: Response) => <OrdersPage>res.json())
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

export class Order
{
        public orderId: number
        public name: string
        public phone: string
        public description: string
        public createdDateTime: string
}

export class OrdersPage
{
        public ordersCount: number
        public orderCollection: Array<Order>
}
