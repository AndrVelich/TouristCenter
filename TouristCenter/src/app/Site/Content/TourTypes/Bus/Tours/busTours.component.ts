import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '@siteModule/Order/order.component';
import { ImagesPopupComponent } from '@siteModule/Content/ImagesPopup/imagesPopup.component';

@Component({
    
    moduleId: module.id,
    selector: "busTours",
    templateUrl: "busTours.component.html",
    styleUrls: ["busTours.component.css"]
})
export class BusToursComponent {

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