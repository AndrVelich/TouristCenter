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

import { CommonModule } from "@common/common.module";
import { routes } from "./administration.routes";
import { AdministrationComponent } from "./administration.component";
import { HeaderComponent } from "./Header/header.component";
import { FooterComponent } from "./Footer/footer.component";
import { ContentComponent } from "./Content/content.component";
import { HomeComponent } from "./Content/Home/home.component";
import { CountriesComponent } from "./Content/Countries/countries.component";
import { CountryComponent } from "./Content/Countries/Country/country.component";
import { ToursComponent } from "./Content/Tours/tours.component";
import { TourComponent } from "./Content/Tours/Tour/tour.component";

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

        RouterModule.forRoot(routes)
    ],
    entryComponents:
    [],
    declarations:
    [
        AdministrationComponent,
        HeaderComponent,
        FooterComponent,
        ContentComponent, 
        HomeComponent,
        CountriesComponent,
        CountryComponent,
        ToursComponent,
        TourComponent
    ],
    exports: [
        AdministrationComponent,

        MatDialogModule,
        MatSelectModule,
        HttpModule
    ],
    bootstrap: [AdministrationComponent]
})
export class AdministrationModule { }
