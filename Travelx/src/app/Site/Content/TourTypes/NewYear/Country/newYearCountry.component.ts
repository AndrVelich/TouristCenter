import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title, Meta } from '@angular/platform-browser';

import { OrderComponent } from "@siteCommon/Components/Order/order.component";

@Component({
    
    
    selector: "newYearCountry",
    templateUrl: "newYearCountry.component.html",
    styleUrls: ["newYearCountry.component.css"]
})
export class NewYearCountryComponent {

    constructor(
        private titleService: Title,
        private metaService: Meta,
        public dialog: MatDialog,
        )
    { }

    ngOnInit() 
    {
        this.setTitleAndMeta();
    }

    public openOrderPopup(button: string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }

    private setTitleAndMeta() : void
    {
        this.titleService.setTitle("Новогодние туры");
        this.metaService.updateTag({ name: 'description', content: "Новогодние туры" });
    }
}
