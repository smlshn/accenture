import {Component} from '@angular/core';
import {AuthenticationService} from "./_services";

@Component({
    moduleId: module.id,
    selector: 'acc-main',
    templateUrl: 'app.component.html'
})

export class AppComponent {


    public constructor(private authenticationService: AuthenticationService) {
    }

    public logout(): void {
        this.authenticationService.logout();
    }
}
