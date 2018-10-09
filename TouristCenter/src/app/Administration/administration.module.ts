import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { TextMaskModule } from 'angular2-text-mask';
import { RouterModule } from "@angular/router";

import {
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule 
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
import { PromotionsComponent } from "./Content/Promotions/promotions.component";
import { PromotionComponent } from "./Content/Promotions/Promotion/promotion.component";
import { ToursComponent } from "./Content/Tours/tours.component";
import { TourComponent } from "./Content/Tours/Tour/tour.component";
import { LoginComponent } from "./Content/Login/login.component";
import { RegisterComponent } from "./Content/Register/register.component"; 
import { OrdersComponent } from "./Content/Orders/orders.component";

import { CountryService } from "./Common/Services/country.service";
import { TourService } from "./Common/Services/tour.service";
import { PromotionService } from "./Common/Services/promotion.service";
import { LoginService } from "./Common/Services/login.service";
import { RegisterService } from "./Common/Services/register.service";
import { OrderService } from "./Common/Services/order.service";

@NgModule({
    imports:
    [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,

        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,

        HttpModule,
        TextMaskModule,
        CommonModule,

        RouterModule.forRoot(routes)
    ],
    providers: 
    [
        CountryService,
        TourService,
        PromotionService,
        LoginService,
        RegisterService,
        OrderService,
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
        TourComponent,
        PromotionsComponent,
        PromotionComponent,
        LoginComponent,
        RegisterComponent,
        OrdersComponent,
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
