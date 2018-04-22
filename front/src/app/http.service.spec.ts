import { inject, TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HttpServiceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HttpService]
        });
    });

    it('should create a service instance', inject([HttpService], (service: HttpService) => {
        expect(service).toBeTruthy();
    }));
});
