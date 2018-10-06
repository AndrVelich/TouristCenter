import { Component, OnInit } from "@angular/core";
import { MatSelectModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service"; 

import { CountryService } from "@administrationCommon/Services/country.service";
import { Country } from "@administrationCommon/Services/country.service";

import { TourService } from "@administrationCommon/Services/tour.service";
import { Tour } from "@administrationCommon/Services/tour.service";

@Component({
    
    moduleId: module.id,
    selector: "tours",
    templateUrl: "tours.component.html",
    styleUrls: ["tours.component.css"]
})
export class ToursComponent {
    public errorMessage: string;
    public starsArray = Array;

    public tourTypes: Dictionary;
    public activeTourType: string;
    public activeCountry: string;
    public isCountriesLoading: boolean;
    public countryCollection: Dictionary = new Dictionary();
    public tourCollection: Array<Tour> = new Array<Tour>();

    constructor(
        public dialog: MatDialog,
        private tourTypeService: TourTypeService,
        private countryService: CountryService,
        private tourService: TourService)
    { }

    ngOnInit() 
    {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.getAllTourCollection();
    }

    public tourTypeFiterChange(){
        this.getCountryCollection();
        this.getTourCollection()
    }

    public countryFiterChange(){
        this.getTourCollection();
    }

    public isCountrySelectDisabled()
    {
        let result = this.isCountriesLoading || !this.countryCollection
        return result;
    }

    private getCountryCollection()
    {
        this.isCountriesLoading = true;
        this.countryCollection = new Dictionary();
        this.countryService.getCountryCollection(this.activeTourType)
        .subscribe(data => 
            {           
                data.map((country) => this.countryCollection.add(country.urlName, country.name));
                this.isCountriesLoading = false;
            });
    }

    private getAllTourCollection()
    {
        this.tourService.getAllTourCollection()
        .subscribe(data => this.tourCollection = data);
    }

    private getTourCollection()
    {
        this.tourService.getTourCollection(this.activeTourType, this.activeCountry)
        .subscribe(data => this.tourCollection = data);
    }

    public getTourTypeName(tourTypeKey)
    {
        let result = this.tourTypes[tourTypeKey];
        return result;
    }
}
