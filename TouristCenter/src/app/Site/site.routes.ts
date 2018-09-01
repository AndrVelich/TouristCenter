import { Routes } from "@angular/router";
import { HomeComponent } from "./Content/Home/home.component";
import { TourTypesComponent } from "./Content/TourTypes/tourTypes.component";
import { CountryComponent } from "./Content/Country/country.component";
import { ToursComponent } from "./Content/Tours/tours.component";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    { 
        path: 'home/index', 
        component: HomeComponent
    },
    { 
        path: 'tour', 
        component: TourTypesComponent
    },
    { 
        path: 'tour/:type', 
        component: CountryComponent
    },
    { 
        path: 'tour/:type/:country', 
        component: ToursComponent
    }
];