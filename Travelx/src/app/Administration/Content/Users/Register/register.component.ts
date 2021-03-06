﻿import { Component, Injectable, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

import { Result } from "@common/Types/Result";
import { PreloaderService } from "@common/Services/preloader.service";

import { RegisterService } from "@administrationCommon/Services/register.service";
import { Register } from "@administrationCommon/Services/register.service";

@Component({
    selector: "register",
    templateUrl: "register.component.html",
    styleUrls: ["register.component.css"]
})
export class RegisterComponent implements OnInit  {
    public registerForm: FormGroup;
    public registerModel: Register = new Register();
    public errorMessage: string;

    constructor(
        private registerService: RegisterService,
        private fb: FormBuilder,
        private router: Router,
        private preloaderService: PreloaderService,
    )
    { }

    ngOnInit() 
    {
        this.buildForm();
    }

    public register()
    {
        this.preloaderService.startPreloader();
        this.registerService.register(this.registerModel)
        .subscribe(
            (result: Result) =>
            {
                if (result.isSuccess) {
                    this.router.navigate(['administration/users']);
                }
                else {
                    this.errorMessage = result.errorMessage;
                }
            },
            error => this.errorMessage = error,
            () => this.preloaderService.finishPreloader());
    }

    private buildForm() 
    {
        this.registerForm = this.fb.group({
            "email": [this.registerModel.email, [
                Validators.required,
                Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')
            ]],
            "firstName": [this.registerModel.firstName, [Validators.required]],
            "lastName": [this.registerModel.lastName, [Validators.required]],
            "password": [this.registerModel.password, [
                Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).*$'),
            ]],
            "confirmPassword": [this.registerModel.confirmPassword, [Validators.required]]
        },
        {
            validator: this.checkPasswords
        });
    }

    private checkPasswords(group: FormGroup) {
        let passwordValue = group.controls.password;
        let confirmControl = group.controls.confirmPassword;
        let result = passwordValue.value === confirmControl.value;

        if (result) {
            confirmControl.setErrors(null);
        }
        else {
            confirmControl.setErrors({ passwordMatched: true });
        }
    }

}

