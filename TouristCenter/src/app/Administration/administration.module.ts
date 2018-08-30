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
import { routes } from "./administration.routes";
import { AdministrationComponent } from "./administration.component";
import {HeaderComponent } from "./Header/header.component";
import { FooterComponent } from "./Footer/footer.component";
import { ContentComponent } from "./Content/content.component";
import { HomeComponent } from "./Content/Home/home.component";

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
        HomeComponent
    ],
    exports: [
        AdministrationComponent,

        MatDialogModule,
        MatSelectModule,
        HttpModule
    ]
})
export class AdministrationModule { }