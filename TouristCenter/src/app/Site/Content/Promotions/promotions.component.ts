import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { OrderComponent } from '../../Order/order.component';
import { ImagesPopupComponent } from '../ImagesPopup/imagesPopup.component';
import { PromotionService } from "@siteCommon/Services/promotion.service";
import { Promotion } from "@siteCommon/Services/promotion.service";

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
        private promotionService: PromotionService)
    { }

    ngOnInit() {
        this.getPromotionCollection();
    }

    private getPromotionCollection()
    {
        this.promotionService.getPromotionCollection()
        .subscribe(data => this.promotionCollection = data);
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
