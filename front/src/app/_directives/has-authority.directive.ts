import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {AuthenticationService} from "../_services";

@Directive({
    selector: '[hasAuthority]'
})
export class HasAuthorityDirective implements OnInit, OnDestroy {


    constructor(private authService: AuthenticationService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit(): void {

    }

    @Input()
    set hasAuthority(value: string|string[]) {

        let userAuthorities = this.authService.getStoredUser().authorities;

        this.viewContainerRef.clear();
        for (let i = 0; i < userAuthorities.length; i++) {
            if (userAuthorities[i].name===value) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
                break;
            }
        }
    }

    ngOnDestroy(): void {

    }

}
