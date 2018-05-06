import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';
import {StoreFrontComponent} from "./components/store-front/store-front.component";

const appRoutes: Routes = [
    { path: '', component: StoreFrontComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
