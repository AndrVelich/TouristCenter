import { Component, OnInit } from "@angular/core";
import { MatSelectModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service"; 
import { OrderService } from "@administrationCommon/Services/order.service";
import { Order } from "@administrationCommon/Services/order.service";
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";

//import { Observable } from "rxjs/Observable";
import {Observable} from 'rxjs';


@Component({
    
    moduleId: module.id,
    selector: "orders",
    templateUrl: "orders.component.html",
    styleUrls: ["orders.component.css"]
})
export class OrdersComponent implements OnInit 
{
    private take: number = 20;
    private currentPage: number = 1;
    private ordersCount: number = 0;

    public errorMessage: string;
    public orderCollection: Array<Order> = new Array<Order>();
    public pager: Pager;
    

    constructor(
        public dialog: MatDialog,
        private tourTypeService: TourTypeService,
        private orderService: OrderService)
    { }

    ngOnInit() {
        this.getOrdersPage();
    }

    public markAsProcessed(order: Order) : void
    {
        this.dialog.open(ConfirmationPopupComponent, 
        {
            data: 'Вы уверены, что хототе пометить заявку <b>' + order.orderId + '</b> как обработанную?'
        })
            .afterClosed()
            .subscribe(result => {
                if(result)
                {
                     this.markAsProcessedConfirm(order);
                }
            });
    }

    private markAsProcessedConfirm (order: Order) : void
    {
        order.isNew = false;
        this.orderService.saveOrder(order)
        .subscribe(
            () => 
            {
                  this.getOrdersPage();
            },
            error => this.errorMessage = error);
    }

    public openDeleteConfirmation(orderId: number) : void
    {
        this.dialog.open(ConfirmationPopupComponent, 
        {
            data: 'Вы уверены, что хототе удалить заявку <b>' + orderId + '</b>?'
        })
            .afterClosed()
            .subscribe(result => {
                if(result)
                {
                     this.orderService.deleteOrder(orderId)
                        .subscribe(() => this.getOrdersPage());
                }
            });
    }

    private getOrdersPage()
    {
        let skip = (this.currentPage - 1) *  this.take;
        this.orderService.getOrdersPage(skip, this.take)
        .subscribe(data => 
        {
            this.orderCollection = data.orderCollection;
            this.ordersCount = data.ordersCount;

            this.pager = this.GetPager(this.ordersCount, this.orderCollection, this.take);
        });
    }

    public setPage(page) 
    {
        if (page > 0 || page <= this.pager.totalPages) 
        {
            this.currentPage = page;
            this.getOrdersPage();
        }
    }

    private GetPager(totalItems, currentPage, pageSize): Pager {

        let pager = new Pager();

        pager.currentPage = currentPage;
        pager.pageSize = pageSize;

        pager.totalPages = Math.ceil(totalItems / pager.pageSize);

        if (pager.totalPages <= pageSize) 
        {
            pager.startPage = 1;
            pager.endPage = pager.totalPages;
        } 
        else 
        {
            if (pager.currentPage <= 6) 
            {
                pager.startPage = 1;
                pager.endPage = 10;
            } 
            else if (pager.currentPage + 4 >= pager.totalPages) 
            {
                pager.startPage = pager.totalPages - 9;
                pager.endPage = pager.totalPages;
            } 
            else 
            {
                pager.startPage = pager.currentPage - 5;
                pager.endPage = pager.currentPage + 4;
            }
        }

        // calculate start and end item indexes
        pager.startIndex = (pager.currentPage - 1) * pager.pageSize;
        pager.endIndex = Math.min(pager.startIndex + pager.pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        pager.pages = new Array(pager.endPage - pager.startPage + 1).fill(0).map((x, i) => i + 1);

        // return object with all pager properties required by the view
        return pager;
        
    }

}

﻿export class Pager 
{
    public currentPage: number;
    public pageSize: number;
    public totalPages: number;
    public startPage: number;
    public endPage: number;
    public startIndex: number;
    public endIndex: number;
    public pages: number[];
};


