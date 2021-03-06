import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ImagesPopupComponent } from '@siteCommon/Components/ImagesPopup/imagesPopup.component';
import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { Tour } from "@siteCommon/Services/tour.service";

@Component({
    
    
    selector: "tourComponent",
    templateUrl: "tour.component.html",
    styleUrls: ["tour.component.css"]
})
export class TourComponent {
    @Input() tour: Tour;
    public starsArray = Array;

    constructor(
        public dialog: MatDialog)
    { }

    public openOrderPopup(button : string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }

    public openImagesPopup(imageIds: Array<number>) {
        //TODO dognail should use separate property for tile image
        let imageIdsShort = Object.assign([], imageIds);
        imageIdsShort.shift();

        let dialogRef = this.dialog.open(ImagesPopupComponent, {
            data: imageIdsShort
        });
    }
   
}
