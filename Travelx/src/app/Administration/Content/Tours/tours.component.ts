import { Component, OnInit } from "@angular/core";
import { MatSelectModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";

import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service"; 

import { CountryService } from "@administrationCommon/Services/country.service";
import { Country } from "@administrationCommon/Services/country.service";

import { TourService } from "@administrationCommon/Services/tour.service";
import { Tour } from "@administrationCommon/Services/tour.service";

@Component({
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

    public getTourTypeName(tourTypeKey)
    {
        let result = this.tourTypes[tourTypeKey];
        return result;
    }

    public openDeleteConfirmation(tourId: number, tourName: string) : void
    {
        this.dialog.open(ConfirmationPopupComponent, 
        {
            data: 'Вы уверены, что хототе удалить тур <b>' + tourName + '</b>?'
        })
            .afterClosed()
            .subscribe(result => {
                if(result)
                {
                     this.tourService.deleteTour(tourId)
                        .subscribe(() => this.updateTourCollection());
                }
            });
    }

    private getCountryCollection()
    {
        this.isCountriesLoading = true;
        this.countryCollection = new Dictionary();
        this.countryService.getCountriesPage(this.activeTourType)
            .subscribe(data => 
            {           
                data.collection.map((country) => this.countryCollection.add(country.urlName, country.name));
                this.isCountriesLoading = false;
            });
    }

    private updateTourCollection(){
        if(this.activeTourType){
            this.getTourCollection();
        }
        else{
            this.getAllTourCollection();
        }
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
}
