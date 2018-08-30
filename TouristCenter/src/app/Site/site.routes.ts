import { Routes } from "@angular/router";
import { HomeComponent } from "./Content/Home/home.component";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    { 
        path: 'home/index', 
        component: HomeComponent
    }
];