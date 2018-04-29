import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        NgbModule.forRoot()
    ],
    exports: [
        FormsModule,
        HttpClientModule,
        CommonModule,
        NgbModule
    ]
})
export class SharedLibsModule {}
