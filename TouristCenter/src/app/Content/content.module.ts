import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { routes } from "./content.routes";
import { ContentComponent } from "./content.component";
import { HomeComponent } from "./Home/home.component";

@NgModule({
    imports: [BrowserModule,
        RouterModule.forRoot(routes)],
    exports: [ContentComponent,
        HomeComponent
    ],
    declarations: [ContentComponent, HomeComponent]
})
export class ContentModule {

}