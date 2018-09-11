import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    
    moduleId: module.id,
    selector: "countries",
    templateUrl: "countries.component.html",
    styleUrls: ["countries.component.css"]
})
export class CountriesComponent {

    constructor(
        public dialog: MatDialog)
    {
        
    }


}
