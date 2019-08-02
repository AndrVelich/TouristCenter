import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSelectModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

import { AccountService } from "@administrationCommon/Services/account.service";
import { User } from "@administrationCommon/Services/account.service";
import { PageOptions } from "@common/Services/pager.service";
import { PagerComponent } from "@administrationCommon/Components/Pager/pager.component";
import { ConfirmationPopupComponent } from "@administrationCommon/Components/ConfirmationPopup/confirmationPopup.component";

@Component({
    selector: "users",
    templateUrl: "users.component.html"
})
export class UsersComponent implements OnInit 
{
    public errorMessage: string;
    public userCollection: Array<User> = new Array<User>();
    public pageOptions: PageOptions = new PageOptions(0, 20, 5);
    @ViewChild(PagerComponent, { static: false }) pagerComponent: PagerComponent;

    constructor(
        public dialog: MatDialog,
        private accountService: AccountService)
    { }

    ngOnInit()
    {

    }

    public openDeleteConfirmation(user: User) : void
    {
        this.dialog.open(ConfirmationPopupComponent, 
        {
            data: 'Вы уверены, что хототе удалить пользователя <b>' + user.email + '</b>?'
        })
            .afterClosed()
            .subscribe(result => {
                if(result)
                {
                    this.accountService.deleteUser(user.userId)
                        .subscribe(() => this.getUsersPage(this.pageOptions));
                }
            });
    }

    private getUsersPage(pageOptions: PageOptions)
    {
        this.pageOptions = pageOptions;
        this.accountService.getUsersPage(pageOptions.skip, pageOptions.take)
            .subscribe(data => {
                this.userCollection = data.userCollection;
                this.pagerComponent.updatePager(data.usersCount);
            });
    }

}
