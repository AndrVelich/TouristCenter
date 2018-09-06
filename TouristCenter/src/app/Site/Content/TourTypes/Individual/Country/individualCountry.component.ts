import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '@siteModule/Order/order.component';

@Component({
    
    moduleId: module.id,
    selector: "individualCountry",
    templateUrl: "individualCountry.component.html",
    styleUrls: ["individualCountry.component.css"]
})
export class IndividualCountryComponent {

    constructor(
        public dialog: MatDialog)
    {
        
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
