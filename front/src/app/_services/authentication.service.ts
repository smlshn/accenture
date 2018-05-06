import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {

        var header = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Access-Control-Allow-Origin', 'http://localhost:8080/api/authentication');




        const body = new HttpParams()
            .set('username', username)
            .set('password', password);

        return this.http.post<any>('http://localhost:8080/api/authentication', body,{headers:header,withCredentials:true})
            .map((response) => {

                console.log(response);
                this.getUser().subscribe(user => {
                    response = user;
                });

                return this.getUser();
        });
    }

    getUser(): Observable<any> {
        return this.http.get('http://localhost:8080/api/account',{withCredentials:true}) // define a variable server_url to assign the requested url
            .map((response: HttpResponse<any>) =>{
                return response;
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
