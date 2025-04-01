import {Routes} from '@angular/router';
import {AuthLayoutComponent} from '../../layouts/auth-layout/auth-layout.component';

export const Auth: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./login/login.component')
          .then(c => c.LoginComponent),
      },
      {
        path: 'forgot-password',
        title: 'Forgot Password',
        loadComponent: () => import('./forgot-password/forgot-password.component')
          .then(c => c.ForgotPasswordComponent),
      },
      {
        path: 'reset/:token/:email',
        title: 'New Password',
        loadComponent: () => import('./new-password/new-password.component')
          .then(c => c.NewPasswordComponent),
      },
    ]
  }
]
