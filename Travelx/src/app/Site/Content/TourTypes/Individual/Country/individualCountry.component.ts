import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    
    moduleId: module.id,
    selector: "individualCountry",
    templateUrl: "individualCountry.component.html",
    styleUrls: ["individualCountry.component.css"]
})
export class IndividualCountryComponent {

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
        this.titleService.setTitle("Индивидуальный отдых");
        this.metaService.addTag({ name: 'description', content: "Индивидуальный отдых" });
    }
}
