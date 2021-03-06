import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { OrderComponent } from "@siteCommon/Components/Order/order.component";

@Component({
    
    
    selector: "footerComponent",
    templateUrl: "footer.component.html",
    styleUrls: ["footer.component.css"]
})
export class FooterComponent {

    constructor(
        public dialog: MatDialog)
    {
        
    }

    public openOrderPopup(button : string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }
}
