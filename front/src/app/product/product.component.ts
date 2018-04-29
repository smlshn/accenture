import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { SpinnerVisibilityService } from 'ng-http-loader/services/spinner-visibility.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    datalist: string[] = [];
    datalistselection: string;

    constructor(private http: HttpService, private visibilityService: SpinnerVisibilityService) {
    }

    ngOnInit(): void {
        this.http.datalist().subscribe(
            d => this.datalist = d
        );
    }

    datalistSelectionChange(event: string) {
        this.datalistselection = event;
    }

    isInList() {
        if (!!this.datalistselection) {
            const inList = this.datalist.some((a: any) => {
                return a.name === this.datalistselection;
            });

            this.datalistselection = inList ? this.datalistselection : null;
        }
    }

    toggleSpinner() {
        this.visibilityService.show();

        setTimeout(() => {
            this.visibilityService.hide();
        }, 2000);
    }
}
