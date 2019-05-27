import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    
    selector: "beachCountry",
    templateUrl: "beachCountry.component.html",
    styleUrls: ["beachCountry.component.css"]
})
export class BeachCountryComponent {
    
    constructor(
        private titleService: Title,
        private metaService: Meta,
        )
    { }

    ngOnInit() 
    {
        this.setTitleAndMeta();
    }

    private setTitleAndMeta() : void
    {
        this.titleService.setTitle("Пляжный отдых");
        this.metaService.addTag({ name: 'description', content: "Пляжный отдых" });
    }
}
