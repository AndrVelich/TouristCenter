import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSelectModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { RouterService } from "@common/Services/router.service";
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service";
import { PageOptions } from "@common/Services/pager.service";
import { PreloaderService } from "@common/Services/preloader.service";

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
        private activeRoute: ActivatedRoute,
        private routerService: RouterService,
        private preloaderService: PreloaderService,
    ) { }

    ngOnInit() {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.setPageOptionsFromUrl();
    }

    public getTourTypeName(tourTypeKey)
    {
        let result = this.tourTypes.keys().filter(tt => tt == tourTypeKey)[0];
        return result;
    }

    public tourTypeFiterChange()
    {
        this.setFilterOptionsToUrl();
        this.pagerComponent.resetPager();
    }

    public openDeleteConfirmation(countryId: number, countryName: string): void {
        this.dialog.open(ConfirmationPopupComponent,
            {
                data: 'Вы уверены, что хототе удалить страну <b>' + countryName + '</b> и все туры этой страны?'
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.preloaderService.startPreloader();
                    this.countryService.deleteCountry(countryId)
                        .subscribe(
                            () => this.getCountriesPage(this.pageOptions),
                            error => this.errorMessage = error,
                            () => this.preloaderService.finishPreloader());
                }
            }
        );
    }

    private getCountriesPage(pageOptions: PageOptions)
    {
        this.preloaderService.startPreloader();
        this.pageOptions = pageOptions;
        this.countryService.getCountriesPage(this.activeTourType, pageOptions.skip, pageOptions.take)
            .subscribe(data => {
                this.countryCollection = data.collection;
                this.pagerComponent.updatePager(data.count);
            },
            error => this.errorMessage = error,
            () => this.preloaderService.finishPreloader()
        );
    }

    private setFilterOptionsToUrl(): void
    {
        let newParams = { tourType: this.activeTourType };
        this.routerService.updateQueryParams(newParams);
    }

    private setPageOptionsFromUrl(): void
    {
        let queryParams = this.activeRoute.snapshot.queryParams;
        if (queryParams) {
            let tourType = queryParams.tourType;
            if (tourType) {
                this.activeTourType = tourType
            }
        }
    }

}
