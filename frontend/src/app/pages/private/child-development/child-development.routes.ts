import { Routes } from "@angular/router";
import {AdminGuard} from '../../../core/guards/route/admin.guard';

export const ChildDevelopmentRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./child-development.component')
      .then(c => c.ChildDevelopmentComponent),
  },
  {
    path: 'create',
    canActivate: [AdminGuard],
    loadComponent: () => import('./components/child-development-form/child-development-form.component')
      .then(c => c.ChildDevelopmentFormComponent),
  },
  {
    path: ':id/edit',
    canActivate: [AdminGuard],
    loadComponent: () => import('./components/child-development-form/child-development-form.component')
      .then(c => c.ChildDevelopmentFormComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./components/child-development-form/child-development-form.component')
      .then(c => c.ChildDevelopmentFormComponent),
  },
];
