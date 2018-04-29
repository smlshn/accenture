import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { AppRoutingModule } from './app.routing.module';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { HttpService } from './http.service';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        ProductComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpClientXsrfModule,
        AppRoutingModule,
        NgHttpLoaderModule,
    ],
    providers: [
        HttpService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
