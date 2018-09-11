import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    
    moduleId: module.id,
    selector: "country",
    templateUrl: "country.component.html",
    styleUrls: ["country.component.css"]
})
export class CountryComponent {

    constructor(
        public dialog: MatDialog)
    {
        
    }


}
