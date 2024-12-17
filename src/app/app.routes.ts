import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {path: 'admin', loadChildren:()=>import('./admin/admin.module').then(adm=>adm.AdminModule),canActivate:[AuthGuard]},
    {path: 'auth', loadChildren:()=>import('./auth/auth.module').then(auth=>auth.AuthModule)},
    {path: '**',redirectTo:'auth'}
];
