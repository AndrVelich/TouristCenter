import { Component, Injectable, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSelectModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service"; 
import { CountryService } from "@administrationCommon/Services/country.service";
import { Country } from "@administrationCommon/Services/country.service";

@Component({
    
    moduleId: module.id,
    selector: "country",
    templateUrl: "country.component.html",
    styleUrls: ["country.component.css"]
})
export class CountryComponent implements OnInit  {
    private tourType: string;
    private countryUrlName: string;

    public tourTypes: Dictionary;
    public category: string;
    public countryForm: FormGroup;
    public country: Country = new Country();
    public errorMessage: string;

    constructor(
        private tourTypeService: TourTypeService,
        private countryService: CountryService,
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private router: Router
    )
    {
        this.tourTypes = this.tourTypeService.GetTourTypes();
    }

    ngOnInit() {
        this.setDataFromRoute(); 
        this.getCountry();
        this.buildForm();
        
    }

    public onSelectImage(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]);

            reader.onload = () => {
                this.country.newImageCollection.push(reader.result);
                event.target.value = null;
            }
        }
    }

    public removeNewImage(removeUrl){
        this.country.newImageCollection = this.country.newImageCollection.filter(url => url != removeUrl);
    }

    public removeOldImage(removeUrl){
        this.country.oldImageCollection = this.country.oldImageCollection.filter(url => url != removeUrl);
    }

    public saveCountry(){
        this.countryService.addCountry(this.country)
      //TODO need notifcation
      .subscribe(
      () => 
      {
            this.router.navigate(['administration/countries'])
      },
      error => this.errorMessage = error);
    }

    private setDataFromRoute(){
        this.activeRoute.params.subscribe(params => {
            this.tourType = params['tourType'];
            this.countryUrlName =  params['country'];
        });
    }

    private getCountry()
    {
        if(this.countryUrlName)
        {
            this.countryService.getCountry(this.tourType, this.countryUrlName)
            .subscribe(data => this.country = data);
        }
    }

    private buildForm() {
        this.countryForm = this.fb.group({
            "name": [this.country.name, [
                Validators.required,
                //Validators.minLength(2),
                //Validators.maxLength(15)
            ]],
            "urlName": [this.country.urlName, [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9]+$')
            ]],
            "threeStarsPrice": [this.country.threeStarsPrice, [
                Validators.required,
                Validators.min(0)
            ]],
            "fourStarsPrice": [this.country.fourStarsPrice, [
                Validators.required,
                Validators.min(0)
            ]],
            "fiveStarsPrice": [this.country.fiveStarsPrice, [
                Validators.required,
                Validators.min(0)
            ]],
            "description": [this.country.description, [
                Validators.required
            ]],
            "pageContent": [this.country.pageContent, [
                Validators.required
            ]],
            "category": [this.country.category, [
                Validators.required
            ]],
        });
    }
}
