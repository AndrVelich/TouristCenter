import {throwError as observableThrowError,  Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Dictionary } from "@common/Types/Dictionary";
import { Http, Response } from "@angular/http";

@Injectable()
export class AccountService{
    private url: string = '/api/account/';

    constructor(private http: Http) 
    {
        
    }

    public getUsersPage(skip: number, take: number): Observable<UsersPage>{
        return this.http.get(this.url + 'usersPage/' + skip + '/' + take).pipe(
            map((res: Response) => <UsersPage>res.json()),
            catchError(this.handleError),);
    }

    public deleteUser(userId : number){
        return this.http.delete(this.url + 'user/' + userId).pipe(
            catchError(this.handleError));
    }

    private handleError(error: any, cought: Observable<any>): any 
    {
        let message = "";

        if (error instanceof Response) {
            let errorData = error.json().error || JSON.stringify(error.json());
            message = `${error.status} - ${error.statusText || ''} ${errorData}`
        } else {
            message = error.message ? error.message : error.toString();
        }

        console.error(message);

        return observableThrowError(message);
    }
}

export class User
{
    public userId: number
    public email: string
}

export class UsersPage
{
    public usersCount: number
    public userCollection: Array<User>
}
