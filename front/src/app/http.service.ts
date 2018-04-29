import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, publishLast, refCount, tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import {SERVER_API_URL} from "./app.constants";


@Injectable()
export class HttpService {
    success: Observable<any>;

    constructor(private http: HttpClient) {
    }

    runUserAgent() {
        return this.http.get('api/useragent').pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    runSuccessQuery(): Observable<String[]> {
        return this.http.post(
            'api/service1',
            null
        ).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    runSlowQuery(): Observable<String[]> {
        const headers: HttpHeaders = new HttpHeaders();
        const httpHeaders = headers.append('x-requested-with', 'XmlHttpRequest');
        const requestURL = SERVER_API_URL + 'slowservice';

        return this.http.get(requestURL,
            {
                'headers': httpHeaders
            }
        ).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    runImmutableQuery(): Observable<String[]> {
        this.success = this.http.post(
            'api/service1',
            null
        ).pipe(
            map(this.extractData),
            catchError(this.handleError),
            publishLast(),
            refCount()
        );
        return this.success;
    }

    manualObservable(): Observable<String[]> {
        return Observable.of(['a', 'b', 'c'])
            .pipe(
                map(r => r.map(a => a.toUpperCase())),
                tap(r => console.log(r)),
                catchError(this.handleError),
            );
    }

    datalist(): Observable<any> {
        return this.http
            .get('api/datalist')
            .pipe(
                map(this.extractData),
                catchError(this.handleError),
            );
    }

    private extractData(res: any) {
        return res || {};
    }

    private handleError(error: HttpErrorResponse | any) {
        return Observable.throw(error);
    }


}
