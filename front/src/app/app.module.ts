import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { AppRoutingModule } from './app.routing.module';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { HttpService } from './http.service';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import {MainComponent, NavbarComponent} from "./layouts";
import {SharedModule} from "./shared";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    declarations: [
        MainComponent,
        ProductComponent,
        NavbarComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        FormsModule,
        HttpClientModule,
        HttpClientXsrfModule,
        NgHttpLoaderModule,
    ],
    providers: [
        HttpService,
    ],
    bootstrap: [MainComponent]
})
export class AppModule {
}
