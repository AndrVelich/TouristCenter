import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    
    
    selector: "skiingCountry",
    templateUrl: "skiingCountry.component.html",
    styleUrls: ["skiingCountry.component.css"]
})
export class SkiingCountryComponent {
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
        this.titleService.setTitle("Горнолыжные туры");
        this.metaService.updateTag({ name: 'description', content: "Горнолыжные туры" });
    }
}
