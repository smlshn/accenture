import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Router} from "@angular/router";
import {User} from "../_models";

@Injectable()
export class AuthenticationService {

    constructor(private router: Router,
                private http: HttpClient) { }

    login(username: string, password: string) {

        var header = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded');

        const body = new HttpParams()
            .set('username', username)
            .set('password', password);

        return this.http.post<any>('http://localhost:8080/api/authentication', body,{headers:header,withCredentials:true});

    }

    getStoredUser(): User{
        return JSON.parse(localStorage.user);
    }

    getUser(): Observable<any> {
        return this.http.get('http://localhost:8080/api/account',{withCredentials:true}) // define a variable server_url to assign the requested url
            .map((response: HttpResponse<any>) =>{
                return response;
        });
    }

    isAuthenticated(){
        if(localStorage.getItem('user'))
            return true;

        return false;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        window.location.reload();
    }
}
