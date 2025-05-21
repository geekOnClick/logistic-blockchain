import { Routes } from '@angular/router';
import { AuthComponent } from '../libs/auth/auth.component';
import { Web3Component } from '../libs/pages/web3/web3.component';
import { NotFoundComponent } from '../libs/pages/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: "", component: AuthComponent },
    {
        path: "web2",
        // loadComponent: () => import('../libs/pages/web2/web2.component').then(c => c.Web2Component),
        loadChildren: () => import('../libs/pages/web2/web2.routes').then(r => r.WEB2_ROUTES)
    },
    { path: "web3", component: Web3Component, canActivate: [AuthGuard] },
    { path: "**", component: NotFoundComponent }
];
