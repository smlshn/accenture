import { Component, OnDestroy, OnInit } from '@angular/core';
import { JhiAlertService } from '../../service/alert.service';
import {JhiAlert} from "../../service";

@Component({
    selector: 'acc-alert',
    template: `
        <div class="alerts" role="alert">
            <div *ngFor="let alert of alerts" class="toast">
                <ngb-alert *ngIf="alert && alert.type && alert.msg" [type]="alert.type" (close)="alert.close(alerts)">
                    <pre [innerHTML]="alert.msg"></pre>
                </ngb-alert>
            </div>
        </div>`
})
export class AlertComponent implements OnInit, OnDestroy {
    alerts: JhiAlert[];

    constructor(private alertService: JhiAlertService) { }

    ngOnInit() {
        this.alerts = this.alertService.get();
    }

    ngOnDestroy() {
        this.alerts = [];
    }

}
