﻿import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { Title, Meta } from '@angular/platform-browser';

@Component({
    
    
    selector: "tourTypes",
    templateUrl: "tourTypes.component.html",
    styleUrls: ["tourTypes.component.css"]
})
export class TourTypesComponent {

    constructor(
        public dialog: MatDialog,
        private titleService: Title,
        private metaService: Meta,
        )
    {
        
    }

    ngOnInit() {
         this.setTitleAndMeta();
    }

    public openOrderPopup(button : string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }

    private setTitleAndMeta() : void
    {
        this.titleService.setTitle("Поиск и подбор туров в Минске");
        this.metaService.updateTag({ name: 'description', content: "➤ Поиск и подбор тура. ➤Вылеты из Минска/ Москвы/ Киева. ➤Отдых на море, автобусные маршруты, авиатуры в Европу и пр." });
        this.metaService.updateTag({ name: 'keywords', content: "туры из Минска, подбор тура, поиск тура, виды туров" });
    }
}
