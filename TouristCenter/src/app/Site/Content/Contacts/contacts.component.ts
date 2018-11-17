import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title, Meta } from '@angular/platform-browser';

import { OrderComponent } from '../../Order/order.component';

@Component({
    
    moduleId: module.id,
    selector: "contacts",
    templateUrl: "contacts.component.html",
    styleUrls: ["contacts.component.css"]
})
export class ContactsComponent {

    constructor(
        public dialog: MatDialog,
        private titleService: Title,
        private metaService: Meta,
        )
    { }

    ngOnInit() {
        this.setTitleAndMeta();
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }

    private setTitleAndMeta() : void
    {
        this.titleService.setTitle("Контакты");
    }
}
