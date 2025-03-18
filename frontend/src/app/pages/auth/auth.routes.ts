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
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./register/register.component')
          .then(c => c.RegisterComponent),
      },
      {
        path: 'forgot-password',
        title: 'Forgot Password',
        loadComponent: () => import('./forgot-password/forgot-password.component')
          .then(c => c.ForgotPasswordComponent),
      },
      {
        path: 'new-password',
        title: 'New Password',
        loadComponent: () => import('./new-password/new-password.component')
          .then(c => c.NewPasswordComponent),
      },
      {
        path: 'verification',
        title: 'Verification',
        loadComponent: () => import('./verification/verification.component')
          .then(c => c.VerificationComponent),
      }
    ]
  }
]
