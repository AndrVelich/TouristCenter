import { Component, Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSelectModule } from '@angular/material';
import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service";

@Component({
    
    moduleId: module.id,
    selector: "country",
    templateUrl: "country.component.html",
    styleUrls: ["country.component.css"]
})
export class CountryComponent {
    public tourTypes: Dictionary;
    public category: string;
    public countryForm: FormGroup;

    constructor(
        private tourTypeService: TourTypeService,
        private fb: FormBuilder
    )
    {
        this.tourTypes = this.tourTypeService.GetTourTypes();
    }

    ngOnInit() {
        this.buildForm();
    }

    private buildForm() {
        this.countryForm = this.fb.group({
            //"name": [this.order.name, [
            //    Validators.required,
            //    //Validators.minLength(4),
            //    //Validators.maxLength(15)
            //]],
            //"email": [this.order.email, [
            //    Validators.required,
            //    Validators.pattern("[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}")
            //]],
            //"countryCode": [this.order.countryCode, [
            //    Validators.required
            //]],
            //"phone": [this.order.phone, [
            //    Validators.required,
            //    Validators.pattern("\\d+")
            //]],
            //"service": [this.order.service, [
            //    Validators.required
            //]],
            //"isTechnicalTaskAvailable": [this.order.isTechnicalTaskAvailable, [
            //    Validators.required
            //]],
            //"isNeedUrgently": [this.order.isNeedUrgently, [
            //    Validators.required
            //]],
            //"description": [this.order.description, [
            //    Validators.required
            //]]
            "category": [this.category, [
                Validators.required
            ]],
        });
    }
}
