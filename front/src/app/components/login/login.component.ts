import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
        this.model.username="ismailsahin@gmail.com";
        this.model.password="asdf";
    }

    ngOnInit() {
        debugger;
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        debugger;
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    debugger;
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    debugger;
                    this.authenticationService.getUser().subscribe(user=>{
                        localStorage.setItem('user',JSON.stringify(user));
                        this.router.navigate([this.returnUrl]);
                    },
                      error2=>  {
                            this.alertService.error("wrong email or password");
                        });
                });
    }
}
