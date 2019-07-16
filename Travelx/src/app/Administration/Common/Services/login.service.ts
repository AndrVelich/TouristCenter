import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Result } from "@common/Types/Result";

@Injectable()
export class LoginService
{
    private url: string = '/api/account/login';

    constructor(private http: Http) 
    {
        
    }

    public login(login: Login){
        return this.http.post(this.url, login).pipe(
            map((res: Response) => <Result>res.json()),
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

export class Login
{
    public email : string
    public password: string
    public rememberMe: boolean
}
