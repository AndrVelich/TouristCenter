var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { RouterModule } from "@angular/router";
import { MatDialogModule, MatSelectModule, } from '@angular/material';
import { CommonModule } from "../Common/common.module";
import { routes } from "./site.routes";
import { SiteComponent } from "./site.component";
import { HeaderComponent } from "./Header/header.component";
import { OrderComponent } from "./Common/Components/Order/order.component";
import { CountriesComponent } from "./Countries/countries.component";
import { CountryComponent } from "./Common/Components/Country/country.component";
import { CountryShortListComponent } from "./Common/Components/CountryShortList/countryShortList.component";
import { ToursComponent } from "./Tours/tours.component";
import { TourComponent } from "./Common/Components/Tour/tour.component";
import { FooterComponent } from "./Footer/footer.component";
import { ContentComponent } from "./Content/content.component";
import { HomeComponent } from "./Content/Home/home.component";
import { CountriesPageComponent } from "./Content/CountriesPage/countriesPage.component";
import { TourTypesComponent } from "./Content/TourTypes/tourTypes.component";
import { TourTypesTileComponent } from "./Common/Components/TourTypesTile/tourTypesTile.component";
import { ContactsComponent } from "./Content/Contacts/contacts.component";
import { BeachCountryComponent } from "./Content/TourTypes/Beach/Country/beachCountry.component";
import { BeachToursComponent } from "./Content/TourTypes/Beach/Tours/beachTours.component";
import { BusToursComponent } from "./Content/TourTypes/Bus/Tours/busTours.component";
import { CorporateCountryComponent } from "./Content/TourTypes/Corporate/Country/corporateCountry.component";
import { CorporateToursComponent } from "./Content/TourTypes/Corporate/Tours/corporateTours.component";
import { IndividualCountryComponent } from "./Content/TourTypes/Individual/Country/individualCountry.component";
import { IndividualToursComponent } from "./Content/TourTypes/Individual/Tours/individualTours.component";
import { NewYearCountryComponent } from "./Content/TourTypes/NewYear/Country/newYearCountry.component";
import { NewYearToursComponent } from "./Content/TourTypes/NewYear/Tours/newYearTours.component";
import { SkiingCountryComponent } from "./Content/TourTypes/Skiing/Country/skiingCountry.component";
import { SkiingToursComponent } from "./Content/TourTypes/Skiing/Tours/skiingTours.component";
import { PromotionsComponent } from "./Content/Promotions/promotions.component";
import { PromotionDetailsComponent } from "./Content/Promotions/PromotionDetails/promotionDetails.component";
import { ImagesPopupComponent } from "./Common/Components/ImagesPopup/imagesPopup.component";
import { HotCountriesComponent } from "./Content/Hot/Countries/hotCountries.component";
import { HotToursComponent } from "./Content/Hot/Tours/hotTours.component";
import { EarlyCountriesComponent } from "./Content/EarlyBooking/Countries/earlyCountries.component";
import { EarlyToursComponent } from "./Content/EarlyBooking/Tours/earlyTours.component";
import { SlideshowModule } from 'ng-simple-slideshow';
import { CountryService } from "./Common/Services/country.service";
import { TourService } from "./Common/Services/tour.service";
import { PromotionService } from "./Common/Services/promotion.service";
var SiteModule = /** @class */ (function () {
    function SiteModule() {
    }
    SiteModule = __decorate([
        NgModule({
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                ReactiveFormsModule,
                MatDialogModule,
                MatSelectModule,
                HttpModule,
                HttpClientModule,
                TextMaskModule,
                CommonModule,
                SlideshowModule,
                RouterModule.forRoot(routes)
            ],
            providers: [
                CountryService,
                TourService,
                PromotionService,
                { provide: "window", useValue: window }
            ],
            entryComponents: [
                TourTypesComponent,
                HeaderComponent,
                OrderComponent,
                ImagesPopupComponent,
                PromotionsComponent,
                PromotionDetailsComponent
            ],
            declarations: [
                SiteComponent,
                HeaderComponent,
                OrderComponent,
                FooterComponent,
                ContentComponent,
                HomeComponent,
                CountriesPageComponent,
                CountryComponent,
                CountryShortListComponent,
                TourTypesComponent,
                TourTypesTileComponent,
                CountriesComponent,
                ToursComponent,
                TourComponent,
                ContactsComponent,
                BeachCountryComponent,
                BeachToursComponent,
                BusToursComponent,
                CorporateCountryComponent,
                CorporateToursComponent,
                IndividualCountryComponent,
                IndividualToursComponent,
                NewYearCountryComponent,
                NewYearToursComponent,
                SkiingCountryComponent,
                SkiingToursComponent,
                HotCountriesComponent,
                HotToursComponent,
                EarlyCountriesComponent,
                EarlyToursComponent,
                ImagesPopupComponent,
                PromotionsComponent,
                PromotionDetailsComponent
            ],
            exports: [
                MatDialogModule,
                MatSelectModule,
                HttpModule,
                SiteComponent
            ],
            bootstrap: [SiteComponent]
        })
    ], SiteModule);
    return SiteModule;
}());
export { SiteModule };
//# sourceMappingURL=site.module.js.map