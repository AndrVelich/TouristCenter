import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { ImagesPopupComponent } from '@siteCommon/Components/ImagesPopup/imagesPopup.component';
import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service"; 
import { CountryService } from "@siteCommon/Services/country.service";
import { Country } from "@siteCommon/Services/country.service";
import { TourService } from "@siteCommon/Services/tour.service";
import { Tour } from "@siteCommon/Services/tour.service";
import { PreloaderService } from "@common/Services/preloader.service";

@Component({
    
    
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
        private tourService: TourService,
        private tourTypeService: TourTypeService,
        private countryService: CountryService,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        private metaService: Meta,
        public dialog: MatDialog,
        public preloaderService : PreloaderService)
    { }

    ngOnInit() 
    {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.setDataFromRoute();
        this.getCountry();
        this.getTourCollection();
    }

    public openOrderPopup(button : string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }

    public openImagesPopup(imageIds: Array<number>) {
        let dialogRef = this.dialog.open(ImagesPopupComponent, {
            data: imageIds
        });
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
        .subscribe(data => {
            this.country = data;
            this.setTitleAndMeta();
        });
    }

    private getTourCollection()
    {
        this.preloaderService.startPreloader();
        this.tourService.getTourCollection(this.tourType, this.country.urlName)
        .subscribe(data => this.tourCollection = data.sort(() =>  0.5 - Math.random()),
                    (err)=> console.log(err),
                    ()=> this.preloaderService.finishPreloader());
    }

    private setTitleAndMeta() : void
    {
        if(this.country)
        {
            if(this.country.title != null)
            {
                this.titleService.setTitle(this.country.title);
            }
            else
            {
                this.titleService.setTitle(this.country.name);
            }
            
        }

        if(this.country && this.country.metaDescription != null)
        {
            this.metaService.addTag({ name: 'description', content: this.country.metaDescription });
        }

        if(this.country && this.country.metaKeywords != null)
        {
            this.metaService.addTag({ name: 'keywords', content: this.country.metaKeywords });
        }
    }
   
}
