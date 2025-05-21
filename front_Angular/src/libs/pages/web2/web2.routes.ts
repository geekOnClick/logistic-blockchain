import { Routes } from "@angular/router";
import { Web2Component } from "./web2.component";
import { Web2ProfileComponent } from "./components/profile/profile.component";
import { Web2LoginComponent } from "./components/login/login.component";
import { Web2AuthComponent } from "./components/auth/auth.component";

export const WEB2_ROUTES: Routes = [
    {
        path: '',
        component: Web2Component,
        children: [
            { path: 'profile', component: Web2ProfileComponent },
            { path: 'login', component: Web2LoginComponent },
            { path: 'auth', component: Web2AuthComponent },
            { path: '', redirectTo: 'auth', pathMatch: 'full' },
        ],
    },
];