import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title, Meta } from '@angular/platform-browser';

import { OrderComponent } from "@siteCommon/Components/Order/order.component";

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
        this.titleService.setTitle("Контакты | «Travel X» на карте, адрес и телефоны компании, электронная почта, где находится и как лучше доехать до турфирмы. ");
        this.metaService.addTag({ name: 'description', content: "➤ Контакты «Travel X»: телефоны, e-mail, адрес. ➤Как нас найти, как добраться, как пройти. Посмотреть на карте где находится компания. ➥" });
        this.metaService.addTag({ name: 'keywords', content: ": контакты, телефоны, адрес компании, организации, электронная почта, как доехать, как пройти, где находится, как связаться, тревел х на карте" });
    }
}
