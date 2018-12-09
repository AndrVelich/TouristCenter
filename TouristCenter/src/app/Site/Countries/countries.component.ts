import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { OrderComponent } from '@siteModule/Order/order.component';
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service"; 
import { CountryService } from "@siteCommon/Services/country.service";
import { Country } from "@siteCommon/Services/country.service";
import { PreloaderService } from "@common/Services/preloader.service";

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
        private tourTypeService: TourTypeService,
        private countryService: CountryService,
        private activeRoute: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog,
        public preloaderService : PreloaderService)
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
        this.preloaderService.startPreloader();
        this.countryService.getCountryCollection(this.tourType)
        .subscribe(data => this.countryCollection = data,
                    (err)=> console.log(err),
                    ()=> this.preloaderService.finishPreloader());
    }

    public openOrderPopup(button : string) 
    {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }
}
