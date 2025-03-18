import {Routes} from '@angular/router';
import {ErrorLayoutComponent} from '../../layouts/error-layout/error-layout.component';

export const Error: Routes = [
  {
    path: '',
    component: ErrorLayoutComponent,
    children: [
      {
        path: 'not-found',
        title: 'Not Found',
        loadComponent: () => import('./not-found/not-found.component')
          .then(c => c.NotFoundComponent),
      },
      {
        path: 'access-denied',
        title: 'Access denied',
        loadComponent: () => import('./access-denied/access-denied.component')
          .then(c => c.AccessDeniedComponent),
      }
    ]
  }
]
