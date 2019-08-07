import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSelectModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { RouterService } from "@common/Services/router.service";
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service"; 
import { PageOptions } from "@common/Services/pager.service";
import { PagerComponent } from "@administrationCommon/Components/Pager/pager.component";
import { PreloaderService } from "@common/Services/preloader.service";

import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";

import { CountryService } from "@administrationCommon/Services/country.service";
import { Country } from "@administrationCommon/Services/country.service";

import { TourService } from "@administrationCommon/Services/tour.service";
import { Tour } from "@administrationCommon/Services/tour.service";

import { CkeditorService } from "@administrationCommon/Services/ckeditor.service";

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
    public pageOptions: PageOptions = new PageOptions(0, 10, 10);
    @ViewChild(PagerComponent, { static: false }) pagerComponent: PagerComponent;

    constructor(
        public dialog: MatDialog,
        public ckeditorService: CkeditorService,
        private activeRoute: ActivatedRoute,
        private routerService: RouterService,
        private tourTypeService: TourTypeService,
        private countryService: CountryService,
        private tourService: TourService,
        private preloaderService: PreloaderService,
    )
    { }

    ngOnInit() 
    {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.setPageOptionsFromUrl();
        this.getCountryCollection();
    }

    public tourTypeFiterChange()
    {
        this.activeCountry = '';
        this.filterChange();
        this.getCountryCollection();
    }

    public countryFiterChange()
    {
        this.filterChange();
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
                     this.preloaderService.startPreloader();
                     this.tourService.deleteTour(tourId)
                         .subscribe(() => this.getToursPage(this.pageOptions),
                             error => this.errorMessage = error,
                             () => this.preloaderService.finishPreloader());
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

    private getToursPage(pageOptions: PageOptions)
    {
        this.preloaderService.startPreloader();
        this.pageOptions = pageOptions;
        this.tourService.getToursPage(this.activeTourType, this.activeCountry, pageOptions.skip, pageOptions.take)
            .subscribe(data => {
                this.tourCollection = data.collection;
                this.pagerComponent.updatePager(data.count);
            },
            error => this.errorMessage = error,
            () => this.preloaderService.finishPreloader());
    }

    private filterChange() {
        this.setFilterOptionsToUrl();
        this.pagerComponent.resetPager();
    }

    private setFilterOptionsToUrl(): void {
        let newParams = {
            tourType: this.activeTourType,
            country: this.activeCountry,
        };
        this.routerService.updateQueryParams(newParams);
    }

    private setPageOptionsFromUrl(): void {
        let queryParams = this.activeRoute.snapshot.queryParams;
        if (queryParams) {
            let tourType = queryParams.tourType;
            if (tourType) {
                this.activeTourType = tourType
            }
            let country = queryParams.country;
            if (country) {
                this.activeCountry = country
            }
        }
    }
}
