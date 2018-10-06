﻿import { Routes } from "@angular/router";
import { HomeComponent } from "./Content/Home/home.component";
import { CountriesComponent } from "./Content/Countries/countries.component";
import { CountryComponent } from "./Content/Countries/Country/country.component";
import { ToursComponent } from "./Content/Tours/tours.component";
import { TourComponent } from "./Content/Tours/Tour/tour.component";
import { PromotionsComponent } from "./Content/Promotions/promotions.component";
import { PromotionComponent } from "./Content/Promotions/Promotion/promotion.component";

export const routes: Routes = [
    {
        path: 'administration',
        component: HomeComponent
    },
    {
        path: 'administration/countries',
        component: CountriesComponent
    },
    {
        path: 'administration/countries/:tourType/:country',
        component: CountryComponent
    },
    {
        path: 'administration/countries/new',
        component: CountryComponent
    },
    {
        path: 'administration/tours',
        component: ToursComponent
    },
    {
        path: 'administration/tours/new',
        component: TourComponent
    },
    {
        path: 'administration/tours/:tourType/:country/:tour',
        component: TourComponent
    },
    {
        path: 'administration/promotions',
        component: PromotionsComponent
    },
    {
        path: 'administration/promotions/:promotion',
        component: PromotionComponent
    }
];