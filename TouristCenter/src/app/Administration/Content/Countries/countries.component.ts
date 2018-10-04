﻿import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service"; 
import { CountryService } from "@administrationCommon/Services/country.service";
import { Country } from "@administrationCommon/Services/country.service";

//import { Observable } from "rxjs/Observable";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
    
    moduleId: module.id,
    selector: "countries",
    templateUrl: "countries.component.html",
    styleUrls: ["countries.component.css"]
})
export class CountriesComponent implements OnInit {
    public errorMessage: string;
    public tourTypes: Dictionary;
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

    private getCountryCollection()
    {
        this.countryService.getCountryCollection()
        .subscribe(data => this.countryCollection = data);
    }

    public getTourTypeName(tourTypeKey){
        let result = this.tourTypes.keys().filter(tt => tt == tourTypeKey)[0];
        return result;
    }

}
