import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { OrderComponent } from "@siteCommon/Components/Order/order.component";
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
        private router: Router,
        private titleService: Title,
        private metaService: Meta,
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
            .subscribe(data => { this.promotion = data;
                this.setTitleAndMeta();
            });
    }

    private setTitleAndMeta() : void
    {

        if(this.promotion)
        {
            if(this.promotion.title != null)
            {
                this.titleService.setTitle(this.promotion.title);
            }
            else
            {
                this.titleService.setTitle(this.promotion.name);
            }
            
        }

        if(this.promotion && this.promotion.metaDescription != null)
        {
            this.metaService.addTag({ name: 'description', content: this.promotion.metaDescription });
        }

        if(this.promotion && this.promotion.metaKeywords != null)
        {
            this.metaService.addTag({ name: 'keywords', content: this.promotion.metaKeywords });
        }
    }

    public openOrderPopup(button : string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }
}
