import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '@siteModule/Order/order.component';

@Component({
    
    moduleId: module.id,
    selector: "skiingCountry",
    templateUrl: "skiingCountry.component.html",
    styleUrls: ["skiingCountry.component.css"]
})
export class SkiingCountryComponent {

    constructor(
        public dialog: MatDialog)
    {
        
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
