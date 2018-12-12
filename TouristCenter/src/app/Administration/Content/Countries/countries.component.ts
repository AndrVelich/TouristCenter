import { Component, OnInit } from "@angular/core";
import { MatSelectModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service"; 
import { CountryService } from "@administrationCommon/Services/country.service";
import { Country } from "@administrationCommon/Services/country.service";
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";

//import { Observable } from "rxjs/Observable";
import {Observable} from 'rxjs';


@Component({
    
    moduleId: module.id,
    selector: "countries",
    templateUrl: "countries.component.html",
    styleUrls: ["countries.component.css"]
})
export class CountriesComponent implements OnInit {
    public errorMessage: string;
    public tourTypes: Dictionary;
    public activeTourType: string;
    public countryCollection: Array<Country> = new Array<Country>();

    constructor(
        public dialog: MatDialog,
        private tourTypeService: TourTypeService,
        private countryService: CountryService)
    { }

    ngOnInit() {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.getCountryCollection();
    }

    private getCountryCollection(tourType?: string)
    {
        this.countryService.getCountryCollection(tourType)
        .subscribe(data => this.countryCollection = data);
    }

    public getTourTypeName(tourTypeKey){
        let result = this.tourTypes.keys().filter(tt => tt == tourTypeKey)[0];
        return result;
    }

    public tourTypeFiterChange(){
        this.getCountryCollection(this.activeTourType);
    }

    public openDeleteConfirmation(countryId: number, countryName: string) : void
    {
        this.dialog.open(ConfirmationPopupComponent, 
        {
            data: 'Вы уверены, что хототе удалить страну <b>' + countryName + '</b> и все туры этой страны?'
        })
            .afterClosed()
            .subscribe(result => {
                if(result)
                {
                     this.countryService.deleteCountry(countryId)
                        .subscribe(() => this.getCountryCollection());
                }
            });
    }

}
