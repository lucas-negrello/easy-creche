import { Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth/auth.guard';
import {ProfileGuard} from './core/guards/profile/profile.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Easy Creche',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes')
      .then(r => r.Auth),
  },
  {
    path: '',
    canActivate: [AuthGuard, ProfileGuard],
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
