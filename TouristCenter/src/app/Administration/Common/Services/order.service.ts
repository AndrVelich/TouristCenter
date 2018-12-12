
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {map, catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Dictionary } from "@common/Types/Dictionary";
import { Http, Response } from "@angular/http";
//import {Observable} from 'rxjs/Rx';



@Injectable()
export class OrderService{
    private url: string = '/api/order/';

    constructor(private http: Http) 
    {
        
    }

    public getOrdersPage(skip: number, take: number): Observable<OrdersPage>{
        return this.http.get('api/ordersPage/' + skip + '/' + take).pipe(
            map((res: Response) => <OrdersPage>res.json()),
            catchError(this.handleError),);
    }

    public isAnyNewOrders(): Observable<boolean>{
        return this.http.get('api/orders/isAnyNew').pipe(
            map((res: Response) => <boolean>res.json()),
            catchError(this.handleError),);
    }

    public saveOrder(order: Order){
        return this.http.put(this.url, order).pipe(
            catchError(this.handleError));
    }

    public deleteOrder(orderId : number){
        return this.http.delete(this.url + orderId).pipe(
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

export class Order
{
        public orderId: number
        public name: string
        public phone: string
        public description: string
        public isNew: boolean
        public createdDateTime: string
        public url: string
        public tourOrButton: string
}

export class OrdersPage
{
        public ordersCount: number
        public orderCollection: Array<Order>
}
