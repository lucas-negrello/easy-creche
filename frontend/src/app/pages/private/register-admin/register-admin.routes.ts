import { Routes } from "@angular/router";

export const RegisterAdminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./register-admin.component')
      .then(c => c.RegisterAdminComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./components/register-admin-form/register-admin-form.component')
      .then(c => c.RegisterAdminFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./components/register-admin-form/register-admin-form.component')
      .then(c => c.RegisterAdminFormComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./components/register-admin-form/register-admin-form.component')
      .then(c => c.RegisterAdminFormComponent),
  },
];
