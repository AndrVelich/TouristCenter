import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class RegisterService
{
    private url: string = '/api/account/register';

    constructor(private httpClient: HttpClient) { }

    public register(register: Register){
        return this.httpClient.post(this.url, register);
    }

}

export class Register
{
    public email: string
    public firstName: string
    public lastName: string
    public password : string
    public confirmPassword : string
}
