import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';
import {StoreFrontComponent} from "./components/store-front/store-front.component";
import {LoginComponent} from "./components";

const appRoutes: Routes = [
    { path: '', component: StoreFrontComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent},
    { path: 'store-front', component: StoreFrontComponent },

    // otherwise redirect to home
];

export const routing = RouterModule.forRoot(appRoutes);
