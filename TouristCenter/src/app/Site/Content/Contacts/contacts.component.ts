import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { OrderComponent } from '../../Order/order.component';

@Component({
    
    moduleId: module.id,
    selector: "contacts",
    templateUrl: "contacts.component.html",
    styleUrls: ["contacts.component.css"]
})
export class ContactsComponent {

    constructor(
        public dialog: MatDialog)
    { }

    ngOnInit() {
        
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
