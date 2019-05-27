import {
    Component,
    HostListener,
    Inject
} from "@angular/core";
import { trigger, state, transition, animate, style } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { OrderComponent } from "@siteCommon/Components/Order/order.component";

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
export class HeaderComponent {
    public isMobileMenuVisible: boolean = false;
    public isSticky: boolean = false;

    constructor(
        @Inject('window') private window: Window,
        public dialog: MatDialog)
    {
        
    }

    @HostListener('window:scroll', ['$event'])
    public onScroll(): void {
        let num = this.window.pageYOffset;
        if (num > 90) {
            this.isSticky = true;
        }
        else if (this.isSticky && num < 5) {
            this.isSticky = false;
        }
    }

    public toggleMenu() {
        this.isMobileMenuVisible = !this.isMobileMenuVisible;
    }

    public onClickOutsideMobileMenu() {
        this.isMobileMenuVisible = false;
    }

    public openOrderPopup(button : string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }
}
