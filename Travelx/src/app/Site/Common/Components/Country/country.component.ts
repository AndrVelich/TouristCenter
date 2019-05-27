import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { Country } from "@siteCommon/Services/country.service";


@Component({

    selector: "countryComponent",
    templateUrl: "country.component.html",
    styleUrls: ["country.component.css"]
})
export class CountryComponent {
    @Input() country: Country;

    constructor(
        public dialog: MatDialog)
    { }

    ngOnInit() {}

    public openOrderPopup(button : string) 
    {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }
}
