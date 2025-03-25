import { Routes } from "@angular/router";

export const RegisterResponsibleRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./register-responsible.component')
      .then(c => c.RegisterResponsibleComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./components/register-responsible-form/register-responsible-form.component')
      .then(c => c.RegisterResponsibleFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./components/register-responsible-form/register-responsible-form.component')
      .then(c => c.RegisterResponsibleFormComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./components/register-responsible-form/register-responsible-form.component')
      .then(c => c.RegisterResponsibleFormComponent),
  },
];
