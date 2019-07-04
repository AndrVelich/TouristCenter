import { Component, Injectable, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

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
                Validators.required,
                Validators.email
            ]],
            passwordGroup: this.fb.group({
                "password": [this.registerModel.password, [
                    Validators.required,
                    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).*$')
                ]],
                "confirmPassword": ['', [
                    Validators.required,
                ]],
            }, { validator: this.checkPasswords }),
        });
    }

    private checkPasswords(group: FormGroup) { 
        let pass = group.controls.password.value;
        let confirmPass = group.controls.confirmPass.value;

        return pass === confirmPass ? null : { notSame: true }
    }
}
