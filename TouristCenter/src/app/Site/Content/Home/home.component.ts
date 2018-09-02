import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from '../../Order/order.component';

@Component({
    
    moduleId: module.id,
    selector: "home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.css"]
})
export class HomeComponent {

    constructor(
        public dialog: MatDialog)
    {
        
    }

    public imageSources: string[] = [
     '/Content/Images/beach_header.jpg', 
     '/Content/Images/admin_header.jpg'
    ];
 

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }

}
