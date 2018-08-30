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
    [
        HeaderComponent,
        OrderComponent
    ],
    declarations:
    [
        SiteComponent,
        HeaderComponent,
        OrderComponent,
        FooterComponent,
        ContentComponent, 
        HomeComponent
    ],
    exports: [
        SiteComponent,

        MatDialogModule,
        MatSelectModule,
        HttpModule
    ]
})
export class SiteModule { }
