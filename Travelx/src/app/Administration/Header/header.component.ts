import {
    Component,
    OnDestroy,
    OnInit
} from "@angular/core";
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Observable ,  interval } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderService } from "@administrationCommon/Services/order.service";

@Component({
    moduleId: module.id,
    selector: "headerComponent",
    templateUrl: "header.component.html",
    styleUrls: ["header.component.css"],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateY(-100%)' }),
                animate('300ms ease-in', style({ transform: 'translateY(0%)' }))
            ]),
            transition(':leave', [
                animate('300ms ease-in', style({ transform: 'translateY(-100%)' }))
            ])
        ])
    ]
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isMobileMenuVisible: boolean = false;
    public isAnyNewOrders: boolean = false;
    private timer: any;

    constructor(
        public dialog: MatDialog,
        public orderService: OrderService)
    {
        
    }

    ngOnInit() {
        this.checkIsAnyNewOrders(this);
        this.timer = interval(60000);
        this.timer.subscribe(() => this.checkIsAnyNewOrders(this));
    }

    ngOnDestroy() {
        this.timer.unsubscribe();
    }

    private checkIsAnyNewOrders(context)
    {
        context.orderService.isAnyNewOrders()
        .subscribe(data => 
        {
            context.isAnyNewOrders = data;
        });
    }

    public toggleMenu() {
        this.isMobileMenuVisible = !this.isMobileMenuVisible;
    }

    public onClickOutsideMobileMenu() {
        this.isMobileMenuVisible = false;
    }
}
