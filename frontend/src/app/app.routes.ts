import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Easy Creche',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes')
      .then(r => r.Auth),
  },
  {
    path: '',
    loadChildren: () => import('./pages/private/private.routes')
      .then(r => r.Private),
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/error/error.routes')
      .then(r => r.Error),
  },
  {
    path: '**',
    redirectTo: 'error/not-found',
  }
];
