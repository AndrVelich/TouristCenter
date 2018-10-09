﻿import { Component, Injectable, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterService } from "@administrationCommon/Services/register.service";
import { Register } from "@administrationCommon/Services/register.service";

@Component({
    
    moduleId: module.id,
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
        private router: Router
    )
    { }

    ngOnInit() 
    {
        this.buildForm();
    }

    public register()
    {
        this.registerService.register(this.registerModel)
        //TODO need notifcation
        .subscribe(
        (data) => 
        {
            if(data._body == 'success')
            {
                this.router.navigate(['administration'])
            }
            else
            {
                this.errorMessage = data;
            }  
        },
        error => this.errorMessage = error);
    }

    private buildForm() 
    {
        this.registerForm = this.fb.group({
            "email": [this.registerModel.email, [
                Validators.required
            ]],
            "password": [this.registerModel.password, [
                Validators.required
            ]],
            "confirmPassword": [this.registerModel.confirmPassword, [
                Validators.required
            ]],
        });
    }
}