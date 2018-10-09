import { Component, Injectable, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from "@administrationCommon/Services/login.service";
import { Login } from "@administrationCommon/Services/login.service";

@Component({
    
    moduleId: module.id,
    selector: "login",
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit  {
    public loginForm: FormGroup;
    public loginModel: Login = new Login();
    public errorMessage: string;

    constructor(
        private loginService: LoginService,
        private fb: FormBuilder,
        private router: Router
    )
    {

    }

    ngOnInit() {
        this.buildForm();
    }

    public login(){
        this.loginService.login(this.loginModel)
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

    private buildForm() {
        this.loginForm = this.fb.group({
            "email": [this.loginModel.email, [
                Validators.required
            ]],
            "password": [this.loginModel.password, [
                Validators.required
            ]],
        });
    }
}
