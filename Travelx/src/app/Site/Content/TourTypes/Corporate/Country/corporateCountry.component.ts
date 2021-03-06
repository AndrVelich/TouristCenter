﻿import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    
    
    selector: "corporateCountry",
    templateUrl: "corporateCountry.component.html",
    styleUrls: ["corporateCountry.component.css"]
})
export class CorporateCountryComponent {
    constructor(
        private titleService: Title,
        private metaService: Meta
        )
    { }

    ngOnInit() 
    {
        this.setTitleAndMeta();
    }

    private setTitleAndMeta() : void
    {
        this.titleService.setTitle("Корпоративные туры");
        this.metaService.updateTag({ name: 'description', content: "Корпоративные туры" });
    }
}
