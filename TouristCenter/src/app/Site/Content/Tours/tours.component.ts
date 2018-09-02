import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '../../Order/order.component';
import { ImagesPopupComponent } from '../ImagesPopup/imagesPopup.component';

@Component({
    
    moduleId: module.id,
    selector: "tours",
    templateUrl: "tours.component.html",
    styleUrls: ["tours.component.css"]
})
export class ToursComponent {

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
