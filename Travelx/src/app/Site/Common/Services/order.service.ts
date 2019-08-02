import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class OrderService{

    private url: string = '/api/order';

    constructor(private httpClient: HttpClient) { }

    public addOrder(order: Order)
    {
        return this.httpClient.post(this.url, order);
    }
}

export class Order {
    public name: string;
    public phone: number;
    public description: string;
    public url: string;
    public tourOrButton: string
}
