import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ImagesPopupComponent } from '@siteCommon/Components/ImagesPopup/imagesPopup.component';
import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { Tour } from "@siteCommon/Services/tour.service";

@Component({
    
    moduleId: module.id,
    selector: "tourComponent",
    templateUrl: "tour.component.html",
    styleUrls: ["tour.component.css"]
})
export class TourComponent {
    @Input() tour: Tour;
    private starsArray = Array;

    constructor(
        public dialog: MatDialog)
    { }

    public openOrderPopup(button : string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }

    public openImagesPopup(imageIds: Array<number>) {
        let dialogRef = this.dialog.open(ImagesPopupComponent, {
            data: imageIds
        });
    }
   
}
