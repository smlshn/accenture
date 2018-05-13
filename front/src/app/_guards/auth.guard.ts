import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from "../_services";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.authenticationService.isAuthenticated()) {
            // logged in so return true
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

        return true;
    }
}
