import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from "@common/Services/pager.service";

@Injectable()
export class AccountService{
    private url: string = '/api/account/';

    constructor(private httpClient: HttpClient) { }

    public getUsersPage(skip: number, take: number): Observable<Page<User>>{
        return this.httpClient.get<Page<User>>(this.url + 'usersPage/' + skip + '/' + take);
    }

    public updateUser(user : User){
        return this.httpClient.put(this.url + 'user/', user);
    }

    public confirmEmailUser(email: string) {
        return this.httpClient.post(this.url + 'confirm/', email);
    }

    public deleteUser(userId: number) {
        return this.httpClient.delete(this.url + 'user/' + userId);
    }

}

export class User
{
    public userId: number
    public email: string
    public firstName: string
    public lastName: string
    public emailConfirmed: boolean
    public notificationEnabled: boolean
}
