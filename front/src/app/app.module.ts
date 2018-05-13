import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import {AlertService, AuthenticationService, OrderService} from './_services/index';
import {LoginComponent, ShoppingOrderComponent} from './components/index';
import {StoreFrontComponent} from "./components/store-front/store-front.component";
import {ProductsDataService} from "./_services/products.service";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HasAuthorityDirective} from "./_directives/has-authority.directive";

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HasAuthorityDirective,
        ShoppingOrderComponent,
        StoreFrontComponent,
        LoginComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        OrderService,
        ProductsDataService,
        AuthenticationService
    ],
})

export class AppModule { }
