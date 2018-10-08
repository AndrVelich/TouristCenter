import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { OrderComponent } from '@siteModule/Order/order.component';
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service"; 
import { CountryService } from "@siteCommon/Services/country.service";
import { Country } from "@siteCommon/Services/country.service";

@Component({
    
    moduleId: module.id,
    selector: "countriesComponent",
    templateUrl: "countries.component.html",
    styleUrls: ["countries.component.css"]
})
export class CountriesComponent {
    public errorMessage: string;
    public tourTypes: Dictionary;
    public tourType: string;
    public countryCollection: Array<Country> = new Array<Country>();

    constructor(
        public dialog: MatDialog,
        private tourTypeService: TourTypeService,
        private countryService: CountryService,
        private activeRoute: ActivatedRoute,
        private router: Router)
    { }

    ngOnInit() {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.setDataFromRoute();
        this.getCountryCollection();
    }

    private setDataFromRoute(){
        this.activeRoute.pathFromRoot[1].url.subscribe(val => {
            this.tourType = val[1].path;
        });
    }

    private getCountryCollection()
    {
        this.countryService.getCountryCollection(this.tourType)
        .subscribe(data => this.countryCollection = data);
    }

    public getTourTypeName(tourTypeKey){
        let result = this.tourTypes.keys().filter(tt => tt == tourTypeKey)[0];
        return result;
    }

    public openOrderPopup() 
    {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
