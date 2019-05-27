import { Component, OnInit } from "@angular/core";
import { MatSelectModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {Observable} from 'rxjs';


import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";

import { PromotionService } from "@administrationCommon/Services/promotion.service";
import { Promotion } from "@administrationCommon/Services/promotion.service";

@Component({
    
    
    selector: "promotions",
    templateUrl: "promotions.component.html",
    styleUrls: ["promotions.component.css"]
})
export class PromotionsComponent implements OnInit {
    public errorMessage: string;
    public promotionCollection: Array<Promotion> = new Array<Promotion>();

    constructor(
        public dialog: MatDialog,
        private promotionService: PromotionService)
    { }

    ngOnInit() {
        this.getPromotionCollection();
    }

    public openDeleteConfirmation(promotionId: number, promotionName: string) : void
    {
        this.dialog.open(ConfirmationPopupComponent, 
        {
            data: 'Вы уверены, что хототе удалить акцию <b>' + promotionName + '</b>?'
        })
            .afterClosed()
            .subscribe(result => {
                if(result)
                {
                     this.promotionService.deletePromotion(promotionId)
                        .subscribe(() => this.getPromotionCollection());
                }
            });
    }

    private getPromotionCollection()
    {
        this.promotionService.getPromotionCollection()
        .subscribe(data => this.promotionCollection = data);
    }
}
