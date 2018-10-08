import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { ImagesPopupComponent } from '@siteModule/Content/ImagesPopup/imagesPopup.component';
import { OrderComponent } from '@siteModule/Order/order.component';
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service"; 
import { CountryService } from "@siteCommon/Services/country.service";
import { Country } from "@siteCommon/Services/country.service";
import { TourService } from "@siteCommon/Services/tour.service";
import { Tour } from "@siteCommon/Services/tour.service";

@Component({
    
    moduleId: module.id,
    selector: "toursComponent",
    templateUrl: "tours.component.html",
    styleUrls: ["tours.component.css"]
})
export class ToursComponent {
    public errorMessage: string;
    public starsArray = Array;

    public tourTypes: Dictionary;
    public tourType: string;
    public country: Country = new Country();
    public tourCollection: Array<Tour> = new Array<Tour>();

    constructor(
        public dialog: MatDialog,
        private tourService: TourService,
        private tourTypeService: TourTypeService,
        private countryService: CountryService,
        private activeRoute: ActivatedRoute,
        private router: Router)
    { }

    ngOnInit() 
    {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.setDataFromRoute();
        this.getCountry();
        this.getTourCollection();
    }

    private setDataFromRoute(){
       this.activeRoute.params.subscribe(params => {
            this.country.urlName = params['country'];
        });
        this.activeRoute.pathFromRoot[1].url.subscribe(val => {
            this.tourType = val[1].path;
        });
    }

    private getCountry()
    {
        this.countryService.getCountry(this.tourType, this.country.urlName)
        .subscribe(data => this.country = data);
    }

    private getTourCollection()
    {
        this.tourService.getTourCollection(this.tourType, this.country.urlName)
        .subscribe(data => this.tourCollection = data);
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }

    public openImagesPopup(imageIds: Array<number>) {
        let dialogRef = this.dialog.open(ImagesPopupComponent, {
            data: imageIds
        });
    }
}
