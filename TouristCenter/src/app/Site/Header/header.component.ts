import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate
} from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '../Order/order.component';

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

    constructor(
        public dialog: MatDialog)
    {
        
    }

    public toggleMenu() {
        this.isMobileMenuVisible = !this.isMobileMenuVisible;
    }

    public onClickOutsideMobileMenu() {
        this.isMobileMenuVisible = false;
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
