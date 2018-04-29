import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
    SharedLibsModule,
    AuthServerProvider,
    AccountService,
    UserService,
    LoginService,
    LoginModalService,
    LoginModalComponent,
    Principal,
    AccHasAnyAuthorityDirective,
    AlertComponent,
} from './';

@NgModule({
    imports: [
        SharedLibsModule
    ],
    declarations: [
        AlertComponent,
        LoginModalComponent,
        AccHasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        Principal,
        AuthServerProvider,
        UserService
    ],
    entryComponents: [LoginModalComponent],
    exports: [
        SharedLibsModule,
        LoginModalComponent,
        AccHasAnyAuthorityDirective,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule {}
