import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { TextMaskModule } from 'angular2-text-mask';
import { RouterModule } from "@angular/router";

import {
  MatDialogModule,
  MatSelectModule,
} from '@angular/material';

import { CommonModule } from "../Common/common.module";
import { routes } from "./site.routes";
import { SiteComponent } from "./site.component";
import { HeaderComponent } from "./Header/header.component";
import { OrderComponent } from "./Order/order.component";
import { OrderService } from "./Order/order.service";
import { CountriesComponent } from "./Countries/countries.component";
import { ToursComponent } from "./Tours/tours.component";
import { FooterComponent } from "./Footer/footer.component";
import { ContentComponent } from "./Content/content.component";
import { HomeComponent } from "./Content/Home/home.component";
import { TourTypesComponent } from "./Content/TourTypes/tourTypes.component";
import { CountryComponent } from "./Content/Country/country.component";
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
import { ImagesPopupComponent } from "./Content/ImagesPopup/imagesPopup.component";
import { SlideshowModule } from 'ng-simple-slideshow';

import { CountryService } from "./Common/Services/country.service";
import { TourService } from "./Common/Services/tour.service";
import { PromotionService } from "./Common/Services/promotion.service";

@NgModule({
    imports:
    [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        HttpModule,
        TextMaskModule,
        CommonModule,
        SlideshowModule,

        RouterModule.forRoot(routes)
    ],
    providers: 
    [
        CountryService,
        TourService,
        PromotionService
    ],
    entryComponents:
    [
        TourTypesComponent,
        HeaderComponent,
        OrderComponent,
        
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

        ImagesPopupComponent,
        PromotionsComponent,
        PromotionDetailsComponent
    ],
    declarations:
    [
        SiteComponent,
        HeaderComponent,
        OrderComponent,
        FooterComponent,
        ContentComponent, 
        HomeComponent,
        TourTypesComponent,
        CountriesComponent,
        ToursComponent,
        CountryComponent,
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
export class SiteModule { }
