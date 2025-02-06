import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
    
    {
        path: 'pharmacy',
        loadComponent: () => import('./pharmacy-form/pharmacy-form.component').then(c => c.PharmacyFormComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
        // canActivate: [AuthGuard]
    },
    {
        path: 'sidemenu',
        loadComponent: () => import('./side-menu/side-menu.component').then(c => c.SideMenuComponent)
    },
    { path: 'error/:code',
      loadComponent: () => import('./error/error.component').then(c => c.ErrorComponent),
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'change-password',
        loadComponent: () => import('./changepassword/change-password.component').then(c => c.ChangePasswordComponent)
    },
    {
        path: 'registrationsuccess',
        loadComponent: () => import('./registration-success/registration-success.component').then(c => c.RegistrationSuccessComponent)
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
