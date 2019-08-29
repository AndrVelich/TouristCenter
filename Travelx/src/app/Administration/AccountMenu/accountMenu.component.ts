import { Component, Injectable, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

import { AccountService, User } from "@administrationCommon/Services/account.service";

@Component({
    selector: "accountMenu",
    templateUrl: "accountMenu.component.html",
    styleUrls: ["accountMenu.component.css"]
})
export class AccountMenuComponent implements OnInit  {
    public currentUser: User;

    constructor(
        public accountService: AccountService,
    )
    {

    }

    ngOnInit() {
        this.getCurrentUser();
    }

    private getCurrentUser() {
        this.accountService.getCurrentUser()
            .subscribe(user => this.currentUser = user);
    }
}
