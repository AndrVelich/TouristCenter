import { Component, Injectable, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from "@administrationCommon/Services/login.service";
import { Login } from "@administrationCommon/Services/login.service";
import { Result } from "@common/Types/Result";

@Component({
    selector: "login",
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit  {
    public loginForm: FormGroup;
    public loginModel: Login = new Login();
    public redirectUrl: string;
    public errorMessage: string;

    constructor(
        private loginService: LoginService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router
    )
    {

    }

    ngOnInit() {
        this.buildForm();
        this.setReturnUrl();
    }

    public login()
    {
        this.loginService.login(this.loginModel)
        .subscribe(
            (result: Result) =>
                {
                    if (result.isSuccess) {
                        if (this.redirectUrl) {
                            this.router.navigateByUrl(this.redirectUrl);
                        }
                        else {
                            this.router.navigate(['administration']);
                        }
                    }
                    else {
                        this.errorMessage = "User name or password is incorrect";
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
            "rememberMe": [this.loginModel.rememberMe]
        });
    }

    private setReturnUrl()
    {
        this.redirectUrl = this.activatedRoute.snapshot.queryParams['ReturnUrl'];
    }
}
