import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AdministrationModule } from "./Administration/administration.module"; 
import { SiteModule } from "./Site/site.module";

import { SiteComponent } from "./Site/site.component";
import { AdministrationComponent } from "./Administration/administration.component";

@NgModule({
    imports:
    [
        BrowserModule,
        SiteModule,
        AdministrationModule,
    ],
    entryComponents:
    [],
    declarations:
    [
        
    ],
    exports: [],
    bootstrap: [SiteComponent, AdministrationComponent]
})
export class AppModule { }