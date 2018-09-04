import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '../../../Order/order.component';

@Component({
    
    moduleId: module.id,
    selector: "promotionDetails",
    templateUrl: "promotionDetails.component.html",
    styleUrls: ["promotionDetails.component.css"]
})
export class PromotionDetailsComponent {

    constructor(
        public dialog: MatDialog)
    {
        
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
