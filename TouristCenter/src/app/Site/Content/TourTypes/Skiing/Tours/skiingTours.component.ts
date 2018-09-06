import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '@siteModule/Order/order.component';
import { ImagesPopupComponent } from '@siteModule/Content/ImagesPopup/imagesPopup.component';

@Component({
    
    moduleId: module.id,
    selector: "skiingTours",
    templateUrl: "skiingTours.component.html",
    styleUrls: ["skiingTours.component.css"]
})
export class SkiingToursComponent {

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
