import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

// import {DashboardModule} from '../app/dashboard/dashboard.module'
// import {AuthModule} from '../app/auth/auth.module'

const appRoutes: Routes = [
    {
        path: 'auth',
        // loadChildren: './auth/auth.module#AuthModule'
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'dashboard',
        // loadChildren: './dashboard/dashboard.module#DashboardModule',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'customers',
        // loadChildren: './customers/customers.module#CustomersModule',
        loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        // loadChildren: './users/users.module#UsersModule',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'account',
        // loadChildren: './account/account.module#AccountModule',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'icons',
        // loadChildren: './icons/icons.module#IconsModule',
        loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'typography',
        // loadChildren: './typography/typography.module#TypographyModule',
        loadChildren: () => import('./typography/typography.module').then(m => m.TypographyModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'about',
        // loadChildren: './about/about.module#AboutModule',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
