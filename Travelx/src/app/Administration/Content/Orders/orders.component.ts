import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSelectModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

import { Dictionary } from "@common/Types/Dictionary";
import { OrderService } from "@administrationCommon/Services/order.service";
import { Order } from "@administrationCommon/Services/order.service";
import { PageOptions } from "@common/Services/pager.service";
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";
import { PagerComponent } from "@administrationCommon/Components/Pager/pager.component";

@Component({
    selector: "orders",
    templateUrl: "orders.component.html",
    styleUrls: ["orders.component.css"]
})
export class OrdersComponent implements OnInit 
{
    public errorMessage: string;
    public orderCollection: Array<Order> = new Array<Order>();
    public pageOptions: PageOptions = new PageOptions(0, 20, 10);
    @ViewChild(PagerComponent, { static: false }) pagerComponent: PagerComponent;

    constructor(
        public dialog: MatDialog,
        private orderService: OrderService)
    { }

    ngOnInit()
    {

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
                this.getOrdersPage(this.pageOptions);
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
                         .subscribe(() => this.getOrdersPage(this.pageOptions));
                }
            });
    }

    private getOrdersPage(pageOptions: PageOptions)
    {
        this.pageOptions = pageOptions;
        this.orderService.getOrdersPage(pageOptions.skip, pageOptions.take)
        .subscribe(data => 
        {
            this.orderCollection = data.collection;
            this.pagerComponent.updatePager(data.count);
        });
    }

}


