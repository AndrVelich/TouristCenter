import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { OrderComponent } from '../../Order/order.component';
import { ImagesPopupComponent } from '../ImagesPopup/imagesPopup.component';
import { PromotionService } from "@siteCommon/Services/promotion.service";
import { Promotion } from "@siteCommon/Services/promotion.service";
import { PreloaderService } from "@common/Services/preloader.service";

@Component({
    
    moduleId: module.id,
    selector: "promotions",
    templateUrl: "promotions.component.html",
    styleUrls: ["promotions.component.css"]
})
export class PromotionsComponent {
    public errorMessage: string;
    public promotionCollection: Array<Promotion> = new Array<Promotion>();

    constructor(
        public dialog: MatDialog,
        private promotionService: PromotionService,
        public preloaderService : PreloaderService)
    { }

    ngOnInit() {
        this.getPromotionCollection();
    }

    private getPromotionCollection()
    {
        this.preloaderService.startPreloader();
        this.promotionService.getPromotionCollection()
        .subscribe(data => this.promotionCollection = data,
                    (err)=> console.log(err),
                    ()=> this.preloaderService.finishPreloader());
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
