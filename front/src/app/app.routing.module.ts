import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {navbarRoute} from "./layouts";


const routes: Routes = [
    navbarRoute,
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
