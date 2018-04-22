import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SecondComponent } from './second/second.component';
import { FirstComponent } from './first/first.component';
import { AppRoutingModule } from './app.routing.module';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { UploadComponent } from './upload/upload.component';
import { HttpService } from './http.service';
import { UploadService } from './upload/upload.service';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        FirstComponent,
        SecondComponent,
        UploadComponent,
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
        UploadService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
