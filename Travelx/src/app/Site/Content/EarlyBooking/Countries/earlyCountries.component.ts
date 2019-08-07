import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { CountryService } from "@siteCommon/Services/country.service";
import { Country } from "@siteCommon/Services/country.service";
import { PreloaderService } from "@common/Services/preloader.service";

@Component({
    
    
    selector: "earlyCountries",
    templateUrl: "earlyCountries.component.html",
    styleUrls: ["earlyCountries.component.css"]
})
export class EarlyCountriesComponent {
    public errorMessage: string;
    public countryCollection: Array<Country> = new Array<Country>();

    constructor(
        private countryService: CountryService,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        private metaService: Meta,
        public dialog: MatDialog,
        public preloaderService : PreloaderService)
    { }

    ngOnInit() {
        this.getCountryCollection();
        this.setTitleAndMeta();
    }

    private getCountryCollection()
    {
        this.preloaderService.startPreloader();
        this.countryService.getEarlyCountryCollection()
            .subscribe(data => this.countryCollection = data.collection,
                    (err)=> console.log(err),
                    ()=> this.preloaderService.finishPreloader());
    }

    private setTitleAndMeta() : void
    {
        this.titleService.setTitle("Раннее Бронирование туров. Отдых 2019.");
        this.metaService.updateTag({ name: 'description', content: "➤Акция «Раннее Бронирование 2019». ➤ Экономия до 49% на отдых при оформлении тура заранее! ➤Более 6 356 вариантов отдыха! Смотреть…➥" });
        this.metaService.updateTag({ name: 'keywords', content: "Раннее Бронирование, Раннее Бронирование 2019, Раннее Бронирование из Минска, Раннее Бронирование туров, акция" });
    }

    public openOrderPopup(button : string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }
}
