import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '../../Order/order.component';

@Component({
    
    moduleId: module.id,
    selector: "country",
    templateUrl: "country.component.html",
    styleUrls: ["country.component.css"]
})
export class CountryComponent {

    constructor(
        public dialog: MatDialog)
    {
        
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
