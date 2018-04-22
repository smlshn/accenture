import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../http.service';
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'app-second',
    templateUrl: './second.component.html',
    styleUrls: ['./second.component.css']
})
export class SecondComponent {

    runImmutableQuery: Observable<String[]>;
    upperCased: String[];
    successQueryResults: String[];
    userAgentResults: String[];
    slowQueryResults: String[];
    errorMessage: any;

    constructor(private httpService: HttpService) {
    }

    private resetFields() {
        this.successQueryResults = [];
        this.slowQueryResults = [];
        this.upperCased = [];
        this.errorMessage = [];
        this.userAgentResults = [];
    }

    callServices() {
        this.resetFields();

        Observable.forkJoin([
            this.httpService.runSuccessQuery(),
            this.httpService.runSlowQuery(),
            this.httpService.manualObservable()
        ])
            .subscribe(
                results => {
                    console.log(results);
                    this.successQueryResults = results[0];
                    this.slowQueryResults = results[1];
                    this.upperCased = results[2];
                },
                error => this.errorMessage = <any>error
            );
    }

    parseUserAgent() {
        this.resetFields();

        this.httpService.runUserAgent()
            .subscribe(
                results => this.userAgentResults = results,
                error => this.errorMessage = <any>error
            );
    }

    singleServiceCall() {
        this.resetFields();

        this.httpService.runSuccessQuery()
            .subscribe(
                results => this.successQueryResults = results,
                error => this.errorMessage = <any>error
            );
    }

    multipleSubscribe() {
        this.resetFields();
        if (!this.runImmutableQuery) {
            this.runImmutableQuery = this.httpService.runImmutableQuery();
        }

        this.runImmutableQuery
            .subscribe(
                results => this.successQueryResults = ['fake result'],
                error => this.errorMessage = <any>error
            );

        setTimeout(() => {
            this.runImmutableQuery
                .subscribe(
                    results => this.successQueryResults = results,
                    error => this.errorMessage = <any>error
                );
        }, 2000);

        setTimeout(() => {
            this.runImmutableQuery
                .subscribe(
                    results => this.successQueryResults = ['fake result2'],
                    error => this.errorMessage = <any>error
                );
        }, 4000);

        setTimeout(() => {
            this.runImmutableQuery
                .subscribe(
                    results => this.successQueryResults = results,
                    error => this.errorMessage = <any>error
                );
        }, 6000);
    }
}

