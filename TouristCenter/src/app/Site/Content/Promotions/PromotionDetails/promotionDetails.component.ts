import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { OrderComponent } from '../../../Order/order.component';
import { PromotionService } from "@siteCommon/Services/promotion.service";
import { Promotion } from "@siteCommon/Services/promotion.service";

@Component({
    
    moduleId: module.id,
    selector: "promotionDetails",
    templateUrl: "promotionDetails.component.html",
    styleUrls: ["promotionDetails.component.css"]
})
export class PromotionDetailsComponent {

    public promotion: Promotion = new Promotion();
    public errorMessage: string;

    constructor(
        public dialog: MatDialog,
        private promotionService: PromotionService,
        private activeRoute: ActivatedRoute,
        private router: Router
    )
    {

    }

    ngOnInit() {
        this.setDataFromRoute(); 
        this.getPromotion();
    }

    private setDataFromRoute(){
        this.activeRoute.params.subscribe(params => {
             this.promotion.urlName =  params['promotion'];
        });
    }

    private getPromotion()
    {
        this.promotionService.getPromotion(this.promotion.urlName)
            .subscribe(data => this.promotion = data);
    }

    public openOrderPopup() {
        let dialogRef = this.dialog.open(OrderComponent);
    }
}
