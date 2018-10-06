import { Component, OnInit } from "@angular/core";
import { MatSelectModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { PromotionService } from "@administrationCommon/Services/promotion.service";
import { Promotion } from "@administrationCommon/Services/promotion.service";

@Component({
    
    moduleId: module.id,
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

    private getPromotionCollection()
    {
        this.promotionService.getPromotionCollection()
        .subscribe(data => this.promotionCollection = data);
    }
}
