import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from "@common/Services/pager.service";


@Injectable()
export class OrderService{
    private url: string = '/api/order';

    constructor(private httpClient: HttpClient) { }

    public getOrdersPage(skip: number, take: number): Observable<Page<Order>>
    {
        let params = new HttpParams()
            .set('skip', skip.toString())
            .set('take', take.toString())
        const options = { params: params };
        let result = this.httpClient.get<Page<Order>>('api/orders', options)

        return result;
    }

    public isAnyNewOrders(): Observable<boolean>
    {
        return this.httpClient.get<boolean>('api/orders/isAnyNew');
    }

    public saveOrder(order: Order)
    {
        return this.httpClient.put(this.url, order);
    }

    public deleteOrder(orderId: number)
    {
        return this.httpClient.delete(this.url + "/" + orderId);
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
