import { Routes } from "@angular/router";
import { HomeComponent } from "./Content/Home/home.component";
import { CountriesComponent } from "./Content/Countries/countries.component";
import { CountryComponent } from "./Content/Countries/Country/country.component";
import { ToursComponent } from "./Content/Tours/tours.component";
import { TourComponent } from "./Content/Tours/Tour/tour.component";

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
        path: 'administration/countries/:country',
        component: CountryComponent
    },
    {
        path: 'administration/tours',
        component: ToursComponent
    },
    {
        path: 'administration/tours/:tour',
        component: TourComponent
    }
];