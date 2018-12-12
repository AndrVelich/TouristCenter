import { Component, Injectable, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

import { PromotionService } from "@administrationCommon/Services/promotion.service";
import { Promotion } from "@administrationCommon/Services/promotion.service";

@Component({
    
    moduleId: module.id,
    selector: "promotion",
    templateUrl: "promotion.component.html",
    styleUrls: ["promotion.component.css"]
})
export class PromotionComponent implements OnInit  {
    public promotionForm: FormGroup;
    public promotion: Promotion = new Promotion();
    public errorMessage: string;

    constructor(
        private promotionService: PromotionService,
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private router: Router
    )
    {

    }

    ngOnInit() {
        this.setDataFromRoute(); 
        this.getPromotion();
        this.buildForm();
    }

    public onSelectImage(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]);

            reader.onload = () => {
                this.promotion.newImageCollection.push(reader.result as string);
                event.target.value = null;
            }
        }
    }

    public removeNewImage(removeUrl){
        this.promotion.newImageCollection = this.promotion.newImageCollection.filter(url => url != removeUrl);
    }

    public removeOldImage(removeUrl){
        this.promotion.oldImageCollection = this.promotion.oldImageCollection.filter(url => url != removeUrl);
    }

    public savePromotion(){
        this.promotionService.addPromotion(this.promotion)
      //TODO need notifcation
      .subscribe(
      () => 
      {
            this.router.navigate(['administration/promotions'])
      },
      error => this.errorMessage = error);
    }

    private setDataFromRoute(){
        this.activeRoute.params.subscribe(params => {
             var urlParameter =  params['promotion'];
             if(urlParameter && urlParameter != 'new')
             {
                this.promotion.urlName = urlParameter;
             }
        });
    }

    private getPromotion()
    {
        if(this.promotion && this.promotion.urlName)
        {
            this.promotionService.getPromotion(this.promotion.urlName)
            .subscribe(data => this.promotion = data);
        }
    }

    private buildForm() {
        this.promotionForm = this.fb.group({
            "name": [this.promotion.name, [
                Validators.required,
                //Validators.minLength(2),
                //Validators.maxLength(15)
            ]],
            "urlName": [this.promotion.urlName, [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.-]+$')
            ]],
            "description": [this.promotion.description, [
                Validators.required
            ]],
            "untilDate": [this.promotion.untilDate, [
                Validators.required
            ]],
            "title": [this.promotion.title, []],
            "metaDescription": [this.promotion.metaDescription, []],
            "metaKeywords": [this.promotion.metaKeywords, []],
        });
    }
}
