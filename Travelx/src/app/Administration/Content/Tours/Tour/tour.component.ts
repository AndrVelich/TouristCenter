﻿import { Component, Injectable, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSelectModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { Dictionary } from "@common/Types/Dictionary";
import { TourTypeService } from "@common/Services/tourType.service";
import { PreloaderService } from "@common/Services/preloader.service";

import { CountryService } from "@administrationCommon/Services/country.service";
import { Country } from "@administrationCommon/Services/country.service";

import { TourService } from "@administrationCommon/Services/tour.service";
import { Tour } from "@administrationCommon/Services/tour.service";
import { CkeditorService } from "@administrationCommon/Services/ckeditor.service";

@Component({
    selector: "tour",
    templateUrl: "tour.component.html",
    styleUrls: ["tour.component.css"],
    providers: [CountryService]
})
export class TourComponent {
    private isCountriesLoaded: boolean;
    private returnUrl: string;
    public tourTypes: Dictionary;
    public category: string;
    public tourForm: FormGroup;
    public countries: Dictionary = new Dictionary();
    public tour: Tour = new Tour();
    public errorMessage: string;

    constructor(
        public ckeditorService: CkeditorService,
        private tourTypeService: TourTypeService,
        private countryService: CountryService,
        private tourService: TourService,
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private preloaderService: PreloaderService,
    ) {
        this.tourTypes = this.tourTypeService.GetTourTypes();
    }

    ngOnInit() {
        this.setDataFromRoute();
        this.getCountries();
        this.getTour();
        this.buildForm();
        this.setReturnUrl();
    }

    public onSelectImage(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]);

            reader.onload = () => {
                this.tour.newImageCollection.push(reader.result as string);
                event.target.value = null;
            }
        }
    }

    public removeNewImage(removeUrl) {
        this.tour.newImageCollection = this.tour.newImageCollection.filter(url => url != removeUrl);
    }

    public removeOldImage(removeUrl) {
        this.tour.oldImageCollection = this.tour.oldImageCollection.filter(url => url != removeUrl);
    }

    public saveTour() {
        this.preloaderService.startPreloader();
        this.tourService.addTour(this.tour)
            .subscribe(
                () => {
                    this.navigateToTours();
                },
                error => this.errorMessage = error,
                () => this.preloaderService.finishPreloader());
    }

    public navigateToTours(): void {
        if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
        }
        else {
            this.router.navigate(['administration/tours'])
        }
    }

    private setReturnUrl(): string {
        let returnUrl = null;
        let queryParams = this.activeRoute.snapshot.queryParams;
        if (queryParams) {
            this.returnUrl = queryParams.returnUrl;
        }

        return returnUrl;
    }

    private setDataFromRoute() {
        this.activeRoute.params.subscribe(params => {
            this.tour.category = params['tourType'];
            this.tour.country = params['country'];
            this.tour.urlName = params['tour'];
        });
    }

    public isCountrySelectDisabled() {
        let result = this.isCountriesLoaded || !this.tour.category;
        return result;
    }

    public onChangeCategory() {
        this.getCountries();
    }

    private getTour() {
        if (this.tour.category && this.tour.country && this.tour.urlName) {
            this.preloaderService.startPreloader();
            this.tourService.getTour(this.tour.category, this.tour.country, this.tour.urlName)
                .subscribe(data => this.tour = data,
                    error => this.errorMessage = error,
                    () => this.preloaderService.finishPreloader());
        }
    }

    private getCountries() {
        if (this.tour.category) {
            this.isCountriesLoaded = true;
            this.countryService.getCountriesPage(this.tour.category)
                .subscribe(data => {
                    this.countries = new Dictionary();
                    data.collection.map((country) => this.countries.add(country.urlName, country.name));
                    this.isCountriesLoaded = false;
                });
        }
    }

    private buildForm() {
        this.tourForm = this.fb.group({
            "name": [this.tour.name, [
                Validators.required,
            ]],
            "urlName": [this.tour.urlName, [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.-]+$')
            ]],
            "city": [this.tour.city, [
                Validators.required
            ]],
            "price": [this.tour.price, [
                Validators.required,
                Validators.min(0)
            ]],
            "stars": [this.tour.stars, [
                Validators.required,
                Validators.min(2),
                Validators.max(5)
            ]],
            "description": [this.tour.description],
            "country": [this.tour.country, [
                Validators.required
            ]],
            "category": [this.tour.category, [
                Validators.required
            ]],
            "nights": [this.tour.nights, [
                Validators.required,
                Validators.min(0)
            ]],
            "isFlightIncluded": [this.tour.isFlightIncluded],
        });
    }
}
