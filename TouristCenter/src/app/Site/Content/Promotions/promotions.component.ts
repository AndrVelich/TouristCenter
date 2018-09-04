import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '../../Order/order.component';
import { ImagesPopupComponent } from '../ImagesPopup/imagesPopup.component';

@Component({
    
    moduleId: module.id,
    selector: "promotions",
    templateUrl: "promotions.component.html",
    styleUrls: ["promotions.component.css"]
})
export class PromotionsComponent {

    constructor(
        public dialog: MatDialog)
    {
        
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }

    public openImagesPopup() {
        let dialogRef = this.dialog.open(ImagesPopupComponent);
    }
}
