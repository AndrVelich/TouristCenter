import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSelectModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service";
import { PageOptions } from "@common/Services/pager.service";
import { PagerComponent } from "@administrationCommon/Components/Pager/pager.component";
import { CountryService } from "@administrationCommon/Services/country.service";
import { Country } from "@administrationCommon/Services/country.service";
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";

@Component({
    selector: "countries",
    templateUrl: "countries.component.html",
    styleUrls: ["countries.component.css"]
})
export class CountriesComponent implements OnInit {
    public errorMessage: string;
    public tourTypes: Dictionary;
    public activeTourType: string;
    public countryCollection: Array<Country> = new Array<Country>();
    public pageOptions: PageOptions = new PageOptions(0, 10, 10);
    @ViewChild(PagerComponent, { static: false }) pagerComponent: PagerComponent;

    constructor(
        public dialog: MatDialog,
        private tourTypeService: TourTypeService,
        private countryService: CountryService,
        private router: Router,
        private activeRoute: ActivatedRoute,)
    { }

    ngOnInit() {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.setPageOptionsFromUrl();
    }

    public getTourTypeName(tourTypeKey){
        let result = this.tourTypes.keys().filter(tt => tt == tourTypeKey)[0];
        return result;
    }

    public tourTypeFiterChange() {
        this.setFilterOptionsToUrl();
        this.pagerComponent.resetPager();
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
                         .subscribe(() => this.getCountriesPage(this.pageOptions));
                }
            });
    }

    private getCountriesPage(pageOptions: PageOptions) {
        this.pageOptions = pageOptions;

        this.countryService.getCountriesPage(this.activeTourType, pageOptions.skip, pageOptions.take)
            .subscribe(data => {
                this.countryCollection = data.collection;
                this.pagerComponent.updatePager(data.count);
            });
    }

    private setFilterOptionsToUrl(): void
    {
        this.router.navigate(
            [],
            {
                relativeTo: this.activeRoute,
                queryParams: { tourType: this.activeTourType },
                queryParamsHandling: 'merge',
            });
    }

    private setPageOptionsFromUrl(): void
    {
        let queryParams = this.activeRoute.snapshot.queryParams;
        if (queryParams) {
            let tourType = queryParams.tourType;
            if (tourType) {
                this.activeRoute = tourType
            }
        }
    }

}
