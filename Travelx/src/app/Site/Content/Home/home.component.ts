import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { Title, Meta } from '@angular/platform-browser';

@Component({
    
    moduleId: module.id,
    selector: "home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.css"]
})
export class HomeComponent  {

    constructor(
        public dialog: MatDialog,
        private titleService: Title,
        private metaService: Meta,)
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
        this.titleService.setTitle("Турфирма в Минске| Центр организации отдыха «Travel X»");
        this.metaService.addTag({ name: 'description', content: "➤Турфирма «Travel X» в Минске. ➤Поиск по 9.430 турам. ➤Актуальные цены от 96$. ➤Организация отдыха «под ключ». Заходите на сайт и выбирайте путёвку! ➥" });
        this.metaService.addTag({ name: 'keywords', content: "турфирма Минск, поиск тура, турагентство Минск, туристическая фирма, трэвел х, трэвел икс, тревел х, тревел икс, турфирма, турагентство, туристическая компания, надежная турфирма" });
    }

}
