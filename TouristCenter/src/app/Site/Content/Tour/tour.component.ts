import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '../../Order/order.component';

@Component({
    
    moduleId: module.id,
    selector: "tour",
    templateUrl: "tour.component.html",
    styleUrls: ["tour.component.css"]
})
export class TourComponent {

    constructor(
        public dialog: MatDialog)
    {
        
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
