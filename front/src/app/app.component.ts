import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader/spinkits';
import { PendingInterceptorService } from 'ng-http-loader/services/pending-interceptor.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public spinkit = Spinkit;

    constructor(pendingInterceptorService: PendingInterceptorService) {
        pendingInterceptorService.pendingRequestsStatus.subscribe(pending => {
            if (!pending) {
                console.log('No tracked http requests pending anymore');
            }
        });
    }
}
