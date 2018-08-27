import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component"; 
import { SiteModule } from "./Site/site.module";
import { AdministrationModule } from "./Administration/administration.module";

@NgModule({
    imports:
    [
        BrowserModule,
        SiteModule,
        AdministrationModule
    ],
    entryComponents:
    [],
    declarations:
    [
        AppComponent
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }