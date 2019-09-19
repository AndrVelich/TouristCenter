import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title, Meta } from '@angular/platform-browser';

import { OrderComponent } from "@siteCommon/Components/Order/order.component";

@Component({
    
    
    selector: "busToursComponent",
    templateUrl: "busTours.component.html",
    styleUrls: ["busTours.component.css"]
})
export class BusToursComponent {

    constructor(
        private titleService: Title,
        private metaService: Meta,
        public dialog: MatDialog)
    { }

    ngOnInit() {
        this.setTitleAndMeta();
    }

    private setTitleAndMeta() : void
    {
        this.titleService.setTitle("Европа: автобусные туры и экскурсии из Минска");
        this.metaService.updateTag({ name: 'description', content: "➤Автобусные туры в Европу по 47 направлениям! Экскурсионные маршруты 2020 из Минска и других городов. ➤Каталог из 3 857 предложений здесь➥" });
        this.metaService.updateTag({ name: 'keywords', content: "автобусные туры, автобусные туры из Минска, автобусные туры по Европе, туры по Европе, туры выходного дня, экскурсии, маршруты, тур на автобусе" });
    }

    public openOrderPopup(button : string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }
}
