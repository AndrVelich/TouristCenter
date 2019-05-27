import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { CountryService } from "@siteCommon/Services/country.service";
import { Country } from "@siteCommon/Services/country.service";
import { PreloaderService } from "@common/Services/preloader.service";

@Component({
    
    
    selector: "hotCountriesComponent",
    templateUrl: "hotCountries.component.html",
    styleUrls: ["hotCountries.component.css"]
})
export class HotCountriesComponent {
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
        this.countryService.getHotCountryCollection()
        .subscribe(data => this.countryCollection = data,
                    (err)=> console.log(err),
                    ()=> this.preloaderService.finishPreloader());
    }

    private setTitleAndMeta() : void
    {
        this.titleService.setTitle("Горящие туры. Путёвки из Минска.");
        this.metaService.addTag({ name: 'description', content: "➤ Горящие туры на море. ➤Путёвки из Минска, Москвы и Киева. ➤Более 6 830 горячих предложений. ➤Экономия до 39% здесь ➥" });
        this.metaService.addTag({ name: 'keywords', content: "горящие туры из Минска, горящие путевки, горящие туры цены, горящие туры на двоих, горячие туры" });
    }

    public openOrderPopup(button : string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }
}
