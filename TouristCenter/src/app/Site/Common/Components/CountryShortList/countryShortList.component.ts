import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Country } from "@siteCommon/Services/country.service";

@Component({
    
    selector: "countryShortListComponent",
    templateUrl: "countryShortList.component.html",
    styleUrls: ["countryShortList.component.css"]
})
export class CountryShortListComponent {
    @Input() countryCollection: Array<Country>;
}
