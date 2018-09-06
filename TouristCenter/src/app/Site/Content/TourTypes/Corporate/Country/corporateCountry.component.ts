import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '@siteModule/Order/order.component';

@Component({
    
    moduleId: module.id,
    selector: "corporateCountry",
    templateUrl: "corporateCountry.component.html",
    styleUrls: ["corporateCountry.component.css"]
})
export class CorporateCountryComponent {

    constructor(
        public dialog: MatDialog)
    {
        
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
