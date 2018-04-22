import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstComponent } from './first.component';
import { UploadComponent } from '../upload/upload.component';
import { UploadService } from '../upload/upload.service';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpinnerVisibilityService } from 'ng-http-loader/services/spinner-visibility.service';


describe('FirstComponent', () => {
    let component: FirstComponent;
    let fixture: ComponentFixture<FirstComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FirstComponent, UploadComponent],
            imports: [HttpClientTestingModule, FormsModule],
            providers: [UploadService, HttpService, SpinnerVisibilityService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FirstComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create a component instance', () => {
        expect(component).toBeTruthy();
    });
});
