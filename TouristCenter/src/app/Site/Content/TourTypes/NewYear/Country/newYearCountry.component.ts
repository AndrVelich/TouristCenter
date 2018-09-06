import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '@siteModule/Order/order.component';

@Component({
    
    moduleId: module.id,
    selector: "newYearCountry",
    templateUrl: "newYearCountry.component.html",
    styleUrls: ["newYearCountry.component.css"]
})
export class NewYearCountryComponent {

    constructor(
        public dialog: MatDialog)
    {
        
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
