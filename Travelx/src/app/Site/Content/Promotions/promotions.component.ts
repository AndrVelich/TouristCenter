import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title, Meta } from '@angular/platform-browser';

import { OrderComponent } from "@siteCommon/Components/Order/order.component";
import { PromotionService } from "@siteCommon/Services/promotion.service";
import { Promotion } from "@siteCommon/Services/promotion.service";
import { PreloaderService } from "@common/Services/preloader.service";

@Component({
    
    
    selector: "promotions",
    templateUrl: "promotions.component.html",
    styleUrls: ["promotions.component.css"]
})
export class PromotionsComponent {
    public errorMessage: string;
    public promotionCollection: Array<Promotion> = new Array<Promotion>();

    constructor(
        private promotionService: PromotionService,
        private titleService: Title,
        private metaService: Meta,
        public dialog: MatDialog,
        public preloaderService : PreloaderService)
    { }

    ngOnInit() {
        this.getPromotionCollection();
        this.setTitleAndMeta();
    }

    private getPromotionCollection()
    {
        this.preloaderService.startPreloader();
        this.promotionService.getActivePromotionCollection()
        .subscribe(data => this.promotionCollection = data,
                    (err)=> console.log(err),
                    ()=> this.preloaderService.finishPreloader());
    }

    public openOrderPopup(button : string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }

    private setTitleAndMeta() : void
    {
        this.titleService.setTitle("Акции");
        this.metaService.addTag({ name: 'description', content: "Акции" });
    }
}
