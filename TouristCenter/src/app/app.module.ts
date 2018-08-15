import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { TextMaskModule } from 'angular2-text-mask';

import {
  MatDialogModule,
  MatSelectModule,
} from '@angular/material';

import { ClickOutsideDirective } from "./Directives/clickOutside.directive";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./Header/header.component";
import { OrderComponent } from "./Order/order.component";
import { OrderService } from "./Order/order.service";
import { FooterComponent } from "./Footer/footer.component";
import { ContentModule } from "./Content/content.module";
import { ContentComponent } from "./Content/content.component";

@NgModule({
    imports:
    [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        ContentModule,
        HttpModule,
        TextMaskModule
    ],
    entryComponents:
    [
        HeaderComponent,
        OrderComponent
    ],
    declarations:
    [
        AppComponent,
        HeaderComponent,
        OrderComponent,
        FooterComponent,
        ClickOutsideDirective
    ],
    exports: [
        ClickOutsideDirective,
        MatDialogModule,
        MatSelectModule,
        HttpModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
