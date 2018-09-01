import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '../../Order/order.component';

@Component({
    
    moduleId: module.id,
    selector: "tourTypes",
    templateUrl: "tourTypes.component.html",
    styleUrls: ["tourTypes.component.css"]
})
export class TourTypesComponent {

    constructor(
        public dialog: MatDialog)
    {
        
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
