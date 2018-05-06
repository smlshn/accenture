import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {

        var header = new HttpHeaders({'Content-Type': 'application/form-data'});

        let formData:FormData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        return this.http.post<any>('http://localhost:8080/api/authentication', formData,{headers:header})
            .map(user => {
                debugger;
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
