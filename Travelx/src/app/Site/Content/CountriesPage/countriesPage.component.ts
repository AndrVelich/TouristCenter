import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service"; 
import { CountryService } from "@siteCommon/Services/country.service";
import { Country } from "@siteCommon/Services/country.service";
import { PreloaderService } from "@common/Services/preloader.service";

@Component({
    
    
    selector: "countriesPageComponent",
    templateUrl: "countriesPage.component.html",
    styleUrls: ["countriesPage.component.css"]
})
export class CountriesPageComponent {
    public errorMessage: string;
    public tourTypes: Dictionary;
    public tourType: string = "beach";
    public countryCollection: Array<Country> = new Array<Country>();

    constructor(
        private tourTypeService: TourTypeService,
        private countryService: CountryService,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        private metaService: Meta,
        public dialog: MatDialog,
        public preloaderService : PreloaderService)
    { }

    ngOnInit() {
        this.tourTypes = this.tourTypeService.GetTourTypes();
        this.getCountryCollection();
        this.setTitleAndMeta();
    }

    private getCountryCollection()
    {
        this.preloaderService.startPreloader();
        this.countryService.getCountryCollection(this.tourType)
            .subscribe(data => this.countryCollection = data.collection,
                    (err)=> console.log(err),
                    ()=> this.preloaderService.finishPreloader());
    }

    private setTitleAndMeta() : void
    {
        this.titleService.setTitle("Отдых 2019. Цены по странам");
        this.metaService.updateTag({ name: 'description', content: "➤ 85+ стран для отдыха. ➤Актуальные цены на все популярные направления. ➤Ответ на вопрос «Где отдохнуть?» Вы найдете здесь!" });
        this.metaService.updateTag({ name: 'keywords', content: "отдых 2019, отдых 2019 цены, где отдохнуть, страны отдых" });
    }

    public openOrderPopup(button : string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }
}
